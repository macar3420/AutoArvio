/**
 * Škoda models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * Left out: 1000, 105, 120, 1200, 130, Favorit, Felicia, Forman and Octavia I.
 * Octavia iV and Superb iV are engines. Enyaq Coupé is a body style.
 * A 48-volt pack is not stored as a traction battery.
 * Engines live in skoda_powertrains.mjs.
 */
export const SKODA_MAKE = { id: "skoda", name: "Škoda" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const SKODA_MODELS = [
  { id: "skoda-citigo", name: "Citigo", yearFrom: 2011, yearTo: 2021, gens: [["Citigo", 2011, 2021]] },
  { id: "skoda-elroq", name: "Elroq", yearFrom: 2025, gens: [["Elroq", 2025, null]] },
  {
    id: "skoda-enyaq",
    name: "Enyaq",
    yearFrom: 2021,
    gens: [
      ["iV", 2021, 2025],
      ["85", 2025, null],
    ],
  },
  { id: "skoda-epiq", name: "Epiq", yearFrom: 2026, gens: [["Epiq", 2026, null]] },
  {
    id: "skoda-fabia",
    name: "Fabia",
    yearFrom: 1999,
    gens: [
      ["I", 1999, 2007],
      ["II", 2007, 2014],
      ["III", 2014, 2021],
      ["IV", 2021, null],
    ],
  },
  { id: "skoda-kamiq", name: "Kamiq", yearFrom: 2019, gens: [["Kamiq", 2019, null]] },
  { id: "skoda-karoq", name: "Karoq", yearFrom: 2017, gens: [["Karoq", 2017, null]] },
  {
    id: "skoda-kodiaq",
    name: "Kodiaq",
    yearFrom: 2017,
    gens: [
      ["I", 2017, 2024],
      ["II", 2024, null],
    ],
  },
  {
    id: "skoda-octavia",
    name: "Octavia",
    yearFrom: 2004,
    gens: [
      ["II", 2004, 2013],
      ["III", 2013, 2020],
      ["IV", 2020, null],
    ],
  },
  { id: "skoda-peaq", name: "Peaq", yearFrom: 2026, gens: [["Peaq", 2026, null]] },
  { id: "skoda-rapid", name: "Rapid", yearFrom: 2012, yearTo: 2019, gens: [["Rapid", 2012, 2019]] },
  { id: "skoda-roomster", name: "Roomster", yearFrom: 2006, yearTo: 2015, gens: [["Roomster", 2006, 2015]] },
  { id: "skoda-scala", name: "Scala", yearFrom: 2019, gens: [["Scala", 2019, null]] },
  {
    id: "skoda-superb",
    name: "Superb",
    yearFrom: 2001,
    gens: [
      ["I", 2001, 2008],
      ["II", 2008, 2015],
      ["III", 2015, 2024],
      ["IV", 2024, null],
    ],
  },
  { id: "skoda-yeti", name: "Yeti", yearFrom: 2009, yearTo: 2017, gens: [["Yeti", 2009, 2017]] },
];

export function skodaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of SKODA_MODELS) {
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
