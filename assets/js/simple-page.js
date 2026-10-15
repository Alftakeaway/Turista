(function(){
 const params=new URLSearchParams(location.search);
 let language=params.get('lang')||GuideStorage.read('gp_lingua','it');
 if(!['it','en'].includes(language))language='it';
 function render(){
  document.documentElement.lang=language;
  document.querySelectorAll('[data-text]').forEach(node=>{const parts=node.dataset.text.split('|');node.textContent=parts[language==='en'?1:0]??parts[0];});
  document.querySelectorAll('[data-alt]').forEach(node=>{const parts=node.dataset.alt.split('|');node.alt=parts[language==='en'?1:0]??parts[0];});
  document.querySelectorAll('a[data-city-link]').forEach(link=>{link.href=link.dataset.cityLink+'.html?lang='+language;});
  const title=document.querySelector('h1');if(title)document.title=title.textContent+' — Guide Poliedriche';
  document.getElementById('langBtn').textContent=language==='it'?'EN':'IT';
 }
 document.getElementById('langBtn').addEventListener('click',()=>{language=language==='it'?'en':'it';GuideStorage.write('gp_lingua',language);render();const url=new URL(location.href);url.searchParams.set('lang',language);try{history.replaceState(null,'',url);}catch{}});
 render();window.guideReady=true;
})();
