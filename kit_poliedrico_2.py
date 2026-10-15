#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KIT POLIEDRICO 2 — Cagliari · Torino · Firenze · Venezia
=========================================================
Da lanciare DOPO kit_poliedrico.py. Genera:

    cagliari.html  → 37 esperienze · assistente Efisio
    torino.html    → 36 esperienze · assistente Carlotta
    firenze.html   → 38 esperienze · assistente Lorenzo
    venezia.html   → 38 esperienze · assistente Alvise
    index.html     → landing aggiornata con le 7 città
    README.md      → documentazione aggiornata

Uso:  python kit_poliedrico_2.py
Rilanciabile: rigenera le 4 città da zero (le modifiche manuali
a quei file andranno perse). Serve solo Python 3.
"""

import sys
if sys.version_info[0] < 3:
    sys.exit("Serve Python 3 (python.org).")

import re
from pathlib import Path

CARTELLA = Path(__file__).resolve().parent

# ================================================================
#  CAGLIARI — dati
# ================================================================

CAGLIARI_SOTTO = r'''const SOTTO = {
  cultura: [
    {id:"musei",  emoji:"🏛️", nome:"Musei e tesori|Museums & treasures"},
    {id:"antico", emoji:"🏺", nome:"Siti antichi e domus|Ancient sites & ruins"},
    {id:"torri",  emoji:"🗼", nome:"Fortezze e panorami|Fortresses & viewpoints"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e meeting|Congresses & meetings"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"sarda",  emoji:"🍝", nome:"Cucina sarda tipica|Typical Sardinian cuisine"},
    {id:"pesce",  emoji:"🦐", nome:"Pesce e cucina di mare|Fish & seafood"},
    {id:"pane",   emoji:"🍞", nome:"Pane e formaggi|Bread & cheeses"},
    {id:"street", emoji:"🧺", nome:"Street food e mercati|Street food & markets"},
    {id:"dolci",  emoji:"🍨", nome:"Dolci e vernaccia|Sweets & vernaccia"}
  ],
  religioso: [
    {id:"basiliche",  emoji:"⛪",  nome:"Basiliche e santuari|Basilicas & sanctuaries"},
    {id:"chiese",     emoji:"🕯️", nome:"Chiese e cripte|Churches & crypts"},
    {id:"pellegrini", emoji:"🥾",  nome:"Riti e pellegrinaggi|Rites & pilgrimages"}
  ],
  benessere: [
    {id:"mare",  emoji:"🏖️", nome:"Mare e spiagge|Sea & beaches"},
    {id:"spa",   emoji:"💆", nome:"Spa e massaggi|Spas & massages"},
    {id:"verde", emoji:"🌳", nome:"Parchi e giardini|Parks & gardens"}
  ],
  sport: [
    {id:"calcio",    emoji:"⚽", nome:"Calcio e stadio|Football & stadium"},
    {id:"eventi",    emoji:"🎪", nome:"Concerti e grandi eventi|Concerts & major events"},
    {id:"partecipa", emoji:"🏃", nome:"Sport da praticare|Sports to play"}
  ],
  lento: [
    {id:"quartieri", emoji:"🏘️", nome:"Quartieri autentici|Authentic neighborhoods"},
    {id:"parchi",    emoji:"🦩", nome:"Parchi e saline|Parks & salt pans"},
    {id:"lente",     emoji:"🚲", nome:"Camminate e sentieri|Walks & trails"}
  ],
  formativo: [
    {id:"cucina",      emoji:"👩‍🍳", nome:"Corsi di cucina|Cooking classes"},
    {id:"artigianato", emoji:"🎨", nome:"Laboratori artigianali|Craft workshops"},
    {id:"guide",       emoji:"📣", nome:"Visite guidate e masterclass|Guided tours & masterclasses"}
  ]
};'''

CAGLIARI_TIPI = r'''const TIPI = [
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"agriturismo", emoji:"🌾", nome:"Agriturismo|Farm restaurant"},
  {id:"panificio",   emoji:"🥖", nome:"Panificio|Bakery"},
  {id:"bar",         emoji:"☕", nome:"Bar e caffè|Bar & café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];'''

CAGLIARI_ESPERIENZE = r'''const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Quartiere Castello e le torri pisane|The Castello district & the Pisan towers", z:"Castello|Castello", d:"2 ore|2 hrs", tags:["cultura"], sub:"torri",
   p:"La città alta medievale: vicoli di pietra, bastioni e le torri di San Pancrazio e dell'Elefante.|The medieval upper town: stone alleys, bastions and the towers of San Pancrazio and the Elephant.",
   tip:"Cammina lungo le mura al mattino: luce d'oro e il golfo sotto i piedi.|Walk the walls in the morning: golden light and the gulf below."},
  {t:"Bastione Saint Remy al tramonto|Bastion Saint Remy at sunset", z:"Castello|Castello", d:"1 ora|1 hr", tags:["cultura"], sub:"torri",
   p:"La terrazza-simbolo: quando il sole scende, il golfo si accende e il salone si riempie.|The symbol terrace: as the sun drops, the gulf lights up and the salon fills.",
   tip:"Arriva 30 minuti prima del tramonto: i posti sul parapetto vanno via presto.|Arrive 30 minutes before sunset: parapet spots go early."},
  {t:"Anfiteatro romano|The Roman amphitheatre", z:"Buoncammino|Buoncammino", d:"45 min|45 min", tags:["cultura"], sub:"antico",
   p:"L'anfiteatro del II secolo scavato nella roccia: duemila anni di spettacolo davanti al golfo.|The 2nd-century amphitheatre carved into rock: two thousand years of shows before the gulf.",
   tip:"Combinalo con l'Orto Botanico: sono a due passi.|Combine it with the Botanical Garden: they're steps apart."},
  {t:"Nora: la città sul mare|Nora: the city by the sea", z:"Pula (fuori porta)|Pula (out of town)", d:"mezza giornata|half day", tags:["cultura","religioso"], sub:"antico",
   p:"Fenici, punici e romani sulla stessa penisola: mosaici a due passi dalle onde e il santuario di Efisio.|Phoenicians, Punics and Romans on one peninsula: mosaics by the waves and the sanctuary of Efisio.",
   tip:"Bus ARST da Cagliari (circa 1 ora): con il caldo entra all'apertura.|ARST bus from Cagliari (about 1 hour): in the heat, enter at opening."},
  {t:"Tuvixeddu, la necropoli punica|Tuvixeddu, the Punic necropolis", z:"Colle Tuvixeddu|Tuvixeddu hill", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"antico",
   p:"La più grande necropoli punica del Mediterraneo: ipogei scavati nella roccia calcarea.|The largest Punic necropolis in the Mediterranean: hypogea carved into limestone.",
   tip:"Scarpe comode e mezzo litro d'acqua: il colle è pietra, rovo e sole.|Comfortable shoes and half a litre of water: the hill is rock, scrub and sun."},
  {t:"Cittadella dei Musei|The Museums Citadel", z:"Stampace|Stampace", d:"3 ore|3 hrs", tags:["cultura"], sub:"musei",
   p:"I bronzetti nuragici, la Pinacoteca e le inquietanti cere anatomiche: tre musei in una piazzetta.|The nuragic bronzes, the Pinacoteca and the unsettling anatomical waxes: three museums in one square.",
   tip:"Chiedi il biglietto cumulativo: tre musei, un colpo solo.|Ask for the combined ticket: three museums, one go."},

  /* — BUSINESS — */
  {t:"La Fiera e i congressi|The trade fair & congresses", z:"Centro|Centre", d:"mezza giornata|half day", tags:["business"], sub:"congressi",
   p:"Il punto d'incontro degli eventi professionistici: fiere, meeting e congressi internazionali.|The meeting point of professional events: trade fairs, meetings and international congresses.",
   tip:"Città compatta: hotel e congresso raramente distano più di un quarto d'ora.|A compact city: hotel and venue are rarely more than fifteen minutes apart."},
  {t:"Aperitivo in Marina|Aperitivo in the Marina district", z:"Marina|Marina", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Il rito del dopo-lavoro nel quartiere del porto: cocktail, conoscenze e il mare dietro l'angolo.|The after-work ritual in the port district: cocktails, connections and the sea around the corner.",
   tip:"Molti locali aprono la terrazza d'estate: chiedi quella con vista golfo.|Many venues open their terrace in summer: ask for the gulf-view one."},
  {t:"Bleisure: Villasimius o Chia|Bleisure: Villasimius or Chia", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più dopo il meeting diventa spiaggia: sabbia bianca e acqua trasparente.|The extra day after the meeting becomes beach: white sand and transparent water.",
   tip:"In estate prenota battelli e noleggi in anticipo: le spiagge top si riempiono presto.|In summer book boats and rentals ahead: top beaches fill up early."},

  /* — ENOGASTRONOMICO — */
  {t:"Culurgiones e malloreddus|Culurgiones & malloreddus", z:"Centro|Centre", d:"pranzo|lunch", tags:["food"], sub:"sarda", tipo:"trattoria",
   p:"I ravioli 'a spiga' di patate e menta e i malloreddus alla campidanese: zafferano e salsiccia.|The 'wheat-ear' ravioli of potato and mint and malloreddus alla campidanese: saffron and sausage.",
   tip:"Se la menta è fresca e la sfoglia è sottile, sei nel posto giusto.|If the mint is fresh and the pastry thin, you're in the right place."},
  {t:"Porceddu in agriturismo|Suckling pig at an agriturismo", z:"Fuori porta|Out of town", d:"sera|evening", tags:["food"], sub:"sarda", tipo:"agriturismo",
   p:"Il rito della brace sarda: porceddu croccante, pane carasau e vino del contadino.|The Sardinian grill ritual: crisp suckling pig, carasau bread and the farmer's wine.",
   tip:"Il porceddu cuoce per ore: avvisa l'agriturismo il giorno prima.|Suckling pig cooks for hours: tell the agriturismo the day before."},
  {t:"Fregola con arselle|Fregola with clams", z:"Marina|Marina", d:"sera|evening", tags:["food"], sub:"pesce", tipo:"ristorante",
   p:"La pasta sarda di semola tostata: chicchi dorati che sposano le arselle e il sapore di mare.|Sardinian toasted semolina pasta: golden grains marrying clams and the taste of the sea.",
   tip:"Chiedi se è fatta a mano: la differenza si sente al primo cucchiaio.|Ask if it's handmade: you'll taste it at the first spoonful."},
  {t:"Bottarga e ricci di mare|Bottarga & sea urchins", z:"Marina|Marina", d:"inverno|winter", tags:["food"], sub:"pesce", tipo:"ristorante",
   p:"Il caviale sardo: bottarga di muggine grattugiata e ricci aperti al momento, dolci di acqua di mare.|Sardinian caviar: grated mullet bottarga and urchins opened to order, sweet as seawater.",
   tip:"Stagionali: chiedi sempre cosa è arrivato oggi in pescheria.|Seasonal: always ask what came into the fishmonger's today."},
  {t:"Pane carasau, guttiau e pistoccu|Carasau, guttiau & pistoccu", z:"Centro|Centre", d:"merenda|snack time", tags:["food"], sub:"pane", tipo:"panificio",
   p:"Il pane dei pastori: carasau croccante, guttiau unto d'olio e sale, pistoccu che accompagna tutto.|The shepherds' bread: crisp carasau, guttiau brushed with oil and salt, pistoccu that goes with everything.",
   tip:"Compralo dove lo sfornano: la croccantezza si sente subito.|Buy it where they bake it: you'll feel the crispness at once."},
  {t:"Pecorini e casizolu|Pecorinos & casizolu", z:"Fuori porta|Out of town", d:"2 ore|2 hrs", tags:["food"], sub:"pane", tipo:"agriturismo",
   p:"Pecorini a ogni stagionatura e il casizolu, il formaggio a forma di pera: latte, tempo e mani.|Pecorinos of every age and casizolu, the pear-shaped cheese: milk, time and hands.",
   tip:"Aggiungi il miele di corbezzolo: amaro e dolce insieme, come la Sardegna.|Add strawberry-tree honey: bitter and sweet together, like Sardinia."},
  {t:"Mercato di San Benedetto|The San Benedetto market", z:"San Benedetto|San Benedetto", d:"1,5 ore|1.5 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Il grande mercato coperto: pesce al piano di sotto, ortaggi e formaggi sopra, voci che si rincorrono.|The great covered market: fish downstairs, vegetables and cheeses above, voices chasing each other.",
   tip:"Alle 7 la sala del pesce è teatro puro: vai presto.|At 7 am the fish hall is pure theatre: go early."},
  {t:"Fainè: la cecina cagliaritana|Fainè: Cagliari's chickpea flatbread", z:"Marina|Marina", d:"merenda|snack time", tags:["food"], sub:"street", tipo:"bar",
   p:"La focaccia di ceci che i marinai portarono via mare: croccante ai bordi, morbida al cuore.|The chickpea flatbread sailors brought by sea: crisp at the edges, soft at the heart.",
   tip:"Anche fredda è buona, ma appena sfornata è un'altra cosa.|Even cold it's good, but fresh from the oven it's another thing."},
  {t:"Sebadas e vernaccia|Sebadas & vernaccia", z:"Centro|Centre", d:"dolce|dessert", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Ravioli fritti ripieni di formaggio, affogati nel miele amaro, con un bicchiere di vernaccia.|Fried ravioli filled with cheese, drowned in bitter honey, with a glass of vernaccia.",
   tip:"Quando tagli a metà, il cuore deve colare: il termometro di bontà.|When you cut it in half, the heart must ooze: the quality thermometer."},

  /* — RELIGIOSO — */
  {t:"Santuario di Bonaria|The Bonaria sanctuary", z:"Bonaria|Bonaria", d:"1,5 ore|1.5 hrs", tags:["religioso"], sub:"basiliche",
   p:"Il santuario che domina il porto: la Madonna patrona della Sardegna e dei naviganti.|The sanctuary overlooking the port: the Madonna patroness of Sardinia and seafarers.",
   tip:"Cerca gli ex voto a forma di nave: secoli di grazie ricevute dal mare.|Look for the ship-shaped ex-votos: centuries of graces received from the sea."},
  {t:"Il Duomo di Castello|The Castello cathedral", z:"Castello|Castello", d:"1 ora|1 hr", tags:["religioso"], sub:"basiliche",
   p:"La cattedrale della città alta: romanico pisano fuori, quiete e cripta sotto.|The upper town's cathedral: Pisan Romanesque outside, silence and a crypt below.",
   tip:"Combinala con il giro di Castello: fanno la stessa passeggiata.|Combine it with the Castello walk: they're the same stroll."},
  {t:"Cripta di Santa Restituta|The crypt of Santa Restituta", z:"Stampace|Stampace", d:"45 min|45 min", tags:["religioso"], sub:"chiese",
   p:"Sotto la chiesa di Sant'Efisio: una necropoli romana che la tradizione lega alla santa.|Beneath the church of Sant'Efisio: a Roman necropolis tradition links to the saint.",
   tip:"Mezz'ora di silenzio sotto la città: contrappeso perfetto al chiasso di sopra.|Half an hour of silence beneath the city: the perfect counterweight to the noise above."},
  {t:"Sant'Efisio: il voto del 1° maggio|Sant'Efisio: the 1 May vow", z:"Da Stampace a Nora|From Stampace to Nora", d:"1 giorno|1 day", tags:["religioso","cultura"], sub:"pellegrini",
   p:"Il voto del 1656, rinnovato ogni anno: traccas, cavalli e il simulacro che viaggia fino a Nora.|The 1656 vow, renewed yearly: traccas, horses and the statue travelling all the way to Nora.",
   tip:"Il 1° maggio la città si ferma: qualunque locale ti dirà dove mettersi.|On 1 May the whole city stops: any local will tell you where to stand."},

  /* — BENESSERE — */
  {t:"Poetto: la spiaggia dei cagliaritani|Poetto: the locals' beach", z:"Poetto|Poetto", d:"tutto il giorno|all day", tags:["benessere"], sub:"mare",
   p:"Otto chilometri tra sabbia e scoglio: la spiaggia-istituzione, con la Sella del Diavolo a fare da quinta.|Eight kilometres of sand and rock: the institution-beach, the Sella del Diavolo as backdrop.",
   tip:"Fermati in un chiosco: frittura di paranza e vista sulla Sella.|Stop at a chiosco: mixed fry and a view of the Sella."},
  {t:"Calamosca e il faro|Calamosca & the lighthouse", z:"Calamosca|Calamosca", d:"2 ore|2 hrs", tags:["benessere"], sub:"mare",
   p:"La caletta ai piedi del faro: acqua trasparente, scogli e la camminata fino al promontorio.|The cove at the foot of the lighthouse: clear water, rocks and the walk to the headland.",
   tip:"Al tramonto la punta si colora: portati la macchina fotografica.|At sunset the point colours up: bring your camera."},
  {t:"Giardini pubblici e Orto Botanico|Public gardens & the Botanical Garden", z:"Centro|Centre", d:"1,5 ore|1.5 hrs", tags:["benessere"], sub:"verde",
   p:"Pini storici, collezioni botaniche e un orto che profuma di macchia mediterranea nel cuore della città.|Historic pines, botanical collections and a garden smelling of Mediterranean scrub in the city's heart.",
   tip:"Ombra fresca nelle ore calde: la pausa perfetta tra Castello e Anfiteatro.|Cool shade in the hot hours: the perfect pause between Castello and the Amphitheatre."},
  {t:"Spa vista golfo|Gulf-view spa", z:"Poetto|Poetto", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Piscine, saune e massaggi con il golfo in fondo alla vasca: il day pass dei grandi hotel.|Pools, saunas and massages with the gulf at the end of the pool: the big hotels' day pass.",
   tip:"Il day pass ferial costa spesso metà del weekend.|The weekday day pass often costs half the weekend one."},

  /* — SPORT — */
  {t:"Partita del Cagliari|A Cagliari match", z:"Unipol Domus|Unipol Domus", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Il Cagliari e il suo pubblico caldo: il calcio come si vive nelle isole.|Cagliari and its warm crowd: football as the islands live it.",
   tip:"Nei giorni senza partita il tour dello stadio si prenota online.|On non-match days the stadium tour can be booked online."},
  {t:"Concerti all'Anfiteatro romano|Concerts at the Roman amphitheatre", z:"Buoncammino|Buoncammino", d:"sera|evening", tags:["sport"], sub:"eventi",
   p:"Il palco più antico della città: concerti sotto le stelle, dentro pietre duemila anni.|The city's oldest stage: concerts under the stars, inside two-thousand-year-old stones.",
   tip:"Scarpe comode: si sale all'andata e si scende nel buio della città alta.|Comfy shoes: uphill going, downhill through the dark of the upper town."},
  {t:"SUP e kayak a Calamosca|SUP & kayak at Calamosca", z:"Calamosca|Calamosca", d:"3 ore|3 hrs", tags:["sport"], sub:"partecipa",
   p:"Pagaiare nella baia sotto il faro, con la Sella del Diavolo a guardia: il mare come palestra.|Paddle in the bay below the lighthouse, the Sella del Diavolo standing guard: the sea as a gym.",
   tip:"Il mattino è piatto e trasparente: prenota il primo slot.|Mornings are flat and transparent: book the first slot."},
  {t:"Vela nel golfo degli Angeli|Sailing in the Gulf of Angels", z:"Marina|Marina", d:"mezza giornata|half day", tags:["sport"], sub:"partecipa",
   p:"Uscire dal porto e guardare Cagliari dall'acqua: la città si legge meglio dal mare.|Leaving the harbour and watching Cagliari from the water: the city reads better from the sea.",
   tip:"Con vento leggero chiedi il timone: quasi sempre te lo lasciano provare.|In light wind ask for the helm: they'll almost always let you try."},

  /* — LENTO — */
  {t:"Marina: il quartiere del porto|Marina: the port district", z:"Marina|Marina", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Il quartiere dei mercanti, oggi dei cocktail: strade dritte, botteghe e porto a due passi.|The merchants' district, today's cocktails: straight streets, shops and the port steps away.",
   tip:"Il passeggio serale dei cagliaritani: entra nel flusso.|The locals' evening stroll: join the flow."},
  {t:"Villanova tra orti e vicoli|Villanova among gardens & alleys", z:"Villanova|Villanova", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Il quartiere dei contadini diventato il più tranquillo del centro: vicoli, orti e chiese piccole.|The farmers' district turned the quietest in the centre: alleys, gardens and small churches.",
   tip:"La domenica le campane fanno da colonna sonora: la passeggiata perfetta.|On Sundays the bells provide the soundtrack: the perfect stroll."},
  {t:"Molentargius: fenicotteri in città|Molentargius: flamingos in town", z:"Molentargius|Molentargius", d:"2 ore|2 hrs", tags:["lento","benessere"], sub:"parchi",
   p:"Il parco delle saline: fenicotteri rosa a un passo dal centro, tra pile e canne.|The salt-marsh park: pink flamingos steps from the centre, among pools and reeds.",
   tip:"Il tramonto è l'ora giusta: i fenicotteri si accendono di rosa.|Sunset is the right hour: the flamingos glow pink."},
  {t:"Sella del Diavolo: trekking urbano|Sella del Diavolo: urban trekking", z:"Calamosca|Calamosca", d:"3 ore|3 hrs", tags:["lento"], sub:"lente",
   p:"Il promontorio a forma di sella: archeologia, macchia mediterranea e strapiombo sul mare.|The saddle-shaped headland: archaeology, Mediterranean scrub and cliffs over the sea.",
   tip:"Dalla cima si abbraccia tutto il golfo: l'ultimo sguardo prima di scendere.|From the top you embrace the whole gulf: one last look before descending."},

  /* — FORMATIVO — */
  {t:"Corso di culurgiones|A culurgiones class", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Impara a chiudere i ravioli 'a spiga': un gesto antico che le dita non dimenticano.|Learn to seal the 'wheat-ear' ravioli: an old gesture your fingers won't forget.",
   tip:"Al termine si mangia ciò che hai chiuso: il pranzo è incluso.|At the end you eat what you sealed: lunch included."},
  {t:"Laboratorio di pane carasau|Carasau bread workshop", z:"Fuori porta|Out of town", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Impastare, stendere fino al velo e vedere il pane gonfiarsi nel forno a legna.|Kneading, rolling to a veil and watching the bread puff up in the wood oven.",
   tip:"Torni a casa con il tuo foglio di carasau: souvenir croccante.|You go home with your own sheet of carasau: a crisp souvenir."},
  {t:"Barumini: la civiltà nuragica|Barumini: the nuragic civilisation", z:"Su Nuraxi (fuori porta)|Su Nuraxi (out of town)", d:"mezza giornata|half day", tags:["formativo","cultura"], sub:"guide",
   p:"Su Nuraxi, patrimonio UNESCO: la fortezza di pietra della Sardegna che venne prima di tutti.|UNESCO-listed Su Nuraxi: the stone fortress of the Sardinia that came before everyone.",
   tip:"Un'ora di auto: parti presto e unisci la Casa Zapata nel borgo.|An hour's drive: leave early and add Casa Zapata in the village."}
];'''

CAGLIARI_ITINERARI = r'''const ITINERARI = {
  cultura:[
    {ora:"08:30", t:"Castello all'apertura", p:"Le torri prima delle file, il golfo che si sveglia sotto le mura.|The towers before the queues, the gulf waking below the walls."},
    {ora:"13:00", t:"Pranzo a Marina", p:"Culurgiones in trattoria: la meridiana delle papille.|Culurgiones in a trattoria: the taste buds' sundial."},
    {ora:"15:30", t:"Cittadella dei Musei", p:"Bronzetti e papiri: tre musei in una piazza.|Bronzes and papyri: three museums in one square."},
    {ora:"19:30", t:"Bastione Saint Remy", p:"Il tramonto dal salone: il golfo acceso e la città che applaude.|Sunset from the salon: the gulf aglow and the city applauding."}
  ],
  business:[
    {ora:"09:00", t:"Meeting alla Fiera o in centro", p:"Tutto a un quarto d'ora da tutto: la città del lavoro comodo.|Everything fifteen minutes from everything: the city of easy work."},
    {ora:"13:30", t:"Pranzo rapido in Marina", p:"Fainè e via: dieci minuti, qualità piena.|Fainè and off you go: ten minutes, full quality."},
    {ora:"16:00", t:"Pausa al Bastione", p:"La vista come antidoto alle slide.|The view as the antidote to slides."},
    {ora:"19:30", t:"Aperitivo vista golfo", p:"Terrazza, vermentino e il lavoro già lontano.|Terrace, vermentino and work already far away."}
  ],
  food:[
    {ora:"08:00", t:"Caffè e dolcetto al banco", p:"In piedi, come i cagliaritani.|Standing up, like the locals."},
    {ora:"10:00", t:"Mercato di San Benedetto", p:"Il banco del pesce: guarda, annusa, domanda.|The fish counter: look, sniff, ask."},
    {ora:"13:00", t:"Culurgiones in trattoria", p:"La spiga si chiude davanti a te, se sei fortunato.|The wheat-ear is sealed before you, if you're lucky."},
    {ora:"18:30", t:"Fainè e tramonto al Poetto", p:"Cecina calda e la Sella che diventa viola.|Warm chickpea flatbread and the Sella turning purple."}
  ],
  religioso:[
    {ora:"07:00", t:"Messa a Bonaria", p:"Il santuario dei naviganti, prima delle autopendolari.|The seafarers' sanctuary, before the commuters."},
    {ora:"09:00", t:"Duomo e giro di Castello", p:"La cattedrale dentro la cittadella di pietra.|The cathedral inside the stone citadel."},
    {ora:"12:30", t:"Pranzo a Stampace", p:"Poco turistico, tutto vero: mangia dove mangiano i vicoli.|Few tourists, all real: eat where the alleys eat."},
    {ora:"16:00", t:"Cripta di Santa Restituta", p:"Chiudi sotto la città, nel silenzio di Sant'Efisio.|End beneath the city, in the silence of Sant'Efisio."}
  ],
  benessere:[
    {ora:"08:00", t:"Alba e bagno al Poetto", p:"Il mattino ha l'acqua piatta: nuota prima di tutto.|Morning has flat water: swim before anything."},
    {ora:"10:30", t:"Spa vista golfo", p:"Saune e massaggi con il mare in fondo alla vasca.|Saunas and massages with the sea at the end of the pool."},
    {ora:"13:30", t:"Pranzo di pesce a Marina", p:"Leggero e locale: quello che è arrivato stamattina.|Light and local: what came in this morning."},
    {ora:"17:00", t:"Orto Botanico", p:"Ombra, palme e profumo di macchia: la discesa dolce.|Shade, palms and scrub-scent: the sweet descent."}
  ],
  sport:[
    {ora:"09:00", t:"Tour dello stadio", p:"Unipol Domus a porte chiuse: spogliatoi e tribune.|Unipol Domus behind closed doors: dressing rooms and stands."},
    {ora:"11:30", t:"Vela nel golfo", p:"Due ore di vento e la città vista dall'acqua.|Two hours of wind and the city seen from the water."},
    {ora:"13:00", t:"Pranzo veloce in Marina", p:"Frittura da asporto: carburante da curva.|Fried takeaway: terrace-grade fuel."},
    {ora:"18:00", t:"Partita del Cagliari", p:"Il pubblico isolano: caldo anche a dicembre.|The island crowd: warm even in December."}
  ],
  lento:[
    {ora:"08:30", t:"Caffè a Villanova", p:"Il quartiere che si sveglia tra orti e campane.|The district waking among gardens and bells."},
    {ora:"10:00", t:"Molentargius e fenicotteri", p:"Rosa shocking a un passo dal centro: la passeggiata che non ti aspetti.|Shocking pink steps from the centre: the walk you don't expect."},
    {ora:"12:30", t:"Marina a piedi", p:"Il quartiere del porto, piano, salutando.|The port district, slowly, greeting people."},
    {ora:"18:00", t:"Sella del Diavolo al tramonto", p:"La camminata che finisce a strapiombo sul mare.|The walk that ends on a cliff over the sea."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di culurgiones", p:"Farina, patate, menta e le dita che imparano la spiga.|Flour, potatoes, mint and fingers learning the wheat-ear."},
    {ora:"13:00", t:"Mangi la tua pasta", p:"Il pranzo migliore è quello che hai chiuso tu.|The best lunch is the one you sealed yourself."},
    {ora:"15:30", t:"Laboratorio di pane carasau", p:"Stendere fino al velo: la stessa fatica dei pastori.|Rolling to a veil: the shepherds' same effort."},
    {ora:"18:00", t:"Sebadas e vernaccia", p:"Dolce fritto e vino ambrato: chiudi da persona istruita.|Fried sweets and amber wine: end like an educated person."}
  ]
};'''

CAGLIARI_MARCO = r'''const MARCO = [
  {k:["coda","file","prenot","bigliett","queue","ticket","book","skip"],
   a:"A Cagliari le code sono rare: musei e siti si visitano con calma. Le eccezioni: i battelli per Villasimius in estate e i tour a Nora in alta stagione, che conviene prenotare il giorno prima.|In Cagliari queues are rare: museums and sites are visited calmly. The exceptions: boats to Villasimius in summer and tours to Nora in high season, best booked the day before."},
  {k:["fenicotter","flamingo","molentargius"],
   a:"Parco Molentargius, a due passi dal centro: fenicotteri rosa tra le saline. Vai verso il tramonto, con la luce bassa si accendono di rosa. E l'ingresso costa pochissimo.|Molentargius park, steps from the centre: pink flamingos among the salt pans. Go at sunset, in low light they glow pink. And entry costs very little."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro è tranquillo anche di notte. Occhio alle borse lasciate sull'asciugamano al Poetto e agli scooter in corsa nei vicoli: il resto è relax.|The centre is quiet at night too. Watch bags left on towels at the Poetto and scooters racing the alleys: the rest is relaxation."},
  {k:["taxi","aeroporto","elmas","uber","nap","airport","cab"],
   a:"Da Elmas al centro: 10-15 minuti, chiedi la tariffa prima di salire. In alternativa c'è il bus di linea. In città le app itTaxi o Free Now funzionano bene.|From Elmas to the centre: 10-15 minutes, ask the fare before boarding. There's also the city bus. In town, itTaxi or Free Now apps work well."},
  {k:["acqua","fontanella","borraccia","bere","water","drink","fountain"],
   a:"L'acqua del rubinetto è buona: arriva dai monti. Fontanelle pubbliche nei giardini e lungo le mura: porta la borraccia, d'estate il sole non perdona.|Tap water is good: it comes from the mountains. Public fountains in the gardens and along the walls: bring a bottle, in summer the sun shows no mercy."},
  {k:["metro","bus","muover","ctm","tram","mezz","subway","transport","nora","arst","vesuvio"],
   a:"Metro? Non serve: la città è compatta, si sale e si scende tra i quartieri a piedi. Bus CTM in città, ARST per Nora e i borghi. Chiedi la tessera giornaliera: conviene subito.|Metro? Not needed: the city is compact, you climb and descend between districts on foot. CTM buses in town, ARST for Nora and the villages. Ask for the day pass: it pays off immediately."},
  {k:["cena","orario","ristorant","mangiar","aperto","dinner","eat","restaurant","lunch"],
   a:"Si cena alle 20:30-21:00, e il sabato prenota: le trattorie giuste si riempiono. Regola isolana: se il menù ha le foto in sei lingue, cambia locale.|Dinner at 8:30-9 pm, and book on Saturdays: the right trattorias fill up. Island rule: if the menu has photos in six languages, find another place."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit"],
   a:"Non obbligatoria: al bar gli spicci del resto, al ristorante il 5-10% se sei contento. Nessuno si offende se non lasci nulla.|Not compulsory: small change at the bar, 5-10% at the restaurant if happy. Nobody is offended if you leave nothing."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family"],
   a:"Con i bimbi: bagno al Poetto, fenicotteri a Molentargius, l'Anfiteatro dove immaginare i gladiatori e gelato in via? in centro. La città è una scala gigante: portali a correre.|With kids: a swim at the Poetto, flamingos at Molentargius, the Amphitheatre for gladiator fantasies and gelato in the centre. The city is one giant staircase: let them run."},
  {k:["piogg","piov","rain","weather","wet"],
   a:"Piove poco, ma se capita: Cittadella dei Musei, cripte di Stampace e il mercato coperto di San Benedetto. Il resto della città si fa anche con l'ombrello.|It rarely rains, but if it does: the Museums Citadel, the crypts of Stampace and the covered market of San Benedetto. The rest of the city can be done with an umbrella."},
  {k:["chiesa","vest","copr","spalle","ginocch","duomo","bonaria","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Per Bonaria, il Duomo e le chiese servono spalle e ginocchia coperte. D'estate una sciarpa leggera in borsa: risolto.|For Bonaria, the Cathedral and churches, covered shoulders and knees. In summer a light scarf in your bag: solved."},
  {k:["truff","regal","scam","parchegg","barca"],
   a:"Occhio ai parcheggiatori abusivi attorno al Poetto: se uno ti 'aiuta' e poi chiede un regalino, pochi spicci e basta. E per le gite in barca: accorda il prezzo prima di salire, per iscritto se possibile.|Watch for unofficial parking attendants around the Poetto: if one 'helps' and then asks for a gift, a few coins are enough. For boat trips: agree the price before boarding, in writing if possible."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","filu","vermentino"],
   a:"Il caffè si beve al banco, veloce, e costa poco. Cappuccino solo a colazione, regola ferrea. E se vuoi chiudere da vero sardo: un goccio di filu 'e ferru dopo cena, che nessuno ti obbliga ad apprezzare.|Coffee is drunk at the counter, fast, and costs little. Cappuccino only at breakfast, iron rule. And to end like a true Sardinian: a drop of filu 'e ferru after dinner, which nobody obliges you to enjoy."}
];'''

CAGLIARI_FALLBACK = r'''const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: code, fenicotteri, taxi, Elmas, cena, bambini, pioggia, parcheggi, caffè... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: queues, flamingos, taxi, Elmas, dinner, kids, rain, parking, coffee... or tap a quick question.";'''

CAGLIARI_QUICK = r'''const CHAT_QUICK = [
  "Come evito le code?|How do I skip the queues?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Elmas?|Taxi from Elmas?",
  "Dove vedo i fenicotteri?|Where can I see flamingos?",
  "Cena a che ora?|What time is dinner?"
];'''

CAGLIARI_TESTI = {
    "heroK":  "Guida poliedrica · Cagliari|The many-sided guide · Cagliari",
    "heroP":  "Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dal golfo al Castello, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the gulf to the Castello, a tailor-made itinerary.",
    "footer": "<b>Cagliari Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Cagliari Poliedrica</b> — educational demo · indicative data: always check official sources",
    "info1p": "Niente metro: la città è compatta e si fa a piedi su e giù per i quartieri. Bus CTM in città, ARST per Nora e i borghi. L'aeroporto Elmas è a 10 minuti.|No metro: the city is compact and done on foot, up and down the districts. CTM buses in town, ARST for Nora and villages. Elmas airport is 10 minutes away.",
    "info2p": "Maggio–giugno e settembre–ottobre: luce perfetta e mare caldo. Luglio–agosto caldo forte: al mare si sta, in città si suda.|May–June and September–October: perfect light and calm sea. July–August strong heat: fine at the beach, sweaty in town.",
    "info3p": "Tour a Nora, battelli per Villasimius e tour in barca: prenota un giorno prima in alta stagione. Musei e siti antichi si visitano con calma.|Tours to Nora, boats to Villasimius and boat trips: book a day ahead in high season. Museums and ancient sites are visited calmly.",
    "chatTitolo": "Efisio · il tuo amico sardo|Efisio · your Sardinian friend",
    "chatBtn": "🙋 Chiedi a Efisio|🙋 Ask Efisio",
    "benvenuto": "Ciao! So' Efisio, cagliaritano e sardo verace 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Efisio, a true Cagliaritan and Sardinian 🙋 Ask me anything about the city — or tap a quick question below.",
}

CAGLIARI_PALETTE = """:root{
  --terra:#1F6F8B; --terra-dark:#175973;
  --crema:#FBF7EF; --sabbia:#EEE5D2;
  --oliva:#7D8C5C; --ink:#1F2A33;
}"""

# ================================================================
#  TORINO — dati
# ================================================================

TORINO_SOTTO = r'''const SOTTO = {
  cultura: [
    {id:"musei",   emoji:"🖼️", nome:"Musei e gallerie|Museums & galleries"},
    {id:"palazzi", emoji:"🏛️", nome:"Palazzi e piazze|Palaces & squares"},
    {id:"modern",  emoji:"🏗️", nome:"Torino contemporanea|Contemporary Turin"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e fiere|Congresses & trade fairs"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"torinese",  emoji:"🍝", nome:"Cucina torinese|Turin cuisine"},
    {id:"cioccolato",emoji:"🍫", nome:"Cioccolato e caffè storici|Chocolate & historic cafés"},
    {id:"aperitivo", emoji:"🍹", nome:"Vermouth e aperitivo|Vermouth & aperitivo"},
    {id:"street",    emoji:"🧺", nome:"Mercati e street food|Markets & street food"},
    {id:"alta",      emoji:"🍽️", nome:"Alta cucina|Fine dining"}
  ],
  religioso: [
    {id:"basiliche",  emoji:"⛪",  nome:"Basiliche e cattedrali|Basilicas & cathedrals"},
    {id:"chiese",     emoji:"🕯️", nome:"Chiese barocche|Baroque churches"},
    {id:"pellegrini", emoji:"🥾",  nome:"Santuari e devozioni|Sanctuaries & devotions"}
  ],
  benessere: [
    {id:"spa",   emoji:"💆", nome:"Spa e bagni storici|Spas & historic baths"},
    {id:"verde", emoji:"🌳", nome:"Parchi e colline|Parks & hills"}
  ],
  sport: [
    {id:"calcio",    emoji:"⚽", nome:"Calcio e stadi|Football & stadiums"},
    {id:"eventi",    emoji:"🎪", nome:"Concerti e grandi eventi|Concerts & major events"},
    {id:"partecipa", emoji:"🏃", nome:"Sport da praticare|Sports to play"}
  ],
  lento: [
    {id:"quartieri", emoji:"🏘️", nome:"Quartieri autentici|Authentic neighborhoods"},
    {id:"parchi",    emoji:"🌊", nome:"Fiume e parchi|River & parks"},
    {id:"lente",     emoji:"🚲", nome:"Mobilità dolce|Soft mobility"}
  ],
  formativo: [
    {id:"cucina",      emoji:"👩‍🍳", nome:"Corsi di cucina|Cooking classes"},
    {id:"artigianato", emoji:"🎨", nome:"Laboratori artigianali|Craft workshops"},
    {id:"guide",       emoji:"📣", nome:"Visite guidate e masterclass|Guided tours & masterclasses"}
  ]
};'''

TORINO_TIPI = r'''const TIPI = [
  {id:"ristorante",   emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",    emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",      emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"caffè",        emoji:"☕", nome:"Caffè storico|Historic café"},
  {id:"cioccolateria",emoji:"🍫", nome:"Cioccolateria|Chocolate shop"},
  {id:"bar",          emoji:"🍹", nome:"Bar|Bar"},
  {id:"mercato",      emoji:"🧺", nome:"Mercato|Market"}
];'''

TORINO_ESPERIENZE = r'''const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Museo Egizio|The Egyptian Museum", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["cultura"], sub:"musei",
   p:"Il museo egizio più antico del mondo: la Galleria del Re, sarcofagi e papiri.|The world's oldest Egyptian museum: the Gallery of the King, sarcophagi and papyri.",
   tip:"Prenota online con fascia oraria: nei weekend si esaurisce.|Book online with a time slot: it sells out on weekends."},
  {t:"Mole Antonelliana e Museo del Cinema|The Mole & the Cinema Museum", z:"Centro|Centre", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"musei",
   p:"Il simbolo della città: il tempio del cinema e l'ascensore panoramico che sale a 85 metri.|The city's symbol: the temple of cinema and the panoramic lift rising 85 metres.",
   tip:"Stenditi sulle poltrone della sala tempio: il film è la Mole stessa.|Lie back on the temple-hall armchairs: the film is the Mole itself."},
  {t:"MAUTO: il Museo dell'Automobile|MAUTO: the Automobile Museum", z:"Po|Po", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"musei",
   p:"Uno dei più bei musei dell'auto al mondo: dalle carrozze alle concept, il Novecento in movimento.|One of the world's finest car museums: from carriages to concepts, the century in motion.",
   tip:"Anche i non appassionati restano: due ore scappano.|Even non-fans stay: two hours fly."},
  {t:"Palazzo Reale e Giardini Reali|The Royal Palace & Gardens", z:"Piazza Castello|Piazza Castello", d:"2 ore|2 hrs", tags:["cultura"], sub:"palazzi",
   p:"La reggia dei Savoia: sale sfarzose e, sopra, i giardini ritrovati.|The Savoy palace: lavish rooms and, above, the rediscovered gardens.",
   tip:"Tra le piante dei giardini spunta Palazzo Madama: la città vista dall'alto.|Among the garden trees Palazzo Madama pops up: the city from above."},
  {t:"Palazzo Madama e l'Arte Antica|Palazzo Madama & Ancient Art", z:"Piazza Castello|Piazza Castello", d:"2 ore|2 hrs", tags:["cultura"], sub:"palazzi",
   p:"Fortezza medievale con facciata barocca di Juvarra: dentro, il Museo di Arte Antica.|Medieval fortress with Juvarra's baroque façade: inside, the Ancient Art museum.",
   tip:"Dalla torre medievale la vista sulla piazza vale la salita.|From the medieval tower the view over the square is worth the climb."},
  {t:"Lingotto: la pista sul tetto|Lingotto: the rooftop track", z:"Lingotto|Lingotto", d:"2 ore|2 hrs", tags:["cultura","business"], sub:"modern",
   p:"La fabbrica FIAT riconvertita a città: sul tetto, la pista di collaudo dove le auto correvano.|The FIAT factory turned city: on the roof, the test track where cars once raced.",
   tip:"Oggi la pista si cammina: il vento lassù è cinema.|Today you can walk the track: the wind up there is cinema."},

  /* — BUSINESS — */
  {t:"Lingotto Fiere e congressi|Lingotto fairs & congresses", z:"Lingotto|Lingotto", d:"mezza giornata|half day", tags:["business"], sub:"congressi",
   p:"L'erede della fabbrica: fiere, saloni e il centro congressi sotto la pista.|Heir to the factory: trade fairs, salons and the congress centre beneath the track.",
   tip:"La metro arriva in sala convegno: Lingotto ha la sua fermata.|Metro to the congress hall: Lingotto has its own stop."},
  {t:"Aperitivo dopo l'ufficio|The after-office aperitivo", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"La città che ha inventato l'aperitivo: vermouth sotto i portici, prima di cena.|The city that invented the aperitivo: vermouth under the portici, before dinner.",
   tip:"Dalle 18:30 i buffet si riempiono: l'apericena è un'istituzione.|From 6:30 pm the buffets fill up: apericena is an institution."},
  {t:"Bleisure: le Langhe del Barolo|Bleisure: the Barolo Langhe", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più del meeting diventa vigneto: Barolo, torri e tartufo a un'ora dalla città.|The meeting's extra day becomes vineyard: Barolo, towers and truffle an hour from the city.",
   tip:"Treno fino ad Alba, poi taxi: le cantine vanno prenotate.|Train to Alba, then taxi: book the wineries ahead."},

  /* — ENOGASTRONOMICO — */
  {t:"Agnolotti e tajarin|Agnolotti & tajarin", z:"Centro|Centre", d:"pranzo|lunch", tags:["food"], sub:"torinese", tipo:"trattoria",
   p:"Il pranzo della domenica: agnolotti 'col dito' e tajarin tirati a mano, oro d'uovo.|Sunday's lunch: 'finger-pinched' agnolotti and hand-cut tajarin, egg-yolk gold.",
   tip:"I tajarin vogliono il burro: se aggiungi il tartufo, cambiano categoria.|Tajarin wants butter: add truffle and they change category."},
  {t:"Bagna cauda e bunet|Bagna cauda & bunet", z:"Centro|Centre", d:"sera|evening", tags:["food"], sub:"torinese", tipo:"osteria",
   p:"La bagna cauda d'autunno: acciughe e aglio in cui tuffare le verdure, e il budino di cioccolato a chiudere.|Autumn's bagna cauda: anchovies and garlic to dunk vegetables in, and the chocolate pudding to close.",
   tip:"Ordina il bunet solo dopo: se lo vedi sul menù di primavera, ottimo segno comunque.|Order the bunet afterwards: seeing it on a spring menu is still a great sign."},
  {t:"Bicerin al caffè storico|Bicerin at a historic café", z:"Centro|Centre", d:"30 min|30 min", tags:["food","cultura"], sub:"cioccolato", tipo:"caffè",
   p:"Caffè, cioccolato e crema a strati: la bevanda dei caffè storici, in tazza piccola.|Coffee, chocolate and cream in layers: the historic cafés' drink, in a small cup.",
   tip:"Il bicerin non si mescola: si beve a strati, come vuole il rito.|Don't stir the bicerin: drink it in layers, as the ritual demands."},
  {t:"Gianduiotto e cioccolaterie|Gianduiotto & chocolate shops", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["food"], sub:"cioccolato", tipo:"cioccolateria",
   p:"La città che insegnò al mondo il cioccolato solido e inventò il gianduiotto: pasticcerie d'epoca.|The city that taught the world eating chocolate and invented the gianduiotto: Belle Époque shops.",
   tip:"D'inverno il cioccolato caldo è denso come una crema: ordina la tazza grande.|In winter the hot chocolate is cream-thick: order the large cup."},
  {t:"Vermouth: l'aperitivo di Torino|Vermouth: Turin's aperitivo", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["food","business"], sub:"aperitivo", tipo:"bar",
   p:"Qui nacque il vermouth: bianco, rosso e Punt e Mes, con l'oliva sopra.|Vermouth was born here: bianco, rosso and Punt e Mes, with the olive on top.",
   tip:"Molti bar hanno il vermut di propria ricetta: chiedilo.|Many bars have their own vermouth recipe: ask for it."},
  {t:"Apericena e buffet|Apericena & buffets", z:"San Salvario|San Salvario", d:"sera|evening", tags:["food","lento"], sub:"aperitivo", tipo:"bar",
   p:"L'aperitivo che diventa cena: buffet a volontà con il drink d'accompagnamento.|The aperitivo that becomes dinner: all-you-can-eat buffet with your drink.",
   tip:"A San Salvario ogni locale ha la sua formula: confrontane due.|In San Salvario every place has its own formula: compare two."},
  {t:"Porto Palazzo: il grande mercato|Porto Palazzo: the great market", z:"Porta Palazzo|Porta Palazzo", d:"2 ore|2 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Il più grande mercato all'aperto d'Europa: colori, bancarelle e il mondo in una piazza.|Europe's largest open-air market: colours, stalls and the world in one square.",
   tip:"Il mercato vive la mattina: la sera il quartiere cambia pelle.|The market lives in the morning: in the evening the district changes skin."},
  {t:"Balon e Aurora: il sabato dell'usato|Balon & Aurora: the Saturday flea market", z:"Aurora|Aurora", d:"2 ore|2 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Il sabato di Aurora: il Balon dell'usato, cibi di mezzo mondo e il fiume a fianco.|Aurora's Saturday: the Balon flea market, foods from half the world and the river alongside.",
   tip:"Ogni sabato il mercatino; il secondo del mese è quello grande.|Every Saturday the flea market; the second of the month is the big one."},
  {t:"Alta cucina: la Torino creativa|Fine dining: creative Turin", z:"Centro|Centre", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"Tra le capitali della cucina d'autore in Italia: tecnica, territorio e i vini delle colline.|Among Italy's author-cuisine capitals: technique, territory and the wines of the hills.",
   tip:"Il menu degustazione racconta il Piemonte: fai abbinare i vini.|The tasting menu tells Piedmont: have the wines paired."},

  /* — RELIGIOSO — */
  {t:"Il Duomo e la Sindone|The Cathedral & the Shroud", z:"Centro|Centre", d:"1 ora|1 hr", tags:["religioso","cultura"], sub:"basiliche",
   p:"La cappella della Sindone di Guarini, risorta dal grande incendio: il mistero dietro il vetro.|Guarini's Chapel of the Shroud, risen from the great fire: the mystery behind the glass.",
   tip:"La Sindone si espone raramente: la cappella però si visita, e vale il viaggio.|The Shroud is rarely displayed: the chapel, however, can be visited, and is worth the trip."},
  {t:"Superga col tram a dentiera|Superga by cog railway", z:"Superga|Superga", d:"mezza giornata|half day", tags:["religioso","cultura"], sub:"basiliche",
   p:"Il tram a dentiera del 1884 sale al colle: la basilica reale e la pianura dalle Alpi in poi.|The 1884 rack tram climbs the hill: the royal basilica and the plain from the Alps on.",
   tip:"Dietro la basilica, il memoriale del Grande Torino: la visita più commovente della città.|Behind the basilica, the Grande Torino memorial: the city's most moving visit."},
  {t:"San Lorenzo: la Torino barocca|San Lorenzo: baroque Turin", z:"Centro|Centre", d:"45 min|45 min", tags:["religioso","cultura"], sub:"chiese",
   p:"Il capolavoro del Guarini: una cupola intrecciata di costole, luce e aritmetica.|Guarini's masterpiece: a dome woven of ribs, light and arithmetic.",
   tip:"Alza gli occhi: la geometria della cupola ti fa girare la testa.|Look up: the dome's geometry will make your head spin."},
  {t:"La Consolata: il cuore dei torinesi|The Consolata: Turin's heart", z:"Centro|Centre", d:"1 ora|1 hr", tags:["religioso"], sub:"pellegrini",
   p:"Il santuario più amato: mille ex voto e la Madonna scura sull'altare.|The city's best-loved sanctuary: a thousand ex-votos and the dark Madonna on the altar.",
   tip:"Il 20 giugno la festa riempie il quartiere: la città abbraccia la sua patrona.|On 20 June the festival fills the district: the city embraces its patroness."},

  /* — BENESSERE — */
  {t:"Spa e hammam storici|Spas & historic hammams", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Hammam d'epoca e spa d'autore: vapore, quiete e il rumore della città che resta fuori.|Historic hammams and design spas: steam, quiet and the city's noise left outside.",
   tip:"Prenota con anticipo: gli hammam storici sono piccoli e pieni.|Book ahead: the historic hammams are small and full."},
  {t:"Parco del Valentino e Borgo Medievale|The Valentino park & Medieval village", z:"Valentino|Valentino", d:"2 ore|2 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Il parco romantico lungo il Po, con il castello e il Borgo Medievale ricostruito nel 1884.|The romantic park along the Po, with the castle and the 1884-rebuilt Medieval village.",
   tip:"Entra nel Borgo Medievale: un tuffo nel Medioevo senza uscire dalla città.|Enter the Medieval village: a dive into the Middle Ages without leaving the city."},
  {t:"La collina e le vigne|The hill & the vineyards", z:"Collina|The hill", d:"3 ore|3 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Sopra la città, le vigne della Collina Torinese: sentieri tra i filari con la Mole in vista.|Above the city, Collina Torinese vineyards: trails among the rows with the Mole in view.",
   tip:"Alcune cantine della collina accolgono visite e assaggi: prenota.|Some hill wineries welcome visits and tastings: book ahead."},

  /* — SPORT — */
  {t:"Allianz Stadium e J-Museum|Allianz Stadium & the J-Museum", z:"Torino Nord|North Turin", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"La casa della Juventus: lo stadio di nuova generazione e il museo dei trofei.|Juventus's home: the new-generation stadium and the trophy museum.",
   tip:"Il tour si prenota online: nei giorni di partita il percorso cambia.|Book the tour online: on match days the route changes."},
  {t:"Il derby della Mole|The Derby della Mole", z:"Olimpico Grande Torino|Olimpico Grande Torino", d:"sera|evening", tags:["sport"], sub:"calcio",
   p:"Juventus-Torino: la partita che divide le famiglie: bianconero o granata, si sceglie da bambini.|Juventus-Torino: the match that splits families: black-and-white or maroon, chosen in childhood.",
   tip:"All'Olimpico si arriva a piedi dal centro: la camminata pre-partita fa parte del rito.|The Olimpico is a walk from the centre: the pre-match stroll is part of the ritual."},
  {t:"PalaAlpitour e i grandi concerti|PalaAlpitour & the big concerts", z:"Lingotto|Lingotto", d:"sera|evening", tags:["sport"], sub:"eventi",
   p:"Uno dei grandi palazzetti d'Europa: i grandi concerti a due passi dal Lingotto.|One of Europe's great arenas: big concerts steps from the Lingotto.",
   tip:"Al termine la metro è affollata ma scorre: la città non si ferma per un concerto.|At the end the metro is crowded but flows: the city doesn't stop for a concert."},
  {t:"Corsa e bici lungo il Po|Running & cycling by the Po", z:"Murazzi|Murazzi", d:"1,5 ore|1.5 hrs", tags:["sport","lento"], sub:"partecipa",
   p:"Le rive del Po sono la pista della città: runner, ciclisti e canottieri.|The banks of the Po are the city's track: runners, cyclists and rowers.",
   tip:"All'alba la nebbia sul fiume: l'ora più torinese della giornata.|At dawn the fog on the river: the most Turinese hour of the day."},

  /* — LENTO — */
  {t:"Quadrilatero Romano di sera|The Quadrilatero Romano by night", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["lento","food"], sub:"quartieri",
   p:"Il cuore della Torino romana: strade lastricate, osterie e il polso serale della città.|The heart of Roman Turin: cobbled lanes, osterie and the city's evening pulse.",
   tip:"Cerca la Porta Palatina: la città romana entrava da qui.|Look for the Porta Palatina: the Roman city entered here."},
  {t:"San Salvario: il quartiere del mondo|San Salvario: the world's district", z:"San Salvario|San Salvario", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Il quartiere dove Torino incontra il mondo: cucine di ogni continente e musica fino a notte.|The district where Turin meets the world: cuisines from every continent and music into the night.",
   tip:"A cena scegli un continente: il menù è il mondo.|At dinner pick a continent: the menu is the world."},
  {t:"Murazzi: il Po dei torinesi|Murazzi: the locals' Po", z:"Murazzi|Murazzi", d:"2 ore|2 hrs", tags:["lento"], sub:"parchi",
   p:"Gli archi sul fiume: studi, librerie e le fondamenta dove la città si rilassa.|The arches on the river: studios, bookshops and the banks where the city relaxes.",
   tip:"D'estate la sera gli archi si accendono: le fondamenta si riempiono.|On summer evenings the arches light up: the riverbanks fill up."},
  {t:"In bici da Valentino alla Pellerina|Cycling from Valentino to La Pellerina", z:"La Pellerina|La Pellerina", d:"3 ore|3 hrs", tags:["lento"], sub:"lente",
   p:"La corona verde della città: si pedala di parco in parco senza mai incontrare una macchina.|The city's green crown: park-to-park cycling without ever meeting a car.",
   tip:"La Pellerina è il parco più grande della città: la merenda se la merita.|La Pellerina is the city's largest park: it has earned its snack."},

  /* — FORMATIVO — */
  {t:"Corso di agnolotti|An agnolotti class", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Il gesto del 'plin': imparare a pizzicare la pasta come le nonne piemontesi.|The 'plin' gesture: learning to pinch pasta like Piedmont grandmothers.",
   tip:"Al termine si mangia: il pranzo è incluso.|At the end you eat: lunch included."},
  {t:"Laboratorio di cioccolato|A chocolate workshop", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Temperare, modellare e incartare: nasce il tuo gianduiotto.|Tempering, moulding, wrapping: your own gianduiotto is born.",
   tip:"Torni a casa con la tua tavoletta: souvenir che raramente arriva a casa.|You go home with your own bar: a souvenir that rarely makes it home."},
  {t:"Torino esoterica: il tour|Esoteric Turin: the tour", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"guide",
   p:"La Torino esoterica: simboli, porte alchemiche e storie raccontate a bassa voce.|Esoteric Turin: symbols, alchemical doors and tales told in a low voice.",
   tip:"Di sera il giro cambia pelle: Torino si fa più misteriosa.|By night the walk changes skin: Turin grows more mysterious."}
];'''

TORINO_ITINERARI = r'''const ITINERARI = {
  cultura:[
    {ora:"08:30", t:"Egizio all'apertura", p:"Il museo quasi vuoto: i faraoni prima della folla.|The museum almost empty: the pharaohs before the crowd."},
    {ora:"13:00", t:"Pranzo nel Quadrilatero", p:"Osteria antica: tajarin al burro e mezza di barbera.|An old osteria: buttered tajarin and half a carafe of barbera."},
    {ora:"15:00", t:"Palazzo Reale e Madama", p:"Due regge in una piazza: i Savoia fanno sfoggio.|Two palaces in one square: the Savoys showing off."},
    {ora:"19:30", t:"Mole al tramonto e aperitivo", p:"La cupola che si accende, poi il vermouth sotto i portici.|The dome lighting up, then vermouth under the portici."}
  ],
  business:[
    {ora:"09:00", t:"Fiera o meeting in centro", p:"Lingotto o città: entrambi a colpo di metro o taxi.|Lingotto or the centre: both one metro ride or taxi away."},
    {ora:"13:30", t:"Business lunch in trattoria", p:"Agnolotti in trenta minuti: la pausa che sa di domenica.|Agnolotti in thirty minutes: the pause that tastes of Sunday."},
    {ora:"16:00", t:"Pausa: Palazzo Reale", p:"Due ore di reggia come antidoto alle slide.|Two hours of palace as the antidote to slides."},
    {ora:"19:30", t:"Aperitivo in centro", p:"Vermuth della casa e buffet: il rito torinese.|House vermouth and buffet: the Turinese ritual."}
  ],
  food:[
    {ora:"08:00", t:"Brioche al caffè storico", p:"Specchi, velluti e la colazione dei torinesi doc.|Mirrors, velvet and true-Turinese breakfast."},
    {ora:"10:30", t:"Porto Palazzo", p:"Il mercato più grande d'Europa: guarda, assaggia, chiedi.|Europe's biggest market: look, taste, ask."},
    {ora:"13:00", t:"Agnolotti in trattoria", p:"Il plin si chiude davanti a te: buon segno.|The plin is pinched before you: good sign."},
    {ora:"18:30", t:"Vermouth e apericena", p:"Il buffet che sostituisce la cena: istituzione locale.|The buffet replacing dinner: a local institution."}
  ],
  religioso:[
    {ora:"07:45", t:"Messa al Duomo", p:"La cappella della Sindone all'alba: silenzio e pietra.|The Shroud chapel at dawn: silence and stone."},
    {ora:"09:30", t:"La Consolata", p:"Il santuario del cuore torinese: mille ex voto.|The sanctuary of Turin's heart: a thousand ex-votos."},
    {ora:"12:30", t:"Pranzo e San Lorenzo", p:"La cupola del Guarini dopo il tajarin: digestione verticale.|Guarini's dome after tajarin: vertical digestion."},
    {ora:"16:00", t:"Tram a dentiera per Superga", p:"Sale lentissimo: la vista cresce a ogni curva.|It climbs ever so slowly: the view grows with every bend."}
  ],
  benessere:[
    {ora:"08:30", t:"Camminata al Valentino", p:"Il Po, il castello e il Borgo Medievale: partire lento.|The Po, the castle and the Medieval village: starting slow."},
    {ora:"10:30", t:"Hammam o spa", p:"Vapore d'epoca: il rumore della città resta fuori.|Period steam: the city's noise stays outside."},
    {ora:"13:30", t:"Pranzo leggero in centro", p:"Vitello tonnato, leggero come si può in Piemonte.|Vitello tonnato, as light as Piedmont allows."},
    {ora:"17:00", t:"Collina e vigne", p:"I filari sopra la città e la Mole in lontananza.|The rows above the city and the Mole in the distance."}
  ],
  sport:[
    {ora:"09:00", t:"Tour Allianz e J-Museum", p:"Spogliatoi, campo, trofei: la storia juventina a porte chiuse.|Dressing rooms, pitch, trophies: Juve's story behind closed doors."},
    {ora:"11:30", t:"MAUTO", p:"Il secolo dell'auto: da bere il caffè accanto a una Bugatti.|The car century: coffee next to a Bugatti."},
    {ora:"13:00", t:"Pranzo sportivo", p:"Carboidrati da stadio: la città li cucina bene.|Stadium-grade carbs: the city cooks them well."},
    {ora:"18:00", t:"Partita di Juve o Toro", p:"Bianconero o granata: il teatro cambia, la passione no.|Black-and-white or maroon: the theatre changes, the passion doesn't."}
  ],
  lento:[
    {ora:"08:30", t:"Caffè nel Quadrilatero", p:"Il risveglio del quartiere romano, banco e bicchieri.|The Roman quarter waking up, counter and glasses."},
    {ora:"10:00", t:"Sotto i portici", p:"Diciotto chilometri di soffitti: la passeggiata coperta più bella d'Europa.|Eighteen kilometres of ceilings: Europe's finest covered walk."},
    {ora:"12:30", t:"Murazzi e il Po", p:"Il fiume dei torinesi: archi, libri e fondamenta.|The Torinese river: arches, books and banks."},
    {ora:"18:00", t:"San Salvario di sera", p:"Il quartiere si accende: musica e cucine del mondo.|The district lights up: music and world cuisines."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di agnolotti", p:"Il plin si impara con le dita: tre ore di gesto antico.|The plin is learned by hand: three hours of old gesture."},
    {ora:"13:00", t:"Mangi i tuoi agnolotti", p:"Il pranzo migliore è quello che hai chiuso tu.|The best lunch is the one you sealed yourself."},
    {ora:"15:30", t:"Laboratorio di cioccolato", p:"Tempera, modella, incarta: gianduiotto fatto in casa.|Temper, mould, wrap: homemade gianduiotto."},
    {ora:"18:00", t:"Torino esoterica di sera", p:"Porte alchemiche e storie a bassa voce: la città nera.|Alchemical doors and low-voiced tales: the black city."}
  ]
};'''

TORINO_MARCO = r'''const MARCO = [
  {k:["coda","file","prenot","bigliett","queue","ticket","book","skip","egizio","egyptian"],
   a:"L'Egizio va prenotato online con fascia oraria: nei weekend e nelle festive si esaurisce. Il Museo del Cinema si compra tranquillamente sul posto, il J-Museum pure.|The Egyptian Museum must be booked online with a time slot: it sells out on weekends and holidays. The Cinema Museum can easily be bought on the spot, the J-Museum too."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro è tra i più sicuri d'Italia anche di sera. Occhio ai borseggiatori a Porta Palazzo e nelle stazioni: borsa davanti e tutto liscio.|The centre is among Italy's safest at night too. Watch for pickpockets at Porta Palazzo and at the stations: bag in front and you're smooth."},
  {k:["taxi","aeroporto","caselle","uber","nap","airport","cab","bus"],
   a:"Da Caselle conviene il bus per Porta Nuova e Porta Susa: 40 minuti, pochi euro. Il taxi? Va bene, ma fissa la tariffa prima. In città: Free Now o itTaxi.|From Caselle the bus to Porta Nuova and Porta Susa is best: 40 minutes, a few euros. Taxi? Fine, but fix the fare first. In town: Free Now or itTaxi."},
  {k:["acqua","fontanella","borraccia","bere","water","drink","fountain"],
   a:"L'acqua del rubinetto è ottima: arriva dalle Alpi. Le fontanelle pubbliche sono ovunque: porta la borraccia e risparmi.|Tap water is excellent: it comes from the Alps. Public drinking fountains are everywhere: bring a bottle and save."},
  {k:["metro","bus","muover","gtt","tram","mezz","subway","transport","underground"],
   a:"La metro di Torino è automatica, senza conducente: la prima in Italia, un piccolo spettacolo. E poi i tram storici: muoversi qui è anche scenografia. Biglietti in app o in edicola.|Turin's metro is driverless: the first in Italy, a little show. And the historic trams: moving here is also scenery. Tickets in the app or at newsstands."},
  {k:["cena","orario","ristorant","mangiar","aperto","dinner","eat","restaurant","lunch"],
   a:"L'aperitivo qui è alle 18:30 con buffet, e si cena alle 20:30-21. Le osterie giuste sono piccole: prenota, o alle 20 trovi solo i posti turistici.|Aperitivo here is at 6:30 pm with buffet, and dinner at 8:30-9. The right osterie are small: book, or at 8 you'll find only tourist spots."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit"],
   a:"Non obbligatoria: al bar gli spicci del resto, al ristorante il 5-10% se sei contento. In molti conti il servizio è già incluso.|Not compulsory: small change at the bar, 5-10% at the restaurant if happy. In many bills service is already included."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family","mauto"],
   a:"Con i bimbi: MAUTO (le macchine ipnotizzano chiunque), il Museo del Cinema con l'ascensore panoramico e il Borgo Medievale al Valentino. Combinazione imbattibile.|With kids: MAUTO (the cars hypnotise anyone), the Cinema Museum with the panoramic lift and the Medieval village at Valentino. Unbeatable combo."},
  {k:["piogg","piov","rain","weather","wet","nebbia","fog"],
   a:"A Torino piove più di quanto si pensa, e d'inverno c'è la nebbia: ombrello in borsa quasi sempre. Se piove: Egizio, Museo del Cinema, MAUTO e un caffè storico.|In Turin it rains more than you'd think, and in winter there's fog: umbrella in your bag most days. If it rains: Egyptian Museum, Cinema Museum, MAUTO and a historic café."},
  {k:["chiesa","vest","copr","spalle","ginocch","duomo","superga","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Per il Duomo e Superga servono spalle e ginocchia coperte. D'estate una sciarpa leggera in borsa: risolto in due secondi.|The Cathedral and Superga require covered shoulders and knees. In summer a light scarf in your bag: solved in two seconds."},
  {k:["truff","petizion","braccialett","cordicell","regal","scam"],
   a:"Torino è una città onesta: le truffe classiche sono rare. Occhio al portafoglio a Porta Palazzo e alla stazione, e diffida dei 'menu turistico' con le foto.|Turin is an honest city: classic scams are rare. Watch your wallet at Porta Palazzo and the station, and distrust photo 'tourist menus'."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","bicerin"],
   a:"Cappuccino fino a metà mattina, espresso dopo: regola valida anche qui. E il bicerin si beve a strati, senza mescolare: chi mescola si vede da lontano.|Cappuccino until mid-morning, espresso after: the rule applies here too. And the bicerin is drunk in layers, unstirred: stirrers are spotted from afar."},
  {k:["cioccolat","gianduiot","vermouth","vermut","chocolate","aperitiv"],
   a:"Cioccolato: le pasticcerie storiche del centro sono musei commestibili, e d'inverno il cioccolato caldo è una crema. Vermouth: ordina quello della casa, quasi ogni bar ha la sua ricetta.|Chocolate: the historic chocolate shops in the centre are edible museums, and in winter the hot chocolate is a cream. Vermouth: order the house one, almost every bar has its own recipe."}
];'''

TORINO_FALLBACK = r'''const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: Egizio, taxi, Caselle, metro, cena, bambini, pioggia, cioccolato, bicerin... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: Egyptian Museum, taxi, Caselle, metro, dinner, kids, rain, chocolate, bicerin... or tap a quick question.";'''

TORINO_QUICK = r'''const CHAT_QUICK = [
  "Il Museo Egizio come si prenota?|How do I book the Egyptian Museum?",
  "È sicura la sera?|Is it safe at night?",
  "Come arrivo da Caselle?|How do I get from Caselle?",
  "Dove mangio cioccolato?|Where do I eat chocolate?",
  "Cena a che ora?|What time is dinner?"
];'''

TORINO_TESTI = {
    "heroK":  "Guida poliedrica · Torino|The many-sided guide · Turin",
    "heroP":  "Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dalla Mole ai portici, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the Mole to the portici, a tailor-made itinerary.",
    "footer": "<b>Torino Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Torino Poliedrica</b> — educational demo · indicative data: always check official sources",
    "info1p": "Metro automatica e tram storici: muoversi è facile, biglietti in app GTT o in edicola. Da Caselle: bus per Porta Nuova in 40 minuti. Il centro si fa a piedi sotto i portici.|Driverless metro and historic trams: getting around is easy, tickets in the GTT app or at newsstands. From Caselle: bus to Porta Nuova in 40 minutes. The centre is done on foot under the portici.",
    "info2p": "Aprile–maggio e settembre–ottobre: la città al meglio. D'inverno nebbia e cioccolato caldo: atmosfera da romanzo. Estate: caldo vero, sfrutta i musei.|April–May and September–October: the city at its best. In winter, fog and hot chocolate: novel-like atmosphere. Summer: real heat, make the most of museums.",
    "info3p": "Il Museo Egizio richiede prenotazione online con fascia oraria. Terrazze della Mole e tour dell'Allianz Stadium: qualche settimana di anticipo.|The Egyptian Museum requires online booking with a time slot. Mole lift and Allianz Stadium tour: a few weeks ahead.",
    "chatTitolo": "Carlotta · la tua amica torinese|Carlotta · your Turinese friend",
    "chatBtn": "🙋 Chiedi a Carlotta|🙋 Ask Carlotta",
    "benvenuto": "Ciao! Sono Carlotta, milanese? No: torinese doc 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Carlotta, a true Turinese 🙋 Ask me anything about the city — or tap a quick question below.",
}

TORINO_PALETTE = """:root{
  --terra:#8B6524; --terra-dark:#6E4F1B;
  --crema:#F9F5EE; --sabbia:#EBE2D3;
  --oliva:#5F6B4E; --ink:#28241E;
}"""

# ================================================================
#  FIRENZE — dati
# ================================================================

FIRENZE_SOTTO = r'''const SOTTO = {
  cultura: [
    {id:"musei",      emoji:"🖼️", nome:"Gallerie e musei|Galleries & museums"},
    {id:"monumenti",  emoji:"🏛️", nome:"Duomo e monumenti|Duomo & monuments"},
    {id:"viste",      emoji:"🌄", nome:"Colline e panorami|Hills & views"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e fiere|Congresses & fairs"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"fiorentina", emoji:"🥩", nome:"Cucina fiorentina|Florentine cuisine"},
    {id:"street",     emoji:"🧺", nome:"Mercati e street food|Markets & street food"},
    {id:"enoteche",   emoji:"🍷", nome:"Vino e enoteche|Wine & wine bars"},
    {id:"dolci",      emoji:"🍦", nome:"Gelato e dolci|Gelato & sweets"},
    {id:"alta",       emoji:"🍽️", nome:"Alta cucina|Fine dining"}
  ],
  religioso: [
    {id:"basiliche", emoji:"⛪",  nome:"Basiliche e cattedrali|Basilicas & cathedrals"},
    {id:"chiese",    emoji:"🕯️", nome:"Chiese e memorie|Churches & memories"},
    {id:"riti",      emoji:"✨", nome:"Riti e feste|Rites & festivals"}
  ],
  benessere: [
    {id:"spa",   emoji:"💆", nome:"Spa e massaggi|Spas & massages"},
    {id:"verde", emoji:"🌳", nome:"Giardini e colline|Gardens & hills"}
  ],
  sport: [
    {id:"calcio",    emoji:"⚽", nome:"Calcio e stadio|Football & stadium"},
    {id:"eventi",    emoji:"🎪", nome:"Eventi e festival|Events & festivals"},
    {id:"partecipa", emoji:"🏃", nome:"Sport da praticare|Sports to play"}
  ],
  lento: [
    {id:"quartieri", emoji:"🏘️", nome:"Quartieri autentici|Authentic neighborhoods"},
    {id:"parchi",    emoji:"🌹", nome:"Giardini e parchi|Gardens & parks"},
    {id:"lente",     emoji:"🚶", nome:"Camminate|Walks"}
  ],
  formativo: [
    {id:"cucina",      emoji:"👩‍🍳", nome:"Corsi di cucina|Cooking classes"},
    {id:"artigianato", emoji:"🎨", nome:"Botteghe artigiane|Craft workshops"},
    {id:"guide",       emoji:"📣", nome:"Visite guidate e masterclass|Guided tours & masterclasses"}
  ]
};'''

FIRENZE_TIPI = r'''const TIPI = [
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"enoteca",     emoji:"🍷", nome:"Enoteca|Wine bar"},
  {id:"friggitoria", emoji:"🍟", nome:"Lampredottaio|Lampredotto cart"},
  {id:"gelateria",   emoji:"🍦", nome:"Gelateria|Gelato shop"},
  {id:"bar",         emoji:"☕", nome:"Bar e pasticceria|Bar & pastry shop"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];'''

FIRENZE_ESPERIENZE = r'''const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Gli Uffizi|The Uffizi", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["cultura"], sub:"musei",
   p:"Il museo del Rinascimento: Botticelli e Leonardo in quella che fu la galleria degli uffici dei Medici.|The museum of the Renaissance: Botticelli and Leonardo in what was the Medici offices' gallery.",
   tip:"Prenota settimane prima: le fasce orarie si esauriscono.|Book weeks ahead: time slots sell out."},
  {t:"Il David alla Galleria dell'Accademia|The David at the Accademia Gallery", z:"Centro|Centre", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"musei",
   p:"Il gigante di Michelangelo: cinque metri di marmo che guardano Firenze da cinque secoli.|Michelangelo's giant: five metres of marble watching Florence for five centuries.",
   tip:"Prenota e vai all'apertura: alle 8:15 sei quasi solo.|Book and go at opening: at 8:15 you're almost alone."},
  {t:"La cupola del Brunelleschi|Brunelleschi's dome", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["cultura"], sub:"monumenti",
   p:"La scalata tra le due cupole: 463 gradini e, in cima, Firenze intera.|The climb between the two domes: 463 steps and, on top, all of Florence.",
   tip:"La salita va prenotata con largo anticipo: poche persone per volta.|The climb must be booked well ahead: only a few people at a time."},
  {t:"Palazzo Vecchio e la torre|Palazzo Vecchio & the tower", z:"Piazza della Signoria|Piazza della Signoria", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"monumenti",
   p:"Il palazzo del potere fiorentino: il Salone dei Cinquecento e gli appartamenti dei Medici.|The palace of Florentine power: the Hall of the Five Hundred and the Medici apartments.",
   tip:"Il percorso segreto si prenota a parte: scale nascoste e studioli.|The secret route is booked separately: hidden stairs and little studies."},
  {t:"Palazzo Pitti e Boboli|Pitti Palace & Boboli", z:"Oltrarno|Oltrarno", d:"mezza giornata|half day", tags:["cultura"], sub:"musei",
   p:"La reggia dei Medici: la Galleria Palatina e, alle spalle, i giardini di Boboli.|The Medici palace: the Palatine Gallery and, behind it, the Boboli gardens.",
   tip:"Galleria e Boboli hanno biglietti separati: pianifica le ore.|Gallery and Boboli have separate tickets: plan your hours."},
  {t:"Piazzale Michelangelo al tramonto|Piazzale Michelangelo at sunset", z:"Collina|The hill", d:"1 ora|1 hr", tags:["cultura","lento"], sub:"viste",
   p:"La terrazza sulla città: cupola, ponti e colline in un unico riquadro.|The terrace over the city: dome, bridges and hills in a single frame.",
   tip:"Sali a piedi: la vista cresce a ogni rampa.|Climb on foot: the view grows with every ramp."},
  {t:"Fiesole: la collina romana|Fiesole: the Roman hill", z:"Fiesole (fuori porta)|Fiesole (out of town)", d:"mezza giornata|half day", tags:["cultura"], sub:"viste",
   p:"Il borgo sopra Firenze: teatro romano e la vista che i fiorentini tengono per sé.|The town above Florence: a Roman theatre and the view Florentines keep for themselves.",
   tip:"Bus 7 dal centro: la vista si paga in curve.|Bus 7 from the centre: the view is paid for in curves."},

  /* — BUSINESS — */
  {t:"Fortezza da Basso e i congressi|The Fortezza da Basso & congresses", z:"Fortezza da Basso|Fortezza da Basso", d:"mezza giornata|half day", tags:["business"], sub:"congressi",
   p:"Il polo fieristico e congressuale nella fortezza rinascimentale: eventi tutto l'anno.|The trade fair and congress hub in the Renaissance fortress: events all year round.",
   tip:"Dal centro si arriva a piedi in dieci minuti: congresso senza taxi.|It's a ten-minute walk from the centre: congress without taxi."},
  {t:"Aperitivo sopra i tetti|Rooftop aperitivo", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Il dopo-lavoro fiorentino: terrazze con vista cupola e cocktail come si deve.|Florentine after-work: cupola-view terraces and proper cocktails.",
   tip:"Prenota il tavolo in terrazza: le postazioni vista Duomo sono poche.|Book the terrace table: cupola-view spots are few."},
  {t:"Bleisure: le strade del Chianti|Bleisure: the Chianti roads", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più dopo il meeting diventa vigneto: il Chianti inizia dove finisce la città.|The meeting's extra day becomes vineyard: Chianti begins where the city ends.",
   tip:"Noleggia l'auto o parti con un tour: le cantine vanno prenotate.|Rent a car or join a tour: book the wineries ahead."},

  /* — ENOGASTRONOMICO — */
  {t:"Bistecca alla fiorentina|The Florentine steak", z:"Centro|Centre", d:"sera|evening", tags:["food"], sub:"fiorentina", tipo:"trattoria",
   p:"La fiorentina si chiede a peso e arriva al sangue: un chilo di tradizione in tavola.|The bistecca is ordered by weight and comes rare: a kilo of tradition on the table.",
   tip:"Al sangue per regola: se la chiedi ben cotta, preparati allo sguardo del cuoco.|Rare by rule: ask for it well done and brace for the chef's stare."},
  {t:"Ribollita e pappa al pomodoro|Ribollita & pappa al pomodoro", z:"Oltrarno|Oltrarno", d:"pranzo|lunch", tags:["food"], sub:"fiorentina", tipo:"osteria",
   p:"La cucina povera che vinse: pane, cavolo nero e olio nuovo, cotti due volte.|The poor cuisine that won: bread, black cabbage and new oil, cooked twice.",
   tip:"Se la ribollita sta in piedi col cucchiaio, sei nel posto giusto.|If the ribollita holds the spoon upright, you're in the right place."},
  {t:"Lampredotto: il panino dal trippaio|Lampredotto: the trippaio's sandwich", z:"Mercato Centrale / centro|Central Market / centre", d:"15 min|15 min", tags:["food"], sub:"street", tipo:"friggitoria",
   p:"Il fiorentino per eccellenza: bollito di tonno? no, di quarta stomaco, panino col salsa verde.|The Florentine classic: stomach stew in a roll with green sauce.",
   tip:"Chiedi il 'schiacciata con dentro': il panino diventa una coccola di pane caldo.|Ask for it 'inside the schiacciata': the roll becomes warm-bread comfort."},
  {t:"Mercato Centrale e Sant'Ambrogio|Central Market & Sant'Ambrogio", z:"San Lorenzo|San Lorenzo", d:"1,5 ore|1.5 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Al piano di sopra il mercato è diventato food hall: i migliori artigiani del gusto sotto un tetto di ferro.|Upstairs the market became a food hall: the best taste artisans under an iron roof.",
   tip:"Sant'Ambrogio è la versione per fiorentini: meno turisti, stessa qualità.|Sant'Ambrogio is the locals' version: fewer tourists, same quality."},
  {t:"Gelato: l'invenzione fiorentina|Gelato: the Florentine invention", z:"Centro|Centre", d:"merenda|snack", tags:["food"], sub:"dolci", tipo:"gelateria",
   p:"Il gelato 'moderno' nacque qui, alla corte dei Medici: Firenze lo rivendica da secoli.|'Modern' gelato was born here, at the Medici court: Florence has claimed it for centuries.",
   tip:"Colore bianco della crema e pistacchio spento: segni di gelato vero.|White-coloured cream and muted pistachio: signs of real gelato."},
  {t:"Cantucci e vin santo|Cantucci & vin santo", z:"Centro|Centre", d:"dolce|dessert", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Il dolce del contadino ricco: biscotti alle mandorle da affogare nel vino dolce.|The rich farmer's sweet: almond biscuits to dunk in sweet wine.",
   tip:"I cantucci si inzuppano, non si mangiano asciutti: regola locale ferrea.|Cantucci are dunked, not eaten dry: a strict local rule."},
  {t:"Le buchette del vino e le fiaschetterie|The wine windows & old wine shops", z:"Centro|Centre", d:"1,5 ore|1.5 hrs", tags:["food","cultura"], sub:"enoteche", tipo:"enoteca",
   p:"Le finestrelle medievali che servivano vino a bicchiere: rinascite di moda, ancora funzionanti.|The little medieval windows that served wine by the glass: back in fashion, still working.",
   tip:"Cerca la buchetta col campanello: suona e ti rispondono, come nel 1600.|Find the window with the bell: ring and they answer, like in the 1600s."},
  {t:"Chianti in enoteca|Chianti by the glass", z:"Oltrarno / centro|Oltrarno / centre", d:"sera|evening", tags:["food"], sub:"enoteche", tipo:"enoteca",
   p:"Il vino rosso dei colli subito dietro la porta: assaggi al banco e etichette da guardare negli occhi.|The red of the hills just behind the gate: counter tastings and labels to look in the eye.",
   tip:"Chiedi un assaggio di 'locale' prima dei nomi famosi: often sono le sorprese migliori.|Ask for a 'local' taste before famous names: surprises are often the best."},
  {t:"Caffè storici: Gilli e Procacci|Historic cafés: Gilli & Procacci", z:"Centro|Centre", d:"45 min|45 min", tags:["food","cultura"], sub:"dolci", tipo:"bar",
   p:"Specchi liberty e tramezzini al tartufo: i caffè dove la storia beve un espresso dal 1732.|Liberty mirrors and truffle sandwiches: the cafés where history has drunk espresso since 1732.",
   tip:"Al banco si paga la metà e il divertimento è lo stesso.|At the counter you pay half and the fun is the same."},
  {t:"Alta cucina: la nuova Firenze|Fine dining: the new Florence", z:"Centro|Centre", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"La Firenze che guarda avanti: cucina d'autore tra botteghe cinquecentesche.|The Florence looking ahead: author cooking inside 16th-century workshops.",
   tip:"Il menu degustazione fiorentino rivisitato: metà prezzo delle capitali.|The revisited Florentine tasting menu: half the price of capital cities."},

  /* — RELIGIOSO — */
  {t:"Il Duomo e la cripta di Santa Reparata|The Duomo & Santa Reparata's crypt", z:"Centro|Centre", d:"1,5 ore|1.5 hrs", tags:["religioso"], sub:"basiliche",
   p:"La cattedrale e, sotto, la chiesa antica: i resti di Santa Reparata sotto i tuoi piedi.|The cathedral and, beneath, the old church: Santa Reparata's remains under your feet.",
   tip:"Il biglietto del complesso dura 48 ore: usalo per cupola, cripta e campanile.|The complex ticket lasts 48 hours: use it for dome, crypt and bell tower."},
  {t:"San Miniato: i vespri dei monaci|San Miniato: the monks' vespers", z:"Collina|The hill", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"chiese",
   p:"L'abbazia romanica sopra Piazzale Michelangelo: i monaci cantano i vespri al tramonto.|The Romanesque abbey above Piazzale Michelangelo: the monks sing vespers at sunset.",
   tip:"Arriva 30 minuti prima e siediti: il canto gregoriano è compreso nel biglietto (gratis).|Arrive 30 minutes early and sit: the Gregorian chant is included (free entry)."},
  {t:"Santa Croce: il pantheon d'Italia|Santa Croce: Italy's pantheon", z:"Centro|Centre", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"chiese",
   p:"Le tombe di Michelangelo, Galileo e Machiavelli: la storia d'Italia dorme qui.|The tombs of Michelangelo, Galileo and Machiavelli: Italy's history sleeps here.",
   tip:"Il chiostro di Brunelleschi è incluso: non perderlo per correre alle tombe.|Brunelleschi's cloister is included: don't miss it rushing to the tombs."},
  {t:"Scoppio del Carro: la Pasqua fiorentina|The Explosion of the Cart: Florentine Easter", z:"Piazza del Duomo|Piazza del Duomo", d:"1 mattina|1 morning", tags:["religioso","cultura"], sub:"riti",
   p:"La Pasqua di fuoco: la colombina di carta volò dal Duomo al carro e lo fa esplodere da sei secoli.|Easter of fire: the paper dove flies from the Duomo to the cart and blows it up, six centuries running.",
   tip:"Arriva in piazza entro le 9:30: dopo non si vede più niente.|Be in the square by 9:30: after that, you'll see nothing."},

  /* — BENESSERE — */
  {t:"Spa day con vista|Spa day with a view", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Le spa degli hotel storici: soffitti affrescati sopra la vasca, day pass per esterni.|The historic hotels' spas: frescoed ceilings above the pool, day passes for outsiders.",
   tip:"Chiedi il day pass ferial: spesso metà prezzo del weekend.|Ask for the weekday day pass: often half the weekend price."},
  {t:"Giardino Bardini e il tunnel di glicini|The Bardini garden & the wisteria tunnel", z:"Oltrarno|Oltrarno", d:"1,5 ore|1.5 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Il giardino segreto: in aprile il tunnel di glicini fiorisce viola, e Firenze è di sotto.|The secret garden: in April the wisteria tunnel blooms purple, and Florence is below.",
   tip:"Il biglietto congiunto Bardini-Boboli conviene: due giardini, una salita.|The Bardini-Boboli combined ticket pays off: two gardens, one climb."},
  {t:"Le Cascine e il prato dell'Arno|The Cascine park & the Arno meadow", z:"Cascine|Cascine", d:"2 ore|2 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Il polmone ottocentesco: platani secolari, il fiume e i fiorentini che corrono.|The 19th-century lung: centuries-old plane trees, the river and running Florentines.",
   tip:"La domenica mattina è viva di famiglie e bancarelle: vai nel flusso.|Sunday mornings are alive with families and stalls: join the flow."},

  /* — SPORT — */
  {t:"La Viola all'Artemio Franchi|The Viola at the Artemio Franchi", z:"Artemio Franchi|Artemio Franchi", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Il stadio-fiore? No, il tempio viola: la Fiorentina e una curva che cinta tutta la città.|The violet temple: Fiorentina and a curve that embraces the whole city.",
   tip:"Il tragam della curva Fiesole è teatro puro: settori ospiti comunque ben tenuti.|The Fiesole curve is pure theatre: away sections are well kept too."},
  {t:"Calcio Storico Fiorentino|Historic Florentine Football", z:"Piazza Santa Croce|Piazza Santa Croce", d:"sera|evening", tags:["sport","cultura"], sub:"eventi",
   p:"Il calcio in livrea dal 1530: quattro squadre, un campo di sabbia e zero regole moderne.|Football in period costume since 1530: four teams, a sand pitch and zero modern rules.",
   tip:"Giugno in piazza Santa Croce: biglietti pochi e richiestissimi, prenota mesi prima.|June in Santa Croce square: few, much-demanded tickets, book months ahead."},
  {t:"Firenze Rocks e i concerti d'estate|Firenze Rocks & summer concerts", z:"Visarno / Cascine|Visarno / Cascine", d:"sera|evening", tags:["sport"], sub:"eventi",
   p:"I grandi nomi del rock dentro il parco: palchi sotto gli alberi delle Cascine.|Rock's big names inside the park: stages beneath the Cascine trees.",
   tip:"Arriva in bici o a piedi: le serate evento chiudono il traffico attorno.|Come by bike or on foot: event nights close the surrounding traffic."},
  {t:"La maratona di Firenze|The Florence Marathon", z:"Centro → Cascine|Centre → Cascine", d:"1 giorno|1 day", tags:["sport"], sub:"partecipa",
   p:"Novembre: 42 chilometri lungo l'Arno e dentro il centro storico, chiuso per voi.|November: 42 kilometres along the Arno and through the closed historic centre.",
   tip:"Iscriviti mesi prima; da spettatore, Piazzale Michelangelo si riempie e applaude.|Register months ahead; as a spectator, Piazzale Michelangelo fills up and applauds."},

  /* — LENTO — */
  {t:"San Frediano e le botteghe|San Frediano & the workshops", z:"Oltrarno|Oltrarno", d:"2 ore|2 hrs", tags:["lento","cultura"], sub:"quartieri",
   p:"Il quartiere degli artigiani: restauro, ottone e cuoio dietro portoni che non aspettano visitatori.|The artisans' district: restoration, brass and leather behind doors that don't await visitors.",
   tip:"Se un laboratorio ha la porta aperta, guarda dentro: spesso ti fanno entrare.|If a workshop's door is open, look in: they often let you enter."},
  {t:"Santo Spirito: la piazza che vive|Santo Spirito: the living square", z:"Oltrarno|Oltrarno", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"La piazza dove l'Oltrarno pranza e chiacchiera: Santo Spirito e la sua vita lenta.|The square where the Oltrarno has lunch and chats: Santo Spirito and its slow life.",
   tip:"Il crocifisso ligneo di Michelangelo è dentro la chiesa: entra e guardati intorno.|Michelangelo's wooden crucifix is inside the church: go in and look around."},
  {t:"Giardino delle Rose|The Rose Garden", z:"Collina|The hill", d:"1 ora|1 hr", tags:["lento","benessere"], sub:"parchi",
   p:"Migliaia di rose sotto Piazzale Michelangelo, con il David di bronzo e la vista sulla cupola.|Thousands of roses below Piazzale Michelangelo, with the bronze David and the dome view.",
   tip:"Maggio è la fioritura: vai presto, quando le rose sono ancora chiuse.|May is the bloom: go early, when the roses are still folded."},
  {t:"Firenze all'alba: il centro vuoto|Florence at dawn: the empty centre", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["lento"], sub:"lente",
   p:"Alle 6 Firenze è dei fiorentini: Ponte Vecchio silenzioso e la luce che nasce sull'Arno.|At 6 am Florence belongs to Florentines: silent Ponte Vecchio and light being born on the Arno.",
   tip:"Alba dalla collina di San Miniato, poi scendi quando la città si sveglia.|Dawn from San Miniato's hill, then descend as the city wakes."},

  /* — FORMATIVO — */
  {t:"Corso di pasta fresca fiorentina|A fresh pasta class", z:"Oltrarno|Oltrarno", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Pappardelle e ravioli: la sfoglia si stende col mattarello, come si deve.|Pappardelle and ravioli: the dough is rolled with the pin, as it should be.",
   tip:"Al termine si mangia con il ragù: il pranzo è incluso.|At the end you eat with ragù: lunch included."},
  {t:"Bottega: cuoio e carta marmorizzata|Workshop: leather & marbled paper", z:"Oltrarno|Oltrarno", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Le botteghe dell'Oltrarno insegnano i mestieri: cuoio cucito a mano e carta marmorizzata a colori.|The Oltrarno workshops teach the trades: hand-stitched leather and colour-marbled paper.",
   tip:"Il laboratorio da due ore è perfetto anche coi ragazzi: nasce un souvenir vero.|The two-hour workshop is perfect with kids too: a real souvenir is born."},
  {t:"Uffizi con lo storico dell'arte|The Uffizi with an art historian", z:"Centro|Centre", d:"2,5 ore|2.5 hrs", tags:["formativo","cultura"], sub:"guide",
   p:"La Botticelli raccontata da chi la studia da anni: il quadro cambia davanti a te.|The Botticelli told by those who studied it for years: the painting changes before you.",
   tip:"Le visite guidate mattutine hanno file dedicate: entra prima dei biglietti normali.|Morning guided visits have dedicated lines: enter before regular tickets."}
];'''

FIRENZE_ITINERARI = r'''const ITINERARI = {
  cultura:[
    {ora:"08:15", t:"Uffizi all'apertura", p:"Il museo quasi vuoto: Botticelli prima della folla.|The museum almost empty: Botticelli before the crowd."},
    {ora:"13:00", t:"Panino dal trippaio", p:"Lampredotto e salsa verde: pranzo in piedi da fiorentino doc.|Lampredotto and green sauce: lunch standing like a true Florentine."},
    {ora:"15:00", t:"Accademia e il David", p:"Cinque metri di marmo: guardalo dal basso, come previsto.|Five metres of marble: look up at it, as intended."},
    {ora:"19:30", t:"Piazzale Michelangelo al tramonto", p:"La scalinata, la città accesa e il David di bronzo.|The steps, the lit city and the bronze David."}
  ],
  business:[
    {ora:"09:00", t:"Congresso alla Fortezza", p:"La fortezza rinascimentale come polo congressi: solo a Firenze.|The Renaissance fortress as congress hub: only in Florence."},
    {ora:"13:30", t:"Business lunch rapido", p:"Mercato Centrale: qualità in venti minuti.|Central Market: quality in twenty minutes."},
    {ora:"16:00", t:"Pausa: Palazzo Vecchio", p:"Il Salone dei Cinquecento come antidoto alle slide.|The Hall of the Five Hundred as the antidote to slides."},
    {ora:"19:30", t:"Aperitivo sopra i tetti", p:"Terrazza vista cupola: il meeting è già lontano.|Cupola-view terrace: the meeting already far away."}
  ],
  food:[
    {ora:"08:00", t:"Caffè e brioche in centro", p:"Al banco, come i fiorentini: chiedi anche la schiacciata.|At the counter, like Florentines: ask for schiacciata too."},
    {ora:"10:00", t:"Mercato di Sant'Ambrogio", p:"Il mercato dei fiorentini: meno foto, più assaggi.|The Florentines' market: fewer photos, more tastings."},
    {ora:"13:00", t:"Ribollita in osteria", p:"La cucina povera che vinse: pane, cavolo e olio nuovo.|The poor cuisine that won: bread, cabbage and new oil."},
    {ora:"18:00", t:"Gelato e Oltrarno", p:"Due gusti, le botteghe aperte e il tramonto sul ponte.|Two flavours, open workshops and sunset on the bridge."}
  ],
  religioso:[
    {ora:"07:00", t:"Messa al Duomo e cripta", p:"La cattedrale all'alba: silenzio di pietra sotto la cupola.|The cathedral at dawn: stone silence beneath the dome."},
    {ora:"09:30", t:"Santa Croce", p:"Il pantheon d'Italia: Michelangelo, Galileo, Machiavelli.|Italy's pantheon: Michelangelo, Galileo, Machiavelli."},
    {ora:"12:30", t:"Pranzo in centro e Santo Spirito", p:"Piazza viva e crocifisso di Michelangelo: doppia quiete.|Living square and Michelangelo's crucifix: double quiet."},
    {ora:"17:30", t:"Vespri a San Miniato", p:"Il canto gregoriano al tramonto: il finale perfetto.|Gregorian chant at sunset: the perfect finale."}
  ],
  benessere:[
    {ora:"08:30", t:"Camminata al Bardini", p:"La scalinata segreta e il tunnel di glicini: ancora vuoto.|The secret staircase and wisteria tunnel: still empty."},
    {ora:"11:00", t:"Spa vista Duomo", p:"Soffitti affrescati sopra la vasca: relax col panorama.|Frescoed ceilings above the pool: relaxation with a view."},
    {ora:"13:30", t:"Pranzo leggero in Oltrarno", p:"Pane, olio e verdure: la dieta mediterranea della bottega.|Bread, oil and vegetables: the workshop's Mediterranean diet."},
    {ora:"17:00", t:"Le Cascine al tramonto", p:"Il fiume, i platani e i fiorentini che corrono.|The river, the plane trees and running Florentines."}
  ],
  sport:[
    {ora:"09:00", t:"Tour dell'Artemio Franchi", p:"Spogliatoi e museo viola: il calcio fiorentino a porte chiuse.|Dressing rooms and the violet museum: Florentine football behind closed doors."},
    {ora:"11:30", t:"Giro pre-partita in centro", p:"Panino dal trippaio: rito d'avvicinamento allo stadio.|A trippaio's sandwich: the approach ritual to the stadium."},
    {ora:"13:00", t:"Pranzo sportivo", p:"Carboidrati da curva: la città li cucina bene.|Curve-grade carbs: the city cooks them well."},
    {ora:"18:00", t:"Partita della Viola", p:"La curva Fiesole canta per novanta minuti, minimo.|The Fiesole curve sings for ninety minutes, minimum."}
  ],
  lento:[
    {ora:"07:00", t:"Firenze all'alba", p:"Ponte Vecchio vuoto e l'Arno che fuma: la città ai fiorentini.|Empty Ponte Vecchio and the steaming Arno: the city of the Florentines."},
    {ora:"10:00", t:"San Frediano e le botteghe", p:"Portoni aperti, artigiani al lavoro: entra e guarda.|Open doors, artisans at work: enter and watch."},
    {ora:"12:30", t:"Santo Spirito e pranzo", p:"La piazza che vive: pranzo lento e gente vera.|The living square: slow lunch and real people."},
    {ora:"18:00", t:"Giardino delle Rose e Piazzale", p:"Rose, vista e tramonto: la chiusura dolce della giornata.|Roses, view and sunset: the day's sweet closing."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di pasta fresca", p:"Pappardelle col mattarello: le mani nel mestiere.|Rolling-pin pappardelle: hands on the trade."},
    {ora:"13:00", t:"Mangi la tua pasta", p:"Con il ragù: il pranzo migliore della vacanza.|With ragù: the holiday's best lunch."},
    {ora:"15:30", t:"Bottega: cuoio o carta", p:"Due ore da artigiano: souvenir fatto con le tue mani.|Two hours as an artisan: a souvenir made with your hands."},
    {ora:"18:00", t:"La Firenze dei Medici di sera", p:"Tour con lo storico: potere, intrighi e cantucci finali.|A historian's tour: power, plots and final cantucci."}
  ]
};'''

FIRENZE_MARCO = r'''const MARCO = [
  {k:["coda","file","prenot","bigliett","queue","ticket","book","skip","uffizi","accademia","david"],
   a:"Uffizi e Accademia si prenotano settimane prima, online: in alta stagione anche un mese. La cupola del Brunelleschi va prenotata a parte, e la fila del campanile scorre più in fretta.|Uffizi and Accademia are booked weeks ahead, online: in high season even a month. Brunelleschi's dome is booked separately, and the bell tower queue moves faster."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro è sicuro anche di notte. Occhio ai borseggiatori attorno al Duomo, su Ponte Vecchio e al mercato di San Lorenzo: borsa davanti e tutto liscio.|The centre is safe at night too. Watch for pickpockets around the Duomo, on Ponte Vecchio and at San Lorenzo market: bag in front and you're smooth."},
  {k:["taxi","aeroporto","peretola","vespucci","uber","nap","airport","cab"],
   a:"Da Peretola: 15-20 minuti di taxi, oppure il tram T2 che arriva quasi in centro. Se atterri a Pisa: treno diretto per Firenze in circa un'ora.|From Peretola: 15-20 minutes by taxi, or tram T2 arriving almost in the centre. If you land at Pisa: direct train to Florence in about an hour."},
  {k:["acqua","fontanella","borraccia","bere","water","drink","fountain"],
   a:"Le fontanelle pubbliche sono ovunque e l'acqua è buona: porta la borraccia. D'estate la salita del campanile con la borraccia piena è salvezza.|Public fountains are everywhere and the water is good: bring a bottle. In summer, the bell tower climb with a full bottle is salvation."},
  {k:["metro","bus","tram","mezz","subway","transport","underground"],
   a:"Metro? A Firenze non esiste: si cammina, il centro è compatto. I tram T1 e T2 collegano stazioni e periferia. Scarpe comode: qui si fanno 15 chilometri al giorno senza accorgersene.|Metro? Florence doesn't have one: you walk, the centre is compact. Trams T1 and T2 link stations and outskirts. Comfortable shoes: you'll do 15 kilometres a day without noticing."},
  {k:["cena","orario","ristorant","mangiar","aperto","bistecca","steak","dinner","eat","restaurant","lunch"],
   a:"Si cena alle 19:30-20:30, e prenota o niente: le trattorie giuste rifiutano tavoli alle 20. La bistecca si ordina a peso (al kg) e arriva al sangue: chiederla ben cotta è quasi eresia.|Dinner is at 7:30-8:30, and book or nothing: the right trattorias refuse tables at 8. The bistecca is ordered by weight (per kg) and comes rare: asking for it well done is almost heresy."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit","coperto"],
   a:"Non obbligatoria: gli spicci al bar, il 5-10% al ristorante. E occhio: il 'coperto' nel conto è normale qui, non una truffa — copre pane e servizio.|Not compulsory: small change at the bar, 5-10% at the restaurant. And watch out: 'coperto' on the bill is normal here, not a scam — it covers bread and service."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family"],
   a:"Con i bimbi: gelato (corsa obbligatoria), il Museo Galileo con telescopi e strumenti ipnotici, il giardino Bardini e la giostra in piazza della Repubblica. Niente macchine in centro: lasciali correre.|With kids: gelato (mandatory), the Galileo Museum with hypnotic instruments, the Bardini garden and the carousel in piazza della Repubblica. No cars in the centre: let them run."},
  {k:["piogg","piov","rain","weather","wet"],
   a:"Se piove: Uffizi e Accademia (prenotati), il Museo Galileo, il Mercato Centrale al coperto e un caffè storico. La pioggia fiorentina è rara ma intensa: ombrello serio.|If it rains: Uffizi and Accademia (pre-booked), the Galileo Museum, the covered Central Market and a historic café. Florentine rain is rare but intense: a serious umbrella."},
  {k:["chiesa","vest","copr","spalle","ginocch","duomo","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Spalle e ginocchia coperte, al Duomo fanno sul serio: ti fermano all'ingresso. D'estate una sciarpa leggera in borsa: problema risolto.|Covered shoulders and knees: the Duomo takes it seriously, they stop you at the door. In summer a light scarf in your bag: problem solved."},
  {k:["truff","petizion","braccialett","cordicell","regal","scam","borse"],
   a:"Occhio ai braccialetti 'regalati' attorno al Duomo e ai venditori di borse 'firmate' sul Lungarno: un 'no grazie' gentile e cambi marciapiede. E diffida dei ristoranti col tapper fuori che t'invitano a menu fissi: Firenze vera non ha bisogno di richiami.|Watch for 'free' bracelets around the Duomo and 'designer' bag sellers on the Lungarno: a kind 'no thanks' and cross the street. And distrust restaurants with touts offering fixed menus: real Florence needs no luring."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","cantucci"],
   a:"Cappuccino solo al mattino: regola ferrea anche qui. Il caffè si prende al banco, veloce. E i cantucci si inzuppano nel vin santo, non si mangiano asciutti: fallo e sembri fiorentino.|Cappuccino only in the morning: strict rule here too. Coffee is taken at the counter, fast. And cantucci are dunked in vin santo, not eaten dry: do it and you look Florentine."}
];'''

FIRENZE_FALLBACK = r'''const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: Uffizi, prenotare, bistecca, lampredotto, Peretola, pioggia, truffe, cantucci... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: Uffizi, booking, bistecca, lampredotto, Peretola, rain, scams, cantucci... or tap a quick question.";'''

FIRENZE_QUICK = r'''const CHAT_QUICK = [
  "Gli Uffizi come si prenotano?|How do I book the Uffizi?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Peretola?|Taxi from Peretola?",
  "Dove mangio il lampredotto?|Where do I eat lampredotto?",
  "La bistecca come si ordina?|How do I order the bistecca?"
];'''

FIRENZE_TESTI = {
    "heroK":  "Guida poliedrica · Firenze|The many-sided guide · Florence",
    "heroP":  "Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dalla cupola all'Oltrarno, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the dome to the Oltrarno, a tailor-made itinerary.",
    "footer": "<b>Firenze Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Firenze Poliedrica</b> — educational demo · indicative data: always check official sources",
    "info1p": "Niente metro: il centro è pedonale e compatto, si fa tutto a piedi. Tram T1/T2 per stazioni e periferia; il T2 collega l'aeroporto Peretola. Scarpe comande obbligatorie.|No metro: the centre is pedestrian and compact, everything is done on foot. Trams T1/T2 for stations and outskirts; T2 links Peretola airport. Comfortable shoes mandatory.",
    "info2p": "Aprile–maggio e settembre–ottobre: clima perfetto. Luglio–agosto: caldo e folla, musei la mattina presto. Pasqua: Scoppio del Carro, se riesci a vederlo.|April–May and September–October: perfect weather. July–August: heat and crowds, museums early morning. Easter: the Explosion of the Cart, if you manage to see it.",
    "info3p": "Uffizi, Accademia e cupola del Brunelleschi: prenota online con settimane (a volte mesi) di anticipo. Palazzo Vecchio e Pitti: qualche settimana prima.|Uffizi, Accademia and Brunelleschi's dome: book online weeks (sometimes months) ahead. Palazzo Vecchio and Pitti: a few weeks before.",
    "chatTitolo": "Lorenzo · il tuo amico fiorentino|Lorenzo · your Florentine friend",
    "chatBtn": "🙋 Chiedi a Lorenzo|🙋 Ask Lorenzo",
    "benvenuto": "Ciao! Sono Lorenzo, fiorentino di San Niccolò 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Lorenzo, a Florentine from San Niccolò 🙋 Ask me anything about the city — or tap a quick question below.",
}

FIRENZE_PALETTE = """:root{
  --terra:#A9683A; --terra-dark:#85502C;
  --crema:#FAF5EC; --sabbia:#EFE4CE;
  --oliva:#6B7A4F; --ink:#2A2521;
}"""

# ================================================================
#  VENEZIA — dati
# ================================================================

VENEZIA_SOTTO = r'''const SOTTO = {
  cultura: [
    {id:"palazzi", emoji:"🏰", nome:"Palazzi e musei|Palaces & museums"},
    {id:"musei",   emoji:"🖼️", nome:"Gallerie d'arte|Art galleries"},
    {id:"isole",   emoji:"🏝️", nome:"Isole della laguna|Lagoon islands"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Biennale e convegni|Biennale & conferences"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi in bacaro|Bacaro aperitifs"}
  ],
  food: [
    {id:"cicchetti",  emoji:"🍢", nome:"Cicchetti e bacari|Cicchetti & bacari"},
    {id:"veneziana",  emoji:"🍤", nome:"Cucina veneziana|Venetian cuisine"},
    {id:"pesce",      emoji:"🦐", nome:"Pesce e laguna|Fish & lagoon"},
    {id:"spritz",     emoji:"🍹", nome:"Spritz e ombre|Spritz & ombre"},
    {id:"dolci",      emoji:"🍰", nome:"Dolci e caffè storici|Sweets & historic cafés"},
    {id:"alta",       emoji:"🍽️", nome:"Alta cucina|Fine dining"}
  ],
  religioso: [
    {id:"basiliche",  emoji:"⛪",  nome:"Basiliche|Basilicas"},
    {id:"chiese",     emoji:"🕯️", nome:"Chiese e scuole|Churches & scuole"},
    {id:"pellegrini", emoji:"🥾",  nome:"Pellegrinaggi e feste|Pilgrimages & feasts"}
  ],
  benessere: [
    {id:"mare",  emoji:"🏖️", nome:"Lido e spiagge|Lido & beaches"},
    {id:"spa",   emoji:"💆", nome:"Spa e wellness|Spa & wellness"},
    {id:"verde", emoji:"🌳", nome:"Giardini e quiete|Gardens & quiet"}
  ],
  sport: [
    {id:"calcio",    emoji:"⚽", nome:"Calcio e stadio|Football & stadium"},
    {id:"eventi",    emoji:"🎭", nome:"Regate e Carnevale|Regattas & Carnival"},
    {id:"partecipa", emoji:"🚣", nome:"Voga e sport in laguna|Rowing & lagoon sports"}
  ],
  lento: [
    {id:"quartieri", emoji:"🏘️", nome:"Sestieri autentici|Authentic sestieri"},
    {id:"lente",     emoji:"🚶", nome:"Calli e fondamenta|Calli & fondamenta"}
  ],
  formativo: [
    {id:"cucina",      emoji:"👩‍🍳", nome:"Corsi di cucina|Cooking classes"},
    {id:"artigianato", emoji:"🎭", nome:"Laboratori artigianali|Craft workshops"},
    {id:"guide",       emoji:"📣", nome:"Visite guidate e teatri|Guided tours & theatres"}
  ]
};'''

VENEZIA_TIPI = r'''const TIPI = [
  {id:"bacaro",      emoji:"🍢", nome:"Bacaro|Bacaro"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"enoteca",     emoji:"🍷", nome:"Enoteca|Wine bar"},
  {id:"bar",         emoji:"🍹", nome:"Bar|Bar"},
  {id:"caffè",       emoji:"☕", nome:"Caffè storico|Historic café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];'''

VENEZIA_ESPERIENZE = r'''const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Palazzo Ducale e le Prigioni|The Doge's Palace & the Prisons", z:"San Marco|San Marco", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"palazzi",
   p:"Il palazzo del potere veneziano: sale d'oro, il Ponte dei Sospiri e le celle di Casanova.|The palace of Venetian power: golden halls, the Bridge of Sighs and Casanova's cells.",
   tip:"Il tour 'Itinerari Segreti' porta negli uffici del doge: prenota, si entra in pochi.|The 'Secret Itineraries' tour leads into the doge's offices: book it, few get in."},
  {t:"Ca' d'Oro e il Canal Grande|Ca' d'Oro & the Grand Canal", z:"Cannaregio|Cannaregio", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"palazzi",
   p:"Il palazzo gotico fiorito sul Canal Grande: una facciata che sembra merletto.|The flowering Gothic palace on the Grand Canal: a façade like lace.",
   tip:"Dalla balconata guarda il canale: i palazzi si specchiano nell'acqua verde.|From the balcony watch the canal: the palaces mirror in the green water."},
  {t:"Le Gallerie dell'Accademia|The Accademia Galleries", z:"Dorsoduro|Dorsoduro", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"musei",
   p:"Il massimo della pittura veneziana: dal gotico al Tiepolo, lungo il Canal Grande.|The best of Venetian painting: from Gothic to Tiepolo, along the Canal.",
   tip:"Guarda il Carpaccio con calma: i dettagli raccontano Venezia com'era.|Take your time with Carpaccio: the details tell Venice as it was."},
  {t:"Peggy Guggenheim|The Peggy Guggenheim Collection", z:"Dorsoduro|Dorsoduro", d:"2 ore|2 hrs", tags:["cultura"], sub:"musei",
   p:"Il palazzo incompiuto di Peggy: moderni americani ed europei sul Canal Grande.|Peggy's unfinished palace: American and European moderns on the Grand Canal.",
   tip:"Il giardino con la scultura di Marino Marini è la pausa perfetta.|The garden with Marino Marini's sculpture is the perfect pause."},
  {t:"Murano: le fornaci del vetro|Murano: the glass furnaces", z:"Murano|Murano", d:"mezza giornata|half day", tags:["cultura","formativo"], sub:"isole",
   p:"L'isola del vetro da mille anni: i maestri soffiano davanti a te, a mani nude.|The glass island for a thousand years: masters blow before you, bare-handed.",
   tip:"Compra solo dove vedi la fornace accesa: il resto è spesso importato.|Buy only where you see the furnace lit: the rest is often imported."},
  {t:"Burano: l'isola dei colori|Burano: the island of colours", z:"Burano|Burano", d:"mezza giornata|half day", tags:["cultura","lento"], sub:"isole",
   p:"Le case dipinte di tutti i colori e il merletto fatto a mano: l'isola che fotografa se stessa.|Houses painted every colour and handmade lace: the island that photographs itself.",
   tip:"Pranzo di risotto di gò: il piatto locale che i turisti scoprono tardi.|Lunch of gò risotto: the local dish tourists discover late."},
  {t:"Torcello: la cattedrale del silenzio|Torcello: the cathedral of silence", z:"Torcello|Torcello", d:"2 ore|2 hrs", tags:["cultura","religioso"], sub:"isole",
   p:"La Venezia di prima di Venezia: la basilica del VII secolo in un'isola quasi vuota.|Venice before Venice: the 7th-century basilica on a nearly empty island.",
   tip:"Il mosaico del Giudizio Universale ti guarda dal fondo: lasciati fissare.|The Last Judgement mosaic gazes from the apse: let it stare at you."},

  /* — BUSINESS — */
  {t:"La Biennale: l'agenda della città|The Biennale: the city's calendar", z:"Giardini / Arsenale|Giardini / Arsenale", d:"1 settimana|1 week", tags:["business","cultura"], sub:"congressi",
   p:"Arte, architettura, cinema, teatro e danza: la kermesse che porta il mondo professionale in Laguna.|Art, architecture, cinema, theatre and dance: the programme bringing the professional world to the Lagoon.",
   tip:"I padiglioni nazionali aprono quasi tutti in tarda mattinata: inizia dai Giardini.|National pavilions mostly open in late morning: start from the Giardini."},
  {t:"Aperitivo e networking in bacaro|Aperitivo & networking in a bacaro", z:"Rialto / Cannaregio|Rialto / Cannaregio", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Il convegno continua in piedi: un'ombra, cicchetti e i colleghi che diventano complici.|The conference continues standing: an ombra, cicchetti and colleagues becoming accomplices.",
   tip:"Ordina 'un'ombra' e ti rispettano subito: è il gergo locale per il bicchiere di vino.|Order 'un'ombra' and you're instantly respected: local slang for a glass of wine."},
  {t:"Bleisure: le colline del Prosecco|Bleisure: the Prosecco hills", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più dopo il meeting diventa vigneto: le colline del Prosecco a un'ora di treno.|The meeting's extra day becomes vineyard: the Prosecco hills an hour by train.",
   tip:"Treno per Conegliano e poi auto: i sentieri del Cartizze si camminano con calma.|Train to Conegliano then car: the Cartizze paths are walked unhurried."},

  /* — ENOGASTRONOMICO — */
  {t:"Il giro dei bacari|The bacaro crawl", z:"Cannaregio / San Polo|Cannaregio / San Polo", d:"2 ore|2 hrs", tags:["food","lento"], sub:"cicchetti", tipo:"bacaro",
   p:"Il rito veneziano: ombra di vino, cicchetti al banco e la città che si racconta a bocconi.|The Venetian ritual: a wine ombra, counter cicchetti and a city told in bites.",
   tip:"Un cicchetto e un'ombra per locale, in piedi al banco: il giro si fa in cinque tappe.|One cicchetto and one ombra per place, standing at the counter: the crawl takes five stops."},
  {t:"Sarde in saor e baccalà mantecato|Sarde in saor & whipped baccalà", z:"Cannaregio|Cannaregio", d:"sera|evening", tags:["food"], sub:"veneziana", tipo:"osteria",
   p:"I due classici della Laguna: sarde agrodolci con cipolla e baccalà montato a neve.|The two Lagoon classics: sweet-and-sour sardines with onion and baccalà whipped to snow.",
   tip:"Il saor era il modo dei marinai di conservare il pesce: ordinalo in un'osteria storica.|Saor was sailors' way to preserve fish: order it in a historic osteria."},
  {t:"Risi e bisi: il piatto del Doge|Risi e bisi: the Doge's dish", z:"San Marco / Rialto|San Marco / Rialto", d:"pranzo|lunch", tags:["food"], sub:"veneziana", tipo:"ristorante",
   p:"Riso e piselli freschi, per metà minestra e per metà risotto: il piatto del 25 aprile, giorno di San Marco.|Rice and fresh peas, half soup and half risotto: the dish of 25 April, St Mark's day.",
   tip:"Primavera obbligata: fuori stagione i piselli non sono gli stessi e il piatto lo sa.|Spring only: out of season the peas aren't the same and the dish knows it."},
  {t:"Rialto: il mercato e la pescheria|Rialto: the market & the fish market", z:"Rialto|Rialto", d:"1,5 ore|1.5 hrs", tags:["food","lento"], sub:"pesce", tipo:"mercato",
   p:"Il mercato dove la Laguna si vende: pesce d'acqua dolce e salata, ortaggi e voci al banco.|The market where the Lagoon sells itself: fresh and salt-water fish, vegetables and counter voices.",
   tip:"Il pesce di Laguna si riconosce: gamberi piccoli, seppie e specie che non trovi altrove.|Lagoon fish is recognisable: small shrimp, cuttlefish and species found nowhere else."},
  {t:"Granseola e moleche: frutti di Laguna|Granseola & moleche: fruits of the Lagoon", z:"Cannaregio|Cannaregio", d:"sera|evening", tags:["food"], sub:"pesce", tipo:"ristorante",
   p:"La granseola (granchio reale della sabbia) servita fredda nel guscio e le moleche, i granchi in muta fritti interi.|Spider crab served cold in its shell and moleche, soft-shell crabs fried whole.",
   tip:"Le moleche si trovano solo in primavera e autunno: chiedi sempre cosa è di stagione.|Moleche are found only in spring and autumn: always ask what's in season."},
  {t:"L'ora dello spritz|Spritz o'clock", z:"Tutta la città|All over the city", d:"sera|evening", tags:["food","lento"], sub:"spritz", tipo:"bar",
   p:"Aperol, Campari o Select: lo spritz si beve in campo, tra le 18 e le 20, come i veneziani.|Aperol, Campari or Select: spritz is drunk in a campo, 6 to 8 pm, like the Venetians.",
   tip:"Ordina 'Select' per fare il veneziano: è il bitter locale, meno dolce dell'Aperol.|Order 'Select' to pass as a local: the local bitter, less sweet than Aperol."},
  {t:"Caffè Florian: il salotto delle corti|Caffè Florian: the courts' salon", z:"San Marco|San Marco", d:"45 min|45 min", tags:["food","cultura"], sub:"dolci", tipo:"caffè",
   p:"Il caffè più antico d'Italia (1720): specchi, sale affrescate e la piazza come salone.|Italy's oldest café (1720): mirrors, frescoed rooms and the square as a salon.",
   tip:"Sedersi si paga: al banco spendi un decimo e il scenografico resta.|Sitting costs: at the counter you spend a tenth and the scenery stays."},
  {t:"Fritole e galani|Fritole & galani", z:"Cannaregio / Rialto|Cannaregio / Rialto", d:"dolce|dessert", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Le frittelle di carnevale e i galani croccanti: il dolce veneziano da ordinare tiepido.|Carnival fritters and crisp galani: the Venetian sweet to order warm.",
   tip:"Le fritole migliori sono senza pretese: cerca il banco con la fila di vicini.|The best fritole are unassuming: find the counter with the locals' queue."},
  {t:"Alta cucina: la nuova Laguna|Fine dining: the new Lagoon", z:"Tutta la città|All over the city", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"La cucina d'autore che guarda alla Laguna: pesce, erbe di barena e fermentazioni.|Author cuisine looking to the Lagoon: fish, marsh herbs and fermentations.",
   tip:"Molti grandi chiudono a ferragosto e il lunedì: chiama prima di andare.|Many greats close in August and on Mondays: call before going."},

  /* — RELIGIOSO — */
  {t:"La Basilica di San Marco|St Mark's Basilica", z:"San Marco|San Marco", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"basiliche",
   p:"La basilica dorata: cinque secoli di mosaici dove Oriente e Occidente si abbracciano.|The golden basilica: five centuries of mosaics where East and West embrace.",
   tip:"La mattina presto è quasi vuota: la luce che entra accende l'oro a giorno.|Early morning it's almost empty: the entering light sets the gold ablaze."},
  {t:"I Frari: Tiziano e Canova|The Frari: Titian & Canova", z:"San Polo|San Polo", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"chiese",
   p:"La chiesa gotica dei frati: l'Assunta di Tiziano e il monumento che Canova progettò per sé.|The friars' Gothic church: Titian's Assumption and the monument Canova designed for himself.",
   tip:"Cerca il coro ligneo, tra i più belli d'Europa.|Look for the wooden choir, among Europe's finest."},
  {t:"San Rocco: la Sistina di Tintoretto|San Rocco: Tintoretto's Sistine", z:"San Polo|San Polo", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"chiese",
   p:"La Scuola Grande coperta di Tintoretto: decine di tele che raccontano la bibbia in verticale.|The Great School covered in Tintoretto: dozens of canvases telling the Bible vertically.",
   tip:"Prendi la guida: le tele si leggono meglio con chi le spieghi.|Take the guide: the canvases read better with someone explaining them."},
  {t:"La Salute e la festa del 21 novembre|The Salute & the 21 November feast", z:"Dorsoduro|Dorsoduro", d:"1 ora|1 hr", tags:["religioso"], sub:"pellegrini",
   p:"La basilica costruita per la peste finita: ogni novembre i veneziani attraversano il ponte votivo.|The basilica built for the ended plague: every November Venetians cross the votive bridge.",
   tip:"Il 21 novembre la città attraversa il ponte di barche: l'unico giorno in cui la vedi così.|On 21 November the city crosses the boat bridge: the only day you see it like this."},

  /* — BENESSERE — */
  {t:"Il Lido: spiaggia e biciclette|The Lido: beach & bicycles", z:"Lido|Lido", d:"1 giorno|1 day", tags:["benessere"], sub:"mare",
   p:"L'isola della spiaggia: sabbia, ombrelloni e biciclette tra le ville liberty.|The island of the beach: sand, umbrellas and bicycles among the Liberty villas.",
   tip:"Noleggia la bici all'arrivo del vaporetto: l'isola è piatta e si gira in due ore.|Rent a bike at the vaporetto's arrival: the island is flat and done in two hours."},
  {t:"Spa vista Laguna|Lagoon-view spa", z:"Tutta la città|All over the city", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Le spa degli hotel storici: vasche affacciate sull'acqua e silenzio che nessuna città concede.|Historic hotels' spas: pools overlooking the water and a silence no city allows.",
   tip:"Chiedi il day pass ferial: molti hotel lo aprono anche ai non ospiti.|Ask for the weekday day pass: many hotels open it to non-guests too."},
  {t:"I Giardini Reali: la pausa verde|The Royal Gardens: the green pause", z:"San Marco|San Marco", d:"1 ora|1 hr", tags:["benessere","lento"], sub:"verde",
   p:"Il giardino vittoriano a due passi dalla piazza: un tempo orto dei dogi, oggi silenzio.|The Victorian garden steps from the square: once the doges' kitchen garden, today silence.",
   tip:"La pausa perfetta tra San Marco e la Biennale: panchine, alberi e nessuna folla.|The perfect pause between San Marco and the Biennale: benches, trees and no crowd."},

  /* — SPORT — */
  {t:"Venezia FC allo stadio Penzo|Venezia FC at the Penzo stadium", z:"Castello|Castello", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Lo stadio sull'isola: si arriva a piedi o in barca, l'arancio-nero-verde e la Laguna dietro la curva.|The stadium on the island: reached on foot or by boat, orange-black-green and the Lagoon behind the curve.",
   tip:"Lo stadio è a Sant'Elena: dieci minuti a piedi da piazza San Marco, con calma.|The stadium is in Sant'Elena: a ten-minute unhurried walk from St Mark's."},
  {t:"La Regata Storica|The Historical Regatta", z:"Canal Grande|Grand Canal", d:"1 pomeriggio|1 afternoon", tags:["sport","cultura"], sub:"eventi",
   p:"La regata del doge, oggi: bissone in costume, remieri in gara e il Canal Grande come stadio.|The doge's regatta, today: costumed bissone, racing rowers and the Grand Canal as a stadium.",
   tip:"Prima domenica di settembre: i posti lungo le rive vanno occupati ore prima.|First Sunday of September: riverside spots must be claimed hours ahead."},
  {t:"Il Carnevale di Venezia|The Venice Carnival", z:"San Marco / tutta la città|San Marco / all over the city", d:"2 settimane|2 weeks", tags:["sport","cultura"], sub:"eventi",
   p:"Maschere, costumi e la città che torna seicentesca: il Carnevale più famoso del mondo.|Masks, costumes and the city turning seventeenth-century again: the world's most famous Carnival.",
   tip:"Il Volo dell'Angelo richiama mezza Italia: prenota mesi prima o guardalo da una fondamenta laterale.|The Flight of the Angel draws half of Italy: book months ahead or watch from a side fondamenta."},
  {t:"Corso di voga veneta|A Venetian rowing class", z:"Cannaregio / Bacino|Cannaregio / Basin", d:"2 ore|2 hrs", tags:["sport","formativo"], sub:"partecipa",
   p:"Impara a remare in piedi, guardando avanti: la voga veneziana su batela tradizionale.|Learn to row standing, facing forward: Venetian voga on a traditional batela.",
   tip:"A maggio c'è la Vogalonga: migliaia di barche a remi e nessun motore.|In May there's the Vogalonga: thousands of rowing boats and no engines."},

  /* — LENTO — */
  {t:"Cannaregio: la Venezia dei veneziani|Cannaregio: the Venetians' Venice", z:"Cannaregio|Cannaregio", d:"2,5 ore|2.5 hrs", tags:["lento"], sub:"quartieri",
   p:"Il sestiere dove la città vive: il Ghetto più antico del mondo, bacari e fondamenta senza turisti.|The sestiere where the city lives: the world's oldest Ghetto, bacari and tourist-free fondamenta.",
   tip:"La sera le calli si svuotano: resta solo Venezia.|In the evening the calli empty out: only Venice remains."},
  {t:"Dorsoduro e le Zattere|Dorsoduro & the Zattere", z:"Dorsoduro|Dorsoduro", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Il sestiere degli studenti e dell'arte: fondamenta al sole e il Canale della Giudecca di fronte.|The sestiere of students and art: sunlit fondamenta and the Giudecca Canal ahead.",
   tip:"Alle Zattere il tramonto si guarda con un gianduiotto: la merenda dei veneziani.|At the Zattere the sunset is watched with a gianduiotto: the Venetians' snack."},
  {t:"Castello e via Garibaldi|Castello & via Garibaldi", z:"Castello|Castello", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"La Venezia residenziale: via Garibaldi con i suoi negozi di quartiere e l'Arsenale chiuso come un segreto.|Residential Venice: via Garibaldi with its neighbourhood shops and the Arsenale closed like a secret.",
   tip:"Alla fine della strada, la porta dell'Arsenale: due leoni custodiscono il segreto della flotta.|At the street's end, the Arsenale gate: two lions guard the fleet's secret."},
  {t:"Il traghetto a remi del Canal Grande|The Grand Canal rowing ferry", z:"Canal Grande|Grand Canal", d:"10 min|10 min", tags:["lento"], sub:"lente",
   p:"Attraversare il Canal Grande in gondola, in piedi, per pochi euro: il mezzo pubblico più bello del mondo.|Crossing the Grand Canal by gondola, standing, for a few euros: the world's most beautiful public transport.",
   tip:"A Rialto e a Santa Sofia: entra, paga a bordo e resta in piedi come i veneziani.|At Rialto and Santa Sofia: hop in, pay on board and stand like the Venetians."},
  {t:"La sera: la città ai veneziani|The evening: the city of the Venetians", z:"Tutta la città|All over the city", d:"2 ore|2 hrs", tags:["lento"], sub:"lente",
   p:"Alle 18 i day-trippers partono e la città respira: calli buie, fondamenta vuote e passi che echeggiano.|At 6 pm day-trippers leave and the city breathes: dark calli, empty fondamenta and echoing steps.",
   tip:"Scegli una direzione e cammina senza mappa: la Venezia della sera si lascia trovare.|Pick a direction and walk without a map: evening Venice lets itself be found."},

  /* — FORMATIVO — */
  {t:"Corso di cucina veneziana|A Venetian cooking class", z:"Cannaregio|Cannaregio", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Risi e bisi, sarde in saor e baccalà: la cucina di Laguna si impara ai fornelli.|Risi e bisi, sarde in saor and baccalà: Lagoon cooking learned at the stove.",
   tip:"Il mercato di Rialto la mattina, la cucina a mezzogiorno: alcune scuole uniscono i due momenti.|Rialto market in the morning, cooking at noon: some schools combine both."},
  {t:"Laboratorio di maschere|A mask-making workshop", z:"Castello / Cannaregio|Castello / Cannaregio", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Cartapesta e tempera: la tua maschera nasce dalle mani di un maestro mascheraro.|Papier-mâché and paint: your mask is born from a mask-maker's hands.",
   tip:"Le maschere vere in cartapesta pesano poco e profumano di colla: le altre sono souvenir industriali.|Real papier-mâché masks are light and smell of glue: the rest is industrial souvenir."},
  {t:"La Fenice: il teatro che risorge|La Fenice: the theatre that rises again", z:"San Marco|San Marco", d:"1,5 ore|1.5 hrs", tags:["formativo","cultura"], sub:"guide",
   p:"L'opera bruciò due volte e risorse due volte: il tour racconta sale d'oro e rinascite.|The opera house burned twice and rose twice: the tour tells golden rooms and rebirths.",
   tip:"Se trovi biglietto per uno spettacolo serale, prendilo: il teatro vivo è un'altra cosa.|If you find an evening show ticket, take it: the living theatre is another thing."}
];'''

VENEZIA_ITINERARI = r'''const ITINERARI = {
  cultura:[
    {ora:"08:00", t:"Piazza San Marco vuota", p:"La piazza dei gabbiani: la città si sveglia e tu sei già lì.|The square of the seagulls: the city wakes and you're already there."},
    {ora:"13:00", t:"Cicchetti in bacaro", p:"Pranzo in piedi: tre tappe e un'ombra per ognuna.|Lunch standing: three stops and an ombra each."},
    {ora:"15:00", t:"Palazzo Ducale (prenotato)", p:"Sale d'oro e Ponte dei Sospiri: il potere e la sua ombra.|Golden halls and the Bridge of Sighs: power and its shadow."},
    {ora:"19:30", t:"Vaporetto sul Canal Grande", p:"Linea 1 al tramonto: i palazzi si accendono uno a uno.|Line 1 at sunset: the palaces light up one by one."}
  ],
  business:[
    {ora:"09:00", t:"Biennale o meeting", p:"Padiglioni o sala convegno: il mondo arriva in Laguna.|Pavilions or conference hall: the world arrives in the Lagoon."},
    {ora:"13:30", t:"Pranzo rapido a Rialto", p:"In piedi, dieci minuti: niente menù turistici.|Standing, ten minutes: no tourist menus."},
    {ora:"16:00", t:"Pausa: Peggy Guggenheim", p:"Moderni sul Canal Grande: l'antidoto alle slide.|Moderns on the Grand Canal: the antidote to slides."},
    {ora:"19:30", t:"Ombra in bacaro", p:"Il convegno continua in piedi: Select e cicchetti.|The conference continues standing: Select and cicchetti."}
  ],
  food:[
    {ora:"08:00", t:"Caffè in campo", p:"Un espresso al banco, guardando il campanile.|An espresso at the counter, watching the bell tower."},
    {ora:"10:00", t:"Rialto: mercato e pescheria", p:"La Laguna in vendita: guarda il banco del pesce.|The Lagoon for sale: watch the fish counter."},
    {ora:"13:00", t:"Giro dei bacari", p:"Cinque tappe, un cicchetto e un'ombra per ognuna.|Five stops, one cicchetto and one ombra each."},
    {ora:"18:00", t:"Spritz in campo", p:"Select per i locali, Aperol per i turisti: scegli tu.|Select for locals, Aperol for tourists: your call."}
  ],
  religioso:[
    {ora:"07:30", t:"Messa a San Marco", p:"La basilica dorata quasi vuota: messa all'alba.|The golden basilica almost empty: mass at dawn."},
    {ora:"09:30", t:"I Frari", p:"L'Assunta di Tiziano e il silenzio dei frati.|Titian's Assumption and the friars' silence."},
    {ora:"12:30", t:"Pranzo in campo", p:"Un campo qualunque: la vita vera accanto alle chiese.|Any campo: real life beside the churches."},
    {ora:"16:00", t:"San Rocco e Tintoretto", p:"Le tele verticali: la Sistina veneziana.|The vertical canvases: Venice's Sistine."}
  ],
  benessere:[
    {ora:"08:00", t:"Alba e bagno al Lido", p:"Il vaporetto deserto e l'acqua piatta dell'alba.|The empty vaporetto and the flat dawn water."},
    {ora:"10:30", t:"Spa vista Laguna", p:"Vasche affacciate sull'acqua: silenzio garantito.|Pools over the water: guaranteed silence."},
    {ora:"13:30", t:"Pranzo di pesce alle Zattere", p:"Fondamenta al sole e granseola nel guscio.|Sunlit fondamenta and spider crab in its shell."},
    {ora:"17:00", t:"Giardini Reali", p:"La pausa verde a due passi da San Marco.|The green pause steps from San Marco."}
  ],
  sport:[
    {ora:"09:00", t:"Corso di voga veneta", p:"In piedi, remi in mano, guardando avanti.|Standing, oars in hand, facing forward."},
    {ora:"11:30", t:"Bici e bagno al Lido", p:"L'isola piatta si gira in due ore.|The flat island is done in two hours."},
    {ora:"13:00", t:"Pranzo al Lido", p:"Risotto di gò sulla passerella: cucina di mare vero.|Gò risotto on the boardwalk: true sea cooking."},
    {ora:"18:00", t:"Regata o Carnevale", p:"Se sei fortunato: il Canal Grande diventa stadio.|If you're lucky: the Grand Canal becomes a stadium."}
  ],
  lento:[
    {ora:"07:00", t:"Canal Grande all'alba", p:"La città prima dei rumori: solo acqua e passi.|The city before the noise: just water and steps."},
    {ora:"10:00", t:"Cannareggio e il Ghetto", p:"Il sestiere che vive: botteghe, bacari, vicoli.|The living sestiere: shops, bacari, alleys."},
    {ora:"12:30", t:"Zattere e pranzo", p:"Fondamenta al sole, gianduiotto e Giudecca di fronte.|Sunlit fondamenta, gianduiotto and the Giudecca ahead."},
    {ora:"18:00", t:"Calli vuote", p:"I day-trippers partono: la città torna ai veneziani.|Day-trippers leave: the city returns to the Venetians."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di cucina veneziana", p:"Sarde in saor e baccalà: le mani nella tradizione.|Sarde in saor and baccalà: hands in the tradition."},
    {ora:"13:00", t:"Mangi il tuo pranzo", p:"Il risi e bisi fatto da te: giudizio sospeso.|Your own risi e bisi: judgement pending."},
    {ora:"15:30", t:"Laboratorio di maschere", p:"Cartapesta e tempera: la tua maschera nasce.|Papier-mâché and paint: your mask is born."},
    {ora:"18:00", t:"Tour de La Fenice", p:"Il teatro che risorse due volte: storie d'oro.|The theatre that rose twice: golden stories."}
  ]
};'''

VENEZIA_MARCO = r'''const MARCO = [
  {k:["acqua alta","marea","passerell","tide","flood"],
   a:"L'acqua alta arriva soprattutto da ottobre a gennaio: controlla la previsione maree (app gratuita del Comune) la sera prima. Se sale, spuntano le passerelle e si cammina sopra: in due ore tutto rientra. E gli stivali venduti 'per l'occasione' costano il doppio dei normali.|Acqua alta mostly arrives October to January: check the tide forecast (the free city app) the evening before. If it rises, walkways appear and you walk on top: within two hours everything subsides. And boots sold 'for the occasion' cost twice the normal ones."},
  {k:["coda","file","prenot","bigliett","queue","ticket","book","skip","ducale"],
   a:"Il Palazzo Ducale si prenota online: la mattina presto entra poca gente. La basilica di San Marco all'apertura è quasi vuota. Il Campanile: o all'apertura o all'ora di pranzo, quando la fila evapora.|Book the Doge's Palace online: few enter early morning. St Mark's at opening is almost empty. The Bell Tower: either at opening or at lunchtime, when the queue evaporates."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Venezia è tra le città più sicure d'Europa: niente macchine, niente motorini, quasi niente crimine. L'unico rischio è il borseggio sulla linea 1 del vaporetto strapiena e in piazza San Marco: borsa davanti.|Venice is among Europe's safest cities: no cars, no scooters, almost no crime. The only risk is pickpocketing on the packed Line 1 vaporetto and in St Mark's Square: bag in front."},
  {k:["taxi","aeroporto","marco polo","alilaguna","uber","nap","airport","cab"],
   a:"Da Marco Polo tre opzioni: l'Alilaguna (barca pubblica, circa un'ora), il bus per Piazzale Roma, o il taxi acqueo — magnifico e caro: se siete in quattro si divide e diventa quasi sensato.|From Marco Polo three options: the Alilaguna (public boat, about an hour), the bus to Piazzale Roma, or the water taxi — magnificent and expensive: split four ways it becomes almost sensible."},
  {k:["potabil","fontanella","borraccia","bere","water","drink","fountain"],
   a:"L'acqua del rubinetto è potabile e buona. Ogni campo ha quasi la sua fontanella: porta la borraccia e riempila. E i pozzi con la vera in pietra? Erano la riserva della città: oggi decorazione, le fontane funzionano.|Tap water is drinkable and good. Almost every campo has its fountain: bring a bottle and fill it. The stone-rimmed wells? They were the city's reserve: today decoration, the fountains work."},
  {k:["metro","bus","vaporetto","actv","tram","mezz","subway","transport","underground","pass"],
   a:"Niente metro: il vaporetto È la metro di Venezia. Se fai più di tre corse al giorno, il pass giornaliero conviene subito. E il traghetto a remi che attraversa il Canal Grande: in piedi, come i veneziani.|No metro: the vaporetto IS Venice's metro. If you make more than three rides a day, the day pass pays off at once. And the rowing ferry crossing the Grand Canal: standing, like the Venetians."},
  {k:["cena","orario","ristorant","mangiar","aperto","dinner","eat","restaurant","lunch","cicchett","bacaro"],
   a:"I veneziani cenano presto: 19:30-20:30, e le osterie giuste sono piccole: prenota. Il pranzo da veneziano è il giro di bacari: cicchetti al banco con un'ombra. E se un locale vicino a San Marco ha il menù con le foto in sei lingue: allontanati di tre calli.|Venetians dine early: 7:30-8:30, and the right osterie are small: book. A Venetian lunch is the bacaro crawl: counter cicchetti with an ombra. If a place near San Marco has a photo menu in six languages: walk three calli away."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit","coperto"],
   a:"Non obbligatoria: gli spicci al bar, il 5-10% al ristorante. Il 'coperto' nel conto è normale: copre pane e servizio, non è una truffa.|Not compulsory: small change at the bar, 5-10% at the restaurant. 'Coperto' on the bill is normal: it covers bread and service, not a scam."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family"],
   a:"Venezia è la città dei bambini: niente macchine, si corre liberi. Vaporetto (= giro in barca), Burano e i suoi colori, un'ora di voga per i più grandicelli e gelato in campo. Una giornata perfetta si costruisce da sola.|Venice is the children's city: no cars, they run free. Vaporetto (= boat ride), Burano and its colours, an hour of rowing for the older ones and gelato in a campo. A perfect day builds itself."},
  {k:["piogg","piov","rain","weather","wet"],
   a:"Se piove: musei e chiese reggono due giorni pieni. Ma occhio: la pioggia non è acqua alta — quella è marea, e si prevede. Pioggia forte più marea viva possono allagare la piazza: guarda la previsione prima di uscire.|If it rains: museums and churches hold two full days. But mind: rain is not acqua alta — that's tide, and it's forecast. Heavy rain plus high tide can flood the square: check the forecast before going out."},
  {k:["chiesa","vest","copr","spalle","ginocch","basilica","san marco","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Spalle e ginocchia coperte, e alla basilica di San Marco fanno sul serio: ti fermano all'ingresso. Sciarpa leggera in borsa d'estate: risolto in due secondi.|Covered shoulders and knees, and St Mark's takes it seriously: they stop you at the door. A light scarf in your bag in summer: solved in two seconds."},
  {k:["truff","gondola","scam","vetro","glass","petizion","regal"],
   a:"Tre regole. 1) Gondola: costa per barca, non per persona (circa 80€ di giorno per mezz'ora, di più la sera) — le tariffe ufficiali sono esposte: concorda prima di salire. 2) Vetro 'di Murano': compra solo dove vedi la fornace accesa. 3) 'Regali' e petizioni in piazza: un no grazie gentile e si prosegue.|Three rules. 1) Gondola: priced per boat, not per person (about €80 daytime for half an hour, more in the evening) — official rates are posted: agree before boarding. 2) 'Murano' glass: buy only where you see the furnace lit. 3) 'Gifts' and petitions in the square: a kind no thanks and move on."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","spritz","florian","ombra","select"],
   a:"Caffè Florian: sedersi si paga, e con l'orchestra pure di più — avvisano sempre prima, non è una truffa. Al banco spendi un decimo. E lo spritz? Si beve tra le 18 e le 20, in campo, con Select se vuoi passare da locale.|Caffè Florian: sitting costs, and with the orchestra even more — they always warn you first, it's not a scam. At the counter you spend a tenth. And spritz? It's drunk 6 to 8 pm, in a campo, with Select if you want to pass as a local."}
];'''

VENEZIA_FALLBACK = r'''const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: acqua alta, Palazzo Ducale, taxi, vaporetto, gondola, cicchetti, spritz, bambini... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: acqua alta, Doge's Palace, taxi, vaporetto, gondola, cicchetti, spritz, kids... or tap a quick question.";'''

VENEZIA_QUICK = r'''const CHAT_QUICK = [
  "Palazzo Ducale come si prenota?|How do I book the Doge's Palace?",
  "C'è acqua alta?|Is there acqua alta?",
  "Taxi dall'aeroporto?|Taxi from the airport?",
  "Dove mangio cicchetti?|Where do I eat cicchetti?",
  "Quanto costa la gondola?|How much is a gondola ride?"
];'''

VENEZIA_TESTI = {
    "heroK":  "Guida poliedrica · Venezia|The many-sided guide · Venice",
    "heroP":  "Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — da San Marco alla laguna, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from San Marco to the lagoon, a tailor-made itinerary.",
    "footer": "<b>Venezia Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Venezia Poliedrica</b> — educational demo · indicative data: always check official sources",
    "info1p": "Niente macchine: si cammina e si va in vaporetto. Il pass giornaliero ACTV conviene dopo tre corse. Da Marco Polo: Alilaguna (barca, circa 1 ora), bus a Piazzale Roma o taxi acqueo.|No cars: you walk and take the vaporetto. The ACTV day pass pays off after three rides. From Marco Polo: Alilaguna (boat, about 1 hour), bus to Piazzale Roma or water taxi.",
    "info2p": "Aprile–giugno e settembre–ottobre: la città al meglio. Carnevale (febbraio): magico e affollatissimo. Acqua alta tipicamente ottobre–gennaio: guarda la previsione maree.|April–June and September–October: the city at its best. Carnival (February): magical and packed. Acqua alta typically October–January: check the tide forecast.",
    "info3p": "Palazzo Ducale e Itinerari Segreti: prenotazione online. Basilica di San Marco: la mattina presto. Campanile e tour de La Fenice: qualche settimana prima.|Doge's Palace and Secret Itineraries: online booking. St Mark's Basilica: early morning. Bell Tower and La Fenice tour: a few weeks ahead.",
    "chatTitolo": "Alvise · il tuo amico veneziano|Alvise · your Venetian friend",
    "chatBtn": "🙋 Chiedi ad Alvise|🙋 Ask Alvise",
    "benvenuto": "Ciao! Sono Alvise, veneziano doc 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Alvise, a true Venetian 🙋 Ask me anything about the city — or tap a quick question below.",
}

VENEZIA_PALETTE = """:root{
  --terra:#2E7A6B; --terra-dark:#225F53;
  --crema:#F9F5EC; --sabbia:#E9E0CF;
  --oliva:#6F7A52; --ink:#232A2E;
}"""

# ================================================================
#  CONFIGURAZIONE CITTÀ (4 nuove)
# ================================================================

CITTA = [
    {
        "file": "cagliari.html", "nome": "Cagliari", "prefisso": "cag",
        "titolo": "Cagliari Poliedrica — La guida che si adatta a te",
        "titolo_js": "Cagliari Poliedrica — La guida che si adatta a te|Polyedric Cagliari — The guide that adapts to you",
        "kicker": "Guida poliedrica · Cagliari",
        "assistente": "Efisio",
        "chat_head": "Efisio · il tuo amico sardo",
        "chat_btn": "🙋 Chiedi a Efisio",
        "desc": "Guida poliedrica di Cagliari: golfo, Castello e fenicotteri — esperienze e itinerari per 8 profili di viaggiatore. Bilingue IT/EN.",
        "palette": CAGLIARI_PALETTE, "testi": CAGLIARI_TESTI,
        "sonda": 'sub:"torri"',
        "blocchi": [
            ("const SOTTO = {",      "/* ---------- TIPI",           CAGLIARI_SOTTO),
            ("const TIPI = [",       "/* ---------- ESPERIENZE",     CAGLIARI_TIPI),
            ("const ESPERIENZE = [", "/* ---------- ITINERARI",      CAGLIARI_ESPERIENZE),
            ("const ITINERARI = {",  "/* ---------- FOTO",           CAGLIARI_ITINERARI),
            ("const MARCO = [",      "const MARCO_FALLBACK",         CAGLIARI_MARCO),
            ("const MARCO_FALLBACK", "const CHAT_QUICK",             CAGLIARI_FALLBACK),
            ("const CHAT_QUICK = [", "/* ============ RIFERIMENTI DOM", CAGLIARI_QUICK),
        ],
    },
    {
        "file": "torino.html", "nome": "Torino", "prefisso": "tor",
        "titolo": "Torino Poliedrica — La guida che si adatta a te",
        "titolo_js": "Torino Poliedrica — La guida che si adatta a te|Polyedric Turin — The guide that adapts to you",
        "kicker": "Guida poliedrica · Torino",
        "assistente": "Carlotta",
        "chat_head": "Carlotta · la tua amica torinese",
        "chat_btn": "🙋 Chiedi a Carlotta",
        "desc": "Guida poliedrica di Torino: Egizio, portici e cioccolato — esperienze e itinerari per 8 profili di viaggiatore. Bilingue IT/EN.",
        "palette": TORINO_PALETTE, "testi": TORINO_TESTI,
        "sonda": 'sub:"palazzi"',
        "blocchi": [
            ("const SOTTO = {",      "/* ---------- TIPI",           TORINO_SOTTO),
            ("const TIPI = [",       "/* ---------- ESPERIENZE",     TORINO_TIPI),
            ("const ESPERIENZE = [", "/* ---------- ITINERARI",      TORINO_ESPERIENZE),
            ("const ITINERARI = {",  "/* ---------- FOTO",           TORINO_ITINERARI),
            ("const MARCO = [",      "const MARCO_FALLBACK",         TORINO_MARCO),
            ("const MARCO_FALLBACK", "const CHAT_QUICK",             TORINO_FALLBACK),
            ("const CHAT_QUICK = [", "/* ============ RIFERIMENTI DOM", TORINO_QUICK),
        ],
    },
    {
        "file": "firenze.html", "nome": "Firenze", "prefisso": "fir",
        "titolo": "Firenze Poliedrica — La guida che si adatta a te",
        "titolo_js": "Firenze Poliedrica — La guida che si adatta a te|Polyedric Florence — The guide that adapts to you",
        "kicker": "Guida poliedrica · Firenze",
        "assistente": "Lorenzo",
        "chat_head": "Lorenzo · il tuo amico fiorentino",
        "chat_btn": "🙋 Chiedi a Lorenzo",
        "desc": "Guida poliedrica di Firenze: cupola, Oltrarno e Rinascimento — esperienze e itinerari per 8 profili di viaggiatore. Bilingue IT/EN.",
        "palette": FIRENZE_PALETTE, "testi": FIRENZE_TESTI,
        "sonda": 'sub:"viste"',
        "blocchi": [
            ("const SOTTO = {",      "/* ---------- TIPI",           FIRENZE_SOTTO),
            ("const TIPI = [",       "/* ---------- ESPERIENZE",     FIRENZE_TIPI),
            ("const ESPERIENZE = [", "/* ---------- ITINERARI",      FIRENZE_ESPERIENZE),
            ("const ITINERARI = {",  "/* ---------- FOTO",           FIRENZE_ITINERARI),
            ("const MARCO = [",      "const MARCO_FALLBACK",         FIRENZE_MARCO),
            ("const MARCO_FALLBACK", "const CHAT_QUICK",             FIRENZE_FALLBACK),
            ("const CHAT_QUICK = [", "/* ============ RIFERIMENTI DOM", FIRENZE_QUICK),
        ],
    },
    {
        "file": "venezia.html", "nome": "Venezia", "prefisso": "ven",
        "titolo": "Venezia Poliedrica — La guida che si adatta a te",
        "titolo_js": "Venezia Poliedrica — La guida che si adatta a te|Polyedric Venice — The guide that adapts to you",
        "kicker": "Guida poliedrica · Venezia",
        "assistente": "Alvise",
        "chat_head": "Alvise · il tuo amico veneziano",
        "chat_btn": "🙋 Chiedi ad Alvise",
        "desc": "Guida poliedrica di Venezia: canali, bacari e laguna — esperienze e itinerari per 8 profili di viaggiatore. Bilingue IT/EN.",
        "palette": VENEZIA_PALETTE, "testi": VENEZIA_TESTI,
        "sonda": 'sub:"cicchetti"',
        "blocchi": [
            ("const SOTTO = {",      "/* ---------- TIPI",           VENEZIA_SOTTO),
            ("const TIPI = [",       "/* ---------- ESPERIENZE",     VENEZIA_TIPI),
            ("const ESPERIENZE = [", "/* ---------- ITINERARI",      VENEZIA_ESPERIENZE),
            ("const ITINERARI = {",  "/* ---------- FOTO",           VENEZIA_ITINERARI),
            ("const MARCO = [",      "const MARCO_FALLBACK",         VENEZIA_MARCO),
            ("const MARCO_FALLBACK", "const CHAT_QUICK",             VENEZIA_FALLBACK),
            ("const CHAT_QUICK = [", "/* ============ RIFERIMENTI DOM", VENEZIA_QUICK),
        ],
    },
]

# ================================================================
#  LANDING AGGIORNATA (7 città)
# ================================================================

LANDING = r'''<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guide Poliedriche — la guida che si adatta a te</title>
<style>
  :root{--terra:#B5432C;--crema:#F8F2E7;--sabbia:#EAE0C9;--ink:#2A2724;--muted:#6E675C;--oliva:#69704F}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--crema);color:var(--ink);
    min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;padding:40px 20px;line-height:1.6}
  .kicker{letter-spacing:.14em;text-transform:uppercase;font-size:.78rem;color:var(--terra);font-weight:700}
  h1{font-family:Georgia,serif;font-size:clamp(2rem,5vw,3rem);margin:10px 0 8px}
  h1 em{color:var(--terra)}
  .sotto{color:var(--muted);max-width:560px;margin-bottom:44px}
  .citta{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;max-width:960px;width:100%}
  .card{display:block;text-decoration:none;background:#FFFDF8;border:2px solid var(--sabbia);
    border-radius:14px;padding:26px 18px;transition:transform .15s,box-shadow .15s,border-color .15s}
  .card:hover{transform:translateY(-4px);border-color:var(--terra);box-shadow:0 6px 20px rgba(42,39,36,.12)}
  .card .emo{font-size:2.2rem}
  .card b{display:block;font-family:Georgia,serif;font-size:1.3rem;margin:8px 0 4px}
  .card small{color:var(--muted);font-size:.82rem}
  footer{margin-top:48px;font-size:.8rem;color:var(--muted)}
</style>
</head>
<body>
  <span class="kicker">Guide poliedriche</span>
  <h1>Una guida, <em>otto viaggiatori</em></h1>
  <p class="sotto">Scegli una delle sette città: esperienze, itinerari e consigli si adattano
     al tuo profilo. Bilingue IT/EN, preferiti salvati, assistente locale.</p>
  <div class="citta">
    <a class="card" href="roma.html"><span class="emo">🏛️</span><b>Roma</b><small>La città eterna: arte, fede e dolce vita</small></a>
    <a class="card" href="napoli.html"><span class="emo">🌋</span><b>Napoli</b><small>Pizza, golfo e vicoli che cantano</small></a>
    <a class="card" href="milano.html"><span class="emo">🏙️</span><b>Milano</b><small>Design, aperitivi e la città che si reinventa</small></a>
    <a class="card" href="cagliari.html"><span class="emo">🦩</span><b>Cagliari</b><small>Golfo, castello e fenicotteri in città</small></a>
    <a class="card" href="torino.html"><span class="emo">🍫</span><b>Torino</b><small>Egizio, portici e cioccolato</small></a>
    <a class="card" href="firenze.html"><span class="emo">🎨</span><b>Firenze</b><small>Cupola, Rinascimento e artigiani</small></a>
    <a class="card" href="venezia.html"><span class="emo">🛶</span><b>Venezia</b><small>Canali, bacari e magia lagunare</small></a>
  </div>
  <footer>260 esperienze totali · demo educative · verificare sempre fonti ufficiali</footer>
</body>
</html>'''

# ================================================================
#  README AGGIORNATO
# ================================================================

README = '''# 🏛️ Guide Poliedriche — sette città d'Italia

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
    ├── kit_poliedrico.py    → generatore città 1–3
    ├── kit_poliedrico_2.py  → generatore città 4–7
    └── README.md

## 🚀 Come usarlo

Apri `index.html` nel browser e scegli la città. Nessuna installazione.

## 🖥️ Rigenerare le città (opzionale, richiede Python 3)

    python kit_poliedrico.py     # Roma + Napoli + Milano + landing 3 città
    python kit_poliedrico_2.py   # Cagliari + Torino + Firenze + Venezia + landing 7 città

I file città vengono rigenerati da zero a ogni lancio.

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
'''

# ================================================================
#  FUNZIONI (funzionano da QUALSIASI città base)
# ================================================================

def sostituisci_blocco(html, inizio, fine, nuovo, etichetta):
    i = html.find(inizio)
    if i < 0:
        raise SystemExit("[X] %s: marker iniziale non trovato: %r" % (etichetta, inizio))
    j = html.find(fine, i + len(inizio))
    if j < 0:
        raise SystemExit("[X] %s: marker finale non trovato: %r" % (etichetta, fine))
    return html[:i] + nuovo.strip() + "\n\n" + html[j:]


def sostituisci_chiave(html, chiave, valore):
    pattern = re.compile(re.escape(chiave) + r':"[^"]*"')
    nuovo, n = pattern.subn(lambda m: chiave + ':"' + valore + '"', html, count=1)
    if n != 1:
        raise SystemExit("[X] chiave TESTI non trovata: " + chiave)
    return nuovo


def applica_citta(html, c):
    h = html
    for inizio, fine, nuovo in c["blocchi"]:
        h = sostituisci_blocco(h, inizio, fine, nuovo, c["nome"])
    for chiave, valore in c["testi"].items():
        h = sostituisci_chiave(h, chiave, valore)
    h, n = re.subn(r":root\s*\{[^}]*\}", c["palette"], h, count=1)
    if n != 1:
        raise SystemExit("[X] %s: :root non trovata" % c["nome"])
    h = re.sub(r"<title>[^<]*</title>", lambda m: "<title>" + c["titolo"] + "</title>", h, count=1)
    h = re.sub(r'document\.title = tr\("[^"]*"\);',
               lambda m: 'document.title = tr("' + c["titolo_js"] + '");', h, count=1)
    h = re.sub(r'(<span class="logo">)[A-Za-z]+ <b>Poliedrica</b>(</span>)',
               lambda m: '<span class="logo">' + c["nome"] + ' <b>Poliedrica</b></span>', h, count=1)
    h = re.sub(r"Guida poliedrica · [A-Za-zÀ-ÿ]+", lambda m: c["kicker"], h, count=1)
    h = re.sub(r'(<div class="chat-head">\s*<b>)[^<]*(</b>)',
               lambda m: m.group(1) + c["chat_head"] + "</b>", h, count=1)
    h = re.sub(r'(<button id="chatBtn"[^>]*>)[^<]*(</button>)',
               lambda m: m.group(1) + c["chat_btn"] + "</button>", h, count=1)
    h = re.sub(r'aria-label="Chat con [^"]*"',
               lambda m: 'aria-label="Chat con ' + c["assistente"] + ', amico locale"', h, count=1)
    h = re.sub(r'<meta name="description" content="[^"]*"',
               lambda m: '<meta name="description" content="' + c["desc"] + '"', h, count=1)
    m = re.search(r'localStorage\.getItem\("([a-z]{2,4})_lingua"\)', h)
    if not m:
        raise SystemExit("[X] %s: prefisso localStorage non trovato" % c["nome"])
    vecchio = m.group(1)
    h = h.replace(vecchio + "_lingua", c["prefisso"] + "_lingua")
    h = h.replace(vecchio + "_preferiti", c["prefisso"] + "_preferiti")
    n_esp = len(re.findall(r'\{t:"', h))
    h = re.sub(r"<b>\d+</b><span>esperienze", lambda m: "<b>%d</b><span>esperienze" % n_esp, h, count=1)
    h = re.sub(r"ESPERIENZE \(\d+\)", lambda m: "ESPERIENZE (%d)" % n_esp, h, count=1)
    return h, n_esp


def verifica(h, c, n_esp, citta_base):
    problemi = []
    if citta_base != c["nome"] and re.search(r"\b" + citta_base + r"\b", h):
        problemi.append("restano riferimenti a '%s'" % citta_base)
    if c["sonda"] not in h:
        problemi.append("sonda non trovata: " + c["sonda"])
    if h.count("const ESPERIENZE") != 1:
        problemi.append("blocco ESPERIENZE duplicato o mancante")
    return problemi


def trova_base():
    for nome in ("index.html", "roma.html", "napoli.html", "milano.html"):
        p = CARTELLA / nome
        if p.exists():
            txt = p.read_text(encoding="utf-8")
            if "const ESPERIENZE" in txt and "chipGrid" in txt:
                m = re.search(r'<span class="logo">([A-Za-z]+) <b>Poliedrica</b>', txt)
                citta_base = m.group(1) if m else "?"
                print("[OK] file base trovato: %s (%s)" % (nome, citta_base))
                return txt, citta_base
    raise SystemExit("[X] Nessun file città base trovato: servono roma/napoli/milano.html")


def scrivi(nome, contenuto):
    p = CARTELLA / nome
    p.write_text(contenuto, encoding="utf-8")
    print("    [OK] %-15s (%.0f KB)" % (nome, p.stat().st_size / 1024.0))


def main():
    print("=" * 62)
    print("  KIT POLIEDRICO 2 — Cagliari · Torino · Firenze · Venezia")
    print("=" * 62)

    for richiesto in ("roma.html", "napoli.html", "milano.html"):
        if not (CARTELLA / richiesto).exists():
            raise SystemExit("[X] Manca %s: lancia prima kit_poliedrico.py" % richiesto)

    base, citta_base = trova_base()

    for c in CITTA:
        print("\nGenero %s (assistente: %s)..." % (c["file"], c["assistente"]))
        h, n = applica_citta(base, c)
        problemi = verifica(h, c, n, citta_base)
        if problemi:
            print("    [!!] " + "; ".join(problemi))
        print("    %d esperienze · 8 itinerari" % n)
        scrivi(c["file"], h)

    print("\nAggiorno landing (7 città) e README...")
    scrivi("index.html", LANDING)
    scrivi("README.md", README)

    print("\n" + "=" * 62)
    print("  FATTO! Ora il network conta 7 città e 260 esperienze:")
    print("    index.html -> landing | roma · napoli · milano · cagliari")
    print("                  torino · firenze · venezia")
    print()
    print("  VERIFICA RAPIDA:")
    print("    1. Apri index.html: 7 card città")
    print("    2. venezia.html -> profilo Food -> 'Cicchetti e bacari'")
    print("    3. Chiedi ad Alvise: 'c'è acqua alta?'")
    print("    4. Preferiti salvati su una città NON passano alle altre")
    print("=" * 62)


if __name__ == "__main__":
    main()