# North Star Bakery — Touchstone 4

This project continues the North Star Bakery website from Touchstones 2 and 3 and adds client-side JavaScript interactivity without changing the client or visual design system.

## Files

- `index.html`: welcome, responsive picture, weekly feature, and hours.
- `products.html`: products plus the interactive bakery favorites tracker.
- `about.html`: bakery story, sourcing, team, and provided welcome audio.
- `contact.html`: location, hours, preorder/inquiry form, and inline validation feedback.
- `styles.css`: the existing responsive visual design plus styles for favorites and validation states.
- `script.js`: interactive favorites, localStorage, preorder helper, and JavaScript form validation.
- `media/`: original provided PNG and MP3 assets.

## Touchstone 4 feature

The Products page includes a **Save Your Bakery Favorites** feature. Users can click buttons to save or remove bakery items. JavaScript updates the page immediately and stores the selected item IDs in `localStorage` under `northStarBakeryFavorites`. Saved selections load again when the page opens.

On the Contact page, **Add saved favorites** copies the saved item names into the preorder details field. This gives the stored data a meaningful use across pages instead of saving data only as a demonstration.

## JavaScript organization

`script.js` uses an array of bakery item objects with an `id`, `name`, `category`, and `price`. Smaller functions handle reading and writing storage, rendering choices, toggling favorites, transferring favorites to the form, setting error messages, and validating each field.

## Form validation

The form uses JavaScript to prevent invalid submission and display messages next to the relevant fields. Checks include required name, email format, request type, minimum request length, and bakery-specific pickup-date rules. The form does not erase entered values when an error occurs. A valid sample submission shows an on-page confirmation message but does not place or send a real order.

## Preview

Live website: https://naimaburke2005-design.github.io/north-star-bakery-touchstone3/

Repository: https://github.com/naimaburke2005-design/north-star-bakery-touchstone3

GitHub Pages publishes the site from the `main` branch and `/ (root)`.

## Project notes

The story, staff, address, hours, and prices are fictional sample content permitted by the scenario. The form is a static student-project demonstration and does not send an inquiry or place an order.
