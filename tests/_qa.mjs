// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
export default async function run(page) {
  const out = {};

  // ===== الزيارة الأولى =====
  await page.waitForTimeout(400);
  out.firstVisit_preloaderVisible = await page.evaluate(() => {
    const p = document.getElementById("preloader");
    return p && !p.classList.contains("fade-out");
  });

  await page.waitForTimeout(3000);
  out.firstVisit_introVisible = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    if (!i) return "removed";
    return {
      hidden: i.classList.contains("is-hidden"),
      ready: i.getAttribute("aria-hidden") === "false",
    };
  });

  // نقفل الترحيب عشان ندخل الموقع
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1500);

  // ===== إعادة التحميل (refresh) =====
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  out.refresh_preloaderVisible = await page.evaluate(() => {
    const p = document.getElementById("preloader");
    return p && !p.classList.contains("fade-out");
  });
  // لحظة ما المقدمة قررت تظهر/تختفي
  await page.waitForTimeout(1200);
  out.refresh_introState_atShow = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    if (!i) return "removed";
    return {
      hiddenClass: i.classList.contains("is-hidden"),
      ariaHidden: i.getAttribute("aria-hidden"),
    };
  });

  await page.waitForTimeout(3500);
  out.refresh_introAfter = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    return i ? "still-exists" : "removed";
  });

  // ===== refresh تاني متتالي =====
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  out.refresh2_intro = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    return i ? "still-exists" : "removed";
  });

  return out;
}
