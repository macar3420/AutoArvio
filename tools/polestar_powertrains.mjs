/**
 * Polestar engines sold in Finland.
 * Polestar 2 from 2024, and Polestar 3, 4 and 5, use the Finnish spec pages.
 * Polestar 1 uses the 619 hp, 34.2 kWh and 124 km WLTP figures from the Finnish test.
 * The first Polestar 2 is the European car sold here before the 2024 facelift:
 * single motor was front-wheel drive, and the pack was 69 or 78 kWh.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function bev(name, hp, drive, bat, range, body, kwh100) {
  const row = {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: W,
  };
  if (kwh100 != null) row.consumptionCombinedKwh = kwh100;
  return row;
}

const HB = "Hatchback";
const SUV = "SUV";
const SC = "SUV, Coupe";
const GT = "Saloon";

export const POLESTAR_MAKE_IDS = ["polestar"];

export const POLESTAR_POWERTRAINS = {
  "polestar-1-1": [
    {
      name: "1",
      powertrain: "phev",
      powerHp: 619,
      powerKw: k(619),
      drivetrain: "AWD",
      transmissionSummary: "8AT",
      bodyStyles: "Coupe",
      batteryKwh: 34.2,
      electricRangeKm: 124,
      rangeStandard: W,
    },
  ],
  "polestar-2-i": [
    bev("Standard Range", 224, "FWD", 69, 440, HB),
    bev("Long range Single motor", 231, "FWD", 78, 540, HB),
    bev("Long range Dual motor", 408, "AWD", 78, 470, HB),
    bev("Performance", 476, "AWD", 78, 470, HB),
  ],
  "polestar-2-fl": [
    bev("Long range Single motor", 299, "RWD", 82, 659, HB),
    bev("Long range Dual motor", 421, "AWD", 82, 596, HB),
    bev("Performance", 476, "AWD", 82, 568, HB),
  ],
  "polestar-3-3": [
    bev("Rear motor", 333, "RWD", 92, 603, SUV),
    bev("Dual motor", 544, "AWD", 106, 647, SUV),
    bev("Performance", 680, "AWD", 106, 601, SUV),
  ],
  "polestar-4-4": [
    bev("Rear motor", 272, "RWD", 100, 620, SC),
    bev("Dual motor", 544, "AWD", 100, 590, SC),
  ],
  "polestar-5-5": [
    bev("Dual motor", 748, "AWD", 112, 678, GT),
    bev("Performance", 884, "AWD", 112, 558, GT, 21.2),
  ],
};
