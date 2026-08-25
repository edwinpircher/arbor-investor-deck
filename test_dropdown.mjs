import { chromium } from './node_modules/playwright-chromium/index.mjs';

const URLS = [
  'http://localhost:8080/1',
  'https://jade-craft-shut-disclaimer.trycloudflare.com/1',
];

for (const url of URLS) {
  console.log(`\n=== Testing: ${url} ===`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);

    const options = await page.$$eval(
      'select[aria-label="Slide Navigation Dropdown"] option',
      opts => opts.map(o => ({ value: o.value, text: o.textContent.trim() }))
    );
    
    if (options.length === 0) {
      console.log('  WARNING: No options found in dropdown!');
    } else {
      console.log(`  Total options: ${options.length}`);
      options.forEach((o, i) => console.log(`  [${i}] value="${o.value}" text="${o.text}"`));
      const first = options[0];
      if (first.text === '1 Cover') {
        console.log('  ✅ PASS: First option is "1 Cover"');
      } else {
        console.log(`  ❌ FAIL: First option is "${first.text}" — expected "1 Cover"`);
      }
    }
  } catch(e) {
    console.log('  ERROR:', e.message);
  }

  await browser.close();
}

console.log('\nDone.');
