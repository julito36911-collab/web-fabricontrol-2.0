import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const LAST_UPDATED = '27 de marzo de 2026';

const content = {
  es: {
    pageTitle: 'Términos y Condiciones de Uso',
    updated: `Última actualización: ${LAST_UPDATED}`,
    backBtn: '← Volver al Inicio',
    intro: 'Al acceder o utilizar la plataforma FabriControl (en adelante "el Servicio"), usted acepta quedar vinculado por los presentes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al Servicio.',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        body: `Al registrarse y utilizar FabriControl, usted declara que tiene al menos 18 años de edad o la mayoría de edad en su jurisdicción, y que está autorizado a suscribir acuerdos legalmente vinculantes en nombre de su empresa u organización.

FabriControl se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigencia 30 días después de su publicación en la plataforma. El uso continuado del Servicio después de dicho período constituirá su aceptación de los nuevos términos.`,
      },
      {
        title: '2. Licencia de Uso (Suscripción Anual)',
        body: `FabriControl le otorga una licencia no exclusiva, intransferible y revocable para acceder y utilizar el Servicio durante el período de suscripción activo.

La suscripción es anual y concede al cliente acceso a todos los módulos del plan contratado. No está permitida la sublicencia, reventa, ni la distribución del acceso a terceros sin autorización escrita de FabriControl.

La licencia incluye actualizaciones automáticas de la plataforma y acceso al soporte técnico según el plan adquirido. FabriControl puede modificar, suspender o descontinuar funciones con un aviso previo de 30 días.`,
      },
      {
        title: '3. Propiedad de los Datos',
        body: `Todos los datos introducidos en la plataforma por el cliente (incluyendo cotizaciones, órdenes de producción, inventario, información de clientes y cualquier otro contenido) son de propiedad exclusiva del cliente.

FabriControl no vende, cede ni comparte los datos del cliente con terceros, excepto cuando sea requerido por ley o para la provisión del propio servicio (por ejemplo, servicios de hosting o base de datos en la nube).

FabriControl implementa medidas de seguridad técnicas y organizativas para proteger los datos del cliente. El cliente puede solicitar la eliminación o exportación de sus datos en cualquier momento mediante una solicitud escrita al equipo de soporte.`,
      },
      {
        title: '4. Limitación de Responsabilidad',
        body: `FabriControl proporciona la plataforma "tal como está" y "según disponibilidad". No garantiza que el servicio sea ininterrumpido, libre de errores o completamente seguro.

En ningún caso FabriControl, sus directores, empleados, socios o afiliados serán responsables por pérdidas financieras, pérdida de ganancias, pérdida de producción, pérdida de clientes ni ningún daño indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso del Servicio.

La responsabilidad total de FabriControl hacia el cliente, en cualquier circunstancia, no excederá el monto pagado por el cliente en los últimos 12 meses de suscripción.`,
      },
      {
        title: '5. Pagos y Cancelaciones',
        body: `La suscripción se cobra anualmente al inicio de cada período. Los precios vigentes se muestran en la página de Precios y pueden estar sujetos a impuestos locales aplicables en la jurisdicción del cliente.

No se emiten reembolsos parciales por períodos no utilizados, excepto cuando así lo requiera la legislación local aplicable.

El cliente puede cancelar su suscripción en cualquier momento antes de la fecha de renovación. Tras la cancelación, el acceso al Servicio permanecerá activo hasta el final del período de suscripción ya pagado. FabriControl se reserva el derecho de suspender cuentas con pagos pendientes o en caso de violación de estos Términos.`,
      },
    ],
    contact: 'Para consultas sobre estos Términos, contáctenos a: info@fabricontrol.online',
  },

  en: {
    pageTitle: 'Terms and Conditions of Service',
    updated: `Last updated: March 27, 2026`,
    backBtn: '← Back to Home',
    intro: 'By accessing or using the FabriControl platform (hereinafter "the Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service.',
    sections: [
      {
        title: '1. Acceptance of Terms',
        body: `By registering and using FabriControl, you declare that you are at least 18 years of age or the legal age of majority in your jurisdiction, and that you are authorized to enter into legally binding agreements on behalf of your company or organization.

FabriControl reserves the right to modify these Terms at any time. Modifications will take effect 30 days after being published on the platform. Continued use of the Service after that period constitutes your acceptance of the new terms.`,
      },
      {
        title: '2. License of Use (Annual Subscription)',
        body: `FabriControl grants you a non-exclusive, non-transferable, and revocable license to access and use the Service during the active subscription period.

The subscription is annual and grants the customer access to all modules of the contracted plan. Sublicensing, resale, or distribution of access to third parties is not permitted without written authorization from FabriControl.

The license includes automatic platform updates and access to technical support according to the purchased plan. FabriControl may modify, suspend, or discontinue features with 30 days' prior notice.`,
      },
      {
        title: '3. Data Ownership',
        body: `All data entered into the platform by the customer (including quotations, production orders, inventory, customer information and any other content) is the exclusive property of the customer.

FabriControl does not sell, transfer or share customer data with third parties, except when required by law or for the provision of the service itself (e.g., cloud hosting or database services).

FabriControl implements technical and organizational security measures to protect customer data. The customer may request deletion or export of their data at any time through a written request to the support team.`,
      },
      {
        title: '4. Limitation of Liability',
        body: `FabriControl provides the platform "as is" and "as available." It does not guarantee that the service will be uninterrupted, error-free, or completely secure.

In no event shall FabriControl, its directors, employees, partners, or affiliates be liable for financial losses, loss of profits, loss of production, loss of customers, or any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.

FabriControl's total liability to the customer, under any circumstance, shall not exceed the amount paid by the customer in the last 12 months of subscription.`,
      },
      {
        title: '5. Payments and Cancellations',
        body: `The subscription is billed annually at the start of each period. Current prices are shown on the Pricing page and may be subject to applicable local taxes in the customer's jurisdiction.

No partial refunds are issued for unused periods, except where required by applicable local law.

The customer may cancel their subscription at any time before the renewal date. After cancellation, access to the Service will remain active until the end of the already-paid subscription period. FabriControl reserves the right to suspend accounts with outstanding payments or in the event of violation of these Terms.`,
      },
    ],
    contact: 'For inquiries about these Terms, contact us at: info@fabricontrol.online',
  },

  he: {
    pageTitle: 'תנאי שימוש והגבלת אחריות',
    updated: `עודכן לאחרונה: 27 במרץ 2026`,
    backBtn: 'חזרה לדף הבית →',
    intro: 'על ידי גישה לפלטפורמת FabriControl או שימוש בה (להלן "השירות"), אתה מסכים להיות כפוף לתנאים ולהתניות אלה. אם אינך מסכים לחלק כלשהו מהתנאים הללו, אינך רשאי לגשת לשירות.',
    sections: [
      {
        title: '1. קבלת התנאים',
        body: `על ידי הרשמה ושימוש ב-FabriControl, אתה מצהיר כי אתה בן 18 לפחות או בגיל הבגרות החוקי בתחום השיפוט שלך, וכי אתה מורשה להתקשר בהסכמים מחייבים משפטית בשם חברתך או ארגונך.

FabriControl שומרת לעצמה את הזכות לשנות תנאים אלה בכל עת. השינויים ייכנסו לתוקף 30 יום לאחר פרסומם בפלטפורמה. המשך השימוש בשירות לאחר תקופה זו מהווה הסכמתך לתנאים החדשים.`,
      },
      {
        title: '2. רישיון שימוש (מנוי שנתי)',
        body: `FabriControl מעניקה לך רישיון לא-בלעדי, שאינו ניתן להעברה וניתן לביטול לגישה ושימוש בשירות במהלך תקופת המנוי הפעיל.

המנוי הוא שנתי ומעניק ללקוח גישה לכל המודולים של התוכנית שנרכשה. אין לתת-רישיון, למכור מחדש, או להפיץ גישה לצדדים שלישיים ללא אישור בכתב מ-FabriControl.

הרישיון כולל עדכוני פלטפורמה אוטומטיים וגישה לתמיכה טכנית בהתאם לתוכנית שנרכשה. FabriControl עשויה לשנות, להשהות או להפסיק תכונות עם הודעה מוקדמת של 30 יום.`,
      },
      {
        title: '3. בעלות על נתונים',
        body: `כל הנתונים שהוזנו לפלטפורמה על ידי הלקוח (כולל הצעות מחיר, הזמנות ייצור, מלאי, מידע על לקוחות וכל תוכן אחר) הם בבעלות הבלעדית של הלקוח.

FabriControl אינה מוכרת, מעבירה או משתפת נתוני לקוחות עם צדדים שלישיים, אלא אם כן נדרש על פי חוק או לצורך אספקת השירות עצמו.

FabriControl מיישמת אמצעי אבטחה טכניים וארגוניים להגנה על נתוני הלקוח. הלקוח רשאי לבקש מחיקה או ייצוא של נתוניו בכל עת באמצעות בקשה בכתב לצוות התמיכה.`,
      },
      {
        title: '4. הגבלת אחריות',
        body: `FabriControl מספקת את הפלטפורמה "כפי שהיא" ו"לפי הזמינות". היא אינה מבטיחה שהשירות יהיה רציף, נקי משגיאות או מאובטח לחלוטין.

בשום מקרה לא תהיה FabriControl, מנהליה, עובדיה, שותפיה או חבריה האחרים אחראים להפסדים כספיים, אובדן רווחים, אובדן ייצור, אובדן לקוחות, או לכל נזק עקיף, מקרי, מיוחד או תוצאתי.

האחריות הכוללת של FabriControl כלפי הלקוח, בכל נסיבות שהן, לא תעלה על הסכום ששולם על ידי הלקוח ב-12 החודשים האחרונים של המנוי.`,
      },
      {
        title: '5. תשלומים וביטולים',
        body: `המנוי מחויב מדי שנה בתחילת כל תקופה. המחירים הנוכחיים מוצגים בדף התמחור ועשויים להיות כפופים למיסים מקומיים החלים בתחום השיפוט של הלקוח.

לא מונפקים החזרים חלקיים עבור תקופות שלא נוצלו, אלא אם כן נדרש על פי הדין המקומי החל.

הלקוח רשאי לבטל את מנויו בכל עת לפני תאריך ההתחדשות. לאחר הביטול, הגישה לשירות תישאר פעילה עד תום תקופת המנוי ששולמה כבר. FabriControl שומרת לעצמה את הזכות להשהות חשבונות עם תשלומים שלא שולמו.`,
      },
    ],
    contact: 'לפניות בנוגע לתנאים אלה, צרו קשר: info@fabricontrol.online',
  },
};

function TermsAndConditions() {
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
          {/* Back button */}
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#06b6d4', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', marginBottom: '2rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '0.6rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; }}
          >
            {l.backBtn}
          </Link>

          <div className={isRtl ? 'text-right' : 'text-left'}>
            {/* Legal badge */}
            <span style={{
              display: 'inline-block', marginBottom: '1rem',
              fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#9ca3af',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '4px 12px', borderRadius: '100px',
            }}>
              ⚖️ {language === 'he' ? 'מסמך משפטי' : language === 'en' ? 'Legal Document' : 'Documento Legal'}
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

          {/* Intro paragraph */}
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

          {/* Sections */}
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
                  background: '#06b6d4', flexShrink: 0,
                  boxShadow: '0 0 8px rgba(6,182,212,0.6)',
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

          {/* Contact note */}
          <div style={{
            background: 'rgba(6,182,212,0.06)',
            border: '1px solid rgba(6,182,212,0.2)',
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

export default TermsAndConditions;
