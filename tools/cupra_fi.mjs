/**
 * Cupra models on the Finnish market.
 * Formentor and Leon split at the 2024 facelift, when the engines changed.
 * Formentor VZ and Leon e-Hybrid stay separate models.
 * Engines live in cupra_powertrains.mjs.
 */
export const CUPRA_MAKE = { id: "cupra", name: "Cupra" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const CUPRA_MODELS = [
  {
    id: "cupra-ateca",
    name: "Ateca",
    yearFrom: 2018,
    gens: [["Ateca", 2018, null]],
  },
  {
    id: "cupra-born",
    name: "Born",
    yearFrom: 2021,
    gens: [
      ["Born", 2021, 2025],
      ["Born FL", 2025, null],
    ],
  },
  {
    id: "cupra-formentor",
    name: "Formentor",
    yearFrom: 2020,
    gens: [
      ["Formentor", 2020, 2024],
      ["Formentor FL", 2024, null],
    ],
  },
  {
    id: "cupra-formentor-vz",
    name: "Formentor VZ",
    yearFrom: 2020,
    gens: [
      ["Formentor VZ", 2020, 2024],
      ["Formentor VZ FL", 2024, null],
    ],
  },
  {
    id: "cupra-leon",
    name: "Leon",
    yearFrom: 2020,
    gens: [
      ["Leon", 2020, 2024],
      ["Leon FL", 2024, null],
    ],
  },
  {
    id: "cupra-leon-ehybrid",
    name: "Leon e-Hybrid",
    yearFrom: 2020,
    gens: [
      ["Leon e-Hybrid", 2020, 2024],
      ["Leon e-Hybrid FL", 2024, null],
    ],
  },
  {
    id: "cupra-leon-sportstourer",
    name: "Leon Sportstourer",
    yearFrom: 2020,
    gens: [
      ["Leon ST", 2020, 2024],
      ["Leon ST FL", 2024, null],
    ],
  },
  {
    id: "cupra-raval",
    name: "Raval",
    yearFrom: 2026,
    gens: [["Raval", 2026, null]],
  },
  {
    id: "cupra-tavascan",
    name: "Tavascan",
    yearFrom: 2024,
    gens: [["Tavascan", 2024, null]],
  },
  {
    id: "cupra-terramar",
    name: "Terramar",
    yearFrom: 2025,
    gens: [["Terramar", 2025, null]],
  },
];

export function cupraGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of CUPRA_MODELS) {
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
