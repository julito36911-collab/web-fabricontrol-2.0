import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';

function Caracteristicas() {
  return (
    <>
      <Header />
      
      {/* HERO */}
      <section className="hero" style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h1 style={{color: 'white', fontFamily: 'Montserrat', fontSize: '3rem'}}>10 Módulos. 1 Sistema Completo.</h1>
          <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
            Todo lo que necesitas para gestionar tu taller desde la cotización hasta la entrega
          </p>
        </div>
      </section>

      {/* MODULES */}
      <section className="section">
        <div className="container">
          
          {/* Cotizaciones Inteligentes */}
          <div style={{marginBottom: '5rem'}}>
            <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
              <div>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>📄 Cotizaciones Inteligentes</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  Genera presupuestos profesionales con cálculo automático de costos
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Costos de materiales (con desperdicio)</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Tiempos de proceso por máquina</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Mano de obra y margen de ganancia</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Convertir a orden con un clic</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/quotations-es.jpg" alt="Módulo de Cotizaciones" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

          {/* Órdenes de Producción */}
          <div style={{marginBottom: '5rem'}}>
            <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/production-orders-es.jpg" alt="Órdenes de Producción" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <div>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>🏭 Órdenes de Producción Visuales</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  Control completo del flujo de fabricación
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Estados 100% personalizables</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Asignación de piezas a máquinas</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>BOM completo (Bill of Materials)</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Historial de cambios y archivos adjuntos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Inventario con QR */}
          <div style={{marginBottom: '5rem'}}>
            <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
              <div>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>📦 Inventario con Códigos QR</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  Control inteligente de stock
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Alertas automáticas de stock bajo</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Generación de etiquetas QR</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Escaneo rápido con cámara del celular</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Trazabilidad completa de movimientos</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/inventory-es.jpg" alt="Inventario con QR" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

          {/* Portal de Proyectos */}
          <div style={{marginBottom: '5rem'}}>
            <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/projects-portal-es.jpg" alt="Portal de Proyectos" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <div>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>📂 Portal de Proyectos</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  Gestiona múltiples proyectos simultáneamente
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Vista tipo Kanban o lista</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Seguimiento de avance por etapas</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Asignación de responsables</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Documentos y fotos adjuntas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <div style={{marginBottom: '5rem'}}>
            <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
              <div>
                <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>📊 Dashboard en Tiempo Real</h2>
                <p style={{fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-medium)'}}>
                  Todas tus métricas en un solo lugar
                </p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Ventas y cotizaciones del mes</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Proyectos activos y próximas entregas</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Rentabilidad y márgenes</span>
                  </li>
                  <li style={{padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{color: 'var(--success)'}}>✓</span> <span>Exportar reportes a Excel</span>
                  </li>
                </ul>
              </div>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/dashboard-es.jpg" alt="Dashboard" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white'}}>
        <div className="container text-center">
          <h2 style={{color: 'white', marginBottom: '1rem'}}>¿Listo para Transformar tu Taller?</h2>
          <p style={{fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.95}}>
            30 días de prueba gratuita. Sin tarjeta de crédito.
          </p>
          <a href="/precios" className="btn btn-accent btn-large" style={{background: 'white', color: 'var(--primary)'}}>Solicitar Licencia Gratis</a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Caracteristicas;