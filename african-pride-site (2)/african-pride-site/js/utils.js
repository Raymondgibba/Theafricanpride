/* ========================================
   Small shared helpers
   ======================================== */

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}
