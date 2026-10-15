window.Guide = { init(data) {
const { storageKey, pageTitle, TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK } = data;
const params = new URLSearchParams(location.search);
let LINGUA = params.get("lang") || GuideStorage.read(storageKey + "_lingua", "it");
if (!["it", "en"].includes(LINGUA)) LINGUA = "it";
const saved = GuideStorage.read(storageKey + "_preferiti", []);
let preferiti = Array.isArray(saved) ? ESPERIENZE.filter(e => saved.some(f => f && (f.id === e.id || f.id === e.legacyId))).map(e => ({id:e.id,t:e.t,z:e.z,emo:FOTO[e.tags[0]].emo})) : [];
let profiloAttivo = PROFILI.some(p => p.id === params.get("profile")) ? params.get("profile") : null;
let sottoAttivo = SOTTO[profiloAttivo]?.some(s => s.id === params.get("category")) ? params.get("category") : null;
let tipoAttivo = TIPI.some(t => t.id === params.get("type")) ? params.get("type") : null;
const ix = () => LINGUA === "it" ? 0 : 1;
const tr = value => { const parts = String(value).split("|"); return parts[ix()] ?? parts[0]; };
const base = value => String(value).split("|")[0];
/* ============ RIFERIMENTI DOM ============ */
const grid = document.getElementById("gridEsperienze");
const conteggio = document.getElementById("conteggio");
const itBox = document.getElementById("itinerarioBox");
const itSotto = document.getElementById("itinerarioSotto");
const chipGrid = document.getElementById("chipGrid");
const sottoSelect = document.getElementById("sottoSelect");
const tipoSelect = document.getElementById("tipoSelect");
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

/* ============ PROFILI (chip) ============ */
function creaChips(){
  PROFILI.forEach(p=>{
    const b = document.createElement("button");
    b.className = "chip";
    b.dataset.id = p.id;
    b.setAttribute("aria-pressed", p.id === profiloAttivo ? "true" : "false");
    b.innerHTML = `<span class="emoji" aria-hidden="true">${p.emoji}</span>
      <span><b>${tr(p.nome)}</b><small>${tr(p.claim)}</small></span>`;
    b.addEventListener("click", ()=> toggle(p.id));
    chipGrid.appendChild(b);
  });
}
function toggle(id){
  profiloAttivo = (profiloAttivo === id) ? null : id;
  sottoAttivo = null;
  tipoAttivo = null;
  document.querySelectorAll(".chip").forEach(c=>{
    c.setAttribute("aria-pressed", c.dataset.id === profiloAttivo ? "true" : "false");
  });
  aggiornaSelect();
  aggiornaTipo();
  render();
}
function nomeTag(id){
  const p = PROFILI.find(x=>x.id===id);
  return p.emoji + " " + tr(p.nome);
}

/* ============ MENU A TENDINA (2° e 3° LIVELLO) ============ */
function aggiornaSelect(){
  sottoSelect.innerHTML = "";
  if(!profiloAttivo){
    sottoSelect.disabled = true;
    const o = document.createElement("option");
    o.textContent = tr(TESTI.selProfilo);
    sottoSelect.appendChild(o);
    return;
  }
  sottoSelect.disabled = false;
  const tutte = document.createElement("option");
  tutte.value = "";
  tutte.textContent = tr(TESTI.tutteSotto);
  sottoSelect.appendChild(tutte);
  SOTTO[profiloAttivo].forEach(s=>{
    const n = ESPERIENZE.filter(e =>
      e.tags.includes(profiloAttivo) && e.sub === s.id).length;
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = `${s.emoji} ${tr(s.nome)} (${n})`;
    sottoSelect.appendChild(o);
  });
  sottoSelect.value = sottoAttivo || "";
}
function aggiornaTipo(){
  if(profiloAttivo !== "food"){
    tipoSelect.style.display = "none";
    return;
  }
  tipoSelect.style.display = "inline-block";
  const baseFood = ESPERIENZE.filter(e =>
    e.tags.includes("food") && (!sottoAttivo || e.sub === sottoAttivo));
  const presenti = [...new Set(baseFood.map(e=>e.tipo).filter(Boolean))];
  if(tipoAttivo && !presenti.includes(tipoAttivo)) tipoAttivo = null;
  tipoSelect.innerHTML = "";
  const tutte = document.createElement("option");
  tutte.value = "";
  tutte.textContent = `${tr(TESTI.tuttiTipi)} (${baseFood.length})`;
  tipoSelect.appendChild(tutte);
  presenti.forEach(tp=>{
    const v = TIPI.find(x=>x.id===tp) || {emoji:"🍴", nome:tp};
    const o = document.createElement("option");
    o.value = tp;
    o.textContent = `${v.emoji} ${tr(v.nome)} (${baseFood.filter(e=>e.tipo===tp).length})`;
    tipoSelect.appendChild(o);
  });
  tipoSelect.value = tipoAttivo || "";
}
sottoSelect.addEventListener("change", ()=>{
  sottoAttivo = sottoSelect.value || null;
  tipoAttivo = null;
  aggiornaTipo();
  render();
});
tipoSelect.addEventListener("change", ()=>{
  tipoAttivo = tipoSelect.value || null;
  render();
});

/* ============ RENDER CARD ============ */
function render(){
  syncUrl();
  const lista = catalogue.apply(GuideExperiences.filter(ESPERIENZE, profiloAttivo, sottoAttivo, tipoAttivo));

  grid.innerHTML = "";
  if(lista.length === 0){
    grid.innerHTML = `<div class="placeholder" style="grid-column:1/-1">${tr(TESTI.comboVuota)}</div>`;
  }
  lista.forEach((e,i)=>{
    const c = document.createElement("article");
    c.className = "card";
    c.style.animationDelay = (i*35)+"ms";
    const f = FOTO[e.tags[0]];
    const url = IMMAGINI[e.id];
    const salvato = preferiti.some(x => x.id === e.id);
    const etichetta = salvato ? TESTI.rimuovi : TESTI.salva;
    c.innerHTML = `
      <div class="foto" style="background:${f.bg}">
        ${url ? `<img src="${url}" alt="${tr(e.t)}">` : `<span aria-hidden="true">${f.emo}</span>`}
        <button class="fav${salvato ? " salvato" : ""}" data-id="${e.id}"
          title="${tr(etichetta)}" aria-label="${tr(etichetta)}">${salvato ? "★" : "☆"}</button>
      </div>
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

  let etichetta = tr(TESTI.etichettaTutti);
  if(profiloAttivo){
    etichetta = nomeTag(profiloAttivo);
    if(sottoAttivo){
      const s = SOTTO[profiloAttivo].find(x => x.id === sottoAttivo);
      if(s) etichetta += " · " + s.emoji + " " + tr(s.nome);
    }
    if(tipoAttivo){
      const v = TIPI.find(x => x.id === tipoAttivo);
      if(v) etichetta += " · " + v.emoji + " " + tr(v.nome);
    }
  }
  conteggio.textContent = `${lista.length} ${tr(TESTI.parolaEsp)} · ${etichetta}`;

  if(!profiloAttivo){
    itSotto.textContent = tr(TESTI.itin1);
    itBox.innerHTML = `<div class="placeholder">${tr(TESTI.itin2)}</div>`;
  } else {
    const p = PROFILI.find(x=>x.id===profiloAttivo);
    itSotto.textContent = `${tr(TESTI.giornata)} ${p.emoji} ${tr(p.nome)}.`;
    itBox.innerHTML = `<div class="timeline">` + ITINERARI[profiloAttivo].map(s=>
      `<div class="step"><span class="ora">${s.ora}</span><b>${tr(s.t)}</b><p>${tr(s.p)}</p><small>${tr(s.note)}</small></div>`
    ).join("") + `</div>`;
  }
  planner.render();
}

/* ============ PREFERITI ============ */
grid.addEventListener("click", ev=>{
  const add = ev.target.closest("[data-add-plan]");
  if(add) { planner.toggle(add.dataset.addPlan); return; }
  const b = ev.target.closest(".fav");
  if(b) togglePref(b.dataset.id);
});
function salvaStorage(){
  GuideStorage.write(storageKey + "_preferiti", preferiti);
}
function togglePref(id){
  const e = ESPERIENZE.find(x => x.id === id);
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
const planner = GuidePlanner.create({items: ESPERIENZE, storageKey, tr, initial: params, changed: syncUrl});
const catalogue = GuideCatalogue.create({items: ESPERIENZE, tr, initial: params, changed: render});
function syncUrl() {
  const url = new URL(location.href);
  for (const [key, value] of [["profile", profiloAttivo], ["category", sottoAttivo], ["type", tipoAttivo], ["lang", LINGUA]]) {
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
  }
  catalogue.saveTo(url.searchParams); planner.saveTo(url.searchParams);
  try { history.replaceState(null, "", url); } catch {}
}
document.getElementById("share-filters").addEventListener("click", async () => {
  document.getElementById("share-status").textContent = await GuideUI.share(location.href, tr);
});
document.getElementById("reset-filters").addEventListener("click", () => {
  document.querySelectorAll("[id^=filter-]").forEach(control => {control.value = "";});
  profiloAttivo = sottoAttivo = tipoAttivo = null; applicaTutto();
});
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
  document.querySelector("#profilo .kicker").textContent = tr(TESTI.step1k);
  document.querySelector("#profilo h2").textContent = tr(TESTI.step1h);
  document.querySelector("#profilo .sotto").textContent = tr(TESTI.step1p);
  document.querySelector("#esperienze .kicker").textContent = tr(TESTI.step2k);
  document.querySelector("#esperienze h2").textContent = tr(TESTI.step2h);
  document.querySelector(".legenda").textContent = tr(TESTI.legenda);
  document.querySelector("#itinerario .kicker").textContent = tr(TESTI.step3k);
  document.querySelector("#itinerario h2").textContent = tr(TESTI.step3h);
  document.querySelector("#info .kicker").textContent = tr(TESTI.infoK);
  document.querySelector("#info h2").textContent = tr(TESTI.infoH);
  document.querySelectorAll(".info-card h3").forEach((h,n)=>{
    h.textContent = tr([TESTI.info1h, TESTI.info2h, TESTI.info3h][n]);
  });
  document.querySelectorAll(".info-card p").forEach((p,n)=>{
    p.textContent = tr([TESTI.info1p, TESTI.info2p, TESTI.info3p][n]);
  });
  document.querySelector("footer .wrap").innerHTML = tr(TESTI.footer);
  sottoSelect.setAttribute("aria-label", tr(TESTI.ariaSotto));
  tipoSelect.setAttribute("aria-label", tr(TESTI.ariaTipo));
  document.querySelectorAll("[data-alt]").forEach(node => {node.alt = tr(node.dataset.alt);});
  faq.translate();
  document.querySelector(".city-home").textContent = tr("← Tutte le città|← All cities");
  document.querySelector(".skip-link").textContent = tr("Salta alle esperienze|Skip to experiences");
  document.querySelector("nav.menu").setAttribute("aria-label", tr("Navigazione principale|Main navigation"));
  chipGrid.setAttribute("aria-label", tr("Selettore profilo viaggiatore|Traveller profile selector"));
  document.getElementById("share-filters").textContent = tr("Condividi ricerca|Share search");
  document.getElementById("reset-filters").textContent = tr("Azzera filtri|Reset filters");
  document.querySelectorAll("[data-text]").forEach(node => { node.textContent = tr(node.dataset.text); });
  favPanel.setAttribute("aria-label", tr(TESTI.favTitolo));
  catalogue.translate(); planner.render();
  if (GuideStorage.unavailable) GuideUI.storageWarning(tr);
}
function applicaTutto(){
  document.documentElement.lang = LINGUA;
  document.title = tr(pageTitle);
  langBtn.textContent = LINGUA === "it" ? "EN" : "IT";
  applicaTesti();
  chipGrid.innerHTML = "";
  creaChips();
  aggiornaSelect();
  aggiornaTipo();
  render();

  aggiornaFavUI();
}

/* ============ AVVIO ============ */
applicaTutto();
window.guideReady = true;

}};
