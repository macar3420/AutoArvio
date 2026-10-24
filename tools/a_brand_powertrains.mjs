/**
 * Curated European-market powertrains for catalog makes starting with A
 * (Aion, Audi). Source of truth — no heuristic fill for these gens.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
 */
const k = (hp) => Math.round(hp * 0.735);
const petrol = (name, hp, drive, gear, l, std, body) => ({
  name,
  powertrain: "petrol",
  powerHp: hp,
  powerKw: k(hp),
  drivetrain: drive,
  transmissionSummary: gear,
  bodyStyles: body,
  consumptionCombinedL: l,
  consumptionStandard: std,
});
const diesel = (name, hp, drive, gear, l, std, body) => ({
  name,
  powertrain: "diesel",
  powerHp: hp,
  powerKw: k(hp),
  drivetrain: drive,
  transmissionSummary: gear,
  bodyStyles: body,
  consumptionCombinedL: l,
  consumptionStandard: std,
});
const bev = (name, hp, drive, bat, range, rstd, kwh100, body) => ({
  name,
  powertrain: "bev",
  powerHp: hp,
  powerKw: k(hp),
  drivetrain: drive,
  transmissionSummary: "1-speed",
  bodyStyles: body,
  batteryKwh: bat,
  electricRangeKm: range,
  rangeStandard: rstd,
  consumptionCombinedKwh: kwh100,
  consumptionStandard: rstd,
});
const phev = (name, hp, drive, gear, l, std, bat, erange, body) => ({
  name,
  powertrain: "phev",
  powerHp: hp,
  powerKw: k(hp),
  drivetrain: drive,
  transmissionSummary: gear,
  bodyStyles: body,
  consumptionCombinedL: l,
  consumptionStandard: std,
  batteryKwh: bat,
  electricRangeKm: erange,
  rangeStandard: std,
});

const HB = "Hatchback";
const SA = "Sedan, Avant";
const SUV = "SUV";
const CP = "Coupe";
const CB = "Cabriolet";
const LB = "Sportback";
const N = "NEDC";
const W = "WLTP";

/** @type {Record<string, object[]>} */
export const A_BRAND_POWERTRAINS = {
  // ——— Aion (EU/FI EV retail) ———
  "aion-ut-ut": [
    bev("UT Standard", 136, "FWD", 50, 400, W, 14.5, HB),
    bev("UT Long Range", 163, "FWD", 60, 500, W, 14.0, HB),
  ],
  "aion-v-v-1st": [
    bev("V 70 kWh", 204, "FWD", 70, 460, W, 16.5, SUV),
    bev("V 80 kWh", 245, "AWD", 80, 520, W, 17.5, SUV),
  ],
  "aion-v-v-2nd": [
    bev("V RWD", 218, "RWD", 75, 520, W, 15.8, SUV),
    bev("V AWD", 272, "AWD", 75, 500, W, 17.2, SUV),
  ],

  // ——— Audi A1 ———
  "audi-a1-8x": [
    petrol("1.2 TFSI 86", 86, "FWD", "5MT", 5.1, N, HB),
    petrol("1.4 TFSI 122", 122, "FWD", "6MT / S tronic", 5.3, N, HB),
    petrol("1.4 TFSI 185", 185, "FWD", "7DCT", 5.9, N, HB),
    diesel("1.6 TDI 90", 90, "FWD", "5MT", 3.8, N, HB),
    diesel("1.6 TDI 105", 105, "FWD", "5MT / S tronic", 4.0, N, HB),
  ],
  "audi-a1-gb": [
    petrol("25 TFSI 95", 95, "FWD", "5MT / S tronic", 5.5, W, HB),
    petrol("30 TFSI 116", 116, "FWD", "6MT / S tronic", 5.7, W, HB),
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 5.9, W, HB),
    petrol("40 TFSI 207", 207, "FWD", "S tronic", 6.5, W, HB),
  ],

  // ——— Audi A2 ———
  "audi-a2-8z": [
    petrol("1.4 75", 75, "FWD", "5MT", 6.0, N, HB),
    petrol("1.6 FSI 110", 110, "FWD", "5MT", 5.8, N, HB),
    diesel("1.4 TDI 75", 75, "FWD", "5MT", 4.3, N, HB),
    diesel("1.4 TDI 90", 90, "FWD", "5MT", 4.4, N, HB),
  ],

  // ——— Audi A3 ———
  "audi-a3-8l": [
    petrol("1.6 101", 101, "FWD", "5MT", 7.6, N, HB),
    petrol("1.8 T 150", 150, "FWD", "5MT", 8.0, N, HB),
    petrol("1.8 T 180", 180, "FWD / quattro", "5MT / 6MT", 8.2, N, HB),
    diesel("1.9 TDI 90", 90, "FWD", "5MT", 5.0, N, HB),
    diesel("1.9 TDI 110", 110, "FWD", "5MT / 6MT", 5.1, N, HB),
  ],
  "audi-a3-8p": [
    petrol("1.4 TFSI 125", 125, "FWD", "6MT", 5.9, N, HB),
    petrol("1.8 TFSI 160", 160, "FWD", "6MT / S tronic", 6.5, N, HB),
    petrol("2.0 TFSI 200", 200, "FWD / quattro", "6MT / S tronic", 7.2, N, HB),
    diesel("1.9 TDI 105", 105, "FWD", "5MT / 6MT", 4.9, N, HB),
    diesel("2.0 TDI 140", 140, "FWD / quattro", "6MT / S tronic", 5.2, N, HB),
    diesel("2.0 TDI 170", 170, "FWD / quattro", "6MT", 5.5, N, HB),
  ],
  "audi-a3-8v": [
    petrol("1.0 TFSI 115", 115, "FWD", "6MT / S tronic", 4.8, N, HB),
    petrol("1.4 TFSI 150", 150, "FWD", "6MT / S tronic", 5.1, N, HB),
    petrol("2.0 TFSI 190", 190, "FWD / quattro", "6MT / S tronic", 5.8, N, HB),
    diesel("1.6 TDI 110", 110, "FWD", "6MT / S tronic", 3.9, N, HB),
    diesel("2.0 TDI 150", 150, "FWD / quattro", "6MT / S tronic", 4.2, N, HB),
    diesel("2.0 TDI 184", 184, "quattro", "S tronic", 4.8, N, HB),
  ],
  "audi-a3-8y": [
    petrol("30 TFSI 110", 110, "FWD", "6MT / S tronic", 5.5, W, HB),
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 5.8, W, HB),
    petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.4, W, HB),
    diesel("35 TDI 150", 150, "FWD", "S tronic", 4.6, W, HB),
  ],
  "audi-a3-sportback-8p": [
    petrol("1.4 TFSI 125", 125, "FWD", "6MT", 5.9, N, HB),
    petrol("2.0 TFSI 200", 200, "FWD / quattro", "6MT / S tronic", 7.2, N, HB),
    diesel("2.0 TDI 140", 140, "FWD / quattro", "6MT / S tronic", 5.2, N, HB),
  ],
  "audi-a3-sportback-8v": [
    petrol("1.4 TFSI 150", 150, "FWD", "6MT / S tronic", 5.1, N, HB),
    petrol("2.0 TFSI 190", 190, "FWD / quattro", "S tronic", 5.8, N, HB),
    diesel("2.0 TDI 150", 150, "FWD / quattro", "6MT / S tronic", 4.2, N, HB),
  ],
  "audi-a3-sportback-8y": [
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 5.8, W, HB),
    petrol("40 TFSI 190", 190, "quattro", "S tronic", 6.5, W, HB),
    diesel("35 TDI 150", 150, "FWD", "S tronic", 4.7, W, HB),
  ],
  "audi-a3-e-tron-8v-e-tron": [
    phev("A3 Sportback e-tron", 204, "FWD", "S tronic", 1.7, N, 8.8, 50, HB),
  ],
  "audi-a3-tfsi-e-8y-tfsi-e": [
    phev("40 TFSI e", 204, "FWD", "S tronic", 1.0, W, 13, 63, HB),
    phev("45 TFSI e", 245, "FWD", "S tronic", 1.1, W, 13, 62, HB),
  ],

  // ——— Audi A4 ———
  "audi-a4-b5": [
    petrol("1.6 101", 101, "FWD", "5MT", 8.0, N, SA),
    petrol("1.8 T 150", 150, "FWD / quattro", "5MT", 8.5, N, SA),
    petrol("2.8 V6 193", 193, "FWD / quattro", "5MT / 5AT", 10.0, N, SA),
    diesel("1.9 TDI 90", 90, "FWD", "5MT", 5.3, N, SA),
    diesel("1.9 TDI 110", 110, "FWD / quattro", "5MT / 6MT", 5.4, N, SA),
  ],
  "audi-a4-b6": [
    petrol("1.8 T 150", 150, "FWD / quattro", "5MT / CVT", 8.2, N, SA),
    petrol("1.8 T 190", 190, "FWD / quattro", "6MT", 8.6, N, SA),
    petrol("3.0 V6 220", 220, "FWD / quattro", "CVT / 5AT", 9.5, N, SA),
    diesel("1.9 TDI 130", 130, "FWD", "5MT / 6MT", 5.5, N, SA),
    diesel("2.5 TDI 163", 163, "FWD / quattro", "6MT / CVT", 6.8, N, SA),
  ],
  "audi-a4-b7": [
    petrol("1.8 T 163", 163, "FWD / quattro", "6MT / Multitronic", 8.0, N, SA),
    petrol("2.0 TFSI 200", 200, "FWD / quattro", "6MT / Multitronic", 7.8, N, SA),
    petrol("3.2 FSI 255", 255, "FWD / quattro", "6MT / Multitronic", 9.5, N, SA),
    diesel("2.0 TDI 140", 140, "FWD", "6MT / Multitronic", 5.7, N, SA),
    diesel("2.0 TDI 170", 170, "FWD / quattro", "6MT", 5.9, N, SA),
    diesel("3.0 TDI 204", 204, "quattro", "6MT / Multitronic", 6.8, N, SA),
  ],
  "audi-a4-b8": [
    {
      id: "audi-a4-b8-18-tfsi-160",
      name: "1.8 TFSI 160",
      powertrain: "petrol",
      powerHp: 160,
      powerKw: 118,
      drivetrain: "FWD",
      transmissionSummary: "6MT / Multitronic",
      bodyStyles: SA,
      consumptionCombinedL: 6.6,
      consumptionStandard: N,
    },
    {
      id: "audi-a4-b8-20-tfsi-211",
      name: "2.0 TFSI 211",
      powertrain: "petrol",
      powerHp: 211,
      powerKw: 155,
      drivetrain: "FWD / quattro",
      transmissionSummary: "6MT / S tronic",
      bodyStyles: SA,
      consumptionCombinedL: 6.9,
      consumptionStandard: N,
    },
    {
      id: "audi-a4-b8-20-tdi-143",
      name: "2.0 TDI 143",
      powertrain: "diesel",
      powerHp: 143,
      powerKw: 105,
      drivetrain: "FWD",
      transmissionSummary: "6MT / S tronic / Multitronic",
      bodyStyles: SA,
      consumptionCombinedL: 4.8,
      consumptionStandard: N,
    },
    {
      id: "audi-a4-b8-20-tdi-177",
      name: "2.0 TDI 177",
      powertrain: "diesel",
      powerHp: 177,
      powerKw: 130,
      drivetrain: "FWD / quattro",
      transmissionSummary: "6MT / S tronic",
      bodyStyles: SA,
      consumptionCombinedL: 5.1,
      consumptionStandard: N,
    },
    {
      id: "audi-a4-b8-30-tdi-240",
      name: "3.0 TDI 240",
      powertrain: "diesel",
      powerHp: 240,
      powerKw: 176,
      drivetrain: "quattro",
      transmissionSummary: "7DCT / 8AT",
      bodyStyles: SA,
      consumptionCombinedL: 6.2,
      consumptionStandard: N,
    },
  ],
  "audi-a4-b9": [
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 6.2, W, SA),
    petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.6, W, SA),
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 7.2, W, SA),
    diesel("35 TDI 163", 163, "FWD", "S tronic", 4.8, W, SA),
    diesel("40 TDI 190", 190, "FWD / quattro", "S tronic", 5.0, W, SA),
    diesel("45 TDI 231", 231, "quattro", "S tronic", 5.5, W, SA),
  ],

  // ——— A4 allroad ———
  "audi-a4-allroad-b6-b7": [
    petrol("2.0 TFSI 200", 200, "quattro", "6MT / Multitronic", 8.5, N, SUV),
    diesel("2.0 TDI 140", 140, "quattro", "6MT", 6.5, N, SUV),
    diesel("2.5 TDI 163", 163, "quattro", "6MT / Multitronic", 7.2, N, SUV),
  ],
  "audi-a4-allroad-b8": [
    petrol("2.0 TFSI 211", 211, "quattro", "S tronic", 7.2, N, SUV),
    diesel("2.0 TDI 177", 177, "quattro", "S tronic", 5.7, N, SUV),
    diesel("3.0 TDI 245", 245, "quattro", "S tronic", 6.4, N, SUV),
  ],
  "audi-a4-allroad-b9": [
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 7.8, W, SUV),
    diesel("40 TDI 190", 190, "quattro", "S tronic", 5.8, W, SUV),
    diesel("45 TDI 231", 231, "quattro", "S tronic", 6.2, W, SUV),
  ],

  // ——— A5 ———
  "audi-a5-8t": [
    petrol("1.8 TFSI 160", 160, "FWD", "6MT / Multitronic", 6.8, N, CP),
    petrol("2.0 TFSI 211", 211, "FWD / quattro", "6MT / S tronic", 7.0, N, CP),
    petrol("3.2 FSI 265", 265, "quattro", "6MT / S tronic", 9.0, N, CP),
    diesel("2.0 TDI 170", 170, "FWD / quattro", "6MT / S tronic", 5.2, N, CP),
    diesel("3.0 TDI 240", 240, "quattro", "S tronic", 6.0, N, CP),
  ],
  "audi-a5-f5": [
    petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.5, W, CP),
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 7.1, W, CP),
    diesel("40 TDI 190", 190, "FWD / quattro", "S tronic", 5.0, W, CP),
    diesel("45 TDI 231", 231, "quattro", "S tronic", 5.4, W, CP),
  ],
  "audi-a5-sportback-8ta": [
    petrol("2.0 TFSI 211", 211, "FWD / quattro", "6MT / S tronic", 7.0, N, LB),
    diesel("2.0 TDI 170", 170, "FWD / quattro", "6MT / S tronic", 5.2, N, LB),
    diesel("3.0 TDI 240", 240, "quattro", "S tronic", 6.0, N, LB),
  ],
  "audi-a5-sportback-f5": [
    petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.5, W, LB),
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 7.1, W, LB),
    diesel("40 TDI 190", 190, "quattro", "S tronic", 5.0, W, LB),
  ],

  // ——— A6 ———
  "audi-a6-c4": [
    petrol("2.0 115", 115, "FWD", "5MT", 8.5, N, SA),
    petrol("2.6 V6 150", 150, "FWD / quattro", "5MT / 4AT", 9.5, N, SA),
    petrol("2.8 V6 174", 174, "FWD / quattro", "5MT / 4AT", 10.0, N, SA),
    diesel("2.5 TDI 140", 140, "FWD / quattro", "5MT / 4AT", 6.9, N, SA),
  ],
  "audi-a6-c5": [
    petrol("1.8 T 150", 150, "FWD / quattro", "5MT / CVT", 8.5, N, SA),
    petrol("2.4 V6 170", 170, "FWD / quattro", "5MT / CVT", 9.5, N, SA),
    petrol("2.7 T 230", 230, "quattro", "6MT / 5AT", 11.0, N, SA),
    diesel("1.9 TDI 110", 110, "FWD", "5MT / 6MT", 5.7, N, SA),
    diesel("2.5 TDI 155", 155, "FWD / quattro", "6MT / CVT", 7.0, N, SA),
  ],
  "audi-a6-c6": [
    petrol("2.0 TFSI 170", 170, "FWD", "6MT / Multitronic", 7.5, N, SA),
    petrol("2.8 FSI 210", 210, "FWD / quattro", "Multitronic / 6AT", 8.5, N, SA),
    petrol("3.0 TFSI 290", 290, "quattro", "S tronic", 9.2, N, SA),
    diesel("2.0 TDI 140", 140, "FWD", "6MT / Multitronic", 5.9, N, SA),
    diesel("2.7 TDI 180", 180, "FWD / quattro", "Multitronic / 6AT", 6.8, N, SA),
    diesel("3.0 TDI 233", 233, "quattro", "6AT", 7.5, N, SA),
  ],
  "audi-a6-c7": [
    petrol("2.0 TFSI 180", 180, "FWD", "S tronic / Multitronic", 6.0, N, SA),
    petrol("2.0 TFSI 252", 252, "quattro", "S tronic", 6.6, N, SA),
    petrol("3.0 TFSI 333", 333, "quattro", "S tronic", 7.8, N, SA),
    diesel("2.0 TDI 177", 177, "FWD", "S tronic / Multitronic", 4.6, N, SA),
    diesel("3.0 TDI 204", 204, "quattro", "S tronic", 5.2, N, SA),
    diesel("3.0 TDI 272", 272, "quattro", "S tronic", 5.9, N, SA),
  ],
  "audi-a6-c8": [
    petrol("45 TFSI 245", 245, "FWD / quattro", "S tronic", 7.2, W, SA),
    petrol("55 TFSI 340", 340, "quattro", "S tronic", 8.0, W, SA),
    diesel("40 TDI 204", 204, "FWD / quattro", "S tronic", 5.2, W, SA),
    diesel("50 TDI 286", 286, "quattro", "S tronic", 6.0, W, SA),
  ],
  "audi-a6-allroad-c5": [
    petrol("2.7 T 250", 250, "quattro", "6MT / 5AT", 11.5, N, SUV),
    diesel("2.5 TDI 180", 180, "quattro", "6MT / 5AT", 7.8, N, SUV),
  ],
  "audi-a6-allroad-c6": [
    petrol("3.0 TFSI 290", 290, "quattro", "S tronic", 9.5, N, SUV),
    diesel("2.7 TDI 180", 180, "quattro", "6AT", 7.2, N, SUV),
    diesel("3.0 TDI 240", 240, "quattro", "6AT", 7.8, N, SUV),
  ],
  "audi-a6-allroad-c7": [
    petrol("3.0 TFSI 310", 310, "quattro", "S tronic", 8.2, N, SUV),
    diesel("3.0 TDI 218", 218, "quattro", "S tronic", 5.8, N, SUV),
    diesel("3.0 TDI 272", 272, "quattro", "S tronic", 6.2, N, SUV),
  ],
  "audi-a6-allroad-c8": [
    petrol("55 TFSI 340", 340, "quattro", "S tronic", 8.5, W, SUV),
    diesel("45 TDI 231", 231, "quattro", "S tronic", 6.2, W, SUV),
    diesel("50 TDI 286", 286, "quattro", "S tronic", 6.8, W, SUV),
  ],
  "audi-a6-e-tron-c8-e-tron": [
    bev("A6 e-tron Performance", 367, "RWD", 83, 630, W, 14.5, SA),
    bev("A6 e-tron quattro", 462, "AWD", 94, 680, W, 15.5, SA),
  ],
  "audi-a6-tfsi-e-c8-tfsi-e": [
    phev("50 TFSI e", 299, "quattro", "S tronic", 1.9, W, 14.4, 51, SA),
    phev("55 TFSI e", 367, "quattro", "S tronic", 2.1, W, 14.4, 49, SA),
  ],

  // ——— A7 ———
  "audi-a7-4g": [
    petrol("2.8 FSI 204", 204, "FWD / quattro", "S tronic / Multitronic", 7.5, N, LB),
    petrol("3.0 TFSI 300", 300, "quattro", "S tronic", 8.0, N, LB),
    diesel("3.0 TDI 204", 204, "quattro", "S tronic", 5.5, N, LB),
    diesel("3.0 TDI 245", 245, "quattro", "S tronic", 6.0, N, LB),
  ],
  "audi-a7-4k": [
    petrol("45 TFSI 245", 245, "FWD / quattro", "S tronic", 7.4, W, LB),
    petrol("55 TFSI 340", 340, "quattro", "S tronic", 8.2, W, LB),
    diesel("40 TDI 204", 204, "quattro", "S tronic", 5.4, W, LB),
    diesel("50 TDI 286", 286, "quattro", "S tronic", 6.2, W, LB),
  ],
  "audi-a7-tfsi-e-4k-tfsi-e": [
    phev("55 TFSI e", 367, "quattro", "S tronic", 2.1, W, 14.1, 49, LB),
  ],

  // ——— A8 ———
  "audi-a8-d2": [
    petrol("2.8 V6 193", 193, "FWD / quattro", "5AT", 10.5, N, "Sedan"),
    petrol("3.7 V8 230", 230, "quattro", "5AT", 12.0, N, "Sedan"),
    petrol("4.2 V8 300", 300, "quattro", "5AT", 12.8, N, "Sedan"),
    diesel("2.5 TDI 150", 150, "FWD / quattro", "5MT / 5AT", 7.5, N, "Sedan"),
  ],
  "audi-a8-d3": [
    petrol("3.0 V6 220", 220, "FWD / quattro", "6AT / Multitronic", 9.8, N, "Sedan"),
    petrol("4.2 V8 335", 335, "quattro", "6AT", 11.5, N, "Sedan"),
    diesel("3.0 TDI 233", 233, "quattro", "6AT", 7.8, N, "Sedan"),
    diesel("4.0 TDI 275", 275, "quattro", "6AT", 9.0, N, "Sedan"),
  ],
  "audi-a8-d4": [
    petrol("3.0 TFSI 290", 290, "quattro", "8AT", 8.5, N, "Sedan"),
    petrol("4.2 FSI 372", 372, "quattro", "8AT", 10.0, N, "Sedan"),
    diesel("3.0 TDI 250", 250, "quattro", "8AT", 6.5, N, "Sedan"),
    diesel("4.2 TDI 350", 350, "quattro", "8AT", 7.8, N, "Sedan"),
  ],
  "audi-a8-d5": [
    petrol("50 TFSI 340", 340, "quattro", "8AT", 9.0, W, "Sedan"),
    petrol("55 TFSI 340", 340, "quattro", "8AT", 8.8, W, "Sedan"),
    petrol("60 TFSI e", 449, "quattro", "8AT", 2.8, W, "Sedan"),
    diesel("50 TDI 286", 286, "quattro", "8AT", 6.5, W, "Sedan"),
  ],

  // ——— Cabriolet / Coupe classics ———
  "audi-cabriolet-typ-8g": [
    petrol("2.0 115", 115, "FWD", "5MT", 8.5, N, CB),
    petrol("2.3 133", 133, "FWD", "5MT / 4AT", 9.0, N, CB),
    petrol("2.6 V6 150", 150, "FWD", "5MT / 4AT", 9.8, N, CB),
    petrol("2.8 V6 174", 174, "FWD", "5MT / 4AT", 10.2, N, CB),
  ],
  "audi-coupe-b2": [
    petrol("1.8 90", 90, "FWD / quattro", "5MT", 8.5, N, CP),
    petrol("2.0 115", 115, "FWD / quattro", "5MT", 9.0, N, CP),
    petrol("2.2 136", 136, "quattro", "5MT", 9.5, N, CP),
  ],
  "audi-coupe-b3": [
    petrol("2.0 116", 116, "FWD", "5MT", 8.8, N, CP),
    petrol("2.3 136", 136, "FWD / quattro", "5MT", 9.2, N, CP),
    petrol("2.8 V6 174", 174, "FWD / quattro", "5MT / 4AT", 10.0, N, CP),
  ],

  // ——— e-tron family ———
  "audi-e-tron-gen1": [
    bev("e-tron 50", 313, "AWD", 71, 340, W, 22.4, SUV),
    bev("e-tron 55", 408, "AWD", 95, 436, W, 22.0, SUV),
    bev("e-tron S", 503, "AWD", 95, 370, W, 25.0, SUV),
  ],
  "audi-e-tron-gt-fw": [
    bev("e-tron GT quattro", 476, "AWD", 85, 488, W, 19.5, LB),
    bev("e-tron GT 590", 590, "AWD", 85, 472, W, 20.5, LB),
  ],
  "audi-rs-e-tron-gt-fw": [
    bev("RS e-tron GT", 598, "AWD", 85, 472, W, 21.0, LB),
  ],
  "audi-q4-e-tron-f4": [
    bev("Q4 35 e-tron", 170, "RWD", 52, 341, W, 17.0, SUV),
    bev("Q4 40 e-tron", 204, "RWD", 77, 520, W, 16.5, SUV),
    bev("Q4 50 e-tron quattro", 299, "AWD", 77, 488, W, 17.8, SUV),
  ],
  "audi-q8-e-tron-ge": [
    bev("Q8 50 e-tron", 340, "AWD", 89, 491, W, 20.5, SUV),
    bev("Q8 55 e-tron", 408, "AWD", 106, 582, W, 20.0, SUV),
    bev("SQ8 e-tron", 503, "AWD", 106, 513, W, 22.5, SUV),
  ],
  "audi-a6-e-tron-c8-e-tron": [
    bev("A6 e-tron Performance", 367, "RWD", 83, 630, W, 14.5, SA),
    bev("A6 e-tron quattro", 462, "AWD", 94, 680, W, 15.5, SA),
  ],

  // ——— Q2 / Q3 ———
  "audi-q2-ga": [
    petrol("30 TFSI 116", 116, "FWD", "6MT / S tronic", 5.8, W, SUV),
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 6.0, W, SUV),
    petrol("40 TFSI 190", 190, "quattro", "S tronic", 6.8, W, SUV),
    diesel("30 TDI 116", 116, "FWD", "6MT / S tronic", 4.6, W, SUV),
    diesel("35 TDI 150", 150, "FWD / quattro", "S tronic", 4.9, W, SUV),
  ],
  "audi-q3-8u": [
    petrol("1.4 TFSI 150", 150, "FWD", "6MT / S tronic", 6.0, N, SUV),
    petrol("2.0 TFSI 180", 180, "quattro", "7DCT", 7.0, N, SUV),
    petrol("2.0 TFSI 220", 220, "quattro", "7DCT", 7.3, N, SUV),
    diesel("2.0 TDI 140", 140, "FWD / quattro", "6MT / S tronic", 5.2, N, SUV),
    diesel("2.0 TDI 177", 177, "quattro", "7DCT", 5.5, N, SUV),
  ],
  "audi-q3-f3": [
    petrol("35 TFSI 150", 150, "FWD", "6MT / S tronic", 6.5, W, SUV),
    petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 7.0, W, SUV),
    petrol("45 TFSI 230", 230, "quattro", "S tronic", 7.5, W, SUV),
    diesel("35 TDI 150", 150, "FWD / quattro", "S tronic", 5.2, W, SUV),
  ],
  "audi-q3-tfsi-e-f3-tfsi-e": [
    phev("45 TFSI e", 245, "quattro", "S tronic", 1.7, W, 13, 50, SUV),
  ],

  // ——— Q5 ———
  "audi-q5-8r": [
    petrol("2.0 TFSI 180", 180, "quattro", "6MT / S tronic", 7.5, N, SUV),
    petrol("2.0 TFSI 211", 211, "quattro", "7DCT", 7.8, N, SUV),
    petrol("3.2 FSI 270", 270, "quattro", "7DCT", 9.0, N, SUV),
    diesel("2.0 TDI 143", 143, "quattro", "6MT / S tronic", 5.7, N, SUV),
    diesel("2.0 TDI 170", 170, "quattro", "7DCT", 5.9, N, SUV),
    diesel("3.0 TDI 240", 240, "quattro", "7DCT", 6.8, N, SUV),
  ],
  "audi-q5-fy": [
    petrol("40 TFSI 190", 190, "quattro", "S tronic", 7.5, W, SUV),
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 8.0, W, SUV),
    diesel("40 TDI 190", 190, "quattro", "S tronic", 5.8, W, SUV),
    diesel("50 TDI 286", 286, "quattro", "S tronic", 6.5, W, SUV),
  ],
  "audi-q5-sportback-fy": [
    petrol("45 TFSI 245", 245, "quattro", "S tronic", 8.1, W, SUV),
    diesel("40 TDI 190", 190, "quattro", "S tronic", 5.9, W, SUV),
  ],
  "audi-q5-tfsi-e-fy-tfsi-e": [
    phev("50 TFSI e", 299, "quattro", "S tronic", 2.1, W, 14.1, 56, SUV),
    phev("55 TFSI e", 367, "quattro", "S tronic", 2.4, W, 17.9, 59, SUV),
  ],

  // ——— Q7 / Q8 ———
  "audi-q7-4l": [
    petrol("3.6 FSI 280", 280, "quattro", "6AT", 12.0, N, SUV),
    petrol("4.2 FSI 350", 350, "quattro", "6AT", 12.8, N, SUV),
    diesel("3.0 TDI 233", 233, "quattro", "6AT", 8.5, N, SUV),
    diesel("4.2 TDI 326", 326, "quattro", "6AT", 10.0, N, SUV),
  ],
  "audi-q7-4m": [
    petrol("45 TFSI 265", 265, "quattro", "8AT", 9.0, W, SUV),
    petrol("55 TFSI 340", 340, "quattro", "8AT", 9.5, W, SUV),
    diesel("45 TDI 231", 231, "quattro", "8AT", 6.8, W, SUV),
    diesel("50 TDI 286", 286, "quattro", "8AT", 7.2, W, SUV),
  ],
  "audi-q7-tfsi-e-4m-tfsi-e": [
    phev("55 TFSI e", 381, "quattro", "8AT", 2.8, W, 17.9, 56, SUV),
    phev("60 TFSI e", 456, "quattro", "8AT", 2.9, W, 17.9, 55, SUV),
  ],
  "audi-q8-4m": [
    petrol("45 TFSI 265", 265, "quattro", "8AT", 9.2, W, SUV),
    petrol("55 TFSI 340", 340, "quattro", "8AT", 9.8, W, SUV),
    diesel("45 TDI 231", 231, "quattro", "8AT", 7.0, W, SUV),
    diesel("50 TDI 286", 286, "quattro", "8AT", 7.5, W, SUV),
  ],
  "audi-q8-tfsi-e-4m-tfsi-e": [
    phev("55 TFSI e", 381, "quattro", "8AT", 2.9, W, 17.9, 47, SUV),
    phev("60 TFSI e", 456, "quattro", "8AT", 3.0, W, 17.9, 46, SUV),
  ],

  // ——— Quattro / R8 / V8 ———
  "audi-quattro-ur-quattro": [
    petrol("2.1 10v Turbo", 200, "quattro", "5MT", 11.0, N, CP),
    petrol("2.2 20v Turbo", 220, "quattro", "5MT", 11.5, N, CP),
  ],
  "audi-r8-typ-42": [
    petrol("4.2 V8 FSI", 420, "quattro", "6MT / R tronic", 14.0, N, CP),
    petrol("5.2 V10 FSI", 525, "quattro", "6MT / R tronic", 14.8, N, CP),
    petrol("5.2 V10 plus", 550, "quattro", "R tronic", 15.0, N, CP),
  ],
  "audi-r8-4s": [
    petrol("5.2 V10 FSI", 540, "quattro", "7DCT", 13.0, W, CP),
    petrol("5.2 V10 performance", 620, "quattro", "7DCT", 13.5, W, CP),
  ],
  "audi-v8-d11": [
    petrol("3.6 V8", 250, "quattro", "5MT / 4AT", 12.0, N, "Sedan"),
    petrol("4.2 V8", 280, "quattro", "4AT", 12.5, N, "Sedan"),
  ],

  // ——— S / RS / SQ / TTS ———
  "audi-s2-s2": [petrol("2.2 20v Turbo", 220, "quattro", "5MT / 6MT", 10.5, N, "Coupe / Avant")],
  "audi-s3-8l": [petrol("1.8 T 210", 210, "quattro", "6MT", 9.0, N, HB)],
  "audi-s3-8p": [petrol("2.0 TFSI 265", 265, "quattro", "6MT / S tronic", 8.5, N, HB)],
  "audi-s3-8v": [petrol("2.0 TFSI 300", 300, "quattro", "S tronic", 7.0, N, HB), petrol("2.0 TFSI 310", 310, "quattro", "S tronic", 7.1, N, HB)],
  "audi-s3-8y": [petrol("2.0 TFSI 310", 310, "quattro", "S tronic", 8.1, W, HB)],
  "audi-s4-b5": [petrol("2.7 V6 Biturbo", 265, "quattro", "6MT / 5AT", 11.5, N, SA)],
  "audi-s4-b6-b7": [petrol("4.2 V8", 344, "quattro", "6MT / 6AT", 13.0, N, SA)],
  "audi-s4-b8": [petrol("3.0 TFSI", 333, "quattro", "7DCT", 9.5, N, SA)],
  "audi-s4-b9": [petrol("3.0 TFSI", 354, "quattro", "8AT", 8.8, W, SA)],
  "audi-s5-8t": [petrol("4.2 V8 FSI", 354, "quattro", "6MT / S tronic", 12.0, N, CP), petrol("3.0 TFSI", 333, "quattro", "7DCT", 9.5, N, CP)],
  "audi-s5-f5": [petrol("3.0 TFSI", 354, "quattro", "8AT", 8.5, W, CP)],
  "audi-s6-c4": [petrol("2.2 20v Turbo", 230, "quattro", "5MT / 4AT", 11.0, N, SA), petrol("4.2 V8", 290, "quattro", "5MT / 4AT", 12.5, N, SA)],
  "audi-s6-c5": [petrol("4.2 V8", 340, "quattro", "6MT / 5AT", 13.0, N, SA)],
  "audi-s6-c6": [petrol("5.2 V10", 435, "quattro", "6AT", 13.5, N, SA)],
  "audi-s6-c7": [petrol("4.0 TFSI", 420, "quattro", "7DCT", 9.5, N, SA)],
  "audi-s6-c8": [diesel("TDI 349", 349, "quattro", "8AT", 7.5, W, SA)],
  "audi-s7-4g": [petrol("4.0 TFSI", 420, "quattro", "7DCT", 9.5, N, LB)],
  "audi-s7-4k": [diesel("TDI 349", 349, "quattro", "8AT", 7.6, W, LB)],
  "audi-s8-d2": [petrol("4.2 V8", 340, "quattro", "5AT", 13.5, N, "Sedan")],
  "audi-s8-d3": [petrol("5.2 V10", 450, "quattro", "6AT", 14.0, N, "Sedan")],
  "audi-s8-d4": [petrol("4.0 TFSI", 520, "quattro", "8AT", 10.5, N, "Sedan")],
  "audi-s8-d5": [petrol("4.0 TFSI", 571, "quattro", "8AT", 11.0, W, "Sedan")],
  "audi-sq2-ga": [petrol("2.0 TFSI 300", 300, "quattro", "S tronic", 7.5, W, SUV)],
  "audi-sq5-8r": [diesel("3.0 TDI", 313, "quattro", "8AT", 6.8, N, SUV)],
  "audi-sq5-fy": [petrol("3.0 TFSI", 354, "quattro", "8AT", 9.0, W, SUV)],
  "audi-sq5-sportback-fy": [petrol("3.0 TFSI", 354, "quattro", "8AT", 9.1, W, SUV)],
  "audi-sq7-4m": [diesel("4.0 TDI", 435, "quattro", "8AT", 8.0, W, SUV), petrol("4.0 TFSI", 507, "quattro", "8AT", 12.0, W, SUV)],
  "audi-sq8-4m": [diesel("4.0 TDI", 435, "quattro", "8AT", 8.2, W, SUV), petrol("4.0 TFSI", 507, "quattro", "8AT", 12.2, W, SUV)],

  "audi-rs3-8p": [petrol("2.5 TFSI", 340, "quattro", "7DCT", 10.0, N, HB)],
  "audi-rs3-8v": [petrol("2.5 TFSI", 367, "quattro", "7DCT", 8.5, N, HB), petrol("2.5 TFSI 400", 400, "quattro", "7DCT", 8.6, N, HB)],
  "audi-rs3-8y": [petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.0, W, HB)],
  "audi-rs4-b5": [petrol("2.7 V6 Biturbo", 380, "quattro", "6MT", 12.5, N, SA)],
  "audi-rs4-b7": [petrol("4.2 V8 FSI", 420, "quattro", "6MT", 13.5, N, SA)],
  "audi-rs4-b8": [petrol("4.2 V8 FSI", 450, "quattro", "7DCT", 11.0, N, SA)],
  "audi-rs4-b9": [petrol("2.9 TFSI", 450, "quattro", "8AT", 9.5, W, SA)],
  "audi-rs5-8t": [petrol("4.2 V8 FSI", 450, "quattro", "7DCT", 11.0, N, CP)],
  "audi-rs5-f5": [petrol("2.9 TFSI", 450, "quattro", "8AT", 9.5, W, CP)],
  "audi-rs6-c5": [petrol("4.2 V8 Biturbo", 450, "quattro", "5AT", 14.5, N, SA)],
  "audi-rs6-c6": [petrol("5.0 V10 Biturbo", 580, "quattro", "6AT", 14.0, N, SA)],
  "audi-rs6-c7": [petrol("4.0 TFSI", 560, "quattro", "8AT", 10.0, N, SA)],
  "audi-rs6-c8": [petrol("4.0 TFSI", 600, "quattro", "8AT", 12.0, W, SA)],
  "audi-rs7-4g": [petrol("4.0 TFSI", 560, "quattro", "8AT", 10.0, N, LB)],
  "audi-rs7-4k": [petrol("4.0 TFSI", 600, "quattro", "8AT", 12.2, W, LB)],
  "audi-rs-q3-8u": [petrol("2.5 TFSI", 310, "quattro", "7DCT", 8.8, N, SUV)],
  "audi-rs-q3-f3": [petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.5, W, SUV)],
  "audi-rs-q8-4m": [petrol("4.0 TFSI", 600, "quattro", "8AT", 13.5, W, SUV)],

  // ——— TT ———
  "audi-tt-8n": [
    petrol("1.8 T 150", 150, "FWD", "5MT / 6MT", 8.0, N, CP),
    petrol("1.8 T 180", 180, "FWD / quattro", "5MT / 6MT", 8.3, N, CP),
    petrol("1.8 T 225", 225, "quattro", "6MT", 8.8, N, CP),
    petrol("3.2 VR6 250", 250, "quattro", "6MT / DSG", 10.0, N, CP),
  ],
  "audi-tt-8j": [
    petrol("1.8 TFSI 160", 160, "FWD", "6MT / S tronic", 6.5, N, CP),
    petrol("2.0 TFSI 200", 200, "FWD / quattro", "6MT / S tronic", 7.0, N, CP),
    petrol("3.2 VR6 250", 250, "quattro", "6MT / S tronic", 9.5, N, CP),
    diesel("2.0 TDI 170", 170, "FWD / quattro", "6MT", 5.5, N, CP),
  ],
  "audi-tt-8s": [
    petrol("1.8 TFSI 180", 180, "FWD", "6MT / S tronic", 6.0, N, CP),
    petrol("2.0 TFSI 230", 230, "FWD / quattro", "6MT / S tronic", 6.5, N, CP),
    diesel("2.0 TDI 184", 184, "FWD / quattro", "6MT / S tronic", 5.0, N, CP),
  ],
  "audi-tts-8j": [petrol("2.0 TFSI 272", 272, "quattro", "6MT / S tronic", 8.0, N, CP)],
  "audi-tts-8s": [petrol("2.0 TFSI 310", 310, "quattro", "6MT / S tronic", 7.5, W, CP)],
  "audi-tt-rs-8j": [petrol("2.5 TFSI", 340, "quattro", "6MT / S tronic", 9.5, N, CP)],
  "audi-tt-rs-8s": [petrol("2.5 TFSI", 400, "quattro", "7DCT", 8.5, W, CP)],
};

/** Makes covered by this curated letter pack. */
export const A_BRAND_MAKE_IDS = ["aion", "audi"];
