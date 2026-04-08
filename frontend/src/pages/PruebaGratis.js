import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const txt = {
  es: {
    tag: "FABRICONTROL",
    title: "Solicitar 60 días de prueba gratis",
    sub: "Completá tus datos y te activamos el acceso al sistema completo sin costo por 60 días.",
    company: "Nombre de la empresa",
    name: "Nombre y apellido",
    email: "Email",
    message: "¿Qué necesitás resolver?",
    messagePh: "Contanos brevemente qué problema querés solucionar o qué funcionalidad te interesa...",
    submit: "Obtené 60 días de prueba gratis",
    sending: "Enviando...",
    success: "¡Solicitud enviada! Te contactamos en menos de 48 horas para activar tu prueba.",
    error: "Error al enviar. Intentá de nuevo o escribinos por WhatsApp.",
    wa: "Escribinos por WhatsApp",
  },
  he: {
    tag: "FABRICONTROL",
    title: "בקשו 60 ימי ניסיון חינם",
    sub: "מלאו את הפרטים ונפעיל לכם גישה מלאה למערכת ללא עלות למשך 60 יום.",
    company: "שם החברה",
    name: "שם מלא",
    email: "אימייל",
    message: "מה אתם צריכים לפתור?",
    messagePh: "ספרו לנו בקצרה איזו בעיה אתם רוצים לפתור או איזו פונקציונליות מעניינת אתכם...",
    submit: "קבלו 60 ימי ניסיון חינם",
    sending: "שולח...",
    success: "!הבקשה נשלחה! ניצור קשר תוך 48 שעות להפעלת הניסיון",
    error: ".שגיאה בשליחה. נסו שוב או כתבו לנו בוואטסאפ",
    wa: "כתבו לנו בוואטסאפ",
  }
};

function PruebaGratis() {
  const { language, isRtl } = useLanguage();
  const l = txt[language] || txt.es;

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(''); // 'success' | 'error' | ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    const summary = `═══ SOLICITUD DE PRUEBA GRATIS (60 DÍAS) ═══

Empresa: ${company || '-'}
Nombre: ${name || '-'}
Email: ${email || '-'}

¿Qué necesita resolver?
${message || '-'}`;

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://web-fabricontrol-2-0.onrender.com';
      const res = await fetch(`${backendUrl}/api/send-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, company, contactName: name, email })
      });
      if (!res.ok) throw new Error('Error');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[#111827] border border-[#1e293b] rounded-lg text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-colors text-sm";

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <Header />
      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm sm:text-base font-mono font-bold tracking-widest text-orange-400 uppercase">{l.tag}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">{l.title}</h1>
            <p className="text-gray-400 mt-3 text-sm">{l.sub}</p>
          </div>

          {status === 'success' ? (
            <div className="text-center space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8">
                <p className="text-green-400 text-lg font-bold mb-2">✅</p>
                <p className="text-green-400 font-semibold">{l.success}</p>
              </div>
              <a href="https://wa.me/972526489461" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-all text-sm">
                💬 {l.wa}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">{l.company}</label>
                <input className={inputClass} type="text" value={company} onChange={e => setCompany(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{l.name}</label>
                <input className={inputClass} type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{l.email}</label>
                <input className={inputClass} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{l.message}</label>
                <textarea className={`${inputClass} h-32 resize-none`} value={message} onChange={e => setMessage(e.target.value)} placeholder={l.messagePh} />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] disabled:opacity-50"
              >
                {sending ? `⏳ ${l.sending}` : l.submit}
              </button>
              {status === 'error' && <p className="text-center text-red-400 font-semibold text-sm">{l.error}</p>}
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PruebaGratis;
