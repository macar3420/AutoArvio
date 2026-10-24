/**
 * Trim BMW PHEV sibling generations that wrongly inherited ICE chassis history.
 * Patches generations.json in place; re-run build_generation_variants.mjs after.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const PLACEHOLDER = "generation_placeholder";

const g = (modelId, code, yearFrom, yearTo = null) => ({
  id: `${modelId}-${String(code)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`,
  modelId,
  code,
  yearFrom,
  yearTo,
  imageAsset: PLACEHOLDER,
});

/** Real EU PHEV chassis only (must match siblings / AB builder). */
const PHEV_GENS = {
  "bmw-330e": [
    ["F30/F31 LCI", 2016, 2019],
    ["G20/G21", 2019, null],
  ],
  "bmw-530e": [
    ["G30/G31", 2017, 2023],
    ["G60/G61", 2023, null],
  ],
  "bmw-225xe": [
    ["F45", 2016, 2021],
    ["U06", 2021, null],
  ],
  "bmw-x1-xdrive25e": [
    ["F48", 2019, 2022],
    ["U11", 2022, null],
  ],
  "bmw-x3-xdrive30e": [["G01", 2019, null]],
  "bmw-x5-xdrive45e": [["G05", 2019, null]],
};

const rootJson = JSON.parse(fs.readFileSync(gensPath, "utf8"));
const before = {};
const after = {};
const removed = [];

const keep = new Set(Object.keys(PHEV_GENS));
const next = [];

for (const row of rootJson.generations) {
  if (!keep.has(row.modelId)) {
    next.push(row);
    continue;
  }
  if (!before[row.modelId]) before[row.modelId] = [];
  before[row.modelId].push(`${row.code} ${row.yearFrom}–${row.yearTo ?? ""}`);
}

for (const [modelId, rows] of Object.entries(PHEV_GENS)) {
  after[modelId] = [];
  for (const [code, from, to] of rows) {
    const row = g(modelId, code, from, to);
    next.push(row);
    after[modelId].push(`${row.code} ${row.yearFrom}–${row.yearTo ?? ""}`);
  }
  const oldIds = (rootJson.generations || [])
    .filter((r) => r.modelId === modelId)
    .map((r) => r.id);
  const newIds = new Set(
    rows.map(
      ([code]) =>
        `${modelId}-${String(code)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}`,
    ),
  );
  for (const id of oldIds) {
    if (!newIds.has(id)) removed.push(id);
  }
}

// Also drop any leftover wrong ids if model had gens not in keep rebuild
rootJson.generations = next;
rootJson.generations.sort((a, b) =>
  a.modelId === b.modelId
    ? a.yearFrom - b.yearFrom || a.code.localeCompare(b.code)
    : a.modelId.localeCompare(b.modelId),
);
rootJson.count = rootJson.generations.length;

fs.writeFileSync(gensPath, JSON.stringify(rootJson, null, 2) + "\n", "utf8");
console.log(
  JSON.stringify(
    {
      count: rootJson.count,
      before,
      after,
      removedIds: removed,
    },
    null,
    2,
  ),
);
