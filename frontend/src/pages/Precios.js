import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Precios() {
  const [isAnual, setIsAnual] = useState(false);

  return (
    <>
      <Header />

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
                Probar Ahora
              </Link>
            </div>

            {/* PLAN BÁSICO */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '2px solid var(--primary)'}}>
              <div style={{background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                💼 BÁSICO
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                ${isAnual ? '23' : '29'}<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>/mes</span>
              </h3>
              {isAnual ? (
                <p style={{color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600}}>
                  Ahorras $72/año
                </p>
              ) : (
                <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>
                  Para talleres pequeños
                </p>
              )}
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Hasta <strong>5 usuarios</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Cotizaciones</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Órdenes de Producción</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Inventario</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Dashboard</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Máquinas y BOM</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>App Móvil PWA</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)'}}>
                  <span>•</span> <span>Soporte: Email 48h</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)'}}>
                  <span>•</span> <span>Límite: 100 órdenes/mes</span>
                </li>
              </ul>
              
              <a href="https://gumroad.com/l/fabricontrol-basic" className="btn btn-primary btn-large" style={{width: '100%'}} target="_blank" rel="noopener noreferrer">
                Comprar Ahora
              </a>
            </div>

            {/* PLAN PRO */}
            <div className="card pricing-card" style={{position: 'relative', padding: '2rem', textAlign: 'center', border: '3px solid var(--accent)', transform: 'scale(1.05)'}}>
              <div style={{position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent)', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-lg)', fontSize: '0.875rem', fontWeight: 600}}>
                ⭐ MÁS POPULAR
              </div>
              <div style={{background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: '0.875rem', padding: '8px 16px', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem'}}>
                🚀 PRO
              </div>
              <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-dark)'}}>
                ${isAnual ? '79' : '99'}<span style={{fontSize: '1rem', fontWeight: 400, color: 'var(--text-medium)'}}>/mes</span>
              </h3>
              {isAnual ? (
                <p style={{color: 'var(--accent)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600}}>
                  Ahorras $240/año
                </p>
              ) : (
                <p style={{color: 'var(--text-medium)', marginBottom: '2rem', fontSize: '0.95rem'}}>
                  Para talleres en crecimiento
                </p>
              )}
              
              <ul style={{textAlign: 'left', listStyle: 'none', marginBottom: '2rem', padding: 0}}>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Usuarios ilimitados</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span><strong>Todo del plan Básico</strong></span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Portal de Proyectos</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Piezas Paramétricas</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Chat IA con Gemini</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Permisos personalizados</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span style={{color: 'var(--success)'}}>✓</span> <span>Backup diario automático</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)'}}>
                  <span>•</span> <span>Soporte: Email 24h</span>
                </li>
                <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)'}}>
                  <span>•</span> <span>Sin límite de órdenes</span>
                </li>
              </ul>
              
              <a href="https://gumroad.com/l/fabricontrol-pro" className="btn btn-accent btn-large" style={{width: '100%'}} target="_blank" rel="noopener noreferrer">
                Comprar Ahora
              </a>
            </div>

          </div>

          {/* PLAN ENTERPRISE */}
          <div style={{marginTop: '4rem', textAlign: 'center'}}>
            <div className="card" style={{maxWidth: '900px', margin: '0 auto', padding: '3rem', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white'}}>
              <h2 style={{color: 'white', marginBottom: '1rem'}}>🏢 Enterprise</h2>
              <p style={{fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.95}}>
                Solución personalizada para fábricas grandes con necesidades específicas
              </p>
              <div className="grid grid-3" style={{marginBottom: '2rem'}}>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Instalación privada</h4>
                </div>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Capacitación incluida</h4>
                </div>
                <div>
                  <h4 style={{color: 'white', fontSize: '1rem'}}>✓ Soporte prioritario</h4>
                </div>
              </div>
              <Link to="/enterprise" className="btn btn-accent btn-large">
                Solicitar Cotización
              </Link>
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
              <h4>¿Cómo funciona el trial de 30 días?</h4>
              <p>Descargas el software, lo instalas y tienes 30 días completos para probarlo sin necesidad de tarjeta.</p>
            </div>
            <div className="card" style={{marginBottom: '1rem'}}>
              <h4>¿Qué pasa después del trial?</h4>
              <p>Si decides continuar, compras la licencia que prefieras. Si no, simplemente dejas de usar el software.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Precios;