(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Roma|The many-sided guide · Rome",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — esperienze, consigli e un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — experiences, tips and a tailor-made itinerary.",
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
  info1p:"Metro A e B coprono i principali hub. Il biglietto dura 100 minuti e include un cambio. Cammina: il centro si attraversa a piedi.|Metro A and B cover the main hubs. A ticket lasts 100 minutes and includes one transfer. Walk: the centre is crossable on foot.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Aprile–maggio e ottobre: clima ottimo. Agosto: caldo intenso ma città vuota (molti ristoranti chiusi). Eventi sportivi: primavera.|April–May and October: great weather. August: intense heat but an empty city (many restaurants closed). Sports events: spring.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Colosseo, Musei Vaticani e Galleria Borghese richiedono prenotazione con orario. Prenota tutto almeno 2–3 settimane prima.|The Colosseum, Vatican Museums and Galleria Borghese require timed reservations. Book at least 2–3 weeks ahead.",
  footer:"<b>Roma Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Roma Poliedrica</b> — educational demo · indicative data: always check times and prices on official websites",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Marco · il tuo amico romano|Mark · your Roman friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Marco|🙋 Ask Mark", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! Sono Marco, romano de Roma 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Mark, a born-and-raised Roman 🙋 Ask me anything about the city — or tap a quick question below.",
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
    {id:"musei",  emoji:"🖼️", nome:"Musei e gallerie|Museums & galleries"},
    {id:"archeo", emoji:"🏺", nome:"Siti archeologici|Archaeological sites"},
    {id:"modern", emoji:"🏗️", nome:"Arte contemporanea e architettura|Contemporary art & architecture"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e meeting|Congresses & meetings"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"romana", emoji:"🍝", nome:"Cucina tipica romana|Roman & typical cuisine"},
    {id:"alta",   emoji:"🍽️", nome:"Ristoranti e alta cucina|Restaurants & fine dining"},
    {id:"sushi",  emoji:"🍣", nome:"Sushi e ramen|Sushi & ramen"},
    {id:"cinese", emoji:"🥡", nome:"Cucina cinese|Chinese cuisine"},
    {id:"greca",  emoji:"🫒", nome:"Cucina greca|Greek cuisine"},
    {id:"street", emoji:"🧺", nome:"Mercati e street food|Markets & street food"},
    {id:"dolci",  emoji:"🍨", nome:"Dolci, caffè e gelati|Sweets, coffee & gelato"}
  ],
  religioso: [
    {id:"basiliche",  emoji:"⛪",  nome:"Basiliche papali|Papal basilicas"},
    {id:"chiese",     emoji:"🕯️", nome:"Chiese e siti minori|Churches & minor sites"},
    {id:"pellegrini", emoji:"🥾",  nome:"Percorsi di pellegrinaggio|Pilgrimage routes"}
  ],
  benessere: [
    {id:"terme", emoji:"♨️", nome:"Terme e acque termali|Thermal baths & waters"},
    {id:"spa",   emoji:"💆", nome:"Spa e massaggi|Spas & massages"},
    {id:"verde", emoji:"🌳", nome:"Parchi e natura urbana|Parks & urban nature"}
  ],
  sport: [
    {id:"calcio",    emoji:"⚽", nome:"Calcio e stadio|Football & stadium"},
    {id:"eventi",    emoji:"🎪", nome:"Concerti e grandi eventi|Concerts & major events"},
    {id:"partecipa", emoji:"🏃", nome:"Sport da praticare|Sports to play"}
  ],
  lento: [
    {id:"quartieri", emoji:"🏘️", nome:"Quartieri autentici|Authentic neighborhoods"},
    {id:"parchi",    emoji:"🌿", nome:"Parchi e natura|Parks & nature"},
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
  {id:"ristorante", emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",  emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",    emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"taverna",    emoji:"🕯️", nome:"Taverna|Tavern"},
  {id:"bistrot",    emoji:"🥂", nome:"Bistrò|Bistro"},
  {id:"mercato",    emoji:"🧺", nome:"Mercato|Market"},
  {id:"bar",        emoji:"☕", nome:"Bar e pasticceria|Bar & pastry shop"}
];

/* ---------- ESPERIENZE (36) ---------- */
const ESPERIENZE = [
  {t:"Colosseo, Foro e Palatino|Colosseum, Forum & Palatine", z:"Fori Imperiali|Imperial Fora", d:"3 ore|3 hrs", tags:["cultura"], sub:"archeo",
   p:"L'anfiteatro più celebre al mondo e il cuore politico dell'Impero in un solo biglietto.|The world's most famous amphitheatre and the political heart of the Empire, one ticket for all.",
   tip:"Prenota il primo ingresso della mattina: code minime e luce migliore.|Book the first morning slot: minimal queues, better light."},
  {t:"Ostia Antica, la Roma di mare|Ostia Antica, Rome by the sea", z:"Ostia Antica|Ostia Antica", d:"mezza giornata|half day", tags:["cultura"], sub:"archeo",
   p:"Scavi tra i meglio conservati d'Italia: teatro, terme e taberne della città-porto dell'Impero.|Some of Italy's best-preserved ruins: theatre, baths and shopfronts of the Empire's port city.",
   tip:"Treno Roma-Lido da Piramide: 30 minuti e sei nell'antichità, con pochissimi turisti.|Roma–Lido train from Piramide: 30 minutes into antiquity, with very few tourists."},
  {t:"Musei Vaticani e Cappella Sistina|Vatican Museums & Sistine Chapel", z:"Vaticano|Vatican", d:"4 ore|4 hrs", tags:["cultura","religioso"], sub:"musei",
   p:"Chilometri di capolavori, da Raffaello fino allo strabiliante soffitto di Michelangelo.|Kilometres of masterpieces, from Raphael to Michelangelo's breathtaking ceiling.",
   tip:"D'estate prova il venerdì sera: atmosfera quasi irreale.|In summer try Friday evening: an almost unreal atmosphere."},
  {t:"Galleria Borghese|Galleria Borghese", z:"Pinciano|Pinciano", d:"2 ore|2 hrs", tags:["cultura"], sub:"musei",
   p:"Bernini e Caravaggio dentro una villa da cartolina, immersa nel parco.|Bernini and Caravaggio inside a postcard villa, set in the park.",
   tip:"Ingresso solo su prenotazione con fascia oraria: arriva 30 minuti prima.|Entry only with a timed reservation: arrive 30 minutes early."},
  {t:"MAXXI e Roma contemporanea|MAXXI & contemporary Rome", z:"Flaminio|Flaminio", d:"2 ore|2 hrs", tags:["cultura"], sub:"modern",
   p:"L'avvolgente architettura di Zaha Hadid ospita il meglio dell'arte del presente.|Zaha Hadid's sweeping architecture hosts the best of contemporary art.",
   tip:"Combinalo con una passeggiata fino a Villa Giulia e al Ponte della Musica.|Combine it with a walk to Villa Giulia and the Ponte della Musica."},
  {t:"Quartiere Coppedè|Coppedè district", z:"Trieste|Trieste", d:"1,5 ore|1.5 hrs", tags:["cultura","lento"], sub:"modern",
   p:"Un pugno di palazzi liberty che sembrano usciti da una fiaba, quasi sconosciuti ai turisti.|A handful of Art Nouveau palaces straight out of a fairytale, almost unknown to tourists.",
   tip:"Gratis e poco battuto: vai la mattina, con la luce laterale.|Free and uncrowded: go in the morning, with side light."},

  {t:"EUR e La Nuvola|EUR & La Nuvola", z:"EUR|EUR", d:"mezza giornata|half day", tags:["business","cultura"], sub:"congressi",
   p:"Il razionalismo architettonico incontra il centro congressi di Fuksas, simbolo della Roma business.|Rationalist architecture meets Fuksas's congress centre, symbol of business Rome.",
   tip:"Metro B da Termini in 15 minuti: perfetto tra due meeting.|Metro B from Termini in 15 minutes: perfect between two meetings."},
  {t:"Aperitivo bleisure nel Tridente|Bleisure aperitivo in the Tridente", z:"Centro|Centre", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Da via Margutta a piazza del Popolo: il rito romano del dopo-lavoro, tra terrazze e wine bar.|From via Margutta to piazza del Popolo: Rome's after-work ritual, between rooftops and wine bars.",
   tip:"Molti hotel business aprono l'happy hour anche agli esterni: chiedi alla reception.|Many business hotels open their happy hour to outsiders: ask at reception."},
  {t:"Tivoli in giornata|Tivoli day trip", z:"Fuori porta|Out of town", d:"8 ore|8 hrs", tags:["business","cultura"], sub:"bleisure",
   p:"Villa d'Este e Villa Adriana: la gita perfetta per chi estende il viaggio di lavoro di un giorno.|Villa d'Este and Villa Adriana: the perfect outing to extend a work trip by one day.",
   tip:"Treno da Tiburtina o bus Cotral da Ponte Mammolo: circa 1 ora.|Train from Tiburtina or Cotral bus from Ponte Mammolo: about an hour."},

  {t:"Il Ghetto e i carciofi alla giudia|The Jewish Ghetto & fried artichokes", z:"Centro storico|Historic centre", d:"2 ore|2 hrs", tags:["food","cultura"], sub:"romana", tipo:"trattoria",
   p:"La cucina giudeo-romanesca, una delle tradizioni gastronomiche più antiche d'Europa.|Judeo-Roman cuisine, one of Europe's oldest food traditions.",
   tip:"Prenota con anticipo: le trattorie storiche si riempiono presto.|Book ahead: the historic trattorias fill up early."},
  {t:"Carbonara, cacio e pepe, amatriciana|Carbonara, cacio e pepe, amatriciana", z:"Trastevere / Monti|Trastevere / Monti", d:"3 ore|3 hrs", tags:["food","lento"], sub:"romana", tipo:"osteria",
   p:"Il tris di quartiere: trattorie e osterie vere dove la pasta è tirata a mano e il Pecorino domina.|The district tris: real trattorias and osterie where pasta is hand-rolled and Pecorino rules.",
   tip:"Evita i locali con menù tradotto in 8 lingue: cammina due traverse e trovi di meglio.|Skip menus translated into 8 languages: walk two streets over for better."},
  {t:"Alta cucina e bistrot d'autore|Fine dining & author bistros", z:"Centro / Prati|Centre / Prati", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"Dalla sperimentazione dei bistrot del centro fino alla crema dell'alta cucina italiana.|From the experimental bistros of the centre to the cream of Italian fine dining.",
   tip:"I bistrot di Monti e Prati offrono menu degustazione a metà prezzo delle stellate.|Bistros in Monti and Prati offer tasting menus at half the price of starred restaurants."},
  {t:"Sushi e ramen d'eccellenza|Excellence in sushi & ramen", z:"Trieste / Prati|Trieste / Prati", d:"sera|evening", tags:["food"], sub:"sushi", tipo:"ristorante",
   p:"Capitale del sushi: ristoranti giapponesi autentici, ramen bar e omakase di livello.|A sushi capital: authentic Japanese restaurants, ramen bars and omakase of real level.",
   tip:"Nel quartiere Trieste la concentrazione di sushi (e clientela giapponese) è la migliore.|In the Trieste district the concentration of sushi (and Japanese clientele) is the best."},
  {t:"Chinatown di Esquilino|Esquilino's Chinatown", z:"Esquilino|Esquilino", d:"2 ore|2 hrs", tags:["food","lento"], sub:"cinese", tipo:"ristorante",
   p:"Attorno a piazza Vittorio il quartiere cinese: ravioli, dim sum e supermarket da viaggio.|Around piazza Vittorio, the Chinese quarter: dumplings, dim sum and travel-worthy supermarkets.",
   tip:"Alcuni posti accettano solo contanti: pranzo completo a meno di 15€.|Some places are cash only: a full lunch under €15."},
  {t:"Tavola greca|A Greek table", z:"Centro / Trastevere|Centre / Trastevere", d:"sera|evening", tags:["food"], sub:"greca", tipo:"taverna",
   p:"Moussaka, meze e ouzo: le taverne greche ti mettono nell'Egeo in due portate.|Moussaka, meze and ouzo: Greek tavernas put you in the Aegean within two courses.",
   tip:"Ordina i meze condivisi: è il modo più sociale (ed economico) di assaggiare tutto.|Order shared meze: the most social (and cheapest) way to taste everything."},
  {t:"Food tour a Testaccio|Testaccio food tour", z:"Testaccio|Testaccio", d:"3 ore|3 hrs", tags:["food"], sub:"street", tipo:"mercato",
   p:"Il quartiere-madre della cucina popolare romana, tra mercato, porchetta e trapizzini.|The mother district of Roman popular cuisine: market, porchetta and trapizzini.",
   tip:"Presentati affamato: il giro prevede 6–8 assaggi.|Come hungry: the tour includes 6–8 tastings."},
  {t:"Mercato Centrale|Mercato Centrale", z:"Esquilino|Esquilino", d:"1,5 ore|1.5 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Il mercato rionale trasformato in food hall dai migliori artigiani del gusto.|The neighbourhood market turned food hall by the best artisans of taste.",
   tip:"Pranzo di qualità in 20 minuti a due passi da Termini.|A quality lunch in 20 minutes, steps from Termini."},
  {t:"Maritozzo e pasticceria romana|Maritozzo & Roman patisserie", z:"Testaccio / Centro|Testaccio / Centre", d:"colazione|breakfast", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Il dolce romano tornato di moda: brioche spaccata e panna fresca. Con il cappuccino è amore.|Rome's comeback sweet: split brioche with fresh cream. With a cappuccino, it's love.",
   tip:"La colazione dei romani: maritozzo + cappuccino al bancone, in piedi.|The Roman breakfast: maritozzo + standing cappuccino at the counter."},

  {t:"San Pietro e la cupola|St. Peter's & the dome", z:"Vaticano|Vatican", d:"3 ore|3 hrs", tags:["religioso"], sub:"basiliche",
   p:"La basilica più grande del mondo e la salita alla cupola per Roma ai tuoi piedi.|The largest basilica in the world and the dome climb for Rome at your feet.",
   tip:"Oltre 500 gradini (ascensore parziale disponibile): apri la giornata qui.|Over 500 steps (partial lift available): start your day here."},
  {t:"Il tour delle basiliche papali|The papal basilicas tour", z:"Tutto il centro|All over the centre", d:"1 giorno|1 day", tags:["religioso"], sub:"basiliche",
   p:"San Giovanni in Laterano, Santa Maria Maggiore e San Paolo: il giro completo.|St. John Lateran, St. Mary Major and St. Paul: the complete tour.",
   tip:"Metro B e bus 64 collegano tutto comodamente in un solo giorno.|Metro B and bus 64 connect them all comfortably in one day."},
  {t:"San Clemente e la Roma sotterranea|San Clemente & underground Rome", z:"Colosseo / Monti|Colosseum / Monti", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"chiese",
   p:"Tre livelli sovrapposti: basilica medievale, chiesa paleocristiana e mitreo romano.|Three stacked levels: medieval basilica, early Christian church and a Roman mithraeum.",
   tip:"Scendi fino in fondo: il mitraeum con l'acqua che scorre ancora è la sorpresa.|Go all the way down: the mithraeum with water still flowing is the surprise."},
  {t:"Scala Santa e San Giovanni|Holy Stairs & San Giovanni", z:"Esquilino|Esquilino", d:"1,5 ore|1.5 hrs", tags:["religioso"], sub:"pellegrini",
   p:"La scala che secondo la tradizione salì Gesù: percorsa in ginocchio dai pellegrini da secoli.|The staircase Jesus is said to have climbed, walked on knees by pilgrims for centuries.",
   tip:"Poco nota ai turisti: visita silenziosa e intensa, ingresso gratuito.|Little known to tourists: a silent, intense visit, free entry."},

  {t:"Terme e acque sulfuree|Thermal baths & sulphurous waters", z:"Tivoli / Castelli|Tivoli / Castelli", d:"mezza giornata|half day", tags:["benessere"], sub:"terme",
   p:"Le Acque Albule alimentano piscine termali note fin dall'epoca romana.|The Acque Albule feed thermal pools known since Roman times.",
   tip:"Acqua a circa 28°: porta ciabatte e cuffia.|Water at about 28°C: bring flip-flops and a cap."},
  {t:"Spa day in centro|Spa day in the centre", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Piscine, saune e massaggi nei migliori hotel della città, anche per non ospiti.|Pools, saunas and massages in the city's best hotels, open to non-guests too.",
   tip:"Chiedi il day pass: molte strutture lo offrono nei giorni feriali.|Ask for a day pass: many offer it on weekdays."},
  {t:"Green Rome: Villa Borghese|Green Rome: Villa Borghese", z:"Pinciano|Pinciano", d:"2 ore|2 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Ottanta ettari di parco per camminate rigeneranti, noleggio bici e silenzio.|Eighty hectares of park for regenerating walks, bike rental and silence.",
   tip:"Al tramonto il terrazzo del Pincio regala la vista più dolce sulla piazza.|At sunset the Pincio terrace offers the sweetest view over the square."},

  {t:"Stadio Olimpico e Foro Italico|Stadio Olimpico & Foro Italico", z:"Monte Mario|Monte Mario", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Roma o Lazio: 70.000 voci e una partita che è sempre anche teatro.|Roma or Lazio: 70,000 voices and a match that is always theatre too.",
   tip:"Nei giorni senza partita si può visitare lo stadio con tour guidato.|On non-match days you can tour the stadium with a guide."},
  {t:"Eventi al Circo Massimo|Events at the Circus Maximus", z:"Circo Massimo|Circus Maximus", d:"sera|evening", tags:["sport"], sub:"eventi",
   p:"Il palco più suggestivo d'Italia: concerti e grandi eventi nell'antico circo imperiale.|Italy's most evocative stage: concerts and major events in the ancient imperial circus.",
   tip:"Arriva con i mezzi: le chiusure del traffico sono frequenti nelle serate evento.|Come by public transport: road closures are frequent on event nights."},
  {t:"Internazionali di tennis|Italian Open tennis", z:"Foro Italico|Foro Italico", d:"1 giorno|1 day", tags:["sport"], sub:"eventi",
   p:"A maggio il Foro Italico si trasforma: i campioni del tennis mondiale su terra rossa.|In May the Foro Italico transforms: world tennis champions on red clay.",
   tip:"I biglietti dei primi turni costano meno e permettono di girare tra molti campi.|Early-round tickets cost less and let you hop between many courts."},
  {t:"Maratona di Roma|Rome Marathon", z:"Centro → EUR|Centre → EUR", d:"1 giorno|1 day", tags:["sport"], sub:"partecipa",
   p:"42 chilometri attraverso monumenti duemila anni: una delle corse più scenografiche al mondo.|42 kilometres through 2,000-year-old monuments: one of the most scenic races on Earth.",
   tip:"Iscriviti mesi prima; da spettatore, via dei Fori Imperiali è il punto migliore.|Register months ahead; as a spectator, via dei Fori Imperiali is the best spot."},

  {t:"Garbatella a piedi|Garbatella on foot", z:"Ostiense|Ostiense", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Lotti romani, orti condivisi e una coralità di paese dentro la capitale.|Roman housing blocks, shared gardens and a village feel inside the capital.",
   tip:"Fermati per una merenda in una delle friggitorie storiche del quartiere.|Stop for a snack in one of the district's historic fry shops."},
  {t:"Pigneto e street art|Pigneto & street art", z:"Casilino|Casilino", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Murales, archi ferroviari e aperitivi autentici, lontano dai percorsi battuti.|Murals, railway arches and authentic aperitivi, far from the beaten paths.",
   tip:"Serata ideale: il quartiere vive soprattutto dopo le 18.|Best in the evening: the district comes alive after 6 pm."},
  {t:"Villa Pamphilj, polmone verde|Villa Pamphilj, the green lung", z:"Gianicolo / Monteverde|Janiculum / Monteverde", d:"2 ore|2 hrs", tags:["lento","benessere"], sub:"parchi",
   p:"Il parco più grande dentro le mura: corsi d'acqua, pinete e romani che corrono verso il laghetto.|The largest park inside the walls: streams, pine groves and Romans jogging to the little lake.",
   tip:"Combinalo con la passeggiata sul Gianicolo al tramonto: ingresso libero.|Combine it with the Janiculum walk at sunset: free entry."},
  {t:"Ciclabile del Tevere|The Tiber cycle path", z:"Lungotevere|Lungotevere", d:"2 ore|2 hrs", tags:["lento"], sub:"lente",
   p:"Pedalare da Ponte Milvio verso il centro seguendo il fiume: mobilità dolce al massimo.|Pedal from Ponte Milvio towards the centre following the river: soft mobility at its best.",
   tip:"Noleggia una bici condivisa: il percorso è piatto e sicuro.|Rent a shared bike: the route is flat and safe."},

  {t:"Corso di pasta fresca|Fresh pasta class", z:"Trastevere|Trastevere", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Impara tonnarelli, gnocchi e ravioli con uno chef locale, dalla farina al piatto.|Learn tonnarelli, gnocchi and ravioli with a local chef, from flour to plate.",
   tip:"Al termine si mangia ciò che hai preparato: il pranzo è incluso.|You eat what you made at the end: lunch included."},
  {t:"Laboratorio di mosaico|Mosaic workshop", z:"Esquilino|Esquilino", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Tecnica romana antica: componi con le tessere il tuo souvenir da portare a casa.|Ancient Roman technique: compose your own souvenir with the tesserae.",
   tip:"Adatto anche a bambini: attività perfetta nelle ore più calde.|Kid-friendly: the perfect activity for the hottest hours."},
  {t:"Tour con archeologo|Tour with an archaeologist", z:"Fori / Palatino|Forum / Palatine", d:"2,5 ore|2.5 hrs", tags:["formativo","cultura"], sub:"guide",
   p:"Visite condotte da archeologi sul campo: la storia raccontata da chi la scava.|Tours led by working archaeologists: history told by those who dig it.",
   tip:"Fai domande liberamente: le guide adorano la curiosità dei visitatori.|Ask freely: guides love curious visitors."}
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
  cultura:[
    {ora:"08:30", t:"Colosseo all'apertura|Colosseum at opening", p:"Sei dentro prima delle file: luce d'oro sui Fori e sul Palatino.|You're in before the queues: golden light over the Forum and Palatine."},
    {ora:"13:00", t:"Pranzo a Monti|Lunch in Monti", p:"Salumeria con tagliere e vino nella via dei Serpenti.|Charcuterie board and wine in via dei Serpenti."},
    {ora:"15:00", t:"Musei Vaticani e Sistina|Vatican Museums & Sistine", p:"Tre ore piene: Raffaello prima del gran finale di Michelangelo.|Three full hours: Raphael before Michelangelo's grand finale."},
    {ora:"19:30", t:"Tramonto dal Pincio|Sunset from the Pincio", p:"Passeggiata sopra piazza del Popolo, Roma accesa sotto di te.|A stroll above piazza del Popolo, Rome lit up beneath you."}
  ],
  business:[
    {ora:"09:00", t:"Meeting in centro o EUR|Meeting in the centre or EUR", p:"La Nuvola e gli hotel congressuali sono collegatissimi.|La Nuvola and the congress hotels are super connected."},
    {ora:"13:30", t:"Business lunch veloce|Quick business lunch", p:"Mercato Centrale: qualità eccellente in venti minuti.|Mercato Centrale: excellent quality in twenty minutes."},
    {ora:"16:00", t:"Pausa culturale|Cultural break", p:"Galleria Borghese, due ore: l'antidoto perfetto alle slide.|Galleria Borghese, two hours: the perfect antidote to slides."},
    {ora:"19:30", t:"Bleisure aperitivo|Bleisure aperitivo", p:"Terrazza sul tetto nel Tridente e cena senza fretta.|Rooftop terrace in the Tridente and an unhurried dinner."}
  ],
  food:[
    {ora:"08:00", t:"Colazione al bancone|Breakfast at the counter", p:"Cornetto caldo e cappuccino, in piedi come i romani.|Warm croissant and cappuccino, standing like the Romans."},
    {ora:"09:30", t:"Mercato di Testaccio|Testaccio market", p:"Porchetta, pecorino e assaggi tra le bancarelle.|Porchetta, pecorino and tastings among the stalls."},
    {ora:"13:00", t:"Trattoria storica|Historic trattoria", p:"Carbonara e cacio e pepe nel quartiere giusto.|Carbonara and cacio e pepe in the right district."},
    {ora:"18:00", t:"Giro dolce|Sweet tour", p:"Gelato artigianale, trapizzino e passeggiata digestiva.|Artisan gelato, trapizzino and a digestive stroll."}
  ],
  religioso:[
    {ora:"07:00", t:"Santa Messa a San Pietro|Holy Mass at St. Peter's", p:"All'alba la basilica è silenzio puro.|At dawn, the basilica is pure silence."},
    {ora:"09:30", t:"Salita alla cupola|Climbing the dome", p:"Oltre 500 gradini che valgono ogni passo: la città ai tuoi piedi.|Over 500 steps worth every step: the city at your feet."},
    {ora:"12:30", t:"Santa Maria Maggiore|St. Mary Major", p:"Mosaici bizantini e il presepe più antico.|Byzantine mosaics and the oldest nativity scene."},
    {ora:"16:00", t:"Scala Santa e San Giovanni|Holy Stairs & San Giovanni", p:"Chiudi la giornata dove i pellegrini salgono da secoli.|End the day where pilgrims have climbed for centuries."}
  ],
  benessere:[
    {ora:"08:00", t:"Yoga o camminata a Villa Borghese|Yoga or walk in Villa Borghese", p:"Ottanta ettari di verde per iniziare lento.|Eighty hectares of green to start slowly."},
    {ora:"10:30", t:"Terme o spa|Thermal baths or spa", p:"Acque sulfuree a Tivoli oppure day pass in un hotel spa in centro.|Sulphurous waters in Tivoli or a day pass at a central hotel spa."},
    {ora:"13:30", t:"Pranzo leggero|Light lunch", p:"Verdure, pesce e olio locale: la dieta mediterranea vera.|Vegetables, fish and local oil: the true Mediterranean diet."},
    {ora:"16:00", t:"Massaggio e idromassaggio|Massage & whirlpool", p:"Il pomeriggio dedicato alla cura di te, senza meta.|An afternoon dedicated to yourself, no destination needed."}
  ],
  sport:[
    {ora:"09:00", t:"Tour dello Stadio Olimpico|Stadio Olimpico tour", p:"Spogliatoi, campo e museo della squadra.|Dressing rooms, pitch and the team museum."},
    {ora:"11:30", t:"Foro Italico", p:"Le piscine olimpiche e i mosaici del complesso monumentale.|The Olympic pools and mosaics of the monumental complex."},
    {ora:"13:00", t:"Pranzo sportivo|Athlete's lunch", p:"Carboidrati seri da atleta: pasta e pane, senza sensi di colpa.|Serious athlete carbs: pasta and bread, guilt-free."},
    {ora:"18:00", t:"Partita o grande evento|Match or major event", p:"Curva Sud se vuoi il tifo, Tribuna se vuoi goderti la partita.|Curva Sud for the atmosphere, Tribuna to enjoy the match."}
  ],
  lento:[
    {ora:"08:30", t:"Colazione al Pigneto|Breakfast in Pigneto", p:"Caffè di quartiere, lontano dalle rotte turistiche.|A neighbourhood café, far from the tourist routes."},
    {ora:"10:00", t:"Mercato rionale|Neighbourhood market", p:"C'è quello del quartiere dove alloggi: chiedi ai vicini.|There's one in the district you're staying in: ask the locals."},
    {ora:"12:30", t:"Garbatella a piedi|Garbatella on foot", p:"L'urbanistica più umana di Roma, tra orti e casette colorate.|Rome's most human urban design, gardens and colourful houses."},
    {ora:"18:00", t:"Aperitivo sul lungotevere|Aperitivo on the river", p:"Cena di quartiere, a passo d'uomo, fino a notte.|A neighbourhood dinner, at human pace, into the night."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di cucina|Cooking class", p:"Pasta fresca con uno chef: mani in farina per tre ore.|Fresh pasta with a chef: hands in flour for three hours."},
    {ora:"13:00", t:"Mangi la tua creazione|Eat your own creation", p:"Il pranzo migliore della vacanza è quello che hai fatto tu.|The best lunch of your holiday is the one you made."},
    {ora:"15:30", t:"Laboratorio di mosaico|Mosaic workshop", p:"Tecniche romane antiche e un souvenir unico da portare.|Ancient Roman techniques and a unique souvenir to take home."},
    {ora:"18:00", t:"Tour con archeologo|Tour with an archaeologist", p:"Chiusura in bellezza: la storia spiegata da chi la dissotterra.|A beautiful closing: history explained by those who unearth it."}
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
   a:"Prenota online con fascia oraria: Colosseo, Musei Vaticani e Galleria Borghese si esauriscono 2-3 settimane prima. Trucco da locale: i Musei Vaticani il venerdì sera d'estate hanno pochissima fila. E punta sempre al primo ingresso della mattina.|Book online with a time slot: the Colosseum, Vatican Museums and Galleria Borghese sell out 2-3 weeks ahead. Local trick: the Vatican Museums on summer Friday evenings have almost no queue. Always aim for the first entry of the morning."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro è tranquillo la sera, anche camminando da sola/o. L'unico vero rischio è il borseggio in metro (linea A soprattutto) e attorno a Termini: borsa davanti e dormi sonni tranquilli.|The centre is quiet at night, even walking alone. The only real risk is pickpocketing on the metro (line A above all) and around Termini: keep your bag in front and sleep soundly."},
  {k:["taxi","aeroporto","fiumicino","uber","nap","airport","cab"],
   a:"Da Fiumicino al centro esiste la tariffa fissa (circa 50€: chiedila prima di salire). In città meglio le app itTaxi o Free Now. E se un tassista ti propone un tour 'speciale'... sorridi e cambia discorso.|From Fiumicino to the centre there's a fixed fare (about €50: ask first). In town, the itTaxi or Free Now apps are better. And if a driver offers a 'special' tour... smile and change the subject."},
  {k:["acqua","fontanella","borraccia","bere","water","drink","fountain"],
   a:"Le fontanelle 'nasoni' sono potabili e ovunque: acqua fresca gratis tutto l'anno. Portati una borraccia — il turista scafato non compra bottiglie da 4€ davanti al Colosseo.|The 'nasoni' fountains are drinkable and everywhere: free fresh water all year. Bring a bottle — savvy travellers don't buy €4 bottles outside the Colosseum."},
  {k:["metro","bus","muover","atac","tram","mezz","subway","transport","underground"],
   a:"Metro A e B, più le gambe: il centro si attraversa a piedi. Il biglietto dura 100 minuti e include un cambio. Occhio: la metro chiude verso le 23:30 — dopo, bus notturni o taxi.|Metro A and B, plus your legs: the centre is walkable. A ticket lasts 100 minutes and includes one transfer. The metro closes around 11:30 pm — after that, night buses or taxis."},
  {k:["cena","orario","ristorant","mangiar","aperto","dinner","eat","restaurant","lunch"],
   a:"I romani cenano alle 20:30-21:00. Se un ristorante è pieno alle 18:30, è pieno di turisti. E se il menù ha 40 piatti con le foto... cammina due traverse, fidati.|Romans dine at 8:30–9 pm. If a restaurant is packed at 6:30 pm, it's packed with tourists. And if the menu has 40 dishes with photos... walk two streets over, trust me."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit"],
   a:"Non è obbligatoria: al bar si lasciano gli spicci del resto, al ristorante il 5-10% se sei contento. Nessuno si offenderà se non lasci nulla.|Not compulsory: at the bar leave the small change, at the restaurant 5-10% if you're happy. Nobody will be offended if you leave nothing."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family"],
   a:"Con i bimbi: Villa Borghese (noleggio bici e teatro dei burattini), il Bioparco, il museo Explora... e una sessione pizza al taglio programmata ogni due ore. Non fallisce mai.|With kids: Villa Borghese (bikes and puppet theatre), the Bioparco, the Explora museum... plus pizza al taglio every two hours. It never fails."},
  {k:["piogg","piov","rain","weather","wet"],
   a:"Piove raramente, ma se capita ripiega al coperto: Musei Capitolini, Galleria Borghese, o una spa per finire in dolcezza. Roma sotto la pioggia è bellissima lo stesso.|It rarely rains, but if it does, go indoors: Capitoline Museums, Galleria Borghese, or a spa to end sweetly. Rome in the rain is beautiful all the same."},
  {k:["chiesa","vest","copr","spalle","ginocch","san pietro","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Per le basiliche servono spalle e ginocchia coperte. D'estate basta una sciarpa leggera in borsa: problema risolto in due secondi.|Basilicas require covered shoulders and knees. In summer a light scarf in your bag solves it in two seconds."},
  {k:["truff","gladiator","braccialett","cordicell","regal","scam"],
   a:"Al Colosseo: i 'gladiatori' delle foto si fanno pagare caro e i braccialetti 'regalati' diventano un conto salato. Rifiuta con gentilezza, sorridi e prosegui.|At the Colosseum: the 'gladiators' charge a lot, and 'free' bracelets become a hefty bill. Decline kindly, smile and move on."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast"],
   a:"Regola non scritta: cappuccino a colazione, caffè dopo i pasti. Ordina pure il cappuccino alle 16 — nessuno ti deporta, ma preparati a qualche occhiata. 😉|Unwritten rule: cappuccino at breakfast, coffee after meals. Order a cappuccino at 4 pm — nobody will deport you, but expect a few looks. 😉"}
];
const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con parole come: code, sicurezza, taxi, metro, cena, bambini, pioggia, truffe, cappuccino... o clicca una domanda rapida qui sotto.|Hmm, I didn't get that 😅 Try words like: queues, safety, taxi, metro, dinner, kids, rain, scams, cappuccino... or tap a quick question below.";
const CHAT_QUICK = [
  "Come evito le code?|How do I skip the queues?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi dall'aeroporto?|Taxi from the airport?",
  "Acqua potabile?|Drinking water?",
  "Cena a che ora?|What time is dinner?"
];


Guide.init({storageKey:"rp", pageTitle:"Roma Poliedrica — La guida che si adatta a te|Polyedric Rome — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
