(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Milano|The many-sided guide · Milan",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dal Duomo ai Navigli, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the Duomo to the Navigli, a tailor-made itinerary.",
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
  info1p:"Cinque linee di metro e i tram storici coprono tutta la città. Biglietto in app ATM o in edicola. Cammina: il centro si attraversa a piedi.|Five metro lines and historic trams cover the whole city. Tickets in the ATM app or at newsstands. Walk: the centre is crossable on foot.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Aprile (Design Week) e settembre (Fashion Week): la città al massimo, ma prenota con largo anticipo. Più tranquille e belle: giugno e dicembre.|April (Design Week) and September (Fashion Week): the city at its peak, but book well ahead. Quieter and lovely: June and December.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Il Cenacolo va prenotato con 2–3 mesi di anticipo (slot di 15 minuti). Terrazze del Duomo e tour di San Siro: prenota online qualche settimana prima.|The Last Supper must be booked 2–3 months ahead (15-minute slots). Duomo rooftops and San Siro tours: book online a few weeks before.",
  footer:"<b>Milano Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Milano Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Giulia · la tua amica milanese|Giulia · your Milanese friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Giulia|🙋 Ask Giulia", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! Sono Giulia, milanese doc 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Giulia, a true Milanese 🙋 Ask me anything about the city — or tap a quick question below.",
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
    {id:"musei",     emoji:"🖼️", nome:"Musei e pinacoteche|Museums & pinacoteche"},
    {id:"monumenti", emoji:"🏛️", nome:"Duomo e monumenti|Duomo & monuments"},
    {id:"design",    emoji:"🎨", nome:"Design e contemporaneo|Design & contemporary"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e fiere|Congresses & trade fairs"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"cucina",        emoji:"🍝", nome:"Cucina milanese|Milanese cuisine"},
    {id:"aperitivo",     emoji:"🥂", nome:"Aperitivo e apericena|Aperitivo & apericena"},
    {id:"pizza",         emoji:"🍕", nome:"Pizza|Pizza"},
    {id:"internazionale",emoji:"🌏", nome:"Internazionale e Chinatown|International & Chinatown"},
    {id:"street",        emoji:"🧺", nome:"Mercati e street food|Markets & street food"},
    {id:"dolci",         emoji:"🍰", nome:"Dolci e caffè|Sweets & coffee"},
    {id:"alta",          emoji:"🍽️", nome:"Alta cucina|Fine dining"}
  ],
  religioso: [
    {id:"basiliche",  emoji:"⛪",  nome:"Basiliche e cattedrali|Basilicas & cathedrals"},
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
    {id:"eventi",    emoji:"🎪", nome:"Grandi eventi|Major events"},
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
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"bistrot",     emoji:"🥂", nome:"Bistrot|Bistro"},
  {id:"pizzeria",    emoji:"🍕", nome:"Pizzeria|Pizzeria"},
  {id:"friggitoria", emoji:"🍟", nome:"Friggitoria|Fry shop"},
  {id:"bar",         emoji:"☕", nome:"Bar e caffè|Bar & café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (38) ---------- */
const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Duomo e le terrazze|Duomo & the rooftops", z:"Piazza Duomo|Piazza Duomo", d:"2,5 ore|2.5 hrs", tags:["cultura","religioso"], sub:"monumenti",
   p:"La cattedrale gotica e la passeggiata tra le guglie, con la Madonnina a portata di mano.|The Gothic cathedral and a walk among the spires, with the Madonnina at hand's reach.",
   tip:"Prenota online il primo slot: le terrazze quasi vuote e la città che si sveglia.|Book the first slot online: near-empty rooftops and a waking city."},
  {t:"Il Cenacolo di Leonardo|Leonardo's Last Supper", z:"Santa Maria delle Grazie|Santa Maria delle Grazie", d:"15 min|15 min", tags:["cultura","religioso"], sub:"musei",
   p:"Quindici minuti davanti al capolavoro più famoso al mondo: valgono un viaggio.|Fifteen minutes before the world's most famous masterpiece: worth a trip.",
   tip:"Slot da 15 minuti, prenota 2-3 mesi prima sul sito ufficiale: si esaurisce sempre.|15-minute slots, book 2-3 months ahead on the official site: it always sells out."},
  {t:"Pinacoteca di Brera|The Brera Gallery", z:"Brera|Brera", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"musei",
   p:"Raffaello, Caravaggio e Mantegna nel quartiere degli artisti: la pinacoteca che profuma di bottega.|Raphael, Caravaggio and Mantegna in the artists' district: a gallery that smells of the studio.",
   tip:"Dopo, caffè nel cortile d'onore e giro tra le gallerie del quartiere.|Afterwards, coffee in the courtyard and a wander among the district's galleries."},
  {t:"Castello Sforzesco e musei|Sforza Castle & museums", z:"Sempione|Sempione", d:"3 ore|3 hrs", tags:["cultura"], sub:"monumenti",
   p:"Il castello dei duchi: cortili rinascimentali e musei con Michelangelo e Leonardo.|The dukes' castle: Renaissance courtyards and museums with Michelangelo and Leonardo.",
   tip:"Non perdere la Pietà Rondanini: l'ultima scultura di Michelangelo, in una sala tutta sua.|Don't miss the Rondanini Pietà: Michelangelo's last sculpture, in a room of its own."},
  {t:"Galleria Vittorio Emanuele e il rito del toro|The Galleria & the bull ritual", z:"Piazza Duomo|Piazza Duomo", d:"1 ora|1 hr", tags:["cultura"], sub:"monumenti",
   p:"Il 'salotto' ottocentesco di vetro e ferro: botteghe storiche e il mosaico del toro portafortuna.|The 19th-century glass-and-iron 'drawing room': historic shops and the lucky bull mosaic.",
   tip:"Tre giri di tacchi sul toro: la tradizione (e il motivo per cui il mosaico si rifà spesso).|Three spins of your heels on the bull: the tradition (and why the mosaic keeps being redone)."},
  {t:"Fondazione Prada e il design|Prada Foundation & design", z:"Porta Romana|Porta Romana", d:"3 ore|3 hrs", tags:["cultura"], sub:"design",
   p:"Rem Koolhaas, una torre dorata e mostre d'avanguardia: Milano contemporanea al massimo.|Rem Koolhaas, a golden tower and avant-garde shows: contemporary Milan at its best.",
   tip:"Caffè al Bar Luce: arredato da Wes Anderson, con le slot machine degli anni '50.|Coffee at Bar Luce: designed by Wes Anderson, with 1950s slot machines."},
  {t:"Teatro alla Scala e museo|La Scala & theatre museum", z:"Duomo / Brera|Duomo / Brera", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"musei",
   p:"Il tempio dell'opera: museo, palchi e la sala vista dal loggione.|The temple of opera: museum, boxes and the hall seen from the gods.",
   tip:"Se non trovi biglietti per uno spettacolo, prova le prove aperte: si entra in sorteggio.|If no show tickets, try open rehearsals: entry by lottery."},

  /* — BUSINESS — */
  {t:"Fiera Milano Rho e i grandi saloni|Rho Fiera & the great trade fairs", z:"Rho|Rho", d:"mezza giornata|half day", tags:["business"], sub:"congressi",
   p:"Il quarto polo fieristico d'Europa: congressi, saloni ed eventi internazionali.|Europe's fourth largest trade fair hub: congresses, fairs and international events.",
   tip:"Metro M1 diretta Rho Fiera: circa 30 minuti dal Duomo.|Direct M1 metro to Rho Fiera: about 30 minutes from the Duomo."},
  {t:"Aperitivo nel Quadrilatero|Aperitivo in the Quadrilatero", z:"Montenapoleone|Montenapoleone", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Il rito elegante del dopo-lavoro: cocktail tra le vetrine della moda.|The elegant after-work ritual: cocktails among the fashion windows.",
   tip:"Dress code smart: qui l'aperitivo fa parte del mestiere.|Smart dress code: here the aperitivo is part of the job."},
  {t:"Bleisure: i laghi in treno|Bleisure: the lakes by train", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più dopo il meeting che diventa lago: Como, 40 minuti di treno.|The extra day after the meeting that becomes a lake: Como, 40 minutes by train.",
   tip:"Treno da Cadorna per Como: 40 minuti e sei in vista dell'acqua.|Train from Cadorna to Como: 40 minutes and the water is in sight."},

  /* — ENOGASTRONOMICO — */
  {t:"Risotto alla milanese e osso buco|Milanese risotto & osso buco", z:"Navigli / Brera|Navigli / Brera", d:"sera|evening", tags:["food"], sub:"cucina", tipo:"trattoria",
   p:"Zafferano abbondante e il bollito: i due pilastri della cucina meneghina.|Generous saffron and the braised veal: the two pillars of Milanese cooking.",
   tip:"Le vecchie trattorie lo fanno come si deve: se il risotto è giallo pallido, alzati e vai.|Old-school trattorias do it right: if the risotto is pale yellow, stand up and leave."},
  {t:"La cucina meneghina di stagione|Seasonal Milanese cooking", z:"Porta Romana / Isola|Porta Romana / Isola", d:"sera|evening", tags:["food","lento"], sub:"cucina", tipo:"osteria",
   p:"Mondeghili, rustin negàa e cassoeula: i piatti della tradizione che i menu turistici ignorano.|Mondeghili, rustin negàa and cassoeula: traditional dishes tourist menus ignore.",
   tip:"Cassoeula solo d'inverno, mondeghili sempre: se la trovi a giugno, qualcosa non va.|Cassoeula in winter only, mondeghili always: if you find it in June, something's off."},
  {t:"Apericena sui Navigli|Apericena on the Navigli", z:"Navigli|Navigli", d:"sera|evening", tags:["food","lento"], sub:"aperitivo", tipo:"bar",
   p:"Il buffet a volontà col drink: l'istituzione milanese che sostituisce la cena.|The all-you-can-eat buffet with your drink: the Milanese institution that replaces dinner.",
   tip:"Passeggia da Porta Ticinese all'Alzaia Naviglio Grande: ogni locale ha la sua formula.|Walk from Porta Ticinese along the Naviglio Grande: each place has its own formula."},
  {t:"Camparino in Galleria|Camparino in the Galleria", z:"Piazza Duomo|Piazza Duomo", d:"30 min|30 min", tags:["food","cultura"], sub:"aperitivo", tipo:"bar",
   p:"Il banco storico dove l'aperitivo è diventato arte: Campari nacque qui a Milano.|The historic counter where the aperitivo became art: Campari was born here in Milan.",
   tip:"Negroni o Americano, in piedi al banco: sedersi è per turisti, il banco è per milanesi.|Negroni or Americano, standing at the bar: sitting is for tourists, the counter is for locals."},
  {t:"Pizza in nuova ondata|New-wave pizza", z:"Isola / Porta Nuova|Isola / Porta Nuova", d:"sera|evening", tags:["food"], sub:"pizza", tipo:"pizzeria",
   p:"Milano guida la pizza contemporanea: impasti lunghi, farine antiche, lieviti madri.|Milan leads contemporary pizza: long fermentation, ancient grains, sourdough.",
   tip:"Le pizzerie d'autore si prenotano: la fila è democratica ma lunga.|Author pizzerias take bookings: the queue is democratic but long."},
  {t:"Chinatown di via Sarpi|Sarpi Chinatown", z:"Isola / Sarpi|Isola / Sarpi", d:"2 ore|2 hrs", tags:["food","lento"], sub:"internazionale", tipo:"ristorante",
   p:"Il quartiere cinese più antico d'Italia: ravioli a pranzo, negozi che profumano di viaggio.|Italy's oldest Chinese quarter: dumplings at lunch, shops smelling of travel.",
   tip:"Pranzo cinese vero, prezzi onesti: alcuni posti accettano solo contanti.|Real Chinese lunch, fair prices: some places are cash only."},
  {t:"Mercato Centrale e street food|Central Market & street food", z:"Stazione Centrale|Central Station", d:"1,5 ore|1.5 hrs", tags:["food"], sub:"street", tipo:"mercato",
   p:"La food hall nella stazione: qualità inaspettata per chi parte o arriva.|The food hall in the station: unexpected quality for those leaving or arriving.",
   tip:"Arriva con anticipo sul treno: trenta minuti qui valgono più di ogni fast food.|Arrive early for your train: thirty minutes here beat any fast food."},
  {t:"Panzerotti di Luini|Luini's panzerotti", z:"Duomo|Duomo", d:"15 min|15 min", tags:["food"], sub:"street", tipo:"friggitoria",
   p:"Il panzerotto caldo a pochi metri dal Duomo: la fila più costante di Milano.|The hot panzerotto steps from the Duomo: Milan's most constant queue.",
   tip:"La fila scorre in fretta e vale ogni minuto: pomodoro e mozzarella, la scelta classica.|The queue moves fast and is worth every minute: tomato and mozzarella, the classic choice."},
  {t:"Panettone e pasticceria storica|Panettone & historic patisserie", z:"Duomo / Brera|Duomo / Brera", d:"colazione|breakfast", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Il dolce di Milano nato qui: pasticcerie storiche dove il panettone si mangia tutto l'anno.|Milan's own sweet born here: historic patisseries where panettone is eaten year-round.",
   tip:"Brioche e cappuccino al banco: la colazione milanese autentica costa meno di un succo in piazza.|Brioche and cappuccino at the counter: the real Milanese breakfast costs less than a juice in the square."},
  {t:"Alta cucina: la capitale delle stelle|Fine dining: capital of stars", z:"Tutta la città|All over the city", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"Milano è la città più stellata d'Italia: la cucina d'autore come forma d'arte civica.|Milan is Italy's most-starred city: author cuisine as a civic art form.",
   tip:"I bistrot d'autore costano metà delle stellate: stessi chef, conto gentile.|Author bistros cost half the starred ones: same chefs, gentler bill."},

  /* — RELIGIOSO — */
  {t:"Sant'Ambrogio, cuore della città|Sant'Ambrogio, the city's heart", z:"Sant'Ambrogio|Sant'Ambrogio", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"basiliche",
   p:"La basilica del patrono, più antica del Duomo di mille anni: altare d'oro e il serpente di bronzo.|The patron saint's basilica, a thousand years older than the Duomo: golden altar and the bronze serpent.",
   tip:"Cerca il serpente nel portico: la leggenda dice che volerà via alla fine dei tempi.|Find the serpent in the porch: legend says it will fly away at the end of time."},
  {t:"San Bernardino alle Ossa|San Bernardino alle Ossa", z:"Duomo|Duomo", d:"30 min|30 min", tags:["religioso","cultura"], sub:"chiese",
   p:"La cappella interamente rivestita di ossa: piccola, intensa, indimenticabile.|The chapel entirely covered in bones: small, intense, unforgettable.",
   tip:"Trenta minuti bastano: poi un caffè per tornare al mondo normale.|Thirty minutes suffice: then a coffee to return to the normal world."},
  {t:"San Maurizio, la Sistina di Milano|San Maurizio, Milan's Sistine", z:"Duomo / Brera|Duomo / Brera", d:"45 min|45 min", tags:["religioso","cultura"], sub:"chiese",
   p:"Affreschi che coprono ogni parete, ingresso libero: la chiesa più dipinta della città.|Frescoes covering every wall, free entry: the city's most painted church.",
   tip:"Luminosa di mattina: vai presto per vedere i colori accendersi.|Bright in the morning: go early to see the colours light up."},
  {t:"Santuario dei Miracoli a San Celso|San Celso, the miracles sanctuary", z:"Porta Romana|Porta Romana", d:"1 ora|1 hr", tags:["religioso"], sub:"pellegrini",
   p:"Il santuario rinascimentale dei miracoli milanesi, con la chiesa paleocristiana accanto.|The Renaissance sanctuary of Milanese miracles, with the early Christian church beside it.",
   tip:"Due chiese in una visita: l'unione perfetta di antico e rinascimento.|Two churches in one visit: the perfect union of ancient and Renaissance."},

  /* — BENESSERE — */
  {t:"QC Terme, la spa urbana|QC Terme, the urban spa", z:"Porta Romana|Porta Romana", d:"mezza giornata|half day", tags:["benessere"], sub:"terme",
   p:"Vasche, saune e rilassamento in un ex deposito di tram: il benessere più originale d'Europa.|Pools, saunas and relaxation in a former tram depot: Europe's most original wellness.",
   tip:"Prenota il day pass online: il weekend si riempie in fretta.|Book the day pass online: weekends fill up fast."},
  {t:"Spa d'autore in centro|Spa day in the centre", z:"Centro|Centre", d:"3 ore|3 hrs", tags:["benessere","business"], sub:"spa",
   p:"Le spa dei grandi hotel di design: piscine silenziose e massaggi d'autore, aperte agli esterni.|Design hotels' spas: silent pools and signature massages, open to outsiders.",
   tip:"Chiedi il day pass ferial: spesso metà prezzo rispetto al weekend.|Ask for a weekday day pass: often half the weekend price."},
  {t:"Bosco Verticale e i giardini di Porta Nuova|Vertical Forest & Porta Nuova gardens", z:"Porta Nuova|Porta Nuova", d:"1,5 ore|1.5 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Due torri abitate da quasi mille alberi: il simbolo della Milano che respira.|Two towers home to nearly a thousand trees: the symbol of Milan breathing.",
   tip:"Ammirale da piazza Gae Aulenti al tramonto, poi risali il Bosco verso Isola.|Admire them from Gae Aulenti square at sunset, then climb the Bosco towards Isola."},

  /* — SPORT — */
  {t:"San Siro: derby e musei|San Siro: derbies & museums", z:"San Siro|San Siro", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Milan o Inter, il Meazza è il tempio del calcio italiano: 80.000 voci e la curva che dipinge.|Milan or Inter, the Meazza is Italian football's temple: 80,000 voices and a painting curve.",
   tip:"Nei giorni senza partita: tour dello stadio con spogliatoi e musei delle due squadre.|On non-match days: stadium tour with dressing rooms and both teams' museums."},
  {t:"Gran Premio di Monza|Monza F1 Grand Prix", z:"Monza|Monza", d:"1 giorno|1 day", tags:["sport"], sub:"eventi",
   p:"Il tempio della velocità: la F1 nel parco più grande d'Europa, a un treno da Milano.|The temple of speed: F1 in Europe's largest park, one train from Milan.",
   tip:"A settembre: treno per Monza e navetta per l'autodromo, biglietti mesi prima.|In September: train to Monza and shuttle to the circuit, tickets months ahead."},
  {t:"Milano City Marathon|Milan City Marathon", z:"Città|City", d:"1 giorno|1 day", tags:["sport"], sub:"partecipa",
   p:"42 chilometri attraverso la città che applaude composta: la maratona più elegante d'Italia.|42 kilometres through a city that applauds politely: Italy's most elegant marathon.",
   tip:"Iscriviti mesi prima; da spettatore, il Duomo e Porta Venezia sono i punti migliori.|Register months ahead; as a spectator, the Duomo and Porta Venezia are the best spots."},
  {t:"Fashion Week e Design Week|Fashion & Design Weeks", z:"Tutta la città|All over the city", d:"1 settimana|1 week", tags:["sport","cultura"], sub:"eventi",
   p:"Le due settimane in cui Milano cambia pelle: sfilate, saloni e il Fuorisalone in ogni quartiere.|The two weeks when Milan changes skin: runway shows, trade fairs and Fuorisalone in every district.",
   tip:"A aprile il Fuorisalone è in gran parte gratuito: mostre e installazioni aperte a tutti.|In April the Fuorisalone is largely free: shows and installations open to all."},

  /* — LENTO — */
  {t:"Navigli a piedi: alzaie e botteghe|Navigli walk: towpaths & studios", z:"Navigli|Navigli", d:"2 ore|2 hrs", tags:["lento"], sub:"quartieri",
   p:"Camminare lungo i canali come i barcaioli: botteghe, gallerie e l'acqua che scorre piano.|Walking the canals like the bargees: studios, galleries and slowly flowing water.",
   tip:"Domenica mattina: mercato dell'antiquariato sull'alzaia del Naviglio Grande.|Sunday morning: antiques market on the Naviglio Grande towpath."},
  {t:"Isola: il villaggio tra le torri|Isola: the village among towers", z:"Isola|Isola", d:"2 ore|2 hrs", tags:["lento","cultura"], sub:"quartieri",
   p:"Il quartiere 'isolato' dai binari: street art, cortili, caffè e la scala che sale al Bosco.|The district 'isolated' by the railway: street art, courtyards, cafés and the stairs up to the Bosco.",
   tip:"Gira senza mappa: vicoli, negozi di vinili e gallerie si trovano solo così.|Wander without a map: alleys, vinyl shops and galleries are found only this way."},
  {t:"Parco Sempione, il giardino del Castello|Sempione Park, the castle garden", z:"Sempione|Sempione", d:"1,5 ore|1.5 hrs", tags:["lento","benessere"], sub:"parchi",
   p:"Il polmone verde dietro il Castello: pini secolari, torre Branca e l'Arco della Pace.|The green lung behind the Castle: centuries-old pines, the Branca tower and the Arch of Peace.",
   tip:"Finisci all'Arco della Pace: aperitivo in terrazza come ricompensa della camminata.|End at the Arch of Peace: terrace aperitivo as a reward for the walk."},
  {t:"La Martesana in bici|Cycling the Martesana", z:"Porta Venezia → Adda|Porta Venezia → Adda", d:"3 ore|3 hrs", tags:["lento"], sub:"lente",
   p:"La pista ciclabile lungo il canale: dalla città all'aperta campagna senza mai scendere di sella.|The cycle path along the canal: from the city to open country without leaving the saddle.",
   tip:"Noleggia una bici condivisa e vai senza meta: il percorso è piatto e sicuro.|Rent a shared bike and ride without a destination: the route is flat and safe."},

  /* — FORMATIVO — */
  {t:"Corso di cucina milanese|Milanese cooking class", z:"Navigli|Navigli", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Il risotto si impara con il mestolo: tostatura, brodo bollente e mantecatura a freddo.|Risotto is learned with a ladle: toasting, boiling broth and cold buttering.",
   tip:"Al termine mangi il tuo risotto: il pranzo (e il giudizio) è incluso.|At the end you eat your risotto: lunch (and the verdict) is included."},
  {t:"Workshop di design e artigianato|Design & craft workshop", z:"Brera / Isola|Brera / Isola", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"Ceramica, tipografia o rilegatura: la città del design insegna con le mani.|Ceramics, typography or bookbinding: the city of design teaches by hand.",
   tip:"Laboratori da due ore, aperti anche ai principianti: prenota online qualche giorno prima.|Two-hour workshops, open to beginners: book online a few days ahead."},
  {t:"Il Cenacolo con lo storico dell'arte|The Last Supper with an art historian", z:"Santa Maria delle Grazie|Santa Maria delle Grazie", d:"1 ora|1 hr", tags:["formativo","cultura"], sub:"guide",
   p:"Quindici minuti di capolavoro raccontati da chi li ha studiati per anni: cambiano per sempre.|Fifteen minutes of masterpiece explained by those who studied it for years: changed forever.",
   tip:"Le visite guidate includono il biglietto: prenota con ancora più anticipo.|Guided visits include the ticket: book even further ahead."}
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
  cultura:[
    {ora:"08:30", t:"Duomo all'apertura", p:"Terrazze quasi vuote e la città che si sveglia sotto le guglie.|Near-empty rooftops and a city waking below the spires."},
    {ora:"13:00", t:"Pranzo in Brera", p:"Osteria nel quartiere degli artisti: risotto e gente del mestiere.|Osteria in the artists' district: risotto and people of the trade."},
    {ora:"15:00", t:"Cenacolo (slot prenotato)", p:"Quindici minuti che si ricordano per sempre.|Fifteen minutes remembered forever."},
    {ora:"19:30", t:"Aperitivo in Galleria", p:"Il Camparino al banco: chiudere come un milanese.|Camparino at the counter: closing like a Milanese."}
  ],
  business:[
    {ora:"09:00", t:"Fiera o meeting", p:"Rho Fiera o CityLife: entrambe a colpo di metro.|Rho Fiera or CityLife: both one metro ride away."},
    {ora:"13:30", t:"Business lunch rapido", p:"Bistrot d'autore: qualità in trenta minuti.|Author bistro: quality in thirty minutes."},
    {ora:"16:00", t:"Pausa: Pinacoteca di Brera", p:"Due ore d'arte come antidoto alle slide.|Two hours of art as the antidote to slides."},
    {ora:"19:30", t:"Aperitivo Quadrilatero", p:"Montenapoleone e cena senza fretta.|Montenapoleone and an unhurried dinner."}
  ],
  food:[
    {ora:"08:00", t:"Colazione in pasticceria storica", p:"Brioche e cappuccino al banco, come i milanesi.|Brioche and cappuccino at the counter, like the Milanese."},
    {ora:"10:30", t:"Giro di via Sarpi", p:"Chinatown e i suoi negozi: si apre lo stomaco e la mente.|Chinatown and its shops: stomach and mind open."},
    {ora:"13:00", t:"Risotto in trattoria", p:"Giallo brillante e mantecato a regola d'arte.|Brilliant yellow and buttered to perfection."},
    {ora:"18:30", t:"Apericena sui Navigli", p:"Il buffet che sostituisce la cena: istituzione locale.|The buffet that replaces dinner: a local institution."}
  ],
  religioso:[
    {ora:"07:45", t:"Messa in Duomo", p:"All'alba la cattedrale è silenzio e pietra.|At dawn the cathedral is silence and stone."},
    {ora:"09:30", t:"Sant'Ambrogio", p:"La basilica del patrono e il suo serpente di bronzo.|The patron's basilica and its bronze serpent."},
    {ora:"12:30", t:"Santa Maria delle Grazie", p:"La chiesa che custodisce il Cenacolo: architettura e mistero.|The church guarding the Last Supper: architecture and mystery."},
    {ora:"16:00", t:"San Maurizio e San Bernardino", p:"La 'Sistina' di Milano e la cappella d'ossa: doppia meraviglia.|Milan's 'Sistine' and the ossuary chapel: a double wonder."}
  ],
  benessere:[
    {ora:"08:30", t:"Camminata al Parco Sempione", p:"Pini, castello e silenzio: partire lento.|Pines, castle and silence: starting slow."},
    {ora:"10:30", t:"QC Terme", p:"Saune e vasche nell'ex deposito di tram: due ore volano.|Saunas and pools in the former tram depot: two hours fly."},
    {ora:"13:30", t:"Pranzo leggero a Isola", p:"Cortili e cucina pulita: la Milano che si rigenera.|Courtyards and clean cooking: the Milan that regenerates."},
    {ora:"16:00", t:"Massaggio e relax", p:"Il pomeriggio dedicato a te: nessuna meta, nessuna fretta.|The afternoon for yourself: no destination, no hurry."}
  ],
  sport:[
    {ora:"09:00", t:"Tour di San Siro", p:"Spogliatoi, campo e musei: il Meazza a porte chiuse.|Dressing rooms, pitch and museums: the Meazza behind closed doors."},
    {ora:"11:30", t:"Passeggiata pre-partita", p:"Sempione e un panzerotto da Luini: rito d'avvicinamento.|Sempione and a Luini panzerotto: the approach ritual."},
    {ora:"13:00", t:"Pranzo sportivo", p:"Carboidrati da atleta: la città li cucina bene.|Athlete carbs: the city cooks them well."},
    {ora:"18:00", t:"Partita al Meazza", p:"Milan o Inter, non importa: il teatro è lo stesso.|Milan or Inter, doesn't matter: the theatre is the same."}
  ],
  lento:[
    {ora:"08:30", t:"Colazione a Isola", p:"Caffè di quartiere, lontano dalle rotte turistiche.|A neighbourhood café, far from tourist routes."},
    {ora:"10:00", t:"Mercato rionale", p:"Quello del tuo quartiere: chiedi ai vicini.|The one in your district: ask the neighbours."},
    {ora:"12:30", t:"Navigli a piedi", p:"Alzaie, botteghe e l'acqua che scorre piano.|Towpaths, studios and slowly flowing water."},
    {ora:"18:00", t:"Aperitivo sull'alzaia", p:"Il tramonto sul canale: la Milano migliore.|Sunset on the canal: Milan at its best."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di cucina milanese", p:"Risotto e osso buco: le mani nel mestiere.|Risotto and osso buco: hands on the trade."},
    {ora:"13:00", t:"Mangi il tuo risotto", p:"Il pranzo migliore è quello che hai fatto tu.|The best lunch is the one you made."},
    {ora:"15:30", t:"Workshop di design", p:"Ceramica o tipografia: la città che insegna.|Ceramics or typography: the city that teaches."},
    {ora:"18:00", t:"Brera di sera", p:"Il quartiere degli artisti al tramonto: gallerie e vintage.|The artists' district at dusk: galleries and vintage."}
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
  {k:["coda","file","prenot","bigliett","queue","ticket","book","skip","cenacolo","last supper","leonardo"],
   a:"Il Cenacolo è il biglietto più difficile d'Italia: slot da 15 minuti, prenota 2-3 mesi prima sul sito ufficiale. Terrazze del Duomo e tour di San Siro si comprano online qualche settimana prima.|The Last Supper is Italy's hardest ticket: 15-minute slots, book 2-3 months ahead on the official site. Duomo rooftops and San Siro tours can be bought online a few weeks ahead."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro è sicuro anche la sera. Occhio ai borseggiatori in Stazione Centrale, sui tram e attorno al Duomo: borsa davanti e tutto liscio.|The centre is safe at night too. Watch for pickpockets at Central Station, on trams and around the Duomo: bag in front and you're smooth."},
  {k:["taxi","aeroporto","malpensa","linate","orio","bergamo","uber","nap","airport","cab"],
   a:"Da Malpensa conviene il Malpensa Express (40-50 minuti di treno). Da Linate e Orio al Serio: taxi a tariffa fissa, chiedila prima. In città: app Free Now o itTaxi.|From Malpensa the Malpensa Express is best (40-50 minutes by train). From Linate and Orio al Serio: fixed-fare taxis, ask first. In town: Free Now or itTaxi apps."},
  {k:["acqua","fontanella","vedovella","borraccia","bere","water","drink","fountain"],
   a:"Le 'vedovelle', le fontanelle con la leonessa, distribuiscono acqua potabile da oltre un secolo. Porta la borraccia: l'acqua di Milano è buona.|The 'vedovelle', lioness fountains, have poured drinkable water for over a century. Bring a bottle: Milan's water is good."},
  {k:["metro","bus","muover","atm","tram","mezz","subway","transport","underground","navigli"],
   a:"Cinque linee di metro e una rete di tram storici, che sono anche un bel modo di vedere la città. Biglietto nell'app ATM: niente code alle macchinette.|Five metro lines and a network of historic trams, also a lovely way to see the city. Ticket in the ATM app: no queues at the machines."},
  {k:["cena","orario","ristorant","mangiar","aperto","aperitiv","apericena","negroni","dinner","eat","restaurant","lunch"],
   a:"A Milano l'aperitivo (18:30-20:30) può sostituire la cena: l'apericena è un'istituzione. Si cena alle 20:30-21:00, e il venerdì prenota: i posti giusti si riempiono.|In Milan the aperitivo (6:30-8:30 pm) can replace dinner: apericena is an institution. Dinner at 8:30-9 pm, and on Fridays book: the good places fill up."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit"],
   a:"Non obbligatoria: al bar gli spicci del resto, al ristorante il 5-10% se sei contento. In molti locali il 'servizio' è già in conto.|Not compulsory: small change at the bar, 5-10% at the restaurant if happy. In many places 'servizio' is already on the bill."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family","muba"],
   a:"Con i bimbi: Muba (museo dei bambini), il Museo della Scienza e Tecnologia (il più grande d'Italia), il Parco Sempione e i panzerotti di Luini. Combinazione imbattibile.|With kids: Muba (children's museum), the Science and Technology Museum (Italy's largest), Parco Sempione and Luini's panzerotti. Unbeatable combo."},
  {k:["piogg","piov","rain","weather","wet","ombrell"],
   a:"A Milano piove sul serio: l'ombrello va in borsa quasi sempre. Se piove: Pinacoteca di Brera, Museo del Novecento, gallerie d'arte o un pomeriggio alle terme QC.|In Milan it really rains: the umbrella belongs in your bag most days. If it rains: Brera, the Museo del Novecento, art galleries or an afternoon at QC Terme."},
  {k:["chiesa","vest","copr","spalle","ginocch","duomo","ambrogio","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Per Duomo e Sant'Ambrogio servono spalle e ginocchia coperte. D'estate una sciarpa leggera in borsa: risolto in due secondi.|The Duomo and Sant'Ambrogio require covered shoulders and knees. In summer a light scarf in your bag: solved in two seconds."},
  {k:["truff","petizion","braccialett","cordicell","regal","scam"],
   a:"Occhio alle 'petizioni' finte in Galleria e attorno al Duomo: cartellina, sorriso, poi chiedono soldi. Un 'no grazie' gentile e si prosegue. Stesso per i braccialetti 'regalati'.|Watch for fake 'petitions' in the Galleria and around the Duomo: clipboard, smile, then they ask for money. A kind 'no thanks' and move on. Same for 'free' bracelets."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","camparino","negroni"],
   a:"Cappuccino fino a metà mattina, espresso dopo: regola valida anche qui. E il momento giusto per il Camparino in Galleria è l'aperitivo: Negroni o Americano, in piedi al banco.|Cappuccino until mid-morning, espresso after: the rule applies here too. And the right time for Camparino in the Galleria is aperitivo: Negroni or Americano, standing at the bar."}
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: Cenacolo, prenotare, taxi, metro, aperitivo, pioggia, bambini, truffe... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: Last Supper, booking, taxi, metro, aperitivo, rain, kids, scams... or tap a quick question.";

const CHAT_QUICK = [
  "Il Cenacolo come si prenota?|How do I book the Last Supper?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Malpensa?|Taxi from Malpensa?",
  "Piove spesso?|Does it rain often?",
  "Dove faccio aperitivo?|Where for aperitivo?"
];


Guide.init({storageKey:"mil", pageTitle:"Milano Poliedrica — La guida che si adatta a te|Polyedric Milan — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
