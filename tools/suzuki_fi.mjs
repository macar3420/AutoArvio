/**
 * Suzuki models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * SX4 S-Cross is the first S-Cross. Swift Sport is an engine of Swift.
 * Carry, Samurai, SJ, Cappuccino, the old Vitara and the old Baleno ended
 * before 2006. Wagon R+'s last Finnish registrations are 2005.
 * Engines live in suzuki_powertrains.mjs.
 */
export const SUZUKI_MAKE = { id: "suzuki", name: "Suzuki" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const SUZUKI_MODELS = [
  { id: "suzuki-across", name: "Across", yearFrom: 2020, yearTo: 2025, gens: [["XA50", 2020, 2025]] },
  {
    id: "suzuki-alto",
    name: "Alto",
    yearFrom: 2002,
    yearTo: 2014,
    gens: [
      ["IV", 2002, 2006],
      ["GF", 2009, 2014],
    ],
  },
  { id: "suzuki-e-vitara", name: "e Vitara", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "suzuki-grand-vitara", name: "Grand Vitara", yearFrom: 2005, yearTo: 2014, gens: [["JT", 2005, 2014]] },
  {
    id: "suzuki-ignis",
    name: "Ignis",
    yearFrom: 2000,
    yearTo: 2025,
    gens: [
      ["FH", 2000, 2008],
      ["MF", 2016, 2025],
    ],
  },
  {
    id: "suzuki-jimny",
    name: "Jimny",
    yearFrom: 1998,
    yearTo: 2023,
    gens: [
      ["JB", 1998, 2018],
      ["GJ", 2018, 2023],
    ],
  },
  { id: "suzuki-liana", name: "Liana", yearFrom: 2001, yearTo: 2008, gens: [["ER", 2001, 2008]] },
  {
    id: "suzuki-s-cross",
    name: "S-Cross",
    yearFrom: 2013,
    gens: [
      ["JY", 2013, 2021],
      ["II", 2022, null],
    ],
  },
  { id: "suzuki-splash", name: "Splash", yearFrom: 2008, yearTo: 2014, gens: [["EX", 2008, 2014]] },
  { id: "suzuki-swace", name: "Swace", yearFrom: 2020, yearTo: 2025, gens: [["E210", 2020, 2025]] },
  {
    id: "suzuki-swift",
    name: "Swift",
    yearFrom: 2005,
    gens: [
      ["RS", 2005, 2010],
      ["FZ", 2010, 2017],
      ["AZ", 2017, 2024],
      ["A", 2024, null],
    ],
  },
  { id: "suzuki-sx4", name: "SX4", yearFrom: 2006, yearTo: 2014, gens: [["GY", 2006, 2014]] },
  { id: "suzuki-vitara", name: "Vitara", yearFrom: 2015, gens: [["LY", 2015, null]] },
];

export function suzukiGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of SUZUKI_MODELS) {
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
