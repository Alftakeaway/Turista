window.Guide = {
  init(data) {
    const allItems = [...data.ESPERIENZE, ...(data.TOUR_STOPS || [])];
    const item = allItems.find(e => e.id === document.body.dataset.id);
    if (!item) return;
    const params = new URLSearchParams(location.search);
    let language = params.get('lang') || GuideStorage.read(data.storageKey + '_lingua', 'it');
    if (!['it','en'].includes(language)) language = 'it';
    const tr = value => { const parts = String(value).split('|'); return parts[language === 'en' ? 1 : 0] ?? parts[0]; };
    const escape = GuideUI.escape;
    const unknown = 'Non verificato|Not verified';
    const yesNo = value => tr(value === null ? unknown : value ? 'Sì, secondo la fonte|Yes, according to the source' : 'No / accesso parziale|No / partial access');
    function row(label, value) { return `<div><dt>${escape(tr(label))}</dt><dd>${escape(value)}</dd></div>`; }
    let planner;
    function render() {
      document.documentElement.lang = language; document.title = tr(item.t) + ' — ' + tr(data.city.name);
      document.querySelectorAll('[data-alt]').forEach(node => { node.alt = tr(node.dataset.alt); });
      document.querySelectorAll('[data-text]').forEach(node => { node.textContent = tr(node.dataset.text); });
      const source = item.source.scope === 'operator' ? 'Sito del gestore|Operator website' : item.source.scope === 'place' ? 'Fonte sul luogo|Source about the place' : 'Contesto della destinazione|Destination context';
      const a = item.accessibility;
      document.getElementById('detail-content').innerHTML = `<p class="kicker">${escape(tr(data.city.name))}</p><h1>${escape(tr(item.t))}</h1><p class="detail-description">${escape(tr(item.p))}</p>
        <dl class="facts">${row('Zona|Area', tr(item.z))}${item.location.address ? row('Indirizzo o punto del percorso|Address or route point', item.location.address) : ''}${row('Durata indicativa|Estimated duration', tr(item.d))}
        ${row('Costo|Cost', item.cost.amount === null ? tr(item.cost.note) : new Intl.NumberFormat(language === 'it' ? 'it-IT' : 'en-GB', {style:'currency',currency:item.cost.currency}).format(item.cost.amount) + ' — ' + tr(item.cost.note))}
        ${row('Prenotazione|Booking', tr(item.booking.note))}${row('Orari|Opening hours', tr(item.openingHours.text))}</dl>
        ${item.cost.sourceUrl ? '<p>' + GuideUI.external(item.cost.sourceUrl, tr('Fonte del costo documentato|Documented price source')) + ' — ' + escape(item.cost.verifiedAt) + '</p>' : ''}<h2>${tr('Accessibilità del luogo|Venue accessibility')}</h2><dl class="facts">${a.stepFree !== null ? row('Percorso senza gradini|Step-free route', yesNo(a.stepFree)) : ''}${a.accessibleToilets !== null ? row('Servizi igienici accessibili|Accessible toilets', yesNo(a.accessibleToilets)) : ''}${a.difficulty ? row('Difficoltà del percorso|Route difficulty', tr(a.difficulty)) : ''}</dl><p>${escape(tr(a.notes))}</p>
        <p>${GuideUI.external(a.sourceUrl, tr('Fonte sull’accessibilità / informazioni|Accessibility source / information'))} ${a.verifiedAt ? '— ' + escape(a.verifiedAt) : ''}</p>
        <h2>${tr('Prima di partire|Before you go')}</h2><p>${escape(tr(item.tip))}</p>
        <div class="official-links">${GuideUI.external(item.source.url, tr(source))}${GuideUI.external('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.location.mapQuery), tr('Cerca luogo o zona sulla mappa|Search for the place or area on a map'))}</div>
        <p class="data-note">${tr('Revisione delle fonti|Source review')}: ${escape(item.reviewedAt)}. ${escape(tr(item.verificationScope || 'I valori numerici riportati hanno fonte e data proprie.|Quoted numerical values have their own source and date.'))}</p>
        <ul class="evidence-list">${(item.sources || []).map(source=>'<li>'+GuideUI.external(source.url,tr(source.scope))+(source.consultedAt?' — '+escape(source.consultedAt):'')+'</li>').join('')}</ul>
        <div class="detail-actions"><button data-add-plan="${item.id}">${tr('Aggiungi al mio giorno|Add to my day')}</button><button id="detail-favourite"></button><button id="share-detail">${tr('Condividi scheda|Share experience')}</button><span role="status" id="detail-status"></span></div>`;
      document.getElementById('langBtn').textContent = language === 'it' ? 'EN' : 'IT';
      document.getElementById('detail-favourite').addEventListener('click', toggleFavourite);
      document.querySelector('[data-add-plan]').addEventListener('click', () => planner.toggle(item.id));
      document.getElementById('share-detail').addEventListener('click', async () => { document.getElementById('detail-status').textContent = await GuideUI.share(location.href, tr); });
      updateFavourite(); planner?.render(); if (GuideStorage.unavailable) GuideUI.storageWarning(tr);
    }
    function favourites() {
      const saved = GuideStorage.read(data.storageKey + '_preferiti', []);
      return Array.isArray(saved) ? allItems.filter(e => saved.some(f => f && (f.id === e.id || f.id === e.legacyId))).map(e => ({id:e.id})) : [];
    }
    function updateFavourite() {
      const selected = favourites().some(f => f.id === item.id), button = document.getElementById('detail-favourite');
      button.textContent = tr(selected ? 'Rimuovi dai preferiti|Remove from favourites' : 'Salva nei preferiti|Save to favourites'); button.setAttribute('aria-pressed', String(selected));
    }
    function toggleFavourite() {
      const saved = favourites(), selected = saved.some(f => f.id === item.id);
      GuideStorage.write(data.storageKey + '_preferiti', selected ? saved.filter(f => f.id !== item.id) : [...saved, {id:item.id}]); updateFavourite();
    }
    document.getElementById('langBtn').addEventListener('click', () => {
      language = language === 'it' ? 'en' : 'it'; GuideStorage.write(data.storageKey + '_lingua', language);
      const url = new URL(location.href); url.searchParams.set('lang', language); try { history.replaceState(null, '', url); } catch {} render();
    });
    document.addEventListener('guide-storage-unavailable', () => GuideUI.storageWarning(tr));
    render(); planner = GuidePlanner.create({items:allItems,storageKey:data.storageKey,tr,city:data.city.name,transportUrl:data.city.transportUrl,initial:params});
    window.guideReady = true;
  }
};
