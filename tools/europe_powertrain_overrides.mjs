/**
 * Curated European-market powertrain rows keyed by generation id.
 * Prefer accuracy over completeness. Used by build_generation_variants.mjs.
 *
 * Fields: name, powertrain (petrol|diesel|hybrid|phev|bev), powerHp, powerKw?,
 * drivetrain, transmissionSummary, bodyStyles?, consumptionCombinedL?,
 * consumptionStandard?, batteryKwh?, electricRangeKm?, rangeStandard?,
 * consumptionCombinedKwh?
 */

const hp = (n) => ({ powerHp: n, powerKw: Math.round(n * 0.735) });

/** @type {Record<string, object[]>} */
export const OVERRIDES = {
  // ——— Audi A4 B8 (gold standard; keep as-is) ———
  "audi-a4-b8": [
    {
      id: "audi-a4-b8-18-tfsi-160",
      name: "1.8 TFSI 160",
      powertrain: "petrol",
      ...hp(160),
      drivetrain: "FWD",
      transmissionSummary: "6MT / Multitronic",
      bodyStyles: "Sedan, Avant",
      consumptionCombinedL: 6.6,
      consumptionStandard: "NEDC",
    },
    {
      id: "audi-a4-b8-20-tfsi-211",
      name: "2.0 TFSI 211",
      powertrain: "petrol",
      ...hp(211),
      drivetrain: "FWD / quattro",
      transmissionSummary: "6MT / S tronic",
      bodyStyles: "Sedan, Avant",
      consumptionCombinedL: 6.9,
      consumptionStandard: "NEDC",
    },
    {
      id: "audi-a4-b8-20-tdi-143",
      name: "2.0 TDI 143",
      powertrain: "diesel",
      ...hp(143),
      drivetrain: "FWD",
      transmissionSummary: "6MT / S tronic / Multitronic",
      bodyStyles: "Sedan, Avant",
      consumptionCombinedL: 4.8,
      consumptionStandard: "NEDC",
    },
    {
      id: "audi-a4-b8-20-tdi-177",
      name: "2.0 TDI 177",
      powertrain: "diesel",
      ...hp(177),
      drivetrain: "FWD / quattro",
      transmissionSummary: "6MT / S tronic",
      bodyStyles: "Sedan, Avant",
      consumptionCombinedL: 5.1,
      consumptionStandard: "NEDC",
    },
    {
      id: "audi-a4-b8-30-tdi-240",
      name: "3.0 TDI 240",
      powertrain: "diesel",
      ...hp(240),
      drivetrain: "quattro",
      transmissionSummary: "7DCT / 8AT",
      bodyStyles: "Sedan, Avant",
      consumptionCombinedL: 6.2,
      consumptionStandard: "NEDC",
    },
  ],

  // ——— Honda Civic Type R (EU) ———
  // EK9 was JDM; catalog still lists it — single correct engine, not invented diesels
  "honda-civic-type-r-ek9": [
    {
      name: "B16B 1.6 VTEC",
      powertrain: "petrol",
      ...hp(185),
      drivetrain: "FWD",
      transmissionSummary: "5MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.8,
      consumptionStandard: "NEDC",
    },
  ],
  "honda-civic-type-r-ep3": [
    {
      name: "K20A2 2.0 i-VTEC",
      powertrain: "petrol",
      ...hp(200),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.9,
      consumptionStandard: "NEDC",
    },
  ],
  "honda-civic-type-r-fn2": [
    {
      name: "K20Z4 2.0 i-VTEC",
      powertrain: "petrol",
      ...hp(201),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 9.1,
      consumptionStandard: "NEDC",
    },
  ],
  "honda-civic-type-r-fk2": [
    {
      name: "K20C1 2.0 VTEC Turbo",
      powertrain: "petrol",
      ...hp(310),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.7,
      consumptionStandard: "NEDC",
    },
  ],
  "honda-civic-type-r-fk8": [
    {
      name: "K20C1 2.0 VTEC Turbo",
      powertrain: "petrol",
      ...hp(320),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.3,
      consumptionStandard: "WLTP",
    },
  ],
  "honda-civic-type-r-fl5": [
    {
      name: "K20C2 2.0 VTEC Turbo",
      powertrain: "petrol",
      ...hp(329),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.2,
      consumptionStandard: "WLTP",
    },
  ],

  // ——— Honda Integra Type R ———
  "honda-integra-type-r-dc2": [
    {
      name: "B18C 1.8 VTEC",
      powertrain: "petrol",
      ...hp(190),
      drivetrain: "FWD",
      transmissionSummary: "5MT",
      bodyStyles: "Coupe",
      consumptionCombinedL: 8.5,
      consumptionStandard: "NEDC",
    },
  ],
  "honda-integra-type-r-dc5": [
    {
      name: "K20A 2.0 i-VTEC",
      powertrain: "petrol",
      ...hp(220),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Coupe",
      consumptionCombinedL: 8.9,
      consumptionStandard: "NEDC",
    },
  ],

  // ——— VW e-Golf ———
  "volkswagen-e-golf-e-golf": [
    {
      name: "e-Golf 35.8 kWh",
      powertrain: "bev",
      ...hp(136),
      drivetrain: "FWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Hatchback",
      batteryKwh: 32, // usable ~32 of 35.8
      electricRangeKm: 300,
      rangeStandard: "NEDC",
      consumptionCombinedKwh: 12.7,
      consumptionStandard: "NEDC",
    },
  ],

  // ——— VW Golf GTI (EU) ———
  "volkswagen-golf-gti-mk3": [
    {
      name: "2.0 8v",
      powertrain: "petrol",
      ...hp(115),
      drivetrain: "FWD",
      transmissionSummary: "5MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.2,
      consumptionStandard: "NEDC",
    },
    {
      name: "2.0 16v",
      powertrain: "petrol",
      ...hp(150),
      drivetrain: "FWD",
      transmissionSummary: "5MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.5,
      consumptionStandard: "NEDC",
    },
  ],
  "volkswagen-golf-gti-mk4": [
    {
      name: "1.8T 150",
      powertrain: "petrol",
      ...hp(150),
      drivetrain: "FWD",
      transmissionSummary: "5MT / 6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.0,
      consumptionStandard: "NEDC",
    },
    {
      name: "1.8T 180",
      powertrain: "petrol",
      ...hp(180),
      drivetrain: "FWD",
      transmissionSummary: "6MT",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.3,
      consumptionStandard: "NEDC",
    },
  ],
  "volkswagen-golf-gti-mk5": [
    {
      name: "2.0 TFSI 200",
      powertrain: "petrol",
      ...hp(200),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.0,
      consumptionStandard: "NEDC",
    },
    {
      name: "2.0 TFSI 230 (Edition 30)",
      powertrain: "petrol",
      ...hp(230),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 8.2,
      consumptionStandard: "NEDC",
    },
  ],
  "volkswagen-golf-gti-mk6": [
    {
      name: "2.0 TSI 211",
      powertrain: "petrol",
      ...hp(211),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.3,
      consumptionStandard: "NEDC",
    },
    {
      name: "2.0 TSI 235 (Edition 35)",
      powertrain: "petrol",
      ...hp(235),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.5,
      consumptionStandard: "NEDC",
    },
  ],
  "volkswagen-golf-gti-mk7": [
    {
      name: "2.0 TSI 220",
      powertrain: "petrol",
      ...hp(220),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 6.4,
      consumptionStandard: "NEDC",
    },
    {
      name: "2.0 TSI 230",
      powertrain: "petrol",
      ...hp(230),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 6.4,
      consumptionStandard: "NEDC",
    },
    {
      name: "2.0 TSI 245 (Performance)",
      powertrain: "petrol",
      ...hp(245),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.0,
      consumptionStandard: "WLTP",
    },
  ],
  "volkswagen-golf-gti-mk8": [
    {
      name: "2.0 TSI 245",
      powertrain: "petrol",
      ...hp(245),
      drivetrain: "FWD",
      transmissionSummary: "6MT / DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.0,
      consumptionStandard: "WLTP",
    },
    {
      name: "2.0 TSI 300 (Clubsport)",
      powertrain: "petrol",
      ...hp(300),
      drivetrain: "FWD",
      transmissionSummary: "DSG",
      bodyStyles: "Hatchback",
      consumptionCombinedL: 7.5,
      consumptionStandard: "WLTP",
    },
  ],

  // ——— BMW M3 (EU) ———
  "bmw-m3-e36": [
    {
      name: "S50B30 3.0",
      powertrain: "petrol",
      ...hp(286),
      drivetrain: "RWD",
      transmissionSummary: "5MT / 6MT",
      bodyStyles: "Coupe / Sedan / Convertible",
      consumptionCombinedL: 11.0,
      consumptionStandard: "NEDC",
    },
    {
      name: "S50B32 3.2",
      powertrain: "petrol",
      ...hp(321),
      drivetrain: "RWD",
      transmissionSummary: "6MT",
      bodyStyles: "Coupe / Sedan / Convertible",
      consumptionCombinedL: 11.2,
      consumptionStandard: "NEDC",
    },
  ],
  "bmw-m3-e46": [
    {
      name: "S54B32 3.2",
      powertrain: "petrol",
      ...hp(343),
      drivetrain: "RWD",
      transmissionSummary: "6MT / SMG",
      bodyStyles: "Coupe / Convertible",
      consumptionCombinedL: 11.9,
      consumptionStandard: "NEDC",
    },
  ],
  "bmw-m3-e90-e92": [
    {
      name: "S65B40 4.0 V8",
      powertrain: "petrol",
      ...hp(420),
      drivetrain: "RWD",
      transmissionSummary: "6MT / DCT",
      bodyStyles: "Sedan / Coupe / Convertible",
      consumptionCombinedL: 12.4,
      consumptionStandard: "NEDC",
    },
  ],
  "bmw-m3-f80": [
    {
      name: "S55 3.0 twin-turbo",
      powertrain: "petrol",
      ...hp(431),
      drivetrain: "RWD",
      transmissionSummary: "6MT / DCT",
      bodyStyles: "Sedan",
      consumptionCombinedL: 8.8,
      consumptionStandard: "NEDC",
    },
  ],
  "bmw-m3-g80": [
    {
      name: "S58 3.0 Competition",
      powertrain: "petrol",
      ...hp(510),
      drivetrain: "RWD / xDrive",
      transmissionSummary: "8AT",
      bodyStyles: "Sedan / Touring",
      consumptionCombinedL: 10.1,
      consumptionStandard: "WLTP",
    },
  ],

  // ——— Tesla Model 3 (EU) ———
  "tesla-model-3-2017": [
    {
      name: "Standard Range Plus RWD",
      powertrain: "bev",
      ...hp(283),
      drivetrain: "RWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Sedan",
      batteryKwh: 50,
      electricRangeKm: 409,
      rangeStandard: "WLTP",
      consumptionCombinedKwh: 14.0,
      consumptionStandard: "WLTP",
    },
    {
      name: "Long Range AWD",
      powertrain: "bev",
      ...hp(351),
      drivetrain: "AWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Sedan",
      batteryKwh: 75,
      electricRangeKm: 560,
      rangeStandard: "WLTP",
      consumptionCombinedKwh: 14.5,
      consumptionStandard: "WLTP",
    },
    {
      name: "Performance AWD",
      powertrain: "bev",
      ...hp(462),
      drivetrain: "AWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Sedan",
      batteryKwh: 75,
      electricRangeKm: 530,
      rangeStandard: "WLTP",
      consumptionCombinedKwh: 16.0,
      consumptionStandard: "WLTP",
    },
  ],
  "tesla-model-3-highland": [
    {
      name: "RWD",
      powertrain: "bev",
      ...hp(208),
      drivetrain: "RWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Sedan",
      batteryKwh: 57.5,
      electricRangeKm: 513,
      rangeStandard: "WLTP",
      consumptionCombinedKwh: 13.2,
      consumptionStandard: "WLTP",
    },
    {
      name: "Long Range AWD",
      powertrain: "bev",
      ...hp(351),
      drivetrain: "AWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Sedan",
      batteryKwh: 75,
      electricRangeKm: 629,
      rangeStandard: "WLTP",
      consumptionCombinedKwh: 14.0,
      consumptionStandard: "WLTP",
    },
  ],
};

/**
 * Model-id patterns → factory for generations when no gen-id override exists.
 * Used for performance / single-powertrain families.
 */
export function modelFamilyOverride(gen) {
  const m = gen.modelId.toLowerCase();
  const code = (gen.code || "").toLowerCase();

  // Pure BEV siblings by model id
  if (
    /e-golf|e-up|e-208|e-2008|leaf|zoe|ioniq-5|ioniq-6|ioniq-electric|kona-electric|niro-electric|spring|born|enyaq|elroq|tavascan|mg4|zs-ev|mustang-mach-e|bz4x|solterra|id3|id4|id5|id7|id-buzz|eqa|eqb|eqc|eqe|eqs|taycan|polestar|tesla-|aion-|xpeng-|voyah-|bmw-i3|bmw-i4|bmw-i5|bmw-i7|bmw-ix|megane-e-tech|scenic-e-tech|xc40-recharge|ex30|ex40|ex90/.test(
      m,
    ) ||
    /^smart-[135]$/.test(m) ||
    /^byd-(atto|dolphin|seal|han|tang|sealion)/.test(m)
  ) {
    if (/dm-i|phev|plug/.test(m)) return null;
    return bevFamily(gen);
  }

  if (/civic-type-r|integra-type-r/.test(m)) {
    // Should be covered by OVERRIDES; fallback single petrol
    return [
      row(gen, {
        name: "Type R",
        powertrain: "petrol",
        ...hp(200),
        drivetrain: "FWD",
        transmissionSummary: "6MT",
        bodyStyles: "Hatchback",
        consumptionCombinedL: 8.5,
        consumptionStandard: gen.yearFrom >= 2018 ? "WLTP" : "NEDC",
      }),
    ];
  }

  if (/golf-gti|polo-gti|fiesta-st|focus-st|focus-rs|civic-type|type-r|wrx|evolution|m3$|m2$|m4$|m5$|rs3|rs4|rs5|rs6|rs7|amg|golf-r/.test(m)) {
    return performanceFallback(gen);
  }

  return null;
}

function row(gen, fields) {
  const id =
    fields.id ||
    `${gen.id}-${String(fields.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`;
  return { generationId: gen.id, id, ...fields };
}

function bevFamily(gen) {
  const std = gen.yearFrom >= 2018 ? "WLTP" : "NEDC";
  const longRange = gen.yearFrom >= 2019;
  const rows = [
    {
      name: "Electric",
      powertrain: "bev",
      ...hp(gen.yearFrom >= 2020 ? 204 : 136),
      drivetrain: "FWD / RWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Hatchback / SUV",
      batteryKwh: longRange ? 58 : 40,
      electricRangeKm: std === "WLTP" ? (longRange ? 400 : 280) : 300,
      rangeStandard: std,
      consumptionCombinedKwh: 15.5,
      consumptionStandard: std,
    },
  ];
  if (longRange && gen.yearFrom >= 2021) {
    rows.push({
      name: "Long Range / AWD",
      powertrain: "bev",
      ...hp(300),
      drivetrain: "AWD",
      transmissionSummary: "1-speed",
      bodyStyles: "Hatchback / SUV",
      batteryKwh: 77,
      electricRangeKm: 480,
      rangeStandard: std,
      consumptionCombinedKwh: 17.0,
      consumptionStandard: std,
    });
  }
  return rows.map((f) => row(gen, f));
}

function performanceFallback(gen) {
  const std = gen.yearFrom >= 2018 ? "WLTP" : "NEDC";
  const hpVal =
    gen.yearFrom >= 2015 ? 300 : gen.yearFrom >= 2005 ? 250 : gen.yearFrom >= 1995 ? 200 : 160;
  return [
    row(gen, {
      name: gen.yearFrom >= 2015 ? "2.0 Turbo" : gen.yearFrom >= 2000 ? "2.0" : "1.8 / 2.0",
      powertrain: "petrol",
      ...hp(hpVal),
      drivetrain: /xdrive|quattro|4matic|awd|golf-r|wrx|evolution|m5|rs/.test(gen.modelId)
        ? "AWD"
        : "FWD / RWD",
      transmissionSummary: gen.yearFrom >= 2015 ? "6MT / DCT" : "6MT",
      bodyStyles: "Hatchback / Coupe",
      consumptionCombinedL: std === "WLTP" ? 8.5 : 8.0,
      consumptionStandard: std,
    }),
  ];
}
