import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';
import VideoModal from '../components/VideoModal';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const getScreenshot = (name, lang, folder = 'desktop') => {
  const pngNames = ['chat-ia', 'caracteristicas', 'modal-trial', 'terms'];
  if (pngNames.includes(name)) {
    if (lang === 'he') {
      const hasHe = ['chat-ia', 'modal-trial', 'terms'].includes(name);
      return `/assets/img/screenshots/${folder}/${name}-${hasHe ? 'he' : 'en'}.png`;
    }
    return `/assets/img/screenshots/${folder}/${name}-${lang === 'en' ? 'en' : 'es'}.png`;
  }
  const suffix = (lang === 'en' || lang === 'he') ? 'en' : 'es';
  return `/assets/img/screenshots/${folder}/${name}-${suffix}.jpg`;
};

const txt = {
  es: {
    badge: "PRODUCTO LOCAL",
    title: "FabriControl",
    sub: "ERP local para talleres y fábricas",
    desc: "El ERP esencial para talleres que prefieren tener sus datos en su propio servidor. Sin dependencia de internet, sin pagos mensuales. Instalación Docker en tu infraestructura.",
    price: "Licencia única + soporte anual opcional",
    ctaQuote: "Solicitar cotización",
    ctaDemo: "Probar Demo",

    // Demo
    demoTitle: "Probá FabriControl Ahora",
    demoSub: "Explorá el sistema completo sin registrarte. Datos de ejemplo incluidos.",
    demoUser: "Usuario Demo",
    demoPass: "Contraseña",
    demoBtnWeb: "Entrar a la Demo Web",
    demoBtnApp: "Probar App Móvil",
    demoHint: "La demo tiene datos de ejemplo. Explorá libremente — se reinicia periódicamente.",

    // Dashboard
    dashTitle: "Dashboard en Tiempo Real",
    dashSub: "Todas tus métricas en un solo lugar",

    // Features
    featTitle: "Todo lo que Necesitás en un Solo Sistema",
    f1Title: "📄 Cotizaciones Inteligentes",
    f1Sub: "Genera presupuestos profesionales con cálculo automático de:",
    f1Items: ["Costos de materiales (con desperdicio)", "Tiempos de proceso por máquina", "Mano de obra y margen de ganancia", "Conversión a orden con un clic"],
    f2Title: "🏭 Órdenes de Producción Visuales",
    f2Sub: "Control completo del flujo de fabricación:",
    f2Items: ["Estados 100% configurables a tu proceso", "Asignación de piezas a máquinas", "BOM (Lista de Materiales) completa", "Historial de cambios y archivos adjuntos"],
    f3Title: "📦 Inventario con QR Codes",
    f3Sub: "Control inteligente de stock:",
    f3Items: ["Alertas de stock mínimo automáticas", "Generación de etiquetas QR", "Escaneo rápido con cámara del celular", "Trazabilidad completa de movimientos"],
    f4Title: "📋 Portal de Proyectos",
    f4Sub: "Gestión colaborativa en tiempo real:",
    f4Items: ["Proyectos con tareas y responsables", "Comentarios con historial", "Archivos por proyecto y tarea", "Panel de actividad global en vivo"],
    f5Title: "🤖 Asistente IA Integrado",
    f5Sub: "Gestión inteligente por voz y texto:",
    f5Items: ["Crea piezas paramétricas en lenguaje natural", "Arma el BOM automáticamente", "Guía la creación de órdenes de producción", "Detección automática de intención"],
    f6Title: "🌐 Multi-idioma y Localización",
    f6Sub: "Adaptado a tu mercado:",
    f6Items: ["Interfaz en Español, Inglés y Hebreo", "Soporte nativo RTL (Hebreo)", "Moneda global configurable", "Multi-región: impuestos y formatos locales"],

    // Unique
    uniqueTitle: "Características Únicas",
    u1Title: "🧩 Piezas Paramétricas",
    u1Desc: "Crea plantillas con variables que generan códigos automáticos. Ejemplo: Puerta-{Ancho}x{Alto} → Puerta-100x200. ÚNICO en el mercado.",
    u2Title: "🤖 Chat IA con Gemini",
    u2Desc: "Asistente inteligente que conoce específicamente FabriControl. Crea piezas, arma BOM, guía órdenes. Licencia de IA incluida.",
    u3Title: "📱 App Móvil PWA",
    u3Desc: "Progressive Web App para operarios de piso. iOS y Android sin descarga. Botones grandes, escaneo QR integrado.",

    // Mobile
    mobileTitle: "App Móvil en Acción",
    mobileLogin: "Login",
    mobileOrders: "Órdenes",
    mobileInventory: "Inventario",
    mobileTasks: "Tareas",
    mobileScan: "Escaneo QR",

    // Benefits
    benTitle: "¿Por Qué FabriControl?",
    ben1Title: "Cotizá 50% Más Rápido",
    ben1Desc: "Cálculo automático de costos de materiales y máquinas. Genera PDFs profesionales en minutos.",
    ben2Title: "Nunca Pierdas una Orden",
    ben2Desc: "Seguimiento visual de cada proyecto en tiempo real. Estados personalizables según tu flujo.",
    ben3Title: "Operarios Conectados",
    ben3Desc: "App móvil para actualizar estados desde el piso de producción. Funciona en cualquier celular.",

    // CTA
    ctaTitle: "¿Listo para controlar tu taller?",
    ctaSub: "Pedí tu cotización o probá la demo.",
  },
  he: {
    badge: "מוצר מקומי",
    title: "FabriControl",
    sub: "מערכת ERP מקומית לסדנאות ומפעלים",
    desc: "מערכת ה-ERP החיונית לסדנאות שמעדיפות לשמור את הנתונים בשרת שלהן. ללא תלות באינטרנט, ללא תשלומים חודשיים. התקנת Docker בתשתית שלכם.",
    price: "רישיון חד-פעמי + תמיכה שנתית אופציונלית",
    ctaQuote: "בקשת הצעת מחיר",
    ctaDemo: "נסו דמו",

    demoTitle: "נסו את FabriControl עכשיו",
    demoSub: "חקרו את המערכת המלאה בלי להירשם. נתוני דוגמה כלולים.",
    demoUser: "משתמש דמו",
    demoPass: "סיסמה",
    demoBtnWeb: "כניסה לדמו",
    demoBtnApp: "נסו אפליקציה",
    demoHint: "הדמו כולל נתוני דוגמה. חקרו בחופשיות — מתאפס מעת לעת.",

    dashTitle: "לוח בקרה בזמן אמת",
    dashSub: "כל המדדים שלכם במקום אחד",

    featTitle: "הכל במערכת אחת",
    f1Title: "📄 הצעות מחיר חכמות",
    f1Sub: "הפקת הצעות מחיר מקצועיות עם חישוב אוטומטי:",
    f1Items: ["עלויות חומרים (כולל בזבוז)", "זמני עיבוד לפי מכונה", "עבודה ושולי רווח", "המרה להזמנה בלחיצה"],
    f2Title: "🏭 הזמנות ייצור ויזואליות",
    f2Sub: "שליטה מלאה בתהליך הייצור:",
    f2Items: ["סטטוסים מותאמים לתהליך שלכם", "הקצאת חלקים למכונות", "BOM מלא", "היסטוריית שינויים וקבצים מצורפים"],
    f3Title: "📦 מלאי עם QR",
    f3Sub: "ניהול מלאי חכם:",
    f3Items: ["התראות מלאי מינימום אוטומטיות", "הפקת תוויות QR", "סריקה מהירה עם המצלמה", "מעקב מלא אחר תנועות"],
    f4Title: "📋 פורטל פרויקטים",
    f4Sub: "ניהול שיתופי בזמן אמת:",
    f4Items: ["פרויקטים עם משימות ואחראים", "תגובות עם היסטוריה", "קבצים לפרויקט ומשימה", "לוח פעילות גלובלי"],
    f5Title: "🤖 עוזר AI משולב",
    f5Sub: "ניהול חכם בקול וטקסט:",
    f5Items: ["יצירת חלקים פרמטריים בשפה טבעית", "בניית BOM אוטומטית", "הנחיית יצירת הזמנות ייצור", "זיהוי כוונה אוטומטי"],
    f6Title: "🌐 רב שפות ולוקליזציה",
    f6Sub: "מותאם לשוק שלכם:",
    f6Items: ["ממשק בספרדית, אנגלית ועברית", "תמיכה מובנית ב-RTL", "מטבע גלובלי הניתן להגדרה", "רב-אזורי: מיסים ופורמטים מקומיים"],

    uniqueTitle: "תכונות ייחודיות",
    u1Title: "🧩 חלקים פרמטריים",
    u1Desc: "יצירת תבניות עם משתנים שמייצרים קודים אוטומטיים. דוגמה: Door-{Width}x{Height} → Door-100x200. ייחודי בשוק.",
    u2Title: "🤖 צ׳אט AI עם Gemini",
    u2Desc: "עוזר חכם שמכיר את FabriControl ספציפית. יוצר חלקים, בונה BOM, מנחה הזמנות. רישיון AI כלול.",
    u3Title: "📱 אפליקציה PWA",
    u3Desc: "Progressive Web App לעובדי רצפת ייצור. iOS ו-Android ללא הורדה. כפתורים גדולים, סריקת QR משולבת.",

    mobileTitle: "האפליקציה בפעולה",
    mobileLogin: "התחברות",
    mobileOrders: "הזמנות",
    mobileInventory: "מלאי",
    mobileTasks: "משימות",
    mobileScan: "סריקת QR",

    benTitle: "למה FabriControl?",
    ben1Title: "הצעות מחיר מהירות פי 2",
    ben1Desc: "חישוב אוטומטי של עלויות חומרים ומכונות. הפקת PDF מקצועיים בדקות.",
    ben2Title: "אף הזמנה לא הולכת לאיבוד",
    ben2Desc: "מעקב ויזואלי אחר כל פרויקט בזמן אמת. סטטוסים מותאמים לתהליך שלכם.",
    ben3Title: "עובדים מחוברים",
    ben3Desc: "אפליקציה לעדכון סטטוסים מרצפת הייצור. עובדת בכל סמארטפון.",

    ctaTitle: "מוכנים לשלוט בסדנה?",
    ctaSub: "בקשו הצעת מחיר או נסו את הדמו.",
  }
};

function FabriControlDetail() {
  const { language, isRtl } = useLanguage();
  const l = txt[language] || txt.es;
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    { t: l.f1Title, s: l.f1Sub, items: l.f1Items, img: 'quotations' },
    { t: l.f2Title, s: l.f2Sub, items: l.f2Items, img: 'production-orders' },
    { t: l.f3Title, s: l.f3Sub, items: l.f3Items, img: 'inventory' },
    { t: l.f4Title, s: l.f4Sub, items: l.f4Items, img: 'projects-portal' },
    { t: l.f5Title, s: l.f5Sub, items: l.f5Items, img: 'chat-ia' },
    { t: l.f6Title, s: l.f6Sub, items: l.f6Items, img: 'dashboard' },
  ];

  const mobileScreens = [
    { img: 'mobile-login.jpg', label: l.mobileLogin },
    { img: 'mobile-orders.jpg', label: l.mobileOrders },
    { img: 'mobile-inventory.jpg', label: l.mobileInventory },
    { img: 'mobile-tasks.jpg', label: l.mobileTasks },
    { img: 'mobile-scan-qr.jpg', label: l.mobileScan },
  ];

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-gray-300 bg-gray-500/10 rounded-full border border-gray-500/20 mb-6">
            🖥️ {l.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-3">{l.title}</h1>
          <p className="text-xl text-orange-400 font-medium mb-4">{l.sub}</p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">{l.desc}</p>
          <p className="text-xs text-gray-500 mb-8">{l.price}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/cotizacion" className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              {l.ctaQuote}
            </Link>
            <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border border-white/20 transition-all">
              🎮 {l.ctaDemo}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ DEMO BOX ═══ */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold mb-2">{l.demoTitle}</h2>
          <p className="text-gray-300 mb-6">{l.demoSub}</p>
          <div className="bg-black/30 rounded-xl p-5 mb-6 grid sm:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-xs text-gray-400 mb-1">{l.demoUser}</p>
              <code className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded">julito36911@gmail.com</code>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{l.demoPass}</p>
              <code className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded">password123</code>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg transition-all text-sm">
              🖥️ {l.demoBtnWeb}
            </a>
            <a href="https://fabricontrol-1.emergent.host/m" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-[#1e3a5f] font-bold rounded-lg transition-all text-sm">
              📱 {l.demoBtnApp}
            </a>
          </div>
          <p className="text-xs text-gray-300/70 mt-4">{l.demoHint}</p>
        </div>
      </section>

      {/* ═══ DASHBOARD SCREENSHOT ═══ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-2">{l.dashTitle}</h2>
          <p className="text-gray-400 mb-8">{l.dashSub}</p>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <ImageLightbox src={getScreenshot('dashboard', language)} alt={l.dashTitle} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-16 px-4 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-10">{l.benTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: l.ben1Title, desc: l.ben1Desc },
              { icon: '📊', title: l.ben2Title, desc: l.ben2Desc },
              { icon: '📱', title: l.ben3Title, desc: l.ben3Desc },
            ].map((b, i) => (
              <div key={i} className="bg-[#111827] border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-gray-400">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES WITH SCREENSHOTS ═══ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-14">{l.featTitle}</h2>
          <div className="space-y-20">
            {features.map((feat, i) => {
              const imgLeft = i % 2 === 1;
              return (
                <div key={i} className={`grid md:grid-cols-2 gap-10 items-center ${imgLeft ? '' : ''}`}>
                  <div className={`${imgLeft ? 'md:order-2' : ''} ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-bold text-orange-400 mb-2">{feat.t}</h3>
                    <p className="text-gray-400 mb-4">{feat.s}</p>
                    <ul className="space-y-2">
                      {feat.items.map((item, j) => (
                        <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${imgLeft ? 'md:order-1' : ''} rounded-xl overflow-hidden border border-white/10 shadow-xl`}>
                    <ImageLightbox src={getScreenshot(feat.img, language)} alt={feat.t} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ UNIQUE FEATURES ═══ */}
      <section className="py-16 px-4 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-10">{l.uniqueTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { ...l, title: l.u1Title, desc: l.u1Desc, img: 'parametric-pieces' },
              { ...l, title: l.u2Title, desc: l.u2Desc, img: 'chat-ia' },
              { ...l, title: l.u3Title, desc: l.u3Desc, imgPath: '/assets/img/screenshots/mobile/mobile-home.jpg' },
            ].map((u, i) => (
              <div key={i} className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={u.imgPath || getScreenshot(u.img, language)}
                    alt={u.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2">{u.title}</h3>
                  <p className="text-sm text-gray-400">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOBILE APP GALLERY ═══ */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold mb-8">{l.mobileTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {mobileScreens.map((m, i) => (
              <div key={i} className="text-center">
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg inline-block">
                  <img src={`/assets/img/screenshots/mobile/${m.img}`} alt={m.label} className="w-full max-w-[180px] h-auto" />
                </div>
                <p className="text-xs text-gray-500 mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#111827]/50 to-[#0a0e17]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">{l.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{l.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cotizacion" className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              {l.ctaQuote}
            </Link>
            <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border border-white/20 transition-all">
              🎮 {l.ctaDemo}
            </a>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <VideoModal
          videoId="TU_VIDEO_ID"
          onClose={() => setIsVideoOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default FabriControlDetail;
