// Dati aziendali ottimizzati per ricerca AI - Struttura unificata
export const companyData = {
  // ALLARMI - Struttura unificata
  alarms: [
    // ACLI Alarms
    {
      id: "acli_pisa",
      type: "acli",
      name: "ACLI Pisa",
      location: "Pisa",
      code: "Inserire:67546 / Disinserire:675461",
      searchTerms: ["acli", "pisa", "acli pisa"]
    },
    {
      id: "acli_cascina",
      type: "acli",
      name: "ACLI Cascina",
      location: "Cascina",
      code: "Inserire: 2 volte ON / Disinserire: 113355",
      searchTerms: ["acli", "cascina", "acli cascina"]
    },
    {
      id: "acli_navacchio",
      type: "acli",
      name: "ACLI Navacchio",
      location: "Navacchio",
      code: "No allarme",
      searchTerms: ["acli", "navacchio", "acli navacchio"]
    },
    {
      id: "acli_cisanello",
      type: "acli",
      name: "ACLI Cisanello",
      location: "Cisanello",
      code: "Inserire: 12302 🔓 / Disinserire: 12302 🔒",
      searchTerms: ["acli", "cisanello", "acli cisanello"]
    },
    {
      id: "acli_ghezzano",
      type: "acli",
      name: "ACLI Ghezzano",
      location: "Ghezzano",
      code: "No allarme",
      searchTerms: ["acli", "ghezzano", "acli ghezzano"]
    },
    
    // General Alarms
    {
      id: "keybox_artigea",
      type: "general",
      name: "Codice KeyBox Artigea",
      code: "0224",
      searchTerms: ["keybox", "artigea", "codice keybox artigea", "allarme artigea"]
    },
    {
      id: "aforisma",
      type: "general",
      name: "Aforisma",
      code: "OFF:3623* ON:*1",
      searchTerms: ["aforisma"]
    },
    {
      id: "dima",
      type: "general",
      name: "Dima",
      code: "2807*",
      searchTerms: ["dima"]
    },
    {
      id: "q_designe",
      type: "general",
      name: "Q-Designe (ESA)",
      code: "Off: 98753 🔓- On: 98753 🔒",
      searchTerms: ["q-designe", "esa", "q designe"]
    },
    {
      id: "spazio_benessere_novella",
      type: "general",
      name: "SPAZIO BENESSERE NOVELLA",
      code: "OFF: F1 172627 OK - ON:F2 172627 OK",
      searchTerms: ["spazio benessere", "novella", "spazio benessere novella"]
    },
    {
      id: "spazio_benessere_cascina",
      type: "general",
      name: "SPAZIO BENESSERE CASCINA",
      code: "OFF: F1 172627 OK - ON:F2 172627 OK",
      searchTerms: ["spazio benessere", "cascina", "spazio benessere cascina"]
    },
    {
      id: "teseco",
      type: "general",
      name: "TESECO",
      code: "2580",
      searchTerms: ["teseco"]
    },
    {
      id: "ufficio_start",
      type: "general",
      name: "UFFICIO START",
      code: "250109 ON/OFF",
      searchTerms: ["ufficio start", "start"]
    },
    {
      id: "discoteca",
      type: "general",
      name: "DISCOTECA",
      code: "02082 no",
      searchTerms: ["discoteca"]
    },
    {
      id: "agenzia_viaggi",
      type: "general",
      name: "AGENZIA VIAGGI",
      code: "776211",
      searchTerms: ["agenzia viaggi", "viaggi"]
    },
    {
      id: "bnb_1",
      type: "general",
      name: "B&B 1",
      code: "0225E",
      searchTerms: ["b&b 1", "bnb 1", "bed and breakfast 1"]
    },
    {
      id: "bnb_2",
      type: "general",
      name: "B&B 2",
      code: "0325E",
      searchTerms: ["b&b 2", "bnb 2", "bed and breakfast 2"]
    },
    {
      id: "bnb_3",
      type: "general",
      name: "B&B 3",
      code: "0824E",
      searchTerms: ["b&b 3", "bnb 3", "bed and breakfast 3"]
    }
  ],

  // APPARTAMENTI - Struttura unificata e completa
  apartments: [
    // Sezione Irene
    {
      id: "le_mura",
      name: "Le Mura",
      address: "Via Cardinale Maffi 36, Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "9953",
      keyboxDetails: "KeyBox 9953, KeyBox Posta: 000",
      composition: ["2 Letti Matrimoniali", "1 Bagno", "1 Cucina"],
      notes: ["KeyBox 9953", "KeyBox Posta: 000", "Nome: guest", "Password: Maffi36"],
      map: "https://www.google.com/maps?q=Via+Cardinale+Maffi+36,+Pisa",
      section: "irene",
      searchTerms: ["le mura", "lemura", "mura", "maffi", "cardinale maffi"]
    },
    {
      id: "torre",
      name: "Torre",
      address: "Via Risorgimento 10, Pisa",
      guests: 5,
      hours: 1.5,
      minutes: 90,
      keybox: "000",
      keyboxDetails: "KeyBox cassetta postale: 000",
      composition: ["2 Letti Matrimoniali", "1 Letto Singolo", "2 Bagni", "1 Cucina"],
      notes: ["KeyBox cassetta postale: 000"],
      map: "https://www.google.com/maps/place/Via+Risorgimento,+10,+56126+Pisa+PI/@43.7180123,10.3916741,17z/data=!3m1!4b1!4m6!3m5!1s0x12d5910aa5c87a69:0x5e9870a1bd95ec48!8m2!3d43.7180123!4d10.394249!16s%2Fg%2F11c5q84cys?entry=ttu",
      section: "irene",
      searchTerms: ["torre", "risorgimento"]
    },
    {
      id: "casa_di_rosa",
      name: "La Casa di Rosa",
      address: "Via Mazzini 35, Migliarino, Pisa",
      guests: 4,
      hours: 1.5,
      minutes: 90,
      keybox: "19511 / 1951",
      keyboxDetails: "KeyBox cancello 19511, KeyBox porta 1951",
      composition: ["1 Letto Matrimoniale", "2 Letti Singoli", "1 Bagno", "1 Cucina", "Spazio esterno"],
      notes: ["KeyBox cancello 19511", "KeyBox porta 1951"],
      map: "https://www.google.com/maps/place/Via+Mazzini,+35,+56019+Migliarino+PI/@43.7662855,10.3390043,17z/data=!3m1!4b1!4m9!1m2!2m1!1sVia+Mazzini+35,+Migliarino,+Pisa!3m5!1s0x12d5974e83300571:0xfebac7ef21a55649!8m2!3d43.7662856!4d10.3438752!15sCiBWaWEgTWF6emluaSAzNSwgTWlnbGlhcmlubywgUGlzYZIBEGdlb2NvZGVkX2FkZHJlc3PgAQA?entry=ttu",
      section: "irene",
      searchTerms: ["casa di rosa", "casadirosa", "rosa", "mazzini", "migliarino"]
    },
    {
      id: "casa_lia",
      name: "Casa Lia",
      address: "Via Santa Caterina n.6, Pisa",
      guests: 4,
      hours: 1.5,
      minutes: 90,
      keybox: "1110",
      keyboxDetails: "KeyBox sul cancello di ferro:1110",
      composition: ["1 Letto Matrimoniale", "1 Divano letto matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Codice apertura portone: 111067#", "KeyBox sul cancello di ferro:1110", "Ultimo Piano"],
      map: "https://maps.app.goo.gl/KHWLnAwiLNiRubgWA",
      section: "irene",
      searchTerms: ["casa lia", "casalia", "lia", "santa caterina"]
    },

    // Sezione Cerrano
    {
      id: "tuscany_house",
      name: "Tuscany House",
      address: "Via del Tondo 3, Pisa, Pisa",
      guests: 5,
      hours: 2,
      minutes: 120,
      keybox: "5-5-6-6",
      keyboxDetails: "KeyBox: 5-5-6-6",
      composition: ["1 Letto Matrimoniale", "1 Letto Singolo", "1 Divano Letto Matrimoniale", "2 Bagni (uno senza doccia)", "1 Cucina"],
      notes: ["METTERE BIDET", "KeyBox: 5-5-6-6", "Se trovate soldi o contratti, lasciare tutti nello stanzone dove ci sono i cambi biancheria"],
      map: "https://www.google.com/maps/dir//Via+del+Tondo,+3,+56124+Pisa+PI/@43.701052,10.4301216,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x12d591fb907f2cb9:0xab9ae8f91d8a4c55!2m2!1d10.4326965!2d43.701052!3e0?entry=ttu",
      section: "cerrano",
      searchTerms: ["tuscany", "tuscany house", "tondo"]
    },
    {
      id: "new_house",
      name: "New House",
      address: "Via Francesco Pardi 16, Pisa, Pisa",
      guests: 4,
      hours: 1.5,
      minutes: 90,
      keybox: "1-9-7-3",
      keyboxDetails: "Keybox: 1-9-7-3",
      composition: ["2 Letti Matrimoniali", "1 Bagno", "1 Cucina"],
      notes: ["METTERE BIDET, L'APPARTAMENTO È AL SECONDO PIANO", "Keybox: 1-9-7-3"],
      map: "https://goo.gl/maps/ZPmfF4LNYk3zRMUR7",
      section: "cerrano",
      searchTerms: ["new house", "newhouse", "pardi", "francesco pardi"]
    },
    {
      id: "designer_flat",
      name: "Designer Flat",
      address: "Via Italo bargagna 38, Pisa, Pisa",
      guests: 4,
      hours: 1.5,
      minutes: 90,
      keybox: "8-8-8-7",
      keyboxDetails: "Keybox: 8-8-8-7",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["METTERE BIDET, L'APPARTAMENTO È AL SECONDO PIANO INTERNO 10", "Keybox: 8-8-8-7", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/oRMVWxB117Un5WsK6",
      section: "cerrano",
      searchTerms: ["designer flat", "designerflat", "bargagna", "italo bargagna"]
    },
    {
      id: "homiday_elegant",
      name: "Homiday Elegant",
      address: "Via Andrea Vesalio, 8",
      guests: 7,
      hours: 2,
      minutes: 120,
      keybox: "2-1-2-1",
      keyboxDetails: "Keybox: 2-1-2-1",
      composition: ["3 Letti Matrimoniali", "2 Bagni", "1 Cucina"],
      notes: ["Terzo piano interno 8 Campanello 'Lista'", "Mettere Bidet", "Keybox: 2-1-2-1", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/MbZimuDkcq1vobBJ6",
      section: "cerrano",
      searchTerms: ["homiday elegant", "elegant", "vesalio", "andrea vesalio"]
    },
    {
      id: "apt_ospedale",
      name: "Apt Ospedale",
      address: "Via Luigi Pera, 14",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "8-0-8-0",
      keyboxDetails: "Keybox: 8 - 0 - 8 - 0",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Keybox: 8 - 0 - 8 - 0"],
      map: "https://www.google.it/maps/place/Via+Luigi+Pera,+14,+56124+Pisa+PI/@43.7079896,10.4362853,17z/data=!3m1!4b1!4m6!3m5!1s0x12d591e21adbf6d5:0x3ce5c8155fb7b30f!8m2!3d43.7079858!4d10.4388602!16s%2Fg%2F11c281k30j?entry=ttu",
      section: "cerrano",
      searchTerms: ["apt ospedale", "ospedale", "luigi pera", "pera"]
    },
    {
      id: "new_apt",
      name: "New Apt",
      address: "Via taddei, 15",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "2-0-0-4",
      keyboxDetails: "Keybox: 2-0-0-4",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Piano Secondo Interno 9", "Keybox: 2-0-0-4", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/DQ69W7NAT3r5Dq439",
      section: "cerrano",
      searchTerms: ["new apt", "newapt", "taddei"]
    },
    {
      id: "savana",
      name: "Savana",
      address: "Via F.Cilea, 18, Pontasserchio",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "1-1-2-2",
      keyboxDetails: "Keybox: 1-1-2-2",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Interno 1", "Keybox: 1-1-2-2"],
      map: "https://maps.app.goo.gl/F2ZG1inS1oJ4gmyN9",
      section: "cerrano",
      searchTerms: ["savana", "pontasserchio", "cilea"]
    },
    {
      id: "rinoceronte",
      name: "Rinoceronte",
      address: "Via F.Cilea, 18, Pontasserchio",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "2-2-3-3",
      keyboxDetails: "Keybox: 2-2-3-3",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Interno 2", "Keybox: 2-2-3-3"],
      map: "https://maps.app.goo.gl/F2ZG1inS1oJ4gmyN9",
      section: "cerrano",
      searchTerms: ["rinoceronte", "pontasserchio", "cilea"]
    },
    {
      id: "giraffa",
      name: "Giraffa",
      address: "Via F.Cilea, 18, Pontasserchio",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "3-3-4-4",
      keyboxDetails: "Keybox: 3-3-4-4",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Interno 3", "Keybox: 3-3-4-4"],
      map: "https://maps.app.goo.gl/F2ZG1inS1oJ4gmyN9",
      section: "cerrano",
      searchTerms: ["giraffa", "pontasserchio", "cilea"]
    },
    {
      id: "charme_and_relax",
      name: "Charme And Relax",
      address: "vicolo del Poschi 15, Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "2020",
      keyboxDetails: "Keybox:2020",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Keybox:2020", "Codice Portone:1 5 1 5 #", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/xU2jgT9ZtodDCaSM6",
      section: "cerrano",
      searchTerms: ["charme and relax", "charm", "relax", "poschi"]
    },
    {
      id: "nuovo_grazioso",
      name: "Nuovo&Grazioso",
      address: "Via Paolo VI 12,Cisanello",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "595",
      keyboxDetails: "Keybox:Cassetta postale con KeyBox 595",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Keybox:Cassetta postale con KeyBox 595", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/HfxGhaus8yGyTuDFA",
      section: "cerrano",
      searchTerms: ["nuovo grazioso", "nuovograzioso", "paolo vi", "cisanello"]
    },
    {
      id: "via_campania_2",
      name: "Via Campania 2",
      address: "Via Campaniaa 2, Cisanello",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "9-8-7-6",
      keyboxDetails: "Keybox:9-8-7-6 (Cassettapostale con etichetta rossa)",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Piano Primo", "Keybox:9-8-7-6 (Cassettapostale con etichetta rossa)"],
      map: "https://maps.app.goo.gl/W1GkNcb46WKJkdys8",
      section: "cerrano",
      searchTerms: ["campania", "campania2", "cisanello"]
    },
    {
      id: "cozy_house",
      name: "Cozy House",
      address: "Via Taddei 1, Cisanello",
      guests: 3,
      hours: 1,
      minutes: 60,
      keybox: "7-8-7-8",
      keyboxDetails: "Keybox: Cassetta postale :'Salinari' 7-8-7-8",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Singolo", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Keybox: Cassetta postale :'Salinari' 7-8-7-8", "2 piano , INT. 8"],
      map: "https://maps.app.goo.gl/iYX7rNfKd9PRQ7xG6",
      section: "cerrano",
      searchTerms: ["cozy house", "cozyhouse", "taddei", "cisanello", "salinari"]
    },
    {
      id: "sweet_home",
      name: "Sweet Home",
      address: "vicolo del poschi 15, Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "2-5-0-5",
      keyboxDetails: "Keybox:2 - 5 - 0 - 5",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["Mettere Bidet", "Keybox:2 - 5 - 0 - 5", "piano 1, INT.4", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/xU2jgT9ZtodDCaSM6",
      section: "cerrano",
      searchTerms: ["sweet home", "sweethome", "poschi"]
    },
    {
      id: "flat_moderno",
      name: "Flat Moderno",
      address: "Via Italo bargagna 38, Pisa, Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "1711",
      keyboxDetails: "Keybox: 1711",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Matrimoniale", "1 Bagno", "1 Cucina"],
      notes: ["METTERE BIDET", "L'APPARTAMENTO È AL QUARTO PIANO INTERNO 23", "Keybox: 1711", "METTERE ACQUA"],
      map: "https://maps.app.goo.gl/oRMVWxB117Un5WsK6",
      section: "cerrano",
      searchTerms: ["flat moderno", "flatmoderno", "bargagna", "italo bargagna"]
    },
    {
      id: "girasole_3in1",
      name: "Girasole",
      address: "Via Di Mezzana 11, Pisa, Pisa",
      guests: 3,
      hours: 0.5,
      minutes: 30,
      keybox: "0-0-1-1",
      keyboxDetails: "Keybox: 0-0-1-1",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto Singolo", "1 Bagno"],
      notes: ["METTERE BIDET", "Sono 3 camere con bagno privato in un unico appartamento", "Edificio 11, suonare a CATANIA", "Se trovate soldi o contratti, lasciare tutto in garage"],
      map: "https://goo.gl/maps/TW6R1tfcMebjL81DA",
      section: "cerrano",
      searchTerms: ["girasole", "3in1", "mezzana", "catania"]
    },
    {
      id: "gelsomino_3in1",
      name: "Gelsomino",
      address: "Via Di Mezzana 11, Pisa, Pisa",
      guests: 2,
      hours: 0.5,
      minutes: 30,
      keybox: "3-3-3-4",
      keyboxDetails: "Keybox: 3-3-3-4",
      composition: ["1 Letto Matrimoniale che diventa singolo", "1 Bagno"],
      notes: ["METTERE BIDET", "Sono 3 camere con bagno privato in un unico appartamento", "Edificio 11, suonare a CATANIA", "Se trovate soldi o contratti, lasciare tutto in garage"],
      map: "https://goo.gl/maps/TW6R1tfcMebjL81DA",
      section: "cerrano",
      searchTerms: ["gelsomino", "3in1", "mezzana", "catania"]
    },
    {
      id: "mimosa_3in1",
      name: "Mimosa",
      address: "Via Di Mezzana 11, Pisa, Pisa",
      guests: 2,
      hours: 0.5,
      minutes: 30,
      keybox: "1-1-1-2",
      keyboxDetails: "Keybox: 1-1-1-2",
      composition: ["1 Letto Matrimoniale", "1 Bagno"],
      notes: ["METTERE BIDET", "Sono 3 camere con bagno privato in un unico appartamento", "Edificio 11, suonare a CATANIA", "Se trovate soldi o contratti, lasciare tutto in garage"],
      map: "https://goo.gl/maps/TW6R1tfcMebjL81DA",
      section: "cerrano",
      searchTerms: ["mimosa", "3in1", "mezzana", "catania"]
    },

    // Sezione Lorenza
    {
      id: "ranieri",
      name: "Ranieri",
      address: "Piazza Vittorio Locchi 5, Pisa",
      guests: 2,
      hours: 1,
      minutes: 60,
      keybox: "N/A",
      keyboxDetails: "Nessun keybox specificato",
      composition: ["1 Letto Matrimoniale", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti", "Piano Terra"],
      map: "https://maps.app.goo.gl/FAHcRrY2do67F2Ud9",
      section: "lorenza",
      searchTerms: ["ranieri", "locchi", "vittorio locchi"]
    },
    {
      id: "laura",
      name: "Laura",
      address: "via Risorgimento 10",
      guests: 2,
      hours: 1,
      minutes: 60,
      keybox: "N/A",
      keyboxDetails: "Nessun keybox specificato",
      composition: ["1 Letto Matrimoniale", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti"],
      map: "https://maps.app.goo.gl/CacThjjgy8VPJCjc7",
      section: "lorenza",
      searchTerms: ["laura", "risorgimento"]
    },
    {
      id: "kinzica",
      name: "Kinzica",
      address: "Via Bovio 9, Pisa",
      guests: 2,
      hours: 1,
      minutes: 60,
      keybox: "1995",
      keyboxDetails: "KeyBox: 1995",
      composition: ["1 Letto Matrimoniale", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti", "KeyBox: 1995"],
      map: "https://maps.app.goo.gl/zTRNQmcaFB361diX6",
      section: "lorenza",
      searchTerms: ["kinzica", "kinzika", "bovio"]
    },
    {
      id: "pampurio",
      name: "Pampurio",
      address: "Piazza del Pozzetto 7,Pisa",
      guests: 3,
      hours: 1,
      minutes: 60,
      keybox: "N/A",
      keyboxDetails: "Nessun keybox specificato",
      composition: ["1 Letto Matrimoniale", "1 Letto Singolo", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti"],
      map: "https://maps.app.goo.gl/C9AvkD98hGdh7Kxc7",
      section: "lorenza",
      searchTerms: ["pampurio", "pozzetto"]
    },
    {
      id: "pinuccio",
      name: "Pinuccio",
      address: "via dell'omodarme 43,Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "1995",
      keyboxDetails: "KeyBox: 1995",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti", "KeyBox: 1995"],
      map: "https://maps.app.goo.gl/Y7qaRWkZNbFEghNm9",
      section: "lorenza",
      searchTerms: ["pinuccio", "omodarme"]
    },
    {
      id: "ella",
      name: "Ella",
      address: "Via Omodeo 3,Pisa",
      guests: 4,
      hours: 1,
      minutes: 60,
      keybox: "1971",
      keyboxDetails: "KeyBox: 1971",
      composition: ["1 Letto Matrimoniale", "1 Divano Letto", "1 Bagni", "1 Cucina"],
      notes: ["se trovate soldi o chiavi, metteteli nei cassetti", "KeyBox: 1971"],
      map: "https://maps.app.goo.gl/1gLpnamEp5PU5eER8",
      section: "lorenza",
      searchTerms: ["ella", "omodeo"]
    },

    // Sezione Molino
    {
      id: "paola",
      name: "Paola",
      address: "località dogana del tiglio, 56032 Buti PI",
      guests: 2,
      hours: 1.5,
      minutes: 90,
      keybox: "2410e",
      keyboxDetails: "Codice cancello 2410e",
      composition: ["1 Letto Matrimoniale", "1 Bagni", "1 Cucina"],
      notes: ["La biancheria la trovata alla struttura", "Codice cancello 2410e"],
      map: "https://maps.app.goo.gl/bawvCXP6JoSvp9fGA",
      section: "molino",
      searchTerms: ["paola", "buti", "dogana del tiglio", "tiglio"]
    },
    {
      id: "sabina",
      name: "Sabina",
      address: "località dogana del tiglio, 56032 Buti PI",
      guests: 2,
      hours: 1.5,
      minutes: 90,
      keybox: "2410e",
      keyboxDetails: "Codice cancello 2410e",
      composition: ["1 Letto Matrimoniale", "1 Bagni", "1 Cucina"],
      notes: ["La biancheria la trovata alla struttura", "Codice cancello 2410e"],
      map: "https://maps.app.goo.gl/bawvCXP6JoSvp9fGA",
      section: "molino",
      searchTerms: ["sabina", "buti", "dogana del tiglio", "tiglio"]
    },

    // Appartamenti generici (solo minuti)
    {
      id: "ortensie",
      name: "ORTENSIE",
      minutes: 150,
      hours: 2.5,
      section: "generic",
      searchTerms: ["ortensie"]
    },
    {
      id: "inbetween",
      name: "INBETWEEN",
      minutes: 60,
      hours: 1,
      section: "generic",
      searchTerms: ["inbetween", "in between"]
    },
    {
      id: "sunny",
      name: "SUNNY",
      minutes: 90,
      hours: 1.5,
      section: "generic",
      searchTerms: ["sunny"]
    },
    {
      id: "orsini",
      name: "ORSINI",
      minutes: 60,
      hours: 1,
      section: "generic",
      searchTerms: ["orsini"]
    },
    {
      id: "ripasso",
      name: "RIPASSO",
      minutes: 30,
      hours: 0.5,
      section: "generic",
      searchTerms: ["ripasso"]
    }
  ],

  // DIPENDENTI - Struttura unificata
  employees: [
    {
      id: "alessandro_resti",
      name: "Alessandro Resti",
      password: "AR5671",
      urlParam: "AlessandroResti",
      searchTerms: ["alessandro", "resti", "alessandro resti"]
    },
    {
      id: "anna_wleklak",
      name: "Anna Wleklak",
      password: "AW5896",
      urlParam: "AnnaWleklak",
      searchTerms: ["anna", "wleklak", "anna wleklak"]
    },
    {
      id: "antonella_guarnieri",
      name: "Antonella Guarnieri",
      password: "AG8024",
      urlParam: "AntonellaGuarnieri",
      searchTerms: ["antonella", "guarnieri", "antonella guarnieri"]
    },
    {
      id: "letizia_vannini",
      name: "Letizia Vannini",
      password: "LV4587",
      urlParam: "LetiziaVannini",
      searchTerms: ["letizia", "vannini", "letizia vannini"]
    },
    {
      id: "manola_santarnecchi",
      name: "Manola Santarnecchi",
      password: "MS1936",
      urlParam: "ManolaSanternecchi",
      searchTerms: ["manola", "santarnecchi", "manola santarnecchi"]
    },
    {
      id: "roberta_salemmo",
      name: "Roberta Salemmo",
      password: "RS6239",
      urlParam: "RobertaSalemmo",
      searchTerms: ["roberta", "salemmo", "roberta salemmo"]
    },
    {
      id: "silvia_marrucci",
      name: "Silvia Marrucci",
      password: "SM5872",
      urlParam: "SilviaMarrucci",
      searchTerms: ["silvia", "marrucci", "silvia marrucci"]
    },
    {
      id: "anna_macri",
      name: "Anna Macrì",
      password: "AM9814",
      urlParam: "AnnaMacrì",
      searchTerms: ["anna", "macrì", "anna macrì", "macri"]
    },
    {
      id: "fabio_malvaldi",
      name: "Fabio Malvaldi",
      password: "FM1122",
      urlParam: "FabioMalvaldi",
      searchTerms: ["fabio", "malvaldi", "fabio malvaldi"]
    },
    {
      id: "francesco_martini",
      name: "Francesco Martini",
      password: "FM1111",
      urlParam: "FrancescoMartini",
      searchTerms: ["francesco", "martini", "francesco martini"]
    },
    {
      id: "angelo_barachini",
      name: "Angelo Barachini",
      password: "AB2221",
      urlParam: "AngeloBarachini",
      searchTerms: ["angelo", "barachini", "angelo barachini"]
    }
  ],

  // UFFICI - Struttura unificata
  offices: [
    {
      id: "aci",
      name: "ACI",
      minutes: 200,
      hours: 3.33,
      searchTerms: ["aci"]
    },
    {
      id: "professionecasa",
      name: "PROFESSIONECASA",
      minutes: 60,
      hours: 1,
      searchTerms: ["professionecasa", "professione casa"]
    },
    {
      id: "ufficio_start",
      name: "UFFICIO START",
      minutes: 120,
      hours: 2,
      searchTerms: ["ufficio start", "start"]
    },
    {
      id: "magazzino_start",
      name: "MAGAZZINO START",
      minutes: 30,
      hours: 0.5,
      searchTerms: ["magazzino start", "magazzino"]
    },
    {
      id: "suore_navacchio",
      name: "SUORE NAVACCHIO",
      minutes: 50,
      hours: 0.83,
      searchTerms: ["suore navacchio", "navacchio", "suore"]
    },
    {
      id: "suore_pisa",
      name: "SUORE PISA",
      minutes: 50,
      hours: 0.83,
      searchTerms: ["suore pisa", "suore"]
    },
    {
      id: "collegio_infermieri",
      name: "COLLEGIO PROFESSIONALE INFERMIERI",
      minutes: 60,
      hours: 1,
      searchTerms: ["collegio infermieri", "infermieri", "collegio professionale infermieri"]
    },
    {
      id: "collegio_infermieri_vetri",
      name: "COLLEGIO PROFESSIONALE INFERMIERI - VETRI",
      minutes: 40,
      hours: 0.67,
      searchTerms: ["collegio infermieri vetri", "vetri", "infermieri vetri"]
    },
    {
      id: "cesvot",
      name: "CESVOT",
      minutes: 30,
      hours: 0.5,
      searchTerms: ["cesvot"]
    },
    {
      id: "match_new_generation",
      name: "MATCH NEW GENERATION",
      minutes: 40,
      hours: 0.67,
      searchTerms: ["match new generation", "match"]
    },
    {
      id: "q_designe_office",
      name: "Q DESIGNE",
      minutes: 90,
      hours: 1.5,
      searchTerms: ["q designe", "designe"]
    },
    {
      id: "studi_medici_lavoro",
      name: "STUDI MEDICI DEL LAVORO",
      minutes: 120,
      hours: 2,
      searchTerms: ["studi medici lavoro", "medici lavoro", "studi medici del lavoro"]
    },
    {
      id: "acli_navacchio_office",
      name: "ACLI NAVACCHIO",
      minutes: 40,
      hours: 0.67,
      searchTerms: ["acli navacchio"]
    },
    {
      id: "acli_cascina_office",
      name: "ACLI CASCINA",
      minutes: 60,
      hours: 1,
      searchTerms: ["acli cascina"]
    },
    {
      id: "acli_ghezzano_office",
      name: "ACLI GHEZZANO",
      minutes: 60,
      hours: 1,
      searchTerms: ["acli ghezzano"]
    },
    {
      id: "acli_cisanello_office",
      name: "ACLI CISANELLO",
      minutes: 60,
      hours: 1,
      searchTerms: ["acli cisanello"]
    },
    {
      id: "acli_pisa_office",
      name: "ACLI PISA",
      minutes: 100,
      hours: 1.67,
      searchTerms: ["acli pisa"]
    },
    {
      id: "palestra",
      name: "PALESTRA",
      minutes: 300,
      hours: 5,
      searchTerms: ["palestra"]
    },
    {
      id: "palestra_settimanale",
      name: "PALESTRA SETTIMANALE",
      minutes: 90,
      hours: 1.5,
      searchTerms: ["palestra settimanale"]
    }
  ],

  // BNB - Struttura unificata
  bnb: [
    {
      id: "checkout",
      name: "Check-Out",
      minutes: 30,
      hours: 0.5,
      searchTerms: ["check-out", "checkout"]
    },
    {
      id: "checkout_camera_grande",
      name: "Check-Out_CameraGrande",
      minutes: 60,
      hours: 1,
      searchTerms: ["check-out camera grande", "camera grande", "checkout camera grande"]
    },
    {
      id: "refresh",
      name: "Refresh",
      minutes: 10,
      hours: 0.17,
      searchTerms: ["refresh"]
    },
    {
      id: "refresh_approfondito",
      name: "Refresh Approfondito",
      minutes: 15,
      hours: 0.25,
      searchTerms: ["refresh approfondito"]
    },
    {
      id: "area_comune",
      name: "Area Comune",
      minutes: 10,
      hours: 0.17,
      searchTerms: ["area comune"]
    }
  ],

  // BNB NOMI
  bnbNames: [
    {
      id: "dalmazia",
      name: "Dalmazia",
      searchTerms: ["dalmazia"]
    },
    {
      id: "martiri",
      name: "Martiri",
      searchTerms: ["martiri"]
    },
    {
      id: "c_grande",
      name: "C_Grande",
      searchTerms: ["c grande", "camera grande"]
    },
    {
      id: "c_piccola",
      name: "C_Piccola",
      searchTerms: ["c piccola", "camera piccola"]
    }
  ],

  // MASTER PASSWORD
  masterPassword: "Artigea"
};