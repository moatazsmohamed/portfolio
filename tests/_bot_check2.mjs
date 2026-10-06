export default async function run(page, ui) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForSelector("#heroBot");
  await page.waitForTimeout(800);
  const box = await page.locator(".bot-fab-dock").boundingBox();
  await page.screenshot({
    path: "tests/_botdock2.png",
    clip: { x: box.x - 130, y: box.y - 90, width: 260, height: 240 },
  });
  const panelState = await page.evaluate(() => {
    document.querySelector("#aiToggle").click();
    return {
      panelOpen: !document
        .querySelector("#aiPanel")
        .classList.contains("hidden"),
      talking: document
        .querySelector("#heroBot")
        .classList.contains("is-talking"),
    };
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "tests/_botdock3.png",
    clip: { x: 700, y: 380, width: 580, height: 420 },
  });
  return { box, panelState };
}
