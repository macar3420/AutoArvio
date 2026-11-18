/**
 * Honda powertrains for the cars commonly sold in Finland.
 * Current hybrids follow the Honda Finland price list and the matching
 * European WLTP sheets. Older rows are the European engines of that generation.
 * Litres are stored only when a combined brochure figure is known.
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

function phev(name, hp, drive, gear, l, bat, erange, kwh100, body, kw) {
  const row = fuel("phev", name, hp, drive, gear, body, l, kw);
  if (bat != null) row.batteryKwh = bat;
  if (erange != null) {
    row.electricRangeKm = erange;
    row.rangeStandard = W;
  }
  if (kwh100 != null) row.consumptionCombinedKwh = kwh100;
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
const HB = "Hatchback";
const HW = "Hatchback, Wagon";
const SW = "Sedan, Wagon";
const COUPE = "Coupe";
const MPV = "MPV";

const p = (name, hp, gear, body, drive = "FWD") => petrol(name, hp, drive, gear, body);
const d = (name, hp, gear, body, drive = "FWD") => diesel(name, hp, drive, gear, body);

export const HONDA_MAKE_IDS = ["honda"];

/** @type {Record<string, object[]>} */
export const HONDA_POWERTRAINS = {
  "honda-jazz-i": [
    p("1.2 78", 78, "5MT", HB),
    p("1.4 83", 83, "5MT", HB),
    p("1.4 83", 83, "CVT", HB),
  ],
  "honda-jazz-ii": [
    p("1.2 90", 90, "5MT", HB),
    p("1.4 100", 100, "5MT", HB),
    p("1.4 100", 100, "i-SHIFT", HB),
  ],
  "honda-jazz-ii-fl": [
    p("1.2 90", 90, "5MT", HB),
    p("1.4 100", 100, "5MT", HB),
    hybrid("1.3 Hybrid 98", 98, "FWD", "CVT", HB),
  ],
  "honda-jazz-iii": [
    p("1.3 102", 102, "6MT", HB),
    p("1.3 102", 102, "CVT", HB),
    p("1.5 130", 130, "6MT", HB),
    p("1.5 130", 130, "CVT", HB),
  ],
  // Finnish list: 90 kW / 122 hp. 4.6 L is the best European combined figure.
  "honda-jazz-iv": [
    hybrid("1.5 e:HEV 122", 122, "FWD", "eCVT", HB, 4.6, 90),
  ],

  "honda-civic-vi": [
    p("1.4 75", 75, "5MT", HB),
    p("1.4 90", 90, "5MT", HB),
    p("1.5 VTEC 114", 114, "5MT", HB),
    p("1.6 VTi 160", 160, "5MT", HB),
  ],
  "honda-civic-vii": [
    p("1.4 90", 90, "5MT", HB),
    p("1.6 110", 110, "5MT", HB),
    d("1.7 CTDi 100", 100, "5MT", HB),
  ],
  "honda-civic-viii": [
    p("1.4 83", 83, "6MT", HW),
    p("1.8 140", 140, "6MT", HW),
    p("1.8 140", 140, "i-SHIFT", HW),
    d("2.2 i-CTDi 140", 140, "6MT", HW),
  ],
  "honda-civic-viii-fl": [
    p("1.4 100", 100, "6MT", HW),
    p("1.8 140", 140, "6MT", HW),
    p("1.8 140", 140, "i-SHIFT", HW),
    d("2.2 i-CTDi 140", 140, "6MT", HW),
  ],
  "honda-civic-ix": [
    p("1.4 100", 100, "6MT", HW),
    p("1.8 142", 142, "6MT", HW),
    p("1.8 142", 142, "5AT", HW),
    d("1.6 i-DTEC 120", 120, "6MT", HW),
  ],
  "honda-civic-ix-fl": [
    p("1.4 100", 100, "6MT", HW),
    p("1.8 142", 142, "6MT", HW),
    p("1.8 142", 142, "5AT", HW),
    d("1.6 i-DTEC 120", 120, "6MT", HW),
  ],
  "honda-civic-x": [
    p("1.0 VTEC Turbo 129", 129, "6MT", HW),
    p("1.0 VTEC Turbo 129", 129, "CVT", HW),
    p("1.5 VTEC Turbo 182", 182, "6MT", HW),
    p("1.5 VTEC Turbo 182", 182, "CVT", HW),
    d("1.6 i-DTEC 120", 120, "6MT", HW),
  ],
  // Finnish Civic list: 135 kW / 184 hp, CO2 from 108 g. 4.8 L is the matching combined figure.
  "honda-civic-xi": [
    hybrid("e:HEV 184", 184, "FWD", "eCVT", HB, 4.8, 135),
  ],

  "honda-civic-type-r-ep3": [
    p("2.0 200", 200, "6MT", HB),
  ],
  "honda-civic-type-r-fn2": [
    p("2.0 201", 201, "6MT", HB),
  ],
  "honda-civic-type-r-fk2": [
    p("2.0 310", 310, "6MT", HB),
  ],
  "honda-civic-type-r-fk8": [
    p("2.0 320", 320, "6MT", HB),
  ],
  "honda-civic-type-r-fl5": [
    petrol("2.0 329", 329, "FWD", "6MT", HB, null, 242),
  ],

  "honda-accord-v": [
    p("2.0 131", 131, "5MT", SW),
    p("2.0 131", 131, "4AT", SW),
    p("2.2 VTEC 150", 150, "5MT", SW),
  ],
  "honda-accord-vi": [
    p("1.8 136", 136, "5MT", SW),
    p("2.0 147", 147, "5MT", SW),
    p("2.0 147", 147, "4AT", SW),
    p("2.3 154", 154, "5MT", SW),
    p("3.0 V6 200", 200, "4AT", SW),
    d("2.0 TD 105", 105, "5MT", SW),
  ],
  "honda-accord-vii": [
    p("2.0 155", 155, "5MT", SW),
    p("2.0 155", 155, "5AT", SW),
    p("2.4 190", 190, "6MT", SW),
    p("2.4 190", 190, "5AT", SW),
    d("2.2 i-CTDi 140", 140, "6MT", SW),
    d("2.2 i-CTDi 140", 140, "5AT", SW),
  ],
  "honda-accord-viii": [
    p("2.0 156", 156, "6MT", SW),
    p("2.4 201", 201, "5AT", SW),
    d("2.2 i-DTEC 150", 150, "6MT", SW),
  ],
  "honda-accord-viii-fl": [
    p("2.0 156", 156, "6MT", SW),
    p("2.4 201", 201, "5AT", SW),
    d("2.2 i-DTEC 150", 150, "6MT", SW),
    d("2.2 i-DTEC 180", 180, "5AT", SW),
  ],

  "honda-prelude-iv": [
    p("2.0 133", 133, "5MT", COUPE),
    p("2.0 133", 133, "4AT", COUPE),
    p("2.3 160", 160, "5MT", COUPE),
  ],
  "honda-prelude-v": [
    p("2.0 133", 133, "5MT", COUPE),
    p("2.2 VTi 185", 185, "5MT", COUPE),
  ],
  // Finnish list: 135 kW / 184 hp, CO2 117 g. 5.2 L is the matching combined figure.
  "honda-prelude-vi": [
    hybrid("2.0 e:HEV 184", 184, "FWD", "eCVT", COUPE, 5.2, 135),
  ],

  "honda-cr-v-i": [
    petrol("2.0 128", 128, "AWD", "5MT", SUV),
    petrol("2.0 128", 128, "AWD", "4AT", SUV),
  ],
  "honda-cr-v-ii": [
    petrol("2.0 150", 150, "AWD", "5MT", SUV),
    petrol("2.0 150", 150, "AWD", "4AT", SUV),
  ],
  "honda-cr-v-ii-fl": [
    petrol("2.0 150", 150, "AWD", "5MT", SUV),
    petrol("2.0 150", 150, "AWD", "4AT", SUV),
    diesel("2.2 i-CTDi 140", 140, "AWD", "6MT", SUV),
  ],
  "honda-cr-v-iii": [
    petrol("2.0 150", 150, "AWD", "6MT", SUV),
    petrol("2.0 150", 150, "AWD", "5AT", SUV),
    diesel("2.2 i-CTDi 140", 140, "AWD", "6MT", SUV),
  ],
  "honda-cr-v-iii-fl": [
    petrol("2.0 150", 150, "AWD", "6MT", SUV),
    petrol("2.0 150", 150, "AWD", "5AT", SUV),
    diesel("2.2 i-DTEC 150", 150, "AWD", "6MT", SUV),
    diesel("2.2 i-DTEC 150", 150, "AWD", "5AT", SUV),
  ],
  "honda-cr-v-iv": [
    petrol("2.0 155", 155, "AWD", "6MT", SUV),
    petrol("2.0 155", 155, "AWD", "5AT", SUV),
    diesel("2.2 i-DTEC 150", 150, "AWD", "6MT", SUV),
    diesel("2.2 i-DTEC 150", 150, "AWD", "5AT", SUV),
  ],
  "honda-cr-v-iv-fl": [
    petrol("2.0 155", 155, "AWD", "5AT", SUV),
    diesel("1.6 i-DTEC 120", 120, "FWD", "6MT", SUV),
    diesel("1.6 i-DTEC 160", 160, "AWD", "6MT", SUV),
    diesel("1.6 i-DTEC 160", 160, "AWD", "9AT", SUV),
  ],
  "honda-cr-v-v": [
    petrol("1.5 VTEC Turbo 173", 173, "AWD", "CVT", SUV),
    hybrid("e:HEV 184", 184, "FWD", "eCVT", SUV),
    hybrid("e:HEV 184", 184, "AWD", "eCVT", SUV),
  ],
  // FWD 5.9 L and AWD 6.7 L are on the Finnish CR-V page.
  // PHEV 2.6 L, 11.7 kWh/100 and 78 km match the price-list CO2 of 60 g.
  // Battery is the European 17.7 kWh pack.
  "honda-cr-v-vi": [
    hybrid("e:HEV 184", 184, "FWD", "eCVT", SUV, 5.9, 135),
    hybrid("e:HEV 184", 184, "AWD", "eCVT", SUV, 6.7, 135),
    phev("e:PHEV 184", 184, "FWD", "eCVT", 2.6, 17.7, 78, 11.7, SUV, 135),
  ],

  "honda-hr-v-i": [
    p("1.6 105", 105, "5MT", SUV),
    p("1.6 105", 105, "CVT", SUV),
    p("1.6 VTEC 124", 124, "5MT", SUV),
  ],
  "honda-hr-v-ii": [
    p("1.5 130", 130, "6MT", SUV),
    p("1.5 130", 130, "CVT", SUV),
    d("1.6 i-DTEC 120", 120, "6MT", SUV),
  ],
  "honda-hr-v-ii-fl": [
    p("1.5 130", 130, "CVT", SUV),
    p("1.5 VTEC Turbo 182", 182, "CVT", SUV),
    d("1.6 i-DTEC 120", 120, "6MT", SUV),
  ],
  // Finnish list: 96 kW / 131 hp, CO2 122 g. 5.4 L matches that CO2.
  "honda-hr-v-iii": [
    hybrid("1.5 e:HEV 131", 131, "FWD", "eCVT", SUV, 5.4, 96),
  ],

  // Finnish list: 135 kW / 184 hp. 5.8 L is the best European combined figure.
  "honda-zr-v-zr-v": [
    hybrid("2.0 e:HEV 184", 184, "FWD", "eCVT", SUV, 5.8, 135),
  ],

  "honda-fr-v-fr-v": [
    p("1.7 125", 125, "6MT", MPV),
    p("1.8 140", 140, "6MT", MPV),
    p("2.0 150", 150, "6MT", MPV),
    p("2.0 150", 150, "5AT", MPV),
    d("2.2 i-CTDi 140", 140, "6MT", MPV),
  ],

  "honda-cr-z-i": [
    hybrid("1.5 Hybrid 124", 124, "FWD", "6MT", COUPE),
    hybrid("1.5 Hybrid 124", 124, "FWD", "CVT", COUPE),
  ],
  "honda-cr-z-fl": [
    hybrid("1.5 Hybrid 137", 137, "FWD", "6MT", COUPE),
    hybrid("1.5 Hybrid 137", 137, "FWD", "CVT", COUPE),
  ],

  "honda-insight-ii": [
    hybrid("1.3 Hybrid 88", 88, "FWD", "CVT", HB),
  ],

  // European Honda e: 35.5 kWh. 222 km is the best WLTP range, on the 136 hp car.
  "honda-e-e": [
    bev("136", 136, "RWD", 35.5, 222, null, HB, 100),
    bev("154", 154, "RWD", 35.5, 210, null, HB, 113),
  ],
  "honda-e-ny1-e-ny1": [
    bev("e:Ny1", 204, "FWD", 68.8, 412, null, SUV, 150),
  ],
};
