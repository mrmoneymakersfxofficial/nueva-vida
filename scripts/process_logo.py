#!/usr/bin/env python3
"""Process the new Nueva Vida logo: clean background, convert to WebP excellent quality."""

from PIL import Image
import numpy as np

# Load the new logo (image 2)
img = Image.open('/home/z/my-project/upload/pasted_image_1782573984532.png').convert('RGBA')
w, h = img.size
print(f"Original size: {w}x{h}")

# Convert to numpy for pixel manipulation
data = np.array(img)

# Clean up: make very-low-alpha pixels fully transparent
alpha = data[:, :, 3]
alpha[alpha < 30] = 0

# For pixels with alpha between 30-200, boost slightly for crisper edges
mask = (alpha >= 30) & (alpha < 200)
alpha[mask] = (alpha[mask].astype(np.float32) * 1.2).clip(0, 255).astype(np.uint8)

data[:, :, 3] = alpha
img_clean = Image.fromarray(data)

# Create 2x version for retina displays
img_2x = img_clean.resize((w * 2, h * 2), Image.LANCZOS)

# Save as WebP with excellent quality (95)
output_path = '/home/z/my-project/public/logo-nuevavida.webp'
img_2x.save(output_path, 'WEBP', quality=95, method=6)
print(f"Saved 2x logo ({w*2}x{h*2}) to {output_path}")

# Verify
verify = Image.open(output_path)
print(f"Verified: {verify.size}, mode={verify.mode}")
print(f"File size: {__import__('os').path.getsize(output_path)} bytes")
print("\nDone!")