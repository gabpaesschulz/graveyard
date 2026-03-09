/**
 * patch-prisma.mjs
 *
 * Patches .prisma/client/package.json to add explicit "types" conditions
 * for the "./default" and "./client" subpath exports.
 *
 * VS Code's TypeScript language server requires explicit "types" entries in
 * the exports map to resolve @prisma/client correctly when moduleResolution
 * is set to "bundler". Without this patch, all @prisma/client imports show
 * false-positive "has no exported member" errors in the editor.
 *
 * This script is automatically run after `prisma generate` (see package.json).
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(__dirname, "../node_modules/.prisma/client/package.json");

let pkg;
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
} catch {
  console.log("[patch-prisma] .prisma/client/package.json not found — skipping.");
  process.exit(0);
}

let changed = false;

// 1. Add "types" at top-level of the "." export entry
if (!pkg.exports?.["."]?.types) {
  const dotEntry = pkg.exports["."] ?? {};
  pkg.exports["."] = { types: "./index.d.ts", ...dotEntry };
  changed = true;
}

// 2. Add explicit "./default" entry with types
if (!pkg.exports?.["./default"]?.types) {
  pkg.exports["./default"] = {
    types: "./default.d.ts",
    require: "./default.js",
    import: "./default.js",
    default: "./default.js",
  };
  changed = true;
}

// 3. Add explicit "./client" entry with types
if (!pkg.exports?.["./client"]?.types) {
  pkg.exports["./client"] = {
    types: "./client.d.ts",
    require: "./index.js",
    import: "./index.js",
    default: "./index.js",
  };
  changed = true;
}

if (changed) {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("[patch-prisma] ✔ Patched .prisma/client/package.json with explicit types entries.");
} else {
  console.log("[patch-prisma] Already patched — nothing to do.");
}
