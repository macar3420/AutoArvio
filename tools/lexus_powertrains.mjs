/**
 * Lexus powertrains for the cars commonly sold in Finland.
 * Current rows follow the Lexus Finland pages. The stored litre or
 * kWh figure is the best combined WLTP number printed there.
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

const petrol = (name, hp, drive, gear, body, kw) => fuel("petrol", name, hp, drive, gear, body, null, kw);
const diesel = (name, hp, drive, gear, body, kw) => fuel("diesel", name, hp, drive, gear, body, null, kw);
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

const SUV = "SUV";
const SED = "Sedan";
const HB = "Hatchback";
const COUPE = "Coupe";

const h = (name, hp, drive, body, l, kw) => hybrid(name, hp, drive, "eCVT", body, l, kw);

export const LEXUS_MAKE_IDS = ["lexus"];

/** @type {Record<string, object[]>} */
export const LEXUS_POWERTRAINS = {
  "lexus-lbx-lbx": [
    h("200h", 136, "FWD", SUV, null, 100),
    h("200h", 136, "AWD", SUV, null, 100),
  ],

  "lexus-ux-za10": [
    h("250h", 184, "FWD", SUV, null, 135),
    h("250h", 184, "AWD", SUV, null, 135),
  ],
  // Finnish UX page: FWD 200 hp and 5.0 L, AWD 203 hp and 5.6 L.
  "lexus-ux-za10-fl": [
    h("300h", 200, "FWD", SUV, 5.0, 147),
    h("300h", 203, "AWD", SUV, 5.6, 149),
  ],

  "lexus-nx-az10": [
    h("300h", 197, "FWD", SUV, null, 145),
    h("300h", 197, "AWD", SUV, null, 145),
    petrol("200t", 238, "AWD", "6AT", SUV, 175),
  ],
  // European NX 350h table: 200 hp / 147 kW. Best combined 5.7 L FWD and 6.0 L AWD.
  "lexus-nx-az20": [
    h("350h", 200, "FWD", SUV, 5.7, 147),
    h("350h", 200, "AWD", SUV, 6.0, 147),
  ],
  // Same homologation as the Finnish list, which starts at 65 g. Combined EV range up to 72 km.
  "lexus-nx-450h-plus-az20": [
    phev("450h+", 292, "AWD", "eCVT", 18.1, 72, SUV, 2.9, 215),
  ],

  "lexus-rx-xu10": [
    petrol("300", 201, "AWD", "4AT", SUV),
  ],
  "lexus-rx-xu30": [
    petrol("300", 204, "AWD", "5AT", SUV),
    h("400h", 272, "AWD", SUV, null, 200),
  ],
  "lexus-rx-al10": [
    h("450h", 299, "AWD", SUV, null, 220),
  ],
  "lexus-rx-al20": [
    petrol("200t", 238, "AWD", "6AT", SUV, 175),
    h("450h", 313, "AWD", SUV, null, 230),
  ],
  "lexus-rx-al30": [
    h("350h", 250, "AWD", SUV, null, 184),
    hybrid("500h", 371, "AWD", "6AT", SUV, null, 273),
  ],
  // Finnish list prints 75 g, so the lower European range and litre figures are not stored.
  "lexus-rx-450h-plus-al30": [
    phev("450h+", 309, "AWD", "eCVT", 18.1, null, SUV, null, 227),
  ],

  "lexus-rz-i": [
    bev("450e", 313, "AWD", null, null, null, SUV, 230),
  ],
  // Finnish page ranges. Net battery is 72 kWh. Best combined consumption from the matching European sheet.
  "lexus-rz-fl": [
    bev("350e", 224, "FWD", 72, 559, 14.7, SUV, 165),
    bev("500e", 380, "AWD", 72, 493, 16.8, SUV, 280),
    bev("550e", 408, "AWD", 72, 462, 17.9, SUV, 300),
  ],

  "lexus-ct-ct": [
    h("200h", 136, "FWD", HB, null, 100),
  ],

  "lexus-is-xe10": [
    petrol("200", 155, "RWD", "6MT", SED),
    petrol("200", 155, "RWD", "4AT", SED),
    petrol("300", 214, "RWD", "5AT", SED),
  ],
  "lexus-is-xe20": [
    diesel("220d", 177, "RWD", "6MT", SED),
    diesel("220d", 177, "RWD", "6AT", SED),
    petrol("250", 208, "RWD", "6AT", SED),
    petrol("F", 423, "RWD", "8AT", SED, 311),
  ],
  "lexus-is-xe30": [
    petrol("250", 208, "RWD", "6AT", SED),
    h("300h", 223, "RWD", SED, null, 164),
  ],
  "lexus-is-xe30-fl": [
    h("300h", 223, "RWD", SED, null, 164),
  ],

  "lexus-es-vii": [
    h("300h", 218, "FWD", SED, null, 160),
  ],
  // Finnish pages: FWD hybrid 4.8 L, AWD 196 hp / 144 kW and 4.9 L. Electric rows omit the battery, which is not printed.
  "lexus-es-viii": [
    h("300h", 201, "FWD", SED, 4.8, 148),
    h("300h", 196, "AWD", SED, 4.9, 144),
    bev("350e", 224, "FWD", null, 581, 14.6, SED, 165),
    bev("500e", 343, "AWD", null, 529, 15.8, SED, 252),
  ],

  "lexus-gs-s160": [
    petrol("300", 219, "RWD", "5AT", SED),
    petrol("430", 283, "RWD", "5AT", SED),
  ],
  "lexus-gs-s190": [
    petrol("300", 249, "RWD", "6AT", SED),
    h("450h", 345, "RWD", SED, null, 254),
  ],
  "lexus-gs-l10": [
    petrol("250", 209, "RWD", "6AT", SED),
    h("300h", 223, "RWD", SED, null, 164),
    h("450h", 345, "RWD", SED, null, 254),
    petrol("F", 477, "RWD", "8AT", SED, 351),
  ],

  "lexus-ls-xf30": [
    petrol("430", 282, "RWD", "6AT", SED),
  ],
  "lexus-ls-xf40": [
    petrol("460", 380, "RWD", "8AT", SED),
    h("600h", 445, "AWD", SED, null, 327),
  ],
  "lexus-ls-xf50": [
    hybrid("500h", 359, "RWD", "10AT", SED, null, 264),
  ],

  "lexus-rc-xc10": [
    h("300h", 223, "RWD", COUPE, null, 164),
    petrol("F", 477, "RWD", "8AT", COUPE, 351),
  ],
  "lexus-sc-sc-430": [
    petrol("430", 286, "RWD", "6AT", COUPE),
  ],
};
