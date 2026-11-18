/**
 * Hyundai powertrains for the cars commonly sold in Finland.
 * Current electric cars follow the Hyundai Finland pages where they print
 * battery, power, and WLTP range. Older rows are the European engines.
 * Litres are stored only when a combined brochure figure is known.
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

function phev(name, hp, drive, gear, bat, erange, body, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, null, kw);
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
  };
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = W;
  }
  if (kwh100 != null) {
    row.consumptionCombinedKwh = kwh100;
    row.consumptionStandard = W;
  }
  return row;
}

const HB = "Hatchback";
const FB = "Fastback";
const SW = "Sedan, Wagon";
const SUV = "SUV";
const MPV = "MPV";
const VAN = "Van, MPV";
const COUPE = "Coupe";

const p = (name, hp, gear, body, drive = "FWD") => petrol(name, hp, drive, gear, body);
const d = (name, hp, gear, body, drive = "FWD") => diesel(name, hp, drive, gear, body);

const i30pd = (body) => [
  p("1.0 T-GDI 120", 120, "6MT", body),
  p("1.0 T-GDI 120", 120, "7DCT", body),
  p("1.4 T-GDI 140", 140, "6MT", body),
  p("1.4 T-GDI 140", 140, "7DCT", body),
  d("1.6 CRDi 115", 115, "6MT", body),
  d("1.6 CRDi 136", 136, "7DCT", body),
];

const i30pdfl = (body) => [
  p("1.0 T-GDI 120", 120, "6MT", body),
  p("1.0 T-GDI 120", 120, "7DCT", body),
  p("1.5 T-GDI 160", 160, "6MT", body),
  p("1.5 T-GDI 160", 160, "7DCT", body),
];

export const HYUNDAI_MAKE_IDS = ["hyundai"];

/** @type {Record<string, object[]>} */
export const HYUNDAI_POWERTRAINS = {
  "hyundai-i10-i": [
    p("1.1 67", 67, "5MT", HB),
    p("1.2 78", 78, "5MT", HB),
  ],
  "hyundai-i10-ii": [
    p("1.0 67", 67, "5MT", HB),
    p("1.2 87", 87, "5MT", HB),
  ],
  "hyundai-i10-iii": [
    p("1.0 67", 67, "5MT", HB),
    p("1.2 84", 84, "5MT", HB),
    p("1.0 T-GDI 100", 100, "5MT", HB),
  ],

  "hyundai-i20-i": [
    p("1.2 78", 78, "5MT", HB),
    p("1.4 100", 100, "5MT", HB),
    p("1.6 126", 126, "5MT", HB),
    d("1.4 CRDi 75", 75, "5MT", HB),
    d("1.4 CRDi 90", 90, "5MT", HB),
  ],
  "hyundai-i20-ii": [
    p("1.2 84", 84, "5MT", HB),
    p("1.0 T-GDI 100", 100, "5MT", HB),
    p("1.0 T-GDI 120", 120, "6MT", HB),
    d("1.4 CRDi 90", 90, "6MT", HB),
  ],
  "hyundai-i20-iii": [
    p("1.0 T-GDI 100", 100, "6MT", HB),
    p("1.0 T-GDI 100", 100, "7DCT", HB),
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "6MT", HB),
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "7DCT", HB),
    hybrid("1.0 T-GDI Hybrid 120", 120, "FWD", "6MT", HB),
  ],
  "hyundai-i20-n-n": [
    p("1.6 T-GDI 204", 204, "6MT", HB),
  ],

  "hyundai-i30-fd": [
    p("1.4 109", 109, "5MT", HB),
    p("1.6 122", 122, "5MT", HB),
    p("1.6 122", 122, "4AT", HB),
    p("2.0 143", 143, "5MT", HB),
    d("1.6 CRDi 90", 90, "5MT", HB),
    d("1.6 CRDi 115", 115, "6MT", HB),
    d("2.0 CRDi 140", 140, "6MT", HB),
  ],
  "hyundai-i30-gd": [
    p("1.4 100", 100, "6MT", HB),
    p("1.6 120", 120, "6MT", HB),
    p("1.6 GDI 135", 135, "6MT", HB),
    p("1.6 GDI 135", 135, "6AT", HB),
    d("1.6 CRDi 110", 110, "6MT", HB),
    d("1.6 CRDi 136", 136, "6MT", HB),
  ],
  "hyundai-i30-pd": i30pd(HB),
  "hyundai-i30-pd-fl": i30pdfl(HB),
  "hyundai-i30-fastback-pd": i30pd(FB),
  "hyundai-i30-fastback-pd-fl": i30pdfl(FB),
  "hyundai-i30-n-pd-n": [
    p("2.0 T-GDI 250", 250, "6MT", HB),
    p("2.0 T-GDI 275", 275, "6MT", HB),
    p("2.0 T-GDI 275", 275, "6MT", FB),
  ],
  "hyundai-i30-n-pd-n-fl": [
    p("2.0 T-GDI 280", 280, "6MT", HB),
    p("2.0 T-GDI 280", 280, "8DCT", HB),
    p("2.0 T-GDI 280", 280, "6MT", FB),
  ],

  "hyundai-i40-i40": [
    p("1.6 GDI 135", 135, "6MT", SW),
    p("2.0 GDI 177", 177, "6AT", SW),
    d("1.7 CRDi 115", 115, "6MT", SW),
    d("1.7 CRDi 136", 136, "6MT", SW),
    d("1.7 CRDi 136", 136, "7DCT", SW),
  ],

  "hyundai-getz-getz": [
    p("1.1 63", 63, "5MT", HB),
    p("1.3 82", 82, "5MT", HB),
    p("1.4 97", 97, "5MT", HB),
    p("1.6 106", 106, "5MT", HB),
    d("1.5 CRDi 88", 88, "5MT", HB),
  ],

  "hyundai-accent-x3": [
    p("1.3 75", 75, "5MT", HB),
    p("1.5 90", 90, "5MT", HB),
  ],
  "hyundai-accent-lc": [
    p("1.3 86", 86, "5MT", HB),
    p("1.5 90", 90, "5MT", HB),
    p("1.5 90", 90, "4AT", HB),
    d("1.5 CRDi 82", 82, "5MT", HB),
  ],
  "hyundai-accent-mc": [
    p("1.4 97", 97, "5MT", HB),
    p("1.6 112", 112, "5MT", HB),
    p("1.6 112", 112, "4AT", HB),
    d("1.5 CRDi 110", 110, "5MT", HB),
  ],

  "hyundai-atos-atos": [
    p("1.0 55", 55, "5MT", HB),
    p("1.1 63", 63, "5MT", HB),
  ],

  "hyundai-coupe-rd": [
    p("1.6 114", 114, "5MT", COUPE),
    p("2.0 139", 139, "5MT", COUPE),
    p("2.0 139", 139, "4AT", COUPE),
  ],
  "hyundai-coupe-gk": [
    p("1.6 105", 105, "5MT", COUPE),
    p("2.0 143", 143, "5MT", COUPE),
    p("2.0 143", 143, "4AT", COUPE),
    p("2.7 V6 167", 167, "4AT", COUPE),
  ],

  "hyundai-matrix-matrix": [
    p("1.6 103", 103, "5MT", MPV),
    p("1.8 122", 122, "5MT", MPV),
    p("1.8 122", 122, "4AT", MPV),
    d("1.5 CRDi 82", 82, "5MT", MPV),
    d("1.5 CRDi 110", 110, "5MT", MPV),
  ],

  "hyundai-elantra-lantra": [
    p("1.6 114", 114, "5MT", SW),
    p("1.8 128", 128, "5MT", SW),
    p("2.0 139", 139, "5MT", SW),
  ],
  "hyundai-elantra-xd": [
    p("1.6 107", 107, "5MT", SW),
    p("2.0 143", 143, "5MT", SW),
    p("2.0 143", 143, "4AT", SW),
    d("2.0 CRDi 113", 113, "5MT", SW),
  ],

  "hyundai-ix20-ix20": [
    p("1.4 90", 90, "5MT", MPV),
    p("1.6 125", 125, "6MT", MPV),
    p("1.6 125", 125, "4AT", MPV),
    d("1.4 CRDi 77", 77, "6MT", MPV),
    d("1.4 CRDi 90", 90, "6MT", MPV),
  ],

  "hyundai-bayon-bayon": [
    p("1.0 T-GDI 100", 100, "6MT", SUV),
    p("1.0 T-GDI 100", 100, "7DCT", SUV),
  ],

  "hyundai-kona-i": [
    p("1.0 T-GDI 120", 120, "6MT", SUV),
    p("1.6 T-GDI 177", 177, "7DCT", SUV),
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", SUV),
    d("1.6 CRDi 115", 115, "6MT", SUV),
    d("1.6 CRDi 136", 136, "7DCT", SUV),
  ],
  "hyundai-kona-ii": [
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", SUV),
  ],
  "hyundai-kona-electric-i": [
    bev("39.2 kWh", 136, "FWD", 39.2, 305, null, SUV, 100),
    bev("64 kWh", 204, "FWD", 64, 484, null, SUV, 150),
  ],
  // Finnish MY26/MY27 sheet: 160 kW / 217 hp, 65.4 kWh, 14.9 kWh/100, 514 km.
  "hyundai-kona-electric-ii": [
    bev("48.4 kWh", 156, "FWD", 48.4, 377, null, SUV, 114),
    bev("65.4 kWh", 217, "FWD", 65.4, 514, 14.9, SUV, 160),
  ],

  "hyundai-ix35-ix35": [
    p("1.6 GDI 135", 135, "6MT", SUV),
    p("2.0 163", 163, "6MT", SUV),
    p("2.0 163", 163, "6AT", SUV, "AWD"),
    d("1.7 CRDi 115", 115, "6MT", SUV),
    d("2.0 CRDi 136", 136, "6MT", SUV),
    d("2.0 CRDi 136", 136, "6AT", SUV, "AWD"),
    d("2.0 CRDi 184", 184, "6AT", SUV, "AWD"),
  ],

  "hyundai-tucson-i": [
    p("2.0 142", 142, "5MT", SUV),
    p("2.0 142", 142, "4AT", SUV, "AWD"),
    p("2.7 V6 175", 175, "4AT", SUV, "AWD"),
    d("2.0 CRDi 113", 113, "5MT", SUV),
    d("2.0 CRDi 140", 140, "6MT", SUV, "AWD"),
  ],
  "hyundai-tucson-iii": [
    p("1.6 GDI 132", 132, "6MT", SUV),
    p("1.6 T-GDI 177", 177, "7DCT", SUV, "AWD"),
    d("1.7 CRDi 115", 115, "6MT", SUV),
    d("2.0 CRDi 136", 136, "6MT", SUV),
    d("2.0 CRDi 185", 185, "8AT", SUV, "AWD"),
  ],
  "hyundai-tucson-iv": [
    p("1.6 T-GDI 150", 150, "6MT", SUV),
    p("1.6 T-GDI 150", 150, "7DCT", SUV),
    p("1.6 T-GDI 180", 180, "7DCT", SUV, "AWD"),
    d("1.6 CRDi 136", 136, "7DCT", SUV),
    hybrid("1.6 Hybrid 230", 230, "FWD", "6AT", SUV),
    hybrid("1.6 Hybrid 230", 230, "AWD", "6AT", SUV),
  ],
  "hyundai-tucson-plug-in-iv": [
    phev("1.6 Plug-in 265", 265, "AWD", "6AT", 13.8, 62, SUV),
  ],

  "hyundai-santa-fe-i": [
    p("2.4 146", 146, "4AT", SUV),
    p("2.7 V6 173", 173, "4AT", SUV, "AWD"),
    d("2.0 CRDi 113", 113, "5MT", SUV),
    d("2.0 CRDi 125", 125, "5MT", SUV, "AWD"),
  ],
  "hyundai-santa-fe-ii": [
    p("2.7 V6 189", 189, "4AT", SUV, "AWD"),
    d("2.2 CRDi 155", 155, "5MT", SUV, "AWD"),
    d("2.2 CRDi 155", 155, "5AT", SUV, "AWD"),
  ],
  "hyundai-santa-fe-ii-fl": [
    d("2.2 CRDi 197", 197, "6MT", SUV, "AWD"),
    d("2.2 CRDi 197", 197, "6AT", SUV, "AWD"),
  ],
  "hyundai-santa-fe-iii": [
    p("2.4 GDI 192", 192, "6AT", SUV, "AWD"),
    d("2.2 CRDi 197", 197, "6MT", SUV, "AWD"),
    d("2.2 CRDi 197", 197, "6AT", SUV, "AWD"),
  ],
  "hyundai-santa-fe-iv": [
    d("2.2 CRDi 200", 200, "8AT", SUV, "AWD"),
    hybrid("1.6 Hybrid 230", 230, "FWD", "6AT", SUV),
    hybrid("1.6 Hybrid 230", 230, "AWD", "6AT", SUV),
  ],
  "hyundai-santa-fe-v": [
    hybrid("1.6 Hybrid 215", 215, "FWD", "6AT", SUV),
    hybrid("1.6 Hybrid 215", 215, "AWD", "6AT", SUV),
    phev("1.6 Plug-in 253", 253, "AWD", "6AT", 13.8, null, SUV),
  ],

  "hyundai-h-1-i": [
    d("2.5 CRDi 110", 110, "5MT", VAN),
    d("2.5 CRDi 140", 140, "5MT", VAN),
  ],
  "hyundai-h-1-ii": [
    d("2.5 CRDi 136", 136, "5MT", VAN),
    d("2.5 CRDi 170", 170, "5MT", VAN),
    d("2.5 CRDi 170", 170, "5AT", VAN),
  ],

  "hyundai-trajet-trajet": [
    p("2.0 136", 136, "5MT", MPV),
    p("2.0 136", 136, "4AT", MPV),
    p("2.7 V6 173", 173, "4AT", MPV),
    d("2.0 CRDi 113", 113, "5MT", MPV),
  ],

  "hyundai-ioniq-ioniq": [
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", HB),
  ],
  "hyundai-ioniq-electric-i": [
    bev("28 kWh", 120, "FWD", 28, null, null, HB, 88),
  ],
  "hyundai-ioniq-electric-fl": [
    bev("38.3 kWh", 136, "FWD", 38.3, 311, null, HB, 100),
  ],
  "hyundai-ioniq-plug-in-phev": [
    phev("1.6 Plug-in 141", 141, "FWD", "6DCT", 8.9, 63, HB),
  ],

  "hyundai-ioniq-5-i": [
    bev("58 kWh", 170, "RWD", 58, 384, null, SUV, 125),
    bev("77.4 kWh", 229, "RWD", 77.4, 507, null, SUV, 168),
    bev("77.4 kWh", 325, "AWD", 77.4, 481, null, SUV, 239),
  ],
  // Finnish page: 84 kWh, RWD up to 570 km, AWD 325 hp / 239 kW and 546 km.
  "hyundai-ioniq-5-fl": [
    bev("63 kWh", 170, "RWD", 63, null, null, SUV, 125),
    bev("84 kWh", 228, "RWD", 84, 570, null, SUV, 168),
    bev("84 kWh", 325, "AWD", 84, 546, null, SUV, 239),
  ],
  "hyundai-ioniq-5-n-n": [
    bev("N", 650, "AWD", 84, 448, null, SUV, 478),
  ],

  "hyundai-ioniq-6-ioniq-6": [
    bev("53 kWh", 151, "RWD", 53, 429, null, "Sedan", 111),
    bev("77.4 kWh", 229, "RWD", 77.4, 614, null, "Sedan", 168),
    bev("77.4 kWh", 325, "AWD", 77.4, 583, null, "Sedan", 239),
  ],
  // German type approval: 650 PS is N Grin Boost (609 PS without it), 84 kWh, 487 km, 18.7 kWh/100.
  "hyundai-ioniq-6-n-n": [
    bev("N", 650, "AWD", 84, 487, 18.7, "Sedan", 478),
  ],

  // Finnish page states 370 km for the 49 kWh car. The 42 kWh range is not printed there.
  "hyundai-inster-inster": [
    bev("42 kWh", 97, "FWD", 42, null, null, HB, 71),
    bev("49 kWh", 115, "FWD", 49, 370, null, HB, 85),
  ],
};
