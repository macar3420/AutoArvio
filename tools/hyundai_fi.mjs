/**
 * Hyundai models commonly sold in Finland.
 * Current lineup plus the volume cars people still own.
 * Rare imports and cars that were never really sold here stay out.
 * i20 N, i30 N, and Ioniq 5 N stay separate so the performance cars are easy to find.
 * Engines live in hyundai_powertrains.mjs.
 */
export const HYUNDAI_MAKE = { id: "hyundai", name: "Hyundai" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const HYUNDAI_MODELS = [
  {
    id: "hyundai-i10",
    name: "i10",
    yearFrom: 2008,
    yearTo: 2025,
    gens: [
      ["I", 2008, 2013],
      ["II", 2014, 2019],
      ["III", 2019, 2025],
    ],
  },
  {
    id: "hyundai-i20",
    name: "i20",
    yearFrom: 2008,
    gens: [
      ["I", 2008, 2014],
      ["II", 2014, 2020],
      ["III", 2020, null],
    ],
  },
  { id: "hyundai-i20-n", name: "i20 N", yearFrom: 2021, yearTo: 2024, gens: [["N", 2021, 2024]] },
  {
    id: "hyundai-i30",
    name: "i30",
    yearFrom: 2007,
    gens: [
      ["FD", 2007, 2012],
      ["GD", 2012, 2017],
      ["PD", 2017, 2020],
      ["PD FL", 2020, null],
    ],
  },
  {
    id: "hyundai-i30-fastback",
    name: "i30 Fastback",
    yearFrom: 2017,
    gens: [
      ["PD", 2017, 2020],
      ["PD FL", 2020, null],
    ],
  },
  {
    id: "hyundai-i30-n",
    name: "i30 N",
    yearFrom: 2017,
    gens: [
      ["PD N", 2017, 2020],
      ["PD N FL", 2021, null],
    ],
  },
  { id: "hyundai-i40", name: "i40", yearFrom: 2011, yearTo: 2019, gens: [["i40", 2011, 2019]] },
  { id: "hyundai-getz", name: "Getz", yearFrom: 2002, yearTo: 2009, gens: [["Getz", 2002, 2009]] },
  {
    id: "hyundai-accent",
    name: "Accent",
    yearFrom: 1994,
    yearTo: 2011,
    gens: [
      ["X3", 1994, 1999],
      ["LC", 2000, 2005],
      ["MC", 2006, 2011],
    ],
  },
  { id: "hyundai-atos", name: "Atos", yearFrom: 1997, yearTo: 2008, gens: [["Atos", 1997, 2008]] },
  {
    id: "hyundai-coupe",
    name: "Coupe",
    yearFrom: 1996,
    yearTo: 2009,
    gens: [
      ["RD", 1996, 2002],
      ["GK", 2002, 2009],
    ],
  },
  { id: "hyundai-matrix", name: "Matrix", yearFrom: 2001, yearTo: 2010, gens: [["Matrix", 2001, 2010]] },
  {
    id: "hyundai-elantra",
    name: "Elantra",
    yearFrom: 1995,
    yearTo: 2006,
    gens: [
      ["Lantra", 1995, 2000],
      ["XD", 2000, 2006],
    ],
  },
  { id: "hyundai-ix20", name: "ix20", yearFrom: 2010, yearTo: 2019, gens: [["ix20", 2010, 2019]] },
  { id: "hyundai-bayon", name: "Bayon", yearFrom: 2021, gens: [["Bayon", 2021, null]] },
  {
    id: "hyundai-kona",
    name: "Kona",
    yearFrom: 2017,
    gens: [
      ["I", 2017, 2023],
      ["II", 2023, null],
    ],
  },
  {
    id: "hyundai-kona-electric",
    name: "Kona Electric",
    yearFrom: 2018,
    gens: [
      ["I", 2018, 2023],
      ["II", 2023, null],
    ],
  },
  { id: "hyundai-ix35", name: "ix35", yearFrom: 2010, yearTo: 2015, gens: [["ix35", 2010, 2015]] },
  {
    id: "hyundai-tucson",
    name: "Tucson",
    yearFrom: 2004,
    gens: [
      ["I", 2004, 2010],
      ["III", 2015, 2020],
      ["IV", 2020, null],
    ],
  },
  { id: "hyundai-tucson-plug-in", name: "Tucson Plug-in", yearFrom: 2020, gens: [["IV", 2020, null]] },
  {
    id: "hyundai-santa-fe",
    name: "Santa Fe",
    yearFrom: 2001,
    gens: [
      ["I", 2001, 2006],
      ["II", 2006, 2009],
      ["II FL", 2010, 2012],
      ["III", 2012, 2018],
      ["IV", 2018, 2024],
      ["V", 2024, null],
    ],
  },
  {
    id: "hyundai-h-1",
    name: "H-1",
    yearFrom: 1997,
    yearTo: 2021,
    gens: [
      ["I", 1997, 2007],
      ["II", 2008, 2021],
    ],
  },
  { id: "hyundai-trajet", name: "Trajet", yearFrom: 1999, yearTo: 2008, gens: [["Trajet", 1999, 2008]] },
  { id: "hyundai-ioniq", name: "Ioniq", yearFrom: 2016, yearTo: 2022, gens: [["Ioniq", 2016, 2022]] },
  {
    id: "hyundai-ioniq-electric",
    name: "Ioniq Electric",
    yearFrom: 2016,
    yearTo: 2022,
    gens: [
      ["I", 2016, 2019],
      ["FL", 2019, 2022],
    ],
  },
  { id: "hyundai-ioniq-plug-in", name: "Ioniq Plug-in", yearFrom: 2017, yearTo: 2022, gens: [["PHEV", 2017, 2022]] },
  {
    id: "hyundai-ioniq-5",
    name: "Ioniq 5",
    yearFrom: 2021,
    gens: [
      ["I", 2021, 2024],
      ["FL", 2025, null],
    ],
  },
  { id: "hyundai-ioniq-5-n", name: "Ioniq 5 N", yearFrom: 2023, gens: [["N", 2023, null]] },
  { id: "hyundai-ioniq-6", name: "Ioniq 6", yearFrom: 2022, gens: [["Ioniq 6", 2022, null]] },
  { id: "hyundai-ioniq-6-n", name: "Ioniq 6 N", yearFrom: 2026, gens: [["N", 2026, null]] },
  { id: "hyundai-inster", name: "Inster", yearFrom: 2024, gens: [["Inster", 2024, null]] },
];

export function hyundaiGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of HYUNDAI_MODELS) {
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
