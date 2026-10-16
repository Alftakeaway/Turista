window.GuideCatalogue = {
  create({items,tr,initial,changed,profiles,categories,types}) {
    const controls=Object.fromEntries(['search','duration','budget','area'].map(key=>[key,document.getElementById('filter-'+key)]));
    const labels={search:'Cerca un luogo o una parola|Search a place or keyword',duration:'Tempo per la visita|Time for the visit',budget:'Costo e formula|Cost and format',area:'Zona|Area'};
    const options={
      duration:[['','Qualsiasi durata|Any duration'],['120','Fino a 2 ore|Up to 2 hours'],['240','Fino a mezza giornata|Up to half a day'],['480','Fino a un giorno|Up to one day'],['unknown','Durata variabile|Variable duration']],
      budget:[['','Qualsiasi costo|Any cost'],['free','Gratuito / percorso esterno|Free / outdoor route'],['paid','Biglietto a pagamento|Paid admission'],['variable','Costo variabile|Variable cost']],
      area:[['','Tutte le zone|All areas'],...[...new Set(items.map(e=>e.z))].map(area=>[area.split('|')[0],area])]
    };
    for(const [key,control] of Object.entries(controls)){
      control.value=(initial.get(key)||'').slice(0,150);
      control.addEventListener(key==='search'?'input':'change',changed);
    }
    let first=true;
    function translate(){
      for(const [key,control] of Object.entries(controls)){
        const value=first?(initial.get(key)||'').slice(0,150):control.value;
        document.querySelector('[for="filter-'+key+'"]').textContent=tr(labels[key]);
        if(!options[key])continue;
        control.replaceChildren(...options[key].map(([id,label])=>{const option=document.createElement('option');option.value=id;option.textContent=tr(label);return option;}));
        control.value=options[key].some(([id])=>id===value)?value:'';
      }
      controls.search.placeholder=tr('Es. museo, mercato, giardino|e.g. museum, market, garden');
      first=false;
    }
    function apply(list){
      return GuideExperiences.search(list,controls.search.value,{profiles,categories,types}).filter(e=>
        (!controls.duration.value||(controls.duration.value==='unknown'?e.duration.minutes===null:e.duration.minutes!==null&&e.duration.minutes<=Number(controls.duration.value)))&&
        (!controls.budget.value||e.cost.kind===controls.budget.value)&&(!controls.area.value||e.z.split('|')[0]===controls.area.value));
    }
    function reset(){Object.values(controls).forEach(control=>{control.value='';});}
    function renderActive(){
      const active=Object.entries(controls).filter(([,control])=>control.value);
      const extra=active.filter(([key])=>key!=='search').length;
      document.getElementById('extra-filter-count').textContent=extra?' ('+extra+')':'';
      document.getElementById('active-filters').replaceChildren(...active.map(([key,control])=>{
        const button=document.createElement('button');button.type='button';button.dataset.clearFilter=key;
        const value=key==='search'?control.value:control.options[control.selectedIndex].textContent;
        button.textContent=tr(labels[key])+': '+value+' ×';button.setAttribute('aria-label',tr('Rimuovi filtro|Remove filter')+': '+value);
        button.addEventListener('click',()=>{control.value='';changed();controls.search.focus();});return button;
      }));
    }
    function saveTo(params){for(const [key,control] of Object.entries(controls)){if(control.value)params.set(key,control.value);else params.delete(key);}}
    translate();return{apply,translate,saveTo,reset,renderActive,hasSearch:()=>Boolean(controls.search.value),clearSearch:()=>{controls.search.value='';}};
  }
};
