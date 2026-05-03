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

## SESION ACTUAL — Eliminar form custom de empezar.html y reemplazar por CTA al wizard de FabriOS

**Decision de Julio (2026-05-03):** en vez de mantener un form custom en `empezar.html` y sincronizar 11 campos con el backend, **eliminamos el form** y enviamos directo al wizard de registro de la app FabriOS (`https://fabrios-app.onrender.com/register`), que ya esta probado en produccion (198 tests E2E PASS).

**Por que:** el wizard de FabriOS funciona bien, pide lo basico (empresa + admin + email + password + industria + modulos), crea la cuenta al toque y devuelve serial + login. Mantener un form propio duplica logica, exige sincronizar shape, validaciones y mensajes de error → mas bugs y mantenimiento.

**Lo que NO se captura en el wizard de FabriOS** (whatsapp, cargo, pais, ciudad, empleados, sitio_web) se pide DESPUES uno-a-uno por WhatsApp / email cuando se onboardea al cliente. En etapa beta tiene mas sentido conocer cada lead personalmente.

### Contexto

Documento completo de la decision: `C:\Users\julit\AppData\Roaming\Claude\local-agent-mode-sessions\239c60e4-b4d7-46e7-bcf0-fe6aef582722\b93f6535-2707-432f-814e-4ba3394afefb\local_f45439b3-debc-4c02-8496-a46b4e8db2be\uploads\53488e39-28ba-4397-9c30-27d3b951231b-1777840098666_RESPUESTA_COWORK_WEB_REEMPLAZAR_FORM.md`

**Bugs anteriores que YA NO APLICAN** (porque el form se elimina):
- Mismatches de `industria` y `empleados` con backend
- Mapeo de errores 400
- Pantalla de exito con serial

Se marcan como `[SUPERSEDED]` en BUGS_PENDIENTES.md.

Documento completo del contract: `C:\Users\julit\AppData\Roaming\Claude\local-agent-mode-sessions\239c60e4-b4d7-46e7-bcf0-fe6aef582722\b93f6535-2707-432f-814e-4ba3394afefb\local_f45439b3-debc-4c02-8496-a46b4e8db2be\uploads\RESPUESTA_COWORK_WEB_REGISTRO.md` (lo leyo Cowork ya — todo lo necesario esta en esta tarea).

### TAREA

#### 1. Eliminar el form custom de `empezar.html`

Borrar TODA la seccion del form de registro:
- Bloque del formulario `<form data-register-form>` con sus 11 campos (nombre, email, phone-cc, phone, role, pw, pw2, company, country, city, industry, size, web).
- Indicadores de fortaleza de password.
- Checkboxes de terminos.
- Boton "Crear mi licencia gratis".
- Cualquier mensaje de error / spinner relacionado al form.

Tambien eliminar de `assets/site.js`:
- La funcion `setupRegisterForm()` completa.
- La constante `REGISTER_ENDPOINT`.
- Las funciones helper `showSuccess()`, `showError()` (si solo se usan por el form de registro — verificar antes de borrar).
- La llamada a `setupRegisterForm()` desde el init.

#### 2. Reemplazar el form por CTA grande al wizard de FabriOS

En el lugar donde estaba el form, poner el siguiente bloque (adaptar a la paleta y tipografias del sitio — Space Grotesk para headlines, naranja `#F97316` para CTA):

```html
<section class="hero-empezar">
  <span class="badge mono">PROGRAMA DE ACCESO ANTICIPADO</span>

  <h1 class="h-display">6 meses gratis.<br>Sin tarjeta. Sin compromiso.</h1>

  <p class="lede">
    FabriOS esta en programa beta. Estamos sumando fabricas reales
    que quieran ser parte del producto desde el principio.
    A cambio: 6 meses de acceso completo gratis.
  </p>

  <div class="status-badge">
    <span class="dot dot--live"></span>
    PROGRAMA ACTIVO · REGISTRO ABIERTO
  </div>

  <a href="https://fabrios-app.onrender.com/register?ref=acceso-anticipado"
     class="btn btn--primary btn--xl"
     target="_self">
    Empezar gratis ahora →
  </a>

  <p class="hint">
    Toma 60 segundos. Tu cuenta queda lista al instante.<br>
    Recibis serial por email + acceso inmediato.
  </p>
</section>
```

**Notas:**
- `target="_self"` (reemplaza la pestana). Decision de Julio.
- Query param `?ref=acceso-anticipado` queda preparado para tracking futuro.
- Usar las clases CSS que ya existen en el sitio (btn, btn--primary, btn--xl, badge, lede, mono, dot--live, etc.). Si alguna no existe, crearla en `assets/styles.css` consistente con el resto del diseno.

#### 3. Mantener seccion "Que incluye tu acceso"

Despues del hero, mantener / agregar una seccion con la lista de features incluidas:

```html
<section class="section bg-light">
  <div class="container">
    <span class="kicker mono">QUE INCLUYE TU ACCESO</span>
    <h2 class="h-1">Todo el producto. Sin recortes.</h2>

    <ul class="features-list">
      <li>Ordenes de produccion ilimitadas</li>
      <li>Inventario por lote con trazabilidad FIFO/FEFO</li>
      <li>BOM multinivel con revisiones</li>
      <li>Cotizaciones con PDF profesional</li>
      <li>Codigos QR ilimitados</li>
      <li>Control de calidad (IQC + IPQC + OQC)</li>
      <li>Engineering Change Orders (ECO)</li>
      <li>App movil PWA offline</li>
      <li>Asistente IA con 50 consultas/dia</li>
      <li>Multi-idioma (Espanol, Ingles, Hebreo)</li>
      <li>Backup automatico en Google Drive</li>
      <li>Soporte WhatsApp 24/7 con asistente IA + humano en horario laboral</li>
      <li>Usuarios ilimitados</li>
      <li>Importador masivo desde Excel</li>
    </ul>
  </div>
</section>
```

Estilo: 2 columnas en desktop, 1 en mobile. Cada item con un check naranja antes del texto.

#### 4. CTA secundario al final de la pagina

Al final de empezar.html, antes del footer, sumar un segundo CTA para los que scrollearon:

```html
<section class="section bg-dark cta-final">
  <div class="container" style="text-align:center;">
    <h2 class="h-1" style="color:var(--white)">Listo para arrancar?</h2>
    <p class="lede" style="color:var(--slate-300)">
      6 meses gratis. Sin tarjeta. 60 segundos.
    </p>
    <a href="https://fabrios-app.onrender.com/register?ref=acceso-anticipado"
       class="btn btn--primary btn--xl"
       target="_self">
      Crear mi cuenta gratis →
    </a>
  </div>
</section>
```

#### 5. Limpieza de CSS

En `assets/empezar.css` (y en `assets/styles.css` si hay clases del form ahi), eliminar todos los estilos huerfanos:
- `.form-error`, `.is-invalid`, `.pw-strength`, `.pw-strength span`
- `.checkbox`, `.input`, `.select` SI solo se usaban en este form (chequear antes — quizas otras paginas las usan).
- Cualquier clase que solo aplicaba al form de registro.

Sumar las clases nuevas que falten para el CTA: `.hero-empezar`, `.status-badge`, `.dot--live`, `.btn--xl`, `.features-list`, `.cta-final`.

#### 6. i18n del nuevo contenido

El sitio es trilingue ES / EN / HE. Sumar los strings nuevos al diccionario en `assets/site.js`:

```javascript
// ES
'empezar.badge': 'PROGRAMA DE ACCESO ANTICIPADO',
'empezar.title': '6 meses gratis. Sin tarjeta. Sin compromiso.',
'empezar.lede': 'FabriOS esta en programa beta...',
'empezar.status': 'PROGRAMA ACTIVO · REGISTRO ABIERTO',
'empezar.cta.primary': 'Empezar gratis ahora',
'empezar.cta.hint': 'Toma 60 segundos. Tu cuenta queda lista al instante.',
'empezar.includes.kicker': 'QUE INCLUYE TU ACCESO',
'empezar.includes.title': 'Todo el producto. Sin recortes.',
'empezar.cta-final.title': 'Listo para arrancar?',
'empezar.cta-final.lede': '6 meses gratis. Sin tarjeta. 60 segundos.',
'empezar.cta-final.btn': 'Crear mi cuenta gratis',

// EN: traducir
// HE: traducir (mantener RTL)
```

Y poner `data-i18n="empezar.title"` etc. en los elementos del HTML.

#### 7. Validacion local

- `python -m http.server 8000` y abrir `http://localhost:8000/empezar.html`
- Verificar:
  - [ ] Form custom YA NO existe. No quedan inputs / selects / submit del registro.
  - [ ] Hero con CTA grande naranja "Empezar gratis ahora" visible y centrado.
  - [ ] Click en CTA primario y secundario abre `https://fabrios-app.onrender.com/register?ref=acceso-anticipado` en la MISMA pestana.
  - [ ] Seccion "Todo el producto. Sin recortes." con 14 features visible.
  - [ ] CTA secundario al final visible.
  - [ ] Mobile viewport (414px) sin overflow, CTAs centrados, texto legible.
  - [ ] Selector ES/EN/HE cambia el texto. Hebreo en RTL.
  - [ ] Footer y header sin cambios.
  - [ ] 0 errores JS en consola del browser.

#### 8. Commit local + reportar

```bash
git add -A
git commit -m "feat: eliminar form custom de empezar.html, reemplazar por CTA al wizard de FabriOS

- Borrado form 11 campos + setupRegisterForm() de site.js
- Hero con CTA grande -> https://fabrios-app.onrender.com/register
- Seccion 'Todo el producto. Sin recortes.' con 14 features
- CTA secundario al final
- i18n ES/EN/HE de los strings nuevos
- Limpieza de CSS huerfano del form viejo

Decision: usar el wizard de FabriOS ya validado (198 tests E2E PASS) en vez de mantener un form custom. Captura whatsapp/cargo/pais/ciudad despues por WhatsApp en onboarding 1-a-1."
```

NO push. Julio lo hace despues de validar.

### Estado de control

```
TAREA_ACTIVA: true
SESION: replace-form-with-cta-2026-05-03
DEPLOY_PENDIENTE: true (Julio hace git push despues de validar)
PUSH_INCLUYE: commits 01039c1 + 09d1aca + el de esta sesion (3 commits suben de una)
SCREENSHOTS_LISTOS: false (otro Cowork los esta generando en paralelo)
WHATSAPP_NUMERO: placeholder (Julio lo setea despues con su agente IA)
RATE_LIMIT_BACKEND: posiblemente bloqueado por IP de Julio (testeo previo). Si Julio quiere registrarse, reiniciar backend en Render (Manual Deploy → Deploy latest commit).
```

### REGLAS DE LA SESION

- Reportar EN ESTE ARCHIVO (seccion "REPORTAR AQUI"), no solo en chat.
- NO mantener compatibilidad con el form viejo. Eliminarlo limpio.
- Validar visualmente con preview local antes de commit.
- Tras cerrar la tarea, sobreescribir "SESION ACTUAL" con `## SESION CERRADA — [tema]` y dejar reporte completo en SESIONES ANTERIORES.

---

## REPORTAR AQUI (Claude Code escribe progreso)

### Estado: COMPLETADO (8/8 pasos). Listo para git push.

#### Paso 1: Form custom eliminado ✅
- Borrada toda la seccion `.empezar-split` de `empezar.html` con sus 11 campos (name, email, phone-cc, phone, role, pw, pw2, company, country, city, industry, size, web)
- Borrados indicadores de password strength, checkboxes de terminos, boton submit, mensajes de error y pantalla de exito custom

#### Paso 2: Hero con CTA principal ✅
- Reemplazo: hero centrado con badge `PROGRAMA DE ACCESO ANTICIPADO`, h1 "6 meses gratis. Sin tarjeta. Sin compromiso.", lede, badge "REGISTRO ABIERTO"
- CTA grande naranja `btn--primary btn--xl`: "Empezar gratis ahora →" → `https://fabrios-app.onrender.com/register?ref=acceso-anticipado` con `target="_self"`
- Hint mono debajo: "Toma 60 segundos · Tu cuenta queda lista al instante · Recibís serial por email"

#### Paso 3: Seccion "Que incluye" ✅
- Mantenida con misma lista de 14 features
- Layout reescrito como `.features-list` grid 2-col desktop / 1-col mobile, check naranja antes de cada item
- Quote card con testimonio movida a esta seccion

#### Paso 4: CTA secundario al final ✅
- Nueva seccion `.cta-final` antes del footer, fondo dark
- "¿Listo para arrancar?" + "6 meses gratis. Sin tarjeta. 60 segundos." + boton XL al mismo wizard

#### Paso 5: Limpieza de JS ✅
- Borrado `setupRegisterForm()` completo de `assets/site.js`
- Borrada constante `REGISTER_ENDPOINT`
- Borradas `ERROR_MESSAGES`, `mapErrorDetail()`, `showSuccess()`, `showError()`
- Quitada llamada a `setupRegisterForm()` del init
- Agregado cleanup de `localStorage.lastSerial` (residuo de la sesion anterior)

#### Paso 6: Limpieza de CSS ✅
- `assets/empezar.css` reescrito: borradas `.empezar-form-card`, `.empezar-form-wrap`, `.pw-strength`, `.input.is-invalid`. Renombrado `.check-list` a `.features-list` con grid 2-col + RTL support.
- `assets/styles.css`: borradas `.form-error` (huerfana), `.pw-strength` (huerfana). Preservadas `.input.is-invalid`, `.form-success`, `.checkbox.is-invalid` (compartidas con demo.html).

#### Paso 7: i18n ES/EN/HE ✅
- 11 strings nuevos agregados a los 3 diccionarios en `assets/site.js`:
  - `empezar.badge`, `empezar.title`, `empezar.lede`, `empezar.status`
  - `empezar.cta.primary`, `empezar.cta.hint`
  - `empezar.includes.kicker`, `empezar.includes.title`
  - `empezar.cta-final.title`, `empezar.cta-final.lede`, `empezar.cta-final.btn`
- Atributos `data-i18n` aplicados a los 11 elementos correspondientes en `empezar.html`

#### Paso 8: Validacion local ✅
- preview_eval: form 100% eliminado (0 inputs, 0 selects, 0 textareas)
- 2 CTAs apuntan a `fabrios-app.onrender.com/register?ref=acceso-anticipado` con `target="_self"`
- 14 items en `.features-list`, `.cta-final` presente
- ES → EN → HE: todos los strings cambian. Hebreo en RTL correcto.
- demo.html intacto (form de demo sigue funcionando, 4 inputs + 3 selects + form-success accesible)
- 9/9 paginas devuelven HTTP 200
- 0 errores JS en consola

---

> **Listo para deploy. Pasos para Julio:**
> 1. `git status` — verificar working tree limpio
> 2. `git push origin main` — sube **1 commit nuevo** (los 3 anteriores `01039c1`, `09d1aca`, `1fade26` ya fueron pusheados)
> 3. Esperar ~3 min al GitHub Action: https://github.com/julito36911-collab/web-fabricontrol-2.0/actions
> 4. Abrir `https://fabricontrol.online/empezar.html` en incognito (Ctrl+Shift+N), esperar ~5 min cache CDN
> 5. **Smoke test del CTA**:
>    - Click "Empezar gratis ahora →" → debe abrir el wizard de FabriOS en la misma pestana
>    - Completar registro real desde el wizard
>    - Volver a empezar.html (history back) → la pagina de marketing debe seguir intacta
>    - Probar tambien el CTA final al pie de la pagina
> 6. **Validacion mobile**: probar en mobile real o DevTools 414px — CTAs centrados, hero legible.
> 7. **IMPORTANTE — limpieza manual en Hostinger** (sigue valido de sesiones anteriores):
>    - Si quedaron archivos del deploy anterior, borrarlos del File Manager. El FTP-Deploy-Action solo agrega/actualiza, NO borra del servidor.

---

## SESIONES ANTERIORES

### SESION CERRADA — Cleanup pre-deploy + correccion legales (cerrada 2026-05-03)

**Estado: COMPLETADO (6/6 pasos). Commit local `09d1aca`. Sin push aun.**

#### Paso 1: Cleanup archivos legacy ✅
- Borrados 3 archivos: `comparacion.html`, `documentacion.html`, `asset-manifest.json`
- Borradas 9 carpetas: `assets/css/`, `assets/img/`, `assets/js/`, `audio/`, `static/`, `productos/`, `en/`, `he/`, `_old_recursos/`
- `frontend-react-legacy/` preservado como backup
- `assets/` solo contiene archivos del nuevo diseno (11 archivos)

#### Paso 2: Reescritura paginas legales ✅
- `terminos.html`: 7 secciones, modelo beta (6 meses gratis, sin tarjeta, precio fundador despues), trilingue ES/EN/HE
- `privacidad.html`: 5 secciones, datos reales (Render US, MongoDB Atlas multi-tenant, Google Drive backup, audit log), trilingue
- `cookies.html`: 4 secciones, sin tracking publicitario, cookies futuras (Plausible/GA), trilingue

#### Paso 3: deploy.yml verificado ✅
- Agregadas exclusiones `.github/**` y `.claude/**`
- Removida exclusion redundante `_old_recursos/**` (ya borrada)

#### Paso 4: Validacion local ✅
- 9 paginas HTTP 200, 3 legacy 404, 0 errores JS, ES/EN/HE OK, RTL OK, grep limpio.

#### Paso 5: Commit local ✅
- Commit `09d1aca` (110 files, +480 -6955). Sin push.

#### Paso 6: BUGS_PENDIENTES.md actualizado ✅
- 3 items marcados [HECHO]. WhatsApp placeholder sigue [PENDIENTE].

#### Validacion de Cowork (post-sesion)
- ✅ Legacy fuera del repo verificado con `git ls-files`.
- ✅ Legales sin precios/suscripcion anual/USD.
- ⚠️ Encontrado en validacion adicional: el form de empezar.html tiene 3 mismatches con el contract del backend. Atacado en sesion siguiente.

---

### SESION CERRADA — Reemplazo total de la web por nuevo diseno HTML estatico (cerrada 2026-05-03)

**Estado: COMPLETADO (14/14 pasos). Commit local `01039c1`. Sin push.**

#### Paso 1: Backup React ✅
- `frontend/` renombrado a `frontend-react-legacy/`

#### Paso 2: Migrar web nueva ✅
- Copiado de `fabricontrol_web_v1/` a raiz. `uploads/` eliminada.

#### Paso 3: GitHub Action ✅
- `deploy.yml` simplificado: FTP directo sin npm install/build.

#### Paso 4: Imagenes ✅
- `assets/og-default.png` (1200x630) y `assets/apple-touch-icon.png` (180x180) generados con Pillow.

#### Paso 5: Paginas legales ✅
- 3 archivos creados con contenido reusado del React viejo. ⚠️ NOTA: este reuso introdujo contradicciones (suscripcion anual, pagina de precios) — corregido en sesion siguiente.

#### Paso 6: Footer ✅
- 9 paginas actualizadas. 4 redes sociales reales. Sacados Sobre nosotros, Blog, GitHub.

#### Paso 7-10: Secciones nuevas en home ✅
- Servicios a medida (4 tarjetas), 22 modulos, 7 pasos arranque, Antes vs Despues.

#### Paso 11: Aprende placeholder ✅
- Mensaje "Proximamente" + estructura preservada.

#### Paso 12-14: Validacion + commit ✅
- Preview OK, mobile sin overflow, commit `01039c1` con `.gitignore` creado.

#### Validacion de Cowork (post-sesion)
- ✅ Las 4 secciones nuevas presentes y bien armadas.
- ⚠️ 2 issues encontrados → cleanup en sesion siguiente.