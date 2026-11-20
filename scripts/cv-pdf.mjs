// Prints the CV document route to public/cv/*.pdf with headless Chrome (D-013).
// Usage: npm run cv:pdf  (builds first, then runs this). No extra dependencies.
// Chrome path: $CHROME_PATH, else the default macOS install.
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

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
} finally {
  stop();
}
