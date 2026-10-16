# Guide dei sapori — 16 ottobre 2026

Otto pagine italiane e otto inglesi, con assaggi fotografati, indirizzi selezionati e mercati. Tutte le foto sono locali, con autore, licenza, originale collegato e impronta SHA-256. Nessun download o servizio fotografico esterno durante la visita.

| Città | Assaggi illustrati | Locali selezionati | Mercati fotografati |
|---|---:|---:|---:|
| cagliari | 17 | 6 | 1 |
| firenze | 25 | 5 | 2 |
| milano | 27 | 4 | 1 |
| napoli | 25 | 5 | 2 |
| palermo | 23 | 4 | 3 |
| roma | 24 | 5 | 2 |
| torino | 25 | 5 | 2 |
| venezia | 16 | 4 | 1 |

Le specialità regionali indicano la zona di provenienza. Non sono state riempite le raccolte con immagini imprecise solo per raggiungere quota 30. “Da provare da” collega una proposta documentata; “Per questa tradizione” suggerisce un locale pertinente e invita a verificarne il menu. Le fotografie non sono attribuite ai locali se provengono da altri autori o luoghi.

La sede attuale di San Benedetto è piazza Nazzari: la foto della sede storica è dichiarata come tale. La Pignasecca segnala la riqualificazione e la possibile variazione dei banchi. Le food hall sono distinte dai mercati di spesa tradizionali. I menu stagionali non sono trasformati in promesse di disponibilità, prezzi o orari fissi.

## Fonti di lavoro

### cagliari

- https://cagliariturismo.comune.cagliari.it/index.php/it/dove-mangiare
- https://it.wikipedia.org/wiki/Cucina_sarda
- https://www.anticacagliari.it/it/menu-ristorante-qr.html
- https://guide.michelin.com/it/it/sardegna/cagliari/ristorante/sa-domu-sarda
- https://www.durke.it/
- https://www.dulcispasticceria.it/punti-vendita/
- https://www.ilgolosario.it/it/trattoria-lillicu-ip01750
- https://www.panefrattau.it/menu
- https://cagliariturismo.comune.cagliari.it/index.php/it/vivicagliari/mercato-civico-di-san-benedetto-piazza-nazzari

### firenze

- https://www.comune.firenze.it/imprese-e-commercio/mercati
- https://www.trattoriazaza.it/wp-content/uploads/2026/05/Menu_ITA_SENZAPREZZI.pdf
- https://www.firenzemadeintuscany.com/en/place/trattoria-mario/
- https://mercatosantambrogio.it/botteghe/
- https://www.pasticcerianencioni.com/la-nostra-pasticceria/

### milano

- https://it.wikipedia.org/wiki/Cucina_milanese
- https://peck.it/proposta-gastronomica/gastronomia/
- https://burlagiomilano.it/trattoria-burlagio-menu/
- https://www.marchesi1824.com/
- https://www.touringclub.it/destinazioni/milano/mangiare/130971-sciatt-a-porter
- https://store.mercatidiquartiere.it/it_IT/mercato/mercato-wagner

### napoli

- https://www.visitnaples.eu/napoletanita/sapori-di-napoli/-la-cucina-napoletana-storia-di-passione-e-tradizione
- https://it.wikipedia.org/wiki/Cucina_napoletana
- https://www.sorbillo.it/
- https://linktr.ee/lamasardona
- https://www.tandemnapoli.it/
- https://www.mimiallaferrovia.it/
- https://scaturchio.it/
- https://static-www.comune.napoli.it/wp-content/uploads/2026/01/2026-01-08_Delibera_1.pdf
- https://www.napoliunplugged.com/attractions/naples-shopping-streets-markets

### palermo

- https://www.visitsicily.info/localita/palermo/
- https://www.anticafocacceria.it/locali/palermo/
- https://www.spinnato.it/menu-spinnato/
- https://www.gamberorosso.it/ristoranti/palermo-in-15-locali-le-insegne-da-non-perdere-nel-capoluogo-siciliano/
- https://www.italia.it/en/sicily/palermo/things-to-do/palermo-street-food-what-eat-historic-markets

### roma

- https://turismoroma.it/it/pagina/le-vie-del-gusto
- https://it.wikipedia.org/wiki/Cucina_romana
- https://feliceatestaccio.com/menu/
- https://www.suppliroma.it/le-nostre-specialita/
- https://www.anticofornoroscioli.it/
- https://www.repubblica.it/il-gusto/2026/01/27/news/regoli_l_arte_del_maritozzo_in_una_storia_di_famiglia_lunga_oltre_un_secolo-425120525/amp/
- https://en.wikipedia.org/wiki/Pasticceria_Boccione
- https://www.mercatoditestaccio.it/

### torino

- https://www.scannabue.it/menu/
- https://turismotorino.org/en/visit/where-to-eat/porto-di-savona
- https://stratta1836.it/e-shop/
- https://bicerin.it/cosa-degustare/
- https://www.piemontcioccolato.it/
- https://commercio.comune.torino.it/mercati/mercati-allaperto/mercato-porta-palazzo/
- https://www.mercatocentrale.it/torino/

### venezia

- https://www.veneziaunica.it/it/venezia-sostenibile/detourism/la-cucina-veneziana
- https://www.veneziaunica.it/it/cosa-fare-a-venezia/venezia-nelle-stagioni
- https://cantinadospade.com/menu/
- https://antichecarampane.com/it/
- https://pasticceria.rosasalva.it/
- https://www.acquaemais.it/
- https://www.veneziaunica.it/it/cosa-fare-a-venezia/il-territorio-di-venezia/mercati

## Verifica

`npm run build`, `npm run test:food`, `npm run test:browser` e `npm run test:audit` verificano dati, attribuzioni, integrità delle immagini, IT/EN anche senza JavaScript, filtri e stato vuoto, lista persistente e memoria temporanea quando lo storage è bloccato, foto caricate e assenza di overflow a 320/390/1280 pixel. I flussi esistenti di tour, preferiti, piano e offline restano coperti.
