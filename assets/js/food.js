(function(){
 const root=document.querySelector('[data-food-guide]');if(!root)return;
 const city=root.dataset.city,key='gp_food_'+city,cards=[...document.querySelectorAll('.food-card')];
 const read=GuideStorage.read(key,[]),valid=new Set(cards.map(c=>c.id));
 const saved=new Set(Array.isArray(read)?read.filter(id=>valid.has(id)):[]);
 const input=document.getElementById('food-search'),buttons=[...document.querySelectorAll('[data-filter]')];
 let filter='all';const en=()=>document.documentElement.lang==='en';
 const normal=s=>s.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 function render(){
  let shown=0;const query=normal(input.value.trim());
  for(const card of cards){const visible=(filter==='all'||filter==='saved'&&saved.has(card.id)||card.dataset.category===filter)&&normal(card.dataset.search).includes(query);card.hidden=!visible;if(visible)shown++;
   const button=card.querySelector('.food-save'),selected=saved.has(card.id);button.hidden=false;button.setAttribute('aria-pressed',String(selected));button.textContent=selected?(en()?'On your list ✓':'Nella tua lista ✓'):(en()?'Save to try':'Da provare');button.setAttribute('aria-label',button.textContent+': '+button.dataset.name.split('|')[en()?1:0]);
  }
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  document.getElementById('food-count').textContent=en()?`${shown} of ${cards.length} specialities · ${saved.size} on your list`:`${shown} specialità su ${cards.length} · ${saved.size} nella tua lista`;
  document.getElementById('food-empty').hidden=shown>0;
  document.querySelectorAll('[data-label]').forEach(n=>n.setAttribute('aria-label',n.dataset.label.split('|')[en()?1:0]));
  document.querySelectorAll('[data-map-food]').forEach(a=>{const dish=a.dataset.mapFood.split('|')[en()?1:0],cityName=a.dataset.mapCity.split('|')[en()?1:0];a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(dish+' '+cityName);});
 }
 document.querySelector('.food-tools').hidden=false;
 input.addEventListener('input',render);buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render();}));
 document.getElementById('food-reset').addEventListener('click',()=>{filter='all';input.value='';render();});
 document.querySelectorAll('.food-save').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.foodId;saved.has(id)?saved.delete(id):saved.add(id);const ok=GuideStorage.write(key,[...saved]);document.getElementById('food-storage').hidden=ok;render();}));
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
