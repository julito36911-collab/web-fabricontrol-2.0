import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const LAST_UPDATED = '27 de marzo de 2026';

const content = {
  es: {
    pageTitle: 'Política de Privacidad',
    updated: `Última actualización: ${LAST_UPDATED}`,
    backBtn: '← Volver al Inicio',
    intro: 'En FabriControl, la privacidad de su negocio es nuestra prioridad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestra plataforma SaaS.',
    sections: [
      {
        title: '1. Información que Recopilamos',
        body: `Recopilamos información necesaria para la prestación del servicio ERP, incluyendo:
        - Datos de registro (Nombre, email, empresa, teléfono).
        - Datos operativos (Cotizaciones, inventarios, órdenes de producción).
        - Información técnica (Dirección IP, tipo de navegador, registros de acceso) para garantizar la seguridad y mejora del servicio.`,
      },
      {
        title: '2. Uso de la Información',
        body: `Utilizamos su información exclusivamente para:
        - Proveer y mantener el Servicio.
        - Procesar suscripciones y pagos.
        - Brindar soporte técnico y atención al cliente.
        - Enviar notificaciones críticas del sistema y actualizaciones de seguridad.
        No utilizamos sus datos operativos para fines publicitarios ni para entrenar modelos de IA sin su consentimiento explícito.`,
      },
      {
        title: '3. Almacenamiento y Seguridad',
        body: `Sus datos se almacenan en servidores seguros con cifrado de grado industrial. Implementamos copias de seguridad automáticas y protocolos de recuperación ante desastres para garantizar la continuidad de su negocio.
        El acceso a los datos está estrictamente limitado al personal autorizado de FabriControl necesario para el mantenimiento del sistema.`,
      },
      {
        title: '4. Derechos del Usuario',
        body: `Usted mantiene en todo momento el derecho de:
        - Acceder a sus datos.
        - Rectificar información incorrecta.
        - Solicitar la exportación de sus datos en formatos estándar (.csv, .json).
        - Solicitar la eliminación definitiva de su cuenta y datos asociados conforme a nuestra política de retención de 90 días tras la cancelación.`,
      },
    ],
    contact: 'Para cualquier duda sobre su privacidad, escríbanos a: info@fabricontrol.online',
  },
  en: {
    pageTitle: 'Privacy Policy',
    updated: `Last updated: March 27, 2026`,
    backBtn: '← Back to Home',
    intro: 'At FabriControl, your business privacy is our priority. This Privacy Policy describes how we collect, use, and protect your information when you use our SaaS platform.',
    sections: [
      {
        title: '1. Information We Collect',
        body: `We collect information necessary for the provision of the ERP service, including:
        - Registration data (Name, email, company, phone).
        - Operational data (Quotations, inventories, production orders).
        - Technical information (IP address, browser type, access logs) to ensure security and service improvement.`,
      },
      {
        title: '2. Use of Information',
        body: `We use your information exclusively to:
        - Provide and maintain the Service.
        - Process subscriptions and payments.
        - Provide technical support and customer care.
        - Send critical system notifications and security updates.
        We do not use your operational data for advertising purposes or to train AI models without your explicit consent.`,
      },
      {
        title: '3. Storage and Security',
        body: `Your data is stored on secure servers with industrial-grade encryption. We implement automatic backups and disaster recovery protocols to ensure your business continuity.
        Data access is strictly limited to authorized FabriControl personnel necessary for system maintenance.`,
      },
      {
        title: '4. User Rights',
        body: `At all times you maintain the right to:
        - Access your data.
        - Rectify incorrect information.
        - Request the export of your data in standard formats (.csv, .json).
        - Request the permanent deletion of your account and associated data in accordance with our 90-day retention policy after cancellation.`,
      },
    ],
    contact: 'For any privacy concerns, email us at: info@fabricontrol.online',
  },
  he: {
    pageTitle: 'מדיניות פרטיות',
    updated: `עודכן לאחרונה: 27 במרץ 2026`,
    backBtn: 'חזרה לדף הבית →',
    intro: 'ב-FabriControl, פרטיות העסק שלך היא בראש סדר העדיפויות שלנו. מדיניות פרטיות זו מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בעת השימוש בפלטפורמת ה-SaaS שלנו.',
    sections: [
      {
        title: '1. מידע שאנו אוספים',
        body: `אנו אוספים מידע הדרוש לאספקת שירות ה-ERP, כולל:
        - נתוני רישום (שם, אימייל, חברה, טלפון).
        - נתונים תפעוליים (הצעות מחיר, מלאי, הזמנות ייצור).
        - מידע טכני (כתובת IP, סוג דפדפן, יומני גישה) להבטחת אבטחה ושיפור השירות.`,
      },
      {
        title: '2. שימוש במידע',
        body: `אנו משתמשים במידע שלך אך ורק כדי:
        - לספק ולתחזק את השירות.
        - לעבד מנויים ותשלומים.
        - לספק תמיכה טכנית ושירות לקוחות.
        - לשלוח הודעות מערכת קריטיות ועדכוני אבטחה.
        איננו משתמשים בנתונים התפעוליים שלך למטרות פרסום או לאימון מודלי בינה מלאכותית ללא הסכמתך המפורשת.`,
      },
      {
        title: '3. אחסון ואבטחה',
        body: `הנתונים שלך מאוחסנים בשרתים מאובטחים עם הצפנה ברמה תעשייתית. אנו מיישמים גיבויים אוטומטיים ופרוטוקולים לשחזור מאסון כדי להבטיח את המשכיות העסק שלך.
        הגישה לנתונים מוגבלת אך ורק לאנשי צוות מורשים של FabriControl הדרושים לתחזוקת המערכת.`,
      },
      {
        title: '4. זכויות משתמש',
        body: `בכל עת עומדת לכם הזכות:
        - לגשת לנתונים שלכם.
        - לתקן מידע שגוי.
        - לבקש ייצוא של הנתונים שלכם בפורמטים סטנדרטיים (.csv, .json).
        - לבקש מחיקה סופית של החשבון והנתונים המשויכים אליו בהתאם למדיניות השמירה שלנו של 90 יום לאחר הביטול.`,
      },
    ],
    contact: 'לכל שאלה בנושא פרטיות, פנו אלינו בכתובת: info@fabricontrol.online',
  },
};

function PrivacyPolicy() {
  const { language, isRtl } = useLanguage();
  const l = content[language] || content.es;

  return (
    <div className={isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}>
      <Header />

      {/* Hero strip */}
      <section style={{
        background: 'linear-gradient(135deg, #0b0f1a 0%, #0f172a 100%)',
        padding: '4rem 0 3rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="container">
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#10b981', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', marginBottom: '2rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '0.6rem',
              transition: 'all 0.2s ease',
            }}
          >
            {l.backBtn}
          </Link>

          <div className={isRtl ? 'text-right' : 'text-left'}>
            <span style={{
              display: 'inline-block', marginBottom: '1rem',
              fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#9ca3af',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '4px 12px', borderRadius: '100px',
            }}>
              🔒 {language === 'he' ? 'פרטיות' : language === 'en' ? 'Privacy' : 'Privacidad'}
            </span>

            <h1 style={{
              color: 'white', fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900,
              lineHeight: 1.2, marginBottom: '1rem',
            }}>
              {l.pageTitle}
            </h1>

            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: 0 }}>
              {l.updated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#0b0f1a', padding: '4rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '820px' }}>

          <p style={{
            color: '#9ca3af', fontSize: '1.05rem', lineHeight: 1.8,
            marginBottom: '3rem',
            padding: '1.5rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: isRtl ? 'right' : 'left',
          }}>
            {l.intro}
          </p>

          {l.sections.map((sec, i) => (
            <div
              key={i}
              style={{
                marginBottom: '3rem',
                paddingBottom: '3rem',
                borderBottom: i < l.sections.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <h2 style={{
                color: '#e5e7eb',
                fontSize: '1.3rem',
                fontWeight: 800,
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexDirection: isRtl ? 'row-reverse' : 'row',
                textAlign: isRtl ? 'right' : 'left',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#10b981', flexShrink: 0,
                  boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                }} />
                {sec.title}
              </h2>
              {sec.body.split('\n\n').map((para, pi) => (
                <p key={pi} style={{
                  color: '#9ca3af',
                  fontSize: '0.975rem',
                  lineHeight: 1.85,
                  marginBottom: '1rem',
                  textAlign: isRtl ? 'right' : 'left',
                }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div style={{
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            textAlign: isRtl ? 'right' : 'left',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              📧 {l.contact}
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
