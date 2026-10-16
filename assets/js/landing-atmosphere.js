(function(){
 const button=document.getElementById('motion-toggle');if(!button)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=GuideStorage.read('gp_motion_paused',false)===true;
 function render(){
  document.body.classList.toggle('atmosphere-paused',paused||reduced.matches||document.hidden);
  document.body.classList.add('atmosphere-running');
  button.hidden=reduced.matches;button.setAttribute('aria-pressed',String(paused));
  const en=document.documentElement.lang==='en';button.textContent=paused?(en?'Animate background':'Anima lo sfondo'):(en?'Pause background':'Ferma lo sfondo');
 }
 button.addEventListener('click',()=>{paused=!paused;GuideStorage.write('gp_motion_paused',paused);render();});
 reduced.addEventListener('change',render);document.addEventListener('visibilitychange',render);
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
