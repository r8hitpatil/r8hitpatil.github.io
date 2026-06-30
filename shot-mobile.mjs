import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(4000);
const ov = await p.evaluate(() => ({ doc: document.documentElement.scrollWidth, win: window.innerWidth }));
console.log("overflow:", JSON.stringify(ov));
await p.screenshot({ path: "m-hero.png" });
const steps = [820, 1500, 2100];
for (let i = 0; i < steps.length; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), steps[i]);
  await p.waitForTimeout(800);
  await p.screenshot({ path: `m-${i}.png` });
}
await b.close(); console.log("ok");
