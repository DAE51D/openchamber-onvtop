import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const targets = [
  { entry: "src/panel/main.ts", out: "panel/main.js", node: false },
  { entry: "src/status/main.ts", out: "status/main.js", node: false },
  { entry: "src/service/main.ts", out: "service/main.js", node: true },
];

for (const target of targets) {
  const result = await Bun.build({
    entrypoints: [resolve(target.entry)],
    format: target.node ? "esm" : "iife",
    target: target.node ? "node" : "browser",
    minify: !target.node,
  });
  if (!result.success) {
    throw new Error(`Build failed for ${target.out}`);
  }
  const artifact = result.outputs[0];
  await writeFile(resolve(target.out), await artifact.text());
  console.log(`Built ${target.out}`);
}
