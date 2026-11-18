/**
 * Drop Citroën, Dacia, Fiat, and Peugeot. Insert Finnish Alfa Romeo.
 * Idempotent. Does not touch curated Aion / Audi / BMW engine rows.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ALFA_MAKE, ALFA_MODELS, alfaGenerationRows } from "./alfa_romeo_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DROP = new Set(["citroen", "dacia", "fiat", "peugeot"]);

const catalogPath = path.join(root, "app/src/main/assets/catalog/fi_catalog.json");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const specsPath = path.join(root, "app/src/main/assets/catalog/generation_specs.json");
const ktPath = path.join(
  root,
  "app/src/main/java/fi/tamk/autoarvio/data/repository/CatalogRepository.kt",
);

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
catalog.note =
  "Finnish Nettiauto model filters. 2026-11: removed Citroën, Dacia, Fiat, and Peugeot; added Alfa Romeo FI models. Intro years are best-effort.";
catalog.makes = catalog.makes.filter((m) => !DROP.has(m.id) && m.id !== ALFA_MAKE.id);
const aionMake = catalog.makes.findIndex((m) => m.id === "aion");
catalog.makes.splice(aionMake + 1, 0, ALFA_MAKE);

const alfaModelRecords = ALFA_MODELS.map((m) => {
  const row = { id: m.id, makeId: ALFA_MAKE.id, name: m.name, yearFrom: m.yearFrom };
  if (m.yearTo != null) row.yearTo = m.yearTo;
  return row;
});
catalog.models = catalog.models.filter(
  (m) => !DROP.has(m.makeId) && m.makeId !== ALFA_MAKE.id,
);
const audiModel = catalog.models.findIndex((m) => m.makeId === "audi");
catalog.models.splice(audiModel, 0, ...alfaModelRecords);
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 4) + "\n", "utf8");

const alfaGens = alfaGenerationRows();
const gensRoot = JSON.parse(fs.readFileSync(gensPath, "utf8"));
const droppedGens = gensRoot.generations.filter((g) => DROP.has(g.modelId.split("-")[0]));
gensRoot.note =
  "FI catalog generations, including Alfa Romeo series and facelifts. Shared placeholder imageAsset. Engines are in generation_specs.json.";
gensRoot.generations = gensRoot.generations.filter(
  (g) => !DROP.has(g.modelId.split("-")[0]) && !g.modelId.startsWith("alfaromeo-"),
);
const audiGen = gensRoot.generations.findIndex((g) => g.modelId.startsWith("audi-"));
gensRoot.generations.splice(audiGen, 0, ...alfaGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(
  gensPath,
  JSON.stringify(gensRoot, null, 2).replace(/\n/g, "\r\n") + "\r\n",
  "utf8",
);

const specs = JSON.parse(fs.readFileSync(specsPath, "utf8"));
const variants = {};
let curatedKept = 0;
for (const gen of gensRoot.generations) {
  const existing = specs.variants[gen.id];
  variants[gen.id] = existing ?? [];
  if (variants[gen.id].length) curatedKept++;
}
specs.note =
  "Curated European-market engines & versions only. Packs: Aion/Audi + BMW + Alfa Romeo. MT vs automatic are separate rows. Other makes empty until curated. tools/build_generation_variants.mjs";
specs.variants = variants;
fs.writeFileSync(
  specsPath,
  JSON.stringify(specs, null, 2).replace(/\n/g, "\r\n") + "\r\n",
  "utf8",
);

const kt = fs.readFileSync(ktPath, "utf8");
const nl = kt.includes("\r\n") ? "\r\n" : "\n";
const lines = kt.split(/\r?\n/);
const makeRe = /Make\(id = "(citroen|dacia|fiat|peugeot|alfaromeo)"/;
const modelRe = /m\("[^"]+", "(citroen|dacia|fiat|peugeot|alfaromeo)"/;
const kept = lines.filter((line) => !makeRe.test(line) && !modelRe.test(line));
const aionMakeLine = kept.findIndex((line) => line.includes('Make(id = "aion"'));
const alfaMakeLine = `        Make(id = "${ALFA_MAKE.id}", name = "${ALFA_MAKE.name}"),`;
kept.splice(aionMakeLine + 1, 0, alfaMakeLine);
const audiKt = kept.findIndex((line) => line.includes('m("audi-a1"'));
const alfaKt = alfaModelRecords.map((m) => {
  let call = `        m("${m.id}", "${m.makeId}", "${m.name}", ${m.yearFrom}`;
  if (m.yearTo != null) call += `, ${m.yearTo}`;
  return call + "),";
});
kept.splice(audiKt, 0, ...alfaKt);
fs.writeFileSync(ktPath, kept.join(nl) + (kt.endsWith(nl) ? nl : ""), "utf8");

const slugDir = path.join(root, "app/src/main/assets/catalog/nettiauto-slugs");
for (const name of ["citroen.txt", "dacia.txt", "fiat.txt", "peugeot.txt"]) {
  const p = path.join(slugDir, name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}
const slugs = ALFA_MODELS.map((m) => m.id.replace(/^alfaromeo-/, ""));
fs.writeFileSync(
  path.join(slugDir, "alfa-romeo.txt"),
  slugs.join("\n") + "\n",
  "utf8",
);

const byMake = {};
for (const g of gensRoot.generations) {
  const make = g.modelId.split("-")[0];
  byMake[make] = (byMake[make] || 0) + 1;
}
console.log(
  JSON.stringify(
    {
      makes: catalog.makes.length,
      models: catalog.models.length,
      droppedGenerations: droppedGens.length,
      alfaModels: ALFA_MODELS.length,
      alfaGenerations: alfaGens.length,
      generations: gensRoot.generations.length,
      curatedGenerationsKept: curatedKept,
      makeOrder: catalog.makes.map((m) => m.id),
    },
    null,
    2,
  ),
);
