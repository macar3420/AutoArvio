/**
 * Porsche models sold in Finland.
 * A generation stays when it was still sold new after 2005.
 * Left out: 924, 928, 944, 968, 911 964/993/996, and Boxster 986.
 * 718 is the latest Boxster and Cayman, not a third model.
 * E-Hybrid is an engine of Cayenne and Panamera.
 * The electric Macan and electric Cayenne are generations of those models.
 * Engines live in porsche_powertrains.mjs.
 */
export const PORSCHE_MAKE = { id: "porsche", name: "Porsche" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const PORSCHE_MODELS = [
  {
    id: "porsche-911",
    name: "911",
    yearFrom: 2004,
    gens: [
      ["997", 2004, 2008],
      ["997.2", 2008, 2012],
      ["991", 2011, 2016],
      ["991.2", 2016, 2019],
      ["992", 2019, 2024],
      ["992.2", 2024, null],
    ],
  },
  {
    id: "porsche-boxster",
    name: "Boxster",
    yearFrom: 2004,
    yearTo: 2025,
    gens: [
      ["987", 2004, 2008],
      ["987.2", 2009, 2012],
      ["981", 2012, 2016],
      ["718", 2016, 2025],
    ],
  },
  {
    id: "porsche-cayman",
    name: "Cayman",
    yearFrom: 2005,
    yearTo: 2025,
    gens: [
      ["987", 2005, 2008],
      ["987.2", 2009, 2012],
      ["981", 2013, 2016],
      ["718", 2016, 2025],
    ],
  },
  {
    id: "porsche-cayenne",
    name: "Cayenne",
    yearFrom: 2002,
    gens: [
      ["9PA", 2002, 2007],
      ["9PA FL", 2007, 2010],
      ["92A", 2010, 2014],
      ["92A FL", 2014, 2017],
      ["E3", 2017, 2023],
      ["E3 FL", 2023, null],
      ["Electric", 2026, null],
    ],
  },
  {
    id: "porsche-macan",
    name: "Macan",
    yearFrom: 2014,
    gens: [
      ["95B", 2014, 2018],
      ["95B FL", 2019, 2021],
      ["95B.2", 2022, 2024],
      ["Electric", 2024, null],
    ],
  },
  {
    id: "porsche-panamera",
    name: "Panamera",
    yearFrom: 2009,
    gens: [
      ["970", 2009, 2013],
      ["970 FL", 2013, 2016],
      ["971", 2016, 2020],
      ["971 FL", 2020, 2023],
      ["972", 2024, null],
    ],
  },
  {
    id: "porsche-taycan",
    name: "Taycan",
    yearFrom: 2019,
    gens: [
      ["Taycan", 2019, 2024],
      ["FL", 2024, null],
    ],
  },
];

export function porscheGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of PORSCHE_MODELS) {
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
