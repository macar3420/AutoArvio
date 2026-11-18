/**
 * Replace Alfa Romeo rows in generations.json from alfa_romeo_fi.mjs.
 * Does not touch other makes. Preserves CRLF.
 *
 * Usage: node tools/sync_alfa_generations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { alfaGenerationRows } from "./alfa_romeo_fi.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gensPath = path.join(root, "app/src/main/assets/catalog/generations.json");
const raw = fs.readFileSync(gensPath, "utf8");
const nl = raw.includes("\r\n") ? "\r\n" : "\n";
const gensRoot = JSON.parse(raw);
const alfaGens = alfaGenerationRows();
const ids = alfaGens.map((g) => g.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate Alfa generation ids:", dupes);
  process.exit(1);
}

gensRoot.note =
  "FI catalog generations, including Alfa Romeo series and facelifts. Shared placeholder imageAsset. Engines are in generation_specs.json.";
gensRoot.generations = gensRoot.generations.filter((g) => !g.modelId.startsWith("alfaromeo-"));
const audiGen = gensRoot.generations.findIndex((g) => g.modelId.startsWith("audi-"));
if (audiGen < 0) {
  console.error("Audi generations missing; cannot place Alfa Romeo.");
  process.exit(1);
}
gensRoot.generations.splice(audiGen, 0, ...alfaGens);
gensRoot.count = gensRoot.generations.length;
fs.writeFileSync(gensPath, JSON.stringify(gensRoot, null, 2).replace(/\n/g, nl) + nl, "utf8");
console.log(
  JSON.stringify(
    {
      alfaGenerations: alfaGens.length,
      generations: gensRoot.count,
      first: alfaGens[0].id,
      last: alfaGens[alfaGens.length - 1].id,
    },
    null,
    2,
  ),
);
