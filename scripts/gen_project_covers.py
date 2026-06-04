#!/usr/bin/env python3
"""Generate consistent, on-brand SVG cover images for data-science projects.

Produces 1200x675 SVGs with a cohesive gradient, a subtle data-viz motif and
project title/subtitle. Run from repo root: python3 scripts/gen_project_covers.py
"""
import os
from xml.sax.saxutils import escape

OUT = "assets/img/projects"
os.makedirs(OUT, exist_ok=True)

# (filename, accent_a, accent_b, domain_tag, title_lines, subtitle, motif)
PROJECTS = [
    ("real-estate-mx-br", "#6366f1", "#8b5cf6", "REAL ESTATE",
     ["Real Estate", "Price Drivers"], "Mexico & Brazil  ·  Ridge Regression", "bars"),
    ("apartment-prices-ba", "#0ea5e9", "#6366f1", "REAL ESTATE",
     ["Apartment Price", "Prediction"], "Buenos Aires  ·  Regression", "scatter"),
    ("air-quality-nairobi", "#10b981", "#0ea5e9", "ENVIRONMENT",
     ["Air Quality", "Forecasting"], "Nairobi  ·  Time-Series (PM2.5)", "line"),
    ("earthquake-nepal", "#f59e0b", "#ef4444", "DISASTER RESPONSE",
     ["Earthquake Damage", "Prediction"], "Nepal  ·  Classification", "grid"),
    ("bankruptcy-poland", "#ef4444", "#8b5cf6", "FINANCE",
     ["Corporate Bankruptcy", "Prediction"], "Poland  ·  Ensemble ML", "down"),
    ("ab-testing-engagement", "#8b5cf6", "#ec4899", "EXPERIMENTATION",
     ["A/B Testing", "Optimization"], "Applicant Engagement  ·  Stats", "ab"),
    ("stock-volatility", "#14b8a6", "#6366f1", "FINANCE",
     ["Stock Volatility", "Forecasting"], "GARCH  ·  Financial Time-Series", "candle"),
]

W, H = 1200, 675


def motif_svg(kind, ax, ay):
    """Return decorative motif markup using accent colors (low opacity)."""
    o = 'opacity="0.16"'
    s = []
    if kind == "bars":
        for i, hgt in enumerate([90, 150, 110, 200, 160, 240, 190]):
            x = 760 + i * 56
            s.append(f'<rect x="{x}" y="{520 - hgt}" width="34" height="{hgt}" rx="6" fill="#fff" {o}/>')
    elif kind == "line":
        pts = "740,470 800,420 860,440 920,360 980,390 1040,300 1100,330 1160,250"
        s.append(f'<polyline points="{pts}" fill="none" stroke="#fff" stroke-width="6" opacity="0.22"/>')
        for p in pts.split():
            x, y = p.split(",")
            s.append(f'<circle cx="{x}" cy="{y}" r="7" fill="#fff" opacity="0.30"/>')
    elif kind == "scatter":
        import random
        random.seed(7)
        for _ in range(26):
            x = random.randint(770, 1160); y = random.randint(300, 520)
            s.append(f'<circle cx="{x}" cy="{y}" r="{random.randint(6,13)}" fill="#fff" {o}/>')
    elif kind == "grid":
        for i in range(6):
            for j in range(4):
                x = 770 + i * 70; y = 290 + j * 58
                s.append(f'<rect x="{x}" y="{y}" width="50" height="40" rx="6" fill="#fff" opacity="{0.06 + 0.04*((i+j)%4)}"/>')
    elif kind == "down":
        pts = "740,300 800,330 860,310 920,380 980,360 1040,440 1100,470 1160,520"
        s.append(f'<polyline points="{pts}" fill="none" stroke="#fff" stroke-width="6" opacity="0.24"/>')
        s.append('<polygon points="1160,520 1130,470 1180,475" fill="#fff" opacity="0.30"/>')
    elif kind == "ab":
        s.append(f'<rect x="780" y="300" width="150" height="200" rx="12" fill="#fff" {o}/>')
        s.append(f'<rect x="990" y="260" width="150" height="240" rx="12" fill="#fff" opacity="0.24"/>')
        s.append('<text x="855" y="540" font-size="46" fill="#fff" opacity="0.5" text-anchor="middle" font-family="Arial">A</text>')
        s.append('<text x="1065" y="540" font-size="46" fill="#fff" opacity="0.6" text-anchor="middle" font-family="Arial">B</text>')
    elif kind == "candle":
        import random
        random.seed(3)
        for i in range(9):
            x = 770 + i * 46
            cy = random.randint(330, 430); ch = random.randint(40, 90)
            wick = random.randint(20, 40)
            s.append(f'<line x1="{x+13}" y1="{cy-wick}" x2="{x+13}" y2="{cy+ch+wick}" stroke="#fff" stroke-width="3" opacity="0.25"/>')
            s.append(f'<rect x="{x}" y="{cy}" width="26" height="{ch}" rx="3" fill="#fff" opacity="0.20"/>')
    return "\n  ".join(s)


def make(p):
    fname, a, b, tag, lines, sub, motif = p
    tag = escape(tag)
    sub = escape(sub)
    lines = [escape(t) for t in lines]
    title = "".join(
        f'<tspan x="80" dy="{0 if i==0 else 74}">{t}</tspan>' for i, t in enumerate(lines)
    )
    ty = 300 if len(lines) > 1 else 340
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{a}"/>
      <stop offset="1" stop-color="{b}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.2" cy="0.15" r="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="0.6" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#g)"/>
  <rect width="{W}" height="{H}" fill="url(#v)"/>
  {motif_svg(motif, a, b)}
  <g font-family="Inter, Helvetica, Arial, sans-serif">
    <rect x="80" y="150" width="{18 + len(tag)*13}" height="40" rx="20" fill="#ffffff" fill-opacity="0.22"/>
    <text x="{80 + (18 + len(tag)*13)/2}" y="177" font-size="20" letter-spacing="2" fill="#fff" text-anchor="middle" font-weight="700">{tag}</text>
    <text x="80" y="{ty}" font-size="60" font-weight="800" fill="#ffffff">{title}</text>
    <text x="80" y="{ty + 74*(len(lines)-1) + 58}" font-size="27" fill="#ffffff" fill-opacity="0.92" font-weight="500">{sub}</text>
    <text x="80" y="600" font-size="22" fill="#ffffff" fill-opacity="0.85" font-weight="600">Sameh S. Abdelaziz  ·  Data &amp; BI Analyst</text>
  </g>
</svg>
'''
    path = os.path.join(OUT, fname + ".svg")
    with open(path, "w") as f:
        f.write(svg)
    return path


if __name__ == "__main__":
    for p in PROJECTS:
        print("wrote", make(p))
