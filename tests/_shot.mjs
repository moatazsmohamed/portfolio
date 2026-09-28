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
