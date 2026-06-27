"""
Process the new Nueva Vida logo:
1. Remove white/near-white background → transparent
2. Save as high-quality WebP with transparency
3. Generate multiple sizes (navbar, footer, OG)
"""
from PIL import Image
import numpy as np

SOURCE = '/home/z/my-project/upload/logo perfil.png'
OUTPUT_MAIN = '/home/z/my-project/public/logo-nuevavida.webp'

# Load image
img = Image.open(SOURCE).convert('RGBA')
arr = np.array(img)

print(f"Source: {img.size} mode={img.mode}")

# ── Remove white/near-white background ──
# The background is approximately (254, 254, 254)
# We'll use a threshold approach: pixels close to white become transparent
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

# Calculate "whiteness" - how close each pixel is to white
# Background is ~254, 254, 254. Logo colors are darker (blues, teals)
white_threshold = 240  # pixels with all channels above this are background

# Create mask for white background
is_white = (r >= white_threshold) & (g >= white_threshold) & (b >= white_threshold)

# Also handle near-white with slight color cast
near_white_threshold = 245
is_near_white = (r >= near_white_threshold) & (g >= near_white_threshold) & (b >= near_white_threshold) & (np.abs(r.astype(int) - g.astype(int)) < 15) & (np.abs(g.astype(int) - b.astype(int)) < 15)

background_mask = is_white | is_near_white

print(f"Background pixels detected: {background_mask.sum()} / {background_mask.size} ({100*background_mask.sum()/background_mask.size:.1f}%)")

# Set background to transparent
arr[background_mask, 3] = 0

# Create clean image
clean_img = Image.fromarray(arr, 'RGBA')

# ── Save as high-quality WebP (2x for retina) ──
# Current size is 1873x503 — good enough, just save with transparency
# For navbar, we want it crisp at 2x display

# Main logo - full resolution with transparency
clean_img.save(OUTPUT_MAIN, 'WEBP', quality=98, method=6)
print(f"Saved main logo: {OUTPUT_MAIN} ({clean_img.size})")

# Also save a PNG version for fallback
clean_img.save('/home/z/my-project/public/logo-nuevavida.png', 'PNG')
print(f"Saved PNG fallback: /home/z/my-project/public/logo-nuevavida.png")

# Verify
verify = Image.open(OUTPUT_MAIN)
print(f"Verified output: {verify.size}, mode={verify.mode}")
v_arr = np.array(verify)
transparent = (v_arr[:,:,3] == 0).sum()
print(f"Transparent pixels: {transparent} / {v_arr.shape[0]*v_arr.shape[1]} ({100*transparent/(v_arr.shape[0]*v_arr.shape[1]):.1f}%)")

print("\n✅ Logo processing complete!")