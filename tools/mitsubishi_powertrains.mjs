/**
 * European Mitsubishi engines.
 * Colt VI figures are the Finnish MY25 price list: 1.0 MPI 66 hp and 1.0 T 90 hp.
 * The 143 hp hybrid was on the earlier European Colt and is kept on the same body.
 * ASX II is the Renault Captur twin sold in Finland, not the Japanese ASX.
 * Eclipse Cross EV uses the 87 kWh pack named for the Finnish car.
 * Its motor output is the CMF-EV figure, because Mitsubishi Finland has not published a different one.
 * No US Galant, no JDM Evolution specials.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function row(kind, name, hp, drive, gear, body, l) {
  const out = {
    name,
    powertrain: kind,
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
  if (l != null) {
    out.consumptionCombinedL = l;
    out.consumptionStandard = W;
  }
  return out;
}
const petrol = (name, hp, drive, gear, body, l) => row("petrol", name, hp, drive, gear, body, l);
const diesel = (name, hp, drive, gear, body) => row("diesel", name, hp, drive, gear, body, null);
const hybrid = (name, hp, drive, gear, body) => row("hybrid", name, hp, drive, gear, body, null);
function phev(name, hp, drive, gear, bat, erange, body) {
  const out = row("phev", name, hp, drive, gear, body, null);
  if (bat != null) out.batteryKwh = bat;
  if (erange != null) {
    out.electricRangeKm = erange;
    out.rangeStandard = W;
  }
  return out;
}
function bev(name, hp, drive, bat, range, body) {
  const out = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
  };
  if (bat != null) out.batteryKwh = bat;
  if (range != null) {
    out.electricRangeKm = range;
    out.rangeStandard = W;
  }
  return out;
}

const HB = "Hatchback";
const SW = "Sedan, Wagon";
const SB = "Sedan, Sportback";
const MPV = "MPV";
const SUV = "SUV";
const PU = "Pickup";
const VAN = "Van";
const CP = "Coupe";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);

export const MITSUBISHI_MAKE_IDS = ["mitsubishi"];

export const MITSUBISHI_POWERTRAINS = {
  "mitsubishi-colt-cj": [p5("1.3", 75, HB), p5("1.6", 103, HB)],
  "mitsubishi-colt-z30": [
    p5("1.1", 75, HB),
    p5("1.3", 95, HB),
    p5("1.5", 109, HB),
    petrol("1.5 T", 150, "FWD", "5MT", HB),
    diesel("1.5 DI-D", 95, "FWD", "5MT", HB),
  ],
  "mitsubishi-colt-vi": [
    petrol("1.0 MPI", 66, "FWD", "5MT", HB, 5.2),
    petrol("1.0 T", 90, "FWD", "5MT", HB, 5.1),
    hybrid("1.6 Hybrid", 143, "FWD", "AT", HB),
  ],

  "mitsubishi-lancer-cs": [p5("1.6", 98, "Sedan"), petrol("2.0", 135, "FWD", "5MT", "Sedan")],
  "mitsubishi-lancer-cy": [
    p5("1.5", 109, SB),
    p5("1.6", 117, SB),
    petrol("1.8", 140, "FWD", "5MT", SB),
    diesel("2.0 DI-D", 140, "FWD", "6MT", SB),
  ],

  "mitsubishi-lancer-evolution-vi": [petrol("2.0 T", 280, "AWD", "5MT", "Sedan")],
  "mitsubishi-lancer-evolution-vii": [petrol("2.0 T", 280, "AWD", "5MT", "Sedan")],
  "mitsubishi-lancer-evolution-viii": [petrol("2.0 T", 280, "AWD", "6MT", "Sedan")],
  "mitsubishi-lancer-evolution-ix": [petrol("2.0 T", 280, "AWD", "6MT", "Sedan")],
  "mitsubishi-lancer-evolution-x": [
    petrol("2.0 T", 295, "AWD", "6MT", "Sedan"),
    petrol("2.0 T", 295, "AWD", "6DCT", "Sedan"),
  ],

  "mitsubishi-carisma-i": [p5("1.6", 90, SW), p5("1.8", 116, SW), diesel("1.9 TD", 90, "FWD", "5MT", SW)],
  "mitsubishi-carisma-fl": [p5("1.6", 103, SW), p5("1.8 GDI", 125, SW), diesel("1.9 DI-D", 102, "FWD", "5MT", SW)],
  "mitsubishi-galant-ea": [
    p5("2.0", 136, SW),
    petrol("2.5 V6", 163, "FWD", "5MT / 4AT", SW),
    diesel("2.0 TD", 90, "FWD", "5MT", SW),
  ],

  "mitsubishi-space-star-i": [p5("1.3", 82, HB), p5("1.8 GDI", 122, HB), diesel("1.9 DI-D", 102, "FWD", "5MT", HB)],
  "mitsubishi-space-star-ii": [p5("1.0", 71, HB), p5("1.2", 80, HB)],
  "mitsubishi-space-star-ii-fl": [p5("1.0", 71, HB), p5("1.2", 80, HB)],

  "mitsubishi-space-wagon-n30": [p5("1.8", 116, MPV), p5("2.0", 133, MPV)],
  "mitsubishi-space-wagon-n40": [petrol("2.4 GDI", 147, "FWD", "4AT", MPV), diesel("2.0 TD", 90, "FWD", "5MT", MPV)],
  "mitsubishi-space-runner-i": [p5("1.8", 122, MPV), diesel("2.0 TD", 82, "FWD", "5MT", MPV)],
  "mitsubishi-space-runner-ii": [p5("1.8 GDI", 122, MPV)],
  "mitsubishi-grandis-mpv": [petrol("2.4", 165, "FWD", "4AT", MPV), diesel("2.0 DI-D", 136, "FWD", "6MT", MPV)],
  "mitsubishi-grandis-suv": [hybrid("1.8 Hybrid", 160, "FWD", "AT", SUV)],
  "mitsubishi-space-gear-l400": [
    petrol("2.4", 132, "4x4", "5MT", VAN),
    diesel("2.5 TD", 99, "4x4", "5MT", VAN),
  ],

  "mitsubishi-asx-ga": [
    p5("1.6", 117, SUV),
    diesel("1.8 DI-D", 116, "FWD", "6MT", SUV),
    diesel("1.8 DI-D", 150, "AWD", "6MT", SUV),
  ],
  "mitsubishi-asx-ga-fl": [
    petrol("2.0", 150, "FWD", "CVT", SUV),
    diesel("1.6 DI-D", 114, "FWD", "6MT", SUV),
  ],
  "mitsubishi-asx-ii": [
    petrol("1.0 T", 91, "FWD", "5MT", SUV),
    petrol("1.3 TCe", 140, "FWD", "6MT", SUV),
    hybrid("1.6 Hybrid", 145, "FWD", "AT", SUV),
  ],

  "mitsubishi-outlander-i": [p5("2.0", 136, SUV), petrol("2.4", 160, "FWD", "4AT", SUV)],
  "mitsubishi-outlander-ii": [
    petrol("2.0", 147, "FWD", "5MT", SUV),
    petrol("2.4", 170, "AWD", "CVT", SUV),
    diesel("2.0 DI-D", 140, "FWD", "6MT", SUV),
  ],
  "mitsubishi-outlander-iii": [
    petrol("2.0", 150, "FWD", "CVT", SUV),
    diesel("2.2 DI-D", 150, "AWD", "6AT", SUV),
  ],
  "mitsubishi-outlander-iii-fl": [
    petrol("2.0", 150, "AWD", "CVT", SUV),
    diesel("2.2 DI-D", 150, "AWD", "6AT", SUV),
  ],
  "mitsubishi-outlander-phev-i": [phev("PHEV", 203, "AWD", "AT", 12, 52, SUV)],
  "mitsubishi-outlander-phev-fl": [phev("PHEV", 224, "AWD", "AT", 13.8, 45, SUV)],
  "mitsubishi-outlander-phev-ii": [phev("2.4 PHEV", 302, "AWD", "AT", 22.7, 86, SUV)],

  "mitsubishi-eclipse-cross-i": [petrol("1.5 T", 163, "FWD", "CVT", SUV)],
  "mitsubishi-eclipse-cross-fl": [
    petrol("1.5 T", 163, "FWD", "CVT", SUV),
    phev("2.4 PHEV", 188, "AWD", "AT", 13.8, 45, SUV),
  ],
  "mitsubishi-eclipse-cross-ev": [bev("87 kWh", 220, "FWD", 87, null, SUV)],

  "mitsubishi-pajero-v20": [
    diesel("2.5 TD", 99, "4x4", "5MT", SUV),
    diesel("2.8 TD", 125, "4x4", "4AT", SUV),
    petrol("3.0 V6", 177, "4x4", "4AT", SUV),
  ],
  "mitsubishi-pajero-v60": [
    diesel("3.2 DI-D", 160, "4x4", "5MT", SUV),
    petrol("3.5", 202, "4x4", "5AT", SUV),
  ],
  "mitsubishi-pajero-v80": [diesel("3.2 DI-D", 170, "4x4", "5AT", SUV)],
  "mitsubishi-pajero-v80-fl": [diesel("3.2 DI-D", 190, "4x4", "5AT", SUV)],

  "mitsubishi-l200-k74": [diesel("2.5 TD", 115, "4x4", "5MT", PU)],
  "mitsubishi-l200-kb": [
    diesel("2.5 DI-D", 136, "4x4", "5MT", PU),
    diesel("2.5 DI-D", 178, "4x4", "5AT", PU),
  ],
  "mitsubishi-l200-kl": [
    diesel("2.4 DI-D", 154, "4x4", "6MT", PU),
    diesel("2.4 DI-D", 181, "4x4", "5AT", PU),
  ],
  "mitsubishi-l200-kl-fl": [diesel("2.4 DI-D", 150, "4x4", "6MT", PU)],

  "mitsubishi-i-miev-i": [bev("i-MiEV", 67, "RWD", 16, null, HB)],
  "mitsubishi-3000gt-z16": [petrol("3.0 TT", 286, "AWD", "6MT", CP)],
};
