(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Firenze|The many-sided guide · Florence",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dalla cupola all'Oltrarno, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the dome to the Oltrarno, a tailor-made itinerary.",
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
  info1p:"Niente metro: il centro è pedonale e compatto, si fa tutto a piedi. Tram T1/T2 per stazioni e periferia; il T2 collega l'aeroporto Peretola. Scarpe comande obbligatorie.|No metro: the centre is pedestrian and compact, everything is done on foot. Trams T1/T2 for stations and outskirts; T2 links Peretola airport. Comfortable shoes mandatory.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Aprile–maggio e settembre–ottobre: clima perfetto. Luglio–agosto: caldo e folla, musei la mattina presto. Pasqua: Scoppio del Carro, se riesci a vederlo.|April–May and September–October: perfect weather. July–August: heat and crowds, museums early morning. Easter: the Explosion of the Cart, if you manage to see it.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Uffizi, Accademia e cupola del Brunelleschi: prenota online con settimane (a volte mesi) di anticipo. Palazzo Vecchio e Pitti: qualche settimana prima.|Uffizi, Accademia and Brunelleschi's dome: book online weeks (sometimes months) ahead. Palazzo Vecchio and Pitti: a few weeks before.",
  footer:"<b>Firenze Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Firenze Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Lorenzo · il tuo amico fiorentino|Lorenzo · your Florentine friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Lorenzo|🙋 Ask Lorenzo", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! Sono Lorenzo, fiorentino di San Niccolò 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Lorenzo, a Florentine from San Niccolò 🙋 Ask me anything about the city — or tap a quick question below.",
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
};

/* ---------- TIPI DI LOCALE (3° livello, solo food) ---------- */
const TIPI = [
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"enoteca",     emoji:"🍷", nome:"Enoteca|Wine bar"},
  {id:"friggitoria", emoji:"🍟", nome:"Lampredottaio|Lampredotto cart"},
  {id:"gelateria",   emoji:"🍦", nome:"Gelateria|Gelato shop"},
  {id:"bar",         emoji:"☕", nome:"Bar e pasticceria|Bar & pastry shop"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (38) ---------- */
const ESPERIENZE = [
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
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
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
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: Uffizi, prenotare, bistecca, lampredotto, Peretola, pioggia, truffe, cantucci... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: Uffizi, booking, bistecca, lampredotto, Peretola, rain, scams, cantucci... or tap a quick question.";

const CHAT_QUICK = [
  "Gli Uffizi come si prenotano?|How do I book the Uffizi?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Peretola?|Taxi from Peretola?",
  "Dove mangio il lampredotto?|Where do I eat lampredotto?",
  "La bistecca come si ordina?|How do I order the bistecca?"
];


Guide.init({storageKey:"fir", pageTitle:"Firenze Poliedrica — La guida che si adatta a te|Polyedric Florence — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
