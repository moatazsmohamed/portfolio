// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
export default async function run(page) {
  const measure = () =>
    page.evaluate(() => {
      const h = document.querySelector(".header");
      const r = h.getBoundingClientRect();
      const body = document.body;
      return {
        headerTop: Math.round(r.top),
        headerLeft: Math.round(r.left),
        headerWidth: Math.round(r.width),
        viewportWidth: window.innerWidth,
        borderRadius: getComputedStyle(h).borderTopLeftRadius,
        position: getComputedStyle(h).position,
        bodyPaddingTop: getComputedStyle(body).paddingTop,
        headerIsFixedClass: body.classList.contains("header-is-fixed"),
        pageOverflowsX:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      };
    });

  // 1) at the very top of the page
  const atTop = await measure();

  // 2) scrolled down — this is where the side bar / extra edge used to appear
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);
  const scrolled = await measure();

  return { atTop, scrolled };
}
