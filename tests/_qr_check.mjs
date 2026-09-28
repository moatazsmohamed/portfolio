export default async function run(page, ui) {
  const out = {};

  // ---- إغلاق شاشة التحميل وشاشة الاسم عشان نشوف الصفحة الحقيقية ----
  await page.evaluate(() => {
    const p = document.getElementById("preloader");
    if (p) p.remove();
    const n = document.getElementById("name-intro");
    if (n) n.remove();
    document.documentElement.classList.add("no-anim");
  });
  await page.waitForTimeout(400);
  out.introGone = await page.evaluate(
    () => !document.getElementById("name-intro"),
  );

  // ---- الوضع النهاري (dark) ----
  await page.evaluate(() => {
    const card = document.querySelector('.qr-card');
    card.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(700);
  await page.locator('.qr-card').screenshot({ path: 'tests/_qr-dark.png' });

  // ---- الوضع النهاري الفاتح (light) ----
  await page.evaluate(() => {
    // نقر على زر الوضع الأساسي في قائمة الإعدادات
    const btn = document.querySelector('.night-mode-btn');
    if (btn) btn.click();
  });
  await page.waitForTimeout(700);
  out.lightClass = await page.evaluate(() => document.body.classList.contains('light-mode'));
  await page.locator('.qr-card').screenshot({ path: 'tests/_qr-light.png' });

  // قياس التباين على الكارت الفاتح
  out.lightStyles = await page.evaluate(() => {
    const g = (sel, prop) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el)[prop] : null;
    };
    return {
      cardBg: g('.qr-card', 'backgroundImage').slice(0, 60),
      title: g('.qr-title', 'color'),
      text: g('.qr-text', 'color'),
      kicker: g('.qr-kicker', 'color'),
      frameBorder: g('.qr-frame', 'borderColor'),
    };
  });

  // ----QR نفسه شغال؟ ----
  out.qr = await page.evaluate(() => {
    const c = document.querySelector('#qr-code canvas');
    if (!c) return 'no canvas';
    return { w: c.width, h: c.height, drawn: c.toDataURL().length > 500 };
  });

  return out;
}
