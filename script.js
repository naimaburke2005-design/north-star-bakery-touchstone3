'use strict';

const bakeryItems = [
  { id: 'signature-loaf', name: 'Signature Loaf', category: 'Bread', price: '$7–$10' },
  { id: 'sandwich-bread', name: 'Sandwich Bread', category: 'Bread', price: '$6–$9' },
  { id: 'seasonal-bread', name: 'Seasonal Bread', category: 'Bread', price: '$8–$12' },
  { id: 'butter-croissant', name: 'Butter Croissant', category: 'Pastry', price: '$3–$5 each' },
  { id: 'cookie', name: 'Cookies', category: 'Pastry', price: '$2–$4 each' },
  { id: 'pastry-box', name: 'Pastry Box', category: 'Pastry', price: '$18–$30' },
  { id: 'small-cake', name: 'Small Celebration Cake', category: 'Cake', price: '$30–$45' },
  { id: 'custom-cake', name: 'Custom Cake', category: 'Cake', price: '$50–$90' }
];

const FAVORITES_KEY = 'northStarBakeryFavorites';

function getStoredFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getItemById(itemId) {
  return bakeryItems.find((item) => item.id === itemId);
}

function renderFavoriteOptions() {
  const container = document.querySelector('#favorite-options');
  if (!container) return;

  const favorites = getStoredFavorites();
  container.innerHTML = '';

  bakeryItems.forEach((item) => {
    const isSaved = favorites.includes(item.id);
    const card = document.createElement('article');
    card.className = 'favorite-option';
    card.innerHTML = `
      <p class="favorite-category">${item.category}</p>
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button type="button" class="favorite-toggle" data-item-id="${item.id}" aria-pressed="${isSaved}">
        ${isSaved ? 'Saved ✓' : 'Save favorite'}
      </button>`;
    container.appendChild(card);
  });
}

function renderSavedFavorites(message = '') {
  const list = document.querySelector('#favorite-list');
  const empty = document.querySelector('#favorites-empty');
  const status = document.querySelector('#favorites-status');
  const clearButton = document.querySelector('#clear-favorites');
  if (!list || !empty) return;

  const favorites = getStoredFavorites();
  list.innerHTML = '';

  favorites.forEach((itemId) => {
    const item = getItemById(itemId);
    if (!item) return;
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}`;
    list.appendChild(li);
  });

  empty.hidden = favorites.length > 0;
  if (clearButton) clearButton.disabled = favorites.length === 0;
  if (status) status.textContent = message;
}

function toggleFavorite(itemId) {
  const favorites = getStoredFavorites();
  const item = getItemById(itemId);
  if (!item) return;

  const index = favorites.indexOf(itemId);
  let message;

  if (index >= 0) {
    favorites.splice(index, 1);
    message = `${item.name} was removed from your favorites.`;
  } else {
    favorites.push(itemId);
    message = `${item.name} was saved for your next visit.`;
  }

  saveFavorites(favorites);
  renderFavoriteOptions();
  renderSavedFavorites(message);
}

function initializeFavorites() {
  const options = document.querySelector('#favorite-options');
  if (!options) return;

  renderFavoriteOptions();
  renderSavedFavorites();

  options.addEventListener('click', (event) => {
    const button = event.target.closest('.favorite-toggle');
    if (!button) return;
    toggleFavorite(button.dataset.itemId);
  });

  const clearButton = document.querySelector('#clear-favorites');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      saveFavorites([]);
      renderFavoriteOptions();
      renderSavedFavorites('Your saved favorites were cleared.');
    });
  }
}

function addFavoritesToRequest() {
  const details = document.querySelector('#item-details');
  const helper = document.querySelector('#saved-items-message');
  if (!details) return;

  const savedItems = getStoredFavorites()
    .map(getItemById)
    .filter(Boolean);

  if (savedItems.length === 0) {
    if (helper) helper.textContent = 'You do not have any saved favorites yet.';
    return;
  }

  const favoriteText = savedItems.map((item) => item.name).join(', ');
  const intro = `Saved favorites: ${favoriteText}.`;

  if (!details.value.includes('Saved favorites:')) {
    details.value = details.value.trim()
      ? `${intro}\n${details.value.trim()}`
      : `${intro}\nPlease confirm availability and pickup details.`;
  }

  if (helper) helper.textContent = `${savedItems.length} saved favorite${savedItems.length === 1 ? '' : 's'} added to your request.`;
  details.focus();
}

function setError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) error.textContent = message;
}

function validateName(field) {
  const value = field.value.trim();
  if (!value) {
    setError(field, 'Please enter your full name.');
    return false;
  }
  if (value.length < 2) {
    setError(field, 'Please enter at least 2 characters for your name.');
    return false;
  }
  setError(field, '');
  return true;
}

function validateEmail(field) {
  const value = field.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    setError(field, 'Please enter an email address.');
    return false;
  }
  if (!emailPattern.test(value)) {
    setError(field, 'Enter an email in a format like name@example.com.');
    return false;
  }
  setError(field, '');
  return true;
}

function validateRequestType(field) {
  if (!field.value) {
    setError(field, 'Please choose preorder request or general question.');
    return false;
  }
  setError(field, '');
  return true;
}

function validateDetails(field) {
  const value = field.value.trim();
  if (!value) {
    setError(field, 'Please tell us what you would like to order or ask.');
    return false;
  }
  if (value.length < 10) {
    setError(field, 'Please enter at least 10 characters so we have enough detail to help.');
    return false;
  }
  setError(field, '');
  return true;
}

function validatePickupDate(dateField, requestTypeField) {
  if (requestTypeField.value !== 'preorder') {
    setError(dateField, '');
    return true;
  }

  if (!dateField.value) {
    setError(dateField, 'Please choose a preferred pickup date for a preorder request.');
    return false;
  }

  const selected = new Date(`${dateField.value}T12:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    setError(dateField, 'Please choose today or a future pickup date.');
    return false;
  }
  if (selected.getDay() === 1) {
    setError(dateField, 'North Star Bakery is closed on Mondays. Please choose another day.');
    return false;
  }

  setError(dateField, '');
  return true;
}

function validateForm(form) {
  const name = form.querySelector('#full-name');
  const email = form.querySelector('#email');
  const requestType = form.querySelector('#request-type');
  const pickupDate = form.querySelector('#pickup-date');
  const details = form.querySelector('#item-details');

  const results = [
    validateName(name),
    validateEmail(email),
    validateRequestType(requestType),
    validatePickupDate(pickupDate, requestType),
    validateDetails(details)
  ];

  return results.every(Boolean);
}

function initializeFormValidation() {
  const form = document.querySelector('#bakery-request-form');
  if (!form) return;

  const name = form.querySelector('#full-name');
  const email = form.querySelector('#email');
  const requestType = form.querySelector('#request-type');
  const pickupDate = form.querySelector('#pickup-date');
  const details = form.querySelector('#item-details');
  const confirmation = document.querySelector('#form-confirmation');
  const favoritesButton = document.querySelector('#add-saved-favorites');

  if (favoritesButton) favoritesButton.addEventListener('click', addFavoritesToRequest);

  name.addEventListener('blur', () => validateName(name));
  email.addEventListener('blur', () => validateEmail(email));
  requestType.addEventListener('change', () => {
    validateRequestType(requestType);
    validatePickupDate(pickupDate, requestType);
  });
  pickupDate.addEventListener('change', () => validatePickupDate(pickupDate, requestType));
  details.addEventListener('blur', () => validateDetails(details));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      if (confirmation) confirmation.textContent = '';
      return;
    }

    if (confirmation) {
      confirmation.textContent = 'Your sample request passed validation. This student project does not send or place an actual order.';
      confirmation.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeFavorites();
  initializeFormValidation();
});
