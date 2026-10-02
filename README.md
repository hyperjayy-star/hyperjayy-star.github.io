# Jaiden Ortiz — Model

One-page landing site for jaidenortiz.com, hosted on the existing free GitHub Pages repository.

The landing page uses Jaiden's supplied black-and-white edit without retouching. The source is 360 × 540 pixels; replace it with a larger export of the same edit when available.

## Editing

- Profile and hero image: `data/site.json`.
- Portfolio: `data/portfolio.json`. All current candidates are hidden pending Jaiden's finished edits. Replace an entry's `image` and `alt`, then set `visible: true` to show it in the Portfolio panel. Pages CMS supports these fields through `.pages.yml`.
- The Portfolio button shows “Selected work coming soon” until at least one image is visible.
- Run `node scripts/build.mjs` after content changes to refresh the HTML fallback. The browser also loads the JSON, so CMS changes appear without a build.
- Contact: contact@jaidenortiz.com; Instagram: @jaidenn_n.

## Hosting

Publish from `main`, repository root. Preserve `CNAME`, `.nojekyll`, and existing domain and mail configuration. No paid hosting or service is required.
