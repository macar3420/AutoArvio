/**
 * BYD models on the Finnish market, and the Europe cars those names cover.
 * Years follow Finnish registrations and the BYD Finland price list, not
 * China-only generations (early Han, Tang L).
 *
 * Plug-in models that Nettiauto lists separately stay separate models.
 * Engines live in byd_powertrains.mjs.
 */
export const BYD_MAKE = { id: "byd", name: "BYD" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const BYD_MODELS = [
  {
    id: "byd-atto-2",
    name: "Atto 2",
    yearFrom: 2025,
    gens: [["Atto 2", 2025, null]],
  },
  {
    id: "byd-atto-3",
    name: "Atto 3",
    yearFrom: 2022,
    gens: [
      ["Atto 3", 2022, 2026],
      ["Atto 3 EVO", 2026, null],
    ],
  },
  {
    id: "byd-dolphin",
    name: "Dolphin",
    yearFrom: 2023,
    gens: [["Dolphin", 2023, null]],
  },
  {
    id: "byd-dolphin-surf",
    name: "Dolphin Surf",
    yearFrom: 2025,
    gens: [["Dolphin Surf", 2025, null]],
  },
  {
    id: "byd-etp3",
    name: "ETP3",
    yearFrom: 2023,
    gens: [["ETP3", 2023, null]],
  },
  {
    id: "byd-han",
    name: "Han",
    yearFrom: 2023,
    gens: [["Han", 2023, null]],
  },
  {
    id: "byd-seal",
    name: "Seal",
    yearFrom: 2023,
    gens: [["Seal", 2023, null]],
  },
  {
    id: "byd-seal-6-dm-i",
    name: "Seal 6 DM-i",
    yearFrom: 2025,
    gens: [["Seal 6 DM-i", 2025, null]],
  },
  {
    id: "byd-seal-u",
    name: "Seal U",
    yearFrom: 2024,
    gens: [["Seal U", 2024, null]],
  },
  {
    id: "byd-seal-u-dm-i",
    name: "Seal U DM-i",
    yearFrom: 2024,
    gens: [["Seal U DM-i", 2024, null]],
  },
  {
    id: "byd-sealion-7",
    name: "Sealion 7",
    yearFrom: 2024,
    gens: [["Sealion 7", 2024, null]],
  },
  {
    id: "byd-tang",
    name: "Tang",
    yearFrom: 2024,
    gens: [["Tang", 2024, null]],
  },
];

export function bydGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of BYD_MODELS) {
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
