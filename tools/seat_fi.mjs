/**
 * SEAT models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * Left out: Arosa, Inca, Ibiza 6K, Cordoba 6K, Toledo 1L and 1M, and Leon 1M.
 * Leon ST, Sportstourer and X-Perience are body styles. e-HYBRID is an engine.
 * Altea XL and Freetrack are body styles of Altea. Exeo ST is the estate.
 * Mii Electric is an engine of Mii. Tarraco e-HYBRID is an engine of Tarraco.
 * Engines live in seat_powertrains.mjs.
 */
export const SEAT_MAKE = { id: "seat", name: "SEAT" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const SEAT_MODELS = [
  {
    id: "seat-alhambra",
    name: "Alhambra",
    yearFrom: 1996,
    yearTo: 2020,
    gens: [
      ["7M", 1996, 2010],
      ["7N", 2010, 2020],
    ],
  },
  { id: "seat-altea", name: "Altea", yearFrom: 2004, yearTo: 2015, gens: [["Altea", 2004, 2015]] },
  { id: "seat-arona", name: "Arona", yearFrom: 2017, gens: [["Arona", 2017, null]] },
  { id: "seat-ateca", name: "Ateca", yearFrom: 2016, yearTo: 2025, gens: [["Ateca", 2016, 2025]] },
  { id: "seat-cordoba", name: "Cordoba", yearFrom: 2002, yearTo: 2009, gens: [["6L", 2002, 2009]] },
  { id: "seat-exeo", name: "Exeo", yearFrom: 2008, yearTo: 2013, gens: [["Exeo", 2008, 2013]] },
  {
    id: "seat-ibiza",
    name: "Ibiza",
    yearFrom: 2002,
    gens: [
      ["6L", 2002, 2008],
      ["6J", 2008, 2017],
      ["6F", 2017, null],
    ],
  },
  {
    id: "seat-leon",
    name: "Leon",
    yearFrom: 2005,
    gens: [
      ["1P", 2005, 2012],
      ["5F", 2012, 2020],
      ["KL", 2020, null],
    ],
  },
  { id: "seat-mii", name: "Mii", yearFrom: 2011, yearTo: 2021, gens: [["Mii", 2011, 2021]] },
  { id: "seat-tarraco", name: "Tarraco", yearFrom: 2018, yearTo: 2024, gens: [["Tarraco", 2018, 2024]] },
  {
    id: "seat-toledo",
    name: "Toledo",
    yearFrom: 2004,
    yearTo: 2019,
    gens: [
      ["5P", 2004, 2009],
      ["KG", 2012, 2019],
    ],
  },
];

export function seatGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of SEAT_MODELS) {
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
