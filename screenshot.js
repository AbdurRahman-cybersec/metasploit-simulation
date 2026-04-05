const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 1200 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  console.log('Screenshot saved to screenshot.png');
  await browser.close();
})();
