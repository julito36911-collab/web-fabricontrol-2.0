import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Enterprise() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    empleados: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mailto fallback
    const subject = encodeURIComponent(`Cotización Enterprise - ${formData.empresa}`);
    const body = encodeURIComponent(`
Nombre: ${formData.nombre}
Empresa: ${formData.empresa}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Número de Empleados: ${formData.empleados}

Mensaje:
${formData.mensaje}
    `);
    window.location.href = `mailto:enterprise@fabricontrol.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h1 style={{color: 'white'}}>Soluciones Enterprise</h1>
          <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
            Instalación privada, capacitación incluida y soporte prioritario
          </p>
        </div>
      </section>

      {/* BENEFICIOS ENTERPRISE */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">¿Qué Incluye Enterprise?</h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--primary)', color: 'white', margin: '0 auto'}}>🏢</div>
              <h3 className="feature-title">Instalación Privada</h3>
              <p>Servidor dedicado en tu infraestructura o nube privada. Control total de tus datos.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--accent)', color: 'white', margin: '0 auto'}}>👨‍🏫</div>
              <h3 className="feature-title">Capacitación On-Site</h3>
              <p>Nuestro equipo viaja a tu fábrica para capacitar a tu personal completo.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--secondary)', color: 'white', margin: '0 auto'}}>⚡</div>
              <h3 className="feature-title">Soporte Prioritario</h3>
              <p>WhatsApp directo con nuestro equipo técnico. Respuesta en menos de 4 horas.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--primary)', color: 'white', margin: '0 auto'}}>🔧</div>
              <h3 className="feature-title">Personalización</h3>
              <p>Adaptamos módulos específicos a tus procesos únicos de manufactura.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--accent)', color: 'white', margin: '0 auto'}}>📊</div>
              <h3 className="feature-title">Reportes Custom</h3>
              <p>Creamos reportes y dashboards específicos para tus KPIs de negocio.</p>
            </div>
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--secondary)', color: 'white', margin: '0 auto'}}>🔗</div>
              <h3 className="feature-title">Integraciones</h3>
              <p>Conectamos FabriControl con tu ERP, CRM o sistemas existentes via API.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="section section-light">
        <div className="container">
          <h2 className="text-center mb-4">Enterprise es Ideal Para:</h2>
          <div className="grid grid-2" style={{maxWidth: '900px', margin: '0 auto'}}>
            <div className="card">
              <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>✓ Fábricas con +50 empleados</h4>
              <p>Múltiples turnos, departamentos y líneas de producción que necesitan coordinación centralizada.</p>
            </div>
            <div className="card">
              <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>✓ Talleres con múltiples sedes</h4>
              <p>Operaciones distribuidas que requieren visibilidad unificada de todas las ubicaciones.</p>
            </div>
            <div className="card">
              <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>✓ Empresas con procesos únicos</h4>
              <p>Flujos de trabajo especializados que no encajan en software genérico.</p>
            </div>
            <div className="card">
              <h4 style={{color: 'var(--primary)', marginBottom: '1rem'}}>✓ Requisitos de seguridad estrictos</h4>
              <p>Necesidad de hosting privado, auditorías y compliance específico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="section">
        <div className="container">
          <div className="card" style={{maxWidth: '700px', margin: '0 auto', padding: '3rem'}}>
            <h2 className="text-center mb-4">Solicita tu Cotización</h2>
            <p className="text-center" style={{color: 'var(--text-medium)', marginBottom: '2rem'}}>
              Cuéntanos sobre tu fábrica y te preparamos una propuesta personalizada
            </p>
            
            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Empresa *
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Email Corporativo *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Número de Empleados *
                </label>
                <select
                  name="empleados"
                  value={formData.empleados}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Selecciona...</option>
                  <option value="20-50">20-50 empleados</option>
                  <option value="51-100">51-100 empleados</option>
                  <option value="101-200">101-200 empleados</option>
                  <option value="200+">Más de 200 empleados</option>
                </select>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>
                  Cuéntanos sobre tu proyecto
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="¿Qué desafíos enfrentas actualmente? ¿Qué esperas lograr con FabriControl?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--bg-gray)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-accent btn-large" style={{width: '100%'}}>
                📧 Enviar Solicitud
              </button>

              <p style={{fontSize: '0.875rem', color: 'var(--text-medium)', marginTop: '1rem', textAlign: 'center'}}>
                Te responderemos en menos de 24 horas hábiles
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACTO DIRECTO */}
      <section className="section section-gray">
        <div className="container text-center">
          <h3 style={{marginBottom: '1rem'}}>¿Prefieres Hablar Directamente?</h3>
          <p style={{color: 'var(--text-medium)', marginBottom: '2rem'}}>
            Nuestro equipo Enterprise está disponible para atenderte
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="mailto:enterprise@fabricontrol.com" className="btn btn-primary">
              📧 enterprise@fabricontrol.com
            </a>
            <a href="tel:+52XXXXXXXXXX" className="btn btn-secondary">
              📱 WhatsApp Enterprise
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Enterprise;
