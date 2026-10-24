/**
 * Build generation_specs.json from curated brand packs only.
 * No heuristic invention — missing gens get an empty list ("coming soon" in UI).
 *
 * Packs: A (Aion, Audi), BMW
 * Combined gearbox strings are split into separate MT vs auto rows.
 *
 * Usage: node tools/build_generation_variants.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { A_BRAND_POWERTRAINS, A_BRAND_MAKE_IDS } from "./a_brand_powertrains.mjs";
import { BMW_BRAND_POWERTRAINS, BMW_BRAND_MAKE_IDS } from "./bmw_brand_powertrains.mjs";
import { splitGearboxRows } from "./split_gearbox_rows.mjs";

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
    const id =
      r.id ||
      `${genId}-${slug(r.name)}-${slug(r.transmissionSummary || "na")}-${idx}`;
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

const CURATED = {
  ...A_BRAND_POWERTRAINS,
  ...BMW_BRAND_POWERTRAINS,
};

const REQUIRED_MAKES = [...A_BRAND_MAKE_IDS, ...BMW_BRAND_MAKE_IDS];

const variants = {};
let curatedGens = 0;
let emptyGens = 0;
let totalRows = 0;
let audiBeforeSplit = 0;
let audiAfterSplit = 0;
const missingRequired = [];

for (const gen of gensRoot.generations) {
  const makeId = gen.modelId.split("-")[0];
  let rows = CURATED[gen.id];
  if (rows?.length) {
    if (makeId === "audi") audiBeforeSplit += rows.length;
    rows = splitGearboxRows(rows);
    if (makeId === "audi") audiAfterSplit += rows.length;
    variants[gen.id] = finalize(gen.id, rows);
    curatedGens++;
    totalRows += variants[gen.id].length;
  } else {
    variants[gen.id] = [];
    emptyGens++;
    // A-brands must be fully curated; BMW may intentionally leave impossible gens empty
    if (A_BRAND_MAKE_IDS.includes(makeId)) missingRequired.push(gen.id);
  }
}

if (missingRequired.length) {
  console.error("ERROR: required curated generations missing rows:");
  for (const id of missingRequired) console.error(" -", id);
  process.exit(1);
}

const out = {
  note: "Curated European-market engines & versions only. Packs: Aion/Audi + BMW. MT vs automatic are separate rows. Other makes empty until curated. tools/build_generation_variants.mjs",
  specs: {},
  variants,
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

function statsFor(prefix) {
  const gens = gensRoot.generations.filter((g) => g.modelId.startsWith(prefix));
  const models = new Set(gens.map((g) => g.modelId));
  let v = 0;
  let withRows = 0;
  for (const g of gens) {
    const n = (variants[g.id] || []).length;
    v += n;
    if (n) withRows++;
  }
  return {
    models: models.size,
    generations: gens.length,
    gensWithVariants: withRows,
    gensEmpty: gens.length - withRows,
    variants: v,
    avgPerFilledGen: withRows ? +(v / withRows).toFixed(2) : 0,
  };
}

console.log(
  JSON.stringify(
    {
      generations: gensRoot.generations.length,
      curatedGens,
      emptyGens,
      totalVariants: totalRows,
      audiSplit: {
        rowsBeforeSplit: audiBeforeSplit,
        rowsAfterSplit: audiAfterSplit,
        rowsAddedBySplit: audiAfterSplit - audiBeforeSplit,
      },
      aion: statsFor("aion-"),
      audi: statsFor("audi-"),
      bmw: statsFor("bmw-"),
      out: path.relative(root, outPath),
    },
    null,
    2,
  ),
);
