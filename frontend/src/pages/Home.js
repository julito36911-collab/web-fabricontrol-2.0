import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const txt = {
  es: {
    // Hero
    heroTag: "SOFTWARE INDUSTRIAL A MEDIDA",
    heroTitle: "Software industrial a medida para tu empresa",
    heroSub: "ERP industrial + desarrollo a medida + IoT. Diseñado por un ingeniero mecánico con 15 años en manufactura.",
    heroCta: "Solicitar cotización",
    stat1: "15+", stat1l: "años manufactura",
    stat2: "45+", stat2l: "módulos",
    stat3: "6+", stat3l: "industrias",
    stat4: "ES/EN/HE", stat4l: "multi-idioma",

    // Products
    prodTag: "PRODUCTOS",
    prodTitle: "Dos soluciones, un objetivo: controlar tu operación",

    // FabriControl (PRINCIPAL — disponible ahora)
    fcTag: "DISPONIBLE AHORA",
    fcTitle: "FabriControl",
    fcSub: "ERP industrial para tu empresa",
    fcDesc: "El sistema de gestión completo para empresas de manufactura. Cotizaciones inteligentes, producción visual, inventario, BOM, control de máquinas, calidad, finanzas, app móvil y soporte en 3 idiomas.",
    fcCta: "Solicitar cotización",
    fcDemo: "Ver demo",
    fcMore: "Ver detalles →",
    fcDemoUser: "Usuario demo:", fcDemoPass: "Contraseña:",
    fcF1: "Cotizaciones inteligentes", fcF2: "Producción visual", fcF3: "Inventario y BOM",
    fcF4: "Control de máquinas", fcF5: "Calidad y finanzas", fcF6: "App móvil · 3 idiomas",

    // FabriOS (PRÓXIMAMENTE)
    osTag: "PRÓXIMAMENTE",
    osTitle: "FabriOS",
    osSub: "ERP + IoT + IA para fábricas",
    osDesc: "La próxima generación: 45+ módulos, monitoreo IoT en tiempo real, inteligencia artificial predictiva, app móvil offline. Todo conectado desde cualquier lugar.",
    osNotify: "Notificarme cuando esté disponible",
    osNotifyPh: "tu@email.com",
    osNotifyBtn: "Avisarme",
    osNotified: "¡Listo! Te avisamos cuando esté disponible.",
    osF1: "45+ módulos", osF2: "App móvil offline", osF3: "Monitoreo IoT",
    osF4: "IA predictiva", osF5: "Multi-idioma (ES/EN/HE)", osF6: "Multi-industria",

    // Comparison table
    compTitle: "Comparativa rápida",
    compFeature: "Característica",
    compStatus: "Estado", compStatusFC: "Disponible", compStatusOS: "Próximamente",
    compModules: "Módulos", compModulesFC: "Principales", compModulesOS: "45+",
    compIot: "IoT / Sensores",
    compAi: "IA / Predicciones",
    compApp: "App móvil",
    compLang: "Multi-idioma",
    compBom: "BOM / Recetas",
    compMachines: "Control de máquinas",
    compIdeal: "Ideal para", compIdealFC: "Empresas de manufactura", compIdealOS: "Fábricas con IoT + IA",
    yes: "Sí", no: "No",

    // Services
    svcTag: "SERVICIOS A MEDIDA",
    svcTitle: "¿Necesitás algo diferente? Lo construyo para vos",
    svcCta: "Solicitar cotización →",
    svcDemo: "Ver demo →",
    svc1Title: "Software a medida en la nube", svc1Icon: "☁️",
    svc1Badge: "Desde 4 semanas",
    svc1Bullets: ["ERP y sistemas de gestión", "Inventario, producción, calidad", "Cotizaciones y finanzas", "Diseñado para tu flujo exacto"],
    svc1Example: "Ej: Sistema de gestión para panadería con 3 sucursales",
    svc2Title: "App / Plataforma web", svc2Icon: "📱",
    svc2Badge: "Tu idea funcionando",
    svc2Bullets: ["Portal de clientes o marketplace", "Pagos online y catálogo", "Reservas y notificaciones", "Responsive y multi-idioma"],
    svc2Example: "Ej: Portal de turnos online para clínica dental",
    svc3Title: "Automatización IoT", svc3Icon: "📡",
    svc3Badge: "Monitoreo 24/7",
    svc3Bullets: ["Sensores en máquinas", "Dashboard en tiempo real", "Alertas automáticas", "Mantenimiento predictivo"],
    svc3Example: "Ej: Dashboard de 5 máquinas CNC con alertas WhatsApp",
    svc4Title: "Consultoría de procesos", svc4Icon: "🔧",
    svc4Badge: "Resultados en 2 semanas",
    svc4Bullets: ["Mapeo de procesos", "Eliminación de cuellos de botella", "Optimización de costos", "Documentación y capacitación"],
    svc4Example: "Ej: Diagnóstico operativo para fábrica de muebles",

    // Industries
    indTag: "INDUSTRIAS",
    indTitle: "Experiencia en múltiples sectores",

    // About
    aboutTag: "SOBRE MÍ",
    aboutTitle: "Julio Mirabal",
    aboutText: "Soy ingeniero mecánico con 15 años en manufactura. Diseño y construyo software industrial usando inteligencia artificial como herramienta de desarrollo. No soy un programador que intenta entender la industria — soy un ingeniero que automatiza lo que conoce.",
    aboutLangs: "Idiomas: Español, English, עברית",

    // CTA
    ctaTitle: "¿Listo para automatizar tu operación?",
    ctaSub: "Contame sobre tu proyecto. La primera consulta es gratis.",
    ctaBtn: "Solicitar cotización",
    ctaWa: "WhatsApp",
    ctaEmail: "Email",
    ctaLinkedin: "LinkedIn",
  },
  he: {
    heroTag: "תוכנה תעשייתית מותאמת",
    heroTitle: "תוכנה תעשייתית מותאמת לעסק שלך",
    heroSub: "ERP תעשייתי + פיתוח מותאם + IoT. תוכנן על ידי מהנדס מכונות עם 15 שנות ניסיון בייצור.",
    heroCta: "בקשת הצעת מחיר",
    stat1: "+15", stat1l: "שנות ייצור",
    stat2: "+45", stat2l: "מודולים",
    stat3: "+6", stat3l: "תעשיות",
    stat4: "ES/EN/HE", stat4l: "רב שפות",

    prodTag: "מוצרים",
    prodTitle: "שני פתרונות, מטרה אחת: לשלוט בפעילות שלכם",

    // FabriControl (PRINCIPAL — disponible ahora)
    fcTag: "זמין עכשיו",
    fcTitle: "FabriControl",
    fcSub: "מערכת ERP תעשייתית לעסק שלך",
    fcDesc: "מערכת ניהול מלאה לחברות ייצור. הצעות מחיר חכמות, ייצור ויזואלי, מלאי, BOM, בקרת מכונות, איכות, כספים, אפליקציית מובייל ותמיכה ב-3 שפות.",
    fcCta: "בקשת הצעת מחיר",
    fcDemo: "צפה בדמו",
    fcMore: "← צפייה בפרטים",
    fcDemoUser: "משתמש דמו:", fcDemoPass: "סיסמה:",
    fcF1: "הצעות מחיר חכמות", fcF2: "ייצור ויזואלי", fcF3: "מלאי ו-BOM",
    fcF4: "בקרת מכונות", fcF5: "איכות וכספים", fcF6: "אפליקציה · 3 שפות",

    // FabriOS (PRÓXIMAMENTE)
    osTag: "בקרוב",
    osTitle: "FabriOS",
    osSub: "מערכת ERP + IoT + AI למפעלים",
    osDesc: "הדור הבא: 45+ מודולים, ניטור IoT בזמן אמת, בינה מלאכותית חזויה, אפליקציית מובייל אופליין. הכל מחובר מכל מקום.",
    osNotify: "עדכנו אותי כשיהיה זמין",
    osNotifyPh: "your@email.com",
    osNotifyBtn: "עדכנו אותי",
    osNotified: "!מעולה! נעדכן אותך כשיהיה זמין",
    osF1: "45+ מודולים", osF2: "אפליקציה אופליין", osF3: "ניטור IoT",
    osF4: "AI חזוי", osF5: "רב שפות (ES/EN/HE)", osF6: "רב תעשייתי",

    compTitle: "השוואה מהירה",
    compFeature: "תכונה",
    compStatus: "סטטוס", compStatusFC: "זמין", compStatusOS: "בקרוב",
    compModules: "מודולים", compModulesFC: "עיקריים", compModulesOS: "45+",
    compIot: "IoT / חיישנים",
    compAi: "AI / תחזיות",
    compApp: "אפליקציית מובייל",
    compLang: "רב שפות",
    compBom: "BOM / מתכונים",
    compMachines: "בקרת מכונות",
    compIdeal: "אידיאלי עבור", compIdealFC: "חברות ייצור", compIdealOS: "מפעלים עם IoT + AI",
    yes: "כן", no: "לא",

    svcTag: "שירותים מותאמים",
    svcTitle: "צריכים משהו שונה? אני בונה את זה בשבילכם",
    svcCta: "← בקשת הצעת מחיר",
    svcDemo: "← צפה בדמו",
    svc1Title: "תוכנה מותאמת בענן", svc1Icon: "☁️",
    svc1Badge: "מ-4 שבועות",
    svc1Bullets: ["מערכות ERP וניהול", "מלאי, ייצור, איכות", "הצעות מחיר וכספים", "מותאם לתהליך שלכם"],
    svc1Example: "דוגמה: מערכת ניהול למאפייה עם 3 סניפים",
    svc2Title: "אפליקציה / פלטפורמה", svc2Icon: "📱",
    svc2Badge: "הרעיון שלך עובד",
    svc2Bullets: ["פורטל לקוחות או מרקטפלייס", "תשלומים אונליין וקטלוג", "הזמנות והתראות", "רספונסיבי ורב שפות"],
    svc2Example: "דוגמה: פורטל תורים אונליין למרפאת שיניים",
    svc3Title: "אוטומציה IoT", svc3Icon: "📡",
    svc3Badge: "ניטור 24/7",
    svc3Bullets: ["חיישנים במכונות", "לוח בקרה בזמן אמת", "התראות אוטומטיות", "תחזוקה מנבאת"],
    svc3Example: "דוגמה: לוח בקרה ל-5 מכונות CNC עם התראות וואטסאפ",
    svc4Title: "ייעוץ תהליכים", svc4Icon: "🔧",
    svc4Badge: "תוצאות ב-2 שבועות",
    svc4Bullets: ["מיפוי תהליכים", "זיהוי צווארי בקבוק", "אופטימיזציית עלויות", "תיעוד והדרכה"],
    svc4Example: "דוגמה: אבחון תפעולי למפעל רהיטים",

    indTag: "תעשיות",
    indTitle: "ניסיון במגוון מגזרים",

    aboutTag: "אודות",
    aboutTitle: "חוליו מיראבל",
    aboutText: "אני מהנדס מכונות עם 15 שנות ניסיון בייצור. אני מתכנן ובונה תוכנה תעשייתית באמצעות בינה מלאכותית ככלי פיתוח. אני לא מתכנת שמנסה להבין את התעשייה — אני מהנדס שמאוטמט את מה שהוא מכיר.",
    aboutLangs: "שפות: Español, English, עברית",

    ctaTitle: "מוכנים לאוטמט את הפעילות שלכם?",
    ctaSub: "ספרו לי על הפרויקט שלכם. הייעוץ הראשון חינם.",
    ctaBtn: "בקשת הצעת מחיר",
    ctaWa: "וואטסאפ",
    ctaEmail: "אימייל",
    ctaLinkedin: "LinkedIn",
  }
};

const industries = [
  { icon: "⚙️", es: "Metalurgia", he: "מתכת" },
  { icon: "🍞", es: "Alimentos", he: "מזון" },
  { icon: "🧵", es: "Textil", he: "טקסטיל" },
  { icon: "🧪", es: "Plásticos", he: "פלסטיק" },
  { icon: "⚗️", es: "Química", he: "כימיה" },
  { icon: "🪵", es: "Carpintería", he: "נגרות" },
  { icon: "🛒", es: "Comercio", he: "מסחר" },
  { icon: "🏥", es: "Salud", he: "בריאות" },
  { icon: "💼", es: "Servicios", he: "שירותים" },
];

function Chip({ children }) {
  return (
    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
      {children}
    </span>
  );
}

function Home() {
  const { language, isRtl } = useLanguage();
  const l = txt[language] || txt.es;
  const [notifyEmail, setNotifyEmail] = React.useState('');
  const [notified, setNotified] = React.useState(false);
  const [emailCopied, setEmailCopied] = React.useState(false);

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20 mb-6">
            {l.heroTag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            {l.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {l.heroSub}
          </p>
          <Link
            to="/cotizacion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
          >
            {l.heroCta} {isRtl ? '←' : '→'}
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { n: l.stat1, l: l.stat1l },
              { n: l.stat2, l: l.stat2l },
              { n: l.stat3, l: l.stat3l },
              { n: l.stat4, l: l.stat4l },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">{s.n}</div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTOS ═══ */}
      <section id="productos" className="py-20 px-4 bg-[#111827]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">{l.prodTag}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">{l.prodTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FabriControl Card — PRINCIPAL */}
            <div className="relative bg-[#111827] border-2 border-orange-500/40 rounded-2xl p-8 hover:border-orange-500/70 transition-all shadow-[0_0_30px_rgba(249,115,22,0.08)]">
              <span className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} px-3 py-1 text-xs font-bold bg-orange-500 text-white rounded-full`}>
                {l.fcTag}
              </span>
              <h3 className="text-2xl font-extrabold mt-2">{l.fcTitle}</h3>
              <p className="text-orange-400 text-sm font-medium mb-3">{l.fcSub}</p>
              <p className="text-gray-400 text-sm mb-5">{l.fcDesc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[l.fcF1, l.fcF2, l.fcF3, l.fcF4, l.fcF5, l.fcF6].map((f, i) => <Chip key={i}>{f}</Chip>)}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/cotizacion" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg transition-all text-sm">
                  {l.fcCta}
                </Link>
                <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all text-sm border border-white/20">
                  {l.fcDemo}
                </a>
                <Link to="/fabricontrol" className="inline-block px-6 py-3 text-orange-400 hover:text-orange-300 font-bold rounded-lg transition-all text-sm">
                  {l.fcMore}
                </Link>
              </div>
              <div className="mt-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-gray-400">
                <p><span className="text-gray-300 font-semibold">{l.fcDemoUser}</span> julito36911@gmail.com</p>
                <p><span className="text-gray-300 font-semibold">{l.fcDemoPass}</span> password123</p>
              </div>
            </div>

            {/* FabriOS Card — PRÓXIMAMENTE */}
            <div className="relative bg-[#111827] border border-white/10 rounded-2xl p-8 opacity-90">
              <span className={`absolute -top-3 ${isRtl ? 'right-6' : 'left-6'} px-4 py-1 text-xs font-bold bg-gray-600 text-white rounded-full`}>
                {l.osTag}
              </span>
              <h3 className="text-2xl font-extrabold mt-2 text-gray-300">{l.osTitle}</h3>
              <p className="text-gray-500 text-sm font-medium mb-3">{l.osSub}</p>
              <p className="text-gray-500 text-sm mb-5">{l.osDesc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[l.osF1, l.osF2, l.osF3, l.osF4, l.osF5, l.osF6].map((f, i) => (
                  <span key={i} className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-gray-500">
                    {f}
                  </span>
                ))}
              </div>
              {/* Email notify */}
              {notified ? (
                <p className="text-sm text-green-400 font-medium">{l.osNotified}</p>
              ) : (
                <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder={l.osNotifyPh}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50"
                    dir="ltr"
                  />
                  <button
                    onClick={() => { if (notifyEmail.includes('@')) setNotified(true); }}
                    className="px-5 py-2.5 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-all text-sm whitespace-nowrap"
                  >
                    {l.osNotifyBtn}
                  </button>
                </div>
              )}
              <p className={`text-xs text-gray-600 mt-3 ${isRtl ? 'text-right' : ''}`}>{l.osNotify}</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-14 bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
            <h3 className="text-lg font-bold text-center py-5 border-b border-white/10">{l.compTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" dir="ltr">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-left px-6 py-3 font-medium">{l.compFeature}</th>
                    <th className="text-center px-4 py-3 font-medium text-orange-400">FabriControl</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-500">FabriOS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    [l.compStatus, <span className="text-green-400 font-medium">{l.compStatusFC}</span>, <span className="text-gray-500">{l.compStatusOS}</span>],
                    [l.compModules, l.compModulesFC, l.compModulesOS],
                    [l.compBom, "✅", "✅"],
                    [l.compMachines, "✅", "✅"],
                    [l.compIot, "❌", "✅"],
                    [l.compAi, "❌", "✅"],
                    [l.compApp, "✅", "✅"],
                    [l.compLang, "✅ ES/EN/HE", "✅ ES/EN/HE"],
                    [l.compIdeal, l.compIdealFC, l.compIdealOS],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-3 font-medium">{row[0]}</td>
                      <td className="text-center px-4 py-3">{row[1]}</td>
                      <td className="text-center px-4 py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICIOS ═══ */}
      <section id="servicios" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">{l.svcTag}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">{l.svcTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: l.svc1Icon, title: l.svc1Title, badge: l.svc1Badge, bullets: l.svc1Bullets, example: l.svc1Example, demo: null },
              { icon: l.svc2Icon, title: l.svc2Title, badge: l.svc2Badge, bullets: l.svc2Bullets, example: l.svc2Example, demo: null },
              { icon: l.svc3Icon, title: l.svc3Title, badge: l.svc3Badge, bullets: l.svc3Bullets, example: l.svc3Example, demo: '/demos/iot/index.html' },
              { icon: l.svc4Icon, title: l.svc4Title, badge: l.svc4Badge, bullets: l.svc4Bullets, example: l.svc4Example, demo: null },
            ].map((svc, i) => (
              <div key={i} className="bg-[#111827] border border-white/10 rounded-xl p-6 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                {/* Badge */}
                <div className="mb-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {svc.badge}
                  </span>
                </div>
                {/* Icon + Title */}
                <div className="text-3xl mb-3">{svc.icon}</div>
                <h3 className="text-base font-bold mb-3 group-hover:text-orange-400 transition-colors">{svc.title}</h3>
                {/* Bullets */}
                <ul className="text-sm text-gray-400 space-y-1.5 mb-3 flex-grow">
                  {svc.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-orange-400/70 mt-0.5 flex-shrink-0">{'\u2192'}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {/* Example */}
                <p className="text-xs text-gray-500 italic mb-4">{svc.example}</p>
                {/* Actions */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link to="/cotizacion" className="text-xs font-semibold text-center py-2 px-3 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                    {l.svcCta}
                  </Link>
                  {svc.demo && (
                    <a href={svc.demo} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-center py-2 px-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                      {l.svcDemo}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIAS ═══ */}
      <section id="industrias" className="py-20 px-4 bg-[#111827]/50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">{l.indTag}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-10">{l.indTitle}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((ind, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-3 bg-[#111827] border border-white/10 rounded-xl hover:border-orange-500/30 transition-all">
                <span className="text-xl">{ind.icon}</span>
                <span className="text-sm font-medium">{language === 'he' ? ind.he : ind.es}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOBRE MÍ ═══ */}
      <section id="sobre-mi" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">{l.aboutTag}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">{l.aboutTitle}</h2>
          <p className="text-sm text-gray-500 mb-6">🇦🇷 🇮🇱 &nbsp; {l.aboutLangs}</p>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {l.aboutText}
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#111827]/50 to-[#0a0e17]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{l.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-10">{l.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/cotizacion"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              {l.ctaBtn}
            </Link>
            <a
              href="https://wa.me/972526489461"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all text-sm"
            >
              💬 {l.ctaWa}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('info@fabricontrol.online');
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 3000);
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-sm border border-white/20"
            >
              {emailCopied ? '✅ Copiado: info@fabricontrol.online' : `📧 ${l.ctaEmail}`}
            </button>
            <a
              href="https://www.linkedin.com/in/juliomirabal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold rounded-xl transition-all text-sm"
            >
              💼 {l.ctaLinkedin}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
