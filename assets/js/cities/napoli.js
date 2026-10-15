(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Napoli|The many-sided guide · Naples",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — dal golfo ai vicoli, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from the gulf to the alleys, a tailor-made itinerary.",
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
  info1p:"Metro Linea 1 (le 'stazioni d'arte') e le funicolari per le colline. La Circumvesuviana porta a Pompei in 40 minuti. Il centro si vive a piedi.|Metro Line 1 (the 'art stations') and funiculars for the hills. The Circumvesuviana reaches Pompeii in 40 minutes. The centre is lived on foot.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Maggio–giugno e settembre: clima mite e mare caldo. Agosto: caldo intenso, molti in ferie, ma il lungomare resta vivo.|May–June and September: mild weather and warm sea. August: intense heat, many away on holiday, but the seafront stays alive.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Cappella Sansevero, Tesoro di San Gennaro e scavi di Pompei richiedono prenotazione: 2–3 settimane prima, di più in alta stagione.|Sansevero Chapel, San Gennaro Treasury and Pompeii require booking: 2–3 weeks ahead, more in high season.",
  footer:"<b>Napoli Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Napoli Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Ciro · il tuo amico napoletano|Ciro · your Neapolitan friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi a Ciro|🙋 Ask Ciro", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! So' Ciro, napoletano verace 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Ciro, a true Neapolitan 🙋 Ask me anything about the city — or tap a quick question below.",
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
    {id:"scavi",  emoji:"🏺", nome:"Sotterranei e scavi|Undergrounds & excavations"},
    {id:"storia", emoji:"🏘️", nome:"Storia e monumenti|History & monuments"}
  ],
  business: [
    {id:"congressi",  emoji:"🎤", nome:"Congressi e meeting|Congresses & meetings"},
    {id:"bleisure",   emoji:"🧳", nome:"Estensioni bleisure|Bleisure extensions"},
    {id:"networking", emoji:"🥂", nome:"Aperitivi e networking|Aperitifs & networking"}
  ],
  food: [
    {id:"pizza",  emoji:"🍕", nome:"Pizza e pizzerie|Pizza & pizzerias"},
    {id:"pesce",  emoji:"🦐", nome:"Pesce e cucina del golfo|Fish & gulf cuisine"},
    {id:"dolci",  emoji:"🍨", nome:"Dolci e caffè|Sweets & coffee"},
    {id:"street", emoji:"🧺", nome:"Street food e mercati|Street food & markets"},
    {id:"alta",   emoji:"🍽️", nome:"Alta cucina|Fine dining"}
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
  {id:"pizzeria",    emoji:"🍕", nome:"Pizzeria|Pizzeria"},
  {id:"friggitoria", emoji:"🍟", nome:"Friggitoria|Fry shop"},
  {id:"trattoria",   emoji:"🏠", nome:"Trattoria|Trattoria"},
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"bar",         emoji:"☕", nome:"Bar e caffè|Bar & café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (37) ---------- */
const ESPERIENZE = [
  /* — CULTURALE — */
  {t:"Napoli Sotterranea|Underground Naples", z:"San Gaetano|San Gaetano", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"scavi",
   p:"Quaranta metri sotto la città: acquedotti greci, cunicoli a lume di candela, la storia a strati.|Forty metres below the city: Greek aqueducts, candle-lit tunnels, history in layers.",
   tip:"Il passaggio più stretto si attraversa in fila e a candela: ok per i ragazzi, no per i claustrofobici.|The narrowest passage is walked single file by candlelight: fine for kids, not for the claustrophobic."},
  {t:"Pompei ed Ercolano in treno|Pompeii & Herculaneum by train", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["cultura"], sub:"scavi",
   p:"I due scavi più famosi al mondo, a 40 minuti di Circumvesuviana dal centro storico.|The world's two most famous sites, 40 minutes by Circumvesuviana from the historic centre.",
   tip:"Biglietto online e primo treno del mattino: a mezzogiorno il calore degli scavi è feroce.|Online ticket and first morning train: by noon the heat at the sites is brutal."},
  {t:"Museo Archeologico Nazionale|National Archaeological Museum", z:"Museo|Museum district", d:"3 ore|3 hrs", tags:["cultura"], sub:"musei",
   p:"L'Ercole Farnese e i mosaici di Alessandro: il tesoro di Pompei, al coperto.|The Farnese Hercules and Alexander's mosaics: Pompeii's treasure, indoors.",
   tip:"Vivilo prima degli scavi: a Pompei riconoscerai ciò che hai già visto nei saloni.|Visit it before the sites: at Pompeii you'll recognise what you saw in the halls."},
  {t:"Cappella Sansevero e il Cristo Velato|Sansevero Chapel & the Veiled Christ", z:"Centro storico|Historic centre", d:"45 min|45 min", tags:["cultura","religioso"], sub:"musei",
   p:"Il marmo che diventa velo: il capolavoro di Sanmartino e le macchine anatomiche del principe.|Marble turned to veil: Sanmartino's masterpiece and the prince's anatomical machines.",
   tip:"Prenota online con fascia oraria: il posto è piccolo e i posti vanno via in fretta.|Book online with a time slot: the place is small and slots sell out fast."},
  {t:"Certosa e Castel Sant'Elmo|Certosa & Castel Sant'Elmo", z:"Vomero|Vomero", d:"2,5 ore|2.5 hrs", tags:["cultura"], sub:"storia",
   p:"Museo nazionale alla Certosa e il castello con il migliore panorama sul golfo.|National museum in the Certosa and the castle with the finest gulf panorama.",
   tip:"Funicolare da via Toledo: la salita è già metà esperienza.|Funicular from via Toledo: the ride up is half the experience."},
  {t:"Spaccanapoli e i decumani|Spaccanapoli & the decumani", z:"Centro storico|Historic centre", d:"2 ore|2 hrs", tags:["cultura","lento"], sub:"storia",
   p:"La strada diritta che 'spacca' la città: greca, romana, barocca — tutta in una.|The straight street that 'splits' the city: Greek, Roman, Baroque — all in one.",
   tip:"Presto la mattina: luce tra i palazzi e vicoli ancora vuoti.|Early morning: light between the palaces and still-empty alleys."},
  {t:"Castel dell'Ovo e Borgo Marinaro|Castel dell'Ovo & the Marinaro", z:"Santa Lucia|Santa Lucia", d:"1,5 ore|1.5 hrs", tags:["cultura"], sub:"storia",
   p:"Il castello sul mare e la leggenda dell'uovo di Virgilio: finché regge l'uovo, regge Napoli.|The castle on the sea and the legend of Virgil's egg: as long as the egg holds, Naples holds.",
   tip:"Al tramonto: barche, borgo e il Vesuvio di fronte.|At sunset: boats, village and the Vesuvius ahead."},

  /* — BUSINESS — */
  {t:"Mostra d'Oltremare e congressi|Mostra d'Oltremare congress centre", z:"Fuorigrotta|Fuorigrotta", d:"mezza giornata|half day", tags:["business"], sub:"congressi",
   p:"Il polo fieristico e congressuale della città, a due passi dallo stadio.|The city's trade fair and congress hub, steps from the stadium.",
   tip:"Metro (Campi Flegrei) o Cumana (Mostra): dal centro in 15 minuti.|Metro (Campi Flegrei) or Cumana (Mostra): 15 minutes from the centre."},
  {t:"Aperitivo a Chiaia|Aperitivo in Chiaia", z:"Chiaia|Chiaia", d:"2 ore|2 hrs", tags:["business","food"], sub:"networking",
   p:"Piazza dei Martiri e via dei Mille: l'aperitivo elegante del dopo-lavoro.|Piazza dei Martiri and via dei Mille: the elegant after-work aperitivo.",
   tip:"Molti locali aprono la terrazza d'estate anche ai non ospiti.|Many venues open their summer terrace to non-guests too."},
  {t:"Bleisure: Sorrento e la costiera|Bleisure: Sorrento & the coast", z:"Fuori porta|Out of town", d:"1 giorno|1 day", tags:["business","lento"], sub:"bleisure",
   p:"Il giorno in più dopo il meeting: mezz'ora di golfo e sei in costiera.|The extra day after the meeting: half an hour across the gulf and you're on the coast.",
   tip:"Aliscafo da Mergellina: la traversata è già una vacanza nella vacanza.|Hydrofoil from Mergellina: the crossing is a holiday within the holiday."},

  /* — ENOGASTRONOMICO — */
  {t:"La via della pizza: Tribunali e Sanità|The pizza trail: Tribunali & Sanità", z:"Centro storico|Historic centre", d:"3 ore|3 hrs", tags:["food","lento"], sub:"pizza", tipo:"pizzeria",
   p:"Sorbillo, Di Matteo e le friggitorie storiche: forni a legna a cento metri di distanza.|Sorbillo, Di Matteo and historic fry shops: wood-fired ovens a hundred metres apart.",
   tip:"La fila è parte del rito: una pizza esce ogni minuto, scorre in fretta.|The queue is part of the ritual: a pizza comes out every minute, it moves fast."},
  {t:"Da Michele: la margherita canonica|Da Michele: the canonical margherita", z:"Centro storico|Historic centre", d:"1 ora|1 hr", tags:["food"], sub:"pizza", tipo:"pizzeria",
   p:"Dal 1870 fanno solo due pizze: marinara e margherita. La perfezione non ha bisogno di menù.|Since 1870 they make only two pizzas: marinara and margherita. Perfection needs no menu.",
   tip:"All'apertura o a fine pranzo: nel weekend la fila è l'attrazione.|At opening or late lunch: on weekends the queue is the attraction."},
  {t:"Pizza fritta e montanara|Fried pizza & montanara", z:"Quartieri Spagnoli|Spanish Quarters", d:"1 ora|1 hr", tags:["food"], sub:"pizza", tipo:"friggitoria",
   p:"La montanara — fritta e poi infornata con la provola — e la pizza fritta ripiena: la scuola napoletana del fritto.|The montanara — fried then baked with provola — and stuffed fried pizza: the Neapolitan school of frying.",
   tip:"Segui l'odore: la friggitoria giusta si riconosce dalla fila di vicoli.|Follow the smell: the right fry shop reveals itself by the queue of locals."},
  {t:"Pesce e cucina del golfo a Mergellina|Gulf fish & seafood in Mergellina", z:"Mergellina|Mergellina", d:"sera|evening", tags:["food"], sub:"pesce", tipo:"ristorante",
   p:"Dalle vongole alla frittura di paranza: il pesce del golfo si mangia col rumore delle onde.|From clams to mixed fry: gulf fish eaten to the sound of the waves.",
   tip:"Guarda il banco del pesce prima di ordinare: oggi cos'è arrivato.|Check the fish counter before ordering: what came in today."},
  {t:"Sfogliatella e babà|Sfogliatella & babà", z:"Centro storico|Historic centre", d:"colazione|breakfast", tags:["food"], sub:"dolci", tipo:"bar",
   p:"Riccia o frolla: la domanda più seria di Napoli. E il babà al rum come finale.|Riccia or frolla: Naples' most serious question. And the rum babà as a finale.",
   tip:"Se la sfogliatella è ancora calda, sei finito nel posto giusto.|If the sfogliatella is still warm, you've found the right place."},
  {t:"Caffè e sospeso allo Gambrinus|Coffee & the 'sospeso' at Gambrinus", z:"Chiaia|Chiaia", d:"30 min|30 min", tags:["food","cultura"], sub:"dolci", tipo:"bar",
   p:"Il caffè storico della città: specchi, velluti e il rito del caffè sospeso dal 1860.|The city's historic café: mirrors, velvet and the suspended-coffee ritual since 1860.",
   tip:"Paga un caffè sospeso: un anonimo lo berrà dopo di te. Il gesto più napoletano.|Pay a suspended coffee: a stranger will drink it after you. The most Neapolitan gesture."},
  {t:"Mercato di Porta Nolana|Porta Nolana market", z:"Porta Nolana|Porta Nolana", d:"1,5 ore|1.5 hrs", tags:["food","lento"], sub:"street", tipo:"mercato",
   p:"Pesce appena scaricato e voci che si rincorrono: il mercato dove Napoli fa la spesa.|Freshly unloaded fish and chasing voices: the market where Naples shops.",
   tip:"Alle 7 del mattino l'asta del pesce è teatro puro.|At 7 am the fish auction is pure theatre."},
  {t:"Rosticceria: frittatina e crocchè|Rosticceria: frittatina & crocchè", z:"Centro / Vomero|Centre / Vomero", d:"merenda|snack time", tags:["food"], sub:"street", tipo:"friggitoria",
   p:"La frittatina di maccheroni e i crocchè di patate: il carburante napoletano, in piedi al banco.|Macaroni frittatina and potato crocchè: Neapolitan fuel, standing at the counter.",
   tip:"Vetrina appannata dal vapore e fila di studenti a pranzo: garanzia di prezzo e qualità.|Steam-fogged counter and a lunchtime queue of students: price and quality guaranteed."},
  {t:"Cene stellate sul golfo|Starred dinners over the gulf", z:"Chiaia / Posillipo|Chiaia / Posillipo", d:"sera|evening", tags:["food","business"], sub:"alta", tipo:"ristorante",
   p:"La nuova Napoli creativa: chef che guardano al golfo e rivisitano la tradizione.|Creative new Naples: chefs who look at the gulf and reinvent tradition.",
   tip:"Chiedi il menu 'territorio' con i vini dei Campi Flegrei: la vista è compresa.|Ask for the 'territory' menu with Campi Flegrei wines: the view is included."},

  /* — RELIGIOSO — */
  {t:"Duomo e il Tesoro di San Gennaro|Cathedral & San Gennaro's Treasury", z:"Centro storico|Historic centre", d:"1,5 ore|1.5 hrs", tags:["religioso"], sub:"basiliche",
   p:"La cappella del Tesoro e il sangue del santo: il miracolo che la città aspetta tre volte l'anno.|The Treasury chapel and the saint's blood: the miracle the city awaits three times a year.",
   tip:"Il 19 settembre il rito dello scioglimento è un'esperienza unica, se sei in città.|On 19 September the liquefaction rite is a unique experience, if you're in town."},
  {t:"Il chiostro maiolicato di Santa Chiara|The majolica cloister of Santa Chiara", z:"Centro storico|Historic centre", d:"1 ora|1 hr", tags:["religioso","cultura"], sub:"chiese",
   p:"Il chiostro delle clarisse rivestito di maioliche settecentesche: più dipinto che costruito.|The Poor Clares' cloister covered in 18th-century majolica: more painted than built.",
   tip:"Nel complesso ci sono anche le terme romane scavate: due epoche in un biglietto.|The complex also holds excavated Roman baths: two eras in one ticket."},
  {t:"Gesù Nuovo, la facciata a diamante|Gesù Nuovo, the diamond façade", z:"Spaccanapoli|Spaccanapoli", d:"45 min|45 min", tags:["religioso"], sub:"chiese",
   p:"Un palazzo rinascimentale a bugne piramidali diventato chiesa: la facciata più strana d'Italia.|A Renaissance palace with pyramid-pointed ashlar turned church: Italy's strangest façade.",
   tip:"Fa' da apripista alla passeggiata su Spaccanapoli: si apre su tutto il decumano.|Use it as the gateway to the Spaccanapoli walk: it opens onto the whole decumanus."},
  {t:"Catacombe di San Gennaro|San Gennaro Catacombs", z:"Sanità|Sanità", d:"1,5 ore|1.5 hrs", tags:["religioso","cultura"], sub:"pellegrini",
   p:"La catacomba più grande del Sud: due livelli sotterranei e le più antiche immagini del santo.|Southern Italy's largest catacomb: two underground levels and the oldest images of the saint.",
   tip:"Il biglietto sostiene la cooperativa del Rione Sanità: turismo che fa bene al rione.|The ticket funds the Sanità district cooperative: tourism that does good."},

  /* — BENESSERE — */
  {t:"Stufe di Nerone ai Campi Flegrei|Stufe di Nerone, Phlegraean Fields", z:"Pozzuoli|Pozzuoli", d:"mezza giornata|half day", tags:["benessere"], sub:"terme",
   p:"Vapori naturali in grotte di epoca romana, sul cratere che respira.|Natural steam in Roman-era caves, on a breathing crater.",
   tip:"Prenota e porta il costume: le stufe si abbinano alla piscina termale.|Book ahead and bring a swimsuit: the steam rooms pair with the thermal pool."},
  {t:"Ischia terme in giornata|Ischia thermal day", z:"Isola|Island", d:"1 giorno|1 day", tags:["benessere"], sub:"terme",
   p:"Aliscafo di mattina e parchi termali sul mare: l'isola che cura da millenni.|Morning hydrofoil and seaside thermal parks: the island that heals for millennia.",
   tip:"Negombo e Poseidon sono i più celebri: prenota online e resta fino al tramonto.|Negombo and Poseidon are the most famous: book online and stay until sunset."},
  {t:"Parco Virgiliano, il golfo dall'alto|Virgiliano park, the gulf from above", z:"Posillipo|Posillipo", d:"1,5 ore|1.5 hrs", tags:["benessere","lento"], sub:"verde",
   p:"Il belvedere di Napoli: pini, Nisida e il golfo che va fino a Procida.|Naples' viewpoint: pines, Nisida and the gulf stretching to Procida.",
   tip:"Un'ora prima del tramonto: il golfo si accende e il Vesuvio diventa viola.|An hour before sunset: the gulf lights up and the Vesuvius turns purple."},

  /* — SPORT — */
  {t:"Stadio Diego Armando Maradona|Maradona Stadium", z:"Fuorigrotta|Fuorigrotta", d:"3 ore|3 hrs", tags:["sport"], sub:"calcio",
   p:"Il tempio del santo laico del calcio: 55.000 voci che cantano a una sola voce.|The temple of football's lay saint: 55,000 voices singing as one.",
   tip:"Nei giorni senza partita: tour dello stadio e museo della SSC, prenotabili online.|On non-match days: stadium tour and SSC museum, bookable online."},
  {t:"Murales di Maradona nei Quartieri|Maradona murals in the Quarters", z:"Quartieri Spagnoli|Spanish Quarters", d:"1 ora|1 hr", tags:["sport","lento"], sub:"calcio",
   p:"D10S: il murale gigante e i vicoli tappezzati di 'santini' del Pibe de Oro.|D10S: the giant mural and alleys wallpapered with images of the Golden Boy.",
   tip:"Vai di giorno, con calma e rispetto: qui il tifo è religione.|Go by day, unhurried and respectful: here fandom is religion."},
  {t:"Grandi eventi a Piazza del Plebiscito|Major events at Piazza del Plebiscito", z:"Plebiscito|Plebiscito", d:"sera|evening", tags:["sport"], sub:"eventi",
   p:"Concerti e rassegne nella piazza più regale d'Italia, tra Palazzo Reale e la basilica.|Concerts and festivals in Italy's most regal square, between the Royal Palace and the basilica.",
   tip:"Muoviti a piedi: nelle serate evento il traffico chiude tutto il centro.|Move on foot: on event nights traffic closes the whole centre."},
  {t:"Napoli City Half Marathon|Naples City Half Marathon", z:"Centro → lungomare|Centre → seafront", d:"1 giorno|1 day", tags:["sport"], sub:"partecipa",
   p:"21 chilometri attraverso la città con il mare a fianco: una delle corse più scenografiche del Sud.|21 kilometres through the city with the sea alongside: one of the South's most scenic races.",
   tip:"Iscriviti mesi prima; da spettatore, il lungomare è la zona più viva.|Register months ahead; as a spectator, the seafront is the liveliest zone."},

  /* — LENTO — */
  {t:"Lungomare Caracciolo a piedi|The Caracciolo seafront on foot", z:"Santa Lucia → Mergellina|Santa Lucia → Mergellina", d:"1 ora|1 hr", tags:["lento"], sub:"lente",
   p:"Chiuso alle auto, aperto al golfo: il chilometro di passeggiata più bello d'Italia.|Closed to cars, open to the gulf: Italy's most beautiful kilometre of seafront.",
   tip:"Al tramonto con un gelato: Vesuvio davanti, villa comunale a fianco.|At sunset with a gelato: Vesuvius ahead, the public gardens alongside."},
  {t:"Quartieri Spagnoli senza fretta|Spanish Quarters, no hurry", z:"Quartieri Spagnoli|Spanish Quarters", d:"2 ore|2 hrs", tags:["lento","cultura"], sub:"quartieri",
   p:"Vicoli verticali, panni stesi e scale che salgono verso il cielo: la Napoli più fotografata.|Vertical alleys, hanging laundry and stairways to the sky: the most photographed Naples.",
   tip:"Cammina piano e saluta: i vicoli si aprono a chi non ha fretta.|Walk slowly and greet people: the alleys open up to those not in a hurry."},
  {t:"Rione Sanità e le Fontanelle|Sanità district & the Fontanelle", z:"Sanità|Sanità", d:"3 ore|3 hrs", tags:["lento","cultura"], sub:"quartieri",
   p:"Il rione della vera Napoli: basilica, porte borboniche e l'ossario delle anime pezzentelle.|The district of true Naples: basilica, Bourbon gates and the ossuary of the 'pezzentelle' souls.",
   tip:"Sabato mattina il rione vive di mercato e musica: il momento migliore.|Saturday morning the district lives on market and music: the best time."},
  {t:"Borgo di Santa Lucia|The Santa Lucia village", z:"Santa Lucia|Santa Lucia", d:"1,5 ore|1.5 hrs", tags:["lento"], sub:"quartieri",
   p:"Il villaggio dei pescatori davanti a Castel dell'Ovo: Napoli com'era, a due passi dal centro.|The fishermen's village before Castel dell'Ovo: Naples as it was, steps from the centre.",
   tip:"Merenda di cuoppo e babà guardando le barche: la pausa perfetta.|A snack of cuoppo and babà watching the boats: the perfect pause."},

  /* — FORMATIVO — */
  {t:"Corso di pizza napoletana|Neapolitan pizza class", z:"Centro storico|Historic centre", d:"3 ore|3 hrs", tags:["formativo","food"], sub:"cucina",
   p:"Impastare, stendere e infornare nel forno a legna: la pizza si impara con le mani.|Knead, stretch and bake in the wood-fired oven: pizza is learned by hand.",
   tip:"Al termine mangi la tua pizza: il pranzo (e il giudizio) è incluso.|At the end you eat your own pizza: lunch (and the verdict) is included."},
  {t:"Presepe: laboratorio a San Gregorio Armeno|Nativity: workshop on San Gregorio Armeno", z:"Centro storico|Historic centre", d:"2 ore|2 hrs", tags:["formativo","cultura"], sub:"artigianato",
   p:"La via dei presepi: maestri che modellano pastori a mano come da quattro secoli.|The street of nativities: masters hand-modelling figures as they have for four centuries.",
   tip:"Costruisci il tuo pastore: souvenir che nessun aeroporto vende.|Build your own figurine: a souvenir no airport sells."},
  {t:"Tour con l'archeologo a Pompei|Archaeologist tour at Pompeii", z:"Pompei|Pompeii", d:"2,5 ore|2.5 hrs", tags:["formativo","cultura"], sub:"guide",
   p:"Pompei raccontata da chi la scava: strade, botteghe e vita quotidiana dell'79 d.C.|Pompeii told by those who dig it: streets, shops and daily life of AD 79.",
   tip:"Le guide adorano le domande: la curiosità è inclusa nel prezzo.|Guides love questions: curiosity is included in the price."}
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
  cultura:[
    {ora:"08:30", t:"Napoli Sotterranea", p:"Prima delle file: sotto la città mentre sopra si sveglia.|Before the queues: below the city while it wakes above."},
    {ora:"13:00", t:"Pizza a via dei Tribunali", p:"La margherita è il pranzo, non una scelta a sorpresa.|The margherita is lunch, not a surprise choice."},
    {ora:"15:00", t:"Sansevero e Spaccanapoli", p:"Il Cristo Velato, poi la strada che spacca la città.|The Veiled Christ, then the street that splits the city."},
    {ora:"19:00", t:"Funicolare a Vomero", p:"Certosa, castello e il golfo acceso dall'alto.|Certosa, castle and the gulf lit from above."}
  ],
  business:[
    {ora:"09:00", t:"Meeting all'Oltremare o in centro", p:"Il polo congressuale è a 15 minuti di metro dal centro.|The congress hub is 15 minutes by metro from the centre."},
    {ora:"13:30", t:"Pranzo rapido a Chiaia", p:"Rosticceria di fiducia: frittatina in dieci minuti.|A trusted rosticceria: frittatina in ten minutes."},
    {ora:"16:00", t:"Pausa lungomare", p:"Il Caracciolo come antidoto alle slide.|The Caracciolo as the antidote to slides."},
    {ora:"19:30", t:"Aperitivo a piazza dei Martiri", p:"Chiaia by night: il rito elegante del dopo-lavoro.|Chiaia by night: the elegant after-work ritual."}
  ],
  food:[
    {ora:"08:00", t:"Sfogliatella e caffè al banco", p:"Riccia o frolla: la domanda più seria della giornata.|Riccia or frolla: the day's most serious question."},
    {ora:"10:00", t:"Mercato di Porta Nolana", p:"Assaggi tra le bancarelle del pesce: guarda il banco.|Tastings among the fish stalls: watch the counter."},
    {ora:"13:30", t:"Pizza da Michele o Sorbillo", p:"La fila fa parte del sapore.|The queue is part of the flavour."},
    {ora:"18:00", t:"Cuoppo a Mergellina", p:"Frittura al tramonto, con le barche davanti.|Fried seafood at sunset, boats ahead."}
  ],
  religioso:[
    {ora:"07:00", t:"Messa al Duomo e cappella del Tesoro", p:"Il cuore della devozione napoletana all'alba.|The heart of Neapolitan devotion at dawn."},
    {ora:"09:30", t:"Chiostro di Santa Chiara", p:"Maioliche e silenzio: Napoli che respira.|Majolica and silence: Naples breathing."},
    {ora:"12:30", t:"Gesù Nuovo e pranzo sul decumano", p:"La facciata a diamante, poi la pasta fatta a mano.|The diamond façade, then hand-made pasta."},
    {ora:"16:00", t:"Catacombe di San Gennaro", p:"Chiudi nella Sanità: la città sotterranea dei primi cristiani.|End in Sanità: the underground city of the first Christians."}
  ],
  benessere:[
    {ora:"08:00", t:"Camminata al Parco Virgiliano", p:"Il golfo come colazione d'occhi.|The gulf as breakfast for the eyes."},
    {ora:"10:30", t:"Stufe di Nerone", p:"Sudare in grotta come i romani: poi doccia e nuova pelle.|Sweat in a cave like the Romans: then shower, new skin."},
    {ora:"13:30", t:"Pranzo leggero ai Campi Flegrei", p:"Cucina leggera e vista cratere: la dieta flegrea.|Light cooking and crater views: the Phlegraean diet."},
    {ora:"16:00", t:"Massaggio con vista golfo", p:"Il pomeriggio dedicato a te, senza meta.|An afternoon for yourself, no destination."}
  ],
  sport:[
    {ora:"09:00", t:"Tour dello stadio Maradona", p:"Spogliatoi, campo e museo: la leggenda a temperatura ambiente.|Dressing rooms, pitch and museum: the legend at room temperature."},
    {ora:"11:30", t:"Murales nei Quartieri Spagnoli", p:"La scalinata del D10S: foto e rispetto.|The D10S mural: photos and respect."},
    {ora:"13:00", t:"Pranzo a tema tifo", p:"Cuoppo e crocchè: carburante da curva.|Cuoppo and crocchè: terrace-grade fuel."},
    {ora:"18:00", t:"Partita del Napoli", p:"Il Maradona si accende: settanta minuti di teatro, almeno.|The Maradona lights up: seventy minutes of theatre, at least."}
  ],
  lento:[
    {ora:"08:30", t:"Caffè in un bar di quartiere", p:"Il banco pieno di gente del rione: il modo giusto di partire.|A counter full of locals: the right way to start."},
    {ora:"10:00", t:"Mercato rionale", p:"Chiedi ai vicini qual è il giorno giusto.|Ask the neighbours which day is right."},
    {ora:"12:30", t:"Rione Sanità e Fontanelle", p:"Basilica, porte borboniche, ossario: il rione che si racconta.|Basilica, Bourbon gates, ossuary: the district telling its story."},
    {ora:"18:00", t:"Lungomare Caracciolo a piedi", p:"Dal borgo a Mergellina, a ritmo d'uomo, fino a notte.|From the village to Mergellina, at human pace, into the night."}
  ],
  formativo:[
    {ora:"09:00", t:"Corso di pizza", p:"Farina, acqua, sale e fuoco: tre ore di verità.|Flour, water, salt and fire: three hours of truth."},
    {ora:"13:00", t:"Mangi la tua pizza", p:"Il pranzo migliore è quello che hai fatto tu.|The best lunch is the one you made."},
    {ora:"15:30", t:"Laboratorio di presepe", p:"Pastori, muschio e mestiere: un souvenir unico.|Figures, moss and craft: a unique souvenir."},
    {ora:"18:00", t:"Botteghe di San Gregorio Armeno", p:"La via dei presepi di sera, quando i turisti se ne vanno.|The nativity street in the evening, when tourists leave."}
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
   a:"Prenota online il Sansevero e Pompei: si esauriscono settimane prima in alta stagione. Trucco da locale: il Duomo la mattina presto, e a Pompei entra all'apertura col biglietto già in tasca.|Book the Sansevero and Pompeii online: they sell out weeks ahead in high season. Local trick: the Cathedral early morning, and at Pompeii enter at opening with your ticket already in hand."},
  {k:["sicur","sera","rub","borsegg","furto","safe","night","pickpock","theft"],
   a:"Il centro e il lungomare sono sicuri anche la sera. Occhio ai borseggiatori nei Quartieri Spagnoli e sulla Circumvesuviana: borsa davanti e telefono in tasca interna.|The centre and the seafront are safe at night too. Watch for pickpockets in the Spanish Quarters and on the Circumvesuviana: bag in front, phone in an inner pocket."},
  {k:["taxi","aeroporto","capodichino","uber","nap","airport","cab"],
   a:"Da Capodichino al centro: 15-20 minuti, tariffa predeterminata — chiedila prima di salire. In città: app itTaxi o Free Now. E se un tassista ti propone un tour 'speciale'... sorridi e cambia discorso.|From Capodichino to the centre: 15-20 minutes, fixed fare — ask before boarding. In town: itTaxi or Free Now apps. And if a driver offers a 'special' tour... smile and change subject."},
  {k:["acqua","fontanella","borraccia","bere","water","drink","fountain"],
   a:"L'acqua di Napoli è buona e potabile: le fontanelle pubbliche sono ovunque. Porta la borraccia — e se un bar ti offre 'na tazzulella 'e caffè... non dire mai no.|Naples water is good and drinkable: public fountains are everywhere. Bring a bottle — and if a bar offers you a little coffee... never say no."},
  {k:["metro","bus","muover","anm","funicol","circumvesuviana","vesuvio","pompei","pompeii","vesuv","subway","transport"],
   a:"La Linea 1 è un museo: le stazioni d'arte di Toledo e Università sono tra le più belle al mondo. E le funicolari sono un'esperienza da sole. Per Pompei: Circumvesuviana da Garibaldi, 40 minuti.|Line 1 is a museum: the art stations at Toledo and Università are among the world's most beautiful. The funiculars are an experience in themselves. For Pompeii: Circumvesuviana from Garibaldi, 40 minutes."},
  {k:["cena","orario","ristorant","mangiar","aperto","pizza","pizzeria","dinner","eat","restaurant","lunch"],
   a:"A Napoli si cena alle 20:30-21:00, e la pizza si mangia pure a pranzo. Le pizzerie vere hanno meno di dieci pizze in menù: se ne vedi quaranta, cambia locale.|In Naples you dine at 8:30-9 pm, and pizza is eaten at lunch too. True pizzerias have fewer than ten pizzas on the menu: if you see forty, find another place."},
  {k:["mancia","tip","camerier","servizio","waiter","gratuit"],
   a:"Non obbligatoria: al bar gli spicci del resto, al ristorante il 5-10% se sei contento. E ricorda il caffè sospeso: pagane uno per uno sconosciuto — il gesto più napoletano che esista.|Not compulsory: small change at the bar, 5-10% at the restaurant if happy. And remember the suspended coffee: pay one for a stranger — the most Neapolitan gesture there is."},
  {k:["bambin","famiglia","ragazz","figli","kid","child","family"],
   a:"Con i bimbi: pizza come pasto fisso, funicolare come giostra, Castel dell'Ovo sul mare e la Città della Scienza. E il cuoppo come merenda: infallibile.|With kids: pizza as a staple, the funicular as a carousel, Castel dell'Ovo by the sea and the Città della Scienza. And a cuoppo as a snack: infallible."},
  {k:["piogg","piov","rain","weather","wet"],
   a:"Piove di rado, ma se capita scendi sotto: Napoli Sotterranea, il Sansevero e il Museo Archeologico sono perfetti al coperto. E il golfo con la pioggia? Tiene pure 'o fascino.|It rarely rains, but if it does, go below: Underground Naples, the Sansevero and the Archaeological Museum are perfect indoors. And the gulf in the rain? Still charming."},
  {k:["chiesa","vest","copr","spalle","ginocch","duomo","abbigliament","entrare","church","dress","shoulders","knees"],
   a:"Per Duomo, Sansevero e le chiese servono spalle e ginocchia coperte. D'estate una sciarpa leggera in borsa: problema risolto.|The Cathedral, the Sansevero and churches require covered shoulders and knees. In summer a light scarf in your bag: solved."},
  {k:["truff","gladiator","braccialett","cordicell","regal","scam","parchegg"],
   a:"Occhio ai parcheggiatori abusivi: se uno ti 'aiuta' a parcheggiare e poi chiede un regalino, pochi spicci e basta — o meglio, cerca le strisce blu o un garage. E sui taxi: solo bianchi col tassametro.|Watch for unofficial parking attendants: if one 'helps' you park and then asks for a gift, a few coins are enough — or better, find blue lines or a garage. For taxis: white ones with a meter only."},
  {k:["cappuccin","caff","colazion","espresso","bar","coffee","breakfast","sospeso"],
   a:"Il caffè a Napoli si beve veloce, al banco, e costa poco. Cappuccino solo a colazione: a Napoli è una legge non scritta ma ferrea. E per fare bella figura? Paga un caffè sospeso.|In Naples coffee is drunk fast, standing at the counter, and costs little. Cappuccino only at breakfast: an unwritten but iron-clad rule. To make a good impression? Pay a suspended coffee."}
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: code, pizza, taxi, metro, funicolare, Pompei, Vesuvio, bambini, pioggia, caffè sospeso... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: queues, pizza, taxi, metro, funicular, Pompeii, Vesuvius, kids, rain, suspended coffee... or tap a quick question.";

const CHAT_QUICK = [
  "Come evito le code?|How do I skip the queues?",
  "È sicura la sera?|Is it safe at night?",
  "Taxi da Capodichino?|Taxi from Capodichino?",
  "Come arrivo a Pompei?|How do I get to Pompeii?",
  "Dove la pizza migliore?|Where's the best pizza?"
];


Guide.init({storageKey:"nap", pageTitle:"Napoli Poliedrica — La guida che si adatta a te|Polyedric Naples — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
