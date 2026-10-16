const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict'),crypto=require('crypto'),cheerio=require('cheerio'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),guide=require('../data/food-guide.json'),photos=require('../data/food-photos.json');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{const target=path.resolve(root,'dist','.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!target.startsWith(path.join(root,'dist')+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(target,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(e?'Not found':b);});});
(async()=>{
 assert.equal(Object.keys(guide.cities).length,8,'Every city needs a food guide');
 for(const [city,c]of Object.entries(guide.cities)){
  assert(c.foods.length>=15,city+' food coverage');assert(c.markets.length>=1,city+' market coverage');
  for(const item of [...c.foods,...c.markets]){assert(item.name.includes('|'));assert(item.description.includes('|'));const p=photos[item.id];assert(p&&p.author&&p.licenseUrl&&p.source);assert.match(p.license,/^(CC BY(?:-SA)? [1-4]\.\d|CC0(?: 1\.0)?|Public domain)$/);assert.equal(new URL(p.source).hostname,'commons.wikimedia.org');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p.src))).digest('hex'),p.sha256);}
  for(const lang of ['it','en']){const file=(lang==='en'?'en/':'')+'sapori-'+city+'.html',$=cheerio.load(fs.readFileSync(path.join(root,file),'utf8'));assert.equal($('html').attr('lang'),lang);assert.equal($('.food-card').length,c.foods.length);assert.equal($('.food-market').length,c.markets.length);assert.equal($('.food-card picture').length,c.foods.length);assert.equal($('.food-card h3').first().text(),c.foods[0].name.split('|')[lang==='en'?1:0]);assert($('link[rel=canonical]').attr('href').endsWith(file));}
 }
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=process.env.BASE_URL||'http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))errors.push(r.status()+' '+r.url());});
 for(const [city,c]of Object.entries(guide.cities)){
  await page.goto(base+'/sapori-'+city+'.html?lang=it');await page.waitForFunction(()=>window.guideReady&&!document.querySelector('.food-tools').hidden);
  for(const width of [320,390,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,city+' overflow '+width);}
  await page.locator('.food-main img').evaluateAll(imgs=>imgs.forEach(img=>{img.loading='eager';}));
  await page.waitForFunction(()=>[...document.querySelectorAll('.food-main img')].every(img=>img.complete));
  const broken=await page.locator('.food-main img').evaluateAll(imgs=>imgs.filter(img=>!img.naturalWidth).map(img=>img.currentSrc||img.src));assert.deepEqual(broken,[],city+' images');
  assert.equal(await page.locator('.food-card:not([hidden])').count(),c.foods.length);
  await page.locator('[data-filter="dessert"]').click();assert(await page.locator('.food-card:not([hidden])').count()>0);assert.equal(await page.locator('.food-card:not([hidden]):not([data-category="dessert"])').count(),0);
  await page.locator('#food-search').fill('non-esiste-un-piatto-cosi');assert(await page.locator('#food-empty').isVisible());
  await page.locator('#food-reset').click();assert.equal(await page.locator('.food-card:not([hidden])').count(),c.foods.length);
  await page.locator('.food-save').first().click();await page.reload();await page.waitForFunction(()=>window.guideReady&&!document.querySelector('.food-tools').hidden);assert.equal(await page.locator('.food-save').first().getAttribute('aria-pressed'),'true');
  await page.locator('[data-filter="saved"]').click();assert.equal(await page.locator('.food-card:not([hidden])').count(),1);
  await page.locator('#langBtn').click();await page.waitForURL('**/en/sapori-'+city+'.html*');await page.waitForFunction(()=>window.guideReady&&!document.querySelector('.food-tools').hidden);assert.equal(await page.locator('h1').textContent(),'A taste of '+require('../data/cities/'+city+'.json').city.name.split('|')[1]+'.');
 }
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Storage disabled','SecurityError');};});
 const temporary=await blocked.newPage();await temporary.goto(base+'/sapori-palermo.html?lang=it');await temporary.waitForFunction(()=>window.guideReady&&!document.querySelector('.food-tools').hidden);await temporary.locator('.food-save').first().click();assert(await temporary.locator('#food-storage').isVisible());await temporary.locator('[data-filter="saved"]').click();assert.equal(await temporary.locator('.food-card:not([hidden])').count(),1);await blocked.close();
 assert.deepEqual(errors,[]);
 await context.close();
 const nojs=await browser.newContext({javaScriptEnabled:false}),raw=await nojs.newPage();for(const city of Object.keys(guide.cities)){await raw.goto(base+'/en/sapori-'+city+'.html');assert.equal(await raw.locator('.food-card:visible').count(),guide.cities[city].foods.length);assert.equal(await raw.locator('.food-tools:visible').count(),0);}await nojs.close();
 if(process.env.FOOD_PREVIEW_PATH){const preview=await browser.newPage({viewport:{width:1440,height:1000}});await preview.goto(base+'/sapori-palermo.html?lang=it');await preview.locator('.food-hero-photo img').evaluate(img=>img.decode());await preview.screenshot({path:process.env.FOOD_PREVIEW_PATH});await preview.close();}
 console.log('Food guides: credited photographs, bilingual static content, working filters, persistent tasting lists, maps and mobile layout OK.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
