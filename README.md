# 🏛️ Guide Poliedriche — sette città d'Italia

Sette città, otto profili di viaggiatore ciascuna: guide web che adattano
contenuti, esperienze e itinerari a chi visita — culturale, business/bleisure,
enogastronomico, religioso, benessere, sport, turismo lento, formativo.

## ✨ Funzionalità (in ogni città)

- **3 livelli di navigazione**: profilo → sotto-categoria → tipo di locale
- **Bilingue IT/EN** con cambio lingua istantaneo
- **Preferiti persistenti** con localStorage isolato per città
- **Assistente locale in chat**: Marco, Ciro, Giulia, Efisio, Carlotta, Lorenzo, Alvise
- **Itinerario del giorno** dinamico per ogni profilo
- **260 esperienze totali** filtrabili con conteggi in tempo reale

## 🔧 Tecnologia

Un file per città: HTML + CSS + JavaScript vanilla. Zero dipendenze,
nessun framework, nessuna build. Funziona anche offline.

## 📂 Struttura

    guide-poliedriche/
    ├── index.html           → landing: scelta della città
    ├── roma.html            → 36 esperienze · Marco
    ├── napoli.html          → 37 esperienze · Ciro
    ├── milano.html          → 38 esperienze · Giulia
    ├── cagliari.html        → 37 esperienze · Efisio
    ├── torino.html          → 36 esperienze · Carlotta
    ├── firenze.html         → 38 esperienze · Lorenzo
    ├── venezia.html         → 38 esperienze · Alvise
    └── README.md

## 🚀 Come usarlo

Apri `index.html` nel browser e scegli la città. Nessuna installazione.

## 🏙️ Aggiungere una nuova città

Duplica una città esistente e sostituisci i blocchi dati
(`ESPERIENZE`, `ITINERARI`, `MARCO`, `SOTTO`, `TIPI`, chiavi di `TESTI`),
cambiando il prefisso di localStorage. Gli script kit mostrano
esattamente come farlo in automatico.

## ⚠️ Note

Demo educative: orari, prezzi e informazioni sono indicativi.
Verificare sempre le fonti ufficiali prima di viaggiare.

## 📄 Licenza

MIT — libera modifica e riuso con attribuzione.
