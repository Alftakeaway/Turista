window.GuidePlanner = {
  create({ items, storageKey, tr, initial, changed = () => {} }) {
    const box = document.getElementById('personal-plan');
    const stored = GuideStorage.read(storageKey + '_plan', []);
    let ids = initial.has('plan') ? initial.get('plan').split(',') : Array.isArray(stored) ? stored : [];
    ids = [...new Set(ids)].filter(id => items.some(e => e.id === id)).slice(0, 20);
    const escape = GuideUI.escape;
    function render() {
      const selected = ids.map(id => items.find(e => e.id === id));
      box.innerHTML = `<h2>${tr('Il tuo itinerario personale|Your personal plan')}</h2>
        <p>${tr('Aggiungi esperienze dalle schede, ordina le tappe e stampa. Tempi di viaggio e prenotazioni vanno verificati separatamente.|Add experiences from the cards, arrange the stops and print. Travel times and bookings need to be checked separately.')}</p>
        <ol>${selected.map((e, index) => `<li><div><a href="${document.body.dataset.detail ? '' : 'esperienze/'}${e.id}.html">${escape(tr(e.t))}</a><small>${escape(tr(e.d))} · ${escape(tr(e.z))}</small></div>
          <div class="plan-actions"><button data-plan="up" data-id="${e.id}" ${index === 0 ? 'disabled' : ''} aria-label="${escape(tr('Sposta su|Move up'))} ${escape(tr(e.t))}">↑</button>
          <button data-plan="down" data-id="${e.id}" ${index === selected.length - 1 ? 'disabled' : ''} aria-label="${escape(tr('Sposta giù|Move down'))} ${escape(tr(e.t))}">↓</button>
          <button data-plan="remove" data-id="${e.id}">${tr('Rimuovi|Remove')}</button></div></li>`).join('')}</ol>
        ${selected.length ? '' : `<p class="placeholder">${tr('Il tuo itinerario è vuoto. Apri una scheda e scegli “Aggiungi al mio giorno”.|Your plan is empty. Open a card and choose “Add to my day”.')}</p>`}
        <div class="plan-toolbar"><button id="print-plan" ${selected.length ? '' : 'disabled'}>${tr('Stampa itinerario|Print plan')}</button>
        <button id="share-plan">${tr('Condividi itinerario|Share plan')}</button><span id="plan-status" role="status"></span></div>`;
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
    render(); return { render, toggle, saveTo };
  }
};
