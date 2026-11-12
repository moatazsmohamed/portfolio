// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
/* فحص قسم الخبرات على الموبايل والعربي */
export default async function run(page) {
  const out = {};

  for (const [w, h, lang, label] of [
    [390, 844, "en", "mobileEn"],
    [390, 844, "ar", "mobileAr"],
    [820, 1000, "en", "tabletEn"],
  ]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("http://127.0.0.1:5056/index.html", { waitUntil: "load" });
    await page.waitForTimeout(1300);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1200);
    await page.evaluate((lg) => {
      const b = [...document.querySelectorAll(".lang-btn")].find(
        (x) => x.dataset.lang === lg,
      );
      b && b.click();
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.remove("reveal-init");
        el.classList.add("is-visible");
        el.style.transform = "none";
        el.style.opacity = "1";
      });
    }, lang);
    await page.waitForTimeout(600);

    out[label] = await page.evaluate(() => {
      const at = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          right: Math.round(window.innerWidth - r.right),
          w: Math.round(r.width),
        };
      };
      // نتأكد إن الخط الزمني والأيقونة فوق بعض مالهمش تراكب
      const item = document.querySelector(".timeline-item");
      const marker = document.querySelector(".timeline-marker");
      const card = document.querySelector(".timeline-card");
      const ir = item?.getBoundingClientRect();
      const mr = marker?.getBoundingClientRect();
      const cr = card?.getBoundingClientRect();
      const dir = document.documentElement.dir;
      return {
        dir,
        vw: window.innerWidth,
        hOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        scrollbarPx: window.innerWidth - document.documentElement.clientWidth,
        expSection: at(".experience-section"),
        summaryCard: at(".summary-card"),
        timelineCard: at(".timeline-card"),
        marker: at(".timeline-marker"),
        skillsGrid: at(".skills-grid-4"),
        skillsCols: getComputedStyle(
          document.querySelector(".skills-grid-4"),
        ).gridTemplateColumns.split(" ").length,
        coursesCols: getComputedStyle(
          document.querySelector(".courses-grid"),
        ).gridTemplateColumns.split(" ").length,
        // الأيقونة لازم تفصل عن الكارت
        markerClearOfCard:
          dir === "rtl" ? mr.right <= cr.left + 1 : mr.left >= cr.right - 1,
        itemW: Math.round(ir.width),
        // نص فاضي؟
        empty: [
          ...document.querySelectorAll(
            "#experience [data-i18n], #skills [data-i18n], #courses [data-i18n]",
          ),
        ].filter((el) => !el.textContent.trim()).length,
      };
    });
  }

  // لقطة لقسم الخبرات على الموبايل
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5056/index.html", { waitUntil: "load" });
  await page.waitForTimeout(1300);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
      el.style.transform = "none";
      el.style.opacity = "1";
    });
    document.querySelector("#experience").scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: "tests/_new-exp-mobile.png" });

  return out;
}
