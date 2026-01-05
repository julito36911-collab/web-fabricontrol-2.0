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
              <li><a href="/documentacion.html">Documentación Técnica</a></li>
              <li><a href="/comparacion.html">Comparación</a></li>
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
            <h4>Contacto</h4>
            <ul className="footer-links">
              <li>📧 <a href="mailto:julito36911@gmail.com">julito36911@gmail.com</a></li>
              <li>📱 <a href="https://wa.me/972526489461">WhatsApp: +972 52-648-9461</a></li>
              <li>💬 Chat en vivo disponible</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 FabriControl. Todos los derechos reservados.</p>
          <p style={{marginTop: '0.5rem'}}>
            <a href="#">Términos y Condiciones</a> · 
            <a href="#">Política de Privacidad</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;