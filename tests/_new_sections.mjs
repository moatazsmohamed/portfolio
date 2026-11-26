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
/* فحص الأقسام الجديدة: الوجود، الحواف، الترجمة، والاتجاهين */
export default async function run(page) {
  const out = {};

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:5056/index.html", { waitUntil: "load" });
  await page.waitForTimeout(1300);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1300);
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
      el.style.transform = "none";
      el.style.opacity = "1";
    });
  });
  await page.waitForTimeout(400);

  out.desktop = await page.evaluate(() => {
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
      vw: window.innerWidth,
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      expSection: at(".experience-section"),
      summaryCard: at(".summary-card"),
      timeline: at(".timeline"),
      firstTimelineCard: at(".timeline-card"),
      skillsSection: at(".skills-section"),
      skillsGrid: at(".skills-grid-4"),
      firstSkillGroup: at(".skills-group"),
      coursesSection: at(".courses-section"),
      coursesGrid: at(".courses-grid"),
      firstCourse: at(".course-card"),
      // مقارنة مع قسم موجود أصلاً للتأكد إن الحواف متطابقة
      aboutGrid: at(".about-grid"),
      portfolio: at(".portfolio-section"),
      // عدّ العناصر
      timelineItems: document.querySelectorAll(".timeline-item").length,
      skillGroups: document.querySelectorAll(".skills-group").length,
      skillPills: document.querySelectorAll(".skill-pill").length,
      courseCards: document.querySelectorAll(".course-card").length,
      navLinks: [...document.querySelectorAll(".nav-links a")].map((a) =>
        a.getAttribute("href"),
      ),
    };
  });

  await page.screenshot({ path: "tests/_new-exp.png" });
  await page.evaluate(() =>
    document.querySelector("#skills").scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_new-skills.png" });
  await page.evaluate(() =>
    document.querySelector("#courses").scrollIntoView({ block: "center" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_new-courses.png" });

  // ---- ترجمة عربي ----
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".lang-btn")].find(
      (x) => x.dataset.lang === "ar",
    );
    b && b.click();
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
      el.style.transform = "none";
      el.style.opacity = "1";
    });
  });
  await page.waitForTimeout(300);

  out.arabic = await page.evaluate(() => {
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
    const marker = document.querySelector(".timeline-marker");
    const item = document.querySelector(".timeline-item");
    return {
      dir: document.documentElement.dir,
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      summaryTitle: document.querySelector(".summary-title")?.textContent,
      expTitle: document.querySelector("#experience .section-title")
        ?.textContent,
      skillsTitle: document.querySelector("#skills .section-title")
        ?.textContent,
      coursesTitle: document.querySelector("#courses .section-title")
        ?.textContent,
      firstRole: document.querySelector(".timeline-top h3")?.textContent,
      firstPill: document.querySelector(".skill-pill")?.textContent,
      firstCourse: document.querySelector(".course-card h3")?.textContent,
      // في العربي الخط لازم يبقى على اليمين
      markerLeft: marker
        ? Math.round(marker.getBoundingClientRect().left)
        : null,
      itemLeft: item ? Math.round(item.getBoundingClientRect().left) : null,
      // أي نص إنجليزي فاضل؟
      untranslated: [
        ...document.querySelectorAll(
          "#experience [data-i18n], #skills [data-i18n], #courses [data-i18n]",
        ),
      ]
        .filter((el) => !el.textContent.trim())
        .map((el) => el.dataset.i18n),
      expSection: at(".experience-section"),
      skillsGrid: at(".skills-grid-4"),
      coursesGrid: at(".courses-grid"),
    };
  });

  await page.screenshot({ path: "tests/_new-ar.png" });

  // ---- موبايل ----
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5056/index.html", { waitUntil: "load" });
  await page.waitForTimeout(1300);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1300);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".lang-btn")].find(
      (x) => x.dataset.lang === "en",
    );
    b && b.click();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
      el.style.transform = "none";
      el.style.opacity = "1";
    });
  });
  await page.waitForTimeout(500);

  out.mobile = await page.evaluate(() => {
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
      vw: window.innerWidth,
      scrollbarPx: window.innerWidth - document.documentElement.clientWidth,
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      expSection: at(".experience-section"),
      summaryCard: at(".summary-card"),
      timelineCard: at(".timeline-card"),
      skillsGroup: at(".skills-group"),
      courseCard: at(".course-card"),
      skillsCols: getComputedStyle(document.querySelector(".skills-grid-4"))
        .gridTemplateColumns,
      coursesCols: getComputedStyle(document.querySelector(".courses-grid"))
        .gridTemplateColumns,
    };
  });

  await page.screenshot({ path: "tests/_new-mobile.png" });
  return out;
}
