# 🏛️ Guide Poliedriche — Roma · Napoli · Milano

Tre città, otto profili di viaggiatore ciascuna: guide web che adattano
contenuti, esperienze e itinerari a chi visita — culturale, business/bleisure,
enogastronomico, religioso, benessere, sport, turismo lento, formativo.

## ✨ Funzionalità (in ogni città)

- **3 livelli di navigazione**: profilo → sotto-categoria → tipo di locale
- **Bilingue IT/EN** con cambio lingua istantaneo
- **Preferiti persistenti** con localStorage isolato per città
- **Assistente locale in chat**: Marco (Roma), Ciro (Napoli), Giulia (Milano)
- **Itinerario del giorno** dinamico per ogni profilo
- **36-38 esperienze** filtrabili con conteggi in tempo reale

## 🔧 Tecnologia

Un file per città: HTML + CSS + JavaScript vanilla. Zero dipendenze,
nessun framework, nessuna build. Funziona anche offline.

## 📂 Struttura

    guide-poliedriche/
    ├── index.html          → landing: scelta della città
    ├── roma.html           → 36 esperienze · Marco
    ├── napoli.html         → 37 esperienze · Ciro
    ├── milano.html         → 38 esperienze · Giulia
    ├── kit_poliedrico.py   → generatore delle città (opzionale)
    └── README.md

## 🚀 Come usarlo

Apri `index.html` nel browser e scegli la città. Nessuna installazione.

## 🖥️ Rigenerare le città (opzionale)

Con Python 3 installato, dalla cartella del progetto:

    python kit_poliedrico.py

Richiede `roma.html` (o un `index.html` città) come base.
I file città vengono rigenerati da zero a ogni lancio.

## 🏙️ Aggiungere una nuova città

Duplica una città esistente e sostituisci i blocchi dati
(`ESPERIENZE`, `ITINERARI`, `MARCO`, `SOTTO`, `TIPI`, chiavi di `TESTI`),
cambiando il prefisso di localStorage per isolare i preferiti.
`kit_poliedrico.py` mostra esattamente come farlo in automatico.

## ⚠️ Note

Demo educative: orari, prezzi e informazioni sono indicativi.
Verificare sempre le fonti ufficiali prima di viaggiare.

## 📄 Licenza

MIT — libera modifica e riuso con attribuzione.
