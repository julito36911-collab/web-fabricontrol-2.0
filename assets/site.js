// FabriControl — site-wide JS
// Handles: i18n (ES/EN/HE + RTL), language persistence, header injection helpers,
// WhatsApp widget animation, reveal-on-scroll, accordion, demo form,
// video gallery + modal.

(() => {
  const WA_NUMBER = '000000000000';

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
      'empezar.badge': 'PROGRAMA DE ACCESO ANTICIPADO',
      'empezar.title': '6 meses gratis. Sin tarjeta. Sin compromiso.',
      'empezar.lede': 'FabriOS está en programa beta. Estamos sumando fábricas reales que quieran ser parte del producto desde el principio. A cambio: 6 meses de acceso completo gratis.',
      'empezar.status': 'PROGRAMA ACTIVO · REGISTRO ABIERTO',
      'empezar.cta.primary': 'Empezar gratis ahora →',
      'empezar.cta.hint': 'Toma 60 segundos · Tu cuenta queda lista al instante · Recibís serial por email',
      'empezar.includes.kicker': 'QUÉ INCLUYE TU ACCESO',
      'empezar.includes.title': 'Todo el producto. Sin recortes.',
      'empezar.cta-final.title': '¿Listo para arrancar?',
      'empezar.cta-final.lede': '6 meses gratis. Sin tarjeta. 60 segundos.',
      'empezar.cta-final.btn': 'Crear mi cuenta gratis →',
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
      'empezar.badge': 'EARLY ACCESS PROGRAM',
      'empezar.title': '6 months free. No credit card. No strings attached.',
      'empezar.lede': 'FabriOS is in beta. We are onboarding real factories that want to shape the product from the start. In return: 6 months of full access, free.',
      'empezar.status': 'PROGRAM ACTIVE · REGISTRATION OPEN',
      'empezar.cta.primary': 'Get started free →',
      'empezar.cta.hint': 'Takes 60 seconds · Your account is ready instantly · Serial sent by email',
      'empezar.includes.kicker': "WHAT'S INCLUDED",
      'empezar.includes.title': 'The full product. No cuts.',
      'empezar.cta-final.title': 'Ready to start?',
      'empezar.cta-final.lede': '6 months free. No credit card. 60 seconds.',
      'empezar.cta-final.btn': 'Create my free account →',
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
      'empezar.badge': 'תוכנית גישה מוקדמת',
      'empezar.title': '6 חודשים חינם. בלי כרטיס אשראי. בלי התחייבות.',
      'empezar.lede': 'FabriOS נמצא בבטא. אנו מצרפים מפעלים אמיתיים שרוצים להיות חלק מהמוצר מההתחלה. בתמורה: 6 חודשי גישה מלאה, חינם.',
      'empezar.status': 'התוכנית פעילה · הרישום פתוח',
      'empezar.cta.primary': 'התחל בחינם עכשיו →',
      'empezar.cta.hint': 'לוקח 60 שניות · החשבון שלך מוכן מיד · קבל סיריאל באימייל',
      'empezar.includes.kicker': 'מה כלול בגישה שלך',
      'empezar.includes.title': 'המוצר השלם. בלי קיצוצים.',
      'empezar.cta-final.title': 'מוכן להתחיל?',
      'empezar.cta-final.lede': '6 חודשים חינם. בלי כרטיס אשראי. 60 שניות.',
      'empezar.cta-final.btn': 'צור את החשבון שלי בחינם →',
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
  // (Register form removed — empezar.html now redirects to fabrios-app.onrender.com/register wizard.
  //  Cleared old leftover localStorage from previous form-based flow.)
  try { localStorage.removeItem('lastSerial'); } catch(_) {}

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
    setupDemoForm();
    setupVideos();
    setupMenu();
    setupHeaderScroll();
  });
})();
