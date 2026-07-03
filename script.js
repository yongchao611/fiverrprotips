/* FAQ Accordion */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

/* Cookie Banner */
const banner = document.getElementById('cookieBanner');
const accept = document.getElementById('cookieAccept');
if (banner && accept) {
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => banner.classList.add('show'), 1000);
  }
  accept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.classList.remove('show');
  });
}

/* Contact Form */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    ['name','email','message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { el.style.borderColor = '#ff6b6b'; valid = false; }
    });
    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    }, 1500);
  });
}
