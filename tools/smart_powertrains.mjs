/**
 * smart engines sold in Finland.
 * #1 and #3 ranges and consumption are the Finnish site figures.
 * #5 is the Finnish importer table: gross battery, power and WLTP range.
 * BRABUS is a version of the parent. The old electric drive has no WLTP
 * range on the Finnish sources, so the range is omitted.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function petrol(name, hp, gear, body) {
  return {
    name,
    powertrain: "petrol",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: "RWD",
    transmissionSummary: gear,
    bodyStyles: body,
  };
}

function diesel(name, hp, gear, body) {
  return {
    name,
    powertrain: "diesel",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: "RWD",
    transmissionSummary: gear,
    bodyStyles: body,
  };
}

function bev(name, hp, drive, body, opts = {}) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: opts.kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
  };
  if (opts.bat != null) row.batteryKwh = opts.bat;
  if (opts.range != null) {
    row.electricRangeKm = opts.range;
    row.rangeStandard = W;
  }
  if (opts.kwh100 != null) row.consumptionCombinedKwh = opts.kwh100;
  return row;
}

const CC = "Coupe, Cabrio";
const HB = "Hatchback";
const SUV = "SUV";

export const SMART_MAKE_IDS = ["smart"];

export const SMART_POWERTRAINS = {
  "smart-1-i": [
    bev("Pro", 272, "RWD", SUV, { bat: 49, kw: 200, range: 310, kwh100: 18.1 }),
    bev("Pro+", 272, "RWD", SUV, { bat: 66, kw: 200, range: 420, kwh100: 17.4 }),
    bev("Pulse", 368, "AWD", SUV, { bat: 66, kw: 271, range: 400, kwh100: 18.2 }),
    bev("BRABUS", 428, "AWD", SUV, { bat: 66, kw: 315, range: 400, kwh100: 18.2 }),
  ],
  "smart-3-i": [
    bev("Pro+", 272, "RWD", SUV, { bat: 66, kw: 200, range: 435, kwh100: 16.8 }),
    bev("Pulse", 368, "AWD", SUV, { bat: 66, kw: 271, range: 415, kwh100: 17.6 }),
    bev("BRABUS", 428, "AWD", SUV, { bat: 66, kw: 315, range: 415, kwh100: 17.6 }),
  ],
  "smart-5-i": [
    bev("Pro", 340, "RWD", SUV, { bat: 76, kw: 250, range: 465 }),
    bev("Pro+", 363, "RWD", SUV, { bat: 100, kw: 267, range: 590 }),
    bev("Pulse", 588, "AWD", SUV, { bat: 100, kw: 432, range: 540 }),
    bev("BRABUS", 646, "AWD", SUV, { bat: 100, kw: 475, range: 540, kwh100: 19.9 }),
  ],
  "smart-forfour-w454": [
    petrol("1.1", 64, "5MT", HB),
    petrol("1.3", 95, "5MT", HB),
    petrol("1.5", 109, "5MT", HB),
    diesel("1.5 CDI", 95, "5MT", HB),
  ],
  "smart-forfour-w453": [
    petrol("1.0", 71, "5MT", HB),
    petrol("0.9", 90, "6AT", HB),
    bev("Electric", 82, "RWD", HB, { bat: 17.6, kw: 60 }),
  ],
  "smart-fortwo-450": [
    petrol("0.6", 45, "6AT", CC),
    petrol("0.7", 61, "6AT", CC),
    petrol("0.7 Brabus", 75, "6AT", CC),
  ],
  "smart-fortwo-451": [
    petrol("1.0", 71, "5MT", CC),
    petrol("1.0", 84, "5MT", CC),
    diesel("0.8 CDI", 45, "5MT", CC),
    bev("Electric", 75, "RWD", CC, { bat: 17.6 }),
  ],
  "smart-fortwo-453": [
    petrol("1.0", 71, "5MT", CC),
    petrol("0.9", 90, "6AT", CC),
    bev("Electric", 82, "RWD", CC, { bat: 17.6, kw: 60 }),
  ],
};
