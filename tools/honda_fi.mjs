/**
 * Honda models commonly sold in Finland.
 * Current cars plus the volume European generations people still own.
 * Rare imports (Integra, NSX, S2000, Legend, CRX, US and Japanese vans) stay out.
 * Civic Type R is its own model so the chassis codes stay visible.
 * CR-V hybrid and plug-in hybrid stay versions of CR-V.
 * Engines live in honda_powertrains.mjs.
 */
export const HONDA_MAKE = { id: "honda", name: "Honda" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const HONDA_MODELS = [
  {
    id: "honda-jazz",
    name: "Jazz",
    yearFrom: 2002,
    gens: [
      ["I", 2002, 2008],
      ["II", 2008, 2011],
      ["II FL", 2011, 2015],
      ["III", 2015, 2020],
      ["IV", 2020, null],
    ],
  },
  {
    id: "honda-civic",
    name: "Civic",
    yearFrom: 1995,
    gens: [
      ["VI", 1995, 2001],
      ["VII", 2001, 2005],
      ["VIII", 2006, 2008],
      ["VIII FL", 2009, 2011],
      ["IX", 2012, 2014],
      ["IX FL", 2015, 2017],
      ["X", 2017, 2022],
      ["XI", 2022, null],
    ],
  },
  {
    id: "honda-civic-type-r",
    name: "Civic Type R",
    yearFrom: 2001,
    gens: [
      ["EP3", 2001, 2005],
      ["FN2", 2007, 2011],
      ["FK2", 2015, 2017],
      ["FK8", 2017, 2021],
      ["FL5", 2022, null],
    ],
  },
  {
    id: "honda-accord",
    name: "Accord",
    yearFrom: 1993,
    yearTo: 2015,
    gens: [
      ["V", 1993, 1998],
      ["VI", 1998, 2003],
      ["VII", 2003, 2008],
      ["VIII", 2008, 2011],
      ["VIII FL", 2011, 2015],
    ],
  },
  {
    id: "honda-prelude",
    name: "Prelude",
    yearFrom: 1991,
    gens: [
      ["IV", 1991, 1996],
      ["V", 1997, 2001],
      ["VI", 2026, null],
    ],
  },
  {
    id: "honda-cr-v",
    name: "CR-V",
    yearFrom: 1997,
    gens: [
      ["I", 1997, 2001],
      ["II", 2002, 2004],
      ["II FL", 2005, 2006],
      ["III", 2007, 2009],
      ["III FL", 2010, 2012],
      ["IV", 2012, 2014],
      ["IV FL", 2015, 2018],
      ["V", 2018, 2023],
      ["VI", 2023, null],
    ],
  },
  {
    id: "honda-hr-v",
    name: "HR-V",
    yearFrom: 1999,
    gens: [
      ["I", 1999, 2006],
      ["II", 2015, 2018],
      ["II FL", 2018, 2021],
      ["III", 2021, null],
    ],
  },
  { id: "honda-zr-v", name: "ZR-V", yearFrom: 2023, gens: [["ZR-V", 2023, null]] },
  { id: "honda-fr-v", name: "FR-V", yearFrom: 2004, yearTo: 2009, gens: [["FR-V", 2004, 2009]] },
  {
    id: "honda-cr-z",
    name: "CR-Z",
    yearFrom: 2010,
    yearTo: 2016,
    gens: [
      ["I", 2010, 2012],
      ["FL", 2013, 2016],
    ],
  },
  { id: "honda-insight", name: "Insight", yearFrom: 2009, yearTo: 2014, gens: [["II", 2009, 2014]] },
  { id: "honda-e", name: "Honda e", yearFrom: 2020, yearTo: 2024, gens: [["e", 2020, 2024]] },
  { id: "honda-e-ny1", name: "e:Ny1", yearFrom: 2023, yearTo: 2025, gens: [["e:Ny1", 2023, 2025]] },
];

export function hondaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of HONDA_MODELS) {
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
