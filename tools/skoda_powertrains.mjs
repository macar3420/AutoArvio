/**
 * Škoda engines for cars sold new in Finland after 2005.
 * Elroq, Enyaq, Kodiaq II, Peaq and Epiq follow the Finnish spec sheets.
 * Superb iV uses the Finnish 25.7 kWh pack and the "over 130 km" WLTP figure.
 * Octavia and Superb plug-in hybrids are engines of those models.
 * Enyaq Coupé is a body style. eTEC is a 48-volt hybrid, so that pack is not stored.
 * Older rows have no consumption figure.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function fuel(kind, name, hp, drive, gear, body, l) {
  const row = {
    name,
    powertrain: kind,
    powerHp: hp,
    powerKw: k(hp),
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

const petrol = (name, hp, drive, gear, body, l) => fuel("petrol", name, hp, drive, gear, body, l);
const diesel = (name, hp, drive, gear, body, l) => fuel("diesel", name, hp, drive, gear, body, l);
const hybrid = (name, hp, drive, gear, body, l) => fuel("hybrid", name, hp, drive, gear, body, l);

function phev(name, hp, drive, gear, bat, erange, body, l) {
  const row = fuel("phev", name, hp, drive, gear, body, l);
  if (bat != null) row.batteryKwh = bat;
  if (erange != null) {
    row.electricRangeKm = erange;
    row.rangeStandard = W;
  }
  return row;
}

function bev(name, hp, drive, bat, range, body, kwh100) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: bat,
  };
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = W;
  }
  if (kwh100 != null) row.consumptionCombinedKwh = kwh100;
  return row;
}

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);
const d5 = (name, hp, body) => diesel(name, hp, "FWD", "5MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);

const HB = "Hatchback";
const HE = "Hatchback, Estate";
const SW = "Sedan, Wagon";
const SUV = "SUV";
const SC = "SUV, Coupe";
const MPV = "MPV";

export const SKODA_MAKE_IDS = ["skoda"];

export const SKODA_POWERTRAINS = {
  "skoda-citigo-citigo": [
    p5("1.0", 60, HB),
    p5("1.0", 75, HB),
    bev("e-Citigo", 83, "FWD", 36.8, 260, HB),
  ],
  "skoda-elroq-elroq": [
    bev("60", 190, "RWD", 61, 441, SUV, 15.4),
    bev("85", 286, "RWD", 82, 565, SUV, 15.4),
    bev("85x", 299, "AWD", 82, 564, SUV, 15.6),
    bev("RS", 340, "AWD", 82, 558, SUV, 16.1),
  ],
  "skoda-enyaq-iv": [
    bev("60", 179, "RWD", 62, null, SC),
    bev("80", 204, "RWD", 82, null, SC),
    bev("80x", 265, "AWD", 82, null, SC),
    bev("RS", 299, "AWD", 82, null, SC),
  ],
  "skoda-enyaq-85": [
    bev("60", 190, "RWD", 61, 453, SC, 15.1),
    bev("85", 286, "RWD", 82, 578, SC, 15.3),
    bev("85x", 299, "AWD", 82, 578, SC, 15.5),
    bev("RS", 340, "AWD", 82, 565, SC, 15.8),
  ],
  "skoda-epiq-epiq": [
    bev("35", 116, "FWD", 38.5, 315, SUV),
    bev("55", 211, "FWD", 55, 435, SUV),
  ],
  "skoda-fabia-i": [
    p5("1.2", 64, HB),
    p5("1.4", 75, HB),
    p5("1.4", 100, HB),
    p5("RS", 130, HB),
    d5("1.4 TDI", 75, HB),
    d5("1.9 TDI", 100, HB),
  ],
  "skoda-fabia-ii": [
    p5("1.2", 70, HE),
    p5("1.2 TSI", 105, HE),
    p6("RS", 180, HB),
    d5("1.4 TDI", 80, HE),
    d5("1.6 TDI", 105, HE),
  ],
  "skoda-fabia-iii": [
    p5("1.0 MPI", 60, HE),
    p5("1.0 MPI", 75, HE),
    p5("1.0 TSI", 95, HE),
    p6("1.0 TSI", 110, HE),
    d5("1.4 TDI", 90, HE),
  ],
  "skoda-fabia-iv": [p5("1.0 TSI", 95, HE), p6("1.0 TSI", 110, HE), petrol("1.5 TSI", 150, "FWD", "7DSG", HE)],
  "skoda-kamiq-kamiq": [
    p5("1.0 TSI", 95, SUV),
    p6("1.0 TSI", 115, SUV),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV),
  ],
  "skoda-karoq-karoq": [
    p6("1.0 TSI", 110, SUV),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV),
    d6("2.0 TDI", 115, SUV),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SUV),
    petrol("2.0 TSI", 190, "AWD", "7DSG", SUV),
  ],
  "skoda-kodiaq-i": [
    p6("1.4 TSI", 150, SUV),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV),
    petrol("2.0 TSI", 190, "AWD", "7DSG", SUV),
    d6("2.0 TDI", 150, SUV),
    diesel("2.0 TDI", 190, "AWD", "7DSG", SUV),
  ],
  "skoda-kodiaq-ii": [
    hybrid("1.5 TSI eTEC", 150, "FWD", "7DSG", SUV, 5.9),
    phev("1.5 TSI PHEV", 204, "FWD", "6DSG", 19.7, 119, SUV, 1.5),
    petrol("2.0 TSI", 204, "AWD", "7DSG", SUV, 7.4),
    petrol("2.0 TSI", 265, "AWD", "7DSG", SUV, 8.2),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SUV, 5.3),
    diesel("2.0 TDI", 193, "AWD", "7DSG", SUV, 6.0),
  ],
  "skoda-octavia-ii": [
    p5("1.4", 80, SW),
    p5("1.6", 102, SW),
    p6("1.8 TSI", 160, SW),
    p6("2.0 TSI", 200, SW),
    p6("RS", 200, SW),
    d5("1.9 TDI", 105, SW),
    d6("2.0 TDI", 140, SW),
  ],
  "skoda-octavia-iii": [
    p5("1.2 TSI", 86, SW),
    p6("1.4 TSI", 150, SW),
    petrol("1.8 TSI", 180, "FWD", "7DSG", SW),
    petrol("2.0 TSI RS", 230, "FWD", "6DSG", SW),
    petrol("2.0 TSI RS", 245, "AWD", "7DSG", SW),
    d6("1.6 TDI", 110, SW),
    d6("2.0 TDI", 150, SW),
    diesel("2.0 TDI", 184, "AWD", "6DSG", SW),
  ],
  "skoda-octavia-iv": [
    p6("1.0 TSI", 110, SW),
    hybrid("1.5 TSI eTEC", 116, "FWD", "7DSG", SW),
    hybrid("1.5 TSI eTEC", 150, "FWD", "7DSG", SW),
    hybrid("1.5 TSI eTEC", 150, "AWD", "7DSG", SW),
    petrol("2.0 TSI", 190, "FWD", "7DSG", SW),
    petrol("2.0 TSI RS", 245, "FWD", "7DSG", SW),
    phev("iV", 204, "FWD", "6DSG", 13, 60, SW),
    diesel("2.0 TDI", 116, "FWD", "7DSG", SW),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SW),
    diesel("2.0 TDI", 200, "AWD", "7DSG", SW),
  ],
  "skoda-peaq-peaq": [
    bev("60", 204, "RWD", 59, 446, SUV, 15.1),
    bev("90", 286, "RWD", 86, 629, SUV, 15.3),
    bev("90x", 299, "AWD", 86, 597, SUV, 16.1),
  ],
  "skoda-rapid-rapid": [
    p5("1.2 TSI", 90, SW),
    p6("1.2 TSI", 110, SW),
    p5("1.0 TSI", 95, SW),
    p6("1.0 TSI", 110, SW),
    d5("1.4 TDI", 90, SW),
    d6("1.6 TDI", 115, SW),
  ],
  "skoda-roomster-roomster": [
    p5("1.2", 70, MPV),
    p5("1.2 TSI", 105, MPV),
    p5("1.4", 86, MPV),
    d5("1.4 TDI", 80, MPV),
    d5("1.9 TDI", 105, MPV),
  ],
  "skoda-scala-scala": [
    p5("1.0 TSI", 95, HB),
    p6("1.0 TSI", 115, HB),
    petrol("1.5 TSI", 150, "FWD", "7DSG", HB),
  ],
  "skoda-superb-i": [
    p5("1.8 T", 150, SW),
    petrol("2.8 V6", 193, "FWD", "5AT", SW),
    d5("1.9 TDI", 100, SW),
    d6("1.9 TDI", 130, SW),
    diesel("2.5 TDI", 163, "FWD", "6AT", SW),
  ],
  "skoda-superb-ii": [
    p6("1.4 TSI", 125, SW),
    p6("1.8 TSI", 160, SW),
    petrol("3.6 V6", 260, "AWD", "6DSG", SW),
    d6("1.6 TDI", 105, SW),
    d6("2.0 TDI", 140, SW),
    diesel("2.0 TDI", 170, "FWD", "6DSG", SW),
  ],
  "skoda-superb-iii": [
    p6("1.4 TSI", 125, SW),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SW),
    petrol("2.0 TSI", 190, "FWD", "7DSG", SW),
    petrol("2.0 TSI", 280, "AWD", "7DSG", SW),
    d6("1.6 TDI", 120, SW),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SW),
    diesel("2.0 TDI", 190, "AWD", "7DSG", SW),
    phev("iV", 218, "FWD", "6DSG", 13, 55, SW),
  ],
  "skoda-superb-iv": [
    phev("iV 150 kW", 204, "FWD", "6DSG", 25.7, 130, SW),
    phev("iV 200 kW", 272, "FWD", "6DSG", 25.7, 130, SW),
  ],
  "skoda-yeti-yeti": [
    p6("1.2 TSI", 105, SUV),
    p6("1.4 TSI", 122, SUV),
    petrol("1.8 TSI", 160, "AWD", "6DSG", SUV),
    d6("2.0 TDI", 110, SUV),
    d6("2.0 TDI", 140, SUV),
    diesel("2.0 TDI", 170, "AWD", "6DSG", SUV),
  ],
};
