import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    const file = path.join(ROOT, path.normalize(p).replace(/^([/\\])+/, ""));
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404);
        res.end("404");
        return;
      }
      res.writeHead(200, {
        "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
      });
      res.end(buf);
    });
  })
  .listen(8099, () => console.log("up on 8099"));
