import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnterpriseQuoteModal from '../components/EnterpriseQuoteModal';
import LicenseRequestModal from '../components/LicenseRequestModal';
import FAQ from '../components/FAQ';
import { useLanguage } from '../contexts/LanguageContext';

const locales = {
  es: {
    banner: 'Oferta de Lanzamiento: ',
    bannerSub: ' - ¡Solo por tiempo limitado!',
    title: 'Planes que se Ajustan a tu Taller',
    subtitle: '☁️ 100% en la Nube - Sin instalación - Solo necesitas internet',
    trialBadge: '🆓 Trial Gratis',
    trialSub: '30 días gratis para probar',
    f1: 'Usuarios ilimitados',
    f2: '<strong>TODOS</strong> los módulos',
    f3: 'Sin límites de órdenes',
    f4: 'Sin tarjeta de crédito',
    f5: '100% en la nube',
    reqTrial: 'Solicitar Trial Gratis',
    annSub: 'USD/año',
    annEquiv: 'Equivale a solo $16.25/mes',
    f2_1: '<strong>TODOS</strong> los módulos incluidos',
    f2_2: 'Cotizaciones e Inventario',
    f2_3: 'Órdenes de Producción',
    f2_4: 'Portal de Proyectos',
    f2_5: '<strong>Chat IA con Gemini</strong>',
    f2_6: 'App Móvil PWA',
    f2_7: 'Respaldos automáticos',
    save95: 'Ahorra $95 vs pago en cuotas',
    buyAnn: 'Comprar Licencia Anual',
    moBadge: '💳 Pago en Cuotas',
    moSub: 'Pago Inteligente (cuotas mensuales)',
    moF1: 'Mismas funciones que el anual',
    moF2: 'Flexibilidad de pago mensual',
    pay95: 'Pagas $95 más que el anual',
    buyMo: 'Pagar en Cuotas'
  },
  en: {
    banner: 'Launch Offer: ',
    bannerSub: ' - Limited time only!',
    title: 'Plans that Fit your Workshop',
    subtitle: '☁️ 100% Cloud-based - No installation - Just internet needed',
    trialBadge: '🆓 Free Trial',
    trialSub: '30 days free to try',
    f1: 'Unlimited users',
    f2: '<strong>ALL</strong> modules',
    f3: 'No order limits',
    f4: 'No credit card required',
    f5: '100% cloud-based',
    reqTrial: 'Request Free Trial',
    annSub: 'USD/year',
    annEquiv: 'Equals to only $16.25/month',
    f2_1: '<strong>ALL</strong> modules included',
    f2_2: 'Quotes & Inventory',
    f2_3: 'Production Orders',
    f2_4: 'Projects Portal',
    f2_5: '<strong>AI Chat with Gemini</strong>',
    f2_6: 'PWA Mobile App',
    f2_7: 'Automatic backups',
    save95: 'Save $95 vs monthly installments',
    buyAnn: 'Buy Annual License',
    moBadge: '💳 Installments',
    moSub: 'Smart Pay (monthly installments)',
    moF1: 'Same features as annual plan',
    moF2: 'Monthly payment flexibility',
    pay95: 'You pay $95 more than annual',
    buyMo: 'Pay in Installments'
  },
  he: {
    banner: 'מבצע השקה: ',
    bannerSub: ' - לזמן מוגבל בלבד!',
    title: 'תוכניות שמותאמות למפעל שלך',
    subtitle: '☁️ 100% בענן - ללא התקנה - רק אינטרנט',
    trialBadge: '🆓 ניסיון חינם',
    trialSub: '30 ימים חינם לניסיון',
    f1: 'משתמשים ללא הגבלה',
    f2: '<strong>כל</strong> המודולים',
    f3: 'ללא הגבלת הזמנות',
    f4: 'ללא כרטיס אשראי',
    f5: '100% בענן',
    reqTrial: 'בקש ניסיון חינם',
    annSub: 'שנתי',
    annEquiv: 'שווה ערך ל-$16.25 לחודש',
    f2_1: '<strong>כל</strong> המודולים כלולים',
    f2_2: 'הצעות מחיר ומלאי',
    f2_3: 'הזמנות ייצור',
    f2_4: 'פורטל פרויקטים',
    f2_5: '<strong>צ\'אט AI עם Gemini</strong>',
    f2_6: 'אפליקציה ניידת PWA',
    f2_7: 'גיבויים אוטומטיים',
    save95: 'חסוך $95 לעומת תשלומים',
    buyAnn: 'רכוש רישיון שנתי',
    moBadge: '💳 תשלומים',
    moSub: 'תשלום חכם (תשלומים חודשיים)',
    moF1: 'אותן תכונות כמו השנתי',
    moF2: 'גמישות תשלום חודשי',
    pay95: 'משלמים $95 יותר מהשנתי',
    buyMo: 'שלם בתשלומים'
  }
};

const Precios = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('anual');
  const { t, language, isRtl } = useLanguage();
  
  const l = locales[language] || locales.es;
  const HOTMART_LINK = "https://pay.hotmart.com/L103719113Q?bid=1774630501240";

  const handleOpenModal = (plan = 'anual') => {
    setSelectedPlan(plan);
    setShowLicenseModal(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-[#1a202c] to-slate-800 ${isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}`}>
      <Header />

      {/* BANNER DE OFERTA */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center py-3 px-4 font-medium shadow-md">
        <span className="mr-2">🔥</span> 
        {l.banner}
        <span className="font-bold">$195</span> 
        <span className="opacity-80 line-through text-sm mx-1">($290)</span> 
        {l.bannerSub}
      </div>

      <main className="flex-grow pt-24 pb-20">
        
        {/* TITULAR */}
        <section className={`px-4 sm:px-6 lg:px-8 mb-16 ${isRtl ? 'text-center' : 'text-center'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              {l.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
              {l.subtitle}
            </p>
          </div>
        </section>

        {/* TABLA DE PLANES */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-center ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              
              {/* PLAN TRIAL */}
              <div className={`bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-8 flex flex-col h-full hover:-translate-y-2 hover:bg-white/15 transition-all duration-300`}>
                <div className="mb-8">
                  <span className="bg-white/20 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide border border-cyan-400/30">
                    {l.trialBadge}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-5xl font-extrabold text-white mb-2">$0</h3>
                  <p className="text-gray-300 font-medium">{l.trialSub}</p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-gray-300">
                  {[l.f1, l.f2, l.f3, l.f4, l.f5].map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleOpenModal('por-decidir')} 
                  className="w-full py-4 px-6 rounded-xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:shadow-md transition-all duration-300"
                >
                  {l.reqTrial}
                </button>
              </div>

              {/* PLAN ANUAL - MEJOR VALOR */}
              <div className={`bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 ring-2 ring-cyan-400 p-8 flex flex-col h-full relative transform scale-100 lg:scale-105 z-10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 text-white`}>
                <div className={`absolute top-0 ${isRtl ? 'left-8' : 'right-8'} transform -translate-y-1/2`}>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {t('plan_best_value')}
                  </span>
                </div>
                <div className="mb-8 mt-2">
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide border border-cyan-400/30">
                    💰 {t('plan_annual')}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className={`text-5xl font-extrabold text-white mb-2 flex items-baseline ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
                    $195<span className={`text-xl font-medium text-gray-300 ${isRtl ? 'mr-1' : 'ml-1'}`}>{l.annSub}</span>
                  </h3>
                  <p className="text-cyan-300 font-medium bg-cyan-900/30 inline-block px-3 py-1 rounded-lg border border-cyan-500/20">
                    {l.annEquiv}
                  </p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-gray-200">
                  {[l.f1, l.f2_1, l.f2_2, l.f2_3, l.f2_4, l.f2_5, l.f2_6, l.f2_7].map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                  <li className={`flex items-center gap-3 bg-orange-500/20 p-3 rounded-xl mt-4 border border-orange-500/30 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-orange-300 font-bold">{l.save95}</span>
                  </li>
                </ul>
                
                <a 
                  href={HOTMART_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                >
                  {l.buyAnn}
                </a>
              </div>

              {/* PLAN EN CUOTAS */}
              <div className={`bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-white/10 p-8 flex flex-col h-full hover:-translate-y-2 hover:bg-white/15 transition-all duration-300`}>
                <div className="mb-8">
                  <span className="bg-white/10 text-gray-300 border border-white/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    {l.moBadge}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className={`text-5xl font-extrabold text-white mb-2 flex items-baseline ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
                    $290<span className={`text-xl font-medium text-gray-400 ${isRtl ? 'mr-1' : 'ml-1'}`}>{l.annSub}</span>
                  </h3>
                  <p className="text-gray-400 font-medium">{l.moSub}</p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-gray-300">
                  {[l.moF1, l.f1, l.f2, l.f5, l.moF2].map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                  <li className={`flex items-center gap-3 bg-red-500/10 p-3 rounded-xl mt-4 border border-red-500/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-red-400 font-bold flex items-center gap-2">
                      <span>⚠️</span> {l.pay95}
                    </span>
                  </li>
                </ul>
                
                <a 
                  href={HOTMART_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center py-4 px-6 rounded-xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:text-cyan-400 transition-all duration-300"
                >
                  {l.buyMo}
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* MODALS */}
      <EnterpriseQuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
      <LicenseRequestModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
        initialPlan={selectedPlan}
      />

      {/* SECCIÓN DE PREGUNTAS FRECUENTES INYECTADA */}
      <div className="border-t border-white/10 mt-10">
        <FAQ />
      </div>

      <Footer />
    </div>
  );
};

export default Precios;
