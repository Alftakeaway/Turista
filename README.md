# Guide Poliedriche — sette città d'Italia

260 esperienze, otto profili di viaggiatore, contenuti IT/EN, itinerari e preferiti separati per città.

## Avvio

Aprire `index.html` nel browser. Nessuna dipendenza e nessun servizio esterno richiesto. Gli script classici con `defer` mantengono la compatibilità con `file://`: dati e componenti sono isolati in funzioni e namespace, senza variabili di città globali.

Per lo sviluppo e la distribuzione è preferibile un server HTTP statico. Il comportamento dello storage su file locali dipende dal browser; non è garantito che i preferiti passino da file locali a un dominio o tra domini diversi.

## Struttura

- `index.html`: scelta città.
- `roma.html`, `napoli.html`, `milano.html`, `cagliari.html`, `torino.html`, `firenze.html`, `venezia.html`: pagine con sezioni profili, esperienze, itinerari e informazioni pratiche.
- `assets/css/landing.css`: stile della pagina iniziale.
- `assets/css/guide.css`: stile condiviso, temi delle città e accessibilità.
- `assets/js/cities/*.js`: testi bilingui, esperienze, itinerari e risposte predefinite per città.
- `assets/js/guide.js`: interfaccia condivisa e coordinamento di filtri, itinerari, chat e preferiti.
- `assets/js/experiences.js`: filtro delle esperienze, indipendente dal DOM.
- `assets/js/storage.js`: lettura e scrittura protette delle preferenze.
- `scripts/check.cjs`: controlli di integrità dei dati, traduzioni, sintassi e collegamenti locali.
- `scripts/build.cjs`: copia distribuibile in `dist/`.

Le pagine città restano distinte per preservare URL, titoli e metadati. Non serve aggiungere altre pagine finché le sezioni esistenti restano navigabili; in futuro si potranno aggiungere schede esperienza con URL stabili.

## Verifica e build (Node.js 18+)

    npm run check
    npm run build

La build produce `dist/` e non pubblica nulla. Non occorre `npm install`.

## Aggiungere una città

Creare la pagina HTML con lo stesso contratto di identificatori delle guide, aggiungere il file dati in `assets/js/cities/` e richiamare `Guide.init` con una chiave storage univoca, titolo e dataset. Aggiungere il tema a `guide.css`, il collegamento alla home e la città alla lista in `scripts/check.cjs`. Non duplicare la logica condivisa.

Le vecchie chiavi di lingua e preferiti sono conservate. I preferiti sono ricostruiti dal catalogo corrente e solo gli identificatori riconosciuti vengono caricati. Se lo storage è indisponibile, la sessione continua in memoria.

## Contenuti

Demo educativa: orari, prezzi e consigli sono indicativi e non verificati in tempo reale. La chat usa parole chiave e risposte predefinite, senza un operatore locale o un modello AI. Verificare le fonti ufficiali prima del viaggio.

Il codice precedente dichiarava la licenza MIT nel README ma non includeva un file LICENSE: confermare titolare e anno prima di aggiungerlo.
