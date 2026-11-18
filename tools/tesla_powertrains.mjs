/**
 * Tesla powertrains for the cars sold in Finland.
 * Model 3 and Model Y ranges and Model Y consumption are the Finnish
 * configurator figures. Tesla Finland does not print kilowatts, so the
 * horsepower is the European rating for that motor. Batteries are omitted
 * where the sources disagree on net versus gross.
 * Model S and Model X leave the configurator at the Plaid generation.
 * Cybertruck is not in the Finnish lineup.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

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

const SED = "Sedan";
const SUV = "SUV";
const ROAD = "Roadster";

export const TESLA_MAKE_IDS = ["tesla"];

export const TESLA_POWERTRAINS = {
  "tesla-model-3-i": [
    bev("Rear-wheel drive", 283, "RWD", SED),
    bev("Long Range", 441, "AWD", SED, { kw: 324 }),
    bev("Performance", 513, "AWD", SED, { kw: 377 }),
  ],
  "tesla-model-3-highland": [
    bev("Rear-wheel drive", 283, "RWD", SED, { kw: 208 }),
    bev("Long Range", 498, "AWD", SED, { kw: 366, range: 629 }),
    bev("Performance", 460, "AWD", SED),
  ],
  "tesla-model-3-2026": [
    bev("Rear-wheel drive", 283, "RWD", SED, { kw: 208, range: 572 }),
    bev("Premium Long Range", 320, "RWD", SED, { kw: 235, range: 750 }),
    bev("Premium Long Range", 498, "AWD", SED, { kw: 366, range: 660 }),
    bev("Performance", 460, "AWD", SED, { range: 571 }),
  ],
  "tesla-model-s-i": [
    bev("85", 362, "RWD", SED, { bat: 85 }),
    bev("P85D", 691, "AWD", SED, { bat: 85 }),
  ],
  "tesla-model-s-fl": [
    bev("100D", 422, "AWD", SED, { bat: 100 }),
    bev("P100D", 760, "AWD", SED, { bat: 100 }),
  ],
  "tesla-model-s-plaid": [
    bev("All-wheel drive", 670, "AWD", SED, { range: 744 }),
    bev("Plaid", 1020, "AWD", SED, { kw: 750, range: 611 }),
  ],
  "tesla-model-x-i": [
    bev("100D", 422, "AWD", SUV, { bat: 100 }),
    bev("P100D", 760, "AWD", SUV, { bat: 100 }),
  ],
  "tesla-model-x-plaid": [
    bev("All-wheel drive", 670, "AWD", SUV),
    bev("Plaid", 1020, "AWD", SUV, { kw: 750 }),
  ],
  "tesla-model-y-i": [
    bev("Rear-wheel drive", 299, "RWD", SUV, { kw: 220 }),
    bev("Long Range", 351, "AWD", SUV, { kw: 258 }),
    bev("Performance", 535, "AWD", SUV, { kw: 393 }),
  ],
  "tesla-model-y-juniper": [
    bev("Rear-wheel drive", 299, "RWD", SUV, { kw: 220, range: 525, kwh100: 14.0 }),
    bev("Premium Long Range", 347, "RWD", SUV, { kw: 255, range: 603, kwh100: 14.0 }),
    bev("Premium Long Range", 351, "AWD", SUV, { kw: 258, range: 622, kwh100: 15.6 }),
    bev("Performance", 535, "AWD", SUV, { kw: 393, range: 580, kwh100: 16.2 }),
  ],
  "tesla-roadster-i": [
    bev("Roadster", 248, "RWD", ROAD, { bat: 53 }),
    bev("Sport", 288, "RWD", ROAD, { bat: 53 }),
  ],
};
