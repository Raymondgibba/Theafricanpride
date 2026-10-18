/* ========================================
   Newsletter form (front-end only for now)
   ======================================== */

function initNewsletter() {
  const form = $('#newsletter-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('.newsletter__input', form);
    if (!input.value.trim()) return;

    const old = $('.newsletter__success', form.parentElement);
    if (old) old.remove();

    const msg = document.createElement('p');
    msg.className = 'newsletter__success';
    msg.textContent = "Thank you — you're on the list.";
    form.after(msg);
    input.value = '';
  });
}
