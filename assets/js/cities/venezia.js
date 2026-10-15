(() => {
const TESTI = {
  nav1:"Profili|Profiles", nav2:"Esperienze|Experiences",
  nav3:"Itinerario|Itinerary", nav4:"Info pratiche|Practical info",
  heroK:"Guida poliedrica · Venezia|The many-sided guide · Venice",
  heroH1:"Ogni viaggio è<br><em>un viaggio diverso</em>|Every trip is<br><em>a different trip</em>",
  heroP:"Una città, otto viaggiatori: scegli il tuo profilo e la guida si adatta a te — da San Marco alla laguna, un itinerario su misura.|One city, eight travellers: pick your profile and the guide adapts — from San Marco to the lagoon, a tailor-made itinerary.",
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
  info1p:"Niente macchine: si cammina e si va in vaporetto. Il pass giornaliero ACTV conviene dopo tre corse. Da Marco Polo: Alilaguna (barca, circa 1 ora), bus a Piazzale Roma o taxi acqueo.|No cars: you walk and take the vaporetto. The ACTV day pass pays off after three rides. From Marco Polo: Alilaguna (boat, about 1 hour), bus to Piazzale Roma or water taxi.",
  info2h:"🗓️ Quando andare|🗓️ When to go",
  info2p:"Aprile–giugno e settembre–ottobre: la città al meglio. Carnevale (febbraio): magico e affollatissimo. Acqua alta tipicamente ottobre–gennaio: guarda la previsione maree.|April–June and September–October: the city at its best. Carnival (February): magical and packed. Acqua alta typically October–January: check the tide forecast.",
  info3h:"🎟️ Prenotare|🎟️ Booking",
  info3p:"Palazzo Ducale e Itinerari Segreti: prenotazione online. Basilica di San Marco: la mattina presto. Campanile e tour de La Fenice: qualche settimana prima.|Doge's Palace and Secret Itineraries: online booking. St Mark's Basilica: early morning. Bell Tower and La Fenice tour: a few weeks ahead.",
  footer:"<b>Venezia Poliedrica</b> — demo educativa · dati indicativi: verifica sempre orari e prezzi sui siti ufficiali|<b>Venezia Poliedrica</b> — educational demo · indicative data: always check official sources",
  selProfilo:"Seleziona prima un profilo ↑|Select a profile first ↑",
  tutteSotto:"Tutte le sotto-categorie|All subcategories",
  tuttiTipi:"Tutti i tipi di locale|All venue types",
  parolaEsp:"esperienze|experiences",
  comboVuota:"Nessuna esperienza con questa combinazione: prova un'altra sotto-categoria o «Tutte».|No experiences with this combination: try another subcategory or «All».",
  etichettaTutti:"tutti i profili|all profiles",
  giornata:"Giornata ottimale per il profilo|Optimal day for the profile",
  ariaSotto:"Filtra per sotto-categoria|Filter by subcategory",
  ariaTipo:"Filtra per tipo di locale|Filter by venue type",
  chatTitolo:"Alvise · il tuo amico veneziano|Alvise · your Venetian friend",
  chatSotto:"risposte predefinite · demo locale|preset answers · local demo",
  chatBtn:"🙋 Chiedi ad Alvise|🙋 Ask Alvise", chatChiudi:"✕ Chiudi|✕ Close",
  chatPh:"Scrivi una domanda...|Type a question...",
  benvenuto:"Ciao! Sono Alvise, veneziano doc 🙋 Chiedimi qualsiasi cosa sulla città — o clicca una domanda rapida qui sotto.|Hi! I'm Alvise, a true Venetian 🙋 Ask me anything about the city — or tap a quick question below.",
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
};

/* ---------- TIPI DI LOCALE (3° livello, solo food) ---------- */
const TIPI = [
  {id:"bacaro",      emoji:"🍢", nome:"Bacaro|Bacaro"},
  {id:"osteria",     emoji:"🍷", nome:"Osteria|Osteria"},
  {id:"ristorante",  emoji:"🍽️", nome:"Ristorante|Restaurant"},
  {id:"enoteca",     emoji:"🍷", nome:"Enoteca|Wine bar"},
  {id:"bar",         emoji:"🍹", nome:"Bar|Bar"},
  {id:"caffè",       emoji:"☕", nome:"Caffè storico|Historic café"},
  {id:"mercato",     emoji:"🧺", nome:"Mercato|Market"}
];

/* ---------- ESPERIENZE (38) ---------- */
const ESPERIENZE = [
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
];

/* ---------- ITINERARI ---------- */
const ITINERARI = {
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
];

const MARCO_FALLBACK = "Mmm, non l'ho capita 😅 Prova con: acqua alta, Palazzo Ducale, taxi, vaporetto, gondola, cicchetti, spritz, bambini... o clicca una domanda rapida.|Hmm, I didn't get that 😅 Try: acqua alta, Doge's Palace, taxi, vaporetto, gondola, cicchetti, spritz, kids... or tap a quick question.";

const CHAT_QUICK = [
  "Palazzo Ducale come si prenota?|How do I book the Doge's Palace?",
  "C'è acqua alta?|Is there acqua alta?",
  "Taxi dall'aeroporto?|Taxi from the airport?",
  "Dove mangio cicchetti?|Where do I eat cicchetti?",
  "Quanto costa la gondola?|How much is a gondola ride?"
];


Guide.init({storageKey:"ven", pageTitle:"Venezia Poliedrica — La guida che si adatta a te|Polyedric Venice — The guide that adapts to you", TESTI, PROFILI, SOTTO, TIPI, ESPERIENZE, ITINERARI, FOTO, IMMAGINI, MARCO, MARCO_FALLBACK, CHAT_QUICK});
})();
