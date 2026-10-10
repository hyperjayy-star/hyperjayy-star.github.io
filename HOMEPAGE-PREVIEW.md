# Ivory homepage — unpublished review

Based on live commit `cf146d0b2a5b3c54231d342ae875fe92e697645b`.
Review branch: `preview/ivory-editorial`. Do not merge or deploy without Jaiden's explicit approval.

## Files

`index.html` contains the new homepage above the existing portfolio. `home.css`
and `home.js` are isolated homepage styling and carousel behavior. New image assets
live in `media/home/`. No build is required: serve the repository root as static files.
The old `scripts/build.mjs` is a legacy homepage generator; do not run it for this
preview, because its old template would overwrite the maintained `index.html`.

## Image provenance

The portrait uses uploaded `P1099973(3).jpeg`, 1199 × 1536. A segmentation and
matting process created transparency only. The PNG crops original coordinates
(370,108)–(829,1498), yielding 459 × 1390. Every RGB pixel in that crop is identical
to the decoded original; there is no face generation, body reshaping, color editing,
sharpening, or resampling. The hair transparency is refined; clothing uses the
smooth segmentation edge. A CSS ground shadow is separate from the photo.

Slideshow originals are copied without re-encoding:

| Asset | Source | Dimensions |
| --- | --- | --- |
| runway-original.jpg | Previous supplied original, NYFW_Runway_Full.jpeg | 1229 × 1536 |
| denim-original.jpg | Existing casting/assets/portfolio-09.jpg | 1365 × 2048 |
| studio-original.jpg | Existing casting/assets/portfolio-05.jpg | 1365 × 2048 |
| tailoring-original.jpg | Existing casting/assets/portfolio-03.jpg | 1367 × 2048 |

The existing repository also contains runway photos at 360 × 450 and 360 × 474,
and a homepage portrait at 360 × 540. These small assets are unsuitable for large
high-density displays. They are not used in the new hero or slideshow. No functional
slideshow existed in the checked-out live homepage, so this audit cannot establish
the precise rendering cause of an earlier unpublished slideshow's blur.
The new slideshow has no blur, brightness filter, zoom, or cover cropping; it uses
`object-fit:contain`, with full source files and a maximum page width.

## Behavior and checks

- Starts with the navy double-breasted runway original; rotates every 5000 ms.
- Previous/next wrap; dots select; keyboard arrows work within the carousel.
- Pauses on hover, keyboard focus, hidden tab, and when offscreen.
- Explicit pause/play control; reduced-motion preference starts paused.
- Decodes the next photo before revealing it.
- Desktop three-column composition; mobile portrait/title above the slideshow.
- DOM tests passed: timer, wrapping, dots, pause/play, keyboard, reduced motion,
  existing gallery opening, next image, closing, and scroll restoration.
- Asset references resolve; all four slideshow files match source SHA-256 hashes.
- Existing portfolio/lightbox HTML and JavaScript remain byte-identical. Casting,
  About, comp cards, galleries, and their assets remain unchanged.
- Browser layout, screenshot, touch, and visual-overflow verification remains
  BLOCKED: managed preview failed with a sandbox mount error; the cloud browser
  also rejected local-file navigation. No browser screenshots were generated.

This is an implementation for review, not a visually verified release.
