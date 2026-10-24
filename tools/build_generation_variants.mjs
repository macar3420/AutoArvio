/**
 * Build generation_specs.json with European-market powertrain variants.
 *
 * Priority:
 * 1. Curated OVERRIDES by generation id (tools/europe_powertrain_overrides.mjs)
 * 2. Model-family curated helpers (Type R, GTI, BEV siblings, …)
 * 3. Conservative EU heuristic (few rows; petrol/diesel labeled correctly; no fantasy turbos on specials)
 *
 * Usage: node tools/build_generation_variants.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERRIDES, modelFamilyOverride } from "./europe_powertrain_overrides.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const outPath = path.join(root, "app/src/main/assets/catalog/generation_specs.json");

const gensRoot = JSON.parse(fs.readFileSync(gensPath, "utf8"));

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hpToKw(hp) {
  return Math.round(hp * 0.735);
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stdFor(yearFrom) {
  return yearFrom >= 2018 ? "WLTP" : "NEDC";
}

/** @typedef {'petrol'|'diesel'|'hybrid'|'phev'|'bev'} Fuel */

/**
 * @param {string} modelId
 * @returns {'bev'|'phev'|'hybrid'|'ice'|'perf'}
 */
function classify(modelId) {
  const m = modelId.toLowerCase();

  if (
    /phev|plug-in|tfsi-e|dm-i|ehybrid|e-hybrid|gte$|xdrive[0-9]*e|300-e|250-e|350-de|330e|530e|225xe|octavia-iv|superb-iv|450h-plus|r-ev|prius-phev|prius-plug|rav4-plug|c-hr-plug|outlander-phev|eclipse-cross-phev|hs-plug|hs-phev|leon-ehybrid|tarraco-ehybrid|kuga-phev|explorer-phev|cayenne-e-hybrid|panamera-e-hybrid|touareg-r|tiguan-ehybrid|golf-gte|passat-gte|polo-gte|3008-hybrid|308-gte|mx-30-r-ev|i8|xc60-recharge|xc90-recharge|v60-recharge/.test(
      m,
    )
  ) {
    return "phev";
  }

  if (
    /e-power|ehev|cr-v-hybrid|rav4-hybrid|2-hybrid|mg3-hybrid|civic-ehev|ioniq$|prius$|insight|swace|across|yaris-cross/.test(
      m,
    ) ||
    (/-hybrid$/.test(m) && !/plug/.test(m))
  ) {
    return "hybrid";
  }

  if (/^smart-(fortwo|forfour|roadster|crossblade|brabus)$/.test(m)) return "ice";

  if (
    /^tesla-/.test(m) ||
    /^polestar-/.test(m) ||
    /^aion-/.test(m) ||
    /^xpeng-/.test(m) ||
    /^voyah-/.test(m) ||
    /^maxus-e-/.test(m) ||
    /^smart-/.test(m) ||
    /^byd-/.test(m) ||
    /e-tron|e-golf|e-up|e-208|e-2008|e-berlingo|e-jumpy|e-scudo|e-expert|e-niro|e-soul|e-deliver|e-ny1|id[0-9]|id-buzz|id-polo|leaf|zoe|ioniq-5|ioniq-6|ioniq-electric|kona-electric|niro-electric|spring|born|enyaq|elroq|tavascan|raval|mg4|marvel|mifa|cybertruck|model-[3sxy]|bmw-i[34578]|bmw-ix|eqa|eqb|eqc|eqe|eqs|eqv|taycan|bz4x|solterra|mustang-mach-e|megane-e-tech|scenic-e-tech|ev[0-9]|pv5|xc40-recharge|volvo-c40|ex30|ex40|ex90|ec40|em90|euniq|eterron|t90-ev|zs-ev|aceman|cooper-se|inster|nexo|capri-ii/.test(
      m,
    )
  ) {
    return "bev";
  }

  if (
    /type-r|integra-type|golf-gti|polo-gti|golf-r|fiesta-st|focus-st|focus-rs|wrx|evolution|bmw-m[2-8]|bmw-1m|amg|rs[3-7]|tt-rs|rs-q|civic-type|gr-yaris|gr-corolla|supra|gt-r|911|cayman|boxster|mx-5|s2000|nsx|brz|ioniq-5-n|formentor-vz/.test(
      m,
    )
  ) {
    return "perf";
  }

  return "ice";
}

function sizeBand(modelId) {
  const m = modelId.toLowerCase();
  if (/van|transporter|sprinter|crafter|ducato|boxer|jumper|master|transit|vivaro|trafic|expert|jumpy|scudo|proace|caddy|berlingo|partner|kangoo|citan|vito|multivan|caravelle|nv[234]|movano|hiace|hilux|ranger|navara|l200|amarok|pickup|canter|cargo|deliver/.test(m)) {
    return "van";
  }
  if (/q[578]|x[567]|xc[679]|touareg|cayenne|gle|gls|discovery|defender|pajero|land-cruiser|patrol|x7|tiguan|rav4|cr-v|forester|outback|cx-5|cx-60|sportage|tucson|kodiaq|macan|glc|ateca|tarraco|karoq|outlander|santa-fe|sorento/.test(m)) {
    return "suv";
  }
  if (/a[678]|5-series|e-class|s-class|s[6789]0|v[679]0|passat|superb|mondeo|insignia|508|camry|accord|panamera|arteon/.test(m)) {
    return "large";
  }
  if (/a[123]|polo|fiesta|corsa|clio|fabia|ibiza|yaris|jazz|i10|i20|micra|sandero|up$|aygo|108|c1|ka$|swift|picanto|500$|panda|golf|focus|astra|308|civic|corolla|megane|ceed|i30|scala|arona|t-roc|t-cross|hr-v/.test(m)) {
    return "small";
  }
  return "mid";
}

/** Diesel was common in EU for this class/era (not for JP performance, not for tiny city cars always). */
function euDieselLikely(modelId, yearFrom, band) {
  if (yearFrom < 1996 || yearFrom > 2022) return false;
  const m = modelId.toLowerCase();
  // Japanese sports / US muscle rarely had EU diesel Type R etc. — handled as perf
  if (/honda|toyota|mazda|subaru|suzuki|lexus|nissan-350|nissan-370|nissan-gt|mitsubishi-lancer|mitsubishi-eclipse/.test(m) && band !== "suv" && band !== "van" && band !== "large" && band !== "mid") {
    return false;
  }
  // Pure petrol model ids
  if (/gti|tsi$|tfsi$|type-r|vtec|turbo-r|amg|m3|m5|s3$|s4$|rs/.test(m)) return false;
  // Diesel-coded models
  if (/tdi|cdi|d$|bluehdi|hdi|tdci|dci|320d|330d|520d|530d|220d|200d|220cdi/.test(m)) return true;
  if (band === "van") return true;
  if (band === "suv" || band === "large" || band === "mid") return yearFrom >= 1998 && yearFrom <= 2020;
  if (band === "small") return yearFrom >= 2000 && yearFrom <= 2018;
  return false;
}

function bodyFor(modelId, band) {
  const m = modelId.toLowerCase();
  if (band === "suv") return "SUV";
  if (band === "van") return "Van";
  if (/avant|touring|sportstourer|wagon/.test(m)) return "Wagon";
  if (/cabrio|convertible|roadster|spider/.test(m)) return "Convertible";
  if (/coupe|tt$|cayman|brz|supra/.test(m)) return "Coupe";
  if (/a4|a6|c-class|3-series|passat|superb|octavia/.test(m)) return "Sedan, Wagon";
  return "Hatchback / Sedan";
}

function finalize(gen, rows) {
  return rows.map((r, idx) => {
    const powerHp = r.powerHp;
    const powerKw = r.powerKw ?? (powerHp != null ? hpToKw(powerHp) : undefined);
    const id = r.id || `${gen.id}-${slug(r.name)}-${idx}`;
    /** @type {Record<string, unknown>} */
    const out = {
      id,
      generationId: gen.id,
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

function heuristicIce(gen) {
  const seed = hash(gen.id);
  const band = sizeBand(gen.modelId);
  const body = bodyFor(gen.modelId, band);
  const std = stdFor(gen.yearFrom);
  const diesel = euDieselLikely(gen.modelId, gen.yearFrom, band);
  const m = gen.modelId.toLowerCase();

  // Model already encodes a specific engine (bmw-320d, mercedes-c-220, …)
  if (/^[a-z]+-[0-9]{3}d$/.test(m) || /-[0-9]{3}d$/.test(m) || /tdi|cdi/.test(m)) {
    const hp = band === "large" || band === "suv" ? 190 : 150;
    return finalize(gen, [
      {
        name: dieselName(gen, hp),
        powertrain: "diesel",
        powerHp: hp,
        drivetrain: band === "suv" ? "FWD / AWD" : "FWD",
        transmissionSummary: gen.yearFrom >= 2015 ? "6MT / 8AT" : "6MT / 6AT",
        bodyStyles: body,
        consumptionCombinedL: round1(std === "WLTP" ? 5.5 : 4.6),
        consumptionStandard: std,
      },
    ]);
  }

  /** @type {object[]} */
  const rows = [];

  // Petrol base
  if (band === "small") {
    rows.push({
      name: gen.yearFrom >= 2012 ? "1.0 / 1.2 TSI" : "1.4",
      powertrain: "petrol",
      powerHp: gen.yearFrom >= 2012 ? 110 : 90,
      drivetrain: "FWD",
      transmissionSummary: gen.yearFrom >= 2015 ? "6MT / DSG" : "5MT / 6MT",
      bodyStyles: body,
      consumptionCombinedL: round1(std === "WLTP" ? 6.0 : 5.4),
      consumptionStandard: std,
    });
    if (gen.yearFrom >= 2005) {
      rows.push({
        name: gen.yearFrom >= 2012 ? "1.4 / 1.5 TSI" : "1.6",
        powertrain: "petrol",
        powerHp: gen.yearFrom >= 2012 ? 150 : 115,
        drivetrain: "FWD",
        transmissionSummary: gen.yearFrom >= 2015 ? "6MT / DSG" : "5MT / 6MT",
        bodyStyles: body,
        consumptionCombinedL: round1(std === "WLTP" ? 6.5 : 5.9),
        consumptionStandard: std,
      });
    }
  } else if (band === "van") {
    rows.push({
      name: "2.0 TDI",
      powertrain: "diesel",
      powerHp: 140,
      drivetrain: "FWD",
      transmissionSummary: "6MT / 6AT",
      bodyStyles: body,
      consumptionCombinedL: round1(std === "WLTP" ? 7.5 : 6.5),
      consumptionStandard: std,
    });
  } else {
    // mid / large / suv
    rows.push({
      name: band === "suv" ? "1.5 / 2.0 TSI" : "1.8 / 2.0 TFSI",
      powertrain: "petrol",
      powerHp: band === "large" ? 190 : 150,
      drivetrain: band === "suv" ? "FWD / AWD" : "FWD",
      transmissionSummary: gen.yearFrom >= 2015 ? "6MT / 7DCT" : "6MT / Multitronic",
      bodyStyles: body,
      consumptionCombinedL: round1(
        (band === "suv" ? 7.0 : 6.4) + (std === "WLTP" ? 1.0 : 0),
      ),
      consumptionStandard: std,
    });
  }

  if (diesel && band !== "van") {
    rows.push({
      name: band === "small" ? "1.6 TDI" : "2.0 TDI",
      powertrain: "diesel",
      powerHp: band === "small" ? 105 : band === "large" || band === "suv" ? 190 : 150,
      drivetrain: band === "suv" ? "FWD / AWD" : "FWD",
      transmissionSummary: gen.yearFrom >= 2015 ? "6MT / DSG" : "6MT",
      bodyStyles: body,
      consumptionCombinedL: round1(
        (band === "small" ? 4.2 : band === "suv" ? 5.6 : 4.8) + (std === "WLTP" ? 1.0 : 0),
      ),
      consumptionStandard: std,
    });
  }

  // Cap at 3; pick stable subset for variety without inventing 6 fantasy engines
  const max = diesel ? 3 : 2;
  const start = seed % Math.max(1, rows.length);
  const chosen = [];
  for (let i = 0; i < Math.min(max, rows.length); i++) {
    chosen.push(rows[(start + i) % rows.length]);
  }
  // de-dupe
  const seen = new Set();
  return finalize(
    gen,
    chosen.filter((r) => {
      const k = r.name + r.powertrain + r.powerHp;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }),
  );
}

function dieselName(gen, hpVal) {
  const m = gen.modelId.toLowerCase();
  if (/bmw/.test(m)) return `${(m.match(/bmw-([0-9]{3}d?)/) || [])[1]?.toUpperCase() || "Diesel"} ${hpVal}`;
  if (/tdi/.test(m) || /audi|volkswagen|seat|skoda/.test(m)) return `2.0 TDI ${hpVal}`;
  if (/cdi|mercedes/.test(m)) return `CDI ${hpVal}`;
  return `Diesel ${hpVal}`;
}

function heuristicBev(gen) {
  const std = stdFor(gen.yearFrom);
  return finalize(gen, [
    {
      name: "Electric",
      powertrain: "bev",
      powerHp: gen.yearFrom >= 2020 ? 204 : 136,
      drivetrain: "FWD / RWD",
      transmissionSummary: "1-speed",
      bodyStyles: bodyFor(gen.modelId, sizeBand(gen.modelId)),
      batteryKwh: gen.yearFrom >= 2020 ? 58 : 40,
      electricRangeKm: std === "WLTP" ? 380 : 300,
      rangeStandard: std,
      consumptionCombinedKwh: 15.5,
      consumptionStandard: std,
    },
  ]);
}

function heuristicPhev(gen) {
  const std = stdFor(gen.yearFrom);
  return finalize(gen, [
    {
      name: "Plug-in Hybrid",
      powertrain: "phev",
      powerHp: sizeBand(gen.modelId) === "suv" ? 245 : 204,
      drivetrain: "FWD / AWD",
      transmissionSummary: "6DCT / 8AT",
      bodyStyles: bodyFor(gen.modelId, sizeBand(gen.modelId)),
      consumptionCombinedL: std === "WLTP" ? 1.6 : 1.9,
      consumptionStandard: std,
      batteryKwh: 13,
      electricRangeKm: std === "WLTP" ? 50 : 45,
      rangeStandard: std,
    },
  ]);
}

function heuristicHybrid(gen) {
  const std = stdFor(gen.yearFrom);
  return finalize(gen, [
    {
      name: "Hybrid",
      powertrain: "hybrid",
      powerHp: sizeBand(gen.modelId) === "suv" ? 218 : 122,
      drivetrain: sizeBand(gen.modelId) === "suv" ? "AWD" : "FWD",
      transmissionSummary: "e-CVT",
      bodyStyles: bodyFor(gen.modelId, sizeBand(gen.modelId)),
      consumptionCombinedL: std === "WLTP" ? 5.0 : 4.0,
      consumptionStandard: std,
    },
  ]);
}

function heuristicPerf(gen) {
  // Single petrol row only — never invent diesel/multi-turbo fantasy
  const std = stdFor(gen.yearFrom);
  const hpVal =
    gen.yearFrom >= 2015 ? 300 : gen.yearFrom >= 2005 ? 250 : gen.yearFrom >= 1995 ? 200 : 160;
  return finalize(gen, [
    {
      name: gen.yearFrom >= 2015 ? "2.0 Turbo" : "2.0 petrol",
      powertrain: "petrol",
      powerHp: hpVal,
      drivetrain: /quattro|xdrive|4matic|awd|golf-r|wrx|evolution/.test(gen.modelId)
        ? "AWD"
        : "FWD / RWD",
      transmissionSummary: gen.yearFrom >= 2015 ? "6MT / DCT" : "6MT",
      bodyStyles: bodyFor(gen.modelId, "small"),
      consumptionCombinedL: std === "WLTP" ? 8.5 : 8.0,
      consumptionStandard: std,
    },
  ]);
}

function variantsForGen(gen) {
  if (OVERRIDES[gen.id]) {
    return finalize(gen, OVERRIDES[gen.id]);
  }
  const family = modelFamilyOverride(gen);
  if (family?.length) {
    return finalize(gen, family);
  }
  const kind = classify(gen.modelId);
  if (kind === "bev") return heuristicBev(gen);
  if (kind === "phev") return heuristicPhev(gen);
  if (kind === "hybrid") return heuristicHybrid(gen);
  if (kind === "perf") return heuristicPerf(gen);
  return heuristicIce(gen);
}

// ——— Build ———
const variants = {};
let curated = 0;
let family = 0;
let heuristic = 0;
let total = 0;

for (const gen of gensRoot.generations) {
  let source = "heuristic";
  if (OVERRIDES[gen.id]) source = "curated";
  else if (modelFamilyOverride(gen)?.length) source = "family";

  const rows = variantsForGen(gen);
  if (!rows.length) {
    variants[gen.id] = finalize(gen, [
      {
        name: "Petrol",
        powertrain: "petrol",
        powerHp: 110,
        drivetrain: "FWD",
        transmissionSummary: "5MT / 6AT",
        bodyStyles: "Sedan",
        consumptionCombinedL: 6.5,
        consumptionStandard: stdFor(gen.yearFrom),
      },
    ]);
  } else {
    variants[gen.id] = rows;
  }

  if (source === "curated") curated++;
  else if (source === "family") family++;
  else heuristic++;
  total += variants[gen.id].length;
}

const out = {
  note: "European-market engines & versions. Curated overrides in tools/europe_powertrain_overrides.mjs; remainder is a conservative heuristic (petrol/diesel labeled per row). Regenerated by tools/build_generation_variants.mjs.",
  specs: {},
  variants,
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

const wrongIce = Object.values(variants)
  .flat()
  .filter((v) => v.powertrain === "ice").length;

console.log(
  JSON.stringify(
    {
      generations: gensRoot.generations.length,
      gensWithVariants: Object.keys(variants).length,
      totalVariants: total,
      avg: +(total / gensRoot.generations.length).toFixed(2),
      sources: { curatedGens: curated, familyGens: family, heuristicGens: heuristic },
      leftoverIceLabel: wrongIce,
      out: path.relative(root, outPath),
    },
    null,
    2,
  ),
);
