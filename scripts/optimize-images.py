#!/usr/bin/env python3
"""Optimize HERO and doctor images to professional WebP."""
from PIL import Image, ImageOps
import os

BASE = "/home/z/my-project"
UPLOAD = f"{BASE}/upload"
PUBLIC = f"{BASE}/public"

# ═══ 1. HERO IMAGE — Mobile (portrait) + Desktop (landscape crop) ═══
hero_src = f"{UPLOAD}/HERO.jpg"
img = Image.open(hero_src)
print(f"HERO.jpg: {img.size} {img.mode}")

# Exif rotation fix
img = ImageOps.exif_transpose(img)
w, h = img.size  # 3024 x 4032

# Mobile: full portrait, resize to max 1200w
ratio_m = 1200 / w
new_h_m = int(h * ratio_m)
img_mobile = img.resize((1200, new_h_m), Image.LANCZOS)
out_mobile = f"{PUBLIC}/hero-mobile.webp"
img_mobile.save(out_mobile, "WEBP", quality=82, method=6)
sz_m = os.path.getsize(out_mobile)
print(f"  hero-mobile.webp: {img_mobile.size} -> {sz_m/1024:.0f} KB")

# Desktop: center crop to 16:9 landscape, max 1920w
target_ratio = 16 / 9
current_ratio = w / h
if current_ratio > target_ratio:
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    crop = img.crop((left, 0, left + new_w, h))
else:
    new_h = int(w / target_ratio)
    top = max(0, (h - new_h) // 4)
    crop = img.crop((0, top, w, top + new_h))

if crop.width > 1920:
    ratio_d = 1920 / crop.width
    crop = crop.resize((1920, int(crop.height * ratio_d)), Image.LANCZOS)

out_desktop = f"{PUBLIC}/hero-desktop.webp"
crop.save(out_desktop, "WEBP", quality=85, method=6)
sz_d = os.path.getsize(out_desktop)
print(f"  hero-desktop.webp: {crop.size} -> {sz_d/1024:.0f} KB")

# ═══ 2. DOCTOR PHOTO — Professional headshot ═══
doc_src = f"{UPLOAD}/pasted_image_1782262848710.png"
img_doc = Image.open(doc_src)
print(f"\nDoctor photo: {img_doc.size} {img_doc.mode}")
img_doc = ImageOps.exif_transpose(img_doc)
wd, hd = img_doc.size

if img_doc.mode in ('RGBA', 'LA', 'P'):
    bg = Image.new('RGB', img_doc.size, (0, 0, 0))
    if img_doc.mode == 'P':
        img_doc = img_doc.convert('RGBA')
    if img_doc.mode in ('RGBA', 'LA'):
        bg.paste(img_doc, mask=img_doc.split()[-1])
        img_doc = bg
    else:
        img_doc = img_doc.convert('RGB')

max_w = 800
if wd > max_w:
    ratio_doc = max_w / wd
    img_doc = img_doc.resize((max_w, int(hd * ratio_doc)), Image.LANCZOS)

out_doc = f"{PUBLIC}/doctores/dr-adolfo.webp"
os.makedirs(os.path.dirname(out_doc), exist_ok=True)
img_doc.save(out_doc, "WEBP", quality=85, method=6)
sz_doc = os.path.getsize(out_doc)
print(f"  dr-adolfo.webp: {img_doc.size} -> {sz_doc/1024:.0f} KB")

print("\nAll images optimized successfully")