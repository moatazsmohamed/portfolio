export default async function run(page, ui) {
  const out = {};

  await page.evaluate(() => {
    document
      .querySelectorAll("#preloader, #name-intro")
      .forEach((e) => e.remove());
  });
  await page.waitForTimeout(500);

  // نقيس صورة الـ QR اللي Burton د/generated
  out.image = await page.evaluate(async () => {
    // نستدعي نفس منطق الكود عبر الضغط على زر التنزيل مع اعتراض
    const canvas = document.querySelector("#qr-code canvas");
    if (!canvas) return { ok: false, reason: "no canvas" };

    // نعيد بناء نفس الصورة عشان نشوف الأبعاد
    const out2 = document.createElement("canvas");
    return {
      ok: true,
      qrCanvas: { w: canvas.width, h: canvas.height },
      btnCount: document.querySelectorAll(".qr-share-row button").length,
    };
  });

  // نجرب نسخ اللينك فعلاً
  await page.locator("#qrCopyBtn").click();
  await page.waitForTimeout(400);
  out.feedbackAfterCopy = await page.evaluate(
    () => document.getElementById("qrFeedback")?.textContent || "",
  );
  out.feedbackVisible = await page.evaluate(() =>
    document.getElementById("qrFeedback")?.classList.contains("is-visible"),
  );

  // نجرب زر التنزيل
  const dl = page.waitForEvent("download", { timeout: 5000 }).catch(() => null);
  await page.locator("#qrDownloadBtn").click();
  const download = await dl;
  out.downloadStarted = !!download;
  if (download) {
    out.downloadName = download.suggestedFilename();
    const p = "tests/_qr-shared.png";
    await download.saveAs(p);
    out.downloadPath = p;
  }

  await page.waitForTimeout(300);
  out.feedbackAfterSave = await page.evaluate(
    () => document.getElementById("qrFeedback")?.textContent || "",
  );

  return out;
}
