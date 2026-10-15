window.GuidePlanner = {
  create({ items, storageKey, tr, initial, city = document.body.dataset.city, transportUrl = "https://www.italia.it/", changed = () => {} }) {
    const box = document.getElementById('personal-plan');
    const stored = GuideStorage.read(storageKey + '_plan', []);
    let ids = initial.has('plan') ? initial.get('plan').split(',') : Array.isArray(stored) ? stored : [];
    ids = [...new Set(ids)].filter(id => items.some(e => e.id === id)).slice(0, 20);
    const escape = GuideUI.escape;
    let tripDate = GuideStorage.read(storageKey + '_trip_date', '');
    if (!GuideTrip.validDate(tripDate)) tripDate = new Intl.DateTimeFormat('sv-SE', {timeZone:'Europe/Rome'}).format(new Date());
    function render() {
      const selected = ids.map(id => items.find(e => e.id === id));
      box.innerHTML = `<h2>${tr('Il tuo itinerario personale|Your personal plan')}</h2>
        <p>${tr('Aggiungi esperienze dalle schede, ordina le tappe e stampa. Tempi di viaggio e prenotazioni vanno verificati separatamente.|Add experiences from the cards, arrange the stops and print. Travel times and bookings need to be checked separately.')}</p>
        <ol>${selected.map((e, index) => `<li><div><a href="${document.body.dataset.detail ? '' : 'esperienze/'}${e.id}.html">${escape(tr(e.t))}</a><small>${escape(tr(e.d))} · ${escape(tr(e.z))}</small></div>
          <div class="plan-actions"><button data-plan="up" data-id="${e.id}" ${index === 0 ? 'disabled' : ''} aria-label="${escape(tr('Sposta su|Move up'))} ${escape(tr(e.t))}">↑</button>
          <button data-plan="down" data-id="${e.id}" ${index === selected.length - 1 ? 'disabled' : ''} aria-label="${escape(tr('Sposta giù|Move down'))} ${escape(tr(e.t))}">↓</button>
          <button data-plan="remove" data-id="${e.id}">${tr('Rimuovi|Remove')}</button></div></li>`).join('')}</ol>
        ${selected.length ? '' : `<p class="placeholder">${tr('Il tuo itinerario è vuoto. Apri una scheda e scegli “Aggiungi al mio giorno”.|Your plan is empty. Open a card and choose “Add to my day”.')}</p>`}
        <div class="plan-date"><label for="trip-date">${tr('Data del tuo giorno|Date of your day')}</label><input id="trip-date" type="date" value="${escape(tripDate)}"></div>
        <div class="plan-toolbar"><button id="print-plan" ${selected.length ? '' : 'disabled'}>${tr('Stampa itinerario|Print plan')}</button>
        <button id="download-calendar" ${selected.length ? '' : 'disabled'}>${tr('Salva nel calendario|Save to calendar')}</button>
        <button id="download-offline" ${selected.length ? '' : 'disabled'}>${tr('Scarica taccuino offline|Download offline notebook')}</button>
        <button id="share-plan">${tr('Condividi itinerario|Share plan')}</button><span id="plan-status" role="status"></span></div>
        <p class="budget-summary">${tr('Minimo dei costi elencati|Minimum of listed costs')}: ${new Intl.NumberFormat(document.documentElement.lang === 'it' ? 'it-IT' : 'en-GB', {style:'currency',currency:'EUR'}).format(GuideTrip.budget(selected).total)}.
        ${GuideTrip.budget(selected).missing} ${tr('tappe senza importo fisso; trasporti, pasti ed extra esclusi. I percorsi esterni a quota zero non includono ingressi opzionali.|stops without a fixed amount; transport, meals and extras excluded. Zero-fee outdoor walks do not include optional admission.')}</p>
        <div class="plan-maps">${selected.length ? Array.from({length:Math.ceil(selected.length/3)},(_,index)=>{
          const part=selected.slice(index*3, index*3+4); return GuideUI.external(GuideTrip.directions(part),tr('Mappa a piedi: tratto |Walking map: leg ')+(index+1));
        }).join(' · ') : ''}</div>`;
      box.querySelector('#trip-date').addEventListener('change',event=>{
        tripDate=event.target.value;
        if (GuideTrip.validDate(tripDate)) GuideStorage.write(storageKey+'_trip_date',tripDate);
      });
      box.querySelector('#download-calendar').addEventListener('click',()=>{
        if(!GuideTrip.validDate(tripDate)){box.querySelector('#plan-status').textContent=tr('Scegli una data valida.|Choose a valid date.');return;}
        GuideTrip.download(GuideTrip.calendar({date:tripDate,city,items:selected,tr,url:location.href}),'text/calendar;charset=utf-8','il-mio-giorno.ics');
      });
      box.querySelector('#download-offline').addEventListener('click',()=>{
        GuideTrip.download(GuideTrip.offline({city,items:selected,tr,transportUrl,date:tripDate}),'text/html;charset=utf-8','taccuino-'+document.body.dataset.city+'.html');
      });
      box.querySelector('#print-plan').addEventListener('click', () => window.print());
      box.querySelector('#share-plan').addEventListener('click', async () => {
        const url = new URL(document.body.dataset.detail ? '../' + document.body.dataset.city + '.html' : location.href, location.href);
        saveTo(url.searchParams); url.searchParams.set('lang', document.documentElement.lang); url.hash = 'personal-plan';
        box.querySelector('#plan-status').textContent = await GuideUI.share(url.href, tr);
      });
      document.querySelectorAll('[data-add-plan]').forEach(button => {
        const included = ids.includes(button.dataset.addPlan);
        button.setAttribute('aria-pressed', String(included));
        button.textContent = tr(included ? 'Nel mio giorno ✓|In my day ✓' : 'Aggiungi al mio giorno|Add to my day');
      });
    }
    function save() { GuideStorage.write(storageKey + '_plan', ids); render(); changed(); }
    function toggle(id) {
      if (!items.some(e => e.id === id)) return;
      if (ids.includes(id)) ids = ids.filter(value => value !== id);
      else if (ids.length < 20) ids.push(id);
      else { window.alert(tr('Massimo 20 tappe per itinerario.|Maximum 20 stops per plan.')); return; }
      save();
    }
    function saveTo(params) { if (ids.length) params.set('plan', ids.join(',')); else params.delete('plan'); }
    box.addEventListener('click', event => {
      const button = event.target.closest('[data-plan]'); if (!button) return;
      const index = ids.indexOf(button.dataset.id); if (index < 0) return;
      if (button.dataset.plan === 'remove') ids.splice(index, 1);
      else {
        const target = index + (button.dataset.plan === 'up' ? -1 : 1);
        if (target < 0 || target >= ids.length) return;
        [ids[index], ids[target]] = [ids[target], ids[index]];
      }
      save();
    });
    function addMany(values) {
      const valid = values.filter(id=>items.some(item=>item.id===id));
      const merged=[...new Set([...ids,...valid])];
      if(merged.length>20)return -1;
      const added=merged.length-ids.length; ids=merged; save(); return added;
    }
    render(); return { render, toggle, saveTo, addMany };
  }
};
