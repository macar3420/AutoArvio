/**
 * Tesla models sold in Finland.
 * Cybertruck was not type-approved for Finnish retail.
 * Model S and Model X left the Finnish configurator; the last cars are kept.
 * Engines live in tesla_powertrains.mjs.
 */
export const TESLA_MAKE = { id: "tesla", name: "Tesla" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const TESLA_MODELS = [
  {
    id: "tesla-model-3",
    name: "Model 3",
    yearFrom: 2017,
    gens: [
      ["I", 2017, 2023],
      ["Highland", 2024, 2025],
      ["2026", 2026, null],
    ],
  },
  {
    id: "tesla-model-s",
    name: "Model S",
    yearFrom: 2013,
    yearTo: 2025,
    gens: [
      ["I", 2013, 2016],
      ["FL", 2016, 2021],
      ["Plaid", 2021, 2025],
    ],
  },
  {
    id: "tesla-model-x",
    name: "Model X",
    yearFrom: 2016,
    yearTo: 2025,
    gens: [
      ["I", 2016, 2021],
      ["Plaid", 2021, 2025],
    ],
  },
  {
    id: "tesla-model-y",
    name: "Model Y",
    yearFrom: 2020,
    gens: [
      ["I", 2020, 2024],
      ["Juniper", 2025, null],
    ],
  },
  {
    id: "tesla-roadster",
    name: "Roadster",
    yearFrom: 2008,
    yearTo: 2012,
    gens: [["I", 2008, 2012]],
  },
];

export function teslaGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of TESLA_MODELS) {
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
