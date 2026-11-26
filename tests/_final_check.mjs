/**
 * Copyright (c) 2026 Moataz Mohamed (@moatazsmohamed). All rights reserved.
 * Unauthorized copying, redistribution or reuse is prohibited. See LICENSE.
 * Authorship marker: mm-bbca6a388ea8f7cc
 */
// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
/* التحقق النهائي: الترتيب + البار + الحواف + اللغتين */
export default async function run(page) {
  const out = {};

  const load = async (w, h, lang) => {
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
    await page.waitForTimeout(700);
  };

  const probe = () =>
    page.evaluate(() => {
      const sections = [...document.querySelectorAll("main[id], section[id]")]
        .map((el) => ({
          id: el.id,
          top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        }))
        .sort((a, b) => a.top - b.top);

      const nav = [...document.querySelectorAll(".nav-links a")]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.startsWith("#"))
        .filter((h) => !["#contact-form-section"].includes(h.slice(1)));
      const navIds = nav.map((h) => h.slice(1));

      // هل ترتيب البار = ترتيب الأقسام؟
      const pageIds = sections
        .map((s) => s.id)
        .filter((id) => navIds.includes(id));
      const navClean = navIds.filter((id) => pageIds.includes(id));

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

      return {
        pageOrder: pageIds,
        navOrder: navClean,
        navMatchesPage: JSON.stringify(navClean) === JSON.stringify(pageIds),
        hOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        scrollbarPx: window.innerWidth - document.documentElement.clientWidth,
        summarySection: at(".summary-section"),
        summaryCard: at(".summary-card"),
        portfolio: at(".portfolio-section"),
        aboutGrid: at(".about-grid"),
        skillsGrid: at(".skills-grid-4"),
        summaryTitle: document.querySelector(".summary-title")?.textContent,
        summaryCount: document.querySelectorAll(".summary-card").length,
        navText: [...document.querySelectorAll(".nav-links a")].map((a) =>
          a.textContent.trim(),
        ),
        emptyI18n: [...document.querySelectorAll("[data-i18n]")].filter(
          (el) => !el.textContent.trim(),
        ).length,
      };
    });

  await load(1440, 900, "en");
  out.desktopEn = await probe();
  await page.screenshot({ path: "tests/_fin-summary.png" });

  await load(1440, 900, "ar");
  out.desktopAr = await probe();
  await page.evaluate(() =>
    document.querySelector("#summary").scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_fin-ar.png" });

  await load(390, 844, "en");
  out.mobile = await probe();
  await page.evaluate(() =>
    document.querySelector("#summary").scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_fin-mobile.png" });

  // اختبار إن لينكات البار بتودي للمكان الصح
  await load(1440, 900, "en");
  out.navClicks = [];
  for (const id of ["summary", "portfolio", "experience", "skills"]) {
    const res = await page.evaluate((target) => {
      const link = document.querySelector(`.nav-links a[href="#${target}"]`);
      if (!link) return { target, found: false };
      link.click();
      return { target, found: true };
    }, id);
    await page.waitForTimeout(900);
    const landed = await page.evaluate((target) => {
      const el = document.getElementById(target);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), scrollY: Math.round(window.scrollY) };
    }, id);
    out.navClicks.push({ ...res, landed });
  }

  return out;
}
