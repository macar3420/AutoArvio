/**
 * MG models sold in Finland or the wider European retail range.
 * Left out: MG 1100, duplicate MGB/MGF rows, and the Chinese petrol MG5.
 * MG4 Urban is the 49 kWh MG4, not a second model.
 * MGS6 EV is on sale in Finland, but no brochure power or battery figure
 * was available, so it is not given an invented row.
 * Engines live in mg_powertrains.mjs.
 */
export const MG_MAKE = { id: "mg", name: "MG" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MG_MODELS = [
  {
    id: "mg-mgb",
    name: "MGB",
    yearFrom: 1962,
    yearTo: 1980,
    gens: [
      ["Mk1", 1962, 1974],
      ["Rubber", 1975, 1980],
    ],
  },
  { id: "mg-mgf", name: "MGF", yearFrom: 1995, yearTo: 2002, gens: [["MGF", 1995, 2002]] },
  { id: "mg-tf", name: "TF", yearFrom: 2002, yearTo: 2005, gens: [["TF", 2002, 2005]] },
  { id: "mg-zr", name: "ZR", yearFrom: 2001, yearTo: 2005, gens: [["ZR", 2001, 2005]] },
  {
    id: "mg-zs",
    name: "ZS",
    yearFrom: 2001,
    gens: [
      ["Rover", 2001, 2005],
      ["Petrol", 2017, 2024],
      ["Hybrid+", 2024, null],
    ],
  },
  {
    id: "mg-zs-ev",
    name: "ZS EV",
    yearFrom: 2019,
    yearTo: 2024,
    gens: [
      ["I", 2019, 2021],
      ["FL", 2021, 2024],
    ],
  },
  {
    id: "mg-hs",
    name: "HS",
    yearFrom: 2019,
    gens: [
      ["I", 2019, 2024],
      ["II", 2024, null],
    ],
  },
  { id: "mg-mg3", name: "MG3", yearFrom: 2024, gens: [["Hybrid+", 2024, null]] },
  { id: "mg-mg4", name: "MG4", yearFrom: 2022, gens: [["MG4", 2022, null]] },
  { id: "mg-mg5", name: "MG5", yearFrom: 2021, yearTo: 2025, gens: [["EV", 2021, 2025]] },
  { id: "mg-marvel-r", name: "Marvel R", yearFrom: 2021, yearTo: 2024, gens: [["I", 2021, 2024]] },
  { id: "mg-cyberster", name: "Cyberster", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "mg-s5", name: "MGS5", yearFrom: 2025, gens: [["EV", 2025, null]] },
  { id: "mg-zt", name: "ZT", yearFrom: 2001, yearTo: 2005, gens: [["ZT", 2001, 2005]] },
];

export function mgGenerationRows() {
  return generationRows(MG_MODELS);
}

function generationRows(models) {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of models) {
    for (const [code, yearFrom, yearTo] of model.gens) {
      rows.push({
        id: `${model.id}-${slug(code)}`,
        modelId: model.id,
        code,
        yearFrom,
        yearTo,
        imageAsset: "generation_placeholder",
      });
    }
  }
  return rows;
}
