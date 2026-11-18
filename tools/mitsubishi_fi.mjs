/**
 * Mitsubishi models sold in Finland or European retail.
 * Left out: Canter trucks, Eclipse coupe, Cordia, Tredia, Sigma, Sapporo,
 * Legnum, Pajero Mini, Pajero Sport, and RVR (the European names were
 * Space Runner and ASX). GTO is the Japanese name of the 3000GT.
 * The 2004–2012 US Galant was not sold in Europe.
 * Lancer Evolution I–V were not European retail; the list starts at VI.
 * Outlander from 2021 in Europe is the PHEV, not a petrol generation.
 * Engines live in mitsubishi_powertrains.mjs.
 */
export const MITSUBISHI_MAKE = { id: "mitsubishi", name: "Mitsubishi" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MITSUBISHI_MODELS = [
  {
    id: "mitsubishi-colt",
    name: "Colt",
    yearFrom: 1996,
    gens: [
      ["CJ", 1996, 2004],
      ["Z30", 2004, 2012],
      ["VI", 2023, null],
    ],
  },
  {
    id: "mitsubishi-lancer",
    name: "Lancer",
    yearFrom: 2000,
    yearTo: 2017,
    gens: [
      ["CS", 2000, 2007],
      ["CY", 2007, 2017],
    ],
  },
  {
    id: "mitsubishi-lancer-evolution",
    name: "Lancer Evolution",
    yearFrom: 1999,
    yearTo: 2016,
    gens: [
      ["VI", 1999, 2001],
      ["VII", 2001, 2003],
      ["VIII", 2003, 2005],
      ["IX", 2005, 2007],
      ["X", 2008, 2016],
    ],
  },
  {
    id: "mitsubishi-carisma",
    name: "Carisma",
    yearFrom: 1995,
    yearTo: 2004,
    gens: [
      ["I", 1995, 1999],
      ["FL", 1999, 2004],
    ],
  },
  { id: "mitsubishi-galant", name: "Galant", yearFrom: 1996, yearTo: 2003, gens: [["EA", 1996, 2003]] },
  {
    id: "mitsubishi-space-star",
    name: "Space Star",
    yearFrom: 1998,
    yearTo: 2025,
    gens: [
      ["I", 1998, 2005],
      ["II", 2012, 2016],
      ["II FL", 2016, 2025],
    ],
  },
  {
    id: "mitsubishi-space-wagon",
    name: "Space Wagon",
    yearFrom: 1991,
    yearTo: 2004,
    gens: [
      ["N30", 1991, 1998],
      ["N40", 1998, 2004],
    ],
  },
  {
    id: "mitsubishi-space-runner",
    name: "Space Runner",
    yearFrom: 1991,
    yearTo: 2002,
    gens: [
      ["I", 1991, 1999],
      ["II", 1999, 2002],
    ],
  },
  {
    id: "mitsubishi-grandis",
    name: "Grandis",
    yearFrom: 2004,
    gens: [
      ["MPV", 2004, 2011],
      ["SUV", 2025, null],
    ],
  },
  { id: "mitsubishi-space-gear", name: "Space Gear", yearFrom: 1994, yearTo: 2007, gens: [["L400", 1994, 2007]] },
  {
    id: "mitsubishi-asx",
    name: "ASX",
    yearFrom: 2010,
    gens: [
      ["GA", 2010, 2016],
      ["GA FL", 2016, 2023],
      ["II", 2023, null],
    ],
  },
  {
    id: "mitsubishi-outlander",
    name: "Outlander",
    yearFrom: 2003,
    yearTo: 2021,
    gens: [
      ["I", 2003, 2006],
      ["II", 2006, 2012],
      ["III", 2012, 2015],
      ["III FL", 2015, 2021],
    ],
  },
  {
    id: "mitsubishi-outlander-phev",
    name: "Outlander PHEV",
    yearFrom: 2013,
    gens: [
      ["I", 2013, 2018],
      ["FL", 2018, 2021],
      ["II", 2024, null],
    ],
  },
  {
    id: "mitsubishi-eclipse-cross",
    name: "Eclipse Cross",
    yearFrom: 2018,
    gens: [
      ["I", 2018, 2021],
      ["FL", 2021, 2025],
      ["EV", 2025, null],
    ],
  },
  {
    id: "mitsubishi-pajero",
    name: "Pajero",
    yearFrom: 1991,
    yearTo: 2021,
    gens: [
      ["V20", 1991, 1999],
      ["V60", 1999, 2006],
      ["V80", 2006, 2014],
      ["V80 FL", 2014, 2021],
    ],
  },
  {
    id: "mitsubishi-l200",
    name: "L200",
    yearFrom: 1996,
    yearTo: 2024,
    gens: [
      ["K74", 1996, 2006],
      ["KB", 2006, 2015],
      ["KL", 2015, 2019],
      ["KL FL", 2019, 2024],
    ],
  },
  { id: "mitsubishi-i-miev", name: "i-MiEV", yearFrom: 2010, yearTo: 2017, gens: [["I", 2010, 2017]] },
  { id: "mitsubishi-3000gt", name: "3000GT", yearFrom: 1992, yearTo: 1996, gens: [["Z16", 1992, 1996]] },
];

export function mitsubishiGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of MITSUBISHI_MODELS) {
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
