/**
 * Renault models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * Left out: 8, 9, 10, 12, 16, 19, Dauphine, Fuego, Safrane, the original 4 and 5,
 * Clio I and II, Espace III, Laguna I, Megane I and Scenic I.
 * Logan was the Dacia in Finland. Mascott is a truck.
 * Espace VI was not a Finnish retail model.
 * Grand Espace, Grand Scenic and Grand Modus are body styles.
 * Kangoo Express and Trafic Combi are the van and the passenger bus.
 * E-Tech is an engine or a generation of Megane and Scenic, not a second model.
 * Engines live in renault_powertrains.mjs.
 */
export const RENAULT_MAKE = { id: "renault", name: "Renault" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const RENAULT_MODELS = [
  { id: "renault-4", name: "4", yearFrom: 2025, gens: [["E-Tech", 2025, null]] },
  { id: "renault-5", name: "5", yearFrom: 2024, gens: [["E-Tech", 2024, null]] },
  { id: "renault-arkana", name: "Arkana", yearFrom: 2021, yearTo: 2025, gens: [["Arkana", 2021, 2025]] },
  { id: "renault-austral", name: "Austral", yearFrom: 2023, gens: [["Austral", 2023, null]] },
  {
    id: "renault-captur",
    name: "Captur",
    yearFrom: 2013,
    gens: [
      ["I", 2013, 2019],
      ["II", 2019, null],
    ],
  },
  {
    id: "renault-clio",
    name: "Clio",
    yearFrom: 2005,
    gens: [
      ["III", 2005, 2012],
      ["IV", 2012, 2019],
      ["V", 2019, 2026],
      ["VI", 2026, null],
    ],
  },
  {
    id: "renault-espace",
    name: "Espace",
    yearFrom: 2002,
    yearTo: 2023,
    gens: [
      ["IV", 2002, 2014],
      ["V", 2015, 2023],
    ],
  },
  { id: "renault-express", name: "Express", yearFrom: 2021, gens: [["Express", 2021, null]] },
  { id: "renault-kadjar", name: "Kadjar", yearFrom: 2015, yearTo: 2022, gens: [["Kadjar", 2015, 2022]] },
  {
    id: "renault-kangoo",
    name: "Kangoo",
    yearFrom: 1997,
    gens: [
      ["I", 1997, 2007],
      ["II", 2008, 2021],
      ["III", 2021, null],
    ],
  },
  {
    id: "renault-koleos",
    name: "Koleos",
    yearFrom: 2008,
    yearTo: 2023,
    gens: [
      ["I", 2008, 2016],
      ["II", 2017, 2023],
    ],
  },
  {
    id: "renault-laguna",
    name: "Laguna",
    yearFrom: 2001,
    yearTo: 2015,
    gens: [
      ["II", 2001, 2007],
      ["III", 2007, 2015],
    ],
  },
  {
    id: "renault-master",
    name: "Master",
    yearFrom: 1997,
    gens: [
      ["II", 1997, 2010],
      ["III", 2010, 2024],
      ["IV", 2024, null],
    ],
  },
  {
    id: "renault-megane",
    name: "Megane",
    yearFrom: 2002,
    gens: [
      ["II", 2002, 2008],
      ["III", 2008, 2016],
      ["IV", 2016, 2023],
      ["E-Tech", 2022, null],
    ],
  },
  { id: "renault-modus", name: "Modus", yearFrom: 2004, yearTo: 2012, gens: [["Modus", 2004, 2012]] },
  { id: "renault-rafale", name: "Rafale", yearFrom: 2024, gens: [["Rafale", 2024, null]] },
  {
    id: "renault-scenic",
    name: "Scenic",
    yearFrom: 2003,
    gens: [
      ["II", 2003, 2009],
      ["III", 2009, 2016],
      ["IV", 2016, 2022],
      ["E-Tech", 2024, null],
    ],
  },
  { id: "renault-symbioz", name: "Symbioz", yearFrom: 2024, gens: [["Symbioz", 2024, null]] },
  { id: "renault-talisman", name: "Talisman", yearFrom: 2015, yearTo: 2022, gens: [["Talisman", 2015, 2022]] },
  {
    id: "renault-trafic",
    name: "Trafic",
    yearFrom: 2001,
    gens: [
      ["II", 2001, 2014],
      ["III", 2014, null],
    ],
  },
  {
    id: "renault-twingo",
    name: "Twingo",
    yearFrom: 1993,
    yearTo: 2024,
    gens: [
      ["I", 1993, 2007],
      ["II", 2007, 2014],
      ["III", 2014, 2024],
    ],
  },
  { id: "renault-vel-satis", name: "Vel Satis", yearFrom: 2001, yearTo: 2009, gens: [["Vel Satis", 2001, 2009]] },
  {
    id: "renault-zoe",
    name: "Zoe",
    yearFrom: 2013,
    yearTo: 2024,
    gens: [
      ["Zoe", 2013, 2019],
      ["ZE50", 2019, 2024],
    ],
  },
];

export function renaultGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of RENAULT_MODELS) {
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
