import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnterpriseQuoteModal from '../components/EnterpriseQuoteModal';
import LicenseRequestModal from '../components/LicenseRequestModal';

function Precios() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  const HOTMART_LINK = "https://pay.hotmart.com/L103719113Q";

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
              Sin contratos largos. Sin sorpresas. Pago único anual.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE EXPLICATIVO */}
      <section className="section" style={{paddingTop: '3rem', paddingBottom: '1rem'}}>
        <div className="container">
          <div style={{maxWidth: '900px', margin: '0 auto', padding: '2.5rem', background: 'linear-gradient(135deg, #eef2ff 0%, #f9fafb 100%)', borderRadius: 'var(--radius-xl)', border: '2px solid #e0e7ff'}}>
            <h2 style={{textAlign: 'center', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.75rem'}}>¿Terminó tu prueba de 30 días gratis?</h2>
            <p style={{textAlign: 'center', color: 'var(--text-medium)', marginBottom: '2.5rem', fontSize: '1.1rem'}}>Activa tu licencia permanente en 3 pasos:</p>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>1️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Elige tu Plan</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Pago único anual o en cuotas mensuales.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>2️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Realiza el Pago</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Pago seguro con Hotmart. Tarjeta o PayPal.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>3️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Recibe tu Código</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Tu Licencia Única llega a tu correo en menos de 24 horas.</p>
              </div>
            </div>
            
            <div style={{marginTop: '1.5rem', textAlign: 'center', padding: '1rem', background: '#dcfce7', borderRadius: 'var(--radius-md)'}}>
              <p style={{margin: 0, color: '#166534', fontWeight: 600}}>✅ ¡No pierdes tus datos! Todo se mantiene intacto.</p>
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
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Funciones completas</span>
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
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Piezas Paramétricas</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Chat IA con Gemini</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>App Móvil PWA</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Soporte por Email</span>
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
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Soporte por Email</span>
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
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Gestor de cuenta dedicado</h4>
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

      {/* FAQ PRECIOS */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Preguntas Frecuentes sobre Precios</h2>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Cuál es la diferencia entre pago anual y cuotas?</h4>
              <p>El <strong>pago anual ($195)</strong> es un pago único que te da acceso por 1 año completo. El <strong>pago en cuotas ($290)</strong> divide el pago en mensualidades pero cuesta $95 más en total.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Cómo funciona el trial de 30 días gratis?</h4>
              <p>Descargas el software, lo instalas y tienes 30 días completos para probarlo sin necesidad de tarjeta.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Qué pasa después del trial?</h4>
              <p>Si decides continuar, compras la licencia en Hotmart y recibes tu código por email en 24h. Si no, simplemente dejas de usar el software.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Pierdo mis datos al activar la licencia?</h4>
              <p><strong>No.</strong> Todos tus datos (cotizaciones, órdenes, inventario) se mantienen intactos al activar tu licencia.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem', background: 'linear-gradient(135deg, #eef2ff 0%, #f9fafb 100%)', border: '2px solid var(--primary)'}}>
              <h4 style={{color: 'var(--primary)'}}>📚 ¿Quieres saber más sobre la instalación?</h4>
              <p>Lee nuestra <a href="/documentacion.html" style={{color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline'}}>Documentación Técnica completa</a> con información sobre MongoDB, opciones de servidor (Local/LAN/Nube), y arquitectura del sistema.</p>
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
