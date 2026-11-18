/**
 * Alfa Romeo models on Nettiauto for Finland, and the Europe chassis
 * those names cover. Series and facelifts follow the cars actually sold
 * in Europe (Finland included).
 *
 * Quadrifoglio, Tonale Plug-in, and Junior Elettrica stay versions of the
 * Nettiauto model, not separate models. Engines live in alfa_romeo_powertrains.mjs.
 */
export const ALFA_MAKE = { id: "alfaromeo", name: "Alfa Romeo" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const ALFA_MODELS = [
  {
    id: "alfaromeo-146",
    name: "146",
    yearFrom: 1994,
    yearTo: 2000,
    gens: [
      ["930", 1994, 1998],
      ["930 FL", 1999, 2000],
    ],
  },
  {
    id: "alfaromeo-147",
    name: "147",
    yearFrom: 2000,
    yearTo: 2010,
    gens: [
      ["937", 2000, 2004],
      ["937 FL", 2005, 2010],
    ],
  },
  {
    id: "alfaromeo-155",
    name: "155",
    yearFrom: 1992,
    yearTo: 1998,
    gens: [
      ["167", 1992, 1994],
      ["167 FL", 1995, 1998],
    ],
  },
  {
    id: "alfaromeo-156",
    name: "156",
    yearFrom: 1997,
    yearTo: 2007,
    gens: [
      ["932", 1997, 2003],
      ["932 FL", 2003, 2007],
    ],
  },
  {
    id: "alfaromeo-159",
    name: "159",
    yearFrom: 2005,
    yearTo: 2011,
    gens: [
      ["939", 2005, 2008],
      ["939 FL", 2008, 2011],
    ],
  },
  {
    id: "alfaromeo-164",
    name: "164",
    yearFrom: 1987,
    yearTo: 1998,
    gens: [
      ["164", 1987, 1992],
      ["Super", 1993, 1998],
    ],
  },
  {
    id: "alfaromeo-166",
    name: "166",
    yearFrom: 1998,
    yearTo: 2007,
    gens: [
      ["936", 1998, 2003],
      ["936 FL", 2003, 2007],
    ],
  },
  {
    id: "alfaromeo-33",
    name: "33",
    yearFrom: 1983,
    yearTo: 1995,
    gens: [
      ["905", 1983, 1986],
      ["905 FL", 1986, 1989],
      ["907", 1990, 1995],
    ],
  },
  {
    id: "alfaromeo-75",
    name: "75",
    yearFrom: 1985,
    yearTo: 1992,
    gens: [["162", 1985, 1992]],
  },
  {
    id: "alfaromeo-alfetta",
    name: "Alfetta",
    yearFrom: 1972,
    yearTo: 1984,
    gens: [["116", 1972, 1984]],
  },
  {
    id: "alfaromeo-brera",
    name: "Brera",
    yearFrom: 2005,
    yearTo: 2010,
    gens: [
      ["939", 2005, 2008],
      ["939 FL", 2008, 2010],
    ],
  },
  {
    id: "alfaromeo-giulia",
    name: "Giulia",
    yearFrom: 1962,
    gens: [
      ["105", 1962, 1978],
      ["952", 2016, 2019],
      ["952 FL", 2020, null],
    ],
  },
  {
    id: "alfaromeo-giulietta",
    name: "Giulietta",
    yearFrom: 1954,
    yearTo: 2020,
    gens: [
      ["750", 1954, 1959],
      ["101", 1959, 1965],
      ["116", 1977, 1985],
      ["940", 2010, 2016],
      ["940 FL", 2016, 2020],
    ],
  },
  {
    id: "alfaromeo-gt",
    name: "GT",
    yearFrom: 2003,
    yearTo: 2010,
    gens: [["937", 2003, 2010]],
  },
  {
    id: "alfaromeo-gtv",
    name: "GTV",
    yearFrom: 1965,
    yearTo: 2005,
    gens: [
      ["105", 1965, 1976],
      ["116", 1976, 1987],
      ["916", 1995, 2003],
      ["916 FL", 2003, 2005],
    ],
  },
  {
    id: "alfaromeo-junior",
    name: "Junior",
    yearFrom: 2025,
    gens: [["1st", 2025, null]],
  },
  {
    id: "alfaromeo-mito",
    name: "MiTo",
    yearFrom: 2008,
    yearTo: 2018,
    gens: [
      ["955", 2008, 2016],
      ["955 FL", 2016, 2018],
    ],
  },
  {
    id: "alfaromeo-spider",
    name: "Spider",
    yearFrom: 1966,
    yearTo: 2010,
    gens: [
      ["105 S1", 1966, 1969],
      ["105 S2", 1970, 1982],
      ["115 S3", 1983, 1989],
      ["115 S4", 1990, 1993],
      ["916", 1995, 2003],
      ["916 FL", 2003, 2005],
      ["939", 2006, 2008],
      ["939 FL", 2008, 2010],
    ],
  },
  {
    id: "alfaromeo-sprint",
    name: "Sprint",
    yearFrom: 1976,
    yearTo: 1989,
    gens: [
      ["902", 1976, 1983],
      ["902 FL", 1983, 1989],
    ],
  },
  {
    id: "alfaromeo-stelvio",
    name: "Stelvio",
    yearFrom: 2017,
    gens: [
      ["949", 2017, 2019],
      ["949 FL", 2020, null],
    ],
  },
  {
    id: "alfaromeo-tonale",
    name: "Tonale",
    yearFrom: 2022,
    gens: [
      ["965", 2022, 2024],
      ["965 FL", 2025, null],
    ],
  },
];

export function alfaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of ALFA_MODELS) {
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
