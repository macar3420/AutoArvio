/**
 * Mercedes-Benz powertrains for the cars commonly sold in Finland.
 * Current rows follow the Veho price list of 5.11.2026. The stored litre,
 * electric range, and kWh/100 are the best combined WLTP figures on that list.
 * Where that list prints engine and motor separately (120+17 kW), the stored
 * power is the engine figure, not a summed system output.
 * Older rows are the European engines, without a consumption figure.
 * Plug-in and AMG badges are versions on the chassis. Battery kWh is stored
 * only when the list prints a net capacity.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
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

const petrol = (name, hp, drive, gear, body, kw) => fuel("petrol", name, hp, drive, gear, body, null, kw);
const petrolL = (name, hp, drive, gear, body, l, kw) => fuel("petrol", name, hp, drive, gear, body, l, kw);
const diesel = (name, hp, drive, gear, body, kw) => fuel("diesel", name, hp, drive, gear, body, null, kw);
const hybrid = (name, hp, drive, gear, body, l, kw) => fuel("hybrid", name, hp, drive, gear, body, l, kw);

function phev(name, hp, drive, gear, body, erange, l, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, l, kw);
  if (erange != null) {
    row.electricRangeKm = erange;
    row.rangeStandard = W;
  }
  return row;
}

function bev(name, hp, drive, bat, range, kwh100, body, kw) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
  };
  if (bat != null) row.batteryKwh = bat;
  if (range != null) {
    row.electricRangeKm = range;
    row.rangeStandard = W;
  }
  if (kwh100 != null) {
    row.consumptionCombinedKwh = kwh100;
    row.consumptionStandard = W;
  }
  return row;
}

const HB = "Hatchback";
const SW = "Sedan, Wagon";
const SED = "Sedan";
const SUV = "SUV";
const MPV = "MPV";
const CC = "Coupe, Convertible";
const CONV = "Convertible";
const COUPE = "Coupe";
const VAN = "Van";
const PICKUP = "Pickup";

const F = "FWD";
const R = "RWD";
const A = "AWD";

export const MERCEDES_POWERTRAINS = {
  "mercedes-a-class-w168": [
    petrol("A 140", 82, F, "5MT", HB),
    petrol("A 160", 102, F, "5MT", HB),
    diesel("A 170 CDI", 90, F, "5MT", HB),
  ],
  "mercedes-a-class-w169": [
    petrol("A 150", 95, F, "5MT", HB),
    petrol("A 150", 95, F, "CVT", HB),
    petrol("A 180", 116, F, "5MT", HB),
    petrol("A 180", 116, F, "CVT", HB),
    diesel("A 180 CDI", 109, F, "5MT", HB),
  ],
  "mercedes-a-class-w176": [
    petrol("A 180", 122, F, "6MT", HB),
    petrol("A 180", 122, F, "7DCT", HB),
    petrol("A 200", 156, F, "7DCT", HB),
    diesel("A 180 CDI", 109, F, "6MT", HB),
    diesel("A 180 CDI", 109, F, "7DCT", HB),
    petrol("AMG A 45", 381, A, "7DCT", HB),
  ],
  "mercedes-a-class-w177": [
    petrol("A 180", 136, F, "7DCT", HB),
    petrol("A 200", 163, F, "7DCT", HB),
    diesel("A 180 d", 116, F, "7DCT", HB),
    phev("A 250 e", 218, F, "8DCT", HB, null, null, 160),
    petrol("AMG A 35", 306, A, "7DCT", HB),
    petrol("AMG A 45 S", 421, A, "8DCT", HB),
  ],
  "mercedes-a-class-w177-fl": [
    hybrid("A 180", 136, F, "7DCT", HB, 5.8, 100),
    phev("A 250 e", 163, F, "8DCT", HB, 82, 2.3, 120),
  ],

  "mercedes-b-class-t245": [
    petrol("B 180", 116, F, "6MT", MPV),
    petrol("B 200", 136, F, "CVT", MPV),
    diesel("B 180 CDI", 109, F, "6MT", MPV),
  ],
  "mercedes-b-class-w246": [
    petrol("B 180", 122, F, "6MT", MPV),
    petrol("B 180", 122, F, "7DCT", MPV),
    petrol("B 200", 156, F, "7DCT", MPV),
    diesel("B 180 CDI", 109, F, "6MT", MPV),
  ],
  "mercedes-b-class-w247": [
    petrol("B 180", 136, F, "7DCT", MPV),
    petrol("B 200", 163, F, "7DCT", MPV),
    phev("B 250 e", 218, F, "8DCT", MPV, null, null, 160),
  ],

  "mercedes-cla-c117": [
    petrol("CLA 180", 122, F, "6MT", SW),
    petrol("CLA 180", 122, F, "7DCT", SW),
    petrol("CLA 200", 156, F, "7DCT", SW),
    diesel("CLA 200 CDI", 136, F, "7DCT", SW),
    petrol("AMG CLA 45", 360, A, "7DCT", SW),
  ],
  "mercedes-cla-c118": [
    petrol("CLA 180", 136, F, "7DCT", SW),
    petrol("CLA 200", 163, F, "7DCT", SW),
    phev("CLA 250 e", 218, F, "8DCT", SW, null, null, 160),
    petrol("AMG CLA 45 S", 421, A, "8DCT", SW),
  ],
  "mercedes-cla-c174": [
    bev("CLA 200", 224, R, 58, 534, 12.5, SW, 165),
    bev("CLA 250", 272, R, 71, 664, 12.5, SW, 200),
    bev("CLA 250+", 272, R, 85, 781, 12.5, SW, 200),
    bev("CLA 350 4MATIC", 354, A, 85, 759, 12.9, SW, 260),
    bev("AMG CLA 45", 680, A, 94, 672, 16.3, SW, 500),
  ],

  "mercedes-c-class-w202": [
    petrol("C 180", 122, R, "5MT", SW),
    petrol("C 180", 122, R, "4AT", SW),
    petrol("C 200", 136, R, "5MT", SW),
    diesel("C 220 CDI", 125, R, "5MT", SW),
    petrol("AMG C 36", 280, R, "4AT", SW),
  ],
  "mercedes-c-class-w203": [
    petrol("C 180", 129, R, "6MT", SW),
    petrol("C 200", 163, R, "6MT", SW),
    petrol("C 200", 163, R, "5AT", SW),
    diesel("C 220 CDI", 143, R, "6MT", SW),
    petrol("AMG C 32", 354, R, "5AT", SW),
  ],
  "mercedes-c-class-w204": [
    petrol("C 180", 156, R, "6MT", SW),
    petrol("C 200", 184, R, "6MT", SW),
    petrol("C 200", 184, R, "7AT", SW),
    diesel("C 220 CDI", 170, R, "6MT", SW),
    petrol("AMG C 63", 457, R, "7AT", SW),
  ],
  "mercedes-c-class-w205": [
    petrol("C 180", 156, R, "6MT", SW),
    petrol("C 180", 156, R, "9AT", SW),
    petrol("C 200", 184, R, "9AT", SW),
    diesel("C 220 d", 194, R, "9AT", SW),
    phev("C 300 e", 320, R, "9AT", SW, null, null, 235),
    petrol("AMG C 43", 390, A, "9AT", SW),
    petrol("AMG C 63", 476, R, "7AT", SW),
  ],
  "mercedes-c-class-w206": [
    hybrid("C 180", 170, R, "9AT", SW),
    hybrid("C 200", 204, R, "9AT", SW),
    hybrid("C 220 d", 200, R, "9AT", SW),
    phev("C 300 e", 313, R, "9AT", SW, null, null, 230),
    hybrid("AMG C 43", 408, A, "9AT", SW),
    phev("AMG C 63 S E", 680, A, "9AT", SW, null, null, 500),
  ],
  "mercedes-c-class-w520": [
    bev("C 300 4MATIC", 421, A, 85, 682, null, SW, 310),
    bev("C 400 4MATIC", 489, A, 94, 753, null, SW, 360),
  ],

  "mercedes-e-class-w210": [
    petrol("E 200", 136, R, "5MT", SW),
    petrol("E 200", 136, R, "5AT", SW),
    diesel("E 220 CDI", 143, R, "5MT", SW),
    petrol("E 320", 224, R, "5AT", SW),
    petrol("AMG E 55", 354, R, "5AT", SW),
  ],
  "mercedes-e-class-w211": [
    petrol("E 200", 163, R, "6MT", SW),
    diesel("E 220 CDI", 150, R, "6MT", SW),
    diesel("E 320 CDI", 204, R, "7AT", SW),
    petrol("E 350", 272, R, "7AT", SW),
    petrol("AMG E 63", 514, R, "7AT", SW),
  ],
  "mercedes-e-class-w212": [
    petrol("E 200", 184, R, "6MT", SW),
    petrol("E 200", 184, R, "7AT", SW),
    diesel("E 220 CDI", 170, R, "6MT", SW),
    diesel("E 250 CDI", 204, R, "7AT", SW),
    petrol("AMG E 63", 525, R, "7AT", SW),
  ],
  "mercedes-e-class-w213": [
    hybrid("E 200", 197, R, "9AT", SW),
    diesel("E 220 d", 194, R, "9AT", SW),
    phev("E 300 e", 313, R, "9AT", SW, null, null, 230),
    petrol("AMG E 63 S", 612, A, "9AT", SW),
  ],
  "mercedes-e-class-w214": [
    hybrid("E 200 d", 163, R, "9AT", SW, 4.7, 120),
    hybrid("E 220 d", 197, R, "9AT", SW, 4.7, 145),
    hybrid("E 220 d 4MATIC", 197, A, "9AT", SW, 4.8, 145),
    hybrid("E 450 d 4MATIC", 367, A, "9AT", SW, 5.8, 270),
    phev("E 300 de 4MATIC", 197, A, "9AT", SW, 103, 1.7, 145),
    phev("E 300 e", 204, R, "9AT", SW, 109, 2.0, 150),
    phev("E 300 e 4MATIC", 204, A, "9AT", SW, 102, 2.4, 150),
    phev("E 400 e 4MATIC", 252, A, "9AT", SW, 102, 2.4, 185),
    phev("AMG E 53 e", 449, A, "9AT", SW, 99, 2.9, 330),
  ],

  "mercedes-s-class-w140": [
    petrol("S 320", 231, R, "4AT", SED),
    petrol("S 500", 320, R, "4AT", SED),
    petrol("S 600", 394, R, "4AT", SED),
  ],
  "mercedes-s-class-w220": [
    petrol("S 320", 224, R, "5AT", SED),
    petrol("S 500", 306, R, "5AT", SED),
    petrol("AMG S 55", 500, R, "5AT", SED),
  ],
  "mercedes-s-class-w221": [
    petrol("S 350", 272, R, "7AT", SED),
    petrol("S 500", 388, R, "7AT", SED),
    diesel("S 320 CDI", 235, R, "7AT", SED),
    petrol("AMG S 63", 525, R, "7AT", SED),
  ],
  "mercedes-s-class-w222": [
    diesel("S 350 d", 286, R, "9AT", SED),
    petrol("S 500", 455, A, "9AT", SED),
    petrol("AMG S 63", 585, A, "9AT", SED),
  ],
  "mercedes-s-class-w223": [
    diesel("S 350 d", 286, A, "9AT", SED),
    hybrid("S 500", 435, A, "9AT", SED),
    phev("S 580 e", 510, A, "9AT", SED, null, null, 375),
  ],
  "mercedes-s-class-w223-fl": [
    hybrid("S 450 d 4MATIC", 367, A, "9AT", SED, 6.3, 270),
    hybrid("S 500 4MATIC", 449, A, "9AT", SED, 8.3, 330),
    phev("S 580 e 4MATIC", 449, A, "9AT", SED, 99, 2.8, 330),
    phev("Maybach S 580 e", 449, A, "9AT", SED, 97, 2.9, 330),
  ],

  "mercedes-cle-c236": [
    hybrid("CLE 200", 204, A, "9AT", CC, 6.7, 150),
    hybrid("CLE 300", 258, A, "9AT", CC, 6.9, 190),
    hybrid("CLE 450", 381, A, "9AT", CC, 7.7, 280),
    phev("CLE 300 e", 204, R, "9AT", CC, 110, 2.2, 150),
    hybrid("AMG CLE 53", 449, A, "9AT", CC, 9.1, 330),
  ],

  "mercedes-cls-c219": [
    diesel("CLS 320 CDI", 224, R, "7AT", SED),
    petrol("CLS 350", 272, R, "7AT", SED),
    petrol("CLS 500", 306, R, "7AT", SED),
    petrol("AMG CLS 63", 514, R, "7AT", SED),
  ],
  "mercedes-cls-c218": [
    diesel("CLS 250 CDI", 204, R, "7AT", SED),
    petrol("CLS 350", 306, R, "7AT", SED),
    petrol("AMG CLS 63", 557, R, "7AT", SED),
  ],
  "mercedes-cls-c257": [
    diesel("CLS 400 d", 340, A, "9AT", SED),
    hybrid("CLS 450", 367, A, "9AT", SED),
    hybrid("AMG CLS 53", 435, A, "9AT", SED),
  ],

  "mercedes-gla-x156": [
    petrol("GLA 180", 122, F, "6MT", SUV),
    petrol("GLA 180", 122, F, "7DCT", SUV),
    petrol("GLA 200", 156, F, "7DCT", SUV),
    diesel("GLA 200 d", 136, F, "7DCT", SUV),
    petrol("AMG GLA 45", 360, A, "7DCT", SUV),
  ],
  "mercedes-gla-h247": [
    petrol("GLA 200", 163, F, "7DCT", SUV),
    diesel("GLA 200 d", 150, F, "8DCT", SUV),
    phev("GLA 250 e", 218, F, "8DCT", SUV, null, null, 160),
    petrol("AMG GLA 35", 306, A, "8DCT", SUV),
    petrol("AMG GLA 45 S", 421, A, "8DCT", SUV),
  ],
  "mercedes-gla-h244": [
    bev("GLA 200", 224, R, 58, 441, 15.0, SUV, 165),
    bev("GLA 250+", 272, R, 85, 647, 15.4, SUV, 200),
    bev("GLA 350 4MATIC", 354, A, 85, 634, 15.3, SUV, 260),
  ],

  "mercedes-glb-x247": [
    petrol("GLB 200", 163, F, "7DCT", SUV),
    diesel("GLB 200 d", 150, F, "8DCT", SUV),
    petrol("AMG GLB 35", 306, A, "8DCT", SUV),
  ],
  "mercedes-glb-x244": [
    bev("GLB 200", 224, R, 58, 426, 15.6, SUV, 165),
    bev("GLB 250", 272, R, 71, 522, 15.6, SUV, 200),
    bev("GLB 250+", 272, R, 85, 625, 16.0, SUV, 200),
    bev("GLB 350 4MATIC", 354, A, 85, 608, 16.1, SUV, 260),
  ],

  "mercedes-glc-x253": [
    diesel("GLC 220 d", 170, A, "9AT", SUV),
    petrol("GLC 250", 211, A, "9AT", SUV),
    phev("GLC 300 e", 320, A, "9AT", SUV, null, null, 235),
    petrol("AMG GLC 43", 367, A, "9AT", SUV),
    petrol("AMG GLC 63", 476, A, "9AT", SUV),
  ],
  "mercedes-glc-x254": [
    hybrid("GLC 220 d 4MATIC", 197, A, "9AT", SUV, 5.1, 145),
    hybrid("GLC 450 d 4MATIC", 367, A, "9AT", SUV, 6.2, 270),
    phev("GLC 300 de 4MATIC", 197, A, "9AT", SUV, 123, 1.6, 145),
    phev("GLC 300 e 4MATIC", 204, A, "9AT", SUV, 124, 2.1, 150),
    phev("GLC 400 e 4MATIC", 252, A, "9AT", SUV, 124, 2.1, 185),
    hybrid("AMG GLC 53", 449, A, "9AT", SUV, 9.2, 330),
  ],
  "mercedes-glc-x540": [
    bev("GLC 250", 354, R, 85, 640, 15.3, SUV, 260),
    bev("GLC 300 4MATIC", 421, A, 85, 608, 16.1, SUV, 310),
    bev("GLC 400 4MATIC", 490, A, 94, 667, 16.0, SUV, 360),
  ],

  "mercedes-gle-w166": [
    diesel("GLE 250 d", 204, A, "9AT", SUV),
    diesel("GLE 350 d", 258, A, "9AT", SUV),
    petrol("GLE 400", 333, A, "9AT", SUV),
    petrol("AMG GLE 63", 557, A, "7AT", SUV),
  ],
  "mercedes-gle-v167": [
    diesel("GLE 300 d", 245, A, "9AT", SUV),
    phev("GLE 350 de", 320, A, "9AT", SUV, null, null, 235),
    petrol("GLE 450", 367, A, "9AT", SUV),
    hybrid("AMG GLE 53", 435, A, "9AT", SUV),
    petrol("AMG GLE 63 S", 612, A, "9AT", SUV),
  ],
  "mercedes-gle-v167-fl": [
    hybrid("GLE 450 d 4MATIC", 367, A, "9AT", SUV, 7.4, 270),
    phev("GLE 450 e 4MATIC", 326, A, "9AT", SUV, 102, 3.1, 240),
    phev("AMG GLE 53 e", 449, A, "9AT", SUV, 91, 3.8, 330),
    hybrid("AMG GLE 63 S", 612, A, "9AT", SUV, 13.1, 450),
  ],

  "mercedes-gls-x166": [
    diesel("GL 350 CDI", 258, A, "7AT", SUV),
    petrol("GL 500", 435, A, "7AT", SUV),
    petrol("AMG GL 63", 557, A, "7AT", SUV),
  ],
  "mercedes-gls-x167": [
    diesel("GLS 400 d", 330, A, "9AT", SUV),
    petrol("GLS 580", 489, A, "9AT", SUV),
    petrol("AMG GLS 63", 612, A, "9AT", SUV),
  ],
  "mercedes-gls-x167-fl": [
    hybrid("GLS 350 d 4MATIC", 313, A, "9AT", SUV, 7.9, 230),
    hybrid("GLS 450 d 4MATIC", 367, A, "9AT", SUV, 7.9, 270),
    hybrid("AMG GLS 63", 612, A, "9AT", SUV, 13.5, 450),
    hybrid("Maybach GLS 680", 612, A, "9AT", SUV, 13.4, 450),
  ],

  "mercedes-g-class-w463": [
    petrol("G 320", 215, A, "5AT", SUV),
    diesel("G 400 CDI", 250, A, "5AT", SUV),
    petrol("AMG G 55", 507, A, "5AT", SUV),
  ],
  "mercedes-g-class-w463-18": [
    diesel("G 400 d", 330, A, "9AT", SUV),
    petrol("G 500", 422, A, "9AT", SUV),
    petrol("AMG G 63", 585, A, "9AT", SUV),
  ],
  "mercedes-g-class-w465": [
    hybrid("G 450 d", 367, A, "9AT", SUV, 8.7, 270),
    hybrid("AMG G 63", 585, A, "9AT", SUV, 14.7, 430),
    bev("G 580", 587, A, 117, 479, null, SUV, 432),
  ],

  "mercedes-glk-x204": [
    diesel("GLK 220 CDI", 170, A, "7AT", SUV),
    petrol("GLK 250", 204, A, "7AT", SUV),
    petrol("GLK 350", 306, A, "7AT", SUV),
  ],

  "mercedes-ml-w163": [
    diesel("ML 270 CDI", 163, A, "5AT", SUV),
    petrol("ML 320", 218, A, "5AT", SUV),
    petrol("AMG ML 55", 347, A, "5AT", SUV),
  ],
  "mercedes-ml-w164": [
    diesel("ML 320 CDI", 224, A, "7AT", SUV),
    petrol("ML 350", 272, A, "7AT", SUV),
    petrol("AMG ML 63", 510, A, "7AT", SUV),
  ],
  "mercedes-ml-w166": [
    diesel("ML 250 CDI", 204, A, "7AT", SUV),
    petrol("ML 350", 306, A, "7AT", SUV),
    petrol("AMG ML 63", 525, A, "7AT", SUV),
  ],

  "mercedes-sl-r129": [
    petrol("SL 320", 231, R, "4AT", CONV),
    petrol("SL 320", 231, R, "5AT", CONV),
    petrol("SL 500", 320, R, "4AT", CONV),
    petrol("AMG SL 60", 381, R, "4AT", CONV),
  ],
  "mercedes-sl-r230": [
    petrol("SL 350", 245, R, "5AT", CONV),
    petrol("SL 500", 306, R, "7AT", CONV),
    petrol("AMG SL 55", 500, R, "5AT", CONV),
  ],
  "mercedes-sl-r231": [
    petrol("SL 400", 367, R, "9AT", CONV),
    petrol("SL 500", 455, A, "9AT", CONV),
    petrol("AMG SL 63", 585, R, "7AT", CONV),
  ],
  "mercedes-sl-r232": [
    hybrid("AMG SL 43", 422, R, "9AT", CONV, 9.0, 310),
    petrolL("AMG SL 55", 476, A, "9AT", CONV, 12.9),
    petrolL("AMG SL 63", 585, A, "9AT", CONV, 13.1),
    phev("AMG SL 63 S E", 612, A, "9AT", CONV, 12, 10.0, 450),
  ],

  "mercedes-slk-r170": [
    petrol("SLK 200", 136, R, "5MT", CONV),
    petrol("SLK 230", 193, R, "5AT", CONV),
    petrol("AMG SLK 32", 354, R, "5AT", CONV),
  ],
  "mercedes-slk-r171": [
    petrol("SLK 200", 163, R, "6MT", CONV),
    petrol("SLK 280", 231, R, "7AT", CONV),
    petrol("AMG SLK 55", 360, R, "7AT", CONV),
  ],
  "mercedes-slk-r172": [
    petrol("SLK 200", 184, R, "6MT", CONV),
    petrol("SLK 200", 184, R, "7AT", CONV),
    petrol("SLK 250", 204, R, "7AT", CONV),
    petrol("AMG SLK 55", 421, R, "7AT", CONV),
  ],
  "mercedes-slc-r172": [
    petrol("SLC 180", 156, R, "6MT", CONV),
    petrol("SLC 200", 184, R, "9AT", CONV),
    petrol("AMG SLC 43", 367, R, "9AT", CONV),
  ],

  "mercedes-clk-c208": [
    petrol("CLK 200", 136, R, "5MT", CC),
    petrol("CLK 230", 193, R, "5AT", CC),
    petrol("CLK 320", 218, R, "5AT", CC),
  ],
  "mercedes-clk-c209": [
    petrol("CLK 200", 163, R, "6MT", CC),
    diesel("CLK 220 CDI", 150, R, "6MT", CC),
    petrol("CLK 500", 306, R, "5AT", CC),
    petrol("AMG CLK 55", 367, R, "5AT", CC),
  ],

  "mercedes-cl-c215": [
    petrol("CL 500", 306, R, "5AT", COUPE),
    petrol("AMG CL 55", 500, R, "5AT", COUPE),
  ],
  "mercedes-cl-c216": [
    petrol("CL 500", 388, R, "7AT", COUPE),
    petrol("AMG CL 63", 525, R, "7AT", COUPE),
  ],

  "mercedes-amg-gt-c190": [
    petrol("AMG GT", 462, R, "7DCT", COUPE),
    petrol("AMG GT S", 510, R, "7DCT", COUPE),
    petrol("AMG GT R", 585, R, "7DCT", COUPE),
  ],
  "mercedes-amg-gt-x290": [
    hybrid("AMG GT 53", 435, A, "9AT", SED),
    petrol("AMG GT 63 S", 639, A, "9AT", SED),
  ],
  "mercedes-amg-gt-c192": [
    petrolL("AMG GT 63", 585, A, "9AT", COUPE, 14.0, 430),
    phev("AMG GT 63 S E", 612, A, "9AT", COUPE, 11, 10.6, 450),
  ],
  "mercedes-amg-gt-gt-ev": [
    bev("AMG GT 53", 544, R, 106, 793, 15.9, SED, 400),
    bev("AMG GT 55", 816, A, 106, 690, 18.1, SED, 600),
    bev("AMG GT 63", 1169, A, 106, 684, 18.3, SED, 860),
  ],

  "mercedes-eqa-h243": [bev("EQA 250", 190, F, 70.5, null, null, SUV, 140)],
  "mercedes-eqb-x243": [
    bev("EQB 250", 190, F, 70.5, null, null, SUV, 140),
    bev("EQB 350", 292, A, 70.5, null, null, SUV, 215),
  ],
  "mercedes-eqc-n293": [bev("EQC 400", 408, A, 80, null, null, SUV, 300)],
  "mercedes-eqe-v295": [
    bev("EQE 350", 292, R, 90.6, null, null, SED, 215),
    bev("EQE 500", 408, A, 90.6, null, null, SED, 300),
  ],
  "mercedes-eqe-suv-x294": [
    bev("EQE 350 SUV", 292, R, 90.6, null, null, SUV, 215),
    bev("EQE 500 SUV", 408, A, 90.6, null, null, SUV, 300),
  ],
  "mercedes-eqs-v297": [
    bev("EQS 450+", 333, R, 107.8, null, null, SED, 245),
    bev("EQS 580", 523, A, 107.8, null, null, SED, 385),
  ],
  "mercedes-eqs-v297-fl": [
    bev("EQS 450+", 408, R, 122, 878, null, SED, 300),
    bev("EQS 500 4MATIC", 476, A, 122, 853, null, SED, 350),
    bev("EQS 580 4MATIC", 585, A, 122, 853, null, SED, 430),
  ],
  "mercedes-eqv-w447": [bev("EQV 300", 204, F, 90, null, null, VAN, 150)],

  "mercedes-sprinter-t1n": [
    diesel("311 CDI", 109, R, "5MT", VAN),
    diesel("316 CDI", 156, R, "5MT", VAN),
  ],
  "mercedes-sprinter-ncv3": [
    diesel("313 CDI", 129, R, "6MT", VAN),
    diesel("316 CDI", 163, R, "6MT", VAN),
    diesel("319 CDI", 190, R, "7AT", VAN),
  ],
  "mercedes-sprinter-vs30": [
    diesel("314 CDI", 143, R, "6MT", VAN),
    diesel("317 CDI", 170, R, "6MT", VAN),
    diesel("317 CDI", 170, R, "9AT", VAN),
    diesel("319 CDI", 190, R, "9AT", VAN),
  ],
  "mercedes-vito-w638": [
    diesel("108 CDI", 82, R, "5MT", VAN),
    diesel("110 CDI", 102, R, "5MT", VAN),
  ],
  "mercedes-vito-w639": [
    diesel("115 CDI", 150, R, "6MT", VAN),
    diesel("120 CDI", 204, R, "5AT", VAN),
  ],
  "mercedes-vito-w447": [
    diesel("114 CDI", 136, R, "6MT", VAN),
    diesel("116 CDI", 163, R, "6MT", VAN),
    diesel("116 CDI", 163, R, "9AT", VAN),
    diesel("119 CDI", 190, R, "9AT", VAN),
  ],
  "mercedes-v-w447": [
    diesel("V 220 d", 163, R, "9AT", VAN),
    diesel("V 250 d", 190, R, "9AT", VAN),
    diesel("V 300 d", 239, R, "9AT", VAN),
  ],
  "mercedes-viano-w639": [
    diesel("2.2 CDI", 150, R, "6MT", VAN),
    diesel("3.0 CDI", 204, R, "5AT", VAN),
  ],
  "mercedes-citan-w415": [
    diesel("109 CDI", 90, F, "5MT", VAN),
    diesel("111 CDI", 110, F, "5MT", VAN),
  ],
  "mercedes-citan-w420": [
    diesel("112 CDI", 95, F, "6MT", VAN),
    diesel("113 CDI", 116, F, "6MT", VAN),
  ],
  "mercedes-x-x470": [
    diesel("X 220 d", 163, A, "6MT", PICKUP),
    diesel("X 220 d", 163, A, "7AT", PICKUP),
    diesel("X 250 d", 190, A, "7AT", PICKUP),
    diesel("X 350 d", 258, A, "7AT", PICKUP),
  ],

  "mercedes-190-w201": [
    petrol("190 E", 122, R, "5MT", SED),
    petrol("190 E", 122, R, "4AT", SED),
    petrol("190 E 2.3", 136, R, "5MT", SED),
    petrol("190 E 2.5-16", 195, R, "5MT", SED),
    diesel("190 D 2.5", 94, R, "5MT", SED),
  ],
  "mercedes-123-w123": [
    petrol("200", 109, R, "4MT", SW),
    petrol("200", 109, R, "4AT", SW),
    petrol("230 E", 136, R, "4AT", SW),
    diesel("240 D", 72, R, "4MT", SW),
    diesel("300 D", 88, R, "4AT", SW),
  ],
  "mercedes-124-w124": [
    petrol("200", 109, R, "5MT", SW),
    petrol("200", 109, R, "4AT", SW),
    petrol("230 E", 136, R, "5MT", SW),
    petrol("300 E", 180, R, "4AT", SW),
    diesel("300 D", 109, R, "5MT", SW),
    petrol("500 E", 326, R, "4AT", SW),
  ],
};

export const MERCEDES_MAKE_IDS = ["mercedes"];
