/**
 * Build full generations.json for every catalog model.
 * Reuses Aion/Audi/BMW/BYD from build_generations_ab.mjs DATA via subprocess merge,
 * then fills C–Z with curated + heuristic rows.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { ALFA_MODELS } from "./alfa_romeo_fi.mjs";
import { CUPRA_MODELS } from "./cupra_fi.mjs";

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

// ——— Cupra (Finnish market) ———
for (const model of CUPRA_MODELS) set(model.id, model.gens);

for (const model of ALFA_MODELS) set(model.id, model.gens);

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
