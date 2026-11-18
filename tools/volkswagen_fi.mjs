/**
 * Volkswagen models sold in Finland after 2005.
 * A generation stays when it was still sold new after 2005.
 * GTI, GTE, R, eHybrid and e-up are engines. Variant, Allspace and ID.5
 * are body styles. ID. Polo, ID. Cross and ID. Tiguan are their own nameplates.
 * Caravelle and California are body styles of Transporter. Caddy Maxi is a body style.
 * Engines live in volkswagen_powertrains.mjs.
 */
export const VOLKSWAGEN_MAKE = { id: "volkswagen", name: "Volkswagen" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const VOLKSWAGEN_MODELS = [
  { id: "volkswagen-amarok", name: "Amarok", yearFrom: 2010, gens: [["2H", 2010, 2022], ["II", 2023, null]] },
  { id: "volkswagen-arteon", name: "Arteon", yearFrom: 2017, yearTo: 2024, gens: [["I", 2017, 2020], ["FL", 2020, 2024]] },
  { id: "volkswagen-beetle", name: "Beetle", yearFrom: 1998, yearTo: 2019, gens: [["9C", 1998, 2010], ["A5", 2011, 2019]] },
  { id: "volkswagen-caddy", name: "Caddy", yearFrom: 2004, gens: [["2K", 2004, 2020], ["SB", 2020, null]] },
  { id: "volkswagen-cc", name: "CC", yearFrom: 2008, yearTo: 2017, gens: [["I", 2008, 2017]] },
  { id: "volkswagen-crafter", name: "Crafter", yearFrom: 2006, gens: [["2E", 2006, 2016], ["II", 2017, null]] },
  { id: "volkswagen-eos", name: "Eos", yearFrom: 2006, yearTo: 2015, gens: [["I", 2006, 2015]] },
  { id: "volkswagen-fox", name: "Fox", yearFrom: 2005, yearTo: 2011, gens: [["I", 2005, 2011]] },
  {
    id: "volkswagen-golf",
    name: "Golf",
    yearFrom: 2003,
    gens: [
      ["Mk5", 2003, 2008],
      ["Mk6", 2008, 2012],
      ["Mk7", 2012, 2019],
      ["Mk8", 2019, 2024],
      ["Mk8.5", 2024, null],
    ],
  },
  { id: "volkswagen-golf-plus", name: "Golf Plus", yearFrom: 2005, yearTo: 2014, gens: [["I", 2005, 2014]] },
  { id: "volkswagen-golf-sportsvan", name: "Golf Sportsvan", yearFrom: 2014, yearTo: 2020, gens: [["I", 2014, 2020]] },
  { id: "volkswagen-id-buzz", name: "ID. Buzz", yearFrom: 2022, gens: [["I", 2022, null]] },
  { id: "volkswagen-id-cross", name: "ID. Cross", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "volkswagen-id-polo", name: "ID. Polo", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "volkswagen-id-tiguan", name: "ID. Tiguan", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "volkswagen-id3", name: "ID.3", yearFrom: 2020, gens: [["I", 2020, 2023], ["FL", 2024, null]] },
  { id: "volkswagen-id4", name: "ID.4", yearFrom: 2020, gens: [["I", 2020, 2023], ["FL", 2024, null]] },
  { id: "volkswagen-id7", name: "ID.7", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "volkswagen-jetta", name: "Jetta", yearFrom: 2005, yearTo: 2018, gens: [["A5", 2005, 2010], ["A6", 2011, 2018]] },
  { id: "volkswagen-lt", name: "LT", yearFrom: 1996, yearTo: 2006, gens: [["II", 1996, 2006]] },
  { id: "volkswagen-multivan", name: "Multivan", yearFrom: 2022, gens: [["T7", 2022, null]] },
  {
    id: "volkswagen-passat",
    name: "Passat",
    yearFrom: 2005,
    gens: [
      ["B6", 2005, 2010],
      ["B7", 2010, 2014],
      ["B8", 2014, 2023],
      ["B9", 2024, null],
    ],
  },
  { id: "volkswagen-phaeton", name: "Phaeton", yearFrom: 2002, yearTo: 2016, gens: [["I", 2002, 2016]] },
  {
    id: "volkswagen-polo",
    name: "Polo",
    yearFrom: 2005,
    gens: [
      ["9N3", 2005, 2009],
      ["6R", 2009, 2017],
      ["AW", 2017, null],
    ],
  },
  { id: "volkswagen-scirocco", name: "Scirocco", yearFrom: 2008, yearTo: 2017, gens: [["III", 2008, 2017]] },
  { id: "volkswagen-sharan", name: "Sharan", yearFrom: 1995, yearTo: 2022, gens: [["7M", 1995, 2010], ["7N", 2010, 2022]] },
  { id: "volkswagen-t-cross", name: "T-Cross", yearFrom: 2019, gens: [["I", 2019, null]] },
  { id: "volkswagen-t-roc", name: "T-Roc", yearFrom: 2017, gens: [["I", 2017, 2025], ["II", 2026, null]] },
  { id: "volkswagen-taigo", name: "Taigo", yearFrom: 2021, gens: [["I", 2021, null]] },
  { id: "volkswagen-tiguan", name: "Tiguan", yearFrom: 2007, gens: [["5N", 2007, 2016], ["AD", 2016, 2024], ["III", 2024, null]] },
  { id: "volkswagen-touareg", name: "Touareg", yearFrom: 2002, gens: [["7L", 2002, 2010], ["7P", 2010, 2018], ["CR", 2018, null]] },
  { id: "volkswagen-touran", name: "Touran", yearFrom: 2003, yearTo: 2024, gens: [["1T", 2003, 2015], ["5T", 2015, 2024]] },
  {
    id: "volkswagen-transporter",
    name: "Transporter",
    yearFrom: 2003,
    gens: [
      ["T5", 2003, 2015],
      ["T6", 2015, 2019],
      ["T6.1", 2019, 2024],
      ["T7", 2024, null],
    ],
  },
  { id: "volkswagen-up", name: "up", yearFrom: 2011, yearTo: 2023, gens: [["I", 2011, 2023]] },
];

export function volkswagenGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of VOLKSWAGEN_MODELS) {
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
