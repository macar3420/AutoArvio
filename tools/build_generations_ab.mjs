/**
 * Build generations.json for Audi + A-makes + BMW + BYD.
 * Shared placeholder imageAsset for all rows.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BYD_MODELS } from "./byd_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLACEHOLDER = "generation_placeholder";

const g = (modelId, code, yearFrom, yearTo = null) => ({
  id: `${modelId}-${String(code).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  modelId,
  code,
  yearFrom,
  yearTo,
  imageAsset: PLACEHOLDER,
});

const gens = (modelId, rows) => rows.map(([code, from, to]) => g(modelId, code, from, to ?? null));

/** @type {Record<string, [string, number, number|null][]>} */
const DATA = {};

// —— Aion ——
DATA["aion-ut"] = [["UT", 2022, null]];
DATA["aion-v"] = [
  ["V (1st)", 2020, 2024],
  ["V (2nd)", 2024, null],
];

// —— Audi ——
DATA["audi-a1"] = [
  ["8X", 2010, 2018],
  ["GB", 2018, null],
];
DATA["audi-a2"] = [["8Z", 1999, 2005]];
DATA["audi-a3"] = [
  ["8L", 1996, 2003],
  ["8P", 2003, 2013],
  ["8V", 2012, 2020],
  ["8Y", 2020, null],
];
DATA["audi-a4"] = [
  ["B5", 1994, 2001],
  ["B6", 2000, 2006],
  ["B7", 2004, 2008],
  ["B8", 2007, 2015],
  ["B9", 2015, null],
];
DATA["audi-a4-allroad"] = [
  ["B6/B7", 2000, 2008],
  ["B8", 2009, 2016],
  ["B9", 2016, null],
];
DATA["audi-a5"] = [
  ["8T", 2007, 2016],
  ["F5", 2016, null],
];
DATA["audi-a5-sportback"] = [
  ["8TA", 2009, 2016],
  ["F5", 2016, null],
];
DATA["audi-a6"] = [
  ["C4", 1994, 1997],
  ["C5", 1997, 2004],
  ["C6", 2004, 2011],
  ["C7", 2011, 2018],
  ["C8", 2018, null],
];
DATA["audi-a6-allroad"] = [
  ["C5", 2000, 2005],
  ["C6", 2006, 2011],
  ["C7", 2012, 2018],
  ["C8", 2019, null],
];
DATA["audi-a6-e-tron"] = [["C8 e-tron", 2024, null]];
DATA["audi-a7"] = [
  ["4G", 2010, 2018],
  ["4K", 2018, null],
];
DATA["audi-a8"] = [
  ["D2", 1994, 2002],
  ["D3", 2002, 2009],
  ["D4", 2010, 2017],
  ["D5", 2017, null],
];
DATA["audi-cabriolet"] = [["Typ 8G", 1991, 2000]];
DATA["audi-coupe"] = [
  ["B2", 1980, 1988],
  ["B3", 1988, 1996],
];
DATA["audi-e-tron"] = [["GEN1", 2018, 2022]];
DATA["audi-e-tron-gt"] = [["FW", 2021, null]];
DATA["audi-q2"] = [["GA", 2016, null]];
DATA["audi-q3"] = [
  ["8U", 2011, 2018],
  ["F3", 2018, null],
];
DATA["audi-q4-e-tron"] = [["F4", 2021, null]];
DATA["audi-q5"] = [
  ["8R", 2008, 2017],
  ["FY", 2017, null],
];
DATA["audi-q5-sportback"] = [["FY", 2019, null]];
DATA["audi-q7"] = [
  ["4L", 2005, 2015],
  ["4M", 2015, null],
];
DATA["audi-q8"] = [["4M", 2018, null]];
DATA["audi-q8-e-tron"] = [["GE", 2023, null]];
DATA["audi-quattro"] = [["Ur-Quattro", 1980, 1991]];
DATA["audi-r8"] = [
  ["Typ 42", 2006, 2015],
  ["4S", 2015, 2023],
];
DATA["audi-rs-e-tron-gt"] = [["FW", 2021, null]];
DATA["audi-rs-q3"] = [
  ["8U", 2013, 2018],
  ["F3", 2019, null],
];
DATA["audi-rs-q8"] = [["4M", 2019, null]];
DATA["audi-rs3"] = [
  ["8P", 2011, 2012],
  ["8V", 2015, 2020],
  ["8Y", 2021, null],
];
DATA["audi-rs4"] = [
  ["B5", 2000, 2001],
  ["B7", 2006, 2008],
  ["B8", 2012, 2015],
  ["B9", 2017, null],
];
DATA["audi-rs5"] = [
  ["8T", 2010, 2015],
  ["F5", 2017, null],
];
DATA["audi-rs6"] = [
  ["C5", 2002, 2004],
  ["C6", 2008, 2010],
  ["C7", 2013, 2018],
  ["C8", 2019, null],
];
DATA["audi-rs7"] = [
  ["4G", 2013, 2018],
  ["4K", 2019, null],
];
DATA["audi-s2"] = [["S2", 1991, 1995]];
DATA["audi-s3"] = [
  ["8L", 1999, 2003],
  ["8P", 2006, 2013],
  ["8V", 2013, 2020],
  ["8Y", 2020, null],
];
DATA["audi-s4"] = [
  ["B5", 1997, 2002],
  ["B6/B7", 2003, 2008],
  ["B8", 2008, 2016],
  ["B9", 2016, null],
];
DATA["audi-s5"] = [
  ["8T", 2007, 2016],
  ["F5", 2016, null],
];
DATA["audi-s6"] = [
  ["C4", 1994, 1997],
  ["C5", 1999, 2003],
  ["C6", 2006, 2011],
  ["C7", 2012, 2018],
  ["C8", 2019, null],
];
DATA["audi-s7"] = [
  ["4G", 2012, 2018],
  ["4K", 2019, null],
];
DATA["audi-s8"] = [
  ["D2", 1996, 2002],
  ["D3", 2006, 2009],
  ["D4", 2012, 2017],
  ["D5", 2019, null],
];
DATA["audi-sq2"] = [["GA", 2018, null]];
DATA["audi-sq5"] = [
  ["8R", 2013, 2017],
  ["FY", 2017, null],
];
DATA["audi-sq5-sportback"] = [["FY", 2020, null]];
DATA["audi-sq7"] = [["4M", 2016, null]];
DATA["audi-sq8"] = [["4M", 2019, null]];
DATA["audi-tt"] = [
  ["8N", 1998, 2006],
  ["8J", 2006, 2014],
  ["8S", 2014, 2023],
];
DATA["audi-tt-rs"] = [
  ["8J", 2009, 2014],
  ["8S", 2015, 2023],
];
DATA["audi-tts"] = [
  ["8J", 2008, 2014],
  ["8S", 2014, 2023],
];
DATA["audi-v8"] = [["D11", 1988, 1994]];

// —— BMW shared chassis libraries ——
const BMW_1 = [
  ["E81/E87", 2004, 2011],
  ["F20/F21", 2011, 2019],
  ["F40", 2019, null],
];
const BMW_2_COUPE = [
  ["F22/F23", 2014, 2021],
  ["G42", 2021, null],
];
const BMW_2_ACTIVE = [
  ["F45/F46", 2014, 2021],
  ["U06", 2021, null],
];
const BMW_3 = [
  ["E36", 1990, 2000],
  ["E46", 1998, 2006],
  ["E90/E91/E92", 2005, 2013],
  ["F30/F31", 2011, 2019],
  ["G20/G21", 2018, null],
];
const BMW_3_GT = [["F34", 2013, 2020]];
const BMW_4 = [
  ["F32/F33/F36", 2013, 2020],
  ["G22/G23/G26", 2020, null],
];
const BMW_5 = [
  ["E34", 1988, 1996],
  ["E39", 1995, 2003],
  ["E60/E61", 2003, 2010],
  ["F10/F11", 2010, 2017],
  ["G30/G31", 2016, 2023],
  ["G60/G61", 2023, null],
];
const BMW_5_GT = [["F07", 2009, 2017]];
const BMW_6 = [
  ["E63/E64", 2003, 2010],
  ["F06/F12/F13", 2011, 2018],
  ["G32", 2017, 2023],
];
const BMW_7 = [
  ["E32", 1986, 1994],
  ["E38", 1994, 2001],
  ["E65/E66", 2001, 2008],
  ["F01/F02", 2008, 2015],
  ["G11/G12", 2015, 2022],
  ["G70", 2022, null],
];
const BMW_8 = [
  ["E31", 1989, 1999],
  ["G14/G15/G16", 2018, null],
];
const BMW_X1 = [
  ["E84", 2009, 2015],
  ["F48", 2015, 2022],
  ["U11", 2022, null],
];
const BMW_X2 = [
  ["F39", 2018, 2023],
  ["U10", 2023, null],
];
const BMW_X3 = [
  ["E83", 2003, 2010],
  ["F25", 2010, 2017],
  ["G01", 2017, null],
];
const BMW_X4 = [
  ["F26", 2014, 2018],
  ["G02", 2018, null],
];
const BMW_X5 = [
  ["E53", 1999, 2006],
  ["E70", 2006, 2013],
  ["F15", 2013, 2018],
  ["G05", 2018, null],
];
const BMW_X6 = [
  ["E71", 2008, 2014],
  ["F16", 2014, 2019],
  ["G06", 2019, null],
];
const BMW_X7 = [["G07", 2019, null]];
const BMW_Z3 = [["E36/7", 1995, 2002]];
const BMW_Z4 = [
  ["E85/E86", 2002, 2008],
  ["E89", 2009, 2016],
  ["G29", 2018, null],
];
const BMW_M2 = [
  ["F87", 2015, 2021],
  ["G87", 2022, null],
];
const BMW_M3 = [
  ["E36", 1992, 1999],
  ["E46", 2000, 2006],
  ["E90/E92", 2007, 2013],
  ["F80", 2014, 2018],
  ["G80", 2020, null],
];
const BMW_M4 = [
  ["F82/F83", 2014, 2020],
  ["G82/G83", 2020, null],
];
const BMW_M5 = [
  ["E34", 1988, 1995],
  ["E39", 1998, 2003],
  ["E60", 2005, 2010],
  ["F10", 2011, 2016],
  ["F90", 2017, 2023],
  ["G90", 2024, null],
];
const BMW_M6 = [
  ["E63/E64", 2005, 2010],
  ["F06/F12/F13", 2012, 2018],
];
const BMW_M8 = [["F91/F92/F93", 2019, null]];

const bmwAssign = (ids, rows) => {
  for (const id of ids) DATA[id] = rows;
};

bmwAssign(
  ["bmw-114", "bmw-116", "bmw-118", "bmw-120", "bmw-123", "bmw-125", "bmw-130", "bmw-135", "bmw-m135i"],
  BMW_1,
);
DATA["bmw-1m"] = [["E82 1M", 2011, 2012]];

bmwAssign(["bmw-216", "bmw-218", "bmw-220", "bmw-225", "bmw-230", "bmw-m235i", "bmw-m240i"], BMW_2_COUPE);
// Active Tourer / Gran Tourer lean F45 — keep coupe line for engine badges in catalog
bmwAssign(["bmw-m2"], BMW_M2);

bmwAssign(
  [
    "bmw-315",
    "bmw-316",
    "bmw-318",
    "bmw-318is",
    "bmw-320",
    "bmw-320d",
    "bmw-320is",
    "bmw-323",
    "bmw-324",
    "bmw-325",
    "bmw-328",
    "bmw-330",
    "bmw-335",
    "bmw-340",
  ],
  BMW_3,
);
// PHEV siblings — only chassis that offered the eDrive model in EU
DATA["bmw-330e"] = [
  ["F30/F31 LCI", 2016, 2019],
  ["G20/G21", 2019, null],
];
DATA["bmw-m340i"] = [["G20/G21", 2019, null]];
bmwAssign(["bmw-318-gran-turismo", "bmw-320-gran-turismo"], BMW_3_GT);
bmwAssign(["bmw-m3"], BMW_M3);

bmwAssign(["bmw-418", "bmw-420", "bmw-428", "bmw-430", "bmw-435", "bmw-m440i"], BMW_4);
bmwAssign(["bmw-m4"], BMW_M4);

bmwAssign(
  [
    "bmw-518",
    "bmw-520",
    "bmw-523",
    "bmw-525",
    "bmw-528",
    "bmw-530",
    "bmw-535",
    "bmw-540",
    "bmw-545",
    "bmw-550",
    "bmw-m550d",
  ],
  BMW_5,
);
DATA["bmw-530e"] = [
  ["G30/G31", 2017, 2023],
  ["G60/G61", 2023, null],
];
DATA["bmw-530-gran-turismo"] = BMW_5_GT;
bmwAssign(["bmw-m5"], BMW_M5);
DATA["bmw-m535i"] = [["E28/E34 M535i", 1980, 1988]];

bmwAssign(["bmw-628", "bmw-630", "bmw-633", "bmw-635", "bmw-645", "bmw-650"], BMW_6);
bmwAssign(["bmw-m6"], BMW_M6);

bmwAssign(["bmw-725", "bmw-728", "bmw-730", "bmw-735", "bmw-740", "bmw-745", "bmw-750", "bmw-760"], BMW_7);

bmwAssign(["bmw-840", "bmw-850", "bmw-m850i"], BMW_8);
bmwAssign(["bmw-m8"], BMW_M8);

DATA["bmw-2500"] = [["E3", 1968, 1977]];
DATA["bmw-30"] = [["E3 3.0", 1971, 1977]];

DATA["bmw-i3"] = [["I01", 2013, 2022]];
DATA["bmw-i3s"] = [["I01 s", 2017, 2022]];
DATA["bmw-i4"] = [["G26", 2021, null]];
DATA["bmw-i4-m50"] = [["G26 M50", 2021, null]];
DATA["bmw-i5"] = [["G60", 2023, null]];
DATA["bmw-i7"] = [["G70", 2022, null]];
DATA["bmw-i8"] = [["I12/I15", 2014, 2020]];
DATA["bmw-ix"] = [["I20", 2021, null]];
DATA["bmw-ix1"] = [["U11", 2022, null]];
DATA["bmw-ix2"] = [["U10", 2024, null]];
DATA["bmw-ix3"] = [["G08", 2020, null]];

bmwAssign(["bmw-x1"], BMW_X1);
bmwAssign(["bmw-x2"], BMW_X2);
bmwAssign(["bmw-x3"], BMW_X3);
bmwAssign(["bmw-x3-m"], [
  ["F97", 2019, 2021],
  ["F97 LCI", 2021, null],
]);
bmwAssign(["bmw-x4"], BMW_X4);
bmwAssign(["bmw-x4-m"], [["F98", 2019, null]]);
bmwAssign(["bmw-x5"], BMW_X5);
bmwAssign(["bmw-x5-m"], [
  ["E70 M", 2009, 2013],
  ["F85", 2015, 2018],
  ["F95", 2019, null],
]);
bmwAssign(["bmw-x6"], BMW_X6);
bmwAssign(["bmw-x6-m"], [
  ["E71 M", 2009, 2014],
  ["F86", 2015, 2019],
  ["F96", 2020, null],
]);
bmwAssign(["bmw-x7"], BMW_X7);
DATA["bmw-xm"] = [["G09", 2022, null]];
bmwAssign(["bmw-z3"], BMW_Z3);
DATA["bmw-z3m"] = [["E36/7 M", 1999, 2002]];
bmwAssign(["bmw-z4"], BMW_Z4);
DATA["bmw-z4m"] = [["E85/E86 M", 2006, 2008]];

// —— BYD (Finnish market) ——
for (const model of BYD_MODELS) DATA[model.id] = model.gens;

// Validate against catalog model ids
const kt = fs.readFileSync(
  path.join(root, "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt"),
  "utf8",
);
const catalogIds = new Set(
  [...kt.matchAll(/m\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g)]
    .filter((m) => ["aion", "audi", "bmw", "byd"].includes(m[2]))
    .map((m) => m[1]),
);

const missing = [...catalogIds].filter((id) => !DATA[id]);
const extra = Object.keys(DATA).filter((id) => !catalogIds.has(id));
if (missing.length || extra.length) {
  console.error("MISSING", missing);
  console.error("EXTRA", extra);
  process.exit(1);
}

const generations = [];
for (const modelId of [...catalogIds].sort()) {
  generations.push(...gens(modelId, DATA[modelId]));
}

// Deduplicate ids if any collision
const seen = new Set();
for (const row of generations) {
  let id = row.id;
  let n = 2;
  while (seen.has(id)) {
    id = `${row.id}-${n++}`;
  }
  row.id = id;
  seen.add(id);
}

const out = {
  note: "Generations for Aion, Audi, BMW, BYD. imageAsset = shared placeholder until matching photo set.",
  market: "FI",
  generations,
};

const outPath = path.join(root, "app/src/main/assets/catalog/generations.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

const byMake = {};
for (const id of catalogIds) {
  const make = id.split("-")[0];
  byMake[make] = byMake[make] || { models: 0, gens: 0 };
  byMake[make].models += 1;
  byMake[make].gens += DATA[id].length;
}
console.log(JSON.stringify({ totalModels: catalogIds.size, totalGens: generations.length, byMake }, null, 2));
console.log("Wrote", outPath);
