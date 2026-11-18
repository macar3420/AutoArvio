/**
 * Finnish / European Cupra powertrains.
 * Current cars follow the 2026 Cupra Finland price lists.
 * Older rows are the Europe engines sold before the 2024 facelift.
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
  row.batteryKwh = bat;
  row.electricRangeKm = erange;
  row.rangeStandard = W;
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

const HB = "Hatchback";
const SUV = "SUV";
const ST = "Sportstourer";

/** @type {Record<string, object[]>} */
export const CUPRA_POWERTRAINS = {
  "cupra-ateca-ateca": [
    petrol("2.0 TSI 300", 300, "4Drive", "7DSG", SUV, 8.6, 221),
  ],

  // First Born: rear motor, the two versions Finland actually sold.
  "cupra-born-born": [
    bev("204", 204, "RWD", 58, 424, 15.5, HB, 150),
    bev("e-Boost", 231, "RWD", 77, 540, 15.9, HB, 170),
  ],

  // Cupra technical sheet, MY2026. Range is the best WLTP figure.
  "cupra-born-born-fl": [
    bev("140 kW", 190, "RWD", 58, 484, 14.2, HB, 140),
    bev("170 kW", 231, "RWD", 79, 627, 14.4, HB, 170),
    bev("VZ", 326, "RWD", 79, 631, 14.1, HB, 240),
  ],

  "cupra-formentor-formentor": [
    petrol("1.5 TSI 150", 150, "FWD", "6MT", SUV, 6.5, 110),
    petrol("1.5 TSI 150", 150, "FWD", "7DSG", SUV, 6.4, 110),
    petrol("2.0 TSI 190", 190, "FWD", "7DSG", SUV, 7.2, 140),
    petrol("2.0 TSI 245", 245, "4Drive", "7DSG", SUV, 7.8, 180),
    diesel("2.0 TDI 150", 150, "FWD", "7DSG", SUV, 5.1, 110),
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.3, 12.8, 58, SUV, 150),
    phev("e-Hybrid 245", 245, "FWD", "6DSG", 1.4, 12.8, 52, SUV, 180),
  ],

  // Finland Chosen One list, 4.9.2026.
  "cupra-formentor-formentor-fl": [
    hybrid("1.5 eTSI 150", 150, "FWD", "7DSG", SUV, 5.9, 110),
    petrol("2.0 TSI 204", 204, "4Drive", "7DSG", SUV, 7.5, 150),
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.4, 19.7, 119, SUV, 150),
  ],

  "cupra-formentor-vz-formentor-vz": [
    petrol("VZ 2.0 TSI 310", 310, "4Drive", "7DSG", SUV, 8.5, 228),
    petrol("VZ5 2.5 TSI 390", 390, "4Drive", "7DSG", SUV, 10.5, 287),
  ],

  "cupra-formentor-vz-formentor-vz-fl": [
    petrol("VZ 2.0 TSI 333", 333, "4Drive", "7DSG", SUV, 8.8, 245),
    phev("VZ e-Hybrid 272", 272, "FWD", "6DSG", 1.6, 19.7, 117, SUV, 200),
  ],

  "cupra-leon-leon": [
    petrol("1.5 TSI 150", 150, "FWD", "6MT", HB, 6.2, 110),
    petrol("1.5 TSI 150", 150, "FWD", "7DSG", HB, 6.1, 110),
    petrol("2.0 TSI 190", 190, "FWD", "7DSG", HB, 6.9, 140),
    petrol("2.0 TSI 245", 245, "FWD", "7DSG", HB, 7.2, 180),
    petrol("VZ 2.0 TSI 300", 300, "FWD", "7DSG", HB, 7.5, 221),
    diesel("2.0 TDI 150", 150, "FWD", "6MT", HB, 4.8, 110),
    diesel("2.0 TDI 150", 150, "FWD", "7DSG", HB, 4.7, 110),
  ],

  // Finland Leon Turn On list, 2.1.2026. Petrol VZ stays on Leon.
  "cupra-leon-leon-fl": [
    hybrid("1.5 eTSI 150", 150, "FWD", "7DSG", HB, 5.3, 110),
    petrol("VZ 2.0 TSI 300", 300, "FWD", "7DSG", HB, 7.6, 221),
  ],

  "cupra-leon-ehybrid-leon-e-hybrid": [
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.3, 12.8, 58, HB, 150),
    phev("e-Hybrid 245", 245, "FWD", "6DSG", 1.4, 12.8, 52, HB, 180),
  ],

  // Weighted WLTP is the first figure in the Finnish "1.3/5.1" pair.
  "cupra-leon-ehybrid-leon-e-hybrid-fl": [
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.3, 19.7, 132, HB, 150),
    phev("VZ e-Hybrid 272", 272, "FWD", "6DSG", 1.5, 19.7, 121, HB, 200),
  ],

  "cupra-leon-sportstourer-leon-st": [
    petrol("1.5 TSI 150", 150, "FWD", "6MT", ST, 6.4, 110),
    petrol("1.5 TSI 150", 150, "FWD", "7DSG", ST, 6.3, 110),
    petrol("2.0 TSI 190", 190, "FWD", "7DSG", ST, 7.0, 140),
    petrol("2.0 TSI 245", 245, "4Drive", "7DSG", ST, 7.6, 180),
    petrol("VZ 2.0 TSI 310", 310, "4Drive", "7DSG", ST, 8.2, 228),
    diesel("2.0 TDI 150", 150, "FWD", "7DSG", ST, 4.9, 110),
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.4, 12.8, 55, ST, 150),
  ],

  // 333 hp is the Sportstourer petrol VZ. Hatch VZ stays at 300 hp.
  "cupra-leon-sportstourer-leon-st-fl": [
    hybrid("1.5 eTSI 150", 150, "FWD", "7DSG", ST, 5.3, 110),
    petrol("VZ 2.0 TSI 333", 333, "4Drive", "7DSG", ST, 8.8, 245),
    phev("e-Hybrid 204", 204, "FWD", "6DSG", 1.3, 19.7, 132, ST, 150),
    phev("VZ e-Hybrid 272", 272, "FWD", "6DSG", 1.5, 19.7, 121, ST, 200),
  ],

  // Finland price list 4.9.2026. Battery figure is the net capacity.
  "cupra-raval-raval": [
    bev("85 kW", 116, "FWD", 37, 318, 13.5, HB, 85),
    bev("99 kW", 135, "FWD", 37, 328, 13.8, HB, 99),
    bev("Endurance", 211, "FWD", 52, 446, 13.6, HB, 155),
    bev("VZ", 226, "FWD", 52, 440, 13.8, HB, 166),
  ],

  "cupra-tavascan-tavascan": [
    bev("Endurance", 286, "RWD", 77, 569, 15.2, SUV, 210),
    bev("VZ", 340, "AWD", 77, 521, 16.5, SUV, 250),
  ],

  "cupra-terramar-terramar": [
    hybrid("1.5 eTSI 150", 150, "FWD", "7DSG", SUV, null, 110),
    petrol("2.0 TSI 204", 204, "4Drive", "7DSG", SUV, null, 150),
    petrol("VZ 2.0 TSI 265", 265, "4Drive", "7DSG", SUV, null, 195),
    phev("e-Hybrid 204", 204, "FWD", "6DSG", null, 19.7, 119, SUV, 150),
    phev("VZ e-Hybrid 272", 272, "FWD", "6DSG", null, 19.7, 119, SUV, 200),
  ],
};

export const CUPRA_MAKE_IDS = ["cupra"];
