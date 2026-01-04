import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Enterprise({ openLicenseModal }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  return (
    <>
      <Header onRequestLicense={openLicenseModal} />
      {/* Resto del contenido de Enterprise */}
      <Footer />
    </>
  );
}

export default Enterprise;