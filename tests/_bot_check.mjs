export default async function run(page, ui) {
  const out = {};

  await page.evaluate(() => {
    document
      .querySelectorAll("#preloader, #name-intro")
      .forEach((e) => e.remove());
  });
  await page.waitForTimeout(500);
  await page.locator(".hero-top-row").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const box = await page.locator(".hero-section").boundingBox();

  // حالة السكون: الماوس بره الشاشة
  out.varsIdle = await page.evaluate(() => {
    const s = document.querySelector(".hero-bot").style;
    return {
      eyeX: s.getPropertyValue("--eye-x"),
      tilt: s.getPropertyValue("--tilt"),
    };
  });

  // نحرك الماوس ناحية الروبوت ونتشوف المتغيرات بتتحدّث
  const bot = await page.locator(".hero-bot").boundingBox();
  await page.mouse.move(bot.x + 30, bot.y + 90, { steps: 15 });
  await page.waitForTimeout(600);

  out.varsTracking = await page.evaluate(() => {
    const b = document.querySelector(".hero-bot");
    const s = b.style;
    return {
      eyeX: s.getPropertyValue("--eye-x"),
      eyeY: s.getPropertyValue("--eye-y"),
      tilt: s.getPropertyValue("--tilt"),
      happy: b.classList.contains("is-happy"),
    };
  });

  if (box) {
    await page.screenshot({ path: "tests/_bot-tracking.png", clip: box });
  }

  // الوضع النهاري
  await page.evaluate(() => document.body.classList.add("light-mode"));
  await page.waitForTimeout(600);
  if (box) {
    await page.screenshot({ path: "tests/_bot-light.png", clip: box });
  }

  return { box, ...out };
}
