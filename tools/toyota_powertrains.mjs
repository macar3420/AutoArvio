/**
 * Toyota engines for the cars sold in Finland after 2005.
 * Current rows use the Finnish price lists and technical sheets.
 * A 48-volt pack is powertrain "hybrid" and is not stored as a traction battery.
 * Older rows are the European engines, without a consumption figure.
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
const HS = "Hatchback, Sedan";
const HW = "Hatchback, Wagon";
const SUV = "SUV";
const MPV = "MPV";
const VAN = "Van";
const VM = "Van, MPV";
const COUPE = "Coupe";
const ROAD = "Roadster";
const PICKUP = "Pickup";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);

export const TOYOTA_MAKE_IDS = ["toyota"];

export const TOYOTA_POWERTRAINS = {
  "toyota-auris-e150": [p6("1.33", 101, HW), p6("1.6", 132, HW), petrol("1.8 Hybrid", 136, "FWD", "eCVT", HW), d6("1.4 D-4D", 90, HW), d6("2.0 D-4D", 126, HW)],
  "toyota-auris-e180": [p6("1.2 T", 116, HW), petrol("1.8 Hybrid", 136, "FWD", "eCVT", HW), d6("1.4 D-4D", 90, HW), d6("1.6 D-4D", 112, HW)],

  "toyota-avensis-t25": [p6("1.8", 129, SW), p6("2.0", 147, SW), diesel("2.0 D-4D", 126, "FWD", "6MT", SW), diesel("2.2 D-4D", 150, "FWD", "6MT", SW), diesel("2.2 D-4D", 177, "FWD", "6MT", SW)],
  "toyota-avensis-t27": [p6("1.6", 132, SW), p6("1.8", 147, SW), petrol("1.8", 147, "FWD", "CVT", SW), d6("2.0 D-4D", 126, SW), diesel("2.2 D-4D", 150, "FWD", "6AT", SW)],
  "toyota-avensis-verso-i": [petrol("2.0", 150, "FWD", "4AT", MPV), diesel("2.0 D-4D", 116, "FWD", "5MT", MPV)],

  "toyota-aygo-ab40": [p5("1.0", 68, HB)],
  "toyota-aygo-ab40-fl": [p5("1.0", 69, HB), petrol("1.0", 69, "FWD", "CVT", HB)],
  "toyota-aygo-x-i": [p5("1.0", 72, HB)],
  "toyota-aygo-x-hybrid": [hybrid("1.5 Hybrid", 116, "FWD", "eCVT", HB, 3.8, 85)],

  "toyota-bz4x-i": [
    bev("Electric", 204, "FWD", SUV, { bat: 71.4 }),
    bev("Electric AWD", 218, "AWD", SUV, { bat: 71.4 }),
  ],
  "toyota-bz4x-fl": [
    bev("57.7 kWh", 167, "FWD", SUV, { bat: 57.7, kw: 123 }),
    bev("73.1 kWh", 224, "FWD", SUV, { bat: 73.1, kw: 165 }),
    bev("73.1 kWh AWD", 343, "AWD", SUV, { bat: 73.1, kw: 252 }),
  ],

  "toyota-c-hr-ax10": [hybrid("1.8 Hybrid", 122, "FWD", "eCVT", SUV), hybrid("2.0 Hybrid", 184, "AWD", "eCVT", SUV)],
  "toyota-c-hr-ax20": [
    hybrid("1.8 Hybrid", 140, "FWD", "eCVT", SUV, null, 103),
    hybrid("2.0 Hybrid", 197, "AWD", "eCVT", SUV),
    phev("2.0 Plug-in", 223, "FWD", "eCVT", SUV),
  ],
  "toyota-c-hr-plus-c-hr": [
    bev("77 kWh", 224, "FWD", SUV, { bat: 77, kw: 165, range: 607 }),
    bev("77 kWh AWD", 343, "AWD", SUV, { bat: 77, kw: 252, range: 548 }),
  ],

  "toyota-camry-xv40": [petrol("2.4", 167, "FWD", "5AT", SED), hybrid("2.4 Hybrid", 187, "FWD", "eCVT", SED)],
  "toyota-camry-xv70": [hybrid("2.5 Hybrid", 218, "FWD", "eCVT", SED, null, 160)],
  "toyota-camry-xv80": [hybrid("2.5 Hybrid", 230, "FWD", "eCVT", SED, null, 169)],

  "toyota-celica-t230": [p6("1.8", 143, COUPE), petrol("1.8", 192, "FWD", "6MT", COUPE)],

  "toyota-corolla-e120": [p5("1.4", 97, HS), p5("1.6", 110, HS), diesel("2.0 D-4D", 90, "FWD", "5MT", HS), diesel("2.0 D-4D", 116, "FWD", "5MT", HS)],
  "toyota-corolla-e150": [p6("1.33", 101, SED), p6("1.6", 132, SED), d6("1.4 D-4D", 90, SED)],
  "toyota-corolla-e170": [p6("1.2 T", 116, SED), p6("1.6", 132, SED), d6("1.4 D-4D", 90, SED), d6("1.6 D-4D", 112, SED)],
  "toyota-corolla-e210": [
    hybrid("1.8 Hybrid", 140, "FWD", "eCVT", "Hatchback, Sedan, Wagon", null, 103),
    hybrid("2.0 Hybrid", 196, "FWD", "eCVT", "Hatchback, Wagon", null, 144),
  ],
  "toyota-corolla-cross-cross": [
    hybrid("1.8 Hybrid", 140, "FWD", "eCVT", SUV, null, 103),
    hybrid("2.0 Hybrid", 197, "AWD", "eCVT", SUV),
  ],
  "toyota-corolla-verso-ar10": [petrol("1.8", 129, "FWD", "5MT", MPV), diesel("2.0 D-4D", 116, "FWD", "5MT", MPV), diesel("2.2 D-4D", 136, "FWD", "6MT", MPV), diesel("2.2 D-4D", 177, "FWD", "6MT", MPV)],

  "toyota-gr-yaris-i": [petrol("1.6 Turbo", 261, "AWD", "6MT", HB, null, 192)],
  "toyota-gr-yaris-fl": [
    petrol("1.6 Turbo", 280, "AWD", "6MT", HB, 8.7, 206),
    petrol("1.6 Turbo", 280, "AWD", "8AT", HB, 9.5, 206),
  ],

  "toyota-gt86-gt86": [petrol("2.0", 200, "RWD", "6MT", COUPE, null, 147), petrol("2.0", 200, "RWD", "6AT", COUPE, null, 147)],
  "toyota-gt86-gr86": [petrol("2.4", 234, "RWD", "6MT", COUPE, null, 172), petrol("2.4", 234, "RWD", "6AT", COUPE, null, 172)],

  "toyota-hiace-h200": [diesel("2.5 D-4D", 117, "FWD", "5MT", VAN), diesel("2.5 D-4D", 117, "RWD", "5MT", VAN)],
  "toyota-highlander-xu70": [hybrid("2.5 Hybrid", 248, "AWD", "eCVT", SUV)],

  "toyota-hilux-an10": [diesel("2.5 D-4D", 144, "AWD", "5MT", PICKUP), diesel("3.0 D-4D", 171, "AWD", "5AT", PICKUP)],
  "toyota-hilux-an120": [
    diesel("2.4 D-4D", 150, "AWD", "6MT", PICKUP),
    diesel("2.8 D-4D", 204, "AWD", "6AT", PICKUP),
    hybrid("2.8 D-4D 48V", 204, "AWD", "6AT", PICKUP),
  ],

  "toyota-iq-aj10": [p5("1.0", 68, HB), petrol("1.33", 98, "FWD", "6MT", HB)],

  "toyota-land-cruiser-j100": [diesel("4.2 TD", 204, "AWD", "5AT", SUV), petrol("4.7 V8", 235, "AWD", "5AT", SUV)],
  "toyota-land-cruiser-j120": [diesel("3.0 D-4D", 166, "AWD", "5AT", SUV), diesel("3.0 D-4D", 173, "AWD", "5AT", SUV)],
  "toyota-land-cruiser-j150": [diesel("2.8 D-4D", 177, "AWD", "6AT", SUV), diesel("2.8 D-4D", 204, "AWD", "6AT", SUV)],
  "toyota-land-cruiser-j200": [diesel("4.5 D-4D", 286, "AWD", "6AT", SUV), petrol("4.6 V8", 318, "AWD", "6AT", SUV), petrol("5.7 V8", 381, "AWD", "6AT", SUV)],
  "toyota-land-cruiser-j250": [hybrid("2.8 D-4D MHEV", 205, "AWD", "6AT", SUV, null, 151)],

  "toyota-mr2-w30": [petrol("1.8", 140, "RWD", "5MT", ROAD)],
  "toyota-previa-xr30": [petrol("2.4", 156, "FWD", "4AT", MPV), diesel("2.0 D-4D", 116, "FWD", "5MT", MPV)],

  "toyota-prius-xw20": [hybrid("1.5 Hybrid", 110, "FWD", "eCVT", HB)],
  "toyota-prius-xw30": [hybrid("1.8 Hybrid", 136, "FWD", "eCVT", HB), phev("1.8 Plug-in", 136, "FWD", "eCVT", HB)],
  "toyota-prius-xw50": [hybrid("1.8 Hybrid", 122, "FWD", "eCVT", HB), phev("1.8 Plug-in", 122, "FWD", "eCVT", HB)],
  "toyota-prius-xw60": [
    hybrid("2.0 Hybrid", 196, "FWD", "eCVT", HB, null, 144),
    phev("2.0 Plug-in", 223, "FWD", "eCVT", HB, { kw: 164 }),
  ],

  "toyota-proace-i": [
    diesel("1.5 D", 120, "FWD", "6MT", VM),
    diesel("2.0 D", 150, "FWD", "8AT", VM),
    bev("Electric 50 kWh", 136, "FWD", VM, { bat: 50 }),
    bev("Electric 75 kWh", 136, "FWD", VM, { bat: 75 }),
  ],
  "toyota-proace-city-i": [
    diesel("1.5 D", 100, "FWD", "6MT", VAN),
    diesel("1.5 D", 130, "FWD", "8AT", VAN),
    bev("Electric 50 kWh", 136, "FWD", VAN, { bat: 50 }),
  ],
  "toyota-proace-max-i": [
    diesel("2.2 D", 140, "FWD", "6MT", VAN),
    diesel("2.2 D", 180, "FWD", "8AT", VAN),
  ],

  "toyota-rav4-xa30": [petrol("2.0", 152, "FWD", "6MT", SUV), petrol("2.0", 158, "AWD", "CVT", SUV), diesel("2.2 D-4D", 150, "AWD", "6MT", SUV), diesel("2.2 D-4D", 177, "AWD", "6AT", SUV)],
  "toyota-rav4-xa40": [petrol("2.0", 151, "FWD", "6MT", SUV), petrol("2.5", 197, "AWD", "6AT", SUV), hybrid("2.5 Hybrid", 197, "AWD", "eCVT", SUV), diesel("2.0 D-4D", 143, "AWD", "6MT", SUV), diesel("2.2 D-4D", 150, "AWD", "6AT", SUV)],
  "toyota-rav4-xa50": [
    hybrid("2.5 Hybrid", 218, "FWD", "eCVT", SUV, null, 160),
    hybrid("2.5 Hybrid", 222, "AWD", "eCVT", SUV),
    phev("2.5 Plug-in", 306, "AWD", "eCVT", SUV),
  ],
  "toyota-rav4-xa60": [
    phev("2.5 Plug-in", 268, "FWD", "eCVT", SUV, { kw: 197 }),
    phev("2.5 Plug-in", 304, "AWD", "eCVT", SUV, { kw: 224 }),
  ],

  "toyota-supra-a90": [
    petrol("2.0", 258, "RWD", "8AT", COUPE),
    petrol("3.0", 340, "RWD", "8AT", COUPE, null, 250),
  ],

  "toyota-urban-cruiser-xp110": [petrol("1.33", 101, "FWD", "6MT", SUV), petrol("1.33", 101, "AWD", "6MT", SUV)],
  "toyota-urban-cruiser-ev": [
    bev("61 kWh", 174, "FWD", SUV, { bat: 61, kw: 128 }),
    bev("61 kWh AWD", 184, "AWD", SUV, { bat: 61, kw: 135 }),
  ],

  "toyota-verso-i": [petrol("1.6", 132, "FWD", "6MT", MPV), petrol("1.8", 147, "FWD", "CVT", MPV), diesel("1.6 D-4D", 112, "FWD", "6MT", MPV), diesel("2.0 D-4D", 124, "FWD", "6MT", MPV)],
  "toyota-verso-s-i": [petrol("1.33", 99, "FWD", "6MT", MPV), d6("1.4 D-4D", 90, MPV)],

  "toyota-yaris-xp90": [p5("1.0", 69, HB), p5("1.3", 87, HB), p5("1.8", 133, HB), diesel("1.4 D-4D", 90, "FWD", "5MT", HB)],
  "toyota-yaris-xp130": [p5("1.0", 69, HB), p6("1.33", 99, HB), petrol("1.5 Hybrid", 100, "FWD", "eCVT", HB), d6("1.4 D-4D", 90, HB)],
  "toyota-yaris-xp210": [
    hybrid("1.5 Hybrid", 116, "FWD", "eCVT", HB, null, 85),
    hybrid("1.5 Hybrid", 130, "FWD", "eCVT", HB, null, 96),
  ],
  "toyota-yaris-cross-i": [
    hybrid("1.5 Hybrid", 116, "FWD", "eCVT", SUV, null, 85),
    hybrid("1.5 Hybrid", 116, "AWD", "eCVT", SUV, null, 85),
  ],
  "toyota-yaris-cross-fl": [
    hybrid("1.5 Hybrid", 130, "FWD", "eCVT", SUV, 4.4, 96),
    hybrid("1.5 Hybrid", 130, "AWD", "eCVT", SUV, 5.1, 96),
  ],
};
