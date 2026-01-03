import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
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
            <li><Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}>FAQ</Link></li>
            <li><Link to="/descargar" className="btn btn-primary btn-small">Probar Gratis</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
