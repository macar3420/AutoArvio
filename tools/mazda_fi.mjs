/**
 * Mazda models commonly sold in Finland.
 * Current lineup plus the volume cars people still own.
 * MX-5 RF stays on MX-5. Japanese names (Demio, Familia) stay off.
 * Engines live in mazda_powertrains.mjs.
 */
export const MAZDA_MAKE = { id: "mazda", name: "Mazda" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MAZDA_MODELS = [
  { id: "mazda-2-hybrid", name: "2 Hybrid", yearFrom: 2022, gens: [["Hybrid", 2022, null]] },
  {
    id: "mazda-2",
    name: "2",
    yearFrom: 2003,
    yearTo: 2024,
    gens: [
      ["DY", 2003, 2007],
      ["DE", 2007, 2014],
      ["DJ", 2014, 2024],
    ],
  },
  {
    id: "mazda-3",
    name: "3",
    yearFrom: 2003,
    gens: [
      ["BK", 2003, 2009],
      ["BL", 2009, 2013],
      ["BM", 2013, 2016],
      ["BM FL", 2017, 2019],
      ["BP", 2019, 2021],
      ["BP FL", 2021, 2025],
      ["BP 26", 2026, null],
    ],
  },
  {
    id: "mazda-6",
    name: "6",
    yearFrom: 2002,
    yearTo: 2024,
    gens: [
      ["GG", 2002, 2007],
      ["GH", 2007, 2012],
      ["GJ", 2012, 2018],
      ["GJ FL", 2018, 2024],
    ],
  },
  { id: "mazda-6e", name: "6e", yearFrom: 2025, gens: [["6e", 2025, null]] },
  {
    id: "mazda-cx-30",
    name: "CX-30",
    yearFrom: 2019,
    gens: [
      ["DM", 2019, 2025],
      ["DM 26", 2026, null],
    ],
  },
  {
    id: "mazda-cx-5",
    name: "CX-5",
    yearFrom: 2012,
    gens: [
      ["KE", 2012, 2017],
      ["KF", 2017, 2021],
      ["KF FL", 2022, 2025],
      ["III", 2026, null],
    ],
  },
  { id: "mazda-cx-60", name: "CX-60", yearFrom: 2022, gens: [["KH", 2022, null]] },
  { id: "mazda-cx-80", name: "CX-80", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "mazda-cx-6e", name: "CX-6e", yearFrom: 2026, gens: [["CX-6e", 2026, null]] },
  {
    id: "mazda-mx-5",
    name: "MX-5",
    yearFrom: 1989,
    gens: [
      ["NA", 1989, 1997],
      ["NB", 1998, 2000],
      ["NB FL", 2001, 2005],
      ["NC", 2005, 2015],
      ["ND", 2015, 2018],
      ["ND FL", 2019, null],
    ],
  },
  { id: "mazda-cx-3", name: "CX-3", yearFrom: 2015, yearTo: 2021, gens: [["DK", 2015, 2021]] },
  { id: "mazda-mx-30", name: "MX-30", yearFrom: 2020, yearTo: 2025, gens: [["I", 2020, 2025]] },
  { id: "mazda-mx-30-r-ev", name: "MX-30 R-EV", yearFrom: 2023, yearTo: 2025, gens: [["R-EV", 2023, 2025]] },
  {
    id: "mazda-5",
    name: "5",
    yearFrom: 2005,
    yearTo: 2015,
    gens: [
      ["CR", 2005, 2010],
      ["CW", 2010, 2015],
    ],
  },
  {
    id: "mazda-323",
    name: "323",
    yearFrom: 1980,
    yearTo: 2003,
    gens: [
      ["BD", 1980, 1985],
      ["BF", 1985, 1989],
      ["BG", 1989, 1994],
      ["BA", 1994, 1998],
      ["BJ", 1998, 2003],
    ],
  },
  {
    id: "mazda-323f",
    name: "323F",
    yearFrom: 1989,
    yearTo: 2003,
    gens: [
      ["BG", 1989, 1994],
      ["BA", 1994, 1998],
      ["BJ", 1998, 2003],
    ],
  },
  {
    id: "mazda-626",
    name: "626",
    yearFrom: 1983,
    yearTo: 2002,
    gens: [
      ["GC", 1983, 1987],
      ["GD", 1987, 1992],
      ["GE", 1992, 1997],
      ["GF", 1997, 2002],
    ],
  },
  { id: "mazda-premacy", name: "Premacy", yearFrom: 1999, yearTo: 2005, gens: [["CP", 1999, 2005]] },
  { id: "mazda-mx-3", name: "MX-3", yearFrom: 1991, yearTo: 1998, gens: [["EC", 1991, 1998]] },
  { id: "mazda-mx-6", name: "MX-6", yearFrom: 1991, yearTo: 1997, gens: [["GE", 1991, 1997]] },
  { id: "mazda-cx-7", name: "CX-7", yearFrom: 2007, yearTo: 2012, gens: [["ER", 2007, 2012]] },
  { id: "mazda-rx-8", name: "RX-8", yearFrom: 2003, yearTo: 2012, gens: [["SE", 2003, 2012]] },
  { id: "mazda-b2500", name: "B2500", yearFrom: 1998, yearTo: 2006, gens: [["B2500", 1998, 2006]] },
  {
    id: "mazda-bt-50",
    name: "BT-50",
    yearFrom: 2006,
    yearTo: 2020,
    gens: [
      ["I", 2006, 2011],
      ["II", 2011, 2020],
    ],
  },
];

export function mazdaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of MAZDA_MODELS) {
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
