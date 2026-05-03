import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    title: "Preguntas Frecuentes",
    sub: "Resuelve tus dudas rápidamente",
    questions: [
      { q: '¿Cómo funciona Fabricontrol?', a: 'Fabricontrol es un ERP en la nube que centraliza todas las operaciones de tu taller de forma automatizada.' },
      { q: '¿Es seguro?', a: 'Totalmente. Utilizamos servidores cifrados de última generación (Google Firebase) con respaldos diarios para mantener tus datos a salvo.' },
      { q: '¿Soporte en español?', a: 'Sí, ofrecemos soporte nativo en español para todos los talleres de Latinoamérica y España.' }
    ]
  },
  en: {
    title: "Frequently Asked Questions",
    sub: "Resolve your questions quickly",
    questions: [
      { q: 'How does it work?', a: 'Fabricontrol is a cloud ERP that centralizes all your workshop operations efficiently and automatically.' },
      { q: 'Is it secure?', a: 'Absolutely. We use state-of-the-art encrypted servers with daily automated backups to keep your data safe.' },
      { q: 'Global support?', a: 'Yes, we provide 24/7 global support for all our clients worldwide.' }
    ]
  },
  he: {
    title: "שאלות נפוצות",
    sub: "פתור את כל השאלות שלך במהירות",
    questions: [
      { q: 'איך זה עובד?', a: 'Fabricontrol היא מערכת ERP בענן המרכזת את כל פעולות המפעל שלך בצורה יעילה ואוטומטית.' },
      { q: 'האם זה מאובטח?', a: 'בהחלט. אנו משתמשים בשרתים מוצפנים מתקדמים עם גיבויים אוטומטיים יומיים לשמירה יציבה על הנתונים שלך.' },
      { q: 'תמיכה בעברית?', a: 'כן, אנו מספקים תמיכה מלאה וייעודית בשפה העברית למפעלים וחברות בפריסה עולמית.' }
    ]
  }
};

const FAQ = () => {
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;
  const [openIndex, setOpenIndex] = useState(null);

  // Scroll smooth anchor offset: scroll-mt-32 keeps it from touching the sticky header
  return (
    <section id="faq" className={`py-12 scroll-mt-32 ${isRtl ? 'dir-rtl text-right font-hebrew' : 'dir-ltr text-left font-sans'}`}>
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">{l.title}</h2>
          <p className="text-xl text-cyan-300 font-medium">{l.sub}</p>
        </div>

        <div className="space-y-4">
          {l.questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white/5 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-white/10' : 'border-white/10 hover:bg-white/10'}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                {/* RTL Support: Flex container reversed if isRtl */}
                <div className={`p-6 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <h3 className={`text-xl font-bold text-white leading-snug flex-1 ${isRtl ? 'text-right ml-4' : 'mr-4'}`}>
                    {item.q}
                  </h3>
                  
                  {/* Arrow Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400 transition-all duration-300 border border-cyan-500/20 ${isOpen ? 'rotate-180 bg-cyan-500 text-white shadow-lg' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                
                {/* Toggled Content */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className={`text-gray-300 text-lg leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
