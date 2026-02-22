import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnterpriseQuoteModal from '../components/EnterpriseQuoteModal';
import LicenseRequestModal from '../components/LicenseRequestModal';

function Precios() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  const HOTMART_LINK = "https://pay.hotmart.com/L103719113Q";
  const REGISTER_URL = "https://fabricontrol-1.emergent.host/register";
  const SYSTEM_URL = "https://fabricontrol-1.emergent.host/";

  return (
    <>
      <Header />

      {/* BANNER DE OFERTA */}
      <div style={{background: 'linear-gradient(90deg, var(--accent) 0%, #f59e0b 100%)', color: 'white', textAlign: 'center', padding: '0.75rem', fontWeight: 600}}>
        🔥 Oferta de Lanzamiento: $195/año (precio normal $290) - ¡Solo por tiempo limitado!
      </div>

      {/* HERO PRECIOS */}
      <section className="hero" style={{padding: '4rem 0 2rem'}}>
        <div className="container">
          <div className="text-center">
            <h1 style={{fontSize: '3rem', marginBottom: '1rem', color: 'white'}}>Planes que se Ajustan a tu Taller</h1>
            <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
              ☁️ 100% en la Nube - Sin instalación - Solo necesitas internet
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA - MODELO NUBE */}
      <section className="section" style={{paddingTop: '3rem', paddingBottom: '1rem'}}>
        <div className="container">
          <div style={{maxWidth: '900px', margin: '0 auto', padding: '2.5rem', background: 'linear-gradient(135deg, #eef2ff 0%, #f9fafb 100%)', borderRadius: 'var(--radius-xl)', border: '2px solid #e0e7ff'}}>
            <h2 style={{textAlign: 'center', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.75rem'}}>¿Cómo funciona FabriControl?</h2>
            <p style={{textAlign: 'center', color: 'var(--text-medium)', marginBottom: '2.5rem', fontSize: '1.1rem'}}>100% en la nube - Sin descargas ni instalaciones</p>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>1️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Compra tu Licencia</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Pago seguro con Hotmart. $195/año.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>2️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Recibe tu Código</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>En máximo 24h recibirás tu código por email.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>3️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Registra tu Empresa</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Ingresa tu código y crea tu cuenta.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>4️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>¡Empieza a Trabajar!</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Accede desde cualquier navegador.</p>
              </div>
            </div>
            
            <div style={{marginTop: '1.5rem', textAlign: 'center', padding: '1rem', background: '#dcfce7', borderRadius: 'var(--radius-md)'}}>
              <p style={{margin: 0, color: '#166534', fontWeight: 600}}>☁️ Sin descargas, sin instalaciones. Solo necesitas internet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLA DE PLANES */}
      <section className="section" style={{paddingTop: '2rem'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto'}}>
            
            {/* PLAN TRIAL */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '2px solid var(--bg-gray)'}}>
              <div style={{background: 'var(--highlight)', color: 'var(--text-dark)', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                🆓 TRIAL GRATIS
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                $0
              </h3>
              <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>30 días gratis para probar</p>
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Usuarios ilimitados</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>TODOS</strong> los módulos</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Sin límites de órdenes</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Sin tarjeta de crédito</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>100% en la nube</span>
                </li>
              </ul>
              
              <button onClick={() => setShowLicenseModal(true)} className="btn btn-secondary btn-large" style={{width: '100%'}}>
                Solicitar Trial Gratis
              </button>
            </div>

            {/* PLAN ANUAL - MEJOR VALOR */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '3px solid var(--accent)', transform: 'scale(1.05)'}}>
              <div style={{position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent)', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', fontWeight: 600}}>
                ⭐ MEJOR VALOR
              </div>
              <div style={{background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                💰 PAGO ANUAL
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                $195<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>USD/año</span>
              </h3>
              <p style={{color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: 600}}>
                Equivale a solo $16.25/mes
              </p>
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Usuarios ilimitados</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>TODOS</strong> los módulos incluidos</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Cotizaciones e Inventario</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Órdenes de Producción</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Portal de Proyectos</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Chat IA con Gemini</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>App Móvil PWA</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Respaldos automáticos</span>
                </li>
                <li style={{padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', borderRadius: '6px', marginTop: '0.5rem'}}>
                  <span style={{color: '#166534'}}>✓</span> <span style={{color: '#166534', fontWeight: 600}}>Ahorra $95 vs pago en cuotas</span>
                </li>
              </ul>
              
              <a href={HOTMART_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-large" style={{width: '100%', display: 'block', textDecoration: 'none'}}>
                Comprar Licencia Anual
              </a>
            </div>

            {/* PLAN EN CUOTAS */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '2px solid var(--primary)'}}>
              <div style={{background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                💳 PAGO EN CUOTAS
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                $290<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>USD/año</span>
              </h3>
              <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>
                Pago Inteligente (cuotas mensuales)
              </p>
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Mismas funciones que el plan anual</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Usuarios ilimitados</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>TODOS</strong> los módulos</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>100% en la nube</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Flexibilidad de pago mensual</span>
                </li>
                <li style={{padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef3c7', borderRadius: '6px', marginTop: '0.5rem'}}>
                  <span style={{color: '#92400e'}}>⚠️</span> <span style={{color: '#92400e', fontWeight: 600}}>Pagas $95 más que el anual</span>
                </li>
              </ul>
              
              <a href={HOTMART_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large" style={{width: '100%', display: 'block', textDecoration: 'none'}}>
                Pagar en Cuotas
              </a>
            </div>

          </div>

          {/* PLAN ENTERPRISE */}
          <div style={{marginTop: '4rem', textAlign: 'center'}}>
            <div className="card" style={{maxWidth: '900px', margin: '0 auto', padding: '3rem', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white'}}>
              <h2 style={{color: 'white', marginBottom: '0.5rem'}}>🏢 Enterprise</h2>
              <p style={{fontSize: '1.125rem', marginBottom: '0.5rem', opacity: 0.95, fontWeight: 600}}>Industrial & Personalizado</p>
              <p style={{fontSize: '1rem', marginBottom: '2rem', opacity: 0.9}}>Solución a medida con desarrollo de módulos personalizados</p>
              <div className="grid grid-3" style={{marginBottom: '2rem'}}>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Usuarios ilimitados</h4>
                </div>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Servidor dedicado</h4>
                </div>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Módulos a medida</h4>
                </div>
              </div>
              <button 
                onClick={() => setShowQuoteModal(true)} 
                className="btn btn-accent btn-large"
                style={{border: 'none', cursor: 'pointer'}}
              >
                Cotizar Solución
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN NUBE */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 style={{color: 'var(--primary)'}}>☁️ Sistema 100% en la Nube</h2>
            <p style={{color: 'var(--text-medium)'}}>Sin instalaciones. Sin complicaciones. Solo resultados.</p>
          </div>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🌐</div>
              <h3 style={{color: 'var(--primary)'}}>Accede desde cualquier lugar</h3>
              <p>Casa, oficina, fábrica o de viaje. Solo necesitas internet y un navegador.</p>
            </div>
            
            <div className="card text-center">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔒</div>
              <h3 style={{color: 'var(--primary)'}}>Datos siempre seguros</h3>
              <p>Servidores protegidos con respaldos automáticos. Nunca pierdas información.</p>
            </div>
            
            <div className="card text-center">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔄</div>
              <h3 style={{color: 'var(--primary)'}}>Actualizaciones automáticas</h3>
              <p>Siempre tienes la última versión sin hacer nada. Mejoras continuas incluidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ PRECIOS */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Necesito instalar algo?</h4>
              <p><strong>No.</strong> FabriControl funciona 100% en la nube. Solo necesitas un navegador web (Chrome, Firefox, Edge, Safari) y conexión a internet. Accede desde tu computadora, tablet o celular.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Cómo funciona el trial de 30 días gratis?</h4>
              <p>Solicitas tu licencia de prueba, recibes tu código por email, te registras en el sistema y tienes 30 días completos para probarlo. Todo en la nube, sin descargar nada.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Puedo usar el sistema sin internet?</h4>
              <p>Se requiere conexión a internet para usar FabriControl. Tus datos están seguros en nuestros servidores con respaldos automáticos diarios.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Cuál es la diferencia entre pago anual y cuotas?</h4>
              <p>El <strong>pago anual ($195)</strong> es un pago único que te da acceso por 1 año completo. El <strong>pago en cuotas ($290)</strong> divide el pago en mensualidades pero cuesta $95 más en total.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Dónde accedo al sistema?</h4>
              <p>Una vez que tengas tu código, ve a <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent)', fontWeight: 600}}>{REGISTER_URL}</a> para registrar tu empresa. Luego accede desde <a href={SYSTEM_URL} target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent)', fontWeight: 600}}>{SYSTEM_URL}</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Cotización Enterprise */}
      <EnterpriseQuoteModal 
        isOpen={showQuoteModal} 
        onClose={() => setShowQuoteModal(false)} 
      />

      {/* Modal de Solicitud de Licencia */}
      <LicenseRequestModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
      />

      <Footer />
    </>
  );
}

export default Precios;
