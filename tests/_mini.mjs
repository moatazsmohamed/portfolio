// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
/* اختبار الغلق + مطابقة الروابط + العربي (تحميل واحد) */
export default async function run(page) {
  const out = {};

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  // 1) زر ×
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(500);
  const openedByBtn = await page.evaluate(() => !document.querySelector('#socials-modal').classList.contains('hidden'));
  await page.evaluate(() => document.querySelector('.socials-close').click());
  await page.waitForTimeout(500);
  out.closeByX = {
    openedByBtn,
    hidden: await page.evaluate(() => document.querySelector('#socials-modal').classList.contains('hidden')),
    overflow: await page.evaluate(() => document.body.style.overflow),
  };

  // 2) Escape
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  out.closeByEscape = {
    hidden: await page.evaluate(() => document.querySelector('#socials-modal').classList.contains('hidden')),
    overflow: await page.evaluate(() => document.body.style.overflow),
  };

  // 3) الخلفية
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(400);
  await page.mouse.click(80, 80);
  await page.waitForTimeout(600);
  out.closeByBackdrop = {
    hidden: await page.evaluate(() => document.querySelector('#socials-modal').classList.contains('hidden')),
    overflow: await page.evaluate(() => document.body.style.overflow),
  };

  // 4) الكليك جوه الكارت ما يقفلش
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('.socials-subtitle').click());
  await page.waitForTimeout(400);
  out.stayOpenInside = await page.evaluate(
    () => !document.querySelector('#socials-modal').classList.contains('hidden')
  );

  // 5) الروابط = نفس روابط الفوتر؟
  out.linksMatchFooter = await page.evaluate(() => {
    const modalLinks = [...document.querySelectorAll('.social-tile')].map((a) => a.getAttribute('href')).sort();
    const footerLinks = [...document.querySelectorAll('.footer-section a[href^="http"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => /github|linkedin|facebook|instagram/.test(h))
      .sort();
    return {
      modalCount: modalLinks.length,
      footerCount: footerLinks.length,
      same: modalLinks.length === footerLinks.length && modalLinks.every((l, i) => l === footerLinks[i]),
      modalLinks,
    };
  });

  // 6) العربي
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.lang-btn')].find((x) => x.dataset.lang === 'ar');
    b && b.click();
  });
  await page.waitForTimeout(700);
  out.arabic = await page.evaluate(() => {
    const c = document.querySelector('.socials-modal-content');
    const cr = c.getBoundingClientRect();
    const cl = document.querySelector('.socials-close').getBoundingClientRect();
    return {
      dir: document.documentElement.dir,
      title: document.querySelector('#socials-modal-title')?.textContent,
      subtitle: document.querySelector('.socials-subtitle')?.textContent,
      centered: Math.abs(cr.left - (window.innerWidth - cr.right)) < 4,
      closeOnLeftSide: cl.left < cr.left + cr.width / 2,
      hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      emptyI18n: [...document.querySelectorAll('[data-i18n]')].filter((el) => !el.textContent.trim()).length,
    };
  });
  await page.screenshot({ path: 'tests/_socials-ar.png' });

  return out;
}