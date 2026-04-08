import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Header() {
  const location = useLocation();
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/#productos', label: t('nav_products') },
    { to: '/#servicios', label: t('nav_services') },
    { to: '/#industrias', label: t('nav_industries') },
    { to: '/#sobre-mi', label: t('nav_about') },
    { to: '/cotizacion', label: t('nav_quote') },
  ];

  const handleNavClick = (to) => {
    setMobileOpen(false);
    if (to.startsWith('/#')) {
      const id = to.substring(2);
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = to;
      }
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-[#0a0e17]/85 border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRtl ? 'flex-row-reverse' : ''}`}>

          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-extrabold text-lg tracking-tight text-white">Julio Mirabal</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) =>
              item.to.startsWith('/#') ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  className="text-sm font-medium transition-colors hover:text-orange-400 text-gray-300"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium transition-colors hover:text-orange-400 ${location.pathname === item.to ? 'text-orange-400' : 'text-gray-300'}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Lang + CTA + Mobile toggle */}
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>

            {/* Language Selector: ES / עב */}
            <div className={`flex bg-white/10 rounded-full p-0.5 border border-white/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'es' ? 'bg-orange-500 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('he')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'he' ? 'bg-orange-500 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}
              >
                עב
              </button>
            </div>

            {/* CTA button desktop */}
            <Link
              to="/cotizacion"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-lg text-white bg-orange-500 hover:bg-orange-400 transition-all duration-200"
            >
              {language === 'he' ? 'בקשת הצעת מחיר' : 'Cotizar'}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`md:hidden pb-4 border-t border-white/10 mt-2 pt-4 ${isRtl ? 'text-right' : 'text-left'}`}>
            {navItems.map((item) =>
              item.to.startsWith('/#') ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  className="block py-2 text-sm font-medium text-gray-300 hover:text-orange-400"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm font-medium hover:text-orange-400 ${location.pathname === item.to ? 'text-orange-400' : 'text-gray-300'}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
