/**
 * Porsche engines sold in Finland after 2005.
 * 992.2, the current Cayenne, Macan Electric, Panamera and Taycan follow porsche.fi.
 * 718 Boxster 9.5 l/100 km and 718 Cayman 9.3 l/100 km are the Finnish base-car figures.
 * E-Hybrid is an engine of Cayenne and Panamera. Coupe is a body style.
 * A published WLTP span is not stored as one consumption number.
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
const hybrid = (name, hp, drive, gear, body) => fuel("hybrid", name, hp, drive, gear, body, null);

function phev(name, hp, drive, gear, bat, body, l) {
  const row = fuel("phev", name, hp, drive, gear, body, l);
  if (bat != null) row.batteryKwh = bat;
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

const CC = "Coupe, Cabriolet";
const CCT = "Coupe, Cabriolet, Targa";
const CP = "Coupe";
const RD = "Roadster";
const SUV = "SUV";
const SC = "SUV, Coupe";
const SAL = "Saloon";
const SST = "Saloon, Sport Turismo";
const TAY = "Saloon, Sport Turismo, Cross Turismo";

const r6 = (name, hp, body) => petrol(name, hp, "RWD", "6MT", body);
const r7 = (name, hp, body) => petrol(name, hp, "RWD", "7MT", body);
const rp7 = (name, hp, body) => petrol(name, hp, "RWD", "7 PDK", body);
const rp8 = (name, hp, body) => petrol(name, hp, "RWD", "8 PDK", body);
const a7 = (name, hp, body) => petrol(name, hp, "AWD", "7 PDK", body);
const a8 = (name, hp, body) => petrol(name, hp, "AWD", "8 PDK", body);

export const PORSCHE_MAKE_IDS = ["porsche"];

export const PORSCHE_POWERTRAINS = {
  "porsche-911-997": [
    r6("Carrera", 325, CC),
    petrol("Carrera", 325, "RWD", "5AT", CC),
    r6("Carrera S", 355, CC),
    petrol("Carrera S", 355, "RWD", "5AT", CC),
    petrol("Carrera 4S", 355, "AWD", "6MT", CCT),
    petrol("Turbo", 480, "AWD", "6MT", CC),
    petrol("Turbo", 480, "AWD", "5AT", CC),
    r6("GT3", 415, CP),
  ],
  "porsche-911-997-2": [
    r6("Carrera", 345, CC),
    rp7("Carrera", 345, CC),
    r6("Carrera S", 385, CC),
    rp7("Carrera S", 385, CC),
    petrol("Carrera 4S", 385, "AWD", "7 PDK", CCT),
    petrol("Turbo", 500, "AWD", "7 PDK", CC),
    r6("GT3", 435, CP),
  ],
  "porsche-911-991": [
    r7("Carrera", 350, CC),
    rp7("Carrera", 350, CC),
    r7("Carrera S", 400, CC),
    rp7("Carrera S", 400, CC),
    a7("Carrera 4S", 400, CCT),
    a7("Turbo", 520, CC),
    petrol("GT3", 475, "RWD", "7 PDK", CP),
  ],
  "porsche-911-991-2": [
    r7("Carrera", 370, CC),
    rp7("Carrera", 370, CC),
    r7("Carrera S", 420, CC),
    rp7("Carrera S", 420, CC),
    a7("Carrera 4S", 420, CCT),
    a7("Turbo", 540, CC),
    r6("GT3", 500, CP),
    petrol("GT3", 500, "RWD", "7 PDK", CP),
  ],
  "porsche-911-992": [
    rp8("Carrera", 385, CC),
    rp8("Carrera S", 450, CC),
    a8("Carrera 4S", 450, CCT),
    a8("Turbo", 580, CC),
    a8("Turbo S", 650, CC),
    r6("GT3", 510, CP),
    petrol("GT3", 510, "RWD", "7 PDK", CP),
  ],
  "porsche-911-992-2": [
    rp8("Carrera", 394, CC),
    petrol("Carrera T", 394, "RWD", "6MT", CC),
    rp8("Carrera S", 480, CC),
    a8("Carrera 4S", 480, CCT),
    hybrid("Carrera GTS", 541, "RWD", "8 PDK", CC),
    hybrid("Carrera 4 GTS", 541, "AWD", "8 PDK", CCT),
    hybrid("Turbo S", 711, "AWD", "8 PDK", CC),
    r6("GT3", 510, CP),
    petrol("GT3", 510, "RWD", "7 PDK", CP),
  ],
  "porsche-boxster-987": [r6("2.7", 240, RD), petrol("2.7", 240, "RWD", "5AT", RD), r6("S", 280, RD)],
  "porsche-boxster-987-2": [r6("2.9", 255, RD), rp7("2.9", 255, RD), r6("S", 310, RD), rp7("S", 310, RD)],
  "porsche-boxster-981": [r6("2.7", 265, RD), rp7("2.7", 265, RD), rp7("S", 315, RD), rp7("GTS", 330, RD)],
  "porsche-boxster-718": [
    petrol("2.0", 300, "RWD", "6MT", RD, 9.5),
    petrol("2.0", 300, "RWD", "7 PDK", RD, 9.5),
    rp7("S", 350, RD),
    r6("GTS 4.0", 400, RD),
    rp7("GTS 4.0", 400, RD),
    r6("Spyder", 420, RD),
  ],
  "porsche-cayman-987": [r6("2.7", 245, CP), r6("S", 295, CP)],
  "porsche-cayman-987-2": [r6("2.9", 265, CP), rp7("2.9", 265, CP), r6("S", 320, CP), rp7("S", 320, CP)],
  "porsche-cayman-981": [r6("2.7", 275, CP), rp7("2.7", 275, CP), rp7("S", 325, CP), rp7("GTS", 340, CP)],
  "porsche-cayman-718": [
    petrol("2.0", 300, "RWD", "6MT", CP, 9.3),
    petrol("2.0", 300, "RWD", "7 PDK", CP, 9.3),
    rp7("S", 350, CP),
    r6("GTS 4.0", 400, CP),
    rp7("GTS 4.0", 400, CP),
    r6("GT4", 420, CP),
  ],
  "porsche-cayenne-9pa": [
    petrol("3.2", 250, "AWD", "6AT", SUV),
    petrol("S", 340, "AWD", "6AT", SUV),
    petrol("Turbo", 450, "AWD", "6AT", SUV),
  ],
  "porsche-cayenne-9pa-fl": [
    petrol("3.6", 290, "AWD", "6AT", SUV),
    petrol("S", 385, "AWD", "6AT", SUV),
    petrol("GTS", 405, "AWD", "6AT", SUV),
    petrol("Turbo", 500, "AWD", "6AT", SUV),
    diesel("Diesel", 240, "AWD", "6AT", SUV),
  ],
  "porsche-cayenne-92a": [
    petrol("3.6", 300, "AWD", "8AT", SUV),
    petrol("S", 400, "AWD", "8AT", SUV),
    petrol("Turbo", 500, "AWD", "8AT", SUV),
    diesel("Diesel", 245, "AWD", "8AT", SUV),
    hybrid("S Hybrid", 380, "AWD", "8AT", SUV),
  ],
  "porsche-cayenne-92a-fl": [
    petrol("S", 420, "AWD", "8AT", SUV),
    petrol("GTS", 440, "AWD", "8AT", SUV),
    petrol("Turbo", 520, "AWD", "8AT", SUV),
    diesel("Diesel", 262, "AWD", "8AT", SUV),
    phev("S E-Hybrid", 416, "AWD", "8AT", 10.8, SUV),
  ],
  "porsche-cayenne-e3": [
    petrol("Cayenne", 340, "AWD", "8AT", SC),
    petrol("S", 440, "AWD", "8AT", SC),
    petrol("Turbo", 550, "AWD", "8AT", SC),
    phev("E-Hybrid", 462, "AWD", "8AT", 14.1, SC),
    phev("Turbo S E-Hybrid", 680, "AWD", "8AT", 14.1, SC),
  ],
  "porsche-cayenne-e3-fl": [
    petrol("Cayenne", 353, "AWD", "8AT", SC),
    petrol("S", 474, "AWD", "8AT", SC),
    petrol("GTS", 500, "AWD", "8AT", SC),
    phev("E-Hybrid", 470, "AWD", "8AT", null, SC),
    phev("S E-Hybrid", 519, "AWD", "8AT", null, SC),
    phev("Turbo E-Hybrid", 739, "AWD", "8AT", null, SC),
  ],
  "porsche-cayenne-electric": [
    bev("Electric", 442, "AWD", null, 542, SC),
    bev("S Electric", 666, "AWD", null, 571, SC),
    bev("Turbo Electric", 1156, "AWD", null, 537, SC),
  ],
  "porsche-macan-95b": [
    petrol("Macan", 252, "AWD", "7 PDK", SUV),
    petrol("S", 340, "AWD", "7 PDK", SUV),
    petrol("GTS", 360, "AWD", "7 PDK", SUV),
    petrol("Turbo", 400, "AWD", "7 PDK", SUV),
    diesel("Diesel", 258, "AWD", "7 PDK", SUV),
  ],
  "porsche-macan-95b-fl": [
    petrol("Macan", 245, "AWD", "7 PDK", SUV),
    petrol("S", 354, "AWD", "7 PDK", SUV),
    petrol("GTS", 380, "AWD", "7 PDK", SUV),
    petrol("Turbo", 440, "AWD", "7 PDK", SUV),
  ],
  "porsche-macan-95b-2": [
    petrol("Macan", 265, "AWD", "7 PDK", SUV),
    petrol("S", 380, "AWD", "7 PDK", SUV),
    petrol("GTS", 440, "AWD", "7 PDK", SUV),
  ],
  "porsche-macan-electric": [
    bev("Macan", 360, "RWD", 100, 642, SUV),
    bev("Macan 4", 408, "AWD", 100, 611, SUV),
    bev("Macan 4S", 516, "AWD", 100, 606, SUV),
    bev("Macan GTS", 571, "AWD", 100, 585, SUV),
    bev("Macan Turbo", 639, "AWD", 100, 590, SUV),
  ],
  "porsche-panamera-970": [
    petrol("Panamera", 300, "RWD", "7 PDK", SAL),
    petrol("S", 400, "RWD", "7 PDK", SAL),
    petrol("4S", 400, "AWD", "7 PDK", SAL),
    petrol("Turbo", 500, "AWD", "7 PDK", SAL),
    diesel("Diesel", 250, "RWD", "8AT", SAL),
  ],
  "porsche-panamera-970-fl": [
    petrol("Panamera", 310, "RWD", "7 PDK", SAL),
    petrol("S", 420, "RWD", "7 PDK", SAL),
    petrol("4S", 420, "AWD", "7 PDK", SAL),
    petrol("Turbo", 520, "AWD", "7 PDK", SAL),
    diesel("Diesel", 300, "RWD", "8AT", SAL),
    phev("S E-Hybrid", 416, "RWD", "8AT", 9.4, SAL),
  ],
  "porsche-panamera-971": [
    petrol("Panamera", 330, "RWD", "8 PDK", SST),
    petrol("4S", 440, "AWD", "8 PDK", SST),
    petrol("Turbo", 550, "AWD", "8 PDK", SST),
    phev("4 E-Hybrid", 462, "AWD", "8 PDK", 14.1, SST),
    phev("Turbo S E-Hybrid", 680, "AWD", "8 PDK", 14.1, SST),
  ],
  "porsche-panamera-971-fl": [
    petrol("Panamera", 330, "RWD", "8 PDK", SST),
    petrol("4S", 440, "AWD", "8 PDK", SST),
    petrol("GTS", 480, "AWD", "8 PDK", SST),
    petrol("Turbo S", 630, "AWD", "8 PDK", SST),
    phev("4 E-Hybrid", 462, "AWD", "8 PDK", 17.9, SST),
    phev("Turbo S E-Hybrid", 700, "AWD", "8 PDK", 17.9, SST),
  ],
  "porsche-panamera-972": [
    petrol("Panamera", 353, "RWD", "8 PDK", SST),
    petrol("Panamera 4", 353, "AWD", "8 PDK", SST),
    phev("4 E-Hybrid", 470, "AWD", "8 PDK", null, SST),
    phev("4S E-Hybrid", 544, "AWD", "8 PDK", null, SST),
    phev("Turbo S E-Hybrid", 782, "AWD", "8 PDK", null, SST),
  ],
  "porsche-taycan-taycan": [
    bev("Taycan", 408, "RWD", null, null, TAY),
    bev("4S", 530, "AWD", null, null, TAY),
    bev("GTS", 598, "AWD", null, null, TAY),
    bev("Turbo", 680, "AWD", null, null, TAY),
    bev("Turbo S", 761, "AWD", null, null, TAY),
  ],
  "porsche-taycan-fl": [
    bev("Taycan", 408, "RWD", null, 592, TAY),
    bev("Taycan 4", 408, "AWD", null, 560, TAY),
    bev("4S", 544, "AWD", null, 560, TAY),
    bev("GTS", 700, "AWD", null, 629, TAY),
    bev("Turbo", 884, "AWD", null, 634, TAY),
    bev("Turbo S", 952, "AWD", null, 634, TAY),
    bev("Turbo GT", 1034, "AWD", null, 555, TAY),
  ],
};
