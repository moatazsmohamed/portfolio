// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
export default async function run(page, ui) {
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    document.querySelectorAll('#preloader, #name-intro').forEach(e => e.remove());
  });
  await page.waitForTimeout(500);
  await page.locator('.qr-card').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const box = await page.locator('.qr-section').boundingBox();
  await page.screenshot({ path: 'tests/qr-dark.png', clip: box });
  await page.evaluate(() => document.body.classList.add('light-mode'));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'tests/qr-light.png', clip: box });
  return { box, ok: true };
}
