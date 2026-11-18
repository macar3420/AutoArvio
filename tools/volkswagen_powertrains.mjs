/**
 * Volkswagen engines for the cars sold in Finland after 2005.
 * Current Golf, ID. Polo, ID. Cross, ID. Tiguan and ID.7 GTX use the
 * Finnish pages. A published range is stored only when that version has
 * one figure. 48-volt cars are "hybrid" and do not get a traction battery.
 * ID.5 is the coupé body of ID.4. Older rows have no invented consumption.
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
const HW = "Hatchback, Wagon";
const SED = "Sedan";
const SW = "Sedan, Wagon";
const SUV = "SUV";
const SC = "SUV, Coupe";
const MPV = "MPV";
const VAN = "Van";
const BUS = "Van, MPV, Camper";
const COUPE = "Coupe";
const CAB = "Cabrio";
const PICKUP = "Pickup";
const FAST = "Fastback, Wagon";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);
const d7 = (name, hp, body) => diesel(name, hp, "FWD", "7DSG", body);

export const VOLKSWAGEN_MAKE_IDS = ["volkswagen"];

export const VOLKSWAGEN_POWERTRAINS = {
  "volkswagen-amarok-2h": [
    diesel("2.0 TDI", 140, "AWD", "6MT", PICKUP),
    diesel("2.0 TDI", 180, "AWD", "8AT", PICKUP),
    diesel("3.0 TDI", 224, "AWD", "8AT", PICKUP),
  ],
  "volkswagen-amarok-ii": [
    diesel("2.0 TDI", 170, "AWD", "6AT", PICKUP),
    diesel("2.0 TDI", 205, "AWD", "10AT", PICKUP),
    diesel("3.0 TDI", 240, "AWD", "10AT", PICKUP),
  ],

  "volkswagen-arteon-i": [petrol("2.0 TSI", 190, "FWD", "7DSG", "Fastback, Shooting Brake"), petrol("2.0 TSI", 272, "AWD", "7DSG", "Fastback, Shooting Brake"), d7("2.0 TDI", 150, "Fastback, Shooting Brake"), diesel("2.0 TDI", 190, "AWD", "7DSG", "Fastback, Shooting Brake")],
  "volkswagen-arteon-fl": [petrol("2.0 TSI", 190, "FWD", "7DSG", "Fastback, Shooting Brake"), petrol("2.0 TSI", 320, "AWD", "7DSG", "Fastback, Shooting Brake"), phev("1.4 eHybrid", 218, "FWD", "6DSG", "Fastback, Shooting Brake"), d7("2.0 TDI", 150, "Fastback, Shooting Brake")],

  "volkswagen-beetle-9c": [p5("1.4", 75, HB), p5("1.6", 102, HB), petrol("2.0", 115, "FWD", "5MT", HB), diesel("1.9 TDI", 105, "FWD", "5MT", HB)],
  "volkswagen-beetle-a5": [p6("1.2 TSI", 105, "Hatchback, Cabrio"), petrol("1.4 TSI", 150, "FWD", "7DSG", "Hatchback, Cabrio"), petrol("2.0 TSI", 220, "FWD", "6DSG", "Hatchback, Cabrio"), d6("2.0 TDI", 110, "Hatchback, Cabrio"), d7("2.0 TDI", 150, "Hatchback, Cabrio")],

  "volkswagen-caddy-2k": [p5("1.2 TSI", 86, "Van, MPV"), petrol("1.4 TSI", 125, "FWD", "6MT", "Van, MPV"), diesel("1.6 TDI", 102, "FWD", "5MT", "Van, MPV"), diesel("2.0 TDI", 140, "FWD", "6MT", "Van, MPV")],
  "volkswagen-caddy-sb": [petrol("1.5 TSI", 114, "FWD", "6MT", "Van, MPV"), d6("2.0 TDI", 102, "Van, MPV"), diesel("2.0 TDI", 122, "FWD", "7DSG", "Van, MPV")],

  "volkswagen-cc-i": [petrol("1.8 TSI", 160, "FWD", "6MT", SED), petrol("2.0 TSI", 210, "FWD", "6DSG", SED), diesel("2.0 TDI", 140, "FWD", "6MT", SED), diesel("2.0 TDI", 170, "FWD", "6DSG", SED)],

  "volkswagen-crafter-2e": [diesel("2.0 TDI", 109, "FWD", "6MT", VAN), diesel("2.0 TDI", 136, "FWD", "6MT", VAN), diesel("2.0 TDI", 163, "RWD", "6MT", VAN)],
  "volkswagen-crafter-ii": [diesel("2.0 TDI", 140, "FWD", "6MT", VAN), diesel("2.0 TDI", 177, "RWD", "8AT", VAN)],

  "volkswagen-eos-i": [petrol("1.6 FSI", 115, "FWD", "6MT", CAB), petrol("2.0 TSI", 200, "FWD", "6DSG", CAB), diesel("2.0 TDI", 140, "FWD", "6MT", CAB)],
  "volkswagen-fox-i": [p5("1.2", 55, HB), p5("1.4", 75, HB), diesel("1.4 TDI", 70, "FWD", "5MT", HB)],

  "volkswagen-golf-mk5": [p5("1.4", 80, HW), p6("1.6", 102, HW), petrol("1.4 TSI", 140, "FWD", "6MT", HW), petrol("2.0 TSI", 200, "FWD", "6MT", HW), petrol("3.2", 250, "AWD", "6DSG", HW), diesel("1.9 TDI", 105, "FWD", "5MT", HW), d6("2.0 TDI", 140, HW)],
  "volkswagen-golf-mk6": [p6("1.4", 80, HW), petrol("1.4 TSI", 122, "FWD", "6MT", HW), petrol("1.4 TSI", 160, "FWD", "7DSG", HW), petrol("2.0 TSI", 210, "FWD", "6DSG", HW), petrol("2.0 TSI", 270, "AWD", "6DSG", HW), d6("1.6 TDI", 105, HW), d6("2.0 TDI", 140, HW)],
  "volkswagen-golf-mk7": [p6("1.0 TSI", 110, HW), petrol("1.4 TSI", 125, "FWD", "6MT", HW), petrol("1.4 TSI", 150, "FWD", "7DSG", HW), petrol("2.0 TSI", 230, "FWD", "6DSG", HW), petrol("2.0 TSI", 310, "AWD", "7DSG", HW), phev("1.4 GTE", 204, "FWD", "6DSG", HW), bev("e-Golf", 136, "FWD", HW, { bat: 35.8 }), d6("1.6 TDI", 115, HW), d7("2.0 TDI", 150, HW)],
  "volkswagen-golf-mk8": [p6("1.0 TSI", 110, HW), hybrid("1.0 eTSI", 110, "FWD", "7DSG", HW), petrol("1.5 TSI", 150, "FWD", "6MT", HW), hybrid("1.5 eTSI", 150, "FWD", "7DSG", HW), petrol("2.0 TSI", 245, "FWD", "7DSG", HW), petrol("2.0 TSI", 320, "AWD", "7DSG", HW), phev("1.4 eHybrid", 204, "FWD", "6DSG", HW), phev("1.4 GTE", 245, "FWD", "6DSG", HW), d6("2.0 TDI", 115, HW), d7("2.0 TDI", 150, HW)],
  "volkswagen-golf-mk8-5": [
    petrol("1.5 TSI", 116, "FWD", "6MT", HW, 5.5, 85),
    petrol("1.5 TSI", 160, "FWD", "7DSG", HW, 5.6, 118),
    petrol("2.0 TSI GTI", 265, "FWD", "7DSG", HW, null, 195),
    phev("GTE", 272, "FWD", "6DSG", HW, { l: 1.3, range: 131, kwh100: 17.3, kw: 200 }),
  ],

  "volkswagen-golf-plus-i": [p6("1.4", 80, MPV), petrol("1.4 TSI", 122, "FWD", "6MT", MPV), petrol("1.4 TSI", 160, "FWD", "7DSG", MPV), d6("1.6 TDI", 105, MPV), d6("2.0 TDI", 140, MPV)],
  "volkswagen-golf-sportsvan-i": [p6("1.0 TSI", 110, MPV), petrol("1.4 TSI", 125, "FWD", "6MT", MPV), petrol("1.5 TSI", 150, "FWD", "7DSG", MPV), d6("1.6 TDI", 115, MPV), d7("2.0 TDI", 150, MPV)],

  "volkswagen-id-buzz-i": [
    bev("Pro", 204, "RWD", "MPV, Van", { range: 468, kw: 150 }),
    bev("GTX", 340, "AWD", "MPV", { kw: 250 }),
  ],
  "volkswagen-id-cross-i": [
    bev("37 kWh", 116, "FWD", SUV, { bat: 37, kw: 85 }),
    bev("37 kWh", 135, "FWD", SUV, { bat: 37, kw: 99 }),
    bev("52 kWh", 211, "FWD", SUV, { bat: 52, kw: 155, range: 426 }),
  ],
  "volkswagen-id-polo-i": [
    bev("37 kWh", 116, "FWD", HB, { bat: 37, kw: 85 }),
    bev("52 kWh", 211, "FWD", HB, { bat: 52, kw: 155, range: 453 }),
  ],
  "volkswagen-id-tiguan-i": [
    bev("58 kWh", 190, "RWD", SUV, { bat: 58, kw: 140, range: 451, kwh100: 15.0 }),
    bev("77 kWh", 286, "RWD", SUV, { bat: 77, kw: 210, range: 601, kwh100: 14.8 }),
    bev("77 kWh 4MOTION", 299, "AWD", SUV, { bat: 77, kw: 220, range: 561, kwh100: 15.8 }),
  ],
  "volkswagen-id3-i": [
    bev("Pure", 148, "RWD", HB, { bat: 45 }),
    bev("Pro", 145, "RWD", HB, { bat: 58 }),
    bev("Pro S", 204, "RWD", HB, { bat: 77, kw: 150 }),
  ],
  "volkswagen-id3-fl": [
    bev("Pro", 204, "RWD", HB, { bat: 59, kw: 150 }),
    bev("Pro S", 204, "RWD", HB, { bat: 77, kw: 150 }),
    bev("GTX", 326, "RWD", HB, { bat: 79, kw: 240 }),
  ],
  "volkswagen-id4-i": [
    bev("Pure", 148, "RWD", SC, { bat: 52 }),
    bev("Pro", 174, "RWD", SC, { bat: 77 }),
    bev("GTX", 299, "AWD", SC, { bat: 77, kw: 220 }),
  ],
  "volkswagen-id4-fl": [
    bev("Pro", 204, "RWD", SC, { bat: 77, kw: 150 }),
    bev("Pro S", 286, "RWD", SC, { bat: 77, kw: 210 }),
    bev("GTX", 340, "AWD", SC, { bat: 79, kw: 250 }),
  ],
  "volkswagen-id7-i": [
    bev("Pro S", 286, "RWD", FAST, { kw: 210 }),
    bev("GTX", 340, "AWD", FAST, { bat: 86, kw: 250, range: 585 }),
  ],

  "volkswagen-jetta-a5": [p6("1.4 TSI", 122, SED), petrol("1.4 TSI", 160, "FWD", "7DSG", SED), petrol("2.0 TSI", 200, "FWD", "6DSG", SED), d6("1.6 TDI", 105, SED), d6("2.0 TDI", 140, SED)],
  "volkswagen-jetta-a6": [p6("1.2 TSI", 105, SED), petrol("1.4 TSI", 150, "FWD", "7DSG", SED), d6("1.6 TDI", 105, SED), d7("2.0 TDI", 150, SED)],

  "volkswagen-lt-ii": [diesel("2.5 TDI", 109, "RWD", "5MT", VAN), diesel("2.8 TDI", 158, "RWD", "6MT", VAN)],
  "volkswagen-multivan-t7": [petrol("1.5 TSI", 136, "FWD", "7DSG", MPV), hybrid("1.5 eHybrid", 218, "FWD", "6DSG", MPV), diesel("2.0 TDI", 150, "FWD", "7DSG", MPV)],

  "volkswagen-passat-b6": [p6("1.6", 102, SW), petrol("1.8 TSI", 160, "FWD", "6MT", SW), petrol("2.0 TSI", 200, "FWD", "6AT", SW), petrol("3.2", 250, "AWD", "6DSG", SW), diesel("1.9 TDI", 105, "FWD", "5MT", SW), d6("2.0 TDI", 140, SW), diesel("2.0 TDI", 170, "FWD", "6DSG", SW)],
  "volkswagen-passat-b7": [petrol("1.4 TSI", 122, "FWD", "6MT", SW), petrol("1.8 TSI", 160, "FWD", "7DSG", SW), petrol("2.0 TSI", 210, "FWD", "6DSG", SW), d6("1.6 TDI", 105, SW), d6("2.0 TDI", 140, SW), diesel("2.0 TDI", 170, "FWD", "6DSG", SW)],
  "volkswagen-passat-b8": [petrol("1.4 TSI", 125, "FWD", "6MT", SW), petrol("1.5 TSI", 150, "FWD", "7DSG", SW), petrol("2.0 TSI", 272, "AWD", "7DSG", SW), phev("1.4 GTE", 218, "FWD", "6DSG", SW), d6("1.6 TDI", 120, SW), d7("2.0 TDI", 150, SW), diesel("2.0 TDI", 190, "AWD", "7DSG", SW)],
  "volkswagen-passat-b9": [hybrid("1.5 eTSI", 150, "FWD", "7DSG", "Wagon"), phev("eHybrid", 204, "FWD", "6DSG", "Wagon"), phev("eHybrid", 272, "FWD", "6DSG", "Wagon"), diesel("2.0 TDI", 150, "FWD", "7DSG", "Wagon")],

  "volkswagen-phaeton-i": [petrol("3.2", 241, "FWD", "6AT", SED), petrol("4.2", 335, "AWD", "6AT", SED), petrol("6.0 W12", 450, "AWD", "5AT", SED), diesel("3.0 TDI", 225, "AWD", "6AT", SED), diesel("5.0 V10 TDI", 313, "AWD", "6AT", SED)],

  "volkswagen-polo-9n3": [p5("1.2", 60, HB), p5("1.2", 70, HB), p5("1.4", 80, HB), petrol("1.8 T", 150, "FWD", "5MT", HB), diesel("1.4 TDI", 70, "FWD", "5MT", HB), diesel("1.4 TDI", 80, "FWD", "5MT", HB)],
  "volkswagen-polo-6r": [p5("1.2", 60, HB), p5("1.2", 70, HB), petrol("1.2 TSI", 90, "FWD", "5MT", HB), petrol("1.2 TSI", 110, "FWD", "6MT", HB), petrol("1.4 TSI", 150, "FWD", "7DSG", HB), petrol("1.8 TSI", 192, "FWD", "6MT", HB), diesel("1.2 TDI", 75, "FWD", "5MT", HB), d5("1.4 TDI", 90, HB), d6("1.6 TDI", 90, HB)],
  "volkswagen-polo-aw": [p5("1.0", 80, HB), p6("1.0 TSI", 95, HB), petrol("1.0 TSI", 110, "FWD", "7DSG", HB), petrol("1.0 TSI", 115, "FWD", "6MT", HB), petrol("2.0 TSI", 207, "FWD", "6DSG", HB), d6("1.6 TDI", 80, HB), d6("1.6 TDI", 95, HB)],

  "volkswagen-scirocco-iii": [petrol("1.4 TSI", 122, "FWD", "6MT", COUPE), petrol("1.4 TSI", 160, "FWD", "7DSG", COUPE), petrol("2.0 TSI", 210, "FWD", "6DSG", COUPE), petrol("2.0 TSI", 280, "FWD", "6DSG", COUPE), d6("2.0 TDI", 140, COUPE), diesel("2.0 TDI", 184, "FWD", "6DSG", COUPE)],

  "volkswagen-sharan-7m": [petrol("1.8 T", 150, "FWD", "5MT", MPV), petrol("2.0", 115, "FWD", "5MT", MPV), diesel("1.9 TDI", 115, "FWD", "6MT", MPV), diesel("2.0 TDI", 140, "FWD", "6MT", MPV)],
  "volkswagen-sharan-7n": [petrol("1.4 TSI", 150, "FWD", "6MT", MPV), petrol("2.0 TSI", 200, "FWD", "6DSG", MPV), d6("2.0 TDI", 115, MPV), d6("2.0 TDI", 140, MPV), diesel("2.0 TDI", 177, "FWD", "6DSG", MPV)],

  "volkswagen-t-cross-i": [p6("1.0 TSI", 95, SUV), petrol("1.0 TSI", 115, "FWD", "7DSG", SUV), petrol("1.5 TSI", 150, "FWD", "7DSG", SUV)],
  "volkswagen-t-roc-i": [p6("1.0 TSI", 115, SUV), petrol("1.5 TSI", 150, "FWD", "7DSG", SUV), petrol("2.0 TSI", 190, "AWD", "7DSG", SUV), petrol("2.0 TSI", 300, "AWD", "7DSG", SUV), d6("1.6 TDI", 115, SUV), d7("2.0 TDI", 150, SUV)],
  "volkswagen-t-roc-ii": [hybrid("1.5 eTSI", 116, "FWD", "7DSG", SUV, null, 85), hybrid("1.5 eTSI", 150, "FWD", "7DSG", SUV)],
  "volkswagen-taigo-i": [p6("1.0 TSI", 95, SUV), petrol("1.0 TSI", 110, "FWD", "7DSG", SUV), petrol("1.5 TSI", 150, "FWD", "7DSG", SUV)],

  "volkswagen-tiguan-5n": [petrol("1.4 TSI", 122, "FWD", "6MT", SUV), petrol("1.4 TSI", 150, "FWD", "6MT", SUV), petrol("2.0 TSI", 180, "AWD", "7DSG", SUV), petrol("2.0 TSI", 210, "AWD", "7DSG", SUV), d6("2.0 TDI", 110, SUV), d6("2.0 TDI", 140, SUV), diesel("2.0 TDI", 177, "AWD", "7DSG", SUV)],
  "volkswagen-tiguan-ad": [petrol("1.4 TSI", 125, "FWD", "6MT", "SUV, Allspace"), petrol("1.5 TSI", 150, "FWD", "6MT", "SUV, Allspace"), hybrid("1.5 eTSI", 150, "FWD", "7DSG", "SUV, Allspace"), petrol("2.0 TSI", 190, "AWD", "7DSG", "SUV, Allspace"), petrol("2.0 TSI", 320, "AWD", "7DSG", SUV), phev("1.4 eHybrid", 245, "FWD", "6DSG", SUV), d6("2.0 TDI", 115, "SUV, Allspace"), d6("2.0 TDI", 150, "SUV, Allspace"), diesel("2.0 TDI", 200, "AWD", "7DSG", "SUV, Allspace")],
  "volkswagen-tiguan-iii": [hybrid("1.5 eTSI", 150, "FWD", "7DSG", SUV), petrol("2.0 TSI", 265, "AWD", "7DSG", SUV), phev("eHybrid", 204, "FWD", "6DSG", SUV), diesel("2.0 TDI", 150, "FWD", "7DSG", SUV), diesel("2.0 TDI", 193, "AWD", "7DSG", SUV)],

  "volkswagen-touareg-7l": [petrol("3.2", 220, "AWD", "6AT", SUV), petrol("3.6", 280, "AWD", "6AT", SUV), petrol("4.2", 350, "AWD", "6AT", SUV), diesel("2.5 TDI", 174, "AWD", "6MT", SUV), diesel("3.0 TDI", 225, "AWD", "6AT", SUV), diesel("5.0 V10 TDI", 313, "AWD", "6AT", SUV)],
  "volkswagen-touareg-7p": [petrol("3.6", 280, "AWD", "8AT", SUV), petrol("4.2", 360, "AWD", "8AT", SUV), hybrid("3.0 Hybrid", 380, "AWD", "8AT", SUV), diesel("3.0 TDI", 204, "AWD", "8AT", SUV), diesel("3.0 TDI", 245, "AWD", "8AT", SUV), diesel("4.2 TDI", 340, "AWD", "8AT", SUV)],
  "volkswagen-touareg-cr": [petrol("3.0 TSI", 340, "AWD", "8AT", SUV), phev("3.0 eHybrid", 462, "AWD", "8AT", SUV), diesel("3.0 TDI", 231, "AWD", "8AT", SUV), diesel("3.0 TDI", 286, "AWD", "8AT", SUV)],

  "volkswagen-touran-1t": [petrol("1.4 TSI", 140, "FWD", "6MT", MPV), petrol("1.4 TSI", 170, "FWD", "7DSG", MPV), d6("1.6 TDI", 105, MPV), d6("2.0 TDI", 140, MPV)],
  "volkswagen-touran-5t": [p6("1.0 TSI", 115, MPV), petrol("1.5 TSI", 150, "FWD", "7DSG", MPV), d6("1.6 TDI", 115, MPV), d7("2.0 TDI", 150, MPV)],

  "volkswagen-transporter-t5": [petrol("2.0", 115, "FWD", "5MT", BUS), diesel("1.9 TDI", 102, "FWD", "5MT", BUS), diesel("2.0 TDI", 140, "FWD", "6MT", BUS), diesel("2.5 TDI", 174, "FWD", "6MT", BUS)],
  "volkswagen-transporter-t6": [diesel("2.0 TDI", 102, "FWD", "5MT", BUS), diesel("2.0 TDI", 150, "FWD", "6MT", BUS), diesel("2.0 TDI", 204, "AWD", "7DSG", BUS)],
  "volkswagen-transporter-t6-1": [diesel("2.0 TDI", 110, "FWD", "5MT", BUS), diesel("2.0 TDI", 150, "FWD", "7DSG", BUS), diesel("2.0 TDI", 199, "AWD", "7DSG", BUS), bev("e-Transporter", 113, "FWD", BUS, { bat: 37 })],
  "volkswagen-transporter-t7": [diesel("2.0 TDI", 110, "FWD", "6MT", BUS), diesel("2.0 TDI", 150, "FWD", "8AT", BUS), diesel("2.0 TDI", 170, "AWD", "8AT", BUS), bev("Electric", 218, "RWD", BUS), bev("Electric", 286, "AWD", BUS)],

  "volkswagen-up-i": [p5("1.0", 60, HB), p5("1.0", 75, HB), petrol("1.0 TSI", 115, "FWD", "6MT", HB), bev("e-up", 83, "FWD", HB, { bat: 36.8 })],
};

function d5(name, hp, body) {
  return diesel(name, hp, "FWD", "5MT", body);
}
