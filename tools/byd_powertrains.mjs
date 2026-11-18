/**
 * Finnish / European BYD powertrains for the Nettiauto model list.
 * Figures follow the BYD Finland price list (20.2.2026) and European
 * type data: PS, usable battery, WLTP range. One row per version.
 *
 * powertrain: bev | phev
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

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

function phev(name, hp, drive, bat, erange, body, kw) {
  return {
    name,
    powertrain: "phev",
    powerHp: hp,
    powerKw: kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: "Automatic",
    bodyStyles: body,
    batteryKwh: bat,
    electricRangeKm: erange,
    rangeStandard: W,
  };
}

const HB = "Hatchback";
const SUV = "SUV";
const SED = "Sedan";
const TOUR = "Touring";
const VAN = "Van";

/** @type {Record<string, object[]>} */
export const BYD_POWERTRAINS = {
  // Finland 2026 sells the 64.8 kWh Comfort. Active is the earlier EU battery.
  "byd-atto-2-atto-2": [
    bev("Active", 177, "FWD", 45.1, 312, null, SUV, 130),
    bev("Comfort", 204, "FWD", 64.8, 430, 16.0, SUV, 150),
  ],

  "byd-atto-3-atto-3": [
    bev("204", 204, "FWD", 60.5, 420, 16.0, SUV, 150),
  ],

  // Finnish brochure 13.7.2026: 74.8 kWh, Design 510 km / 16.4, Excellence 470 km / 17.8.
  "byd-atto-3-atto-3-evo": [
    bev("Design", 313, "RWD", 74.8, 510, 16.4, SUV, 230),
    bev("Excellence", 449, "AWD", 74.8, 470, 17.8, SUV, 330),
  ],

  "byd-dolphin-dolphin": [
    bev("204", 204, "FWD", 60.4, 427, 15.9, HB, 150),
  ],

  // Finnish list: Boost 322 km, Comfort 310 km. Both use the 43.2 kWh battery.
  "byd-dolphin-surf-dolphin-surf": [
    bev("Boost", 88, "FWD", 43.2, 322, null, HB, 65),
    bev("Comfort", 156, "FWD", 43.2, 310, null, HB, 115),
  ],

  // European panel van. Rear motor, 44.9 kWh, 233 km combined WLTP.
  "byd-etp3-etp3": [
    bev("ETP3", 136, "RWD", 44.9, 233, null, VAN, 100),
  ],

  "byd-han-han": [
    bev("AWD", 517, "AWD", 85.4, 521, null, SED, 380),
  ],

  "byd-seal-seal": [
    bev("Design", 313, "RWD", 82.5, 570, 16.6, SED, 230),
    bev("Excellence", 530, "AWD", 82.5, 520, 18.2, SED, 390),
  ],

  // Sedan and Touring share the Nettiauto model. Ranges are the Finnish list.
  "byd-seal-6-dm-i-seal-6-dm-i": [
    phev("Boost", 184, "FWD", 10.1, 55, SED, 135),
    phev("Comfort", 212, "FWD", 19.0, 105, SED, 156),
    phev("Touring Boost", 184, "FWD", 10.1, 50, TOUR, 135),
    phev("Touring Comfort", 212, "FWD", 19.0, 100, TOUR, 156),
  ],

  "byd-seal-u-seal-u": [
    bev("Comfort", 218, "FWD", 71.8, 420, null, SUV, 160),
    bev("Design", 218, "FWD", 87.0, 500, null, SUV, 160),
  ],

  "byd-seal-u-dm-i-seal-u-dm-i": [
    phev("Boost", 218, "FWD", 18.3, 80, SUV, 160),
    phev("Comfort", 218, "FWD", 26.6, 125, SUV, 160),
    phev("Design", 323, "AWD", 18.3, 70, SUV, 238),
  ],

  "byd-sealion-7-sealion-7": [
    bev("Comfort", 313, "RWD", 82.5, 482, null, SUV, 230),
    bev("Design", 530, "AWD", 82.5, 456, null, SUV, 390),
    bev("Excellence", 530, "AWD", 91.3, 502, null, SUV, 390),
  ],

  "byd-tang-tang": [
    bev("AWD", 517, "AWD", 108.8, 530, null, SUV, 380),
  ],
};

export const BYD_MAKE_IDS = ["byd"];
