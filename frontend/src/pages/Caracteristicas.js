import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Caracteristicas({ openLicenseModal }) {
  const modules = [
    {
      title: '📄 Cotizaciones Inteligentes',
      description: 'Genera presupuestos profesionales con cálculo automático de costos',
      features: [
        'Cálculo de materiales con desperdicio',
        'Tiempos de proceso por máquina',
        'Mano de obra y márgenes',
        'Conversión a orden con 1 clic',
        'PDFs profesionales personalizables'
      ],
      image: '/assets/img/screenshots/desktop/quotations-es.jpg'
    },
    {
      title: '🏭 Órdenes de Producción',
      description: 'Control visual completo del flujo de fabricación',
      features: [
        'Estados 100% configurables',
        'Asignación de piezas a máquinas',
        'BOM (Lista de Materiales)',
        'Historial de cambios',
        'Archivos adjuntos por orden'
      ],
      image: '/assets/img/screenshots/desktop/production-orders-es.jpg'
    },
    {
      title: '📦 Inventario con QR',
      description: 'Gestión inteligente de stock con tecnología QR',
      features: [
        'Alertas de stock mínimo',
        'Generación de etiquetas QR',
        'Escaneo con cámara del celular',
        'Trazabilidad completa',
        'Múltiples ubicaciones'
      ],
      image: '/assets/img/screenshots/desktop/inventory-es.jpg'
    },
    {
      title: '📋 Portal de Proyectos',
      description: 'Gestión colaborativa en tiempo real (ÚNICO)',
      features: [
        'Proyectos con tareas',
        'Asignación de responsables',
        'Comentarios con historial',
        'Archivos por proyecto/tarea',
        'Panel de actividad en vivo'
      ],
      image: '/assets/img/screenshots/desktop/projects-portal-es.jpg'
    },
    {
      title: '🧩 Piezas Paramétricas',
      description: 'Plantillas con variables que generan códigos automáticos',
      features: [
        'Variables personalizables',
        'Generación automática de códigos',
        'Ideal para productos repetitivos',
        'Ahorra tiempo en variaciones',
        'Único en el mercado'
      ],
      image: '/assets/img/screenshots/desktop/parametric-pieces-es.jpg'
    },
    {
      title: '🤖 Chat IA con Gemini',
      description: 'Asistente inteligente que conoce FabriControl',
      features: [
        'Responde 24/7',
        'Explica cada módulo',
        'Guía en procesos complejos',
        'Configuración simple',
        'API Key gratuita de Google'
      ],
      image: '/assets/img/screenshots/desktop/chat-ia-es.jpg'
    },
    {
      title: '⚙️ Gestión de Máquinas',
      description: 'Control de recursos de producción',
      features: [
        'Catálogo de máquinas',
        'Costos por hora/pieza',
        'Mantenimientos programados',
        'Historial de uso',
        'Eficiencia por máquina'
      ],
      image: '/assets/img/screenshots/desktop/machines-es.jpg'
    },
    {
      title: '🔐 Permisos y Roles',
      description: 'Control de acceso granular (Plan Pro)',
      features: [
        'Roles personalizables',
        'Permisos por módulo',
        'Permisos por acción',
        'Auditoría de accesos',
        'Múltiples niveles'
      ],
      image: '/assets/img/screenshots/desktop/permissions-es.jpg'
    },
    {
      title: '📊 Dashboard en Tiempo Real',
      description: 'Métricas clave de tu negocio',
      features: [
        'Órdenes por estado',
        'Ventas del mes',
        'Stock bajo',
        'Máquinas activas',
        'Gráficos interactivos'
      ],
      image: '/assets/img/screenshots/desktop/dashboard-es.jpg'
    },
    {
      title: '📱 App Móvil PWA',
      description: 'Para operarios de piso',
      features: [
        'iOS y Android',
        'Sin descarga de App Store',
        'Botones grandes',
        'Escaneo QR integrado',
        'Actualización de estados'
      ],
      image: '/assets/img/screenshots/mobile/mobile-home.jpg'
    }
  ];

  return (
    <>
      <Header onRequestLicense={openLicenseModal} />

      {/* HERO */}
      <section className="hero" style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h1 style={{color: 'white'}}>10 Módulos. 1 Sistema Completo.</h1>
          <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
            Todo lo que necesitas para gestionar tu taller desde cotización hasta entrega
          </p>
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="section">
        <div className="container">
          {modules.map((module, index) => (
            <div key={index} style={{marginBottom: '5rem'}}>
              <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{module.title}</h2>
                      <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                        {module.description}
                      </p>
                      <ul style={{listStyle: 'none', padding: 0}}>
                        {module.features.map((feature, idx) => (
                          <li key={idx} style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <span style={{color: 'var(--success)'}}>✓</span> <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                      <img src={module.image} alt={module.title} style={{width: '100%', height: 'auto', display: 'block'}} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                      <img src={module.image} alt={module.title} style={{width: '100%', height: 'auto', display: 'block'}} />
                    </div>
                    <div>
                      <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>{module.title}</h2>
                      <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                        {module.description}
                      </p>
                      <ul style={{listStyle: 'none', padding: 0}}>
                        {module.features.map((feature, idx) => (
                          <li key={idx} style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <span style={{color: 'var(--success)'}}>✓</span> <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white'}}>
        <div className="container text-center">
          <h2 style={{color: 'white', marginBottom: '1rem'}}>Prueba FabriControl 30 Días Gratis</h2>
          <p style={{fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95}}>
            Todos los módulos desbloqueados. Sin tarjeta de crédito.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/descargar" className="btn btn-accent btn-large">🆓 Descargar Ahora</Link>
            <Link to="/precios" className="btn btn-secondary btn-large" style={{borderColor: 'white', color: 'white'}}>Ver Planes</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Caracteristicas;
