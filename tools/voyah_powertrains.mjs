/**
 * Voyah engines sold in Finland.
 * Courage and Free use the Finnish site: power, battery and the WLTP
 * range printed for that version. Passion is not on the Finnish importer list.
 */
const W = "WLTP";

function bev(name, hp, kw, bat, range, body) {
  return {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: kw,
    drivetrain: "AWD",
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: W,
  };
}

export const VOYAH_MAKE_IDS = ["voyah"];

export const VOYAH_POWERTRAINS = {
  "voyah-courage-i": [bev("AWD", 429, 320, 80, 470, "SUV")],
  "voyah-free-i": [bev("AWD", 489, 360, 106, 500, "SUV")],
};
