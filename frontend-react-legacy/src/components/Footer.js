import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  es: {
    desc: "Software industrial a medida. ERP, apps, IoT y consultoría para manufactura.",
    products: "Productos",
    fabrios: "FabriOS (Próximamente)",
    fabricontrol: "FabriControl",
    compare: "Comparativa",
    services: "Servicios",
    svc1: "Software a medida",
    svc2: "Apps / Plataformas",
    svc3: "IoT Industrial",
    svc4: "Consultoría",
    contact: "Contacto",
    email: "Email",
    whatsapp: "WhatsApp",
    quote: "Solicitar cotización",
    rights: "Todos los derechos reservados.",
    terms: "Términos y Condiciones",
    privacy: "Política de Privacidad"
  },
  he: {
    desc: "תוכנה תעשייתית מותאמת. ERP, אפליקציות, IoT וייעוץ לתעשייה.",
    products: "מוצרים",
    fabrios: "FabriOS (בקרוב)",
    fabricontrol: "FabriControl",
    compare: "השוואה",
    services: "שירותים",
    svc1: "תוכנה מותאמת",
    svc2: "אפליקציות / פלטפורמות",
    svc3: "IoT תעשייתי",
    svc4: "ייעוץ",
    contact: "צור קשר",
    email: "אימייל",
    whatsapp: "וואטסאפ",
    quote: "בקשת הצעת מחיר",
    rights: "כל הזכויות שמורות.",
    terms: "תנאי שימוש",
    privacy: "מדיניות פרטיות"
  }
};

function Footer() {
  const { language, isRtl } = useLanguage();
  const l = translations[language] || translations.es;

  return (
    <footer className={`bg-[#0a0e17] border-t border-white/5 pt-16 pb-8 px-4 ${isRtl ? 'dir-rtl text-right' : 'text-left'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h4 className="font-extrabold text-white text-lg mb-3">Julio Mirabal</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{l.desc}</p>
            <p className="text-xs text-gray-600 mt-3">🇦🇷 🇮🇱</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">{l.products}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#productos" className="hover:text-orange-400 transition-colors">{l.fabrios}</a></li>
              <li><a href="/#productos" className="hover:text-orange-400 transition-colors">{l.fabricontrol}</a></li>
              <li><a href="/#productos" className="hover:text-orange-400 transition-colors">{l.compare}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">{l.services}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#servicios" className="hover:text-orange-400 transition-colors">{l.svc1}</a></li>
              <li><a href="/#servicios" className="hover:text-orange-400 transition-colors">{l.svc2}</a></li>
              <li><a href="/#servicios" className="hover:text-orange-400 transition-colors">{l.svc3}</a></li>
              <li><a href="/#servicios" className="hover:text-orange-400 transition-colors">{l.svc4}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">{l.contact}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={(e) => { navigator.clipboard.writeText('info@fabricontrol.online'); e.target.textContent = '✅ Copiado: info@fabricontrol.online'; setTimeout(() => { e.target.textContent = '📧 info@fabricontrol.online'; }, 3000); }} className="hover:text-orange-400 transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-inherit text-sm">📧 info@fabricontrol.online</button></li>
              <li><a href="https://wa.me/972526489461" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">📱 +972 52-648-9461</a></li>
              <li><Link to="/cotizacion" className="hover:text-orange-400 transition-colors">{l.quote}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          <p>&copy; 2026 Julio Mirabal. {l.rights}</p>
          <p className="mt-2 flex gap-4 justify-center">
            <Link to="/terms" className="hover:text-orange-400 transition-colors">{l.terms}</Link>
            <Link to="/privacy" className="hover:text-orange-400 transition-colors">{l.privacy}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
