/**
 * Volvo models sold in Finland after 2005.
 * A generation stays when it was still sold new after 2005.
 * Recharge and Cross Country are engines or body styles of the parent.
 * C40 continues as EC40. The electric XC40 continues as EX40.
 * EM90 was not a Finnish retail model.
 * Engines live in volvo_powertrains.mjs.
 */
export const VOLVO_MAKE = { id: "volvo", name: "Volvo" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const VOLVO_MODELS = [
  { id: "volvo-c30", name: "C30", yearFrom: 2006, yearTo: 2013, gens: [["I", 2006, 2013]] },
  { id: "volvo-c70", name: "C70", yearFrom: 2006, yearTo: 2013, gens: [["II", 2006, 2013]] },
  { id: "volvo-ec40", name: "EC40", yearFrom: 2021, gens: [["C40", 2021, 2024], ["EC40", 2024, null]] },
  { id: "volvo-es90", name: "ES90", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "volvo-ex30", name: "EX30", yearFrom: 2023, gens: [["I", 2023, null]] },
  { id: "volvo-ex40", name: "EX40", yearFrom: 2020, gens: [["Recharge", 2020, 2024], ["EX40", 2024, null]] },
  { id: "volvo-ex60", name: "EX60", yearFrom: 2026, gens: [["I", 2026, null]] },
  { id: "volvo-ex90", name: "EX90", yearFrom: 2024, gens: [["I", 2024, null]] },
  { id: "volvo-s40", name: "S40", yearFrom: 2004, yearTo: 2012, gens: [["II", 2004, 2012]] },
  {
    id: "volvo-s60",
    name: "S60",
    yearFrom: 2000,
    yearTo: 2025,
    gens: [
      ["I", 2000, 2009],
      ["II", 2010, 2018],
      ["III", 2018, 2025],
    ],
  },
  { id: "volvo-s80", name: "S80", yearFrom: 1998, yearTo: 2016, gens: [["I", 1998, 2006], ["II", 2006, 2016]] },
  { id: "volvo-s90", name: "S90", yearFrom: 2016, yearTo: 2025, gens: [["I", 2016, 2025]] },
  { id: "volvo-v40", name: "V40", yearFrom: 2012, yearTo: 2019, gens: [["I", 2012, 2019]] },
  { id: "volvo-v50", name: "V50", yearFrom: 2004, yearTo: 2012, gens: [["I", 2004, 2012]] },
  { id: "volvo-v60", name: "V60", yearFrom: 2010, gens: [["I", 2010, 2018], ["II", 2018, 2025], ["FL", 2026, null]] },
  { id: "volvo-v70", name: "V70", yearFrom: 2000, yearTo: 2016, gens: [["P2", 2000, 2007], ["P3", 2007, 2016]] },
  { id: "volvo-v90", name: "V90", yearFrom: 2016, yearTo: 2025, gens: [["I", 2016, 2025]] },
  { id: "volvo-xc40", name: "XC40", yearFrom: 2017, gens: [["I", 2017, 2024], ["FL", 2024, null]] },
  { id: "volvo-xc60", name: "XC60", yearFrom: 2008, gens: [["I", 2008, 2017], ["II", 2017, 2025], ["FL", 2026, null]] },
  { id: "volvo-xc70", name: "XC70", yearFrom: 2002, yearTo: 2016, gens: [["P2", 2002, 2007], ["P3", 2007, 2016]] },
  { id: "volvo-xc90", name: "XC90", yearFrom: 2002, gens: [["I", 2002, 2014], ["II", 2015, 2025], ["FL", 2026, null]] },
];

export function volvoGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of VOLVO_MODELS) {
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
