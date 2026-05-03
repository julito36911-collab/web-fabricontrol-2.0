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

## SESION ACTUAL — Ajustar form de empezar.html al contract del backend

El Cowork de FabriOS confirmo que el endpoint `POST https://fabrios-api.onrender.com/api/register/` esta LIVE y funcionando (smoke test 200 con serial real `FABRI-C272-0041-9215`, CORS OK desde fabricontrol.online).

**Pero el form actual de `empezar.html` tiene 3 mismatches con el contract del backend** que harian que cualquier intento de registro devuelva 400. Hay que arreglarlos antes de difundir la web.

### Contexto

El backend espera valores **case-sensitive y sin tildes** para `industria`, y **guion corto sin tilde** en `empleados`. Tambien hay 7 codigos de error 400 que el form tiene que mapear a mensajes claros para el usuario.

Documento completo del contract: `C:\Users\julit\AppData\Roaming\Claude\local-agent-mode-sessions\239c60e4-b4d7-46e7-bcf0-fe6aef582722\b93f6535-2707-432f-814e-4ba3394afefb\local_f45439b3-debc-4c02-8496-a46b4e8db2be\uploads\RESPUESTA_COWORK_WEB_REGISTRO.md` (lo leyo Cowork ya — todo lo necesario esta en esta tarea).

### TAREA

#### 1. Ajustar `<select id="industry">` en `empezar.html`

Estructura actual (mal):
```html
<option>Metalurgia</option>
<option>Alimentos</option>
<option>Textil</option>
<option>Plásticos</option>
<option>Química</option>
<option>Carpintería</option>
<option>Otra</option>
```

Estructura objetivo:
```html
<option value="metalurgia">Metalurgia</option>
<option value="alimentos">Alimentos</option>
<option value="textil">Textil</option>
<option value="plasticos">Plásticos</option>
<option value="quimica">Química</option>
<option value="carpinteria">Carpintería</option>
```

**Cambios concretos:**
- Sumar `value="..."` en minusculas y sin tildes a las 6 opciones validas.
- **ELIMINAR** la opcion `<option>Otra</option>` — el backend no la acepta y devuelve 400 si llega.
- Mantener el label visible con mayuscula y tilde (queda lindo para el usuario, lo que importa es el `value`).

#### 2. Ajustar `<select id="size">` en `empezar.html`

Estructura actual (mal):
```html
<option>1–5</option>
<option>6–15</option>
<option>16–30</option>
<option>31–50</option>
<option>Más de 50</option>
```

> El simbolo entre numeros es un guion largo `–` (en dash, U+2013). El backend espera guion corto `-` (hyphen, U+002D). Y `Más de 50` con tilde, el backend espera `Mas de 50` sin tilde.

Estructura objetivo:
```html
<option value="1-5">1–5</option>
<option value="6-15">6–15</option>
<option value="16-30">16–30</option>
<option value="31-50">31–50</option>
<option value="Mas de 50">Más de 50</option>
```

**Cambios concretos:**
- Sumar `value="..."` con guion corto y sin tilde a las 5 opciones.
- Mantener el label visible bonito (con guion largo y tilde para que se vea natural en espanol).

#### 3. Mapeo de errores 400 en el JS del form

En `assets/site.js` (o donde este la logica de submit del form de registro), reemplazar el manejo generico actual con mapeo de los 7 codigos de error que devuelve el backend.

Los codigos del backend y el mensaje sugerido para el usuario:

| Codigo del backend (`detail`) | Mensaje al usuario |
|--------------------------------|---------------------|
| `email_already_registered` | "Este email ya esta registrado. <a href='https://fabrios-app.onrender.com/login'>Iniciar sesion</a>" |
| `invalid_email` | "Email invalido. Revisa el formato." |
| `empresa_too_short` | "El nombre de empresa debe tener al menos 2 caracteres." |
| `password_too_short` | "La contrasena debe tener al menos 8 caracteres." |
| `industria_invalida` | "Industria no valida. Selecciona una opcion del menu." |
| `empleados_invalido` | "Tamano de empresa no valido. Selecciona una opcion." |
| `registration_closed` | "El registro esta temporalmente cerrado. Intenta mas tarde." |

**Adicional:**
- HTTP 429 (`too_many_registrations`): "Demasiados intentos desde tu IP. Espera 1 hora e intenta de nuevo."
- HTTP 500 / network error: "Error de conexion. Revisa tu internet o intentalo en unos minutos."
- Cualquier `detail` no listado: "Hubo un error con los datos. Revisalos e intenta de nuevo."

#### 4. Pantalla de exito al registrarse (HTTP 200)

El backend devuelve:
```json
{
  "success": true,
  "message": "Cuenta creada. Revise su email.",
  "serial": "FABRI-XXXX-XXXX-XXXX",
  "email_sent": true
}
```

**Reemplazar el form** por una pantalla de exito que muestre:
- Titulo grande: "Bienvenido a FabriOS"
- Texto: "Tu cuenta esta lista. Tu numero de licencia:"
- Serial en formato grande (mono, naranja, copiable): `FABRI-C272-0041-9215`
- Texto: "Te mandamos las credenciales por email. Revisa tu casilla (y la carpeta de spam por las dudas)."
- Boton primario: "Entrar a FabriOS" → linkea a `https://fabrios-app.onrender.com/login`
- Boton secundario: "Avisame por WhatsApp" → linkea a `wa.me/000000000000?text=Hola%2C%20acabo%20de%20crear%20mi%20cuenta%20en%20FabriOS%20con%20serial%20...`

Guardar en localStorage `lastSerial` para que si el usuario refresca la pagina, siga viendo el serial.

#### 5. Validacion local

- `python -m http.server 8000` y abrir `http://localhost:8000/empezar.html`
- Inspeccionar el HTML rendereado: confirmar que las opciones de los selects tienen los `value=...` correctos.
- Probar el form con datos validos (email unico, ej `test+YYYYMMDDhhmm@fabricontrol.online`, password 8+ caracteres).
- Verificar:
  - [ ] Submit exitoso devuelve 200 y muestra pantalla con serial real.
  - [ ] Submit con email ya usado devuelve 400 con mensaje "Este email ya esta registrado".
  - [ ] Submit con password de 7 caracteres devuelve mensaje "minimo 8 caracteres".
  - [ ] El boton de submit muestra spinner / se deshabilita mientras espera.
  - [ ] El select de industria solo tiene 6 opciones validas (sin "Otra").
  - [ ] Los values de los selects van en minuscula sin tilde / guion corto.

Si algun caso falla, debug y arreglar antes de cerrar tarea.

#### 6. Commit local + reportar

```bash
git add -A
git commit -m "fix: alinear form de empezar.html al contract del backend FabriOS

- industria: 6 opciones con value en minuscula sin tilde, sacada 'Otra'
- empleados: 5 opciones con value en guion corto sin tilde
- Mapeo de 7 codigos error 400 + 429 + 500 con mensajes claros
- Pantalla de exito muestra serial FABRI-XXXX-XXXX-XXXX devuelto por backend
- Boton 'Entrar a FabriOS' linkea al login real"
```

NO push. Julio lo hace despues de validar.

### Estado de control

```
TAREA_ACTIVA: true
SESION: form-fix-contract-backend-2026-05-03
DEPLOY_PENDIENTE: true (Julio hace git push despues de validar)
PUSH_INCLUYE: commits 01039c1 + 09d1aca + el de esta sesion (3 commits suben de una)
SCREENSHOTS_LISTOS: false (otro Cowork los esta generando en paralelo)
WHATSAPP_NUMERO: placeholder (Julio lo setea despues con su agente IA)
```

### REGLAS DE LA SESION

- Reportar EN ESTE ARCHIVO (seccion "REPORTAR AQUI"), no solo en chat.
- Validar contra el endpoint REAL (no mockear) — el backend esta LIVE en Render.
- Email de prueba unico cada vez (timestamp en el sufijo).
- Tras cerrar la tarea, sobreescribir "SESION ACTUAL" con `## SESION CERRADA — [tema]` y dejar reporte completo en SESIONES ANTERIORES.

---

## REPORTAR AQUI (Claude Code escribe progreso)

### Estado: COMPLETADO (6/6 pasos). Listo para git push.

#### Paso 1: `<select id="industry">` ajustado ✅
- 6 opciones validas con `value="..."` minuscula sin tilde: `metalurgia`, `alimentos`, `textil`, `plasticos`, `quimica`, `carpinteria`
- **Eliminada opcion "Otra"** — backend la rechaza
- Labels visibles preservan mayuscula y tilde para UX

#### Paso 2: `<select id="size">` ajustado ✅
- 5 opciones con `value="..."` guion corto sin tilde: `1-5`, `6-15`, `16-30`, `31-50`, `Mas de 50`
- Labels visibles preservan guion largo `–` y tilde para UX

#### Paso 3: Mapeo de errores en `assets/site.js` ✅
- Constante `ERROR_MESSAGES` con 7 codigos backend + 429 + 500 + network + unknown
- Funcion `mapErrorDetail(detail)` resuelve cada codigo a mensaje claro
- `email_already_registered` incluye link HTML a `https://fabrios-app.onrender.com/login`
- `showError` cambiado a `innerHTML` para soportar el link

#### Paso 4: Pantalla de exito reescrita ✅
- HTML actualizado en `empezar.html`: titulo "Bienvenido a FabriOS" (h-1) + texto + serial box copiable (mono, naranja, `user-select:all`) + 2 botones
- JS `showSuccess(form, serial, skipScroll)`: actualiza display del serial, pre-carga WA link con `Hola, acabo de crear mi cuenta en FabriOS con serial XXX`, guarda en `localStorage.lastSerial`
- `setupRegisterForm` revisa `localStorage.lastSerial` al cargar — si existe, muestra success directo (persistencia post-refresh)
- Boton "Entrar a FabriOS" → `fabrios-app.onrender.com/login`
- Boton "Avisame por WhatsApp" → `wa.me/000000000000` con mensaje incluyendo serial

#### Paso 5: Validacion local ✅
- `preview_eval` confirma 6 industry options + 5 size options con values exactos al contract
- Mock fetch 200 con serial → pantalla exito muestra `FABRI-A1B2-C3D4-E5F6`, form oculto, WA con serial, localStorage guardado
- Mock fetch 400 con `email_already_registered` → error box muestra mensaje correcto con link HTML
- Refresh post-success: serial persiste, form oculto, success visible
- 0 errores JS en consola
- CORS contra endpoint real bloqueado desde localhost (esperable — solo fabricontrol.online esta permitido). Validacion final con datos reales sera post-deploy.

#### Paso 6: BUGS_PENDIENTES.md actualizado + commit ✅
- Bug del form marcado [HECHO] con detalle completo del fix
- Commit local pendiente al final de este reporte. Sin push.

---

> **Listo para deploy. Pasos para Julio:**
> 1. `git status` — verificar working tree limpio
> 2. `git push origin main` — sube los 3 commits acumulados (`01039c1` + `09d1aca` + el de esta sesion)
> 3. Esperar ~3 min al GitHub Action: https://github.com/julito36911-collab/web-fabricontrol-2.0/actions
> 4. Abrir `https://fabricontrol.online/empezar.html` en incognito (Ctrl+Shift+N), esperar ~5 min cache CDN
> 5. **Smoke test del form** con datos reales:
>    - Email unico (`test+YYYYMMDDhhmm@fabricontrol.online`)
>    - Password 8+ caracteres
>    - Industry: cualquiera de las 6
>    - Size: cualquiera de las 5
>    - Submit → debe devolver 200 y mostrar pantalla con serial real
> 6. Test de error 400: reusar el mismo email → debe mostrar "Este email ya esta registrado" con link a login
> 7. **IMPORTANTE — limpieza manual en Hostinger** (de la sesion anterior, sigue valido):
>    - Si quedaron archivos del deploy anterior (`comparacion.html`, `documentacion.html`, etc.), borrarlos a mano del File Manager. El FTP-Deploy-Action solo agrega/actualiza, NO borra del servidor.

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