/**
 * Polestar models sold in Finland.
 * Polestar 1 reached Finland in 2021, its last production year.
 * Polestar 5 is on the Finnish site. Polestar 4 coupé and SUV are body styles.
 * Engines live in polestar_powertrains.mjs.
 */
export const POLESTAR_MAKE = { id: "polestar", name: "Polestar" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const POLESTAR_MODELS = [
  { id: "polestar-1", name: "1", yearFrom: 2019, yearTo: 2021, gens: [["1", 2019, 2021]] },
  {
    id: "polestar-2",
    name: "2",
    yearFrom: 2020,
    gens: [
      ["I", 2020, 2023],
      ["FL", 2024, null],
    ],
  },
  { id: "polestar-3", name: "3", yearFrom: 2024, gens: [["3", 2024, null]] },
  { id: "polestar-4", name: "4", yearFrom: 2024, gens: [["4", 2024, null]] },
  { id: "polestar-5", name: "5", yearFrom: 2025, gens: [["5", 2025, null]] },
];

export function polestarGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of POLESTAR_MODELS) {
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
