import asyncio
from playwright.async_api import async_playwright

async def test_logo():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        BASE = "http://127.0.0.1:3000"
        
        # Test 1: Homepage - transparent navbar
        print("=== TEST 1: Homepage (transparent navbar) ===")
        await page.goto(f"{BASE}/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)
        
        navbar = page.locator("#navbar-main").first
        box = await navbar.bounding_box()
        print(f"Navbar box: {box}")
        if box:
            await page.screenshot(path="/home/z/my-project/download/test_home_navbar.png", clip=box)
            print("Saved: test_home_navbar.png")
        
        logo = page.locator('img[alt="Logotipo Nueva Vida"]').first
        count = await logo.count()
        if count > 0:
            lb = await logo.bounding_box()
            print(f"Logo size: {lb['width']:.0f}x{lb['height']:.0f}px" if lb else "No box")
            print(f"Visible: {await logo.is_visible()}")
        else:
            print("LOGO NOT FOUND!")
        
        # Test 2: Scrolled
        print("\n=== TEST 2: Scrolled state ===")
        await page.evaluate("window.scrollTo(0, 200)")
        await page.wait_for_timeout(1000)
        box2 = await navbar.bounding_box()
        if box2:
            await page.screenshot(path="/home/z/my-project/download/test_home_scrolled.png", clip=box2)
            print("Saved: test_home_scrolled.png")
        logo2 = page.locator('img[alt="Logotipo Nueva Vida"]').first
        if await logo2.count() > 0:
            lb2 = await logo2.bounding_box()
            print(f"Logo (scrolled): {lb2['width']:.0f}x{lb2['height']:.0f}px" if lb2 else "No box")
        
        # Test 3: Mobile
        print("\n=== TEST 3: Mobile ===")
        page2 = await browser.new_page(viewport={"width": 390, "height": 844})
        await page2.goto(f"{BASE}/", wait_until="networkidle", timeout=30000)
        await page2.wait_for_timeout(2000)
        nb3 = page2.locator("#navbar-main").first
        box3 = await nb3.bounding_box()
        if box3:
            await page2.screenshot(path="/home/z/my-project/download/test_mobile_navbar.png", clip=box3)
            print("Saved: test_mobile_navbar.png")
        lg3 = page2.locator('img[alt="Logotipo Nueva Vida"]').first
        if await lg3.count() > 0:
            lb3 = await lg3.bounding_box()
            print(f"Logo (mobile): {lb3['width']:.0f}x{lb3['height']:.0f}px" if lb3 else "No box")
        
        # Test 4: Full page desktop
        print("\n=== TEST 4: Full page ===")
        await page.goto(f"{BASE}/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(1500)
        await page.screenshot(path="/home/z/my-project/download/test_full_page.png")
        print("Saved: test_full_page.png")
        
        # Test 5: Reservas
        print("\n=== TEST 5: Reservas ===")
        await page.goto(f"{BASE}/reservas", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)
        nb5 = page.locator("#navbar-main").first
        box5 = await nb5.bounding_box()
        if box5:
            await page.screenshot(path="/home/z/my-project/download/test_reservas_navbar.png", clip=box5)
            print("Saved: test_reservas_navbar.png")
        lg5 = page.locator('img[alt="Logotipo Nueva Vida"]').first
        if await lg5.count() > 0:
            lb5 = await lg5.bounding_box()
            print(f"Logo (reservas): {lb5['width']:.0f}x{lb5['height']:.0f}px" if lb5 else "No box")
        
        # Test 6: Footer
        print("\n=== TEST 6: Footer ===")
        await page.goto(f"{BASE}/", wait_until="networkidle", timeout=30000)
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1500)
        footer = page.locator("footer").first
        fb = await footer.bounding_box()
        if fb:
            clip = {"x": fb["x"], "y": fb["y"], "width": 500, "height": 200}
            await page.screenshot(path="/home/z/my-project/download/test_footer.png", clip=clip)
            print("Saved: test_footer.png")
        
        await browser.close()
        print("\nAll tests done!")

asyncio.run(test_logo())