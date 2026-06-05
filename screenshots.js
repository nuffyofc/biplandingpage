const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('https://bippy-product-development-roadmap.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take full-page screenshot first
  await page.screenshot({ path: 'C:\\Users\\mike\\Desktop\\biplandingpage\\demo-overview.png', fullPage: true });
  console.log('Took overview screenshot');

  // Tab names to click
  const tabs = ['Student App', 'Admin Panel'];
  const subTabs = ['Verification Gate', 'Onboarding', 'City Guide', 'Discount Locker', 'Connect', 'Events', 'Insider'];
  
  // Click main tabs
  for (const tab of tabs) {
    const btn = await page.locator('button', { hasText: tab }).first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
      const filename = `C:\\Users\\mike\\Desktop\\biplandingpage\\demo-${tab.toLowerCase().replace(/\s+/g, '-')}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Took screenshot: ${tab}`);
    }
  }

  // Click "Student App" first to get sub-tabs
  const studentBtn = await page.locator('button', { hasText: 'Student App' }).first();
  await studentBtn.click();
  await page.waitForTimeout(500);

  // Click sub-tabs within Student App
  for (const sub of subTabs) {
    const btn = await page.locator('button', { hasText: sub }).first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(800);
      const filename = `C:\\Users\\mike\\Desktop\\biplandingpage\\demo-${sub.toLowerCase().replace(/\s+/g, '-')}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Took screenshot: ${sub}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
