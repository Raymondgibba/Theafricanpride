/* ========================================
   African Pride — start-up
   Everything is wired together here.
   Script order is set in index.html.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderProductGrids();
  updateCartUI();

  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
  initCartDrawer();
  initNewsletter();
  initSlideshow();

});
