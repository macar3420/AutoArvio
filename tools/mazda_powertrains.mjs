/**
 * Mazda powertrains for the cars commonly sold in Finland.
 * Current rows follow the Mazda Finland price lists. The stored litre
 * is the best combined WLTP figure on that list.
 * Older rows are the European engines, without a consumption figure.
 * M Hybrid rows are mild hybrids. Mazda6e battery is printed as gross, so it is omitted.
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

const petrol = (name, hp, drive, gear, body, kw) => fuel("petrol", name, hp, drive, gear, body, null, kw);
const diesel = (name, hp, drive, gear, body, kw) => fuel("diesel", name, hp, drive, gear, body, null, kw);
const hybrid = (name, hp, drive, gear, body, l, kw) => fuel("hybrid", name, hp, drive, gear, body, l, kw);

function phev(name, hp, drive, gear, bat, erange, body, l, kwh100, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, l, kw);
  if (bat != null) row.batteryKwh = bat;
  if (erange != null) {
    row.electricRangeKm = erange;
    row.rangeStandard = W;
  }
  if (kwh100 != null) {
    row.consumptionCombinedKwh = kwh100;
    row.consumptionStandard = W;
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
  };
  if (bat != null) row.batteryKwh = bat;
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
const SED = "Sedan";
const SW = "Sedan, Wagon";
const HS = "Hatchback, Sedan";
const SUV = "SUV";
const MPV = "MPV";
const ROAD = "Roadster";
const COUPE = "Coupe";
const PICKUP = "Pickup";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const d5 = (name, hp, body) => diesel(name, hp, "FWD", "5MT", body);

export const MAZDA_MAKE_IDS = ["mazda"];

/** @type {Record<string, object[]>} */
export const MAZDA_POWERTRAINS = {
  // Finnish list, best combined 3.8 L. 85 kW / 116 hp.
  "mazda-2-hybrid-hybrid": [
    hybrid("1.5 Hybrid", 116, "FWD", "eCVT", HB, 3.8, 85),
  ],
  "mazda-2-dy": [p5("1.4", 80, HB), p5("1.6", 100, HB)],
  "mazda-2-de": [p5("1.3", 75, HB), p5("1.5", 102, HB), petrol("1.5", 102, "FWD", "4AT", HB)],
  "mazda-2-dj": [
    p5("1.5", 75, HB),
    petrol("1.5", 90, "FWD", "6MT", HB),
    petrol("1.5", 90, "FWD", "6AT", HB),
    petrol("1.5", 115, "FWD", "6MT", HB),
    petrol("1.5", 115, "FWD", "6AT", HB),
  ],

  "mazda-3-bk": [
    p5("1.6", 105, HS),
    petrol("2.0", 150, "FWD", "5MT", HS),
    petrol("2.0", 150, "FWD", "4AT", HS),
    d5("1.6 D", 109, HS),
    petrol("MPS", 260, "AWD", "6MT", HB, 191),
  ],
  "mazda-3-bl": [
    p5("1.6", 105, HS),
    petrol("2.0", 150, "FWD", "6MT", HS),
    petrol("2.0", 150, "FWD", "5AT", HS),
    d5("1.6 D", 115, HS),
    diesel("2.2 D", 150, "FWD", "6MT", HS),
    petrol("MPS", 260, "AWD", "6MT", HB, 191),
  ],
  "mazda-3-bm": [
    p5("1.5", 100, HS),
    petrol("2.0", 120, "FWD", "6MT", HS),
    petrol("2.0", 120, "FWD", "6AT", HS),
    petrol("2.0", 165, "FWD", "6MT", HS, 121),
    diesel("2.2 D", 150, "FWD", "6MT", HS),
  ],
  "mazda-3-bm-fl": [
    petrol("2.0", 122, "FWD", "6MT", HS, 90),
    petrol("2.0", 122, "FWD", "6AT", HS, 90),
    petrol("2.0", 165, "FWD", "6MT", HS, 121),
    petrol("2.0", 165, "FWD", "6AT", HS, 121),
    diesel("2.2 D", 150, "FWD", "6MT", HS),
  ],
  "mazda-3-bp": [
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6MT", HS, null, 90),
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6AT", HS, null, 90),
    hybrid("e-Skyactiv X", 180, "FWD", "6MT", HS, null, 132),
    hybrid("e-Skyactiv X", 180, "FWD", "6AT", HS, null, 132),
  ],
  "mazda-3-bp-fl": [
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6MT", HS, null, 90),
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6AT", HS, null, 90),
    hybrid("e-Skyactiv X", 186, "FWD", "6MT", HS, null, 137),
    hybrid("e-Skyactiv X", 186, "FWD", "6AT", HS, null, 137),
    hybrid("e-Skyactiv X", 186, "AWD", "6AT", HS, null, 137),
  ],
  // January 2026 list. Best combined: 2.5 manual 5.9 L, automatic 6.3 L, X manual 5.6 L.
  "mazda-3-bp-26": [
    hybrid("2.5 e-Skyactiv G", 140, "FWD", "6MT", HS, 5.9, 103),
    hybrid("2.5 e-Skyactiv G", 140, "FWD", "6AT", HS, 6.3, 103),
    hybrid("e-Skyactiv X", 186, "FWD", "6MT", HS, 5.6, 137),
    hybrid("e-Skyactiv X", 186, "FWD", "6AT", HS, 6.2, 137),
    hybrid("e-Skyactiv X", 186, "AWD", "6AT", HS, 6.5, 137),
  ],

  "mazda-6-gg": [
    p5("1.8", 120, SW),
    petrol("2.0", 141, "FWD", "5MT", SW),
    petrol("2.0", 141, "FWD", "4AT", SW),
    petrol("2.3", 166, "FWD", "6MT", SW),
    diesel("2.0 D", 136, "FWD", "6MT", SW),
    petrol("MPS", 260, "AWD", "6MT", SED, 191),
  ],
  "mazda-6-gh": [
    petrol("2.0", 147, "FWD", "6MT", SW),
    petrol("2.0", 147, "FWD", "5AT", SW),
    petrol("2.5", 170, "FWD", "6MT", SW),
    diesel("2.2 D", 163, "FWD", "6MT", SW),
    diesel("2.2 D", 185, "FWD", "6MT", SW),
    petrol("MPS", 260, "AWD", "6MT", SED, 191),
  ],
  "mazda-6-gj": [
    petrol("2.0", 145, "FWD", "6MT", SW),
    petrol("2.0", 145, "FWD", "6AT", SW),
    petrol("2.5", 192, "FWD", "6AT", SW, 141),
    diesel("2.2 D", 150, "FWD", "6MT", SW),
    diesel("2.2 D", 175, "FWD", "6AT", SW),
  ],
  "mazda-6-gj-fl": [
    petrol("2.0", 165, "FWD", "6MT", SW, 121),
    petrol("2.0", 165, "FWD", "6AT", SW, 121),
    petrol("2.5", 194, "FWD", "6AT", SW, 143),
    diesel("2.2 D", 150, "FWD", "6MT", SW),
    diesel("2.2 D", 184, "FWD", "6AT", SW),
  ],
  // Price list: 190 kW / 258 hp, 479 km, 16.6 kWh/100. Battery is printed as 68.8 kWh gross.
  "mazda-6e-6e": [
    bev("6e", 258, "RWD", null, 479, 16.6, "Fastback", 190),
  ],

  "mazda-cx-30-dm": [
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6MT", SUV, null, 90),
    hybrid("2.0 e-Skyactiv G", 122, "FWD", "6AT", SUV, null, 90),
    hybrid("e-Skyactiv X", 186, "FWD", "6AT", SUV, null, 137),
    hybrid("e-Skyactiv X", 186, "AWD", "6AT", SUV, null, 137),
  ],
  "mazda-cx-30-dm-26": [
    hybrid("2.5 e-Skyactiv G", 140, "FWD", "6MT", SUV, 6.0, 103),
    hybrid("2.5 e-Skyactiv G", 140, "FWD", "6AT", SUV, 6.5, 103),
    hybrid("e-Skyactiv X", 186, "FWD", "6AT", SUV, 6.2, 137),
    hybrid("e-Skyactiv X", 186, "AWD", "6MT", SUV, 6.2, 137),
    hybrid("e-Skyactiv X", 186, "AWD", "6AT", SUV, 6.6, 137),
  ],

  "mazda-cx-5-ke": [
    petrol("2.0", 165, "FWD", "6MT", SUV, 121),
    petrol("2.0", 165, "FWD", "6AT", SUV, 121),
    petrol("2.0", 165, "AWD", "6MT", SUV, 121),
    petrol("2.0", 165, "AWD", "6AT", SUV, 121),
    diesel("2.2 D", 150, "FWD", "6MT", SUV),
    diesel("2.2 D", 175, "AWD", "6AT", SUV),
  ],
  "mazda-cx-5-kf": [
    petrol("2.0", 165, "FWD", "6MT", SUV, 121),
    petrol("2.0", 165, "AWD", "6AT", SUV, 121),
    petrol("2.5", 194, "AWD", "6AT", SUV, 143),
    diesel("2.2 D", 150, "FWD", "6MT", SUV),
    diesel("2.2 D", 184, "AWD", "6AT", SUV),
  ],
  "mazda-cx-5-kf-fl": [
    hybrid("2.0 e-Skyactiv G", 165, "FWD", "6MT", SUV, null, 121),
    hybrid("2.0 e-Skyactiv G", 165, "AWD", "6AT", SUV, null, 121),
    hybrid("2.5 e-Skyactiv G", 194, "AWD", "6AT", SUV, null, 143),
  ],
  "mazda-cx-5-iii": [
    hybrid("2.5 e-Skyactiv G", 141, "FWD", "6AT", SUV, 7.0, 104),
    hybrid("2.5 e-Skyactiv G", 141, "AWD", "6AT", SUV, 7.4, 104),
  ],

  // Finnish tech page. PHEV 241 kW does not match round(327 * 0.735).
  "mazda-cx-60-kh": [
    phev("PHEV", 327, "AWD", "8AT", 17.8, 63, SUV, 1.5, 17.1, 241),
    hybrid("3.3 e-Skyactiv D", 200, "RWD", "8AT", SUV, 5.0, 147),
    hybrid("3.3 e-Skyactiv D", 254, "AWD", "8AT", SUV, 5.2, 187),
  ],
  "mazda-cx-80-i": [
    phev("PHEV", 327, "AWD", "8AT", 17.8, 60, SUV, 4.0, null, 241),
    hybrid("3.3 e-Skyactiv D", 254, "AWD", "8AT", SUV, null, 187),
  ],
  "mazda-cx-6e-cx-6e": [
    bev("78 kWh", 258, "RWD", 78, 484, null, SUV, 190),
  ],

  "mazda-mx-5-na": [
    petrol("1.6", 115, "RWD", "5MT", ROAD),
    petrol("1.8", 130, "RWD", "5MT", ROAD),
  ],
  "mazda-mx-5-nb": [
    petrol("1.6", 110, "RWD", "5MT", ROAD),
    petrol("1.8", 140, "RWD", "5MT", ROAD),
  ],
  "mazda-mx-5-nb-fl": [
    petrol("1.6", 110, "RWD", "5MT", ROAD),
    petrol("1.8", 146, "RWD", "5MT", ROAD),
  ],
  "mazda-mx-5-nc": [
    petrol("1.8", 126, "RWD", "5MT", ROAD),
    petrol("2.0", 160, "RWD", "6MT", ROAD, 118),
    petrol("2.0", 160, "RWD", "6AT", ROAD, 118),
  ],
  "mazda-mx-5-nd": [
    petrol("1.5", 131, "RWD", "6MT", ROAD, 96),
    petrol("2.0", 160, "RWD", "6MT", ROAD, 118),
  ],
  "mazda-mx-5-nd-fl": [
    petrol("1.5", 132, "RWD", "6MT", ROAD, 97),
    petrol("2.0", 184, "RWD", "6MT", ROAD, 135),
    petrol("2.0", 181, "RWD", "6AT", ROAD, 133),
  ],

  "mazda-cx-3-dk": [
    petrol("2.0", 121, "FWD", "6MT", SUV),
    petrol("2.0", 121, "FWD", "6AT", SUV),
    petrol("2.0", 121, "AWD", "6AT", SUV),
    diesel("1.5 D", 105, "FWD", "6MT", SUV),
  ],
  "mazda-mx-30-i": [
    bev("35.5 kWh", 145, "FWD", 35.5, 200, null, SUV, 107),
  ],
  "mazda-mx-30-r-ev-r-ev": [
    phev("R-EV", 170, "FWD", "1-speed", 17.8, 85, SUV, null, null, 125),
  ],

  "mazda-5-cr": [
    p5("1.8", 115, MPV),
    petrol("2.0", 145, "FWD", "5MT", MPV),
    petrol("2.0", 145, "FWD", "4AT", MPV),
    d5("2.0 D", 110, MPV),
  ],
  "mazda-5-cw": [
    petrol("2.0", 150, "FWD", "6MT", MPV),
    petrol("2.0", 150, "FWD", "5AT", MPV),
    diesel("1.6 D", 115, "FWD", "6MT", MPV),
  ],

  "mazda-323-bd": [p5("1.3", 68, HS), p5("1.5", 75, HS)],
  "mazda-323-bf": [p5("1.5", 75, HS), p5("1.6", 84, HS), p5("GT", 105, HB)],
  "mazda-323-bg": [p5("1.6", 88, HS), p5("1.8", 103, HS), p5("GT", 128, HB)],
  "mazda-323-ba": [p5("1.5", 88, HS), p5("1.8", 114, HS)],
  "mazda-323-bj": [p5("1.6", 98, HS), petrol("2.0", 130, "FWD", "5MT", HS), petrol("2.0", 130, "FWD", "4AT", HS)],

  "mazda-323f-bg": [p5("1.6", 88, COUPE), p5("GT", 128, COUPE)],
  "mazda-323f-ba": [p5("1.8", 114, COUPE), p5("V6", 144, COUPE)],
  "mazda-323f-bj": [p5("1.6", 98, COUPE), p5("2.0", 130, COUPE)],

  "mazda-626-gc": [p5("2.0", 101, SW), p5("2.0i", 120, SW)],
  "mazda-626-gd": [p5("2.0", 109, SW), p5("2.0 16V", 140, SW)],
  "mazda-626-ge": [p5("2.0", 115, SW), petrol("2.5 V6", 165, "FWD", "5MT", SW), petrol("2.5 V6", 165, "FWD", "4AT", SW)],
  "mazda-626-gf": [petrol("2.0", 136, "FWD", "5MT", SW), petrol("2.0", 136, "FWD", "4AT", SW)],

  "mazda-premacy-cp": [p5("1.8", 114, MPV), petrol("2.0", 131, "FWD", "5MT", MPV), d5("2.0 D", 100, MPV)],
  "mazda-mx-3-ec": [p5("1.6", 88, COUPE), p5("V6", 130, COUPE)],
  "mazda-mx-6-ge": [petrol("2.5 V6", 165, "FWD", "5MT", COUPE)],
  "mazda-cx-7-er": [petrol("2.3 DISI", 260, "AWD", "6AT", SUV, 191)],
  "mazda-rx-8-se": [
    petrol("231", 231, "RWD", "6MT", COUPE, 170),
    petrol("231", 231, "RWD", "6AT", COUPE, 170),
  ],
  "mazda-b2500-b2500": [diesel("2.5 D", 109, "4x4", "5MT", PICKUP)],
  "mazda-bt-50-i": [diesel("2.5 D", 143, "4x4", "5MT", PICKUP)],
  "mazda-bt-50-ii": [
    diesel("2.2 D", 150, "4x4", "6MT", PICKUP),
    diesel("3.2 D", 200, "4x4", "6MT", PICKUP),
    diesel("3.2 D", 200, "4x4", "6AT", PICKUP),
  ],
};
