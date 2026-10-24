/**
 * Build full generations.json for every catalog model.
 * Reuses Aion/Audi/BMW/BYD from build_generations_ab.mjs DATA via subprocess merge,
 * then fills C–Z with curated + heuristic rows.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLACEHOLDER = "generation_placeholder";
const outPath = path.join(root, "app/src/main/assets/catalog/generations.json");

const g = (modelId, code, yearFrom, yearTo = null) => ({
  id: `${modelId}-${String(code).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  modelId,
  code,
  yearFrom,
  yearTo,
  imageAsset: PLACEHOLDER,
});
const gens = (modelId, rows) => rows.map(([code, from, to]) => g(modelId, code, from, to ?? null));

// Rebuild AB first so JSON has those 171 models
spawnSync(process.execPath, [path.join(root, "tools/build_generations_ab.mjs")], {
  stdio: "inherit",
  cwd: root,
});

const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
const covered = new Set(existing.generations.map((x) => x.modelId));
const models = JSON.parse(fs.readFileSync(path.join(root, "tools/all_models.json"), "utf8"));

/** @type {Record<string, [string, number, number|null][]>} */
const DATA = {};

const set = (id, rows) => {
  DATA[id] = rows;
};
const assign = (ids, rows) => {
  for (const id of ids) set(id, rows);
};

// ——— Shared chassis libraries ———
const CITROEN_C3 = [
  ["I", 2002, 2009],
  ["II", 2009, 2016],
  ["III", 2016, null],
];
const CITROEN_C4 = [
  ["I", 2004, 2010],
  ["II", 2010, 2018],
  ["III", 2020, null],
];
const CITROEN_C5 = [
  ["I", 2001, 2008],
  ["II", 2008, 2017],
];
const BERLINGO = [
  ["M49", 1996, 2008],
  ["B9", 2008, 2018],
  ["K9", 2018, null],
];

// ——— Citroën ———
set("citroen-ax", [["AX", 1986, 1998]]);
set("citroen-b11", [["B11", 1935, 1958]]);
set("citroen-berlingo", BERLINGO);
set("citroen-berlingo-van", BERLINGO);
set("citroen-bx", [["BX", 1982, 1994]]);
set("citroen-bx-van", [["BX Van", 1982, 1994]]);
set("citroen-c-crosser", [["C-Crosser", 2007, 2012]]);
set("citroen-c-zero", [["C-Zero", 2010, 2019]]);
set("citroen-c1", [
  ["I", 2005, 2014],
  ["II", 2014, 2022],
]);
set("citroen-c2", [["C2", 2003, 2009]]);
set("citroen-c25", [["C25", 1981, 1993]]);
set("citroen-c3", CITROEN_C3);
set("citroen-c3-aircross", [
  ["I", 2017, 2024],
  ["II", 2024, null],
]);
set("citroen-c3-picasso", [["C3 Picasso", 2008, 2017]]);
set("citroen-c3-pluriel", [["Pluriel", 2003, 2010]]);
set("citroen-c4", CITROEN_C4);
set("citroen-c4-aircross", [["C4 Aircross", 2012, 2017]]);
set("citroen-c4-cactus", [["C4 Cactus", 2014, 2020]]);
set("citroen-c4-picasso", [
  ["I", 2006, 2013],
  ["II", 2013, 2018],
]);
set("citroen-c5", CITROEN_C5);
set("citroen-c5-aircross", [["C5 Aircross", 2018, null]]);
set("citroen-c5-x", [["C5 X", 2021, null]]);
set("citroen-c6", [["C6", 2005, 2012]]);
set("citroen-c8", [["C8", 2002, 2014]]);
set("citroen-camionette", [["Camionette", 1950, 1980]]);
set("citroen-cx", [["CX", 1974, 1991]]);
set("citroen-d-super", [["D Super", 1967, 1975]]);
set("citroen-ds", [["DS", 1955, 1975]]);
set("citroen-ds3", [["DS3", 2009, 2019]]);
set("citroen-ds4", [["DS4", 2011, 2018]]);
set("citroen-ds5", [["DS5", 2011, 2018]]);
set("citroen-dyane", [["Dyane", 1967, 1983]]);
set("citroen-e-berlingo", [["ë-Berlingo", 2021, null]]);
set("citroen-e-c3-aircross", [["ë-C3 Aircross", 2024, null]]);
set("citroen-e-c4", [["ë-C4", 2020, null]]);
set("citroen-e-jumpy", [["ë-Jumpy", 2020, null]]);
set("citroen-evasion", [["Evasion", 1994, 2002]]);
set("citroen-grand-c4-picasso", [
  ["I", 2006, 2013],
  ["II", 2013, 2018],
]);
set("citroen-gs", [["GS", 1970, 1986]]);
set("citroen-gsa", [["GSA", 1979, 1986]]);
set("citroen-jumper", [
  ["I", 1994, 2006],
  ["II", 2006, null],
]);
set("citroen-jumper-fourgon", [
  ["I", 1994, 2006],
  ["II", 2006, null],
]);
set("citroen-jumpy", [
  ["I", 1995, 2007],
  ["II", 2007, 2016],
  ["III", 2016, null],
]);
set("citroen-nemo", [["Nemo", 2008, 2017]]);
set("citroen-saxo", [["Saxo", 1996, 2003]]);
set("citroen-visa", [["Visa", 1978, 1988]]);
set("citroen-xantia", [["Xantia", 1993, 2001]]);
set("citroen-xm", [["XM", 1989, 2000]]);
set("citroen-xsara", [["Xsara", 1997, 2006]]);
set("citroen-xsara-picasso", [["Xsara Picasso", 1999, 2010]]);
set("citroen-zx", [["ZX", 1991, 1998]]);

// ——— Cupra ———
set("cupra-ateca", [["Ateca", 2018, null]]);
set("cupra-born", [["Born", 2021, null]]);
set("cupra-formentor", [["Formentor", 2020, null]]);
set("cupra-leon", [["Leon", 2020, null]]);
set("cupra-leon-sportstourer", [["Leon ST", 2020, null]]);
set("cupra-raval", [["Raval", 2025, null]]);
set("cupra-tavascan", [["Tavascan", 2024, null]]);
set("cupra-terramar", [["Terramar", 2024, null]]);

// ——— Dacia ———
set("dacia-bigster", [["Bigster", 2025, null]]);
set("dacia-dokker", [["Dokker", 2012, 2021]]);
set("dacia-dokker-van", [["Dokker Van", 2012, 2021]]);
set("dacia-duster", [
  ["I", 2010, 2017],
  ["II", 2017, 2024],
  ["III", 2024, null],
]);
set("dacia-jogger", [["Jogger", 2021, null]]);
set("dacia-lodgy", [["Lodgy", 2012, 2022]]);
set("dacia-logan", [
  ["I", 2004, 2012],
  ["II", 2012, 2020],
  ["III", 2020, null],
]);
set("dacia-logan-mcv", [
  ["I", 2006, 2013],
  ["II", 2013, 2020],
]);
set("dacia-logan-pick-up", [["Pick-up", 2008, 2012]]);
set("dacia-logan-van", [["Van", 2006, 2012]]);
set("dacia-sandero", [
  ["I", 2008, 2012],
  ["II", 2012, 2020],
  ["III", 2020, null],
]);
set("dacia-sandero-stepway", [
  ["II", 2012, 2020],
  ["III", 2020, null],
]);
set("dacia-spring", [["Spring", 2021, null]]);

// Import rest modules (large makes)
const { fillRest } = await import("./generations_rest_fill.mjs");
fillRest(set, assign, models);

// Apply DATA onto missing models; fallback for anything still open
const added = [];
const skipped = [];
for (const model of models) {
  if (covered.has(model.id)) continue;
  let rows = DATA[model.id];
  if (!rows || !rows.length) {
    const from = model.from || 2000;
    rows = [[model.name, from, model.to]];
    skipped.push({ id: model.id, reason: "heuristic single-gen fallback" });
  }
  added.push(...gens(model.id, rows));
}

const generations = [...existing.generations, ...added];
const seen = new Set();
for (const row of generations) {
  let id = row.id;
  let n = 2;
  while (seen.has(id)) id = `${row.id}-${n++}`;
  row.id = id;
  seen.add(id);
}

// Coverage check
const allIds = new Set(models.map((m) => m.id));
const genModels = new Set(generations.map((g) => g.modelId));
const stillMissing = [...allIds].filter((id) => !genModels.has(id));
if (stillMissing.length) {
  console.error("STILL_MISSING", stillMissing.slice(0, 50), "count", stillMissing.length);
  process.exit(1);
}

const byMake = {};
for (const m of models) {
  byMake[m.makeId] ??= { models: 0, gens: 0 };
  byMake[m.makeId].models += 1;
}
for (const gRow of generations) {
  const makeId = models.find((m) => m.id === gRow.modelId)?.makeId || gRow.modelId.split("-")[0];
  byMake[makeId] ??= { models: 0, gens: 0 };
  byMake[makeId].gens += 1;
}

const out = {
  note: "Full FI catalog generations. imageAsset = shared placeholder until matching photo set.",
  market: "FI",
  generations,
};
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "tools/generations_fallback_log.json"),
  JSON.stringify({ fallbackCount: skipped.length, sample: skipped.slice(0, 80) }, null, 2),
);
console.log(
  JSON.stringify(
    {
      totalModels: models.length,
      totalGens: generations.length,
      newlyAddedModels: added.length ? new Set(added.map((a) => a.modelId)).size : 0,
      fallbackModels: skipped.length,
      byMake,
    },
    null,
    2,
  ),
);
console.log("Wrote", outPath);
