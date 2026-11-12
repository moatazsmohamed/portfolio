// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
/* التحقق من ترتيب الأقسام بعد نقل المشاريع */
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
    // الترتيب الفعلي في الصفحة (حسب مكانها في الـ DOM)
    const order = [...document.querySelectorAll("main[id], section[id]")].map(
      (el) => ({
        id: el.id,
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      }),
    );
    order.sort((a, b) => a.top - b.top);

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
      domOrder: order.map((o) => o.id),
      // الحواف
      portfolio: at(".portfolio-section"),
      projectCard: at(".project-card"),
      aboutGrid: at(".about-grid"),
      expSection: at(".experience-section"),
      skillsGrid: at(".skills-grid-4"),
      coursesGrid: at(".courses-grid"),
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      // مفيش تكرار؟
      portfolioCount: document.querySelectorAll(".portfolio-section").length,
      projectCardCount: document.querySelectorAll(".project-card").length,
      previewImgCount: document.querySelectorAll(".project-preview-image")
        .length,
      projectButtons: document.querySelectorAll(".project-btn").length,
      navHrefs: [...document.querySelectorAll(".nav-links a")].map((a) =>
        a.getAttribute("href"),
      ),
    };
  });

  // كارت المشروع لازم يكون شغال (بيقرا البيانات من script.js)
  out.projectCardData = await page.evaluate(() => ({
    tag: document.querySelector(".project-tag")?.textContent,
    name: document.querySelector(".project-info h3")?.textContent,
    primaryHref: document
      .querySelector(".project-btn.primary")
      ?.getAttribute("href"),
    secondaryHref: document
      .querySelector(".project-btn.secondary")
      ?.getAttribute("href"),
    imgSrc: document
      .querySelector(".project-preview-image")
      ?.getAttribute("src"),
  }));

  // نختبر زرار «تغيير المشروع» (القسم 8 في script.js)
  await page.evaluate(() =>
    document.querySelector(".project-btn.change")?.click(),
  );
  await page.waitForTimeout(500);
  out.afterChange = await page.evaluate(() => ({
    name: document.querySelector(".project-info h3")?.textContent,
    tag: document.querySelector(".project-tag")?.textContent,
  }));

  // نرجع للمشروع الأول
  await page.evaluate(() =>
    document.querySelector(".project-btn.change")?.click(),
  );
  await page.waitForTimeout(400);

  await page.evaluate(() =>
    document.querySelector("#portfolio").scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_order-portfolio.png" });

  // عربي
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".lang-btn")].find(
      (x) => x.dataset.lang === "ar",
    );
    b && b.click();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.remove("reveal-init");
      el.classList.add("is-visible");
      el.style.transform = "none";
      el.style.opacity = "1";
    });
  });
  await page.waitForTimeout(700);
  out.arabic = await page.evaluate(() => {
    const order = [...document.querySelectorAll("main[id], section[id]")].map(
      (el) => el.id,
    );
    return {
      dir: document.documentElement.dir,
      domOrder: order,
      portfolioTitle: document.querySelector("#portfolio .section-title")
        ?.textContent,
      projectName: document.querySelector(".project-info h3")?.textContent,
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    };
  });
  await page.evaluate(() =>
    document.querySelector("#portfolio").scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: "tests/_order-ar.png" });

  // موبايل
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5056/index.html", { waitUntil: "load" });
  await page.waitForTimeout(1300);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1200);
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
    document.querySelector("#portfolio").scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(900);

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
      hOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      portfolio: at(".portfolio-section"),
      projectCard: at(".project-card"),
    };
  });
  await page.screenshot({ path: "tests/_order-mobile.png" });

  return out;
}
