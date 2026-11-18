/**
 * Voyah models sold in Finland.
 * The Finnish importer lists Courage and Free. Passion is not in that lineup.
 * Engines live in voyah_powertrains.mjs.
 */
export const VOYAH_MAKE = { id: "voyah", name: "Voyah" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const VOYAH_MODELS = [
  { id: "voyah-courage", name: "Courage", yearFrom: 2025, gens: [["I", 2025, null]] },
  { id: "voyah-free", name: "Free", yearFrom: 2024, gens: [["I", 2024, null]] },
];

export function voyahGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of VOYAH_MODELS) {
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
