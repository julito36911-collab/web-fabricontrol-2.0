import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './fabricontrol.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import Cotizacion from './pages/Cotizacion';
import FabriControlDetail from './pages/FabriControlDetail';
import Caracteristicas from './pages/Caracteristicas';
import Precios from './pages/Precios';
import FAQ from './pages/FAQ';
import Enterprise from './pages/Enterprise';
import Recursos from './pages/Recursos';
import Documentacion from './pages/Documentacion';
import Comparacion from './pages/Comparacion';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ChatWidget from './components/ChatWidget';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/fabricontrol" element={<FabriControlDetail />} />
          {/* Legacy routes — kept for backwards compatibility */}
          <Route path="/caracteristicas" element={<Caracteristicas />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/documentacion" element={<Documentacion />} />
          <Route path="/comparacion" element={<Comparacion />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <ChatWidget />
        <WhatsAppButton />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
