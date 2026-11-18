/**
 * smart models sold in Finland after 2005.
 * fortwo coupé and cabrio are body styles. BRABUS is an engine, not a model.
 * The Roadster and Crossblade ended in 2005 or earlier.
 * Engines live in smart_powertrains.mjs.
 */
export const SMART_MAKE = { id: "smart", name: "smart" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const SMART_MODELS = [
  { id: "smart-1", name: "#1", yearFrom: 2023, gens: [["I", 2023, null]] },
  { id: "smart-3", name: "#3", yearFrom: 2023, gens: [["I", 2023, null]] },
  { id: "smart-5", name: "#5", yearFrom: 2025, gens: [["I", 2025, null]] },
  {
    id: "smart-forfour",
    name: "forfour",
    yearFrom: 2004,
    yearTo: 2021,
    gens: [
      ["W454", 2004, 2006],
      ["W453", 2014, 2021],
    ],
  },
  {
    id: "smart-fortwo",
    name: "fortwo",
    yearFrom: 1998,
    yearTo: 2024,
    gens: [
      ["450", 1998, 2007],
      ["451", 2007, 2014],
      ["453", 2014, 2024],
    ],
  },
];

export function smartGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of SMART_MODELS) {
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
