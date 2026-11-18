/**
 * Ford powertrains for the cars commonly sold in Finland.
 * Current cars follow the 2026 Ford Finland price lists.
 * Older rows are the European engines of that generation.
 * Litres are stored only when a brochure combined figure is known.
 * Manual and automatic are separate rows.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
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

const petrol = (name, hp, drive, gear, body, l, kw) =>
  fuel("petrol", name, hp, drive, gear, body, l, kw);
const diesel = (name, hp, drive, gear, body, l, kw) =>
  fuel("diesel", name, hp, drive, gear, body, l, kw);
const hybrid = (name, hp, drive, gear, body, l, kw) =>
  fuel("hybrid", name, hp, drive, gear, body, l, kw);

function phev(name, hp, drive, gear, l, bat, erange, body, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, l, kw);
  if (bat != null) row.batteryKwh = bat;
  if (erange != null) {
    row.electricRangeKm = erange;
    row.rangeStandard = W;
  }
  return row;
}

function bev(name, hp, drive, bat, range, kwh100, body, kw) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: W,
  };
  if (kwh100 != null) {
    row.consumptionCombinedKwh = kwh100;
    row.consumptionStandard = W;
  }
  return row;
}

const SUV = "SUV";
const COUPE = "Coupe";
const PICKUP = "Pickup";
const MPV = "MPV";
const VAN = "Van";
const HB = "Hatchback";
const HW = "Hatchback, Wagon";
const SW = "Sedan, Wagon";

const p = (name, hp, gear, body, drive = "FWD") => petrol(name, hp, drive, gear, body);
const d = (name, hp, gear, body, drive = "FWD") => diesel(name, hp, drive, gear, body);

const courier1 = (body) => [
  p("1.0 EcoBoost 100", 100, "5MT", body),
  d("1.5 TDCi 75", 75, "5MT", body),
  d("1.6 TDCi 95", 95, "5MT", body),
];

const connect1 = (body) => [
  d("1.8 TDCi 75", 75, "5MT", body),
  d("1.8 TDCi 90", 90, "5MT", body),
  d("1.8 TDCi 110", 110, "5MT", body),
];

const connect2 = (body) => [
  p("1.0 EcoBoost 100", 100, "5MT", body),
  d("1.6 TDCi 75", 75, "5MT", body),
  d("1.6 TDCi 95", 95, "5MT", body),
  d("1.6 TDCi 115", 115, "5MT", body),
  d("1.6 TDCi 115", 115, "6AT", body),
];

const connect2fl = (body) => [
  p("1.0 EcoBoost 100", 100, "6MT", body),
  d("1.5 EcoBlue 75", 75, "6MT", body),
  d("1.5 EcoBlue 100", 100, "6MT", body),
  d("1.5 EcoBlue 120", 120, "6MT", body),
  d("1.5 EcoBlue 120", 120, "8AT", body),
];

const connect3 = (body) => [
  d("2.0 EcoBlue 102", 102, "6MT", body),
  d("2.0 EcoBlue 122", 122, "7DSG", body),
];

const custom1 = (body) => [
  d("2.2 TDCi 100", 100, "6MT", body),
  d("2.2 TDCi 125", 125, "6MT", body),
  d("2.2 TDCi 155", 155, "6MT", body),
  d("2.2 TDCi 155", 155, "6AT", body),
];

const custom1fl = (body) => [
  d("2.0 EcoBlue 105", 105, "6MT", body),
  d("2.0 EcoBlue 130", 130, "6MT", body),
  d("2.0 EcoBlue 130", 130, "6AT", body),
  hybrid("2.0 EcoBlue Hybrid 130", 130, "FWD", "6MT", body),
  d("2.0 EcoBlue 170", 170, "6AT", body),
];

const cmax1 = (body) => [
  p("1.6 100", 100, "5MT", body),
  p("1.8 125", 125, "5MT", body),
  p("2.0 145", 145, "5MT", body),
  d("1.6 TDCi 90", 90, "5MT", body),
  d("1.6 TDCi 109", 109, "5MT", body),
  d("1.8 TDCi 115", 115, "5MT", body),
  d("2.0 TDCi 136", 136, "6MT", body),
];

const cmax2 = (body) => [
  p("1.0 EcoBoost 100", 100, "5MT", body),
  p("1.0 EcoBoost 125", 125, "6MT", body),
  p("1.6 Ti-VCT 105", 105, "5MT", body),
  p("1.6 Ti-VCT 125", 125, "5MT", body),
  p("1.6 EcoBoost 150", 150, "6MT", body),
  d("1.6 TDCi 95", 95, "6MT", body),
  d("1.6 TDCi 115", 115, "6MT", body),
  d("2.0 TDCi 140", 140, "6MT", body),
  d("2.0 TDCi 163", 163, "6MT", body),
  d("2.0 TDCi 163", 163, "6DCT", body),
];

const cmax2fl = (body) => [
  p("1.0 EcoBoost 100", 100, "6MT", body),
  p("1.0 EcoBoost 125", 125, "6MT", body),
  p("1.0 EcoBoost 125", 125, "6AT", body),
  p("1.5 EcoBoost 150", 150, "6MT", body),
  d("1.5 TDCi 95", 95, "6MT", body),
  d("1.5 TDCi 120", 120, "6MT", body),
  d("1.5 TDCi 120", 120, "6AT", body),
  d("2.0 TDCi 150", 150, "6MT", body),
  d("2.0 TDCi 150", 150, "6DCT", body),
];

const people1 = (body) => [
  p("2.0 145", 145, "5MT", body),
  p("2.3 161", 161, "6MT", body),
  p("2.5 220", 220, "6MT", body),
  d("1.8 TDCi 125", 125, "6MT", body),
  d("2.0 TDCi 140", 140, "6MT", body),
  d("2.0 TDCi 140", 140, "6AT", body),
  d("2.2 TDCi 175", 175, "6MT", body),
];

const people1fl = (body) => [
  p("1.6 EcoBoost 160", 160, "6MT", body),
  p("2.0 EcoBoost 203", 203, "6DCT", body),
  p("2.0 EcoBoost 240", 240, "6DCT", body),
  d("1.6 TDCi 115", 115, "6MT", body),
  d("2.0 TDCi 140", 140, "6MT", body),
  d("2.0 TDCi 163", 163, "6MT", body),
  d("2.0 TDCi 163", 163, "6DCT", body),
  d("2.2 TDCi 200", 200, "6MT", body),
  d("2.2 TDCi 200", 200, "6DCT", body),
];

const people2 = (body) => [
  p("1.5 EcoBoost 160", 160, "6MT", body),
  p("1.5 EcoBoost 160", 160, "6AT", body),
  p("2.0 EcoBoost 240", 240, "6AT", body),
  d("2.0 TDCi 120", 120, "6MT", body),
  d("2.0 TDCi 150", 150, "6MT", body),
  d("2.0 TDCi 150", 150, "6AT", body),
  d("2.0 TDCi 180", 180, "6AT", body),
  d("2.0 TDCi 180", 180, "6AT", body, "AWD"),
  d("2.0 TDCi 210", 210, "6AT", body),
];

const people2fl = (body) => [
  p("1.5 EcoBoost 165", 165, "6MT", body),
  p("1.5 EcoBoost 165", 165, "8AT", body),
  d("2.0 EcoBlue 150", 150, "6MT", body),
  d("2.0 EcoBlue 150", 150, "8AT", body),
  d("2.0 EcoBlue 190", 190, "8AT", body),
  d("2.0 EcoBlue 190", 190, "8AT", body, "AWD"),
];

export const FORD_MAKE_IDS = ["ford"];

/** @type {Record<string, object[]>} */
export const FORD_POWERTRAINS = {
  "ford-fiesta-mk4": [
    p("1.25 16V 75", 75, "5MT", HB),
    p("1.3 50", 50, "5MT", HB),
    p("1.3 60", 60, "5MT", HB),
    p("1.4 16V 90", 90, "5MT", HB),
    d("1.8 D 60", 60, "5MT", HB),
  ],
  "ford-fiesta-mk5": [
    p("1.25 16V 75", 75, "5MT", HB),
    p("1.3 60", 60, "5MT", HB),
    p("1.4 16V 90", 90, "5MT", HB),
    p("1.6 16V 103", 103, "5MT", HB),
    d("1.8 TDDi 75", 75, "5MT", HB),
  ],
  "ford-fiesta-mk6": [
    p("1.25 75", 75, "5MT", HB),
    p("1.4 80", 80, "5MT", HB),
    p("1.4 80", 80, "4AT", HB),
    p("1.6 100", 100, "5MT", HB),
    p("1.6 100", 100, "4AT", HB),
    d("1.4 TDCi 68", 68, "5MT", HB),
    d("1.6 TDCi 90", 90, "5MT", HB),
    p("ST 2.0 150", 150, "5MT", HB),
  ],
  "ford-fiesta-mk7": [
    p("1.25 60", 60, "5MT", HB),
    p("1.25 82", 82, "5MT", HB),
    p("1.4 96", 96, "5MT", HB),
    p("1.4 96", 96, "4AT", HB),
    p("1.6 Ti-VCT 120", 120, "5MT", HB),
    d("1.4 TDCi 68", 68, "5MT", HB),
    d("1.6 TDCi 75", 75, "5MT", HB),
    d("1.6 TDCi 90", 90, "5MT", HB),
  ],
  "ford-fiesta-mk7-fl": [
    p("1.25 82", 82, "5MT", HB),
    p("1.0 EcoBoost 80", 80, "5MT", HB),
    p("1.0 EcoBoost 100", 100, "5MT", HB),
    p("1.0 EcoBoost 100", 100, "6DCT", HB),
    p("1.0 EcoBoost 125", 125, "6MT", HB),
    d("1.5 TDCi 75", 75, "5MT", HB),
    d("1.5 TDCi 95", 95, "5MT", HB),
    p("ST 1.6 EcoBoost 182", 182, "6MT", HB),
    p("ST200 1.6 EcoBoost 200", 200, "6MT", HB),
  ],
  "ford-fiesta-mk8": [
    p("1.1 Ti-VCT 70", 70, "5MT", HB),
    p("1.1 Ti-VCT 85", 85, "5MT", HB),
    p("1.0 EcoBoost 100", 100, "6MT", HB),
    p("1.0 EcoBoost 125", 125, "6MT", HB),
    p("1.0 EcoBoost 140", 140, "6MT", HB),
    d("1.5 TDCi 85", 85, "6MT", HB),
    d("1.5 TDCi 120", 120, "6MT", HB),
    p("ST 1.5 EcoBoost 200", 200, "6MT", HB),
  ],
  "ford-fiesta-mk8-fl": [
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "6MT", HB),
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "7DCT", HB),
    hybrid("1.0 EcoBoost Hybrid 155", 155, "FWD", "7DCT", HB),
    d("1.5 TDCi 85", 85, "6MT", HB),
    p("ST 1.5 EcoBoost 200", 200, "6MT", HB),
  ],

  "ford-ka-i": [
    p("1.3 50", 50, "5MT", HB),
    p("1.3 60", 60, "5MT", HB),
    p("1.3 70", 70, "5MT", HB),
    p("SportKa 1.6 95", 95, "5MT", HB),
  ],
  "ford-ka-ii": [
    p("1.2 69", 69, "5MT", HB),
    d("1.3 TDCi 75", 75, "5MT", HB),
  ],
  "ford-ka-ka": [
    p("1.2 70", 70, "5MT", HB),
    p("1.2 85", 85, "5MT", HB),
  ],

  "ford-puma-puma": [
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "6MT", SUV),
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "7DCT", SUV),
    hybrid("1.0 EcoBoost Hybrid 155", 155, "FWD", "7DCT", SUV),
    p("ST 1.5 EcoBoost 200", 200, "6MT", SUV),
  ],
  "ford-puma-puma-fl": [
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "6MT", SUV, 5.3, 92),
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "7DCT", SUV, 5.6, 92),
    hybrid("1.0 EcoBoost Hybrid 155", 155, "FWD", "7DCT", SUV, 5.6, 114),
    hybrid("1.0 EcoBoost Hybrid 160 ST", 160, "FWD", "7DCT", SUV, 5.9, 118),
  ],
  "ford-puma-gen-e-gen-e": [
    bev("Gen-E", 168, "FWD", 46.8, 417, 13.1, SUV, 123.5),
  ],

  "ford-focus-mk1": [
    p("1.4 16V 75", 75, "5MT", HW),
    p("1.6 16V 100", 100, "5MT", HW),
    p("1.6 16V 100", 100, "4AT", HW),
    p("1.8 16V 115", 115, "5MT", HW),
    p("2.0 16V 130", 130, "5MT", HW),
    p("2.0 16V 130", 130, "4AT", HW),
    d("1.8 TDDi 75", 75, "5MT", HW),
    d("1.8 TDDi 90", 90, "5MT", HW),
  ],
  "ford-focus-mk1-fl": [
    p("1.4 16V 75", 75, "5MT", HW),
    p("1.6 16V 100", 100, "5MT", HW),
    p("1.6 16V 100", 100, "4AT", HW),
    p("1.8 16V 115", 115, "5MT", HW),
    p("2.0 16V 130", 130, "5MT", HW),
    p("2.0 16V 130", 130, "4AT", HW),
    d("1.8 TDCi 100", 100, "5MT", HW),
    d("1.8 TDCi 115", 115, "5MT", HW),
    p("ST170 2.0 173", 173, "6MT", HB),
    p("RS 2.0 215", 215, "5MT", HB),
  ],
  "ford-focus-mk2": [
    p("1.4 80", 80, "5MT", HW),
    p("1.6 100", 100, "5MT", HW),
    p("1.6 100", 100, "4AT", HW),
    p("1.6 Ti-VCT 115", 115, "5MT", HW),
    p("1.8 125", 125, "5MT", HW),
    p("2.0 145", 145, "5MT", HW),
    d("1.6 TDCi 90", 90, "5MT", HW),
    d("1.6 TDCi 109", 109, "5MT", HW),
    d("1.8 TDCi 115", 115, "5MT", HW),
    d("2.0 TDCi 136", 136, "6MT", HW),
    p("ST 2.5 225", 225, "6MT", HB),
  ],
  "ford-focus-mk2-fl": [
    p("1.4 80", 80, "5MT", HW),
    p("1.6 100", 100, "5MT", HW),
    p("1.6 100", 100, "4AT", HW),
    p("1.6 Ti-VCT 115", 115, "5MT", HW),
    p("2.0 145", 145, "5MT", HW),
    d("1.6 TDCi 90", 90, "5MT", HW),
    d("1.6 TDCi 109", 109, "5MT", HW),
    d("2.0 TDCi 110", 110, "6MT", HW),
    d("2.0 TDCi 136", 136, "6MT", HW),
    d("2.0 TDCi 136", 136, "6DCT", HW),
    p("ST 2.5 225", 225, "6MT", HB),
    p("RS 2.5 305", 305, "6MT", HB),
  ],
  "ford-focus-mk3": [
    p("1.0 EcoBoost 100", 100, "5MT", HW),
    p("1.0 EcoBoost 125", 125, "6MT", HW),
    p("1.6 Ti-VCT 105", 105, "5MT", HW),
    p("1.6 Ti-VCT 125", 125, "5MT", HW),
    p("1.6 EcoBoost 150", 150, "6MT", HW),
    p("1.6 EcoBoost 182", 182, "6MT", HW),
    d("1.6 TDCi 95", 95, "6MT", HW),
    d("1.6 TDCi 115", 115, "6MT", HW),
    d("2.0 TDCi 140", 140, "6MT", HW),
    d("2.0 TDCi 163", 163, "6MT", HW),
    d("2.0 TDCi 163", 163, "6DCT", HW),
    p("ST 2.0 EcoBoost 250", 250, "6MT", HW),
  ],
  "ford-focus-mk3-fl": [
    p("1.0 EcoBoost 100", 100, "6MT", HW),
    p("1.0 EcoBoost 125", 125, "6MT", HW),
    p("1.0 EcoBoost 125", 125, "6AT", HW),
    p("1.5 EcoBoost 150", 150, "6MT", HW),
    p("1.5 EcoBoost 182", 182, "6MT", HW),
    d("1.5 TDCi 95", 95, "6MT", HW),
    d("1.5 TDCi 120", 120, "6MT", HW),
    d("1.5 TDCi 120", 120, "6AT", HW),
    d("2.0 TDCi 150", 150, "6MT", HW),
    d("2.0 TDCi 150", 150, "6DCT", HW),
    p("ST 2.0 EcoBoost 250", 250, "6MT", HW),
    d("ST TDCi 185", 185, "6MT", HW),
    petrol("RS 2.3 EcoBoost 350", 350, "AWD", "6MT", HB),
  ],
  "ford-focus-mk4": [
    p("1.0 EcoBoost 100", 100, "6MT", HW),
    p("1.0 EcoBoost 125", 125, "6MT", HW),
    p("1.0 EcoBoost 125", 125, "6AT", HW),
    p("1.5 EcoBoost 150", 150, "6MT", HW),
    p("1.5 EcoBoost 150", 150, "8AT", HW),
    p("1.5 EcoBoost 182", 182, "6MT", HW),
    d("1.5 EcoBlue 95", 95, "6MT", HW),
    d("1.5 EcoBlue 120", 120, "6MT", HW),
    d("1.5 EcoBlue 120", 120, "8AT", HW),
    d("2.0 EcoBlue 150", 150, "6MT", HW),
    d("2.0 EcoBlue 150", 150, "8AT", HW),
    p("ST 2.3 EcoBoost 280", 280, "6MT", HW),
    p("ST 2.3 EcoBoost 280", 280, "7AT", HW),
  ],
  "ford-focus-mk4-fl": [
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "6MT", HW),
    hybrid("1.0 EcoBoost Hybrid 125", 125, "FWD", "7DCT", HW),
    hybrid("1.0 EcoBoost Hybrid 155", 155, "FWD", "7DCT", HW),
    d("1.5 EcoBlue 95", 95, "6MT", HW),
    d("1.5 EcoBlue 120", 120, "6MT", HW),
    d("1.5 EcoBlue 120", 120, "8AT", HW),
    p("ST 2.3 EcoBoost 280", 280, "6MT", HW),
    p("ST 2.3 EcoBoost 280", 280, "7AT", HW),
  ],

  "ford-focus-c-max-c-max": cmax1(MPV),
  "ford-c-max-ii": cmax2(MPV),
  "ford-c-max-ii-fl": cmax2fl(MPV),
  "ford-grand-c-max-ii": cmax2(MPV),
  "ford-grand-c-max-ii-fl": cmax2fl(MPV),

  "ford-b-max-b-max": [
    p("1.4 90", 90, "5MT", MPV),
    p("1.6 105", 105, "5MT", MPV),
    p("1.0 EcoBoost 100", 100, "5MT", MPV),
    p("1.0 EcoBoost 125", 125, "5MT", MPV),
    p("1.0 EcoBoost 125", 125, "6DCT", MPV),
    p("1.0 EcoBoost 140", 140, "6MT", MPV),
    d("1.5 TDCi 75", 75, "5MT", MPV),
    d("1.6 TDCi 95", 95, "5MT", MPV),
  ],

  "ford-fusion-fusion": [
    p("1.4 80", 80, "5MT", MPV),
    p("1.6 100", 100, "5MT", MPV),
    d("1.4 TDCi 68", 68, "5MT", MPV),
    d("1.6 TDCi 90", 90, "5MT", MPV),
  ],

  "ford-ecosport-ecosport": [
    p("1.0 EcoBoost 125", 125, "5MT", SUV),
    p("1.5 112", 112, "5MT", SUV),
    d("1.5 TDCi 95", 95, "5MT", SUV),
  ],
  "ford-ecosport-ecosport-fl": [
    p("1.0 EcoBoost 125", 125, "6MT", SUV),
    p("1.0 EcoBoost 125", 125, "6AT", SUV),
    p("1.0 EcoBoost 140", 140, "6MT", SUV),
    d("1.5 TDCi 100", 100, "6MT", SUV),
  ],

  "ford-mondeo-mk1": [
    p("1.6 16V 90", 90, "5MT", SW),
    p("1.8 16V 115", 115, "5MT", SW),
    p("2.0 16V 136", 136, "5MT", SW),
    p("2.5 V6 170", 170, "5MT", SW),
    d("1.8 TD 90", 90, "5MT", SW),
  ],
  "ford-mondeo-mk1-fl": [
    p("1.6 16V 90", 90, "5MT", SW),
    p("1.8 16V 115", 115, "5MT", SW),
    p("2.0 16V 131", 131, "5MT", SW),
    p("2.5 V6 170", 170, "5MT", SW),
    p("ST200 2.5 205", 205, "5MT", SW),
    d("1.8 TD 90", 90, "5MT", SW),
  ],
  "ford-mondeo-mk2": [
    p("1.8 110", 110, "5MT", SW),
    p("1.8 125", 125, "5MT", SW),
    p("2.0 145", 145, "5MT", SW),
    p("2.5 V6 170", 170, "5MT", SW),
    p("ST220 3.0 226", 226, "6MT", SW),
    d("2.0 TDDi 90", 90, "5MT", SW),
    d("2.0 TDDi 115", 115, "5MT", SW),
    d("2.0 TDCi 130", 130, "6MT", SW),
  ],
  "ford-mondeo-mk2-fl": [
    p("1.8 110", 110, "5MT", SW),
    p("1.8 125", 125, "5MT", SW),
    p("2.0 145", 145, "5MT", SW),
    p("ST220 3.0 226", 226, "6MT", SW),
    d("1.8 TDCi 100", 100, "5MT", SW),
    d("1.8 TDCi 125", 125, "6MT", SW),
    d("2.0 TDCi 115", 115, "6MT", SW),
    d("2.0 TDCi 130", 130, "6MT", SW),
    d("2.2 TDCi 155", 155, "6MT", SW),
  ],
  "ford-mondeo-mk3": [
    p("1.6 125", 125, "5MT", SW),
    p("2.0 145", 145, "5MT", SW),
    p("2.0 145", 145, "6AT", SW),
    p("2.3 161", 161, "6AT", SW),
    p("2.5 220", 220, "6MT", SW),
    p("2.5 220", 220, "6AT", SW),
    d("1.8 TDCi 100", 100, "5MT", SW),
    d("1.8 TDCi 125", 125, "6MT", SW),
    d("2.0 TDCi 140", 140, "6MT", SW),
    d("2.0 TDCi 140", 140, "6AT", SW),
    d("2.2 TDCi 175", 175, "6MT", SW),
  ],
  "ford-mondeo-mk3-fl": [
    p("1.6 Ti-VCT 120", 120, "5MT", SW),
    p("1.6 EcoBoost 160", 160, "6MT", SW),
    p("1.6 EcoBoost 160", 160, "6DCT", SW),
    p("2.0 EcoBoost 203", 203, "6DCT", SW),
    p("2.0 EcoBoost 240", 240, "6DCT", SW),
    d("1.6 TDCi 115", 115, "6MT", SW),
    d("2.0 TDCi 115", 115, "6MT", SW),
    d("2.0 TDCi 140", 140, "6MT", SW),
    d("2.0 TDCi 163", 163, "6MT", SW),
    d("2.0 TDCi 163", 163, "6DCT", SW),
    d("2.2 TDCi 200", 200, "6MT", SW),
    d("2.2 TDCi 200", 200, "6DCT", SW),
  ],
  "ford-mondeo-mk4": [
    p("1.5 EcoBoost 160", 160, "6MT", SW),
    p("1.5 EcoBoost 160", 160, "6AT", SW),
    p("2.0 EcoBoost 203", 203, "6AT", SW),
    p("2.0 EcoBoost 240", 240, "6AT", SW),
    d("1.6 TDCi 115", 115, "6MT", SW),
    d("2.0 TDCi 150", 150, "6MT", SW),
    d("2.0 TDCi 150", 150, "6AT", SW),
    d("2.0 TDCi 180", 180, "6AT", SW),
    d("2.0 TDCi 180", 180, "6AT", SW, "AWD"),
    d("2.0 TDCi 210", 210, "6AT", SW, "AWD"),
    hybrid("Hybrid 187", 187, "FWD", "eCVT", SW),
  ],
  "ford-mondeo-mk4-fl": [
    p("1.5 EcoBoost 165", 165, "6MT", SW),
    p("1.5 EcoBoost 165", 165, "8AT", SW),
    d("2.0 EcoBlue 150", 150, "6MT", SW),
    d("2.0 EcoBlue 150", 150, "8AT", SW),
    d("2.0 EcoBlue 190", 190, "8AT", SW),
    hybrid("Hybrid 187", 187, "FWD", "eCVT", SW),
  ],

  "ford-s-max-i": people1(MPV),
  "ford-s-max-i-fl": people1fl(MPV),
  "ford-s-max-ii": people2(MPV),
  "ford-s-max-ii-fl": people2fl(MPV),

  "ford-galaxy-i": [
    p("2.0 115", 115, "5MT", MPV),
    p("2.3 145", 145, "5MT", MPV),
    p("2.8 V6 174", 174, "5MT", MPV),
    p("2.8 V6 174", 174, "4AT", MPV),
    d("1.9 TDI 90", 90, "5MT", MPV),
    d("1.9 TDI 110", 110, "5MT", MPV),
  ],
  "ford-galaxy-i-fl": [
    p("2.3 145", 145, "5MT", MPV),
    p("2.8 V6 174", 174, "5MT", MPV),
    p("2.8 V6 204", 204, "5MT", MPV),
    d("1.9 TDI 115", 115, "5MT", MPV),
    d("1.9 TDI 130", 130, "6MT", MPV),
  ],
  "ford-galaxy-ii": people1(MPV),
  "ford-galaxy-ii-fl": people1fl(MPV),
  "ford-galaxy-iii": people2(MPV),
  "ford-galaxy-iii-fl": people2fl(MPV),

  "ford-kuga-i": [
    petrol("2.5 200", 200, "AWD", "6MT", SUV),
    petrol("2.5 200", 200, "AWD", "5AT", SUV),
    d("2.0 TDCi 136", 136, "6MT", SUV),
    d("2.0 TDCi 136", 136, "6MT", SUV, "AWD"),
    d("2.0 TDCi 163", 163, "6MT", SUV, "AWD"),
  ],
  "ford-kuga-ii": [
    p("1.6 EcoBoost 150", 150, "6MT", SUV),
    petrol("1.6 EcoBoost 182", 182, "AWD", "6MT", SUV),
    petrol("1.6 EcoBoost 182", 182, "AWD", "6AT", SUV),
    d("2.0 TDCi 140", 140, "6MT", SUV),
    d("2.0 TDCi 140", 140, "6MT", SUV, "AWD"),
    d("2.0 TDCi 163", 163, "6MT", SUV, "AWD"),
    d("2.0 TDCi 163", 163, "6DCT", SUV, "AWD"),
  ],
  "ford-kuga-ii-fl": [
    p("1.5 EcoBoost 120", 120, "6MT", SUV),
    p("1.5 EcoBoost 150", 150, "6MT", SUV),
    p("1.5 EcoBoost 150", 150, "6AT", SUV),
    petrol("1.5 EcoBoost 182", 182, "AWD", "6AT", SUV),
    d("2.0 TDCi 120", 120, "6MT", SUV),
    d("2.0 TDCi 150", 150, "6MT", SUV),
    d("2.0 TDCi 150", 150, "6MT", SUV, "AWD"),
    diesel("2.0 TDCi 180", 180, "AWD", "6AT", SUV),
  ],
  "ford-kuga-iii": [
    p("1.5 EcoBoost 120", 120, "6MT", SUV),
    p("1.5 EcoBoost 150", 150, "6MT", SUV),
    p("1.5 EcoBoost 150", 150, "8AT", SUV),
    d("2.0 EcoBlue 120", 120, "6MT", SUV),
    d("2.0 EcoBlue 150", 150, "6MT", SUV),
    d("2.0 EcoBlue 150", 150, "8AT", SUV),
    d("2.0 EcoBlue 150", 150, "8AT", SUV, "AWD"),
    diesel("2.0 EcoBlue 190", 190, "AWD", "8AT", SUV),
    hybrid("2.5 Hybrid 190", 190, "FWD", "CVT", SUV),
    phev("2.5 PHEV 225", 225, "FWD", "CVT", null, 14.4, 56, SUV),
  ],
  "ford-kuga-iii-fl": [
    petrol("1.5 EcoBoost 150", 150, "FWD", "6MT", SUV, 6.4),
    hybrid("2.5 Hybrid 180", 180, "FWD", "CVT", SUV, 5.3),
    hybrid("2.5 Hybrid 183", 183, "AWD", "CVT", SUV, 5.7),
    phev("2.5 PHEV 243", 243, "FWD", "CVT", 2.8, 14.4, 69, SUV),
  ],

  "ford-explorer-explorer": [
    bev("RWD Standard Range", 190, "RWD", 59, 444, 15.4, SUV, 140),
    bev("RWD Extended Range", 286, "RWD", 79, 602, 14.6, SUV, 210),
    bev("AWD Extended Range", 340, "AWD", 77, 553, 16.3, SUV, 250),
  ],
  "ford-capri-capri": [
    bev("RWD Standard Range", 190, "RWD", 59, 464, 14.8, SUV, 140),
    bev("RWD Extended Range", 286, "RWD", 79, 627, 13.8, SUV, 210),
    bev("AWD Extended Range", 340, "AWD", 77, 577, 15.5, SUV, 250),
  ],

  "ford-mustang-s550": [
    petrol("2.3 EcoBoost 317", 317, "RWD", "6MT", COUPE),
    petrol("2.3 EcoBoost 317", 317, "RWD", "6AT", COUPE),
    petrol("5.0 GT 421", 421, "RWD", "6MT", COUPE),
    petrol("5.0 GT 421", 421, "RWD", "6AT", COUPE),
  ],
  "ford-mustang-s550-fl": [
    petrol("2.3 EcoBoost 290", 290, "RWD", "6MT", COUPE),
    petrol("2.3 EcoBoost 290", 290, "RWD", "10AT", COUPE),
    petrol("5.0 GT 450", 450, "RWD", "6MT", COUPE),
    petrol("5.0 GT 450", 450, "RWD", "10AT", COUPE),
  ],
  "ford-mustang-s650": [
    petrol("2.3 EcoBoost", 317, "RWD", "10AT", COUPE),
    petrol("5.0 GT", 446, "RWD", "6MT", COUPE),
    petrol("5.0 GT", 446, "RWD", "10AT", COUPE),
  ],
  "ford-mustang-mach-e-mach-e": [
    bev("RWD 73 kWh", 268, "RWD", 73, 470, 18.5, SUV),
    bev("RWD 88 kWh", 276, "RWD", 88, 615, 17.7, SUV),
    bev("AWD 88 kWh", 375, "AWD", 88, 555, 19.3, SUV),
    bev("GT", 487, "AWD", 91, 515, 21.0, SUV),
  ],

  "ford-escort-mk4": [
    p("1.4 75", 75, "5MT", HB),
    p("1.6 90", 90, "5MT", HB),
    d("1.6 D 54", 54, "5MT", HB),
    p("XR3i 1.6 105", 105, "5MT", HB),
  ],
  "ford-escort-mk5": [
    p("1.4 73", 73, "5MT", HB),
    p("1.6 90", 90, "5MT", HB),
    p("1.8 105", 105, "5MT", HB),
    d("1.8 D 60", 60, "5MT", HB),
  ],
  "ford-escort-mk5-fl": [
    p("1.4 75", 75, "5MT", HB),
    p("1.6 90", 90, "5MT", HB),
    p("1.8 16V 105", 105, "5MT", HB),
    p("XR3i 1.8 130", 130, "5MT", HB),
    d("1.8 TD 70", 70, "5MT", HB),
    p("RS2000 2.0 150", 150, "5MT", HB),
  ],
  "ford-escort-mk6": [
    p("1.6 16V 90", 90, "5MT", HB),
    p("1.8 16V 115", 115, "5MT", HB),
    p("2.0 16V 130", 130, "5MT", HB),
    d("1.8 TD 75", 75, "5MT", HB),
    d("1.8 TDDi 90", 90, "5MT", HB),
    p("RS2000 2.0 150", 150, "5MT", HB),
  ],

  "ford-sierra-i": [
    p("1.6 75", 75, "5MT", SW),
    p("2.0 105", 105, "5MT", SW),
    d("2.3 D 67", 67, "5MT", SW),
    p("2.8 V6 150", 150, "5MT", SW),
  ],
  "ford-sierra-ii": [
    p("1.8 90", 90, "5MT", SW),
    p("2.0i 120", 120, "5MT", SW),
    p("2.9 V6 145", 145, "5MT", SW),
    d("1.8 TD 75", 75, "5MT", SW),
    petrol("XR4x4 2.9 150", 150, "4x4", "5MT", SW),
  ],

  "ford-scorpio-i": [
    p("2.0i 115", 115, "5MT", SW),
    p("2.8 V6 150", 150, "5MT", SW),
    p("2.9 V6 150", 150, "5MT", SW),
    p("2.9 V6 150", 150, "4AT", SW),
    d("2.5 TD 92", 92, "5MT", SW),
  ],
  "ford-scorpio-ii": [
    p("2.0 16V 115", 115, "5MT", SW),
    p("2.0 16V 136", 136, "5MT", SW),
    p("2.3 16V 147", 147, "5MT", SW),
    p("2.9 24V 207", 207, "5MT", SW),
    p("2.9 24V 207", 207, "4AT", SW),
    d("2.5 TD 115", 115, "5MT", SW),
    d("2.5 TD 125", 125, "5MT", SW),
  ],

  "ford-ranger-t6": [
    diesel("2.2 TDCi 125", 125, "4x4", "6MT", PICKUP),
    diesel("2.2 TDCi 150", 150, "4x4", "6MT", PICKUP),
    diesel("3.2 TDCi 200", 200, "4x4", "6MT", PICKUP),
    diesel("3.2 TDCi 200", 200, "4x4", "6AT", PICKUP),
  ],
  "ford-ranger-t6-fl": [
    diesel("2.2 TDCi 130", 130, "4x4", "6MT", PICKUP),
    diesel("2.2 TDCi 160", 160, "4x4", "6MT", PICKUP),
    diesel("2.2 TDCi 160", 160, "4x4", "6AT", PICKUP),
    diesel("3.2 TDCi 200", 200, "4x4", "6MT", PICKUP),
    diesel("3.2 TDCi 200", 200, "4x4", "6AT", PICKUP),
  ],
  "ford-ranger-t6-2019": [
    diesel("2.0 EcoBlue 130", 130, "4x4", "6MT", PICKUP),
    diesel("2.0 EcoBlue 170", 170, "4x4", "6MT", PICKUP),
    diesel("2.0 EcoBlue 170", 170, "4x4", "10AT", PICKUP),
    diesel("2.0 EcoBlue 213", 213, "4x4", "10AT", PICKUP),
  ],
  "ford-ranger-p703": [
    diesel("2.0 EcoBlue 170", 170, "4x4", "6AT", PICKUP),
    diesel("3.0 V6 EcoBlue", 241, "4x4", "10AT", PICKUP, null, 177),
    phev("2.3 EcoBoost PHEV", 281, "4x4", "10AT", null, 11.8, 43, PICKUP, 207),
  ],
  "ford-ranger-raptor-raptor": [
    petrol("3.0 EcoBoost V6", 292, "4x4", "10AT", PICKUP, null, 215),
  ],

  "ford-tourneo-courier-i": courier1(MPV),
  "ford-tourneo-courier-ii": [
    petrol("1.0 EcoBoost 125", 125, "FWD", "7DCT", MPV, 6.9),
  ],
  "ford-e-tourneo-courier-e-courier": [
    bev("E-Tourneo Courier", 136, "FWD", 46, 320, 17.9, MPV, 100),
  ],
  "ford-transit-courier-i": courier1(VAN),
  "ford-transit-courier-ii": [
    petrol("1.0 EcoBoost 125", 125, "FWD", "7DCT", VAN, 6.9),
  ],
  "ford-e-transit-courier-e-courier": [
    bev("E-Transit Courier", 136, "FWD", 46, 325, 14.2, VAN, 100),
  ],

  "ford-tourneo-connect-i": connect1(MPV),
  "ford-tourneo-connect-ii": connect2(MPV),
  "ford-tourneo-connect-ii-fl": connect2fl(MPV),
  "ford-tourneo-connect-iii": connect3(MPV),
  "ford-grand-tourneo-connect-ii": connect2(MPV),
  "ford-grand-tourneo-connect-ii-fl": connect2fl(MPV),
  "ford-transit-connect-i": connect1(VAN),
  "ford-transit-connect-ii": connect2(VAN),
  "ford-transit-connect-ii-fl": connect2fl(VAN),
  "ford-transit-connect-iii": connect3(VAN),

  "ford-tourneo-custom-i": custom1(MPV),
  "ford-tourneo-custom-i-fl": custom1fl(MPV),
  "ford-tourneo-custom-ii": [
    diesel("2.0 EcoBlue 136", 136, "AWD", "8AT", MPV),
    diesel("2.0 EcoBlue 170", 170, "AWD", "8AT", MPV),
    phev("PHEV 232", 232, "FWD", "eCVT", null, 11.8, 52, MPV),
  ],
  "ford-e-tourneo-custom-e-custom": [
    bev("160 kW", 218, "RWD", 71, 338, 21.0, MPV, 160),
    bev("160 kW", 218, "AWD", 71, 312, 22.8, MPV, 160),
  ],
  "ford-transit-custom-i": custom1(VAN),
  "ford-transit-custom-i-fl": custom1fl(VAN),
  "ford-transit-custom-ii": [
    diesel("2.0 EcoBlue 136", 136, "AWD", "8AT", VAN),
    diesel("2.0 EcoBlue 170", 170, "AWD", "8AT", VAN),
  ],
  "ford-e-transit-custom-e-custom": [
    bev("100 kW", 136, "RWD", 71, 370, 19.2, VAN, 100),
    bev("160 kW", 218, "RWD", 71, 350, 20.3, VAN, 160),
    bev("210 kW", 286, "RWD", 71, 349, 20.3, VAN, 210),
    bev("100 kW", 136, "AWD", 71, 340, 20.9, VAN, 100),
    bev("160 kW", 218, "AWD", 71, 324, 21.9, VAN, 160),
    bev("210 kW", 286, "AWD", 71, 323, 22.0, VAN, 210),
  ],

  "ford-transit-mk6": [
    d("2.0 TDDi 75", 75, "5MT", VAN),
    d("2.0 TDDi 100", 100, "5MT", VAN),
    d("2.0 TDCi 125", 125, "5MT", VAN),
    diesel("2.4 TDCi 125", 125, "RWD", "5MT", VAN),
  ],
  "ford-transit-mk7": [
    d("2.2 TDCi 85", 85, "6MT", VAN),
    d("2.2 TDCi 110", 110, "6MT", VAN),
    d("2.2 TDCi 140", 140, "6MT", VAN),
    diesel("2.4 TDCi 115", 115, "RWD", "6MT", VAN),
    diesel("2.4 TDCi 140", 140, "RWD", "6MT", VAN),
  ],
  "ford-transit-mk8": [
    d("2.2 TDCi 100", 100, "6MT", VAN),
    d("2.2 TDCi 125", 125, "6MT", VAN),
    d("2.2 TDCi 155", 155, "6MT", VAN),
    d("2.2 TDCi 155", 155, "6AT", VAN),
    diesel("2.2 TDCi 155", 155, "RWD", "6MT", VAN),
  ],
  "ford-transit-mk8-fl": [
    diesel("2.0 EcoBlue 105", 105, "FWD", "6MT", VAN, null, 77),
    diesel("2.0 EcoBlue 131", 131, "FWD", "6MT", VAN, null, 96),
    diesel("2.0 EcoBlue 150", 150, "FWD", "8AT", VAN, null, 110),
    diesel("2.0 EcoBlue 165", 165, "FWD", "6MT", VAN, null, 121),
  ],
  "ford-e-transit-e-transit": [
    bev("184", 184, "RWD", 68, 317, null, VAN, 135),
    bev("269", 269, "RWD", 68, 317, null, VAN, 198),
    bev("184", 184, "RWD", 96, 432, null, VAN, 135),
    bev("269", 269, "RWD", 96, 432, null, VAN, 198),
  ],
};
