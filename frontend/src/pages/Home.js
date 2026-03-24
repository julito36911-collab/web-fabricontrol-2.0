import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    heroTitle: "El ERP que tu Taller Merece, al Precio que Puedes Pagar",
    heroSub: "Controla cotizaciones, producción e inventario desde <strong>$195/año</strong>. Sin complicaciones. ☁️ 100% en la nube.",
    heroCta: "🆓 Solicitar Prueba Gratis (30 días)",
    heroFoot: "✅ Sin tarjeta de crédito · ✅ Acceso completo · ✅ Sin compromisos",

    demoTitle: "Prueba FabriControl Ahora Mismo",
    demoSub: "Explora el sistema completo sin registrarte. Datos de ejemplo incluidos.",
    demoUser: "👤 Usuario Demo",
    demoPass: "🔑 Contraseña",
    demoBtnWeb: "🖥️ Entrar a la Demo Web",
    demoBtnApp: "📱 Probar App Móvil",
    demoHint: "💡 La demo tiene datos de ejemplo. Explora libremente — se reinicia periódicamente.",

    showcaseTitle: "Mira FabriControl en Acción",
    showcaseSub: "Dashboard en tiempo real con todas tus métricas",

    benefitsTitle: "¿Por Qué Elegir FabriControl?",
    benefitsSub: "Diseñado específicamente para talleres latinoamericanos",
    b1Title: "Cotiza 50% Más Rápido",
    b1Desc: "Cálculo automático de costos de materiales y máquinas. Genera PDFs profesionales en minutos.",
    b2Title: "Nunca Pierdas una Orden",
    b2Desc: "Seguimiento visual de cada proyecto en tiempo real. Estados personalizables según tu flujo.",
    b3Title: "Operarios Conectados",
    b3Desc: "App móvil para actualizar estados desde el piso de producción. Funciona en cualquier celular.",

    featuresHeader: "Todo lo que Necesitas en un Solo Sistema",
    f1Title: "📄 Cotizaciones Inteligentes",
    f1Sub: "Genera presupuestos profesionales con cálculo automático de:",
    f1_1: "✓ Costos de materiales (con desperdicio)",
    f1_2: "✓ Tiempos de proceso por máquina",
    f1_3: "✓ Mano de obra y margen de ganancia",
    f1_4: "✓ Conversión a orden con un clic",

    f2Title: "🏭 Órdenes de Producción Visuales",
    f2Sub: "Control completo del flujo de fabricación:",
    f2_1: "✓ Estados 100% configurables a tu proceso",
    f2_2: "✓ Asignación de piezas a máquinas",
    f2_3: "✓ BOM (Lista de Materiales) completa",
    f2_4: "✓ Historial de cambios y archivos adjuntos",

    f3Title: "📦 Inventario con QR Codes",
    f3Sub: "Control inteligente de stock:",
    f3_1: "✓ Alertas de stock mínimo automáticas",
    f3_2: "✓ Generación de etiquetas QR",
    f3_3: "✓ Escaneo rápido con cámara del celular",
    f3_4: "✓ Trazabilidad completa de movimientos",

    f4Title: "📋 Portal de Proyectos (ÚNICO)",
    f4Sub: "Gestión colaborativa en tiempo real:",
    f4_1: "✓ Proyectos con tareas y responsables",
    f4_2: "✓ Comentarios con historial",
    f4_3: "✓ Archivos por proyecto y tarea",
    f4_4: "✓ Panel de actividad global en vivo",

    uniqueHeader: "Características que NO Encontrarás en Otros ERP",
    u1Title: "🧩 Piezas Paramétricas",
    u1Desc: "Crea plantillas con variables que generan códigos automáticos.",
    u1Ex: "<strong>Ejemplo:</strong> <code>Puerta-{Ancho}x{Alto}</code>",
    u1Gen: "→ Genera: <code>Puerta-100x200</code>",
    u1Foot: "<strong>ÚNICO en el mercado.</strong> Ahorra tiempo en productos repetitivos con variaciones.",

    u2Title: "🤖 Chat IA con Gemini",
    u2Desc: "Asistente inteligente que conoce <strong>específicamente FabriControl</strong>.",
    u2_1: "✓ Responde 24/7",
    u2_2: "✓ Explica cómo usar cada módulo",
    u2_3: "✓ Guía en procesos complejos",
    u2Foot: "Configura tu API Key gratuita de Google Gemini en 2 minutos.",

    u3Title: "📱 App Móvil PWA",
    u3Desc: "Progressive Web App para operarios de piso.",
    u3_1: "✓ Funciona en iOS y Android",
    u3_2: "✓ No requiere descarga de App Store",
    u3_3: "✓ Botones grandes para uso en planta",
    u3_4: "✓ Escaneo QR integrado",

    mobileAction: "App Móvil en Acción",
    mobileLogin: "Login Simple",
    mobileOrders: "Mis Órdenes",
    mobileUpdate: "Actualización de Estado",
    mobileCam: "Cámara para QR",
    mobileInv: "Inventario",

    compTitle: "FabriControl vs La Competencia",
    compSub: "Comparación honesta con otros sistemas",
    compFeature: "Característica",
    compPrice: "Precio/mes",
    compLang: "Español nativo",
    compLearn: "Curva de aprendizaje",
    compParam: "Piezas Paramétricas",
    compAI: "Chat IA integrado",
    compApp: "App móvil operarios",
    compYes: "✅",
    compNo: "❌",
    compTranslate: "⚠️ Traducido",
    compEnOnly: "❌ Solo EN",
    compIncluded: "✅ Incluida",
    compExtra: "💰 Extra",

    ctaTitle: "Empieza Hoy con FabriControl",
    ctaSub: "30 días de prueba gratuita. Sin tarjeta de crédito.",
    ctaBtn: "Solicitar Licencia Gratis"
  },
  en: {
    heroTitle: "The ERP your Workshop Deserves, at a Price you can Afford",
    heroSub: "Control quotes, production, and inventory starting at <strong>$195/year</strong>. No complications. ☁️ 100% Cloud.",
    heroCta: "🆓 Request Free Trial (30 days)",
    heroFoot: "✅ No credit card · ✅ Full access · ✅ No commitments",

    demoTitle: "Try FabriControl Right Now",
    demoSub: "Explore the full system without registering. Sample data included.",
    demoUser: "👤 Demo User",
    demoPass: "🔑 Password",
    demoBtnWeb: "🖥️ Enter Web Demo",
    demoBtnApp: "📱 Try Mobile App",
    demoHint: "💡 The demo has sample data. Explore freely — resets periodically.",

    showcaseTitle: "See FabriControl in Action",
    showcaseSub: "Real-time dashboard with all your metrics",

    benefitsTitle: "Why Choose FabriControl?",
    benefitsSub: "Designed specifically for modern workshops",
    b1Title: "Quote 50% Faster",
    b1Desc: "Automatic calculation of material and machine costs. Generate professional PDFs in minutes.",
    b2Title: "Never Lose an Order",
    b2Desc: "Visual tracking of each project in real-time. Customizable statuses according to your flow.",
    b3Title: "Connected Operators",
    b3Desc: "Mobile app to update statuses from the production floor. Works on any smartphone.",

    featuresHeader: "Everything You Need in One System",
    f1Title: "📄 Smart Quotations",
    f1Sub: "Generate professional quotes with automatic calculation of:",
    f1_1: "✓ Material costs (with waste)",
    f1_2: "✓ Process times by machine",
    f1_3: "✓ Labor and profit margin",
    f1_4: "✓ Convert to order with one click",

    f2Title: "🏭 Visual Production Orders",
    f2Sub: "Complete control of the manufacturing flow:",
    f2_1: "✓ 100% customizable statuses for your process",
    f2_2: "✓ Parts allocation to machines",
    f2_3: "✓ Complete BOM (Bill of Materials)",
    f2_4: "✓ Change history and attachments",

    f3Title: "📦 Inventory with QR Codes",
    f3Sub: "Intelligent stock control:",
    f3_1: "✓ Automatic low stock alerts",
    f3_2: "✓ QR label generation",
    f3_3: "✓ Fast scanning with smartphone camera",
    f3_4: "✓ Complete traceability of movements",

    f4Title: "📋 Projects Portal (UNIQUE)",
    f4Sub: "Real-time collaborative management:",
    f4_1: "✓ Projects with tasks and assignees",
    f4_2: "✓ Comments with history",
    f4_3: "✓ Files per project and task",
    f4_4: "✓ Live global activity board",

    uniqueHeader: "Features You WON'T Find in Other ERPs",
    u1Title: "🧩 Parametric Pieces",
    u1Desc: "Create templates with variables that generate automatic codes.",
    u1Ex: "<strong>Example:</strong> <code>Door-{Width}x{Height}</code>",
    u1Gen: "→ Generates: <code>Door-100x200</code>",
    u1Foot: "<strong>UNIQUE on the market.</strong> Save time on repetitive products with variations.",

    u2Title: "🤖 AI Chat with Gemini",
    u2Desc: "Smart assistant that knows <strong>specifically about FabriControl</strong>.",
    u2_1: "✓ Answers 24/7",
    u2_2: "✓ Explains how to use each module",
    u2_3: "✓ Guides in complex processes",
    u2Foot: "Set up your free Google Gemini API Key in 2 minutes.",

    u3Title: "📱 PWA Mobile App",
    u3Desc: "Progressive Web App for floor operators.",
    u3_1: "✓ Works on iOS and Android",
    u3_2: "✓ No App Store download required",
    u3_3: "✓ Large buttons for plant use",
    u3_4: "✓ Integrated QR scanning",

    mobileAction: "Mobile App in Action",
    mobileLogin: "Simple Login",
    mobileOrders: "My Orders",
    mobileUpdate: "Status Update",
    mobileCam: "QR Camera",
    mobileInv: "Inventory",

    compTitle: "FabriControl vs The Competition",
    compSub: "Honest comparison with other systems",
    compFeature: "Feature",
    compPrice: "Price/month",
    compLang: "Native Spanish",
    compLearn: "Learning curve",
    compParam: "Parametric Pieces",
    compAI: "Integrated AI Chat",
    compApp: "Operator Mobile App",
    compYes: "✅",
    compNo: "❌",
    compTranslate: "⚠️ Translated",
    compEnOnly: "❌ EN Only",
    compIncluded: "✅ Included",
    compExtra: "💰 Extra",

    ctaTitle: "Start Today with FabriControl",
    ctaSub: "30-day free trial. No credit card required.",
    ctaBtn: "Request Free License"
  },
  he: {
    heroTitle: "מערכת ה-ERP שהמפעל שלך צריך, במחיר שמשתלם לך",
    heroSub: "שלוט בהצעות מחיר, ייצור ומלאי החל מ-<strong>$195/שנה</strong>. ☁️ 100% בענן.",
    heroCta: "🆓 בקש ניסיון חינם (30 ימים)",
    heroFoot: "✅ ללא כרטיס אשראי · ✅ גישה מלאה · ✅ ללא התחייבות",

    demoTitle: "נסה את FabriControl עכשיו",
    demoSub: "חקור את המערכת המלאה ללא הרשמה. נתונים לדוגמה כלולים.",
    demoUser: "👤 משתמש הדגמה",
    demoPass: "🔑 סיסמה",
    demoBtnWeb: "🖥️ כניסה להדגמה באינטרנט",
    demoBtnApp: "📱 נסה אפליקציה ניידת",
    demoHint: "💡 ההדגמה כוללת נתונים. חקור בחופשיות — מתאפסת תקופתית.",

    showcaseTitle: "ראה את FabriControl בפעולה",
    showcaseSub: "לוח בקרה בזמן אמת עם כל המדדים שלך",

    benefitsTitle: "למה לבחור ב-FabriControl?",
    benefitsSub: "תוכנן במיוחד עבור מפעלים וסדנאות",
    b1Title: "הצעת מחיר מהירה ב-50%",
    b1Desc: "חישוב אוטומטי של עלויות חומרים ומכונות. הפק קובצי PDF מקצועיים בדקות.",
    b2Title: "לעולם אל תאבד הזמנה",
    b2Desc: "מעקב חזותי אחר כל פרויקט בזמן אמת. סטטוסים ניתנים להתאמה לפי זרימת העבודה שלך.",
    b3Title: "עובדים מחוברים מרחוק",
    b3Desc: "אפליקציה לנייד לעדכון סטטוסים מרצפת הייצור. עובד על כל טלפון חכם.",

    featuresHeader: "כל מה שאתה צריך במערכת אחת",
    f1Title: "📄 הצעות מחיר חכמות",
    f1Sub: "הפק הצעות מחיר מקצועיות עם חישוב אוטומטי של:",
    f1_1: "✓ עלויות חומרים (עם פחת)",
    f1_2: "✓ זמני תהליך לפי מכונה",
    f1_3: "✓ עבודה ושולי רווח",
    f1_4: "✓ המרה להזמנה בלחיצה אחת",

    f2Title: "🏭 הזמנות ייצור חזותיות",
    f2Sub: "שליטה מלאה בזרימת הייצור:",
    f2_1: "✓ 100% סטטוסים להתאמה אישית לתהליך שלך",
    f2_2: "✓ הקצאת חלקים למכונות",
    f2_3: "✓ כתב כמויות BOM (Bill of Materials) מלא",
    f2_4: "✓ היסטוריית שינויים וצרופות",

    f3Title: "📦 מלאי עם קודי QR",
    f3Sub: "בקרת מלאי חכמה:",
    f3_1: "✓ התראות מלאי נמוך אוטומטיות",
    f3_2: "✓ יצירת תוויות QR",
    f3_3: "✓ סריקה מהירה עם מצלמת הסמרטפון",
    f3_4: "✓ עקיבות מלאה של תנועות",

    f4Title: "📋 פורטל פרויקטים (ייחודי)",
    f4Sub: "ניהול שיתופי בזמן אמת:",
    f4_1: "✓ פרויקטים עם משימות ואחראים",
    f4_2: "✓ תגובות עם היסטוריה",
    f4_3: "✓ קבצים לפי פרויקט ומשימה",
    f4_4: "✓ לוח פעילות עולמי בזמן אמת",

    uniqueHeader: "תכונות שלא תמצא ב-ERPs אחרים",
    u1Title: "🧩 חלקים פרמטריים",
    u1Desc: "צור תבניות עם משתנים שנוצרים קודים אוטומטיים.",
    u1Ex: "<strong>דוגמה:</strong> <code>דלת-{רוחב}x{גובה}</code>",
    u1Gen: "→ יוצר: <code>דלת-100x200</code>",
    u1Foot: "<strong>ייחודי בשוק.</strong> חסוך זמן במוצרים חוזרים עם שינויים.",

    u2Title: "🤖 צ'אט בינה מלאכותית (Gemini)",
    u2Desc: "עוזר חכם שמכיר <strong>במיוחד את FabriControl</strong>.",
    u2_1: "✓ עונה 24/7",
    u2_2: "✓ מסביר כיצד להשתמש בכל מודול",
    u2_3: "✓ מנחה בתהליכים מורכבים",
    u2Foot: "הגדר את ה-API Key החינמי של Google Gemini ב-2 דקות.",

    u3Title: "📱 אפליקציה ניידת PWA",
    u3Desc: "Progressive Web App למפעילי רצפה.",
    u3_1: "✓ פועל על iOS ו-Android",
    u3_2: "✓ לא נדרשת הורדה מ-App Store",
    u3_3: "✓ כפתורים גדולים לשימוש במפעל",
    u3_4: "✓ סריקת QR משולבת",

    mobileAction: "אפליקציה ניידת בפעולה",
    mobileLogin: "התחברות פשוטה",
    mobileOrders: "ההזמנות שלי",
    mobileUpdate: "עדכון סטטוס",
    mobileCam: "מצלמת QR",
    mobileInv: "מלאי",

    compTitle: "FabriControl לעומת המתחרים",
    compSub: "השוואה כנה עם מערכות אחרות",
    compFeature: "תכונה",
    compPrice: "מחיר/חודש",
    compLang: "ספרדית שפת אם",
    compLearn: "עקומת למידה",
    compParam: "חלקים פרמטריים",
    compAI: "צ'אט AI משולב",
    compApp: "אפליקציה ניידת למפעילים",
    compYes: "✅",
    compNo: "❌",
    compTranslate: "⚠️ מתורגם",
    compEnOnly: "❌ רק EN",
    compIncluded: "✅ כלול",
    compExtra: "💰 תוספת תשלום",

    ctaTitle: "התחל היום עם FabriControl",
    ctaSub: "30 ימים לניסיון בחינם. ללא כרטיס אשראי.",
    ctaBtn: "בקש רישיון בחינם"
  }
};

function Home() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  return (
    <div className={isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}>
      <Header />

      {/* HERO SECTION */}
      <section className="hero" id="inicio">
        <div className="container">
          <div className={`hero-content ${isRtl ? 'text-right' : 'text-left'}`}>
            <h1>{l.heroTitle}</h1>
            <p dangerouslySetInnerHTML={{ __html: l.heroSub }} />
            <div className={`hero-cta ${isRtl ? 'justify-start' : 'justify-start'}`}>
              <Link to="/precios" className="btn btn-accent btn-large">{l.heroCta}</Link>
            </div>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '0.95rem'}}>
              {l.heroFoot}
            </p>
          </div>
        </div>
      </section>

      {/* DEMO EN VIVO */}
      <section style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)', padding: '3rem 0'}}>
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'white'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎮</div>
            <h2 style={{color: 'white', marginBottom: '0.5rem', fontSize: '2rem'}}>
              {l.demoTitle}
            </h2>
            <p style={{fontSize: '1.1rem', opacity: 0.95, marginBottom: '2rem'}}>
              {l.demoSub}
            </p>
            <div style={{background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', backdropFilter: 'blur(10px)'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: isRtl ? 'right' : 'left'}}>
                <div>
                  <p style={{margin: 0, opacity: 0.8, fontSize: '0.875rem'}}>{l.demoUser}</p>
                  <p style={{margin: '0.25rem 0 0 0', fontWeight: 600, fontSize: '1.05rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.15)', padding: '0.5rem', borderRadius: '6px'}}>
                    julito36911@gmail.com
                  </p>
                </div>
                <div>
                  <p style={{margin: 0, opacity: 0.8, fontSize: '0.875rem'}}>{l.demoPass}</p>
                  <p style={{margin: '0.25rem 0 0 0', fontWeight: 600, fontSize: '1.05rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.15)', padding: '0.5rem', borderRadius: '6px'}}>
                    password123
                  </p>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-large" style={{minWidth: '200px'}}>
                {l.demoBtnWeb}
              </a>
              <a href="https://fabricontrol-1.emergent.host/m" target="_blank" rel="noopener noreferrer" className="btn btn-large" style={{minWidth: '200px', background: 'white', color: '#1e3a5f', fontWeight: 600}}>
                {l.demoBtnApp}
              </a>
            </div>
            <p style={{marginTop: '1.5rem', fontSize: '0.875rem', opacity: 0.8}}>
              {l.demoHint}
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-white">{l.showcaseTitle}</h2>
            <p style={{color: 'var(--text-medium)', fontSize: '1.125rem'}}>
              {l.showcaseSub}
            </p>
          </div>
          <div style={{maxWidth: '1100px', margin: '0 auto'}}>
            <div style={{borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)'}}>
              <ImageLightbox src="/assets/img/screenshots/desktop/dashboard-es.jpg" alt={l.showcaseTitle} style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-white">{l.benefitsTitle}</h2>
            <p style={{color: 'var(--text-medium)', fontSize: '1.125rem'}}>
              {l.benefitsSub}
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className={`card ${isRtl ? 'text-right' : 'text-center'}`}>
              <div className="feature-icon" style={{background: 'var(--primary)', color: 'white', margin: '0 auto'}}>⚡</div>
              <h3 className="feature-title text-white">{l.b1Title}</h3>
              <p>{l.b1Desc}</p>
            </div>
            
            <div className={`card ${isRtl ? 'text-right' : 'text-center'}`}>
              <div className="feature-icon" style={{background: 'var(--accent)', color: 'white', margin: '0 auto'}}>📊</div>
              <h3 className="feature-title text-white">{l.b2Title}</h3>
              <p>{l.b2Desc}</p>
            </div>
            
            <div className={`card ${isRtl ? 'text-right' : 'text-center'}`}>
              <div className="feature-icon" style={{background: 'var(--secondary)', color: 'white', margin: '0 auto'}}>📱</div>
              <h3 className="feature-title text-white">{l.b3Title}</h3>
              <p>{l.b3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS PRINCIPALES */}
      <section className="section section-light" id="caracteristicas">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-white">{l.featuresHeader}</h2>
          </div>
          
          <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
            {/* Feature 1 */}
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h3 style={{color: 'var(--primary)'}}>{l.f1Title}</h3>
              <p className="text-gray-300">{l.f1Sub}</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>{l.f1_1}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f1_2}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f1_3}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f1_4}</li>
              </ul>
            </div>
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <ImageLightbox src="/assets/img/screenshots/desktop/quotations-es.jpg" alt={l.f1Title} style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>

            {/* Feature 2 */}
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <ImageLightbox src="/assets/img/screenshots/desktop/production-orders-es.jpg" alt={l.f2Title} style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h3 style={{color: 'var(--primary)'}}>{l.f2Title}</h3>
              <p className="text-gray-300">{l.f2Sub}</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>{l.f2_1}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f2_2}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f2_3}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f2_4}</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h3 style={{color: 'var(--primary)'}}>{l.f3Title}</h3>
              <p className="text-gray-300">{l.f3Sub}</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>{l.f3_1}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f3_2}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f3_3}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f3_4}</li>
              </ul>
            </div>
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <ImageLightbox src="/assets/img/screenshots/desktop/inventory-es.jpg" alt={l.f3Title} style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>

            {/* Feature 4 */}
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <ImageLightbox src="/assets/img/screenshots/desktop/projects-portal-es.jpg" alt={l.f4Title} style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h3 style={{color: 'var(--accent)'}}>{l.f4Title}</h3>
              <p className="text-gray-300">{l.f4Sub}</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>{l.f4_1}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f4_2}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f4_3}</li>
                <li style={{padding: '0.5rem 0'}}>{l.f4_4}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS ÚNICAS */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-white">{l.uniqueHeader}</h2>
          </div>
          
          <div className={`grid grid-3 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className={`card ${isRtl ? 'text-right' : 'text-left'}`}>
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/desktop/parametric-pieces-es.jpg" alt="Piezas Paramétricas" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--accent)'}}>{l.u1Title}</h3>
              <p>{l.u1Desc}</p>
              <p dangerouslySetInnerHTML={{ __html: l.u1Ex }} />
              <p dangerouslySetInnerHTML={{ __html: l.u1Gen }} />
              <p style={{marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem'}} dangerouslySetInnerHTML={{ __html: l.u1Foot }} />
            </div>
            
            <div className={`card ${isRtl ? 'text-right' : 'text-left'}`}>
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/desktop/chat-ia-es.jpg" alt="Chat IA con Gemini" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--secondary)'}}>{l.u2Title}</h3>
              <p dangerouslySetInnerHTML={{ __html: l.u2Desc }} />
              <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                <li style={{padding: '0.25rem 0'}}>{l.u2_1}</li>
                <li style={{padding: '0.25rem 0'}}>{l.u2_2}</li>
                <li style={{padding: '0.25rem 0'}}>{l.u2_3}</li>
              </ul>
              <p style={{marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>
                {l.u2Foot}
              </p>
            </div>
            
            <div className={`card ${isRtl ? 'text-right' : 'text-left'}`}>
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/mobile/mobile-home.jpg" alt="App Móvil PWA" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--primary)'}}>{l.u3Title}</h3>
              <p>{l.u3Desc}</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                <li style={{padding: '0.25rem 0'}}>{l.u3_1}</li>
                <li style={{padding: '0.25rem 0'}}>{l.u3_2}</li>
                <li style={{padding: '0.25rem 0'}}>{l.u3_3}</li>
                <li style={{padding: '0.25rem 0'}}>{l.u3_4}</li>
              </ul>
            </div>
          </div>
          
          {/* Galería adicional de app móvil */}
          <div style={{marginTop: 'var(--spacing-xxl)'}}>
            <h3 className="text-center mb-3 text-white">{l.mobileAction}</h3>
            <div className={`grid grid-5 ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-login.jpg" alt={l.mobileLogin} style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>{l.mobileLogin}</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-orders.jpg" alt={l.mobileOrders} style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>{l.mobileOrders}</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-machines.jpg" alt={l.mobileUpdate} style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>{l.mobileUpdate}</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-scan-qr.jpg" alt={l.mobileCam} style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>{l.mobileCam}</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-inventory.jpg" alt={l.mobileInv} style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>{l.mobileInv}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA VS COMPETENCIA */}
      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-white">{l.compTitle}</h2>
            <p style={{color: 'var(--text-medium)'}}>{l.compSub}</p>
          </div>
          
          <div style={{overflowX: 'auto'}}>
            <table className={isRtl ? 'dir-rtl' : 'dir-ltr'} style={{width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-md)', color: '#D1D5DB'}}>
              <thead>
                <tr style={{borderBottom: '2px solid rgba(255,255,255,0.1)'}}>
                  <th style={{textAlign: isRtl ? 'right' : 'left', padding: '1rem'}}>{l.compFeature}</th>
                  <th style={{textAlign: 'center', padding: '1rem', color: 'var(--primary)'}}><strong>FabriControl</strong></th>
                  <th style={{textAlign: 'center', padding: '1rem', color: '#D1D5DB'}}>Odoo</th>
                  <th style={{textAlign: 'center', padding: '1rem', color: '#D1D5DB'}}>Katana</th>
                  <th style={{textAlign: 'center', padding: '1rem', color: '#D1D5DB'}}>ERPNext</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '1rem'}}>{l.compPrice}</td>
                  <td style={{textAlign: 'center', padding: '1rem', color: 'white'}}><strong>$49-129</strong></td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$50-300+</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$99-799</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$10-25</td>
                </tr>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '1rem'}}>{l.compLang}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compYes}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compTranslate}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compEnOnly}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compTranslate}</td>
                </tr>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '1rem'}}>{l.compLearn}</td>
                  <td style={{textAlign: 'center', padding: '1rem', color: 'white'}}><strong>2-3 {isRtl ? 'ימים' : 'días'}</strong></td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>2-4 {isRtl ? 'שבועות' : 'semanas'}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>1 {isRtl ? 'שבוע' : 'semana'}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>2-3 {isRtl ? 'שבועות' : 'semanas'}</td>
                </tr>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '1rem'}}>{l.compParam}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compYes}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                </tr>
                <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '1rem'}}>{l.compAI}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compYes} Gemini</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                </tr>
                <tr>
                  <td style={{padding: '1rem'}}>{l.compApp}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compIncluded}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compExtra}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compExtra}</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>{l.compNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA PRECIOS */}
      <section className="section" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white'}}>
        <div className="container text-center">
          <h2 style={{color: 'white'}}>{l.ctaTitle}</h2>
          <p style={{fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95}}>
            {l.ctaSub}
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/precios" className="btn btn-accent btn-large">{l.ctaBtn}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
