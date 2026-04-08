import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

// ═══ TRANSLATIONS ═══
const txt = {
  es: {
    tag: "Solicitar cotización",
    title: "Contame sobre tu proyecto",
    sub: "Completá este formulario en 2 minutos. Con esta info te doy una cotización estimada.",
    steps: ["Paso 1 de 4 — Tu empresa", "Paso 2 de 4 — Tu necesidad", "Paso 3 de 4 — Detalles", "Paso 4 de 4 — Resumen"],
    next: "Siguiente →",
    back: "← Atrás",
    edit: "← Editar",
    viewSummary: "Ver resumen →",
    s1Company: "Nombre de la empresa", s1CompanyPh: "Ej: Talleres López",
    s1Name: "Tu nombre", s1NamePh: "Ej: Carlos López",
    s1Email: "Email",
    s1Whatsapp: "WhatsApp (opcional)", s1WhatsappPh: "+52 55 1234 5678",
    s1Country: "País", s1CountryPh: "Ej: México / Argentina / Israel",
    s1Industry: "Industria",
    s1Size: "¿Cuántos empleados tienen?",
    s2Service: "¿Qué tipo de servicio necesitás?",
    s2ServiceHint: "Podés elegir más de uno",
    s2Problem: "¿Qué problema querés resolver?",
    s2ProblemHint: "Describilo como si me lo explicaras tomando un café",
    s2ProblemPh: "Ej: Hoy manejamos todo con Excel y WhatsApp. Perdemos órdenes, no sabemos cuánto material tenemos...",
    s3Modules: "¿Qué funciones necesitás?",
    s3ModulesHint: "Basado en lo que elegiste — seleccioná lo que aplique",
    s3ModulesEmpty: "Volvé al paso 2 y seleccioná un servicio",
    s3ExtraQLabel: "Preguntas adicionales (opcionales)",
    s3Current: "¿Cómo trabajan hoy?",
    s3Users: "¿Cuántos usuarios van a usar el sistema?",
    s3Extra: "Algo más que quieras agregar (opcional)",
    s3ExtraPh: "Requisitos especiales, integraciones, idiomas, etc.",
    s3Budget: "Presupuesto aproximado (opcional)",
    s4Label: "📋 Resumen de tu solicitud",
    s4Hint: "Revisá que todo esté bien. Este resumen se envía directamente.",
    s4Copy: "📋 Copiar resumen", s4Copied: "✓ Copiado",
    s4Wa: "💬 Enviar por WhatsApp", s4Email: "📧 Enviar por Email",
  },
  he: {
    tag: "בקשת הצעת מחיר",
    title: "ספרו לי על הפרויקט שלכם",
    sub: "מלאו את הטופס הזה ב-2 דקות. עם המידע הזה אתן לכם הצעת מחיר משוערת.",
    steps: ["שלב 1 מתוך 4 — החברה שלך", "שלב 2 מתוך 4 — הצורך שלך", "שלב 3 מתוך 4 — פרטים", "שלב 4 מתוך 4 — סיכום"],
    next: "הבא ←", back: "חזרה →", edit: "עריכה →", viewSummary: "צפייה בסיכום ←",
    s1Company: "שם החברה", s1CompanyPh: "לדוגמה: מפעל כהן",
    s1Name: "השם שלך", s1NamePh: "לדוגמה: דוד כהן",
    s1Email: "אימייל",
    s1Whatsapp: "וואטסאפ (אופציונלי)", s1WhatsappPh: "050-1234567",
    s1Country: "מדינה", s1CountryPh: "לדוגמה: ישראל",
    s1Industry: "תעשייה",
    s1Size: "כמה עובדים יש לכם?",
    s2Service: "איזה סוג שירות אתם צריכים?",
    s2ServiceHint: "אפשר לבחור יותר מאחד",
    s2Problem: "איזו בעיה אתם רוצים לפתור?",
    s2ProblemHint: "תתארו את זה כאילו אתם מסבירים לי על כוס קפה",
    s2ProblemPh: "לדוגמה: היום אנחנו מנהלים הכל עם אקסל ווואטסאפ. אנחנו מאבדים הזמנות...",
    s3Modules: "אילו פונקציות אתם צריכים?",
    s3ModulesHint: "לפי מה שבחרתם — בחרו את מה שרלוונטי",
    s3ModulesEmpty: "חזרו לשלב 2 ובחרו שירות",
    s3ExtraQLabel: "שאלות נוספות (אופציונלי)",
    s3Current: "איך אתם עובדים היום?",
    s3Users: "כמה משתמשים ישתמשו במערכת?",
    s3Extra: "משהו נוסף שתרצו להוסיף (אופציונלי)",
    s3ExtraPh: "דרישות מיוחדות, אינטגרציות, שפות וכו׳",
    s3Budget: "תקציב משוער (אופציונלי)",
    s4Label: "📋 סיכום הבקשה שלך",
    s4Hint: "בדקו שהכל בסדר. הסיכום הזה נשלח ישירות.",
    s4Copy: "📋 העתק סיכום", s4Copied: "✓ הועתק",
    s4Wa: "💬 שלח בוואטסאפ", s4Email: "📧 שלח באימייל",
  }
};

// ═══ CHIP DATA ═══
const industryChips = [
  { value: 'metalurgia', es: '⚙️ Metalurgia', he: '⚙️ מתכת' },
  { value: 'alimentos', es: '🍞 Alimentos', he: '🍞 מזון' },
  { value: 'textil', es: '🧵 Textil', he: '🧵 טקסטיל' },
  { value: 'plasticos', es: '🧪 Plásticos', he: '🧪 פלסטיק' },
  { value: 'quimica', es: '⚗️ Química', he: '⚗️ כימיה' },
  { value: 'carpinteria', es: '🪵 Carpintería', he: '🪵 נגרות' },
  { value: 'comercio', es: '🛒 Comercio / Retail', he: '🛒 מסחר / קמעונאות' },
  { value: 'salud', es: '🏥 Salud / Clínica', he: '🏥 בריאות / מרפאה' },
  { value: 'servicios', es: '💼 Servicios', he: '💼 שירותים' },
  { value: 'otra', es: '📦 Otra', he: '📦 אחר' },
];
const sizeChips = ['1-5', '6-15', '16-30', '31-50', '50+'];

const serviceChips = [
  { value: 'erp', es: '☁️ Sistema de gestión (ERP)', he: '☁️ מערכת ניהול (ERP)' },
  { value: 'app', es: '📱 App / Plataforma web', he: '📱 אפליקציה / פלטפורמה' },
  { value: 'iot', es: '📡 Monitoreo IoT', he: '📡 ניטור IoT' },
  { value: 'consultoria', es: '🔧 Consultoría de procesos', he: '🔧 ייעוץ תהליכים' },
  { value: 'fabrios', es: '🏭 FabriOS (ERP listo para fábricas)', he: '🏭 FabriOS (מערכת מוכנה למפעלים)' },
  { value: 'no_se', es: '🤷 No sé, necesito asesoría', he: '🤷 לא בטוח, צריך ייעוץ' },
];

const currentToolChips = [
  { value: 'excel', es: '📊 Excel', he: '📊 אקסל' },
  { value: 'whatsapp', es: '💬 WhatsApp', he: '💬 וואטסאפ' },
  { value: 'papel', es: '📝 Papel', he: '📝 נייר' },
  { value: 'otro_software', es: '💻 Otro software', he: '💻 תוכנה אחרת' },
  { value: 'nada', es: '🤷 Nada organizado', he: '🤷 שום דבר מסודר' },
];
const usersChips = ['1-3', '4-10', '11-25', '25+'];
const budgetChips = [
  { value: '<2000', es: '< ₪2,000/mes', he: 'פחות מ-₪2,000/חודש' },
  { value: '2000-5000', es: '₪2,000-₪5,000/mes', he: '₪2,000-₪5,000/חודש' },
  { value: '5000-15000', es: '₪5,000-₪15,000', he: '₪5,000-₪15,000' },
  { value: '15000+', es: '₪15,000+', he: '₪15,000+' },
  { value: 'no_se_budget', es: 'No sé aún', he: 'עדיין לא יודע' },
];

// ═══ DYNAMIC MODULES BY SERVICE ═══
const modulesByService = {
  erp: {
    title: { es: '☁️ GESTIÓN / ERP', he: '☁️ ניהול / ERP' },
    items: [
      { value: 'cotizaciones', es: 'Cotizaciones / Presupuestos', he: 'הצעות מחיר' },
      { value: 'ordenes', es: 'Órdenes de producción / trabajo', he: 'הזמנות ייצור / עבודה' },
      { value: 'inventario', es: 'Inventario / Stock', he: 'מלאי' },
      { value: 'calidad', es: 'Control de calidad', he: 'בקרת איכות' },
      { value: 'planificacion', es: 'Planificación diaria', he: 'תכנון יומי' },
      { value: 'finanzas', es: 'Finanzas / Costos', he: 'כספים / עלויות' },
      { value: 'crm', es: 'Clientes (CRM)', he: 'לקוחות (CRM)' },
      { value: 'compras', es: 'Compras / Proveedores', he: 'רכש / ספקים' },
      { value: 'facturacion', es: 'Facturación', he: 'חשבוניות' },
      { value: 'reportes_erp', es: 'Reportes / Dashboard', he: 'דוחות / לוח בקרה' },
      { value: 'app_movil_erp', es: 'App móvil para operarios', he: 'אפליקציה לעובדים' },
      { value: 'rrhh', es: 'Recursos humanos / Turnos', he: 'משאבי אנוש / משמרות' },
    ]
  },
  app: {
    title: { es: '📱 APP / PLATAFORMA WEB', he: '📱 אפליקציה / פלטפורמה' },
    items: [
      { value: 'portal_clientes', es: 'Portal de clientes', he: 'פורטל לקוחות' },
      { value: 'marketplace', es: 'Marketplace', he: 'מרקטפלייס' },
      { value: 'reservas', es: 'Reservas / Turnos online', he: 'הזמנות / תורים אונליין' },
      { value: 'pagos', es: 'Pagos online', he: 'תשלומים אונליין' },
      { value: 'usuarios', es: 'Registro / Login de usuarios', he: 'הרשמה / התחברות משתמשים' },
      { value: 'catalogo', es: 'Catálogo de productos / servicios', he: 'קטלוג מוצרים / שירותים' },
      { value: 'notificaciones', es: 'Notificaciones (email, push, SMS)', he: 'התראות (אימייל, פוש, SMS)' },
      { value: 'chat_app', es: 'Chat / Mensajería interna', he: 'צ׳אט / הודעות פנימיות' },
      { value: 'panel_admin', es: 'Panel de administración', he: 'פאנל ניהול' },
      { value: 'reportes_app', es: 'Reportes / Estadísticas', he: 'דוחות / סטטיסטיקות' },
      { value: 'multi_idioma', es: 'Multi-idioma', he: 'רב שפות' },
      { value: 'app_movil_plat', es: 'Versión móvil / App', he: 'גרסת מובייל / אפליקציה' },
    ]
  },
  iot: {
    title: { es: '📡 IoT / MONITOREO', he: '📡 IoT / ניטור' },
    items: [
      { value: 'sensores', es: 'Conexión de sensores a máquinas', he: 'חיבור חיישנים למכונות' },
      { value: 'dashboard_rt', es: 'Dashboard en tiempo real', he: 'לוח בקרה בזמן אמת' },
      { value: 'alertas', es: 'Alertas automáticas', he: 'התראות אוטומטיות' },
      { value: 'predictivo', es: 'Mantenimiento predictivo', he: 'תחזוקה מנבאת' },
      { value: 'historial_datos', es: 'Historial de datos / Gráficos', he: 'היסטוריית נתונים / גרפים' },
      { value: 'costo_real', es: 'Costo real de producción', he: 'עלות ייצור אמיתית' },
      { value: 'consumo_energia', es: 'Consumo de energía', he: 'צריכת אנרגיה' },
    ]
  },
  consultoria: {
    title: { es: '🔧 CONSULTORÍA', he: '🔧 ייעוץ' },
    items: [
      { value: 'mapeo', es: 'Mapeo de procesos actuales', he: 'מיפוי תהליכים קיימים' },
      { value: 'optimizacion', es: 'Optimización de flujos de trabajo', he: 'אופטימיזציית תהליכי עבודה' },
      { value: 'cuellos', es: 'Identificar cuellos de botella', he: 'זיהוי צווארי בקבוק' },
      { value: 'desperdicio', es: 'Reducción de desperdicio', he: 'הפחתת בזבוז' },
      { value: 'capacitacion', es: 'Capacitación del equipo', he: 'הדרכת צוות' },
      { value: 'documentacion', es: 'Documentación de procesos', he: 'תיעוד תהליכים' },
      { value: 'implementacion', es: 'Plan de implementación digital', he: 'תוכנית הטמעה דיגיטלית' },
    ]
  },
  fabrios: {
    title: { es: '🏭 FABRIOS — YA INCLUYE', he: '🏭 FABRIOS — כבר כולל' },
    items: [
      { value: 'fab_produccion', es: '✓ Producción + BOM + Rutas', he: '✓ ייצור + BOM + מסלולים' },
      { value: 'fab_inventario', es: '✓ Inventario trazable', he: '✓ מלאי עם מעקב' },
      { value: 'fab_calidad', es: '✓ Control de calidad (IQC + OQC)', he: '✓ בקרת איכות (IQC + OQC)' },
      { value: 'fab_cotizaciones', es: '✓ Cotizaciones con PDF', he: '✓ הצעות מחיר עם PDF' },
      { value: 'fab_iot', es: '✓ Monitoreo IoT de máquinas', he: '✓ ניטור IoT למכונות' },
      { value: 'fab_movil', es: '✓ App móvil offline', he: '✓ אפליקציה עם מצב אופליין' },
      { value: 'fab_finanzas', es: '✓ Finanzas + Costos', he: '✓ כספים + עלויות' },
      { value: 'fab_idiomas', es: '✓ 3 idiomas (ES/EN/HE)', he: '✓ 3 שפות (ES/EN/HE)' },
      { value: 'fab_extra', es: 'Necesito algo adicional...', he: 'אני צריך משהו נוסף...' },
    ]
  },
  no_se: {
    title: { es: '🤷 CONTAME MÁS', he: '🤷 ספרו לי עוד' },
    items: [
      { value: 'ns_organizar', es: 'Quiero organizar mi operación', he: 'אני רוצה לארגן את הפעילות' },
      { value: 'ns_vender', es: 'Quiero vender online', he: 'אני רוצה למכור אונליין' },
      { value: 'ns_monitorear', es: 'Quiero monitorear mis máquinas', he: 'אני רוצה לנטר את המכונות' },
      { value: 'ns_app', es: 'Quiero una app para mis clientes', he: 'אני רוצה אפליקציה ללקוחות' },
      { value: 'ns_automatizar', es: 'Quiero automatizar procesos manuales', he: 'אני רוצה לאוטמט תהליכים ידניים' },
      { value: 'ns_otro', es: 'Otra cosa (lo explico arriba)', he: 'משהו אחר (הסברתי למעלה)' },
    ]
  }
};

// ═══ EXTRA QUESTIONS PER SERVICE ═══
// Each question: { key, label:{es,he}, chips:[{value,es,he}], multi? }
const extraQuestionsByService = {
  erp: [
    { key: 'erp_sucursales', label: { es: '¿Cuántas sucursales o ubicaciones tienen?', he: 'כמה סניפים או מיקומים יש לכם?' },
      chips: [{ value:'1', es:'1', he:'1' }, { value:'2-3', es:'2-3', he:'2-3' }, { value:'4-10', es:'4-10', he:'4-10' }, { value:'10+', es:'10+', he:'+10' }] },
    { key: 'erp_pdf', label: { es: '¿Necesitan generar documentos PDF (cotizaciones, facturas, reportes)?', he: 'האם אתם צריכים להפיק מסמכי PDF?' },
      chips: [{ value:'si', es:'Sí', he:'כן' }, { value:'no', es:'No', he:'לא' }, { value:'no_se', es:'No sé', he:'לא יודע' }] },
    { key: 'erp_integracion', label: { es: '¿El sistema necesita conectarse con otro software que ya usan?', he: 'האם המערכת צריכה להתחבר לתוכנה אחרת?' },
      chips: [{ value:'no_otro', es:'No tenemos otro software', he:'לא' }, { value:'excel', es:'Excel o Google Sheets', he:'אקסל' }, { value:'otro_erp', es:'Otro ERP o sistema', he:'מערכת אחרת' }, { value:'contabilidad', es:'Contabilidad (facturación)', he:'חשבוניות' }],
      multi: true },
  ],
  app: [
    { key: 'app_usuarios', label: { es: '¿Quién va a usar la plataforma?', he: 'מי ישתמש בפלטפורמה?' },
      chips: [{ value:'clientes', es:'Mis clientes', he:'הלקוחות שלי' }, { value:'equipo', es:'Mi equipo interno', he:'הצוות הפנימי' }, { value:'vendedores', es:'Vendedores externos', he:'מוכרים חיצוניים' }, { value:'publico', es:'El público general', he:'הציבור הרחב' }],
      multi: true },
    { key: 'app_pagos', label: { es: '¿Necesitan pagos online?', he: 'האם צריכים תשלומים אונליין?' },
      chips: [{ value:'si', es:'Sí', he:'כן' }, { value:'no', es:'No', he:'לא' }, { value:'futuro', es:'Tal vez en el futuro', he:'אולי בעתיד' }] },
    { key: 'app_movil', label: { es: '¿Necesitan que funcione como app en celular?', he: 'האם צריך שזה יעבוד כאפליקציה בנייד?' },
      chips: [{ value:'si', es:'Sí es importante', he:'כן חשוב' }, { value:'solo_web', es:'Solo web está bien', he:'רק אתר זה מספיק' }, { value:'ambas', es:'Las dos cosas', he:'שניהם' }] },
  ],
  iot: [
    { key: 'iot_cantidad', label: { es: '¿Cuántas máquinas querés monitorear?', he: 'כמה מכונות אתם רוצים לנטר?' },
      chips: [{ value:'1-3', es:'1-3', he:'1-3' }, { value:'4-10', es:'4-10', he:'4-10' }, { value:'11-20', es:'11-20', he:'11-20' }, { value:'20+', es:'20+', he:'+20' }] },
    { key: 'iot_tipo', label: { es: '¿Qué tipo de máquinas?', he: 'איזה סוג מכונות?' },
      chips: [
        { value:'cnc', es:'CNC (fresadora)', he:'CNC (כרסום)' },
        { value:'torno', es:'Torno', he:'מחרטה' },
        { value:'salvagnini', es:'Salvagnini / Punzonadora', he:'סלבניני / ניקוב' },
        { value:'laser', es:'Cortadora láser', he:'חיתוך לייזר' },
        { value:'prensa', es:'Prensa', he:'מכבש' },
        { value:'inyectora', es:'Inyectora de plástico', he:'מזרק פלסטיק' },
        { value:'horno', es:'Horno industrial', he:'תנור תעשייתי' },
        { value:'compresor', es:'Compresor', he:'מדחס' },
        { value:'otra_maq', es:'Otra', he:'אחר' },
      ], multi: true },
    { key: 'iot_medir', label: { es: '¿Qué querés medir?', he: 'מה אתם רוצים למדוד?' },
      chips: [
        { value:'vibracion', es:'Vibración', he:'רעידות' },
        { value:'temperatura', es:'Temperatura', he:'טמפרטורה' },
        { value:'corriente', es:'Corriente eléctrica', he:'זרם חשמלי' },
        { value:'presion', es:'Presión', he:'לחץ' },
        { value:'humedad', es:'Humedad', he:'לחות' },
        { value:'rpm', es:'Velocidad (RPM)', he:'מהירות' },
        { value:'energia', es:'Consumo energía', he:'צריכת אנרגיה' },
        { value:'no_se_medir', es:'No sé (te asesoro)', he:'לא יודע' },
      ], multi: true },
    { key: 'iot_sensores', label: { es: '¿Ya tienen sensores instalados?', he: 'האם כבר מותקנים חיישנים?' },
      chips: [{ value:'si', es:'Sí ya tenemos', he:'כן כבר יש לנו' }, { value:'no', es:'No, hay que comprar', he:'לא צריך לקנות' }, { value:'no_se', es:'No sé', he:'לא יודע' }] },
    { key: 'iot_wifi', label: { es: '¿Tienen conexión WiFi en la planta?', he: 'האם יש WiFi במפעל?' },
      chips: [{ value:'si_todo', es:'Sí en toda la planta', he:'כן בכל המפעל' }, { value:'solo_oficina', es:'Solo en oficina', he:'רק במשרד' }, { value:'no_wifi', es:'No hay WiFi', he:'אין WiFi' }, { value:'no_se', es:'No sé', he:'לא יודע' }] },
    { key: 'iot_alertas', label: { es: '¿Cómo preferís recibir las alertas?', he: 'איך אתם מעדיפים לקבל התראות?' },
      chips: [
        { value:'whatsapp', es:'WhatsApp', he:'וואטסאפ' },
        { value:'email', es:'Email', he:'אימייל' },
        { value:'dashboard', es:'Dashboard web', he:'לוח בקרה' },
        { value:'push', es:'Push (app móvil)', he:'התראת פוש (אפליקציה)' },
      ], multi: true },
  ],
  consultoria: [
    { key: 'cons_problema', label: { es: '¿Cuál es el problema principal?', he: 'מה הבעיה המרכזית?' },
      chips: [
        { value:'demoras', es:'Demoras en entregas', he:'עיכובים באספקה' },
        { value:'desperdicio', es:'Desperdicio de material', he:'בזבוז חומרים' },
        { value:'ganancia', es:'No sé cuánto gano por producto', he:'לא יודע כמה אני מרוויח' },
        { value:'prioridades', es:'Los empleados no saben qué hacer primero', he:'העובדים לא יודעים מה לעשות קודם' },
        { value:'escala', es:'Crecimos y el proceso no escala', he:'גדלנו והתהליך לא עובד' },
        { value:'otro_prob', es:'Otro', he:'אחר' },
      ], multi: true },
    { key: 'cons_documentado', label: { es: '¿Ya tienen documentados sus procesos?', he: 'האם התהליכים שלכם מתועדים?' },
      chips: [{ value:'si', es:'Sí todo documentado', he:'כן הכל מתועד' }, { value:'parcial', es:'Algo documentado', he:'חלקי' }, { value:'no', es:'No nada', he:'לא כלום' }] },
    { key: 'cons_modalidad', label: { es: '¿Prefieren consultoría remota o presencial?', he: 'מעדיפים ייעוץ מרחוק או פרונטלי?' },
      chips: [{ value:'remota', es:'Remota (videollamada)', he:'מרחוק' }, { value:'presencial', es:'Presencial (si es posible)', he:'פרונטלי' }, { value:'igual', es:'Me da igual', he:'לא משנה' }] },
  ],
  fabrios: [
    { key: 'fab_iot_need', label: { es: '¿Necesitás monitoreo IoT de máquinas?', he: 'האם צריך ניטור IoT למכונות?' },
      chips: [{ value:'si', es:'Sí', he:'כן' }, { value:'no', es:'No por ahora', he:'לא כרגע' }, { value:'no_se', es:'No sé', he:'לא יודע' }] },
    { key: 'fab_cuando', label: { es: '¿Cuándo querés empezar?', he: 'מתי אתם רוצים להתחיל?' },
      chips: [{ value:'asap', es:'Lo antes posible', he:'הכי מהר שאפשר' }, { value:'1-2meses', es:'En 1-2 meses', he:'בעוד 1-2 חודשים' }, { value:'investigando', es:'Solo estoy investigando', he:'רק בודק' }] },
  ],
  // no_se: no extra questions
};

// ═══ CHIP COMPONENT ═══
function ChipGroup({ items, selected, onToggle, multi = false, lang = 'es' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const value = typeof item === 'string' ? item : item.value;
        const label = typeof item === 'string' ? item : (item[lang] || item.es);
        const isSelected = multi ? selected.includes(value) : selected === value;
        return (
          <button key={value} type="button" onClick={() => onToggle(value)}
            className={`px-4 py-2.5 rounded-lg border text-sm transition-all cursor-pointer select-none ${
              isSelected ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-[#1e293b] text-gray-400 bg-[#111827] hover:border-gray-500'
            }`}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ═══ MAIN COMPONENT ═══
function Cotizacion() {
  const { language, isRtl } = useLanguage();
  const l = txt[language] || txt.es;

  const [step, setStep] = useState(0);
  const [copyMsg, setCopyMsg] = useState(false);

  // Step 1
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  // Step 2
  const [services, setServices] = useState([]);
  const [problem, setProblem] = useState('');
  // Step 3
  const [selectedModules, setSelectedModules] = useState([]);
  const [extraAnswers, setExtraAnswers] = useState({});
  const [currentTools, setCurrentTools] = useState([]);
  const [users, setUsers] = useState('');
  const [extra, setExtra] = useState('');
  const [budget, setBudget] = useState('');

  const toggleMulti = useCallback((setter) => (value) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  }, []);

  // Extra answers handler
  const setExtraAnswer = useCallback((key, value, multi) => {
    setExtraAnswers(prev => {
      if (multi) {
        const current = prev[key] || [];
        const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
        return { ...prev, [key]: updated };
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const getLabel = (items, value) => {
    const item = items.find(i => (typeof i === 'string' ? i : i.value) === value);
    if (!item) return value;
    return typeof item === 'string' ? item : (item.es || value);
  };

  const getLabels = (items, values) => {
    if (Array.isArray(values)) return values.map(v => getLabel(items, v)).join(', ');
    return getLabel(items, values);
  };

  const getModuleLabels = () => {
    return selectedModules.map(val => {
      for (const svc of Object.values(modulesByService)) {
        const item = svc.items.find(i => i.value === val);
        if (item) return item.es;
      }
      return val;
    }).join(', ');
  };

  // Build extra answers summary (always Spanish)
  const buildExtraSummary = () => {
    const lines = [];
    services.forEach(svc => {
      const questions = extraQuestionsByService[svc];
      if (!questions) return;
      questions.forEach(q => {
        const answer = extraAnswers[q.key];
        if (!answer || (Array.isArray(answer) && answer.length === 0)) return;
        const labelEs = q.label.es;
        const answerStr = Array.isArray(answer)
          ? answer.map(v => getLabel(q.chips, v)).join(', ')
          : getLabel(q.chips, answer);
        lines.push(`${labelEs}: ${answerStr}`);
      });
    });
    return lines.join('\n');
  };

  // Summary always in Spanish
  const buildSummary = () => {
    const extraSummary = buildExtraSummary();
    return `═══ SOLICITUD DE COTIZACIÓN ═══

Empresa: ${company || '-'}
Contacto: ${contactName || '-'}
Email: ${email || '-'}
WhatsApp: ${whatsapp || '-'}
País: ${country || '-'}
Industria: ${industry ? getLabels(industryChips, industry) : '-'}
Empleados: ${size || '-'}

Servicios solicitados: ${services.length ? getLabels(serviceChips, services) : '-'}

Problema a resolver:
${problem || '-'}

Funciones necesarias: ${selectedModules.length ? getModuleLabels() : '-'}
${extraSummary ? `\nDetalles por servicio:\n${extraSummary}\n` : ''}
Herramientas actuales: ${currentTools.length ? getLabels(currentToolChips, currentTools) : '-'}
Usuarios del sistema: ${users || '-'}
Presupuesto: ${budget ? getLabels(budgetChips, budget) : '-'}

Notas adicionales: ${extra || '-'}`;
  };

  const summary = buildSummary();
  const waNum = '972526489461';
  const waLink = `https://wa.me/${waNum}?text=${encodeURIComponent(summary)}`;
  const emailSubject = encodeURIComponent(`Cotización — ${company || 'Nuevo cliente'}`);
  const emailLink = `mailto:julio@fabricontrol.online?subject=${emailSubject}&body=${encodeURIComponent(summary)}`;

  const nextStep = () => { setStep(s => Math.min(s + 1, 3)); window.scrollTo(0, 0); };
  const prevStep = () => { setStep(s => Math.max(s - 1, 0)); window.scrollTo(0, 0); };

  const copySummary = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopyMsg(true);
      setTimeout(() => setCopyMsg(false), 2000);
    });
  };

  // Get dynamic modules + extra questions based on selected services
  const dynamicSections = services
    .filter(svc => modulesByService[svc])
    .map(svc => ({ key: svc, ...modulesByService[svc], extraQs: extraQuestionsByService[svc] || [] }));

  const inputClass = "w-full px-4 py-3 bg-[#111827] border border-[#1e293b] rounded-lg text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-colors text-sm";

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <Header />

      <div className="pt-28 pb-4 px-4 text-center max-w-2xl mx-auto">
        <span className="inline-block text-xs font-mono font-bold tracking-widest text-orange-400 uppercase mb-3">{l.tag}</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{l.title}</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto">{l.sub}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="flex gap-2 mb-2 mt-6">
          {[0,1,2,3].map(i => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i < step ? 'bg-green-500' : i === step ? 'bg-orange-500' : 'bg-[#1e293b]'}`} />
          ))}
        </div>
        <p className="text-xs font-mono text-gray-500 mb-8">{l.steps[step]}</p>

        {/* ═══ STEP 1: EMPRESA ═══ */}
        {step === 0 && (
          <div className="space-y-5">
            <Field label={l.s1Company}><input className={inputClass} value={company} onChange={e => setCompany(e.target.value)} placeholder={l.s1CompanyPh} /></Field>
            <Field label={l.s1Name}><input className={inputClass} value={contactName} onChange={e => setContactName(e.target.value)} placeholder={l.s1NamePh} /></Field>
            <Field label={l.s1Email}><input className={inputClass} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="carlos@empresa.com" /></Field>
            <Field label={l.s1Whatsapp}><input className={inputClass} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder={l.s1WhatsappPh} /></Field>
            <Field label={l.s1Country}><input className={inputClass} value={country} onChange={e => setCountry(e.target.value)} placeholder={l.s1CountryPh} /></Field>
            <Field label={l.s1Industry}><ChipGroup items={industryChips} selected={industry} onToggle={setIndustry} lang={language} /></Field>
            <Field label={l.s1Size}><ChipGroup items={sizeChips} selected={size} onToggle={setSize} lang={language} /></Field>
            <BtnRow><button onClick={nextStep} className="btn-next">{l.next}</button></BtnRow>
          </div>
        )}

        {/* ═══ STEP 2: NECESIDAD ═══ */}
        {step === 1 && (
          <div className="space-y-5">
            <Field label={l.s2Service} hint={l.s2ServiceHint}>
              <ChipGroup items={serviceChips} selected={services} onToggle={toggleMulti(setServices)} multi lang={language} />
            </Field>
            <Field label={l.s2Problem} hint={l.s2ProblemHint}>
              <textarea className={`${inputClass} min-h-[100px] resize-y`} value={problem} onChange={e => setProblem(e.target.value)} placeholder={l.s2ProblemPh} />
            </Field>
            <BtnRow>
              <button onClick={prevStep} className="btn-back">{l.back}</button>
              <button onClick={nextStep} className="btn-next">{l.next}</button>
            </BtnRow>
          </div>
        )}

        {/* ═══ STEP 3: DETALLES DINÁMICOS + EXTRA QUESTIONS ═══ */}
        {step === 2 && (
          <div className="space-y-5">
            <Field label={l.s3Modules} hint={l.s3ModulesHint}>
              {dynamicSections.length === 0 ? (
                <p className="text-gray-500 text-sm italic">{l.s3ModulesEmpty}</p>
              ) : (
                dynamicSections.map(section => (
                  <div key={section.key} className="mb-6">
                    {/* Module chips */}
                    <p className="text-xs font-mono font-bold text-orange-400 tracking-wider uppercase mb-2">
                      {section.title[language] || section.title.es}
                    </p>
                    <ChipGroup items={section.items} selected={selectedModules} onToggle={toggleMulti(setSelectedModules)} multi lang={language} />

                    {/* Extra questions for this service */}
                    {section.extraQs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#1e293b]/50 space-y-4">
                        {section.extraQs.map(q => (
                          <div key={q.key}>
                            <p className="text-sm font-medium text-gray-300 mb-2">{q.label[language] || q.label.es}</p>
                            <ChipGroup
                              items={q.chips}
                              selected={q.multi ? (extraAnswers[q.key] || []) : (extraAnswers[q.key] || '')}
                              onToggle={(val) => setExtraAnswer(q.key, val, !!q.multi)}
                              multi={!!q.multi}
                              lang={language}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </Field>

            <hr className="border-[#1e293b]" />

            <Field label={l.s3Current}>
              <ChipGroup items={currentToolChips} selected={currentTools} onToggle={toggleMulti(setCurrentTools)} multi lang={language} />
            </Field>
            <Field label={l.s3Users}>
              <ChipGroup items={usersChips} selected={users} onToggle={setUsers} lang={language} />
            </Field>
            <Field label={l.s3Extra}>
              <textarea className={`${inputClass} min-h-[80px] resize-y`} value={extra} onChange={e => setExtra(e.target.value)} placeholder={l.s3ExtraPh} />
            </Field>
            <Field label={l.s3Budget}>
              <ChipGroup items={budgetChips} selected={budget} onToggle={setBudget} lang={language} />
            </Field>
            <BtnRow>
              <button onClick={prevStep} className="btn-back">{l.back}</button>
              <button onClick={nextStep} className="btn-next">{l.viewSummary}</button>
            </BtnRow>
          </div>
        )}

        {/* ═══ STEP 4: RESUMEN ═══ */}
        {step === 3 && (
          <div className="space-y-4">
            <Field label={l.s4Label} hint={l.s4Hint}>
              <pre className="bg-[#111827] border border-[#1e293b] rounded-xl p-5 text-sm leading-7 text-gray-400 font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto" dir="ltr" style={{ textAlign: 'left' }}>
                {summary}
              </pre>
            </Field>
            <button onClick={copySummary} className="w-full py-3 bg-green-500 hover:bg-green-400 text-[#0a0e17] font-bold rounded-lg transition-all text-sm">{l.s4Copy}</button>
            {copyMsg && <p className="text-center text-green-400 font-semibold text-sm">{l.s4Copied}</p>}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-all text-sm text-center">{l.s4Wa}</a>
            <a href={emailLink} className="block w-full py-3 bg-[#111827] hover:bg-[#1f2937] text-white font-bold rounded-lg transition-all text-sm text-center border border-[#1e293b]">{l.s4Email}</a>
            <BtnRow><button onClick={prevStep} className="btn-back">{l.edit}</button></BtnRow>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ HELPERS ═══
function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      {hint && <span className="block text-xs text-gray-500 mb-2">{hint}</span>}
      {children}
    </div>
  );
}

function BtnRow({ children }) {
  return (
    <div className="flex gap-3 mt-6">
      <style>{`
        .btn-next { margin-inline-start:auto; padding:0.75rem 2rem; background:#f97316; color:#0a0e17; font-weight:700; border-radius:0.5rem; border:none; cursor:pointer; font-size:0.875rem; transition:all 0.2s; }
        .btn-next:hover { background:#fb923c; }
        .btn-back { padding:0.75rem 1.5rem; background:transparent; color:#94a3b8; font-weight:600; border-radius:0.5rem; border:1px solid #1e293b; cursor:pointer; font-size:0.875rem; transition:all 0.2s; }
        .btn-back:hover { border-color:#475569; }
      `}</style>
      {children}
    </div>
  );
}

export default Cotizacion;
