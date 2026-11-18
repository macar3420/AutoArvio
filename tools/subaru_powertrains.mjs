/**
 * Subaru engines for the cars sold in Finland after 2005.
 * Current Forester, Crosstrek, Outback, Solterra, Uncharted and E-Outback
 * use the Finnish or matching European WLTP figures.
 * e-BOXER is a hybrid. Its small pack is not stored as a traction battery.
 * STI is an engine of WRX. Older rows have no invented consumption.
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

const petrol = (name, hp, gear, body, l, kw) => fuel("petrol", name, hp, "AWD", gear, body, l, kw);
const diesel = (name, hp, gear, body) => fuel("diesel", name, hp, "AWD", gear, body);
const hybrid = (name, hp, gear, body, l, kw) => fuel("hybrid", name, hp, "AWD", gear, body, l, kw);

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

const SUV = "SUV";
const SW = "Sedan, Wagon";
const WAG = "Wagon";
const COUPE = "Coupe";
const SED = "Sedan";

export const SUBARU_MAKE_IDS = ["subaru"];

export const SUBARU_POWERTRAINS = {
  "subaru-brz-zc6": [
    { name: "2.0", powertrain: "petrol", powerHp: 200, powerKw: k(200), drivetrain: "RWD", transmissionSummary: "6MT", bodyStyles: COUPE },
    { name: "2.0", powertrain: "petrol", powerHp: 200, powerKw: k(200), drivetrain: "RWD", transmissionSummary: "6AT", bodyStyles: COUPE },
  ],
  "subaru-crosstrek-i": [hybrid("2.0 e-BOXER", 136, "CVT", SUV, 7.7, 100)],
  "subaru-e-outback-i": [bev("Electric", 380, "AWD", WAG, { bat: 74.7, kw: 280, range: 526, kwh100: 15.3 })],

  "subaru-forester-sg": [petrol("2.0", 158, "5MT", SUV), petrol("2.5 XT", 230, "4AT", SUV)],
  "subaru-forester-sh": [petrol("2.0", 150, "6MT", SUV), petrol("2.0", 150, "CVT", SUV), diesel("2.0 D", 147, "6MT", SUV), petrol("2.5 XT", 230, "4AT", SUV)],
  "subaru-forester-sj": [petrol("2.0", 150, "6MT", SUV), petrol("2.0", 150, "CVT", SUV), diesel("2.0 D", 147, "CVT", SUV), petrol("2.0 XT", 241, "CVT", SUV)],
  "subaru-forester-sk": [petrol("2.0", 150, "CVT", SUV), hybrid("2.0 e-BOXER", 150, "CVT", SUV)],
  "subaru-forester-sl": [hybrid("2.0 e-BOXER", 136, "CVT", SUV, 8.1, 100)],

  "subaru-impreza-gd": [petrol("1.5", 105, "5MT", SW), petrol("2.0", 160, "5MT", SW), petrol("2.0 WRX", 225, "5MT", SED), petrol("2.0 STI", 280, "6MT", SED)],
  "subaru-impreza-ge": [petrol("1.5", 107, "5MT", "Hatchback, Sedan"), petrol("2.0", 150, "5MT", "Hatchback, Sedan"), diesel("2.0 D", 150, "6MT", "Hatchback, Sedan"), petrol("2.5 WRX", 230, "5MT", "Hatchback, Sedan"), petrol("2.5 STI", 300, "6MT", SED)],
  "subaru-impreza-gj": [petrol("1.6", 114, "5MT", "Hatchback, Sedan"), petrol("2.0", 150, "CVT", "Hatchback, Sedan"), diesel("2.0 D", 150, "6MT", "Hatchback, Sedan"), petrol("2.5 STI", 300, "6MT", "Hatchback")],
  "subaru-impreza-gk": [petrol("1.6", 114, "CVT", "Hatchback, Sedan"), petrol("2.0", 156, "CVT", "Hatchback, Sedan"), hybrid("2.0 e-BOXER", 150, "CVT", "Hatchback, Sedan")],

  "subaru-legacy-bl": [petrol("2.0", 150, "5MT", SW), petrol("2.5", 173, "5AT", SW), petrol("3.0", 245, "5AT", SW), diesel("2.0 D", 150, "5MT", SW)],
  "subaru-legacy-bm": [petrol("2.0", 150, "6MT", SW), petrol("2.5", 167, "CVT", SW), diesel("2.0 D", 150, "6MT", SW)],
  "subaru-legacy-bn": [petrol("2.5", 175, "CVT", SW), diesel("2.0 D", 150, "CVT", SW)],

  "subaru-levorg-i": [petrol("1.6", 170, "CVT", WAG)],

  "subaru-outback-bp": [petrol("2.5", 165, "5AT", WAG), petrol("3.0", 245, "5AT", WAG), diesel("2.0 D", 150, "5MT", WAG)],
  "subaru-outback-br": [petrol("2.5", 167, "CVT", WAG), diesel("2.0 D", 150, "6MT", WAG)],
  "subaru-outback-bs": [petrol("2.5", 175, "CVT", WAG), diesel("2.0 D", 150, "CVT", WAG)],
  "subaru-outback-bt": [petrol("2.5", 169, "CVT", WAG, 8.6, 124)],

  "subaru-solterra-i": [bev("Electric", 218, "AWD", SUV, { bat: 71.4 })],
  "subaru-solterra-fl": [bev("Electric", 343, "AWD", SUV, { bat: 73.1, kw: 252, range: 511 })],

  "subaru-tribeca-i": [petrol("3.6", 258, "5AT", SUV)],

  "subaru-uncharted-i": [
    bev("57.7 kWh", 167, "FWD", SUV, { bat: 57.7, kw: 123, range: 451, kwh100: 13.7 }),
    bev("77 kWh", 224, "FWD", SUV, { bat: 77, kw: 165, range: 592, kwh100: 13.8 }),
    bev("77 kWh AWD", 343, "AWD", SUV, { bat: 77, kw: 252, range: 495 }),
  ],

  "subaru-wrx-va": [petrol("2.0", 268, "6MT", SED), petrol("2.0", 268, "CVT", SED), petrol("2.5 STI", 300, "6MT", SED)],

  "subaru-xv-i": [petrol("1.6", 114, "5MT", SUV), petrol("2.0", 150, "CVT", SUV), diesel("2.0 D", 147, "6MT", SUV)],
  "subaru-xv-ii": [petrol("1.6", 114, "CVT", SUV), petrol("2.0", 156, "CVT", SUV), hybrid("2.0 e-BOXER", 150, "CVT", SUV)],
};
