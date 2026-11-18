/**
 * Land Rover powertrains for the cars commonly sold in Finland.
 * Current rows follow the Land Rover Finland price lists. The stored
 * litre figure is the best combined WLTP number on that list.
 * Older rows are the European engines, without a consumption figure.
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

const petrol = (name, hp, drive, gear, body, l, kw) =>
  fuel("petrol", name, hp, drive, gear, body, l, kw);
const diesel = (name, hp, drive, gear, body, l, kw) =>
  fuel("diesel", name, hp, drive, gear, body, l, kw);
const hybrid = (name, hp, drive, gear, body, l, kw) =>
  fuel("hybrid", name, hp, drive, gear, body, l, kw);

function phev(name, hp, drive, gear, bat, erange, body, l, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, l, kw);
  if (bat != null) row.batteryKwh = bat;
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
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: W,
  };
  if (kwh100 != null) {
    row.consumptionCombinedKwh = kwh100;
    row.consumptionStandard = W;
  }
  return row;
}

const SUV = "SUV";
const D90 = "90";
const D110 = "110";
const D130 = "130";

const p = (name, hp, gear, body = SUV, drive = "4x4") => petrol(name, hp, drive, gear, body);
const d = (name, hp, gear, body = SUV, drive = "4x4") => diesel(name, hp, drive, gear, body);

export const LANDROVER_MAKE_IDS = ["landrover"];

/** @type {Record<string, object[]>} */
export const LANDROVER_POWERTRAINS = {
  "landrover-defender-90-110": [
    p("2.5 83", 83, "5MT", "90, 110"),
    d("2.5 Diesel 68", 68, "5MT", "90, 110"),
    d("2.5 TD 85", 85, "5MT", "90, 110"),
    p("3.5 V8 134", 134, "5MT", D110),
  ],
  "landrover-defender-200-tdi": [
    d("200 Tdi 111", 111, "5MT", "90, 110"),
    p("3.5 V8 134", 134, "5MT", D110),
  ],
  "landrover-defender-300-tdi": [
    d("300 Tdi 111", 111, "5MT", "90, 110"),
  ],
  "landrover-defender-td5": [
    d("Td5 122", 122, "5MT", "90, 110"),
  ],
  "landrover-defender-tdci": [
    d("2.4 TDCi 122", 122, "6MT", "90, 110"),
  ],
  "landrover-defender-tdci-fl": [
    d("2.2 TDCi 122", 122, "6MT", "90, 110"),
  ],
  "landrover-defender-l663": [
    diesel("D200", 200, "AWD", "8AT", "90, 110"),
    diesel("D250", 250, "AWD", "8AT", "90, 110"),
    diesel("D300", 300, "AWD", "8AT", "90, 110"),
    petrol("P300", 300, "AWD", "8AT", "90, 110"),
    petrol("P400", 400, "AWD", "8AT", "90, 110"),
    // Finnish launch article: 404 hp, 19.2 kWh, 43 km, 3.3 L, 110 only.
    phev("P400e", 404, "AWD", "8AT", 19.2, 43, D110, 3.3, 297),
  ],
  // Finnish 26MY list. Litre is the best combined figure for that body.
  "landrover-defender-l663-fl": [
    hybrid("D200", 200, "AWD", "8AT", D90, 8.3),
    hybrid("D200", 200, "AWD", "8AT", D110, 8.5),
    hybrid("D250", 250, "AWD", "8AT", D90, 8.3),
    hybrid("D250", 250, "AWD", "8AT", D110, 8.5),
    hybrid("D250", 250, "AWD", "8AT", D130, 8.6),
    hybrid("D350", 350, "AWD", "8AT", D90, 8.3, 257),
    hybrid("D350", 350, "AWD", "8AT", D110, 8.5, 257),
    hybrid("D350", 350, "AWD", "8AT", D130, 8.7, 257),
    petrol("P425", 425, "AWD", "8AT", D90, 13.8),
    petrol("P425", 425, "AWD", "8AT", D110, 14.0),
    petrol("P425", 425, "AWD", "8AT", D130, 14.1),
    phev("P300e", 300, "AWD", "8AT", null, null, D110, 6.0),
    hybrid("OCTA P635", 635, "AWD", "8AT", D110, 13.0),
  ],

  "landrover-discovery-i": [
    d("200 Tdi 111", 111, "5MT"),
    p("3.5 V8 156", 156, "5MT"),
    p("3.5 V8 156", 156, "4AT"),
  ],
  "landrover-discovery-i-fl": [
    d("300 Tdi 113", 113, "5MT"),
    d("300 Tdi 113", 113, "4AT"),
    p("3.9 V8 182", 182, "4AT"),
  ],
  "landrover-discovery-ii": [
    d("Td5 136", 136, "5MT"),
    d("Td5 136", 136, "4AT"),
    p("4.0 V8 185", 185, "4AT"),
  ],
  "landrover-discovery-iii": [
    d("2.7 TDV6 190", 190, "6AT", SUV, "AWD"),
    p("4.4 V8 299", 299, "6AT", SUV, "AWD"),
  ],
  "landrover-discovery-iv": [
    d("3.0 TDV6 211", 211, "8AT", SUV, "AWD"),
    d("3.0 TDV6 245", 245, "8AT", SUV, "AWD"),
  ],
  "landrover-discovery-iv-fl": [
    d("3.0 SDV6 256", 256, "8AT", SUV, "AWD"),
    p("3.0 SC 340", 340, "8AT", SUV, "AWD"),
  ],
  "landrover-discovery-v": [
    d("2.0 Sd4 240", 240, "8AT", SUV, "AWD"),
    d("3.0 Td6 258", 258, "8AT", SUV, "AWD"),
    p("2.0 Si4 300", 300, "8AT", SUV, "AWD"),
    p("3.0 Si6 340", 340, "8AT", SUV, "AWD"),
  ],
  // Finnish page: D350 is 257 kW / 350 hp, 8.0 L. P360 is 265 kW / 360 hp.
  "landrover-discovery-v-fl": [
    hybrid("D250", 250, "AWD", "8AT", SUV, 8.0),
    hybrid("D350", 350, "AWD", "8AT", SUV, 8.0, 257),
    hybrid("P360", 360, "AWD", "8AT", SUV, null, 265),
  ],

  "landrover-discovery-sport-i": [
    d("2.0 TD4 150", 150, "6MT", SUV, "FWD"),
    d("2.0 TD4 150", 150, "9AT", SUV, "AWD"),
    d("2.0 TD4 180", 180, "9AT", SUV, "AWD"),
    p("2.0 Si4 240", 240, "9AT", SUV, "AWD"),
  ],
  "landrover-discovery-sport-i-fl": [
    hybrid("D165", 165, "AWD", "9AT", SUV, 6.5),
    hybrid("D200", 200, "AWD", "9AT", SUV, 6.5),
    phev("P270e", 270, "AWD", "8AT", null, null, SUV, 3.9),
  ],

  "landrover-freelander-i": [
    p("1.8 120", 120, "5MT", SUV, "FWD"),
    d("2.0 Di 98", 98, "5MT", SUV, "AWD"),
    p("2.5 V6 177", 177, "5AT", SUV, "AWD"),
  ],
  "landrover-freelander-i-fl": [
    p("1.8 117", 117, "5MT", SUV, "FWD"),
    d("2.0 Td4 112", 112, "5MT", SUV, "AWD"),
    p("2.5 V6 177", 177, "5AT", SUV, "AWD"),
  ],
  "landrover-freelander-ii": [
    d("2.2 TD4 160", 160, "6MT", SUV, "AWD"),
    d("2.2 TD4 160", 160, "6AT", SUV, "AWD"),
    p("3.2 233", 233, "6AT", SUV, "AWD"),
  ],
  "landrover-freelander-ii-fl": [
    d("2.2 TD4 150", 150, "6MT", SUV, "AWD"),
    d("2.2 SD4 190", 190, "6AT", SUV, "AWD"),
    p("2.0 Si4 240", 240, "6AT", SUV, "AWD"),
  ],

  "landrover-range-rover-classic": [
    p("3.5 V8 132", 132, "5MT"),
    p("3.5 V8 132", 132, "4AT"),
    p("3.9 V8 185", 185, "4AT"),
    d("2.5 TD 119", 119, "5MT"),
  ],
  "landrover-range-rover-p38": [
    d("2.5 DT 136", 136, "5MT"),
    d("2.5 DT 136", 136, "4AT"),
    p("4.0 V8 190", 190, "4AT"),
    p("4.6 V8 225", 225, "4AT"),
  ],
  "landrover-range-rover-l322": [
    d("3.0 Td6 177", 177, "5AT", SUV, "AWD"),
    p("4.4 V8 286", 286, "5AT", SUV, "AWD"),
  ],
  "landrover-range-rover-l322-fl": [
    d("3.6 TDV8 272", 272, "6AT", SUV, "AWD"),
    p("4.4 V8 306", 306, "6AT", SUV, "AWD"),
    p("4.2 SC 390", 390, "6AT", SUV, "AWD"),
  ],
  "landrover-range-rover-l322-10": [
    d("4.4 TDV8 313", 313, "8AT", SUV, "AWD"),
    p("5.0 V8 375", 375, "8AT", SUV, "AWD"),
    p("5.0 SC 510", 510, "8AT", SUV, "AWD"),
  ],
  "landrover-range-rover-l405": [
    d("3.0 TDV6 258", 258, "8AT", SUV, "AWD"),
    d("4.4 SDV8 339", 339, "8AT", SUV, "AWD"),
    p("5.0 SC 510", 510, "8AT", SUV, "AWD"),
  ],
  "landrover-range-rover-l405-fl": [
    diesel("D300", 300, "AWD", "8AT", SUV),
    diesel("D350", 350, "AWD", "8AT", SUV),
    petrol("P400", 400, "AWD", "8AT", SUV),
    phev("P400e", 404, "AWD", "8AT", null, null, SUV, null, 297),
    petrol("5.0 SC 525", 525, "AWD", "8AT", SUV),
  ],
  // Finnish 25MY list. PHEV range is the later Finnish 121 km figure.
  "landrover-range-rover-l460": [
    phev("P460e", 460, "AWD", "8AT", null, 121, SUV, 0.6),
    phev("P550e", 550, "AWD", "8AT", null, 121, SUV, 0.6),
    hybrid("D300", 300, "AWD", "8AT", SUV, 7.5),
    hybrid("D350", 350, "AWD", "8AT", SUV, 7.5, 257),
    hybrid("P530", 530, "AWD", "8AT", SUV, 11.3),
  ],
  // Finnish 27MY list: usable battery 118.5 kWh, from 21.9 kWh/100, up to 600 km.
  "landrover-range-rover-electric-electric": [
    bev("EV450", 450, "AWD", 118.5, 600, 21.9, SUV, 330),
    bev("EV550", 550, "AWD", 118.5, 600, null, SUV, 405),
  ],

  "landrover-range-rover-sport-l320": [
    d("2.7 TDV6 190", 190, "6AT", SUV, "AWD"),
    p("4.4 V8 299", 299, "6AT", SUV, "AWD"),
    p("4.2 SC 390", 390, "6AT", SUV, "AWD"),
  ],
  "landrover-range-rover-sport-l320-fl": [
    d("3.0 TDV6 211", 211, "8AT", SUV, "AWD"),
    d("3.0 SDV6 256", 256, "8AT", SUV, "AWD"),
    p("5.0 V8 375", 375, "8AT", SUV, "AWD"),
    p("5.0 SC 510", 510, "8AT", SUV, "AWD"),
  ],
  "landrover-range-rover-sport-l494": [
    d("3.0 TDV6 258", 258, "8AT", SUV, "AWD"),
    d("3.0 SDV6 292", 292, "8AT", SUV, "AWD"),
    p("5.0 SC 510", 510, "8AT", SUV, "AWD"),
    p("SVR 550", 550, "8AT", SUV, "AWD"),
  ],
  "landrover-range-rover-sport-l494-fl": [
    diesel("D300", 300, "AWD", "8AT", SUV),
    petrol("P400", 400, "AWD", "8AT", SUV),
    phev("P400e", 404, "AWD", "8AT", null, null, SUV, null, 297),
    p("SVR 575", 575, "8AT", SUV, "AWD"),
  ],
  // Finnish 24MY list. The Sport page prints 118 km for these plug-in hybrids.
  "landrover-range-rover-sport-l461": [
    phev("P460e", 460, "AWD", "8AT", null, 118, SUV, 0.6),
    phev("P550e", 550, "AWD", "8AT", null, 118, SUV, 0.6),
    hybrid("D250", 250, "AWD", "8AT", SUV, 7.3),
    hybrid("D300", 300, "AWD", "8AT", SUV, 7.3),
    hybrid("D350", 350, "AWD", "8AT", SUV, 7.4, 257),
    hybrid("P635", 635, "AWD", "8AT", SUV, 11.7),
  ],
  // Finnish 27MY list: 118.5 kWh, from 21.8 kWh/100, up to 609 km.
  "landrover-range-rover-sport-electric-electric": [
    bev("EV450", 450, "AWD", 118.5, 609, 21.8, SUV, 330),
    bev("EV550", 550, "AWD", 118.5, 609, null, SUV, 405),
  ],

  "landrover-range-rover-evoque-l538": [
    d("2.2 eD4 150", 150, "6MT", SUV, "FWD"),
    d("2.2 TD4 150", 150, "6MT", SUV, "AWD"),
    d("2.2 SD4 190", 190, "6AT", SUV, "AWD"),
    p("2.0 Si4 240", 240, "6AT", SUV, "AWD"),
  ],
  "landrover-range-rover-evoque-l538-fl": [
    d("2.0 TD4 150", 150, "6MT", SUV, "FWD"),
    d("2.0 TD4 150", 150, "9AT", SUV, "AWD"),
    d("2.0 TD4 180", 180, "9AT", SUV, "AWD"),
    d("2.0 SD4 240", 240, "9AT", SUV, "AWD"),
    p("2.0 Si4 240", 240, "9AT", SUV, "AWD"),
  ],
  "landrover-range-rover-evoque-l551": [
    d("D150", 150, "9AT", SUV, "AWD"),
    d("D180", 180, "9AT", SUV, "AWD"),
    p("P200", 200, "9AT", SUV, "AWD"),
    p("P250", 250, "9AT", SUV, "AWD"),
    p("P300", 300, "9AT", SUV, "AWD"),
    phev("P300e", 309, "AWD", "8AT", null, null, SUV, null, 227),
  ],
  // Finnish 27MY business list.
  "landrover-range-rover-evoque-l551-fl": [
    hybrid("D165", 165, "AWD", "9AT", SUV, 6.3),
    hybrid("D200", 200, "AWD", "9AT", SUV, 6.3),
    hybrid("P160", 160, "FWD", "9AT", SUV, 7.8),
    phev("P270e", 270, "AWD", "8AT", null, null, SUV, 3.7),
  ],

  "landrover-range-rover-velar-l560": [
    d("D180", 180, "8AT", SUV, "AWD"),
    d("D240", 240, "8AT", SUV, "AWD"),
    d("D300", 300, "8AT", SUV, "AWD"),
    p("P250", 250, "8AT", SUV, "AWD"),
    p("P300", 300, "8AT", SUV, "AWD"),
    p("P380", 380, "8AT", SUV, "AWD"),
  ],
  // Finnish 27MY business list.
  "landrover-range-rover-velar-l560-fl": [
    hybrid("D200", 200, "AWD", "8AT", SUV, 6.4),
    hybrid("D300", 300, "AWD", "8AT", SUV, 7.2),
    hybrid("P400", 400, "AWD", "8AT", SUV, 9.6),
    phev("P400e", 404, "AWD", "8AT", null, null, SUV, 4.5, 297),
  ],
};
