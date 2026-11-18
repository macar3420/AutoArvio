/**
 * XPeng models sold in Finland.
 * New G6 and New G9 are generations of G6 and G9. P7+ is a generation of P7.
 * L03 is the Finnish name of the SUV coupé.
 * Engines live in xpeng_powertrains.mjs.
 */
export const XPENG_MAKE = { id: "xpeng", name: "XPeng" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const XPENG_MODELS = [
  {
    id: "xpeng-g6",
    name: "G6",
    yearFrom: 2024,
    gens: [
      ["I", 2024, 2025],
      ["II", 2025, null],
    ],
  },
  {
    id: "xpeng-g9",
    name: "G9",
    yearFrom: 2023,
    gens: [
      ["I", 2023, 2025],
      ["II", 2025, null],
    ],
  },
  { id: "xpeng-l03", name: "L03", yearFrom: 2026, gens: [["I", 2026, null]] },
  {
    id: "xpeng-p7",
    name: "P7",
    yearFrom: 2023,
    gens: [
      ["I", 2023, 2025],
      ["Plus", 2026, null],
    ],
  },
  { id: "xpeng-x9", name: "X9", yearFrom: 2024, gens: [["I", 2024, null]] },
];

export function xpengGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of XPENG_MODELS) {
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
