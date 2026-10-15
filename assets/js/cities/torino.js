(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Torino|The many-sided guide · Turin",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dalla Mole ai portici, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the Mole to the portici, a tailor-made itinerary.",
  cta1:"Trova il tuo profilo ↓|Find your profile ↓",
  cta2:"Vedi tutte le esperienze|See all experiences",
  stat1:"profili di viaggiatore|traveller profiles",
  stat2:"esperienze selezionate|curated experiences",
  stat3:"itinerari pronti|ready itineraries",
  step1k:"Passo 1|Step 1", step1h:"Che tipo di viaggiatore sei?|What kind of traveller are you?",
  step1p:"Tocca un profilo: esperienze e itinerario si filtrano subito. Nessuna selezione = vedi tutto.|Tap a profile: experiences and itinerary filter instantly. No selection = see everything.",
  step2k:"Passo 2|Step 2", step2h:"Esperienze su misura|Tailored experiences",
  legenda:"💡 Le esperienze con più tag appartengono a più profili: nel menu a tendina compaiono sotto la loro sotto-categoria principale.|💡 Multi-tag experiences belong to several profiles: they appear under their main subcategory.",
  step3k:"Passo 3|Step 3", step3h:"Il tuo giorno ideale|Your perfect day",
  itin1:"Seleziona un profilo qui sopra per comporre la tua giornata perfetta.|Select a profile above to compose your perfect day.",
  itin2:"👆 Scegli prima <b>chi sei come viaggiatore</b>: l'itinerario del giorno appare qui.|👆 First choose <b>who you are as a traveller</b>: the day itinerary appears here.",
  infoK:"Prima di partire|Before you go", infoH:"Info pratiche|Practical info",
  info1h:"🚇 Muoversi|🚇 Getting around",
  info1p:"Metro automatica e tram storici: muoversi è facile, biglietti in app GTT o in edicola. Da Caselle: bus per Porta Nuova in 40 minuti. Il centro si fa a piedi sotto i portici.|Driverless metro and historic trams: getting around is easy, tickets in the GTT app or at newsstands. From Caselle: bus to Porta Nuova in 40 minutes. The centre is done on foot under the portici.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Aprile–maggio e settembre–ottobre: la città al meglio. D'inverno nebbia e cioccolato caldo: atmosfera da romanzo. Estate: caldo vero, sfrutta i musei.|April–May and September–October: the city at its best. In winter, fog and hot chocolate: novel-like atmosphere. Summer: real heat, make the most of museums.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Il Museo Egizio richiede prenotazione online con fascia oraria. Terrazze della Mole e tour dell'Allianz Stadium: qualche settimana di anticipo.|The Egyptian Museum requires online booking with a time slot. Mole lift and Allianz Stadium tour: a few weeks ahead.",
  footer:"<b>Torino Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Torino Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Carlotta · la tua amica torinese|Carlotta · your Turinese friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Carlotta|🙋 Ask Carlotta", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! Sono Carlotta, milanese? No: torinese doc 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Carlotta, a true Turinese 🙋 Ask me anything about the city — or tap a quick question below.",
  favBtn:"❤ Preferiti|❤ Favorites", favTitolo:"I tuoi preferiti|Your favorites",
  svuota:"Svuota|Clear all",
  favVuoto:"Nessun preferito per ora: tocca la stella ☆ su una card per salvarla.|No favorites yet: tap the ☆ star on a card to save it.",
  toastAgg:"Aggiunto ai preferiti ★|Added to favorites ★",
  toastRim:"Rimosso dai preferiti|Removed from favorites",
  salva:"Salva nei preferiti|Save to favorites",
  rimuovi:"Rimuovi dai preferiti|Remove from favorites"
};

/* ---------- PROFILI ---------- */
const PROFILI = [
  {id:"cultura",   emoji:"🏛️", nome:"Culturale|Cultural",            claim:"Storia viva a ogni angolo|Living history at every corner"},
  {id:"business",  emoji:"💼", nome:"Business & Bleisure|Business & Bleisure", claim:"Congressi di giorno, dolce vita di sera|Congress by day, la dolce vita by night"},
  {id:"food",      emoji:"🍝", nome:"Enogastronomico|Food & Wine",    claim:"Quartieri, sughi e mercati rionali|Districts, sauces and local markets"},
  {id:"religioso", emoji:"⛪", nome:"Religioso & Spirituale|Religious & Spiritual", claim:"La città delle basiliche|The city of basilicas"},
  {id:"benessere", emoji:"🌿", nome:"Benessere & Medicale|Wellness & Medical", claim:"Rigenerarsi tra terme e parchi|Recharge among spas and parks"},
  {id:"sport",     emoji:"🏟️", nome:"Sport & Grandi Eventi|Sports & Major Events", claim:"Stadi, maratone, palchi epici|Stadiums, marathons, epic stages"},
  {id:"lento",     emoji:"🚲", nome:"Lento & Sostenibile|Slow & Sustainable", claim:"La Roma dei quartieri, a ritmo umano|The Rome of neighborhoods, at human pace"},
  {id:"formativo", emoji:"🎓", nome:"Formativo|Educational",          claim:"Imparare qualcosa che resta|Learn something that stays"}
];

/* ---------- SOTTO-CATEGORIE ---------- */
const SOTTO = {
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
};

/* ---------- TIPI DI LOCALE (3° livello, solo food) ---------- */
const TIPI = [
  {id:"ristorante",   emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",    emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",      emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"caffè",        emoji:"☕", nome:"Caffè storico|Historic café"},
  {id:"cioccolateria",emoji:"🍫", nome:"Cioccolateria|Chocolate shop"},
  {id:"bar",          emoji:"🍹", nome:"Bar|Bar"},
  {id:"mercato",      emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (36) ---------- */
const ESPERIENZE = [
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
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
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
};

/* ---------- FOTO + IMMAGINI ---------- */
const FOTO = {
  cultura:{bg:"linear-gradient(135deg,#D9C79E,#B78B4B)", emo:"🏛️"},
  business:{bg:"linear-gradient(135deg,#9FB4C7,#5B7899)", emo:"💼"},
  food:{bg:"linear-gradient(135deg,#E8A87C,#B5432C)", emo:"🍝"},
  religioso:{bg:"linear-gradient(135deg,#F0E6D2,#C9A66B)", emo:"⛪"},
  benessere:{bg:"linear-gradient(135deg,#B7C9A8,#69704F)", emo:"🌿"},
  sport:{bg:"linear-gradient(135deg,#E3B7A0,#A03D2E)", emo:"🏟️"},
  lento:{bg:"linear-gradient(135deg,#CDBF9A,#8F9770)", emo:"🚲"},
  formativo:{bg:"linear-gradient(135deg,#AFC5C4,#5F807D)", emo:"🎓"}
};
const IMMAGINI = { };

/* ---------- MARCO / MARK ---------- */
const MARCO = [
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
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: Egizio, taxi, Caselle, metro, cena, bambini, pioggia, cioccolato, bicerin... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: Egyptian Museum, taxi, Caselle, metro, dinner, kids, rain, chocolate, bicerin... or tap a quick question.";

const CHAT_QUICK = [
  "Il Museo Egizio come si prenota?|How do I book the Egyptian Museum?",
  "È sicura la sera?|Is it safe at night?",
  "Come arrivo da Caselle?|How do I get from Caselle?",
  "Dove mangio cioccolato?|Where do I eat chocolate?",
  "Cena a che ora?|What time is dinner?"
];


Guide.init({storageKey:"tor", pageTitle:"Torino Poliedrica — La guida che si adatta a te|Polyedric Turin — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
