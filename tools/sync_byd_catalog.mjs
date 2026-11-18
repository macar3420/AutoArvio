/**
 * Replace BYD generations from byd_fi.mjs and align model names / years
 * in fi_catalog.json and CatalogRepository.kt. Preserves line endings.
 *
 * Usage: node tools/sync_byd_catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BYD_MODELS, bydGenerationRows } from "./byd_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);

const bydGens = bydGenerationRows();
const ids = bydGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate BYD generation ids:", dupes);
  process.exit(1);
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
gensRoot.note =
  "FI catalog generations. Alfa Romeo and BYD follow the cars sold in Finland. Shared placeholder imageAsset.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("byd-"));
const cupraGen = gensRoot.generations.findIndex((g) => g.modelId.startsWith("cupra-"));
if (cupraGen < 0) {
  console.error("Cupra generations missing; cannot place BYD.");
  process.exit(1);
}
gensRoot.generations.splice(cupraGen, 0, ...bydGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
const byId = new Map(BYD_MODELS.map((m) => [m.id, m]));
let catalogHits = 0;
catalog.models = catalog.models.map((model) => {
  const src = byId.get(model.id);
  if (!src) return model;
  catalogHits++;
  const row = { id: src.id, makeId: "byd", name: src.name, yearFrom: src.yearFrom };
  if (src.yearTo != null) row.yearTo = src.yearTo;
  return row;
});
if (catalogHits !== BYD_MODELS.length) {
  console.error("Catalog BYD models", catalogHits, "expected", BYD_MODELS.length);
  process.exit(1);
}
fs.writeFileSync(
  catalogPath,
  JSON.stringify(catalog, null, 4).replace(/\n/g, catalogNl) + catalogNl,
  "utf8",
);

const ktRaw = fs.readFileSync(ktPath, "utf8");
const ktNl = ktRaw.includes("\r\n") ? "\r\n" : "\n";
const lines = ktRaw.split(/\r?\n/);
let ktHits = 0;
const next = lines.map((line) => {
  const match = line.match(/^(\s*)m\("(byd-[^"]+)", "byd", "[^"]*".*\),$/);
  if (!match) return line;
  const src = byId.get(match[2]);
  if (!src) return line;
  ktHits++;
  let call = `${match[1]}m("${src.id}", "byd", "${src.name}", ${src.yearFrom}`;
  if (src.yearTo != null) call += `, ${src.yearTo}`;
  return `${call}),`;
});
if (ktHits !== BYD_MODELS.length) {
  console.error("Kotlin BYD models", ktHits, "expected", BYD_MODELS.length);
  process.exit(1);
}
let ktOut = next.join(ktNl);
if (ktRaw.endsWith(ktNl) && !ktOut.endsWith(ktNl)) ktOut += ktNl;
if (!ktRaw.endsWith(ktNl) && ktOut.endsWith(ktNl)) ktOut = ktOut.slice(0, -ktNl.length);
fs.writeFileSync(ktPath, ktOut, "utf8");

console.log(
  JSON.stringify(
    {
      bydModels: BYD_MODELS.length,
      bydGenerations: bydGens.length,
      generations: gensRoot.count,
      ids,
    },
    null,
    2,
  ),
);
