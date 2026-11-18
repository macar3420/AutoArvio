/**
 * European Nissan engines. No US Altima, Frontier, or Murano Z52 rows.
 * Qashqai e-POWER consumption is the 4.3 l/100 km figure on nissan.fi.
 * Ariya uses the European usable packs (63 and 87 kWh), not the US horsepower ratings.
 * New Micra EV follows the European 40 and 52 kWh cars. Leaf ZE2 uses the
 * Finnish 52 and 75 kWh choice, and the 622 km WLTP figure on the larger pack.
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
const hybrid = (name, hp, drive, gear, body, l) => row("hybrid", name, hp, drive, gear, body, l);
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
const MPV = "MPV";
const SUV = "SUV";
const CP = "Coupe";
const PU = "Pickup";
const VAN = "Van";

const p5 = (name, hp, body) => petrol(name, hp, "FWD", "5MT", body);

export const NISSAN_MAKE_IDS = ["nissan"];

export const NISSAN_POWERTRAINS = {
  "nissan-micra-k11": [p5("1.0", 54, HB), p5("1.3", 75, HB)],
  "nissan-micra-k11-fl": [p5("1.0", 60, HB), p5("1.4", 82, HB)],
  "nissan-micra-k12": [p5("1.2", 65, HB), p5("1.2", 80, HB), p5("1.4", 88, HB), diesel("1.5 dCi", 82, "FWD", "5MT", HB)],
  "nissan-micra-k13": [p5("1.2", 80, HB), petrol("1.2 DIG-S", 98, "FWD", "CVT", HB)],
  "nissan-micra-k14": [p5("0.9 IG-T", 90, HB), p5("1.0", 71, HB)],
  "nissan-micra-ev": [bev("40 kWh", 120, "FWD", 40, null, HB), bev("52 kWh", 150, "FWD", 52, null, HB)],

  "nissan-almera-n15": [p5("1.4", 87, HB), p5("1.6", 99, HB), diesel("2.0 D", 75, "FWD", "5MT", HB)],
  "nissan-almera-n16": [p5("1.5", 90, HB), p5("1.8", 114, HB), diesel("1.5 dCi", 82, "FWD", "5MT", HB)],
  "nissan-almera-tino-v10": [p5("1.8", 114, MPV), petrol("2.0", 136, "FWD", "CVT", MPV), diesel("2.2 dCi", 112, "FWD", "6MT", MPV)],

  "nissan-primera-p10": [p5("1.6", 102, SW), p5("2.0", 115, SW), petrol("2.0", 150, "FWD", "5MT", SW), diesel("2.0 D", 75, "FWD", "5MT", SW)],
  "nissan-primera-p11": [p5("1.6", 99, SW), p5("1.8", 114, SW), petrol("2.0", 140, "FWD", "5MT / CVT", SW), diesel("2.0 TD", 90, "FWD", "5MT", SW)],
  "nissan-primera-p12": [p5("1.6", 109, SW), p5("1.8", 116, SW), petrol("2.0", 140, "FWD", "6MT", SW), diesel("2.2 dCi", 126, "FWD", "6MT", SW)],

  "nissan-sunny-n14": [p5("1.4", 75, SW), p5("1.6", 90, SW), diesel("2.0 D", 75, "FWD", "5MT", SW)],
  "nissan-bluebird-t72": [p5("1.6", 84, SW), p5("2.0", 115, SW), diesel("2.0 D", 67, "FWD", "5MT", SW)],

  "nissan-qashqai-j10": [p5("1.6", 115, SUV), petrol("2.0", 140, "FWD", "6MT", SUV), diesel("1.5 dCi", 106, "FWD", "6MT", SUV), diesel("2.0 dCi", 150, "AWD", "6MT", SUV)],
  "nissan-qashqai-j10-fl": [p5("1.6", 117, SUV), petrol("2.0", 140, "FWD", "CVT", SUV), diesel("1.5 dCi", 110, "FWD", "6MT", SUV), diesel("1.6 dCi", 130, "FWD", "6MT", SUV)],
  "nissan-qashqai-j11": [petrol("1.2 DIG-T", 115, "FWD", "6MT", SUV), petrol("1.6 DIG-T", 163, "FWD", "6MT", SUV), diesel("1.5 dCi", 110, "FWD", "6MT", SUV), diesel("1.6 dCi", 130, "AWD", "6MT", SUV)],
  "nissan-qashqai-j11-fl": [petrol("1.3 DIG-T", 140, "FWD", "6MT", SUV), petrol("1.3 DIG-T", 160, "FWD", "CVT", SUV), diesel("1.5 dCi", 115, "FWD", "6MT", SUV)],
  "nissan-qashqai-j12": [
    hybrid("1.3 mild hybrid", 140, "FWD", "6MT", SUV, null),
    hybrid("1.3 mild hybrid", 158, "FWD", "CVT", SUV, null),
    hybrid("e-POWER", 190, "FWD", "AT", SUV, 4.3),
  ],

  "nissan-juke-f15": [p5("1.6", 117, SUV), petrol("1.6 DIG-T", 190, "FWD", "6MT", SUV), diesel("1.5 dCi", 110, "FWD", "6MT", SUV)],
  "nissan-juke-f15-fl": [p5("1.6", 117, SUV), petrol("1.6 DIG-T", 190, "FWD", "6MT", SUV), diesel("1.5 dCi", 110, "FWD", "6MT", SUV)],
  "nissan-juke-f16": [petrol("1.0 DIG-T", 114, "FWD", "6MT", SUV), hybrid("Hybrid", 143, "FWD", "AT", SUV, null)],

  "nissan-x-trail-t30": [p5("2.0", 140, SUV), petrol("2.5", 165, "AWD", "4AT", SUV), diesel("2.2 dCi", 114, "AWD", "6MT", SUV), diesel("2.2 dCi", 136, "AWD", "6MT", SUV)],
  "nissan-x-trail-t31": [petrol("2.0", 141, "FWD", "6MT", SUV), petrol("2.5", 169, "AWD", "CVT", SUV), diesel("2.0 dCi", 150, "AWD", "6MT", SUV)],
  "nissan-x-trail-t32": [petrol("1.6 DIG-T", 163, "FWD", "CVT", SUV), diesel("1.6 dCi", 130, "FWD", "6MT", SUV), diesel("2.0 dCi", 177, "AWD", "CVT", SUV)],
  "nissan-x-trail-t33": [
    hybrid("1.5 mild hybrid", 163, "FWD", "CVT", SUV, null),
    hybrid("e-POWER", 204, "FWD", "AT", SUV, null),
    hybrid("e-POWER e-4ORCE", 213, "AWD", "AT", SUV, null),
  ],

  "nissan-leaf-ze0": [bev("24 kWh", 109, "FWD", 24, null, HB)],
  "nissan-leaf-ze1": [bev("40 kWh", 150, "FWD", 40, 270, HB)],
  "nissan-leaf-ze1-e": [bev("62 kWh", 217, "FWD", 62, 385, HB)],
  "nissan-leaf-ze2": [bev("52 kWh", 177, "FWD", 52, null, HB), bev("75 kWh", 217, "FWD", 75, 622, HB)],

  "nissan-ariya-i": [
    bev("63 kWh", 218, "FWD", 63, null, SUV),
    bev("87 kWh", 242, "FWD", 87, null, SUV),
    bev("87 kWh e-4ORCE", 306, "AWD", 87, null, SUV),
  ],

  "nissan-note-e11": [p5("1.4", 88, MPV), p5("1.6", 110, MPV), diesel("1.5 dCi", 86, "FWD", "5MT", MPV)],
  "nissan-note-e12": [petrol("1.2", 80, "FWD", "CVT", MPV), petrol("1.2 DIG-S", 98, "FWD", "CVT", MPV)],
  "nissan-pulsar-c13": [petrol("1.2 DIG-T", 115, "FWD", "6MT", HB), petrol("1.6 DIG-T", 190, "FWD", "6MT", HB), diesel("1.5 dCi", 110, "FWD", "6MT", HB)],

  "nissan-100nx-b13": [p5("1.6", 90, CP), p5("1.6", 102, CP), petrol("2.0", 143, "FWD", "5MT", CP)],
  "nissan-200sx-s13": [petrol("1.8 T", 169, "RWD", "5MT", CP)],
  "nissan-200sx-s14": [petrol("2.0 T", 200, "RWD", "5MT", CP)],
  "nissan-300zx-z32": [petrol("3.0 TT", 280, "RWD", "5MT", CP)],
  "nissan-350z-z33": [petrol("3.5", 280, "RWD", "6MT", CP), petrol("3.5", 300, "RWD", "6MT", CP)],
  "nissan-370z-z34": [petrol("3.7", 328, "RWD", "6MT", CP), petrol("3.7", 328, "RWD", "7AT", CP)],
  "nissan-gt-r-r35": [petrol("3.8 TT", 485, "AWD", "6DCT", CP)],
  "nissan-gt-r-r35-fl": [petrol("3.8 TT", 570, "AWD", "6DCT", CP)],

  "nissan-murano-z50": [petrol("3.5", 234, "AWD", "CVT", SUV)],
  "nissan-murano-z51": [petrol("3.5", 256, "FWD", "CVT", SUV), diesel("2.5 dCi", 190, "AWD", "6AT", SUV)],

  "nissan-navara-d22": [diesel("2.5 TD", 133, "4x4", "5MT", PU)],
  "nissan-navara-d40": [diesel("2.5 dCi", 174, "4x4", "6MT", PU), diesel("2.5 dCi", 190, "4x4", "5AT", PU)],
  "nissan-navara-d23": [diesel("2.3 dCi", 160, "4x4", "6MT", PU), diesel("2.3 dCi", 190, "4x4", "7AT", PU)],

  "nissan-pathfinder-r51": [diesel("2.5 dCi", 171, "4x4", "6MT", SUV), diesel("2.5 dCi", 190, "4x4", "5AT", SUV)],
  "nissan-patrol-y61": [diesel("3.0 Di", 158, "4x4", "5MT", SUV), diesel("3.0 Di", 158, "4x4", "4AT", SUV)],
  "nissan-terrano-r20": [p5("2.4", 116, SUV), diesel("2.7 TD", 125, "4x4", "5MT", SUV)],
  "nissan-maxima-a32": [petrol("2.0", 140, "FWD", "5MT", "Sedan"), petrol("3.0 V6", 193, "FWD", "4AT", "Sedan")],

  "nissan-kubistar-x76": [p5("1.2", 60, VAN), diesel("1.5 dCi", 65, "FWD", "5MT", VAN), diesel("1.5 dCi", 82, "FWD", "5MT", VAN)],
  "nissan-primastar-x83": [diesel("1.9 dCi", 100, "FWD", "6MT", VAN), diesel("2.0 dCi", 114, "FWD", "6MT", VAN), diesel("2.5 dCi", 145, "FWD", "6MT", VAN)],
  "nissan-primastar-ii": [diesel("2.0 dCi", 130, "FWD", "6MT", VAN), diesel("2.0 dCi", 150, "FWD", "6MT", VAN)],
  "nissan-nv200-m20": [p5("1.6", 110, VAN), diesel("1.5 dCi", 90, "FWD", "5MT", VAN)],
  "nissan-nv200-e-nv200": [bev("24 kWh", 109, "FWD", 24, null, VAN), bev("40 kWh", 109, "FWD", 40, null, VAN)],
};
