window.GuideFAQ = {
  create({ answers, quick, tr, sourceUrl, texts }) {
    const button = document.getElementById('chatBtn'), panel = document.getElementById('chatPanel');
    const log = document.getElementById('chatMsgs'), input = document.getElementById('chatText');
    GuideUI.panel(button, panel);
    function add(text, role, source) {
      const entry = document.createElement('div'); entry.className = 'msg ' + role;
      const paragraph = document.createElement('p'); paragraph.textContent = text; entry.append(paragraph);
      if (source) { const link = document.createElement('a'); link.href = GuideUI.safeUrl(source); link.textContent = tr('Consulta la fonte|View source'); link.target = '_blank'; link.rel = 'noopener noreferrer'; entry.append(link); }
      log.append(entry); log.scrollTop = log.scrollHeight;
    }
    function ask(question, selectedIndex) {
      add(question, 't');
      const query = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const ranked = answers.map((answer, index) => ({ answer, index, score: answer.k.reduce((score, keyword) => {
        const key = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const match = new RegExp('(?:^|[^\\p{L}])' + escaped + '[\\p{L}]*', 'u').test(query);
        return score + (match ? key.length : 0);
      }, 0) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
      const answer = Number.isInteger(selectedIndex) ? answers[selectedIndex] : ranked[0]?.answer;
      add(answer ? tr(answer.a) : tr('Non ho una risposta predefinita per questa domanda. Prova un argomento più specifico o consulta il portale ufficiale.|I do not have a preset answer for this question. Try a more specific topic or consult the official portal.'), 'm', answer?.sourceUrl || sourceUrl);
    }
    document.getElementById('chatForm').addEventListener('submit', event => { event.preventDefault(); const question = input.value.trim().slice(0, 500); if (question) ask(question); input.value = ''; });
    button.addEventListener('click', () => { if (!log.children.length) add(tr(texts.benvenuto), 'm', sourceUrl); });
    function translate() {
      button.textContent = tr('Domande frequenti|Frequently asked questions');
      panel.setAttribute('aria-label', tr('Domande frequenti|Frequently asked questions'));
      panel.querySelector('.chat-head b').textContent = tr('Domande frequenti|Frequently asked questions');
      panel.querySelector('.chat-head small').textContent = tr('FAQ automatica · risposte predefinite|Automated FAQ · preset answers');
      input.placeholder = tr('Cerca un argomento|Search a topic'); input.setAttribute('aria-label', input.placeholder);
      panel.querySelector('button[type="submit"]').setAttribute('aria-label', tr('Invia domanda|Send question'));
      const choices = document.getElementById('chatQuick'); choices.replaceChildren();
      quick.forEach(question => { const item = document.createElement('button'); item.textContent = tr(question); item.type = 'button'; item.addEventListener('click', () => ask(tr(question))); choices.append(item); });
      log.replaceChildren(); if (!panel.hidden) add(tr(texts.benvenuto), 'm', sourceUrl);
    }
    translate(); return { translate };
  }
};
