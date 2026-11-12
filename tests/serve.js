// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
const ROOT_DIR = path.resolve(__dirname);

http.createServer((req, res) => {
    // 1. تنظيف واقتطاع المسار
    let rawPath = decodeURIComponent(req.url.split("?")[0]);
    if (rawPath === "/" || rawPath === "\\") {
        rawPath = "/index.html";
    }

    // 2. إنشاء المسار المطلق بشكل آمن
    const filePath = path.resolve(ROOT_DIR, "." + path.normalize("/" + rawPath));

    // 3. التحقق الأمني من عدم الخروج عن المجلد الرئيسي
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("403 Forbidden");
        return;
    }

    // 4. قراءة الملف بعد تأمين المسار
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404");
            return;
        }
        res.writeHead(200, {
            "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        });
        res.end(data);
    });
});