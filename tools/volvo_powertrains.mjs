/**
 * Volvo engines for the cars sold in Finland after 2005.
 * Current EX30, ES90, EX90, XC40, XC60, XC90 and V60 use the Finnish
 * pages. XC60 and XC90 ranges are the per-powertrain WLTP figures.
 * The EX60 810 km headline is a maximum, so it is not stored on the
 * 680 hp version. Cross Country is a body style. Older rows have no
 * invented consumption or battery size.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function fuel(kind, name, hp, drive, gear, body, l, kw) {
  const row = {
    name,
    powertrain: kind,
    powerHp: hp,
    powerKw: kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
  if (l != null) {
    row.consumptionCombinedL = l;
    row.consumptionStandard = W;
  }
  return row;
}

const petrol = (name, hp, drive, gear, body, l, kw) => fuel("petrol", name, hp, drive, gear, body, l, kw);
const diesel = (name, hp, drive, gear, body, l, kw) => fuel("diesel", name, hp, drive, gear, body, l, kw);
const hybrid = (name, hp, drive, gear, body, l, kw) => fuel("hybrid", name, hp, drive, gear, body, l, kw);

function phev(name, hp, drive, gear, body, opts = {}) {
  const row = fuel("phev", name, hp, drive, gear, body, opts.l, opts.kw);
  if (opts.bat != null) row.batteryKwh = opts.bat;
  if (opts.range != null) {
    row.electricRangeKm = opts.range;
    row.rangeStandard = W;
  }
  if (opts.kwh100 != null) row.consumptionCombinedKwh = opts.kwh100;
  return row;
}

function bev(name, hp, drive, body, opts = {}) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: opts.kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
  };
  if (opts.bat != null) row.batteryKwh = opts.bat;
  if (opts.range != null) {
    row.electricRangeKm = opts.range;
    row.rangeStandard = W;
  }
  if (opts.kwh100 != null) row.consumptionCombinedKwh = opts.kwh100;
  return row;
}

const HB = "Hatchback";
const SED = "Sedan";
const SW = "Sedan, Wagon";
const WAG = "Wagon";
const CC = "Wagon, Cross Country";
const SUV = "SUV";
const CAB = "Cabrio";
const COUPE = "Coupe";

const p5 = (name, hp, drive, body) => petrol(name, hp, drive, "5MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);

export const VOLVO_MAKE_IDS = ["volvo"];

export const VOLVO_POWERTRAINS = {
  "volvo-c30-i": [p5("1.6", 100, "FWD", HB), petrol("1.8", 125, "FWD", "5MT", HB), petrol("2.0", 145, "FWD", "5MT", HB), petrol("2.5 T5", 230, "FWD", "5MT", HB), diesel("1.6 D", 109, "FWD", "5MT", HB), diesel("2.0 D", 136, "FWD", "6MT", HB), d6("2.0 D4", 177, HB)],
  "volvo-c70-ii": [petrol("2.4", 140, "FWD", "5MT", CAB), petrol("2.5 T5", 230, "FWD", "5AT", CAB), diesel("2.0 D", 136, "FWD", "6MT", CAB), diesel("2.4 D5", 180, "FWD", "5AT", CAB)],

  "volvo-ec40-c40": [
    bev("Single motor", 231, "FWD", SUV, { bat: 69 }),
    bev("Twin motor", 408, "AWD", SUV, { bat: 78 }),
  ],
  "volvo-ec40-ec40": [
    bev("Single motor", 252, "RWD", SUV, { range: 582, kw: 185 }),
    bev("Twin motor", 442, "AWD", SUV, { kw: 325 }),
  ],
  "volvo-es90-i": [
    bev("Single", 333, "RWD", SED, { range: 650, kw: 245 }),
    bev("Twin", 456, "AWD", SED, { range: 618, kw: 335 }),
    bev("Twin Performance", 680, "AWD", SED, { range: 618, kw: 500 }),
  ],
  "volvo-ex30-i": [
    bev("P5", 272, "RWD", "SUV, Cross Country", { range: 337, kw: 200 }),
    bev("P5 Long range", 272, "RWD", "SUV, Cross Country", { range: 475, kw: 200 }),
    bev("P8", 428, "AWD", "SUV, Cross Country", { range: 450, kw: 315 }),
  ],
  "volvo-ex40-recharge": [
    bev("Single motor", 231, "FWD", SUV, { bat: 69 }),
    bev("Twin motor", 408, "AWD", SUV, { bat: 78 }),
  ],
  "volvo-ex40-ex40": [
    bev("Single motor", 252, "RWD", SUV, { range: 573, kw: 185 }),
    bev("Twin motor", 442, "AWD", SUV, { kw: 325 }),
  ],
  "volvo-ex60-i": [bev("Twin Performance", 680, "AWD", "SUV, Cross Country", { kw: 500 })],
  "volvo-ex90-i": [
    bev("Twin", 456, "AWD", SUV, { range: 618, kw: 335 }),
    bev("Twin Performance", 680, "AWD", SUV, { range: 618, kw: 500 }),
  ],

  "volvo-s40-ii": [petrol("1.6", 100, "FWD", "5MT", SED), petrol("1.8", 125, "FWD", "5MT", SED), petrol("2.0", 145, "FWD", "5MT", SED), petrol("2.4", 170, "FWD", "5AT", SED), petrol("2.5 T5", 230, "FWD", "5MT", SED), diesel("1.6 D", 109, "FWD", "5MT", SED), diesel("2.0 D", 136, "FWD", "6MT", SED)],
  "volvo-s60-i": [petrol("2.4", 140, "FWD", "5MT", SED), petrol("2.4", 170, "FWD", "5AT", SED), petrol("2.5 T", 210, "FWD", "5MT", SED), petrol("2.5 T5", 260, "FWD", "6MT", SED), diesel("2.4 D", 163, "FWD", "5MT", SED), diesel("2.4 D5", 185, "FWD", "5AT", SED)],
  "volvo-s60-ii": [petrol("T3", 150, "FWD", "6MT", SED), petrol("T4", 180, "FWD", "6AT", SED), petrol("T5", 240, "FWD", "6AT", SED), petrol("T6", 304, "AWD", "6AT", SED), d6("D2", 120, SED), diesel("D3", 150, "FWD", "6AT", SED), diesel("D4", 181, "FWD", "6AT", SED), diesel("D5", 215, "AWD", "6AT", SED)],
  "volvo-s60-iii": [hybrid("B4", 197, "FWD", "7DCT", SED), hybrid("B5", 250, "AWD", "8AT", SED), phev("T6 Recharge", 340, "AWD", "8AT", SED), phev("T8 Recharge", 455, "AWD", "8AT", SED)],

  "volvo-s80-i": [petrol("2.4", 140, "FWD", "5MT", SED), petrol("2.4", 170, "FWD", "5AT", SED), petrol("2.9", 196, "FWD", "5AT", SED), petrol("2.9 T6", 272, "AWD", "4AT", SED), diesel("2.4 D5", 163, "FWD", "5MT", SED)],
  "volvo-s80-ii": [petrol("2.0 T", 203, "FWD", "6AT", SED), petrol("2.5 T", 231, "FWD", "6AT", SED), petrol("3.0 T6", 304, "AWD", "6AT", SED), petrol("4.4 V8", 315, "AWD", "6AT", SED), diesel("2.0 D", 136, "FWD", "6MT", SED), diesel("2.4 D5", 205, "FWD", "6AT", SED), diesel("D4", 163, "FWD", "6AT", SED)],

  "volvo-s90-i": [hybrid("B4", 197, "FWD", "8AT", SED), hybrid("B5", 250, "AWD", "8AT", SED), diesel("D3", 150, "FWD", "6MT", SED), diesel("D4", 190, "FWD", "8AT", SED), phev("T8 Recharge", 455, "AWD", "8AT", SED)],

  "volvo-v40-i": [petrol("T2", 122, "FWD", "6MT", "Hatchback, Cross Country"), petrol("T3", 152, "FWD", "6AT", "Hatchback, Cross Country"), petrol("T4", 190, "FWD", "6AT", "Hatchback, Cross Country"), petrol("T5", 245, "AWD", "6AT", "Hatchback, Cross Country"), d6("D2", 120, "Hatchback, Cross Country"), diesel("D3", 150, "FWD", "6AT", "Hatchback, Cross Country"), diesel("D4", 190, "FWD", "6AT", "Hatchback, Cross Country")],
  "volvo-v50-i": [petrol("1.6", 100, "FWD", "5MT", WAG), petrol("1.8", 125, "FWD", "5MT", WAG), petrol("2.0", 145, "FWD", "5MT", WAG), petrol("2.5 T5", 230, "FWD", "5MT", WAG), diesel("1.6 D", 109, "FWD", "5MT", WAG), diesel("2.0 D", 136, "FWD", "6MT", WAG)],

  "volvo-v60-i": [petrol("T3", 150, "FWD", "6MT", CC), petrol("T4", 180, "FWD", "6AT", CC), petrol("T5", 245, "FWD", "6AT", CC), petrol("T6", 304, "AWD", "6AT", CC), d6("D2", 120, CC), diesel("D3", 150, "FWD", "6AT", CC), diesel("D4", 181, "FWD", "6AT", CC), diesel("D5", 215, "AWD", "6AT", CC)],
  "volvo-v60-ii": [hybrid("B4", 197, "FWD", "7DCT", CC), hybrid("B5", 250, "AWD", "8AT", CC), diesel("D3", 150, "FWD", "8AT", CC), diesel("D4", 190, "AWD", "8AT", CC), phev("T6 Recharge", 340, "AWD", "8AT", CC), phev("T8 Recharge", 455, "AWD", "8AT", CC)],
  "volvo-v60-fl": [phev("T6", 336, "AWD", "8AT", CC, { kw: 247 })],

  "volvo-v70-p2": [petrol("2.4", 140, "FWD", "5MT", WAG), petrol("2.4", 170, "FWD", "5AT", WAG), petrol("2.5 T", 210, "FWD", "5MT", WAG), diesel("2.4 D5", 163, "FWD", "5MT", WAG), diesel("2.4 D5", 185, "FWD", "5AT", WAG)],
  "volvo-v70-p3": [petrol("T4", 180, "FWD", "6AT", WAG), petrol("T5", 240, "FWD", "6AT", WAG), petrol("T6", 304, "AWD", "6AT", WAG), d6("D2", 115, WAG), diesel("D3", 150, "FWD", "6AT", WAG), diesel("D4", 181, "FWD", "6AT", WAG), diesel("D5", 215, "AWD", "6AT", WAG)],

  "volvo-v90-i": [hybrid("B4", 197, "FWD", "8AT", CC), hybrid("B5", 250, "AWD", "8AT", CC), diesel("D3", 150, "FWD", "6MT", CC), diesel("D4", 190, "AWD", "8AT", CC), phev("T6 Recharge", 340, "AWD", "8AT", CC), phev("T8 Recharge", 455, "AWD", "8AT", CC)],

  "volvo-xc40-i": [petrol("T3", 163, "FWD", "6AT", SUV), petrol("T4", 190, "FWD", "8AT", SUV), petrol("T5", 247, "AWD", "8AT", SUV), diesel("D3", 150, "FWD", "6MT", SUV), diesel("D4", 190, "AWD", "8AT", SUV), phev("T4 Recharge", 211, "FWD", "7DCT", SUV), phev("T5 Recharge", 262, "FWD", "7DCT", SUV)],
  "volvo-xc40-fl": [hybrid("B3", 163, "FWD", "7DCT", SUV, 6.6, 120)],

  "volvo-xc60-i": [petrol("T5", 240, "FWD", "6AT", SUV), petrol("T6", 304, "AWD", "6AT", SUV), diesel("D3", 150, "FWD", "6MT", SUV), diesel("D4", 181, "AWD", "6AT", SUV), diesel("D5", 215, "AWD", "6AT", SUV), diesel("D5", 220, "AWD", "6AT", SUV)],
  "volvo-xc60-ii": [hybrid("B4", 197, "FWD", "8AT", SUV), hybrid("B5", 250, "AWD", "8AT", SUV), diesel("D4", 190, "AWD", "8AT", SUV), diesel("D5", 235, "AWD", "8AT", SUV), phev("T6 Recharge", 340, "AWD", "8AT", SUV), phev("T8 Recharge", 455, "AWD", "8AT", SUV)],
  "volvo-xc60-fl": [
    phev("T6", 357, "AWD", "8AT", SUV, { l: 1.0, bat: 41.2, range: 199, kwh100: 16.8, kw: 262 }),
    phev("T8", 461, "AWD", "8AT", SUV, { l: 1.2, bat: 41.2, range: 186, kwh100: 17.1, kw: 339 }),
  ],

  "volvo-xc70-p2": [petrol("2.5 T", 210, "AWD", "5AT", WAG), diesel("2.4 D5", 163, "AWD", "5MT", WAG), diesel("2.4 D5", 185, "AWD", "5AT", WAG)],
  "volvo-xc70-p3": [petrol("T5", 240, "AWD", "6AT", WAG), petrol("T6", 304, "AWD", "6AT", WAG), diesel("D4", 181, "AWD", "6AT", WAG), diesel("D5", 215, "AWD", "6AT", WAG)],

  "volvo-xc90-i": [petrol("2.5 T", 210, "AWD", "5AT", SUV), petrol("3.2", 243, "AWD", "6AT", SUV), petrol("4.4 V8", 315, "AWD", "6AT", SUV), diesel("2.4 D", 163, "AWD", "6MT", SUV), diesel("2.4 D5", 185, "AWD", "6AT", SUV), diesel("D5", 200, "AWD", "6AT", SUV)],
  "volvo-xc90-ii": [petrol("T5", 250, "AWD", "8AT", SUV), petrol("T6", 320, "AWD", "8AT", SUV), diesel("D5", 225, "AWD", "8AT", SUV), diesel("D5", 235, "AWD", "8AT", SUV), phev("T8 Recharge", 407, "AWD", "8AT", SUV), phev("T8 Recharge", 455, "AWD", "8AT", SUV)],
  "volvo-xc90-fl": [phev("T8", 461, "AWD", "8AT", SUV, { l: 1.8, bat: 41.2, range: 157, kwh100: 19.1, kw: 339 })],
};
