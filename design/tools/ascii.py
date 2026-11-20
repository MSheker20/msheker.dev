"""Turn a portrait photo into an ASCII portrait for the hero terminal.

Best results: make a person mask first (on-device, Apple Vision), then pass it:
  swift design/tools/person-mask.swift assets-inbox/photo.jpeg /tmp/mask.png
  python3 -I design/tools/ascii.py assets-inbox/photo.jpeg design/hero/portrait.txt --mask /tmp/mask.png --cols 64

Without a mask an ellipse around the head fades the background (weaker).
"""
import argparse, math
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('photo'); ap.add_argument('out')
ap.add_argument('--mask', help='grayscale person mask, white = person')
ap.add_argument('--cols', type=int, default=64)
ap.add_argument('--bottom', type=float, default=0.80, help='keep this share of the person, from the top of the head')
ap.add_argument('--gamma', type=float, default=0.9)
ap.add_argument('--equalize', action='store_true', help='spread the person\'s tones evenly (more face detail)')
ap.add_argument('--frame', choices=['body', 'head'], default='head', help='head: head + shoulders fill the frame')
ap.add_argument('--width', type=float, default=3.4, help='head frame width, in head widths')
ap.add_argument('--height', type=float, default=3.0, help='head frame height below the crown, in head widths')
a = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(a.photo)).convert('L')
W, H = im.size
mask = None
if a.mask:
    mask = Image.open(a.mask).convert('L').resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(W / 600))
    x0, y0, x1, y1 = mask.point(lambda v: 255 if v > 128 else 0).getbbox()
    if a.frame == 'head':
        # find the head in the top slice of the silhouette and frame head + shoulders around it
        top = mask.crop((0, y0, W, y0 + int((y1 - y0) * 0.16))).point(lambda v: 255 if v > 128 else 0)
        hx0, _, hx1, _ = top.getbbox()
        hw, cx = hx1 - hx0, (hx0 + hx1) / 2
        box = (int(max(0, cx - a.width * hw / 2)), int(max(0, y0 - 0.18 * hw)),
               int(min(W, cx + a.width * hw / 2)), int(min(H, y0 + a.height * hw)))
    else:
        pad = int((x1 - x0) * 0.04)
        box = (max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y0 + int((y1 - y0) * a.bottom)))
else:
    box = (int(W * .2), int(H * .12), int(W * .8), int(H * .98))

im = im.crop(box); mask = mask.crop(box) if mask else None
# contrast from the person only, so the background doesn't skew the levels
pmask = mask.point(lambda v: 255 if v > 128 else 0) if mask else None
im = ImageOps.equalize(im, mask=pmask) if a.equalize else ImageOps.autocontrast(im, cutoff=1, mask=pmask)
im = ImageEnhance.Contrast(im).enhance(1.2)
rows = int(a.cols * im.size[1] / im.size[0] * 0.5)  # mono cells are ~2x taller than wide
im = im.resize((a.cols, rows), Image.LANCZOS)
if mask: mask = mask.resize((a.cols, rows), Image.LANCZOS)

ramp = " .,:;-=+*#%@"  # light text on a dark terminal: bright pixels get dense glyphs
lines = []
for y in range(rows):
    s = ''
    for x in range(a.cols):
        v = (im.getpixel((x, y)) / 255) ** a.gamma
        if mask:
            m = mask.getpixel((x, y)) / 255
        else:
            d = math.hypot((x - a.cols / 2) / (a.cols * .3), (y - rows * .42) / (rows * .4))
            m = 1.0 if d < 1 else max(0.0, 1 - (d - 1) * 3.5)
        v *= m
        # keep the silhouette readable: anything inside the person gets at least a dot
        idx = int(v * len(ramp))
        if m > .5 and idx == 0: idx = 1
        s += ramp[min(len(ramp) - 1, idx)]
    lines.append(s.rstrip())
open(a.out, 'w').write('\n'.join(lines))
print(f'{a.out}: {a.cols}x{rows}')
