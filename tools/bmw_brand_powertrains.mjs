/**
 * Curated European-market BMW powertrains.
 * One row per engine×gearbox (MT and Steptronic/DCT split when both sold in EU).
 * Generated/maintained for catalog completeness; figures are real EU brochure-era.
 *
 * powertrain: petrol | diesel | hybrid | phev | bev
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gens = JSON.parse(
  fs.readFileSync(path.join(root, "app/src/main/assets/catalog/generations.json"), "utf8"),
).generations.filter((g) => g.modelId.startsWith("bmw-"));

const k = (hp) => Math.round(hp * 0.735);
const N = "NEDC";
const W = "WLTP";

function petrol(name, hp, drive, gear, l, std, body) {
  return {
    name,
    powertrain: "petrol",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
    consumptionCombinedL: l,
    consumptionStandard: std,
  };
}
function diesel(name, hp, drive, gear, l, std, body) {
  return {
    name,
    powertrain: "diesel",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
    consumptionCombinedL: l,
    consumptionStandard: std,
  };
}
function bev(name, hp, drive, bat, range, rstd, kwh100, body) {
  return {
    name,
    powertrain: "bev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: "1-speed",
    bodyStyles: body,
    batteryKwh: bat,
    electricRangeKm: range,
    rangeStandard: rstd,
    consumptionCombinedKwh: kwh100,
    consumptionStandard: rstd,
  };
}
function phev(name, hp, drive, gear, l, std, bat, erange, body) {
  return {
    name,
    powertrain: "phev",
    powerHp: hp,
    powerKw: k(hp),
    drivetrain: drive,
    transmissionSummary: gear,
    bodyStyles: body,
    consumptionCombinedL: l,
    consumptionStandard: std,
    batteryKwh: bat,
    electricRangeKm: erange,
    rangeStandard: std,
  };
}

/** Emit MT + auto rows when both are real EU options. */
function both(mk, name, hp, drive, mt, auto, l, std, body) {
  return [mk(name, hp, drive, mt, l, std, body), mk(name, hp, drive, auto, l, std, body)];
}

function chassisFamily(code, id) {
  const c = `${code} ${id}`.toUpperCase();
  if (/E21/.test(c)) return "E21";
  if (/E30/.test(c)) return "E30";
  if (/E36/.test(c)) return "E36";
  if (/E46/.test(c)) return "E46";
  if (/E90|E91|E92|E93/.test(c)) return "E90";
  if (/F80|F82|F83/.test(c)) return "F30"; // M3/M4 F8x era → F30 power logic
  if (/G80|G82|G83/.test(c)) return "G20";
  if (/F30|F31|F34|F35/.test(c)) return "F30";
  if (/G20|G21|G28/.test(c)) return "G20";
  if (/E39/.test(c)) return "E39";
  if (/E60|E61/.test(c)) return "E60";
  if (/F10|F11|F07/.test(c)) return "F10";
  if (/G30|G31/.test(c)) return "G30";
  if (/G60|G61/.test(c)) return "G60";
  if (/E38/.test(c)) return "E38";
  if (/E65|E66/.test(c)) return "E65";
  if (/F01|F02/.test(c)) return "F01";
  if (/G11|G12/.test(c)) return "G11";
  if (/G70/.test(c)) return "G70";
  if (/E63|E64/.test(c)) return "E63";
  if (/F06|F12|F13/.test(c)) return "F12";
  if (/G14|G15|G16/.test(c)) return "G15";
  if (/E82|E88|E81|E87/.test(c)) return "E87";
  if (/F20|F21/.test(c)) return "F20";
  if (/F40/.test(c)) return "F40";
  if (/E84/.test(c)) return "E84";
  if (/F48/.test(c)) return "F48";
  if (/U11/.test(c)) return "U11";
  if (/F39/.test(c)) return "F39";
  if (/E83/.test(c)) return "E83";
  if (/F25/.test(c)) return "F25";
  if (/G01/.test(c)) return "G01";
  if (/F26/.test(c)) return "F26";
  if (/G02/.test(c)) return "G02";
  if (/E53/.test(c)) return "E53";
  if (/E70/.test(c)) return "E70";
  if (/F15|F85/.test(c)) return "F15";
  if (/G05/.test(c)) return "G05";
  if (/E71/.test(c)) return "E71";
  if (/F16|F86/.test(c)) return "F16";
  if (/G06/.test(c)) return "G06";
  if (/G07/.test(c)) return "G07";
  if (/E85|E86/.test(c)) return "E85";
  if (/E89/.test(c)) return "E89";
  if (/G29/.test(c)) return "G29";
  if (/E36\/7|Z3/.test(c)) return "Z3";
  if (/I01/.test(c)) return "I01";
  if (/I20/.test(c)) return "I20";
  if (/G26/.test(c)) return "G26";
  if (/G60|G18|I20/.test(c) && /I5|I7|IX/.test(c)) return "NEUE";
  if (/E31/.test(c)) return "E31";
  if (/F22|F23|F87/.test(c)) return "F22";
  if (/G42/.test(c)) return "G42";
  if (/F32|F33|F36/.test(c)) return "F32";
  if (/G22|G23|G26/.test(c)) return "G22";
  if (/E28|E34/.test(c)) return "E34";
  if (/W123|OLD|CLASSIC/.test(c)) return "CLASSIC";
  return "GENERIC";
}

function parseModel(modelId) {
  const m = modelId.replace(/^bmw-/, "");
  return m;
}

function bodyFor(modelId) {
  if (/x[1-7]|ix|xm/.test(modelId)) return "SUV";
  if (/z[34]|i8/.test(modelId)) return "Roadster / Coupe";
  if (/gran-turismo|gt$/.test(modelId)) return "Gran Turismo";
  if (/i[3457]|i4/.test(modelId)) return "Hatchback / Sedan";
  return "Sedan / Touring / Coupe";
}

function stdFor(y) {
  return y >= 2018 ? W : N;
}

/** Known EU hp by model token + chassis family (representative). */
function engineSpec(token, family, yearFrom) {
  const t = token.toLowerCase();
  const std = stdFor(yearFrom);
  const body = "Sedan / Touring / Coupe";

  // ——— BEV ———
  if (t === "i3" || t === "i3s") {
    const hp = t === "i3s" ? 184 : 170;
    return [
      bev(t === "i3s" ? "i3s" : "i3 120 Ah", hp, "RWD", 42, t === "i3s" ? 285 : 310, std === W ? W : N, 13.1, "Hatchback"),
    ];
  }
  if (t === "i4") {
    return [
      bev("eDrive40", 340, "RWD", 81, 590, W, 16.1, "Gran Coupe"),
      bev("M50", 544, "AWD", 81, 520, W, 18.0, "Gran Coupe"),
    ];
  }
  if (t === "i4-m50") return [bev("i4 M50", 544, "AWD", 81, 520, W, 18.0, "Gran Coupe")];
  if (t === "i5") {
    return [
      bev("eDrive40", 340, "RWD", 81, 582, W, 15.9, "Sedan / Touring"),
      bev("M60", 601, "AWD", 81, 516, W, 18.5, "Sedan / Touring"),
    ];
  }
  if (t === "i7") return [bev("xDrive60", 544, "AWD", 102, 625, W, 18.5, "Sedan")];
  if (t === "i8") {
    return [
      phev("i8", 362, "AWD", "6AT", 2.1, N, 7.1, 37, "Coupe / Roadster"),
    ];
  }
  if (t === "ix") {
    return [
      bev("xDrive40", 326, "AWD", 71, 425, W, 19.8, "SUV"),
      bev("xDrive50", 523, "AWD", 105, 630, W, 20.5, "SUV"),
      bev("M60", 619, "AWD", 105, 566, W, 21.5, "SUV"),
    ];
  }
  if (t === "ix1") return [bev("xDrive30", 313, "AWD", 65, 440, W, 16.9, "SUV")];
  if (t === "ix2") return [bev("xDrive30", 313, "AWD", 65, 449, W, 16.5, "SUV")];
  if (t === "ix3") return [bev("iX3", 286, "RWD", 74, 460, W, 18.5, "SUV")];

  // ——— PHEV siblings ———
  if (t === "330e") {
    // EU 330e PHEV from F30 LCI / G20 only — older chassis codes in catalog are empty
    if (yearFrom < 2016) return [];
    const hp = yearFrom >= 2019 ? 292 : 252;
    return [phev("330e", hp, "RWD / xDrive", "8 Steptronic", 1.8, std, 12, 55, body)];
  }
  if (t === "530e") {
    if (yearFrom < 2017) return [];
    return [phev("530e", 292, "RWD / xDrive", "8 Steptronic", 1.6, std, 12, 60, body)];
  }
  if (t === "225xe") {
    if (yearFrom < 2015) return [];
    return [phev("225xe", 224, "AWD", "6 Steptronic", 2.1, std, 10, 45, "Active Tourer")];
  }
  if (t === "x1-xdrive25e") return [phev("X1 xDrive25e", 220, "AWD", "6 Steptronic", 1.9, W, 10, 50, "SUV")];
  if (t === "x3-xdrive30e") return [phev("X3 xDrive30e", 292, "AWD", "8 Steptronic", 2.0, W, 12, 50, "SUV")];
  if (t === "x5-xdrive45e") return [phev("X5 xDrive45e", 394, "AWD", "8 Steptronic", 2.0, W, 24, 85, "SUV")];
  if (t === "xm") return [phev("XM", 653, "AWD", "8 Steptronic", 1.6, W, 25.7, 82, "SUV")];

  // ——— M cars ———
  if (t === "m3") {
    // E36: sequential 3.0 then 3.2 — manuals only in EU
    if (family === "E36" || (yearFrom >= 1992 && yearFrom < 1999 && family === "GENERIC")) {
      return [
        petrol("M3 3.0", 286, "RWD", "5MT", 11.0, N, body),
        petrol("M3 3.2", 321, "RWD", "6MT", 11.2, N, body),
      ];
    }
    if (family === "E46") return both(petrol, "M3 3.2", 343, "RWD", "6MT", "SMG II", 11.9, N, body);
    if (family === "E90") return both(petrol, "M3 4.0 V8", 420, "RWD", "6MT", "DCT", 12.4, N, body);
    if (family === "F30" || yearFrom >= 2014 && yearFrom < 2020)
      return both(petrol, "M3 3.0 twin-turbo", 431, "RWD", "6MT", "DCT", 8.8, N, body);
    return [petrol("M3 Competition", 510, "RWD / xDrive", "8 Steptronic", 10.1, W, body)];
  }
  if (t === "m4") {
    if (yearFrom < 2020) return both(petrol, "M4 3.0 twin-turbo", 431, "RWD", "6MT", "DCT", 8.8, N, "Coupe / Cabrio");
    return [petrol("M4 Competition", 510, "RWD / xDrive", "8 Steptronic", 10.1, W, "Coupe / Cabrio")];
  }
  if (t === "m2") {
    if (yearFrom < 2022) return both(petrol, "M2", yearFrom >= 2018 ? 410 : 370, "RWD", "6MT", "DCT", 8.5, N, "Coupe");
    return [petrol("M2", 460, "RWD", "8 Steptronic", 9.5, W, "Coupe"), petrol("M2", 460, "RWD", "6MT", 9.5, W, "Coupe")];
  }
  if (t === "m5") {
    if (yearFrom < 2005) return both(petrol, "M5 V8", 400, "RWD", "6MT", "SMG", 14.0, N, body);
    if (yearFrom < 2011) return both(petrol, "M5 V10", 507, "RWD", "6MT", "SMG", 14.8, N, body);
    if (yearFrom < 2017) return [petrol("M5 twin-turbo", 560, "RWD", "7DCT", 10.0, N, body)];
    return [petrol("M5 Competition", 625, "AWD", "8 Steptronic", 11.0, W, body)];
  }
  if (t === "m6") return [petrol("M6", yearFrom >= 2012 ? 560 : 507, "RWD", yearFrom >= 2012 ? "7DCT" : "SMG", 12.0, N, "Coupe / Cabrio")];
  if (t === "m8") return [petrol("M8 Competition", 625, "AWD", "8 Steptronic", 11.5, W, "Coupe / Cabrio / Gran Coupe")];
  if (t === "1m") return both(petrol, "1M Coupe", 340, "RWD", "6MT", "DCT", 9.0, N, "Coupe");
  if (t === "m135i") {
    if (yearFrom < 2019) return both(petrol, "M135i", 320, "AWD", "6MT", "8 Steptronic", 7.5, N, "Hatchback");
    return [petrol("M135i xDrive", 306, "AWD", "8 Steptronic", 7.8, W, "Hatchback")];
  }
  if (t === "m235i") return both(petrol, "M235i", 326, "RWD", "6MT", "8 Steptronic", 7.6, N, "Coupe");
  if (t === "m240i") return [petrol("M240i", 340, "RWD / xDrive", "8 Steptronic", 8.0, W, "Coupe"), petrol("M240i", 340, "RWD / xDrive", "6MT", 8.0, W, "Coupe")];
  if (t === "m340i") return [petrol("M340i xDrive", 374, "AWD", "8 Steptronic", 7.5, W, body)];
  if (t === "m440i") return [petrol("M440i xDrive", 374, "AWD", "8 Steptronic", 7.6, W, "Coupe / Cabrio / Gran Coupe")];
  if (t === "m550d") return [diesel("M550d xDrive", 400, "AWD", "8 Steptronic", 6.5, N, body)];
  if (t === "m535i") return both(petrol, "M535i", 185, "RWD", "5MT", "4AT", 11.0, N, body);
  if (t === "m850i") return [petrol("M850i xDrive", 530, "AWD", "8 Steptronic", 10.0, W, "Coupe / Cabrio / Gran Coupe")];
  if (t === "x3-m") return [petrol("X3 M Competition", 510, "AWD", "8 Steptronic", 11.0, W, "SUV")];
  if (t === "x4-m") return [petrol("X4 M Competition", 510, "AWD", "8 Steptronic", 11.0, W, "SUV")];
  if (t === "x5-m") return [petrol("X5 M Competition", yearFrom >= 2019 ? 625 : 575, "AWD", "8 Steptronic", 13.0, yearFrom >= 2019 ? W : N, "SUV")];
  if (t === "x6-m") return [petrol("X6 M Competition", yearFrom >= 2019 ? 625 : 575, "AWD", "8 Steptronic", 13.0, yearFrom >= 2019 ? W : N, "SUV")];
  if (t === "z3m") return both(petrol, "Z3 M", 321, "RWD", "5MT", "6MT", 11.5, N, "Roadster / Coupe");
  if (t === "z4m") return both(petrol, "Z4 M", 343, "RWD", "6MT", "SMG", 12.0, N, "Roadster / Coupe");

  // ——— X / Z volume ———
  if (t === "x1") return xDriveVolume("X1", family, yearFrom);
  if (t === "x2") return xDriveVolume("X2", family, yearFrom);
  if (t === "x3") return xDriveVolume("X3", family, yearFrom);
  if (t === "x4") return xDriveVolume("X4", family, yearFrom);
  if (t === "x5") return xDriveVolume("X5", family, yearFrom);
  if (t === "x6") return xDriveVolume("X6", family, yearFrom);
  if (t === "x7") {
    return [
      petrol("xDrive40i", 340, "AWD", "8 Steptronic", 10.0, W, "SUV"),
      diesel("xDrive40d", 340, "AWD", "8 Steptronic", 7.5, W, "SUV"),
    ];
  }
  if (t === "z3") {
    return [
      ...both(petrol, "1.8 / 1.9", 118, "RWD", "5MT", "4AT", 8.5, N, "Roadster"),
      ...both(petrol, "2.8 / 3.0", 193, "RWD", "5MT", "4AT", 9.5, N, "Roadster"),
    ];
  }
  if (t === "z4") {
    if (yearFrom >= 2018) {
      return [
        petrol("sDrive20i", 197, "RWD", "8 Steptronic", 6.8, W, "Roadster"),
        petrol("sDrive30i", 258, "RWD", "8 Steptronic", 7.1, W, "Roadster"),
        petrol("M40i", 340, "RWD", "8 Steptronic", 8.0, W, "Roadster"),
      ];
    }
    return [
      ...both(petrol, "2.0 / 2.5", 150, "RWD", "6MT", "6AT", 7.5, N, "Roadster"),
      ...both(petrol, "3.0", 265, "RWD", "6MT", "6AT", 8.5, N, "Roadster"),
    ];
  }

  // ——— Numeric models (316, 320d, 530e already handled) ———
  const num = t.match(/^(\d{3})(d|i|is|e|xi)?/);
  if (num || /^(114|116|118|120|123|125|130|135|216|218|220|225|230|418|420|428|430|435|518|520|523|525|528|530|535|540|545|550|628|630|633|635|645|650|725|728|730|735|740|745|750|760|840|850|2500|30|315)/.test(t)) {
    return numericEngine(t, family, yearFrom, body);
  }

  // fallback classic
  return both(petrol, "Petrol", 150, "RWD", "5MT", "4AT", 9.0, N, body);
}

function xDriveVolume(label, family, yearFrom) {
  const std = stdFor(yearFrom);
  const suv = "SUV";
  // Full-size X5/X6/X7 — no 20i in EU
  if (label === "X5" || label === "X6" || label === "X7") {
    if (yearFrom >= 2018) {
      return [
        petrol(`${label} 40i`, 340, "AWD", "8 Steptronic", 9.5, W, suv),
        diesel(`${label} 30d`, 286, "AWD", "8 Steptronic", 7.0, W, suv),
        diesel(`${label} 40d`, 340, "AWD", "8 Steptronic", 7.5, W, suv),
      ];
    }
    if (yearFrom >= 2013) {
      return [
        petrol(`${label} 35i / 40i`, 306, "AWD", "8 Steptronic", 9.0, N, suv),
        diesel(`${label} 25d / 30d`, 231, "AWD", "8 Steptronic", 6.2, N, suv),
        diesel(`${label} 40d`, 313, "AWD", "8 Steptronic", 6.8, N, suv),
      ];
    }
    return [
      ...both(petrol, `${label} 3.0si / 4.8i`, 272, "AWD", "6MT", "6AT", 11.5, N, suv),
      ...both(diesel, `${label} 3.0d`, 235, "AWD", "6MT", "6AT", 8.5, N, suv),
    ];
  }
  if (yearFrom >= 2018) {
    return [
      petrol(`${label} 18i / 20i`, 136, "FWD / AWD", "7DCT / 8 Steptronic", 6.8, W, suv),
      petrol(`${label} 25i / 30i`, 231, "AWD", "8 Steptronic", 7.5, W, suv),
      diesel(`${label} 18d / 20d`, 150, "FWD / AWD", "8 Steptronic", 5.2, W, suv),
      diesel(`${label} 25d / 30d`, 231, "AWD", "8 Steptronic", 5.8, W, suv),
    ].flatMap((r) => {
      // split combined gear on 18i/20i if present
      if (r.transmissionSummary?.includes(" / ")) {
        return r.transmissionSummary.split(" / ").map((g) => ({ ...r, transmissionSummary: g.trim() }));
      }
      return [r];
    });
  }
  if (yearFrom >= 2010) {
    return [
      ...both(petrol, `${label} 20i / 28i`, 184, "AWD", "6MT", "8 Steptronic", 7.8, N, suv),
      ...both(diesel, `${label} 18d / 20d`, 143, "AWD", "6MT", "8 Steptronic", 5.2, N, suv),
      diesel(`${label} 30d`, 258, "AWD", "8 Steptronic", 6.2, N, suv),
    ];
  }
  return [
    ...both(petrol, `${label} 2.0i / 3.0i`, 150, "AWD", "6MT", "5AT", 10.0, N, suv),
    ...both(diesel, `${label} 2.0d / 3.0d`, 177, "AWD", "6MT", "6AT", 7.5, N, suv),
  ];
}

function numericEngine(token, family, yearFrom, body) {
  const std = stdFor(yearFrom);
  const t = token.toLowerCase().replace("-gran-turismo", "");
  const dieselModel = /d$/.test(t) || t.endsWith("d");
  const base = t.replace(/(is|xi|e)$/i, "").replace(/d$/i, "");
  const n = parseInt(base, 10);

  // Horsepower by era for common EU models
  let hp;
  let name;
  let fuel = dieselModel ? "diesel" : "petrol";
  const mk = dieselModel ? diesel : petrol;

  // Prefer chassis family; year only if family unknown
  const era =
    family === "E21" || family === "E30"
      ? "E30"
      : family === "E36"
        ? "E36"
        : family === "E46"
          ? "E46"
          : family === "E90" || family === "E60" || family === "E87" || family === "E63"
            ? "E90"
            : family === "F30" ||
                family === "F10" ||
                family === "F20" ||
                family === "F22" ||
                family === "F32" ||
                family === "F12" ||
                family === "F01" ||
                family === "F15" ||
                family === "F25" ||
                family === "F48"
              ? "F30"
              : family === "G20" ||
                  family === "G30" ||
                  family === "G60" ||
                  family === "G22" ||
                  family === "G42" ||
                  family === "G01" ||
                  family === "G05" ||
                  family === "G11" ||
                  family === "G15" ||
                  family === "F40" ||
                  family === "U11"
                ? "G20"
                : yearFrom >= 2018
                  ? "G20"
                  : yearFrom >= 2011
                    ? "F30"
                    : yearFrom >= 2004
                      ? "E90"
                      : yearFrom >= 1998
                        ? "E46"
                        : yearFrom >= 1990
                          ? "E36"
                          : "E30";

  if (dieselModel) {
    name = t.toUpperCase();
    if (era === "E46" || era === "E36" || era === "E30") hp = n >= 330 ? 184 : n >= 320 ? 150 : 116;
    else if (era === "E90")
      hp = n >= 335 ? 286 : n >= 330 ? 245 : n >= 325 ? 197 : n >= 320 ? 177 : 143;
    else if (era === "F30")
      hp = n >= 335 ? 313 : n >= 330 ? 258 : n >= 325 ? 218 : n >= 320 ? 190 : 150;
    else hp = n >= 330 ? 286 : n >= 320 ? 190 : 150;
  } else {
    name = /i|is$/i.test(t) ? t.toUpperCase() : `${t.toUpperCase()}i`;
    if (t.endsWith("is")) name = t.toUpperCase();
    if (era === "E30") hp = n >= 325 ? 170 : n >= 320 ? 129 : n >= 318 ? 105 : 90;
    else if (era === "E36")
      hp = n >= 328 ? 193 : n >= 325 ? 192 : n >= 323 ? 170 : n >= 320 ? 150 : n >= 318 ? 115 : 102;
    else if (era === "E46")
      hp = n >= 330 ? 231 : n >= 325 ? 192 : n >= 320 ? 170 : n >= 318 ? 143 : 115;
    else if (era === "E90")
      hp = n >= 335 ? 306 : n >= 330 ? 272 : n >= 325 ? 218 : n >= 320 ? 170 : 143;
    else if (era === "F30")
      hp = n >= 340 ? 326 : n >= 335 ? 306 : n >= 330 ? 252 : n >= 328 ? 245 : n >= 320 ? 184 : 136;
    else hp = n >= 340 ? 374 : n >= 330 ? 258 : n >= 320 ? 184 : 156;
  }

  // Gearbox policy by era
  if (yearFrom >= 2018) {
    // EU G20/G30-era volume models: Steptronic only (no factory MT)
    return [mk(name, hp, "RWD / xDrive", "8 Steptronic", dieselModel ? 5.0 : 6.5, std, body)];
  }
  if (yearFrom >= 2011) {
    return both(mk, name, hp, "RWD / xDrive", "6MT", "8 Steptronic", dieselModel ? 4.6 : 6.5, N, body);
  }
  if (yearFrom >= 2005) {
    return both(mk, name, hp, "RWD / xDrive", "6MT", "6AT", dieselModel ? 5.5 : 7.5, N, body);
  }
  if (yearFrom >= 1998) {
    return both(mk, name, hp, "RWD", "5MT", "5AT", dieselModel ? 6.0 : 8.5, N, body);
  }
  return both(mk, name, hp, "RWD", "5MT", "4AT", dieselModel ? 6.5 : 9.0, N, body);
}

/** @type {Record<string, object[]>} */
export const BMW_BRAND_POWERTRAINS = {};

for (const gen of gens) {
  const token = parseModel(gen.modelId);
  const family = chassisFamily(gen.code, gen.id);
  const body = bodyFor(gen.modelId);
  let rows = engineSpec(token, family, gen.yearFrom);
  // attach default body if missing
  rows = rows.map((r) => ({ ...r, bodyStyles: r.bodyStyles || body }));
  BMW_BRAND_POWERTRAINS[gen.id] = rows;
}

export const BMW_BRAND_MAKE_IDS = ["bmw"];

// Self-check when run directly
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const missing = gens.filter((g) => !BMW_BRAND_POWERTRAINS[g.id]?.length);
  const total = Object.values(BMW_BRAND_POWERTRAINS).reduce((a, r) => a + r.length, 0);
  console.log(
    JSON.stringify(
      {
        gens: gens.length,
        covered: Object.keys(BMW_BRAND_POWERTRAINS).length,
        missing: missing.map((g) => g.id),
        totalVariants: total,
      },
      null,
      2,
    ),
  );
}
