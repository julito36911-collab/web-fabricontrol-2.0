import React, { useState } from 'react';
import './LicenseRequestModal.css';

function LicenseRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    cantidadUsuarios: '',
    planDeseado: 'mensual'
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
    if (!formData.nombre || !formData.email || !formData.cantidadUsuarios) {
      setMessage({ type: 'error', text: '⚠️ Por favor complete los campos obligatorios (Nombre, Email, Usuarios)' });
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
          text: '✅ Solicitud enviada. Recibirás el enlace de descarga y tu código de activación por email en menos de 24 horas.' 
        });
        
        setTimeout(() => {
          setFormData({
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            cantidadUsuarios: '',
            planDeseado: 'mensual'
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
          <h2>📋 Solicitar Licencia de Prueba (30 Días Gratis)</h2>
          <p>Complete el formulario y le enviaremos su licencia con el enlace de descarga</p>
        </div>

        <form onSubmit={sendRequest} className="license-form">
          
          <div className="license-info-box" style={{background: '#dcfce7', borderColor: '#16a34a'}}>
            <strong style={{color: '#16a34a'}}>✅ ¿Cómo funciona?</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>1️⃣ Complete este formulario con sus datos</li>
              <li>2️⃣ Recibirá por email en menos de 24h:
                <ul style={{paddingLeft: '1.5rem', marginTop: '0.25rem'}}>
                  <li>📥 Link de descarga del instalador</li>
                  <li>🔑 Su código de activación</li>
                </ul>
              </li>
              <li>3️⃣ Descargue, instale e ingrese el código</li>
              <li>4️⃣ ¡Listo! Disfrute de 30 días completos de prueba</li>
            </ul>
          </div>

          <div className="license-info-box" style={{background: '#fef3c7', borderColor: '#f59e0b', marginTop: '1rem'}}>
            <strong style={{color: '#d97706'}}>💰 Después de los 30 días:</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>📞 Te contactaremos para que elijas tu plan:</li>
              <li style={{marginLeft: '1.5rem'}}>• Plan Básico: $49/mes o $39/mes (anual)</li>
              <li style={{marginLeft: '1.5rem'}}>• Plan Profesional: $129/mes o $103/mes (anual)</li>
              <li>✅ Todos tus datos se mantienen intactos</li>
            </ul>
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
            <strong>💡 ¿Necesitas ayuda?</strong><br />
            Contacta a: <a href="mailto:julito36911@gmail.com">julito36911@gmail.com</a><br />
            WhatsApp: <a href="https://wa.me/972526489461">+972 52-648-9461</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LicenseRequestModal;
