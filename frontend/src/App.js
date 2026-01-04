import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './fabricontrol.css';
import Home from './pages/Home';
import Caracteristicas from './pages/Caracteristicas';
import Precios from './pages/Precios';
import Descargar from './pages/Descargar';
import FAQ from './pages/FAQ';
import Enterprise from './pages/Enterprise';
import ChatWidget from './components/ChatWidget';
import LicenseRequestModal from './components/LicenseRequestModal';

function App() {
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  
  const openLicenseModal = () => setShowLicenseModal(true);
  const closeLicenseModal = () => setShowLicenseModal(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home openLicenseModal={openLicenseModal} />} />
        <Route path="/caracteristicas" element={<Caracteristicas openLicenseModal={openLicenseModal} />} />
        <Route path="/precios" element={<Precios openLicenseModal={openLicenseModal} />} />
        <Route path="/descargar" element={<Descargar openLicenseModal={openLicenseModal} />} />
        <Route path="/faq" element={<FAQ openLicenseModal={openLicenseModal} />} />
        <Route path="/enterprise" element={<Enterprise openLicenseModal={openLicenseModal} />} />
      </Routes>
      <ChatWidget />
      <LicenseRequestModal 
        isOpen={showLicenseModal} 
        onClose={closeLicenseModal} 
      />
    </BrowserRouter>
  );
}

export default App;
