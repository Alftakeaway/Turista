const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../dist'),config=require('../vercel.json'),types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer((req,res)=>{let name=new URL(req.url,'http://localhost').pathname;if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+decodeURIComponent(name));if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 for(const header of config.headers[0].headers)res.setHeader(header.key,header.value.replace('; upgrade-insecure-requests',''));
 if(name.startsWith('/assets/images/responsive/'))res.setHeader('Cache-Control','public, max-age=31536000, immutable');
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(error?'Not found':data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=process.env.BASE_URL||'http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{})});
 try{
  const raw=await browser.newContext({javaScriptEnabled:false}),page=await raw.newPage();
  for(const city of ['roma','napoli','milano','cagliari','torino','firenze','venezia','palermo']){
   const data=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/cities',city+'.json'),'utf8'));
   await page.goto(base+'/en/'+city+'.html');assert.equal(await page.locator('html').getAttribute('lang'),'en');
   assert.equal((await page.locator('.hero h1').textContent()).replace(/\s+/g,' ').trim(),data.TESTI.heroH1.split('|')[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim());
   assert.equal(await page.locator('noscript a').count(),data.ESPERIENZE.length);
   assert.equal(await page.locator('noscript a').first().textContent(),data.ESPERIENZE[0].t.split('|')[1]);
  }
  await page.goto(base+'/en/esperienze/palermo-001.html');assert((await page.locator('#detail-content').textContent()).includes('Booking'));assert(await page.locator('picture source[type="image/webp"]').count());await raw.close();
  console.log('English city/detail content is present without JavaScript.');
  const context=await browser.newContext(),live=await context.newPage(),errors=[];
  await context.addInitScript(()=>{window.visitCached=false;navigator.serviceWorker?.addEventListener('message',e=>{if(e.data?.type==='VISIT_CACHED')window.visitCached=true;});});
  live.on('pageerror',e=>errors.push(e.message));live.on('console',m=>{if(m.type()==='error'&&/Content Security Policy|Refused to/.test(m.text()))errors.push(m.text());});
  await live.goto(base+'/palermo.html?tourAudience=seniors&tourTime=90');await live.waitForFunction(()=>window.guideReady);
  await live.waitForFunction(()=>navigator.serviceWorker.controller&&window.visitCached);
  await live.locator('[data-tour-add]').first().click();assert.equal(await live.locator('#personal-plan li').count(),2);
  await live.locator('#langBtn').click();await live.waitForURL(url=>url.pathname==='/en/palermo.html');await live.waitForFunction(()=>window.guideReady&&window.visitCached);
  assert.equal(await live.locator('#personal-plan li').count(),2);assert.equal(await live.locator('#tour-audience').inputValue(),'seniors');
  const image=live.locator('.city-photo img');await image.evaluate(img=>img.decode());assert((await image.evaluate(img=>img.currentSrc)).includes('/responsive/'));
  await context.setOffline(true);await live.reload();await live.waitForFunction(()=>window.guideReady);assert.equal(await live.locator('#personal-plan li').count(),2);assert((await live.locator('.app-tools').textContent()).includes('offline'));
  await live.locator('#langBtn').click();assert.equal(await live.locator('html').getAttribute('lang'),'it');
  await live.goto(base+'/firenze.html');assert((await live.locator('h1').textContent()).includes('offline'));await live.waitForFunction(()=>document.querySelectorAll('#offline-pages a').length>0);
  await live.goto(base+'/en/esperienze/milano-001.html');assert((await live.locator('h1').textContent()).includes('offline'));await live.waitForFunction(()=>document.querySelectorAll('#offline-pages a').length>0);
  await live.goto(base+'/');await live.waitForFunction(()=>window.guideReady);assert.equal(await live.locator('.destination-card').count(),8,'Installed app entry remains available offline');
  assert.equal(errors.length,0,errors.join('\n'));await context.setOffline(false);await context.close();
  console.log('CSP, responsive image selection, real language navigation, saved plans, offline reload and offline fallback list OK.');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
