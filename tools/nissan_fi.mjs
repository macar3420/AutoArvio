/**
 * Nissan models sold in Finland or European retail.
 * Left out: Altima, Frontier, Cedric, Laurel, Cube, Elgrand, Serena, Silvia,
 * Skyline, Stagea, Figaro, and the US Murano Z52 and Pathfinder R52/R53.
 * Patrol Y62 was not a Finnish retail model. Tiida was not sold here.
 * e-POWER is an engine of Qashqai and X-Trail, not a second model.
 * NP300 and King Cab are the Navara. Terrano turbodiesel is an engine.
 * Engines live in nissan_powertrains.mjs.
 */
export const NISSAN_MAKE = { id: "nissan", name: "Nissan" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const NISSAN_MODELS = [
  {
    id: "nissan-micra",
    name: "Micra",
    yearFrom: 1992,
    gens: [
      ["K11", 1992, 2000],
      ["K11 FL", 2000, 2003],
      ["K12", 2003, 2010],
      ["K13", 2010, 2016],
      ["K14", 2017, 2022],
      ["EV", 2025, null],
    ],
  },
  {
    id: "nissan-almera",
    name: "Almera",
    yearFrom: 1995,
    yearTo: 2006,
    gens: [
      ["N15", 1995, 2000],
      ["N16", 2000, 2006],
    ],
  },
  { id: "nissan-almera-tino", name: "Almera Tino", yearFrom: 2000, yearTo: 2006, gens: [["V10", 2000, 2006]] },
  {
    id: "nissan-primera",
    name: "Primera",
    yearFrom: 1990,
    yearTo: 2007,
    gens: [
      ["P10", 1990, 1996],
      ["P11", 1996, 2002],
      ["P12", 2002, 2007],
    ],
  },
  { id: "nissan-sunny", name: "Sunny", yearFrom: 1990, yearTo: 1995, gens: [["N14", 1990, 1995]] },
  { id: "nissan-bluebird", name: "Bluebird", yearFrom: 1986, yearTo: 1990, gens: [["T72", 1986, 1990]] },
  {
    id: "nissan-qashqai",
    name: "Qashqai",
    yearFrom: 2007,
    gens: [
      ["J10", 2007, 2010],
      ["J10 FL", 2010, 2013],
      ["J11", 2014, 2017],
      ["J11 FL", 2017, 2021],
      ["J12", 2021, null],
    ],
  },
  {
    id: "nissan-juke",
    name: "Juke",
    yearFrom: 2010,
    gens: [
      ["F15", 2010, 2014],
      ["F15 FL", 2014, 2019],
      ["F16", 2019, null],
    ],
  },
  {
    id: "nissan-x-trail",
    name: "X-Trail",
    yearFrom: 2001,
    gens: [
      ["T30", 2001, 2007],
      ["T31", 2007, 2014],
      ["T32", 2014, 2021],
      ["T33", 2022, null],
    ],
  },
  {
    id: "nissan-leaf",
    name: "Leaf",
    yearFrom: 2011,
    gens: [
      ["ZE0", 2011, 2017],
      ["ZE1", 2018, 2022],
      ["ZE1 e+", 2019, 2025],
      ["ZE2", 2025, null],
    ],
  },
  { id: "nissan-ariya", name: "Ariya", yearFrom: 2022, gens: [["I", 2022, null]] },
  {
    id: "nissan-note",
    name: "Note",
    yearFrom: 2006,
    yearTo: 2017,
    gens: [
      ["E11", 2006, 2013],
      ["E12", 2013, 2017],
    ],
  },
  { id: "nissan-pulsar", name: "Pulsar", yearFrom: 2014, yearTo: 2018, gens: [["C13", 2014, 2018]] },
  { id: "nissan-100nx", name: "100NX", yearFrom: 1990, yearTo: 1996, gens: [["B13", 1990, 1996]] },
  {
    id: "nissan-200sx",
    name: "200SX",
    yearFrom: 1989,
    yearTo: 2000,
    gens: [
      ["S13", 1989, 1994],
      ["S14", 1994, 2000],
    ],
  },
  { id: "nissan-300zx", name: "300ZX", yearFrom: 1990, yearTo: 1996, gens: [["Z32", 1990, 1996]] },
  { id: "nissan-350z", name: "350Z", yearFrom: 2003, yearTo: 2009, gens: [["Z33", 2003, 2009]] },
  { id: "nissan-370z", name: "370Z", yearFrom: 2009, yearTo: 2021, gens: [["Z34", 2009, 2021]] },
  {
    id: "nissan-gt-r",
    name: "GT-R",
    yearFrom: 2009,
    gens: [
      ["R35", 2009, 2016],
      ["R35 FL", 2017, null],
    ],
  },
  {
    id: "nissan-murano",
    name: "Murano",
    yearFrom: 2005,
    yearTo: 2014,
    gens: [
      ["Z50", 2005, 2008],
      ["Z51", 2008, 2014],
    ],
  },
  {
    id: "nissan-navara",
    name: "Navara",
    yearFrom: 1998,
    yearTo: 2021,
    gens: [
      ["D22", 1998, 2005],
      ["D40", 2005, 2015],
      ["D23", 2015, 2021],
    ],
  },
  { id: "nissan-pathfinder", name: "Pathfinder", yearFrom: 2005, yearTo: 2014, gens: [["R51", 2005, 2014]] },
  { id: "nissan-patrol", name: "Patrol", yearFrom: 1997, yearTo: 2010, gens: [["Y61", 1997, 2010]] },
  { id: "nissan-terrano", name: "Terrano II", yearFrom: 1993, yearTo: 2006, gens: [["R20", 1993, 2006]] },
  { id: "nissan-maxima", name: "Maxima", yearFrom: 1995, yearTo: 2000, gens: [["A32", 1995, 2000]] },
  { id: "nissan-kubistar", name: "Kubistar", yearFrom: 2003, yearTo: 2009, gens: [["X76", 2003, 2009]] },
  {
    id: "nissan-primastar",
    name: "Primastar",
    yearFrom: 2002,
    gens: [
      ["X83", 2002, 2016],
      ["II", 2021, null],
    ],
  },
  {
    id: "nissan-nv200",
    name: "NV200",
    yearFrom: 2009,
    yearTo: 2019,
    gens: [
      ["M20", 2009, 2019],
      ["e-NV200", 2014, 2019],
    ],
  },
];

export function nissanGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of NISSAN_MODELS) {
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
