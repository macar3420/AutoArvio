/**
 * Suzuki engines for the cars sold in Finland after 2005.
 * Current Swift, Vitara, S-Cross, e Vitara and Across use the Finnish
 * technical sheets. A 12-volt or 48-volt pack is a hybrid, not a traction
 * battery. A printed consumption span is left blank.
 * Swift Sport is an engine of Swift. SX4 S-Cross is the first S-Cross.
 */
const k = (hp) => Math.round(hp * 0.735);
const W = "WLTP";

function row(kind, name, hp, drive, gear, body, opts = {}) {
  const out = {
    name,
    powertrain: kind,
    powerHp: hp,
    powerKw: opts.kw ?? k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
  };
  if (opts.l != null) {
    out.consumptionCombinedL = opts.l;
    out.consumptionStandard = W;
  }
  if (opts.bat != null) out.batteryKwh = opts.bat;
  if (opts.range != null) {
    out.electricRangeKm = opts.range;
    out.rangeStandard = W;
  }
  if (opts.kwh100 != null) out.consumptionCombinedKwh = opts.kwh100;
  return out;
}

const petrol = (name, hp, drive, gear, body, opts) => row("petrol", name, hp, drive, gear, body, opts);
const diesel = (name, hp, drive, gear, body) => row("diesel", name, hp, drive, gear, body);
const hybrid = (name, hp, drive, gear, body, opts) => row("hybrid", name, hp, drive, gear, body, opts);
const phev = (name, hp, drive, gear, body, opts) => row("phev", name, hp, drive, gear, body, opts);
const bev = (name, hp, drive, body, opts) => row("bev", name, hp, drive, "1-speed", body, opts);

const HB = "Hatchback";
const SUV = "SUV";
const SW = "Sedan, Hatchback";
const WAG = "Wagon";

export const SUZUKI_MAKE_IDS = ["suzuki"];

export const SUZUKI_POWERTRAINS = {
  "suzuki-across-xa50": [
    phev("2.5 Plug-in Hybrid", 306, "AWD", "eCVT", SUV, { bat: 18.1, range: 75, l: 1.0 }),
  ],
  "suzuki-alto-iv": [petrol("1.1", 63, "FWD", "5MT", HB)],
  "suzuki-alto-gf": [
    petrol("1.0", 68, "FWD", "5MT", HB),
    petrol("1.0", 68, "FWD", "4AT", HB),
  ],
  "suzuki-e-vitara-i": [
    bev("Electric", 183, "AWD", SUV, { bat: 61, range: 395, kwh100: 16.6 }),
  ],
  "suzuki-grand-vitara-jt": [
    petrol("1.6", 106, "AWD", "5MT", SUV),
    petrol("2.0", 140, "AWD", "5MT", SUV),
    petrol("2.0", 140, "AWD", "4AT", SUV),
    diesel("1.9 DDiS", 129, "AWD", "5MT", SUV),
  ],
  "suzuki-ignis-fh": [
    petrol("1.3", 94, "FWD", "5MT", HB),
    petrol("1.5", 99, "FWD", "5MT", HB),
    petrol("1.5", 99, "AWD", "5MT", HB),
    diesel("1.3 DDiS", 70, "FWD", "5MT", HB),
  ],
  "suzuki-ignis-mf": [
    petrol("1.2 Dualjet", 90, "FWD", "5MT", SUV),
    petrol("1.2 Dualjet", 90, "FWD", "CVT", SUV),
    hybrid("1.2 Dualjet Hybrid", 83, "FWD", "5MT", SUV),
    hybrid("1.2 Dualjet Hybrid", 83, "FWD", "CVT", SUV),
    hybrid("1.2 Dualjet Hybrid", 83, "AWD", "5MT", SUV),
  ],
  "suzuki-jimny-jb": [
    petrol("1.3", 85, "AWD", "5MT", SUV),
    petrol("1.3", 85, "AWD", "4AT", SUV),
  ],
  "suzuki-jimny-gj": [
    petrol("1.5", 102, "AWD", "5MT", SUV),
    petrol("1.5", 102, "AWD", "4AT", SUV),
  ],
  "suzuki-liana-er": [
    petrol("1.6", 106, "FWD", "5MT", SW),
    petrol("1.6", 106, "FWD", "4AT", SW),
    petrol("1.6", 106, "AWD", "5MT", SW),
    diesel("1.4 DDiS", 90, "FWD", "5MT", SW),
  ],
  "suzuki-s-cross-jy": [
    petrol("1.6", 120, "FWD", "5MT", SUV),
    petrol("1.6", 120, "FWD", "CVT", SUV),
    petrol("1.6", 120, "AWD", "5MT", SUV),
    petrol("1.6", 120, "AWD", "CVT", SUV),
    diesel("1.6 DDiS", 120, "FWD", "6MT", SUV),
    diesel("1.6 DDiS", 120, "AWD", "6MT", SUV),
    petrol("1.0 Boosterjet", 111, "FWD", "6MT", SUV),
    petrol("1.4 Boosterjet", 140, "FWD", "6MT", SUV),
    petrol("1.4 Boosterjet", 140, "AWD", "6MT", SUV),
    petrol("1.4 Boosterjet", 140, "AWD", "6AT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 129, "AWD", "6MT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 129, "AWD", "6AT", SUV),
  ],
  "suzuki-s-cross-ii": [
    hybrid("1.4 Boosterjet Hybrid", 129, "AWD", "6MT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 129, "AWD", "6AT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 110, "AWD", "6MT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 110, "AWD", "6AT", SUV, { l: 6.1 }),
    hybrid("1.5 Hybrid", 115, "AWD", "6AGS", SUV),
  ],
  "suzuki-splash-ex": [
    petrol("1.0", 65, "FWD", "5MT", HB),
    petrol("1.2", 86, "FWD", "5MT", HB),
    petrol("1.2", 86, "FWD", "4AT", HB),
    diesel("1.3 DDiS", 75, "FWD", "5MT", HB),
  ],
  "suzuki-swace-e210": [
    hybrid("1.8 Hybrid", 122, "FWD", "eCVT", WAG),
    hybrid("1.8 Hybrid", 140, "FWD", "eCVT", WAG),
  ],
  "suzuki-swift-rs": [
    petrol("1.3", 92, "FWD", "5MT", HB),
    petrol("1.5", 102, "FWD", "5MT", HB),
    petrol("1.5", 102, "FWD", "4AT", HB),
    petrol("1.6 Sport", 125, "FWD", "5MT", HB),
    diesel("1.3 DDiS", 75, "FWD", "5MT", HB),
  ],
  "suzuki-swift-fz": [
    petrol("1.2", 94, "FWD", "5MT", HB),
    petrol("1.2", 94, "FWD", "CVT", HB),
    petrol("1.2 Dualjet", 90, "FWD", "5MT", HB),
    petrol("1.2 Dualjet", 90, "FWD", "CVT", HB),
    petrol("1.6 Sport", 136, "FWD", "6MT", HB),
    diesel("1.3 DDiS", 75, "FWD", "5MT", HB),
  ],
  "suzuki-swift-az": [
    petrol("1.2 Dualjet", 90, "FWD", "5MT", HB),
    petrol("1.2 Dualjet", 90, "FWD", "CVT", HB),
    hybrid("1.2 Dualjet Hybrid", 83, "FWD", "5MT", HB),
    hybrid("1.2 Dualjet Hybrid", 83, "AWD", "5MT", HB),
    petrol("1.0 Boosterjet", 111, "FWD", "6MT", HB),
    petrol("1.0 Boosterjet", 111, "FWD", "6AT", HB),
    petrol("1.4 Sport", 140, "FWD", "6MT", HB),
    hybrid("1.4 Sport Hybrid", 129, "FWD", "6MT", HB),
  ],
  "suzuki-swift-a": [
    hybrid("1.2 Hybrid", 82, "FWD", "5MT", HB, { kw: 61, l: 4.4 }),
    hybrid("1.2 Hybrid", 82, "FWD", "CVT", HB, { kw: 61, l: 4.7 }),
    hybrid("1.2 Hybrid", 82, "AWD", "5MT", HB, { kw: 61, l: 4.9 }),
  ],
  "suzuki-sx4-gy": [
    petrol("1.6", 120, "FWD", "5MT", SW),
    petrol("1.6", 120, "FWD", "CVT", SW),
    petrol("1.6", 120, "AWD", "5MT", SW),
    diesel("1.9 DDiS", 120, "FWD", "6MT", SW),
    diesel("2.0 DDiS", 135, "FWD", "6MT", SW),
  ],
  "suzuki-vitara-ly": [
    petrol("1.6", 120, "FWD", "5MT", SUV),
    petrol("1.6", 120, "AWD", "5MT", SUV),
    petrol("1.6", 120, "AWD", "6AT", SUV),
    petrol("1.0 Boosterjet", 111, "FWD", "6MT", SUV),
    petrol("1.4 Boosterjet", 140, "FWD", "6MT", SUV),
    petrol("1.4 Boosterjet", 140, "AWD", "6AT", SUV),
    diesel("1.6 DDiS", 120, "FWD", "6MT", SUV),
    diesel("1.6 DDiS", 120, "AWD", "6MT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 129, "AWD", "6AT", SUV),
    hybrid("1.5 Hybrid", 115, "AWD", "6AGS", SUV),
    hybrid("1.4 Boosterjet Hybrid", 110, "FWD", "6MT", SUV, { l: 5.3 }),
    hybrid("1.4 Boosterjet Hybrid", 110, "FWD", "6AT", SUV),
    hybrid("1.4 Boosterjet Hybrid", 110, "AWD", "6MT", SUV, { l: 5.4 }),
    hybrid("1.4 Boosterjet Hybrid", 110, "AWD", "6AT", SUV),
  ],
};
