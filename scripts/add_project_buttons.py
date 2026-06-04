#!/usr/bin/env python3
"""Insert a consistent external-link button after the front matter of project pages."""
import re

LINKS = {
    "1_project.md": ("https://www.kaggle.com/samehshehata/google-data-analytics-capstone-project-case-1", "View on Kaggle"),
    "2_project.md": ("https://drive.google.com/file/d/1ly2cUboZKZucsAqcTIz7YonYMSLAJ1C0/preview", "View Dashboard"),
    "3_project.md": ("https://www.kaggle.com/samehshehata/google-advanced-da-salifort-motors-project", "View on Kaggle"),
    "5_project.md": ("https://www.kaggle.com/samehshehata/uncovering-price-drivers-in-mexico-and-brazil", "View on Kaggle"),
    "6_project.md": ("https://www.kaggle.com/samehshehata/predicting-apartment-prices-in-buenos-aires", "View on Kaggle"),
    "7_project.md": ("https://www.kaggle.com/samehshehata/predictive-modeling-of-air-quality-in-nairobi", "View on Kaggle"),
    "8_project.md": ("https://www.kaggle.com/samehshehata/predicting-earthquake-damage", "View on Kaggle"),
    "9_project.md": ("https://www.kaggle.com/samehshehata/predicting-corporate-bankruptcy-in-poland", "View on Kaggle"),
    "10_project.md": ("https://www.kaggle.com/samehshehata/improving-applicant-engagement", "View on Kaggle"),
    "11_project.md": ("https://www.kaggle.com/samehshehata/stock-volatility-forecasting", "View on Kaggle"),
}

MARKER = "<!-- project-cta -->"

for fname, (url, label) in LINKS.items():
    path = f"_projects/{fname}"
    with open(path) as f:
        text = f.read()
    if MARKER in text:
        continue
    # Find end of YAML front matter (second '---')
    m = re.match(r"^(---\n.*?\n---\n)", text, re.DOTALL)
    if not m:
        print("SKIP (no front matter):", fname)
        continue
    fm = m.group(1)
    rest = text[len(fm):]
    cta = (
        f"\n{MARKER}\n"
        f'<div class="project-cta" markdown="0">\n'
        f'  <a class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener noreferrer"\n'
        f'     data-ga-event="project_link" data-ga-label="{label}" href="{url}">{label} ↗</a>\n'
        f"</div>\n"
    )
    with open(path, "w") as f:
        f.write(fm + cta + rest)
    print("updated", fname)
