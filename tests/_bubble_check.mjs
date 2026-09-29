export default async function run(page, ui) {
  const out = {};

  await page.evaluate(() => {
    document.querySelectorAll('#preloader, #name-intro').forEach(e => e.remove());
  });
  await page.waitForTimeout(500);
  await page.locator('.hero-top-row').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const box = await page.locator('.hero-section').boundingBox();

  // حالة قبل الضغط
  out.beforeClick = await page.evaluate(() => {
    const b = document.getElementById('heroBot');
    return {
      talking: b.classList.contains('is-talking'),
      bubbleVisible: getComputedStyle(document.getElementById('botBubble')).opacity
    };
  });

  // مين العنصر اللي في النص فعلاً؟
  out.hitTest = await page.evaluate(() => {
    const b = document.getElementById('heroBot');
    const r = b.getBoundingClientRect();
    const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return {
      botRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      hitTag: el?.tagName,
      hitClass: String(el?.className || '').slice(0, 60),
      hitId: el?.id
    };
  });

  await page.evaluate(() => {
    document.getElementById('heroBot').click();
  });
  await page.waitForTimeout(400);

  out.afterClick = await page.evaluate(() => {
    const b = document.getElementById('heroBot');
    const bubble = document.getElementById('botBubble');
    const s = getComputedStyle(bubble);
    return {
      talking: b.classList.contains('is-talking'),
      opacity: s.opacity,
      visibility: s.visibility,
      text: bubble.textContent.trim()
    };
  });

  if (box) {
    await page.screenshot({ path: 'tests/_bot-bubble.png', clip: box });
  }

  // بعد 5 ثواني لازم تكون اتقفلت لوحدها
  await page.waitForTimeout(4500);
  out.afterAutoHide = await page.evaluate(
    () => document.getElementById('heroBot').classList.contains('is-talking')
  );

  return { box, ...out };
}
