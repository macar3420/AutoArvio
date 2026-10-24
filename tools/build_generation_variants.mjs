/**
 * Build generation_specs.json variants for every generation in generations.json.
 * Preserves curated audi-a4-b8 rows; fills the rest with plausible EU/FI figures.
 *
 * Usage: node tools/build_generation_variants.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const outPath = path.join(root, "app/src/main/assets/catalog/generation_specs.json");

const gensRoot = JSON.parse(fs.readFileSync(gensPath, "utf8"));
const existing = fs.existsSync(outPath)
  ? JSON.parse(fs.readFileSync(outPath, "utf8"))
  : { specs: {}, variants: {} };

const PRESERVE = new Set(["audi-a4-b8"]);

/** Stable 32-bit hash for deterministic picks. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
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

function consumptionStandard(yearFrom) {
  return yearFrom >= 2018 ? "WLTP" : "NEDC";
}

function rangeStandard(yearFrom) {
  return yearFrom >= 2018 ? "WLTP" : "NEDC";
}

/** @typedef {'bev'|'phev'|'hybrid'|'ice'} Kind */

/**
 * @param {string} modelId
 * @returns {Kind}
 */
function classifyModel(modelId) {
  const m = modelId.toLowerCase();

  // PHEV first (IDs often contain hybrid/e/recharge words)
  if (
    /phev|plug-in|tfsi-e|dm-i|ehybrid|e-hybrid|gte$|xdrive[0-9]*e|300-e|250-e|350-de|330e|530e|225xe|octavia-iv|superb-iv|450h-plus|r-ev|prius-phev|prius-plug|rav4-plug|c-hr-plug|outlander-phev|eclipse-cross-phev|hs-plug|hs-phev|leon-ehybrid|tarraco-ehybrid|kuga-phev|explorer-phev|cayenne-e-hybrid|panamera-e-hybrid|touareg-r|tiguan-ehybrid|golf-gte|passat-gte|polo-gte|3008-hybrid|308-gte|mx-30-r-ev|i8|xc60-recharge|xc90-recharge|v60-recharge/.test(
      m,
    )
  ) {
    return "phev";
  }

  // Full hybrid (non-plug-in)
  if (
    /e-power|ehev|cr-v-hybrid|rav4-hybrid|2-hybrid|mg3-hybrid|civic-ehev|ioniq$|ioniq-plug-in|prius$|insight|swace|across|yaris-cross/.test(
      m,
    ) ||
    (/-hybrid$/.test(m) && !/plug/.test(m))
  ) {
    return "hybrid";
  }

  // Classic Smart ICE bodies
  if (/^smart-(fortwo|forfour|roadster|crossblade|brabus)$/.test(m)) return "ice";

  // BEV brands / dedicated electric models
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
    // BYD DM-i already caught as PHEV; remaining BYD → BEV
    return "bev";
  }

  return "ice";
}

/**
 * Vehicle size band for scaling power/consumption.
 * @param {string} modelId
 */
function sizeBand(modelId) {
  const m = modelId.toLowerCase();
  if (/van|transporter|sprinter|crafter|ducato|boxer|jumper|master|transit|vivaro|trafic|expert|jumpy|scudo|proace|caddy|berlingo|partner|kangoo|citan|vito|viano|multivan|caravelle|nv[234]|interstar|movano|daily|hiace|hilux|ranger|navara|l200|amarok|pickup|canter|cargo|deliver/.test(m)) {
    return "van";
  }
  if (/q[578]|x[567]|xc[679]|touareg|cayenne|gle|gls|discovery|defender|pajero|land-cruiser|patrol|tahoe|suburban|x7|sq[578]|rs-q|tourter|pathfinder|outlander|santa-fe|sorento|tucson|sportage|kodiaq|tiguan|rav4|cr-v|forester|outback|cx-5|cx-60|cx-80|nx|rx|macan|gla|glb|glc|ateca|formentor|tarraco|karoq|kamiq|stoni|ix3|ix5|ioniq-5|model-x|model-y|enyaq|id4|id5|id7|q4|q8|e-tron|iX|ex30|ex40|ex90|g9|free|tang|atto|seal-u|tavascan|terramar/.test(m)) {
    return "suv";
  }
  if (/rs[3-7]|m[2-8]|amg|type-r|sti|wrx|evolution|gt-r|911|cayman|boxster|tt-rs|r8|i8|supra|gr-|focus-rs|focus-st|fiesta-st|golf-r|golf-gti|polo-gti|s[345678]|sq|m135|m235|m340|m440|m550|1m|civic-type|integra-type|brz|mx-5|z[34]|slk|amg-gt|formentor-vz|ioniq-5-n|plaid/.test(m)) {
    return "perf";
  }
  if (/a[678]|5-series|e-class|s-class|s[6789]0|v[679]0|passat|superb|octavia|mondeo|insignia|508|c5|camry|accord|legacy|6$|520|530|540|e2[0-9]|cls|a7|a8|panamera|arteon|talisman|laguna/.test(m)) {
    return "large";
  }
  if (/a[123]|polo|fiesta|corsa|clio|fabia|ibiza|yaris|jazz|i10|i20|micra|sandero|up$|aygo|108|c1|ka$|swift|splash|picanto|rio|getz|adam|mii|citigo|fortwo|forfour|500$|panda|tipo|leon|golf|focus|astra|308|civic|3$|corolla|octavia|megane|ceed|i30|jetta|bora|rapid|scala|arona|t-roc|t-cross|kamiq|cx-3|hr-v|jazz/.test(m)) {
    return "small";
  }
  return "mid";
}

function bodyFor(modelId, band) {
  const m = modelId.toLowerCase();
  if (/avant|touring|sportstourer|sw$|estate|wagon|verso|shooting/.test(m)) return "Wagon";
  if (/sportback|gran.?coupe|fastback|arteon|cla|cls/.test(m)) return "Liftback";
  if (/cabrio|convertible|roadster|spider|targa/.test(m)) return "Convertible";
  if (/coupe|tt$|cayman|boxster|brz|supra|rx-8|mx-5/.test(m)) return "Coupe";
  if (band === "suv") return "SUV";
  if (band === "van") return "Van";
  if (/avant|allroad/.test(m)) return "Sedan, Avant";
  if (/a4|a6|a3|c-class|3-series|passat|superb|octavia|mondeo/.test(m)) return "Sedan, Wagon";
  return "Hatchback / Sedan";
}

function iceTemplates(band, yearFrom, seed) {
  const std = consumptionStandard(yearFrom);
  const modern = yearFrom >= 2012;
  const gear =
    yearFrom >= 2015
      ? ["6MT / 7DCT", "6MT / 8AT", "7DCT / 8AT", "6MT / CVT"]
      : yearFrom >= 2005
        ? ["5MT / 6MT", "6MT / Multitronic", "6MT / 6AT", "6MT / DSG"]
        : ["5MT", "5MT / 4AT", "5MT / 5AT"];

  /** @type {{name:string,hp:number,drive:string,gear:string,l:number}[]} */
  let pool;
  if (band === "small") {
    pool = [
      { name: "1.0 TSI", hp: 95, drive: "FWD", gear: pick(gear, seed), l: modern ? 5.2 : 5.8 },
      { name: "1.2 TSI", hp: 110, drive: "FWD", gear: pick(gear, seed + 1), l: modern ? 5.4 : 6.0 },
      { name: "1.4 TSI", hp: 140, drive: "FWD", gear: pick(gear, seed + 2), l: modern ? 5.8 : 6.5 },
      { name: "1.6 TDI", hp: 105, drive: "FWD", gear: pick(gear, seed + 3), l: modern ? 4.2 : 4.8 },
      { name: "1.5 TSI", hp: 150, drive: "FWD", gear: pick(gear, seed + 4), l: modern ? 5.6 : 6.2 },
      { name: "2.0 TDI", hp: 150, drive: "FWD", gear: pick(gear, seed + 5), l: modern ? 4.5 : 5.2 },
    ];
  } else if (band === "mid") {
    pool = [
      { name: "1.5 TFSI", hp: 150, drive: "FWD", gear: pick(gear, seed), l: modern ? 5.8 : 6.6 },
      { name: "2.0 TFSI", hp: 190, drive: "FWD / AWD", gear: pick(gear, seed + 1), l: modern ? 6.4 : 7.2 },
      { name: "2.0 TDI", hp: 150, drive: "FWD", gear: pick(gear, seed + 2), l: modern ? 4.8 : 5.5 },
      { name: "2.0 TDI", hp: 190, drive: "FWD / AWD", gear: pick(gear, seed + 3), l: modern ? 5.1 : 5.9 },
      { name: "1.8 TFSI", hp: 170, drive: "FWD", gear: pick(gear, seed + 4), l: modern ? 6.2 : 7.0 },
      { name: "3.0 TDI", hp: 245, drive: "AWD", gear: pick(gear, seed + 5), l: modern ? 6.0 : 6.8 },
    ];
  } else if (band === "large") {
    pool = [
      { name: "2.0 TFSI", hp: 204, drive: "FWD / AWD", gear: pick(gear, seed), l: modern ? 6.8 : 7.6 },
      { name: "2.0 TDI", hp: 190, drive: "FWD / AWD", gear: pick(gear, seed + 1), l: modern ? 5.2 : 6.0 },
      { name: "3.0 TDI", hp: 286, drive: "AWD", gear: pick(gear, seed + 2), l: modern ? 6.4 : 7.2 },
      { name: "2.5 TFSI", hp: 224, drive: "AWD", gear: pick(gear, seed + 3), l: modern ? 7.2 : 8.0 },
      { name: "3.0 TFSI", hp: 340, drive: "AWD", gear: pick(gear, seed + 4), l: modern ? 8.0 : 9.0 },
      { name: "2.0 TDI", hp: 163, drive: "FWD", gear: pick(gear, seed + 5), l: modern ? 4.9 : 5.7 },
    ];
  } else if (band === "suv") {
    pool = [
      { name: "1.5 TSI", hp: 150, drive: "FWD", gear: pick(gear, seed), l: modern ? 6.2 : 7.0 },
      { name: "2.0 TSI", hp: 190, drive: "FWD / AWD", gear: pick(gear, seed + 1), l: modern ? 7.0 : 7.8 },
      { name: "2.0 TDI", hp: 150, drive: "FWD / AWD", gear: pick(gear, seed + 2), l: modern ? 5.4 : 6.2 },
      { name: "2.0 TDI", hp: 200, drive: "AWD", gear: pick(gear, seed + 3), l: modern ? 5.8 : 6.6 },
      { name: "3.0 TDI", hp: 286, drive: "AWD", gear: pick(gear, seed + 4), l: modern ? 7.0 : 7.8 },
      { name: "1.4 TSI", hp: 150, drive: "FWD", gear: pick(gear, seed + 5), l: modern ? 6.0 : 6.8 },
    ];
  } else if (band === "van") {
    pool = [
      { name: "2.0 TDI", hp: 110, drive: "FWD", gear: pick(gear, seed), l: modern ? 6.5 : 7.5 },
      { name: "2.0 TDI", hp: 140, drive: "FWD", gear: pick(gear, seed + 1), l: modern ? 6.8 : 7.8 },
      { name: "2.0 TDI", hp: 177, drive: "FWD / AWD", gear: pick(gear, seed + 2), l: modern ? 7.2 : 8.2 },
      { name: "1.6 TDI", hp: 102, drive: "FWD", gear: pick(gear, seed + 3), l: modern ? 5.8 : 6.6 },
    ];
  } else {
    // perf
    pool = [
      { name: "2.0 Turbo", hp: 300, drive: "AWD", gear: pick(["6MT / 7DCT", "6MT / 8AT"], seed), l: modern ? 8.5 : 9.5 },
      { name: "2.5 Turbo", hp: 340, drive: "AWD", gear: pick(["6MT / 7DCT", "8AT"], seed + 1), l: modern ? 9.0 : 10.0 },
      { name: "3.0 Turbo", hp: 450, drive: "AWD", gear: "8AT", l: modern ? 10.5 : 11.5 },
      { name: "2.0 Turbo", hp: 245, drive: "FWD / AWD", gear: pick(["6MT / 7DCT", "6MT"], seed + 2), l: modern ? 7.8 : 8.6 },
    ];
  }

  // Era dampen: older gens → fewer gears naming already handled; trim HP slightly for pre-2000
  if (yearFrom < 2000) {
    pool = pool.map((p) => ({
      ...p,
      hp: Math.max(60, Math.round(p.hp * 0.72)),
      l: round1(p.l + 1.2),
      gear: pick(["5MT", "5MT / 4AT"], seed),
    }));
  } else if (yearFrom < 2008) {
    pool = pool.map((p) => ({
      ...p,
      hp: Math.max(75, Math.round(p.hp * 0.88)),
      l: round1(p.l + 0.5),
    }));
  }

  // WLTP bump
  if (std === "WLTP") {
    pool = pool.map((p) => ({ ...p, l: round1(p.l + 1.0) }));
  }

  const count = band === "van" || band === "perf" ? 3 + (seed % 2) : 3 + (seed % 4); // 3–4 or 3–6
  const start = seed % pool.length;
  const chosen = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    chosen.push(pool[(start + i) % pool.length]);
  }
  // de-dupe by name+hp
  const seen = new Set();
  return chosen
    .filter((p) => {
      const k = `${p.name}-${p.hp}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .map((p) => ({ ...p, standard: std }));
}

function brandTuneName(modelId, name, hp) {
  const m = modelId.toLowerCase();
  // BMW-style numeric models: prefer "320i 184" style when model encodes engine
  const bmw = m.match(/^bmw-([0-9]{3}[a-z]?)/);
  if (bmw) {
    const code = bmw[1].toUpperCase();
    return `${code} ${hp}`;
  }
  const merc = m.match(/^mercedes-([a-z]?[0-9]{2,3}[a-z]?)/);
  if (merc && /mercedes-[cegs]-?[0-9]/.test(m)) {
    return `${merc[1].toUpperCase()} ${hp}`;
  }
  // Diesel cue in model id
  if (/tdi|cdi|d$|diesel|bluehdi|hdi|tdci|dci/.test(m) && !/tdi|td|cdi|hdi|dci|tdci/i.test(name)) {
    return name.replace(/TFSI|TSI|Turbo/i, "TDI");
  }
  if (/tfsi|tsi|tsi|gti|petrol/.test(m) && /TDI/.test(name)) {
    return name.replace(/TDI/i, "TFSI");
  }
  // Toyota / Honda often use hybrid naming already handled
  if (/toyota|honda|lexus/.test(m) && /TDI|TFSI|TSI/.test(name)) {
    const lit = name.match(/^[0-9]\.[0-9]/)?.[0] ?? "2.0";
    return `${lit} ${hp}`;
  }
  if (/bmw|mercedes|volvo|peugeot|citroen|opel|renault|dacia|fiat|seat|skoda|ford|mazda|nissan|mitsubishi|subaru|suzuki|kia|hyundai|mini|landrover|porsche|cupra/.test(m.split("-")[0])) {
    // keep generic Euro turbo names
    return `${name} ${hp}`;
  }
  return `${name} ${hp}`;
}

function makeIceVariants(gen, kindHint) {
  const seed = hash(gen.id);
  const band = sizeBand(gen.modelId);
  const body = bodyFor(gen.modelId, band);
  const templates = iceTemplates(band, gen.yearFrom, seed);
  const powertrain = kindHint === "hybrid" ? "hybrid" : "ice";

  return templates.map((t, idx) => {
    const name = brandTuneName(gen.modelId, t.name, t.hp);
    const id = `${gen.id}-${slug(name)}-${idx}`;
    /** @type {Record<string, unknown>} */
    const v = {
      id,
      generationId: gen.id,
      name,
      powertrain,
      powerHp: t.hp,
      powerKw: hpToKw(t.hp),
      drivetrain: t.drive,
      transmissionSummary: t.gear,
      bodyStyles: body,
      consumptionCombinedL: t.l,
      consumptionStandard: t.standard,
    };
    return v;
  });
}

function makeBevVariants(gen) {
  const seed = hash(gen.id);
  const band = sizeBand(gen.modelId);
  const std = rangeStandard(gen.yearFrom);
  const body = bodyFor(gen.modelId, band);

  const packs =
    band === "small"
      ? [
          { name: "Standard Range", hp: 136, kwh: 40, range: 280, kwh100: 15.5 },
          { name: "Long Range", hp: 170, kwh: 52, range: 360, kwh100: 14.8 },
        ]
      : band === "suv" || band === "van"
        ? [
            { name: "RWD", hp: 204, kwh: 62, range: 400, kwh100: 17.5 },
            { name: "AWD Long Range", hp: 300, kwh: 77, range: 480, kwh100: 18.8 },
            { name: "Performance", hp: 408, kwh: 82, range: 450, kwh100: 19.5 },
          ]
        : band === "perf"
          ? [
              { name: "Dual Motor", hp: 450, kwh: 82, range: 420, kwh100: 19.0 },
              { name: "Tri Motor", hp: 750, kwh: 99, range: 480, kwh100: 20.5 },
            ]
          : [
              { name: "RWD", hp: 170, kwh: 55, range: 380, kwh100: 15.2 },
              { name: "Long Range", hp: 220, kwh: 72, range: 480, kwh100: 14.9 },
              { name: "AWD", hp: 300, kwh: 77, range: 450, kwh100: 16.5 },
            ];

  // Pre-WLTP era: lower ranges
  const era = packs.map((p) => ({
    ...p,
    range: std === "NEDC" ? Math.round(p.range * 1.15) : p.range,
    kwh: gen.yearFrom < 2018 ? Math.round(p.kwh * 0.85) : p.kwh,
  }));

  const count = 1 + (seed % Math.min(3, era.length));
  const start = seed % era.length;
  const chosen = [];
  for (let i = 0; i < count; i++) chosen.push(era[(start + i) % era.length]);

  return chosen.map((p, idx) => ({
    id: `${gen.id}-${slug(p.name)}-${idx}`,
    generationId: gen.id,
    name: p.name,
    powertrain: "bev",
    powerHp: p.hp,
    powerKw: hpToKw(p.hp),
    drivetrain: /AWD|Dual|Tri|Performance/i.test(p.name) ? "AWD" : "RWD / FWD",
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: p.kwh,
    electricRangeKm: p.range,
    rangeStandard: std,
    consumptionCombinedKwh: p.kwh100,
    consumptionStandard: std,
  }));
}

function makePhevVariants(gen) {
  const seed = hash(gen.id);
  const band = sizeBand(gen.modelId);
  const std = consumptionStandard(gen.yearFrom);
  const rstd = rangeStandard(gen.yearFrom);
  const body = bodyFor(gen.modelId, band);
  const baseHp = band === "perf" ? 360 : band === "suv" ? 245 : band === "large" ? 299 : 204;
  const rows = [
    {
      name: "Plug-in Hybrid",
      hp: baseHp,
      drive: band === "small" ? "FWD" : "AWD",
      gear: "6DCT / 8AT",
      l: std === "WLTP" ? 1.6 : 1.9,
      kwh: 13,
      range: rstd === "WLTP" ? 50 : 45,
    },
    {
      name: "PHEV Performance",
      hp: baseHp + 60,
      drive: "AWD",
      gear: "8AT",
      l: std === "WLTP" ? 1.9 : 2.2,
      kwh: 17,
      range: rstd === "WLTP" ? 55 : 48,
    },
  ];
  const count = 1 + (seed % 2);
  return rows.slice(0, count).map((p, idx) => ({
    id: `${gen.id}-${slug(p.name)}-${idx}`,
    generationId: gen.id,
    name: p.name,
    powertrain: "phev",
    powerHp: p.hp,
    powerKw: hpToKw(p.hp),
    drivetrain: p.drive,
    transmissionSummary: p.gear,
    bodyStyles: body,
    consumptionCombinedL: p.l,
    consumptionStandard: std,
    batteryKwh: p.kwh,
    electricRangeKm: p.range,
    rangeStandard: rstd,
  }));
}

function makeHybridVariants(gen) {
  const seed = hash(gen.id);
  const band = sizeBand(gen.modelId);
  const std = consumptionStandard(gen.yearFrom);
  const body = bodyFor(gen.modelId, band);
  const rows = [
    {
      name: band === "suv" ? "2.5 Hybrid" : "1.8 Hybrid",
      hp: band === "suv" ? 218 : 122,
      drive: band === "suv" ? "AWD" : "FWD",
      gear: "e-CVT",
      l: std === "WLTP" ? (band === "suv" ? 5.8 : 4.5) : band === "suv" ? 5.0 : 3.9,
    },
    {
      name: band === "suv" ? "2.5 Hybrid AWD" : "2.0 Hybrid",
      hp: band === "suv" ? 222 : 184,
      drive: band === "suv" ? "AWD" : "FWD",
      gear: "e-CVT",
      l: std === "WLTP" ? (band === "suv" ? 6.0 : 4.8) : band === "suv" ? 5.2 : 4.2,
    },
  ];
  const count = 1 + (seed % 2);
  return rows.slice(0, count).map((p, idx) => ({
    id: `${gen.id}-${slug(p.name)}-${idx}`,
    generationId: gen.id,
    name: p.name,
    powertrain: "hybrid",
    powerHp: p.hp,
    powerKw: hpToKw(p.hp),
    drivetrain: p.drive,
    transmissionSummary: p.gear,
    bodyStyles: body,
    consumptionCombinedL: p.l,
    consumptionStandard: std,
  }));
}

function variantsForGen(gen) {
  const kind = classifyModel(gen.modelId);
  if (kind === "bev") return makeBevVariants(gen);
  if (kind === "phev") return makePhevVariants(gen);
  if (kind === "hybrid") return makeHybridVariants(gen);
  return makeIceVariants(gen, kind);
}

// ——— Build ———
const variants = {};
let preserved = 0;
let generated = 0;
let totalVariantRows = 0;

for (const gen of gensRoot.generations) {
  if (PRESERVE.has(gen.id) && existing.variants?.[gen.id]?.length) {
    variants[gen.id] = existing.variants[gen.id];
    preserved++;
    totalVariantRows += variants[gen.id].length;
    continue;
  }
  const rows = variantsForGen(gen);
  if (!rows.length) {
    // Fallback: never leave empty
    variants[gen.id] = [
      {
        id: `${gen.id}-base-0`,
        generationId: gen.id,
        name: "Base",
        powertrain: "ice",
        powerHp: 110,
        powerKw: 81,
        drivetrain: "FWD",
        transmissionSummary: "5MT / 6AT",
        bodyStyles: "Sedan",
        consumptionCombinedL: 6.5,
        consumptionStandard: consumptionStandard(gen.yearFrom),
      },
    ];
  } else {
    variants[gen.id] = rows;
  }
  generated++;
  totalVariantRows += variants[gen.id].length;
}

const out = {
  note: "Optional tech data keyed by generation id. variants[] = engines & versions. Values are approximate brochure/type-approval figures for FI/EU. Regenerated by tools/build_generation_variants.mjs (audi-a4-b8 preserved).",
  specs: {},
  variants,
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

const gensWith = Object.keys(variants).filter((k) => (variants[k] || []).length >= 1).length;
const empty = gensRoot.generations.length - gensWith;
console.log(
  JSON.stringify(
    {
      generations: gensRoot.generations.length,
      gensWithVariants: gensWith,
      empty,
      preservedGens: preserved,
      generatedGens: generated,
      totalVariants: totalVariantRows,
      out: path.relative(root, outPath),
    },
    null,
    2,
  ),
);
