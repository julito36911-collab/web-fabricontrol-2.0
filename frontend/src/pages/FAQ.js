import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQ';
import { useLanguage } from '../contexts/LanguageContext';

function FAQ() {
  const { isRtl } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col bg-[#0b0f1a] ${isRtl ? 'font-hebrew dir-rtl' : 'font-sans dir-ltr'}`}>
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-4">
           {/* Reusing the FAQ component already defined in components/FAQ.js */}
           <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;