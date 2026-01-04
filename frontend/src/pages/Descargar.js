import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Descargar() {
  return (
    <>
      <Header />
      
      <section className="hero" style={{padding: '4rem 0 2rem'}}>
        <div className="container text-center">
          <h1 style={{fontFamily: 'Montserrat', fontSize: '3rem', color: 'white', marginBottom: '1rem'}}>
            📥 Descargar FabriControl
          </h1>
          <p style={{fontSize: '1.25rem', color: 'white', opacity: 0.95, maxWidth: '700px', margin: '0 auto'}}>
            Descarga el instalador y comienza a usar FabriControl en minutos
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{maxWidth: '900px'}}>
          
          <div className="card" style={{textAlign: 'center', padding: '3rem', marginBottom: '2rem'}}>
            <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>🎉 ¡Ya casi está!</h2>
            <p style={{fontSize: '1.125rem', marginBottom: '2rem', color: 'var(--text-medium)'}}>
              Antes de descargar, necesitas <strong>solicitar tu licencia de 30 días gratis</strong>
            </p>
            
            <div style={{background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '2px solid #86efac'}}>
              <h3 style={{color: '#166534', marginTop: 0}}>✅ Incluye 30 Días GRATIS</h3>
              <ul style={{textAlign: 'left', listStyle: 'none', paddingLeft: 0, maxWidth: '500px', margin: '0 auto'}}>
                <li>🎁 Todas las funciones completas</li>
                <li>👥 Sin límite de usuarios durante el trial</li>
                <li>💳 Sin tarjeta de crédito</li>
                <li>📧 Recibes tu código en menos de 24h</li>
              </ul>
            </div>

            <Link to="/precios" className="btn btn-accent btn-large" style={{fontSize: '1.25rem', padding: '1.25rem 3rem'}}>
              📋 Solicitar Licencia Gratis
            </Link>
            
            <p style={{marginTop: '1.5rem', color: 'var(--text-medium)', fontSize: '0.95rem'}}>
              Después de solicitar tu licencia, recibirás un email con el link de descarga
            </p>
          </div>

          <div className="card" style={{padding: '2rem'}}>
            <h3 style={{marginTop: 0}}>📦 ¿Qué incluye el instalador?</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
              <div>
                <h4 style={{color: 'var(--primary)'}}>⚡ Frontend</h4>
                <p style={{fontSize: '0.95rem', color: 'var(--text-medium)'}}>Interfaz web completa (React)</p>
              </div>
              <div>
                <h4 style={{color: 'var(--primary)'}}>🔧 Backend</h4>
                <p style={{fontSize: '0.95rem', color: 'var(--text-medium)'}}>Servidor local (Python/FastAPI)</p>
              </div>
              <div>
                <h4 style={{color: 'var(--primary)'}}>🗄️ MongoDB</h4>
                <p style={{fontSize: '0.95rem', color: 'var(--text-medium)'}}>Base de datos incluida</p>
              </div>
            </div>
          </div>

          <div className="card" style={{padding: '2rem', marginTop: '2rem'}}>
            <h3 style={{marginTop: 0}}>💻 Requisitos del Sistema</h3>
            <ul style={{fontSize: '1rem', lineHeight: 1.8}}>
              <li><strong>Sistema Operativo:</strong> Windows 10 o superior</li>
              <li><strong>Procesador:</strong> Intel Core i3 o equivalente</li>
              <li><strong>RAM:</strong> 4 GB mínimo (8 GB recomendado)</li>
              <li><strong>Disco:</strong> 10 GB libres mínimo</li>
              <li><strong>Internet:</strong> Requerido para validar licencia al iniciar sesión</li>
            </ul>
          </div>

          <div style={{textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f9fafb', borderRadius: 'var(--radius-lg)'}}>
            <h3 style={{color: 'var(--primary)'}}>❓ ¿Necesitas ayuda?</h3>
            <p style={{marginBottom: '1rem'}}>Consulta nuestra documentación técnica completa</p>
            <a href="/documentacion.html" className="btn btn-secondary">Ver Documentación</a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Descargar;
