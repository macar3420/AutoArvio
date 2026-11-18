/**
 * Replace Ford with the current Finnish lineup from ford_fi.mjs.
 * Drops historical and rare models, then rewrites generations,
 * fi_catalog.json, and the Kotlin model list.
 *
 * Usage: node tools/sync_ford_catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FORD_MODELS, fordGenerationRows } from "./ford_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);
const slugPath = path.join(root, "app/src/main/assets/catalog/nettiauto-slugs/ford.txt");

const fordGens = fordGenerationRows();
const ids = fordGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate Ford generation ids:", dupes);
  process.exit(1);
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
const fordAt = gensRoot.generations.findIndex((g) => g.modelId.startsWith("ford-"));
if (fordAt < 0) {
  console.error("Ford generations missing.");
  process.exit(1);
}
const removedGens = gensRoot.generations.filter((g) => g.modelId.startsWith("ford-")).length;
gensRoot.note =
  "FI catalog generations. Alfa Romeo, BYD, Cupra, and Ford follow the cars sold in Finland. Shared placeholder imageAsset.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("ford-"));
gensRoot.generations.splice(fordAt, 0, ...fordGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
const catalogAt = catalog.models.findIndex((m) => m.makeId === "ford");
if (catalogAt < 0) {
  console.error("Ford models missing from fi_catalog.json.");
  process.exit(1);
}
const removedModels = catalog.models.filter((m) => m.makeId === "ford").length;
const catalogRows = FORD_MODELS.map((src) => {
  const row = { id: src.id, makeId: "ford", name: src.name, yearFrom: src.yearFrom };
  if (src.yearTo != null) row.yearTo = src.yearTo;
  return row;
});
catalog.models = catalog.models.filter((m) => m.makeId !== "ford");
catalog.models.splice(catalogAt, 0, ...catalogRows);
fs.writeFileSync(
  catalogPath,
  JSON.stringify(catalog, null, 4).replace(/\n/g, catalogNl) + catalogNl,
  "utf8",
);

const ktRaw = fs.readFileSync(ktPath, "utf8");
const ktNl = ktRaw.includes("\r\n") ? "\r\n" : "\n";
const lines = ktRaw.split(/\r?\n/);
const fordLines = lines
  .map((line, i) => (/^\s*m\("ford-/.test(line) ? i : -1))
  .filter((i) => i >= 0);
if (!fordLines.length) {
  console.error("No Ford model lines in CatalogRepository.kt.");
  process.exit(1);
}
const indent = lines[fordLines[0]].match(/^(\s*)/)[1];
const replacement = FORD_MODELS.map((src) => {
  let call = `${indent}m("${src.id}", "ford", "${src.name}", ${src.yearFrom}`;
  if (src.yearTo != null) call += `, ${src.yearTo}`;
  return `${call}),`;
});
const drop = new Set(fordLines);
const next = [];
let inserted = false;
for (let i = 0; i < lines.length; i++) {
  if (drop.has(i)) {
    if (!inserted) {
      next.push(...replacement);
      inserted = true;
    }
    continue;
  }
  next.push(lines[i]);
}
let ktOut = next.join(ktNl);
if (ktRaw.endsWith(ktNl) && !ktOut.endsWith(ktNl)) ktOut += ktNl;
if (!ktRaw.endsWith(ktNl) && ktOut.endsWith(ktNl)) ktOut = ktOut.slice(0, -ktNl.length);
ktOut = ktOut.replace(
  "Aion, Audi, BMW, Alfa Romeo, BYD, and Cupra curated",
  "Aion, Audi, BMW, Alfa Romeo, BYD, Cupra, and Ford curated",
);
fs.writeFileSync(ktPath, ktOut, "utf8");

const slugNl = fs.existsSync(slugPath) && fs.readFileSync(slugPath, "utf8").includes("\r\n") ? "\r\n" : "\n";
const slugs = FORD_MODELS.map((m) => m.id.replace(/^ford-/, ""));
fs.writeFileSync(slugPath, slugs.join(slugNl) + slugNl, "utf8");

console.log(
  JSON.stringify(
    {
      keptModels: FORD_MODELS.length,
      removedModels,
      keptGenerations: fordGens.length,
      removedGenerations: removedGens,
      generations: gensRoot.count,
      ids,
    },
    null,
    2,
  ),
);
