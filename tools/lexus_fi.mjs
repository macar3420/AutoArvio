/**
 * Lexus models commonly sold in Finland.
 * Current lineup plus the volume cars people still own.
 * US-only generations stay out. NX 450h+ and RX 450h+ stay separate.
 * Engines live in lexus_powertrains.mjs.
 */
export const LEXUS_MAKE = { id: "lexus", name: "Lexus" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const LEXUS_MODELS = [
  { id: "lexus-lbx", name: "LBX", yearFrom: 2024, gens: [["LBX", 2024, null]] },
  {
    id: "lexus-ux",
    name: "UX",
    yearFrom: 2019,
    gens: [
      ["ZA10", 2019, 2023],
      ["ZA10 FL", 2024, null],
    ],
  },
  {
    id: "lexus-nx",
    name: "NX",
    yearFrom: 2014,
    gens: [
      ["AZ10", 2014, 2021],
      ["AZ20", 2021, null],
    ],
  },
  { id: "lexus-nx-450h-plus", name: "NX 450h+", yearFrom: 2021, gens: [["AZ20", 2021, null]] },
  {
    id: "lexus-rx",
    name: "RX",
    yearFrom: 2000,
    gens: [
      ["XU10", 2000, 2003],
      ["XU30", 2003, 2008],
      ["AL10", 2009, 2015],
      ["AL20", 2015, 2022],
      ["AL30", 2022, null],
    ],
  },
  { id: "lexus-rx-450h-plus", name: "RX 450h+", yearFrom: 2022, gens: [["AL30", 2022, null]] },
  {
    id: "lexus-rz",
    name: "RZ",
    yearFrom: 2023,
    gens: [
      ["I", 2023, 2025],
      ["FL", 2025, null],
    ],
  },
  {
    id: "lexus-ct",
    name: "CT",
    yearFrom: 2011,
    yearTo: 2022,
    gens: [["CT", 2011, 2022]],
  },
  {
    id: "lexus-is",
    name: "IS",
    yearFrom: 1999,
    yearTo: 2020,
    gens: [
      ["XE10", 1999, 2005],
      ["XE20", 2005, 2013],
      ["XE30", 2013, 2016],
      ["XE30 FL", 2017, 2020],
    ],
  },
  {
    id: "lexus-es",
    name: "ES",
    yearFrom: 2019,
    gens: [
      ["VII", 2019, 2025],
      ["VIII", 2026, null],
    ],
  },
  {
    id: "lexus-gs",
    name: "GS",
    yearFrom: 1998,
    yearTo: 2020,
    gens: [
      ["S160", 1998, 2005],
      ["S190", 2005, 2011],
      ["L10", 2012, 2020],
    ],
  },
  {
    id: "lexus-ls",
    name: "LS",
    yearFrom: 2000,
    yearTo: 2024,
    gens: [
      ["XF30", 2000, 2006],
      ["XF40", 2006, 2017],
      ["XF50", 2018, 2024],
    ],
  },
  { id: "lexus-rc", name: "RC", yearFrom: 2015, yearTo: 2020, gens: [["XC10", 2015, 2020]] },
  { id: "lexus-sc", name: "SC", yearFrom: 2001, yearTo: 2010, gens: [["SC 430", 2001, 2010]] },
];

export function lexusGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of LEXUS_MODELS) {
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
