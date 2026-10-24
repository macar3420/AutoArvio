/**
 * Curated + patterned generations for catalog makes C–Z.
 * fillRest(set, assign, models) mutates via set/assign.
 */

export function fillRest(rawSet, rawAssign, models) {
  const defined = new Set();
  const set = (id, rows) => {
    defined.add(id);
    rawSet(id, rows);
  };
  const assign = (ids, rows) => {
    for (const id of ids) set(id, rows);
  };

  const byMake = {};
  for (const m of models) {
    byMake[m.makeId] ??= [];
    byMake[m.makeId].push(m);
  }

  // ——— Fiat ———
  const FIAT_500 = [
    ["Classic", 1957, 1975],
    ["2007+", 2007, null],
  ];
  set("fiat-1100", [["1100", 1953, 1969]]);
  set("fiat-124", [["124", 1966, 1974]]);
  set("fiat-124-spider", [
    ["Classic", 1966, 1985],
    ["124 Spider", 2016, 2020],
  ]);
  set("fiat-126", [["126", 1972, 2000]]);
  set("fiat-127", [["127", 1971, 1987]]);
  set("fiat-128", [["128", 1969, 1985]]);
  set("fiat-130", [["130", 1969, 1977]]);
  set("fiat-131", [["131", 1974, 1984]]);
  set("fiat-133", [["133", 1974, 1981]]);
  set("fiat-1500", [["1500", 1961, 1967]]);
  set("fiat-2100", [["2100", 1959, 1961]]);
  set("fiat-500", FIAT_500);
  set("fiat-500c", [["500C", 2009, null]]);
  set("fiat-500e", [["500e", 2020, null]]);
  set("fiat-500l", [["500L", 2012, 2022]]);
  set("fiat-500x", [["500X", 2014, null]]);
  set("fiat-600", [
    ["Classic", 1955, 1969],
    ["600e", 2023, null],
  ]);
  set("fiat-850", [["850", 1964, 1973]]);
  set("fiat-albea", [["Albea", 2002, 2012]]);
  set("fiat-barchetta", [["Barchetta", 1995, 2005]]);
  set("fiat-brava", [["Brava", 1995, 2001]]);
  set("fiat-bravo", [
    ["I", 1995, 2001],
    ["II", 2007, 2014],
  ]);
  set("fiat-coupe", [["Coupé", 1993, 2000]]);
  set("fiat-croma", [
    ["I", 1985, 1996],
    ["II", 2005, 2010],
  ]);
  set("fiat-doblo", [
    ["I", 2000, 2009],
    ["II", 2009, 2022],
    ["III", 2022, null],
  ]);
  set("fiat-ducato", [
    ["I", 1981, 1993],
    ["II", 1993, 2006],
    ["III", 2006, null],
  ]);
  set("fiat-e-scudo", [["E-Scudo", 2020, null]]);
  set("fiat-fiorino", [
    ["I–III", 1977, 2007],
    ["Qubo-based", 2007, null],
  ]);
  set("fiat-freemont", [["Freemont", 2011, 2016]]);
  set("fiat-fullback", [["Fullback", 2016, 2019]]);
  set("fiat-grande-punto", [["Grande Punto", 2005, 2018]]);
  set("fiat-idea", [["Idea", 2003, 2012]]);
  set("fiat-linea", [["Linea", 2007, 2018]]);
  set("fiat-marea", [["Marea", 1996, 2007]]);
  set("fiat-multipla", [["Multipla", 1998, 2010]]);
  set("fiat-panda", [
    ["I", 1980, 2003],
    ["II", 2003, 2011],
    ["III", 2011, null],
  ]);
  set("fiat-punto", [
    ["I", 1993, 1999],
    ["II", 1999, 2005],
    ["III", 2005, 2018],
  ]);
  set("fiat-punto-evo", [["Punto Evo", 2009, 2012]]);
  set("fiat-ritmo", [["Ritmo", 1978, 1988]]);
  set("fiat-scudo", [
    ["I", 1995, 2006],
    ["II", 2007, 2016],
    ["III", 2022, null],
  ]);
  set("fiat-seicento", [["Seicento", 1997, 2010]]);
  set("fiat-stilo", [["Stilo", 2001, 2007]]);
  set("fiat-talento", [["Talento", 2016, 2020]]);
  set("fiat-tempra", [["Tempra", 1990, 1996]]);
  set("fiat-tipo", [
    ["I", 1988, 1995],
    ["II", 2015, null],
  ]);
  set("fiat-ulysse", [
    ["I", 1994, 2002],
    ["II", 2002, 2010],
    ["III", 2022, null],
  ]);
  set("fiat-uno", [["Uno", 1983, 1995]]);
  set("fiat-x-1-9", [["X1/9", 1972, 1989]]);

  // ——— Ford (major EU lines) ———
  const FOCUS = [
    ["Mk1", 1998, 2004],
    ["Mk2", 2004, 2011],
    ["Mk3", 2011, 2018],
    ["Mk4", 2018, null],
  ];
  const FIESTA = [
    ["Mk4/5", 1995, 2002],
    ["Mk6", 2002, 2008],
    ["Mk7", 2008, 2017],
    ["Mk8", 2017, 2023],
  ];
  const MONDEO = [
    ["I", 1993, 2000],
    ["II", 2000, 2007],
    ["III", 2007, 2014],
    ["IV", 2014, 2022],
  ];
  set("ford-fiesta", FIESTA);
  set("ford-fiesta-van", FIESTA);
  set("ford-focus", FOCUS);
  set("ford-focus-c-max", [["C-Max", 2003, 2010]]);
  set("ford-mondeo", MONDEO);
  set("ford-kuga", [
    ["I", 2008, 2012],
    ["II", 2012, 2019],
    ["III", 2019, null],
  ]);
  set("ford-puma", [
    ["I", 1997, 2001],
    ["II", 2019, null],
  ]);
  set("ford-mustang", [
    ["S197", 2004, 2014],
    ["S550", 2014, 2023],
    ["S650", 2023, null],
  ]);
  set("ford-mustang-mach-e", [["Mach-E", 2020, null]]);
  set("ford-ranger", [
    ["T6", 2011, 2022],
    ["T6.2", 2022, null],
  ]);
  set("ford-transit", [
    ["V347/8", 2000, 2013],
    ["V363", 2013, null],
  ]);
  set("ford-transit-connect", [
    ["I", 2002, 2013],
    ["II", 2013, null],
  ]);
  set("ford-transit-custom", [["Custom", 2012, null]]);
  set("ford-transit-courier", [["Courier", 2014, null]]);
  set("ford-tourneo", [["Tourneo", 1995, null]]);
  set("ford-tourneo-connect", [
    ["I", 2002, 2013],
    ["II", 2013, null],
  ]);
  set("ford-tourneo-courier", [["Courier", 2014, null]]);
  set("ford-tourneo-custom", [["Custom", 2012, null]]);
  set("ford-grand-tourneo-connect", [["Grand Connect", 2013, null]]);
  set("ford-s-max", [
    ["I", 2006, 2015],
    ["II", 2015, null],
  ]);
  set("ford-galaxy", [
    ["I", 1995, 2006],
    ["II", 2006, 2015],
    ["III", 2015, null],
  ]);
  set("ford-c-max", [
    ["I", 2003, 2010],
    ["II", 2010, 2019],
  ]);
  set("ford-c-max-grand", [["Grand C-Max", 2010, 2019]]);
  set("ford-grand-c-max", [["Grand C-Max", 2010, 2019]]);
  set("ford-b-max", [["B-Max", 2012, 2017]]);
  set("ford-ecosport", [["EcoSport", 2012, 2022]]);
  set("ford-escape", [
    ["I–III US", 2000, 2019],
    ["IV", 2019, null],
  ]);
  set("ford-explorer", [
    ["V", 2010, 2019],
    ["VI EU", 2019, null],
  ]);
  set("ford-edge", [["Edge", 2016, 2021]]);
  set("ford-ka", [
    ["I", 1996, 2008],
    ["II", 2008, 2016],
  ]);
  set("ford-streetka", [["Streetka", 2003, 2005]]);
  set("ford-fusion", [
    ["EU", 2002, 2012],
    ["US", 2012, 2020],
  ]);
  set("ford-escort", [
    ["Mk6/7", 1990, 2000],
    ["China/elsewhere", 2014, null],
  ]);
  set("ford-escort-express", [["Express", 1990, 2002]]);
  set("ford-sierra", [["Sierra", 1982, 1993]]);
  set("ford-scorpio", [["Scororpio", 1985, 1998]]);
  set("ford-orion", [["Orion", 1983, 1993]]);
  set("ford-granada", [["Granada", 1972, 1994]]);
  set("ford-capri", [["Capri", 1969, 1986]]);
  set("ford-capri-ii", [["Capri II EV", 2024, null]]);
  set("ford-cougar", [["Cougar", 1998, 2002]]);
  set("ford-probe", [["Probe", 1988, 1997]]);
  set("ford-pinto", [["Pinto", 1970, 1980]]);
  set("ford-taunus", [["Taunus", 1970, 1982]]);
  set("ford-cortina", [["Cortina", 1962, 1982]]);
  set("ford-consul", [["Consul", 1972, 1975]]);
  set("ford-zephyr", [["Zephyr", 1950, 1972]]);
  set("ford-anglia", [["Anglia", 1959, 1967]]);
  set("ford-maverick", [
    ["EU SUV", 1993, 2007],
    ["Pickup", 2021, null],
  ]);
  set("ford-bronco", [["Bronco", 2020, null]]);
  set("ford-f-150", [["F-150", 1997, null]]);
  set("ford-f-250", [["F-250", 1999, null]]);
  set("ford-f-350", [["F-350", 1999, null]]);
  set("ford-f100", [["F100", 1953, 1983]]);
  set("ford-ranger", [
    ["T6", 2011, 2022],
    ["T6.2", 2022, null],
  ]);
  set("ford-courier", [["Courier", 1991, 2013]]);
  set("ford-p100", [["P100", 1982, 1993]]);
  set("ford-aerostar", [["Aerostar", 1985, 1997]]);
  set("ford-windstar", [["Windstar", 1994, 2003]]);
  set("ford-freestyle", [["Freestyle", 2004, 2007]]);
  set("ford-excursion", [["Excursion", 1999, 2005]]);
  set("ford-econoline", [["E-Series", 1961, 2014]]);
  set("ford-cargo", [["Cargo", 1981, null]]);
  set("ford-van", [["Van", 1965, null]]);
  set("ford-tudor", [["Tudor", 1949, 1951]]);
  set("ford-a-model", [["Model A", 1927, 1931]]);
  set("ford-t-model", [["Model T", 1908, 1927]]);
  set("ford-12-m", [["12M", 1952, 1962]]);
  set("ford-17-m", [["17M", 1957, 1971]]);
  set("ford-20-m", [["20M", 1964, 1972]]);
  set("ford-26-m", [["26M", 1966, 1972]]);
  set("ford-country", [["Country Squire", 1950, 1991]]);
  set("ford-crown-victoria", [["Crown Victoria", 1991, 2011]]);
  set("ford-elite", [["Elite", 1974, 1976]]);
  set("ford-fairlane", [["Fairlane", 1955, 1970]]);
  set("ford-falcon", [["Falcon", 1960, 2016]]);
  set("ford-galaxie", [["Galaxie", 1958, 1974]]);
  set("ford-lincoln", [["Lincoln badge", 1990, null]]);
  set("ford-ltd", [["LTD", 1965, 1986]]);
  set("ford-mercury", [["Mercury", 1990, 2011]]);
  set("ford-ranchero", [["Ranchero", 1957, 1979]]);
  set("ford-taurus", [["Taurus", 1986, 2019]]);
  set("ford-thunderbird", [["Thunderbird", 1955, 2005]]);
  set("ford-torino", [["Torino", 1968, 1976]]);
  set("ford-contour", [["Contour", 1994, 2000]]);

  // ——— Honda ———
  set("honda-accord", [
    ["CD/CE", 1993, 1998],
    ["CG/CH", 1998, 2002],
    ["CL/CM", 2002, 2008],
    ["CU/CW", 2008, 2015],
    ["CR", 2015, null],
  ]);
  set("honda-civic", [
    ["EK/EJ", 1995, 2000],
    ["EP/ES", 2000, 2005],
    ["FD/FN", 2005, 2011],
    ["FK/FB", 2011, 2016],
    ["FC/FK", 2016, 2021],
    ["FE/FL", 2021, null],
  ]);
  set("honda-civic-type-r", [
    ["EK9", 1997, 2000],
    ["EP3", 2001, 2005],
    ["FN2", 2007, 2011],
    ["FK2", 2015, 2017],
    ["FK8", 2017, 2022],
    ["FL5", 2022, null],
  ]);
  set("honda-cr-v", [
    ["I", 1995, 2001],
    ["II", 2001, 2006],
    ["III", 2006, 2012],
    ["IV", 2012, 2018],
    ["V", 2018, 2022],
    ["VI", 2022, null],
  ]);
  set("honda-cr-v-hybrid", [["CR-V Hybrid", 2018, null]]);
  set("honda-crx", [["CRX", 1983, 1991]]);
  set("honda-cr-z", [["CR-Z", 2010, 2016]]);
  set("honda-e", [["Honda e", 2020, 2024]]);
  set("honda-e-ny1", [["e:Ny1", 2023, null]]);
  set("honda-fr-v", [["FR-V", 2004, 2009]]);
  set("honda-hr-v", [
    ["I", 1998, 2006],
    ["II", 2015, 2021],
    ["III", 2021, null],
  ]);
  set("honda-insight", [
    ["I", 1999, 2006],
    ["II", 2009, 2014],
    ["III", 2018, 2022],
  ]);
  set("honda-integra", [
    ["DC2", 1993, 2001],
    ["DC5", 2001, 2006],
    ["DE4", 2021, null],
  ]);
  set("honda-jazz", [
    ["I", 2001, 2008],
    ["II", 2008, 2015],
    ["III", 2015, 2020],
    ["IV", 2020, null],
  ]);
  set("honda-legend", [
    ["KA", 1990, 2004],
    ["KB", 2004, 2012],
    ["KC", 2014, 2021],
  ]);
  set("honda-nsx", [
    ["I", 1990, 2005],
    ["II", 2016, 2022],
  ]);
  set("honda-odyssey", [
    ["EU/JP", 1994, 2010],
    ["Later", 2010, null],
  ]);
  set("honda-prelude", [
    ["IV", 1991, 1996],
    ["V", 1996, 2001],
  ]);
  set("honda-s2000", [["AP1/AP2", 1999, 2009]]);
  set("honda-shuttle", [["Shuttle", 1994, 2001]]);
  set("honda-stepwgn", [["Stepwgn", 1996, null]]);
  set("honda-stream", [["Stream", 2000, 2014]]);
  set("honda-wr-v", [["WR-V", 2017, null]]);
  set("honda-zr-v", [["ZR-V", 2022, null]]);

  fillHyundaiKia(set);
  fillLandRoverLexusMaxusMazda(set, assign);
  fillMercedes(set, assign, byMake.mercedes || [], defined);
  fillMgMiniMitsubishi(set);
  fillNissanOpelPeugeot(set, assign);
  fillPolestarPorscheRenaultSeatSkoda(set);
  fillSmartSubaruSuzukiTesla(set);
  fillToyotaVwVolvoVoyahXpeng(set, assign, byMake);
}

function fillHyundaiKia(set) {
  set("hyundai-accent", [
    ["I–III", 1994, 2010],
    ["IV+", 2010, null],
  ]);
  set("hyundai-atos", [["Atos", 1997, 2008]]);
  set("hyundai-coupe", [["Coupé/Tiburon", 1996, 2008]]);
  set("hyundai-elantra", [
    ["HD/MD", 2006, 2015],
    ["AD/CN7", 2015, null],
  ]);
  set("hyundai-galloper", [["Galloper", 1991, 2003]]);
  set("hyundai-genesis-coupe", [["Genesis Coupé", 2008, 2016]]);
  set("hyundai-getz", [["Getz", 2002, 2011]]);
  set("hyundai-h-1", [["H-1", 1997, null]]);
  set("hyundai-h1-van", [["H-1 Van", 1997, null]]);
  set("hyundai-i10", [
    ["I", 2007, 2013],
    ["II", 2013, 2019],
    ["III", 2019, null],
  ]);
  set("hyundai-i20", [
    ["I", 2008, 2014],
    ["II", 2014, 2020],
    ["III", 2020, null],
  ]);
  set("hyundai-i30", [
    ["FD", 2007, 2011],
    ["GD", 2011, 2016],
    ["PD", 2016, null],
  ]);
  set("hyundai-i30-fastback", [["PD Fastback", 2017, null]]);
  set("hyundai-i40", [["i40", 2011, 2019]]);
  set("hyundai-inster", [["Inster", 2024, null]]);
  set("hyundai-ioniq", [["Ioniq", 2016, 2022]]);
  set("hyundai-ioniq-5", [["Ioniq 5", 2021, null]]);
  set("hyundai-ioniq-6", [["Ioniq 6", 2022, null]]);
  set("hyundai-ioniq-electric", [["Ioniq Electric", 2016, 2022]]);
  set("hyundai-ioniq-plug-in", [["Ioniq PHEV", 2017, 2022]]);
  set("hyundai-ix20", [["ix20", 2010, 2019]]);
  set("hyundai-ix35", [["ix35", 2010, 2015]]);
  set("hyundai-ix55", [["ix55", 2006, 2012]]);
  set("hyundai-kona", [
    ["I", 2017, 2023],
    ["II", 2023, null],
  ]);
  set("hyundai-kona-electric", [
    ["I", 2018, 2023],
    ["II", 2023, null],
  ]);
  set("hyundai-matrix", [["Matrix", 2001, 2010]]);
  set("hyundai-nexo", [["Nexo", 2018, null]]);
  set("hyundai-pony", [["Pony", 1975, 1990]]);
  set("hyundai-santa-fe", [
    ["I", 2000, 2006],
    ["II", 2006, 2012],
    ["III", 2012, 2018],
    ["IV", 2018, null],
  ]);
  set("hyundai-scoupe", [["Scoupe", 1990, 1995]]);
  set("hyundai-sonata", [
    ["YF/LF", 2009, 2019],
    ["DN8", 2019, null],
  ]);
  set("hyundai-terracan", [["Terracan", 2001, 2007]]);
  set("hyundai-trajet", [["Trajet", 1999, 2008]]);
  set("hyundai-tucson", [
    ["I", 2004, 2009],
    ["II", 2009, 2015],
    ["III", 2015, 2020],
    ["IV", 2020, null],
  ]);
  set("hyundai-veloster", [["Veloster", 2011, 2022]]);

  set("kia-carens", [
    ["I–III", 1999, 2013],
    ["IV", 2013, 2019],
  ]);
  set("kia-carnival", [
    ["I–III", 1998, 2020],
    ["IV", 2020, null],
  ]);
  set("kia-ceed", [
    ["I", 2006, 2012],
    ["II", 2012, 2018],
    ["III", 2018, null],
  ]);
  set("kia-cerato", [
    ["I–II", 2003, 2012],
    ["III+", 2012, null],
  ]);
  set("kia-e-niro", [["e-Niro", 2018, 2022]]);
  set("kia-e-soul", [["e-Soul", 2014, null]]);
  set("kia-ev3", [["EV3", 2024, null]]);
  set("kia-ev5", [["EV5", 2024, null]]);
  set("kia-ev6", [["EV6", 2021, null]]);
  set("kia-ev9", [["EV9", 2023, null]]);
  set("kia-magentis", [["Magentis", 2000, 2010]]);
  set("kia-niro", [
    ["I", 2016, 2022],
    ["II", 2022, null],
  ]);
  set("kia-niro-electric", [
    ["I", 2018, 2022],
    ["II", 2022, null],
  ]);
  set("kia-opirus", [["Opirus", 2003, 2011]]);
  set("kia-optima", [
    ["TF/JF", 2010, 2019],
    ["DL3", 2019, null],
  ]);
  set("kia-picanto", [
    ["I", 2004, 2011],
    ["II", 2011, 2017],
    ["III", 2017, null],
  ]);
  set("kia-proceed", [["ProCeed", 2018, null]]);
  set("kia-pv5", [["PV5", 2025, null]]);
  set("kia-pv5-cargo", [["PV5 Cargo", 2025, null]]);
  set("kia-rio", [
    ["II", 2005, 2011],
    ["III", 2011, 2017],
    ["IV", 2017, null],
  ]);
  set("kia-sorento", [
    ["I", 2002, 2009],
    ["II", 2009, 2014],
    ["III", 2014, 2020],
    ["IV", 2020, null],
  ]);
  set("kia-soul", [
    ["I", 2008, 2013],
    ["II", 2013, 2019],
    ["III", 2019, null],
  ]);
  set("kia-sportage", [
    ["II", 2004, 2010],
    ["III", 2010, 2015],
    ["IV", 2015, 2021],
    ["V", 2021, null],
  ]);
  set("kia-stinger", [["Stinger", 2017, 2023]]);
  set("kia-stonic", [["Stonic", 2017, null]]);
  set("kia-venga", [["Venga", 2009, 2019]]);
  set("kia-xceed", [["XCeed", 2019, null]]);
}

function fillLandRoverLexusMaxusMazda(set, assign) {
  set("landrover-88", [["Series", 1958, 1985]]);
  set("landrover-109", [["Series", 1958, 1985]]);
  set("landrover-110", [["110", 1983, 1990]]);
  set("landrover-defender", [
    ["Classic", 1990, 2016],
    ["L663", 2019, null],
  ]);
  set("landrover-discovery", [
    ["I–III", 1989, 2009],
    ["IV", 2009, 2016],
    ["V", 2016, null],
  ]);
  set("landrover-discovery-sport", [["Discovery Sport", 2014, null]]);
  set("landrover-freelander", [
    ["I", 1997, 2006],
    ["II", 2006, 2014],
  ]);
  set("landrover-range-rover", [
    ["P38", 1994, 2001],
    ["L322", 2001, 2012],
    ["L405", 2012, 2021],
    ["L460", 2021, null],
  ]);
  set("landrover-range-rover-evoque", [
    ["L538", 2011, 2018],
    ["L551", 2018, null],
  ]);
  set("landrover-range-rover-sport", [
    ["L320", 2005, 2013],
    ["L494", 2013, 2022],
    ["L461", 2022, null],
  ]);
  set("landrover-range-rover-velar", [["L560", 2017, null]]);
  set("landrover-series", [["Series I–III", 1948, 1985]]);

  const LEX = (id, rows) => set(id, rows);
  LEX("lexus-ct", [["CT 200h", 2010, 2022]]);
  LEX("lexus-es", [
    ["XV40", 2006, 2012],
    ["XV60", 2012, 2018],
    ["XZ10", 2018, null],
  ]);
  LEX("lexus-gs", [
    ["S190", 2005, 2011],
    ["L10", 2011, 2020],
  ]);
  LEX("lexus-is", [
    ["XE20", 2005, 2013],
    ["XE30", 2013, null],
  ]);
  LEX("lexus-lbx", [["LBX", 2023, null]]);
  LEX("lexus-ls", [
    ["XF40", 2006, 2017],
    ["XF50", 2017, null],
  ]);
  LEX("lexus-nx", [
    ["AZ10", 2014, 2021],
    ["AZ20", 2021, null],
  ]);
  LEX("lexus-rc", [["RC", 2014, null]]);
  LEX("lexus-rx", [
    ["AL10", 2008, 2015],
    ["AL20", 2015, 2022],
    ["AL30", 2022, null],
  ]);
  LEX("lexus-rz", [["RZ", 2022, null]]);
  LEX("lexus-sc", [["SC", 1990, 2010]]);
  LEX("lexus-ux", [["UX", 2018, null]]);

  for (const id of [
    "maxus-deliver-7",
    "maxus-deliver-9",
    "maxus-e-deliver-3",
    "maxus-e-deliver-5",
    "maxus-e-deliver-7",
    "maxus-e-deliver-9",
    "maxus-eterron-9",
    "maxus-euniq",
    "maxus-euniq-5",
    "maxus-euniq-6",
    "maxus-mifa-9",
    "maxus-t60-max",
    "maxus-t90-ev",
  ]) {
    const code = id.replace("maxus-", "").replace(/-/g, " ").toUpperCase();
    set(id, [[code, 2019, null]]);
  }

  set("mazda-3", [
    ["BK", 2003, 2009],
    ["BL", 2009, 2013],
    ["BM", 2013, 2019],
    ["BP", 2019, null],
  ]);
  set("mazda-2", [
    ["DY", 2002, 2007],
    ["DE", 2007, 2014],
    ["DJ", 2014, null],
  ]);
  set("mazda-2-hybrid", [["2 Hybrid", 2022, null]]);
  set("mazda-5", [
    ["CR", 2005, 2010],
    ["CW", 2010, 2017],
  ]);
  set("mazda-6", [
    ["GG/GY", 2002, 2007],
    ["GH", 2007, 2012],
    ["GJ", 2012, null],
  ]);
  set("mazda-6e", [["6e", 2025, null]]);
  set("mazda-121", [["121", 1987, 2002]]);
  set("mazda-1300", [["1300", 1977, 1980]]);
  set("mazda-1800", [["1800", 1968, 1972]]);
  set("mazda-2000", [["2000", 1970, 1978]]);
  set("mazda-2200", [["2200", 1970, 1978]]);
  set("mazda-323", [["323", 1977, 2003]]);
  set("mazda-323f", [["323F", 1989, 2003]]);
  set("mazda-616", [["616", 1970, 1978]]);
  set("mazda-626", [["626", 1979, 2002]]);
  set("mazda-818", [["818", 1974, 1978]]);
  set("mazda-929", [["929", 1973, 1995]]);
  set("mazda-b2200", [["B2200", 1985, 1999]]);
  set("mazda-b2500", [["B2500", 1998, 2006]]);
  set("mazda-b2600", [["B2600", 1985, 1999]]);
  set("mazda-bt-50", [
    ["I", 2006, 2011],
    ["II", 2011, 2020],
    ["III", 2020, null],
  ]);
  set("mazda-cx-3", [["CX-3", 2015, null]]);
  set("mazda-cx-30", [["CX-30", 2019, null]]);
  set("mazda-cx-5", [
    ["KE", 2012, 2017],
    ["KF", 2017, null],
  ]);
  set("mazda-cx-60", [["CX-60", 2022, null]]);
  set("mazda-cx-7", [["CX-7", 2006, 2012]]);
  set("mazda-cx-80", [["CX-80", 2024, null]]);
  set("mazda-cx-6e", [["CX-6e", 2025, null]]);
  set("mazda-demio", [["Demio", 1996, 2014]]);
  set("mazda-europe", [["Europe", 1980, 1990]]);
  set("mazda-familia", [["Familia", 1963, 2003]]);
  set("mazda-forte", [["Forte", 2008, null]]);
  set("mazda-mpv", [["MPV", 1988, 2016]]);
  set("mazda-mx-3", [["MX-3", 1991, 1998]]);
  set("mazda-mx-5", [
    ["NA", 1989, 1997],
    ["NB", 1998, 2005],
    ["NC", 2005, 2015],
    ["ND", 2015, null],
  ]);
  set("mazda-mx-6", [["MX-6", 1987, 1997]]);
  set("mazda-mx-30", [["MX-30", 2020, null]]);
  set("mazda-neo", [["Neo", 1994, 1999]]);
  set("mazda-pick-up", [["Pickup", 1985, 2006]]);
  set("mazda-premacy", [["Premacy", 1999, 2010]]);
  set("mazda-rx-7", [["FD", 1992, 2002]]);
  set("mazda-rx-8", [["RX-8", 2003, 2012]]);
  set("mazda-tribute", [["Tribute", 2000, 2011]]);
}

function fillMercedes(set, assign, mercedesModels, defined) {
  const A = [
    ["W168", 1997, 2004],
    ["W169", 2004, 2012],
    ["W176", 2012, 2018],
    ["W177", 2018, null],
  ];
  const B = [
    ["T245", 2005, 2011],
    ["W246", 2011, 2018],
    ["W247", 2018, null],
  ];
  const C = [
    ["W202", 1993, 2000],
    ["W203", 2000, 2007],
    ["W204", 2007, 2014],
    ["W205", 2014, 2021],
    ["W206", 2021, null],
  ];
  const E = [
    ["W124", 1984, 1995],
    ["W210", 1995, 2002],
    ["W211", 2002, 2009],
    ["W212", 2009, 2016],
    ["W213", 2016, 2023],
    ["W214", 2023, null],
  ];
  const S = [
    ["W140", 1991, 1998],
    ["W220", 1998, 2005],
    ["W221", 2005, 2013],
    ["W222", 2013, 2020],
    ["W223", 2020, null],
  ];
  const G = [
    ["W460/461", 1979, 1990],
    ["W463", 1990, null],
  ];
  const GLC = [
    ["X253", 2015, 2022],
    ["X254", 2022, null],
  ];
  const GLE = [
    ["W166", 2011, 2018],
    ["W167", 2018, null],
  ];
  const CLA = [
    ["C117", 2013, 2019],
    ["C118", 2019, null],
  ];

  assign(
    ["mercedes-a", "mercedes-a-class", "mercedes-a-45-amg"].filter((id) =>
      mercedesModels.some((m) => m.id === id),
    ),
    A,
  );
  // Explicit sets for reliability
  set("mercedes-a", A);
  set("mercedes-a-class", A);
  set("mercedes-a-45-amg", [
    ["W176", 2013, 2018],
    ["W177", 2019, null],
  ]);
  set("mercedes-b", B);
  set("mercedes-b-class", B);
  set("mercedes-c", C);
  set("mercedes-c-class", C);
  for (const id of [
    "mercedes-c-180",
    "mercedes-c-220",
    "mercedes-c-230",
    "mercedes-c-30-amg",
    "mercedes-c-32-amg",
    "mercedes-c-36-amg",
    "mercedes-c-43-amg",
    "mercedes-c-55-amg",
    "mercedes-c-63-amg",
  ]) {
    set(id, C);
  }
  set("mercedes-e", E);
  set("mercedes-e-class", E);
  for (const id of ["mercedes-e-200", "mercedes-e-50-amg", "mercedes-e-55-amg", "mercedes-e-63-amg"]) {
    set(id, E);
  }
  set("mercedes-s", S);
  set("mercedes-s-class", S);
  for (const id of ["mercedes-s-350", "mercedes-s-55-amg", "mercedes-s-63-amg"]) set(id, S);
  set("mercedes-g", G);
  set("mercedes-g-class", G);
  set("mercedes-cla", CLA);
  set("mercedes-cla-45-amg", CLA);
  set("mercedes-glc", GLC);
  set("mercedes-gle", GLE);
  set("mercedes-glb", [["X247", 2019, null]]);
  set("mercedes-gla", [
    ["X156", 2013, 2019],
    ["H247", 2020, null],
  ]);
  set("mercedes-gls", [
    ["X166", 2015, 2019],
    ["X167", 2019, null],
  ]);
  set("mercedes-gl", [["X164/X166", 2006, 2015]]);
  set("mercedes-glk", [["X204", 2008, 2015]]);
  set("mercedes-ml", [
    ["W163", 1997, 2005],
    ["W164", 2005, 2011],
    ["W166", 2011, 2015],
  ]);
  set("mercedes-ml-55-amg", [["W163/W164", 2000, 2011]]);
  set("mercedes-ml-63-amg", [["W164/W166", 2006, 2015]]);
  set("mercedes-r", [["W251", 2005, 2013]]);
  set("mercedes-sl", [
    ["R129", 1989, 2001],
    ["R230", 2001, 2011],
    ["R231", 2012, 2020],
    ["R232", 2021, null],
  ]);
  set("mercedes-sl-500", [
    ["R129", 1989, 2001],
    ["R230", 2001, 2011],
  ]);
  set("mercedes-slk", [
    ["R170", 1996, 2004],
    ["R171", 2004, 2010],
    ["R172", 2011, 2020],
  ]);
  set("mercedes-slk-32-amg", [["R170", 2001, 2004]]);
  set("mercedes-slk-55-amg", [
    ["R171", 2004, 2010],
    ["R172", 2012, 2020],
  ]);
  set("mercedes-slc", [["R172", 2016, 2020]]);
  set("mercedes-clk", [
    ["C208", 1997, 2002],
    ["C209", 2002, 2009],
  ]);
  set("mercedes-clk-55-amg", [["C208/C209", 2000, 2006]]);
  set("mercedes-cls", [
    ["C219", 2004, 2010],
    ["C218", 2010, 2018],
    ["C257", 2018, null],
  ]);
  set("mercedes-cls-55-amg", [["C219", 2004, 2006]]);
  set("mercedes-cls-63-amg", [
    ["C219", 2006, 2010],
    ["C218", 2011, 2018],
  ]);
  set("mercedes-cl", [
    ["C215", 1999, 2006],
    ["C216", 2006, 2014],
  ]);
  set("mercedes-cl-55-amg", [["C215", 2000, 2006]]);
  set("mercedes-cl-63-amg", [["C216", 2006, 2014]]);
  set("mercedes-clc", [["CL203", 2008, 2011]]);
  set("mercedes-cle", [["C236", 2023, null]]);
  set("mercedes-ce", [["W124 CE", 1987, 1995]]);
  set("mercedes-se", [["W116/W126", 1972, 1991]]);
  set("mercedes-sec", [["C126", 1981, 1991]]);
  set("mercedes-sel", [["W116/W126", 1972, 1991]]);
  set("mercedes-amg-gt", [
    ["C190", 2014, 2021],
    ["C192", 2023, null],
  ]);
  set("mercedes-maybach-s-class", [
    ["X222", 2015, 2020],
    ["Z223", 2021, null],
  ]);
  set("mercedes-eqa", [["H243", 2021, null]]);
  set("mercedes-eqb", [["X243", 2021, null]]);
  set("mercedes-eqc", [["N293", 2019, 2023]]);
  set("mercedes-eqe", [["V295", 2021, null]]);
  set("mercedes-eqe-suv", [["X294", 2022, null]]);
  set("mercedes-eqs", [["V297", 2021, null]]);
  set("mercedes-eqv", [["V447 EQV", 2020, null]]);
  set("mercedes-sprinter", [
    ["T1N", 1995, 2006],
    ["NCV3", 2006, 2018],
    ["VS30", 2018, null],
  ]);
  set("mercedes-vito", [
    ["W638", 1996, 2003],
    ["W639", 2003, 2014],
    ["W447", 2014, null],
  ]);
  set("mercedes-viano", [["W639", 2003, 2014]]);
  set("mercedes-v", [["W447", 2014, null]]);
  set("mercedes-vaneo", [["W414", 2001, 2005]]);
  set("mercedes-citan", [
    ["W415", 2012, 2021],
    ["W420", 2021, null],
  ]);
  set("mercedes-vario", [["T2/BN", 1996, 2013]]);
  set("mercedes-unimog", [["Unimog", 1948, null]]);
  set("mercedes-x", [["X470", 2017, 2020]]);
  set("mercedes-ambulance", [["Ambulance", 1990, null]]);
  set("mercedes-kasten", [["Kasten", 1990, null]]);
  set("mercedes-l508", [["L508", 1970, 1995]]);

  // Numeric badges not already mapped → shared older chassis
  const classic = [
    ["W123", 1976, 1985],
    ["W124", 1984, 1995],
  ];
  const early = [
    ["W114/115", 1968, 1976],
    ["W123", 1976, 1985],
  ];
  for (const id of mercedesModels.map((m) => m.id)) {
    if (defined.has(id)) continue;
    if (/^mercedes-\d/.test(id)) {
      const num = parseInt(id.replace(/\D/g, ""), 10);
      if (num >= 100 && num < 200) set(id, early);
      else if (num >= 200 && num < 400) set(id, classic);
      else if (num >= 400 && num < 700) set(id, [["W126/W140", 1979, 1998]]);
      else set(id, [["Classic", 1970, 1995]]);
    }
  }
}

function fillMgMiniMitsubishi(set) {
  set("mg-1100", [["1100", 1962, 1973]]);
  set("mg-b", [["MGB", 1962, 1980]]);
  set("mg-b-gt", [["MGB GT", 1965, 1980]]);
  set("mg-cyberster", [["Cyberster", 2024, null]]);
  set("mg-ehs", [["EHS", 2020, null]]);
  set("mg-f", [["MGF", 1995, 2002]]);
  set("mg-hs", [["HS", 2018, null]]);
  set("mg-hs-phev", [["HS PHEV", 2020, null]]);
  set("mg-marvel-r", [["Marvel R", 2021, null]]);
  set("mg-mg3", [
    ["I", 2011, 2018],
    ["II", 2018, 2024],
    ["III", 2024, null],
  ]);
  set("mg-mg3-hybrid", [["MG3 Hybrid", 2024, null]]);
  set("mg-mg4", [["MG4", 2022, null]]);
  set("mg-mg4-urban", [["MG4 Urban", 2023, null]]);
  set("mg-mg5", [["MG5", 2012, null]]);
  set("mg-mgb", [["MGB", 1962, 1980]]);
  set("mg-mgf", [["MGF", 1995, 2002]]);
  set("mg-mgs6-ev", [["MGS6 EV", 2024, null]]);
  set("mg-s5", [["S5", 2024, null]]);
  set("mg-tf", [["TF", 2002, 2005]]);
  set("mg-zr", [["ZR", 2001, 2005]]);
  set("mg-zs", [
    ["Rover-era", 2001, 2005],
    ["SAIC", 2017, null],
  ]);
  set("mg-zs-ev", [["ZS EV", 2019, null]]);
  set("mg-zt", [["ZT", 2001, 2005]]);
  set("mg-zt-t", [["ZT-T", 2001, 2005]]);

  set("mini-1000", [["Classic Mini", 1967, 2000]]);
  set("mini-1300", [["Classic Mini", 1974, 2000]]);
  set("mini-aceman", [["Aceman", 2024, null]]);
  set("mini-cabrio", [
    ["R52", 2004, 2008],
    ["R57", 2009, 2015],
    ["F57", 2016, null],
  ]);
  set("mini-clubman", [
    ["R55", 2007, 2014],
    ["F54", 2015, null],
  ]);
  set("mini-clubvan", [["R55 Clubvan", 2012, 2014]]);
  set("mini-cooper", [
    ["R50/R53", 2001, 2006],
    ["R56", 2006, 2013],
    ["F55/F56", 2013, 2023],
    ["J01", 2023, null],
  ]);
  set("mini-cooper-s", [
    ["R53", 2002, 2006],
    ["R56", 2006, 2013],
    ["F56", 2013, 2023],
    ["J01", 2023, null],
  ]);
  set("mini-cooper-se", [["F56 SE", 2019, null]]);
  set("mini-countryman", [
    ["R60", 2010, 2016],
    ["F60", 2016, null],
  ]);
  set("mini-coupe", [["R58", 2011, 2015]]);
  set("mini-hatchback", [
    ["R50", 2001, 2006],
    ["R56", 2006, 2013],
    ["F55/F56", 2013, 2023],
    ["J01", 2023, null],
  ]);
  set("mini-john-cooper-works", [
    ["R56 JCW", 2008, 2014],
    ["F56 JCW", 2015, null],
  ]);
  set("mini-one", [
    ["R50", 2001, 2006],
    ["R56", 2006, 2013],
    ["F55/F56", 2013, 2023],
  ]);

  set("mitsubishi-3000-gt", [["3000GT", 1990, 2000]]);
  set("mitsubishi-asx", [
    ["I", 2010, 2022],
    ["II", 2022, null],
  ]);
  set("mitsubishi-canter", [["Canter", 1990, null]]);
  set("mitsubishi-canter-fuso", [["Canter Fuso", 1990, null]]);
  set("mitsubishi-carisma", [["Carisma", 1995, 2004]]);
  set("mitsubishi-colt", [
    ["Z30", 2004, 2012],
    ["Later", 2023, null],
  ]);
  set("mitsubishi-cordia", [["Cordia", 1982, 1990]]);
  set("mitsubishi-eclipse", [["Eclipse", 1989, 2011]]);
  set("mitsubishi-eclipse-cross", [["Eclipse Cross", 2017, null]]);
  set("mitsubishi-galant", [["Galant", 1996, 2012]]);
  set("mitsubishi-grandis", [["Grandis", 2003, 2011]]);
  set("mitsubishi-gto", [["GTO", 1990, 2000]]);
  set("mitsubishi-i-miev", [["i-MiEV", 2009, 2021]]);
  set("mitsubishi-l200", [
    ["III–IV", 1996, 2015],
    ["V", 2015, null],
  ]);
  set("mitsubishi-l300", [["L300", 1986, 2010]]);
  set("mitsubishi-lancer", [
    ["CS", 2000, 2007],
    ["CY/CZ", 2007, 2017],
  ]);
  set("mitsubishi-legnum", [["Legnum", 1996, 2002]]);
  set("mitsubishi-outlander", [
    ["I", 2003, 2006],
    ["II", 2006, 2012],
    ["III", 2012, 2021],
    ["IV", 2021, null],
  ]);
  set("mitsubishi-outlander-phev", [
    ["III PHEV", 2013, 2021],
    ["IV PHEV", 2021, null],
  ]);
  set("mitsubishi-pajero", [
    ["II", 1991, 1999],
    ["III", 1999, 2006],
    ["IV", 2006, 2021],
  ]);
  set("mitsubishi-pajero-mini", [["Pajero Mini", 1994, 2012]]);
  set("mitsubishi-pajero-sport", [
    ["I–II", 1996, 2015],
    ["III", 2015, null],
  ]);
  set("mitsubishi-rvr", [["RVR", 1991, 2010]]);
  set("mitsubishi-sapporo", [["Sapporo", 1975, 1990]]);
  set("mitsubishi-sigma", [["Sigma", 1990, 1996]]);
  set("mitsubishi-space-gear", [["Space Gear", 1994, 2007]]);
  set("mitsubishi-space-runner", [["Space Runner", 1991, 2002]]);
  set("mitsubishi-space-star", [
    ["I", 1998, 2005],
    ["II", 2012, null],
  ]);
  set("mitsubishi-space-wagon", [["Space Wagon", 1983, 2004]]);
  set("mitsubishi-tredia", [["Tredia", 1982, 1990]]);
}

function fillNissanOpelPeugeot(set, assign) {
  set("nissan-100nx", [["100NX", 1990, 1996]]);
  set("nissan-200sx", [["S13/S14", 1988, 2000]]);
  set("nissan-300zx", [["Z32", 1989, 2000]]);
  set("nissan-350z", [["Z33", 2002, 2009]]);
  set("nissan-almera", [
    ["N15", 1995, 2000],
    ["N16", 2000, 2006],
  ]);
  set("nissan-almera-tino", [["Tino", 2000, 2006]]);
  set("nissan-altima", [["Altima", 2001, null]]);
  set("nissan-bluebird", [["Bluebird", 1980, 2001]]);
  set("nissan-cedric", [["Cedric", 1960, 2004]]);
  set("nissan-cherry", [["Cherry", 1970, 1986]]);
  set("nissan-cube", [["Cube", 1998, 2019]]);
  set("nissan-elgrand", [["Elgrand", 1997, null]]);
  set("nissan-figaro", [["Figaro", 1991, 1992]]);
  set("nissan-frontier", [["Frontier", 1997, null]]);
  set("nissan-gt-r", [["R35", 2007, null]]);
  set("nissan-interstar", [["Interstar", 2002, 2021]]);
  set("nissan-juke", [
    ["F15", 2010, 2019],
    ["F16", 2019, null],
  ]);
  set("nissan-king-cab", [["King Cab", 1985, 2005]]);
  set("nissan-kubistar", [["Kubistar", 2003, 2009]]);
  set("nissan-laurel", [["Laurel", 1968, 2002]]);
  set("nissan-leaf", [
    ["ZE0", 2010, 2017],
    ["ZE1", 2017, null],
  ]);
  set("nissan-maxima", [["Maxima", 1988, null]]);
  set("nissan-micra", [
    ["K11", 1992, 2002],
    ["K12", 2002, 2010],
    ["K13", 2010, 2016],
    ["K14", 2016, null],
  ]);
  set("nissan-murano", [
    ["Z50", 2003, 2008],
    ["Z51", 2008, 2014],
    ["Z52", 2014, null],
  ]);
  set("nissan-navara", [
    ["D22", 1997, 2004],
    ["D40", 2004, 2015],
    ["D23", 2014, null],
  ]);
  set("nissan-note", [
    ["E11", 2005, 2013],
    ["E12", 2013, 2020],
  ]);
  set("nissan-np300", [["NP300", 2008, 2015]]);
  set("nissan-nv200", [["NV200", 2009, null]]);
  set("nissan-nv300", [["NV300", 2016, 2021]]);
  set("nissan-nv400", [["NV400", 2010, null]]);
  set("nissan-pathfinder", [
    ["R51", 2005, 2012],
    ["R52", 2012, 2021],
    ["R53", 2021, null],
  ]);
  set("nissan-patrol", [
    ["Y61", 1997, 2010],
    ["Y62", 2010, null],
  ]);
  set("nissan-pickup", [["D21/D22", 1985, 2005]]);
  set("nissan-primastar", [["X83", 2002, 2014]]);
  set("nissan-primera", [
    ["P10", 1990, 1996],
    ["P11", 1996, 2002],
    ["P12", 2001, 2007],
  ]);
  set("nissan-pulsar", [["C13", 2014, 2018]]);
  set("nissan-qashqai", [
    ["J10", 2006, 2013],
    ["J11", 2013, 2021],
    ["J12", 2021, null],
  ]);
  set("nissan-serena", [["Serena", 1991, null]]);
  set("nissan-silvia", [["S13–S15", 1988, 2002]]);
  set("nissan-skyline", [["R32–R34", 1989, 2002]]);
  set("nissan-stagea", [["Stagea", 1996, 2007]]);
  set("nissan-sunny", [["Sunny", 1986, 2006]]);
  set("nissan-terrano", [["Terrano", 1986, 2006]]);
  set("nissan-terrano-ii", [["Terrano II", 1993, 2006]]);
  set("nissan-terrano-turbodiesel", [["Terrano TD", 1993, 2006]]);
  set("nissan-tiida", [["C11", 2004, 2012]]);
  set("nissan-urvan", [["E25", 2001, 2012]]);
  set("nissan-vanette", [["Vanette", 1978, 2010]]);
  set("nissan-x-trail", [
    ["T30", 2001, 2007],
    ["T31", 2007, 2013],
    ["T32", 2013, 2021],
    ["T33", 2021, null],
  ]);

  set("opel-adam", [["Adam", 2012, 2019]]);
  set("opel-admiral", [["Admiral", 1964, 1977]]);
  set("opel-agila", [
    ["A", 2000, 2007],
    ["B", 2007, 2014],
  ]);
  set("opel-ampera", [["Ampera", 2011, 2015]]);
  set("opel-antara", [["Antara", 2006, 2015]]);
  set("opel-ascona", [["Ascona C", 1981, 1988]]);
  set("opel-astra", [
    ["F", 1991, 1998],
    ["G", 1998, 2004],
    ["H", 2004, 2009],
    ["J", 2009, 2015],
    ["K", 2015, 2021],
    ["L", 2021, null],
  ]);
  set("opel-calibra", [["Calibra", 1989, 1997]]);
  set("opel-campo", [["Campo", 1988, 2001]]);
  set("opel-combo", [
    ["C", 2001, 2011],
    ["D", 2011, 2018],
    ["E", 2018, null],
  ]);
  set("opel-combo-e", [["Combo-e", 2018, null]]);
  set("opel-commodore", [["Commodore", 1967, 1982]]);
  set("opel-corsa", [
    ["B", 1993, 2000],
    ["C", 2000, 2006],
    ["D", 2006, 2014],
    ["E", 2014, 2019],
    ["F", 2019, null],
  ]);
  set("opel-corsa-e", [["Corsa-e", 2019, null]]);
  set("opel-crossland-x", [["Crossland", 2017, null]]);
  set("opel-frontera", [
    ["A", 1991, 1998],
    ["B", 1998, 2004],
  ]);
  set("opel-grandland", [["Grandland", 2017, null]]);
  set("opel-grandland-x", [["Grandland X", 2017, null]]);
  set("opel-gt", [["GT", 2007, 2009]]);
  set("opel-insignia", [
    ["A", 2008, 2017],
    ["B", 2017, null],
  ]);
  set("opel-kadett", [["Kadett E", 1984, 1991]]);
  set("opel-karl", [["Karl", 2015, 2019]]);
  set("opel-manta", [["Manta B", 1975, 1988]]);
  set("opel-meriva", [
    ["A", 2003, 2010],
    ["B", 2010, 2017],
  ]);
  set("opel-mokka", [
    ["I", 2012, 2019],
    ["II", 2020, null],
  ]);
  set("opel-mokka-e", [["Mokka-e", 2020, null]]);
  set("opel-monterey", [["Monterey", 1992, 1999]]);
  set("opel-monza", [["Monza", 1978, 1986]]);
  set("opel-movano", [
    ["A", 1998, 2010],
    ["B", 2010, 2021],
    ["C", 2021, null],
  ]);
  set("opel-olympia", [["Olympia", 1967, 1970]]);
  set("opel-omega", [
    ["A", 1986, 1993],
    ["B", 1994, 2003],
  ]);
  set("opel-rekord", [["Rekord E", 1977, 1986]]);
  set("opel-senator", [["Senator B", 1987, 1993]]);
  set("opel-signum", [["Signum", 2003, 2008]]);
  set("opel-sintra", [["Sintra", 1996, 1999]]);
  set("opel-speedster", [["Speedster", 2000, 2005]]);
  set("opel-tigra", [
    ["A", 1994, 2001],
    ["B", 2004, 2009],
  ]);
  set("opel-vectra", [
    ["A", 1988, 1995],
    ["B", 1995, 2002],
    ["C", 2002, 2008],
  ]);
  set("opel-vivaro", [
    ["A", 2001, 2014],
    ["B", 2014, 2019],
    ["C", 2019, null],
  ]);
  set("opel-zafira", [
    ["A", 1999, 2005],
    ["B", 2005, 2011],
    ["C", 2011, 2019],
  ]);
  set("opel-zafira-tourer", [["C Tourer", 2011, 2019]]);

  const P208 = [
    ["I", 2012, 2019],
    ["II", 2019, null],
  ];
  set("peugeot-106", [["106", 1991, 2003]]);
  set("peugeot-107", [["107", 2005, 2014]]);
  set("peugeot-108", [["108", 2014, 2021]]);
  set("peugeot-1007", [["1007", 2005, 2009]]);
  set("peugeot-2008", [
    ["I", 2013, 2019],
    ["II", 2019, null],
  ]);
  set("peugeot-205", [["205", 1983, 1998]]);
  set("peugeot-206", [["206", 1998, 2012]]);
  set("peugeot-207", [["207", 2006, 2014]]);
  set("peugeot-208", P208);
  set("peugeot-e-208", [["e-208", 2019, null]]);
  set("peugeot-3008", [
    ["I", 2009, 2016],
    ["II", 2016, null],
  ]);
  set("peugeot-304", [["304", 1969, 1980]]);
  set("peugeot-305", [["305", 1977, 1989]]);
  set("peugeot-306", [["306", 1993, 2002]]);
  set("peugeot-307", [["307", 2001, 2008]]);
  set("peugeot-308", [
    ["I", 2007, 2013],
    ["II", 2013, 2021],
    ["III", 2021, null],
  ]);
  set("peugeot-309", [["309", 1985, 1993]]);
  set("peugeot-4007", [["4007", 2007, 2012]]);
  set("peugeot-403", [["403", 1955, 1966]]);
  set("peugeot-404", [["404", 1960, 1975]]);
  set("peugeot-405", [["405", 1987, 1997]]);
  set("peugeot-406", [["406", 1995, 2004]]);
  set("peugeot-407", [["407", 2004, 2011]]);
  set("peugeot-5008", [
    ["I", 2009, 2016],
    ["II", 2017, null],
  ]);
  set("peugeot-504", [["504", 1968, 1983]]);
  set("peugeot-505", [["505", 1979, 1992]]);
  set("peugeot-508", [
    ["I", 2010, 2018],
    ["II", 2018, null],
  ]);
  set("peugeot-605", [["605", 1989, 1999]]);
  set("peugeot-607", [["607", 1999, 2010]]);
  set("peugeot-806", [["806", 1994, 2002]]);
  set("peugeot-807", [["807", 2002, 2014]]);
  set("peugeot-bipper", [["Bipper", 2008, 2017]]);
  set("peugeot-boxer", [
    ["I", 1994, 2006],
    ["II", 2006, null],
  ]);
  set("peugeot-e-2008", [["e-2008", 2019, null]]);
  set("peugeot-e-expert", [["e-Expert", 2020, null]]);
  set("peugeot-expert", [
    ["I", 1995, 2006],
    ["II", 2007, 2016],
    ["III", 2016, null],
  ]);
  set("peugeot-j-5", [["J5", 1981, 1994]]);
  set("peugeot-partner", [
    ["I", 1996, 2008],
    ["II", 2008, 2018],
    ["III", 2018, null],
  ]);
  set("peugeot-rcz", [["RCZ", 2009, 2015]]);
  set("peugeot-traveller", [["Traveller", 2016, null]]);
}

function fillPolestarPorscheRenaultSeatSkoda(set) {
  set("polestar-1", [["1", 2019, 2021]]);
  set("polestar-2", [["2", 2020, null]]);
  set("polestar-3", [["3", 2024, null]]);
  set("polestar-4", [["4", 2024, null]]);

  set("porsche-718", [["718", 2016, null]]);
  set("porsche-911", [
    ["964", 1989, 1994],
    ["993", 1994, 1998],
    ["996", 1997, 2004],
    ["997", 2004, 2011],
    ["991", 2011, 2019],
    ["992", 2019, null],
  ]);
  set("porsche-924", [["924", 1976, 1988]]);
  set("porsche-928", [["928", 1977, 1995]]);
  set("porsche-944", [["944", 1982, 1991]]);
  set("porsche-968", [["968", 1991, 1995]]);
  set("porsche-boxster", [
    ["986", 1996, 2004],
    ["987", 2004, 2012],
    ["981", 2012, 2016],
    ["718", 2016, null],
  ]);
  set("porsche-cayman", [
    ["987c", 2005, 2012],
    ["981", 2013, 2016],
    ["718", 2016, null],
  ]);
  set("porsche-cayenne", [
    ["9PA", 2002, 2010],
    ["92A", 2010, 2017],
    ["PO536", 2017, null],
  ]);
  set("porsche-macan", [
    ["95B", 2014, 2021],
    ["XAB", 2021, null],
  ]);
  set("porsche-panamera", [
    ["970", 2009, 2016],
    ["971", 2016, null],
  ]);
  set("porsche-taycan", [["Taycan", 2019, null]]);

  set("renault-4", [["4", 1961, 1992]]);
  set("renault-5", [
    ["I", 1972, 1984],
    ["II", 1984, 1996],
    ["III EV", 2024, null],
  ]);
  set("renault-8", [["8", 1962, 1973]]);
  set("renault-9", [["9", 1981, 1988]]);
  set("renault-10", [["10", 1965, 1971]]);
  set("renault-12", [["12", 1969, 1980]]);
  set("renault-16", [["16", 1965, 1980]]);
  set("renault-19", [["19", 1988, 1996]]);
  set("renault-clio", [
    ["I", 1990, 1998],
    ["II", 1998, 2005],
    ["III", 2005, 2012],
    ["IV", 2012, 2019],
    ["V", 2019, null],
  ]);
  set("renault-megane", [
    ["I", 1995, 2002],
    ["II", 2002, 2008],
    ["III", 2008, 2015],
    ["IV", 2015, null],
  ]);
  set("renault-scenic", [
    ["I", 1996, 2003],
    ["II", 2003, 2009],
    ["III", 2009, 2016],
    ["IV", 2016, null],
  ]);
  set("renault-grand-scenic", [
    ["II", 2003, 2009],
    ["III", 2009, 2016],
    ["IV", 2016, null],
  ]);
  set("renault-captur", [
    ["I", 2013, 2019],
    ["II", 2019, null],
  ]);
  set("renault-kadjar", [["Kadjar", 2015, 2022]]);
  set("renault-koleos", [
    ["I", 2008, 2016],
    ["II", 2016, null],
  ]);
  set("renault-arkana", [["Arkana", 2020, null]]);
  set("renault-austral", [["Austral", 2022, null]]);
  set("renault-symbioz", [["Symbioz", 2024, null]]);
  set("renault-talisman", [["Talisman", 2015, 2022]]);
  set("renault-laguna", [
    ["I", 1993, 2000],
    ["II", 2000, 2007],
    ["III", 2007, 2015],
  ]);
  set("renault-espace", [
    ["III", 1996, 2002],
    ["IV", 2002, 2014],
    ["V", 2014, 2023],
    ["VI", 2023, null],
  ]);
  set("renault-grand-espace", [["IV Grand", 2002, 2014]]);
  set("renault-modus", [["Modus", 2004, 2012]]);
  set("renault-grand-modus", [["Grand Modus", 2004, 2012]]);
  set("renault-twingo", [
    ["I", 1993, 2007],
    ["II", 2007, 2014],
    ["III", 2014, null],
  ]);
  set("renault-zoe", [["Zoe", 2012, null]]);
  set("renault-kangoo", [
    ["I", 1997, 2007],
    ["II", 2007, 2020],
    ["III", 2020, null],
  ]);
  set("renault-kangoo-express", [
    ["I", 1997, 2007],
    ["II", 2007, 2020],
    ["III", 2020, null],
  ]);
  set("renault-trafic", [
    ["II", 2001, 2014],
    ["III", 2014, null],
  ]);
  set("renault-trafic-bussi", [["Trafic", 2001, null]]);
  set("renault-master", [
    ["II", 1997, 2010],
    ["III", 2010, null],
  ]);
  set("renault-express", [["Express", 2021, null]]);
  set("renault-safrane", [["Safrane", 1992, 2000]]);
  set("renault-vel-satis", [["Vel Satis", 2001, 2009]]);
  set("renault-fuego", [["Fuego", 1980, 1986]]);
  set("renault-dauphine", [["Dauphine", 1956, 1967]]);
  set("renault-logan", [["Logan", 2004, 2013]]);
  set("renault-mascott", [["Mascott", 1999, 2010]]);

  set("seat-ibiza", [
    ["6K", 1993, 2002],
    ["6L", 2002, 2008],
    ["6J", 2008, 2017],
    ["6F", 2017, null],
  ]);
  set("seat-leon", [
    ["1M", 1999, 2005],
    ["1P", 2005, 2012],
    ["5F", 2012, 2020],
    ["KL", 2020, null],
  ]);
  set("seat-leon-st", [["5F ST", 2013, 2020]]);
  set("seat-leon-sportstourer", [["KL ST", 2020, null]]);
  set("seat-leon-x-perience", [["5F X-Perience", 2014, 2020]]);
  set("seat-ateca", [["Ateca", 2016, null]]);
  set("seat-arona", [["Arona", 2017, null]]);
  set("seat-tarraco", [["Tarraco", 2018, null]]);
  set("seat-alhambra", [
    ["7M", 1996, 2010],
    ["7N", 2010, 2020],
  ]);
  set("seat-altea", [["Altea", 2004, 2015]]);
  set("seat-altea-xl", [["Altea XL", 2006, 2015]]);
  set("seat-altea-freetrack", [["Freetrack", 2007, 2015]]);
  set("seat-toledo", [
    ["1L", 1991, 1999],
    ["1M", 1998, 2004],
    ["5P", 2004, 2009],
    ["KG", 2012, 2019],
  ]);
  set("seat-cordoba", [
    ["6K", 1993, 2002],
    ["6L", 2002, 2009],
  ]);
  set("seat-arosa", [["Arosa", 1997, 2004]]);
  set("seat-mii", [["Mii", 2011, 2021]]);
  set("seat-mii-electric", [["Mii Electric", 2019, 2021]]);
  set("seat-exeo", [["Exeo", 2008, 2013]]);
  set("seat-exeo-st", [["Exeo ST", 2009, 2013]]);
  set("seat-inca", [["Inca", 1995, 2003]]);

  set("skoda-fabia", [
    ["I", 1999, 2007],
    ["II", 2007, 2014],
    ["III", 2014, 2021],
    ["IV", 2021, null],
  ]);
  set("skoda-octavia", [
    ["I", 1996, 2004],
    ["II", 2004, 2012],
    ["III", 2012, 2019],
    ["IV", 2019, null],
  ]);
  set("skoda-superb", [
    ["I", 2001, 2008],
    ["II", 2008, 2015],
    ["III", 2015, null],
  ]);
  set("skoda-rapid", [["Rapid", 2012, 2019]]);
  set("skoda-scala", [["Scala", 2019, null]]);
  set("skoda-kamiq", [["Kamiq", 2019, null]]);
  set("skoda-karoq", [["Karoq", 2017, null]]);
  set("skoda-kodiaq", [["Kodiaq", 2016, null]]);
  set("skoda-enyaq", [["Enyaq", 2020, null]]);
  set("skoda-elroq", [["Elroq", 2024, null]]);
  set("skoda-citigo", [["Citigo", 2011, 2021]]);
  set("skoda-roomster", [["Roomster", 2006, 2015]]);
  set("skoda-yeti", [["Yeti", 2009, 2017]]);
  set("skoda-favorit", [["Favorit", 1987, 1995]]);
  set("skoda-felicia", [["Felicia", 1994, 2001]]);
  set("skoda-forman", [["Forman", 1990, 1995]]);
  set("skoda-1000", [["1000 MB", 1964, 1969]]);
  set("skoda-105", [["105", 1976, 1990]]);
  set("skoda-120", [["120", 1976, 1990]]);
  set("skoda-1200", [["1200", 1952, 1973]]);
  set("skoda-130", [["130", 1984, 1990]]);
  set("skoda-peaq", [["Peaq", 2025, null]]);
}

function fillSmartSubaruSuzukiTesla(set) {
  set("smart-1", [["#1", 2022, null]]);
  set("smart-3", [["#3", 2023, null]]);
  set("smart-5", [["#5", 2025, null]]);
  set("smart-fortwo", [
    ["450", 1998, 2007],
    ["451", 2007, 2014],
    ["453", 2014, null],
  ]);
  set("smart-fortwo-coupe", [
    ["450", 1998, 2007],
    ["451", 2007, 2014],
    ["453", 2014, null],
  ]);
  set("smart-forfour", [
    ["W454", 2004, 2006],
    ["W453", 2014, 2021],
  ]);
  set("smart-roadster", [["Roadster", 2003, 2005]]);
  set("smart-crossblade", [["Crossblade", 2002, 2003]]);
  set("smart-brabus", [["Brabus", 2003, null]]);

  set("subaru-impreza", [
    ["GC/GF", 1992, 2000],
    ["GD", 2000, 2007],
    ["GE/GH", 2007, 2011],
    ["GJ/GP", 2011, 2016],
    ["GT", 2016, null],
  ]);
  set("subaru-legacy", [
    ["BE/BH", 1998, 2003],
    ["BL/BP", 2003, 2009],
    ["BM/BR", 2009, 2014],
    ["BN/BS", 2014, null],
  ]);
  set("subaru-outback", [
    ["BH", 1998, 2003],
    ["BP", 2003, 2009],
    ["BR", 2009, 2014],
    ["BS", 2014, 2020],
    ["BT", 2020, null],
  ]);
  set("subaru-forester", [
    ["SF", 1997, 2002],
    ["SG", 2002, 2008],
    ["SH", 2008, 2012],
    ["SJ", 2012, 2018],
    ["SK", 2018, null],
  ]);
  set("subaru-xv", [
    ["GP", 2011, 2017],
    ["GT", 2017, null],
  ]);
  set("subaru-levorg", [
    ["VM", 2014, 2020],
    ["VN", 2020, null],
  ]);
  set("subaru-brz", [
    ["ZC6", 2012, 2020],
    ["ZD8", 2021, null],
  ]);
  set("subaru-wrx-sti", [
    ["GDB", 2000, 2007],
    ["GRB", 2007, 2014],
    ["VAB", 2014, 2021],
  ]);
  set("subaru-solterra", [["Solterra", 2022, null]]);
  set("subaru-e-outback", [["E-Outback", 2025, null]]);
  set("subaru-justy", [["Justy", 1984, 2011]]);
  set("subaru-leone", [["Leone", 1979, 1994]]);
  set("subaru-svx", [["SVX", 1991, 1996]]);
  set("subaru-tribeca", [["Tribeca", 2005, 2014]]);
  set("subaru-xt", [["XT", 1985, 1991]]);
  set("subaru-1800", [["1800", 1980, 1994]]);
  set("subaru-e12", [["E12", 1980, 1987]]);
  set("subaru-pickup", [["Pickup", 1980, 1994]]);
  set("subaru-targa-pickup", [["Targa Pickup", 1980, 1990]]);
  set("subaru-uncharted", [["Uncharted", 2022, null]]);

  set("suzuki-swift", [
    ["EA/MA", 2005, 2010],
    ["AZ", 2010, 2017],
    ["ZC83", 2017, null],
  ]);
  set("suzuki-vitara", [
    ["ET/TA", 1988, 1998],
    ["LY", 2015, null],
  ]);
  set("suzuki-grand-vitara", [
    ["I", 1998, 2005],
    ["II", 2005, 2014],
  ]);
  set("suzuki-sx4", [["SX4", 2006, 2014]]);
  set("suzuki-sx4-s-cross", [["S-Cross", 2013, null]]);
  set("suzuki-s-cross", [["S-Cross", 2013, null]]);
  set("suzuki-jimny", [
    ["JB", 1998, 2018],
    ["GJ", 2018, null],
  ]);
  set("suzuki-ignis", [
    ["FH", 2000, 2008],
    ["MF", 2016, null],
  ]);
  set("suzuki-baleno", [
    ["EG", 1995, 2002],
    ["EW", 2015, null],
  ]);
  set("suzuki-alto", [["Alto", 1979, null]]);
  set("suzuki-splash", [["Splash", 2008, 2014]]);
  set("suzuki-liana", [["Liana", 2001, 2007]]);
  set("suzuki-samurai", [["Samurai", 1984, 2004]]);
  set("suzuki-sj410", [["SJ410", 1981, 1998]]);
  set("suzuki-sj413", [["SJ413", 1984, 1998]]);
  set("suzuki-carry", [["Carry", 1990, null]]);
  set("suzuki-carry-van", [["Carry Van", 1990, null]]);
  set("suzuki-super-carry", [["Super Carry", 1985, null]]);
  set("suzuki-across", [["Across", 2020, null]]);
  set("suzuki-swace", [["Swace", 2020, null]]);
  set("suzuki-cappuccino", [["Cappuccino", 1991, 1997]]);
  set("suzuki-wagon", [["Wagon R+", 1997, 2008]]);

  set("tesla-model-s", [
    ["MS 2012", 2012, 2016],
    ["MS refresh", 2016, 2021],
    ["Plaid", 2021, null],
  ]);
  set("tesla-model-3", [
    ["2017", 2017, 2023],
    ["Highland", 2023, null],
  ]);
  set("tesla-model-x", [
    ["2015", 2015, 2021],
    ["Plaid", 2021, null],
  ]);
  set("tesla-model-y", [
    ["2019", 2019, 2025],
    ["Juniper", 2025, null],
  ]);
  set("tesla-cybertruck", [["Cybertruck", 2023, null]]);
  set("tesla-roadster", [
    ["I", 2008, 2012],
    ["II", 2025, null],
  ]);
}

function fillToyotaVwVolvoVoyahXpeng(set, assign, byMake) {
  set("toyota-corolla", [
    ["E100", 1991, 1997],
    ["E110", 1997, 2001],
    ["E120", 2001, 2007],
    ["E150", 2006, 2013],
    ["E160/E170", 2013, 2018],
    ["E210", 2018, null],
  ]);
  set("toyota-corolla-cross", [["Corolla Cross", 2020, null]]);
  set("toyota-corolla-verso", [["Corolla Verso", 2001, 2009]]);
  set("toyota-yaris", [
    ["XP10", 1999, 2005],
    ["XP90", 2005, 2011],
    ["XP130", 2011, 2020],
    ["XP210", 2020, null],
  ]);
  set("toyota-yaris-cross", [["Yaris Cross", 2020, null]]);
  set("toyota-yaris-verso", [["Yaris Verso", 1999, 2005]]);
  set("toyota-aygo", [
    ["AB10", 2005, 2014],
    ["AB40", 2014, 2021],
  ]);
  set("toyota-auris", [
    ["E150", 2006, 2012],
    ["E180", 2012, 2018],
  ]);
  set("toyota-avensis", [
    ["T22", 1997, 2002],
    ["T25", 2002, 2008],
    ["T27", 2008, 2018],
  ]);
  set("toyota-avensis-verso", [["Avensis Verso", 2001, 2009]]);
  set("toyota-camry", [
    ["XV40", 2006, 2011],
    ["XV50", 2011, 2017],
    ["XV70", 2017, null],
  ]);
  set("toyota-rav4", [
    ["XA20", 2000, 2005],
    ["XA30", 2005, 2012],
    ["XA40", 2012, 2018],
    ["XA50", 2018, null],
  ]);
  set("toyota-rav4-hybrid", [["XA40/50 Hybrid", 2015, null]]);
  set("toyota-rav4-plug-in", [["XA50 PHEV", 2020, null]]);
  set("toyota-c-hr", [
    ["I", 2016, 2023],
    ["II", 2023, null],
  ]);
  set("toyota-land-cruiser", [
    ["J90/J95", 1996, 2002],
    ["J120", 2002, 2009],
    ["J150", 2009, 2023],
    ["J250", 2023, null],
  ]);
  set("toyota-hilux", [
    ["N70", 2004, 2015],
    ["N80", 2015, null],
  ]);
  set("toyota-hiace", [["H200", 2004, null]]);
  set("toyota-proace", [["Proace", 2013, null]]);
  set("toyota-proace-city", [["Proace City", 2019, null]]);
  set("toyota-proace-city-ev", [["Proace City EV", 2021, null]]);
  set("toyota-proace-verso", [["Proace Verso", 2016, null]]);
  set("toyota-prius", [
    ["XW10", 1997, 2003],
    ["XW20", 2003, 2009],
    ["XW30", 2009, 2015],
    ["XW50", 2015, 2022],
    ["XW60", 2022, null],
  ]);
  set("toyota-prius-phev", [["Prius PHEV", 2012, null]]);
  set("toyota-prius-plug-in-hybrid", [["Prius PHEV", 2012, null]]);
  set("toyota-bz4x", [["bZ4X", 2022, null]]);
  set("toyota-supra", [
    ["A80", 1993, 2002],
    ["A90", 2019, null],
  ]);
  set("toyota-gt86", [["ZN6", 2012, 2020]]);
  set("toyota-gr-yaris", [["GR Yaris", 2020, null]]);
  set("toyota-gr-corolla", [["GR Corolla", 2022, null]]);
  set("toyota-celica", [
    ["T20", 1993, 1999],
    ["T23", 1999, 2006],
  ]);
  set("toyota-mr2", [
    ["W20", 1989, 1999],
    ["W30", 1999, 2007],
  ]);
  set("toyota-starlet", [["P9", 1996, 1999]]);
  set("toyota-verso", [["Verso", 2009, 2018]]);
  set("toyota-verso-s", [["Verso-S", 2010, 2016]]);
  set("toyota-iq", [["iQ", 2008, 2015]]);
  set("toyota-urban-cruiser", [["Urban Cruiser", 2008, 2014]]);
  set("toyota-alphard", [["Alphard", 2002, null]]);
  set("toyota-altezza", [["Altezza", 1998, 2005]]);
  set("toyota-aristo", [["Aristo", 1991, 2005]]);
  set("toyota-bb", [["bB", 2000, 2016]]);
  set("toyota-caldina", [["Caldina", 1992, 2007]]);
  set("toyota-carina", [["Carina", 1970, 2001]]);
  set("toyota-carina-e", [["Carina E", 1992, 1998]]);
  set("toyota-carina-ii", [["Carina II", 1983, 1992]]);
  set("toyota-century", [["Century", 1967, null]]);
  set("toyota-chaser", [["Chaser", 1977, 2001]]);
  set("toyota-corona", [["Corona", 1957, 2001]]);
  set("toyota-cressida", [["Cressida", 1976, 1992]]);
  set("toyota-crown", [["Crown", 1955, null]]);
  set("toyota-dyna", [["Dyna", 1995, null]]);
  set("toyota-fj-cruiser", [["FJ Cruiser", 2006, 2022]]);
  set("toyota-grand-hiace", [["Grand Hiace", 1999, 2002]]);
  set("toyota-granvia", [["Granvia", 1995, null]]);
  set("toyota-highlander", [["Highlander", 2000, null]]);
  set("toyota-mark-x", [["Mark X", 2004, 2019]]);
  set("toyota-markii", [["Mark II", 1968, 2004]]);
  set("toyota-paseo", [["Paseo", 1991, 1999]]);
  set("toyota-picnic", [["Picnic", 1996, 2001]]);
  set("toyota-previa", [["Previa", 1990, 2019]]);
  set("toyota-sienna", [["Sienna", 1997, null]]);
  set("toyota-soarer", [["Soarer", 1981, 2005]]);
  set("toyota-solara", [["Solara", 1998, 2008]]);
  set("toyota-tercel", [["Tercel", 1978, 1999]]);
  set("toyota-timangi", [["Timangi", 1980, 1990]]);
  set("toyota-4runner", [["4Runner", 1984, null]]);

  const GOLF = [
    ["Mk3", 1991, 1997],
    ["Mk4", 1997, 2003],
    ["Mk5", 2003, 2008],
    ["Mk6", 2008, 2012],
    ["Mk7", 2012, 2019],
    ["Mk8", 2019, null],
  ];
  set("volkswagen-golf", GOLF);
  set("volkswagen-golf-gti", GOLF);
  set("volkswagen-golf-r", [
    ["Mk5 R32/R", 2005, 2008],
    ["Mk6 R", 2009, 2013],
    ["Mk7 R", 2013, 2019],
    ["Mk8 R", 2020, null],
  ]);
  set("volkswagen-golf-plus", [["Golf Plus", 2004, 2014]]);
  set("volkswagen-golf-sportsvan", [["Sportsvan", 2014, 2020]]);
  set("volkswagen-polo", [
    ["6N", 1994, 2001],
    ["9N", 2001, 2009],
    ["6R", 2009, 2017],
    ["AW", 2017, null],
  ]);
  set("volkswagen-passat", [
    ["B5", 1996, 2005],
    ["B6", 2005, 2010],
    ["B7", 2010, 2014],
    ["B8", 2014, null],
  ]);
  set("volkswagen-passat-cc", [["CC", 2008, 2016]]);
  set("volkswagen-arteon", [["Arteon", 2017, null]]);
  set("volkswagen-tiguan", [
    ["I", 2007, 2015],
    ["II", 2015, null],
  ]);
  set("volkswagen-tiguan-allspace", [["Allspace", 2017, null]]);
  set("volkswagen-touareg", [
    ["I", 2002, 2010],
    ["II", 2010, 2017],
    ["III", 2017, null],
  ]);
  set("volkswagen-t-roc", [["T-Roc", 2017, null]]);
  set("volkswagen-t-cross", [["T-Cross", 2018, null]]);
  set("volkswagen-taigo", [["Taigo", 2021, null]]);
  set("volkswagen-touran", [
    ["I", 2003, 2015],
    ["II", 2015, null],
  ]);
  set("volkswagen-sharan", [
    ["I", 1995, 2010],
    ["II", 2010, null],
  ]);
  set("volkswagen-caddy", [
    ["II", 1995, 2003],
    ["III", 2003, 2015],
    ["IV", 2015, 2020],
    ["V", 2020, null],
  ]);
  set("volkswagen-caddy-maxi", [["Caddy Maxi", 2007, null]]);
  set("volkswagen-transporter", [
    ["T4", 1990, 2003],
    ["T5", 2003, 2015],
    ["T6/T6.1", 2015, null],
  ]);
  set("volkswagen-caravelle", [
    ["T4", 1990, 2003],
    ["T5", 2003, 2015],
    ["T6", 2015, null],
  ]);
  set("volkswagen-multivan", [
    ["T5", 2003, 2015],
    ["T6", 2015, 2021],
    ["T7", 2021, null],
  ]);
  set("volkswagen-crafter", [
    ["I", 2006, 2016],
    ["II", 2016, null],
  ]);
  set("volkswagen-amarok", [
    ["I", 2009, 2022],
    ["II", 2022, null],
  ]);
  set("volkswagen-id3", [["ID.3", 2020, null]]);
  set("volkswagen-id4", [["ID.4", 2020, null]]);
  set("volkswagen-id5", [["ID.5", 2021, null]]);
  set("volkswagen-id7", [["ID.7", 2023, null]]);
  set("volkswagen-id-buzz", [["ID. Buzz", 2022, null]]);
  set("volkswagen-id-polo", [["ID. Polo", 2025, null]]);
  set("volkswagen-up", [["up!", 2011, null]]);
  set("volkswagen-e-up", [["e-up!", 2013, null]]);
  set("volkswagen-beetle", [
    ["New Beetle", 1997, 2010],
    ["A5", 2011, 2019],
  ]);
  set("volkswagen-new-beetle", [["New Beetle", 1997, 2010]]);
  set("volkswagen-bora", [["Bora", 1998, 2005]]);
  set("volkswagen-jetta", [
    ["Mk4", 1998, 2005],
    ["Mk5/6", 2005, 2018],
  ]);
  set("volkswagen-scirocco", [
    ["III", 2008, 2017],
  ]);
  set("volkswagen-eos", [["Eos", 2006, 2015]]);
  set("volkswagen-cc", [["CC", 2008, 2016]]);
  set("volkswagen-phaeton", [["Phaeton", 2002, 2016]]);
  set("volkswagen-corrado", [["Corrado", 1988, 1995]]);
  set("volkswagen-lupo", [["Lupo", 1998, 2005]]);
  set("volkswagen-fox", [["Fox", 2005, 2011]]);
  set("volkswagen-derby", [["Derby", 1977, 1985]]);
  set("volkswagen-vento", [["Vento", 1992, 1998]]);
  set("volkswagen-taro", [["Taro", 1989, 1997]]);
  set("volkswagen-lt", [["LT", 1975, 2006]]);
  set("volkswagen-karmann-ghia", [["Karmann Ghia", 1955, 1974]]);
  set("volkswagen-kastenwagen", [["Kastenwagen", 1950, 1990]]);
  set("volkswagen-kleinbus", [["Kleinbus", 1950, 1990]]);
  set("volkswagen-kupla", [["Kupla/Beetle", 1945, 2003]]);
  set("volkswagen-country", [["Country", 1980, 1990]]);

  // Volvo
  set("volvo-c30", [["C30", 2006, 2013]]);
  set("volvo-c40", [["C40", 2021, null]]);
  set("volvo-c70", [
    ["I", 1997, 2005],
    ["II", 2005, 2013],
  ]);
  set("volvo-s40", [
    ["I", 1995, 2004],
    ["II", 2004, 2012],
  ]);
  set("volvo-s60", [
    ["I", 2000, 2009],
    ["II", 2010, 2018],
    ["III", 2018, null],
  ]);
  set("volvo-s60-cross-country", [["S60 CC", 2015, 2018]]);
  set("volvo-s70", [["S70", 1996, 2000]]);
  set("volvo-s80", [
    ["I", 1998, 2006],
    ["II", 2006, 2016],
  ]);
  set("volvo-s90", [["S90", 2016, null]]);
  set("volvo-v40", [
    ["I", 1995, 2004],
    ["II", 2012, 2019],
  ]);
  set("volvo-v40-cross-country", [["V40 CC", 2012, 2019]]);
  set("volvo-v50", [["V50", 2004, 2012]]);
  set("volvo-v60", [
    ["I", 2010, 2018],
    ["II", 2018, null],
  ]);
  set("volvo-v60-cross-country", [
    ["I", 2015, 2018],
    ["II", 2018, null],
  ]);
  set("volvo-v70", [
    ["I", 1996, 2000],
    ["II", 2000, 2007],
    ["III", 2007, 2016],
  ]);
  set("volvo-v90", [["V90", 2016, null]]);
  set("volvo-v90-cross-country", [["V90 CC", 2016, null]]);
  set("volvo-xc40", [["XC40", 2017, null]]);
  set("volvo-xc60", [
    ["I", 2008, 2017],
    ["II", 2017, null],
  ]);
  set("volvo-xc70", [
    ["I", 2000, 2007],
    ["II", 2007, 2016],
  ]);
  set("volvo-xc90", [
    ["I", 2002, 2014],
    ["II", 2014, null],
  ]);
  set("volvo-ex30", [["EX30", 2023, null]]);
  set("volvo-ex40", [["EX40", 2024, null]]);
  set("volvo-ex90", [["EX90", 2024, null]]);
  set("volvo-ec40", [["EC40", 2024, null]]);
  set("volvo-em90", [["EM90", 2024, null]]);
  // classic numbers
  for (const [id, code, from, to] of [
    ["volvo-142", "140", 1966, 1974],
    ["volvo-144", "140", 1966, 1974],
    ["volvo-145", "140", 1966, 1974],
    ["volvo-164", "164", 1968, 1975],
    ["volvo-240", "240", 1974, 1993],
    ["volvo-242", "240", 1974, 1984],
    ["volvo-244", "240", 1974, 1993],
    ["volvo-245", "240", 1974, 1993],
    ["volvo-262", "260", 1974, 1982],
    ["volvo-264", "260", 1974, 1982],
    ["volvo-340", "300", 1976, 1991],
    ["volvo-360", "300", 1982, 1991],
    ["volvo-440", "400", 1987, 1996],
    ["volvo-460", "400", 1988, 1996],
    ["volvo-480", "480", 1986, 1995],
    ["volvo-740", "740", 1982, 1992],
    ["volvo-745", "740", 1982, 1992],
    ["volvo-760", "760", 1982, 1990],
    ["volvo-850", "850", 1991, 1996],
    ["volvo-940", "940", 1990, 1998],
    ["volvo-960", "960", 1990, 1998],
    ["volvo-amazon", "Amazon", 1956, 1970],
    ["volvo-duett", "Duett", 1953, 1969],
    ["volvo-p1800", "P1800", 1961, 1973],
    ["volvo-pv", "PV", 1944, 1965],
    ["volvo-c202", "C202", 1977, 1981],
    ["volvo-c303", "C303", 1974, 1984],
    ["volvo-lv-1303", "LV", 1930, 1950],
  ]) {
    set(id, [[code, from, to]]);
  }

  set("voyah-courage", [["Courage", 2023, null]]);
  set("voyah-free", [["Free", 2021, null]]);
  set("voyah-passion", [["Passion", 2023, null]]);

  set("xpeng-g6", [["G6", 2023, null]]);
  set("xpeng-g9", [["G9", 2022, null]]);
  set("xpeng-l03", [["L03", 2025, null]]);
  set("xpeng-new-g6", [["G6 (new)", 2025, null]]);
  set("xpeng-new-g9", [["G9 (new)", 2025, null]]);
  set("xpeng-p7", [["P7", 2020, null]]);
  set("xpeng-x9", [["X9", 2023, null]]);
}
