/**
 * Subaru models sold in Finland after 2005.
 * WRX STI is an engine of WRX. The XV name continues as Crosstrek.
 * e-BOXER is a hybrid and its small pack is not a traction battery.
 * Leone, Justy, SVX and the old pickups ended before 2006.
 * Engines live in subaru_powertrains.mjs.
 */
export const SUBARU_MAKE = { id: "subaru", name: "Subaru" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const SUBARU_MODELS = [
  { id: "subaru-brz", name: "BRZ", yearFrom: 2012, yearTo: 2020, gens: [["ZC6", 2012, 2020]] },
  { id: "subaru-crosstrek", name: "Crosstrek", yearFrom: 2023, gens: [["I", 2023, null]] },
  { id: "subaru-e-outback", name: "E-Outback", yearFrom: 2026, gens: [["I", 2026, null]] },
  {
    id: "subaru-forester",
    name: "Forester",
    yearFrom: 2002,
    gens: [
      ["SG", 2002, 2008],
      ["SH", 2008, 2012],
      ["SJ", 2013, 2018],
      ["SK", 2018, 2024],
      ["SL", 2025, null],
    ],
  },
  {
    id: "subaru-impreza",
    name: "Impreza",
    yearFrom: 2000,
    yearTo: 2023,
    gens: [
      ["GD", 2000, 2007],
      ["GE", 2007, 2011],
      ["GJ", 2012, 2016],
      ["GK", 2017, 2023],
    ],
  },
  {
    id: "subaru-legacy",
    name: "Legacy",
    yearFrom: 2003,
    yearTo: 2020,
    gens: [
      ["BL", 2003, 2009],
      ["BM", 2009, 2014],
      ["BN", 2015, 2020],
    ],
  },
  { id: "subaru-levorg", name: "Levorg", yearFrom: 2015, yearTo: 2020, gens: [["I", 2015, 2020]] },
  {
    id: "subaru-outback",
    name: "Outback",
    yearFrom: 2003,
    gens: [
      ["BP", 2003, 2009],
      ["BR", 2009, 2014],
      ["BS", 2014, 2020],
      ["BT", 2021, null],
    ],
  },
  {
    id: "subaru-solterra",
    name: "Solterra",
    yearFrom: 2022,
    gens: [
      ["I", 2022, 2025],
      ["FL", 2025, null],
    ],
  },
  { id: "subaru-tribeca", name: "Tribeca", yearFrom: 2006, yearTo: 2014, gens: [["I", 2006, 2014]] },
  { id: "subaru-uncharted", name: "Uncharted", yearFrom: 2025, gens: [["I", 2025, null]] },
  { id: "subaru-wrx", name: "WRX", yearFrom: 2014, yearTo: 2021, gens: [["VA", 2014, 2021]] },
  {
    id: "subaru-xv",
    name: "XV",
    yearFrom: 2012,
    yearTo: 2023,
    gens: [
      ["I", 2012, 2017],
      ["II", 2018, 2023],
    ],
  },
];

export function subaruGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of SUBARU_MODELS) {
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
