/**
 * Opel engines for cars sold new in Finland after 2005.
 * Current Astra, Frontera and Grandland figures follow opel.fi.
 * Astra Electric is the Finnish 54 kWh / 419 km car. Frontera Electric is the
 * Finnish 44 kWh and 54 kWh pair. Grandland Electric uses the Finnish 73 kWh cars.
 * A 48-volt hybrid pack is not stored as a traction battery.
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
const diesel = (name, hp, drive, gear, body) => fuel("diesel", name, hp, drive, gear, body, null);
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
  };
  if (bat != null) row.batteryKwh = bat;
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = W;
  }
  if (kwh100 != null) row.consumptionCombinedKwh = kwh100;
  return row;
}

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);
const d6 = (name, hp, body) => diesel(name, hp, "FWD", "6MT", body);
const d5 = (name, hp, body) => diesel(name, hp, "FWD", "5MT", body);

const HB = "Hatchback";
const HE = "Hatchback, Estate";
const HEC = "Hatchback, Estate, Convertible";
const SUV = "SUV";
const VAN = "Van";
const MPV = "MPV";
const RD = "Roadster";
const SHW = "Sedan, Hatchback, Wagon";
const IST = "Hatchback, Sedan, Sports Tourer";
const ST = "Hatchback, Sports Tourer";

export const OPEL_MAKE_IDS = ["opel"];

export const OPEL_POWERTRAINS = {
  "opel-adam-adam": [
    p5("1.2", 70, HB),
    p5("1.4", 87, HB),
    p6("1.0 Turbo", 115, HB),
    p6("1.4 Turbo S", 150, HB),
  ],
  "opel-agila-a": [p5("1.0", 60, HB), p5("1.2", 75, HB), d5("1.3 CDTI", 70, HB)],
  "opel-agila-b": [p5("1.0", 65, HB), p5("1.2", 86, HB), d5("1.3 CDTI", 75, HB)],
  "opel-ampera-ampera": [
    {
      name: "Ampera",
      powertrain: "phev",
      powerHp: 150,
      powerKw: k(150),
      drivetrain: "FWD",
      transmissionSummary: "AT",
      bodyStyles: HB,
      consumptionCombinedL: 1.2,
      consumptionStandard: "NEDC",
      batteryKwh: 16,
      electricRangeKm: 83,
      rangeStandard: "NEDC",
    },
  ],
  "opel-antara-antara": [
    petrol("2.4", 167, "FWD", "5MT", SUV),
    petrol("2.4", 167, "AWD", "5AT", SUV),
    diesel("2.0 CDTI", 150, "AWD", "6MT", SUV),
  ],
  "opel-antara-fl": [
    petrol("2.4", 167, "AWD", "6AT", SUV),
    diesel("2.2 CDTI", 163, "AWD", "6MT", SUV),
    diesel("2.2 CDTI", 184, "AWD", "6AT", SUV),
  ],
  "opel-astra-h": [
    p5("1.4", 90, HEC),
    p5("1.6", 105, HEC),
    p5("1.8", 140, HEC),
    p6("2.0 Turbo", 170, HEC),
    p6("OPC", 240, HEC),
    d6("1.3 CDTI", 90, HE),
    d5("1.7 CDTI", 100, HE),
    d6("1.9 CDTI", 120, HE),
    d6("1.9 CDTI", 150, HE),
  ],
  "opel-astra-j": [
    p5("1.4", 100, HE),
    p6("1.4 Turbo", 140, HE),
    p6("1.6 Turbo", 180, HE),
    p6("OPC", 280, HE),
    d6("1.3 CDTI", 95, HE),
    d6("1.7 CDTI", 110, HE),
    d6("1.7 CDTI", 130, HE),
    diesel("2.0 CDTI", 160, "FWD", "6MT", HE),
    diesel("2.0 CDTI", 160, "FWD", "6AT", HE),
  ],
  "opel-astra-k": [
    p5("1.0 Turbo", 105, HE),
    p6("1.4 Turbo", 125, HE),
    p6("1.4 Turbo", 150, HE),
    petrol("1.4 Turbo", 150, "FWD", "6AT", HE),
    p6("1.6 Turbo", 200, HE),
    d6("1.6 CDTI", 110, HE),
    d6("1.6 CDTI", 136, HE),
    d6("1.6 CDTI BiTurbo", 160, HE),
  ],
  "opel-astra-k-fl": [
    p6("1.2 Turbo", 110, HE),
    p6("1.2 Turbo", 130, HE),
    p6("1.2 Turbo", 145, HE),
    d6("1.5 Diesel", 105, HE),
    d6("1.5 Diesel", 122, HE),
  ],
  "opel-astra-l": [
    petrol("1.2 Turbo", 110, "FWD", "6MT", ST, 5.4),
    petrol("1.2 Turbo", 110, "FWD", "8AT", ST, 5.4),
    petrol("1.2 Turbo", 130, "FWD", "8AT", ST, 5.5),
    hybrid("Hybrid 136", 136, "FWD", "6DCT", ST, 4.7),
    d6("1.5 Diesel", 130, ST),
    phev("Plug-in Hybrid 180", 180, "FWD", "8AT", 12.4, 55, ST, 1.2),
    phev("Plug-in Hybrid 225", 225, "FWD", "8AT", 12.4, 55, ST, 1.3),
    bev("Electric", 156, "FWD", 54, 419, ST, 15.0),
  ],
  "opel-combo-c": [p5("1.6", 87, VAN), d5("1.3 CDTI", 75, VAN), d5("1.7 CDTI", 100, VAN)],
  "opel-combo-d": [
    p5("1.4", 95, VAN),
    p6("1.4 Turbo", 120, VAN),
    d6("1.3 CDTI", 90, VAN),
    d6("1.6 CDTI", 105, VAN),
    d6("2.0 CDTI", 135, VAN),
  ],
  "opel-combo-e": [
    p6("1.2 Turbo", 110, VAN),
    d6("1.5 Diesel", 100, VAN),
    d6("1.5 Diesel", 130, VAN),
    bev("Electric", 136, "FWD", 50, 275, VAN),
  ],
  "opel-corsa-c": [
    p5("1.0", 60, HB),
    p5("1.2", 75, HB),
    p5("1.4", 90, HB),
    p5("1.8", 125, HB),
    d5("1.3 CDTI", 70, HB),
    d5("1.7 CDTI", 100, HB),
  ],
  "opel-corsa-d": [
    p5("1.0", 65, HB),
    p5("1.2", 85, HB),
    p5("1.4", 100, HB),
    p6("1.6 Turbo", 150, HB),
    p6("OPC", 192, HB),
    d5("1.3 CDTI", 75, HB),
    d6("1.3 CDTI", 95, HB),
    d6("1.7 CDTI", 130, HB),
  ],
  "opel-corsa-e": [
    p5("1.2", 70, HB),
    p5("1.4", 90, HB),
    p5("1.0 Turbo", 90, HB),
    p6("1.0 Turbo", 115, HB),
    p6("OPC", 207, HB),
    d5("1.3 CDTI", 75, HB),
    d6("1.3 CDTI", 95, HB),
  ],
  "opel-corsa-f": [
    p5("1.2", 75, HB),
    p6("1.2 Turbo", 100, HB),
    petrol("1.2 Turbo", 100, "FWD", "8AT", HB),
    petrol("1.2 Turbo", 130, "FWD", "8AT", HB),
    d6("1.5 Diesel", 102, HB),
    bev("Electric", 136, "FWD", 50, 337, HB),
  ],
  "opel-corsa-fl": [
    hybrid("Hybrid 100", 100, "FWD", "6DCT", HB),
    bev("Electric", 156, "FWD", 51, 402, HB),
  ],
  "opel-crossland-x": [
    p5("1.2", 83, SUV),
    p6("1.2 Turbo", 110, SUV),
    petrol("1.2 Turbo", 130, "FWD", "6AT", SUV),
    d6("1.5 Diesel", 102, SUV),
    d6("1.5 Diesel", 120, SUV),
  ],
  "opel-crossland-fl": [
    p6("1.2 Turbo", 110, SUV),
    petrol("1.2 Turbo", 130, "FWD", "6AT", SUV),
    d6("1.5 Diesel", 110, SUV),
  ],
  "opel-frontera-i": [
    hybrid("Hybrid 110", 110, "FWD", "6DCT", SUV, 5.3),
    hybrid("Hybrid 145", 145, "FWD", "6DCT", SUV, 5.3),
    bev("Electric 44 kWh", 113, "FWD", 44, 306, SUV, 18.2),
    bev("Electric 54 kWh", 113, "FWD", 54, 406, SUV, 15.8),
  ],
  "opel-grandland-x": [
    p6("1.2 Turbo", 130, SUV),
    petrol("1.6 Turbo", 180, "FWD", "8AT", SUV),
    d6("1.5 Diesel", 130, SUV),
    diesel("2.0 Diesel", 177, "FWD", "8AT", SUV),
    phev("Hybrid4", 300, "AWD", "8AT", 13.2, 59, SUV),
  ],
  "opel-grandland-fl": [
    p6("1.2 Turbo", 130, SUV),
    d6("1.5 Diesel", 130, SUV),
    phev("Plug-in Hybrid", 225, "FWD", "8AT", 13.2, null, SUV),
    phev("Hybrid4", 300, "AWD", "8AT", 13.2, 59, SUV),
  ],
  "opel-grandland-ii": [
    hybrid("Hybrid 145", 145, "FWD", "6DCT", SUV, 5.4),
    phev("Plug-in Hybrid 225", 225, "FWD", "7DCT", 17.9, null, SUV),
    bev("Electric 213", 213, "FWD", 73, 520, SUV),
    bev("Electric 325", 325, "AWD", 73, 492, SUV),
  ],
  "opel-gt-gt": [petrol("2.0 Turbo", 264, "RWD", "5MT", RD)],
  "opel-insignia-a": [
    p6("1.4 Turbo", 140, IST),
    p6("1.6 Turbo", 180, IST),
    p6("1.8", 140, IST),
    p6("2.0 Turbo", 220, IST),
    petrol("2.0 Turbo", 250, "FWD", "6AT", IST),
    petrol("OPC", 325, "AWD", "6MT", IST),
    d6("2.0 CDTI", 130, IST),
    d6("2.0 CDTI", 160, IST),
    diesel("2.0 CDTI", 163, "AWD", "6MT", IST),
    diesel("2.0 CDTI", 195, "FWD", "6AT", IST),
  ],
  "opel-insignia-b": [
    p6("1.5 Turbo", 140, ST),
    p6("1.5 Turbo", 165, ST),
    petrol("2.0 Turbo", 260, "AWD", "8AT", ST),
    d6("1.6 Diesel", 110, ST),
    d6("1.6 Diesel", 136, ST),
    diesel("2.0 Diesel", 170, "FWD", "8AT", ST),
    diesel("2.0 BiTurbo", 210, "AWD", "8AT", ST),
  ],
  "opel-karl-karl": [p5("1.0", 75, HB)],
  "opel-meriva-a": [
    p5("1.4", 90, MPV),
    p5("1.6", 105, MPV),
    p5("1.8", 125, MPV),
    d5("1.3 CDTI", 75, MPV),
    d6("1.7 CDTI", 100, MPV),
    d6("1.7 CDTI", 125, MPV),
  ],
  "opel-meriva-b": [
    p5("1.4", 100, MPV),
    p6("1.4 Turbo", 120, MPV),
    p6("1.4 Turbo", 140, MPV),
    d6("1.3 CDTI", 95, MPV),
    d6("1.7 CDTI", 110, MPV),
    d6("1.6 CDTI", 136, MPV),
  ],
  "opel-mokka-i": [
    p6("1.4 Turbo", 140, SUV),
    petrol("1.4 Turbo", 140, "AWD", "6MT", SUV),
    p5("1.6", 115, SUV),
    d6("1.6 CDTI", 110, SUV),
    d6("1.6 CDTI", 136, SUV),
    diesel("1.7 CDTI", 130, "FWD", "6MT", SUV),
  ],
  "opel-mokka-ii": [
    p6("1.2 Turbo", 100, SUV),
    petrol("1.2 Turbo", 130, "FWD", "8AT", SUV),
    d6("1.5 Diesel", 110, SUV),
    hybrid("Hybrid 136", 136, "FWD", "6DCT", SUV),
    bev("Electric 50 kWh", 136, "FWD", 50, 324, SUV),
    bev("Electric 54 kWh", 156, "FWD", 54, 406, SUV, 15.4),
  ],
  "opel-movano-a": [
    diesel("2.5 CDTI", 100, "FWD", "6MT", VAN),
    diesel("2.5 CDTI", 120, "FWD", "6MT", VAN),
    diesel("3.0 CDTI", 136, "FWD", "6MT", VAN),
  ],
  "opel-movano-b": [
    d6("2.3 CDTI", 110, VAN),
    d6("2.3 CDTI", 130, VAN),
    diesel("2.3 CDTI", 150, "FWD", "6MT", VAN),
    diesel("2.3 CDTI", 180, "FWD", "6MT", VAN),
  ],
  "opel-movano-c": [
    d6("2.2 Diesel", 140, VAN),
    diesel("2.2 Diesel", 180, "FWD", "8AT", VAN),
    bev("Electric", 122, "FWD", 70, null, VAN),
  ],
  "opel-signum-signum": [
    p5("1.8", 122, HB),
    p6("2.0 Turbo", 175, HB),
    p5("2.2", 155, HB),
    petrol("3.2 V6", 211, "FWD", "5AT", HB),
    d6("1.9 CDTI", 120, HB),
    d6("1.9 CDTI", 150, HB),
    diesel("3.0 CDTI", 184, "FWD", "6AT", HB),
  ],
  "opel-tigra-b": [p5("1.4", 90, RD), p5("1.8", 125, RD)],
  "opel-vectra-c": [
    p5("1.6", 105, SHW),
    p5("1.8", 122, SHW),
    p5("2.2", 155, SHW),
    p6("2.0 Turbo", 175, SHW),
    p6("OPC", 255, SHW),
    d6("1.9 CDTI", 120, SHW),
    d6("1.9 CDTI", 150, SHW),
    diesel("3.0 CDTI", 184, "FWD", "6AT", SHW),
  ],
  "opel-vivaro-a": [
    diesel("2.0 CDTI", 90, "FWD", "6MT", VAN),
    diesel("2.0 CDTI", 114, "FWD", "6MT", VAN),
    diesel("2.5 CDTI", 146, "FWD", "6MT", VAN),
  ],
  "opel-vivaro-b": [
    d6("1.6 CDTI", 95, VAN),
    d6("1.6 CDTI", 120, VAN),
    d6("1.6 CDTI", 145, VAN),
  ],
  "opel-vivaro-c": [
    d6("1.5 Diesel", 120, VAN),
    diesel("2.0 Diesel", 150, "FWD", "6MT", VAN),
    diesel("2.0 Diesel", 180, "FWD", "8AT", VAN),
    bev("Electric 50 kWh", 136, "FWD", 50, 230, VAN),
    bev("Electric 75 kWh", 136, "FWD", 75, 330, VAN),
  ],
  "opel-zafira-b": [
    p5("1.6", 115, MPV),
    p5("1.8", 140, MPV),
    p6("2.0 Turbo", 200, MPV),
    p6("2.2", 150, MPV),
    d6("1.7 CDTI", 110, MPV),
    d6("1.9 CDTI", 120, MPV),
    d6("1.9 CDTI", 150, MPV),
  ],
  "opel-zafira-tourer": [
    p6("1.4 Turbo", 120, MPV),
    p6("1.4 Turbo", 140, MPV),
    p6("1.6 Turbo", 170, MPV),
    p6("1.6 Turbo", 200, MPV),
    d6("1.6 CDTI", 136, MPV),
    d6("2.0 CDTI", 130, MPV),
    diesel("2.0 CDTI", 170, "FWD", "6AT", MPV),
  ],
};
