// Prints the CV document route to public/cv/*.pdf with headless Chrome (D-013).
// Usage: npm run cv:pdf    builds, prints both PDFs, records a hash of their sources
//        npm run cv:check  fails if the CV sources changed since the PDFs were printed (CI)
// Chrome path: $CHROME_PATH, else the default macOS install. No extra dependencies.
import { spawn, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Everything that changes what the PDF says or how it looks. Dictionaries count only for
// the CV labels, so unrelated copy edits elsewhere on the site do not mark the PDFs stale.
function sourceHash() {
  const h = createHash("sha256");
  for (const file of ["src/content/cv.ts", "src/content/site.ts", "src/app/[lang]/cv/document/page.tsx"]) {
    h.update(file).update(readFileSync(file));
  }
  const css = readFileSync("src/app/globals.css", "utf8");
  h.update(css.slice(css.indexOf("/* ---- PDF CV document")));
  for (const lang of ["en", "tr"]) {
    const dict = JSON.parse(readFileSync(`src/i18n/dictionaries/${lang}.json`, "utf8"));
    h.update(JSON.stringify([dict.pages.cv, dict.nav.cv]));
  }
  return h.digest("hex");
}
const HASH_FILE = resolve("public/cv/source.sha256");

if (process.argv.includes("--check")) {
  let recorded = "";
  try {
    recorded = readFileSync(HASH_FILE, "utf8").trim();
  } catch {}
  if (recorded !== sourceHash()) {
    console.error("✗ public/cv/*.pdf are stale: the CV sources changed. Run `npm run cv:pdf` and commit the PDFs.");
    process.exit(1);
  }
  console.log("✓ CV PDFs match their sources");
  process.exit(0);
}

const PORT = 3010;
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = resolve("public/cv");
const jobs = [
  { url: `/cv/document`, file: "mustafa-seker-cv-en.pdf" },
  { url: `/tr/cv/document`, file: "mustafa-seker-cv-tr.pdf" },
];

const server = spawn("npx", ["next", "start", "--port", String(PORT)], { stdio: "ignore" });
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/cv/document`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`next start did not answer on port ${PORT}`);
}

try {
  await waitForServer();
  mkdirSync(OUT, { recursive: true });
  for (const { url, file } of jobs) {
    const target = resolve(OUT, file);
    execFileSync(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--force-color-profile=srgb",
      `--print-to-pdf=${target}`,
      `http://127.0.0.1:${PORT}${url}`,
    ], { stdio: "ignore" });
    console.log(`✓ ${file} (${Math.round(statSync(target).size / 1024)} KB)`);
  }
  writeFileSync(HASH_FILE, sourceHash() + "\n");
} finally {
  stop();
}
