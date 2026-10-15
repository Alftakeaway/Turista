# Revisione del 16 ottobre 2026

Base GitHub controllata: `81df204` (“Scalability added”). La versione aggiornata conserva le sette città, le 260 esperienze e gli indirizzi delle guide.

## Interventi del rapporto applicati

- Cataloghi JSON con ID stabili, schema dati e migrazione dei preferiti precedenti.
- Ricerca testuale; filtri per zona, durata normalizzata e costo documentato. Nessuna deduzione di gratuità o accessibilità dalla categoria dell’attività.
- 260 schede con indirizzo quando documentato, zona, ricerca mappa, fonti, data di revisione e stato delle verifiche. Portali generali e siti dei gestori sono distinti.
- Campi separati per costo, prenotazione, orari, difficoltà, percorso senza gradini e servizi igienici; valori sconosciuti dichiarati.
- Tutti i titoli degli itinerari tradotti; revisione delle indicazioni troppo assolute, FAQ a parole chiave con link alle fonti, tariffe e maree veneziane aggiornate nelle risposte pertinenti.
- Sette foto locali con autore, licenza e testo alternativo; dimensioni e caricamento differito. Sono immagini contestuali della città, dichiarate come tali. Il collage Cagliari da 4 MB è stato sostituito con una foto da circa 113 KB.
- Itinerario personale con aggiunta/rimozione, riordinamento, persistenza, collegamento condivisibile e stampa.
- Collegamenti condivisibili per lingua, profilo, ricerca e filtri; home bilingue.
- Template unico delle città e generazione delle schede, con controlli dati e test browser versionati.
- Avviso di storage non disponibile, chiusura dei pannelli con pulsante/Escape/click esterno, focus e navigazione mobile.
- LICENSE MIT per il codice, licenze fotografiche separate, pagina crediti/fonti/privacy.
- Build Vercel configurata e collegamento Git nativo previsto su `main`, team P0ly. La CI GitHub esegue controlli indipendenti senza token Vercel.

## Stato editoriale e limiti concreti

La struttura e le funzioni sono implementate. Non significa che siano state certificate 260 strutture o verificate tutte le loro condizioni operative.

- Costo puntuale documentato per Uffizi e Duomo di Milano; la scheda indica prodotto, condizioni e fonte. Gli altri costi restano sconosciuti, salvo future integrazioni.
- Accessibilità puntuale documentata per Museo Egizio e Duomo di Milano, con ambito e limiti della fonte. Le altre voci rinviano a gestore o informazione istituzionale e dichiarano l’assenza di verifica.
- Nessuna scheda dichiara una verifica completa di tutti i dati pratici. `reviewedAt`, `source.checkedAt` e le date di verifica dei singoli campi hanno significati distinti.
- La prima verifica tecnica ha controllato 76 URL distinti: 67 HTTP 200; nove blocchi o errori di connessione. Sono stati poi corretti tre indirizzi migrati (Galleria Borghese, MANN, Roma Convention Center). Raggiungibilità HTTP e veridicità dei contenuti non coincidono.
- Le fotografie illustrano le città; non ci sono 260 foto documentali di ogni attività.
- Nessuna certificazione WCAG; verifiche con Chrome, senza affermare test su Safari, Firefox o tecnologie assistive.
- Nessun nuovo sistema PWA, database o servizio AI. La navigazione offline del sito ospitato non è promessa.

## Verifiche

Build, controlli su tutti i dataset e le pagine, test unitari su filtri/storage/link sicuri e suite HTTP su tutte le città. La suite esercita tutti gli otto profili e le sottocategorie, ricerca, persistenza, migrazione dei preferiti, itinerario e riordino, condivisione, FAQ, pagine dettaglio, cambio lingua e viewport da 320 a 1280 px. Testate anche stampa, parametri URL non validi e storage bloccato. Nessun errore JavaScript o scorrimento orizzontale nei percorsi verificati.

Le verifiche di GitHub Actions e del deployment Vercel sono consultabili sui servizi dopo il push. La CI GitHub non è configurata come gate obbligatorio del deploy: la build Vercel include controlli dati e test unitari.
