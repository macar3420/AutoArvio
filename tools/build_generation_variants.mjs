/**
 * Build generation_specs.json from curated brand packs only.
 * No heuristic invention — missing gens get an empty list ("coming soon" in UI).
 *
 * Packs: A (Aion, Audi), BMW, Alfa Romeo, BYD, Cupra, Ford, Honda, Hyundai, Kia, Land Rover, Lexus, Maxus, Mazda, Mercedes-Benz, MG, MINI, Mitsubishi, Nissan, Opel, Polestar, Porsche, Renault, SEAT, Škoda, Tesla, Toyota, Volkswagen, Volvo, smart, Subaru, Voyah, XPeng, Suzuki
 * Combined gearbox strings are split into separate MT vs auto rows.
 *
 * Usage: node tools/build_generation_variants.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { A_BRAND_POWERTRAINS, A_BRAND_MAKE_IDS } from "./a_brand_powertrains.mjs";
import { BMW_BRAND_POWERTRAINS, BMW_BRAND_MAKE_IDS } from "./bmw_brand_powertrains.mjs";
import { ALFA_POWERTRAINS, ALFA_MAKE_IDS } from "./alfa_romeo_powertrains.mjs";
import { BYD_POWERTRAINS, BYD_MAKE_IDS } from "./byd_powertrains.mjs";
import { CUPRA_POWERTRAINS, CUPRA_MAKE_IDS } from "./cupra_powertrains.mjs";
import { FORD_POWERTRAINS, FORD_MAKE_IDS } from "./ford_powertrains.mjs";
import { HONDA_POWERTRAINS, HONDA_MAKE_IDS } from "./honda_powertrains.mjs";
import { HYUNDAI_POWERTRAINS, HYUNDAI_MAKE_IDS } from "./hyundai_powertrains.mjs";
import { KIA_POWERTRAINS, KIA_MAKE_IDS } from "./kia_powertrains.mjs";
import { LANDROVER_POWERTRAINS, LANDROVER_MAKE_IDS } from "./landrover_powertrains.mjs";
import { LEXUS_POWERTRAINS, LEXUS_MAKE_IDS } from "./lexus_powertrains.mjs";
import { MAXUS_POWERTRAINS, MAXUS_MAKE_IDS } from "./maxus_powertrains.mjs";
import { MAZDA_POWERTRAINS, MAZDA_MAKE_IDS } from "./mazda_powertrains.mjs";
import { MERCEDES_POWERTRAINS, MERCEDES_MAKE_IDS } from "./mercedes_powertrains.mjs";
import { MG_POWERTRAINS, MG_MAKE_IDS } from "./mg_powertrains.mjs";
import { MINI_POWERTRAINS, MINI_MAKE_IDS } from "./mini_powertrains.mjs";
import { MITSUBISHI_POWERTRAINS, MITSUBISHI_MAKE_IDS } from "./mitsubishi_powertrains.mjs";
import { NISSAN_POWERTRAINS, NISSAN_MAKE_IDS } from "./nissan_powertrains.mjs";
import { OPEL_POWERTRAINS, OPEL_MAKE_IDS } from "./opel_powertrains.mjs";
import { POLESTAR_POWERTRAINS, POLESTAR_MAKE_IDS } from "./polestar_powertrains.mjs";
import { PORSCHE_POWERTRAINS, PORSCHE_MAKE_IDS } from "./porsche_powertrains.mjs";
import { RENAULT_POWERTRAINS, RENAULT_MAKE_IDS } from "./renault_powertrains.mjs";
import { SEAT_POWERTRAINS, SEAT_MAKE_IDS } from "./seat_powertrains.mjs";
import { SKODA_POWERTRAINS, SKODA_MAKE_IDS } from "./skoda_powertrains.mjs";
import { TESLA_POWERTRAINS, TESLA_MAKE_IDS } from "./tesla_powertrains.mjs";
import { TOYOTA_POWERTRAINS, TOYOTA_MAKE_IDS } from "./toyota_powertrains.mjs";
import { VOLKSWAGEN_POWERTRAINS, VOLKSWAGEN_MAKE_IDS } from "./volkswagen_powertrains.mjs";
import { VOLVO_POWERTRAINS, VOLVO_MAKE_IDS } from "./volvo_powertrains.mjs";
import { SMART_POWERTRAINS, SMART_MAKE_IDS } from "./smart_powertrains.mjs";
import { SUBARU_POWERTRAINS, SUBARU_MAKE_IDS } from "./subaru_powertrains.mjs";
import { VOYAH_POWERTRAINS, VOYAH_MAKE_IDS } from "./voyah_powertrains.mjs";
import { XPENG_POWERTRAINS, XPENG_MAKE_IDS } from "./xpeng_powertrains.mjs";
import { SUZUKI_POWERTRAINS, SUZUKI_MAKE_IDS } from "./suzuki_powertrains.mjs";
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
  ...ALFA_POWERTRAINS,
  ...BYD_POWERTRAINS,
  ...CUPRA_POWERTRAINS,
  ...FORD_POWERTRAINS,
  ...HONDA_POWERTRAINS,
  ...HYUNDAI_POWERTRAINS,
  ...KIA_POWERTRAINS,
  ...LANDROVER_POWERTRAINS,
  ...LEXUS_POWERTRAINS,
  ...MAXUS_POWERTRAINS,
  ...MAZDA_POWERTRAINS,
  ...MERCEDES_POWERTRAINS,
  ...MG_POWERTRAINS,
  ...MINI_POWERTRAINS,
  ...MITSUBISHI_POWERTRAINS,
  ...NISSAN_POWERTRAINS,
  ...OPEL_POWERTRAINS,
  ...POLESTAR_POWERTRAINS,
  ...PORSCHE_POWERTRAINS,
  ...RENAULT_POWERTRAINS,
  ...SEAT_POWERTRAINS,
  ...SKODA_POWERTRAINS,
  ...TESLA_POWERTRAINS,
  ...TOYOTA_POWERTRAINS,
  ...VOLKSWAGEN_POWERTRAINS,
  ...VOLVO_POWERTRAINS,
  ...SMART_POWERTRAINS,
  ...SUBARU_POWERTRAINS,
  ...VOYAH_POWERTRAINS,
  ...XPENG_POWERTRAINS,
  ...SUZUKI_POWERTRAINS,
};

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
    // Curated makes must have rows. BMW may intentionally leave impossible gens empty.
    if (
      A_BRAND_MAKE_IDS.includes(makeId) ||
      ALFA_MAKE_IDS.includes(makeId) ||
      BYD_MAKE_IDS.includes(makeId) ||
      CUPRA_MAKE_IDS.includes(makeId) ||
      FORD_MAKE_IDS.includes(makeId) ||
      HONDA_MAKE_IDS.includes(makeId) ||
      HYUNDAI_MAKE_IDS.includes(makeId) ||
      KIA_MAKE_IDS.includes(makeId) ||
      LANDROVER_MAKE_IDS.includes(makeId) ||
      LEXUS_MAKE_IDS.includes(makeId) ||
      MAXUS_MAKE_IDS.includes(makeId) ||
      MAZDA_MAKE_IDS.includes(makeId) ||
      MERCEDES_MAKE_IDS.includes(makeId) ||
      MG_MAKE_IDS.includes(makeId) ||
      MINI_MAKE_IDS.includes(makeId) ||
      MITSUBISHI_MAKE_IDS.includes(makeId) ||
      NISSAN_MAKE_IDS.includes(makeId) ||
      OPEL_MAKE_IDS.includes(makeId) ||
      POLESTAR_MAKE_IDS.includes(makeId) ||
      PORSCHE_MAKE_IDS.includes(makeId) ||
      RENAULT_MAKE_IDS.includes(makeId) ||
      SEAT_MAKE_IDS.includes(makeId) ||
      SKODA_MAKE_IDS.includes(makeId) ||
      TESLA_MAKE_IDS.includes(makeId) ||
      TOYOTA_MAKE_IDS.includes(makeId) ||
      VOLKSWAGEN_MAKE_IDS.includes(makeId) ||
      VOLVO_MAKE_IDS.includes(makeId) ||
      SMART_MAKE_IDS.includes(makeId) ||
      SUBARU_MAKE_IDS.includes(makeId) ||
      VOYAH_MAKE_IDS.includes(makeId) ||
      XPENG_MAKE_IDS.includes(makeId) ||
      SUZUKI_MAKE_IDS.includes(makeId)
    ) {
      missingRequired.push(gen.id);
    }
  }
}

if (missingRequired.length) {
  console.error("ERROR: required curated generations missing rows:");
  for (const id of missingRequired) console.error(" -", id);
  process.exit(1);
}

const out = {
  note: "Curated European-market engines & versions only. Packs: Aion/Audi + BMW + Alfa Romeo + BYD + Cupra + Ford + Honda + Hyundai + Kia + Land Rover + Lexus + Maxus + Mazda + Mercedes-Benz + MG + MINI + Mitsubishi + Nissan + Opel + Polestar + Porsche + Renault + SEAT + Škoda + Tesla + Toyota + Volkswagen + Volvo + smart + Subaru + Voyah + XPeng + Suzuki. MT vs automatic are separate rows. Other makes empty until curated. tools/build_generation_variants.mjs",
  specs: {},
  variants,
};

const specsNl = fs.readFileSync(outPath, "utf8").includes("\r\n") ? "\r\n" : "\n";
fs.writeFileSync(outPath, JSON.stringify(out, null, 2).replace(/\n/g, specsNl) + specsNl, "utf8");

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
      alfaromeo: statsFor("alfaromeo-"),
      byd: statsFor("byd-"),
      cupra: statsFor("cupra-"),
      ford: statsFor("ford-"),
      honda: statsFor("honda-"),
      hyundai: statsFor("hyundai-"),
      kia: statsFor("kia-"),
      landrover: statsFor("landrover-"),
      lexus: statsFor("lexus-"),
      maxus: statsFor("maxus-"),
      mazda: statsFor("mazda-"),
      mercedes: statsFor("mercedes-"),
      mg: statsFor("mg-"),
      mini: statsFor("mini-"),
      mitsubishi: statsFor("mitsubishi-"),
      nissan: statsFor("nissan-"),
      opel: statsFor("opel-"),
      polestar: statsFor("polestar-"),
      porsche: statsFor("porsche-"),
      renault: statsFor("renault-"),
      seat: statsFor("seat-"),
      skoda: statsFor("skoda-"),
      tesla: statsFor("tesla-"),
      toyota: statsFor("toyota-"),
      volkswagen: statsFor("volkswagen-"),
      volvo: statsFor("volvo-"),
      smart: statsFor("smart-"),
      subaru: statsFor("subaru-"),
      voyah: statsFor("voyah-"),
      xpeng: statsFor("xpeng-"),
      suzuki: statsFor("suzuki-"),
      out: path.relative(root, outPath),
    },
    null,
    2,
  ),
);
