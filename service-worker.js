const CACHE='guide-poliedriche-318b816ab47b3e2a';
const shell=['index.html','offline.html','assets/css/landing.css','assets/css/themes.css','assets/js/storage.js','assets/js/simple-page.js','assets/js/landing-atmosphere.js','assets/js/app.js','assets/icons/favicon.png','assets/icons/globe-map.svg','assets/js/favicon.js','assets/js/offline.js','assets/icons/app-192.png','assets/icons/app-512.png','manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(shell))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('guide-poliedriche-')&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
function key(url){const parsed=new URL(url);return parsed.origin+parsed.pathname;}
function allowed(url){const parsed=new URL(url);return parsed.origin===self.location.origin&&(parsed.pathname.endsWith('.html')||parsed.pathname.endsWith('/')||/\/assets\/.+\.(?:js|css|webp|jpg|png|ico|svg)$/.test(parsed.pathname));}
async function store(url,response){
 if(!response.ok||response.status!==200||!allowed(url))return;
 const cache=await caches.open(CACHE);await cache.delete(key(url));await cache.put(key(url),response.clone());
 const requests=await cache.keys(),media=requests.filter(r=>/\.(?:webp|jpg)$/.test(new URL(r.url).pathname)),pages=requests.filter(r=>/\.html$|\/$/.test(new URL(r.url).pathname)&&!['/offline.html','/index.html','/'].includes(new URL(r.url).pathname));
 for(const list of [media.slice(0,Math.max(0,media.length-120)),pages.slice(0,Math.max(0,pages.length-40))])for(const request of list)await cache.delete(request);
}
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET'||!allowed(request.url))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  // Only files with a content fingerprint can bypass network revalidation.
  if(new URL(request.url).pathname.includes('/assets/images/responsive/')){const cached=await cache.match(key(request.url));if(cached)return cached;}
  try{const response=await fetch(request);try{await store(request.url,response);}catch{}return response;}
  catch(error){const cached=await cache.match(key(request.url));if(cached)return cached;if(request.mode==='navigate')return cache.match(new URL(request.url).pathname==='/'?'index.html':'offline.html');throw error;}
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type!=='CACHE_VISIT'||!Array.isArray(event.data.urls))return;
 event.waitUntil(Promise.allSettled(event.data.urls.slice(0,80).filter(allowed).map(async url=>{const response=await fetch(url);await store(url,response);})).then(()=>event.source?.postMessage({type:'VISIT_CACHED'})));
});
