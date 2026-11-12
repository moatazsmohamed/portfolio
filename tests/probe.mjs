// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
﻿export default async function run(page, ui) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  // switch to Arabic
  await page.evaluate(() => { const b=[...document.querySelectorAll('.lang-btn')].find(x=>x.dataset.lang==='ar'); b && b.click(); });
  await page.waitForTimeout(700);
  // switch to light mode
  await page.evaluate(() => { document.querySelector('.settings-pill')?.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('.settings-action-btn')?.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => document.querySelector('.footer-section')?.scrollIntoView());
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => ({
    dir: document.documentElement.dir,
    theme: document.body.classList.contains('light-mode') ? 'light' : 'dark',
    title: document.querySelector('.footer-social-title')?.textContent,
    credo: document.querySelector('.footer-credo')?.textContent.trim(),
    signature: document.querySelector('.footer-signature')?.textContent.trim()
  }));
  await page.screenshot({ path: 'f-ar-light.png' });
  return r;
}
