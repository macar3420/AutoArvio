/**
 * European MG engines. Current Finnish rows use the MG Finland / EU brochure
 * figures. Older MG Rover rows have no consumption figure.
 * ZS Hybrid+ battery is a 1.8 kWh hybrid pack, so it is not stored as a traction battery.
 * MG4 49 kWh is the car Finland sells as MG4 Urban.
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
  row.batteryKwh = bat;
  row.electricRangeKm = erange;
  row.rangeStandard = W;
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
  };
  if (bat != null) row.batteryKwh = bat;
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = W;
  }
  return row;
}

const RD = "Roadster";
const GT = "Roadster, GT";
const HB = "Hatchback";
const SW = "Sedan, Wagon";
const SUV = "SUV";
const EST = "Estate";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);

export const MG_MAKE_IDS = ["mg"];

export const MG_POWERTRAINS = {
  "mg-mgb-mk1": [petrol("1.8", 95, "RWD", "4MT", GT)],
  "mg-mgb-rubber": [petrol("1.8", 84, "RWD", "4MT", GT)],
  "mg-mgf-mgf": [
    petrol("1.8", 120, "RWD", "5MT", RD),
    petrol("1.8 VVC", 145, "RWD", "5MT", RD),
  ],
  "mg-tf-tf": [
    petrol("1.6", 115, "RWD", "5MT", RD),
    petrol("1.8", 135, "RWD", "5MT", RD),
    petrol("1.8 VVC", 160, "RWD", "5MT", RD),
  ],
  "mg-zr-zr": [
    p5("1.4", 103, HB),
    p5("1.8", 117, HB),
    p5("1.8 160", 160, HB),
    diesel("2.0 TD", 101, "FWD", "5MT", HB),
  ],
  "mg-zs-rover": [
    p5("1.6", 109, SW),
    p5("1.8", 117, SW),
    petrol("2.5 V6", 177, "FWD", "5MT", SW),
    diesel("2.0 TD", 113, "FWD", "5MT", SW),
  ],
  "mg-zs-petrol": [
    petrol("1.5", 106, "FWD", "5MT", SUV),
    petrol("1.0 T", 111, "FWD", "6MT", SUV),
  ],
  "mg-zs-hybrid": [hybrid("Hybrid+", 196, "FWD", "3AT", SUV, 5.1)],
  "mg-zs-ev-i": [bev("ZS EV", 143, "FWD", 44.5, 263, SUV)],
  "mg-zs-ev-fl": [
    bev("51 kWh", 177, "FWD", 51, null, SUV),
    bev("Long Range", 156, "FWD", 72, null, SUV),
  ],
  "mg-hs-i": [
    petrol("1.5 T", 162, "FWD", "6MT", SUV),
    petrol("1.5 T", 162, "FWD", "7DCT", SUV),
    phev("PHEV", 258, "FWD", "10AT", 16.6, 52, SUV, null),
  ],
  "mg-hs-ii": [
    petrol("1.5 T", 170, "FWD", "7DCT", SUV, 7.4),
    phev("PHEV", 272, "FWD", "AT", 21.4, 100, SUV, 0.5),
  ],
  "mg-mg3-hybrid": [hybrid("Hybrid+", 190, "FWD", "3AT", HB, 4.4)],
  "mg-mg4-mg4": [
    bev("49 kWh", 170, "RWD", 49, 350, HB),
    bev("64 kWh", 204, "RWD", 64, 465, HB),
    bev("77 kWh", 245, "RWD", 77, 530, HB),
    bev("XPower", 435, "AWD", 64, 400, HB),
  ],
  "mg-mg5-ev": [bev("61 kWh", 156, "FWD", 61, 380, EST)],
  "mg-marvel-r-i": [
    bev("RWD", 180, "RWD", 70, null, SUV),
    bev("AWD", 288, "AWD", 70, null, SUV),
  ],
  "mg-cyberster-i": [bev("AWD", 510, "AWD", null, 507, RD)],
  "mg-s5-ev": [
    bev("49 kWh", 170, "RWD", 49, 340, SUV),
    bev("64 kWh", 231, "RWD", 64, 480, SUV),
  ],
  "mg-zt-zt": [
    petrol("1.8 T", 160, "FWD", "5MT", SW),
    petrol("2.5 V6", 190, "FWD", "5MT / 5AT", SW),
    petrol("4.6 V8", 260, "RWD", "5AT", "Sedan"),
    diesel("2.0 CDTi", 131, "FWD", "5MT", SW),
  ],
};
