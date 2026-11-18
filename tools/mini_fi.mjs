/**
 * MINI models sold by the European and Finnish retail network.
 * One, Cooper, Cooper S and JCW are engines of the hatch, not separate models.
 * Classic 1000 and 1300 are engines of the original Mini.
 * Clubvan is a van and is left out. Paceman is left out.
 * The new electric hatch (J01) is not the same car as the new petrol hatch (F66).
 * Engines live in mini_powertrains.mjs.
 */
export const MINI_MAKE = { id: "mini", name: "MINI" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MINI_MODELS = [
  {
    id: "mini-classic",
    name: "Mini",
    yearFrom: 1967,
    yearTo: 2000,
    gens: [
      ["Mk3", 1967, 1996],
      ["MPI", 1996, 2000],
    ],
  },
  {
    id: "mini-cooper",
    name: "Cooper",
    yearFrom: 2001,
    gens: [
      ["R50", 2001, 2006],
      ["R56", 2006, 2010],
      ["R56 FL", 2010, 2013],
      ["F56", 2014, 2018],
      ["F56 FL", 2018, 2024],
      ["F66", 2024, null],
      ["J01", 2024, null],
    ],
  },
  {
    id: "mini-cabrio",
    name: "Cabrio",
    yearFrom: 2004,
    gens: [
      ["R52", 2004, 2008],
      ["R57", 2009, 2015],
      ["F57", 2016, 2024],
      ["F67", 2025, null],
    ],
  },
  {
    id: "mini-clubman",
    name: "Clubman",
    yearFrom: 2007,
    yearTo: 2024,
    gens: [
      ["R55", 2007, 2014],
      ["F54", 2015, 2019],
      ["F54 FL", 2019, 2024],
    ],
  },
  {
    id: "mini-countryman",
    name: "Countryman",
    yearFrom: 2010,
    gens: [
      ["R60", 2010, 2016],
      ["F60", 2017, 2020],
      ["F60 FL", 2020, 2023],
      ["U25", 2024, null],
    ],
  },
  { id: "mini-aceman", name: "Aceman", yearFrom: 2024, gens: [["J05", 2024, null]] },
  { id: "mini-coupe", name: "Coupe", yearFrom: 2011, yearTo: 2015, gens: [["R58", 2011, 2015]] },
];

export function miniGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of MINI_MODELS) {
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
