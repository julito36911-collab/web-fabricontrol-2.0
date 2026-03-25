import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    heroTitle: "10 Módulos. 1 Sistema Completo.",
    heroSub: "Todo lo que necesitas para gestionar tu taller desde la cotización hasta la entrega",
    
    f1Title: "📄 Cotizaciones Inteligentes",
    f1Desc: "Genera presupuestos profesionales con cálculo automático de costos",
    f1_1: "Costos de materiales (con desperdicio)",
    f1_2: "Tiempos de proceso por máquina",
    f1_3: "Mano de obra y margen de ganancia",
    f1_4: "Convertir a orden con un clic",

    f2Title: "🏭 Órdenes de Producción Visuales",
    f2Desc: "Control completo del flujo de fabricación",
    f2_1: "Estados 100% personalizables",
    f2_2: "Asignación de piezas a máquinas",
    f2_3: "BOM completo (Bill of Materials)",
    f2_4: "Historial de cambios y archivos adjuntos",

    f3Title: "📦 Inventario con Códigos QR",
    f3Desc: "Control inteligente de stock",
    f3_1: "Alertas automáticas de stock bajo",
    f3_2: "Generación de etiquetas QR",
    f3_3: "Escaneo rápido con cámara del celular",
    f3_4: "Trazabilidad completa de movimientos",

    f4Title: "📂 Portal de Proyectos",
    f4Desc: "Gestiona múltiples proyectos simultáneamente",
    f4_1: "Vista tipo Kanban o lista",
    f4_2: "Seguimiento de avance por etapas",
    f4_3: "Asignación de responsables",
    f4_4: "Documentos y fotos adjuntas",

    f5Title: "📊 Dashboard en Tiempo Real",
    f5Desc: "Todas tus métricas en un solo lugar",
    f5_1: "Ventas y cotizaciones del mes",
    f5_2: "Proyectos activos y próximas entregas",
    f5_3: "Rentabilidad y márgenes",
    f5_4: "Exportar reportes a Excel",

    ctaTitle: "¿Listo para Transformar tu Taller?",
    ctaSub: "30 días de prueba gratuita. Sin tarjeta de crédito.",
    ctaBtn: "Solicitar Licencia Gratis"
  },
  en: {
    heroTitle: "10 Modules. 1 Complete System.",
    heroSub: "Everything you need to manage your workshop from quotation to delivery",
    
    f1Title: "📄 Smart Quotations",
    f1Desc: "Generate professional quotes with automatic cost calculation",
    f1_1: "Material costs (with waste)",
    f1_2: "Process times by machine",
    f1_3: "Labor and profit margin",
    f1_4: "Convert to order with one click",

    f2Title: "🏭 Visual Production Orders",
    f2Desc: "Complete control of the manufacturing flow",
    f2_1: "100% customizable statuses",
    f2_2: "Parts allocation to machines",
    f2_3: "Complete BOM (Bill of Materials)",
    f2_4: "Change history and attachments",

    f3Title: "📦 Inventory with QR Codes",
    f3Desc: "Intelligent stock control",
    f3_1: "Automatic low stock alerts",
    f3_2: "QR label generation",
    f3_3: "Fast scanning with smartphone camera",
    f3_4: "Complete traceability of movements",

    f4Title: "📂 Projects Portal",
    f4Desc: "Manage multiple projects simultaneously",
    f4_1: "Kanban or list view",
    f4_2: "Stage-by-stage progress tracking",
    f4_3: "Assigning responsible parties",
    f4_4: "Attached documents and photos",

    f5Title: "📊 Real-Time Dashboard",
    f5Desc: "All your metrics in one place",
    f5_1: "Monthly sales and quotations",
    f5_2: "Active projects and upcoming deliveries",
    f5_3: "Profitability and margins",
    f5_4: "Export reports to Excel",

    ctaTitle: "Ready to Transform Your Workshop?",
    ctaSub: "30-day free trial. No credit card required.",
    ctaBtn: "Request Free License"
  },
  he: {
    heroTitle: "10 מודולים. מערכת אחת שלמה.",
    heroSub: "כל מה שאתה צריך כדי לנהל את המפעל שלך מהצעת המחיר ועד לאספקה",
    
    f1Title: "📄 הצעות מחיר חכמות",
    f1Desc: "הפק הצעות מחיר מקצועיות עם חישוב עלויות אוטומטי",
    f1_1: "עלויות חומרים (כולל פחת)",
    f1_2: "זמני תהליך לפי מכונה",
    f1_3: "כוח אדם ושולי רווח",
    f1_4: "המרה להזמנה בלחיצה אחת",

    f2Title: "🏭 הזמנות ייצור חזותיות",
    f2Desc: "שליטה מלאה בזרימת הייצור",
    f2_1: "סטטוסים הניתנים להתאמה אישית של 100%",
    f2_2: "הקצאת חלקים למכונות",
    f2_3: "BOM מלא (רשימת חומרים)",
    f2_4: "היסטוריית שינויים וקבצים מצורפים",

    f3Title: "📦 מלאי עם קודי QR",
    f3Desc: "בקרת מלאי חכמה",
    f3_1: "התראות אוטומטיות על מלאי נמוך",
    f3_2: "יצירת תוויות QR",
    f3_3: "סריקה מהירה עם מצלמת הטלפון",
    f3_4: "מעקב מלא אחר תנועות",

    f4Title: "📂 פורטל פרויקטים",
    f4Desc: "ניהול פרויקטים מרובים בו זמנית",
    f4_1: "תצוגת קנבן או רשימה",
    f4_2: "מעקב התקדמות שלב אחר שלב",
    f4_3: "הקצאת אחראים",
    f4_4: "מסמכים ותמונות מצורפים",

    f5Title: "📊 לוח בקרה בזמן אמת",
    f5Desc: "כל המדדים שלך במקום אחד",
    f5_1: "מכירות והצעות מחיר חודשיות",
    f5_2: "פרויקטים פעילים ומשלוחים קרובים",
    f5_3: "רווחיות ושולי רווח",
    f5_4: "ייצוא דוחות לאקסל",

    ctaTitle: "מוכן לשדרג את המפעל שלך?",
    ctaSub: "30 ימי ניסיון בחינם. ללא כרטיס אשראי.",
    ctaBtn: "בקש רישיון בחינם"
  }
};

function Caracteristicas() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  return (
    <div className={isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}>
      <Header />
      
      {/* HERO */}
      <section className="hero" style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h1 style={{color: 'white', fontFamily: 'Montserrat', fontSize: '3rem'}}>{l.heroTitle}</h1>
          <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
            {l.heroSub}
          </p>
        </div>
      </section>

      {/* MODULES */}
      <section className="section">
        <div className="container">
          
          {/* Cotizaciones Inteligentes */}
          <div style={{marginBottom: '5rem'}}>
            <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{l.f1Title}</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  {l.f1Desc}
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f1_1}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f1_2}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f1_3}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f1_4}</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/quotations-es.jpg" alt={l.f1Title} style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

          {/* Órdenes de Producción */}
          <div style={{marginBottom: '5rem'}}>
            <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', order: isRtl ? 1 : 0}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/production-orders-es.jpg" alt={l.f2Title} style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{l.f2Title}</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  {l.f2Desc}
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f2_1}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f2_2}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f2_3}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f2_4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Inventario con QR */}
          <div style={{marginBottom: '5rem'}}>
            <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{l.f3Title}</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  {l.f3Desc}
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f3_1}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f3_2}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f3_3}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f3_4}</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/inventory-es.jpg" alt={l.f3Title} style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

          {/* Portal de Proyectos */}
          <div style={{marginBottom: '5rem'}}>
            <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', order: isRtl ? 1 : 0}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/projects-portal-es.jpg" alt={l.f4Title} style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{l.f4Title}</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  {l.f4Desc}
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f4_1}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f4_2}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f4_3}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f4_4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <div style={{marginBottom: '5rem'}}>
            <div className={`grid grid-2 ${isRtl ? 'dir-rtl' : ''}`} style={{gap: '3rem', alignItems: 'center'}}>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{l.f5Title}</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  {l.f5Desc}
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f5_1}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f5_2}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f5_3}</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>{l.f5_4}</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/dashboard-es.jpg" alt={l.f5Title} style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white'}}>
        <div className="container text-center">
          <h2 style={{color: 'white', marginBottom: '1rem'}}>{l.ctaTitle}</h2>
          <p style={{fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.95}}>
            {l.ctaSub}
          </p>
          <a href="/precios" className="btn btn-accent btn-large" style={{background: 'white', color: 'var(--primary)'}}>{l.ctaBtn}</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Caracteristicas;