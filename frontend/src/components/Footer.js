import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    desc: "El ERP diseñado específicamente para talleres y fábricas latinoamericanas.",
    product: "Producto",
    features: "Características",
    pricing: "Precios",
    docs: "Documentación Técnica",
    comparison: "Comparación",
    resources: "Recursos",
    campus: "Campus Gratuito",
    catalog: "Catálogo de Productos",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contacto",
    email: "Email",
    whatsapp: "WhatsApp",
    liveChat: "Chat en vivo disponible",
    rights: "Todos los derechos reservados.",
    terms: "Términos y Condiciones",
    privacy: "Política de Privacidad"
  },
  en: {
    desc: "The ERP specifically designed for Latin American workshops and factories.",
    product: "Product",
    features: "Features",
    pricing: "Pricing",
    docs: "Technical Documentation",
    comparison: "Comparison",
    resources: "Resources",
    campus: "Free Campus",
    catalog: "Product Catalog",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contact",
    email: "Email",
    whatsapp: "WhatsApp",
    liveChat: "Live Chat available",
    rights: "All rights reserved.",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy"
  },
  he: {
    desc: "מערכת ה-ERP שתוכננה במיוחד עבור בתי מלאכה ומפעלים.",
    product: "מוצר",
    features: "תכונות",
    pricing: "מחירים",
    docs: "תיעוד טכני",
    comparison: "השוואה",
    resources: "משאבים",
    campus: "קמפוס בחינם",
    catalog: "קטלוג מוצרים",
    faq: "שאלות נפוצות",
    blog: "בלוג",
    contact: "צור קשר",
    email: "אימייל",
    whatsapp: "ווטסאפ",
    liveChat: "צ'אט חי זמין",
    rights: "כל הזכויות שמורות.",
    terms: "תנאי שימוש",
    privacy: "מדיניות פרטיות"
  }
};

function Footer() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  return (
    <footer className={`footer ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="font-bold text-white mb-4">FabriControl</h4>
            <p style={{opacity: 0.8}}>{l.desc}</p>
          </div>
          
          <div className="footer-section">
            <h4 className="font-bold text-white mb-4">{l.product}</h4>
            <ul className="footer-links">
              <li><Link to="/caracteristicas">{l.features}</Link></li>
              <li><Link to="/precios">{l.pricing}</Link></li>
              <li><Link to="/documentacion">{l.docs}</Link></li>
              <li><Link to="/comparacion">{l.comparison}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="font-bold text-white mb-4">{l.resources}</h4>
            <ul className="footer-links">
              <li><Link to="/recursos">{l.campus}</Link></li>
              <li><a href="/productos/">{l.catalog}</a></li>
              <li><Link to="/faq">{l.faq}</Link></li>
              <li><a href="#">{l.blog}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="font-bold text-white mb-4">{l.contact}</h4>
            <ul className="footer-links">
              <li>📧 <a href="mailto:info@fabricontrol.online">{l.email}: info@fabricontrol.online</a></li>
              <li>📱 <a href="https://wa.me/972526489461">WhatsApp: +972 52-648-9461</a></li>
              <li>💬 {l.liveChat}</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom border-t border-white/5 pt-8 mt-12 text-sm text-center">
          <p>&copy; 2026 FabriControl. {l.rights}</p>
          <p style={{marginTop: '0.5rem'}} className="opacity-60 flex gap-4 justify-center">
            <Link to="/terms" className="hover:text-cyan-400">{l.terms}</Link> 
            <Link to="/privacy" className="hover:text-cyan-400">{l.privacy}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;