import React, { useState } from 'react';
import './LicenseRequestModal.css';

function LicenseRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    installationCode: '',
    cantidadUsuarios: '',
    planDeseado: 'basico'
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.installationCode || !formData.cantidadUsuarios) {
      setMessage({ type: 'error', text: '⚠️ Por favor complete los campos obligatorios (Nombre, Email, Installation Code, Usuarios)' });
      return;
    }

    setSending(true);
    setMessage({ type: '', text: '' });

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/license-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: '✅ Solicitud enviada. Recibirás tu código de licencia por email en menos de 24 horas.' 
        });
        
        setTimeout(() => {
          setFormData({
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            installationCode: '',
            cantidadUsuarios: '',
            planDeseado: 'basico'
          });
          onClose();
        }, 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: `❌ ${data.message || 'No se pudo enviar la solicitud'}` 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        type: 'error', 
        text: '❌ Error de conexión. Contacta directamente a support@fabricontrol.com' 
      });
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="license-modal-overlay" onClick={onClose}>
      <div className="license-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="license-modal-close" onClick={onClose}>✕</button>
        
        <div className="license-modal-header">
          <h2>🎁 Descargar FabriControl - 30 Días GRATIS</h2>
          <p>Complete el formulario y reciba su licencia por email en 24h</p>
        </div>

        <form onSubmit={sendRequest} className="license-form">
          
          <div className="license-info-box" style={{background: '#dcfce7', borderColor: '#16a34a'}}>
            <strong style={{color: '#16a34a'}}>🎉 ¡INCLUYE 30 DÍAS GRATIS!</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>✅ Recibirás tu licencia en menos de 24 horas</li>
              <li>✅ 30 días de prueba con todas las funciones</li>
              <li>✅ Sin tarjeta de crédito</li>
              <li>✅ Mismo código para siempre (solo se extiende la fecha)</li>
            </ul>
          </div>

          <div className="license-info-box" style={{background: '#fef3c7', borderColor: '#f59e0b', marginTop: '1rem'}}>
            <strong style={{color: '#d97706'}}>💰 Después de los 30 días:</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>📞 <strong>Contáctanos para activar tu plan:</strong></li>
              <li style={{marginLeft: '1.5rem'}}>• Mensual: $49 (Básico) o $129 (Profesional)</li>
              <li style={{marginLeft: '1.5rem'}}>• Anual: <strong>20% descuento</strong> ($39/mes o $103/mes)</li>
              <li>🔄 <strong>NO necesitas nuevo código</strong> - solo extendemos tu licencia actual</li>
            </ul>
          </div>

          <div className="license-info-box">
            <strong>📋 ¿Cómo obtener tu INSTALLATION CODE?</strong>
            <ol style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>Descarga e instala FabriControl (link en el email de confirmación)</li>
              <li>Al abrir por primera vez, aparecerá tu <strong>INSTALLATION CODE</strong></li>
              <li>Copia ese código y pégalo abajo</li>
              <li>Ejemplo: <code>INST-ABC123-XYZ789</code></li>
            </ol>
          </div>

          <div className="form-group">
            <label htmlFor="installationCode">Código de Instalación * <span style={{fontSize: '0.85rem', color: 'var(--text-medium)'}}>(Aparece al abrir la app)</span></label>
            <input
              type="text"
              id="installationCode"
              name="installationCode"
              value={formData.installationCode}
              onChange={handleChange}
              placeholder="INST-ABC123-XYZ789"
              required
              style={{fontFamily: 'monospace', fontSize: '1.1rem'}}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="empresa">Empresa</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Metalúrgica Sol S.A."
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
                placeholder="juan@empresa.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono/WhatsApp</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+54 11 1234-5678"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cantidadUsuarios">¿Cuántos usuarios necesitas? *</label>
            <select
              id="cantidadUsuarios"
              name="cantidadUsuarios"
              value={formData.cantidadUsuarios}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona cantidad</option>
              <option value="1-3">1-3 usuarios (Plan Básico - $49/mes)</option>
              <option value="4-10">4-10 usuarios (Plan Profesional - $129/mes)</option>
              <option value="10+">Más de 10 usuarios (Enterprise - Cotización)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="planDeseado">Pago Preferido (después del trial)</label>
            <select
              id="planDeseado"
              name="planDeseado"
              value={formData.planDeseado}
              onChange={handleChange}
            >
              <option value="mensual">💳 Mensual ($49 o $129 según usuarios)</option>
              <option value="anual">💰 Anual (20% descuento - $39 o $103/mes)</option>
              <option value="por-decidir">🤔 Decidir después del trial</option>
            </select>
          </div>

          {message.text && (
            <div className={`license-message license-message-${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={sending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
            >
              {sending ? '📧 Enviando...' : '📧 Enviar Solicitud'}
            </button>
          </div>

          <div className="license-help-box">
            <strong>💡 ¿Necesitas ayuda?</strong><br>
            Contacta a: <a href="mailto:support@fabricontrol.com">support@fabricontrol.com</a><br>
            WhatsApp: <a href="https://wa.me/541112345678">+54 11 1234-5678</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LicenseRequestModal;
