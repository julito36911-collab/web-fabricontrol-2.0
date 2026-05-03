import React, { useState } from 'react';
import './EnterpriseQuoteModal.css';

function EnterpriseQuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    currentUsers: '',
    requirements: '',
    timeline: '',
    budget: ''
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const downloadAsPDF = () => {
    // Crear contenido HTML para el PDF
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Cotización Enterprise - FabriControl</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          h1 { color: #3B82F6; border-bottom: 3px solid #3B82F6; padding-bottom: 10px; }
          h2 { color: #6366F1; margin-top: 30px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #4B5563; }
          .value { margin-top: 5px; padding: 10px; background: #F3F4F6; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>🏢 Solicitud de Cotización Enterprise - FabriControl</h1>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        
        <h2>📋 Información de la Empresa</h2>
        <div class="field">
          <div class="label">Nombre de la Empresa:</div>
          <div class="value">${formData.companyName || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Nombre de Contacto:</div>
          <div class="value">${formData.contactName || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${formData.email || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Teléfono:</div>
          <div class="value">${formData.phone || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Industria:</div>
          <div class="value">${formData.industry || 'N/A'}</div>
        </div>
        
        <h2>📊 Detalles del Proyecto</h2>
        <div class="field">
          <div class="label">Número de Usuarios:</div>
          <div class="value">${formData.currentUsers || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Requerimientos Específicos:</div>
          <div class="value">${formData.requirements || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Timeline Deseado:</div>
          <div class="value">${formData.timeline || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">Presupuesto Aproximado:</div>
          <div class="value">${formData.budget || 'N/A'}</div>
        </div>
        
        <hr style="margin: 40px 0; border: none; border-top: 2px solid #E5E7EB;">
        <p style="color: #6B7280; font-size: 0.9rem;">Este documento será revisado por nuestro equipo de ventas Enterprise. Le contactaremos en un plazo máximo de 48 horas.</p>
      </body>
      </html>
    `;

    // Crear un Blob y descargarlo
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FabriControl_Enterprise_Quote_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setMessage({ type: 'success', text: '✅ Archivo descargado exitosamente' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const sendByEmail = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.companyName || !formData.contactName || !formData.email) {
      setMessage({ type: 'error', text: '⚠️ Por favor complete los campos obligatorios (Empresa, Contacto, Email)' });
      return;
    }

    setSending(true);
    setMessage({ type: '', text: '' });

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://web-fabricontrol-2-0.onrender.com';

      const response = await fetch(`${BACKEND_URL}/api/enterprise-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: '✅ Cotización enviada exitosamente. Le contactaremos en 48h.' });
        // Resetear formulario después de 2 segundos
        setTimeout(() => {
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            industry: '',
            currentUsers: '',
            requirements: '',
            timeline: '',
            budget: ''
          });
          onClose();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: `❌ Error: ${data.message || 'No se pudo enviar la cotización'}` });
      }
    } catch (error) {
      console.error('Error sending quote:', error);
      setMessage({ type: 'error', text: '❌ Error de conexión. Intente descargar el formulario y enviarlo manualmente.' });
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>🏢 Cotización Enterprise</h2>
          <p>Complete el formulario y le contactaremos en 48 horas</p>
        </div>

        <form onSubmit={sendByEmail} className="quote-form">
          <div className="form-section">
            <h3>📋 Información de la Empresa</h3>
            
            <div className="form-group">
              <label htmlFor="companyName">Nombre de la Empresa *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ej: Aceros Industriales S.A."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactName">Nombre de Contacto *</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contacto@empresa.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="industry">Industria / Sector</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="metalurgia">Metalurgia y Fabricación</option>
                <option value="carpinteria">Carpintería Industrial</option>
                <option value="plasticos">Plásticos y Polímeros</option>
                <option value="textil">Textil</option>
                <option value="alimentos">Alimentos y Bebidas</option>
                <option value="electronica">Electrónica</option>
                <option value="automotriz">Automotriz</option>
                <option value="construccion">Construcción</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>📊 Detalles del Proyecto</h3>

            <div className="form-group">
              <label htmlFor="currentUsers">Número de Usuarios Estimado</label>
              <input
                type="text"
                id="currentUsers"
                name="currentUsers"
                value={formData.currentUsers}
                onChange={handleChange}
                placeholder="Ej: 15-20 usuarios"
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requerimientos Específicos</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Describa los módulos personalizados o funcionalidades específicas que necesita..."
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="timeline">Timeline Deseado</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="inmediato">Inmediato (1-2 semanas)</option>
                  <option value="1-mes">1 mes</option>
                  <option value="2-3-meses">2-3 meses</option>
                  <option value="6-meses">6 meses o más</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Presupuesto Aproximado (USD)</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="menos-5k">Menos de $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="mas-50k">Más de $50,000</option>
                </select>
              </div>
            </div>
          </div>

          {message.text && (
            <div className={`message message-${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={downloadAsPDF}
              className="btn btn-secondary"
              disabled={sending}
            >
              💾 Descargar en mi PC
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
            >
              {sending ? '📧 Enviando...' : '📧 Enviar por Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterpriseQuoteModal;
