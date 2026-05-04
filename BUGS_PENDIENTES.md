# Bugs pendientes de web-fabricontrol-2.0

> Cowork agrega bugs aca con [PENDIENTE] cuando los detecta validando.
> Claude Code los resuelve y los marca como [HECHO].
> Julio da el OK final.

> **Ubicacion canonica**: `C:\web-fabricontrol-2.0\BUGS_PENDIENTES.md`
> **Manual del workflow**: `WORKFLOW_OFICIAL.md` (mismo carpeta)
> **Buzon de tareas**: `NEXT_FOR_CLAUDE_CODE.md` (mismo carpeta)

## Convencion de severidad

- **CRITICA**: rompe el sitio (404 en home, JS error fatal, mobile no carga)
- **ALTA**: feature/page rota (form contacto no envia, link roto, imagen no carga)
- **MEDIA**: comportamiento incorrecto pero usable (color mal, copy con tipo, alineacion)
- **BAJA**: mejora UX / polish (animacion mas suave, mejor microcopy)

## Convencion de areas

- **Home** (index.html)
- **Producto** (paginas de features)
- **Industrias** (industrias.html)
- **Aprende** (blog/recursos)
- **Demo / Empezar / Contacto** (CTA pages)
- **SEO** (sitemap, robots, meta tags, structured data)
- **Performance** (carga, imagenes, JS bundle)
- **Accesibilidad** (WCAG, alt, contraste, keyboard nav)
- **Mobile** (responsive, touch targets)
- **i18n** (multi-idioma si aplica)

## Formato

```
## [PENDIENTE] Titulo corto del bug
- Sev: CRITICA | ALTA | MEDIA | BAJA
- Area: (Home / Producto / SEO / Performance / Mobile / etc.)
- URL: ruta donde paso (ej. /index.html#hero, fabricontrol.online/empezar)
- Browser: Chrome desktop / Chrome mobile / Safari iOS / Firefox / etc.
- Pasos:
  1. ...
  2. ...
- Esperado: ...
- Resultado: ...
- Screenshot: (si aplica, path o link)
```

Cuando Claude Code lo arregla:

```
## [HECHO] Titulo corto

(mismo contenido)

**Fix**: archivos modificados + 1 linea explicando el cambio
**Validacion**: preview local OK + screenshot post-fix
```

Si no se puede arreglar (bug del navegador, decision de diseño, etc.):

```
## [BLOQUEADO] Titulo corto

(mismo contenido)

**Bloqueo**: razon (decision de diseño, limitacion del navegador, requiere asset externo)
```

---

<!-- Bugs nuevos van debajo de esta linea -->

## [HECHO] APP_URL en Render fabrios-api apunta a dominio inexistente

**Fix aplicado 2026-05-04**: Julio cambio la env var `APP_URL` en Render `fabrios-api` de `https://app.fabricontrol.online` a `https://fabrios-app.onrender.com`. Validado con segundo smoke test E2E: el email de reset-password llega con link directo y funcional, login con pwd nueva → dashboard cargado correctamente.

### Detalle original:
- Sev: ALTA (afecta forgot password y cualquier link generado por el backend hacia la app)
- Area: Backend FabriOS / DevOps
- URL afectada: emails de reset-password, posibles emails futuros que linkeen a la app
- Pasos:
  1. Disparar forgot-password en `https://fabrios-app.onrender.com/forgot-password` con email valido.
  2. Abrir el email de reset que llega.
  3. Click en el link.
- Esperado: abre `https://fabrios-app.onrender.com/reset-password?token=XXX`
- Resultado: abre `https://app.fabricontrol.online/reset-password?token=XXX` → DNS_PROBE_FINISHED_NXDOMAIN (el dominio no existe).
- **Causa**: variable de entorno `APP_URL` en Render del service `fabrios-api` esta seteada a `https://app.fabricontrol.online` pero ese subdominio no esta configurado en DNS (Hostinger) ni como custom domain en Render.
- **Workaround validado**: navegar manualmente a la URL correcta sustituyendo el dominio. El token sigue siendo valido y el flow completo funciona (verificado en smoke test E2E 2026-05-04).
- **Fix corto** (recomendado AHORA): editar la env var `APP_URL` en Render fabrios-api → cambiar a `https://fabrios-app.onrender.com`. Save → redeploy automatico. Ya no se rompe el flow.
- **Fix largo** (opcional, mejor para branding): configurar el subdominio `app.fabricontrol.online` en DNS de Hostinger apuntando a Render, y agregar como custom domain en el service `fabrios-app`. Despues, dejar `APP_URL=https://app.fabricontrol.online` (lo que ya esta).
- **Smoke test E2E ejecutado 2026-05-04**: 8/8 pasos OK con workaround. Documento completo en sesion del NEXT_FOR_CLAUDE_CODE.md (cuando aplique).

## [PENDIENTE] assets/demo.css quedo huerfano tras eliminar demo.html
- Sev: BAJA
- Area: Empezar / cleanup
- URL: assets/demo.css
- Pasos:
  1. Verificar: `grep -l "demo.css" *.html` despues de eliminar demo.html
- Esperado: ningun HTML referencia demo.css → se puede borrar
- Resultado: demo.css sigue en `assets/` del repo (y en Hostinger Julio lo borro manualmente).
- **Accion**: borrar `assets/demo.css` del repo en proxima sesion de Claude Code (sumar al permiso puntual de borrado).

## [HECHO] demo.html no es necesaria — eliminar
- Sev: ALTA
- Area: Demo / nav / sitemap
- URL: demo.html

**Fix**: Borrada `demo.html` del raiz. Removida de:
- Nav de las 8 paginas restantes (5 items: Inicio, Industrias, Aprende, Empezar gratis, Contacto)
- `sitemap.xml` (queda solo el resto de URLs)
- CTAs internos en index.html (boton "Ver demo de 2 minutos" → "Ver videos de FabriOS" → aprende.html)
- CTAs en industrias.html (7 botones "Ver demo de X" → WhatsApp con mensaje pre-cargado por industria; CTA final → "Aplicar a la beta")
- CTAs en aprende.html ("Pedir demo personalizada" → "Aplicar a la beta")
- Card en contacto.html ("Demo en vivo" → "Aplicar a la beta")
- Claves `nav.demo` mantenidas en site.js (no hace mal, queda comentado para futuro)

**Validacion**: `demo.html` devuelve 404. `grep demo\.html` en *.html → 0 matches en paginas live. Nav de las 8 paginas tiene solo 5 items.

## [HECHO] i18n HE incompleto en mayoria de paginas (cobertura desbalanceada)
- Sev: ALTA
- Area: i18n / multi-idioma
- URL: index.html, industrias.html, aprende.html, contacto.html

**Fix**: Aplicada estrategia de bloques `data-lang="es|en|he"` con HTML triplicado por idioma (igual que en las legales). El CSS ya manejaba esto (`html:not([lang="X"]) [data-lang="X"] { display:none !important; }` en styles.css linea 1134-1136).

**Cobertura agregada**:
- `index.html`: 14 secciones traducidas (hero, industry band, problem, solution, 22 modules, 7-step onboarding, before/after, numbers, multi-industry, custom services, company, how to start, videos head, final CTA). Total 558 bloques `data-lang` en la pagina.
- `industrias.html`: hero + 6 industrias (titulo, lede, 4 bullets c/u, CTA whatsapp por industria) + final CTA. Nombres tecnicos preservados (FabriOS, BOM, FEFO, IPQC, MSDS, OEE, SENASA, HACCP, IoT, CNC).
- `aprende.html`: hero + seccion placeholder + 2 CTAs.
- `contacto.html`: hero + WA card + 2 sec-cards (Email + Aplicar a la beta).

**Validacion**: preview local OK. ES → EN → HE switching cambia TODO el contenido en cada pagina. HE muestra `dir="rtl"` correcto. 9/9 paginas HTTP 200, 0 errores JS, 0 menciones a demo.html en HTML live.

## [HECHO] Eliminar form custom de empezar.html, reemplazar por CTA al wizard de FabriOS
- Sev: ALTA (decision arquitectonica)
- Area: Empezar
- URL: empezar.html + assets/site.js + assets/empezar.css + assets/styles.css

**Fix**: Form custom de 11 campos eliminado completamente. Reemplazado por:
- Hero con CTA grande naranja "Empezar gratis ahora →" → `https://fabrios-app.onrender.com/register?ref=acceso-anticipado` (`target="_self"`)
- Seccion "Todo el producto. Sin recortes." con 14 features en grid 2-col / 1-col mobile
- CTA secundario "Crear mi cuenta gratis →" al final, mismo destino
- i18n trilingue ES/EN/HE de los 11 strings nuevos (`empezar.badge`, `empezar.title`, `empezar.lede`, `empezar.status`, `empezar.cta.primary`, `empezar.cta.hint`, `empezar.includes.kicker`, `empezar.includes.title`, `empezar.cta-final.title`, `empezar.cta-final.lede`, `empezar.cta-final.btn`)
- JS: borrada funcion `setupRegisterForm()` completa, constante `REGISTER_ENDPOINT`, `ERROR_MESSAGES`, `mapErrorDetail()`, `showSuccess()`, `showError()`, llamada al init. Cleanup de `localStorage.lastSerial`.
- CSS: borradas reglas huerfanas (`.form-error`, `.pw-strength`, `.empezar-form-card`, `.empezar-form-wrap`). Preservadas las compartidas con demo.html (`.input.is-invalid`, `.form-success`, `.checkbox.is-invalid`).
- Agregada `.features-list` con grid 2-col + RTL support en empezar.css

**Validacion**: preview local OK. Form 100% eliminado (0 inputs/selects/textareas). 2 CTAs apuntan al wizard correctamente con target=_self. ES/EN/HE funcionan + RTL hebreo OK. demo.html sigue funcionando (form intacto). 9/9 paginas HTTP 200. 0 errores JS.

**Decision de fondo**: usar el wizard de FabriOS ya validado (198 tests E2E PASS) en vez de mantener un form custom. Captura whatsapp/cargo/pais/ciudad despues por WhatsApp en onboarding 1-a-1.

### Issues originalmente reportados (ya no aplican):
- Sev: ALTA (bloquea registros reales)
- Area: Empezar (form de registro)
- URL: empezar.html + assets/site.js

**Fix**:
1. `<select id="industry">`: agregadas `value="..."` minuscula sin tilde a 6 opciones (`metalurgia`, `alimentos`, `textil`, `plasticos`, `quimica`, `carpinteria`). **Eliminada opcion "Otra"** que el backend rechaza.
2. `<select id="size">`: agregadas `value="..."` con guion corto sin tilde (`1-5`, `6-15`, `16-30`, `31-50`, `Mas de 50`). Labels visibles preservados con guion largo y tilde.
3. `assets/site.js`: agregado mapeo de 7 codigos de error 400 (`email_already_registered`, `invalid_email`, `empresa_too_short`, `password_too_short`, `industria_invalida`, `empleados_invalido`, `registration_closed`) + 429 + 500 + network + default. Mensajes claros con HTML (link de login en email_already_registered).
4. `assets/site.js` + `empezar.html`: pantalla de exito reescrita. Muestra "Bienvenido a FabriOS" + serial en grande copiable + boton "Entrar a FabriOS" (linkea a fabrios-app.onrender.com/login) + boton "Avisame por WhatsApp" (con serial pre-cargado en el mensaje). Serial guardado en `localStorage.lastSerial` para que persista en refresh.

**Validacion**: preview local OK. Selects renderean values correctos. Pantalla de exito muestra serial mockeado correctamente. Mapeo de errores funciona con mock fetch (verificado con `email_already_registered`). Persistencia post-refresh funciona. 0 errores JS. CORS desde localhost bloqueado (esperable — backend solo acepta fabricontrol.online), sera validado por Julio post-deploy.

## [HECHO] Numero de WhatsApp es placeholder en 14 ocurrencias

**Fix 2026-05-05**: Julio dio el numero `+972526489461` (Israel). Reemplazadas las 30 ocurrencias de `000000000000` por `972526489461` (formato sin `+`) en:
- 8 paginas HTML: `index.html` (7), `industrias.html` (8), `aprende.html` (3), `empezar.html` (2), `contacto.html` (3), `terminos.html` (2), `privacidad.html` (2), `cookies.html` (2)
- `assets/site.js`: constante `WA_NUMBER`
- Cache bumpeado v=20260505a → v=20260505b para forzar fresh load del JS

**Validacion**: Cualquier link wa.me ahora abre WhatsApp con el numero real de Julio + mensaje pre-cargado segun contexto (industria especifica, soporte general, etc.).

### Detalle original:
- Sev: ALTA
- Area: Home / Industrias / Aprende / Empezar / Demo / Contacto
- URL: todas las paginas, header CTA + boton flotante WhatsApp
- Pasos:
  1. Abrir cualquier pagina HTML
  2. Click en el boton "WhatsApp" del header o en el FAB flotante verde
- Esperado: abre wa.me con numero real de FabriControl + mensaje pre-cargado
- Resultado: abre `https://wa.me/000000000000?text=...` (numero invalido)
- **Decision actual de Julio**: dejar el placeholder por ahora. Va a manejar WhatsApp con un agente IA aparte y va a setear el numero cuando lo tenga listo.
- **Accion**: NO arreglar todavia. Cuando Julio diga, reemplazar las 14 ocurrencias de `000000000000` por el numero real (formato sin +).

## [HECHO] Imagenes faltantes: og-default.png y apple-touch-icon.png
- Sev: MEDIA
- Area: SEO / Mobile
- URL: todas las paginas, meta og:image y link apple-touch-icon

**Fix**: Generados con Pillow — `assets/og-default.png` (1200x630, fondo #0F172A, F naranja + texto FabriControl) y `assets/apple-touch-icon.png` (180x180, solo F naranja).
**Validacion**: archivos existen en assets/, referenciados en todas las paginas HTML.

## [HECHO] Pagina /aprende sin videos cargados
- Sev: MEDIA
- Area: Aprende
- URL: aprende.html

**Fix**: Reemplazado contenido de `<main>` con placeholder "Proximamente — Estamos grabando los primeros tutoriales de FabriOS" + CTAs a demo y WhatsApp. Estructura de videos.json y filtros preservada para futuro uso.
**Validacion**: aprende.html muestra mensaje placeholder correctamente.

## [HECHO] Falta seccion "Servicios a medida" en la home
- Sev: ALTA
- Area: Home
- URL: index.html

**Fix**: Insertada seccion "CUSTOM SERVICES" despues de MULTI-INDUSTRY con 4 tarjetas (Software a medida, App/Plataforma web, Automatizacion IoT, Consultoria de procesos). Cada tarjeta con badge, icono, bullets, ejemplo y CTA WhatsApp.
**Validacion**: seccion visible en index.html linea ~509.

## [HECHO] Falta seccion "Que es FabriOS y como se usa" detallada en home
- Sev: ALTA
- Area: Home
- URL: index.html

**Fix**: Insertadas 3 secciones nuevas: (1) "22 modulos" con grid de 12 modulos principales, (2) "7 pasos de arranque" con timeline Dia 1-7, (3) "Antes vs Despues" con comparativo 6 items + CTA beta. Todas insertadas entre SOLUTION y NUMBERS.
**Validacion**: secciones visibles en index.html lineas ~241, ~339, ~387.

## [HECHO] Footer: links rotos a # (61 ocurrencias)
- Sev: MEDIA
- Area: todas las paginas
- URL: todas las paginas, footer

**Fix**: En las 9 paginas HTML (6 existentes + 3 legales nuevas):
1. Sociales: sacado GitHub, agregados LinkedIn (real), X (real), YouTube (real), Facebook (real).
2. Empresa: sacados "Sobre nosotros" y "Blog", queda solo "Contacto".
3. Legal: Terminos/Privacidad/Cookies ahora linkan a terminos.html/privacidad.html/cookies.html.
4. Productos: FabriSense y Mas productos cambiados de `<a href="#">` a `<span>` no-clickable.
5. Creadas terminos.html, privacidad.html, cookies.html con contenido trilingue ES/EN/HE.
**Validacion**: grep confirma 4 links sociales reales en 9 paginas, 0 GitHub, 0 footer.about/footer.blog.

## [HECHO] Stack del repo: React → HTML estatico
- Sev: ALTA
- Area: estructura del repo
- URL: C:\web-fabricontrol-2.0\

**Fix sesion 1**: (1) `frontend/` renombrado a `frontend-react-legacy/` como backup. (2) Web nueva copiada de `fabricontrol_web_v1/` a raiz del repo (sin `uploads/`). (3) `.github/workflows/deploy.yml` simplificado para FTP directo sin npm install/build. (4) Sitemap actualizado con 9 paginas.
**Fix sesion 2**: Cleanup de archivos legacy en raiz completado (ver bug siguiente).
**Validacion**: raiz solo con archivos de la web nueva + `frontend-react-legacy/` como backup.

## [HECHO] Archivos y carpetas legacy del React build viejo en raiz del repo
- Sev: ALTA
- Area: estructura del repo / SEO
- URL: C:\web-fabricontrol-2.0\

**Fix**: Borrados 3 archivos (`comparacion.html`, `documentacion.html`, `asset-manifest.json`) y 9 carpetas (`assets/css/`, `assets/img/`, `assets/js/`, `audio/`, `static/`, `productos/`, `en/`, `he/`, `_old_recursos/`). `frontend-react-legacy/` preservado como backup.
**Validacion**: `ls assets/` muestra solo archivos del nuevo diseno. Legacy files devuelven 404 en preview local.

## [HECHO] terminos.html / privacidad.html / cookies.html: contenido contradice modelo beta
- Sev: ALTA
- Area: Legal
- URL: terminos.html, privacidad.html, cookies.html

**Fix**: Reescritas las 3 paginas legales desde cero, adaptadas al modelo beta:
- `terminos.html`: 7 secciones (Aceptacion, Acceso Anticipado 6 meses gratis, Licencia, Propiedad datos, Confidencialidad, Limitacion responsabilidad, Cancelacion/Jurisdiccion). Cero menciones a precios/suscripcion anual.
- `privacidad.html`: 5 secciones (Datos recopilados incl. WhatsApp, Uso, Almacenamiento Render+MongoDB Atlas multi-tenant+Google Drive backup, Control acceso con audit log, Derechos GDPR).
- `cookies.html`: 4 secciones (Que es cookie, Tecnicas+preferencias+analiticas futuro, Control por navegador, Contacto). Sin tracking publicitario.
- Las 3 trilingues ES/EN/HE con `data-lang` bloques. Fecha actualizada a 3 mayo 2026.
**Validacion**: preview local OK, selector idiomas funciona, 0 errores JS, grep confirma 0 menciones a suscripcion/anual/precios/USD.
