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
/* تشخيص: إيه اللي جاي بعد قسم المشاريع بالظبط + ترتيب البار */
export default async function run(page) {
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

  const info = await page.evaluate(() => {
    // كل العناصر العناوين الرئيسية بترتيب ظهورها
    const heads = [
      ...document.querySelectorAll(
        "main[id], section, .summary-title, .section-title, .course-card h3",
      ),
    ]
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className || "").slice(0, 40),
        id: el.id || null,
        text: (el.textContent || "").trim().slice(0, 45),
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      }))
      .sort((a, b) => a.top - b.top);

    // الترتيب الفعلي للأقسام
    const sections = [...document.querySelectorAll("section[id]")]
      .map((el) => ({
        id: el.id,
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      }))
      .sort((a, b) => a.top - b.top);

    // ترتيب البار
    const nav = [...document.querySelectorAll(".nav-links a")].map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent.trim(),
      // مكان الرابط على الشاشة بالنسبة لترتيب الأقسام
    }));

    // مكان قسم المشاريع بالنسبة للنبذة
    const port = document.querySelector("#portfolio");
    const exp = document.querySelector("#experience");
    const summary = document.querySelector(".summary-card");

    return {
      sectionsOrder: sections.map((s) => s.id),
      navOrder: nav.map((n) => n.href),
      navText: nav.map((n) => n.text),
      // الترتيب الرأسي
      portfolioTop: Math.round(
        port.getBoundingClientRect().top + window.scrollY,
      ),
      experienceTop: Math.round(
        exp.getBoundingClientRect().top + window.scrollY,
      ),
      summaryTop: Math.round(
        summary.getBoundingClientRect().top + window.scrollY,
      ),
      summaryComesAfterPortfolio:
        Math.round(summary.getBoundingClientRect().top + window.scrollY) >
        Math.round(port.getBoundingClientRect().top + window.scrollY),
      headsOrder: heads
        .filter(
          (h) =>
            h.tag === "h2" ||
            h.cls.includes("section-title") ||
            h.cls.includes("summary-title"),
        )
        .map((h) => ({ cls: h.cls, text: h.text })),
    };
  });

  return info;
}
