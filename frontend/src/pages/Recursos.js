import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { CalculadoraPlegado, CalculadoraMateriales } from '../components/Calculadoras';
import CalculadoraInercia from '../components/CalculadoraInercia';
import { CotizacionTools } from '../components/CotizacionTools';
import { CalculadoraROI, OrdenFabricacionPDF } from '../components/AdministracionTools';
import VideoAIHub from '../components/VideoAIHub';

const locales = {
  es: {
    heroTitle: "Engineering & Business Hub",
    heroSub: "Herramientas exclusivas y recursos de gestión para dueños de talleres.",
    cat1: "✂️ Corte (Cutting)",
    cat2: "📐 Plegado (Bending)",
    cat3: "🔩 Materiales (Inventory)",
    cat4: "💰 Cotización (Quoting)",
    cat5: "📊 Administración (Management)",
    cat6: "📺 Videoteca (IA Videos)",
    bannerTitle: "¿Quieres automatizar esto?",
    bannerSub: "Prueba Fabricontrol Full por 30 días gratis y deja que el sistema calcule todo por ti.",
    bannerBtn: "Prueba Gratis",
    useTool: "Usar Herramienta",
    download: "Descargar Documento",
    
    // Cutting
    c1i1_t: "Optimizador de Nesting DeepNest",
    c1i1_d: "Ahorra hasta un 30% de material. Sube tus DXF y optimiza el corte para Plasma y Láser.",
    
    // Quoting
    c4i1_t: "Calculadora de Costo por Minuto",
    c4i1_d: "Mide el costo real de taller incluyendo insumos, mano de obra y margen.",
    c4i2_t: "Estimador de Tiempo de Producción",
    c4i2_d: "Calcula horas hombre y brinda fechas de entrega certeras a clientes.",
    
    // Management
    c5i1_t: "Calculadora de ROI (Retorno de Inversión)",
    c5i1_d: "Descubre cuánto ahorras automatizando vs el trabajo en Excel.",
    c5i2_t: "Plantilla de Orden de Trabajo",
    c5i2_d: "Formato en PDF ideal para estandarizar la producción en el piso."
  },
  en: {
    heroTitle: "Engineering & Business Hub",
    heroSub: "Exclusive tools and management resources for workshop owners.",
    cat1: "✂️ Cutting",
    cat2: "📐 Bending",
    cat3: "🔩 Materials",
    cat4: "💰 Quoting",
    cat5: "📊 Management",
    cat6: "📺 Video Hub (AI Videos)",
    bannerTitle: "Want to automate this?",
    bannerSub: "Try Fabricontrol Full for 30 days free and let the system calculate everything for you.",
    bannerBtn: "Try for Free",
    useTool: "Use Tool",
    download: "Download Document",
    
    c1i1_t: "DeepNest Nesting Optimizer",
    c1i1_d: "Save up to 30% on materials. Upload DXFs and optimize cuts for Plasma and Laser.",
    
    c4i1_t: "Cost Per Minute Calculator",
    c4i1_d: "Measure true shop cost including supplies, labor, and margin.",
    c4i2_t: "Production Time Estimator",
    c4i2_d: "Calculate man-hours and give accurate delivery dates.",
    
    c5i1_t: "ROI Calculator",
    c5i1_d: "Discover how much you save by automating vs working in Excel.",
    c5i2_t: "Work Order Template",
    c5i2_d: "Ideal PDF format to standardize floor production."
  },
  he: {
    heroTitle: "Engineering & Business Hub",
    heroSub: "כלים ומשאבי ניהול בלעדיים לבעלי מפעלים.",
    cat1: "✂️ חיתוך (Cutting)",
    cat2: "📐 כיפוף (Bending)",
    cat3: "🔩 חומרים (Inventory)",
    cat4: "💰 הצעות מחיר (Quoting)",
    cat5: "📊 ניהול (Management)",
    cat6: "📺 ספריית וידאו (AI Videos)",
    bannerTitle: "רוצה לעשות אוטומציה לזה?",
    bannerSub: "נסה את Fabricontrol בחינם ל-30 יום ותן למערכת לחשב הכל עבורך.",
    bannerBtn: "נסה בחינם",
    useTool: "השתמש בכלי",
    download: "הורד מסמך",
    
    c1i1_t: "אופטימיזציית Nesting עם DeepNest",
    c1i1_d: "חסוך עד 30% בחומר. העלה את קבצי ה-DXF וייעל את החיתוך עבור פלזמה ולייזר.",
    
    c4i1_t: "מחשבון עלות לדקה",
    c4i1_d: "מדוד עלות אמיתית של המפעל, כולל אספקה, עבודה ושולי רווח.",
    c4i2_t: "מחשבון זמן ייצור",
    c4i2_d: "חשב שעות עבודה וספק תאריכי אספקה מדויקים ללקוחות.",
    
    c5i1_t: "מחשבון החזר השקעה (ROI)",
    c5i1_d: "גלה כמה אתה חוסך באוטומציה לעומת עבודה באקסל.",
    c5i2_t: "תבנית הזמנת עבודה (Work Order)",
    c5i2_d: "פורמט PDF אידיאלי לתקינה בייצור וברצפת העבודה."
  }
};

const RecursosTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { language, isRtl } = useLanguage();
  const l = locales[language] || locales.es;

  const categories = [
    { id: 0, title: l.cat1 },
    { id: 1, title: l.cat2 },
    { id: 2, title: l.cat3 },
    { id: 3, title: l.cat4 },
    { id: 4, title: l.cat5 },
    { id: 5, title: l.cat6 }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return (
          <div className={`grid grid-cols-1 gap-8 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="bg-white/10 rounded-2xl p-8 border border-white/10 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_4px_15px_rgba(6,182,212,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-cyan-400/20 transition-all duration-500"></div>
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-cyan-400">✂️</span> {l.c1i1_t}
              </h3>
              <p className="text-gray-300 text-lg font-medium mb-8 leading-relaxed max-w-3xl">
                {l.c1i1_d}
              </p>
              <a href="https://deepnest.io/" target="_blank" rel="noopener noreferrer" className="inline-block py-4 px-8 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-cyan-600 hover:to-blue-600 border border-white/10 text-white rounded-xl font-bold transition-all duration-300 shadow-lg text-lg">
                🖥️ Ir a DeepNest.io
              </a>
            </div>
          </div>
        );
      case 1:
        return <CalculadoraPlegado />;
      case 2:
        return (
          <div className="space-y-8">
            <CalculadoraMateriales />
            <CalculadoraInercia />
          </div>
        );
      case 3:
        return <CotizacionTools labels={l} />;
      case 4:
        return (
          <div className="space-y-10">
            <CalculadoraROI />
            <OrdenFabricacionPDF />
          </div>
        );
      case 5:
        return <VideoAIHub />
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-[#1a202c] to-slate-900 ${isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}`}>
      <Header />

      <main className="flex-grow pt-24 pb-20">
        
        {/* HERO TITLE */}
        <section className={`px-4 sm:px-6 lg:px-8 text-center mb-16 ${isRtl ? 'text-center' : 'text-center'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              {l.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 opacity-90 max-w-3xl mx-auto font-medium">
              {l.heroSub}
            </p>
          </div>
        </section>

        {/* CONTENEDOR TABS Y CONTENIDO */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden shadow-cyan-900/20">
            
            {/* TABS HEADER */}
            <div className={`flex flex-wrap border-b border-white/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 min-w-[140px] md:min-w-[180px] py-4 px-3 font-semibold text-sm md:text-base transition-all duration-300 outline-none hover:bg-white/5
                    ${activeTab === idx 
                      ? 'text-cyan-400 bg-white/10 border-b-2 border-cyan-400' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 md:p-12">
              
              {renderTabContent()}

              {/* CONVERSION BANNER */}
              <div className={`mt-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'flex-row-reverse text-right md:text-right' : 'text-left'}`}>
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                    <span className="text-cyan-400">⚡</span> {l.bannerTitle}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {l.bannerSub}
                  </p>
                </div>
                <div>
                  <Link to="/precios" className="inline-block py-4 px-8 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 border border-orange-400/50 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] whitespace-nowrap">
                    🚀 {l.bannerBtn}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default RecursosTabs;
