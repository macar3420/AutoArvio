/**
 * Replace MG, MINI, Mitsubishi, and Nissan with the Finnish / European lineup.
 *
 * Usage: node tools/sync_m_brands.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MG_MODELS, mgGenerationRows } from "./mg_fi.mjs";
import { MG_POWERTRAINS } from "./mg_powertrains.mjs";
import { MINI_MODELS, miniGenerationRows } from "./mini_fi.mjs";
import { MINI_POWERTRAINS } from "./mini_powertrains.mjs";
import { MITSUBISHI_MODELS, mitsubishiGenerationRows } from "./mitsubishi_fi.mjs";
import { MITSUBISHI_POWERTRAINS } from "./mitsubishi_powertrains.mjs";
import { NISSAN_MODELS, nissanGenerationRows } from "./nissan_fi.mjs";
import { NISSAN_POWERTRAINS } from "./nissan_powertrains.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);

const brands = [
  ["mg", MG_MODELS, mgGenerationRows(), MG_POWERTRAINS],
  ["mini", MINI_MODELS, miniGenerationRows(), MINI_POWERTRAINS],
  ["mitsubishi", MITSUBISHI_MODELS, mitsubishiGenerationRows(), MITSUBISHI_POWERTRAINS],
  ["nissan", NISSAN_MODELS, nissanGenerationRows(), NISSAN_POWERTRAINS],
];

for (const [makeId, models, brandGens, power] of brands) {
  const ids = brandGens.map((g) => g.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  const missing = ids.filter((id) => !power[id]?.length);
  const extra = Object.keys(power).filter((id) => !ids.includes(id));
  if (dupes.length || missing.length || extra.length) {
    console.error(makeId, JSON.stringify({ dupes, missing, extra }, null, 2));
    process.exit(1);
  }
}

const gensRaw = fs.readFileSync(gensPath, "utf8");
const gensNl = gensRaw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(gensRaw);
const summary = {};

for (const [makeId, , brandGens] of brands) {
  const at = gensRoot.generations.findIndex((g) => g.modelId.startsWith(`${makeId}-`));
  if (at < 0) {
    console.error(`${makeId} generations missing.`);
    process.exit(1);
  }
  const removed = gensRoot.generations.filter((g) => g.modelId.startsWith(`${makeId}-`)).length;
  gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith(`${makeId}-`));
  const insertAt = gensRoot.generations.findIndex((g) => g.modelId.startsWith(`${makeId}-`));
  const atNow = insertAt < 0 ? Math.min(at, gensRoot.generations.length) : insertAt;
  gensRoot.generations.splice(atNow, 0, ...brandGens);
  summary[makeId] = { removedGenerations: removed, keptGenerations: brandGens.length };
}

gensRoot.note =
  "FI catalog generations. Alfa Romeo, BYD, Cupra, Ford, Honda, Hyundai, Kia, Land Rover, Lexus, Maxus, Mazda, Mercedes-Benz, MG, MINI, Mitsubishi, and Nissan follow the cars sold in Finland or Europe. Shared placeholder imageAsset.";
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, gensNl) + gensNl, "utf8");

const catalogRaw = fs.readFileSync(catalogPath, "utf8");
const catalogNl = catalogRaw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(catalogRaw);
for (const [makeId, models] of brands) {
  const at = catalog.models.findIndex((m) => m.makeId === makeId);
  if (at < 0) {
    console.error(`${makeId} models missing from fi_catalog.json.`);
    process.exit(1);
  }
  const removed = catalog.models.filter((m) => m.makeId === makeId).length;
  const rows = models.map((src) => {
    const row = { id: src.id, makeId, name: src.name, yearFrom: src.yearFrom };
    if (src.yearTo != null) row.yearTo = src.yearTo;
    return row;
  });
  catalog.models = catalog.models.filter((m) => m.makeId !== makeId);
  const insertAt = catalog.models.findIndex((m) => m.makeId === makeId);
  catalog.models.splice(insertAt < 0 ? at : insertAt, 0, ...rows);
  summary[makeId].removedModels = removed;
  summary[makeId].keptModels = models.length;
}
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 4).replace(/\n/g, catalogNl) + catalogNl, "utf8");

const ktRaw = fs.readFileSync(ktPath, "utf8");
const ktNl = ktRaw.includes("\r\n") ? "\r\n" : "\n";
let lines = ktRaw.split(/\r?\n/);
for (const [makeId, models] of brands) {
  const brandLines = lines
    .map((line, i) => (new RegExp(`^\\s*m\\("${makeId}-`).test(line) ? i : -1))
    .filter((i) => i >= 0);
  if (!brandLines.length) {
    console.error(`No ${makeId} model lines in CatalogRepository.kt.`);
    process.exit(1);
  }
  const indent = lines[brandLines[0]].match(/^(\s*)/)[1];
  const replacement = models.map((src) => {
    let call = `${indent}m("${src.id}", "${makeId}", "${src.name}", ${src.yearFrom}`;
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
  lines = next;
}
let ktOut = lines.join(ktNl);
if (ktRaw.endsWith(ktNl) && !ktOut.endsWith(ktNl)) ktOut += ktNl;
if (!ktRaw.endsWith(ktNl) && ktOut.endsWith(ktNl)) ktOut = ktOut.slice(0, -ktNl.length);
ktOut = ktOut.replace(
  "Maxus, Mazda, and Mercedes-Benz curated",
  "Maxus, Mazda, Mercedes-Benz, MG, MINI, Mitsubishi, and Nissan curated",
);
fs.writeFileSync(ktPath, ktOut, "utf8");

for (const [makeId, models] of brands) {
  const slugPath = path.join(root, `app/src/main/assets/catalog/nettiauto-slugs/${makeId}.txt`);
  const slugRaw = fs.existsSync(slugPath) ? fs.readFileSync(slugPath, "utf8") : "\n";
  const slugNl = slugRaw.includes("\r\n") ? "\r\n" : "\n";
  const slugs = models.map((m) => m.id.replace(new RegExp(`^${makeId}-`), ""));
  fs.writeFileSync(slugPath, slugs.join(slugNl) + slugNl, "utf8");
}

console.log(JSON.stringify({ generations: gensRoot.count, ...summary }, null, 2));
