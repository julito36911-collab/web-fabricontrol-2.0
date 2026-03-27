import React, { useState } from 'react';
import './LicenseRequestModal.css';
import { useLanguage } from '../contexts/LanguageContext';

const modalLocales = {
  es: {
    title: "☁️ Solicitar Licencia de Prueba (30 Días Gratis)",
    subtitle: "100% en la nube - Sin descargas ni instalaciones",
    howItWorks: "¿Cómo funciona?",
    steps: [
      "Complete este formulario con sus datos",
      "Recibirá por email en máximo 24h:",
      "Su código de activación único",
      "Instrucciones de registro",
      "Vaya a ",
      "Ingrese su código y cree su cuenta",
      "¡Listo! Disfrute 30 días de prueba gratis"
    ],
    cloudTitle: "☁️ Sistema 100% en la Nube:",
    cloudFeatures: [
      "Accede desde cualquier dispositivo",
      "Datos seguros con respaldos automáticos",
      "Actualizaciones automáticas incluidas",
      "Funciona en PC, tablet y celular"
    ],
    labels: {
      name: "Nombre Completo *",
      company: "Empresa",
      email: "Email *",
      phone: "Teléfono/WhatsApp",
      users: "¿Cuántos usuarios necesitas? *",
      plan: "Plan de interés (después del trial)"
    },
    placeholders: {
      name: "Juan Pérez",
      company: "Metalúrgica Sol S.A.",
      email: "juan@empresa.com",
      phone: "+54 11 1234-5678",
      select: "Selecciona cantidad"
    },
    options: {
      users: ["1-5 usuarios", "6-10 usuarios", "Más de 10 usuarios (Enterprise)"],
      plans: [
        "💰 Pago Anual - $195/año (MEJOR VALOR)",
        "💳 Pago en Cuotas - $290/año",
        "🤔 Decidir después del trial"
      ]
    },
    actions: {
      cancel: "Cancelar",
      submit: "📱 Enviar por WhatsApp"
    },
    help: "¿Necesitas ayuda?",
    contact: "Contacta a:",
    waMessage: "✅ Redirigiendo a WhatsApp... Envía el mensaje para completar tu solicitud.",
    waError: "⚠️ Por favor complete los campos obligatorios (Nombre, Email, Usuarios)",
    waTemplate: {
      header: "🚀 *SOLICITUD DE TRIAL FABRICONTROL* 🚀",
      name: "👤 *Nombre:*",
      company: "🏢 *Empresa:*",
      email: "📧 *Email:*",
      phone: "📞 *Teléfono:*",
      users: "👥 *Usuarios:*",
      plan: "💳 *Plan Post-Trial:*",
      footer: "_Hola, me gustaría solicitar mi código de activación para la prueba gratuita de 30 días._",
      notSpecified: "No especificada"
    }
  },
  en: {
    title: "☁️ Request Trial License (30 Days Free)",
    subtitle: "100% cloud-based - No downloads or installations",
    howItWorks: "How does it work?",
    steps: [
      "Complete this form with your details",
      "You will receive by email in max 24h:",
      "Your unique activation code",
      "Registration instructions",
      "Go to ",
      "Enter your code and create your account",
      "Ready! Enjoy 30 days of free trial"
    ],
    cloudTitle: "☁️ 100% Cloud-based System:",
    cloudFeatures: [
      "Access from any device",
      "Secure data with automatic backups",
      "Automatic updates included",
      "Works on PC, tablet, and mobile"
    ],
    labels: {
      name: "Full Name *",
      company: "Company",
      email: "Email *",
      phone: "Phone/WhatsApp",
      users: "How many users do you need? *",
      plan: "Interested plan (after trial)"
    },
    placeholders: {
      name: "John Doe",
      company: "Steel Solutions Inc.",
      email: "john@company.com",
      phone: "+1 212 555-0123",
      select: "Select quantity"
    },
    options: {
      users: ["1-5 users", "6-10 users", "More than 10 users (Enterprise)"],
      plans: [
        "💰 Annual Payment - $195/year (BEST VALUE)",
        "💳 Monthly Installments - $290/year",
        "🤔 Decide after trial"
      ]
    },
    actions: {
      cancel: "Cancel",
      submit: "📱 Send via WhatsApp"
    },
    help: "Need help?",
    contact: "Contact:",
    waMessage: "✅ Redirecting to WhatsApp... Send the message to complete your request.",
    waError: "⚠️ Please fill in all required fields (Name, Email, Users)",
    waTemplate: {
      header: "🚀 *FABRICONTROL TRIAL REQUEST* 🚀",
      name: "👤 *Name:*",
      company: "🏢 *Company:*",
      email: "📧 *Email:*",
      phone: "📞 *Phone:*",
      users: "👥 *Users:*",
      plan: "💳 *Post-Trial Plan:*",
      footer: "_Hi, I would like to request my activation code for the 30-day free trial._",
      notSpecified: "Not specified"
    }
  },
  he: {
    title: "☁️ בקשת רישיון ניסיון (30 ימים חינם)",
    subtitle: "100% בענן - ללא הורדות או התקנות",
    howItWorks: "איך זה עובד?",
    steps: [
      "מלא את הטופס עם הפרטים שלך",
      "תקבל במייל תוך מקסימום 24 שעות:",
      "קוד הפעלה ייחודי",
      "הוראות הרשמה",
      "עבור אל ",
      "הזן את הקוד וצרוב חשבון",
      "מוכן! תהנה מ-30 ימי ניסיון חינם"
    ],
    cloudTitle: "☁️ מערכת 100% בענן:",
    cloudFeatures: [
      "גישה מכל מכשיר",
      "נתונים מאובטחים עם גיבויים אוטומטיים",
      "עדכונים אוטומטיים כלולים",
      "עובד במחשב, טאבלט ונייד"
    ],
    labels: {
      name: "שם מלא *",
      company: "חברה",
      email: "אימייל *",
      phone: "טלפון/ווטסאפ",
      users: "כמה משתמשים אתה צריך? *",
      plan: "תוכנית רצויה (לאחר הניסיון)"
    },
    placeholders: {
      name: "ישראל ישראלי",
      company: "חדשנות בתעשייה בע\"מ",
      email: "info@company.com",
      phone: "+972 50-123-4567",
      select: "בחר כמות"
    },
    options: {
      users: ["1-5 משתמשים", "6-10 משתמשים", "יותר מ-10 משתמשים (Enterprise)"],
      plans: [
        "💰 תשלום שנתי - $195/שנה (המשתלם ביותר)",
        "💳 תשלום בתשלומים - $290/שנה",
        "🤔 החלטה לאחר הניסיון"
      ]
    },
    actions: {
      cancel: "ביטול",
      submit: "📱 שלח בווטסאפ"
    },
    help: "צריך עזרה?",
    contact: "צור קשר:",
    waMessage: "✅ מעביר לווטסאפ... שלח את ההודעה כדי להשלים את הבקשה.",
    waError: "⚠️ אנא מלא את כל שדות החובה (שם, אימייל, משתמשים)",
    waTemplate: {
      header: "🚀 *בקשת ניסיון FABRICONTROL* 🚀",
      name: "👤 *שם:*",
      company: "🏢 *חברה:*",
      email: "📧 *אימייל:*",
      phone: "📞 *טלפון:*",
      users: "👥 *משתמשים:*",
      plan: "💳 *תוכנית לאחר ניסיון:*",
      footer: "_שלום, אני מעוניין לקבל קוד הפעלה לגרסת הניסיון של 30 יום._",
      notSpecified: "לא צוין"
    }
  }
};

function LicenseRequestModal({ isOpen, onClose, initialPlan = 'anual' }) {
  const { language, isRtl } = useLanguage();
  const l = modalLocales[language] || modalLocales.es;

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    cantidadUsuarios: '',
    planDeseado: initialPlan
  });

  // Update initialPlan if it changes when the modal is re-opened
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        planDeseado: initialPlan
      }));
    }
  }, [isOpen, initialPlan]);

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const REGISTER_URL = "https://fabricontrol-1.emergent.host/register";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendRequest = (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.cantidadUsuarios) {
      setMessage({ type: 'error', text: l.waError });
      return;
    }

    const waNumber = "972526489461";
    const planText = formData.planDeseado === 'anual' ? '$195/año' : (formData.planDeseado === 'cuotas' ? '$290/año' : 'Por decidir');
    
    const messageText = `${l.waTemplate.header}
    
${l.waTemplate.name} ${formData.nombre}
${l.waTemplate.company} ${formData.empresa || l.waTemplate.notSpecified}
${l.waTemplate.email} ${formData.email}
${l.waTemplate.phone} ${formData.telefono || l.waTemplate.notSpecified}
${l.waTemplate.users} ${formData.cantidadUsuarios}
${l.waTemplate.plan} ${planText}

${l.waTemplate.footer}`;

    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
    
    setMessage({ 
      type: 'success', 
      text: l.waMessage 
    });

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={`license-modal-overlay ${isRtl ? 'dir-rtl' : 'dir-ltr'}`} onClick={onClose}>
      <div className="license-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="license-modal-close" onClick={onClose}>✕</button>
        
        <div className={`license-modal-header ${isRtl ? 'text-right' : 'text-left'}`}>
          <h2>{l.title}</h2>
          <p>{l.subtitle}</p>
        </div>

        <form onSubmit={sendRequest} className="license-form">
          
          <div className="license-info-box" style={{background: '#dcfce7', borderColor: '#16a34a', textAlign: isRtl ? 'right' : 'left'}}>
            <strong style={{color: '#16a34a'}}>{isRtl ? '' : '✅ '}{l.howItWorks}</strong>
            <ul style={{marginTop: '0.5rem', paddingRight: isRtl ? '1.2rem' : '0', paddingLeft: isRtl ? '0' : '1.2rem', marginBottom: 0, listStyleType: 'none'}}>
              <li>1️⃣ {l.steps[0]}</li>
              <li>2️⃣ {l.steps[1]}
                <ul style={{paddingRight: isRtl ? '1.5rem' : '0', paddingLeft: isRtl ? '0' : '1.5rem', marginTop: '0.25rem', listStyleType: 'none'}}>
                  <li>🔑 {l.steps[2]}</li>
                  <li>📋 {l.steps[3]}</li>
                </ul>
              </li>
              <li>3️⃣ {l.steps[4]} <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" style={{color: '#16a34a', fontWeight: 600}}>fabricontrol-1.emergent.host/register</a></li>
              <li>4️⃣ {l.steps[5]}</li>
              <li>5️⃣ {l.steps[6]}</li>
            </ul>
          </div>

          <div className="license-info-box" style={{background: '#eff6ff', borderColor: '#3b82f6', marginTop: '1rem', textAlign: isRtl ? 'right' : 'left'}}>
            <strong style={{color: '#1d4ed8'}}>{isRtl ? '' : '☁️ '}{l.cloudTitle}</strong>
            <ul style={{marginTop: '0.5rem', paddingRight: isRtl ? '1.2rem' : '0', paddingLeft: isRtl ? '0' : '1.2rem', marginBottom: 0, listStyleType: 'none'}}>
              <li>🌐 {l.cloudFeatures[0]}</li>
              <li>🔒 {l.cloudFeatures[1]}</li>
              <li>🔄 {l.cloudFeatures[2]}</li>
              <li>📱 {l.cloudFeatures[3]}</li>
            </ul>
          </div>

          <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
            <label htmlFor="nombre">{l.labels.name}</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder={l.placeholders.name}
              required
            />
          </div>

          <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
            <label htmlFor="empresa">{l.labels.company}</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder={l.placeholders.company}
            />
          </div>

          <div className="form-row">
            <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
              <label htmlFor="email">{l.labels.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={l.placeholders.email}
                required
              />
            </div>

            <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
              <label htmlFor="telefono">{l.labels.phone}</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder={l.placeholders.phone}
              />
            </div>
          </div>

          <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
            <label htmlFor="cantidadUsuarios">{l.labels.users}</label>
            <select
              id="cantidadUsuarios"
              name="cantidadUsuarios"
              value={formData.cantidadUsuarios}
              onChange={handleChange}
              required
            >
              <option value="">{l.placeholders.select}</option>
              <option value="1-5">{l.options.users[0]}</option>
              <option value="6-10">{l.options.users[1]}</option>
              <option value="10+">{l.options.users[2]}</option>
            </select>
          </div>

          <div className={`form-group ${isRtl ? 'text-right' : 'text-left'}`}>
            <label htmlFor="planDeseado">{l.labels.plan}</label>
            <select
              id="planDeseado"
              name="planDeseado"
              value={formData.planDeseado}
              onChange={handleChange}
            >
              <option value="anual">{l.options.plans[0]}</option>
              <option value="cuotas">{l.options.plans[1]}</option>
              <option value="por-decidir">{l.options.plans[2]}</option>
            </select>
          </div>

          {message.text && (
            <div className={`license-message license-message-${message.type}`} style={{textAlign: isRtl ? 'right' : 'left'}}>
              {message.text}
            </div>
          )}

          <div className={`form-actions ${isRtl ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={sending}
            >
              {l.actions.cancel}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {l.actions.submit}
            </button>
          </div>

          <div className={`license-help-box ${isRtl ? 'text-right' : 'text-left'}`}>
            <strong>💡 {l.help}</strong><br />
            {l.contact} <a href="mailto:info@fabricontrol.online">info@fabricontrol.online</a><br />
            WhatsApp: <a href="https://wa.me/972526489461">+972 52-648-9461</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LicenseRequestModal;
