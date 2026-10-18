/* ========================================
   Cart — state, drawer, and rendering
   ======================================== */

const cart = [];

/* ---------- State ---------- */
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function findCartItem(productId, colorKey) {
  return cart.find((i) => i.productId === productId && i.colorKey === colorKey);
}

/* openDrawer: true for "Buy Now", false for "Add to Cart" */
function addToCart(product, colorKey, openDrawer = false) {
  const color = product.colors[colorKey];
  const existing = findCartItem(product.id, colorKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      colorKey,
      name: product.name,
      type: product.type,
      colorLabel: color.label,
      image: color.image,
      price: product.price,
      quantity: 1,
    });
  }

  updateCartUI();
  if (openDrawer) openCart();
}

function updateQuantity(productId, colorKey, delta) {
  const item = findCartItem(productId, colorKey);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(productId, colorKey);
  else updateCartUI();
}

function removeFromCart(productId, colorKey) {
  const index = cart.findIndex(
    (i) => i.productId === productId && i.colorKey === colorKey
  );
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartUI();
  }
}

/* ---------- Rendering ---------- */
function renderCartItems() {
  const list = $('#cart-items');
  const subtotal = $('#cart-subtotal');
  const checkoutBtn = $('.cart-drawer__footer .btn--primary');

  if (cart.length === 0) {
    list.innerHTML = '<li class="cart-drawer__empty">Your cart is empty.</li>';
    subtotal.textContent = formatPrice(0);
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  subtotal.textContent = formatPrice(getCartSubtotal());

  list.innerHTML = cart.map((item) => `
    <li class="cart-item" data-product-id="${item.productId}" data-color-key="${item.colorKey}">
      <img class="cart-item__image" src="${item.image}" alt="${item.name} — ${item.colorLabel}">
      <div class="cart-item__details">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__variant">${item.colorLabel} · ${item.type}</span>
        <span class="cart-item__price">${formatPrice(item.price)}</span>
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" data-qty-minus aria-label="Decrease quantity">−</button>
          <span class="cart-item__qty-value">${item.quantity}</span>
          <button class="cart-item__qty-btn" data-qty-plus aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-item__remove" data-remove>Remove</button>
      </div>
    </li>
  `).join('');

  $$('.cart-item', list).forEach((el) => {
    const { productId, colorKey } = el.dataset;
    $('[data-qty-minus]', el).addEventListener('click', () => updateQuantity(productId, colorKey, -1));
    $('[data-qty-plus]', el).addEventListener('click', () => updateQuantity(productId, colorKey, 1));
    $('[data-remove]', el).addEventListener('click', () => removeFromCart(productId, colorKey));
  });
}

function updateCartUI() {
  const countEl = $('#cart-count');
  const count = getCartCount();

  countEl.textContent = count;
  countEl.classList.toggle('is-visible', count > 0);

  renderCartItems();
}

/* ---------- Drawer ---------- */
function openCart() {
  const drawer = $('#cart-drawer');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = $('#cart-drawer');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initCartDrawer() {
  $('#cart-toggle').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#cart-overlay').addEventListener('click', closeCart);
}
