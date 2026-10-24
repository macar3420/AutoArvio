/**
 * Build generation_specs.json from curated brand packs only.
 * No heuristic invention — missing gens get an empty list ("coming soon" in UI).
 *
 * Current pack: A-brands (Aion, Audi) via tools/a_brand_powertrains.mjs
 *
 * Usage: node tools/build_generation_variants.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { A_BRAND_POWERTRAINS, A_BRAND_MAKE_IDS } from "./a_brand_powertrains.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const outPath = path.join(root, "app/src/main/assets/catalog/generation_specs.json");

const gensRoot = JSON.parse(fs.readFileSync(gensPath, "utf8"));

function hpToKw(hp) {
  return Math.round(hp * 0.735);
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function finalize(genId, rows) {
  return rows.map((r, idx) => {
    const powerHp = r.powerHp;
    const powerKw = r.powerKw ?? (powerHp != null ? hpToKw(powerHp) : undefined);
    const id = r.id || `${genId}-${slug(r.name)}-${idx}`;
    const out = {
      id,
      generationId: genId,
      name: r.name,
      powertrain: r.powertrain,
      powerHp,
      powerKw,
      drivetrain: r.drivetrain,
      transmissionSummary: r.transmissionSummary,
    };
    if (r.bodyStyles) out.bodyStyles = r.bodyStyles;
    if (r.consumptionCombinedL != null) out.consumptionCombinedL = r.consumptionCombinedL;
    if (r.consumptionStandard) out.consumptionStandard = r.consumptionStandard;
    if (r.batteryKwh != null) out.batteryKwh = r.batteryKwh;
    if (r.electricRangeKm != null) out.electricRangeKm = r.electricRangeKm;
    if (r.rangeStandard) out.rangeStandard = r.rangeStandard;
    if (r.consumptionCombinedKwh != null) out.consumptionCombinedKwh = r.consumptionCombinedKwh;
    return out;
  });
}

/** Merge curated packs here as letters are completed. */
const CURATED = { ...A_BRAND_POWERTRAINS };

const variants = {};
let curatedGens = 0;
let emptyGens = 0;
let totalRows = 0;
const missingA = [];

for (const gen of gensRoot.generations) {
  const makeId = gen.modelId.split("-")[0];
  const rows = CURATED[gen.id];
  if (rows?.length) {
    variants[gen.id] = finalize(gen.id, rows);
    curatedGens++;
    totalRows += variants[gen.id].length;
  } else {
    variants[gen.id] = [];
    emptyGens++;
    if (A_BRAND_MAKE_IDS.includes(makeId)) missingA.push(gen.id);
  }
}

if (missingA.length) {
  console.error("ERROR: A-brand generations missing curated rows:");
  for (const id of missingA) console.error(" -", id);
  process.exit(1);
}

const out = {
  note: "Curated European-market engines & versions only. A-brands (Aion, Audi) filled; other makes empty until letter packs are curated. tools/build_generation_variants.mjs — no heuristic fill.",
  specs: {},
  variants,
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

const byMake = {};
for (const gen of gensRoot.generations) {
  const makeId = gen.modelId.split("-")[0];
  if (!byMake[makeId]) byMake[makeId] = { models: new Set(), gens: 0, variants: 0 };
  byMake[makeId].models.add(gen.modelId);
  byMake[makeId].gens++;
  byMake[makeId].variants += (variants[gen.id] || []).length;
}

const aStats = {};
for (const m of A_BRAND_MAKE_IDS) {
  const s = byMake[m];
  aStats[m] = {
    models: s.models.size,
    generations: s.gens,
    variants: s.variants,
    avgPerGen: +(s.variants / s.gens).toFixed(2),
  };
}

console.log(
  JSON.stringify(
    {
      generations: gensRoot.generations.length,
      curatedGens,
      emptyGens,
      totalVariants: totalRows,
      aBrandStats: aStats,
      out: path.relative(root, outPath),
    },
    null,
    2,
  ),
);
