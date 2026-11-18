/**
 * Replace Kia with the common Finnish lineup from kia_fi.mjs.
 *
 * Usage: node tools/sync_kia_catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { KIA_MODELS, kiaGenerationRows } from "./kia_fi.mjs";
import { KIA_POWERTRAINS } from "./kia_powertrains.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);
const slugPath = path.join(root, "app/src/main/assets/catalog/nettiauto-slugs/kia.txt");

const kiaGens = kiaGenerationRows();
const ids = kiaGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
const missing = ids.filter((id) => !KIA_POWERTRAINS[id]?.length);
const extra = Object.keys(KIA_POWERTRAINS).filter((id) => !ids.includes(id));
if (dupes.length || missing.length || extra.length) {
  console.error(JSON.stringify({ dupes, missing, extra }, null, 2));
  process.exit(1);
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
const at = gensRoot.generations.findIndex((g) => g.modelId.startsWith("kia-"));
if (at < 0) {
  console.error("Kia generations missing.");
  process.exit(1);
}
const removedGens = gensRoot.generations.filter((g) => g.modelId.startsWith("kia-")).length;
gensRoot.note =
  "FI catalog generations. Alfa Romeo, BYD, Cupra, Ford, Honda, Hyundai, and Kia follow the cars sold in Finland. Shared placeholder imageAsset.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("kia-"));
gensRoot.generations.splice(at, 0, ...kiaGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
const catalogAt = catalog.models.findIndex((m) => m.makeId === "kia");
if (catalogAt < 0) {
  console.error("Kia models missing from fi_catalog.json.");
  process.exit(1);
}
const removedModels = catalog.models.filter((m) => m.makeId === "kia").length;
const catalogRows = KIA_MODELS.map((src) => {
  const row = { id: src.id, makeId: "kia", name: src.name, yearFrom: src.yearFrom };
  if (src.yearTo != null) row.yearTo = src.yearTo;
  return row;
});
catalog.models = catalog.models.filter((m) => m.makeId !== "kia");
catalog.models.splice(catalogAt, 0, ...catalogRows);
fs.writeFileSync(
  catalogPath,
  JSON.stringify(catalog, null, 4).replace(/\n/g, catalogNl) + catalogNl,
  "utf8",
);

const ktRaw = fs.readFileSync(ktPath, "utf8");
const ktNl = ktRaw.includes("\r\n") ? "\r\n" : "\n";
const lines = ktRaw.split(/\r?\n/);
const brandLines = lines
  .map((line, i) => (/^\s*m\("kia-/.test(line) ? i : -1))
  .filter((i) => i >= 0);
if (!brandLines.length) {
  console.error("No Kia model lines in CatalogRepository.kt.");
  process.exit(1);
}
const indent = lines[brandLines[0]].match(/^(\s*)/)[1];
const replacement = KIA_MODELS.map((src) => {
  let call = `${indent}m("${src.id}", "kia", "${src.name}", ${src.yearFrom}`;
  if (src.yearTo != null) call += `, ${src.yearTo}`;
  return `${call}),`;
});
const drop = new Set(brandLines);
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
if (!ktOut.includes("Kia curated")) {
  ktOut = ktOut.replace("and Hyundai curated", "Hyundai, and Kia curated");
}
fs.writeFileSync(ktPath, ktOut, "utf8");

const slugNl = fs.existsSync(slugPath) && fs.readFileSync(slugPath, "utf8").includes("\r\n") ? "\r\n" : "\n";
const slugs = KIA_MODELS.map((m) => m.id.replace(/^kia-/, ""));
fs.writeFileSync(slugPath, slugs.join(slugNl) + slugNl, "utf8");

console.log(
  JSON.stringify(
    {
      keptModels: KIA_MODELS.length,
      removedModels,
      keptGenerations: kiaGens.length,
      removedGenerations: removedGens,
      generations: gensRoot.count,
    },
    null,
    2,
  ),
);
