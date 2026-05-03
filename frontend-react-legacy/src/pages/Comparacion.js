import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    heroTitle: "📊 FabriControl vs Competencia",
    heroSub: "Comparación completa de características y precios con los principales ERPs del mercado",
    feature: "Característica",
    price: "💰 Precio/año",
    spanish: "🇪🇸 Español Nativo",
    efficiency: "📚 Curva de Aprendizaje",
    parametric: "🔧 Piezas Paramétricas",
    ai: "🤖 Chat IA Integrado",
    mobile: "📱 App Móvil",
    hosting: "☁️ Hosting",
    support: "🆘 Soporte Técnico",
    ctaTitle: "¿Listo para probar FabriControl?",
    ctaSub: "30 días gratis, sin tarjeta de crédito",
    ctaBtn: "Solicitar Licencia Gratis"
  },
  en: {
    heroTitle: "📊 FabriControl vs Competitors",
    heroSub: "Full comparison of features and pricing with market-leading ERPs",
    feature: "Feature",
    price: "💰 Price/year",
    spanish: "🇪🇸 Native Spanish",
    efficiency: "📚 Learning Curve",
    parametric: "🔧 Parametric Parts",
    ai: "🤖 Integrated AI Chat",
    mobile: "📱 Mobile App",
    hosting: "☁️ Hosting",
    support: "🆘 Technical Support",
    ctaTitle: "Ready to try FabriControl?",
    ctaSub: "30 days free, no credit card required",
    ctaBtn: "Request Free License"
  },
  he: {
    heroTitle: "📊 FabriControl מול המתחרים",
    heroSub: "השוואה מלאה של תכונות ומחירים מול מובילי השוק במערכות ERP",
    feature: "תכונה",
    price: "💰 מחיר לשנה",
    spanish: "🇪🇸 ספרדית כשפת אם",
    efficiency: "📚 עקומת למידה",
    parametric: "🔧 חלקים פרמטריים",
    ai: "🤖 צ'אט AI מובנה",
    mobile: "📱 אפליקציית מובייל",
    hosting: "☁️ אירוח (Hosting)",
    support: "🆘 תמיכה טכנית",
    ctaTitle: "מוכן לנסות את FabriControl?",
    ctaSub: "30 ימי ניסיון חינם, ללא כרטיס אשראי",
    ctaBtn: "בקש רישיון בחינם"
  }
};

function Comparacion() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  const comparisonData = [
    { name: l.price, fc: "$195", odoo: "$600+", katana: "$1,200+", erpnext: "$150+" },
    { name: l.spanish, fc: "✓", odoo: "⚠", katana: "✗", erpnext: "⚠" },
    { name: l.efficiency, fc: "2-3 dias", odoo: "2-4 semanas", katana: "1 semana", erpnext: "2-3 semanas" },
    { name: l.parametric, fc: "✓", odoo: "✗", katana: "✗", erpnext: "✗" },
    { name: l.ai, fc: "✓ (Gemini)", odoo: "✗", katana: "✗", erpnext: "✗" },
    { name: l.mobile, fc: "✓", odoo: "⚠ ($ extra)", katana: "⚠ ($ extra)", erpnext: "✗" },
    { name: l.hosting, fc: "Cloud", odoo: "Cloud", katana: "Cloud", erpnext: "Both" },
    { name: l.support, fc: "24h Email", odoo: "Paid Extra", katana: "Email+Chat", erpnext: "Forums" },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-[#0b0f1a] ${isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}`}>
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <section className="px-6 text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {l.heroTitle}
            </h1>
            <p className="text-xl text-cyan-400/80 max-w-2xl mx-auto font-medium">
              {l.heroSub}
            </p>
          </div>
        </section>

        <section className="px-4 max-w-7xl mx-auto">
          <div className="overflow-x-auto bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8">
            <table className={`w-full text-white border-separate border-spacing-x-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="bg-cyan-600/20 text-cyan-400">
                  <th className="p-6 text-xl font-black rounded-tl-3xl">{l.feature}</th>
                  <th className="p-6 text-xl font-black bg-cyan-500 text-white text-center rounded-t-3xl border-t-4 border-cyan-300">FabriControl</th>
                  <th className="p-6 text-xl font-black text-center">Odoo</th>
                  <th className="p-6 text-xl font-black text-center">Katana</th>
                  <th className="p-6 text-xl font-black text-center rounded-tr-3xl">ERPNext</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                    <td className="p-6 font-bold border-r border-white/5">{row.name}</td>
                    <td className="p-6 text-center bg-cyan-500/10 font-black text-cyan-400 text-2xl border-x border-cyan-400/20">{row.fc}</td>
                    <td className="p-6 text-center opacity-60 font-bold">{row.odoo}</td>
                    <td className="p-6 text-center opacity-60 font-bold">{row.katana}</td>
                    <td className="p-6 text-center opacity-60 font-bold">{row.erpnext}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl p-10 text-center border border-orange-400/30 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-4">{l.ctaTitle}</h2>
              <p className="text-orange-100 text-lg mb-8">{l.ctaSub}</p>
              <a href="/precios" className="inline-block py-4 px-10 bg-white text-orange-600 rounded-2xl font-black transition-all hover:shadow-orange-400/40 hover:scale-105 active:scale-95">
                {l.ctaBtn}
              </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Comparacion;
