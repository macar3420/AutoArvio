/**
 * Mercedes-Benz models commonly sold in Finland.
 * Current Veho lineup (price list 5.11.2026) plus the volume cars people still own.
 * Engine badges (C 180, E 63, A 250 e) are versions on the class, not separate models.
 * Chassis codes are the generation codes. Engines live in mercedes_powertrains.mjs.
 */
export const MERCEDES_MAKE = { id: "mercedes", name: "Mercedes-Benz" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MERCEDES_MODELS = [
  {
    id: "mercedes-a-class",
    name: "A-Class",
    yearFrom: 1997,
    gens: [
      ["W168", 1997, 2004],
      ["W169", 2004, 2012],
      ["W176", 2012, 2018],
      ["W177", 2018, 2022],
      ["W177 FL", 2023, null],
    ],
  },
  {
    id: "mercedes-b-class",
    name: "B-Class",
    yearFrom: 2005,
    yearTo: 2025,
    gens: [
      ["T245", 2005, 2011],
      ["W246", 2011, 2018],
      ["W247", 2018, 2025],
    ],
  },
  {
    id: "mercedes-cla",
    name: "CLA",
    yearFrom: 2013,
    gens: [
      ["C117", 2013, 2019],
      ["C118", 2019, 2025],
      ["C174", 2025, null],
    ],
  },
  {
    id: "mercedes-c-class",
    name: "C-Class",
    yearFrom: 1993,
    gens: [
      ["W202", 1993, 2000],
      ["W203", 2000, 2007],
      ["W204", 2007, 2014],
      ["W205", 2014, 2021],
      ["W206", 2021, 2025],
      ["W520", 2026, null],
    ],
  },
  {
    id: "mercedes-e-class",
    name: "E-Class",
    yearFrom: 1995,
    gens: [
      ["W210", 1995, 2002],
      ["W211", 2002, 2009],
      ["W212", 2009, 2016],
      ["W213", 2016, 2023],
      ["W214", 2023, null],
    ],
  },
  {
    id: "mercedes-s-class",
    name: "S-Class",
    yearFrom: 1991,
    gens: [
      ["W140", 1991, 1998],
      ["W220", 1998, 2005],
      ["W221", 2005, 2013],
      ["W222", 2013, 2020],
      ["W223", 2020, 2024],
      ["W223 FL", 2024, null],
    ],
  },
  { id: "mercedes-cle", name: "CLE", yearFrom: 2023, gens: [["C236", 2023, null]] },
  {
    id: "mercedes-cls",
    name: "CLS",
    yearFrom: 2004,
    yearTo: 2023,
    gens: [
      ["C219", 2004, 2010],
      ["C218", 2011, 2018],
      ["C257", 2018, 2023],
    ],
  },
  {
    id: "mercedes-gla",
    name: "GLA",
    yearFrom: 2013,
    gens: [
      ["X156", 2013, 2020],
      ["H247", 2020, 2025],
      ["H244", 2026, null],
    ],
  },
  {
    id: "mercedes-glb",
    name: "GLB",
    yearFrom: 2019,
    gens: [
      ["X247", 2019, 2025],
      ["X244", 2026, null],
    ],
  },
  {
    id: "mercedes-glc",
    name: "GLC",
    yearFrom: 2015,
    gens: [
      ["X253", 2015, 2022],
      ["X254", 2022, null],
      ["X540", 2026, null],
    ],
  },
  {
    id: "mercedes-gle",
    name: "GLE",
    yearFrom: 2015,
    gens: [
      ["W166", 2015, 2018],
      ["V167", 2018, 2023],
      ["V167 FL", 2023, null],
    ],
  },
  {
    id: "mercedes-gls",
    name: "GLS",
    yearFrom: 2012,
    gens: [
      ["X166", 2012, 2019],
      ["X167", 2019, 2023],
      ["X167 FL", 2023, null],
    ],
  },
  {
    id: "mercedes-g-class",
    name: "G-Class",
    yearFrom: 1990,
    gens: [
      ["W463", 1990, 2018],
      ["W463 18", 2018, 2024],
      ["W465", 2024, null],
    ],
  },
  { id: "mercedes-glk", name: "GLK", yearFrom: 2008, yearTo: 2015, gens: [["X204", 2008, 2015]] },
  {
    id: "mercedes-ml",
    name: "ML",
    yearFrom: 1997,
    yearTo: 2015,
    gens: [
      ["W163", 1997, 2005],
      ["W164", 2005, 2011],
      ["W166", 2011, 2015],
    ],
  },
  {
    id: "mercedes-sl",
    name: "SL",
    yearFrom: 1989,
    gens: [
      ["R129", 1989, 2001],
      ["R230", 2001, 2011],
      ["R231", 2012, 2020],
      ["R232", 2021, null],
    ],
  },
  {
    id: "mercedes-slk",
    name: "SLK",
    yearFrom: 1996,
    yearTo: 2016,
    gens: [
      ["R170", 1996, 2004],
      ["R171", 2004, 2011],
      ["R172", 2011, 2016],
    ],
  },
  { id: "mercedes-slc", name: "SLC", yearFrom: 2016, yearTo: 2020, gens: [["R172", 2016, 2020]] },
  {
    id: "mercedes-clk",
    name: "CLK",
    yearFrom: 1997,
    yearTo: 2009,
    gens: [
      ["C208", 1997, 2002],
      ["C209", 2002, 2009],
    ],
  },
  {
    id: "mercedes-cl",
    name: "CL",
    yearFrom: 1999,
    yearTo: 2014,
    gens: [
      ["C215", 1999, 2006],
      ["C216", 2006, 2014],
    ],
  },
  {
    id: "mercedes-amg-gt",
    name: "AMG GT",
    yearFrom: 2015,
    gens: [
      ["C190", 2015, 2021],
      ["X290", 2018, 2024],
      ["C192", 2023, null],
      ["GT EV", 2026, null],
    ],
  },
  { id: "mercedes-eqa", name: "EQA", yearFrom: 2021, yearTo: 2025, gens: [["H243", 2021, 2025]] },
  { id: "mercedes-eqb", name: "EQB", yearFrom: 2021, yearTo: 2025, gens: [["X243", 2021, 2025]] },
  { id: "mercedes-eqc", name: "EQC", yearFrom: 2019, yearTo: 2023, gens: [["N293", 2019, 2023]] },
  { id: "mercedes-eqe", name: "EQE", yearFrom: 2022, yearTo: 2025, gens: [["V295", 2022, 2025]] },
  { id: "mercedes-eqe-suv", name: "EQE SUV", yearFrom: 2022, yearTo: 2025, gens: [["X294", 2022, 2025]] },
  {
    id: "mercedes-eqs",
    name: "EQS",
    yearFrom: 2021,
    gens: [
      ["V297", 2021, 2024],
      ["V297 FL", 2024, null],
    ],
  },
  { id: "mercedes-eqv", name: "EQV", yearFrom: 2020, gens: [["W447", 2020, null]] },
  {
    id: "mercedes-sprinter",
    name: "Sprinter",
    yearFrom: 1995,
    gens: [
      ["T1N", 1995, 2006],
      ["NCV3", 2006, 2018],
      ["VS30", 2018, null],
    ],
  },
  {
    id: "mercedes-vito",
    name: "Vito",
    yearFrom: 1996,
    gens: [
      ["W638", 1996, 2003],
      ["W639", 2003, 2014],
      ["W447", 2014, null],
    ],
  },
  { id: "mercedes-v", name: "V-Class", yearFrom: 2014, gens: [["W447", 2014, null]] },
  { id: "mercedes-viano", name: "Viano", yearFrom: 2003, yearTo: 2014, gens: [["W639", 2003, 2014]] },
  {
    id: "mercedes-citan",
    name: "Citan",
    yearFrom: 2012,
    gens: [
      ["W415", 2012, 2021],
      ["W420", 2021, null],
    ],
  },
  { id: "mercedes-x", name: "X-Class", yearFrom: 2017, yearTo: 2020, gens: [["X470", 2017, 2020]] },
  { id: "mercedes-190", name: "190", yearFrom: 1982, yearTo: 1993, gens: [["W201", 1982, 1993]] },
  { id: "mercedes-123", name: "123", yearFrom: 1976, yearTo: 1985, gens: [["W123", 1976, 1985]] },
  { id: "mercedes-124", name: "124", yearFrom: 1984, yearTo: 1995, gens: [["W124", 1984, 1995]] },
];

export function mercedesGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of MERCEDES_MODELS) {
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
