# CLAUDE.md — web-fabricontrol-2.0

## Proyecto
**fabricontrol.online** — Web comercial de Julio Mirabal. Muestra productos ERP industriales y servicios de desarrollo a medida.

**Repo:** github.com/julito36911-collab/web-fabricontrol-2.0

## Productos (orden de prioridad)
1. **FabriControl** — ERP industrial disponible ahora. Producto PRINCIPAL. Cotizaciones inteligentes, producción visual, inventario, BOM, control de máquinas, calidad, finanzas, app móvil, soporte en 3 idiomas (ES/EN/HE). Demo: https://fabricontrol-1.emergent.host/ (usuario: julito36911@gmail.com / password123)
2. **FabriOS** — ERP + IoT + IA. PRÓXIMAMENTE. 45+ módulos, monitoreo IoT, IA predictiva, app móvil offline. La web tiene campo de email para "notificarme cuando esté disponible".

**IMPORTANTE:** No mencionar "local" ni "nube" al referirse a los productos. FabriControl ≠ FabriOS.

## Servicios a medida
1. Software a medida (ERPs, gestión, producción)
2. Apps / Plataformas web (portal clientes, marketplace, reservas)
3. Automatización IoT (sensores, dashboard, alertas, mantenimiento predictivo)
4. Consultoría de procesos (mapeo, optimización, documentación)

## Stack técnico
- **Frontend:** React 19 + Tailwind CSS 3.4 + Craco (CRA override) + React Router
- **Backend:** FastAPI + Python + Google Gemini 2.5 Flash (chat IA)
- **Hosting frontend:** Hostinger (FTP auto-deploy via GitHub Actions)
- **Hosting backend:** Render.com (auto-deploy desde branch `main`)
- **Email transaccional:** Resend
- **Chat IA:** Google Gemini (EMERGENT_LLM_KEY en Render)
- **Idiomas:** ES (español) + HE (hebreo con RTL). No inglés en la web comercial.
- **Package manager:** npm (NO yarn)

## Deploy automático
- **Frontend → Hostinger:** Push a `main` → GitHub Actions (.github/workflows/deploy.yml) → FTP a /public_html/
  - Node 20, `npm install --legacy-peer-deps`, `npm run build`
  - Secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASS`
- **Backend → Render:** Push a `main` → Render auto-deploy (branch configurada: `main`)
  - Variables de entorno en Render:
    - `EMERGENT_LLM_KEY` — API key de Google Gemini para el chat IA
    - `RESEND_API_KEY` — API key de Resend para enviar emails
    - `NOTIFICATION_EMAIL` — Email destino de cotizaciones (julito36911@gmail.com)
    - `SUPPORT_EMAIL` — Email de soporte (info@fabricontrol.online)

## Estructura frontend
```
frontend/src/
├── App.js                    # Router principal
├── fabricontrol.css           # Estilos globales (dark theme)
├── contexts/
│   └── LanguageContext.js    # i18n custom (es/he) con RTL
├── pages/
│   ├── Home.js               # Landing principal — hero, productos, servicios, comparativa, CTA
│   ├── Cotizacion.js          # Formulario de cotización 4 pasos (servicios generales)
│   ├── PruebaGratis.js        # Formulario "60 días de prueba gratis" (FabriControl)
│   ├── FabriControlDetail.js  # Página detalle de FabriControl
│   ├── Comparacion.js         # Comparativa FabriControl vs FabriOS
│   ├── TermsAndConditions.js  # Términos y condiciones
│   ├── PrivacyPolicy.js       # Política de privacidad
│   └── (legacy: Caracteristicas, Precios, FAQ, Enterprise, Recursos, Documentacion)
├── components/
│   ├── Header.js              # Header con navegación y selector ES/עב
│   ├── Footer.js              # Footer con contacto, links, copyright
│   ├── ChatWidget.js          # Chat IA (Julio Mirabal AI) — Gemini backend
│   ├── ChatWidget.css          # Estilos del chat + ocultar badge Emergent
│   └── WhatsAppButton.js      # Botón flotante de WhatsApp
└── build/                     # Build compilado (se sube a Hostinger)
```

## Backend (Render)
```
backend/
├── server.py                  # FastAPI app principal — CORS, routers
├── routes/
│   ├── chat.py                # POST /api/chat — Chat IA con Gemini 2.5 Flash
│   │                          # GET /api/chat/health — Health check
│   ├── quote.py               # POST /api/send-quote — Envía cotización/prueba por email (Resend)
│   ├── enterprise_quote.py    # POST /api/enterprise-quote — Cotización enterprise
│   └── license_request.py     # POST /api/license-request — Solicitud de licencia
├── knowledge_base/
│   └── fabricontrol_complete.md  # Knowledge base del chat IA (productos, servicios, reglas)
└── requirements.txt           # Dependencias Python
```

## Rutas de la web
| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal (Home.js) |
| `/cotizacion` | Formulario de cotización general (4 pasos) |
| `/prueba-gratis` | Formulario "60 días de prueba gratis" FabriControl |
| `/fabricontrol` | Página detalle FabriControl |
| `/comparacion` | Comparativa FabriControl vs FabriOS |
| `/terms` | Términos y condiciones |
| `/privacy` | Política de privacidad |

## Página Home (Home.js) — Secciones
1. **Hero** — "Software industrial a medida para tu empresa" + stats (15+ años, 45+ módulos, 6+ industrias, ES/EN/HE)
2. **Productos** — FabriControl (DISPONIBLE AHORA, borde naranja, botón "60 días de prueba gratis", demo con credenciales, chips de features) + FabriOS (PRÓXIMAMENTE, campo email notify)
3. **Comparativa rápida** — Tabla FabriControl vs FabriOS
4. **Servicios a medida** — 4 tarjetas (software, apps, IoT, consultoría)
5. **Industrias** — Chips de industrias target
6. **Sobre mí** — Bio de Julio + foto
7. **CTA final** — Solicitar cotización, WhatsApp, Email (copia al clipboard), LinkedIn

## Formularios
### Cotización general (/cotizacion)
- 4 pasos con barra de progreso
- Paso 1: Datos empresa (nombre, contacto, email, whatsapp, país, industria, empleados)
- Paso 2: Tipo de servicio (ERP, App, IoT, Consultoría, FabriOS, No sé) + problema a resolver
- Paso 3: Funciones dinámicas según servicio + preguntas IoT + herramientas actuales + usuarios + presupuesto
- Paso 4: Resumen (SIEMPRE en español) + Copiar / WhatsApp / Email (via backend)

### Prueba gratis (/prueba-gratis)
- Formulario simple: empresa, nombre y apellido, email, texto libre
- Botón: "Obtené 60 días de prueba gratis"
- Envía via POST /api/send-quote al backend

### Envío de formularios
- **WhatsApp:** Link directo a wa.me con resumen URL-encoded
- **Email:** POST al backend /api/send-quote → Resend → NOTIFICATION_EMAIL
- **Copiar:** Copia resumen al portapapeles
- **NO se usa mailto:** (no funciona sin cliente de email configurado en Windows)

## Chat IA (ChatWidget.js)
- Header: "Julio Mirabal AI"
- Mensaje de bienvenida con 4 opciones: FabriControl, FabriOS, Servicios, Cotización
- Backend: Gemini 2.5 Flash con system prompt completo (productos, servicios, reglas)
- Responde en el idioma que le hablen (ES/EN/HE)
- **Regla:** NUNCA menciona precios. Siempre redirige a /cotizacion
- Warm-up ping al cargar la página (mitiga cold start de Render)
- MutationObserver para ocultar badge "Made with Emergent"

## Botones de email
- Los botones de email en Home y Footer **copian** `info@fabricontrol.online` al portapapeles (no usan mailto:)
- Muestran "✅ Copiado: info@fabricontrol.online" por 3 segundos

## Dark theme
- Background: `#0a0e17` (principal), `#111827` (cards), `#1e293b` (borders)
- Accent: `#f97316` (orange)
- **NO cambiar el dark theme**

## Sistema de idiomas (i18n)
- Custom React Context (`LanguageContext.js`)
- Hook: `useLanguage()` → `{ language, setLanguage, isRtl }`
- Idiomas: `es` (español, default), `he` (hebreo RTL)
- RTL automático cuando `he`
- Traducciones inline en cada componente/página
- Selector en header: ES / עב

## Sobre el autor
- **Julio Mirabal** — Ingeniero mecánico, 15 años en manufactura
- Ubicación: Argentina / Israel
- Idiomas: Español, English, עברית
- Contacto: info@fabricontrol.online, WhatsApp +972 52-648-9461
- LinkedIn: linkedin.com/in/juliomirabal

## Comandos
```bash
cd frontend && npm start        # Dev server (localhost:3000)
cd frontend && npm run build    # Build producción
cd backend && python server.py  # Backend local (localhost:8001)
```

## Reglas
- **Bilingüe obligatorio:** Todo contenido en ES + HE con soporte RTL
- **Responsive:** Mobile-first
- **No romper** lo que ya existe (terms, privacy, etc.)
- **Resumen de cotización** siempre en español (para evaluación de Julio)
- **Dark theme** intocable
- **No mencionar precios** — siempre redirigir a /cotizacion o /prueba-gratis
- **No usar mailto:** — copiar email al clipboard como alternativa
- **npm** (no yarn) — usar `npm install --legacy-peer-deps` por conflicto React 19
- **Commits** solo incluir archivos de frontend y backend, no archivos borrados legacy
