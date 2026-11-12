// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
const fs = require("fs");

const files = ["11.css", "script.js", "index.html", "manifest.json", "tests/setup.js"];
const NL = String.fromCharCode(10);

console.log("=== FILE HEADERS (first 6 lines) ===");
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  console.log(NL + "--- " + f + " ---");
  fs.readFileSync(f, "utf8").split(/\r?\n/).slice(0, 6).forEach(function (l) {
    console.log("  " + l.slice(0, 120));
  });
}

console.log(NL + NL + "=== ENGLISH-ONLY COMMENT BLOCKS ===");
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const src = fs.readFileSync(f, "utf8");
  const comments = []
    .concat(Array.from(src.matchAll(/\/\*[\s\S]*?\*\//g)))
    .concat(Array.from(src.matchAll(/<!--[\s\S]*?-->/g)))
    .map(function (m) { return m[0]; });

  const english = comments.filter(function (c) {
    const letters = c.replace(/[^A-Za-z]/g, "").length;
    const arabic = c.replace(/[^\u0600-\u06FF]/g, "").length;
    return letters > 30 && arabic < 5;
  });

  console.log(NL + "--- " + f + " : " + english.length + " English-only comments ---");
  english.forEach(function (c) {
    console.log("  " + c.split(/\s+/).join(" ").slice(0, 135));
  });
}
console.log(NL + "done");
