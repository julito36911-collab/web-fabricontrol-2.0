// FabriControl — site-wide JS
// Handles: i18n (ES/EN/HE + RTL), language persistence, header injection helpers,
// WhatsApp widget animation, reveal-on-scroll, accordion, form validation,
// real backend submission, video gallery + modal.

(() => {
  const WA_NUMBER = '000000000000';
  const REGISTER_ENDPOINT = 'https://fabrios-api.onrender.com/api/register/';

  // ---------- i18n ----------
  const dictionaries = {
    es: {
      'nav.home': 'Inicio',
      'nav.industries': 'Industrias',
      'nav.learn': 'Aprende',
      'nav.start': 'Empezar gratis',
      'nav.demo': 'Demo',
      'nav.contact': 'Contacto',
      'nav.login': 'Iniciar sesión',
      'cta.start': 'Empezar gratis',
      'wa.label': 'Chateá con nosotros',
      'wa.message': 'Hola, vi FabriControl y quiero saber más',
      'footer.tagline': 'El sistema operativo de las fábricas pequeñas y medianas.',
      'footer.products': 'Productos',
      'footer.company': 'Empresa',
      'footer.legal': 'Legal',
      'footer.fabrios': 'FabriOS',
      'footer.fabrios.tag': 'activo',
      'footer.fabrisense': 'FabriSense',
      'footer.fabrisense.tag': 'próximamente',
      'footer.more': 'Más productos',
      'footer.more.tag': 'en desarrollo',
      'footer.about': 'Sobre nosotros',
      'footer.contact': 'Contacto',
      'footer.blog': 'Blog',
      'footer.terms': 'Términos',
      'footer.privacy': 'Privacidad',
      'footer.cookies': 'Cookies',
      'footer.copy': '© 2026 FabriControl · Hecho con orgullo en Latinoamérica',
    },
    en: {
      'nav.home': 'Home',
      'nav.industries': 'Industries',
      'nav.learn': 'Learn',
      'nav.start': 'Get started free',
      'nav.demo': 'Demo',
      'nav.contact': 'Contact',
      'nav.login': 'Log in',
      'cta.start': 'Get started free',
      'wa.label': 'Chat with us',
      'wa.message': 'Hi, I saw FabriControl and want to know more',
      'footer.tagline': 'The operating system for small and mid-sized factories.',
      'footer.products': 'Products',
      'footer.company': 'Company',
      'footer.legal': 'Legal',
      'footer.fabrios': 'FabriOS',
      'footer.fabrios.tag': 'active',
      'footer.fabrisense': 'FabriSense',
      'footer.fabrisense.tag': 'coming soon',
      'footer.more': 'More products',
      'footer.more.tag': 'in development',
      'footer.about': 'About',
      'footer.contact': 'Contact',
      'footer.blog': 'Blog',
      'footer.terms': 'Terms',
      'footer.privacy': 'Privacy',
      'footer.cookies': 'Cookies',
      'footer.copy': '© 2026 FabriControl · Built with pride in Latin America',
    },
    he: {
      'nav.home': 'דף הבית',
      'nav.industries': 'תעשיות',
      'nav.learn': 'למד',
      'nav.start': 'התחל בחינם',
      'nav.demo': 'הדגמה',
      'nav.contact': 'צור קשר',
      'nav.login': 'התחבר',
      'cta.start': 'התחל בחינם',
      'wa.label': 'שוחחו איתנו',
      'wa.message': 'שלום, ראיתי את FabriControl ואני רוצה לדעת יותר',
      'footer.tagline': 'מערכת ההפעלה של מפעלים קטנים ובינוניים.',
      'footer.products': 'מוצרים',
      'footer.company': 'חברה',
      'footer.legal': 'משפטי',
      'footer.fabrios': 'FabriOS',
      'footer.fabrios.tag': 'פעיל',
      'footer.fabrisense': 'FabriSense',
      'footer.fabrisense.tag': 'בקרוב',
      'footer.more': 'מוצרים נוספים',
      'footer.more.tag': 'בפיתוח',
      'footer.about': 'אודות',
      'footer.contact': 'צור קשר',
      'footer.blog': 'בלוג',
      'footer.terms': 'תנאים',
      'footer.privacy': 'פרטיות',
      'footer.cookies': 'עוגיות',
      'footer.copy': '© 2026 FabriControl · נבנה בגאווה באמריקה הלטינית',
    },
  };

  function detectLang() {
    const stored = localStorage.getItem('fc_lang');
    if (stored && dictionaries[stored]) return stored;
    const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    if (dictionaries[nav]) return nav;
    return 'es';
  }

  function applyLang(lang) {
    if (!dictionaries[lang]) lang = 'es';
    localStorage.setItem('fc_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (dictionaries[lang][k]) el.textContent = dictionaries[lang][k];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr'); // "attr:key"
      const [attr, key] = spec.split(':');
      if (dictionaries[lang][key]) el.setAttribute(attr, dictionaries[lang][key]);
    });
    // Update WA links
    const msg = encodeURIComponent(dictionaries[lang]['wa.message']);
    document.querySelectorAll('[data-wa-link]').forEach(a => {
      a.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
    });
    // Lang toggle visual state
    document.querySelectorAll('.lang button').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
  }

  // ---------- Reveal ----------
  function setupReveal() {
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
  }

  // ---------- Lang switcher ----------
  function setupLangSwitcher() {
    document.querySelectorAll('.lang').forEach(group => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-lang]');
        if (!btn) return;
        applyLang(btn.dataset.lang);
      });
    });
  }

  // ---------- Accordion ----------
  function setupAccordion() {
    document.querySelectorAll('.accordion__item').forEach(item => {
      const head = item.querySelector('.accordion__head');
      if (!head) return;
      head.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('is-open'));
        if (!open) item.classList.add('is-open');
      });
    });
  }

  // ---------- Forms ----------
  function setupRegisterForm() {
    const form = document.querySelector('form[data-register-form]');
    if (!form) return;

    const pwInput = form.querySelector('#pw');
    const pwBars = form.querySelectorAll('.pw-strength span');
    if (pwInput && pwBars.length) {
      pwInput.addEventListener('input', () => {
        const v = pwInput.value;
        let s = 0;
        if (v.length >= 8) s++;
        if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
        if (/\d/.test(v)) s++;
        if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) s++;
        pwBars.forEach((b, i) => {
          b.style.background = i < s
            ? (s <= 1 ? '#DC2626' : s === 2 ? '#F97316' : s === 3 ? '#EAB308' : '#22C55E')
            : 'var(--slate-200)';
        });
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(el => {
        const ok = el.type === 'checkbox' ? el.checked : !!el.value.trim();
        el.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });
      // Email check
      const email = form.querySelector('#email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid'); valid = false;
      }
      // Phone min 10 digits
      const phone = form.querySelector('#phone');
      if (phone && phone.value.replace(/\D/g, '').length < 10) {
        phone.classList.add('is-invalid'); valid = false;
      }
      // Password match
      const pw = form.querySelector('#pw');
      const pw2 = form.querySelector('#pw2');
      if (pw && pw2 && pw.value !== pw2.value) {
        pw2.classList.add('is-invalid'); valid = false;
      }
      // Min length
      if (pw && pw.value.length < 8) { pw.classList.add('is-invalid'); valid = false; }

      const errBox = form.querySelector('.form-error');
      if (errBox) errBox.style.display = 'none';

      if (!valid) return;

      const payload = {
        nombre: form.querySelector('#name')?.value || '',
        email: email?.value || '',
        whatsapp: (form.querySelector('#phone-cc')?.value || '') + ' ' + (phone?.value || ''),
        cargo: form.querySelector('#role')?.value || '',
        password: pw?.value || '',
        empresa: form.querySelector('#company')?.value || '',
        pais: form.querySelector('#country')?.value || '',
        ciudad: form.querySelector('#city')?.value || '',
        industria: form.querySelector('#industry')?.value || '',
        empleados: form.querySelector('#size')?.value || '',
        sitio_web: form.querySelector('#web')?.value || '',
      };

      const submitBtn = form.querySelector('button[type=submit]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="spinner"></span> Creando tu licencia…';
      }

      try {
        const res = await fetch(REGISTER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          let serial = '';
          try { const j = await res.json(); serial = j.serial || ''; } catch(_) {}
          showSuccess(form, serial);
        } else if (res.status === 400) {
          let detail = '';
          try { const j = await res.json(); detail = j.detail || j.error || ''; } catch(_) {}
          showError(form, mapErrorDetail(detail));
        } else if (res.status === 429) {
          showError(form, ERROR_MESSAGES.too_many_registrations);
        } else if (res.status >= 500) {
          showError(form, ERROR_MESSAGES.server_error);
        } else {
          showError(form, ERROR_MESSAGES.unknown);
        }
      } catch (err) {
        showError(form, ERROR_MESSAGES.network);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalText || 'Crear mi licencia gratis →';
        }
      }
    });

    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
      el.addEventListener('change', () => el.classList.remove('is-invalid'));
    });

    // Restore success screen if user refreshed after a successful registration
    const lastSerial = localStorage.getItem('lastSerial');
    if (lastSerial) showSuccess(form, lastSerial, /*skipScroll*/ true);
  }

  // Map backend error codes to user-friendly messages
  const ERROR_MESSAGES = {
    email_already_registered: 'Este email ya está registrado. <a href="https://fabrios-app.onrender.com/login" target="_blank" rel="noopener" style="color:var(--orange);text-decoration:underline">Iniciar sesión</a>',
    invalid_email: 'Email inválido. Revisá el formato.',
    empresa_too_short: 'El nombre de empresa debe tener al menos 2 caracteres.',
    password_too_short: 'La contraseña debe tener al menos 8 caracteres.',
    industria_invalida: 'Industria no válida. Seleccioná una opción del menú.',
    empleados_invalido: 'Tamaño de empresa no válido. Seleccioná una opción.',
    registration_closed: 'El registro está temporalmente cerrado. Intentá más tarde.',
    too_many_registrations: 'Demasiados intentos desde tu IP. Esperá 1 hora e intentá de nuevo.',
    server_error: 'Error del servidor. Intentalo en unos minutos o escribinos por WhatsApp.',
    network: 'Error de conexión. Revisá tu internet o intentalo en unos minutos.',
    unknown: 'Hubo un error con los datos. Revisalos e intentá de nuevo.',
  };

  function mapErrorDetail(detail) {
    if (!detail) return ERROR_MESSAGES.unknown;
    return ERROR_MESSAGES[detail] || ERROR_MESSAGES.unknown;
  }

  function showSuccess(form, serial, skipScroll) {
    const wrap = form.closest('.empezar-form-card') || form.parentElement;
    const success = wrap?.querySelector('.form-success');
    if (!success) return;

    if (serial) {
      try { localStorage.setItem('lastSerial', serial); } catch(_) {}
      const display = success.querySelector('[data-serial-display]');
      if (display) display.textContent = serial;
      // Pre-fill WhatsApp link with serial
      const waBtn = success.querySelector('[data-success-wa]');
      if (waBtn) {
        const msg = encodeURIComponent(`Hola, acabo de crear mi cuenta en FabriOS con serial ${serial}`);
        waBtn.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
      }
    }

    form.style.display = 'none';
    success.style.display = 'block';
    if (!skipScroll) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function showError(form, msg) {
    let box = form.querySelector('.form-error');
    if (!box) {
      box = document.createElement('div');
      box.className = 'form-error';
      form.insertBefore(box, form.querySelector('button[type=submit]'));
    }
    box.innerHTML = msg;
    box.style.display = 'block';
  }

  // Demo form (simple, no backend)
  function setupDemoForm() {
    document.querySelectorAll('form[data-fake-submit]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach(el => {
          const ok = el.type === 'checkbox' ? el.checked : !!el.value;
          el.classList.toggle('is-invalid', !ok);
          if (!ok) valid = false;
        });
        if (!valid) return;
        const success = form.parentElement.querySelector('.form-success');
        if (success) { form.style.display = 'none'; success.style.display = 'block'; }
      });
      form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => el.classList.remove('is-invalid'));
      });
    });
  }

  // ---------- Video gallery ----------
  let allVideos = [];
  let visibleCount = 12;
  const PAGE = 12;

  const CAT_LABELS = {
    primeros_pasos: 'Primeros pasos',
    funciones: 'Funciones',
    casos: 'Casos de uso',
    webinars: 'Webinars',
    redes: 'Redes sociales',
  };
  const CAT_COLORS = {
    primeros_pasos: 'cyan',
    funciones: 'orange',
    casos: 'green',
    webinars: 'purple',
    redes: 'pink',
  };
  const IND_LABELS = {
    metalurgia: 'Metalurgia', alimentos: 'Alimentos', textil: 'Textil',
    plasticos: 'Plásticos', quimica: 'Química', carpinteria: 'Carpintería',
    general: 'General',
  };

  function relativeDate(iso) {
    const d = new Date(iso);
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days < 1) return 'hoy';
    if (days < 2) return 'ayer';
    if (days < 30) return `hace ${days} días`;
    if (days < 60) return 'hace 1 mes';
    return `hace ${Math.floor(days / 30)} meses`;
  }

  function videoCard(v, large = false) {
    const thumb = `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`;
    const cat = CAT_LABELS[v.categoria] || v.categoria;
    const color = CAT_COLORS[v.categoria] || 'orange';
    const ind = IND_LABELS[v.industria] || v.industria;
    return `
      <article class="vc ${large ? 'vc--lg' : ''}" data-video-id="${v.id}">
        <div class="vc__thumb">
          <img src="${thumb}" alt="${v.titulo}" loading="lazy" onerror="this.parentElement.classList.add('vc__thumb--ph');this.style.display='none'">
          <span class="vc__cat vc__cat--${color}">${cat}</span>
          <span class="vc__lang">${v.idioma.toUpperCase()}</span>
          <span class="vc__dur mono">${v.duracion}</span>
          <span class="vc__play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
        </div>
        <h3 class="vc__title">${v.titulo}</h3>
        <p class="vc__meta mono">${ind} · ${relativeDate(v.fecha)}</p>
      </article>`;
  }

  function applyFilters() {
    const cat = document.querySelector('.tab.is-active')?.dataset.cat || 'all';
    const ind = document.querySelector('#filter-ind')?.value || 'all';
    const lang = document.querySelector('#filter-lang')?.value || 'all';
    const q = (document.querySelector('#filter-q')?.value || '').trim().toLowerCase();
    return allVideos.filter(v => {
      if (cat !== 'all' && v.categoria !== cat) return false;
      if (ind !== 'all' && v.industria !== ind) return false;
      if (lang !== 'all' && v.idioma !== lang) return false;
      if (q && !(v.titulo.toLowerCase().includes(q) || (v.descripcion||'').toLowerCase().includes(q))) return false;
      return true;
    });
  }

  function renderGallery() {
    const grid = document.querySelector('#video-grid');
    if (!grid) return;
    const filtered = applyFilters();
    const slice = filtered.slice(0, visibleCount);
    grid.innerHTML = slice.length
      ? slice.map(v => videoCard(v)).join('')
      : `<p class="vc-empty">No hay videos que coincidan con los filtros.</p>`;
    // Update tab counts
    document.querySelectorAll('.tab').forEach(t => {
      const c = t.dataset.cat;
      const count = c === 'all' ? allVideos.length : allVideos.filter(v => v.categoria === c).length;
      const badge = t.querySelector('.tab__count');
      if (badge) badge.textContent = count;
    });
    const moreBtn = document.querySelector('#load-more');
    if (moreBtn) moreBtn.style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';
  }

  function renderFeatured(target, max = 3) {
    const el = document.querySelector(target);
    if (!el || !allVideos.length) return;
    const featured = allVideos.filter(v => v.destacado).slice(0, max);
    el.innerHTML = featured.map(v => videoCard(v, true)).join('');
  }

  function openVideoModal(id) {
    const v = allVideos.find(x => x.id === id);
    if (!v) return;
    let modal = document.querySelector('#video-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'video-modal';
      modal.className = 'vmodal';
      modal.innerHTML = `
        <div class="vmodal__backdrop" data-close></div>
        <div class="vmodal__card" role="dialog" aria-modal="true">
          <button class="vmodal__close" data-close aria-label="Cerrar">×</button>
          <div class="vmodal__player"></div>
          <div class="vmodal__body"></div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target.dataset.close !== undefined) closeVideoModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVideoModal();
      });
    }
    modal.querySelector('.vmodal__player').innerHTML =
      `<iframe src="https://www.youtube.com/embed/${v.youtube_id}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    const cat = CAT_LABELS[v.categoria] || v.categoria;
    const ind = IND_LABELS[v.industria] || v.industria;
    const related = allVideos
      .filter(x => x.id !== v.id && (x.categoria === v.categoria || x.industria === v.industria))
      .slice(0, 3);
    modal.querySelector('.vmodal__body').innerHTML = `
      <h2 class="vmodal__title">${v.titulo}</h2>
      <p class="vmodal__meta mono">${cat} · ${ind} · ${v.idioma.toUpperCase()} · ${v.duracion} · ${relativeDate(v.fecha)}</p>
      <p class="vmodal__desc">${v.descripcion || ''}</p>
      <div class="vmodal__actions">
        <a href="https://www.youtube.com/watch?v=${v.youtube_id}" target="_blank" rel="noopener" class="btn btn--ghost">Ver en YouTube</a>
        <button class="btn btn--ghost" data-share>Compartir</button>
        <a href="empezar.html" class="btn btn--primary">Probar FabriOS gratis</a>
      </div>
      ${related.length ? `<div class="vmodal__related"><h3 class="vmodal__rel-title">Videos relacionados</h3><div class="vmodal__rel-grid">${related.map(r => videoCard(r)).join('')}</div></div>` : ''}
    `;
    modal.querySelector('[data-share]')?.addEventListener('click', () => {
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${v.youtube_id}`);
      const btn = modal.querySelector('[data-share]');
      btn.textContent = '¡Copiado!';
      setTimeout(() => btn.textContent = 'Compartir', 1500);
    });
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideoModal() {
    const modal = document.querySelector('#video-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.querySelector('.vmodal__player').innerHTML = '';
    document.body.style.overflow = '';
  }

  async function setupVideos() {
    const needsVideos = document.querySelector('#video-grid') || document.querySelector('#home-videos');
    if (!needsVideos) return;
    try {
      const res = await fetch('videos.json');
      const data = await res.json();
      allVideos = data.videos || [];
    } catch (_) {
      allVideos = [];
    }
    renderFeatured('#featured-videos');
    renderFeatured('#home-videos');
    renderGallery();

    // Filter wiring
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('is-active'));
        t.classList.add('is-active');
        visibleCount = PAGE;
        renderGallery();
      });
    });
    document.querySelectorAll('#filter-ind, #filter-lang').forEach(s => {
      s.addEventListener('change', () => { visibleCount = PAGE; renderGallery(); });
    });
    document.querySelector('#filter-q')?.addEventListener('input', () => {
      visibleCount = PAGE; renderGallery();
    });
    document.querySelector('#load-more')?.addEventListener('click', () => {
      visibleCount += PAGE; renderGallery();
    });

    // Click handler (delegated)
    document.body.addEventListener('click', (e) => {
      const card = e.target.closest('.vc');
      if (card && card.dataset.videoId) openVideoModal(card.dataset.videoId);
    });
  }

  // ---------- Mobile menu ----------
  function setupMenu() {
    const btn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => nav.classList.toggle('nav--open'));
  }

  // ---------- Header scroll state ----------
  function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(detectLang());
    setupLangSwitcher();
    setupReveal();
    setupAccordion();
    setupRegisterForm();
    setupDemoForm();
    setupVideos();
    setupMenu();
    setupHeaderScroll();
  });
})();
