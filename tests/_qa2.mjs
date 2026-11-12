// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
export default async function run(page) {
  // جلسة/بروفايل جديد = تابة جديدة = sessionStorage فاضي = زيارة جديدة
  await page.waitForTimeout(3500);
  const afterIntro = await page.evaluate(() => {
    const i = document.getElementById("name-intro");
    return {
      exists: !!i,
      hidden: i ? i.classList.contains("is-hidden") : null,
      ready: i ? i.getAttribute("aria-hidden") === "false" : null,
      hasText: i ? !!i.querySelector(".name-intro-text") : false,
    };
  });
  return { newTab_intro: afterIntro };
}
