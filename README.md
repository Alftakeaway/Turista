# Guide Poliedriche

Otto città italiane, 292 esperienze, 24 tour originali con 72 tappe dedicate e otto profili per città. Sito statico bilingue IT/EN, senza backend, account o dipendenze in esecuzione. Include Palermo e otto palette distinte.

## Utilizzo

Apri `index.html` oppure servi la cartella `dist/` con un server statico. La home è bilingue; scegli una città, cerca per testo, zona e durata, e consulta le schede dettagliate con fonti e informazioni da confermare.

I filtri distinguono biglietti, passeggiate esterne gratuite e costi variabili. Gli importi numerici hanno una fonte e condizioni specifiche; i prezzi variabili non vengono inventati. Le durate sono stime editoriali. I collegamenti mappa cercano un luogo o una zona e non certificano un ingresso preciso. La revisione delle fonti è descritta in `docs/RESEARCH-2026-10-16.md`.

Da una scheda puoi salvare un preferito o aggiungere una tappa al tuo giorno, riordinare le tappe, condividere il collegamento e stampare l’itinerario. Il link condiviso contiene le tappe e i filtri selezionati. Controlla separatamente tempi di spostamento, date e prenotazioni.

I tour si filtrano per tempo, interesse e presenza di opzioni al coperto. Il piano personale esporta un promemoria calendario ICS e un taccuino HTML leggibile offline. Offre mappe a piedi e un minimo dei soli costi elencati, con conteggio degli importi mancanti. Il kit viaggio aggiunge checklist persistente, ricerche di acqua, bagni, farmacie e deposito bagagli, collegamenti ufficiali e ricerca nelle vicinanze soltanto dopo richiesta dell’utente.

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
- `data/themes.json`: otto palette complete; il controllo dati verifica unicità e contrasto dei testi.
- `data/research-sources.json`: fonti specifiche dei nuovi percorsi.
- `templates/city.html`, `templates/landing.html`: template delle otto guide e della home.
- `scripts/generate.cjs`: genera home, guide, 364 pagine `esperienze/<id>.html`, temi CSS, crediti e dati JavaScript.
- `assets/js/guide.js`: coordinamento della guida.
- `assets/js/catalogue.js`, `experiences.js`, `planner.js`, `faq.js`, `detail.js`, `ui.js`, `storage.js`: componenti condivisi per singola responsabilità.
- `assets/js/travel.js`, `tour-rules.js`, `trip.js`: strumenti viaggio, selezione tour ed esportazioni calendario/offline.
- `assets/js/cities/*.js`, le pagine città, le schede esperienza e `crediti.html` sono generati: modifica dati/template/generatore, poi esegui `npm run generate`.
- `tests/`: test unitari e flussi browser su tutte le città.
- `.github/workflows/verify.yml`: build e test automatici sui push e sulle pull request.
- `vercel.json`: build e cartella pubblica per Vercel.

Gli identificatori `roma-001`, ecc. sono stabili e indipendenti dal titolo: non modificarli quando cambi i testi. I vecchi preferiti basati sui titoli vengono riconosciuti tramite `legacyId` e salvati con gli ID nuovi al successivo aggiornamento. Sono conservate le chiavi storage delle città.

Per aggiungere una città, aggiungi un dataset conforme con tre tour e relative tappe, foto e palette in `data/themes.json`, quindi aggiorna lo schema degli ID. Home e test ricavano le città dai dati. La logica e il markup delle guide non vanno duplicati.

## Fonti e significato delle date

- `reviewedAt`: revisione editoriale, non certificazione di tutti i fatti.
- `verifiedAt` a livello esperienza: verifica completa dei dati pratici, attualmente non completata.
- `cost.verifiedAt` e `accessibility.verifiedAt`: solo i campi verificati con la fonte associata.
- `source.checkedAt`: raggiungibilità HTTP del collegamento, non accuratezza del contenuto.
- `source.scope`: `operator` per il gestore; `city` per il portale istituzionale generale; `place` per una pagina specifica sul luogo.
- `verificationScope`, `verifiedFields`, `sources`: delimitano quanto è sostenuto dalle fonti; non trasformano un’idea editoriale in un servizio acquistabile.
- `cost.basis`: distingue importi del gestore da percorsi autonomi all’esterno; questi ultimi non includono ingressi opzionali.

Le foto sono immagini della città, non necessariamente della singola attività: questo è dichiarato accanto alle foto. Immagini locali, dimensioni esplicite, caricamento differito e attribuzioni sono inclusi.

La FAQ è locale e deterministica: cerca parole chiave per argomento, senza servizio AI né un operatore umano. Ogni risposta collega una fonte. Gli eventi negli itinerari sono proposte condizionate a calendario, disponibilità e accessibilità.

## Privacy e offline

Lingua, preferiti e itinerario sono conservati in localStorage; se il browser lo blocca, viene mostrato un avviso e la sessione continua in memoria. La persistenza su `file://` dipende dal browser: per il funzionamento completo è consigliato HTTP. Non sono aggiunti analytics, pubblicità o cookie di profilazione. Le immagini sono locali e la FAQ non invia domande a servizi esterni. I link verso mappe e fonti aprono servizi di terze parti su richiesta. L’hosting gestisce i propri log; dettagli in `crediti.html`.

Il sito può essere aperto da file locali, ma non è una PWA: il taccuino scaricato contiene i testi delle tappe selezionate, mentre mappe e fonti richiedono rete. Data e checklist sono salvate nel browser; la posizione non viene salvata dal sito e viene trasmessa al servizio mappe soltanto aprendo un collegamento aggiornato.

## Deploy automatico

Collega su Vercel il progetto `turista`, team P0ly, alla repository `Alftakeaway/Turista`, con branch di produzione `main`. La configurazione nel repository usa `npm run build` e output `dist`. I push su `main` attivano il deploy di produzione; i branch e le pull request producono anteprime tramite l’integrazione Git nativa. Non servono token nel repository o in GitHub Actions.

La workflow GitHub esegue i controlli in parallelo al deploy Vercel: non costituisce un blocco obbligatorio alla pubblicazione. La build Vercel esegue comunque controlli dei dati e test unitari. I test browser sono stati eseguiti prima del push; eventuali regole di protezione del branch possono essere configurate separatamente dal proprietario.

## Licenze

Codice MIT, copyright 2026 Alftakeaway: vedi `LICENSE`. Le foto mantengono le rispettive licenze Creative Commons, con attribuzioni in `data/photos.json` e `crediti.html`.
