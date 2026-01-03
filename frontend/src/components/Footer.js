import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>FabriControl</h4>
            <p style={{opacity: 0.8}}>El ERP diseñado específicamente para talleres y fábricas latinoamericanas.</p>
          </div>
          
          <div className="footer-section">
            <h4>Producto</h4>
            <ul className="footer-links">
              <li><Link to="/caracteristicas">Características</Link></li>
              <li><Link to="/precios">Precios</Link></li>
              <li><Link to="/descargar">Descargar</Link></li>
              <li><a href="#">Documentación</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul className="footer-links">
              <li><a href="/recursos/">Campus Gratuito</a></li>
              <li><a href="/productos/">Catálogo de Productos</a></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>📧 sales@fabricontrol.com</li>
              <li>📧 support@fabricontrol.com</li>
              <li>📱 WhatsApp: +52-XXX-XXX-XXXX</li>
              <li><a href="mailto:info@fabricontrol.com">Contact Form</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 FabriControl. All rights reserved.</p>
          <p style={{marginTop: '0.5rem'}}>
            <a href="#">Terms and Conditions</a> · 
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;