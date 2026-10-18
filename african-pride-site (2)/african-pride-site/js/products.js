/* ========================================
   Product cards — building the grids
   ======================================== */

function createProductCard(product, showSwatches) {
  const colorKeys = Object.keys(product.colors);
  const activeColor = product.defaultColor;
  const activeData = product.colors[activeColor];
  const hasChoices = showSwatches && colorKeys.length > 1;

  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.productId = product.id;
  card.dataset.activeColor = activeColor;

  const badge = product.hasWordmark
    ? '<span class="product-card__badge">Wordmark</span>'
    : '';

  const swatches = hasChoices
    ? `<div class="product-card__swatches" role="group" aria-label="Color options">
        ${colorKeys.map((key) => `
          <button
            class="product-card__swatch product-card__swatch--${key}${key === activeColor ? ' is-active' : ''}"
            data-color="${key}"
            aria-label="${product.colors[key].label}"
            aria-pressed="${key === activeColor}"
          ></button>`).join('')}
      </div>`
    : '';

  card.innerHTML = `
    <div class="product-card__image-wrap">
      ${badge}
      <img class="product-card__image" src="${activeData.image}"
           alt="${product.name} — ${activeData.label}" loading="lazy">
    </div>
    <div class="product-card__body">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__color" data-color-label>${activeData.label} · ${product.type}</p>
      <p class="product-card__price">${formatPrice(product.price)}</p>
      ${swatches}
      <div class="product-card__actions">
        <button class="product-card__buy" data-buy-now>Buy Now</button>
        <button class="product-card__add" data-add-cart>Add to Cart</button>
      </div>
    </div>
  `;

  if (hasChoices) {
    $$('.product-card__swatch', card).forEach((swatch) => {
      swatch.addEventListener('click', () =>
        switchProductColor(card, product, swatch.dataset.color)
      );
    });
  }

  const addBtn = $('[data-add-cart]', card);
  // Add to Cart: quietly adds the item, the cart stays closed
  addBtn.addEventListener('click', () => {
    addToCart(product, card.dataset.activeColor, false);
    confirmAdded(addBtn);
  });

  // Buy Now: adds the item and opens the cart so they can check out
  $('[data-buy-now]', card).addEventListener('click', () => {
    addToCart(product, card.dataset.activeColor, true);
  });

  return card;
}

/* Swap the photo when a colour swatch is clicked */
function switchProductColor(card, product, colorKey) {
  const color = product.colors[colorKey];
  if (!color || card.dataset.activeColor === colorKey) return;

  card.dataset.activeColor = colorKey;

  const img = $('.product-card__image', card);
  img.src = color.image;
  img.alt = `${product.name} — ${color.label}`;

  $('[data-color-label]', card).textContent = `${color.label} · ${product.type}`;

  $$('.product-card__swatch', card).forEach((swatch) => {
    const isActive = swatch.dataset.color === colorKey;
    swatch.classList.toggle('is-active', isActive);
    swatch.setAttribute('aria-pressed', isActive);
  });
}

/* Button text says "Added ✓" for a moment so people know it worked */
function confirmAdded(button) {
  if (button.dataset.busy) return;
  button.dataset.busy = '1';
  button.textContent = 'Added ✓';
  setTimeout(() => {
    button.textContent = 'Add to Cart';
    delete button.dataset.busy;
  }, 1500);
}

function renderProductGrids() {
  const featuredGrid = $('#featured-grid');
  const collectionGrid = $('#collection-grid');

  PRODUCTS.filter((p) => p.featured).forEach((p) =>
    featuredGrid.appendChild(createProductCard(p, false))
  );
  PRODUCTS.forEach((p) =>
    collectionGrid.appendChild(createProductCard(p, true))
  );
}
