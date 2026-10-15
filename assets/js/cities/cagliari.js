(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Cagliari|The many-sided guide · Cagliari",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dal golfo al Castello, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the gulf to the Castello, a tailor-made itinerary.",
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
  info1p:"Niente metro: la città è compatta e si fa a piedi su e giù per i quartieri. Bus CTM in città, ARST per Nora e i borghi. L'aeroporto Elmas è a 10 minuti.|No metro: the city is compact and done on foot, up and down the districts. CTM buses in town, ARST for Nora and villages. Elmas airport is 10 minutes away.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Maggio–giugno e settembre–ottobre: luce perfetta e mare caldo. Luglio–agosto caldo forte: al mare si sta, in città si suda.|May–June and September–October: perfect light and calm sea. July–August strong heat: fine at the beach, sweaty in town.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Tour a Nora, battelli per Villasimius e tour in barca: prenota un giorno prima in alta stagione. Musei e siti antichi si visitano con calma.|Tours to Nora, boats to Villasimius and boat trips: book a day ahead in high season. Museums and ancient sites are visited calmly.",
  footer:"<b>Cagliari Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Cagliari Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Efisio · il tuo amico sardo|Efisio · your Sardinian friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Efisio|🙋 Ask Efisio", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! So' Efisio, cagliaritano e sardo verace 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Efisio, a true Cagliaritan and Sardinian 🙋 Ask me anything about the city — or tap a quick question below.",
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
};

/* ---------- TIPI DI LOCALE (3° livello, solo food) ---------- */
const TIPI = [
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"agriturismo", emoji:"🌾", nome:"Agriturismo|Farm restaurant"},
  {id:"panificio",   emoji:"🥖", nome:"Panificio|Bakery"},
  {id:"bar",         emoji:"☕", nome:"Bar e caffè|Bar & café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (37) ---------- */
const ESPERIENZE = [
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
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
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
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: code, fenicotteri, taxi, Elmas, cena, bambini, pioggia, parcheggi, caffè... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: queues, flamingos, taxi, Elmas, dinner, kids, rain, parking, coffee... or tap a quick question.";

const CHAT_QUICK = [
  "Come evito le code?|How do I skip the queues?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Elmas?|Taxi from Elmas?",
  "Dove vedo i fenicotteri?|Where can I see flamingos?",
  "Cena a che ora?|What time is dinner?"
];


Guide.init({storageKey:"cag", pageTitle:"Cagliari Poliedrica — La guida che si adatta a te|Polyedric Cagliari — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
