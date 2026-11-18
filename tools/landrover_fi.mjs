/**
 * Land Rover models commonly sold in Finland.
 * Current lineup plus the volume cars people still own.
 * Engines live in landrover_powertrains.mjs.
 */
export const LANDROVER_MAKE = { id: "landrover", name: "Land Rover" };

/** @type {{ id: string, name: string, yearFrom: number, yearTo?: number, gens: [string, number, number|null][] }[]} */
export const LANDROVER_MODELS = [
  {
    id: "landrover-defender",
    name: "Defender",
    yearFrom: 1983,
    gens: [
      ["90/110", 1983, 1990],
      ["200 Tdi", 1990, 1994],
      ["300 Tdi", 1994, 1998],
      ["Td5", 1998, 2006],
      ["TDCi", 2007, 2011],
      ["TDCi FL", 2012, 2016],
      ["L663", 2020, 2024],
      ["L663 FL", 2025, null],
    ],
  },
  {
    id: "landrover-discovery",
    name: "Discovery",
    yearFrom: 1989,
    gens: [
      ["I", 1989, 1994],
      ["I FL", 1994, 1998],
      ["II", 1998, 2004],
      ["III", 2004, 2009],
      ["IV", 2009, 2013],
      ["IV FL", 2014, 2016],
      ["V", 2017, 2020],
      ["V FL", 2021, null],
    ],
  },
  {
    id: "landrover-discovery-sport",
    name: "Discovery Sport",
    yearFrom: 2015,
    gens: [
      ["I", 2015, 2019],
      ["I FL", 2020, null],
    ],
  },
  {
    id: "landrover-freelander",
    name: "Freelander",
    yearFrom: 1997,
    yearTo: 2014,
    gens: [
      ["I", 1997, 2000],
      ["I FL", 2001, 2006],
      ["II", 2006, 2010],
      ["II FL", 2011, 2014],
    ],
  },
  {
    id: "landrover-range-rover",
    name: "Range Rover",
    yearFrom: 1970,
    gens: [
      ["Classic", 1970, 1996],
      ["P38", 1994, 2002],
      ["L322", 2002, 2005],
      ["L322 FL", 2006, 2009],
      ["L322 10", 2010, 2012],
      ["L405", 2012, 2017],
      ["L405 FL", 2018, 2021],
      ["L460", 2022, null],
    ],
  },
  {
    id: "landrover-range-rover-electric",
    name: "Range Rover Electric",
    yearFrom: 2026,
    gens: [["Electric", 2026, null]],
  },
  {
    id: "landrover-range-rover-sport",
    name: "Range Rover Sport",
    yearFrom: 2005,
    gens: [
      ["L320", 2005, 2009],
      ["L320 FL", 2010, 2013],
      ["L494", 2013, 2017],
      ["L494 FL", 2018, 2022],
      ["L461", 2022, null],
    ],
  },
  {
    id: "landrover-range-rover-sport-electric",
    name: "Range Rover Sport Electric",
    yearFrom: 2026,
    gens: [["Electric", 2026, null]],
  },
  {
    id: "landrover-range-rover-evoque",
    name: "Range Rover Evoque",
    yearFrom: 2011,
    gens: [
      ["L538", 2011, 2015],
      ["L538 FL", 2016, 2019],
      ["L551", 2019, 2023],
      ["L551 FL", 2024, null],
    ],
  },
  {
    id: "landrover-range-rover-velar",
    name: "Range Rover Velar",
    yearFrom: 2017,
    gens: [
      ["L560", 2017, 2020],
      ["L560 FL", 2021, null],
    ],
  },
];

export function landroverGenerationRows() {
  const slug = (code) =>
    String(code)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const rows = [];
  for (const model of LANDROVER_MODELS) {
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
