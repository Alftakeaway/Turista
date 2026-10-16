(async function(){
 const list=document.getElementById('offline-pages');if(!list||!('caches'in window))return;
 const name=(await caches.keys()).find(key=>key.startsWith('guide-poliedriche-'));if(!name)return;
 const cache=await caches.open(name);
 for(const request of await cache.keys()){
  const url=new URL(request.url);if(!/\.html$|\/$/.test(url.pathname)||url.pathname.endsWith('/offline.html'))continue;
  const response=await cache.match(request),html=new DOMParser().parseFromString(await response.text(),'text/html');
  const item=document.createElement('li'),link=document.createElement('a');link.href=url.pathname;link.textContent=html.title||url.pathname;item.append(link);list.append(item);
 }
})();
