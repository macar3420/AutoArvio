/**
 * Maxus powertrains for the cars sold in Finland.
 * Current rows follow the Maxus Finland pages. The stored litre or
 * kWh figure is the best combined WLTP number printed there.
 * A battery figure is the published usable capacity when the page splits it.
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

const diesel = (name, hp, drive, gear, body, l, kw) =>
  fuel("diesel", name, hp, drive, gear, body, l, kw);

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

const VAN = "Van";
const PICKUP = "Pickup";
const MPV = "MPV";
const SUV = "SUV";

export const MAXUS_MAKE_IDS = ["maxus"];

/** @type {Record<string, object[]>} */
export const MAXUS_POWERTRAINS = {
  // Importer pairs 110 kW with 150 hp. The Finnish test prints 7.9 L for the manual.
  "maxus-deliver-7-i": [
    diesel("2.0 150", 150, "FWD", "6MT", VAN, 7.9, 110),
    diesel("2.0 150", 150, "FWD", "9AT", VAN, null, 110),
  ],
  // Finnish page: 88.8 kWh, FWD 362 km / 28.2 kWh, AWD 332 km / 30.6 kWh.
  "maxus-e-deliver-7-i": [
    bev("88.8 kWh", 204, "FWD", 88.8, 362, 28.2, VAN, 150),
    bev("88.8 kWh", 354, "AWD", 88.8, 332, 30.6, VAN, 260),
  ],
  "maxus-e-deliver-5-i": [
    bev("64 kWh", 163, "FWD", 64, 335, 21, VAN, 120),
  ],
  "maxus-eterron-9-i": [
    bev("102.2 kWh", 442, "AWD", 102.2, 430, 26.7, PICKUP, 325),
  ],
  "maxus-deliver-9-i": [
    diesel("2.0 150", 150, "FWD", "6MT", VAN, null, 110),
  ],
  "maxus-t60-max-i": [
    diesel("2.0 215", 215, "AWD", "8AT", PICKUP, null, 158),
  ],

  // Finnish refresh: 50.2 kWh, combined range up to 253 km. Power is the 118 kW motor.
  "maxus-e-deliver-3-i": [
    bev("50.2 kWh", 160, "FWD", 50.2, 253, null, VAN, 118),
  ],
  // Importer list: 200 hp / 147 kW. Best range and consumption are the 88.55 kWh van.
  "maxus-e-deliver-9-i": [
    bev("72 kWh", 200, "FWD", 72, null, null, VAN, 147),
    bev("88.55 kWh", 200, "FWD", 88.55, 296, 32.1, VAN, 147),
  ],
  // Ilta-Sanomat: 85 kWh net, 336 km, 26.4 kWh/100.
  "maxus-t90-ev-i": [
    bev("85 kWh", 177, "RWD", 85, 336, 26.4, PICKUP, 130),
  ],

  "maxus-euniq-5-52-5": [
    bev("52.5 kWh", 177, "FWD", 52.5, 260, null, MPV, 130),
  ],
  "maxus-euniq-5-70": [
    bev("70 kWh", 177, "FWD", 70, 345, null, MPV, 130),
  ],
  "maxus-euniq-6-i": [
    bev("70 kWh", 177, "FWD", 70, 345, null, SUV, 130),
  ],
  "maxus-mifa-9-i": [
    bev("90 kWh", 245, "FWD", 90, 430, null, MPV, 180),
  ],
};
