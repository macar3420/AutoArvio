/**
 * Add EV / PHEV / performance sibling models to CatalogRepository + fi_catalog.json
 * and append generations for them.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLACEHOLDER = "generation_placeholder";

/** @type {{ id: string, makeId: string, name: string, yearFrom?: number, yearTo?: number|null, gens: [string, number, number|null][] }[]} */
const SIBLINGS = [
  // —— Volkswagen ——
  {
    id: "volkswagen-e-golf",
    makeId: "volkswagen",
    name: "e-Golf",
    yearFrom: 2014,
    yearTo: 2020,
    gens: [["e-Golf", 2014, 2020]],
  },
  {
    id: "volkswagen-golf-gte",
    makeId: "volkswagen",
    name: "Golf GTE",
    yearFrom: 2014,
    gens: [
      ["Mk7 GTE", 2014, 2020],
      ["Mk8 GTE", 2020, null],
    ],
  },
  {
    id: "volkswagen-passat-gte",
    makeId: "volkswagen",
    name: "Passat GTE",
    yearFrom: 2015,
    gens: [
      ["B8 GTE", 2015, 2023],
    ],
  },
  {
    id: "volkswagen-polo-gti",
    makeId: "volkswagen",
    name: "Polo GTI",
    yearFrom: 1998,
    gens: [
      ["6N GTI", 1998, 2001],
      ["9N GTI", 2005, 2009],
      ["6R GTI", 2010, 2017],
      ["AW GTI", 2018, null],
    ],
  },
  {
    id: "volkswagen-polo-gte",
    makeId: "volkswagen",
    name: "Polo GTE",
    yearFrom: 2014,
    yearTo: 2018,
    gens: [["6C GTE", 2014, 2018]],
  },
  {
    id: "volkswagen-tiguan-ehybrid",
    makeId: "volkswagen",
    name: "Tiguan eHybrid",
    yearFrom: 2020,
    gens: [["II eHybrid", 2020, null]],
  },
  {
    id: "volkswagen-touareg-r",
    makeId: "volkswagen",
    name: "Touareg R",
    yearFrom: 2020,
    gens: [["III R", 2020, null]],
  },

  // —— Audi ——
  {
    id: "audi-a3-sportback",
    makeId: "audi",
    name: "A3 Sportback",
    yearFrom: 2004,
    gens: [
      ["8P", 2004, 2013],
      ["8V", 2012, 2020],
      ["8Y", 2020, null],
    ],
  },
  {
    id: "audi-a3-e-tron",
    makeId: "audi",
    name: "A3 Sportback e-tron",
    yearFrom: 2014,
    yearTo: 2020,
    gens: [["8V e-tron", 2014, 2020]],
  },
  {
    id: "audi-a3-tfsi-e",
    makeId: "audi",
    name: "A3 TFSI e",
    yearFrom: 2020,
    gens: [["8Y TFSI e", 2020, null]],
  },
  {
    id: "audi-q3-tfsi-e",
    makeId: "audi",
    name: "Q3 TFSI e",
    yearFrom: 2020,
    gens: [["F3 TFSI e", 2020, null]],
  },
  {
    id: "audi-q5-tfsi-e",
    makeId: "audi",
    name: "Q5 TFSI e",
    yearFrom: 2019,
    gens: [["FY TFSI e", 2019, null]],
  },
  {
    id: "audi-a6-tfsi-e",
    makeId: "audi",
    name: "A6 TFSI e",
    yearFrom: 2019,
    gens: [["C8 TFSI e", 2019, null]],
  },
  {
    id: "audi-a7-tfsi-e",
    makeId: "audi",
    name: "A7 TFSI e",
    yearFrom: 2019,
    gens: [["4K TFSI e", 2019, null]],
  },
  {
    id: "audi-q7-tfsi-e",
    makeId: "audi",
    name: "Q7 TFSI e",
    yearFrom: 2019,
    gens: [["4M TFSI e", 2019, null]],
  },
  {
    id: "audi-q8-tfsi-e",
    makeId: "audi",
    name: "Q8 TFSI e",
    yearFrom: 2020,
    gens: [["4M TFSI e", 2020, null]],
  },

  // —— Škoda ——
  {
    id: "skoda-octavia-iv",
    makeId: "skoda",
    name: "Octavia iV",
    yearFrom: 2020,
    gens: [["IV iV", 2020, null]],
  },
  {
    id: "skoda-superb-iv",
    makeId: "skoda",
    name: "Superb iV",
    yearFrom: 2019,
    gens: [["III iV", 2019, null]],
  },
  {
    id: "skoda-enyaq-coupe",
    makeId: "skoda",
    name: "Enyaq Coupé",
    yearFrom: 2022,
    gens: [["Enyaq Coupé", 2022, null]],
  },

  // —— SEAT ——
  {
    id: "seat-leon-ehybrid",
    makeId: "seat",
    name: "Leon e-Hybrid",
    yearFrom: 2020,
    gens: [["KL e-Hybrid", 2020, null]],
  },
  {
    id: "seat-tarraco-ehybrid",
    makeId: "seat",
    name: "Tarraco e-Hybrid",
    yearFrom: 2021,
    gens: [["Tarraco e-Hybrid", 2021, null]],
  },

  // —— Cupra (perf already separate brand; add PHEV siblings) ——
  {
    id: "cupra-formentor-vz",
    makeId: "cupra",
    name: "Formentor VZ",
    yearFrom: 2020,
    gens: [
      ["Formentor VZ", 2020, 2024],
      ["Formentor VZ FL", 2024, null],
    ],
  },
  {
    id: "cupra-leon-ehybrid",
    makeId: "cupra",
    name: "Leon e-Hybrid",
    yearFrom: 2020,
    gens: [
      ["Leon e-Hybrid", 2020, 2024],
      ["Leon e-Hybrid FL", 2024, null],
    ],
  },

  // —— BMW PHEV badges commonly listed separately ——
  {
    id: "bmw-225xe",
    makeId: "bmw",
    name: "225xe",
    yearFrom: 2016,
    gens: [
      ["F45", 2016, 2021],
      ["U06", 2021, null],
    ],
  },
  {
    id: "bmw-x5-xdrive45e",
    makeId: "bmw",
    name: "X5 xDrive45e",
    yearFrom: 2019,
    gens: [["G05", 2019, null]],
  },
  {
    id: "bmw-x3-xdrive30e",
    makeId: "bmw",
    name: "X3 xDrive30e",
    yearFrom: 2019,
    gens: [["G01", 2019, null]],
  },
  {
    id: "bmw-x1-xdrive25e",
    makeId: "bmw",
    name: "X1 xDrive25e",
    yearFrom: 2019,
    gens: [
      ["F48", 2019, 2022],
      ["U11", 2022, null],
    ],
  },

  // —— Volvo Recharge / Twin Engine marketed names ——
  {
    id: "volvo-xc40-recharge",
    makeId: "volvo",
    name: "XC40 Recharge",
    yearFrom: 2020,
    gens: [["XC40 Recharge", 2020, null]],
  },
  {
    id: "volvo-xc60-recharge",
    makeId: "volvo",
    name: "XC60 Recharge",
    yearFrom: 2017,
    gens: [["II Recharge", 2017, null]],
  },
  {
    id: "volvo-xc90-recharge",
    makeId: "volvo",
    name: "XC90 Recharge",
    yearFrom: 2015,
    gens: [["II Recharge", 2015, null]],
  },
  {
    id: "volvo-v60-recharge",
    makeId: "volvo",
    name: "V60 Recharge",
    yearFrom: 2018,
    gens: [["II Recharge", 2018, null]],
  },

  // —— Opel ——
  {
    id: "opel-grandland-gse",
    makeId: "opel",
    name: "Grandland GSe",
    yearFrom: 2022,
    gens: [["GSe", 2022, null]],
  },
  {
    id: "opel-astra-gse",
    makeId: "opel",
    name: "Astra GSe",
    yearFrom: 2022,
    gens: [["L GSe", 2022, null]],
  },

  // —— Renault ——
  {
    id: "renault-megane-e-tech",
    makeId: "renault",
    name: "Megane E-Tech",
    yearFrom: 2021,
    gens: [["Megane E-Tech", 2021, null]],
  },
  {
    id: "renault-rafale",
    makeId: "renault",
    name: "Rafale",
    yearFrom: 2024,
    gens: [["Rafale", 2024, null]],
  },
  {
    id: "renault-scenic-e-tech",
    makeId: "renault",
    name: "Scenic E-Tech",
    yearFrom: 2023,
    gens: [["Scenic E-Tech", 2023, null]],
  },

  // —— Porsche ——
  {
    id: "porsche-cayenne-e-hybrid",
    makeId: "porsche",
    name: "Cayenne E-Hybrid",
    yearFrom: 2010,
    gens: [
      ["92A E-Hybrid", 2010, 2017],
      ["PO536 E-Hybrid", 2017, null],
    ],
  },
  {
    id: "porsche-panamera-e-hybrid",
    makeId: "porsche",
    name: "Panamera E-Hybrid",
    yearFrom: 2011,
    gens: [
      ["970 E-Hybrid", 2011, 2016],
      ["971 E-Hybrid", 2016, null],
    ],
  },

  // —— Mini ——
  {
    id: "mini-cooper-se-countryman",
    makeId: "mini",
    name: "Countryman SE ALL4",
    yearFrom: 2017,
    gens: [["F60 PHEV", 2017, null]],
  },

  // —— Mitsubishi ——
  {
    id: "mitsubishi-eclipse-cross-phev",
    makeId: "mitsubishi",
    name: "Eclipse Cross PHEV",
    yearFrom: 2021,
    gens: [["Eclipse Cross PHEV", 2021, null]],
  },

  // —— Nissan ——
  {
    id: "nissan-qashqai-e-power",
    makeId: "nissan",
    name: "Qashqai e-POWER",
    yearFrom: 2021,
    gens: [["J12 e-POWER", 2021, null]],
  },
  {
    id: "nissan-x-trail-e-power",
    makeId: "nissan",
    name: "X-Trail e-POWER",
    yearFrom: 2022,
    gens: [["T33 e-POWER", 2022, null]],
  },

  // —— Toyota: only clearly separate EV / GR already; add bZ sibling already have ——
  {
    id: "toyota-c-hr-plug-in",
    makeId: "toyota",
    name: "C-HR Plug-in",
    yearFrom: 2023,
    gens: [["II PHEV", 2023, null]],
  },

  // —— Jeep-like not in catalog; MG ——
  {
    id: "mg-hs-plug-in",
    makeId: "mg",
    name: "HS Plug-in",
    yearFrom: 2020,
    gens: [["HS PHEV", 2020, null]],
  },
];

// ——— Patch CatalogRepository.kt ———
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);
let kt = fs.readFileSync(ktPath, "utf8");
const existingIds = new Set([...kt.matchAll(/m\(\s*"([^"]+)"/g)].map((m) => m[1]));
const added = [];
const skipped = [];

for (const s of SIBLINGS) {
  if (existingIds.has(s.id)) {
    skipped.push({ id: s.id, reason: "already present" });
    continue;
  }
  const years =
    s.yearFrom != null
      ? s.yearTo != null
        ? `, ${s.yearFrom}, ${s.yearTo}`
        : `, ${s.yearFrom}`
      : "";
  const line = `        m("${s.id}", "${s.makeId}", "${s.name}"${years}),`;
  // Insert after last model of same makeId
  const makeRe = new RegExp(
    `m\\(\\s*"${s.makeId}-[^"]+"\\s*,\\s*"${s.makeId}"[\\s\\S]*?(?=\\n\\s*m\\(\\s*"[a-z]+-)`,
  );
  // Find last occurrence of this make's m( entries
  const allMake = [
    ...kt.matchAll(
      new RegExp(
        `^\\s*m\\("${s.makeId}-[^"]+",\\s*"${s.makeId}",[^\\n]+\\),\\s*$`,
        "gm",
      ),
    ),
  ];
  if (!allMake.length) {
    skipped.push({ id: s.id, reason: `no make block ${s.makeId}` });
    continue;
  }
  const last = allMake[allMake.length - 1];
  const insertAt = last.index + last[0].length;
  kt = kt.slice(0, insertAt) + "\n" + line + kt.slice(insertAt);
  existingIds.add(s.id);
  added.push(s);
}

fs.writeFileSync(ktPath, kt);

// ——— Patch fi_catalog.json ———
const jsonPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const catalog = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const jsonIds = new Set(catalog.models.map((m) => m.id));
for (const s of added) {
  if (jsonIds.has(s.id)) continue;
  const row = { id: s.id, makeId: s.makeId, name: s.name };
  if (s.yearFrom != null) row.yearFrom = s.yearFrom;
  if (s.yearTo != null) row.yearTo = s.yearTo;
  // insert after last same make
  let lastIdx = -1;
  for (let i = 0; i < catalog.models.length; i++) {
    if (catalog.models[i].makeId === s.makeId) lastIdx = i;
  }
  if (lastIdx >= 0) catalog.models.splice(lastIdx + 1, 0, row);
  else catalog.models.push(row);
  jsonIds.add(s.id);
}
fs.writeFileSync(jsonPath, JSON.stringify(catalog, null, 4) + "\n");

// ——— Append generations ———
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const gensDoc = JSON.parse(fs.readFileSync(gensPath, "utf8"));
const genModelIds = new Set(gensDoc.generations.map((g) => g.modelId));
const gRow = (modelId, code, yearFrom, yearTo) => ({
  id: `${modelId}-${String(code).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  modelId,
  code,
  yearFrom,
  yearTo,
  imageAsset: PLACEHOLDER,
});
const seenGenIds = new Set(gensDoc.generations.map((g) => g.id));
let genAdded = 0;
for (const s of added) {
  if (genModelIds.has(s.id)) continue;
  for (const [code, from, to] of s.gens) {
    let id = gRow(s.id, code, from, to ?? null).id;
    let n = 2;
    while (seenGenIds.has(id)) id = `${id}-${n++}`;
    const row = gRow(s.id, code, from, to ?? null);
    row.id = id;
    gensDoc.generations.push(row);
    seenGenIds.add(id);
    genAdded++;
  }
  genModelIds.add(s.id);
}
gensDoc.note =
  "Full FI catalog generations + EV/PHEV/performance siblings. Shared placeholder imageAsset.";
fs.writeFileSync(gensPath, JSON.stringify(gensDoc, null, 2) + "\n");

// Summary
const byMake = {};
for (const s of added) {
  byMake[s.makeId] ??= [];
  byMake[s.makeId].push(s.name);
}
console.log(
  JSON.stringify(
    {
      addedCount: added.length,
      genRowsAdded: genAdded,
      skipped,
      byMake,
      golfFamily: added.filter((s) => /golf|e-golf|passat-gte|polo/i.test(s.id)).map((s) => s.name),
      a3Family: added.filter((s) => /a3|q5-tfsi|a6-tfsi|a7-tfsi|q3-tfsi|q7-tfsi|q8-tfsi/i.test(s.id)).map((s) => s.name),
    },
    null,
    2,
  ),
);
