#!/usr/bin/env python3
"""Optimize 3 ultrasound images to professional WebP."""
from PIL import Image, ImageOps
import os

UPLOAD = "/home/z/my-project/upload"
PUBLIC = "/home/z/my-project/public/servicios"
os.makedirs(PUBLIC, exist_ok=True)

files = [
    ("pasted_image_1782263026622.png", "eco-fetal-1.webp", "Ecografia 2D alta precision"),
    ("pasted_image_1782263030259.png", "eco-fetal-2.webp", "Ecografia 2D fetal 14 semanas"),
    ("pasted_image_1782263033304.png", "eco-fetal-3.webp", "Ecografia 3D/4D fetal"),
]

for fname, outname, alt in files:
    src = f"{UPLOAD}/{fname}"
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    w, h = img.size
    print(f"{fname}: {w}x{h} {img.mode}")

    # Convert to RGB if needed
    if img.mode != 'RGB':
        if img.mode in ('RGBA', 'LA'):
            bg = Image.new('RGB', img.size, (0, 0, 0))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        else:
            img = img.convert('RGB')

    # Optimize: max 1200w for responsive, high quality
    max_w = 1200
    if w > max_w:
        ratio = max_w / w
        img = img.resize((max_w, int(h * ratio)), Image.LANCZOS)

    out = f"{PUBLIC}/{outname}"
    img.save(out, "WEBP", quality=88, method=6)
    sz = os.path.getsize(out)
    print(f"  -> {outname}: {img.size} -> {sz/1024:.0f} KB\n")

print("All ultrasound images optimized!")