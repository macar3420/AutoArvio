/**
 * One-shot / re-runnable: patch transmissionSummary in a_brand_powertrains.mjs
 * for real EU gearbox offerings (still one engine row; combined gearbox string).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "tools/a_brand_powertrains.mjs");
let src = fs.readFileSync(file, "utf8");

/** Unique old → new substring replacements (must match source exactly once ideally). */
const reps = [
  // A5 F5 Coupe — Mustafa example
  [
    'petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.5, W, CP)',
    'petrol("40 TFSI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 6.5, W, CP)',
  ],
  [
    'diesel("40 TDI 190", 190, "FWD / quattro", "S tronic", 5.0, W, CP)',
    'diesel("40 TDI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 5.0, W, CP)',
  ],
  // A5 Sportback F5
  [
    'petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.5, W, LB)',
    'petrol("40 TFSI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 6.5, W, LB)',
  ],
  [
    'diesel("40 TDI 190", 190, "quattro", "S tronic", 5.0, W, LB)',
    'diesel("40 TDI 190", 190, "quattro", "6MT / 7 S tronic", 5.0, W, LB)',
  ],
  // A4 B9
  [
    'petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 6.6, W, SA)',
    'petrol("40 TFSI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 6.6, W, SA)',
  ],
  [
    'diesel("35 TDI 163", 163, "FWD", "S tronic", 4.8, W, SA)',
    'diesel("35 TDI 163", 163, "FWD", "6MT / 7 S tronic", 4.8, W, SA)',
  ],
  [
    'diesel("40 TDI 190", 190, "FWD / quattro", "S tronic", 5.0, W, SA)',
    'diesel("40 TDI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 5.0, W, SA)',
  ],
  // A3 Sportback 8V
  [
    'petrol("2.0 TFSI 190", 190, "FWD / quattro", "S tronic", 5.8, N, HB)',
    'petrol("2.0 TFSI 190", 190, "FWD / quattro", "6MT / S tronic", 5.8, N, HB)',
  ],
  // Q2
  [
    'diesel("35 TDI 150", 150, "FWD / quattro", "S tronic", 4.9, W, SUV)',
    'diesel("35 TDI 150", 150, "FWD / quattro", "6MT / 7 S tronic", 4.9, W, SUV)',
  ],
  // Q3 F3
  [
    'petrol("40 TFSI 190", 190, "FWD / quattro", "S tronic", 7.0, W, SUV)',
    'petrol("40 TFSI 190", 190, "FWD / quattro", "6MT / 7 S tronic", 7.0, W, SUV)',
  ],
  [
    'diesel("35 TDI 150", 150, "FWD / quattro", "S tronic", 5.2, W, SUV)',
    'diesel("35 TDI 150", 150, "FWD / quattro", "6MT / 7 S tronic", 5.2, W, SUV)',
  ],
  // S3 8V early
  [
    'petrol("2.0 TFSI 300", 300, "quattro", "S tronic", 7.0, N, HB)',
    'petrol("2.0 TFSI 300", 300, "quattro", "6MT / S tronic", 7.0, N, HB)',
  ],
  // TTS / early TT RS
  [
    'petrol("2.0 TFSI 272", 272, "quattro", "S tronic", 8.0, N, CP)',
    'petrol("2.0 TFSI 272", 272, "quattro", "6MT / S tronic", 8.0, N, CP)',
  ],
  [
    'petrol("2.0 TFSI 310", 310, "quattro", "S tronic", 7.5, W, CP)',
    'petrol("2.0 TFSI 310", 310, "quattro", "6MT / S tronic", 7.5, W, CP)',
  ],
  [
    'petrol("2.5 TFSI", 340, "quattro", "S tronic", 9.5, N, CP)',
    'petrol("2.5 TFSI", 340, "quattro", "6MT / S tronic", 9.5, N, CP)',
  ],
  // A6 C6 / allroad — tiptronic also offered
  [
    'petrol("3.0 TFSI 290", 290, "quattro", "S tronic", 9.2, N, SA)',
    'petrol("3.0 TFSI 290", 290, "quattro", "S tronic / 6AT", 9.2, N, SA)',
  ],
  [
    'petrol("3.0 TFSI 290", 290, "quattro", "S tronic", 9.5, N, SUV)',
    'petrol("3.0 TFSI 290", 290, "quattro", "S tronic / 6AT", 9.5, N, SUV)',
  ],
  // Q3 8U — 2.0 TFSI 180/220 were S tronic (7DCT); also list as S tronic — rename 7DCT → 7 S tronic for clarity where MT not offered
  [
    'petrol("2.0 TFSI 180", 180, "quattro", "7DCT", 7.0, N, SUV)',
    'petrol("2.0 TFSI 180", 180, "quattro", "7 S tronic", 7.0, N, SUV)',
  ],
  [
    'petrol("2.0 TFSI 220", 220, "quattro", "7DCT", 7.3, N, SUV)',
    'petrol("2.0 TFSI 220", 220, "quattro", "7 S tronic", 7.3, N, SUV)',
  ],
  [
    'diesel("2.0 TDI 177", 177, "quattro", "7DCT", 5.5, N, SUV)',
    'diesel("2.0 TDI 177", 177, "quattro", "7 S tronic", 5.5, N, SUV)',
  ],
  // Q5 8R mid engines — 7DCT was S tronic; 2.0 TFSI 180 already 6MT / S tronic
  [
    'petrol("2.0 TFSI 211", 211, "quattro", "7DCT", 7.8, N, SUV)',
    'petrol("2.0 TFSI 211", 211, "quattro", "7 S tronic", 7.8, N, SUV)',
  ],
  [
    'petrol("3.2 FSI 270", 270, "quattro", "7DCT", 9.0, N, SUV)',
    'petrol("3.2 FSI 270", 270, "quattro", "7 S tronic", 9.0, N, SUV)',
  ],
  [
    'diesel("2.0 TDI 170", 170, "quattro", "7DCT", 5.9, N, SUV)',
    'diesel("2.0 TDI 170", 170, "quattro", "7 S tronic", 5.9, N, SUV)',
  ],
  [
    'diesel("3.0 TDI 240", 240, "quattro", "7DCT", 6.8, N, SUV)',
    'diesel("3.0 TDI 240", 240, "quattro", "7 S tronic", 6.8, N, SUV)',
  ],
  // S4 B8 / S5 8T 3.0 — 7DCT marketed as S tronic
  [
    'petrol("3.0 TFSI", 333, "quattro", "7DCT", 9.5, N, SA)',
    'petrol("3.0 TFSI", 333, "quattro", "7 S tronic", 9.5, N, SA)',
  ],
  [
    'petrol("3.0 TFSI", 333, "quattro", "7DCT", 9.5, N, CP)',
    'petrol("3.0 TFSI", 333, "quattro", "7 S tronic", 9.5, N, CP)',
  ],
  // A4 B8 tiptronic note already 7DCT / 8AT — clarify
  [
    'transmissionSummary: "7DCT / 8AT",',
    'transmissionSummary: "7 S tronic / 8AT",',
  ],
  // A1 8X 1.4 TFSI 185 — 7-speed S tronic
  [
    'petrol("1.4 TFSI 185", 185, "FWD", "7DCT", 5.9, N, HB)',
    'petrol("1.4 TFSI 185", 185, "FWD", "7 S tronic", 5.9, N, HB)',
  ],
  // RS / S models using 7DCT label → 7 S tronic (same gearbox, Audi naming)
  [
    'petrol("2.5 TFSI", 340, "quattro", "7DCT", 10.0, N, HB)',
    'petrol("2.5 TFSI", 340, "quattro", "7 S tronic", 10.0, N, HB)',
  ],
  [
    'petrol("2.5 TFSI", 367, "quattro", "7DCT", 8.5, N, HB)',
    'petrol("2.5 TFSI", 367, "quattro", "7 S tronic", 8.5, N, HB)',
  ],
  [
    'petrol("2.5 TFSI 400", 400, "quattro", "7DCT", 8.6, N, HB)',
    'petrol("2.5 TFSI 400", 400, "quattro", "7 S tronic", 8.6, N, HB)',
  ],
  [
    'petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.0, W, HB)',
    'petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.0, W, HB)', // no-op placeholder removed below
  ],
];

// Fix the accidental no-op and add real RS3 8Y / RS Q3 / TT-RS 8S / S6-S7 7DCT renames
reps.pop();
reps.push(
  [
    'petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.0, W, HB)',
    'petrol("2.5 TFSI", 400, "quattro", "7 S tronic", 9.0, W, HB)',
  ],
  [
    'petrol("2.5 TFSI", 310, "quattro", "7DCT", 8.8, N, SUV)',
    'petrol("2.5 TFSI", 310, "quattro", "7 S tronic", 8.8, N, SUV)',
  ],
  [
    'petrol("2.5 TFSI", 400, "quattro", "7DCT", 9.5, W, SUV)',
    'petrol("2.5 TFSI", 400, "quattro", "7 S tronic", 9.5, W, SUV)',
  ],
  [
    'petrol("2.5 TFSI", 400, "quattro", "7DCT", 8.5, W, CP)',
    'petrol("2.5 TFSI", 400, "quattro", "7 S tronic", 8.5, W, CP)',
  ],
  [
    'petrol("4.0 TFSI", 420, "quattro", "7DCT", 9.5, N, SA)',
    'petrol("4.0 TFSI", 420, "quattro", "7 S tronic", 9.5, N, SA)',
  ],
  [
    'petrol("4.0 TFSI", 420, "quattro", "7DCT", 9.5, N, LB)',
    'petrol("4.0 TFSI", 420, "quattro", "7 S tronic", 9.5, N, LB)',
  ],
  [
    'petrol("4.2 V8 FSI", 450, "quattro", "7DCT", 11.0, N, SA)',
    'petrol("4.2 V8 FSI", 450, "quattro", "7 S tronic", 11.0, N, SA)',
  ],
  [
    'petrol("4.2 V8 FSI", 450, "quattro", "7DCT", 11.0, N, CP)',
    'petrol("4.2 V8 FSI", 450, "quattro", "7 S tronic", 11.0, N, CP)',
  ],
  [
    'petrol("5.2 V10 FSI", 540, "quattro", "7DCT", 13.0, W, CP)',
    'petrol("5.2 V10 FSI", 540, "quattro", "7 S tronic", 13.0, W, CP)',
  ],
  [
    'petrol("5.2 V10 performance", 620, "quattro", "7DCT", 13.5, W, CP)',
    'petrol("5.2 V10 performance", 620, "quattro", "7 S tronic", 13.5, W, CP)',
  ],
);

let applied = 0;
const details = [];
for (const [from, to] of reps) {
  if (from === to) continue;
  const count = src.split(from).length - 1;
  if (count === 0) {
    details.push({ status: "miss", from: from.slice(0, 70) });
    continue;
  }
  src = src.split(from).join(to);
  applied += count;
  details.push({ status: "ok", n: count, to: to.match(/"[^"]*(?:MT|S tronic|AT|DCT)[^"]*"/)?.[0] });
}

fs.writeFileSync(file, src);
console.log(JSON.stringify({ applied, details }, null, 2));
