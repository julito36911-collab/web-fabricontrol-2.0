import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Header() {
  const location = useLocation();
  const { language, setLanguage, t, isRtl } = useLanguage();
  
  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-[#1a202c]/80 border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isRtl ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo SVG */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-extrabold text-xl tracking-tight text-white">FabriControl</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className={`hidden md:flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <Link to="/" className={`text-base font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/' ? 'text-cyan-400' : 'text-gray-300'}`}>{t('nav_home')}</Link>
            <Link to="/caracteristicas" className={`text-base font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/caracteristicas' ? 'text-cyan-400' : 'text-gray-300'}`}>{t('nav_features')}</Link>
            <Link to="/precios" className={`text-base font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/precios' ? 'text-cyan-400' : 'text-gray-300'}`}>{t('nav_pricing')}</Link>
            <Link to="/recursos" className={`text-base font-medium transition-colors hover:text-cyan-400 ${location.pathname === '/recursos' ? 'text-cyan-400' : 'text-gray-300'}`}>{t('nav_resources')}</Link>
            <a href="/precios#faq" className={`text-base font-medium transition-colors hover:text-cyan-400 text-gray-300`}>{t('nav_faq')}</a>
          </nav>

          {/* Right Actions */}
          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            
            {/* Language Selector */}
            <div className={`flex bg-white/10 rounded-full p-1 border border-white/20 shadow-inner ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => setLanguage('es')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'es' ? 'bg-cyan-500 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}>ES</button>
              <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-cyan-500 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}>EN</button>
              <button onClick={() => setLanguage('he')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'he' ? 'bg-cyan-500 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}>עב</button>
            </div>

            <a href="https://fabricontrol-1.emergent.host/" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-200">
              🎮 {t('nav_demo')}
            </a>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;