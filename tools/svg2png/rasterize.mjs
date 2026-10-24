import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const srcSvg = join(root, "logo (2).svg");
const brandDir = join(root, "brand");
const storeBrand =
  "C:\\Users\\musta\\AppData\\Local\\Cursor\\AgentStores\\cursor_agent_stores\\bc-291574c2-926b-43bb-a99f-2497b288c9a3\\files\\media\\brand";

mkdirSync(brandDir, { recursive: true });
mkdirSync(storeBrand, { recursive: true });

const svg = readFileSync(srcSvg);
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 500 },
  background: "transparent",
});
const pngData = resvg.render().asPng();

const brandSvg = join(brandDir, "autoarvio-logo-shared-a.svg");
const brandPng = join(brandDir, "autoarvio-logo-shared-a.png");
const storeSvg = join(storeBrand, "autoarvio-logo-shared-a.svg");
const storePng = join(storeBrand, "autoarvio-logo-shared-a.png");

copyFileSync(srcSvg, brandSvg);
copyFileSync(srcSvg, storeSvg);
writeFileSync(brandPng, pngData);
writeFileSync(storePng, pngData);

const info = resvg.getRenderedSize ? resvg.getRenderedSize() : null;
console.log(
  JSON.stringify(
    {
      source: srcSvg,
      format: "svg",
      declared: "width=500 height=500",
      renderedPng: "500px wide",
      brandSvg,
      brandPng,
      storeSvg,
      storePng,
      pngBytes: pngData.length,
      info,
    },
    null,
    2,
  ),
);
