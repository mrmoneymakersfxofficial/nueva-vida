const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`Console: ${msg.text()}`);
  });
  page.on('requestfailed', req => errors.push(`Request failed: ${req.url()} - ${req.failure().errorText}`));

  // 1. Go to servicios page
  console.log('1. Navigating to /servicios#servicios-especializados ...');
  await page.goto('http://localhost:3000/servicios#servicios-especializados', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 2. Check first eco-fetal image loaded
  console.log('2. Checking ultrasound images...');
  const imgSelectors = [
    'img[alt*="Ecografía 2D de alta precisión"]',
    'img[alt*="Ecografía obstétrica 2D"]',
    'img[alt*="Ecografía 3D/4D"]',
  ];
  for (const sel of imgSelectors) {
    const el = await page.$(sel);
    if (!el) {
      errors.push(`MISSING image: ${sel}`);
    } else {
      const naturalW = await el.getAttribute('naturalwidth');
      if (naturalW === '0') errors.push(`BROKEN image: ${sel}`);
      else console.log(`  OK: ${sel} (${naturalW}px)`);
    }
  }

  // 3. Check lightbox counter badges (1/3, 2/3, 3/3)
  console.log('3. Checking lightbox counter badges...');
  const badges = await page.$$text('text=/\\d\\/3/');
  console.log(`  Found ${badges.length} counter badges: ${badges.join(', ')}`);
  if (badges.length < 3) errors.push(`Expected 3 counter badges, found ${badges.length}`);

  // 4. Check cursor-pointer on images
  console.log('4. Checking cursor style on image containers...');
  const imageCards = await page.$$('.group.cursor-pointer');
  console.log(`  Found ${imageCards.length} clickable image cards`);
  if (imageCards.length < 3) errors.push(`Expected 3 clickable image cards, found ${imageCards.length}`);

  // 5. Check Maximize2 icon is present
  console.log('5. Checking expand icons...');
  const expandIcons = await page.$$('[class*="Maximize2"], svg.lucide-maximize-2');
  console.log(`  Found ${expandIcons.length} expand icons`);

  // 6. Check mobile bottom nav images
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  console.log('6. Mobile check (375x812)...');
  await mobilePage.goto('http://localhost:3000/servicios#servicios-especializados', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1000);
  const mobileImages = await mobilePage.$$('img[alt*="Ecografía"]');
  console.log(`  Mobile: ${mobileImages.length} eco images visible`);
  if (mobileImages.length < 3) errors.push(`Mobile: expected 3 eco images, found ${mobileImages.length}`);

  // 7. Check WebP format
  console.log('7. Checking WebP format...');
  const src1 = await page.$eval('img[alt*="alta precisión"]', el => el.src);
  if (!src1.includes('.webp')) errors.push(`Image not WebP: ${src1}`);
  else console.log(`  OK: ${src1.split('/').pop()}`);

  await mobileCtx.close();
  await browser.close();

  console.log('\n═══ RESULTS ═══');
  if (errors.length === 0) {
    console.log('✅ ALL CHECKS PASSED — No errors found');
    process.exit(0);
  } else {
    console.log(`❌ ${errors.length} ERROR(S):`);
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  }
})();