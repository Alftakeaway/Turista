// Editorial source. A regional speciality is explicitly distinguished from a city recipe.
// Fields: name; English name; category; short bilingual description; Commons search; venue group.
const rows={
roma:`Carbonara;Carbonara;table;Uovo, pecorino e guanciale.|Egg, pecorino and cured pork cheek.;carbonara;trattoria
Cacio e pepe;Cacio e pepe;table;Pasta, pecorino e pepe nero.|Pasta, pecorino and black pepper.;cacio e pepe;trattoria
Amatriciana;Amatriciana;table;Da Amatrice alla tavola romana: pomodoro e guanciale.|From Amatrice to Roman tables: tomato and guanciale.;amatriciana;trattoria
Gricia;Gricia;table;Guanciale e pecorino, senza pomodoro.|Guanciale and pecorino, without tomato.;pasta gricia;trattoria
Carciofi alla romana;Roman-style artichokes;table;Carciofi stufati con erbe aromatiche; stagionali.|Artichokes braised with herbs; seasonal.;carciofi alla romana;trattoria
Carciofi alla giudia;Jewish-style artichokes;table;Il carciofo fritto della tradizione ebraico-romanesca.|The fried artichoke of Jewish-Roman cooking.;carciofi alla giudia;ghetto
Saltimbocca;Saltimbocca;table;Vitello con prosciutto e salvia.|Veal with cured ham and sage.;saltimbocca;trattoria
Coda alla vaccinara;Oxtail stew;table;Cottura lenta e sugo da raccogliere col pane.|Slow-cooked oxtail with a rich sauce.;coda alla vaccinara;trattoria
Trippa alla romana;Roman-style tripe;table;Trippa al pomodoro, mentuccia e pecorino.|Tripe with tomato, mint and pecorino.;trippa alla romana;trattoria
Abbacchio;Roman-style lamb;table;Agnello della tradizione laziale, al forno o scottadito.|Lazio-style lamb, roasted or grilled.;abbacchio;trattoria
Rigatoni con la pajata;Rigatoni with pajata;table;Il quinto quarto nella cucina popolare romana.|Offal in traditional Roman cooking.;pajata;trattoria
Gnocchi alla romana;Roman semolina gnocchi;table;Dischi di semolino gratinati al forno.|Oven-baked semolina discs.;gnocchi alla romana;trattoria
Puntarelle;Puntarelle;table;Germogli croccanti con condimento alle acciughe; stagionali.|Crisp chicory shoots with anchovy dressing; seasonal.;puntarelle;trattoria
Fave e pecorino;Broad beans and pecorino;market;L’abbinamento primaverile della campagna romana.|A spring pairing from the Roman countryside.;fave pecorino;market
Supplì;Supplì;street;Riso fritto con cuore di mozzarella.|Fried rice with a mozzarella centre.;supplì;suppli
Filetti di baccalà;Fried salt cod;street;Baccalà in pastella, da mangiare caldo.|Battered salt cod, best eaten hot.;filetti baccalà fritti;suppli
Fiori di zucca fritti;Fried courgette flowers;street;Fiori ripieni in pastella, spesso con alici.|Stuffed battered flowers, often with anchovies.;fiori zucca fritti;suppli
Pizza bianca;Roman pizza bianca;street;Dal forno, semplice o farcita.|From the bakery, plain or filled.;pizza bianca romana;forno
Pizza rossa;Roman pizza rossa;street;Sfoglia di pane e pomodoro, senza formaggio.|A thin bakery pizza topped with tomato.;pizza rossa romana;forno
Pizza al taglio;Pizza by the slice;street;La pizza del forno, venduta a fette o a peso.|Bakery pizza sold by the slice or by weight.;pizza romana;forno
Porchetta;Porchetta;market;Specialità dei Castelli Romani, anche nei panini dei mercati.|A Castelli Romani speciality, also served in market sandwiches.;porchetta;market
Pecorino Romano;Pecorino Romano;market;Formaggio ovino da assaggio o da grattugia.|Sheep’s milk cheese for tasting or grating.;Pecorino Romano cheese;market
Maritozzo;Maritozzo;dessert;Panino dolce aperto e farcito di panna.|A sweet bun split and filled with cream.;maritozzo;dolce
Crostata di ricotta e visciole;Ricotta and sour cherry tart;dessert;Ricotta e amarene nella tradizione del Ghetto.|Ricotta and sour cherries in the Ghetto tradition.;ricotta visciole;ghetto
Pizza ebraica;Roman Jewish fruit cake;dessert;Dolce compatto con frutta secca e canditi.|A dense sweet with nuts and candied fruit.;pizza ebraica;ghetto
Pangiallo;Pangiallo;dessert;Dolce natalizio romano con frutta secca.|A Roman Christmas sweet with dried fruit and nuts.;pangiallo;dolce
Ciambelline al vino;Wine biscuits;dessert;Biscotti laziali da forno, con vino nell’impasto.|Lazio biscuits with wine in the dough.;ciambelline vino;forno
Mostaccioli romani;Roman mostaccioli;dessert;Biscotti speziati della tradizione laziale.|Spiced biscuits from the Lazio tradition.;mostaccioli romani;forno
Stracciatella in brodo;Stracciatella soup;table;Uovo e formaggio nel brodo caldo.|Egg and cheese stirred into hot broth.;stracciatella soup;trattoria
Coratella con carciofi;Lamb offal with artichokes;table;Quinto quarto e carciofi, quando è stagione.|Lamb offal with seasonal artichokes.;coratella carciofi;trattoria`,
napoli:`Pizza Margherita;Margherita pizza;street;Pomodoro, fiordilatte e basilico.|Tomato, mozzarella and basil.;pizza margherita napoli;pizza
Pizza Marinara;Marinara pizza;street;Pomodoro, aglio e origano, senza mozzarella.|Tomato, garlic and oregano, without mozzarella.;pizza marinara;pizza
Pizza fritta;Fried pizza;street;Impasto fritto ripieno, tradizionalmente con ricotta e cicoli.|Fried filled dough, traditionally with ricotta and pork cracklings.;pizza fritta;fritti
Montanara;Montanara;street;Pizzetta fritta con pomodoro e formaggio.|A small fried pizza with tomato and cheese.;montanara pizza;fritti
Frittatina di pasta;Fried pasta bite;street;Pasta compatta, besciamella e frittura dorata.|Pasta and béchamel in a golden fried bite.;frittatina pasta;fritti
Crocchè;Potato crocchè;street;Crocchette di patate, spesso con cuore filante.|Potato croquettes, often with melted cheese inside.;crocchè;fritti
Cuoppo;Cuoppo;street;Cono di fritture: chiedi se di terra o mare.|A cone of fried bites: ask whether seafood or vegetables.;cuoppo;fritti
Frittata di maccheroni;Pasta frittata;street;Pasta e uova cotte insieme, anche da portare via.|Pasta and eggs cooked together, also eaten on the go.;frittata maccheroni;trattoria
Ragù napoletano;Neapolitan ragù;table;Sugo di carne a cottura lenta.|A slow-cooked meat and tomato sauce.;ragù napoletano;ragù
Genovese napoletana;Neapolitan genovese;table;Cipolle e carne, non pesto ligure.|Slow-cooked onions and beef, unrelated to Ligurian pesto.;genovese napoletana;ragù
Pasta e patate con provola;Pasta, potatoes and smoked cheese;table;La versione cremosa con provola.|The creamy version with smoked provola.;pasta patate provola;trattoria
Spaghetti alle vongole;Spaghetti with clams;table;Un classico della cucina del golfo.|A classic of Gulf cooking.;spaghetti vongole;trattoria
Spaghetti alla puttanesca;Puttanesca;table;Pomodoro, olive e capperi.|Tomato, olives and capers.;puttanesca;trattoria
Gnocchi alla sorrentina;Sorrento-style gnocchi;table;Dalla penisola sorrentina: pomodoro e mozzarella gratinati.|From Sorrento: gnocchi baked with tomato and mozzarella.;gnocchi sorrentina;trattoria
Parmigiana di melanzane;Aubergine parmigiana;table;Melanzane, pomodoro e formaggio a strati.|Layers of aubergine, tomato and cheese.;parmigiana melanzane;trattoria
Sartù di riso;Sartù rice timbale;table;Timballo di riso delle occasioni speciali.|A rice timbale for special occasions.;sartù;trattoria
Polpo alla luciana;Luciana-style octopus;table;Polpo in umido con pomodoro e olive.|Octopus simmered with tomato and olives.;polpo luciana;trattoria
Impepata di cozze;Peppered mussels;table;Cozze, pepe e il loro fondo di cottura.|Mussels, pepper and their cooking juices.;impepata cozze;trattoria
Salsiccia e friarielli;Sausage and friarielli;table;Salsiccia con le cime amarognole locali.|Sausage with local bitter broccoli greens.;salsiccia friarielli;trattoria
Casatiello;Casatiello;street;Ciambella salata pasquale con salumi e formaggio.|An Easter savoury ring with cured meats and cheese.;casatiello;dolce
Taralli sugna e pepe;Lard and pepper taralli;street;Taralli napoletani con mandorle.|Neapolitan savoury rings with almonds.;taralli sugna pepe;dolce
Mozzarella di bufala;Buffalo mozzarella;market;Specialità campana: chiedi provenienza e produzione.|A Campanian speciality: ask about origin and production.;mozzarella bufala;market
Sfogliatella riccia;Sfogliatella riccia;dessert;Sfoglie croccanti e ripieno di semolino e ricotta.|Crisp pastry layers with semolina and ricotta filling.;sfogliatella riccia;dolce
Sfogliatella frolla;Sfogliatella frolla;dessert;La versione di pasta frolla, dal guscio morbido.|The shortcrust version with a softer shell.;sfogliatella frolla;dolce
Babà;Babà;dessert;Dolce lievitato imbevuto, normalmente al rum.|A soaked yeast cake, usually with rum.;babà napoletano;dolce
Pastiera;Pastiera;dessert;Ricotta, grano e profumo di fiori d’arancio.|Ricotta, wheat and orange blossom aroma.;pastiera;dolce
Struffoli;Struffoli;dessert;Piccole palline fritte al miele, natalizie.|Small fried honey-coated balls, a Christmas tradition.;struffoli;dolce
Zeppole di San Giuseppe;St Joseph’s zeppole;dessert;Crema e amarena, soprattutto intorno al 19 marzo.|Pastry cream and sour cherry, especially around 19 March.;zeppole San Giuseppe;dolce
Delizia al limone;Lemon delight;dessert;Dolce della costa sorrentina e amalfitana.|A lemon dessert from the Sorrento and Amalfi coast.;delizia limone;dolce
Migliaccio;Migliaccio;dessert;Dolce di semolino e ricotta del Carnevale.|A Carnival cake with semolina and ricotta.;migliaccio dolce;dolce`,
palermo:`Arancine;Arancine;street;Riso fritto ripieno: chiedi la variante al ragù o al burro.|Filled fried rice: ask for ragù or butter-style versions.;arancina ragù;focaccia
Arancina al burro;Butter-style arancina;street;La variante bianca, spesso con prosciutto e formaggio.|The white version, often with ham and cheese.;arancina burro;focaccia
Pane con la milza;Spleen sandwich;street;Pane câ meusa, semplice o con formaggio.|Pane câ meusa, plain or with cheese.;pani ca meusa;focaccia
Panelle;Panelle;street;Frittelle sottili di farina di ceci.|Thin chickpea-flour fritters.;panelle;focaccia
Cazzilli;Cazzilli;street;Piccole crocchette di patate, spesso nel panino.|Small potato croquettes, often in a bread roll.;cazzilli;focaccia
Sfincione;Sfincione;street;Focaccia alta con pomodoro, cipolla e acciughe.|Thick bread with tomato, onions and anchovies.;sfincione;focaccia
Stigghiole;Stigghiole;street;Interiora alla brace dei banchi di strada.|Grilled offal from street stalls.;stigghiole;market
Frittola;Frittola;street;Bocconi di carne della tradizione dei mercati.|Small meat bites from the market tradition.;frittola palermo;market
Polpo bollito;Boiled octopus;market;Da assaggiare ai banchi che lo preparano.|Try it at stalls that prepare it.;polpo bollito palermo;market
Anelletti al forno;Baked anelletti;table;Piccoli anelli di pasta al ragù, gratinati.|Small pasta rings baked with ragù.;anelletti forno;focaccia
Pasta con le sarde;Pasta with sardines;table;Sarde, finocchietto e una nota dolce di uvetta.|Sardines, wild fennel and a sweet raisin note.;pasta sarde;focaccia
Sarde a beccafico;Stuffed sardines;table;Sarde arrotolate con ripieno aromatico.|Rolled sardines with an aromatic filling.;sarde beccafico;focaccia
Caponata;Caponata;table;Melanzane in agrodolce, con varianti di famiglia.|Sweet-and-sour aubergines with many family variations.;caponata;focaccia
Pasta con l’anciova;Anchovy pasta;table;Acciughe e mollica tostata.|Anchovies and toasted breadcrumbs.;pasta anciova;focaccia
Involtini alla palermitana;Palermo meat rolls;table;Piccoli involtini con farcia di pane.|Small meat rolls with a breadcrumb filling.;involtini palermitana;focaccia
Pasta al pesto trapanese;Trapani-style pesto pasta;table;Dalla Sicilia occidentale: pomodoro e mandorle.|From western Sicily: tomatoes and almonds.;pesto trapanese;focaccia
Cannolo;Cannolo;dessert;Cialda croccante e ricotta; preferisci farcitura al momento.|Crisp pastry and ricotta; look for filling to order.;cannoli siciliani;dolce
Cassata siciliana;Sicilian cassata;dessert;Ricotta, pan di Spagna, glassa e canditi.|Ricotta, sponge, icing and candied fruit.;cassata siciliana;dolce
Cassata al forno;Baked cassata;dessert;La versione con guscio di pasta frolla.|The version enclosed in shortcrust pastry.;cassata forno;dolce
Frutta martorana;Marzipan fruit;dessert;Mandorle e zucchero modellati come frutti.|Almonds and sugar shaped into fruit.;frutta martorana;dolce
Sfince di San Giuseppe;St Joseph’s sfince;dessert;Dolci fritti con ricotta, tipici di marzo.|Fried ricotta-topped pastries, especially in March.;sfince san giuseppe;dolce
Gelo di melone;Watermelon pudding;dessert;A Palermo melone indica qui l’anguria.|In Palermo, melone here means watermelon.;gelo melone;dolce
Buccellato;Buccellato;dessert;Dolce con fichi secchi e frutta secca.|A pastry with dried figs and nuts.;buccellato sicilia;dolce
Cuccìa;Cuccìa;dessert;Grano dolce della festa di Santa Lucia.|Sweet wheat for St Lucy’s Day.;cuccìa;dolce
Reginelle;Sesame reginelle;dessert;Biscotti croccanti ricoperti di sesamo.|Crunchy sesame-covered biscuits.;reginelle biscotti;dolce
Biscotti di San Martino;St Martin’s biscuits;dessert;Biscotti all’anice della festa di novembre.|Anise biscuits for the November feast.;biscotti san martino;dolce
Pasta di mandorle;Almond pastries;dessert;Piccola pasticceria siciliana alle mandorle.|Small Sicilian almond pastries.;pasta mandorle biscotti;dolce
Brioche col gelato;Gelato in a brioche;dessert;La brioche siciliana diventa un dessert da passeggio.|A Sicilian brioche becomes a handheld dessert.;brioche gelato;dolce
Granita siciliana;Sicilian granita;dessert;Una pausa fredda, parte della tradizione regionale.|A cold break from the wider Sicilian tradition.;granita siciliana;dolce
Ravazzata;Ravazzata;street;Pasta da rosticceria al forno con ragù.|Baked savoury dough filled with ragù.;ravazzata;dolce`,
milano:`Risotto alla milanese;Milanese risotto;table;Riso, zafferano e mantecatura.|Rice, saffron and a creamy finish.;risotto milanese;trattoria
Ossobuco;Ossobuco;table;Geretto in umido, spesso con risotto.|Braised veal shank, often with risotto.;ossobuco;trattoria
Cotoletta alla milanese;Milanese veal cutlet;table;Vitello impanato e fritto nel burro.|Veal breaded and fried in butter.;cotoletta milanese;trattoria
Mondeghili;Mondeghili;street;Polpettine milanesi della cucina di recupero.|Milanese meatballs from the tradition of using leftovers.;mondeghili;trattoria
Cassoeula;Cassoeula;table;Verza e maiale, soprattutto nella stagione fredda.|Cabbage and pork, especially in cold weather.;cassoeula;trattoria
Busecca;Milanese tripe;table;Trippa della tradizione lombarda.|Tripe from the Lombard tradition.;busecca;trattoria
Riso al salto;Riso al salto;table;Riso ripassato in padella fino alla crosta.|Rice pan-fried to form a golden crust.;riso salto;trattoria
Minestrone alla milanese;Milanese minestrone;table;Verdure e riso, con variazioni stagionali.|Vegetables and rice, changing with the seasons.;minestrone milanese;trattoria
Nervetti;Nervetti salad;table;Insalata fredda di cartilagini, cipolla e fagioli.|A cold salad of cartilage, onion and beans.;nervetti;trattoria
Rustin negàa;Rustin negàa;table;Nodini di vitello cotti lentamente.|Slow-cooked veal chops.;rustin negàa;trattoria
Bollito misto;Mixed boiled meats;table;Carni lessate con salse, tradizione del Nord.|Boiled meats with sauces, a northern tradition.;bollito misto;trattoria
Polenta;Polenta;table;La base di mais della cucina lombarda.|The maize staple of Lombard cooking.;polenta lombardia;trattoria
Gorgonzola;Gorgonzola;market;Formaggio erborinato del territorio lombardo-piemontese.|Blue cheese from Lombardy and Piedmont.;gorgonzola cheese;gastronomia
Taleggio;Taleggio;market;Formaggio lombardo a crosta lavata.|A washed-rind cheese from Lombardy.;taleggio;gastronomia
Grana Padano;Grana Padano;market;Formaggio stagionato della pianura padana.|An aged cheese from the Po valley.;grana padano cheese;gastronomia
Quartirolo Lombardo;Quartirolo Lombardo;market;Formaggio del territorio lombardo, fresco o stagionato.|A Lombard cheese, fresh or matured.;quartirolo;gastronomia
Salame Milano;Milano salami;market;Salame dalla grana fine.|A finely ground cured salami.;salame milano;gastronomia
Bresaola;Bresaola;market;Dalla Valtellina, carne bovina stagionata.|Air-dried beef from Valtellina.;bresaola;gastronomia
Salame di Varzi;Varzi salami;market;Specialità dell’Oltrepò Pavese, nelle gastronomie lombarde.|An Oltrepò Pavese speciality sold in Lombard delis.;salame varzi;gastronomia
Panettone;Panettone;dessert;Il grande lievitato milanese con uvetta e canditi.|Milan’s enriched bread with raisins and candied fruit.;panettone;dolce
Veneziana;Veneziana;dessert;Lievitato glassato presente nella pasticceria milanese.|A glazed sweet bread found in Milanese patisseries.;veneziana dolce;dolce
Pan de mej;Pan de mej;dessert;Dolce lombardo con farina di mais.|A Lombard sweet made with maize flour.;pan de mej;dolce
Pan dei morti;Pan dei morti;dessert;Dolci speziati di inizio novembre.|Spiced sweets for early November.;pan dei morti;dolce
Torta sbrisolona;Sbrisolona;dessert;Da Mantova: torta friabile alle mandorle.|From Mantua: a crumbly almond cake.;sbrisolona;dolce
Amaretti;Amaretti;dessert;Biscotti alle mandorle, anche nella tradizione di Saronno.|Almond biscuits, also part of the Saronno tradition.;amaretti saronno;dolce
Offelle;Offelle;dessert;Biscotti della tradizione di Parona, in Lombardia.|Biscuits from Parona in Lombardy.;offelle parona;dolce
Barbajada;Barbajada;dessert;Bevanda milanese con caffè, cacao e latte.|A Milanese drink with coffee, cocoa and milk.;barbajada;dolce
Polenta taragna;Polenta taragna;table;Dalle valli lombarde: grano saraceno e formaggio.|From Lombard valleys: buckwheat and cheese.;polenta taragna;trattoria
Pizzoccheri;Pizzoccheri;table;Dalla Valtellina: pasta di grano saraceno e verdure.|From Valtellina: buckwheat pasta and vegetables.;pizzoccheri;trattoria
Sciatt;Sciatt;street;Frittelle valtellinesi con cuore di formaggio.|Valtellina fritters with a cheese centre.;sciatt;trattoria`,
torino:`Vitello tonnato;Vitello tonnato;table;Vitello freddo con salsa di tonno.|Cold veal with a tuna sauce.;vitello tonnato;trattoria
Carne cruda all’albese;Piedmontese raw beef;table;Carne bovina cruda, tagliata o battuta.|Raw beef, sliced or finely chopped.;carne cruda albese;trattoria
Agnolotti del plin;Agnolotti del plin;table;Pasta ripiena chiusa con il pizzicotto.|Filled pasta closed with a small pinch.;agnolotti plin;trattoria
Agnolotti al sugo d’arrosto;Agnolotti with roast sauce;table;Pasta ripiena e fondo dell’arrosto.|Filled pasta with roasting juices.;agnolotti;trattoria
Tajarin;Tajarin;table;Pasta all’uovo sottile della tradizione piemontese.|Fine egg pasta from Piedmont.;tajarin;trattoria
Gnocchi al Castelmagno;Castelmagno gnocchi;table;Gnocchi con il formaggio delle valli cuneesi.|Gnocchi with cheese from the Cuneo valleys.;gnocchi castelmagno;trattoria
Bagna cauda;Bagna cauda;table;Salsa calda di aglio e acciughe per le verdure.|A warm garlic and anchovy dip for vegetables.;bagna cauda;piola
Bagnet verd;Bagnet verd;table;Salsa verde piemontese a base di prezzemolo.|Piedmontese parsley-based green sauce.;bagnet verd;piola
Acciughe al verde;Anchovies in green sauce;table;Acciughe con il bagnetto della tradizione.|Anchovies with traditional green sauce.;acciughe verde;piola
Insalata russa;Russian salad;table;Un antipasto molto presente nelle piole torinesi.|A familiar starter in Turin’s piole.;insalata russa;trattoria
Peperoni con bagna cauda;Peppers with bagna cauda;table;Peperoni e salsa di acciughe.|Peppers with an anchovy sauce.;peperoni bagna cauda;piola
Capunet;Capunet;table;Involtini di verza con ripieno di carne.|Cabbage rolls with a meat filling.;capunet;trattoria
Brasato;Piedmontese braised beef;table;Carne cotta lentamente nel vino rosso.|Beef slowly braised in red wine.;brasato barolo;trattoria
Bollito misto piemontese;Piedmontese boiled meats;table;Tagli di carne e salse della tradizione regionale.|Cuts of meat with regional sauces.;bollito piemontese;piola
Fritto misto piemontese;Piedmontese mixed fry;table;Il fritto regionale mescola dolce e salato.|A regional fry combining sweet and savoury.;fritto misto piemontese;piola
Finanziera;Finanziera;table;Intingolo di frattaglie della cucina piemontese.|An offal stew from Piedmontese cooking.;finanziera;piola
Grissini;Grissini;street;I bastoncini di pane legati alla storia torinese.|Breadsticks closely tied to Turin’s history.;grissini torino;market
Tomini;Tomini;market;Piccoli formaggi, anche con condimenti aromatici.|Small cheeses, sometimes with aromatic dressings.;tomini;market
Toma piemontese;Piedmontese toma;market;Formaggio regionale da confrontare per stagionatura.|Regional cheese to compare at different ages.;toma piemontese;market
Castelmagno;Castelmagno;market;Formaggio delle montagne cuneesi, da assaggiare in gastronomia.|A Cuneo mountain cheese to try at a deli.;castelmagno cheese;market
Robiola di Roccaverano;Roccaverano cheese;market;Formaggio caprino della tradizione astigiana.|Goat’s cheese from the Asti area.;robiola roccaverano;market
Gianduiotti;Gianduiotti;dessert;Cioccolato e nocciola, simbolo torinese.|Chocolate and hazelnut, a symbol of Turin.;gianduiotti;cioccolato
Cremini;Cremini;dessert;Cioccolatini a strati di gianduia.|Layered gianduja chocolates.;cremino chocolate;cioccolato
Cri cri;Cri cri;dessert;Nocciola e cioccolato sotto una copertura di zucchero.|Hazelnut and chocolate under a sugar coating.;cri cri chocolate;cioccolato
Bicerin;Bicerin;dessert;Caffè, cioccolato e crema di latte nel bicchiere.|Coffee, chocolate and cream in a glass.;bicerin;bicerin
Bonet;Bonet;dessert;Budino piemontese con cacao e amaretti.|Piedmontese pudding with cocoa and amaretti.;bonet;trattoria
Zabaione;Zabaione;dessert;Crema di uova e vino dolce, anche al cucchiaio.|Egg and sweet-wine cream served as a dessert.;zabaione;bicerin
Panna cotta;Panna cotta;dessert;Dessert di panna della tradizione piemontese.|A cream dessert from the Piedmontese tradition.;panna cotta;trattoria
Torta di nocciole;Hazelnut cake;dessert;Dalle Langhe, una torta centrata sulla nocciola.|From the Langhe, a cake built around hazelnuts.;torta nocciole;dolce
Baci di dama;Baci di dama;dessert;Biscotti piemontesi accoppiati con cioccolato.|Piedmontese sandwich biscuits with chocolate.;baci dama;dolce`,
firenze:`Bistecca alla fiorentina;Florentine steak;table;Taglio con osso da condividere; chiedi il peso.|A bone-in cut to share; ask the weight.;bistecca fiorentina;trattoria
Lampredotto;Lampredotto;street;Il panino del trippaio, con salsa verde.|A tripe-stall sandwich with green sauce.;lampredotto;lampredotto
Trippa alla fiorentina;Florentine tripe;table;Trippa al pomodoro con formaggio.|Tripe with tomato and cheese.;trippa fiorentina;trattoria
Ribollita;Ribollita;table;Pane, fagioli e cavolo nero.|Bread, beans and Tuscan kale.;ribollita;trattoria
Pappa al pomodoro;Pappa al pomodoro;table;Pane e pomodoro nella cucina di recupero.|Bread and tomato in a classic leftover dish.;pappa pomodoro;trattoria
Panzanella;Panzanella;table;Pane e verdure, soprattutto in estate.|Bread and vegetables, especially in summer.;panzanella;trattoria
Crostini di fegatini;Chicken liver crostini;table;Pane tostato con crema di fegatini.|Toasted bread with chicken liver spread.;crostini fegatini;trattoria
Peposo;Peposo;table;Da Impruneta: manzo, pepe e vino.|From Impruneta: beef, pepper and wine.;peposo;trattoria
Fagioli all’uccelletto;Tuscan tomato beans;table;Fagioli al pomodoro con salvia.|Beans with tomato and sage.;fagioli uccelletto;trattoria
Fagioli al fiasco;Fiasco-cooked beans;table;La cottura lenta dei fagioli toscani.|Slow-cooked Tuscan beans.;fagioli fiasco;trattoria
Schiacciata salata;Savoury schiacciata;street;Pane basso all’olio, semplice o ripieno.|Flat olive-oil bread, plain or filled.;schiacciata toscana;forno
Finocchiona;Finocchiona;market;Salume toscano profumato al finocchio.|Tuscan salami scented with fennel.;finocchiona;market
Prosciutto toscano;Tuscan cured ham;market;Prosciutto regionale, sapido e aromatico.|A savoury, aromatic regional ham.;prosciutto toscano;market
Pecorino toscano;Tuscan pecorino;market;Formaggio ovino, fresco o stagionato.|Sheep’s cheese, fresh or aged.;pecorino toscano;market
Lardo di Colonnata;Colonnata lardo;market;Dalle Alpi Apuane: salume da assaggiare sul pane.|From the Apuan Alps: cured pork fat to try on bread.;lardo colonnata;market
Pane toscano;Tuscan bread;market;Pane senza sale, base di molte ricette locali.|Unsalted bread used in many local recipes.;pane toscano;market
Pappardelle al cinghiale;Pappardelle with wild boar;table;Pasta larga e ragù della tradizione toscana.|Wide pasta with a Tuscan wild boar ragù.;pappardelle cinghiale;trattoria
Tagliata;Tagliata;table;Carne alla griglia servita a fette.|Grilled beef served in slices.;tagliata manzo;trattoria
Pollo alla cacciatora;Hunter-style chicken;table;Pollo in umido con aromi.|Chicken simmered with herbs.;pollo cacciatora;trattoria
Cacciucco;Cacciucco;table;Specialità livornese, proposta anche nelle trattorie toscane.|A Livorno seafood speciality also found in Tuscan trattorias.;cacciucco;trattoria
Schiacciata alla fiorentina;Florentine carnival cake;dessert;Dolce soffice del Carnevale fiorentino.|A soft cake for Florence’s Carnival.;schiacciata fiorentina;dolce
Schiacciata con l’uva;Grape schiacciata;dessert;Dolce da vendemmia, tipicamente autunnale.|A harvest sweet, typically eaten in autumn.;schiacciata uva;dolce
Cantucci;Cantucci;dessert;Biscotti toscani alle mandorle.|Tuscan almond biscuits.;cantucci;dolce
Castagnaccio;Castagnaccio;dessert;Farina di castagne, olio e frutta secca.|Chestnut flour, olive oil and nuts.;castagnaccio;dolce
Zuccotto;Zuccotto;dessert;Dolce a cupola di pan di Spagna e crema.|A dome-shaped sponge and cream dessert.;zuccotto;dolce
Budino di riso;Rice pastry;dessert;Guscio di frolla con ripieno di riso.|Shortcrust pastry with a rice filling.;budino riso toscano;dolce
Brutti ma buoni;Brutti ma buoni;dessert;Biscotti irregolari con frutta secca.|Rustic biscuits made with nuts.;brutti buoni;dolce
Ricciarelli;Ricciarelli;dessert;Da Siena: dolci morbidi alle mandorle.|From Siena: soft almond sweets.;ricciarelli;dolce
Panforte;Panforte;dessert;Da Siena: frutta secca, canditi e spezie.|From Siena: nuts, candied fruit and spices.;panforte;dolce
Brigidini;Brigidini;dessert;Cialde all’anice originarie di Lamporecchio.|Anise wafers from Lamporecchio.;brigidini;market`,
cagliari:`Fregula;Fregula;market;Pasta sarda in piccoli grani: cercala anche cucinata con arselle.|Small Sardinian pasta grains: also look for the cooked version with clams.;fregula arselle;trattoria
Malloreddus alla campidanese;Campidano malloreddus;table;Gnocchetti sardi con sugo di salsiccia.|Sardinian pasta with sausage sauce.;malloreddus campidanese;sarda
Culurgiones;Culurgiones;table;Ravioli d’Ogliastra con la chiusura a spiga.|Ogliastra filled pasta with a wheat-ear closure.;culurgiones;trattoria
Burrida cagliaritana;Cagliari burrida;table;Preparazione marinata con noci e aceto.|A marinated seafood preparation with walnuts and vinegar.;burrida cagliari;sarda
Cassola;Cassola fish soup;table;La zuppa di pesce della tradizione cagliaritana.|Cagliari’s traditional fish soup.;cassola pesce cagliari;sarda
Orziadas;Fried sea anemones;table;Anemoni di mare fritti: disponibilità variabile.|Fried sea anemones; availability varies.;orziadas;sarda
Spaghetti con bottarga;Spaghetti with bottarga;table;Pasta con uova di muggine essiccate.|Pasta with dried grey mullet roe.;spaghetti bottarga;trattoria
Bottarga di muggine;Grey mullet bottarga;market;Da provare a lamelle, chiedendo la provenienza.|Try thin slices and ask about origin.;bottarga muggine;market
Pizzetta sfoglia;Cagliari puff pastry pizzetta;street;Doppia sfoglia, pomodoro e cappero.|Two layers of puff pastry with tomato and caper.;pizzetta sfoglia;dolce
Panada;Panada;street;Specialità di Assemini: involucro di pasta ripieno.|From Assemini: a filled pastry shell.;panada sardegna;market
Mazzamurru;Mazzamurru;table;Pane raffermo, pomodoro e formaggio.|Stale bread with tomato and cheese.;mazzamurru;sarda
Porceddu;Sardinian roast suckling pig;table;Maialino arrosto della tradizione regionale.|Roast suckling pig from the regional tradition.;porceddu;sarda
Pecora in cappotto;Pecora in cappotto;table;Pecora lessata con patate e verdure.|Mutton simmered with potatoes and vegetables.;pecora cappotto;sarda
Sa cordula;Sa cordula;table;Frattaglie intrecciate della cucina pastorale sarda.|Braided offal from Sardinian pastoral cooking.;cordula sardegna;sarda
Pane carasau;Pane carasau;market;Sfoglia sottile e croccante della Sardegna.|Thin, crisp Sardinian flatbread.;pane carasau;market
Pane guttiau;Pane guttiau;market;Carasau condito con olio e sale.|Carasau dressed with olive oil and salt.;pane guttiau;market
Pistoccu;Pistoccu;market;Pane biscottato della tradizione sarda.|Twice-baked bread from Sardinian tradition.;pistoccu;market
Pecorino sardo;Pecorino sardo;market;Formaggio ovino da confrontare dolce e maturo.|Sheep’s cheese to compare young and mature.;pecorino sardo;market
Fiore sardo;Fiore sardo;market;Formaggio ovino della tradizione pastorale.|Sheep’s cheese from the pastoral tradition.;fiore sardo;market
Ricotta mustia;Ricotta mustia;market;Ricotta salata e affumicata sarda.|Sardinian salted and smoked ricotta.;ricotta mustia;market
Salsiccia sarda;Sardinian sausage;market;Salume stagionato, con aromi diversi secondo il produttore.|Cured sausage, seasoned differently by each producer.;salsiccia sarda;market
Seada;Seada;dessert;Sfoglia fritta con formaggio e miele.|Fried pastry with cheese and honey.;seadas;trattoria
Pardulas;Pardulas;dessert;Cestini di pasta con ricotta e zafferano.|Pastry baskets with ricotta and saffron.;pardulas;dolce
Pabassinas;Pabassinas;dessert;Biscotti con uvetta e frutta secca.|Biscuits with raisins and nuts.;papassini;dolce
Amaretti sardi;Sardinian amaretti;dessert;Dolci di mandorle della tradizione isolana.|Almond sweets from the island tradition.;amaretti sardi;dolce
Gueffus;Gueffus;dessert;Piccoli dolci sardi di mandorle e zucchero.|Small Sardinian almond and sugar sweets.;gueffus;dolce
Mustazzolus;Mustazzolus;dessert;Dolci speziati della tradizione di Oristano.|Spiced sweets from the Oristano tradition.;mustazzolus;dolce
Torrone sardo;Sardinian torrone;dessert;Miele e frutta secca, anche dalle botteghe di Tonara.|Honey and nuts, including the Tonara tradition.;torrone sardo;market
Sebadas al miele;Honey seadas;dessert;Chiedi quale miele accompagna il formaggio.|Ask which honey accompanies the cheese.;sebadas;trattoria
Carapigna;Carapigna;dessert;Sorbetto sardo al limone, dalla tradizione di Aritzo.|Sardinian lemon sorbet from the Aritzo tradition.;carapigna;trattoria
Pane frattau;Pane frattau;table;Dalla Barbagia: carasau, pomodoro, pecorino e uovo.|From Barbagia: carasau, tomato, pecorino and egg.;pane frattau;sarda
Zuppa gallurese;Gallura bread soup;table;Dalla Gallura: strati di pane, brodo e formaggio.|From Gallura: layers of bread, stock and cheese.;zuppa gallurese;sarda
Coccoi;Coccoi bread;market;Pane sardo di semola dalle forme decorate.|Decoratively shaped Sardinian semolina bread.;coccoi bread;market
Zippulas;Sardinian zippulas;dessert;Le frittelle lunghe del Carnevale sardo.|The long fried sweets of Sardinian Carnival.;zippulas;dolce
Mirto;Mirto liqueur;market;Liquore sardo alle bacche di mirto, alcolico.|An alcoholic Sardinian myrtle-berry liqueur.;mirto liqueur;market
Carciofo spinoso sardo;Sardinian spiny artichoke;market;Ortaggio del territorio: scegli la stagione e chiedi la provenienza.|Regional produce: choose the right season and ask its origin.;carciofo spinoso sardo;market`,
venezia:`Sarde in saor;Sarde in saor;table;Sardine con cipolle in agrodolce, uvetta e pinoli.|Sardines with sweet-and-sour onions, raisins and pine nuts.;sarde saor;trattoria
Baccalà mantecato;Whipped stockfish;street;Stoccafisso lavorato in crema, spesso su polenta.|Stockfish whipped into a spread, often on polenta.;baccalà mantecato;trattoria
Bigoli in salsa;Bigoli in salsa;table;Pasta con cipolle e pesce sotto sale.|Pasta with onions and salt-cured fish.;bigoli salsa;trattoria
Seppie in nero;Cuttlefish in ink;table;Seppie nel loro nero, con polenta.|Cuttlefish cooked in ink with polenta.;seppie nero;trattoria
Spaghetti al nero di seppia;Squid ink spaghetti;table;Un primo dal colore e sapore lagunare.|A pasta dish with the flavour and colour of the lagoon.;spaghetti nero seppia;trattoria
Fegato alla veneziana;Venetian liver;table;Fegato e cipolle cotti insieme.|Liver cooked with onions.;fegato veneziana;trattoria
Risi e bisi;Risi e bisi;table;Riso e piselli, legati alla primavera.|Rice and peas, associated with spring.;risi bisi;laguna
Risotto di gò;Goby risotto;table;Risotto con il piccolo pesce della laguna.|Risotto made with a small lagoon fish.;risotto go venezia;laguna
Moéche;Soft-shell crabs;table;Granchi in muta: specialità strettamente stagionale.|Moulting crabs, a strictly seasonal speciality.;moeche;laguna
Schie con polenta;Lagoon shrimp with polenta;table;Piccoli gamberi lagunari su polenta.|Small lagoon shrimp served over polenta.;schie polenta;laguna
Castradina;Castradina;table;Montone e verza, legati alla festa della Salute.|Mutton and cabbage for the Salute festival.;castradina;laguna
Bisato;Lagoon eel;table;Anguilla nelle preparazioni della cucina lagunare.|Eel in traditional lagoon preparations.;bisato anguilla;laguna
Frittura di pesce;Mixed fried seafood;table;Chiedi il pescato disponibile e la composizione.|Ask about the day’s catch and what is included.;fritto misto pesce venezia;trattoria
Spaghetti alla busara;Busara spaghetti;table;Pasta con crostacei e pomodoro, tradizione adriatica.|Pasta with shellfish and tomato, an Adriatic tradition.;spaghetti busara;trattoria
Polenta bianca;White polenta;table;Accompagna molte preparazioni di pesce veneziane.|An accompaniment to many Venetian fish dishes.;polenta bianca;trattoria
Cicchetti;Cicchetti;street;Assaggi da banco: guarda cosa è pronto quel giorno.|Counter snacks: choose from the day’s selection.;cicchetti venezia;trattoria
Tramezzini veneziani;Venetian tramezzini;street;Panini morbidi dalla farcitura abbondante.|Soft sandwiches with generous fillings.;tramezzini venezia;bar
Mozzarella in carrozza;Mozzarella in carrozza;street;Pane ripieno di mozzarella e fritto.|Bread filled with mozzarella and fried.;mozzarella carrozza;trattoria
Carciofi di Sant’Erasmo;Sant’Erasmo artichokes;market;Ortaggi lagunari, da cercare nella stagione giusta.|Lagoon-grown artichokes, available in season.;carciofo sant erasmo;market
Radicchio tardivo;Late Treviso radicchio;market;Dal territorio veneto, da assaggiare in stagione.|From Veneto, best explored in season.;radicchio tardivo;market
Frittelle veneziane;Venetian fritole;dessert;Il dolce fritto del Carnevale.|The fried sweet of Carnival.;fritole veneziane;dolce
Galani;Galani;dessert;Sottili sfoglie dolci fritte di Carnevale.|Thin fried Carnival pastries.;galani;dolce
Baicoli;Baicoli;dessert;Biscotti asciutti da accompagnare al caffè.|Dry biscuits to accompany coffee.;baicoli;dolce
Zaeti;Zaeti;dessert;Biscotti con farina di mais e uvetta.|Biscuits with maize flour and raisins.;zaeti;dolce
Bussolai di Burano;Burano bussolai;dessert;Biscotti al burro della tradizione dell’isola.|Butter biscuits from Burano’s island tradition.;bussolai burano;dolce
Essi buranelli;Burano essi;dessert;La variante a S dei biscotti buranelli.|The S-shaped version of Burano biscuits.;essi buranelli;dolce
Fave dei morti;Fave dei morti;dessert;Dolcetti di mandorla legati a novembre.|Small almond sweets associated with November.;fave morti venezia;dolce
Fugassa veneziana;Venetian fugassa;dessert;Lievitato dolce della tradizione veneta.|A sweet bread from the Veneto tradition.;focaccia veneziana dolce;dolce
Tiramisù;Tiramisù;dessert;Dolce del Veneto, diffuso anche nei ristoranti veneziani.|A Veneto dessert, also found in Venetian restaurants.;tiramisu;trattoria
Crema fritta;Fried custard;dessert;Crema compatta impanata e fritta.|Set custard, breaded and fried.;crema fritta;trattoria`
};
module.exports=Object.fromEntries(Object.entries(rows).map(([city,text])=>[city,text.split('\n').map((line,i)=>{const parts=line.split(';'),venue=parts.pop(),query=parts.pop(),[name,en,category,...description]=parts;return{id:city+'-food-'+String(i+1).padStart(2,'0'),name:name+'|'+en,category,description:description.join(';'),query,venue};}).filter(item=>item.id!=='cagliari-food-29')]));
