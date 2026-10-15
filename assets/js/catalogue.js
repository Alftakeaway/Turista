(function () {
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  window.GuideCatalogue = {
    create({ items, tr, initial, changed }) {
      const controls = Object.fromEntries(['search', 'duration', 'budget', 'area'].map(key => [key, document.getElementById('filter-' + key)]));
      const labels = {
        search: 'Cerca esperienze|Search experiences', duration: 'Durata indicativa|Estimated duration',
        budget: 'Costo e formula|Cost and format', area: 'Zona|Area'
      };
      const options = {
        duration: [['', 'Qualsiasi durata|Any duration'], ['120', 'Fino a 2 ore|Up to 2 hours'], ['240', 'Fino a mezza giornata|Up to half a day'], ['480', 'Fino a un giorno|Up to one day'], ['unknown', 'Durata variabile|Variable duration']],
        budget: [['', 'Qualsiasi costo|Any cost'], ['free', 'Gratuito / percorso esterno|Free / outdoor route'], ['paid', 'Biglietto a pagamento|Paid admission'], ['variable', 'Costo variabile|Variable cost']],
        area: [['', 'Tutte le zone|All areas'], ...[...new Set(items.map(e => e.z))].map(area => [area.split('|')[0], area])]
      };
      Object.entries(controls).forEach(([key, control]) => {
        control.value = (initial.get(key) || '').slice(0, 150);
        control.addEventListener(key === 'search' ? 'input' : 'change', changed);
      });
      let firstTranslation = true;
      function translate() {
        Object.entries(controls).forEach(([key, control]) => {
          const value = firstTranslation ? (initial.get(key) || '').slice(0, 150) : control.value;
          document.querySelector('[for="filter-' + key + '"]').textContent = tr(labels[key]);
          if (!options[key]) return;
          control.replaceChildren(...options[key].map(([id, label]) => {
            const option = document.createElement('option'); option.value = id; option.textContent = tr(label); return option;
          }));
          control.value = options[key].some(([id]) => id === value) ? value : '';
        });
        firstTranslation = false;
      }
      function apply(list) {
        const query = normalize(controls.search.value.trim());
        return list.filter(e => {
          const minutes = e.duration.minutes;
          return (!query || normalize([e.t, e.z, e.p].join(' ')).includes(query)) &&
            (!controls.duration.value || (controls.duration.value === 'unknown' ? minutes === null : minutes !== null && minutes <= Number(controls.duration.value))) &&
            (!controls.budget.value || e.cost.kind === controls.budget.value) &&
            (!controls.area.value || e.z.split('|')[0] === controls.area.value);
        });
      }
      function saveTo(params) {
        Object.entries(controls).forEach(([key, control]) => {
          if (control.value) params.set(key, control.value); else params.delete(key);
        });
      }
      translate();
      return { apply, translate, saveTo };
    }
  };
})();
