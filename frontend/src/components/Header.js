import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ onRequestLicense }) {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-logo">
            <Link to="/">
              <img src="/assets/img/logos/fabricontrol-logo.svg" alt="FabriControl" />
            </Link>
          </div>
          <ul className="nav-menu">
            <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link></li>
            <li><Link to="/caracteristicas" className={`nav-link ${location.pathname === '/caracteristicas' ? 'active' : ''}`}>Características</Link></li>
            <li><Link to="/precios" className={`nav-link ${location.pathname === '/precios' ? 'active' : ''}`}>Precios</Link></li>
            <li><a href="/productos/" className="nav-link">Productos</a></li>
            <li><a href="/recursos/" className="nav-link">Recursos</a></li>
            <li><a href="/documentacion.html" className="nav-link">Documentación</a></li>
            <li>
              <a href="/en/" className="nav-link" style={{padding: '0.5rem 0.75rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600}}>
                🌐 EN
              </a>
            </li>
            <li>
              <a href="/he/" className="nav-link" style={{padding: '0.5rem 0.75rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600}}>
                🌐 עב
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;