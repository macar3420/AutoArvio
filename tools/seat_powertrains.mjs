/**
 * SEAT engines for cars sold new in Finland after 2005.
 * Current Leon, Ibiza, Arona and Ateca figures follow the Finnish price lists.
 * Leon e-HYBRID uses the Finnish 204 hp and 1.2 l/100 km car, with the
 * 19.7 kWh pack of that generation. Tarraco e-HYBRID is the 245 hp, 49 km car.
 * eTSI is a 48-volt hybrid, so the small pack is not stored.
 * Gas (TGI) rows are left out. Older rows have no consumption figure.
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

function bev(name, hp, drive, bat, range, body) {
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
  return row;
}

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);
const d5 = (name, hp, body) => diesel(name, hp, "FWD", "5MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);

const HB = "Hatchback";
const HE = "Hatchback, Estate";
const HS = "Hatchback, Sportstourer";
const SUV = "SUV";
const MPV = "MPV";
const SW = "Sedan, Wagon";

export const SEAT_MAKE_IDS = ["seat"];

export const SEAT_POWERTRAINS = {
  "seat-alhambra-7m": [
    p5("1.8 Turbo", 150, MPV),
    p5("2.0", 115, MPV),
    d6("1.9 TDI", 115, MPV),
    d6("2.0 TDI", 140, MPV),
  ],
  "seat-alhambra-7n": [
    p6("1.4 TSI", 150, MPV),
    petrol("2.0 TSI", 200, "FWD", "6DSG", MPV),
    d6("2.0 TDI", 140, MPV),
    diesel("2.0 TDI", 177, "FWD", "6DSG", MPV),
  ],
  "seat-altea-altea": [
    p5("1.6", 102, MPV),
    p6("1.4 TSI", 125, MPV),
    p6("2.0 TSI", 200, MPV),
    d6("1.9 TDI", 105, MPV),
    d6("2.0 TDI", 140, MPV),
    diesel("2.0 TDI", 140, "AWD", "6MT", MPV),
  ],
  "seat-arona-arona": [
    petrol("1.0 TSI", 116, "FWD", "6MT", SUV, 5.4),
    petrol("1.0 TSI", 116, "FWD", "7DSG", SUV, 5.6),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV, 5.6),
    d6("1.6 TDI", 95, SUV),
  ],
  "seat-ateca-ateca": [
    petrol("1.0 TSI", 110, "FWD", "6MT", SUV, 6.1),
    petrol("1.5 TSI", 150, "FWD", "6MT", SUV, 6.3),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV, 6.4),
    petrol("2.0 TSI", 190, "AWD", "7DSG", SUV),
    diesel("2.0 TDI", 115, "FWD", "6MT", SUV, 4.9),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SUV, 5.1),
    diesel("2.0 TDI", 150, "AWD", "7DSG", SUV, 5.8),
  ],
  "seat-cordoba-6l": [p5("1.2", 64, SW), p5("1.4", 75, SW), p5("1.4", 100, SW), d5("1.9 TDI", 100, SW)],
  "seat-exeo-exeo": [
    p5("1.6", 102, SW),
    p6("1.8 TSI", 160, SW),
    p6("2.0 TSI", 200, SW),
    d6("2.0 TDI", 120, SW),
    d6("2.0 TDI", 143, SW),
    d6("2.0 TDI", 170, SW),
  ],
  "seat-ibiza-6l": [
    p5("1.2", 64, HB),
    p5("1.4", 75, HB),
    p5("1.4", 100, HB),
    p5("1.8 T", 150, HB),
    d5("1.4 TDI", 70, HB),
    d5("1.9 TDI", 100, HB),
  ],
  "seat-ibiza-6j": [
    p5("1.2", 70, HB),
    p5("1.2 TSI", 105, HB),
    p6("1.4 TSI", 150, HB),
    p6("Cupra", 180, HB),
    d5("1.6 TDI", 105, HB),
  ],
  "seat-ibiza-6f": [
    petrol("1.0 TSI", 95, "FWD", "5MT", HB, 5.3),
    petrol("1.0 TSI", 110, "FWD", "6MT", HB, 5.1),
    petrol("1.0 TSI", 110, "FWD", "7DSG", HB, 5.5),
    petrol("1.5 TSI", 150, "FWD", "7DSG", HB, 6.1),
    d6("1.6 TDI", 95, HB),
  ],
  "seat-leon-1p": [
    p5("1.4", 85, HE),
    p5("1.6", 102, HE),
    p6("2.0 FSI", 150, HE),
    p6("2.0 TSI", 185, HE),
    p6("Cupra", 240, HB),
    d5("1.9 TDI", 105, HE),
    d6("2.0 TDI", 140, HE),
    d6("2.0 TDI", 170, HE),
  ],
  "seat-leon-5f": [
    p6("1.2 TSI", 110, HE),
    p6("1.4 TSI", 125, HE),
    petrol("1.4 TSI", 150, "FWD", "7DSG", HE),
    p6("1.8 TSI", 180, HE),
    petrol("Cupra", 300, "FWD", "6DSG", HB),
    d6("1.6 TDI", 105, HE),
    d6("2.0 TDI", 150, HE),
    diesel("2.0 TDI", 184, "FWD", "6DSG", HE),
  ],
  "seat-leon-kl": [
    petrol("1.5 TSI", 116, "FWD", "6MT", HS, 5.6),
    petrol("1.5 TSI", 150, "FWD", "6MT", HS, 5.6),
    hybrid("1.5 eTSI", 116, "FWD", "7DSG", HS, 5.1),
    hybrid("1.5 eTSI", 150, "FWD", "7DSG", HS, 5.1),
    phev("e-HYBRID", 204, "FWD", "6DSG", 19.7, 126, HS, 1.2),
    diesel("2.0 TDI", 150, "FWD", "7DSG", HS),
  ],
  "seat-mii-mii": [
    p5("1.0", 60, HB),
    p5("1.0", 75, HB),
    bev("Electric", 83, "FWD", 36.8, 260, HB),
  ],
  "seat-tarraco-tarraco": [
    petrol("1.5 TSI", 150, "FWD", "6MT", SUV, 6.7),
    petrol("1.5 TSI", 150, "FWD", "7DSG", SUV, 7.1),
    petrol("2.0 TSI", 190, "AWD", "7DSG", SUV),
    diesel("2.0 TDI", 150, "FWD", "7DSG", SUV),
    diesel("2.0 TDI", 200, "AWD", "7DSG", SUV),
    phev("e-HYBRID", 245, "FWD", "6DSG", 13, 49, SUV),
  ],
  "seat-toledo-5p": [
    p5("1.6", 102, HB),
    p6("1.4 TSI", 125, HB),
    d6("1.9 TDI", 105, HB),
    d6("2.0 TDI", 140, HB),
  ],
  "seat-toledo-kg": [p5("1.2 TSI", 90, HB), p6("1.2 TSI", 110, HB), p6("1.4 TSI", 125, HB), d5("1.6 TDI", 105, HB)],
};
