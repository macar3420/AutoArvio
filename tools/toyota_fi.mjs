/**
 * Toyota models sold in Finland after 2005.
 * A generation stays when it was still sold new after 2005.
 * Hybrid, plug-in and GR trims of a normal model are engines, not separate models.
 * GR Yaris and C-HR+ are their own Finnish nameplates.
 * Proace Verso is a body style of Proace. Proace City Electric is an engine of Proace City.
 * Engines live in toyota_powertrains.mjs.
 */
export const TOYOTA_MAKE = { id: "toyota", name: "Toyota" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const TOYOTA_MODELS = [
  { id: "toyota-auris", name: "Auris", yearFrom: 2007, yearTo: 2018, gens: [["E150", 2007, 2012], ["E180", 2012, 2018]] },
  { id: "toyota-avensis", name: "Avensis", yearFrom: 2003, yearTo: 2018, gens: [["T25", 2003, 2008], ["T27", 2009, 2018]] },
  { id: "toyota-avensis-verso", name: "Avensis Verso", yearFrom: 2001, yearTo: 2009, gens: [["I", 2001, 2009]] },
  { id: "toyota-aygo", name: "Aygo", yearFrom: 2005, yearTo: 2021, gens: [["AB40", 2005, 2014], ["AB40 FL", 2014, 2021]] },
  { id: "toyota-aygo-x", name: "Aygo X", yearFrom: 2022, gens: [["I", 2022, 2025], ["Hybrid", 2026, null]] },
  { id: "toyota-bz4x", name: "bZ4X", yearFrom: 2022, gens: [["I", 2022, 2025], ["FL", 2026, null]] },
  { id: "toyota-c-hr", name: "C-HR", yearFrom: 2016, gens: [["AX10", 2016, 2023], ["AX20", 2023, null]] },
  { id: "toyota-c-hr-plus", name: "C-HR+", yearFrom: 2025, gens: [["C-HR+", 2025, null]] },
  { id: "toyota-camry", name: "Camry", yearFrom: 2006, yearTo: 2025, gens: [["XV40", 2006, 2011], ["XV70", 2019, 2024], ["XV80", 2024, 2025]] },
  { id: "toyota-celica", name: "Celica", yearFrom: 1999, yearTo: 2006, gens: [["T230", 1999, 2006]] },
  {
    id: "toyota-corolla",
    name: "Corolla",
    yearFrom: 2001,
    gens: [
      ["E120", 2001, 2007],
      ["E150", 2007, 2013],
      ["E170", 2013, 2019],
      ["E210", 2019, null],
    ],
  },
  { id: "toyota-corolla-cross", name: "Corolla Cross", yearFrom: 2022, gens: [["Cross", 2022, null]] },
  { id: "toyota-corolla-verso", name: "Corolla Verso", yearFrom: 2004, yearTo: 2009, gens: [["AR10", 2004, 2009]] },
  { id: "toyota-gr-yaris", name: "GR Yaris", yearFrom: 2020, gens: [["I", 2020, 2024], ["FL", 2024, null]] },
  { id: "toyota-gt86", name: "GR86", yearFrom: 2012, yearTo: 2024, gens: [["GT86", 2012, 2021], ["GR86", 2022, 2024]] },
  { id: "toyota-hiace", name: "Hiace", yearFrom: 2004, yearTo: 2012, gens: [["H200", 2004, 2012]] },
  { id: "toyota-highlander", name: "Highlander", yearFrom: 2021, yearTo: 2024, gens: [["XU70", 2021, 2024]] },
  { id: "toyota-hilux", name: "Hilux", yearFrom: 2005, gens: [["AN10", 2005, 2015], ["AN120", 2015, null]] },
  { id: "toyota-iq", name: "iQ", yearFrom: 2008, yearTo: 2015, gens: [["AJ10", 2008, 2015]] },
  {
    id: "toyota-land-cruiser",
    name: "Land Cruiser",
    yearFrom: 1998,
    gens: [
      ["J100", 1998, 2007],
      ["J120", 2002, 2009],
      ["J150", 2009, 2023],
      ["J200", 2008, 2021],
      ["J250", 2024, null],
    ],
  },
  { id: "toyota-mr2", name: "MR2", yearFrom: 1999, yearTo: 2007, gens: [["W30", 1999, 2007]] },
  { id: "toyota-previa", name: "Previa", yearFrom: 2000, yearTo: 2006, gens: [["XR30", 2000, 2006]] },
  {
    id: "toyota-prius",
    name: "Prius",
    yearFrom: 2004,
    gens: [
      ["XW20", 2004, 2009],
      ["XW30", 2009, 2015],
      ["XW50", 2016, 2022],
      ["XW60", 2023, null],
    ],
  },
  { id: "toyota-proace", name: "Proace", yearFrom: 2016, gens: [["I", 2016, null]] },
  { id: "toyota-proace-city", name: "Proace City", yearFrom: 2019, gens: [["I", 2019, null]] },
  { id: "toyota-proace-max", name: "Proace Max", yearFrom: 2024, gens: [["I", 2024, null]] },
  {
    id: "toyota-rav4",
    name: "RAV4",
    yearFrom: 2006,
    gens: [
      ["XA30", 2006, 2012],
      ["XA40", 2013, 2018],
      ["XA50", 2019, 2025],
      ["XA60", 2026, null],
    ],
  },
  { id: "toyota-supra", name: "Supra", yearFrom: 2019, yearTo: 2026, gens: [["A90", 2019, 2026]] },
  { id: "toyota-urban-cruiser", name: "Urban Cruiser", yearFrom: 2009, gens: [["XP110", 2009, 2014], ["EV", 2026, null]] },
  { id: "toyota-verso", name: "Verso", yearFrom: 2009, yearTo: 2018, gens: [["I", 2009, 2018]] },
  { id: "toyota-verso-s", name: "Verso-S", yearFrom: 2011, yearTo: 2017, gens: [["I", 2011, 2017]] },
  {
    id: "toyota-yaris",
    name: "Yaris",
    yearFrom: 2005,
    gens: [
      ["XP90", 2005, 2011],
      ["XP130", 2011, 2020],
      ["XP210", 2020, null],
    ],
  },
  { id: "toyota-yaris-cross", name: "Yaris Cross", yearFrom: 2021, gens: [["I", 2021, 2025], ["FL", 2026, null]] },
];

export function toyotaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of TOYOTA_MODELS) {
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
