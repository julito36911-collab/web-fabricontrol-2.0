import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: '💻 Instalación y Configuración',
      questions: [
        {
          q: '¿Necesito instalar algo en mi computadora?',
          a: 'Sí, FabriControl se instala localmente en Windows. Incluye MongoDB integrado y todo funciona sin internet después de instalar. Esto te da control total de tus datos.'
        },
        {
          q: '¿Cuánto tiempo toma la instalación?',
          a: 'La instalación completa toma entre 3-5 minutos. Descargas el instalador (120 MB), lo ejecutas y el asistente hace todo automáticamente.'
        },
        {
          q: '¿Puedo instalar en múltiples computadoras?',
          a: 'Sí, puedes instalar FabriControl en todas las computadoras de tu taller. El límite está en usuarios simultáneos según tu plan, no en instalaciones.'
        }
      ]
    },
    {
      category: '💳 Licencias y Precios',
      questions: [
        {
          q: '¿Cómo funciona el trial de 30 días?',
          a: 'Descargas e instalas FabriControl y tienes 30 días completos de prueba con TODAS las funciones desbloqueadas. No necesitas tarjeta de crédito. Después de los 30 días, compras la licencia que prefieras.'
        },
        {
          q: '¿Qué pasa si no compro después del trial?',
          a: 'Nada. Simplemente el software deja de funcionar y puedes desinstalarlo. Sin cargos, sin compromisos.'
        },
        {
          q: '¿Las licencias son de pago único o suscripción?',
          a: 'Son suscripciones mensuales o anuales. Puedes cancelar cuando quieras sin penalizaciones. No hay contratos largos obligatorios.'
        },
        {
          q: '¿Puedo cambiar de plan después?',
          a: 'Sí, puedes actualizar o bajar de plan en cualquier momento. El cambio se refleja en tu próxima facturación.'
        }
      ]
    },
    {
      category: '👥 Usuarios y Permisos',
      questions: [
        {
          q: '¿Cómo funcionan los límites de usuarios?',
          a: 'El límite es de usuarios simultáneos activos. Plan Básico: 5 usuarios pueden estar conectados al mismo tiempo. Plan Pro: usuarios ilimitados.'
        },
        {
          q: '¿Puedo controlar qué puede hacer cada usuario?',
          a: 'Sí, en el Plan Pro tienes permisos personalizables por módulo y acción. Puedes crear roles como "Vendedor", "Operario", "Gerente" con accesos específicos.'
        }
      ]
    },
    {
      category: '📊 Funcionalidad',
      questions: [
        {
          q: '¿Qué es el Portal de Proyectos?',
          a: 'Es una herramienta colaborativa en tiempo real para gestionar proyectos grandes. Puedes crear proyectos, asignar tareas, hacer comentarios y adjuntar archivos. Todo el equipo ve los cambios en vivo.'
        },
        {
          q: '¿Qué son las Piezas Paramétricas?',
          a: 'Son plantillas de piezas con variables. Ejemplo: creas "Puerta-{Ancho}x{Alto}" y al generar una orden con Ancho=100, Alto=200, automáticamente genera el código "Puerta-100x200". Ahorra tiempo en productos repetitivos con variaciones.'
        },
        {
          q: '¿Cómo funciona el Chat IA con Gemini?',
          a: 'Es un asistente inteligente que conoce específicamente FabriControl. Puedes preguntarle cómo usar cualquier módulo, resolver dudas o pedirle que te guíe en procesos. Necesitas una API Key gratuita de Google Gemini (te enseñamos cómo obtenerla).'
        }
      ]
    },
    {
      category: '📱 App Móvil',
      questions: [
        {
          q: '¿Necesito descargar una app para el celular?',
          a: 'No. FabriControl usa PWA (Progressive Web App). Abres el navegador de tu celular, entras a la URL de tu instalación y puedes "agregar a pantalla de inicio". Funciona como una app nativa en iOS y Android.'
        },
        {
          q: '¿Qué pueden hacer los operarios desde el celular?',
          a: 'Ver órdenes asignadas, actualizar estados, escanear QR de inventario, subir fotos y dejar comentarios. Ideal para operarios de piso que no están frente a una computadora.'
        }
      ]
    },
    {
      category: '🔒 Datos y Seguridad',
      questions: [
        {
          q: '¿Dónde se guardan mis datos?',
          a: 'En tu propia computadora o servidor local. FabriControl usa MongoDB integrado que se instala automáticamente. Tus datos nunca salen de tu red. TÚ tienes el control total.'
        },
        {
          q: '¿Hacen backup automático de mis datos?',
          a: 'En el Plan Pro sí. FabriControl genera un backup diario automático de tu base de datos en una carpeta que tú eliges. En el Plan Básico puedes hacer backups manuales cuando quieras.'
        },
        {
          q: '¿Qué pasa si pierdo mi computadora?',
          a: 'Si tenías backup (automático en Pro o manual en Básico), instalas FabriControl en otra computadora y restauras el backup. Recuperas todo.'
        }
      ]
    },
    {
      category: '👤 Soporte',
      questions: [
        {
          q: '¿Cómo obtengo soporte técnico?',
          a: 'Por email a soporte@fabricontrol.com. Plan Básico: respuesta en 48h. Plan Pro: respuesta en 24h. Plan Enterprise: soporte prioritario por WhatsApp.'
        },
        {
          q: '¿Hay videos tutoriales?',
          a: 'Sí, tenemos una biblioteca de videos que cubre cada módulo paso a paso. Los encuentras en la sección "Recursos" del sitio web y dentro del software.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      {/* HERO FAQ */}
      <section className="hero" style={{padding: '4rem 0 2rem'}}>
        <div className="container">
          <div className="text-center">
            <h1 style={{fontSize: '3rem', marginBottom: '1rem', color: 'white'}}>Preguntas Frecuentes</h1>
            <p style={{fontSize: '1.25rem', color: 'white', maxWidth: '700px', margin: '0 auto', opacity: 0.95}}>
              Todo lo que necesitas saber sobre FabriControl. Si no encuentras tu respuesta, contáctanos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section">
        <div className="container" style={{maxWidth: '900px'}}>
          {faqs.map((category, catIndex) => (
            <div key={catIndex} style={{marginBottom: '3rem'}}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                {category.category}
              </div>
              
              {category.questions.map((faq, qIndex) => {
                const index = `${catIndex}-${qIndex}`;
                const isOpen = openIndex === index;
                
                return (
                  <div key={qIndex} className="card" style={{marginBottom: '1rem'}}>
                    <button
                      onClick={() => toggleFAQ(index)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '1.5rem 2rem',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-dark)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{
                        fontSize: '1.5rem',
                        transition: 'transform 0.3s ease',
                        color: 'var(--primary)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>▼</span>
                    </button>
                    {isOpen && (
                      <div style={{padding: '0 2rem 1.5rem 2rem'}}>
                        <p style={{color: 'var(--text-medium)', lineHeight: 1.7, margin: 0}}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="section section-light">
        <div className="container">
          <div className="card" style={{maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '3rem'}}>
            <h3 style={{marginBottom: '1rem'}}>¿Aún tienes preguntas?</h3>
            <p style={{marginBottom: '2rem', color: 'var(--text-medium)'}}>Contáctanos y te responderemos lo antes posible</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href="mailto:soporte@fabricontrol.com" className="btn btn-primary">📧 soporte@fabricontrol.com</a>
              <a href="mailto:ventas@fabricontrol.com" className="btn btn-secondary">💼 ventas@fabricontrol.com</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FAQ;