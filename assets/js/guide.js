window.Guide = { init(data) {
const { storageKey, pageTitle, TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, FOTO, MARCO, MARCO_FALLBACK, CHAT_QUICK } = data;
const params = new URLSearchParams(location.search);
let LINGUA = params.get("lang") || GuideStorage.read(storageKey + "_lingua", "it");
if (!["it", "en"].includes(LINGUA)) LINGUA = "it";
const allItems = [...ESPERIENZE, ...(data.TOUR_STOPS || [])];
const saved = GuideStorage.read(storageKey + "_preferiti", []);
let preferiti = Array.isArray(saved) ? allItems.filter(e => saved.some(f => f && (f.id === e.id || f.id === e.legacyId))).map(e => ({id:e.id,t:e.t,z:e.z,emo:FOTO[e.tags[0]].emo})) : [];
let profiloAttivo = PROFILI.some(p => p.id === params.get("profile")) ? params.get("profile") : null;
// Old category/type links become a visible search, never hidden filters.
const legacyCategory=Object.values(SOTTO).flat().some(value=>value.id===params.get('category'))?params.get('category'):'';
const legacyType=TIPI.some(value=>value.id===params.get('type'))?params.get('type'):'';
if(!params.get('search')&&(legacyCategory||legacyType))params.set('search',[legacyCategory,legacyType].filter(Boolean).join(' '));
const ix = () => LINGUA === "it" ? 0 : 1;
const tr = value => { const parts = String(value).split("|"); return parts[ix()] ?? parts[0]; };
const base = value => String(value).split("|")[0];
/* ============ RIFERIMENTI DOM ============ */
const grid = document.getElementById("gridEsperienze");
const conteggio = document.getElementById("conteggio");
const chipGrid = document.getElementById("chipGrid");
const langBtn = document.getElementById("langBtn");
const chatBtn = document.getElementById("chatBtn");
const chatPanel = document.getElementById("chatPanel");
const chatMsgs = document.getElementById("chatMsgs");
const chatQuick = document.getElementById("chatQuick");
const chatText = document.getElementById("chatText");

/* Pannello preferiti (iniettato via JS) */
document.body.insertAdjacentHTML("beforeend", `
  <button id="favBtn" aria-expanded="false">❤ Preferiti</button>
  <div id="favPanel" role="dialog" tabindex="-1" aria-label="Preferiti">
    <div class="fav-head"><b id="favTitolo"></b><button id="favSvuota" type="button"></button></div>
    <div class="fav-lista" id="favLista"></div>
  </div>`);
const favBtn = document.getElementById("favBtn");
const favPanel = document.getElementById("favPanel");
const favLista = document.getElementById("favLista");
const favTitolo = document.getElementById("favTitolo");
const favSvuota = document.getElementById("favSvuota");

const interestNames={cultura:'Arte e musei|Art and museums',business:'Fiere e gite|Fairs and day trips',food:'Mangiare e bere|Eat and drink',religioso:'Chiese|Churches',benessere:'Parchi e relax|Parks and relaxation',sport:'Sport ed eventi|Sport and events',lento:'Quartieri e passeggiate|Neighbourhoods and walks',formativo:'Visite e taccuini|Visits and notebooks'};
function nomeTag(id){return tr(interestNames[id]||PROFILI.find(p=>p.id===id)?.nome||id);}
function creaChips(items){
  const focused=document.activeElement?.dataset.interest;
  chipGrid.replaceChildren(...[{id:'',label:'Tutte|All',count:items.length},...PROFILI.map(p=>({id:p.id,label:interestNames[p.id]||p.nome,count:items.filter(e=>e.tags.includes(p.id)).length}))].map(option=>{
    const button=document.createElement('button');button.type='button';button.className='interest-chip';button.dataset.interest=option.id;
    button.setAttribute('aria-pressed',String((profiloAttivo||'')===option.id));button.disabled=Boolean(option.id&&option.count===0&&profiloAttivo!==option.id);
    button.textContent=tr(option.label)+' ('+option.count+')';
    button.addEventListener('click',()=>{profiloAttivo=option.id&&profiloAttivo!==option.id?option.id:null;render();});return button;
  }));
  if(focused!==undefined){const button=[...chipGrid.children].find(button=>button.dataset.interest===focused);if(button&&!button.disabled)button.focus();}
}
function resetFilters(){catalogue.reset();profiloAttivo=null;render();}

/* ============ RENDER CARD ============ */
function render(){
  syncUrl();
  const available=catalogue.apply(ESPERIENZE);
  const lista=GuideExperiences.filter(available,profiloAttivo);
  creaChips(available);catalogue.renderActive();

  grid.innerHTML = "";
  if(lista.length === 0){
    grid.innerHTML = `<div class="empty-state"><h3>${tr('Nessuna proposta con questi filtri|No suggestions with these filters')}</h3><p>${tr('Allarga la ricerca con uno dei comandi qui sotto.|Broaden your search with one of the options below.')}</p><div class="empty-actions">${profiloAttivo?`<button data-empty="interest">${tr('Rimuovi interesse|Remove interest')}</button>`:''}${catalogue.hasSearch()?`<button data-empty="search">${tr('Cancella ricerca|Clear search')}</button>`:''}<button data-empty="all">${tr('Mostra tutte le esperienze|Show all experiences')}</button></div></div>`;
  }
  lista.forEach((e,i)=>{
    const c = document.createElement("article");
    c.className = "card";
    c.style.animationDelay = (i*35)+"ms";
    const photo = data.PHOTOS[e.id];
    const salvato = preferiti.some(x => x.id === e.id);
    const etichetta = salvato ? TESTI.rimuovi : TESTI.salva;
    c.innerHTML = `
      <div class="foto" style="background:var(--sabbia)">
        ${GuidePhotos.image(photo,tr)}
        <button class="fav${salvato ? " salvato" : ""}" data-id="${e.id}"
          title="${tr(etichetta)}" aria-label="${tr(etichetta)}">${salvato ? "★" : "☆"}</button>
      </div>
      <div class="card-photo-caption">${GuidePhotos.caption(photo,tr)}</div>
      <span class="experience-kind">${tr(e.kind === "editorial" ? "Idea autonoma della redazione|Self-directed editorial idea" : "Luogo e fonti|Place and sources")}</span>
      <h3>${tr(e.t)}</h3>
      <div class="meta"><span>📍 ${tr(e.z)}</span><span>⏱️ ${tr(e.d)}</span></div>
      <div class="tags">${e.tags.map(t=>
        `<span class="tag ${t===profiloAttivo?'filtro':''}">${nomeTag(t)}</span>`).join("")}
      </div>
      <p>${tr(e.p)}</p>
      <div class="tip">💡 ${tr(e.tip)}</div>
      <div class="card-actions"><a href="esperienze/${e.id}.html?lang=${LINGUA}">${tr("Dettagli e fonti|Details and sources")}</a>
      <button type="button" data-add-plan="${e.id}">${tr("Aggiungi al mio giorno|Add to my day")}</button></div>`;
    grid.appendChild(c);
  });

  conteggio.textContent=`${lista.length} ${tr(TESTI.parolaEsp)} · ${profiloAttivo?nomeTag(profiloAttivo):tr('Tutti gli interessi|All interests')}`;
  planner.render();
}

/* ============ PREFERITI ============ */
grid.addEventListener("click", ev=>{
  const recovery=ev.target.closest('[data-empty]');
  if(recovery){
    if(recovery.dataset.empty==='all')resetFilters();
    else{if(recovery.dataset.empty==='search')catalogue.clearSearch();else profiloAttivo=null;render();}
    document.getElementById('filter-search').focus();return;
  }
  const add = ev.target.closest("[data-add-plan]");
  if(add) { planner.toggle(add.dataset.addPlan); return; }
  const b = ev.target.closest(".fav");
  if(b) togglePref(b.dataset.id);
});
function salvaStorage(){
  GuideStorage.write(storageKey + "_preferiti", preferiti);
}
function togglePref(id){
  const e = allItems.find(x => x.id === id);
  if(!e) return;
  const pos = preferiti.findIndex(f => f.id === id);
  const aggiunto = pos < 0;
  if(aggiunto){
    preferiti.push({id:id, t:e.t, z:e.z, emo:FOTO[e.tags[0]].emo});
  } else {
    preferiti.splice(pos,1);
  }
  salvaStorage();
  const btn = Array.from(grid.querySelectorAll(".fav")).find(button => button.dataset.id === id);
  if(btn){
    btn.textContent = aggiunto ? "★" : "☆";
    btn.classList.toggle("salvato", aggiunto);
    btn.title = btn.ariaLabel = tr(aggiunto ? TESTI.rimuovi : TESTI.salva);
  }
  aggiornaFavUI();
  toast(tr(aggiunto ? TESTI.toastAgg : TESTI.toastRim));
}
function aggiornaFavUI(){
  favBtn.innerHTML = tr(TESTI.favBtn) + (preferiti.length ? " ("+preferiti.length+")" : "");
  favTitolo.textContent = tr(TESTI.favTitolo);
  favSvuota.textContent = tr(TESTI.svuota);
  favSvuota.style.display = preferiti.length ? "inline-block" : "none";
  if(!preferiti.length){
    favLista.innerHTML = `<div class="fav-vuoto">${tr(TESTI.favVuoto)}</div>`;
    return;
  }
  favLista.innerHTML = preferiti.map(f=>`
    <div class="fav-item">
      <span class="emo" aria-hidden="true">${f.emo}</span>
      <span class="testi"><b>${tr(f.t)}</b><small>📍 ${tr(f.z)}</small></span>
      <button class="del" data-id="${f.id}" aria-label="${tr(TESTI.rimuovi)}">✕</button>
    </div>`).join("");
}
GuideUI.panel(favBtn, favPanel);
favLista.addEventListener("click", ev=>{
  const b = ev.target.closest(".del");
  if(b) togglePref(b.dataset.id);
});
favSvuota.addEventListener("click", ()=>{
  preferiti = [];
  salvaStorage();
  aggiornaFavUI();
  render();
  toast(tr(TESTI.toastRim));
});
function toast(msg){
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("role", "status");
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=> t.classList.add("visibile"));
  setTimeout(()=>{ t.classList.remove("visibile"); setTimeout(()=>t.remove(), 350); }, 1900);
}

const faq = GuideFAQ.create({answers: MARCO, quick: CHAT_QUICK, tr, sourceUrl: data.city.portal, texts: TESTI});
const planner = GuidePlanner.create({items: allItems, storageKey, tr, city:data.city.name, transportUrl:data.city.transportUrl, initial: params, changed: syncUrl});
const catalogue = GuideCatalogue.create({items: ESPERIENZE, tr, initial: params, changed: render, profiles:PROFILI, categories:SOTTO, types:TIPI});
const travel = GuideTravel.create({data, tr, planner});
function syncUrl() {
  const url = new URL(location.href);
  for (const [key, value] of [["profile", profiloAttivo], ["lang", LINGUA]]) {
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
  }
  url.searchParams.delete("category");url.searchParams.delete("type");
  catalogue.saveTo(url.searchParams); planner.saveTo(url.searchParams);
  try { history.replaceState(null, "", url); } catch {}
}
document.getElementById("share-filters").addEventListener("click", async () => {
  document.getElementById("share-status").textContent = await GuideUI.share(location.href, tr);
});
document.getElementById("reset-filters").addEventListener("click",resetFilters);

document.addEventListener("guide-storage-unavailable", () => GuideUI.storageWarning(tr));
/* ============ LINGUA ============ */
langBtn.addEventListener("click", ()=>{
  LINGUA = LINGUA === "it" ? "en" : "it";
  GuideStorage.write(storageKey + "_lingua", LINGUA);
  applicaTutto();
});
function applicaTesti(){
  const link = document.querySelectorAll("nav.menu a");
  [TESTI.nav1, TESTI.nav2, TESTI.nav3, TESTI.nav4].forEach((t,n)=>{
    if(link[n]) link[n].textContent = tr(t);
  });
  document.querySelector(".hero .kicker").textContent = tr(TESTI.heroK);
  document.querySelector(".hero h1").innerHTML = tr(TESTI.heroH1);
  document.querySelector(".hero p").textContent = tr(TESTI.heroP);
  document.querySelector(".cta .btn-p").textContent = tr(TESTI.cta1);
  document.querySelector(".cta .btn-s").textContent = tr(TESTI.cta2);
  document.querySelectorAll(".stats span").forEach((s,n)=>{
    s.textContent = tr([TESTI.stat1, TESTI.stat2, TESTI.stat3][n]);
  });
  document.querySelector("#esperienze h2").textContent = tr(TESTI.step2h);
  document.querySelector("#info .kicker").textContent = tr(TESTI.infoK);
  document.querySelector("#info h2").textContent = tr(TESTI.infoH);
  document.querySelectorAll(".info-card h3").forEach((h,n)=>{
    h.textContent = tr([TESTI.info1h, TESTI.info2h, TESTI.info3h][n]);
  });
  document.querySelectorAll(".info-card p").forEach((p,n)=>{
    p.textContent = tr([TESTI.info1p, TESTI.info2p, TESTI.info3p][n]);
  });
  document.querySelector("footer .wrap").innerHTML = tr(TESTI.footer);
  document.querySelectorAll("[data-alt]").forEach(node => {node.alt = tr(node.dataset.alt);});
  faq.translate();
  document.querySelector(".city-home").textContent = tr("← Tutte le città|← All cities");
  document.querySelector(".skip-link").textContent = tr("Salta alle esperienze|Skip to experiences");
  document.querySelector("nav.menu").setAttribute("aria-label", tr("Navigazione principale|Main navigation"));
  chipGrid.setAttribute("aria-label", tr("Interessi facoltativi|Optional interests"));
  document.getElementById("share-filters").textContent = tr("Condividi ricerca|Share search");
  document.getElementById("reset-filters").textContent = tr("Azzera filtri|Reset filters");
  document.querySelectorAll("[data-text]").forEach(node => { node.textContent = tr(node.dataset.text); });
  favPanel.setAttribute("aria-label", tr(TESTI.favTitolo));
  catalogue.translate(); planner.render(); travel.translate();
  if (GuideStorage.unavailable) GuideUI.storageWarning(tr);
}
function applicaTutto(){
  document.documentElement.lang = LINGUA;
  document.title = tr(pageTitle);
  langBtn.textContent = LINGUA === "it" ? "EN" : "IT";
  applicaTesti();
  render();

  aggiornaFavUI();
}

/* ============ AVVIO ============ */
applicaTutto();
window.guideReady = true;

}};
