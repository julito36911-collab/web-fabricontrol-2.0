import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FAQ({ openLicenseModal }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: '💻 Instalación y Configuración',
      questions: [
        {
          q: '¿Cómo instalo FabriControl?',
          a: 'Descarga el instalador desde nuestra página, ejecútalo y sigue el asistente de instalación. El proceso toma menos de 5 minutos.'
        }
      ]
    }
  ];

  return (
    <>
      <Header onRequestLicense={openLicenseModal} />
      {/* Resto del contenido del FAQ */}
      <Footer />
    </>
  );
}

export default FAQ;