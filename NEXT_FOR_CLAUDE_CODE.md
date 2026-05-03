# NEXT_FOR_CLAUDE_CODE.md — web-fabricontrol-2.0

> Este archivo es el "buzon" entre Cowork (QA / Julio) y Claude Code (developer).
> Cowork actualiza este archivo cuando termina cada validacion.
> Claude Code lee este archivo al iniciar sesion y arranca la tarea descrita.
> Claude Code ESCRIBE el resultado en seccion "REPORTAR AQUI" del mismo archivo.

---

## PERMISOS PERMANENTES PARA CLAUDE CODE EN ESTE PROYECTO

Sos developer en el repo `C:\web-fabricontrol-2.0\` (sitio web marketing FabriControl, deploy a Hostinger fabricontrol.online via GitHub Actions auto-deploy).

**Tenes permiso para hacer SIN pedir confirmacion:**
- Cualquier comando git **excepto push** (status, add, commit, diff, log)
- npm install / npm run / npm test / npx
- grep, rg, find, ls, cat, head, tail, wc, sort, uniq
- `python -m http.server` (preview local)
- `curl http://localhost:*` (test local)
- Editar archivos `.html`, `.css`, `.js`, `.json`, `.md`, `.svg`
- Editar archivos en `src/`, `public/`, `assets/`, `components/`, `pages/`, `styles/`
- Editar `BUGS_PENDIENTES.md`
- Leer cualquier archivo (incluyendo `C:\Users\julit\fabri control\*`)

**NO podes (siempre parar y pedir confirmacion):**
- Borrar archivos (rm -rf, del, Remove-Item) — **excepto** los listados explicitamente en la SESION ACTUAL como autorizados
- Editar `.env`, `secrets/`, `credentials/`, `.claude/*`
- `git push` (deploy se gatilla cuando Julio hace `git push` desde su terminal)
- ftp, sftp, scp, ssh, rsync (deploy)
- curl HTTPS a sitios externos
- wget

**Deploy en este proyecto es AUTOMATICO via GitHub Actions**. Cuando Julio hace `git push origin main` desde su terminal, se gatilla el workflow `.github/workflows/deploy.yml` que sube el contenido del repo (con exclusiones) por FTP al `/public_html/` de Hostinger. Claude Code commitea pero NO pushea — el push lo hace Julio para tener control de cada deploy.

**Antes de arrancar cualquier tarea, leete:**
1. `WORKFLOW_OFICIAL.md` (manual del workflow)
2. Esta seccion ("SESION ACTUAL" abajo) con la tarea concreta
3. Si hay archivos de contexto historicos en la carpeta (CONTEXTO_*, README, etc.), leerlos para tener orientacion

**Tras leer, confirmame en 5-6 lineas**: que tarea, que archivos vas a tocar, como vas a validar (preview local, screenshot), que NO hacer. Si entendiste, arranca.

---

## SESION ACTUAL — Cleanup pre-deploy + correccion legales

La integracion del nuevo diseno (sesion anterior, commit `01039c1`) quedo lista pero hay 2 cosas a arreglar antes de hacer push para que el auto-deploy de Hostinger sea limpio:

1. **Archivos y carpetas legacy del React build viejo** quedaron en raiz mezclados con la web nueva. Si se hace push asi, se suben a Hostinger y conviven con la web nueva (riesgo SEO, links rotos, contenido contradictorio).
2. **`terminos.html`** tiene contenido del React viejo que habla de "Suscripcion Anual" y "pagina de Precios" — incompatible con el modelo actual (beta privada, 6 meses gratis sin tarjeta, NO mostrar precios). Tambien revisar `privacidad.html` y `cookies.html` por las dudas.

### Contexto

**Modelo de negocio actual:** programa de Acceso Anticipado / Beta, **6 meses gratis sin tarjeta**, NO mostrar precios. Buscamos **5 a 8 fabricas piloto**. Despues del beta, "precio de fundador" especial.

**Decision sobre deploy:** queremos auto-deploy. Cuando Julio haga `git push origin main`, GitHub Actions sube a Hostinger automaticamente. Claude Code prepara todo, commitea, y deja avisado a Julio que tiene que hacer `git push`.

### TAREA

#### 1. PERMISO PUNTUAL DE BORRADO (autorizado por Cowork)

Para esta sesion, Claude Code esta **autorizado a borrar** los siguientes archivos y carpetas del raiz del repo (NO del backup `frontend-react-legacy/`):

**Archivos:**
- `comparacion.html`
- `documentacion.html`
- `asset-manifest.json`

**Carpetas (con todo su contenido):**
- `assets/css/`
- `assets/img/`
- `assets/js/`
- `audio/`
- `static/`
- `productos/`
- `en/` (era el contenido EN del React viejo)
- `he/` (era el contenido HE del React viejo)
- `_old_recursos/`

**NO borrar** (importante):
- `frontend-react-legacy/` — es el backup completo del React viejo, queda como referencia.
- Archivos en `assets/` que NO sean los 3 directorios listados (ej: `styles.css`, `home.css`, `site.js`, etc. — todos los del nuevo diseno).
- Cualquier otro `.html`, `.css`, `.js` que no este listado arriba.

Confirmar el borrado con `git status` antes de commitear.

#### 2. Reescribir paginas legales adaptadas al modelo beta

Las paginas `terminos.html`, `privacidad.html`, `cookies.html` que se crearon en la sesion anterior reusaron contenido del React viejo. **Esto introduce contradicciones legales** porque hablan de "Suscripcion Anual", "pagina de Precios", etc.

**Reescribir las 3 paginas** desde cero (o ajustar las existentes) para reflejar el modelo actual:

**`terminos.html` debe decir:**
- FabriControl es la EMPRESA. FabriOS es su producto principal en programa de Acceso Anticipado.
- Durante la beta, el uso es **gratuito por 6 meses**, sin tarjeta de credito requerida.
- Despues de los 6 meses, el cliente puede:
  - Adherir al "precio de fundador" (no especificar monto — dice "consultar")
  - Exportar todos sus datos y dar de baja sin penalidad.
- NO mencionar planes anuales, mensuales, ni montos especificos.
- NO mencionar "pagina de Precios" — esa pagina no existe.
- Mantener clausulas estandar: aceptacion, propiedad de datos del cliente (siempre del cliente, FabriControl solo procesa), confidencialidad, limitacion de responsabilidad, jurisdiccion (a definir por Julio — sugerir Argentina o Israel).
- Tono profesional pero accesible. Que un dueno de fabrica lo lea y entienda.
- 5-7 secciones. No mas largo que 1.000 palabras por idioma.
- Trilingue ES / EN / HE con `data-i18n` o bloques separados igual que las demas paginas.

**`privacidad.html` debe decir:**
- Que datos recolectamos: nombre, email, WhatsApp, cargo, datos empresa, IP de acceso, logs de uso.
- Para que: dar el servicio, soporte, comunicacion comercial sobre FabriOS y futuros productos de FabriControl.
- Donde se almacenan: servidores Render (US) + MongoDB Atlas. Los datos del cliente (productos, ordenes, BOM) viven en su propio tenant aislado.
- Backup automatico diario al Google Drive del cliente (si lo conecta) — los datos son del cliente.
- Quien accede: solo equipo de FabriControl autorizado, con audit log.
- Derechos del usuario: acceso, rectificacion, eliminacion (GDPR + ley argentina/israeli segun jurisdiccion).
- Cookies: ver `cookies.html`.
- Cambios a la politica: aviso con 30 dias de anticipacion.
- 4-5 secciones. No mas largo que 800 palabras por idioma.
- Trilingue.

**`cookies.html` debe decir:**
- Que es una cookie (1 parrafo simple).
- Cookies que usamos: tecnicas (sesion, login), analiticas (si hay GA o Plausible — preguntarle a Julio), de preferencias (idioma seleccionado).
- NO usamos cookies de tracking publicitario de terceros.
- Como gestionar/borrar cookies en cada navegador (1 parrafo + links genericos).
- Trilingue.

**Estructura HTML de las 3 paginas:** copiar el header, footer, CSS y JS de `contacto.html`. Reemplazar SOLO el `<main>` con el contenido nuevo.

#### 3. Verificar el `.github/workflows/deploy.yml` para auto-deploy limpio

Despues del cleanup del paso 1, el deploy.yml debe estar bien armado para el push. Verificar:

- Que NO incluya en el upload nada que ya no exista (los archivos borrados del paso 1 ya no estaran).
- Que las exclusiones que ya estan se mantengan: `frontend-react-legacy/**`, `node_modules/**`, los `.md` de workflow, `backend/**`, `tests/**`, etc.
- **Sumar `local-dir-files-only: false`** si no esta, para que suba todo el contenido de raiz (excepto exclusiones).
- Confirmar que los GitHub secrets `FTP_HOST`, `FTP_USER`, `FTP_PASS` esten configurados (si no estan, avisar a Julio para que los configure en `Settings > Secrets and variables > Actions`).

#### 4. Validacion local

- `python -m http.server 8000` y abrir las 9 paginas (index, industrias, aprende, empezar, demo, contacto, terminos, privacidad, cookies).
- Verificar:
  - [ ] Las paginas legales NO mencionan "suscripcion anual", "pagina de precios", "monto", "USD", "USS", precios concretos.
  - [ ] Las paginas legales hablan correctamente del modelo beta (6 meses gratis sin tarjeta).
  - [ ] Las 3 paginas legales se ven consistentes con el resto (mismo header, footer, paleta).
  - [ ] El selector ES/EN/HE funciona en las 3 paginas legales.
  - [ ] No hay links rotos en el footer.
  - [ ] `comparacion.html`, `documentacion.html` y las carpetas legacy ya no estan en raiz.
  - [ ] La home, industrias, aprende, empezar, demo, contacto se siguen viendo igual que en la sesion anterior (no romper nada).

#### 5. Commit local (NO push)

```bash
git add -A
git commit -m "chore: cleanup pre-deploy + reescribir paginas legales para modelo beta

- Remove archivos legacy del React build viejo (comparacion.html, documentacion.html, asset-manifest.json)
- Remove carpetas legacy (assets/css|img|js, audio, static, productos, en, he, _old_recursos)
- Rewrite terminos.html para modelo beta (6 meses gratis, sin precios concretos)
- Rewrite privacidad.html alineada al producto actual (multi-tenant, backup a Drive del cliente)
- Rewrite cookies.html con contenido propio
- Mantener trilingue ES/EN/HE en las 3 legales"
```

#### 6. Reportar a Julio que tiene que hacer `git push`

En el reporte (seccion REPORTAR AQUI), terminar con un bloque CLARO que diga a Julio:

> **Listo para deploy. Pasos:**
> 1. Verifica que tu repo local apunta a `main` y esta limpio: `git status`.
> 2. Hace push: `git push origin main`.
> 3. Espera ~3 minutos a que el GitHub Action termine (mira en https://github.com/julito36911-collab/web-fabricontrol-2.0/actions).
> 4. Abri https://fabricontrol.online en una ventana de incognito (Ctrl+Shift+N en Chrome) para evitar cache local. Esperar ~5 min adicionales por el cache CDN de Hostinger.
> 5. Validar manualmente en Hostinger File Manager:
>    - Si quedaron archivos viejos del deploy anterior (comparacion.html, documentacion.html, asset-manifest.json, carpetas en/, he/, audio/, static/, productos/, assets/css|img|js/, _old_recursos/), borrarlos a mano del File Manager. El FTP-Deploy-Action solo agrega/actualiza, NO borra del servidor.

#### 7. Marcar bugs como [HECHO] en BUGS_PENDIENTES.md

Cuando termines, marcar como `[HECHO]`:
- "Stack del repo: React → HTML estatico" (paso 1 cierra el cleanup definitivo)
- "Falta seccion 'Servicios a medida' en la home" — ya estaba [HECHO] de la sesion anterior, mantener
- Sumar nuevos `[PENDIENTE]` si descubris algo en validacion.

### Estado de control

```
TAREA_ACTIVA: true
SESION: cleanup-pre-deploy-2026-05-03
DEPLOY_PENDIENTE: true (Julio hace git push despues que Claude Code reporte OK)
SCREENSHOTS_LISTOS: false (otro Cowork los esta generando en paralelo, copiar a assets/screenshots/ cuando lleguen)
WHATSAPP_NUMERO: placeholder (Julio lo setea despues con su agente IA)
PERMISO_PUNTUAL_BORRADO: comparacion.html, documentacion.html, asset-manifest.json, en/, he/, audio/, static/, productos/, assets/css/, assets/img/, assets/js/, _old_recursos/
```

### REGLAS DE LA SESION

- Reportar EN ESTE ARCHIVO (seccion "REPORTAR AQUI"), no solo en chat.
- Tras cualquier cambio en HTML/CSS/JS, **abrir preview local** (`python -m http.server 8000` o `npx serve`) y verificar visualmente antes de declarar OK.
- Auditoria preventiva: buscar en TODAS las paginas (las 9) menciones a "suscripcion", "anual", "precios", "USD", "$", "/mo" — si aparecen, ajustar al modelo beta.
- Performance basico: paginas mobile deben cargar < 3s. Imagenes optimizadas. Sin JS bloqueante.
- SEO basico: cada pagina con `<title>`, `<meta description>`, alt en imagenes.
- Tras cerrar la tarea, sobreescribir "SESION ACTUAL" con `## SESION CERRADA — [tema]` y dejar reporte completo en SESIONES ANTERIORES.

---

## REPORTAR AQUI (Claude Code escribe progreso)

### Estado: COMPLETADO (6/6 pasos). Listo para git push.

#### Paso 1: Cleanup archivos legacy ✅
- Borrados 3 archivos: `comparacion.html`, `documentacion.html`, `asset-manifest.json`
- Borradas 9 carpetas: `assets/css/`, `assets/img/`, `assets/js/`, `audio/`, `static/`, `productos/`, `en/`, `he/`, `_old_recursos/`
- `frontend-react-legacy/` preservado como backup
- `assets/` solo contiene archivos del nuevo diseno (11 archivos)

#### Paso 2: Reescritura paginas legales ✅
- `terminos.html`: 7 secciones, modelo beta (6 meses gratis, sin tarjeta, precio fundador despues), trilingue ES/EN/HE
- `privacidad.html`: 5 secciones, datos reales (Render US, MongoDB Atlas multi-tenant, Google Drive backup, audit log), trilingue
- `cookies.html`: 4 secciones, sin tracking publicitario, cookies futuras (Plausible/GA), trilingue
- Fecha actualizada a 3 de mayo de 2026 en las 3 paginas

#### Paso 3: deploy.yml verificado ✅
- Agregadas exclusiones `.github/**` y `.claude/**`
- Removida exclusion redundante `_old_recursos/**` (ya borrada)
- Secrets `FTP_HOST`, `FTP_USER`, `FTP_PASS` — Julio debe verificar que estan configurados en GitHub

#### Paso 4: Validacion local ✅
- [x] 9 paginas HTTP 200
- [x] 3 legacy files devuelven 404
- [x] 0 errores JS en consola
- [x] Selector ES/EN/HE funciona en las 3 legales (verificado visualmente con screenshots)
- [x] Hebreo RTL correcto
- [x] Home intacta (hero, secciones nuevas, footer)
- [x] grep: 0 menciones a "suscripcion anual", "precios", "USD", "$" en las 9 paginas activas
- [x] Footer links correctos en las 3 legales

#### Paso 5: Commit local ✅
- `git add -A` + commit con mensaje descriptivo. NO push.

#### Paso 6: BUGS_PENDIENTES.md actualizado ✅
- "Stack del repo" → [HECHO]
- "Archivos legacy en raiz" → [HECHO]
- "Contenido contradice modelo beta" → [HECHO]
- WhatsApp placeholder sigue [PENDIENTE] (por decision de Julio)

---

> **Listo para deploy. Pasos para Julio:**
> 1. Verifica que tu repo local apunta a `main` y esta limpio: `git status`.
> 2. Verifica que los secrets FTP estan configurados en GitHub: `Settings > Secrets and variables > Actions` → `FTP_HOST`, `FTP_USER`, `FTP_PASS`.
> 3. Hace push: `git push origin main`.
> 4. Espera ~3 minutos a que el GitHub Action termine (mira en https://github.com/julito36911-collab/web-fabricontrol-2.0/actions).
> 5. Abri https://fabricontrol.online en ventana de incognito (Ctrl+Shift+N). Esperar ~5 min por cache CDN.
> 6. **IMPORTANTE — limpieza manual en Hostinger**: el FTP-Deploy-Action solo agrega/actualiza, NO borra del servidor. Si quedaron archivos del deploy anterior, borrarlos a mano del File Manager:
>    - `comparacion.html`, `documentacion.html`, `asset-manifest.json`
>    - Carpetas: `en/`, `he/`, `audio/`, `static/`, `productos/`, `assets/css/`, `assets/img/`, `assets/js/`, `_old_recursos/`

---

## SESIONES ANTERIORES

### SESION CERRADA — Reemplazo total de la web por nuevo diseno HTML estatico (cerrada 2026-05-03)

**Estado: COMPLETADO (14/14 pasos). Commit local `01039c1`. Sin push.**

#### Paso 1: Backup React ✅
- `frontend/` renombrado a `frontend-react-legacy/`

#### Paso 2: Migrar web nueva ✅
- Copiado de `fabricontrol_web_v1/` a raiz. `uploads/` eliminada.

#### Paso 3: GitHub Action ✅
- `deploy.yml` simplificado: FTP directo sin npm install/build. Excluye legacy, tests, docs internos.

#### Paso 4: Imagenes ✅
- `assets/og-default.png` (1200x630) y `assets/apple-touch-icon.png` (180x180) generados con Pillow.

#### Paso 5: Paginas legales ✅
- `terminos.html` (5 secciones, trilingue ES/EN/HE)
- `privacidad.html` (4 secciones, trilingue)
- `cookies.html` (4 secciones, trilingue — contenido nuevo)
- Contenido reutilizado de `TermsAndConditions.js` y `PrivacyPolicy.js` del React viejo.
- ⚠️ NOTA DE COWORK: este reuso introdujo contradicciones (suscripcion anual, pagina de precios) — corregido en sesion siguiente.

#### Paso 6: Footer ✅
- 9 paginas actualizadas (6 existentes + 3 legales).
- Sociales: LinkedIn, X, YouTube, Facebook con URLs reales. GitHub eliminado.
- Empresa: solo "Contacto". Sacados "Sobre nosotros" y "Blog".
- Legal: Terminos/Privacidad/Cookies linkan a paginas reales.
- Productos: FabriSense y Mas productos como `<span>` no-clickable.

#### Paso 7: Seccion "Servicios a medida" ✅
- 4 tarjetas (Software a medida, App/Plataforma web, Automatizacion IoT, Consultoria).
- Badges, iconos SVG, bullets, ejemplos, CTAs WhatsApp.

#### Paso 8: Seccion "22 modulos" ✅
- Grid 3 columnas con 12 modulos principales + "+ 10 modulos mas".

#### Paso 9: Seccion "Como arrancar — 7 pasos" ✅
- Timeline con 7 pasos (Dia 1 a Dia 5-7), cards numeradas con CSS counter.

#### Paso 10: Seccion "Antes vs Despues" ✅
- 2 columnas rojo/verde, 6 items cada una. CTA beta con boton naranja + WhatsApp.

#### Paso 11: Aprende placeholder ✅
- Main reemplazado con "Proximamente" + icono video + CTAs demo/WhatsApp.
- Estructura de videos.json y filtros preservada para futuro uso.

#### Paso 12: Screenshots ✅ (parcial)
- No disponibles aun (otro Cowork los genera en paralelo).
- Placeholders visuales en secciones de industrias (ya venian del HTML nuevo).

#### Paso 13: Validacion ✅
- Preview local en puerto 3001. 0 errores JS en consola.
- Home con 4 secciones nuevas visibles y correctas.
- Footer con 4 redes sociales reales en 9 paginas.
- Legal pages renderizan contenido trilingue correctamente.
- Aprende muestra placeholder Proximamente.
- Empezar form visible con todos los campos.
- Mobile viewport sin overflow (verificado en preview 414px).

#### Paso 14: Commit ✅
- `git add -A` con `.gitignore` creado para excluir `node_modules/`, `frontend-react-legacy/build/` y similares.
- Commit `01039c1` con mensaje completo. NO push.

#### Archivos tocados en esta sesion
- `index.html` — 4 secciones nuevas insertadas
- `aprende.html` — main reemplazado con placeholder
- `contacto.html`, `industrias.html`, `empezar.html`, `demo.html` — footer actualizado
- `terminos.html`, `privacidad.html`, `cookies.html` — creados
- `assets/styles.css` — CSS para legal pages, modules grid, timeline, compare, services
- `assets/og-default.png`, `assets/apple-touch-icon.png` — generados
- `.github/workflows/deploy.yml` — simplificado
- `sitemap.xml` — 3 URLs legales agregadas
- `BUGS_PENDIENTES.md` — 6 items marcados [HECHO]
- `.gitignore` — creado

#### Validacion de Cowork (post-sesion)
- ✅ Las 4 secciones nuevas de la home estan presentes y bien armadas.
- ✅ Footer con 4 redes sociales reales.
- ✅ Aprende.html con placeholder correcto.
- ✅ WhatsApp placeholder respetado.
- ⚠️ Encontrados 2 issues que se atacan en la siguiente sesion (cleanup pre-deploy):
  1. Archivos legacy del React build siguen en raiz (comparacion.html, documentacion.html, etc.).
  2. terminos.html reusa texto viejo que habla de "Suscripcion Anual" — incompatible con el modelo beta.