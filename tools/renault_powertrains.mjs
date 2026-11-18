/**
 * Renault engines for cars sold new in Finland after 2005.
 * Renault 5, Scenic E-Tech, Rafale, Clio VI, Austral and Symbioz follow renault.fi.
 * A full-hybrid E-Tech pack under 2 kWh is not stored as a traction battery.
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
const SUV = "SUV";
const VAN = "Van";
const MPV = "MPV";
const SW = "Sedan, Wagon";
const CP = "Coupe";

export const RENAULT_MAKE_IDS = ["renault"];

export const RENAULT_POWERTRAINS = {
  "renault-4-e-tech": [
    bev("40 kWh", 122, "FWD", 40, null, HB),
    bev("52 kWh", 150, "FWD", 52, null, HB),
  ],
  "renault-5-e-tech": [
    bev("40 kWh", 122, "FWD", 40, 320, HB, 14.3),
    bev("52 kWh", 150, "FWD", 52, 429, HB, 14.0),
  ],
  "renault-arkana-arkana": [
    petrol("1.3 TCe", 140, "FWD", "7DCT", SUV),
    hybrid("E-Tech 145", 145, "FWD", "AT", SUV),
  ],
  "renault-austral-austral": [
    hybrid("Mild hybrid 160", 160, "FWD", "AT", SUV, 6.2),
    hybrid("E-Tech 200", 200, "FWD", "AT", SUV, 4.6),
  ],
  "renault-captur-i": [
    p5("0.9 TCe", 90, SUV),
    p6("1.2 TCe", 120, SUV),
    d6("1.5 dCi", 90, SUV),
    d6("1.5 dCi", 110, SUV),
  ],
  "renault-captur-ii": [
    p5("1.0 TCe", 90, SUV),
    petrol("1.3 TCe", 130, "FWD", "7DCT", SUV),
    petrol("1.3 TCe", 155, "FWD", "7DCT", SUV),
    hybrid("E-Tech 145", 145, "FWD", "AT", SUV),
    phev("E-Tech Plug-in", 160, "FWD", "AT", 9.8, 50, SUV),
    d6("1.5 dCi", 115, SUV),
  ],
  "renault-clio-iii": [
    p5("1.2", 75, HB),
    p5("1.2 TCe", 100, HB),
    p5("1.6", 110, HB),
    p6("RS", 200, HB),
    d5("1.5 dCi", 86, HB),
    d5("1.5 dCi", 106, HB),
  ],
  "renault-clio-iv": [
    p5("1.2", 75, HE),
    p5("0.9 TCe", 90, HE),
    p6("1.2 TCe", 120, HE),
    p6("RS", 200, HB),
    d5("1.5 dCi", 75, HE),
    d5("1.5 dCi", 90, HE),
  ],
  "renault-clio-v": [
    p5("1.0 TCe", 90, HB),
    p6("1.0 TCe", 100, HB),
    petrol("1.3 TCe", 130, "FWD", "7DCT", HB),
    hybrid("E-Tech 140", 140, "FWD", "AT", HB),
    d6("1.5 dCi", 85, HB),
    d6("1.5 dCi", 115, HB),
  ],
  "renault-clio-vi": [
    petrol("TCe 115", 115, "FWD", "6MT", HB),
    petrol("TCe 115", 115, "FWD", "6DCT", HB),
    hybrid("E-Tech 160", 160, "FWD", "AT", HB, 4.0),
  ],
  "renault-espace-iv": [
    p6("2.0 Turbo", 170, MPV),
    petrol("3.5 V6", 241, "FWD", "6AT", MPV),
    d6("1.9 dCi", 120, MPV),
    d6("2.0 dCi", 150, MPV),
    diesel("2.0 dCi", 175, "FWD", "6AT", MPV),
    diesel("3.0 dCi", 180, "FWD", "6AT", MPV),
  ],
  "renault-espace-v": [
    petrol("1.6 TCe", 200, "FWD", "7DCT", MPV),
    petrol("1.8 TCe", 225, "FWD", "7DCT", MPV),
    diesel("1.6 dCi", 130, "FWD", "6DCT", MPV),
    diesel("2.0 dCi", 160, "FWD", "6DCT", MPV),
    diesel("2.0 dCi", 200, "FWD", "6DCT", MPV),
  ],
  "renault-express-express": [p6("1.3 TCe", 100, VAN), d6("1.5 dCi", 95, VAN)],
  "renault-kadjar-kadjar": [
    p6("1.2 TCe", 130, SUV),
    petrol("1.3 TCe", 140, "FWD", "7DCT", SUV),
    d6("1.5 dCi", 115, SUV),
    diesel("1.6 dCi", 130, "AWD", "6DCT", SUV),
  ],
  "renault-kangoo-i": [p5("1.2", 75, VAN), p5("1.6", 95, VAN), d5("1.5 dCi", 85, VAN)],
  "renault-kangoo-ii": [
    p5("1.2", 75, VAN),
    d5("1.5 dCi", 75, VAN),
    d6("1.5 dCi", 90, VAN),
    d6("1.5 dCi", 110, VAN),
    bev("Z.E.", 60, "FWD", 22, null, VAN),
  ],
  "renault-kangoo-iii": [
    p6("1.3 TCe", 100, VAN),
    d6("1.5 Blue dCi", 95, VAN),
    bev("E-Tech", 122, "FWD", 45, 285, VAN),
  ],
  "renault-koleos-i": [
    petrol("2.5", 170, "FWD", "CVT", SUV),
    diesel("2.0 dCi", 150, "AWD", "6AT", SUV),
  ],
  "renault-koleos-ii": [
    diesel("1.6 dCi", 130, "FWD", "6DCT", SUV),
    diesel("2.0 dCi", 177, "AWD", "6DCT", SUV),
  ],
  "renault-laguna-ii": [
    p5("1.6", 110, SW),
    p6("2.0 Turbo", 165, SW),
    d6("1.9 dCi", 120, SW),
    d6("2.0 dCi", 150, SW),
  ],
  "renault-laguna-iii": [
    p6("1.6", 110, SW),
    p6("2.0 Turbo", 170, SW),
    p6("2.0 Turbo", 205, SW),
    d6("1.5 dCi", 110, SW),
    d6("2.0 dCi", 150, SW),
    diesel("2.0 dCi", 180, "FWD", "6AT", SW),
  ],
  "renault-master-ii": [
    diesel("2.5 dCi", 100, "FWD", "6MT", VAN),
    diesel("2.5 dCi", 120, "FWD", "6MT", VAN),
    diesel("2.5 dCi", 150, "FWD", "6MT", VAN),
  ],
  "renault-master-iii": [
    d6("2.3 dCi", 110, VAN),
    d6("2.3 dCi", 135, VAN),
    diesel("2.3 dCi", 165, "FWD", "6MT", VAN),
  ],
  "renault-master-iv": [
    d6("2.0 Blue dCi", 130, VAN),
    diesel("2.0 Blue dCi", 170, "FWD", "8AT", VAN),
    bev("E-Tech", 130, "FWD", 87, 460, VAN),
  ],
  "renault-megane-ii": [
    p5("1.4", 98, HE),
    p5("1.6", 113, HE),
    p6("2.0", 136, HE),
    p6("2.0 Turbo", 165, HE),
    p6("RS", 225, HB),
    d5("1.5 dCi", 86, HE),
    d6("1.9 dCi", 130, HE),
  ],
  "renault-megane-iii": [
    p5("1.6", 110, HE),
    p6("1.2 TCe", 115, HE),
    p6("1.4 TCe", 130, HE),
    p6("2.0 TCe", 180, HE),
    p6("RS", 265, CP),
    d6("1.5 dCi", 110, HE),
    d6("1.6 dCi", 130, HE),
  ],
  "renault-megane-iv": [
    p6("1.2 TCe", 100, HE),
    petrol("1.3 TCe", 140, "FWD", "7DCT", HE),
    p6("1.6 TCe", 205, HE),
    petrol("RS", 280, "FWD", "6DCT", HB),
    d6("1.5 dCi", 115, HE),
    diesel("1.6 dCi", 130, "FWD", "6DCT", HE),
    phev("E-Tech Plug-in", 160, "FWD", "AT", 9.8, 50, HE),
  ],
  "renault-megane-e-tech": [
    bev("40 kWh", 130, "FWD", 40, 300, HB),
    bev("60 kWh", 220, "FWD", 60, 450, HB),
  ],
  "renault-modus-modus": [
    p5("1.2", 75, MPV),
    p5("1.2 TCe", 100, MPV),
    p5("1.6", 113, MPV),
    d5("1.5 dCi", 85, MPV),
  ],
  "renault-rafale-rafale": [
    hybrid("E-Tech 200", 200, "FWD", "AT", SUV, 4.7),
    phev("E-Tech 4x4 300", 300, "AWD", "AT", 22, 105, SUV, 1.7),
  ],
  "renault-scenic-ii": [
    p5("1.4", 98, MPV),
    p5("1.6", 113, MPV),
    p6("2.0", 136, MPV),
    p6("2.0 Turbo", 165, MPV),
    d5("1.5 dCi", 86, MPV),
    d6("1.9 dCi", 130, MPV),
  ],
  "renault-scenic-iii": [
    p5("1.6", 110, MPV),
    p6("1.2 TCe", 115, MPV),
    p6("1.4 TCe", 130, MPV),
    d6("1.5 dCi", 110, MPV),
    d6("1.6 dCi", 130, MPV),
  ],
  "renault-scenic-iv": [
    p6("1.3 TCe", 140, MPV),
    petrol("1.3 TCe", 160, "FWD", "7DCT", MPV),
    d6("1.5 dCi", 115, MPV),
    diesel("1.7 Blue dCi", 150, "FWD", "6DCT", MPV),
  ],
  "renault-scenic-e-tech": [
    bev("67 kWh", 218, "FWD", 67, 466, MPV, 17.0),
    bev("89 kWh", 218, "FWD", 89, 641, MPV, 16.4),
  ],
  "renault-symbioz-symbioz": [
    hybrid("Mild hybrid 140", 140, "FWD", "6DCT", SUV),
    hybrid("E-Tech 160", 160, "FWD", "AT", SUV, 4.4),
  ],
  "renault-talisman-talisman": [
    petrol("1.6 TCe", 150, "FWD", "7DCT", SW),
    petrol("1.8 TCe", 225, "FWD", "7DCT", SW),
    d6("1.5 dCi", 110, SW),
    diesel("1.6 dCi", 160, "FWD", "6DCT", SW),
    diesel("2.0 dCi", 200, "FWD", "6DCT", SW),
  ],
  "renault-trafic-ii": [
    diesel("2.0 dCi", 90, "FWD", "6MT", VAN),
    diesel("2.0 dCi", 115, "FWD", "6MT", VAN),
    diesel("2.5 dCi", 145, "FWD", "6MT", VAN),
  ],
  "renault-trafic-iii": [
    d6("1.6 dCi", 95, VAN),
    d6("1.6 dCi", 145, VAN),
    diesel("2.0 Blue dCi", 150, "FWD", "6MT", VAN),
    diesel("2.0 Blue dCi", 170, "FWD", "6DCT", VAN),
    bev("E-Tech", 122, "FWD", 52, null, VAN),
  ],
  "renault-twingo-i": [p5("1.2", 60, HB), p5("1.2", 75, HB)],
  "renault-twingo-ii": [p5("1.2", 75, HB), p5("1.2 TCe", 100, HB), d5("1.5 dCi", 85, HB)],
  "renault-twingo-iii": [
    p5("1.0 SCe", 70, HB),
    p5("0.9 TCe", 90, HB),
    bev("Electric", 82, "RWD", 22, 190, HB),
  ],
  "renault-vel-satis-vel-satis": [
    p6("2.0 Turbo", 165, HB),
    petrol("3.5 V6", 241, "FWD", "6AT", HB),
    d6("2.0 dCi", 150, HB),
    diesel("2.2 dCi", 140, "FWD", "6AT", HB),
    diesel("3.0 dCi", 177, "FWD", "6AT", HB),
  ],
  "renault-zoe-zoe": [
    bev("22 kWh", 88, "FWD", 22, null, HB),
    bev("41 kWh", 92, "FWD", 41, null, HB),
  ],
  "renault-zoe-ze50": [
    bev("R110", 108, "FWD", 52, 395, HB),
    bev("R135", 135, "FWD", 52, 395, HB),
  ],
};
