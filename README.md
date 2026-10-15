# Guide Poliedriche

Sette città italiane, 260 esperienze e otto profili per città. Sito statico bilingue IT/EN, senza backend, account o dipendenze in esecuzione.

## Utilizzo

Apri `index.html` oppure servi la cartella `dist/` con un server statico. La home è bilingue; scegli una città, cerca per testo, zona e durata, e consulta le schede dettagliate con fonti e informazioni da confermare.

I filtri per costo usano solo valori documentati. Molti costi restano “da verificare”: non vengono stimati dal tipo di attività. Le durate sono stime editoriali; le durate non normalizzabili restano variabili. I collegamenti mappa cercano un luogo o una zona e non certificano un ingresso preciso.

Da una scheda puoi salvare un preferito o aggiungere una tappa al tuo giorno, riordinare le tappe, condividere il collegamento e stampare l’itinerario. Il link condiviso contiene le tappe e i filtri selezionati. Controlla separatamente tempi di spostamento, date e prenotazioni.

## Sviluppo (Node.js 22+)

    npm ci --ignore-scripts
    npm run build
    npx playwright install chromium
    npm run test:browser

La sola dipendenza di sviluppo è Playwright, fissata nel lockfile. Il sito distribuito non ha dipendenze JavaScript esterne. La build esegue generazione, controlli dati, test unitari e copia i file pubblici in `dist/`.

Su Windows puoi usare il browser installato impostando `PLAYWRIGHT_EXECUTABLE_PATH` al percorso del browser Chrome. I test browser avviano da soli un server HTTP temporaneo; `BASE_URL` permette di verificare un deployment esterno.

## Struttura e modifiche

- `data/cities/*.json`: unica fonte dei testi, cataloghi, itinerari e FAQ.
- `data/experience.schema.json`: contratto dei dati, con campi nullable per informazioni non verificate.
- `data/photos.json`: immagini, autore, fonte e licenza.
- `templates/city.html`: template unico delle sette guide.
- `scripts/generate.cjs`: genera le guide, 260 pagine `esperienze/<id>.html`, crediti e dati JavaScript.
- `assets/js/guide.js`: coordinamento della guida.
- `assets/js/catalogue.js`, `experiences.js`, `planner.js`, `faq.js`, `detail.js`, `ui.js`, `storage.js`: componenti condivisi per singola responsabilità.
- `assets/js/cities/*.js`, le pagine città, le schede esperienza e `crediti.html` sono generati: modifica dati/template/generatore, poi esegui `npm run generate`.
- `tests/`: test unitari e flussi browser su tutte le città.
- `.github/workflows/verify.yml`: build e test automatici sui push e sulle pull request.
- `vercel.json`: build e cartella pubblica per Vercel.

Gli identificatori `roma-001`, ecc. sono stabili e indipendenti dal titolo: non modificarli quando cambi i testi. I vecchi preferiti basati sui titoli vengono riconosciuti tramite `legacyId` e salvati con gli ID nuovi al successivo aggiornamento. Sono conservate le chiavi storage delle città.

Per aggiungere una città, aggiungi un dataset conforme, foto e tema CSS, aggiorna home, schema degli ID e test. La logica e il markup delle guide non vanno duplicati. Le pagine dettaglio condividono il generatore.

## Fonti e significato delle date

- `reviewedAt`: revisione editoriale, non certificazione di tutti i fatti.
- `verifiedAt` a livello esperienza: verifica completa dei dati pratici, attualmente non completata.
- `cost.verifiedAt` e `accessibility.verifiedAt`: solo i campi verificati con la fonte associata.
- `source.checkedAt`: raggiungibilità HTTP del collegamento, non accuratezza del contenuto.
- `source.scope`: `operator` per il gestore; `city` per il portale istituzionale di contesto generale.

Le foto sono immagini della città, non necessariamente della singola attività: questo è dichiarato accanto alle foto. Immagini locali, dimensioni esplicite, caricamento differito e attribuzioni sono inclusi.

La FAQ è locale e deterministica: cerca parole chiave per argomento, senza servizio AI né un operatore umano. Ogni risposta collega una fonte. Gli eventi negli itinerari sono proposte condizionate a calendario, disponibilità e accessibilità.

## Privacy e offline

Lingua, preferiti e itinerario sono conservati in localStorage; se il browser lo blocca, viene mostrato un avviso e la sessione continua in memoria. La persistenza su `file://` dipende dal browser: per il funzionamento completo è consigliato HTTP. Non sono aggiunti analytics, pubblicità o cookie di profilazione. Le immagini sono locali e la FAQ non invia domande a servizi esterni. I link verso mappe e fonti aprono servizi di terze parti su richiesta. L’hosting gestisce i propri log; dettagli in `crediti.html`.

Il sito può essere aperto da file locali, ma non è una PWA: non promette la navigazione offline del sito ospitato.

## Deploy automatico

Collega su Vercel il progetto `turista`, team P0ly, alla repository `Alftakeaway/Turista`, con branch di produzione `main`. La configurazione nel repository usa `npm run build` e output `dist`. I push su `main` attivano il deploy di produzione; i branch e le pull request producono anteprime tramite l’integrazione Git nativa. Non servono token nel repository o in GitHub Actions.

La workflow GitHub esegue i controlli in parallelo al deploy Vercel: non costituisce un blocco obbligatorio alla pubblicazione. La build Vercel esegue comunque controlli dei dati e test unitari. I test browser sono stati eseguiti prima del push; eventuali regole di protezione del branch possono essere configurate separatamente dal proprietario.

## Licenze

Codice MIT, copyright 2026 Alftakeaway: vedi `LICENSE`. Le foto mantengono le rispettive licenze Creative Commons, con attribuzioni in `data/photos.json` e `crediti.html`.
