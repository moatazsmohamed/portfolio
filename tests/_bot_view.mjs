export default async function run(page, ui) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForSelector("#heroBot");
  await page
    .waitForFunction(
      () => {
        const i = document.querySelector(".name-intro");
        return (
          !i ||
          getComputedStyle(i).opacity === "0" ||
          getComputedStyle(i).display === "none"
        );
      },
      { timeout: 30000 },
    )
    .catch(() => {});
  await page.waitForTimeout(800);

  const geo = await page.evaluate(() => {
    const r = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const b = e.getBoundingClientRect();
      return [
        Math.round(b.x),
        Math.round(b.y),
        Math.round(b.width),
        Math.round(b.height),
      ];
    };
    return {
      dock: r(".bot-fab-dock"),
      bot: r("#heroBot"),
      head: r(".bot-head"),
      leg: r(".bot-leg-left"),
      body: r(".bot-body"),
      btns: r(".bot-fab-buttons"),
      btt: r("#backToTop"),
      bttVis: document.querySelector("#backToTop").className,
      vh: window.innerHeight,
    };
  });

  const d = geo.dock;
  await page.screenshot({
    path: "tests/_v_top.png",
    clip: { x: d[0] - 90, y: d[1] - 90, width: 300, height: 260 },
  });

  // scroll to make back-to-top visible
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => {
    const b = document.querySelector("#backToTop").getBoundingClientRect();
    const d = document.querySelector(".bot-fab-dock").getBoundingClientRect();
    return {
      btt: [
        Math.round(b.x),
        Math.round(b.y),
        Math.round(b.width),
        Math.round(b.height),
      ],
      dock: [
        Math.round(d.x),
        Math.round(d.y),
        Math.round(d.width),
        Math.round(d.height),
      ],
    };
  });
  await page.screenshot({
    path: "tests/_v_scroll.png",
    clip: {
      x: Math.min(after.btt[0], after.dock[0]) - 60,
      y: Math.min(after.btt[1], after.dock[1]) - 60,
      width: 300,
      height: 420,
    },
  });

  return { geo, after };
}
