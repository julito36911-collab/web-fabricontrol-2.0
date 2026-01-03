import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Descargar() {
  return (
    <>
      <Header />

      {/* HERO DESCARGA */}
      <section className="hero" style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h1 style={{color: 'white'}}>Descarga FabriControl</h1>
          <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '600px', margin: '0 auto', opacity: 0.95}}>
            Instalación simple en Windows. Listo para usar en 5 minutos.
          </p>
        </div>
      </section>

      {/* DESCARGA PRINCIPAL */}
      <section className="section">
        <div className="container">
          <div className="card" style={{maxWidth: '700px', margin: '0 auto', padding: '3rem', textAlign: 'center'}}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>💾</div>
            <h2 style={{marginBottom: '1rem'}}>FabriControl v1.0</h2>
            <p style={{color: 'var(--text-medium)', marginBottom: '2rem'}}>Para Windows 10/11 (64-bit)</p>
            
            <div style={{marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-lg)'}}>
              <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '1rem'}}>
                <div>
                  <div style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)'}}>~120 MB</div>
                  <div style={{fontSize: '0.875rem', color: 'var(--text-medium)'}}>Tamaño</div>
                </div>
                <div>
                  <div style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)'}}>v1.0.0</div>
                  <div style={{fontSize: '0.875rem', color: 'var(--text-medium)'}}>Versión</div>
                </div>
                <div>
                  <div style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)'}}>Enero 2026</div>
                  <div style={{fontSize: '0.875rem', color: 'var(--text-medium)'}}>Actualizado</div>
                </div>
              </div>
            </div>

            <a href="https://fabricontrol.com/download/FabriControl-Installer.exe" className="btn btn-accent btn-large" style={{width: '100%', marginBottom: '1rem'}}>
              ⬇️ Descargar Instalador (120 MB)
            </a>
            
            <p style={{fontSize: '0.875rem', color: 'var(--text-medium)'}}>
              ✅ Sin virus · ✅ Sin adware · ✅ Instalación limpia
            </p>
          </div>
        </div>
      </section>

      {/* REQUISITOS DEL SISTEMA */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Requisitos del Sistema</h2>
          <div className="grid grid-2" style={{maxWidth: '900px', margin: '0 auto'}}>
            <div className="card">
              <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>✅ Mínimos</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>• Windows 10 (64-bit)</li>
                <li style={{padding: '0.5rem 0'}}>• 4 GB RAM</li>
                <li style={{padding: '0.5rem 0'}}>• 500 MB espacio en disco</li>
                <li style={{padding: '0.5rem 0'}}>• Conexión a internet</li>
                <li style={{padding: '0.5rem 0'}}>• Resolución 1366x768</li>
              </ul>
            </div>
            <div className="card">
              <h4 style={{color: 'var(--accent)', marginBottom: '1rem'}}>⭐ Recomendados</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>• Windows 11 (64-bit)</li>
                <li style={{padding: '0.5rem 0'}}>• 8 GB RAM o más</li>
                <li style={{padding: '0.5rem 0'}}>• 1 GB espacio en disco</li>
                <li style={{padding: '0.5rem 0'}}>• Banda ancha estable</li>
                <li style={{padding: '0.5rem 0'}}>• Resolución 1920x1080</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PASOS DE INSTALACIÓN */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">Instalación en 3 Pasos</h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--primary)', color: 'white', margin: '0 auto'}}>1️⃣</div>
              <h3 className="feature-title">Descarga</h3>
              <p>Haz clic en el botón de descarga y guarda el instalador.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--accent)', color: 'white', margin: '0 auto'}}>2️⃣</div>
              <h3 className="feature-title">Instala</h3>
              <p>Ejecuta el archivo .exe y sigue el asistente de instalación.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--secondary)', color: 'white', margin: '0 auto'}}>3️⃣</div>
              <h3 className="feature-title">¡Listo!</h3>
              <p>Abre FabriControl y empieza tu trial de 30 días gratis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOPORTE */}
      <section className="section section-gray">
        <div className="container">
          <div className="card" style={{maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '2rem'}}>
            <h3 style={{marginBottom: '1rem'}}>¿Necesitas Ayuda?</h3>
            <p style={{marginBottom: '2rem', color: 'var(--text-medium)'}}>Nuestro equipo está listo para asistirte</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href="mailto:soporte@fabricontrol.com" className="btn btn-primary">📧 Email Soporte</a>
              <Link to="/faq" className="btn btn-secondary">❓ Ver FAQ</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Descargar;