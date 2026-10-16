const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..','dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.webmanifest':'application/manifest+json','.xml':'application/xml','.txt':'text/plain','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer((request,response)=>{
 let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://localhost').pathname));
 if(file===root)file=path.join(root,'index.html');
 if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
 fs.readFile(file,(error,body)=>{response.writeHead(error?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});response.end(error?'Not found':body);});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=process.env.BASE_URL||'http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 const context=await browser.newContext();const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))errors.push(r.status()+' '+r.url());});
 try{
 const expected=Object.fromEntries(fs.readdirSync(path.resolve(__dirname,'../data/cities')).map(file=>{const data=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/cities',file)));return[data.city.id,data.ESPERIENZE.length];}));
 for(const [city,count] of Object.entries(expected)){
  await page.goto(base+'/'+city+'.html');await page.waitForFunction(()=>window.guideReady);
  assert.equal(await page.locator('#gridEsperienze article').count(),count);
  assert.equal(await page.locator('#gridEsperienze .foto img').count(),count);
  assert.equal(await page.locator('#gridEsperienze .card-photo-caption').count(),count);
  await page.locator('#gridEsperienze .foto img').evaluateAll(async images=>{await Promise.all(images.map(image=>{image.loading='eager';return image.decode();}));});
  await page.locator('.city-photo img').evaluate(image => image.decode());
  assert.equal(await page.locator('#sottoSelect,#tipoSelect,#itinerarioBox').count(),0);
  assert.equal(await page.locator('#catalogue-options').getAttribute('open'),null);
  for(const interest of ['musei','cibo','parchi']){
    await page.locator('#filter-search').fill(interest);assert(await page.locator('#gridEsperienze article').count()>0,city+' keyword '+interest);
    assert.equal(await page.locator('[data-interest=""]').getAttribute('aria-pressed'),'true');
  }
  await page.locator('#reset-filters').click();
  const chips=page.locator('.interest-chip[data-interest]:not([data-interest=""])');
  for(let i=0;i<await chips.count();i++){
    if(await chips.nth(i).isDisabled())continue;
    await chips.nth(i).click();assert(await page.locator('#gridEsperienze article').count()>0);
    await page.locator('[data-interest=""]').click();assert.equal(await page.locator('#gridEsperienze article').count(),count);
  }
  await page.locator('[data-interest="cultura"]').click();await page.locator('#filter-search').fill('zzzz-no-result');
  await page.locator('[data-empty="interest"]').click();assert.equal(await page.locator('#filter-search').inputValue(),'zzzz-no-result');
  await page.locator('[data-empty="search"]').click();assert.equal(await page.locator('#gridEsperienze article').count(),count);
  await page.locator('#filter-search').fill('zzzz-no-result');assert.equal(await page.locator('#gridEsperienze article').count(),0);
  await page.locator('[data-empty=all]').click();assert.equal(await page.locator('#gridEsperienze article').count(),count);
  await page.locator('#catalogue-options summary').click();await page.locator('#filter-duration').selectOption('120');assert.equal(await page.locator('#gridEsperienze article').count(),JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/cities',city+'.json'))).ESPERIENZE.filter(item=>item.duration.minutes!==null&&item.duration.minutes<=120).length);await page.reload();await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('#filter-duration').inputValue(),'120');
  await page.locator('[data-clear-filter="duration"]').click();assert.equal(await page.locator('#gridEsperienze article').count(),count);
  await page.locator('#reset-filters').click();
  await page.locator('.fav').first().click();await page.locator('[data-add-plan]').first().click();await page.locator('[data-add-plan]').nth(1).click();
  assert.equal(await page.locator('#personal-plan li').count(),2);
  const before=await page.locator('#personal-plan li a').allTextContents();await page.locator('[data-plan="down"]').first().click();const after=await page.locator('#personal-plan li a').allTextContents();assert.equal(before[0],after[1]);
  await page.reload();await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('.fav.salvato').count(),1);assert.equal(await page.locator('#personal-plan li').count(),2);
  await page.locator('#langBtn').click();await page.waitForURL(url=>url.pathname.includes('/en/'));await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('html').getAttribute('lang'),'en');
  await page.locator('#chatBtn').click();await page.locator('#chatText').fill('airport');await page.locator('#chatForm button').click();assert(await page.locator('#chatMsgs a').count()>0);await page.keyboard.press('Escape');assert.equal(await page.locator('#chatBtn').getAttribute('aria-expanded'),'false');
  await page.locator('#favBtn').click();await page.keyboard.press('Escape');assert.equal(await page.locator('#favBtn').getAttribute('aria-expanded'),'false');
  const share=page.url();const shared=await context.newPage();await shared.goto(share);await shared.waitForFunction(()=>window.guideReady);assert.equal(await shared.locator('#personal-plan li').count(),2);await shared.close();
  for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,city+' overflow '+width);}
  await page.locator('#gridEsperienze .card-actions a').first().click();await page.waitForFunction(()=>window.guideReady);assert(await page.locator('#detail-content h1').textContent());assert.equal(await page.locator('#detail-favourite').getAttribute('aria-pressed'),'true');
  await page.locator('#langBtn').click();await page.waitForURL(url=>!url.pathname.includes('/en/'));await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('html').getAttribute('lang'),'it');
  await page.locator('#detail-favourite').click();assert.equal(await page.locator('#detail-favourite').getAttribute('aria-pressed'),'false');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('#personal-plan').isVisible(),true);assert.equal(await page.locator('#detail-content').isVisible(),false);await page.emulateMedia({media:'screen'});
  console.log(city+': keyword search, optional interests, empty-state recovery, favourites, planner, share, FAQ, detail, languages and four viewports OK');
 }
 const palette=new Set();
 for(const city of Object.keys(expected)){
  const travelContext=await browser.newContext({acceptDownloads:true});
  await travelContext.addInitScript(()=>{window.geoCalls=0;Object.defineProperty(navigator,'geolocation',{value:{getCurrentPosition(success,failure){window.geoCalls++;failure({code:1});}}});});
  const travel=await travelContext.newPage();travel.on('pageerror',e=>errors.push(e.message));
  await travel.goto(base+'/'+city+'.html');await travel.waitForFunction(()=>window.guideReady);
  palette.add(await travel.evaluate(()=>getComputedStyle(document.body).getPropertyValue('--terra').trim()));
  assert.equal(await travel.locator('.tour-card').count(),JSON.parse(fs.readFileSync(path.join(__dirname,'../data/cities',city+'.json'),'utf8')).TOURS.length);
  await travel.locator('.tour-card details').evaluateAll(nodes=>nodes.forEach(node=>node.open=true));
  assert(await travel.locator('.tour-card .item-photo img').count()>=45);
  await travel.locator('.tour-card .item-photo img').evaluateAll(async images=>{await Promise.all(images.map(image=>{image.loading='eager';return image.decode();}));});
  for(let i=0;i<3;i++){
   await travel.locator('[data-tour-add]').nth(i).click();assert.equal(await travel.locator('#personal-plan li').count(),3);
   await travel.locator('[data-tour-add]').nth(i).click();assert.equal(await travel.locator('#personal-plan li').count(),3);
   while(await travel.locator('[data-plan="remove"]').count())await travel.locator('[data-plan="remove"]').first().click();
  }
  await travel.locator('#tour-time').selectOption('90');
  assert(await travel.locator('.tour-card').count()>0);
  for(const mood of ['architecture','art','nature','food','memory']){
   await travel.locator('#tour-mood').selectOption(mood);await travel.locator('#tour-weather').selectOption('mixed');
   assert(await travel.locator('.tour-card').count()>0,city+' '+mood+' 90 indoor');
  }
  await travel.locator('[data-tour-add]').first().click();assert.equal(await travel.locator('#personal-plan li').count(),2,'Only the two selected short-variant stops are added');
  await travel.locator('[data-tour-add]').first().click();assert.equal(await travel.locator('#personal-plan li').count(),2);
  while(await travel.locator('[data-plan="remove"]').count())await travel.locator('[data-plan="remove"]').first().click();
  await travel.locator('#tour-mood').selectOption('');
  for(const audience of ['young-adults','students','couples','friends','families','adults','seniors','solo']){
   await travel.locator('#tour-audience').selectOption(audience);assert(await travel.locator('.tour-card').count()>0,city+' '+audience+' indoor 90');
  }
  await travel.locator('#tour-audience').selectOption('families');await travel.locator('#tour-mood').selectOption('food');
  assert(await travel.locator('.tour-card').count()>0,city+' families and food exact match');
  assert.equal(await travel.locator('#tour-other-interests').count(),0);
  await travel.locator('.tour-card details').first().evaluate(node=>node.open=true);assert(await travel.locator('.tour-activity').count()>0);
  await travel.reload();await travel.waitForFunction(()=>window.guideReady);assert.equal(await travel.locator('#tour-time').inputValue(),'90');assert.equal(await travel.locator('#tour-audience').inputValue(),'families');
  await travel.locator('#tour-reset').click();assert.equal(await travel.locator('.tour-card').count(),JSON.parse(fs.readFileSync(path.join(__dirname,'../data/cities',city+'.json'),'utf8')).TOURS.length);
  await travel.locator('[data-tour-add]').first().click();await travel.locator('#trip-date').fill('2028-02-29');await travel.locator('#trip-date').dispatchEvent('change');
  async function download(button){const pending=travel.waitForEvent('download');await travel.locator(button).click();const file=await pending;const stream=await file.createReadStream();const chunks=[];for await(const chunk of stream)chunks.push(chunk);return Buffer.concat(chunks).toString('utf8');}
  const calendar=await download('#download-calendar');assert(calendar.includes('DTSTART;VALUE=DATE:20280229'));assert(calendar.includes('DTEND;VALUE=DATE:20280301'));
  const offline=await download('#download-offline');assert(offline.includes('<!DOCTYPE html>'));assert(!offline.includes('<script'));
  await travel.locator('[data-check="0"]').check();assert.equal(await travel.evaluate(()=>window.geoCalls),0);
  await travel.locator('#use-location').click();assert.equal(await travel.evaluate(()=>window.geoCalls),1);assert(await travel.locator('#location-status').textContent());
  await travel.reload();await travel.waitForFunction(()=>window.guideReady);assert(await travel.locator('[data-check="0"]').isChecked());assert.equal(await travel.locator('#trip-date').inputValue(),'2028-02-29');
  for(const width of [320,1280]){await travel.setViewportSize({width,height:844});assert.equal(await travel.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,city+' travel overflow '+width);}
  await travelContext.close();console.log(city+': original tours, deduplication, preference persistence, ICS, offline export, checklist and location consent OK');
 }
 assert.equal(palette.size,8,'eight different city palettes');
 await page.goto(base+'/index.html?lang=en');await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.equal(await page.locator('a[data-city-link]').count(),8);
 await page.bringToFront();await page.waitForFunction(()=>document.getElementById('site-icon').href.startsWith('data:image/png'));
 const globeFrame=await page.locator('#site-icon').getAttribute('href');
 await page.waitForFunction(previous=>document.getElementById('site-icon').href!==previous,globeFrame);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.getElementById('site-icon').href.endsWith('/assets/icons/favicon.png'));
 const stillFrame=await page.locator('#site-icon').getAttribute('href');await page.waitForTimeout(350);assert.equal(await page.locator('#site-icon').getAttribute('href'),stillFrame);await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(base+'/roma.html?profile=cultura&category=musei');await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('#filter-search').inputValue(),'musei');assert(!new URL(page.url()).searchParams.has('category'));assert(await page.locator('#gridEsperienze article').count()>0);
 await page.goto(base+'/roma.html?profile=invalid&category=bad&type=bad&plan=unknown&lang=bad');await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('#gridEsperienze article').count(),36);assert.equal(await page.locator('#personal-plan li').count(),0);
 // HTTP storage is shared across city and detail pages; old title-based favourites migrate.
 await page.evaluate(()=>{localStorage.setItem('rp_preferiti','[{"id":"Colosseo, Foro e Palatino"}]');});await page.reload();await page.waitForFunction(()=>window.guideReady);assert.equal(await page.locator('.fav.salvato').count(),1);
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});const blockedPage=await blocked.newPage();await blockedPage.goto(base+'/roma.html');await blockedPage.waitForFunction(()=>window.guideReady);assert(await blockedPage.locator('#storage-notice').isVisible());await blocked.close();
 assert.deepEqual(errors,[]);console.log('HTTP browser suite passed.');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
