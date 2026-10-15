window.GuideUI = {
  escape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); },
  safeUrl(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#'; } catch { return '#'; } },
  external(url, text) { return `<a href="${this.escape(this.safeUrl(url))}" target="_blank" rel="noopener noreferrer">${this.escape(text)}</a>`; },
  async share(url, tr) {
    try { await navigator.clipboard.writeText(url); return tr('Collegamento copiato|Link copied'); }
    catch { window.prompt(tr('Copia il collegamento|Copy this link'), url); return ''; }
  },
  panel(button, panel) {
    let previous;
    function set(open) {
      panel.classList.toggle('aperto', open); panel.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open) {
        previous = document.activeElement;
        const field = panel.querySelector('input') || panel.querySelector('button, a'); if (field) field.focus();
      } else if (previous && panel.contains(document.activeElement)) previous.focus();
    }
    button.setAttribute('aria-controls', panel.id); panel.hidden = true;
    const close = document.createElement('button'); close.className = 'panel-close'; close.type = 'button'; close.textContent = '×'; close.setAttribute('aria-label', 'Chiudi / Close'); close.addEventListener('click', () => { set(false); button.focus(); }); panel.prepend(close);
    document.addEventListener('pointerdown', event => { if (!panel.hidden && !panel.contains(event.target) && !button.contains(event.target)) set(false); });
    button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { set(false); button.focus(); } });
    return { close: () => set(false) };
  },
  storageWarning(tr) {
    const notice = document.getElementById('storage-notice');
    if (!notice) return;
    notice.hidden = false;
    notice.textContent = tr('Il browser non consente il salvataggio permanente: preferiti e itinerario restano disponibili solo in questa sessione. Usa Condividi per conservare un collegamento.|Your browser does not allow permanent storage: favourites and your plan are available only in this session. Use Share to keep a link.');
  }
};
