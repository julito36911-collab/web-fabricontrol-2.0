import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnterpriseQuoteModal from '../components/EnterpriseQuoteModal';
import LicenseRequestModal from '../components/LicenseRequestModal';
import { Link } from 'react-router-dom';

function Precios() {
  const [isAnual, setIsAnual] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  return (
    <>
      <Header onRequestLicense={() => setShowLicenseModal(true)} />

      {/* HERO PRECIOS */}
      <section className="hero" style={{padding: '4rem 0 2rem'}}>
        <div className="container">
          <div className="text-center">
            <h1 style={{fontSize: '3rem', marginBottom: '1rem', color: 'white'}}>Planes que se Ajustan a tu Taller</h1>
            <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
              Sin contratos largos. Sin sorpresas. Cancela cuando quieras.
            </p>
          </div>

          {/* Toggle Mensual/Anual */}
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <div style={{display: 'inline-flex', background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '4px'}}>
              <button 
                onClick={() => setIsAnual(false)}
                style={{
                  padding: '12px 32px',
                  border: 'none',
                  background: !isAnual ? 'white' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                💳 Mensual
              </button>
              <button 
                onClick={() => setIsAnual(true)}
                style={{
                  padding: '12px 32px',
                  border: 'none',
                  background: isAnual ? 'white' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                💰 Anual <span style={{background: 'var(--accent)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', marginLeft: '4px'}}>Ahorra 20%</span>
              </button>
            </div>
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
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Selecciona abajo el plan que mejor se adapte a tu taller.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>2️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Realiza el Pago</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Tu suscripción es mensual y sin contratos forzosos.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>3️⃣</div>
                <h4 style={{color: 'var(--text-dark)', marginBottom: '0.5rem'}}>Recibe tu Código</h4>
                <p style={{color: 'var(--text-medium)', fontSize: '0.95rem'}}>Te enviaremos tu Licencia Única a tu correo en menos de 24 horas. Ingrésala en el software y continúa trabajando donde lo dejaste.</p>
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
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
            
            {/* PLAN TRIAL */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '2px solid var(--bg-gray)'}}>
              <div style={{background: 'var(--highlight)', color: 'var(--text-dark)', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                🆓 TRIAL
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                $0<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>/mes</span>
              </h3>
              <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>30 días gratis</p>
              
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
              
              <Link to="/descargar" className="btn btn-secondary btn-large" style={{width: '100%'}}>
                Prueba Gratis
              </Link>
            </div>

            {/* PLAN BÁSICO */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '2px solid var(--primary)'}}>
              <div style={{background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                💼 BÁSICO
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                ${isAnual ? '39' : '49'}<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>/mes</span>
              </h3>
              {isAnual ? (
                <p style={{color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600}}>
                  Ahorras $120/año
                </p>
              ) : (
                <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>
                  Para Talleres que Inician
                </p>
              )}
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Hasta <strong>3 usuarios</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Todas las funcionalidades completas</strong></span>
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
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', padding: '0.75rem', borderRadius: '6px', marginTop: '0.5rem'}}>
                  <span style={{color: '#dc2626'}}>✗</span> <span style={{color: '#dc2626', fontWeight: 600}}>Sin soporte técnico humano</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)'}}>
                  <span>•</span> <span>Solo email (sin respuesta garantizada)</span>
                </li>
              </ul>
              
              <a href="#" className="btn btn-primary btn-large" style={{width: '100%'}}>
                Comprar Licencia Básica
              </a>
            </div>

            {/* PLAN PRO */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '3px solid var(--accent)', transform: 'scale(1.05)'}}>
              <div style={{position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent)', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', fontWeight: 600}}>
                ⭐ MÁS POPULAR
              </div>
              <div style={{background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                🚀 PROFESIONAL
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                ${isAnual ? '103' : '129'}<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>/mes</span>
              </h3>
              {isAnual ? (
                <p style={{color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600}}>
                  Ahorras $312/año
                </p>
              ) : (
                <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>
                  Para Fábricas en Crecimiento
                </p>
              )}
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Hasta <strong>10 usuarios</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Todas las funcionalidades completas</strong></span>
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
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', padding: '0.75rem', borderRadius: '6px', marginTop: '0.5rem'}}>
                  <span style={{color: '#166534'}}>✓</span> <span style={{color: '#166534', fontWeight: 600}}>Soporte Técnico Humano (Email 24h)</span>
                </li>
              </ul>
              
              <a href="#" className="btn btn-accent btn-large" style={{width: '100%'}}>
                Comprar Licencia Pro
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
              <h4>¿Puedo cambiar de plan más tarde?</h4>
              <p>Sí, puedes actualizar o bajar de plan en cualquier momento.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Cómo funciona el trial de 30 días gratis?</h4>
              <p>Descargas el software, lo instalas y tienes 30 días completos para probarlo sin necesidad de tarjeta.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Qué pasa después del trial?</h4>
              <p>Si decides continuar, compras la licencia que prefieras y recibes tu código por email en 24h. Si no, simplemente dejas de usar el software.</p>
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
