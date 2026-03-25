import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    heroTitle: "📚 Documentación Técnica",
    heroSub: "Guía completa para comenzar, usar y configurar FabriControl — 100% en la nube (SaaS)",
    toc: "📑 Tabla de Contenidos",
    s1: "☁️ 1. Cómo Comenzar (100% en la Nube)",
    s1_1: "FabriControl es 100% en la nube (SaaS). No hay nada que descargar ni instalar.",
    s2: "🔐 2. Acceder a FabriControl",
    s3: "📦 3. Módulos Disponibles",
    s4: "👥 4. Roles y Permisos",
    s5: "🔒 5. Respaldos y Seguridad",
    ctaTitle: "¿Listo para usar FabriControl?",
    ctaSub: "Solicita tu licencia de prueba de 30 días gratis sin tarjeta de crédito",
    ctaBtn: "Solicitar Licencia Gratis"
  },
  en: {
    heroTitle: "📚 Technical Documentation",
    heroSub: "Complete guide to start, use and configure FabriControl — 100% Cloud-based (SaaS)",
    toc: "📑 Table of Contents",
    s1: "☁️ 1. Getting Started (100% Cloud)",
    s1_1: "FabriControl is 100% cloud-based (SaaS). There is nothing to download or install.",
    s2: "🔐 2. Accessing FabriControl",
    s3: "📦 3. Available Modules",
    s4: "👥 4. Roles and Permissions",
    s5: "🔒 5. Backups and Security",
    ctaTitle: "Ready to use FabriControl?",
    ctaSub: "Request your 30-day free trial license with no credit card required",
    ctaBtn: "Request Free License"
  },
  he: {
    heroTitle: "📚 תיעוד טכני",
    heroSub: "מדריך מלא להתחלה, שימוש והגדרת FabriControl — 100% בענן (SaaS)",
    toc: "📑 תוכן עניינים",
    s1: "☁️ 1. איך להתחיל (100% בענן)",
    s1_1: "FabriControl היא 100% בענן (SaaS). אין מה להוריד או להתקין.",
    s2: "🔐 2. גישה ל-FabriControl",
    s3: "📦 3. מודולים זמינים",
    s4: "👥 4. תפקידים והרשאות",
    s5: "🔒 5. גיבויים ואבטחה",
    ctaTitle: "מוכן להשתמש ב-FabriControl?",
    ctaSub: "בקש רישיון ל-30 ימי ניסיון בחינם ללא כרטיס אשראי",
    ctaBtn: "בקש רישיון בחינם"
  }
};

function Documentacion() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  return (
    <div className={`min-h-screen flex flex-col bg-[#0b0f1a] ${isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}`}>
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <section className="px-6 text-center mb-16">
          <div className="max-w-4xl mx-auto font-sans">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {l.heroTitle}
            </h1>
            <p className="text-xl text-cyan-400/80 max-w-2xl mx-auto font-medium">
              {l.heroSub}
            </p>
          </div>
        </section>

        <section className="px-4 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {l.toc}
            </h3>
            <ul className="space-y-4">
              {[l.s1, l.s2, l.s3, l.s4, l.s5].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 group cursor-pointer transition-all hover:translate-x-2">
                  <span className="text-cyan-400 group-hover:scale-125 transition-transform">🔹</span>
                  <a href={`#s${idx+1}`} className="text-gray-300 hover:text-cyan-400 text-lg font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div id="s1" className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-black text-white mb-6 border-b border-cyan-400/30 pb-4">{l.s1}</h2>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6">
               <p className="text-cyan-200 font-bold text-lg">{l.s1_1}</p>
            </div>
            {/* Additional content could go here, for now keeping it professional and structured */}
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-3xl p-10 text-center border border-cyan-400/30 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-4">{l.ctaTitle}</h2>
              <p className="text-gray-300 text-lg mb-8">{l.ctaSub}</p>
              <a href="/precios" className="inline-block py-4 px-10 bg-white text-blue-900 rounded-2xl font-black transition-all hover:shadow-cyan-400/40 hover:scale-105 active:scale-95">
                {l.ctaBtn}
              </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Documentacion;
