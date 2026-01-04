import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Descargar({ openLicenseModal }) {
  return (
    <>
      <Header onRequestLicense={openLicenseModal} />
      {/* Resto del contenido de Descargar */}
      <Footer />
    </>
  );
}

export default Descargar;