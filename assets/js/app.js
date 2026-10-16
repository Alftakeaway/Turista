// Optional installation and a bounded cache of visited pages. No remote services.
(function(){
 const root=new URL('../../',document.currentScript.src);
 window.GuideLocale={navigate(language){
  if(!/^https?:$/.test(location.protocol)||!navigator.onLine)return false;
  const url=new URL(location.href),relative=url.pathname.slice(root.pathname.length).replace(/^en\//,'')||'index.html';
  url.pathname=root.pathname+(language==='en'?'en/':'')+relative;url.searchParams.set('lang',language);location.assign(url);return true;
 }};
 if(!('serviceWorker'in navigator)||!/^https?:$/.test(location.protocol))return;
 const footer=document.querySelector('footer');let prompt,offline=!navigator.onLine;
 if(!footer)return;
 const tools=document.createElement('div');tools.className='app-tools';
 const status=document.createElement('p');status.setAttribute('role','status');
 const button=document.createElement('button');button.type='button';button.hidden=true;
 tools.append(status,button);footer.append(tools);
 function render(){const en=document.documentElement.lang==='en';status.textContent=offline?(en?'You are offline. Previously saved pages may be available; external maps and sources need a connection.':'Sei offline. Puoi consultare le pagine già salvate; mappe e fonti esterne richiedono rete.'):(en?'Recently visited pages are saved on this device for offline use. External services still need a connection.':'Le pagine consultate di recente vengono salvate su questo dispositivo per l’uso offline. I servizi esterni richiedono rete.');button.textContent=en?'Install guide':'Installa la guida';}
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 addEventListener('online',()=>{offline=false;render();});addEventListener('offline',()=>{offline=true;render();});
 addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;button.hidden=false;});
 addEventListener('appinstalled',()=>{button.hidden=true;prompt=null;});
 button.addEventListener('click',async()=>{if(!prompt)return;await prompt.prompt();await prompt.userChoice;prompt=null;button.hidden=true;});
 async function saveVisit(registration){
  const worker=registration.active||navigator.serviceWorker.controller;if(!worker)return;
  const urls=[location.href,...[...document.scripts].map(n=>n.src),...[...document.querySelectorAll('link[rel="stylesheet"]')].map(n=>n.href),...[...document.images].filter(n=>n.complete&&n.naturalWidth).map(n=>n.currentSrc)];
  worker.postMessage({type:'CACHE_VISIT',urls:[...new Set(urls.filter(Boolean))].filter(value=>new URL(value).origin===location.origin).slice(0,80)});
  render();
 }
 addEventListener('load',async()=>{try{const registration=await navigator.serviceWorker.register(new URL('service-worker.js',root),{scope:root.pathname});await navigator.serviceWorker.ready;await saveVisit(registration);}catch{tools.remove();}},{once:true});
})();
