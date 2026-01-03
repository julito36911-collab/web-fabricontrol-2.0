import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>FabriControl</h4>
            <p style={{opacity: 0.8}}>The ERP designed specifically for Latin American workshops and factories.</p>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/caracteristicas">Features</Link></li>
              <li><Link to="/precios">Pricing</Link></li>
              <li><Link to="/descargar">Download</Link></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="/recursos/">Free Campus</a></li>
              <li><a href="/productos/">Product Catalog</a></li>
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