/**
 * Replace Honda with the common Finnish lineup from honda_fi.mjs.
 *
 * Usage: node tools/sync_honda_catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { HONDA_MODELS, hondaGenerationRows } from "./honda_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);
const slugPath = path.join(root, "app/src/main/assets/catalog/nettiauto-slugs/honda.txt");

const hondaGens = hondaGenerationRows();
const ids = hondaGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate Honda generation ids:", dupes);
  process.exit(1);
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
const hondaAt = gensRoot.generations.findIndex((g) => g.modelId.startsWith("honda-"));
if (hondaAt < 0) {
  console.error("Honda generations missing.");
  process.exit(1);
}
const removedGens = gensRoot.generations.filter((g) => g.modelId.startsWith("honda-")).length;
gensRoot.note =
  "FI catalog generations. Alfa Romeo, BYD, Cupra, Ford, and Honda follow the cars sold in Finland. Shared placeholder imageAsset.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("honda-"));
gensRoot.generations.splice(hondaAt, 0, ...hondaGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
const catalogAt = catalog.models.findIndex((m) => m.makeId === "honda");
if (catalogAt < 0) {
  console.error("Honda models missing from fi_catalog.json.");
  process.exit(1);
}
const removedModels = catalog.models.filter((m) => m.makeId === "honda").length;
const catalogRows = HONDA_MODELS.map((src) => {
  const row = { id: src.id, makeId: "honda", name: src.name, yearFrom: src.yearFrom };
  if (src.yearTo != null) row.yearTo = src.yearTo;
  return row;
});
catalog.models = catalog.models.filter((m) => m.makeId !== "honda");
catalog.models.splice(catalogAt, 0, ...catalogRows);
fs.writeFileSync(
  catalogPath,
  JSON.stringify(catalog, null, 4).replace(/\n/g, catalogNl) + catalogNl,
  "utf8",
);

const ktRaw = fs.readFileSync(ktPath, "utf8");
const ktNl = ktRaw.includes("\r\n") ? "\r\n" : "\n";
const lines = ktRaw.split(/\r?\n/);
const hondaLines = lines
  .map((line, i) => (/^\s*m\("honda-/.test(line) ? i : -1))
  .filter((i) => i >= 0);
if (!hondaLines.length) {
  console.error("No Honda model lines in CatalogRepository.kt.");
  process.exit(1);
}
const indent = lines[hondaLines[0]].match(/^(\s*)/)[1];
const replacement = HONDA_MODELS.map((src) => {
  let call = `${indent}m("${src.id}", "honda", "${src.name}", ${src.yearFrom}`;
  if (src.yearTo != null) call += `, ${src.yearTo}`;
  return `${call}),`;
});
const drop = new Set(hondaLines);
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
  "Cupra, and Ford curated",
  "Cupra, Ford, and Honda curated",
);
fs.writeFileSync(ktPath, ktOut, "utf8");

const slugNl = fs.existsSync(slugPath) && fs.readFileSync(slugPath, "utf8").includes("\r\n") ? "\r\n" : "\n";
const slugs = HONDA_MODELS.map((m) => m.id.replace(/^honda-/, ""));
fs.writeFileSync(slugPath, slugs.join(slugNl) + slugNl, "utf8");

console.log(
  JSON.stringify(
    {
      keptModels: HONDA_MODELS.length,
      removedModels,
      keptGenerations: hondaGens.length,
      removedGenerations: removedGens,
      generations: gensRoot.count,
      ids,
    },
    null,
    2,
  ),
);
