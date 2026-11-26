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
export default async function run(page, ui) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForSelector("#heroBot");
  await page.waitForTimeout(500);
  return await page.evaluate(() => {
    const b = document.querySelector("#heroBot");
    const cs = getComputedStyle(b);
    const head = document.querySelector(".bot-head");
    const hs = getComputedStyle(head);
    const dock = document.querySelector(".bot-fab-dock");
    const ds = getComputedStyle(dock);
    return {
      bot: {
        display: cs.display,
        opacity: cs.opacity,
        visibility: cs.visibility,
        z: cs.zIndex,
        transform: cs.transform,
        anim: cs.animationName,
        clip: cs.clipPath,
        filter: cs.filter,
      },
      head: {
        display: hs.display,
        opacity: hs.opacity,
        bg: hs.backgroundImage.slice(0, 40),
      },
      dock: {
        display: ds.display,
        z: ds.zIndex,
        overflow: ds.overflow,
        opacity: ds.opacity,
      },
      classes: b.className,
      topEl: document.elementFromPoint(1200, 670)?.className,
    };
  });
}
