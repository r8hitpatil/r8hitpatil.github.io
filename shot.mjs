import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: "reduce" });
await p.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3500);

let cur = 0;
while (cur < 920) { await p.mouse.wheel(0, 110); cur += 110; await p.waitForTimeout(90); }
await p.waitForTimeout(1800);
await p.screenshot({ path: "about.png" });
await p.screenshot({ path: "borderzoom.png", clip: { x: 690, y: 130, width: 480, height: 540 } });
await b.close();
console.log("ok");
