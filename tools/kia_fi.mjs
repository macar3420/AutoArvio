/**
 * Kia models commonly sold in Finland.
 * Current lineup plus the volume cars people still own.
 * Rare imports stay out. EV6 GT is its own model so the GT is easy to find.
 * Engines live in kia_powertrains.mjs.
 */
export const KIA_MAKE = { id: "kia", name: "Kia" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const KIA_MODELS = [
  {
    id: "kia-picanto",
    name: "Picanto",
    yearFrom: 2004,
    gens: [
      ["I", 2004, 2011],
      ["II", 2011, 2017],
      ["III", 2017, 2023],
      ["III FL", 2024, null],
    ],
  },
  {
    id: "kia-rio",
    name: "Rio",
    yearFrom: 2000,
    yearTo: 2023,
    gens: [
      ["I", 2000, 2005],
      ["II", 2005, 2011],
      ["III", 2011, 2017],
      ["IV", 2017, 2020],
      ["IV FL", 2020, 2023],
    ],
  },
  {
    id: "kia-stonic",
    name: "Stonic",
    yearFrom: 2017,
    gens: [
      ["I", 2017, 2020],
      ["I FL", 2020, null],
    ],
  },
  {
    id: "kia-ceed",
    name: "Ceed",
    yearFrom: 2006,
    yearTo: 2025,
    gens: [
      ["I", 2006, 2009],
      ["I FL", 2009, 2012],
      ["II", 2012, 2015],
      ["II FL", 2015, 2018],
      ["III", 2018, 2021],
      ["III FL", 2021, 2025],
    ],
  },
  {
    id: "kia-proceed",
    name: "ProCeed",
    yearFrom: 2008,
    yearTo: 2024,
    gens: [
      ["I", 2008, 2012],
      ["II", 2013, 2018],
      ["III", 2019, 2021],
      ["III FL", 2021, 2024],
    ],
  },
  {
    id: "kia-xceed",
    name: "XCeed",
    yearFrom: 2019,
    gens: [
      ["I", 2019, 2022],
      ["I FL", 2022, null],
    ],
  },
  {
    id: "kia-ceed-sw-phev",
    name: "Ceed SW Plug-in",
    yearFrom: 2020,
    yearTo: 2024,
    gens: [["III", 2020, 2024]],
  },
  { id: "kia-k4", name: "K4", yearFrom: 2025, gens: [["K4", 2025, null]] },
  { id: "kia-cerato", name: "Cerato", yearFrom: 2004, yearTo: 2009, gens: [["I", 2004, 2009]] },
  {
    id: "kia-magentis",
    name: "Magentis",
    yearFrom: 2001,
    yearTo: 2010,
    gens: [
      ["I", 2001, 2005],
      ["II", 2006, 2010],
    ],
  },
  {
    id: "kia-optima",
    name: "Optima",
    yearFrom: 2012,
    yearTo: 2020,
    gens: [
      ["I", 2012, 2015],
      ["II", 2015, 2018],
      ["II FL", 2018, 2020],
    ],
  },
  { id: "kia-venga", name: "Venga", yearFrom: 2009, yearTo: 2019, gens: [["Venga", 2009, 2019]] },
  {
    id: "kia-carens",
    name: "Carens",
    yearFrom: 1999,
    yearTo: 2019,
    gens: [
      ["I", 1999, 2002],
      ["II", 2002, 2006],
      ["III", 2006, 2013],
      ["IV", 2013, 2019],
    ],
  },
  {
    id: "kia-carnival",
    name: "Carnival",
    yearFrom: 1998,
    yearTo: 2014,
    gens: [
      ["I", 1998, 2006],
      ["II", 2006, 2014],
    ],
  },
  {
    id: "kia-soul",
    name: "Soul",
    yearFrom: 2009,
    yearTo: 2019,
    gens: [
      ["I", 2009, 2014],
      ["II", 2014, 2019],
    ],
  },
  {
    id: "kia-e-soul",
    name: "e-Soul",
    yearFrom: 2014,
    yearTo: 2023,
    gens: [
      ["I", 2014, 2019],
      ["II", 2019, 2023],
    ],
  },
  {
    id: "kia-niro",
    name: "Niro",
    yearFrom: 2016,
    gens: [
      ["I", 2016, 2019],
      ["I FL", 2019, 2022],
      ["II", 2022, 2024],
      ["II FL", 2025, null],
    ],
  },
  { id: "kia-e-niro", name: "e-Niro", yearFrom: 2018, yearTo: 2022, gens: [["e-Niro", 2018, 2022]] },
  {
    id: "kia-niro-electric",
    name: "Niro Electric",
    yearFrom: 2022,
    yearTo: 2025,
    gens: [["II", 2022, 2025]],
  },
  { id: "kia-seltos", name: "Seltos", yearFrom: 2026, gens: [["Seltos", 2026, null]] },
  {
    id: "kia-sportage",
    name: "Sportage",
    yearFrom: 1994,
    gens: [
      ["I", 1994, 2004],
      ["II", 2004, 2010],
      ["III", 2010, 2015],
      ["IV", 2015, 2018],
      ["IV FL", 2018, 2021],
      ["V", 2021, 2024],
      ["V FL", 2025, null],
    ],
  },
  {
    id: "kia-sportage-plug-in",
    name: "Sportage Plug-in",
    yearFrom: 2021,
    gens: [
      ["V", 2021, 2024],
      ["V FL", 2025, null],
    ],
  },
  {
    id: "kia-sorento",
    name: "Sorento",
    yearFrom: 2002,
    gens: [
      ["I", 2002, 2009],
      ["II", 2009, 2014],
      ["III", 2014, 2018],
      ["III FL", 2018, 2020],
      ["IV", 2020, 2024],
    ],
  },
  {
    id: "kia-sorento-plug-in",
    name: "Sorento Plug-in",
    yearFrom: 2020,
    gens: [
      ["IV", 2020, 2024],
      ["IV FL", 2025, null],
    ],
  },
  { id: "kia-stinger", name: "Stinger", yearFrom: 2017, yearTo: 2023, gens: [["Stinger", 2017, 2023]] },
  { id: "kia-ev2", name: "EV2", yearFrom: 2026, gens: [["EV2", 2026, null]] },
  { id: "kia-ev3", name: "EV3", yearFrom: 2024, gens: [["EV3", 2024, null]] },
  { id: "kia-ev4", name: "EV4", yearFrom: 2025, gens: [["EV4", 2025, null]] },
  { id: "kia-ev5", name: "EV5", yearFrom: 2025, gens: [["EV5", 2025, null]] },
  {
    id: "kia-ev6",
    name: "EV6",
    yearFrom: 2021,
    gens: [
      ["I", 2021, 2024],
      ["FL", 2025, null],
    ],
  },
  {
    id: "kia-ev6-gt",
    name: "EV6 GT",
    yearFrom: 2021,
    gens: [
      ["GT", 2021, 2024],
      ["GT FL", 2025, null],
    ],
  },
  { id: "kia-ev9", name: "EV9", yearFrom: 2023, gens: [["EV9", 2023, null]] },
  { id: "kia-pv5", name: "PV5", yearFrom: 2025, gens: [["PV5", 2025, null]] },
  { id: "kia-pv5-cargo", name: "PV5 Cargo", yearFrom: 2025, gens: [["Cargo", 2025, null]] },
];

export function kiaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of KIA_MODELS) {
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
