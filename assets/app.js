// FabriOS — shared interactions

// Sticky header subtle shadow on scroll
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// Language toggle (visual only)
(function () {
  document.querySelectorAll('.lang').forEach(group => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
})();

// Mobile menu (simple toggle)
(function () {
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
})();

// Accordion
(function () {
  document.querySelectorAll('.accordion__item').forEach(item => {
    const head = item.querySelector('.accordion__head');
    if (!head) return;
    head.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('is-open'));
      if (!open) item.classList.add('is-open');
    });
  });
})();

// Form: validate + fake success
(function () {
  document.querySelectorAll('form[data-fake-submit]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(el => {
        if (!el.value || (el.type === 'checkbox' && !el.checked)) {
          el.classList.add('is-invalid');
          valid = false;
        } else {
          el.classList.remove('is-invalid');
        }
      });
      if (!valid) return;
      const success = form.querySelector('.form-success') || form.parentElement.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.style.display = 'block';
      }
    });
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
      el.addEventListener('change', () => el.classList.remove('is-invalid'));
    });
  });
})();
