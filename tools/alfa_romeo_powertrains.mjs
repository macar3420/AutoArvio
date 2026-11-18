/**
 * European Alfa Romeo engines for the Finnish Nettiauto model list.
 * One row per engine × gearbox. Figures are brochure PS and combined consumption.
 * Quadrifoglio, Tonale Plug-in, and Junior Elettrica are versions, not models.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
 */
const k = (hp) => Math.round(hp * 0.735);
const N = "NEDC";
const W = "WLTP";

function base(powertrain, name, hp, drive, gear, body) {
  return {
    name,
    powertrain,
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
}

function withFuel(row, l, std) {
  if (l == null) return row;
  return { ...row, consumptionCombinedL: l, consumptionStandard: std };
}

const petrol = (name, hp, drive, gear, body, l, std) =>
  withFuel(base("petrol", name, hp, drive, gear, body), l, std);
const diesel = (name, hp, drive, gear, body, l, std) =>
  withFuel(base("diesel", name, hp, drive, gear, body), l, std);
const hybrid = (name, hp, drive, gear, body, l, std) =>
  withFuel(base("hybrid", name, hp, drive, gear, body), l, std);

function bev(name, hp, drive, bat, range, kwh100, body) {
  return {
    ...base("bev", name, hp, drive, "1-speed", body),
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: W,
    consumptionCombinedKwh: kwh100,
    consumptionStandard: W,
  };
}

function phev(name, hp, drive, gear, l, bat, erange, kwh100, body) {
  return {
    ...withFuel(base("phev", name, hp, drive, gear, body), l, W),
    batteryKwh: bat,
    electricRangeKm: erange,
    rangeStandard: W,
    consumptionCombinedKwh: kwh100,
  };
}

const gears = (fn, name, hp, drive, box, body, l, std) =>
  box.map((gear) => fn(name, hp, drive, gear, body, l, std));

const HB = "Hatchback";
const HB5 = "Hatchback";
const SED = "Sedan";
const SW = "Sedan, Sportwagon";
const WAG = "Hatchback, Sportwagon";
const CPE = "Coupe";
const SPD = "Spider";
const SUV = "SUV";

/** @type {Record<string, object[]>} */
export const ALFA_POWERTRAINS = {
  // ——— 33 ———
  "alfaromeo-33-905": [
    petrol("1.3", 79, "FWD", "5MT", WAG),
    petrol("1.3 S", 86, "FWD", "5MT", WAG),
    petrol("1.5", 95, "FWD", "5MT", WAG),
    petrol("1.5 QV", 105, "FWD", "5MT", HB5),
    petrol("1.5 4x4", 95, "4x4", "5MT", WAG),
  ],
  "alfaromeo-33-905-fl": [
    petrol("1.3", 79, "FWD", "5MT", WAG),
    petrol("1.3 S", 86, "FWD", "5MT", WAG),
    petrol("1.5", 105, "FWD", "5MT", WAG),
    petrol("1.5 4x4", 105, "4x4", "5MT", WAG),
    petrol("1.7 QV", 118, "FWD", "5MT", HB5),
    petrol("1.7 IE", 110, "FWD", "5MT", HB5),
    diesel("1.8 TD", 72, "FWD", "5MT", WAG),
  ],
  "alfaromeo-33-907": [
    petrol("1.3 IE", 90, "FWD", "5MT", WAG),
    petrol("1.5 IE", 105, "FWD", "5MT", WAG),
    petrol("1.7 IE", 110, "FWD", "5MT", WAG),
    petrol("1.7 16V", 137, "FWD", "5MT", HB5),
    petrol("1.7 16V Q4", 137, "Q4", "5MT", HB5),
    diesel("1.8 TD", 84, "FWD", "5MT", WAG),
  ],

  // ——— 75 ———
  "alfaromeo-75-162": [
    petrol("1.6", 110, "RWD", "5MT", SED),
    petrol("1.8", 122, "RWD", "5MT", SED),
    petrol("2.0", 128, "RWD", "5MT", SED),
    petrol("2.0 Twin Spark", 148, "RWD", "5MT", SED),
    petrol("2.5 V6", 156, "RWD", "5MT", SED),
    petrol("3.0 V6", 188, "RWD", "5MT", SED),
    diesel("2.0 TD", 95, "RWD", "5MT", SED),
    diesel("2.4 TD", 112, "RWD", "5MT", SED),
  ],

  // ——— 146 ———
  "alfaromeo-146-930": [
    petrol("1.4", 90, "FWD", "5MT", HB, 7.6, N),
    petrol("1.6", 103, "FWD", "5MT", HB, 8.0, N),
    petrol("1.7 16V", 129, "FWD", "5MT", HB, 8.4, N),
    diesel("1.9 TD", 90, "FWD", "5MT", HB, 6.4, N),
  ],
  "alfaromeo-146-930-fl": [
    petrol("1.4 TS", 103, "FWD", "5MT", HB, 7.5, N),
    petrol("1.6 TS", 120, "FWD", "5MT", HB, 8.1, N),
    petrol("1.8 TS", 140, "FWD", "5MT", HB, 8.4, N),
    petrol("2.0 TS", 155, "FWD", "5MT", HB, 8.7, N),
    diesel("1.9 JTD", 105, "FWD", "5MT", HB, 5.6, N),
  ],

  // ——— 147 ———
  "alfaromeo-147-937": [
    ...gears(petrol, "1.6 TS", 105, "FWD", ["5MT"], HB, 8.2, N),
    ...gears(petrol, "2.0 TS", 150, "FWD", ["5MT", "Selespeed"], HB, 8.7, N),
    ...gears(diesel, "1.9 JTD", 115, "FWD", ["5MT"], HB, 5.7, N),
    ...gears(petrol, "GTA 3.2", 250, "FWD", ["6MT", "Selespeed"], HB, 12.1, N),
  ],
  "alfaromeo-147-937-fl": [
    petrol("1.6 TS", 120, "FWD", "5MT", HB, 8.0, N),
    ...gears(petrol, "2.0 TS", 150, "FWD", ["5MT", "Selespeed"], HB, 8.6, N),
    diesel("1.9 JTDm", 120, "FWD", "6MT", HB, 5.5, N),
    diesel("1.9 JTDm", 150, "FWD", "6MT", HB, 5.8, N),
  ],

  // ——— 155 ———
  "alfaromeo-155-167": [
    petrol("1.8 TS", 126, "FWD", "5MT", SED, 8.5, N),
    petrol("2.0 TS", 143, "FWD", "5MT", SED, 8.8, N),
    petrol("2.5 V6", 166, "FWD", "5MT", SED, 10.4, N),
    diesel("2.5 TD", 125, "FWD", "5MT", SED, 7.2, N),
  ],
  "alfaromeo-155-167-fl": [
    petrol("1.8 TS", 140, "FWD", "5MT", SED, 8.6, N),
    petrol("2.0 TS", 150, "FWD", "5MT", SED, 8.8, N),
    petrol("2.0 Turbo Q4", 186, "Q4", "5MT", SED, 9.6, N),
    diesel("2.5 TD", 125, "FWD", "5MT", SED, 7.1, N),
  ],

  // ——— 156 ———
  "alfaromeo-156-932": [
    petrol("1.6 TS", 120, "FWD", "5MT", SW, 8.4, N),
    petrol("1.8 TS", 144, "FWD", "5MT", SW, 8.6, N),
    ...gears(petrol, "2.0 TS", 155, "FWD", ["5MT", "Selespeed"], SW, 8.8, N),
    ...gears(petrol, "2.0 JTS", 165, "FWD", ["5MT", "Selespeed"], SW, 8.6, N),
    petrol("2.5 V6", 192, "FWD", "6MT", SW, 11.2, N),
    petrol("2.5 V6", 192, "FWD", "Q-System", SW, 11.6, N),
    diesel("1.9 JTD", 115, "FWD", "5MT", SW, 5.7, N),
    diesel("2.4 JTD", 136, "FWD", "5MT", SW, 6.6, N),
    diesel("1.9 JTDm", 140, "FWD", "6MT", SW, 5.8, N),
    ...gears(petrol, "GTA 3.2", 250, "FWD", ["6MT", "Selespeed"], SW, 12.1, N),
  ],
  "alfaromeo-156-932-fl": [
    petrol("1.6 TS", 120, "FWD", "5MT", SW, 8.3, N),
    petrol("1.8 TS", 140, "FWD", "5MT", SW, 8.5, N),
    ...gears(petrol, "2.0 JTS", 165, "FWD", ["5MT", "Selespeed"], SW, 8.6, N),
    petrol("2.5 V6", 192, "FWD", "6MT", SW, 11.1, N),
    petrol("2.5 V6", 192, "FWD", "Q-System", SW, 11.5, N),
    diesel("1.9 JTD", 115, "FWD", "5MT", SW, 5.6, N),
    diesel("1.9 JTDm", 140, "FWD", "6MT", SW, 5.8, N),
    diesel("1.9 JTDm", 150, "FWD", "6MT", SW, 5.9, N),
    diesel("1.9 JTDm Q4", 150, "Q4", "6MT", "Sportwagon", 6.3, N),
    diesel("2.4 JTDm", 175, "FWD", "6MT", SW, 6.6, N),
  ],

  // ——— 159 ———
  "alfaromeo-159-939": [
    petrol("1.9 JTS", 160, "FWD", "6MT", SW, 8.7, N),
    ...gears(petrol, "2.2 JTS", 185, "FWD", ["6MT", "Selespeed"], SW, 9.4, N),
    ...gears(petrol, "3.2 V6 JTS", 260, "Q4", ["6MT", "Q-Tronic"], SW, 11.5, N),
    diesel("1.9 JTDm", 120, "FWD", "6MT", SW, 5.9, N),
    ...gears(diesel, "1.9 JTDm", 150, "FWD", ["6MT", "Q-Tronic"], SW, 5.9, N),
    ...gears(diesel, "2.4 JTDm", 200, "FWD", ["6MT", "Q-Tronic"], SW, 6.8, N),
    diesel("2.4 JTDm", 210, "Q4", "6MT", SW, 7.1, N),
  ],
  "alfaromeo-159-939-fl": [
    petrol("1.8", 140, "FWD", "6MT", SW, 7.7, N),
    petrol("1750 TBI", 200, "FWD", "6MT", SW, 8.1, N),
    ...gears(petrol, "3.2 V6 JTS", 260, "Q4", ["6MT", "Q-Tronic"], SW, 11.4, N),
    diesel("1.9 JTDm", 120, "FWD", "6MT", SW, 5.4, N),
    ...gears(diesel, "1.9 JTDm", 150, "FWD", ["6MT", "Q-Tronic"], SW, 5.7, N),
    ...gears(diesel, "2.0 JTDm", 170, "FWD", ["6MT", "Q-Tronic"], SW, 5.4, N),
    ...gears(diesel, "2.4 JTDm", 210, "Q4", ["6MT", "Q-Tronic"], SW, 6.9, N),
  ],

  // ——— 164 ———
  "alfaromeo-164-164": [
    petrol("2.0 TS", 148, "FWD", "5MT", SED),
    petrol("3.0 V6", 192, "FWD", "5MT", SED),
    diesel("2.5 TD", 117, "FWD", "5MT", SED),
  ],
  "alfaromeo-164-super": [
    petrol("2.0 TS", 146, "FWD", "5MT", SED, 9.2, N),
    petrol("2.0 V6 Turbo", 205, "FWD", "5MT", SED, 9.8, N),
    petrol("3.0 V6 24v", 211, "FWD", "6MT", SED, 10.6, N),
    petrol("3.0 V6 24v Q4", 231, "Q4", "6MT", SED, 11.4, N),
    diesel("2.5 TD", 125, "FWD", "5MT", SED, 7.6, N),
  ],

  // ——— 166 ———
  "alfaromeo-166-936": [
    petrol("2.0 TS", 150, "FWD", "5MT", SED, 9.4, N),
    petrol("2.5 V6", 190, "FWD", "6MT", SED, 11.2, N),
    petrol("3.0 V6", 226, "FWD", "6MT", SED, 12.0, N),
    petrol("3.0 V6", 226, "FWD", "Sportronic", SED, 12.4, N),
    diesel("2.4 JTD", 136, "FWD", "5MT", SED, 7.0, N),
    diesel("2.4 JTD", 150, "FWD", "5MT", SED, 6.9, N),
  ],
  "alfaromeo-166-936-fl": [
    petrol("2.0 TS", 150, "FWD", "6MT", SED, 9.2, N),
    petrol("2.5 V6", 188, "FWD", "6MT", SED, 11.0, N),
    petrol("3.0 V6", 220, "FWD", "Sportronic", SED, 12.1, N),
    petrol("3.2 V6", 240, "FWD", "6MT", SED, 12.0, N),
    diesel("2.4 JTDm", 175, "FWD", "6MT", SED, 6.9, N),
    diesel("2.4 JTDm", 175, "FWD", "5AT", SED, 7.5, N),
  ],

  // ——— Alfetta ———
  "alfaromeo-alfetta-116": [
    petrol("1.8", 122, "RWD", "5MT", SED),
    petrol("2.0", 130, "RWD", "5MT", SED),
    diesel("2.4 TD", 95, "RWD", "5MT", SED),
  ],

  // ——— Brera ———
  "alfaromeo-brera-939": [
    ...gears(petrol, "2.2 JTS", 185, "FWD", ["6MT", "Selespeed"], CPE, 9.4, N),
    ...gears(petrol, "3.2 V6 JTS", 260, "Q4", ["6MT", "Q-Tronic"], CPE, 11.5, N),
    ...gears(diesel, "2.4 JTDm", 200, "FWD", ["6MT", "Q-Tronic"], CPE, 6.8, N),
    diesel("2.4 JTDm", 210, "Q4", "6MT", CPE, 7.1, N),
  ],
  "alfaromeo-brera-939-fl": [
    petrol("1750 TBI", 200, "FWD", "6MT", CPE, 8.1, N),
    ...gears(petrol, "3.2 V6 JTS", 260, "Q4", ["6MT", "Q-Tronic"], CPE, 11.4, N),
    ...gears(diesel, "2.0 JTDm", 170, "FWD", ["6MT", "Q-Tronic"], CPE, 5.4, N),
    diesel("2.4 JTDm", 210, "Q4", "6MT", CPE, 6.9, N),
  ],

  // ——— Giulia ———
  "alfaromeo-giulia-105": [
    petrol("1300", 82, "RWD", "5MT", SED),
    petrol("1600 TI", 92, "RWD", "5MT", SED),
    petrol("Super 1.6", 98, "RWD", "5MT", SED),
    petrol("Nuova Super 1.6", 102, "RWD", "5MT", SED),
  ],
  "alfaromeo-giulia-952": [
    ...gears(petrol, "2.0 Turbo", 200, "RWD", ["6MT", "8AT"], SED, 6.4, N),
    petrol("2.0 Turbo", 280, "Q4", "8AT", SED, 7.0, N),
    ...gears(diesel, "2.2 Diesel", 150, "RWD", ["6MT", "8AT"], SED, 4.2, N),
    ...gears(diesel, "2.2 Diesel", 180, "RWD", ["6MT", "8AT"], SED, 4.5, N),
    diesel("2.2 Diesel", 180, "Q4", "8AT", SED, 4.7, N),
    diesel("2.2 Diesel", 210, "Q4", "8AT", SED, 4.9, N),
    ...gears(petrol, "Quadrifoglio", 510, "RWD", ["6MT", "8AT"], SED, 8.5, N),
  ],
  "alfaromeo-giulia-952-fl": [
    petrol("2.0 Turbo", 200, "RWD", "8AT", SED, 7.1, W),
    petrol("2.0 Turbo", 280, "Q4", "8AT", SED, 8.1, W),
    diesel("2.2 Diesel", 160, "RWD", "8AT", SED, 5.5, W),
    diesel("2.2 Diesel", 190, "Q4", "8AT", SED, 5.9, W),
    diesel("2.2 Diesel", 210, "Q4", "8AT", SED, 5.8, W),
    petrol("Quadrifoglio", 510, "RWD", "8AT", SED, 9.8, W),
    petrol("Quadrifoglio", 520, "RWD", "8AT", SED, 10.2, W),
  ],

  // ——— Giulietta ———
  "alfaromeo-giulietta-750": [
    petrol("Berlina 1.3", 53, "RWD", "4MT", "Berlina"),
    petrol("Sprint 1.3", 65, "RWD", "4MT", "Sprint"),
    petrol("Spider 1.3", 65, "RWD", "4MT", "Spider"),
  ],
  "alfaromeo-giulietta-101": [
    petrol("Berlina 1.3", 62, "RWD", "4MT", "Berlina"),
    petrol("TI 1.3", 74, "RWD", "4MT", "Berlina"),
    petrol("Sprint 1.3", 80, "RWD", "4MT", "Sprint"),
    petrol("Spider 1.3", 80, "RWD", "4MT", "Spider"),
  ],
  "alfaromeo-giulietta-116": [
    petrol("1.6", 109, "RWD", "5MT", SED),
    petrol("1.8", 122, "RWD", "5MT", SED),
    petrol("2.0", 130, "RWD", "5MT", SED),
    diesel("2.0 TD", 82, "RWD", "5MT", SED),
  ],
  "alfaromeo-giulietta-940": [
    petrol("1.4 TB", 105, "FWD", "6MT", HB, 6.4, N),
    petrol("1.4 TB", 120, "FWD", "6MT", HB, 5.8, N),
    ...gears(petrol, "1.4 MultiAir", 170, "FWD", ["6MT", "TCT"], HB, 6.0, N),
    petrol("1750 TBI", 235, "FWD", "6MT", HB, 7.6, N),
    diesel("1.6 JTDm", 105, "FWD", "6MT", HB, 4.4, N),
    diesel("2.0 JTDm", 140, "FWD", "6MT", HB, 4.5, N),
    diesel("2.0 JTDm", 170, "FWD", "6MT", HB, 4.7, N),
  ],
  "alfaromeo-giulietta-940-fl": [
    petrol("1.4 TB", 120, "FWD", "6MT", HB, 5.9, N),
    ...gears(petrol, "1.4 MultiAir", 150, "FWD", ["6MT", "TCT"], HB, 5.6, N),
    petrol("1750 TBI", 240, "FWD", "6MT", HB, 6.8, N),
    diesel("1.6 JTDm", 120, "FWD", "6MT", HB, 4.2, N),
    ...gears(diesel, "2.0 JTDm", 150, "FWD", ["6MT", "TCT"], HB, 4.2, N),
    diesel("2.0 JTDm", 175, "FWD", "6MT", HB, 4.7, N),
  ],

  // ——— GT ———
  "alfaromeo-gt-937": [
    petrol("1.8 TS", 140, "FWD", "5MT", CPE, 8.5, N),
    ...gears(petrol, "2.0 JTS", 165, "FWD", ["5MT", "Selespeed"], CPE, 8.7, N),
    ...gears(petrol, "3.2 V6", 240, "FWD", ["6MT", "Selespeed"], CPE, 12.4, N),
    diesel("1.9 JTDm", 150, "FWD", "6MT", CPE, 6.1, N),
  ],

  // ——— GTV ———
  "alfaromeo-gtv-105": [
    petrol("1600 GTV", 109, "RWD", "5MT", CPE),
    petrol("1750 GTV", 118, "RWD", "5MT", CPE),
    petrol("2000 GTV", 132, "RWD", "5MT", CPE),
  ],
  "alfaromeo-gtv-116": [
    petrol("GTV 2.0", 130, "RWD", "5MT", CPE),
    petrol("GTV6 2.5", 160, "RWD", "5MT", CPE),
  ],
  "alfaromeo-gtv-916": [
    petrol("2.0 TS", 150, "FWD", "5MT", CPE, 8.9, N),
    petrol("2.0 V6 Turbo", 202, "FWD", "5MT", CPE, 9.8, N),
    petrol("3.0 V6 24v", 220, "FWD", "6MT", CPE, 11.2, N),
  ],
  "alfaromeo-gtv-916-fl": [
    petrol("2.0 JTS", 165, "FWD", "5MT", CPE, 8.7, N),
    petrol("3.2 V6", 240, "FWD", "6MT", CPE, 11.7, N),
  ],

  // ——— Junior (Finland 2025–: Ibrida, Ibrida Q4, Elettrica, Elettrica Veloce) ———
  "alfaromeo-junior-1st": [
    hybrid("Ibrida", 136, "FWD", "6 eDCT", SUV, 4.9, W),
    hybrid("Ibrida Q4", 136, "Q4", "6 eDCT", SUV, 5.3, W),
    bev("Elettrica", 156, "FWD", 51, 410, 15.2, SUV),
    bev("Elettrica Veloce", 280, "FWD", 51, 315, 17.9, SUV),
  ],

  // ——— MiTo ———
  "alfaromeo-mito-955": [
    petrol("1.4", 78, "FWD", "5MT", HB, 6.0, N),
    petrol("1.4 16V", 95, "FWD", "6MT", HB, 6.2, N),
    petrol("1.4 TB", 155, "FWD", "6MT", HB, 6.5, N),
    petrol("1.4 MultiAir", 135, "FWD", "6MT", HB, 5.6, N),
    ...gears(petrol, "1.4 MultiAir QV", 170, "FWD", ["6MT", "TCT"], HB, 6.0, N),
    petrol("0.9 TwinAir", 85, "FWD", "6MT", HB, 4.2, N),
    diesel("1.3 JTDm", 85, "FWD", "5MT", HB, 4.0, N),
    diesel("1.6 JTDm", 120, "FWD", "6MT", HB, 4.3, N),
  ],
  "alfaromeo-mito-955-fl": [
    petrol("1.4", 78, "FWD", "5MT", HB, 6.0, N),
    petrol("0.9 TwinAir", 105, "FWD", "6MT", HB, 4.2, N),
    petrol("1.4 MultiAir", 140, "FWD", "6MT", HB, 5.6, N),
    ...gears(petrol, "1.4 MultiAir", 170, "FWD", ["6MT", "TCT"], HB, 6.0, N),
    diesel("1.3 JTDm", 95, "FWD", "5MT", HB, 3.8, N),
  ],

  // ——— Spider ———
  "alfaromeo-spider-105-s1": [petrol("1600 Duetto", 109, "RWD", "5MT", SPD)],
  "alfaromeo-spider-105-s2": [
    petrol("1300 Junior", 89, "RWD", "5MT", SPD),
    petrol("1600", 109, "RWD", "5MT", SPD),
    petrol("1750", 118, "RWD", "5MT", SPD),
    petrol("2000", 128, "RWD", "5MT", SPD),
  ],
  "alfaromeo-spider-115-s3": [
    petrol("1.6", 104, "RWD", "5MT", SPD),
    petrol("2.0", 128, "RWD", "5MT", SPD),
  ],
  "alfaromeo-spider-115-s4": [
    petrol("1.6", 109, "RWD", "5MT", SPD),
    petrol("2.0", 126, "RWD", "5MT", SPD),
  ],
  "alfaromeo-spider-916": [
    petrol("2.0 TS", 150, "FWD", "5MT", SPD, 9.2, N),
    petrol("3.0 V6 12v", 192, "FWD", "5MT", SPD, 11.0, N),
    petrol("3.0 V6 24v", 218, "FWD", "6MT", SPD, 11.2, N),
  ],
  "alfaromeo-spider-916-fl": [
    petrol("2.0 JTS", 165, "FWD", "5MT", SPD, 8.8, N),
    petrol("3.2 V6", 240, "FWD", "6MT", SPD, 11.8, N),
  ],
  "alfaromeo-spider-939": [
    ...gears(petrol, "2.2 JTS", 185, "FWD", ["6MT", "Selespeed"], SPD, 9.5, N),
    ...gears(petrol, "3.2 V6 JTS", 260, "Q4", ["6MT", "Q-Tronic"], SPD, 11.6, N),
    ...gears(diesel, "2.4 JTDm", 200, "FWD", ["6MT", "Q-Tronic"], SPD, 6.9, N),
  ],
  "alfaromeo-spider-939-fl": [
    petrol("1750 TBI", 200, "FWD", "6MT", SPD, 8.2, N),
    petrol("3.2 V6 JTS", 260, "Q4", "6MT", SPD, 11.5, N),
    diesel("2.0 JTDm", 170, "FWD", "6MT", SPD, 5.5, N),
  ],

  // ——— Sprint ———
  "alfaromeo-sprint-902": [
    petrol("1.3", 86, "FWD", "5MT", CPE),
    petrol("1.5", 95, "FWD", "5MT", CPE),
    petrol("1.5 QV", 105, "FWD", "5MT", CPE),
  ],
  "alfaromeo-sprint-902-fl": [
    petrol("1.3", 86, "FWD", "5MT", CPE),
    petrol("1.5", 105, "FWD", "5MT", CPE),
    petrol("1.7 QV", 118, "FWD", "5MT", CPE),
  ],

  // ——— Stelvio ———
  "alfaromeo-stelvio-949": [
    petrol("2.0 Turbo", 200, "Q4", "8AT", SUV, 7.0, N),
    petrol("2.0 Turbo", 280, "Q4", "8AT", SUV, 7.4, N),
    diesel("2.2 Diesel", 180, "Q4", "8AT", SUV, 4.8, N),
    diesel("2.2 Diesel", 210, "Q4", "8AT", SUV, 5.2, N),
    petrol("Quadrifoglio", 510, "Q4", "8AT", SUV, 9.0, N),
  ],
  "alfaromeo-stelvio-949-fl": [
    petrol("2.0 Turbo", 200, "Q4", "8AT", SUV, 8.4, W),
    petrol("2.0 Turbo", 280, "Q4", "8AT", SUV, 8.9, W),
    diesel("2.2 Diesel", 160, "RWD", "8AT", SUV, 6.2, W),
    diesel("2.2 Diesel", 190, "Q4", "8AT", SUV, 6.4, W),
    diesel("2.2 Diesel", 210, "Q4", "8AT", SUV, 6.6, W),
    petrol("Quadrifoglio", 510, "Q4", "8AT", SUV, 10.6, W),
    petrol("Quadrifoglio", 520, "Q4", "8AT", SUV, 10.9, W),
  ],

  // ——— Tonale ———
  "alfaromeo-tonale-965": [
    hybrid("1.5 Hybrid", 130, "FWD", "7DCT", SUV, 5.7, W),
    hybrid("1.5 Hybrid", 160, "FWD", "7DCT", SUV, 5.6, W),
    diesel("1.6 Diesel", 130, "FWD", "6DCT", SUV, 5.3, W),
    phev("PHEV 280 Q4", 280, "Q4", "6AT", 1.4, 12, 61, 18.7, SUV),
  ],
  "alfaromeo-tonale-965-fl": [
    hybrid("1.5 Hybrid", 175, "FWD", "7DCT", SUV, 5.6, W),
    diesel("1.6 Diesel", 130, "FWD", "6DCT", SUV, 5.2, W),
    phev("PHEV 270 Q4", 270, "Q4", "6AT", 1.3, 12, 62, 18.5, SUV),
  ],
};

export const ALFA_MAKE_IDS = ["alfaromeo"];
