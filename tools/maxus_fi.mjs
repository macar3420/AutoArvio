/**
 * Maxus models sold in Finland.
 * Current vans and pickups, plus the earlier cars people still own.
 * Deliver 9 chassis cabs stay on Deliver 9. Engines live in maxus_powertrains.mjs.
 */
export const MAXUS_MAKE = { id: "maxus", name: "Maxus" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const MAXUS_MODELS = [
  { id: "maxus-deliver-7", name: "Deliver 7", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "maxus-e-deliver-7", name: "eDeliver 7", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "maxus-e-deliver-5", name: "eDeliver 5", yearFrom: 2025, gens: [["I", 2025, null]] },
  { id: "maxus-eterron-9", name: "eTerron 9", yearFrom: 2025, gens: [["I", 2025, null]] },
  { id: "maxus-deliver-9", name: "Deliver 9", yearFrom: 2020, gens: [["I", 2020, null]] },
  { id: "maxus-t60-max", name: "T60 MAX", yearFrom: 2025, gens: [["I", 2025, null]] },
  { id: "maxus-e-deliver-3", name: "eDeliver 3", yearFrom: 2021, yearTo: 2025, gens: [["I", 2021, 2025]] },
  { id: "maxus-e-deliver-9", name: "eDeliver 9", yearFrom: 2021, gens: [["I", 2021, null]] },
  { id: "maxus-t90-ev", name: "T90 EV", yearFrom: 2023, yearTo: 2025, gens: [["I", 2023, 2025]] },
  {
    id: "maxus-euniq-5",
    name: "Euniq 5",
    yearFrom: 2020,
    yearTo: 2024,
    gens: [
      ["52.5", 2020, 2022],
      ["70", 2022, 2024],
    ],
  },
  { id: "maxus-euniq-6", name: "Euniq 6", yearFrom: 2021, yearTo: 2024, gens: [["I", 2021, 2024]] },
  { id: "maxus-mifa-9", name: "MIFA 9", yearFrom: 2023, yearTo: 2025, gens: [["I", 2023, 2025]] },
];

export function maxusGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of MAXUS_MODELS) {
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
