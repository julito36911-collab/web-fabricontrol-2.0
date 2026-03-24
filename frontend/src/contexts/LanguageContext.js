import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    nav_home: "Inicio",
    nav_features: "Características",
    nav_pricing: "Precios",
    nav_resources: "Campus de Recursos",
    nav_enterprise: "Enterprise",
    nav_faq: "FAQ",
    plan_best_value: "⭐ Mejor Valor",
    plan_annual: "Pago Anual",
    resources_title: "Campus de Recursos",
    resources_calc: "Calculadoras de Materiales",
    resources_sales: "Plantillas de Ventas",
    resources_checklists: "Checklists de Producción",
    resources_kpi: "KPIs de Dirección",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    nav_home: "Home",
    nav_features: "Features",
    nav_pricing: "Pricing",
    nav_resources: "Resource Campus",
    nav_enterprise: "Enterprise",
    nav_faq: "FAQ",
    plan_best_value: "⭐ Best Value",
    plan_annual: "Annual Plan",
    resources_title: "Resource Campus",
    resources_calc: "Material Weight Calculators",
    resources_sales: "Sales Templates",
    resources_checklists: "Production Checklists",
    resources_kpi: "Management KPIs",
    footer_rights: "All rights reserved."
  },
  he: {
    nav_home: "דף הבית",
    nav_features: "תכונות",
    nav_pricing: "מחירים",
    nav_resources: "קמפוס משאבים",
    nav_enterprise: "ארגוני",
    nav_faq: "שאלות נפוצות",
    plan_best_value: "⭐ המשתלם ביותר",
    plan_annual: "תשלום שנתי",
    resources_title: "קמפוס משאבים",
    resources_calc: "מחשבוני חומרים",
    resources_sales: "תבניות מכירה",
    resources_checklists: "צ'ק-ליסטים לייצור",
    resources_kpi: "מדדי ביצוע (KPI) לניהול",
    footer_rights: "כל הזכויות שמורות."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Default to Spanish

  useEffect(() => {
    const isRtl = language === 'he';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    
    // Switch global font families based on language
    if (isRtl) {
      document.body.style.fontFamily = "'Heebo', 'Rubik', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl: language === 'he' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
