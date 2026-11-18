/**
 * Replace Cupra generations from cupra_fi.mjs and align model years
 * in fi_catalog.json and CatalogRepository.kt.
 *
 * Usage: node tools/sync_cupra_catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CUPRA_MODELS, cupraGenerationRows } from "./cupra_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);

const cupraGens = cupraGenerationRows();
const ids = cupraGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate Cupra generation ids:", dupes);
  process.exit(1);
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
gensRoot.note =
  "FI catalog generations. Alfa Romeo, BYD, and Cupra follow the cars sold in Finland. Shared placeholder imageAsset.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("cupra-"));
const fordGen = gensRoot.generations.findIndex((g) => g.modelId.startsWith("ford-"));
if (fordGen < 0) {
  console.error("Ford generations missing; cannot place Cupra.");
  process.exit(1);
}
gensRoot.generations.splice(fordGen, 0, ...cupraGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
const byId = new Map(CUPRA_MODELS.map((m) => [m.id, m]));
let catalogHits = 0;
catalog.models = catalog.models.map((model) => {
  const src = byId.get(model.id);
  if (!src) return model;
  catalogHits++;
  const row = { id: src.id, makeId: "cupra", name: src.name, yearFrom: src.yearFrom };
  if (src.yearTo != null) row.yearTo = src.yearTo;
  return row;
});
if (catalogHits !== CUPRA_MODELS.length) {
  console.error("Catalog Cupra models", catalogHits, "expected", CUPRA_MODELS.length);
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
  const match = line.match(/^(\s*)m\("(cupra-[^"]+)", "cupra", "([^"]*)".*\),$/);
  if (!match) return line;
  const src = byId.get(match[2]);
  if (!src) return line;
  ktHits++;
  let call = `${match[1]}m("${src.id}", "cupra", "${src.name}", ${src.yearFrom}`;
  if (src.yearTo != null) call += `, ${src.yearTo}`;
  return `${call}),`;
});
if (ktHits !== CUPRA_MODELS.length) {
  console.error("Kotlin Cupra models", ktHits, "expected", CUPRA_MODELS.length);
  process.exit(1);
}
let ktOut = next.join(ktNl);
if (ktRaw.endsWith(ktNl) && !ktOut.endsWith(ktNl)) ktOut += ktNl;
if (!ktRaw.endsWith(ktNl) && ktOut.endsWith(ktNl)) ktOut = ktOut.slice(0, -ktNl.length);
fs.writeFileSync(ktPath, ktOut, "utf8");

console.log(
  JSON.stringify(
    {
      cupraModels: CUPRA_MODELS.length,
      cupraGenerations: cupraGens.length,
      generations: gensRoot.count,
      ids,
    },
    null,
    2,
  ),
);
