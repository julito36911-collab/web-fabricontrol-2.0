import React, { useState } from 'react';
import './LicenseRequestModal.css';

function LicenseRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    cantidadUsuarios: '',
    planDeseado: 'anual'
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const REGISTER_URL = "https://fabricontrol-1.emergent.host/register";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    
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
          text: '✅ Solicitud enviada. Recibirás tu código de activación por email en menos de 24 horas.' 
        });
        
        setTimeout(() => {
          setFormData({
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            cantidadUsuarios: '',
            planDeseado: 'anual'
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
        text: '❌ Error de conexión. Contacta directamente a julito36911@gmail.com' 
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
          <h2>☁️ Solicitar Licencia de Prueba (30 Días Gratis)</h2>
          <p>100% en la nube - Sin descargas ni instalaciones</p>
        </div>

        <form onSubmit={sendRequest} className="license-form">
          
          <div className="license-info-box" style={{background: '#dcfce7', borderColor: '#16a34a'}}>
            <strong style={{color: '#16a34a'}}>✅ ¿Cómo funciona?</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>1️⃣ Complete este formulario con sus datos</li>
              <li>2️⃣ Recibirá por email en máximo 24h:
                <ul style={{paddingLeft: '1.5rem', marginTop: '0.25rem'}}>
                  <li>🔑 Su código de activación único</li>
                  <li>📋 Instrucciones de registro</li>
                </ul>
              </li>
              <li>3️⃣ Vaya a <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" style={{color: '#16a34a', fontWeight: 600}}>fabricontrol-1.emergent.host/register</a></li>
              <li>4️⃣ Ingrese su código y cree su cuenta</li>
              <li>5️⃣ ¡Listo! Disfrute 30 días de prueba gratis</li>
            </ul>
          </div>

          <div className="license-info-box" style={{background: '#eff6ff', borderColor: '#3b82f6', marginTop: '1rem'}}>
            <strong style={{color: '#1d4ed8'}}>☁️ Sistema 100% en la Nube:</strong>
            <ul style={{marginTop: '0.5rem', paddingLeft: '1.2rem', marginBottom: 0}}>
              <li>🌐 Accede desde cualquier dispositivo</li>
              <li>🔒 Datos seguros con respaldos automáticos</li>
              <li>🔄 Actualizaciones automáticas incluidas</li>
              <li>📱 Funciona en PC, tablet y celular</li>
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
              <option value="1-5">1-5 usuarios</option>
              <option value="6-10">6-10 usuarios</option>
              <option value="10+">Más de 10 usuarios (Enterprise)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="planDeseado">Plan de interés (después del trial)</label>
            <select
              id="planDeseado"
              name="planDeseado"
              value={formData.planDeseado}
              onChange={handleChange}
            >
              <option value="anual">💰 Pago Anual - $195/año (MEJOR VALOR)</option>
              <option value="cuotas">💳 Pago en Cuotas - $290/año</option>
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
