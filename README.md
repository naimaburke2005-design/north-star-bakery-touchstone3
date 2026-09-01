# North Star Bakery — Touchstone 3

Four static HTML pages with a shared external stylesheet, responsive
Flexbox layouts, and the original Sophia bakery media. No build step,
JavaScript, or external font downloads are required.

## Files

- `index.html`: welcome, responsive picture, weekly feature, hours.
- `products.html`: product descriptions, prices, signature-loaf figure.
- `about.html`: bakery story, sourcing, team, provided welcome audio.
- `contact.html`: location, hours, labeled practice inquiry form.
- `styles.css`: four-color palette, Georgia/Arial typography, mobile-first
  layouts, and media queries at 48rem and 70rem.
- `media/`: original provided PNG and MP3 assets.

## Preview

Live website: https://naimaburke2005-design.github.io/north-star-bakery-touchstone3/

Repository: https://github.com/naimaburke2005-design/north-star-bakery-touchstone3

Open `index.html` in a browser. In GitHub Codespaces, open a terminal,
run `python3 -m http.server 8000`, and use the Ports tab to open port 8000.

## GitHub Pages and submission

GitHub Pages publishes this site from the `main` branch and `/ (root)`.

The assignment requires the completed Word document as the single
submission file. The repository contains the website files.

## Review completed

All four pages were reviewed in the live browser preview at desktop width
and inside 375-pixel-wide preview frames. No horizontal content overflow
was found. Navigation and the home page pickup link work; all images and
the welcome audio load. The form blocks an empty submission using native
HTML validation. Source checks also verified relative links, labels,
headings, shared CSS, and the main text color contrast ratios.

## Project notes

The story, staff, address, hours, and prices are fictional sample content
permitted by the scenario. The form is a static demonstration: it uses
built-in browser validation and reloads `contact.html` with the supplied
sample values in the URL; it does not send an inquiry or place an order.

Use sample information when testing. The pickup date is optional so a
visitor can ask a general question without selecting a date.

## Sources

- https://app.sophia.org/tutorials/client-scenarios
- https://app.sophia.org/tutorials/client-information-update
- Provided assets: Sophia Bakery_c.zip
