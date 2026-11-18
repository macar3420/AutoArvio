/**
 * XPeng engines sold in Finland.
 * G6, G9, L03, P7+ and X9 use the Finnish price lists. Batteries are the
 * net figures those lists print. The first G6, G9 and P7 are the earlier
 * European cars, without a consumption figure.
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

const SUV = "SUV";
const SC = "SUV, Coupe";
const SED = "Sedan";
const FAST = "Fastback";
const MPV = "MPV";

export const XPENG_MAKE_IDS = ["xpeng"];

export const XPENG_POWERTRAINS = {
  "xpeng-g6-i": [
    bev("Standard Range", 258, "RWD", SUV, { bat: 66, kw: 190 }),
    bev("Long Range", 286, "RWD", SUV, { bat: 87.5, kw: 210 }),
    bev("Performance", 476, "AWD", SUV, { bat: 87.5, kw: 350 }),
  ],
  "xpeng-g6-ii": [
    bev("Standard Range", 252, "RWD", SUV, { bat: 67.8, kw: 185, range: 470, kwh100: 16.9 }),
    bev("Long Range", 296, "RWD", SUV, { bat: 80, kw: 218, range: 525, kwh100: 17.9 }),
    bev("Performance", 489, "AWD", SUV, { bat: 80, kw: 358, range: 510, kwh100: 18.4 }),
  ],
  "xpeng-g9-i": [
    bev("Long Range", 313, "RWD", SUV, { kw: 230 }),
    bev("Performance", 551, "AWD", SUV, { kw: 405 }),
  ],
  "xpeng-g9-ii": [
    bev("Standard Range", 351, "RWD", SUV, { bat: 78.2, kw: 258, range: 502, kwh100: 18.4 }),
    bev("Long Range", 351, "RWD", SUV, { bat: 92.2, kw: 258, range: 585, kwh100: 18.6 }),
    bev("Performance", 575, "AWD", SUV, { bat: 92.2, kw: 423, range: 540, kwh100: 20.1 }),
  ],
  "xpeng-l03-i": [
    bev("Standard Range", 222, "RWD", SC, { bat: 58.2, kw: 163, range: 445, kwh100: 15.3 }),
    bev("Long Range", 249, "RWD", SC, { bat: 71.1, kw: 183, range: 520, kwh100: 16 }),
    bev("Performance", 431, "AWD", SC, { bat: 71.1, kw: 317, range: 440, kwh100: 18.4 }),
  ],
  "xpeng-p7-i": [
    bev("Long Range", 276, "RWD", SED, { kw: 203 }),
    bev("Performance", 473, "AWD", SED, { kw: 348 }),
  ],
  "xpeng-p7-plus": [
    bev("Standard Range", 245, "RWD", FAST, { bat: 59.6, kw: 180, range: 450, kwh100: 15.4 }),
    bev("Long Range", 313, "RWD", FAST, { bat: 74.9, kw: 230, range: 550, kwh100: 15.9 }),
    bev("Performance", 503, "AWD", FAST, { bat: 74.9, kw: 370, range: 500, kwh100: 17.5 }),
  ],
  "xpeng-x9-i": [
    bev("Standard Range", 320, "FWD", MPV, { bat: 94.8, kw: 235, range: 535, kwh100: 20.2 }),
    bev("Long Range", 320, "FWD", MPV, { bat: 110, kw: 235, range: 615, kwh100: 20 }),
    bev("Performance", 503, "AWD", MPV, { bat: 110, kw: 370, range: 580, kwh100: 20.8 }),
  ],
};
