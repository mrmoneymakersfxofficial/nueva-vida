const { chromium } = require('playwright');

(async () => {
  const devices = [
    { name: 'Mobile', width: 390, height: 844 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  const browser = await chromium.launch({ headless: true });
  const errors = [];

  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      userAgent: device.name === 'Mobile' 
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    // Collect console errors
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`[${device.name}] ${msg.text()}`);
    });
    page.on('pageerror', err => errors.push(`[${device.name}] PageError: ${err.message}`));

    console.log(`\n═══ ${device.name} (${device.width}x${device.height}) ═══`);

    try {
      await page.goto('http://21.0.11.203:3099/servicios#unidad-ecografia', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Scroll to ecografía section
      const section = page.locator('#unidad-ecografia');
      if (await section.count() > 0) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
      } else {
        errors.push(`[${device.name}] #unidad-ecografia section NOT found`);
      }

      // Check all 3 eco-fetal images loaded
      const images = page.locator('#unidad-ecografia img');
      const imgCount = await images.count();
      console.log(`  Images found: ${imgCount}`);
      if (imgCount < 3) errors.push(`[${device.name}] Expected 3+ images, found ${imgCount}`);

      // Check all images are WebP
      for (let i = 0; i < imgCount; i++) {
        const src = await images.nth(i).getAttribute('src');
        if (src) {
          const isWebp = src.includes('.webp') || src.includes('webp');
          console.log(`  Image ${i+1}: ${src.substring(0, 60)}... WebP: ${isWebp}`);
          if (!isWebp) errors.push(`[${device.name}] Image ${i+1} not WebP: ${src}`);
        }
      }

      // Check featured image (larger)
      const firstImg = images.nth(0);
      const firstBox = await firstImg.boundingBox();
      console.log(`  Featured image box: ${JSON.stringify(firstBox)}`);

      // Check thumbnail grid exists
      const gridItems = page.locator('#unidad-ecografia .grid.grid-cols-2 img');
      const gridCount = await gridItems.count();
      console.log(`  Thumbnail grid images: ${gridCount}`);
      if (gridCount < 2) errors.push(`[${device.name}] Expected 2 grid thumbnails, found ${gridCount}`);

      // Check "Ver galería completa" button
      const galleryBtn = page.locator('#unidad-ecografia button:has-text("Ver galería completa")');
      const btnCount = await galleryBtn.count();
      console.log(`  "Ver galería completa" button: ${btnCount > 0 ? 'FOUND' : 'MISSING'}`);
      if (btnCount === 0) errors.push(`[${device.name}] "Ver galería completa" button not found`);

      // Check counter badges (1/3, 2/3, 3/3)
      const badges = page.locator('#unidad-ecografia span');
      const badgeTexts = [];
      for (let i = 0; i < await badges.count(); i++) {
        const text = await badges.nth(i).textContent();
        if (text && text.includes('/')) badgeTexts.push(text.trim());
      }
      console.log(`  Counter badges: ${JSON.stringify(badgeTexts)}`);

      // Click featured image to open lightbox
      const firstImageContainer = page.locator('#unidad-ecografia .space-y-3 > div:first-child');
      if (await firstImageContainer.count() > 0) {
        await firstImageContainer.click();
        await page.waitForTimeout(1000);

        // Check lightbox opened
        const lightbox = page.locator('.fixed.inset-0.z-\\[11000\\]');
        const lbVisible = await lightbox.isVisible();
        console.log(`  Lightbox opens on click: ${lbVisible ? 'YES' : 'NO'}`);
        if (!lbVisible) errors.push(`[${device.name}] Lightbox did not open`);

        if (lbVisible) {
          // Check lightbox has close button, arrows, dots, caption
          const closeBtn = lightbox.locator('button[aria-label="Cerrar galería"]');
          console.log(`  Lightbox close button: ${await closeBtn.count() > 0 ? 'YES' : 'NO'}`);

          const prevBtn = lightbox.locator('button[aria-label="Anterior"]');
          const nextBtn = lightbox.locator('button[aria-label="Siguiente"]');
          console.log(`  Lightbox nav arrows: prev=${await prevBtn.count() > 0}, next=${await nextBtn.count() > 0}`);

          // Check dot indicators
          const dots = lightbox.locator('.rounded-full');
          const dotCount = await dots.count();
          console.log(`  Lightbox dot indicators: ${dotCount}`);

          // Check caption
          const caption = lightbox.locator('p').last();
          const captionText = await caption.textContent();
          console.log(`  Lightbox caption: "${captionText ? captionText.substring(0, 50) : 'EMPTY'}..."`);

          // Test navigation: click next
          await nextBtn.click();
          await page.waitForTimeout(600);
          const caption2 = lightbox.locator('p').last();
          const captionText2 = await caption2.textContent();
          console.log(`  After next: "${captionText2 ? captionText2.substring(0, 50) : 'EMPTY'}..."`);

          // Close lightbox
          await closeBtn.click();
          await page.waitForTimeout(500);
          console.log(`  Lightbox closed: ${!(await lightbox.isVisible()) ? 'YES' : 'NO'}`);
        }
      }

      // Take screenshot
      await page.screenshot({ path: `/home/z/my-project/download/servicios-${device.name.toLowerCase()}.png`, fullPage: false });

    } catch (err) {
      errors.push(`[${device.name}] Exception: ${err.message}`);
      console.log(`  ERROR: ${err.message}`);
    }

    await context.close();
  }

  await browser.close();

  console.log('\n═══ RESULTS ═══');
  if (errors.length === 0) {
    console.log('✅ ALL CHECKS PASSED — No errors found');
  } else {
    console.log(`❌ ${errors.length} ERROR(S) FOUND:`);
    errors.forEach(e => console.log(`  • ${e}`));
  }
})();