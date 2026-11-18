/**
 * Ford models that are common in Finland: the current lineup plus the
 * volume cars Finns still own and recognise. Rare American and pre-1980s
 * nameplates stay out. Engines live in ford_powertrains.mjs.
 */
export const FORD_MAKE = { id: "ford", name: "Ford" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const FORD_MODELS = [
  {
    id: "ford-fiesta",
    name: "Fiesta",
    yearFrom: 1995,
    yearTo: 2023,
    gens: [
      ["Mk4", 1995, 1999],
      ["Mk5", 1999, 2002],
      ["Mk6", 2002, 2008],
      ["Mk7", 2008, 2012],
      ["Mk7 FL", 2012, 2017],
      ["Mk8", 2017, 2020],
      ["Mk8 FL", 2020, 2023],
    ],
  },
  {
    id: "ford-ka",
    name: "Ka",
    yearFrom: 1996,
    yearTo: 2021,
    gens: [
      ["I", 1996, 2008],
      ["II", 2008, 2016],
      ["Ka+", 2016, 2021],
    ],
  },
  {
    id: "ford-puma",
    name: "Puma",
    yearFrom: 2019,
    gens: [
      ["Puma", 2019, 2024],
      ["Puma FL", 2024, null],
    ],
  },
  { id: "ford-puma-gen-e", name: "Puma Gen-E", yearFrom: 2025, gens: [["Gen-E", 2025, null]] },
  {
    id: "ford-focus",
    name: "Focus",
    yearFrom: 1998,
    yearTo: 2025,
    gens: [
      ["Mk1", 1998, 2001],
      ["Mk1 FL", 2001, 2004],
      ["Mk2", 2004, 2008],
      ["Mk2 FL", 2008, 2011],
      ["Mk3", 2011, 2014],
      ["Mk3 FL", 2014, 2018],
      ["Mk4", 2018, 2022],
      ["Mk4 FL", 2022, 2025],
    ],
  },
  {
    id: "ford-focus-c-max",
    name: "Focus C-Max",
    yearFrom: 2003,
    yearTo: 2010,
    gens: [["C-Max", 2003, 2010]],
  },
  {
    id: "ford-c-max",
    name: "C-Max",
    yearFrom: 2010,
    yearTo: 2019,
    gens: [
      ["II", 2010, 2015],
      ["II FL", 2015, 2019],
    ],
  },
  {
    id: "ford-grand-c-max",
    name: "Grand C-Max",
    yearFrom: 2010,
    yearTo: 2019,
    gens: [
      ["II", 2010, 2015],
      ["II FL", 2015, 2019],
    ],
  },
  { id: "ford-b-max", name: "B-Max", yearFrom: 2012, yearTo: 2017, gens: [["B-Max", 2012, 2017]] },
  { id: "ford-fusion", name: "Fusion", yearFrom: 2002, yearTo: 2012, gens: [["Fusion", 2002, 2012]] },
  {
    id: "ford-ecosport",
    name: "EcoSport",
    yearFrom: 2014,
    yearTo: 2022,
    gens: [
      ["EcoSport", 2014, 2018],
      ["EcoSport FL", 2018, 2022],
    ],
  },
  {
    id: "ford-mondeo",
    name: "Mondeo",
    yearFrom: 1993,
    yearTo: 2022,
    gens: [
      ["Mk1", 1993, 1996],
      ["Mk1 FL", 1996, 2000],
      ["Mk2", 2000, 2003],
      ["Mk2 FL", 2003, 2007],
      ["Mk3", 2007, 2010],
      ["Mk3 FL", 2010, 2014],
      ["Mk4", 2014, 2019],
      ["Mk4 FL", 2019, 2022],
    ],
  },
  {
    id: "ford-s-max",
    name: "S-Max",
    yearFrom: 2006,
    yearTo: 2023,
    gens: [
      ["I", 2006, 2010],
      ["I FL", 2010, 2015],
      ["II", 2015, 2019],
      ["II FL", 2019, 2023],
    ],
  },
  {
    id: "ford-galaxy",
    name: "Galaxy",
    yearFrom: 1995,
    yearTo: 2023,
    gens: [
      ["I", 1995, 2000],
      ["I FL", 2000, 2006],
      ["II", 2006, 2010],
      ["II FL", 2010, 2015],
      ["III", 2015, 2019],
      ["III FL", 2019, 2023],
    ],
  },
  {
    id: "ford-kuga",
    name: "Kuga",
    yearFrom: 2008,
    gens: [
      ["I", 2008, 2012],
      ["II", 2012, 2016],
      ["II FL", 2016, 2019],
      ["III", 2019, 2024],
      ["III FL", 2024, null],
    ],
  },
  { id: "ford-explorer", name: "Explorer", yearFrom: 2024, gens: [["Explorer", 2024, null]] },
  { id: "ford-capri", name: "Capri", yearFrom: 2024, gens: [["Capri", 2024, null]] },
  {
    id: "ford-mustang",
    name: "Mustang",
    yearFrom: 2015,
    gens: [
      ["S550", 2015, 2018],
      ["S550 FL", 2018, 2023],
      ["S650", 2024, null],
    ],
  },
  { id: "ford-mustang-mach-e", name: "Mustang Mach-E", yearFrom: 2024, gens: [["Mach-E", 2024, null]] },
  {
    id: "ford-escort",
    name: "Escort",
    yearFrom: 1986,
    yearTo: 2000,
    gens: [
      ["Mk4", 1986, 1990],
      ["Mk5", 1990, 1992],
      ["Mk5 FL", 1992, 1995],
      ["Mk6", 1995, 2000],
    ],
  },
  {
    id: "ford-sierra",
    name: "Sierra",
    yearFrom: 1982,
    yearTo: 1993,
    gens: [
      ["I", 1982, 1987],
      ["II", 1987, 1993],
    ],
  },
  {
    id: "ford-scorpio",
    name: "Scorpio",
    yearFrom: 1985,
    yearTo: 1998,
    gens: [
      ["I", 1985, 1994],
      ["II", 1994, 1998],
    ],
  },
  {
    id: "ford-ranger",
    name: "Ranger",
    yearFrom: 2011,
    gens: [
      ["T6", 2011, 2015],
      ["T6 FL", 2015, 2019],
      ["T6 2019", 2019, 2022],
      ["P703", 2022, null],
    ],
  },
  { id: "ford-ranger-raptor", name: "Ranger Raptor", yearFrom: 2022, gens: [["Raptor", 2022, null]] },
  {
    id: "ford-tourneo-courier",
    name: "Tourneo Courier",
    yearFrom: 2014,
    gens: [
      ["I", 2014, 2023],
      ["II", 2023, null],
    ],
  },
  { id: "ford-e-tourneo-courier", name: "E-Tourneo Courier", yearFrom: 2024, gens: [["E-Courier", 2024, null]] },
  {
    id: "ford-tourneo-connect",
    name: "Tourneo Connect",
    yearFrom: 2002,
    gens: [
      ["I", 2002, 2013],
      ["II", 2013, 2018],
      ["II FL", 2018, 2022],
      ["III", 2024, null],
    ],
  },
  {
    id: "ford-grand-tourneo-connect",
    name: "Grand Tourneo Connect",
    yearFrom: 2013,
    yearTo: 2022,
    gens: [
      ["II", 2013, 2018],
      ["II FL", 2018, 2022],
    ],
  },
  {
    id: "ford-tourneo-custom",
    name: "Tourneo Custom",
    yearFrom: 2012,
    gens: [
      ["I", 2012, 2018],
      ["I FL", 2018, 2023],
      ["II", 2023, null],
    ],
  },
  { id: "ford-e-tourneo-custom", name: "E-Tourneo Custom", yearFrom: 2024, gens: [["E-Custom", 2024, null]] },
  {
    id: "ford-transit-courier",
    name: "Transit Courier",
    yearFrom: 2014,
    gens: [
      ["I", 2014, 2023],
      ["II", 2023, null],
    ],
  },
  { id: "ford-e-transit-courier", name: "E-Transit Courier", yearFrom: 2024, gens: [["E-Courier", 2024, null]] },
  {
    id: "ford-transit-connect",
    name: "Transit Connect",
    yearFrom: 2002,
    gens: [
      ["I", 2002, 2013],
      ["II", 2013, 2018],
      ["II FL", 2018, 2022],
      ["III", 2024, null],
    ],
  },
  {
    id: "ford-transit-custom",
    name: "Transit Custom",
    yearFrom: 2012,
    gens: [
      ["I", 2012, 2018],
      ["I FL", 2018, 2023],
      ["II", 2023, null],
    ],
  },
  { id: "ford-e-transit-custom", name: "E-Transit Custom", yearFrom: 2024, gens: [["E-Custom", 2024, null]] },
  {
    id: "ford-transit",
    name: "Transit",
    yearFrom: 2000,
    gens: [
      ["Mk6", 2000, 2006],
      ["Mk7", 2006, 2013],
      ["Mk8", 2014, 2019],
      ["Mk8 FL", 2019, null],
    ],
  },
  { id: "ford-e-transit", name: "E-Transit", yearFrom: 2022, gens: [["E-Transit", 2022, null]] },
];

export function fordGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of FORD_MODELS) {
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
