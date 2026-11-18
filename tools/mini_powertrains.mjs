/**
 * European MINI engines. Cooper S on the R50 years is the R53 supercharged car,
 * stored on that generation because buyers meet it as the 2001–2006 hatch.
 * Current electric figures follow mini.fi: Cooper E/SE 184–218 hp and
 * 36.6–49.2 kWh; Aceman 135–190 kW and 38.5–49.2 kWh.
 * No US engines.
 */
const k = (hp) => Math.round(hp * 0.735);

function petrol(name, hp, drive, gear, body) {
  return {
    name,
    powertrain: "petrol",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
}
function diesel(name, hp, drive, gear, body) {
  return {
    name,
    powertrain: "diesel",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
}
function phev(name, hp, drive, gear, body) {
  return {
    name,
    powertrain: "phev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
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
  };
  if (bat != null) row.batteryKwh = bat;
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = "WLTP";
  }
  return row;
}

const HB = "Hatchback";
const CAB = "Cabrio";
const CLB = "Wagon";
const SUV = "SUV";
const CP = "Coupe";
const SAL = "Sedan";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);
const p6 = (name, hp, body) => petrol(name, hp, "FWD", "6MT", body);

export const MINI_MAKE_IDS = ["mini"];

export const MINI_POWERTRAINS = {
  "mini-classic-mk3": [p5("998", 42, SAL), p5("1275", 63, SAL)],
  "mini-classic-mpi": [p5("1.3 MPI", 63, SAL)],

  "mini-cooper-r50": [
    p5("One 1.6", 90, HB),
    p5("Cooper 1.6", 115, HB),
    petrol("Cooper S 1.6", 163, "FWD", "6MT", HB),
  ],
  "mini-cooper-r56": [
    p5("One 1.4", 95, HB),
    p6("Cooper 1.6", 120, HB),
    petrol("Cooper S 1.6 T", 175, "FWD", "6MT", HB),
    diesel("Cooper D 1.6", 110, "FWD", "6MT", HB),
  ],
  "mini-cooper-r56-fl": [
    p6("One 1.6", 98, HB),
    p6("Cooper 1.6", 122, HB),
    petrol("Cooper S", 184, "FWD", "6MT", HB),
    petrol("JCW", 211, "FWD", "6MT", HB),
  ],
  "mini-cooper-f56": [
    petrol("One 1.2", 102, "FWD", "6MT", HB),
    petrol("Cooper 1.5", 136, "FWD", "6MT", HB),
    petrol("Cooper S 2.0", 192, "FWD", "6MT", HB),
    petrol("JCW", 231, "FWD", "6MT", HB),
    diesel("Cooper D 1.5", 116, "FWD", "6MT", HB),
  ],
  "mini-cooper-f56-fl": [
    petrol("Cooper 1.5", 136, "FWD", "7DCT", HB),
    petrol("Cooper S 2.0", 178, "FWD", "7DCT", HB),
    petrol("JCW", 231, "FWD", "8AT", HB),
    bev("Cooper SE", 184, "FWD", 32.6, 230, HB),
  ],
  "mini-cooper-f66": [
    petrol("Cooper C", 156, "FWD", "7DCT", HB),
    petrol("Cooper S", 204, "FWD", "7DCT", HB),
  ],
  "mini-cooper-j01": [
    bev("Cooper E", 184, "FWD", 36.6, 300, HB),
    bev("Cooper SE", 218, "FWD", 49.2, 400, HB),
  ],

  "mini-cabrio-r52": [p5("One", 90, CAB), p5("Cooper", 115, CAB), petrol("Cooper S", 170, "FWD", "6MT", CAB)],
  "mini-cabrio-r57": [
    p6("Cooper", 122, CAB),
    petrol("Cooper S", 184, "FWD", "6MT", CAB),
  ],
  "mini-cabrio-f57": [
    petrol("Cooper", 136, "FWD", "6MT", CAB),
    petrol("Cooper S", 192, "FWD", "7DCT", CAB),
  ],
  "mini-cabrio-f67": [
    petrol("Cooper C", 156, "FWD", "7DCT", CAB),
    petrol("Cooper S", 204, "FWD", "7DCT", CAB),
  ],

  "mini-clubman-r55": [
    p6("Cooper", 122, CLB),
    petrol("Cooper S", 184, "FWD", "6MT", CLB),
    diesel("Cooper D", 112, "FWD", "6MT", CLB),
  ],
  "mini-clubman-f54": [
    petrol("Cooper", 136, "FWD", "6MT", CLB),
    petrol("Cooper S", 192, "FWD", "8AT", CLB),
    petrol("JCW ALL4", 231, "AWD", "8AT", CLB),
    diesel("Cooper D", 150, "FWD", "6MT", CLB),
  ],
  "mini-clubman-f54-fl": [
    petrol("Cooper", 136, "FWD", "7DCT", CLB),
    petrol("Cooper S", 178, "FWD", "7DCT", CLB),
    petrol("JCW ALL4", 306, "AWD", "8AT", CLB),
  ],

  "mini-countryman-r60": [
    p6("Cooper", 122, SUV),
    petrol("Cooper S", 184, "FWD", "6MT", SUV),
    petrol("Cooper S ALL4", 184, "AWD", "6AT", SUV),
    diesel("Cooper D", 112, "FWD", "6MT", SUV),
    diesel("Cooper SD ALL4", 143, "AWD", "6AT", SUV),
  ],
  "mini-countryman-f60": [
    petrol("Cooper", 136, "FWD", "6MT", SUV),
    petrol("Cooper S", 192, "FWD", "8AT", SUV),
    petrol("Cooper S ALL4", 192, "AWD", "8AT", SUV),
    diesel("Cooper D", 150, "FWD", "6MT", SUV),
  ],
  "mini-countryman-f60-fl": [
    petrol("Cooper", 136, "FWD", "7DCT", SUV),
    petrol("Cooper S", 178, "FWD", "7DCT", SUV),
    petrol("JCW ALL4", 306, "AWD", "8AT", SUV),
    phev("Cooper SE ALL4", 220, "AWD", "6AT", SUV),
  ],
  "mini-countryman-u25": [
    petrol("C", 170, "FWD", "7DCT", SUV),
    petrol("S ALL4", 218, "AWD", "7DCT", SUV),
    bev("E", 204, "RWD", null, null, SUV),
    bev("SE ALL4", 313, "AWD", null, null, SUV),
  ],

  "mini-aceman-j05": [
    bev("E", 184, "FWD", 38.5, 310, SUV),
    bev("SE", 258, "FWD", 49.2, 405, SUV),
  ],

  "mini-coupe-r58": [
    petrol("Cooper", 122, "FWD", "6MT", CP),
    petrol("Cooper S", 184, "FWD", "6MT", CP),
    diesel("Cooper SD", 143, "FWD", "6MT", CP),
  ],
};
