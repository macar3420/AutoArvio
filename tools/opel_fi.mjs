/**
 * Opel models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * Cars that ended in 2005 or earlier are left out: Admiral, Ascona, Calibra,
 * Campo, Commodore, Kadett, Manta, Monterey, Monza, Olympia, Omega, Rekord,
 * Senator, Sintra, Speedster, Astra F and G, Corsa B, the old Frontera,
 * Tigra A, Vectra A and B, and Zafira A.
 * Combo-e, Corsa-e and Mokka-e are engines of Combo, Corsa and Mokka.
 * GSe is an engine of Astra and Grandland, not a separate model.
 * Crossland X and Grandland X are generations, not second models.
 * The new Frontera (2024) is not the 1990s Frontera.
 * Engines live in opel_powertrains.mjs.
 */
export const OPEL_MAKE = { id: "opel", name: "Opel" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const OPEL_MODELS = [
  { id: "opel-adam", name: "Adam", yearFrom: 2012, yearTo: 2019, gens: [["Adam", 2012, 2019]] },
  {
    id: "opel-agila",
    name: "Agila",
    yearFrom: 2000,
    yearTo: 2014,
    gens: [
      ["A", 2000, 2007],
      ["B", 2007, 2014],
    ],
  },
  { id: "opel-ampera", name: "Ampera", yearFrom: 2011, yearTo: 2015, gens: [["Ampera", 2011, 2015]] },
  {
    id: "opel-antara",
    name: "Antara",
    yearFrom: 2006,
    yearTo: 2015,
    gens: [
      ["Antara", 2006, 2010],
      ["FL", 2011, 2015],
    ],
  },
  {
    id: "opel-astra",
    name: "Astra",
    yearFrom: 2004,
    gens: [
      ["H", 2004, 2009],
      ["J", 2009, 2015],
      ["K", 2015, 2019],
      ["K FL", 2019, 2021],
      ["L", 2021, null],
    ],
  },
  {
    id: "opel-combo",
    name: "Combo",
    yearFrom: 2001,
    gens: [
      ["C", 2001, 2011],
      ["D", 2011, 2018],
      ["E", 2018, null],
    ],
  },
  {
    id: "opel-corsa",
    name: "Corsa",
    yearFrom: 2000,
    gens: [
      ["C", 2000, 2006],
      ["D", 2006, 2014],
      ["E", 2014, 2019],
      ["F", 2019, 2023],
      ["FL", 2023, null],
    ],
  },
  {
    id: "opel-crossland",
    name: "Crossland",
    yearFrom: 2017,
    yearTo: 2024,
    gens: [
      ["X", 2017, 2021],
      ["FL", 2021, 2024],
    ],
  },
  { id: "opel-frontera", name: "Frontera", yearFrom: 2024, gens: [["I", 2024, null]] },
  {
    id: "opel-grandland",
    name: "Grandland",
    yearFrom: 2017,
    gens: [
      ["X", 2017, 2021],
      ["FL", 2021, 2024],
      ["II", 2024, null],
    ],
  },
  { id: "opel-gt", name: "GT", yearFrom: 2007, yearTo: 2009, gens: [["GT", 2007, 2009]] },
  {
    id: "opel-insignia",
    name: "Insignia",
    yearFrom: 2008,
    yearTo: 2022,
    gens: [
      ["A", 2008, 2017],
      ["B", 2017, 2022],
    ],
  },
  { id: "opel-karl", name: "Karl", yearFrom: 2015, yearTo: 2019, gens: [["Karl", 2015, 2019]] },
  {
    id: "opel-meriva",
    name: "Meriva",
    yearFrom: 2003,
    yearTo: 2017,
    gens: [
      ["A", 2003, 2010],
      ["B", 2010, 2017],
    ],
  },
  {
    id: "opel-mokka",
    name: "Mokka",
    yearFrom: 2012,
    gens: [
      ["I", 2012, 2019],
      ["II", 2020, null],
    ],
  },
  {
    id: "opel-movano",
    name: "Movano",
    yearFrom: 1998,
    gens: [
      ["A", 1998, 2010],
      ["B", 2010, 2021],
      ["C", 2021, null],
    ],
  },
  { id: "opel-signum", name: "Signum", yearFrom: 2003, yearTo: 2008, gens: [["Signum", 2003, 2008]] },
  { id: "opel-tigra", name: "Tigra", yearFrom: 2004, yearTo: 2009, gens: [["B", 2004, 2009]] },
  { id: "opel-vectra", name: "Vectra", yearFrom: 2002, yearTo: 2008, gens: [["C", 2002, 2008]] },
  {
    id: "opel-vivaro",
    name: "Vivaro",
    yearFrom: 2001,
    gens: [
      ["A", 2001, 2014],
      ["B", 2014, 2019],
      ["C", 2019, null],
    ],
  },
  {
    id: "opel-zafira",
    name: "Zafira",
    yearFrom: 2005,
    yearTo: 2019,
    gens: [
      ["B", 2005, 2014],
      ["Tourer", 2011, 2019],
    ],
  },
];

export function opelGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of OPEL_MODELS) {
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
