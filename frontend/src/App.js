import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './fabricontrol.css';
import Home from './pages/Home';
import Caracteristicas from './pages/Caracteristicas';
import Precios from './pages/Precios';
import Descargar from './pages/Descargar';
import FAQ from './pages/FAQ';
import Enterprise from './pages/Enterprise';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/caracteristicas" element={<Caracteristicas />} />
        <Route path="/precios" element={<Precios />} />
        <Route path="/descargar" element={<Descargar />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/enterprise" element={<Enterprise />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
