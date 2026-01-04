import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>El ERP que tu Taller Merece, al Precio que Puedes Pagar</h1>
            <p>Controla cotizaciones, producción e inventario desde <strong>$49/mes</strong>. Sin complicaciones.</p>
            <div className="hero-cta">
              <Link to="/descargar" className="btn btn-accent btn-large">🆓 Prueba 30 Días GRATIS</Link>
              <Link to="/precios" className="btn btn-secondary btn-large">Ver Planes</Link>
            </div>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '0.95rem'}}>
              ✅ Sin tarjeta de crédito · ✅ Acceso completo · ✅ Sin compromisos
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Mira FabriControl en Acción</h2>
            <p style={{color: 'var(--text-medium)', fontSize: '1.125rem'}}>
              Dashboard en tiempo real con todas tus métricas
            </p>
          </div>
          <div style={{maxWidth: '1100px', margin: '0 auto'}}>
            <div style={{borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)'}}>
              <img src="/assets/img/screenshots/desktop/dashboard-es.jpg" alt="Dashboard FabriControl - Vista Principal" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>¿Por Qué Elegir FabriControl?</h2>
            <p style={{color: 'var(--text-medium)', fontSize: '1.125rem'}}>
              Diseñado específicamente para talleres latinoamericanos
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--primary)', color: 'white', margin: '0 auto'}}>⚡</div>
              <h3 className="feature-title">Cotiza 50% Más Rápido</h3>
              <p>Cálculo automático de costos de materiales y máquinas. Genera PDFs profesionales en minutos.</p>
            </div>
            
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--accent)', color: 'white', margin: '0 auto'}}>📊</div>
              <h3 className="feature-title">Nunca Pierdas una Orden</h3>
              <p>Seguimiento visual de cada proyecto en tiempo real. Estados personalizables según tu flujo.</p>
            </div>
            
            <div className="card text-center">
              <div className="feature-icon" style={{background: 'var(--secondary)', color: 'white', margin: '0 auto'}}>📱</div>
              <h3 className="feature-title">Operarios Conectados</h3>
              <p>App móvil para actualizar estados desde el piso de producción. Funciona en cualquier celular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS PRINCIPALES */}
      <section className="section section-light" id="caracteristicas">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Todo lo que Necesitas en un Solo Sistema</h2>
          </div>
          
          <div className="grid grid-2" style={{gap: '3rem', alignItems: 'center'}}>
            {/* Feature 1 */}
            <div>
              <h3 style={{color: 'var(--primary)'}}>📄 Cotizaciones Inteligentes</h3>
              <p>Genera presupuestos profesionales con cálculo automático de:</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>✓ Costos de materiales (con desperdicio)</li>
                <li style={{padding: '0.5rem 0'}}>✓ Tiempos de proceso por máquina</li>
                <li style={{padding: '0.5rem 0'}}>✓ Mano de obra y margen de ganancia</li>
                <li style={{padding: '0.5rem 0'}}>✓ Conversión a orden con un clic</li>
              </ul>
            </div>
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <img src="/assets/img/screenshots/desktop/quotations-es.jpg" alt="Módulo de Cotizaciones - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>

            {/* Feature 2 */}
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <img src="/assets/img/screenshots/desktop/production-orders-es.jpg" alt="Órdenes de Producción - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
            <div>
              <h3 style={{color: 'var(--primary)'}}>🏭 Órdenes de Producción Visuales</h3>
              <p>Control completo del flujo de fabricación:</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>✓ Estados 100% configurables a tu proceso</li>
                <li style={{padding: '0.5rem 0'}}>✓ Asignación de piezas a máquinas</li>
                <li style={{padding: '0.5rem 0'}}>✓ BOM (Lista de Materiales) completa</li>
                <li style={{padding: '0.5rem 0'}}>✓ Historial de cambios y archivos adjuntos</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 style={{color: 'var(--primary)'}}>📦 Inventario con QR Codes</h3>
              <p>Control inteligente de stock:</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>✓ Alertas de stock mínimo automáticas</li>
                <li style={{padding: '0.5rem 0'}}>✓ Generación de etiquetas QR</li>
                <li style={{padding: '0.5rem 0'}}>✓ Escaneo rápido con cámara del celular</li>
                <li style={{padding: '0.5rem 0'}}>✓ Trazabilidad completa de movimientos</li>
              </ul>
            </div>
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <img src="/assets/img/screenshots/desktop/inventory-es.jpg" alt="Inventario con QR - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>

            {/* Feature 4 */}
            <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
              <img src="/assets/img/screenshots/desktop/projects-portal-es.jpg" alt="Portal de Proyectos - FabriControl" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
            <div>
              <h3 style={{color: 'var(--accent)'}}>📋 Portal de Proyectos (ÚNICO)</h3>
              <p>Gestión colaborativa en tiempo real:</p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>✓ Proyectos con tareas y responsables</li>
                <li style={{padding: '0.5rem 0'}}>✓ Comentarios con historial</li>
                <li style={{padding: '0.5rem 0'}}>✓ Archivos por proyecto y tarea</li>
                <li style={{padding: '0.5rem 0'}}>✓ Panel de actividad global en vivo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS ÚNICAS */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Características que NO Encontrarás en Otros ERP</h2>
          </div>
          
          <div className="grid grid-3">
            <div className="card">
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/desktop/parametric-pieces-es.jpg" alt="Piezas Paramétricas" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--accent)'}}>🧩 Piezas Paramétricas</h3>
              <p>Crea plantillas con variables que generan códigos automáticos.</p>
              <p><strong>Ejemplo:</strong> <code>Puerta-{'{Ancho}'}x{'{Alto}'}</code></p>
              <p>→ Genera: <code>Puerta-100x200</code></p>
              <p style={{marginTop: '1rem', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem'}}>
                <strong>ÚNICO en el mercado.</strong> Ahorra tiempo en productos repetitivos con variaciones.
              </p>
            </div>
            
            <div className="card">
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/desktop/chat-ia-es.jpg" alt="Chat IA con Gemini" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--secondary)'}}>🤖 Chat IA con Gemini</h3>
              <p>Asistente inteligente que conoce <strong>específicamente FabriControl</strong>.</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                <li style={{padding: '0.25rem 0'}}>✓ Responde 24/7</li>
                <li style={{padding: '0.25rem 0'}}>✓ Explica cómo usar cada módulo</li>
                <li style={{padding: '0.25rem 0'}}>✓ Guía en procesos complejos</li>
              </ul>
              <p style={{marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>
                Configura tu API Key gratuita de Google Gemini en 2 minutos.
              </p>
            </div>
            
            <div className="card">
              <div style={{borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)'}}>
                <img src="/assets/img/screenshots/mobile/mobile-home.jpg" alt="App Móvil PWA" style={{width: '100%', height: 'auto', display: 'block'}} />
              </div>
              <h3 style={{color: 'var(--primary)'}}>📱 App Móvil PWA</h3>
              <p>Progressive Web App para operarios de piso.</p>
              <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                <li style={{padding: '0.25rem 0'}}>✓ Funciona en iOS y Android</li>
                <li style={{padding: '0.25rem 0'}}>✓ No requiere descarga de App Store</li>
                <li style={{padding: '0.25rem 0'}}>✓ Botones grandes para uso en planta</li>
                <li style={{padding: '0.25rem 0'}}>✓ Escaneo QR integrado</li>
              </ul>
            </div>
          </div>
          
          {/* Galería adicional de app móvil */}
          <div style={{marginTop: 'var(--spacing-xxl)'}}>
            <h3 className="text-center mb-3">App Móvil en Acción</h3>
            <div className="grid grid-5" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-login.jpg" alt="Login Móvil" style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>Login Simple</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-orders.jpg" alt="Mis Órdenes" style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>Mis Órdenes</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-machines.jpg" alt="Actualización Estado Máquinas" style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>Actualización de Estado</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-scan-qr.jpg" alt="Cámara QR" style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>Cámara para QR</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'inline-block'}}>
                  <img src="/assets/img/screenshots/mobile/mobile-inventory.jpg" alt="Inventario Móvil" style={{maxWidth: '200px', height: 'auto', display: 'block'}} />
                </div>
                <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-medium)'}}>Inventario</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA VS COMPETENCIA */}
      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <h2>FabriControl vs La Competencia</h2>
            <p style={{color: 'var(--text-medium)'}}>Comparación honesta con otros sistemas</p>
          </div>
          
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-md)'}}>
              <thead>
                <tr style={{borderBottom: '2px solid var(--bg-gray)'}}>
                  <th style={{textAlign: 'left', padding: '1rem'}}>Característica</th>
                  <th style={{textAlign: 'center', padding: '1rem', color: 'var(--primary)'}}><strong>FabriControl</strong></th>
                  <th style={{textAlign: 'center', padding: '1rem'}}>Odoo</th>
                  <th style={{textAlign: 'center', padding: '1rem'}}>Katana</th>
                  <th style={{textAlign: 'center', padding: '1rem'}}>ERPNext</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '1px solid var(--bg-gray)'}}>
                  <td style={{padding: '1rem'}}>Precio/mes</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}><strong>$49-129</strong></td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$50-300+</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$99-799</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>$10-25</td>
                </tr>
                <tr style={{borderBottom: '1px solid var(--bg-gray)'}}>
                  <td style={{padding: '1rem'}}>Español nativo</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>✅</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>⚠️ Traducido</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌ Solo EN</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>⚠️ Traducido</td>
                </tr>
                <tr style={{borderBottom: '1px solid var(--bg-gray)'}}>
                  <td style={{padding: '1rem'}}>Curva de aprendizaje</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}><strong>2-3 días</strong></td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>2-4 semanas</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>1 semana</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>2-3 semanas</td>
                </tr>
                <tr style={{borderBottom: '1px solid var(--bg-gray)'}}>
                  <td style={{padding: '1rem'}}>Piezas Paramétricas</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>✅</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                </tr>
                <tr style={{borderBottom: '1px solid var(--bg-gray)'}}>
                  <td style={{padding: '1rem'}}>Chat IA integrado</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>✅ Gemini</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                </tr>
                <tr>
                  <td style={{padding: '1rem'}}>App móvil operarios</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>✅ Incluida</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>💰 Extra</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>💰 Extra</td>
                  <td style={{textAlign: 'center', padding: '1rem'}}>❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA PRECIOS */}
      <section className="section" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white'}}>
        <div className="container text-center">
          <h2 style={{color: 'white'}}>Empieza Hoy con FabriControl</h2>
          <p style={{fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95}}>
            30 días de prueba gratuita. Sin tarjeta de crédito.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/descargar" className="btn btn-accent btn-large">🆓 Descargar y Probar Gratis</Link>
            <Link to="/precios" className="btn btn-secondary btn-large" style={{borderColor: 'white', color: 'white'}}>Ver Planes desde $49/mes</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
