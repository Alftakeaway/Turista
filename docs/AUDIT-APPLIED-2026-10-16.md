# Audit ricevuto: valutazione e interventi

Il documento è stato valutato come proposta, non come lista di istruzioni da eseguire automaticamente. Sono stati verificati i dati del repository e i comportamenti nel browser.

## Palette: priorità applicata

| Città | Colore principale | Sfondo | Scelta |
|---|---|---|---|
| Roma | `#9F1839` | `#FFF4F6` | Porfido e rosa, conservati |
| Napoli | `#8A5A00` | `#FFF6DD` | Tufo e ambra |
| Milano | `#34434E` | `#F1F4F6` | Grafite, conservata |
| Cagliari | `#0B6E99` | `#EDF7FB` | Azzurro sale |
| Torino | `#1E3A8A` | `#EFF3FF` | Blu Savoia e ottone |
| Firenze | `#3D5A3A` | `#F3F8EE` | Cipresso e pietra chiara |
| Venezia | `#1F6B5B` | `#EDF8F4` | Verde laguna |
| Palermo | `#A53208` | `#FFF2E9` | Agrumi e maioliche, conservati |

Ogni tema ha nove ruoli espliciti, non soltanto un nuovo colore principale. Rimossi i vecchi blocchi per città da `guide.css`: `data/themes.json` resta la fonte dei temi. Header, hover, etichette e accenti che usavano tinte comuni sono collegati ai temi. I controlli richiedono contrasto almeno 4,5:1 per principale, accento, testo e testo secondario su entrambi gli sfondi chiari, oltre al bianco su pulsanti principali e accenti. Le città restano identificate anche da nomi e contenuti.

## Foto e dati

- 322 fotografie distinte: 314 foto delle schede più otto foto città, con originali e crediti conservati.
- Derivati WebP da 480 e fino a 960 pixel con `<picture>`, `srcset`, fallback JPG e dimensioni dichiarate. Hero città caricati con priorità, altre foto differite.
- Confronto dei file unici: originali **75.002.130 byte**; WebP grandi **41.811.440 byte**, circa **44% in meno**; WebP piccoli **10.929.218 byte**, circa **85% in meno**. Non è una misura di Core Web Vitals né una promessa sui tempi di ogni visita: il browser sceglie in base a viewport e densità. Conservare i fallback e i derivati aumenta lo spazio del repository; il vantaggio riguarda i byte trasferiti al visitatore.
- Le schede caricano dati dedicati alla città, senza tour, FAQ e manifest fotografici non utilizzati. Esempio Roma: dati prima **238.167 byte**, ora **115.392 byte**, circa **52% in meno**, mantenendo tutte le tappe necessarie a preferiti e itinerario.
- Il dataset sorgente conserva anche i vecchi itinerari; il runtime delle guide esclude i campi non più utilizzati `ITINERARI` e `IMMAGINI`.

`npm run images:optimize` rigenera i derivati con Sharp, usato soltanto in sviluppo. Nomi basati sull'impronta del contenuto e controlli SHA-256 rendono sicura la cache lunga. Non servono nuove richieste a servizi fotografici esterni.

## SEO e lingue

748 pagine statiche pubbliche: 374 italiane e 374 inglesi, comprese le 364 schede per lingua. Gli URL `/en/` contengono titoli, testi, informazioni pratiche e collegamenti tradotti già nell'HTML. Il cambio lingua online naviga alla pagina corrispondente e conserva filtri e itinerario; offline resta disponibile la traduzione locale.

Aggiunti canonical, `hreflang` reciproci, Open Graph, Twitter Card, JSON-LD descrittivo, `sitemap.xml` e `robots.txt`. I filtri non generano nuove URL canoniche. L'indicizzazione effettiva dipende dai motori di ricerca e non è attestata dai test locali.

Il giudizio “inglese non indicizzabile” dell'audit era troppo assoluto: i motori possono eseguire JavaScript. Le pagine statiche separate offrono comunque una base più chiara e verificabile. Riferimento: [Google Search Central, versioni localizzate](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Installazione e offline

Il taccuino HTML scaricabile funzionava già offline; l'assenza di service worker non rendeva falsa quella funzione. Aggiunti ora manifest, icone e service worker per installazione dove supportata e consultazione delle pagine visitate di recente.

La cache è limitata a 40 pagine e 120 file fotografici, oltre alla home di avvio e alle risorse applicative. Non scarica l'intero sito. La pagina offline elenca le pagine effettivamente salvate. Mappe, fonti e servizi esterni richiedono rete; immagini mai caricate possono mancare. Il service worker aggiorna il proprio spazio senza cancellare preferiti e itinerari; non forza il cambio versione nelle schede già aperte. La firma di versione è stabile fra Windows e Linux.

## Sicurezza e cache

Aggiunti CSP e Permissions Policy, mantenendo geolocalizzazione su richiesta e copia dei collegamenti. Nessuno script esterno o `unsafe-eval`; gli stili inline già usati restano permessi. Le risorse senza versione vengono rivalidate. Solo i WebP con nome basato sul contenuto ricevono un anno di cache `immutable`: applicarla a tutti gli asset avrebbe potuto bloccare aggiornamenti di JavaScript e CSS. Riferimento: [MDN, Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control).

## Suggerimenti non applicati automaticamente

- **Un font diverso per città:** aumenterebbe richieste e differenze di lettura; le palette risolvono la priorità indicata senza aggiungere font remoti.
- **Hero aggiuntivo nella home:** le otto destinazioni hanno già fotografie. Non aggiunto un grande scatto di una sola città né altre immagini ridondanti.
- **Dark mode:** richiede una seconda serie completa di temi e verifica di tutti gli stati; non aggiunta come semplice inversione automatica dei colori.
- **`@mixin` e derivazione di tutti i colori da un solo tono:** non necessari per otto temi generati da JSON. Conservati ruoli espliciti, controllabili singolarmente; `color-mix()` è usato solo per effetti leggeri con fallback dove necessario.
- **Select interamente ridisegnati:** mantenuti i controlli nativi, affidabili su telefono e tastiera.
- **View Transitions:** provate; il browser ha segnalato un errore di transizione durante la navigazione offline. Rimosse per conservare il comportamento affidabile della guida offline.

## Verifiche

Build, integrità dei dati e fotografie, contrasti, metadati e sitemap su tutte le pagine; contenuto inglese senza JavaScript; navigazione fra lingue con piano conservato; scelta reale dei WebP; CSP nel browser; ricaricamento offline e pagina di recupero. Conservate le verifiche dei 184 tour e delle 2.560 combinazioni di pubblico, durata, interesse e meteo. Nessuna misurazione di indicizzazione o traffico inventata.
