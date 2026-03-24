import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnterpriseQuoteModal from '../components/EnterpriseQuoteModal';
import LicenseRequestModal from '../components/LicenseRequestModal';

const Precios = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  const HOTMART_LINK = "https://pay.hotmart.com/L103719113Q";
  const REGISTER_URL = "https://fabricontrol-1.emergent.host/register";
  const SYSTEM_URL = "https://fabricontrol-1.emergent.host/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      {/* BANNER DE OFERTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-amber-500 text-white text-center py-3 px-4 font-medium shadow-md">
        <span className="mr-2">🔥</span> Oferta de Lanzamiento: <span className="font-bold">$195/año</span> <span className="opacity-80 line-through text-sm">(precio normal $290)</span> - ¡Solo por tiempo limitado!
      </div>

      <main className="flex-grow">
        {/* HERO PRECIOS */}
        <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Planes que se Ajustan a tu Taller
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-medium">
              ☁️ 100% en la Nube - Sin instalación - Solo necesitas internet
            </p>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona FabriControl?</h2>
              <p className="text-lg text-gray-500">100% en la nube - Sin descargas ni instalaciones</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1️⃣", title: "Compra tu Licencia", desc: "Pago seguro con Hotmart. $195/año." },
                { step: "2️⃣", title: "Recibe tu Código", desc: "En máximo 24h recibirás tu código por email." },
                { step: "3️⃣", title: "Registra tu Empresa", desc: "Ingresa tu código y crea tu cuenta." },
                { step: "4️⃣", title: "¡Empieza a Trabajar!", desc: "Accede desde cualquier navegador móvil o PC." }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl hover:bg-indigo-50 transition-colors duration-300">
                  <div className="text-5xl mb-4">{item.step}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 max-w-md mx-auto bg-green-50 rounded-2xl p-4 text-center border border-green-100">
              <p className="text-green-800 font-semibold flex items-center justify-center gap-2">
                <span>☁️</span> Sin descargas, sin instalaciones. Solo necesitas internet.
              </p>
            </div>
          </div>
        </section>

        {/* TABLA DE PLANES */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* PLAN TRIAL */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="mb-8">
                  <span className="bg-gray-100 text-gray-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    🆓 Trial Gratis
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-5xl font-extrabold text-gray-900 mb-2">$0</h3>
                  <p className="text-gray-500 font-medium">30 días gratis para probar</p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-gray-700">
                  {[
                    "Usuarios ilimitados",
                    "<strong>TODOS</strong> los módulos",
                    "Sin límites de órdenes",
                    "Sin tarjeta de crédito",
                    "100% en la nube"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setShowLicenseModal(true)} 
                  className="w-full py-4 px-6 rounded-xl font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  Solicitar Trial Gratis
                </button>
              </div>

              {/* PLAN ANUAL - MEJOR VALOR */}
              <div className="bg-indigo-900 rounded-3xl shadow-2xl border-4 border-indigo-500 p-8 flex flex-col h-full relative transform scale-100 lg:scale-105 z-10 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] transition-all duration-300 text-white">
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    ⭐ Mejor Valor
                  </span>
                </div>
                <div className="mb-8 mt-2">
                  <span className="bg-indigo-800 text-indigo-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    💰 Pago Anual
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-5xl font-extrabold text-white mb-2 flex items-baseline">
                    $195<span className="text-xl font-medium text-indigo-300 ml-1">USD/año</span>
                  </h3>
                  <p className="text-indigo-300 font-medium bg-indigo-800/50 inline-block px-3 py-1 rounded-lg">
                    Equivale a solo $16.25/mes
                  </p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-indigo-50">
                  {[
                    "Usuarios ilimitados",
                    "<strong>TODOS</strong> los módulos incluidos",
                    "Cotizaciones e Inventario",
                    "Órdenes de Producción",
                    "Portal de Proyectos",
                    "<strong>Chat IA con Gemini</strong>",
                    "App Móvil PWA",
                    "Respaldos automáticos"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                  <li className="flex items-center gap-3 bg-green-500 bg-opacity-20 p-3 rounded-xl mt-4 border border-green-500/30">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-green-300 font-bold">Ahorra $95 vs pago en cuotas</span>
                  </li>
                </ul>
                
                <a 
                  href={HOTMART_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center py-4 px-6 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  Comprar Licencia Anual
                </a>
              </div>

              {/* PLAN EN CUOTAS */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="mb-8">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    💳 Pago en Cuotas
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-5xl font-extrabold text-gray-900 mb-2 flex items-baseline">
                    $290<span className="text-xl font-medium text-gray-400 ml-1">USD/año</span>
                  </h3>
                  <p className="text-gray-500 font-medium">Pago Inteligente (cuotas mensuales)</p>
                </div>
                
                <ul className="flex-grow space-y-4 mb-8 text-gray-700">
                  {[
                    "Mismas funciones que el anual",
                    "Usuarios ilimitados",
                    "<strong>TODOS</strong> los módulos",
                    "100% en la nube",
                    "Flexibilidad de pago mensual"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                  <li className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl mt-4 border border-amber-200">
                    <span className="text-amber-600 font-bold flex items-center gap-2">
                      <span>⚠️</span> Pagas $95 más que el anual
                    </span>
                  </li>
                </ul>
                
                <a 
                  href={HOTMART_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-center py-4 px-6 rounded-xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                >
                  Pagar en Cuotas
                </a>
              </div>

            </div>

            {/* PLAN ENTERPRISE */}
            <div className="mt-20">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white border border-gray-700 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500">
                <div className="inline-block bg-gray-800 text-gray-300 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-gray-600">
                  🏢 Para Grandes Operaciones
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Enterprise / Industrial</h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Solución a medida con desarrollo de módulos personalizados para necesidades específicas estructurales.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <h4 className="font-bold flex items-center gap-2"><svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Usuarios ilimitados</h4>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <h4 className="font-bold flex items-center gap-2"><svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Servidor dedicado</h4>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <h4 className="font-bold flex items-center gap-2"><svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Módulos a medida</h4>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowQuoteModal(true)} 
                  className="py-4 px-10 rounded-xl font-bold text-gray-900 bg-white hover:bg-gray-100 hover:scale-105 shadow-xl transition-all duration-300"
                >
                  Cotizar Solución Personalizada
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS NUBE */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">☁️ Sistema 100% en la Nube</h2>
              <p className="text-xl text-gray-500">Sin instalaciones. Sin complicaciones. Solo resultados.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-8 bg-gray-50 rounded-3xl hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-indigo-100">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">🌐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accede desde cualquier lugar</h3>
                <p className="text-gray-600 leading-relaxed">Casa, oficina, fábrica o de viaje. Solo necesitas internet y un navegador web.</p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-3xl hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-indigo-100">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">🔒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Datos siempre seguros</h3>
                <p className="text-gray-600 leading-relaxed">Servidores protegidos con respaldos automáticos. Nunca pierdas tu información vital.</p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-3xl hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-indigo-100">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">🔄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Actualizaciones automáticas</h3>
                <p className="text-gray-600 leading-relaxed">Siempre tienes la última versión sin hacer nada. Mejoras continuas incluidas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO RÁPIDA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500 opacity-5 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4 relative z-10">🎮 ¿Quieres ver el sistema antes de decidir?</h3>
              <p className="text-lg text-indigo-700/80 mb-8 relative z-10">Entra a nuestra demo con datos de ejemplo — sin registrarte</p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10 relative z-10">
                <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100 w-full sm:w-auto">
                  <span className="text-gray-500 text-sm block mb-1 font-medium text-left">Usuario:</span>
                  <code className="text-indigo-700 font-bold text-lg select-all">julito36911@gmail.com</code>
                </div>
                <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100 w-full sm:w-auto">
                  <span className="text-gray-500 text-sm block mb-1 font-medium text-left">Contraseña:</span>
                  <code className="text-indigo-700 font-bold text-lg select-all">password123</code>
                </div>
              </div>
              
              <a 
                href={SYSTEM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center py-4 px-8 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10"
              >
                Probar Demo Ahora 
                <svg className="w-5 h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-gray-500">Todo lo que necesitas saber sobre FabriControl</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "¿Necesito instalar algo?",
                  a: "<strong>No.</strong> FabriControl funciona 100% en la nube. Solo necesitas un navegador web (Chrome, Firefox, Edge, Safari) y conexión a internet. Accede desde tu computadora, tablet o celular en cualquier momento."
                },
                {
                  q: "¿Cómo funciona el trial de 30 días gratis?",
                  a: "Solicitas tu licencia de prueba, recibes tu código por email, te registras en el sistema y tienes 30 días completos para probarlo con todas sus funcionalidades. Todo en la nube, sin descargar nada."
                },
                {
                  q: "¿Puedo usar el sistema sin internet?",
                  a: "Se requiere conexión a internet persistente para usar FabriControl. Esta arquitectura garantiza que todos los usuarios de tu empresa vean la información en tiempo real y tus datos estén seguros en nuestros servidores con respaldos automáticos."
                },
                {
                  q: "¿Cuál es la diferencia entre pago anual y cuotas?",
                  a: "El <strong>pago anual ($195)</strong> es un pago único muy económico que te da acceso por 1 año completo. El <strong>pago en cuotas ($290)</strong> divide el pago en mensualidades para mayor flexibilidad, pero el costo total es $95 más elevado a lo largo del año."
                },
                {
                  q: "¿Dónde accedo al sistema una vez que compro?",
                  a: `Una vez que tengas tu código de licencia enviado a tu email, ve a <a href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-bold hover:underline">${REGISTER_URL}</a> para registrar tu empresa por primera vez. Luego siempre accederás directamente desde <a href="${SYSTEM_URL}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-bold hover:underline">${SYSTEM_URL}</a>.`
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="text-indigo-500 flex-shrink-0 mt-1">?</span>
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-7" dangerouslySetInnerHTML={{ __html: faq.a }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* MODALS */}
      <EnterpriseQuoteModal 
        isOpen={showQuoteModal} 
        onClose={() => setShowQuoteModal(false)} 
      />
      <LicenseRequestModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
      />

      <Footer />
    </div>
  );
};

export default Precios;
