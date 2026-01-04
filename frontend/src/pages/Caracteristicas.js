import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';

function Caracteristicas() {
  return (
    <>
      <Header />
      
      {/* HERO */}
      <section className="hero">
        <div className="container text-center">
          <h1>Características Poderosas para tu Taller</h1>
          <p style={{fontSize: '1.25rem', maxWidth: '800px', margin: '1rem auto'}}>
            FabriControl incluye todo lo que necesitas para gestionar tu negocio de metalurgia de forma profesional
          </p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section">
        <div className="container">
          
          <div className="features-grid">
            
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Cotizaciones Inteligentes</h3>
              <p>Crea presupuestos profesionales en minutos con cálculos automáticos de materiales, mano de obra y márgenes.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Plantillas personalizables</li>
                <li>✓ Cálculo automático de costos</li>
                <li>✓ Envío por email directo</li>
                <li>✓ Conversión a orden de trabajo</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">🏭</div>
              <h3>Órdenes de Producción</h3>
              <p>Gestiona todo el flujo de fabricación desde el diseño hasta la entrega final.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Estados personalizables</li>
                <li>✓ Seguimiento en tiempo real</li>
                <li>✓ Asignación de operarios</li>
                <li>✓ Fotos de progreso</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Inventario con QR</h3>
              <p>Control total de materiales con códigos QR y alertas de stock mínimo.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Escaneo QR móvil</li>
                <li>✓ Alertas de stock bajo</li>
                <li>✓ Múltiples ubicaciones</li>
                <li>✓ Historial de movimientos</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Gestión de Clientes</h3>
              <p>Base de datos completa con historial de proyectos y comunicación centralizada.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Ficha completa de cliente</li>
                <li>✓ Historial de trabajos</li>
                <li>✓ Notas y documentos</li>
                <li>✓ Contacto directo</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Piezas Paramétricas</h3>
              <p>Biblioteca de componentes estándar con dimensiones ajustables para cotizar más rápido.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Biblioteca predefinida</li>
                <li>✓ Cálculo automático de peso</li>
                <li>✓ Añadir a cotizaciones</li>
                <li>✓ Crear piezas personalizadas</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Reportes y Análisis</h3>
              <p>Dashboards en tiempo real con las métricas clave de tu negocio.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Ventas por período</li>
                <li>✓ Proyectos activos</li>
                <li>✓ Rentabilidad por cliente</li>
                <li>✓ Exportar a Excel</li>
              </ul>
            </div>

            {/* Feature 7 */}
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Roles y Permisos</h3>
              <p>Control de acceso granular para proteger información sensible.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ Administrador total</li>
                <li>✓ Vendedor (solo cotizaciones)</li>
                <li>✓ Operario (solo producción)</li>
                <li>✓ Contabilidad (reportes)</li>
              </ul>
            </div>

            {/* Feature 8 */}
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Aplicación Móvil</h3>
              <p>Accede desde cualquier dispositivo, en cualquier momento y lugar.</p>
              <ul style={{textAlign: 'left', marginTop: '1rem'}}>
                <li>✓ iOS y Android</li>
                <li>✓ Escaneo de QR</li>
                <li>✓ Fotos de progreso</li>
                <li>✓ Notificaciones push</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SCREENSHOTS SECTION */}
      <section className="section" style={{background: 'var(--bg-light)'}}>
        <div className="container">
          <h2 className="section-title text-center">Vista Previa de la Plataforma</h2>
          <p className="section-subtitle text-center">Haz clic en cualquier imagen para verla ampliada</p>

          <div style={{display: 'grid', gap: '2rem', marginTop: '3rem'}}>
            
            {/* Dashboard */}
            <div>
              <h3 style={{marginBottom: '1rem'}}>📊 Dashboard Principal</h3>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/dashboard-es.jpg" alt="Dashboard - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>

            {/* Cotizaciones */}
            <div>
              <h3 style={{marginBottom: '1rem'}}>📋 Módulo de Cotizaciones</h3>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/quotations-es.jpg" alt="Cotizaciones - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>

            {/* Órdenes */}
            <div>
              <h3 style={{marginBottom: '1rem'}}>🏭 Órdenes de Producción</h3>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/production-orders-es.jpg" alt="Órdenes de Producción - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>

            {/* Inventario */}
            <div>
              <h3 style={{marginBottom: '1rem'}}>📦 Inventario con QR</h3>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/inventory-es.jpg" alt="Inventario - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>

            {/* Proyectos */}
            <div>
              <h3 style={{marginBottom: '1rem'}}>📂 Portal de Proyectos</h3>
              <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
                <ImageLightbox src="/assets/img/screenshots/desktop/projects-portal-es.jpg" alt="Proyectos - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 style={{marginBottom: '1rem'}}>¿Listo para Probar FabriControl?</h2>
          <p style={{fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.8}}>
            30 días de prueba gratuita. Sin tarjeta de crédito.
          </p>
          <a href="/precios" className="btn btn-accent btn-large">Solicitar Licencia Gratis</a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Caracteristicas;