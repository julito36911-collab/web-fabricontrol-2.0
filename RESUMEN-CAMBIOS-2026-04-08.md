# Resumen de cambios — fabricontrol.online
**Fecha:** 8 de abril 2026
**Autor:** Claude (asistente de Julio Mirabal)

---

## 1. CAMBIOS REALIZADOS

### 1.1 Home.js — Página principal rediseñada
- **FabriControl** es ahora el producto PRINCIPAL con badge "DISPONIBLE AHORA" y borde naranja
- **FabriOS** es secundario con badge "PRÓXIMAMENTE" y campo de email para notificación
- Botón principal de FabriControl cambiado a **"60 días de prueba gratis"** → lleva a `/prueba-gratis`
- Credenciales del demo visibles: julito36911@gmail.com / password123
- Hero actualizado: "ERP industrial + desarrollo a medida + IoT"
- Comparativa rápida: FabriControl primera columna (naranja), nuevas filas (BOM, máquinas)
- CTA con botones: Solicitar cotización, WhatsApp, Email (copia al clipboard), LinkedIn
- Tags de sección (PRODUCTOS, SERVICIOS, etc.) con texto más grande
- Se eliminaron todas las referencias a "local" y "nube"

### 1.2 PruebaGratis.js — Nueva página `/prueba-gratis`
- Formulario simple: empresa, nombre y apellido, email, texto libre
- Botón: "Obtené 60 días de prueba gratis"
- Envía los datos al backend via POST /api/send-quote
- El backend envía email con el resumen al NOTIFICATION_EMAIL configurado en Render
- Bilingüe ES/HE con RTL

### 1.3 Cotizacion.js — Formulario de cotización actualizado
- Preguntas IoT agregadas: tipos de máquina (Torno, Salvagnini/Punzonadora), alertas (WhatsApp, Email, Dashboard, Push)
- Botón "Enviar por Email" ahora usa el backend (POST /api/send-quote) en vez de mailto:
- Muestra estado: "⏳ Enviando..." / "✅ ¡Cotización enviada por email!" / "❌ Error"
- Se eliminó la dependencia de mailto: (no funciona sin cliente de email en Windows)

### 1.4 Footer.js — Actualizado
- "FabriOS (Nube)" → "FabriOS (Próximamente)"
- "FabriControl (Local)" → "FabriControl"
- Descripción: "Software industrial a medida. ERP, apps, IoT y consultoría para manufactura."
- Botón de email copia info@fabricontrol.online al portapapeles (no usa mailto:)

### 1.5 ChatWidget.js — Chat IA actualizado
- Header: "Julio Mirabal AI"
- Mensaje de bienvenida: "Soy el asistente de Julio Mirabal" con 4 opciones
- MutationObserver para ocultar badge "Made with Emergent"
- Warm-up ping al cargar (mitiga cold start de Render free tier)
- Responde en el idioma que le hablen (ES/EN/HE)

### 1.6 Backend — chat.py actualizado
- System prompt completo: conoce FabriControl, FabriOS, 4 servicios, reglas de no-precios
- Modelo: Gemini 2.5 Flash
- Usa generate_content() (más rápido que start_chat())
- NUNCA menciona precios — siempre redirige a /cotizacion

### 1.7 Backend — quote.py (NUEVO)
- Endpoint: POST /api/send-quote
- Recibe: summary, company, contactName, email
- Envía email HTML con el resumen via Resend al NOTIFICATION_EMAIL
- Usado por /cotizacion y /prueba-gratis

### 1.8 Knowledge base reescrita
- `backend/knowledge_base/fabricontrol_complete.md` — Reescrito completamente
- FabriControl y FabriOS como productos separados
- Sin precios, sin menciones de "100% cloud" o "$195/año"
- Incluye los 4 servicios a medida

### 1.9 GitHub Actions — Deploy automático
- `.github/workflows/deploy.yml` — Auto-deploy frontend a Hostinger via FTP
- Se activa en push a `main`
- Node 20, npm install --legacy-peer-deps, npm run build
- Usa SamKirkland/FTP-Deploy-Action@v4.3.5
- Secrets necesarios en GitHub: FTP_HOST, FTP_USER, FTP_PASS

---

## 2. CÓMO FUNCIONA EL DEPLOY

### Frontend (Hostinger)
```
Push a main → GitHub Actions → npm build → FTP a Hostinger /public_html/
```
- Automático en cada push a `main`
- El build tarda ~1 minuto, el deploy FTP ~2 minutos

### Backend (Render)
```
Push a main → Render detecta cambio → rebuild + deploy
```
- Automático (branch configurada: `main`)
- El deploy tarda ~3-5 minutos
- Render free tier se duerme por inactividad (~50s de cold start)

---

## 3. VARIABLES DE ENTORNO (Render)

| Variable | Valor | Para qué |
|----------|-------|----------|
| `EMERGENT_LLM_KEY` | (API key Gemini) | Chat IA |
| `RESEND_API_KEY` | `re_gFQU8683_...` | Envío de emails |
| `NOTIFICATION_EMAIL` | `julito36911@gmail.com` | Destino de cotizaciones |
| `SUPPORT_EMAIL` | `info@fabricontrol.online` | Email en mensajes de error |

**Nota sobre Resend:** Con la cuenta gratis (sin dominio verificado), solo se pueden enviar emails a la dirección del dueño de la cuenta (julito36911@gmail.com). Para enviar a info@fabricontrol.online, hay que verificar el dominio en resend.com/domains.

---

## 4. RUTAS DE LA WEB

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | Home.js | Landing principal |
| `/cotizacion` | Cotizacion.js | Cotización general (4 pasos) |
| `/prueba-gratis` | PruebaGratis.js | 60 días de prueba gratis |
| `/fabricontrol` | FabriControlDetail.js | Detalle de FabriControl |
| `/comparacion` | Comparacion.js | FabriControl vs FabriOS |
| `/terms` | TermsAndConditions.js | Términos y condiciones |
| `/privacy` | PrivacyPolicy.js | Política de privacidad |

---

## 5. ENDPOINTS DEL BACKEND

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/chat` | Chat IA (Gemini) |
| GET | `/api/chat/health` | Health check del chat |
| POST | `/api/send-quote` | Enviar cotización/prueba por email |
| POST | `/api/enterprise-quote` | Cotización enterprise |
| POST | `/api/license-request` | Solicitud de licencia |

---

## 6. ARCHIVOS MODIFICADOS/CREADOS

### Creados
- `frontend/src/pages/PruebaGratis.js` — Formulario prueba gratis
- `backend/routes/quote.py` — Endpoint de envío de email
- `.github/workflows/deploy.yml` — GitHub Actions deploy
- `CLAUDE.md` — Documentación completa del proyecto

### Modificados
- `frontend/src/pages/Home.js` — Rediseño completo
- `frontend/src/pages/Cotizacion.js` — Preguntas IoT + email via backend
- `frontend/src/components/Footer.js` — Textos actualizados, email con clipboard
- `frontend/src/components/ChatWidget.js` — Chat actualizado + Emergent fix
- `frontend/src/components/ChatWidget.css` — Badge hidden + posiciones
- `frontend/src/App.js` — Nueva ruta /prueba-gratis
- `backend/routes/chat.py` — System prompt + modelo + error handling
- `backend/server.py` — Nuevo router quote
- `backend/knowledge_base/fabricontrol_complete.md` — Reescrito

---

## 7. PROBLEMAS RESUELTOS

| Problema | Solución |
|----------|----------|
| GitHub Action fallaba con yarn | Cambiado a npm + --legacy-peer-deps |
| Badge "Made with Emergent" tapaba el chat | MutationObserver en JS |
| Chat lento (4+ minutos) | Gemini 2.0→2.5 Flash + warm-up ping |
| Chat no sabía de FabriOS/servicios | Reescrito system prompt + knowledge base |
| Chat mencionaba precios | Regla estricta de no-precios en prompt |
| Render no deployaba | Branch cambiada de main-antigravity a main |
| Botón email no funcionaba (mailto:) | Reemplazado por backend API + clipboard |
| Resend solo envía a tu email | Limitación del plan gratis sin dominio |
| URL mailto: demasiado larga en cotización | Envío via backend en vez de mailto: |

---

## 8. PENDIENTES / MEJORAS FUTURAS

- [ ] Verificar dominio fabricontrol.online en Resend → poder enviar a info@fabricontrol.online
- [ ] Configurar dominio propio en Resend para que emails salgan de info@fabricontrol.online (no de onboarding@resend.dev)
- [ ] Considerar Render paid plan para evitar cold starts de 50s
- [ ] El chat IA a veces tarda en la primera respuesta (cold start) — el warm-up ping mitiga pero no elimina
- [ ] Regenerar RESEND_API_KEY (fue compartida en chat)
