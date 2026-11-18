/**
 * Curated + patterned generations for catalog makes C–Z.
 * fillRest(set, assign, models) mutates via set/assign.
 */
import { SIBLING_GENS } from "./generations_siblings_data.mjs";
import { FORD_MODELS } from "./ford_fi.mjs";
import { HONDA_MODELS } from "./honda_fi.mjs";
import { HYUNDAI_MODELS } from "./hyundai_fi.mjs";
import { KIA_MODELS } from "./kia_fi.mjs";
import { LANDROVER_MODELS } from "./landrover_fi.mjs";
import { LEXUS_MODELS } from "./lexus_fi.mjs";
import { MAXUS_MODELS } from "./maxus_fi.mjs";
import { MAZDA_MODELS } from "./mazda_fi.mjs";
import { MERCEDES_MODELS } from "./mercedes_fi.mjs";

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

  // ——— Ford (current Finnish lineup) ———
  for (const model of FORD_MODELS) set(model.id, model.gens);

  // ——— Honda (common Finnish lineup) ———
  for (const model of HONDA_MODELS) set(model.id, model.gens);

  fillHyundaiKia(set);
  fillLandRoverLexusMaxusMazda(set, assign);
  fillMercedes(set);
  fillMgMiniMitsubishi(set);
  fillNissanOpel(set, assign);
  fillPolestarPorscheRenaultSeatSkoda(set);
  fillSmartSubaruSuzukiTesla(set);
  fillToyotaVwVolvoVoyahXpeng(set, assign, byMake);

  // EV / PHEV / performance siblings (must survive full rebuilds)
  for (const [id, rows] of Object.entries(SIBLING_GENS)) {
    set(id, rows);
  }
}

function fillHyundaiKia(set) {
  for (const model of HYUNDAI_MODELS) set(model.id, model.gens);

  for (const model of KIA_MODELS) set(model.id, model.gens);
}

function fillLandRoverLexusMaxusMazda(set, assign) {
  for (const model of LANDROVER_MODELS) set(model.id, model.gens);

  for (const model of LEXUS_MODELS) set(model.id, model.gens);

  for (const model of MAXUS_MODELS) set(model.id, model.gens);

  for (const model of MAZDA_MODELS) set(model.id, model.gens);
}

function fillMercedes(set) {
  for (const model of MERCEDES_MODELS) set(model.id, model.gens);
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

function fillNissanOpel(set, assign) {
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
