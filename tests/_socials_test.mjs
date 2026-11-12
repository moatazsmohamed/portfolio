// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
/* اختبار زر مواقع التواصل + النافذة
   ملاحظة: بنقفل شاشة الاسم بالكليك على الاسم نفسه (مش Enter)
   لأن الانتظار في نص الترحيب هو اللي كان بيعلّق السكربت. */
export default async function run(page) {
  const out = {};

  const load = async (w, h, lang) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://127.0.0.1:5056/index.html', { waitUntil: 'load' });

    // ننتظر شاشة الاسم تظهر، وبعدين ندوس عليها عشان ندخل
    await page.waitForSelector('#name-intro .name-intro-text', { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const t = document.querySelector('#name-intro .name-intro-text');
      if (t) t.click();
    });
    // ننتظر شاشة الاسم تتشال
    await page.waitForFunction(() => !document.getElementById('name-intro'), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(600);

    if (lang) {
      await page.evaluate((lg) => {
        const b = [...document.querySelectorAll('.lang-btn')].find((x) => x.dataset.lang === lg);
        b && b.click();
      }, lang);
      await page.waitForTimeout(500);
    }
  };

  await load(1440, 900, 'en');

  out.button = await page.evaluate(() => {
    const btn = document.querySelector('.btn-socials');
    const cv = document.querySelector('.btn-tertiary');
    if (!btn || !cv) return { found: false };
    const br = btn.getBoundingClientRect();
    const cr = cv.getBoundingClientRect();
    const cs = getComputedStyle(btn);
    return {
      found: true,
      sameRow: Math.abs((br.top + br.height / 2) - (cr.top + cr.height / 2)) < 12,
      w: Math.round(br.width),
      h: Math.round(br.height),
      radius: cs.borderRadius,
      modalHidden: document.querySelector('#socials-modal').classList.contains('hidden'),
    };
  });

  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(600);

  out.opened = await page.evaluate(() => {
    const m = document.querySelector('#socials-modal');
    const c = document.querySelector('.socials-modal-content');
    const cr = c.getBoundingClientRect();
    return {
      hidden: m.classList.contains('hidden'),
      ariaHidden: m.getAttribute('aria-hidden'),
      display: getComputedStyle(m).display,
      bodyLocked: document.body.style.overflow === 'hidden',
      modalW: Math.round(cr.width),
      modalH: Math.round(cr.height),
      centered: Math.abs(cr.left - (window.innerWidth - cr.right)) < 4,
      title: document.querySelector('#socials-modal-title')?.textContent,
      subtitle: document.querySelector('.socials-subtitle')?.textContent,
      tileCount: document.querySelectorAll('.social-tile').length,
      tiles: [...document.querySelectorAll('.social-tile')].map((t) => ({
        label: t.textContent.trim().slice(0, 20),
        href: t.getAttribute('href'),
        blank: t.getAttribute('target'),
        rel: t.getAttribute('rel'),
      })),
      anim: getComputedStyle(c).animationName,
      hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  await page.screenshot({ path: 'tests/_socials-open.png' });

  // الغلق بـ Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  out.closedByEscape = await page.evaluate(() => ({
    hidden: document.querySelector('#socials-modal').classList.contains('hidden'),
    overflow: document.body.style.overflow,
  }));

  // الغلق بزر ×
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('.socials-close').click());
  await page.waitForTimeout(500);
  out.closedByX = await page.evaluate(() => ({
    hidden: document.querySelector('#socials-modal').classList.contains('hidden'),
    overflow: document.body.style.overflow,
  }));

  // الغلق بالخلفية (كليك حقيقي برة الكارت)
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(400);
  await page.mouse.click(60, 60);
  await page.waitForTimeout(600);
  out.closedByBackdrop = await page.evaluate(() => ({
    hidden: document.querySelector('#socials-modal').classList.contains('hidden'),
    overflow: document.body.style.overflow,
  }));

  // عربي
  await load(1440, 900, 'ar');
  await page.evaluate(() => document.querySelector('.btn-socials').click());
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
      closeOnLeft: cl.left < cr.left + cr.width / 2,
      hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  await page.screenshot({ path: 'tests/_socials-ar.png' });

  // موبايل
  await load(390, 844, 'en');
  out.mobileBtn = await page.evaluate(() => {
    const br = document.querySelector('.btn-socials').getBoundingClientRect();
    return { w: Math.round(br.width), h: Math.round(br.height) };
  });
  await page.evaluate(() => document.querySelector('.btn-socials').click());
  await page.waitForTimeout(700);
  out.mobile = await page.evaluate(() => {
    const cr = document.querySelector('.socials-modal-content').getBoundingClientRect();
    return {
      vw: window.innerWidth,
      modalW: Math.round(cr.width),
      fits: cr.left >= -1 && cr.right <= window.innerWidth + 1,
      hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      cols: getComputedStyle(document.querySelector('.socials-grid')).gridTemplateColumns.split(' ').length,
    };
  });
  await page.screenshot({ path: 'tests/_socials-mobile.png' });

  return out;
}