/**
 * Kia powertrains for the cars commonly sold in Finland.
 * Current electric cars follow the Kia Finland price lists.
 * Older rows are the European engines. Litres are stored only when a
 * combined brochure figure is known.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function fuel(kind, name, hp, drive, gear, body, kw) {
  return {
    name,
    powertrain: kind,
    powerHp: hp,
    powerKw: kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
}

const petrol = (name, hp, drive, gear, body, kw) => fuel("petrol", name, hp, drive, gear, body, kw);
const diesel = (name, hp, drive, gear, body, kw) => fuel("diesel", name, hp, drive, gear, body, kw);
const hybrid = (name, hp, drive, gear, body, kw) => fuel("hybrid", name, hp, drive, gear, body, kw);

function phev(name, hp, drive, gear, bat, erange, body, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, kw);
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
const HW = "Hatchback, Wagon";
const SW = "Sedan, Wagon";
const WG = "Wagon";
const SB = "Shooting brake";
const SUV = "SUV";
const MPV = "MPV";
const VAN = "Van";
const FB = "Fastback";

const p = (name, hp, gear, body, drive = "FWD") => petrol(name, hp, drive, gear, body);
const d = (name, hp, gear, body, drive = "FWD") => diesel(name, hp, drive, gear, body);

const ceed3 = (body) => [
  p("1.0 T-GDI 120", 120, "6MT", body),
  p("1.4 T-GDI 140", 140, "6MT", body),
  p("1.4 T-GDI 140", 140, "7DCT", body),
  d("1.6 CRDi 115", 115, "6MT", body),
  d("1.6 CRDi 136", 136, "7DCT", body),
];

export const KIA_MAKE_IDS = ["kia"];

/** @type {Record<string, object[]>} */
export const KIA_POWERTRAINS = {
  "kia-picanto-i": [
    p("1.0 61", 61, "5MT", HB),
    p("1.1 65", 65, "5MT", HB),
    p("1.1 65", 65, "4AT", HB),
  ],
  "kia-picanto-ii": [
    p("1.0 69", 69, "5MT", HB),
    p("1.2 85", 85, "5MT", HB),
    p("1.2 85", 85, "4AT", HB),
  ],
  "kia-picanto-iii": [
    p("1.0 67", 67, "5MT", HB),
    p("1.2 84", 84, "5MT", HB),
    p("1.0 T-GDI 100", 100, "5MT", HB),
  ],
  "kia-picanto-iii-fl": [
    p("1.0 63", 63, "5MT", HB),
    p("1.2 79", 79, "5MT", HB),
  ],

  "kia-rio-i": [
    p("1.3 75", 75, "5MT", HB),
    p("1.5 98", 98, "5MT", HB),
    p("1.5 98", 98, "4AT", HB),
  ],
  "kia-rio-ii": [
    p("1.4 97", 97, "5MT", HB),
    p("1.4 97", 97, "4AT", HB),
    p("1.6 112", 112, "5MT", HB),
    d("1.5 CRDi 110", 110, "5MT", HB),
  ],
  "kia-rio-iii": [
    p("1.2 85", 85, "5MT", HB),
    p("1.4 109", 109, "6MT", HB),
    p("1.4 109", 109, "6AT", HB),
    d("1.1 CRDi 75", 75, "5MT", HB),
    d("1.4 CRDi 90", 90, "6MT", HB),
  ],
  "kia-rio-iv": [
    p("1.0 T-GDI 100", 100, "6MT", HB),
    p("1.0 T-GDI 120", 120, "6MT", HB),
    p("1.4 100", 100, "6MT", HB),
    d("1.4 CRDi 90", 90, "6MT", HB),
  ],
  "kia-rio-iv-fl": [
    p("1.2 84", 84, "5MT", HB),
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "6MT", HB),
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "7DCT", HB),
    hybrid("1.0 T-GDI Hybrid 120", 120, "FWD", "6MT", HB),
  ],

  "kia-stonic-i": [
    p("1.25 84", 84, "5MT", SUV),
    p("1.0 T-GDI 120", 120, "6MT", SUV),
    p("1.4 100", 100, "6MT", SUV),
    d("1.6 CRDi 110", 110, "6MT", SUV),
  ],
  "kia-stonic-i-fl": [
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "6MT", SUV),
    hybrid("1.0 T-GDI Hybrid 100", 100, "FWD", "7DCT", SUV),
    hybrid("1.0 T-GDI Hybrid 120", 120, "FWD", "6MT", SUV),
  ],

  "kia-ceed-i": [
    p("1.4 109", 109, "5MT", HW),
    p("1.6 122", 122, "5MT", HW),
    p("1.6 122", 122, "4AT", HW),
    p("2.0 143", 143, "5MT", HW),
    d("1.6 CRDi 90", 90, "5MT", HW),
    d("1.6 CRDi 115", 115, "5MT", HW),
    d("2.0 CRDi 140", 140, "6MT", HW),
  ],
  "kia-ceed-i-fl": [
    p("1.4 109", 109, "6MT", HW),
    p("1.6 126", 126, "6MT", HW),
    p("1.6 126", 126, "6AT", HW),
    d("1.6 CRDi 90", 90, "6MT", HW),
    d("1.6 CRDi 115", 115, "6MT", HW),
    d("1.6 CRDi 128", 128, "6MT", HW),
  ],
  "kia-ceed-ii": [
    p("1.4 100", 100, "6MT", HW),
    p("1.6 GDI 135", 135, "6MT", HW),
    p("1.6 GDI 135", 135, "6AT", HW),
    p("1.6 T-GDI GT 204", 204, "6MT", HB),
    d("1.4 CRDi 90", 90, "6MT", HW),
    d("1.6 CRDi 110", 110, "6MT", HW),
    d("1.6 CRDi 128", 128, "6MT", HW),
  ],
  "kia-ceed-ii-fl": [
    p("1.0 T-GDI 120", 120, "6MT", HW),
    p("1.4 T-GDI 140", 140, "6MT", HW),
    p("1.4 T-GDI 140", 140, "7DCT", HW),
    p("1.6 T-GDI GT 204", 204, "6MT", HB),
    d("1.6 CRDi 110", 110, "6MT", HW),
    d("1.6 CRDi 136", 136, "7DCT", HW),
  ],
  "kia-ceed-iii": [
    ...ceed3(HW),
    p("1.6 T-GDI GT 204", 204, "6MT", HB),
  ],
  "kia-ceed-iii-fl": [
    hybrid("1.0 T-GDI Hybrid 120", 120, "FWD", "6MT", HW),
    hybrid("1.5 T-GDI Hybrid 160", 160, "FWD", "6MT", HW),
    hybrid("1.5 T-GDI Hybrid 160", 160, "FWD", "7DCT", HW),
    p("1.6 T-GDI GT 204", 204, "6MT", HB),
  ],

  "kia-proceed-i": [
    p("1.4 109", 109, "5MT", HB),
    p("1.6 122", 122, "5MT", HB),
    p("2.0 143", 143, "5MT", HB),
    d("1.6 CRDi 115", 115, "5MT", HB),
    d("2.0 CRDi 140", 140, "6MT", HB),
  ],
  "kia-proceed-ii": [
    p("1.6 GDI 135", 135, "6MT", HB),
    p("1.6 T-GDI GT 204", 204, "6MT", HB),
    d("1.6 CRDi 128", 128, "6MT", HB),
  ],
  "kia-proceed-iii": [
    p("1.4 T-GDI 140", 140, "6MT", SB),
    p("1.4 T-GDI 140", 140, "7DCT", SB),
    p("1.6 T-GDI GT 204", 204, "6MT", SB),
    d("1.6 CRDi 136", 136, "7DCT", SB),
  ],
  "kia-proceed-iii-fl": [
    hybrid("1.5 T-GDI Hybrid 160", 160, "FWD", "7DCT", SB),
    p("1.6 T-GDI GT 204", 204, "6MT", SB),
  ],

  "kia-xceed-i": [
    p("1.0 T-GDI 120", 120, "6MT", SUV),
    p("1.4 T-GDI 140", 140, "6MT", SUV),
    p("1.4 T-GDI 140", 140, "7DCT", SUV),
    d("1.6 CRDi 115", 115, "6MT", SUV),
    d("1.6 CRDi 136", 136, "7DCT", SUV),
    phev("1.6 Plug-in 141", 141, "FWD", "6DCT", 8.9, null, SUV, 104),
  ],
  "kia-xceed-i-fl": [
    hybrid("1.0 T-GDI Hybrid 120", 120, "FWD", "6MT", SUV),
    hybrid("1.5 T-GDI Hybrid 160", 160, "FWD", "6MT", SUV),
    hybrid("1.5 T-GDI Hybrid 160", 160, "FWD", "7DCT", SUV),
    phev("1.6 Plug-in 141", 141, "FWD", "6DCT", 8.9, null, SUV, 104),
  ],
  "kia-ceed-sw-phev-iii": [
    phev("1.6 Plug-in 141", 141, "FWD", "6DCT", 8.9, null, WG, 104),
  ],

  // Full hybrid is still listed as coming. These are the petrol and mild-hybrid rows on the Finnish page, plus the 150 hp dealer cars.
  "kia-k4-k4": [
    hybrid("1.0 T-GDI Hybrid 115", 115, "FWD", "7DCT", "Hatchback, Wagon"),
    p("1.6 T-GDI 150", 150, "7DCT", "Hatchback, Wagon"),
    p("1.6 T-GDI 180", 180, "7DCT", "Hatchback, Wagon"),
  ],

  "kia-cerato-i": [
    p("1.6 105", 105, "5MT", SW),
    p("2.0 143", 143, "5MT", SW),
    p("2.0 143", 143, "4AT", SW),
    d("1.5 CRDi 102", 102, "5MT", SW),
    d("2.0 CRDi 112", 112, "6MT", SW),
  ],

  "kia-magentis-i": [
    p("2.0 136", 136, "5MT", "Sedan"),
    p("2.0 136", 136, "4AT", "Sedan"),
    p("2.5 V6 169", 169, "4AT", "Sedan"),
  ],
  "kia-magentis-ii": [
    p("2.0 144", 144, "5MT", "Sedan"),
    p("2.0 144", 144, "4AT", "Sedan"),
    p("2.7 V6 188", 188, "5AT", "Sedan"),
    d("2.0 CRDi 140", 140, "6MT", "Sedan"),
  ],

  "kia-optima-i": [
    p("2.0 150", 150, "6MT", SW),
    p("2.0 150", 150, "6AT", SW),
    d("1.7 CRDi 136", 136, "6MT", SW),
  ],
  "kia-optima-ii": [
    p("2.0 163", 163, "6AT", SW),
    d("1.7 CRDi 141", 141, "6MT", SW),
    d("1.7 CRDi 141", 141, "7DCT", SW),
  ],
  "kia-optima-ii-fl": [
    p("1.6 T-GDI 180", 180, "7DCT", SW),
    d("1.6 CRDi 136", 136, "6MT", SW),
    phev("2.0 Plug-in 205", 205, "FWD", "6AT", 9.8, null, SW),
  ],

  "kia-venga-venga": [
    p("1.4 90", 90, "5MT", MPV),
    p("1.4 90", 90, "4AT", MPV),
    p("1.6 125", 125, "6MT", MPV),
    p("1.6 125", 125, "4AT", MPV),
    d("1.4 CRDi 75", 75, "6MT", MPV),
    d("1.4 CRDi 90", 90, "6MT", MPV),
    d("1.6 CRDi 128", 128, "6MT", MPV),
  ],

  "kia-carens-i": [
    p("1.8 110", 110, "5MT", MPV),
  ],
  "kia-carens-ii": [
    p("1.6 105", 105, "5MT", MPV),
    p("1.8 126", 126, "5MT", MPV),
    p("1.8 126", 126, "4AT", MPV),
    d("2.0 CRDi 113", 113, "5MT", MPV),
  ],
  "kia-carens-iii": [
    p("1.6 126", 126, "5MT", MPV),
    p("2.0 144", 144, "5MT", MPV),
    p("2.0 144", 144, "4AT", MPV),
    d("2.0 CRDi 140", 140, "6MT", MPV),
    d("2.0 CRDi 140", 140, "6AT", MPV),
  ],
  "kia-carens-iv": [
    p("1.6 GDI 135", 135, "6MT", MPV),
    p("1.6 GDI 135", 135, "6AT", MPV),
    d("1.7 CRDi 116", 116, "6MT", MPV),
    d("1.7 CRDi 141", 141, "7DCT", MPV),
  ],

  "kia-carnival-i": [
    p("2.5 V6 150", 150, "5AT", MPV),
    d("2.9 CRDi 144", 144, "5MT", MPV),
    d("2.9 CRDi 144", 144, "5AT", MPV),
  ],
  "kia-carnival-ii": [
    p("2.7 V6 189", 189, "5AT", MPV),
    d("2.9 CRDi 185", 185, "5AT", MPV),
  ],

  "kia-soul-i": [
    p("1.6 126", 126, "5MT", HB),
    p("1.6 126", 126, "4AT", HB),
    d("1.6 CRDi 128", 128, "6MT", HB),
  ],
  "kia-soul-ii": [
    p("1.6 GDI 132", 132, "6MT", HB),
    d("1.6 CRDi 128", 128, "6MT", HB),
    d("1.6 CRDi 136", 136, "7DCT", HB),
  ],

  "kia-e-soul-i": [
    bev("27 kWh", 110, "FWD", 27, null, null, HB, 81),
  ],
  "kia-e-soul-ii": [
    bev("39.2 kWh", 136, "FWD", 39.2, null, null, HB, 100),
    bev("64 kWh", 204, "FWD", 64, 452, null, HB, 150),
  ],

  "kia-niro-i": [
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", SUV, 104),
  ],
  "kia-niro-i-fl": [
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", SUV, 104),
    phev("1.6 Plug-in 141", 141, "FWD", "6DCT", 8.9, null, SUV, 104),
  ],
  "kia-niro-ii": [
    hybrid("1.6 Hybrid 141", 141, "FWD", "6DCT", SUV, 104),
    phev("1.6 Plug-in 183", 183, "FWD", "6DCT", null, null, SUV),
  ],
  // Finnish MY26 list: hybrid 101 kW / 136 hp, plug-in 133 kW / 178 hp.
  "kia-niro-ii-fl": [
    hybrid("1.6 Hybrid 136", 136, "FWD", "6DCT", SUV, 101),
    phev("1.6 Plug-in 178", 178, "FWD", "6DCT", null, null, SUV, 133),
  ],
  "kia-e-niro-e-niro": [
    bev("39.2 kWh", 136, "FWD", 39.2, null, null, SUV, 100),
    bev("64 kWh", 204, "FWD", 64, 455, null, SUV, 150),
  ],
  "kia-niro-electric-ii": [
    bev("64.8 kWh", 204, "FWD", 64.8, 460, null, SUV, 150),
  ],

  // Hybrid power is not on the Finnish announcement, so only the 180 hp petrol is stored.
  "kia-seltos-seltos": [
    p("1.6 T-GDI 180", 180, "7DCT", SUV),
    p("1.6 T-GDI 180", 180, "7DCT", SUV, "AWD"),
  ],

  "kia-sportage-i": [
    p("2.0 128", 128, "5MT", SUV, "4x4"),
    d("2.0 TD 83", 83, "5MT", SUV, "4x4"),
  ],
  "kia-sportage-ii": [
    p("2.0 142", 142, "5MT", SUV),
    p("2.0 142", 142, "4AT", SUV, "AWD"),
    p("2.7 V6 175", 175, "4AT", SUV, "AWD"),
    d("2.0 CRDi 113", 113, "5MT", SUV),
    d("2.0 CRDi 140", 140, "6MT", SUV, "AWD"),
  ],
  "kia-sportage-iii": [
    p("1.6 GDI 135", 135, "6MT", SUV),
    p("2.0 163", 163, "6MT", SUV),
    p("2.0 163", 163, "6AT", SUV, "AWD"),
    d("1.7 CRDi 115", 115, "6MT", SUV),
    d("2.0 CRDi 136", 136, "6MT", SUV),
    d("2.0 CRDi 184", 184, "6AT", SUV, "AWD"),
  ],
  "kia-sportage-iv": [
    p("1.6 GDI 132", 132, "6MT", SUV),
    p("1.6 T-GDI 177", 177, "7DCT", SUV, "AWD"),
    d("1.7 CRDi 115", 115, "6MT", SUV),
    d("2.0 CRDi 136", 136, "6MT", SUV),
    d("2.0 CRDi 185", 185, "6AT", SUV, "AWD"),
  ],
  "kia-sportage-iv-fl": [
    p("1.6 T-GDI 177", 177, "7DCT", SUV),
    p("1.6 T-GDI 177", 177, "7DCT", SUV, "AWD"),
    d("1.6 CRDi 115", 115, "6MT", SUV),
    d("1.6 CRDi 136", 136, "7DCT", SUV),
    d("2.0 CRDi 185", 185, "8AT", SUV, "AWD"),
  ],
  "kia-sportage-v": [
    p("1.6 T-GDI 150", 150, "6MT", SUV),
    p("1.6 T-GDI 150", 150, "7DCT", SUV),
    p("1.6 T-GDI 180", 180, "7DCT", SUV, "AWD"),
    d("1.6 CRDi 136", 136, "7DCT", SUV),
    hybrid("1.6 Hybrid 230", 230, "FWD", "6AT", SUV),
    hybrid("1.6 Hybrid 230", 230, "AWD", "6AT", SUV),
  ],
  // MY25 list prints 154.5 kW / 210 hp. MY26 list prints 178 kW / 239 hp.
  "kia-sportage-v-fl": [
    hybrid("1.6 Hybrid 210", 210, "FWD", "6AT", SUV, 155),
    hybrid("1.6 Hybrid 210", 210, "AWD", "6AT", SUV, 155),
    hybrid("1.6 Hybrid 239", 239, "FWD", "6AT", SUV, 178),
    hybrid("1.6 Hybrid 239", 239, "AWD", "6AT", SUV, 178),
  ],
  "kia-sportage-plug-in-v": [
    phev("1.6 Plug-in 265", 265, "AWD", "6AT", null, null, SUV),
  ],
  "kia-sportage-plug-in-v-fl": [
    phev("1.6 Plug-in 245", 245, "AWD", "6AT", null, null, SUV, 180),
  ],

  "kia-sorento-i": [
    p("2.4 139", 139, "5MT", SUV),
    p("3.5 V6 195", 195, "5AT", SUV, "4x4"),
    d("2.5 CRDi 140", 140, "5MT", SUV),
    d("2.5 CRDi 140", 140, "5AT", SUV, "4x4"),
  ],
  "kia-sorento-ii": [
    p("2.4 174", 174, "6MT", SUV),
    p("2.4 174", 174, "6AT", SUV, "AWD"),
    d("2.2 CRDi 197", 197, "6MT", SUV, "AWD"),
    d("2.2 CRDi 197", 197, "6AT", SUV, "AWD"),
  ],
  "kia-sorento-iii": [
    p("2.4 GDI 188", 188, "6AT", SUV, "AWD"),
    d("2.2 CRDi 200", 200, "6MT", SUV, "AWD"),
    d("2.2 CRDi 200", 200, "6AT", SUV, "AWD"),
  ],
  "kia-sorento-iii-fl": [
    p("2.4 GDI 188", 188, "6AT", SUV, "AWD"),
    d("2.2 CRDi 200", 200, "8AT", SUV, "AWD"),
  ],
  "kia-sorento-iv": [
    d("2.2 CRDi 202", 202, "8DCT", SUV, "AWD"),
    hybrid("1.6 Hybrid 230", 230, "FWD", "6AT", SUV),
    hybrid("1.6 Hybrid 230", 230, "AWD", "6AT", SUV),
  ],
  "kia-sorento-plug-in-iv": [
    phev("1.6 Plug-in 265", 265, "AWD", "6AT", 13.8, null, SUV),
  ],
  // Finnish MY27 list: 186 kW / 284 hp. A 2026 dealer car prints 13 kWh and 55 km.
  "kia-sorento-plug-in-iv-fl": [
    phev("1.6 Plug-in 284", 284, "AWD", "6AT", 13, 55, SUV, 186),
  ],

  "kia-stinger-stinger": [
    p("2.0 T-GDI 255", 255, "8AT", FB, "RWD"),
    p("3.3 T-GDI 370", 370, "8AT", FB, "AWD"),
  ],

  // Finnish MY27 list. The 61 kWh car is the lower-powered one.
  "kia-ev2-ev2": [
    bev("42.2 kWh", 146, "FWD", 42.2, 317, null, SUV, 107),
    bev("61 kWh", 135, "FWD", 61, 453, null, SUV, 99),
  ],
  // Finnish July 2026 sheet: 150 kW / 204 hp. Best combined 14.9 kWh/100.
  "kia-ev3-ev3": [
    bev("58.3 kWh", 204, "FWD", 58.3, 436, 14.9, SUV, 150),
    bev("81.4 kWh", 204, "FWD", 81.4, 605, 14.9, SUV, 150),
    bev("81.4 kWh", 265, "AWD", 81.4, null, null, SUV, 195),
  ],
  // Finnish MY26 price list, 1.2.2026. AWD is the later 265 hp hatchback.
  "kia-ev4-ev4": [
    bev("58.3 kWh", 204, "FWD", 58.3, 440, null, HB, 150),
    bev("81.4 kWh", 204, "FWD", 81.4, 625, null, HB, 150),
    bev("81.4 kWh", 265, "AWD", 81.4, null, null, HB, 195),
    bev("58.3 kWh", 204, "FWD", 58.3, 456, null, FB, 150),
    bev("81.4 kWh", 204, "FWD", 81.4, 633, null, FB, 150),
  ],
  // Finnish tech sheet: 160/195/225 kW. Ranges and consumption are the best printed figures.
  "kia-ev5-ev5": [
    bev("81.4 kWh", 218, "FWD", 81.4, 530, 16.9, SUV, 160),
    bev("81.4 kWh", 265, "AWD", 81.4, 491, 18.1, SUV, 195),
    bev("81.4 kWh GT", 305, "AWD", 81.4, 476, 18.6, SUV, 225),
  ],

  "kia-ev6-i": [
    bev("58 kWh", 170, "RWD", 58, null, null, SUV, 125),
    bev("77.4 kWh", 229, "RWD", 77.4, 528, null, SUV, 168),
    bev("77.4 kWh", 325, "AWD", 77.4, null, null, SUV, 239),
  ],
  // Finnish MY26 price list, 1.2.2026.
  "kia-ev6-fl": [
    bev("63 kWh", 170, "RWD", 63, 428, null, SUV, 125),
    bev("84 kWh", 229, "RWD", 84, 582, null, SUV, 168),
    bev("84 kWh", 325, "AWD", 84, 546, null, SUV, 239),
  ],
  "kia-ev6-gt-gt": [
    bev("GT", 585, "AWD", 77.4, null, null, SUV, 430),
  ],
  // Finnish page: 650 hp is Launch Control. Continuous output is 609 hp / 448 kW.
  "kia-ev6-gt-gt-fl": [
    bev("GT", 650, "AWD", 84, 450, null, SUV, 478),
  ],

  // Finnish model page: RWD 149.5 kW / 203 hp and 563 km. AWD 384 hp and 512 km.
  "kia-ev9-ev9": [
    bev("99.8 kWh", 203, "RWD", 99.8, 563, null, SUV, 150),
    bev("99.8 kWh", 384, "AWD", 99.8, 512, null, SUV, 283),
  ],

  // Finnish price lists. Best range is stored for each battery.
  "kia-pv5-pv5": [
    bev("51.5 kWh", 122, "FWD", 51.5, 297, null, MPV, 90),
    bev("71.2 kWh", 163, "FWD", 71.2, 412, null, MPV, 120),
  ],
  "kia-pv5-cargo-cargo": [
    bev("51.5 kWh", 122, "FWD", 51.5, 297, null, VAN, 90),
    bev("71.2 kWh", 163, "FWD", 71.2, 416, null, VAN, 120),
  ],
};
