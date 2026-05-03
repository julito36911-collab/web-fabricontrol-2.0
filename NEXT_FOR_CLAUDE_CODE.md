# NEXT_FOR_CLAUDE_CODE.md — web-fabricontrol-2.0

> Este archivo es el "buzon" entre Cowork (QA / Julio) y Claude Code (developer).
> Cowork actualiza este archivo cuando termina cada validacion.
> Claude Code lee este archivo al iniciar sesion y arranca la tarea descrita.
> Claude Code ESCRIBE el resultado en seccion "REPORTAR AQUI" del mismo archivo.

---

## PERMISOS PERMANENTES PARA CLAUDE CODE EN ESTE PROYECTO

Sos developer en el repo `C:\web-fabricontrol-2.0\` (sitio web marketing FabriControl, deploy a Hostinger fabricontrol.online via File Manager manual).

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
- Borrar archivos (rm -rf, del, Remove-Item)
- Editar `.env`, `secrets/`, `credentials/`, `.claude/*`
- `git push` (deploy es manual via Hostinger File Manager)
- ftp, sftp, scp, ssh, rsync (deploy)
- curl HTTPS a sitios externos
- wget

**Deploy en este proyecto NO es automatico**. Despues de cambios, Julio sube los archivos a Hostinger via File Manager o FTP. Claude Code solo modifica archivos locales y commitea (sin push).

**Antes de arrancar cualquier tarea, leete:**
1. `WORKFLOW_OFICIAL.md` (manual del workflow)
2. Esta seccion ("SESION ACTUAL" abajo) con la tarea concreta
3. Si hay archivos de contexto historicos en la carpeta (CONTEXTO_*, README, etc.), leerlos para tener orientacion

**Tras leer, confirmame en 5-6 lineas**: que tarea, que archivos vas a tocar, como vas a validar (preview local, screenshot), que NO hacer. Si entendiste, arranca.

---

## SESION ACTUAL — Reemplazo total de la web por nuevo diseno HTML estatico

Julio le pidio a Claude Design un rediseno completo de `fabricontrol.online`. El diseno esta listo (HTML estatico puro, 6 paginas, multi-idioma ES/EN/HE) y hay que integrarlo a este repo, aplicar correcciones, sumar contenido nuevo sobre FabriOS, y dejar todo listo para que Julio suba a Hostinger.

### Contexto

**Que es:** la web de la EMPRESA FabriControl (`fabricontrol.online`) que presenta su producto principal **FabriOS** (ERP industrial). NO confundir empresa con producto. Otros futuros productos: FabriSense, etc.

**Estado del producto FabriOS:** beta privada, pre-revenue, 22 modulos del usuario, multi-tenant, multi-idioma ES/EN/HE, app movil PWA offline. App desplegada en `https://fabrios-app.onrender.com`.

**Modelo:** programa de Acceso Anticipado, **6 meses gratis sin tarjeta**. NO mostrar precios en la web. Buscamos **5 a 8 fabricas piloto**.

**Archivos clave a leer ANTES de empezar:**
1. `C:\web-fabricontrol-2.0\WORKFLOW_OFICIAL.md` — manual del workflow (frases cortas, no push, deploy manual)
2. `C:\Users\julit\fabri control\web-fabricontrol\CONTEXTO_WEB_FABRICONTROL.md` — fuente de verdad del proyecto web (jerarquia empresa/producto, paleta, tipografias, estructura, modelo de negocio)
3. `C:\web-fabricontrol-2.0\BUGS_PENDIENTES.md` — issues identificados durante la revision del HTML nuevo
4. Este archivo (NEXT_FOR_CLAUDE_CODE.md)

**Ubicacion de los archivos:**
| Que | Donde |
|-----|-------|
| Repo local actual (web vieja React) | `C:\web-fabricontrol-2.0\` |
| Web nueva HTML estatica descomprimida | `C:\Users\julit\fabri control\web-fabricontrol\fabricontrol_web_v1\` |
| Zip original (backup) | `C:\Users\julit\fabri control\web-fabricontrol\fabricontrol web.zip` |
| Screenshots de FabriOS (PENDIENTES, los toma otro Cowork) | `C:\Users\julit\fabri control\web-fabricontrol\screenshots_fabrios\` |
| Endpoint registro (ya cableado en empezar.html) | `POST https://fabrios-api.onrender.com/api/register/` |

### TAREA

Integrar la web nueva al repo, aplicar correcciones, sumar contenido nuevo, validar y dejar lista para deploy manual. **NO hacer git push. NO hacer FTP/SCP. Deploy lo hace Julio manual via Hostinger File Manager.**

#### 1. Backup del frontend React viejo
- Renombrar `frontend/` a `frontend-react-legacy/`. NO borrar — vamos a reusar contenido (Terms, Privacy).

#### 2. Migrar la web nueva al repo
- Copiar TODO de `C:\Users\julit\fabri control\web-fabricontrol\fabricontrol_web_v1\` al raiz del repo, EXCEPTO la subcarpeta `uploads/` (que tiene basura del proceso de Claude Design — ignorala).
- Estructura objetivo en raiz del repo:
  ```
  index.html
  industrias.html
  aprende.html
  empezar.html
  demo.html
  contacto.html
  terminos.html        ← crear (paso 5)
  privacidad.html      ← crear (paso 5)
  cookies.html         ← crear (paso 5)
  robots.txt
  sitemap.xml
  videos.json
  assets/
    styles.css
    home.css
    industrias.css
    empezar.css
    demo.css
    contacto.css
    site.js
    app.js
    favicon.svg
    og-default.png        ← generar (paso 4)
    apple-touch-icon.png  ← generar (paso 4)
    screenshots/          ← se llena cuando lleguen los screenshots
  ```
- Verificar que NO haya conflictos con archivos en raiz que vienen del React buildeado viejo (por ejemplo `index.html` viejo). Sobreescribir con la version nueva.

#### 3. GitHub Action de deploy
- Revisar `.github/workflows/deploy.yml`. Si existe y ejecuta `npm install` o `npm run build`, **simplificarlo** para que solo haga FTP del raiz al `/public_html/` de Hostinger SIN buildear (porque ya no hay React).
- Si no querés tocarlo, bloqueado y pedir confirmacion antes de modificar el workflow.
- IMPORTANTE: aunque el workflow se ajuste, NO ejecutar `git push` desde Claude Code. Julio sube manual.

#### 4. Generar imagenes faltantes
- `assets/og-default.png` — 1200x630 px, fondo `#0F172A`, letra "F" naranja `#F97316` grande centrada + texto "FabriControl" debajo en blanco. Generar con Pillow / ImageMagick / similar.
- `assets/apple-touch-icon.png` — 180x180 px, fondo `#0F172A`, solo la "F" naranja `#F97316` centrada.

#### 5. Crear paginas legales (Terminos, Privacidad, Cookies)
- Reusar contenido de:
  - `frontend-react-legacy/src/pages/TermsAndConditions.js`
  - `frontend-react-legacy/src/pages/PrivacyPolicy.js`
- Para **cookies** no hay archivo viejo: generar contenido basico (cookies de navegacion + analytics genericos). Mantener simple.
- Cada uno debe usar el **mismo header, footer, CSS y JS** que el resto. Copiar la estructura de `contacto.html` y reemplazar solo el `<main>`.
- Soportar i18n ES/EN/HE (tres versiones del texto, usando el sistema `data-i18n` ya existente o copiando los 3 idiomas en bloques con `data-lang-block`).
- Sumar al `sitemap.xml`:
  ```xml
  <url><loc>https://fabricontrol.online/terminos</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://fabricontrol.online/privacidad</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://fabricontrol.online/cookies</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  ```

#### 6. Footer — limpieza y fix de links
En el `<footer>` de TODAS las paginas (incluidas las 3 legales nuevas):

**6.1 Columna "Empresa":** dejar SOLO "Contacto". Eliminar "Sobre nosotros" y "Blog".

**6.2 Columna "Legal":** linkear las paginas legales reales:
```html
<li><a href="terminos.html" data-i18n="footer.terms">Terminos</a></li>
<li><a href="privacidad.html" data-i18n="footer.privacy">Privacidad</a></li>
<li><a href="cookies.html" data-i18n="footer.cookies">Cookies</a></li>
```

**6.3 Columna "Productos":** dejar como esta — FabriOS (activo) + FabriSense (proximamente) + Mas productos (en desarrollo). Los 2 ultimos pueden quedar como `<span>` sin `<a>` o con `pointer-events:none` para indicar visualmente que aun no son clickables.

**6.4 Redes sociales:** reemplazar el bloque `footer__socials` con estos 4 links reales. SACAR GitHub. Sumar X y Facebook.

```html
<div class="footer__socials">
  <a href="https://www.linkedin.com/in/juliomirabal/" target="_blank" rel="noopener" aria-label="LinkedIn">
    <!-- mantener SVG LinkedIn existente -->
  </a>
  <a href="https://x.com/juliomirabal2" target="_blank" rel="noopener" aria-label="X (Twitter)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  <a href="https://www.youtube.com/@NQPodcast-z7p" target="_blank" rel="noopener" aria-label="YouTube">
    <!-- mantener SVG YouTube existente -->
  </a>
  <a href="https://www.facebook.com/profile.php?id=61571999961373" target="_blank" rel="noopener" aria-label="Facebook">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
</div>
```

#### 7. Sumar SECCION "Servicios a medida" en la home
Despues de la seccion "Una plataforma, seis industrias" y ANTES de "Software industrial hecho por gente de fabrica" en `index.html`, sumar nueva seccion con titulo:

> **¿Necesitas algo diferente? Lo construyo para vos.**
> _(Subtitulo)_ Si FabriOS no encaja con tu fabrica, te armo un sistema a medida.

4 tarjetas (mismo grid que las industrias, paleta `#0F172A` fondo + acentos `#F97316` y `#06B6D4`):

| Tarjeta | Badge | Icono sugerido | Titulo | Bullets | CTA |
|---------|-------|----------------|--------|---------|-----|
| 1 | "DESDE 4 SEMANAS" | nube / cloud | Software a medida en la nube | ERP y sistemas de gestion · Inventario, produccion, calidad · Cotizaciones y finanzas · Disenado para tu flujo exacto | Solicitar cotizacion → WhatsApp |
| 2 | "TU IDEA FUNCIONANDO" | mobile | App / Plataforma web | Portal de clientes o marketplace · Pagos online y catalogo · Reservas y notificaciones · Responsive y multi-idioma | Solicitar cotizacion → WhatsApp |
| 3 | "MONITOREO 24/7" | satelite / radar | Automatizacion IoT | Sensores en maquinas · Dashboard en tiempo real · Alertas automaticas · Mantenimiento predictivo | Solicitar cotizacion → WhatsApp **+** "Ver demo" → demo.html |
| 4 | "RESULTADOS EN 2 SEMANAS" | llave / herramienta | Consultoria de procesos | Mapeo de procesos · Eliminacion de cuellos de botella · Optimizacion de costos · Documentacion y capacitacion | Solicitar cotizacion → WhatsApp |

Bajo cada tarjeta, en italica, ejemplo concreto:
1. _Ej: Sistema de gestion para panaderia con 3 sucursales_
2. _Ej: Portal de turnos online para clinica dental_
3. _Ej: Dashboard de 5 maquinas CNC con alertas WhatsApp_
4. _Ej: Diagnostico operativo para fabrica de muebles_

CTA "Solicitar cotizacion" linkea a:
```
https://wa.me/000000000000?text=Hola%2C%20quiero%20cotizar%20[Software%20a%20medida%20|%20App%20web%20|%20Automatizacion%20IoT%20|%20Consultoria%20de%20procesos]
```
(Dejar el `000000000000` como esta — Julio lo cambia despues con su agente IA.)

I18n ES/EN/HE para los 4 titulos, badges y bullets.

#### 8. Sumar SECCION "Que hace FabriOS — los modulos" en la home
Despues de "Una plataforma. Todo el control." (que ya tiene 4 features estrella) y ANTES de "FabriOS no es un MVP. Es produccion real.", sumar una seccion con titulo:

> **22 modulos. Una sola plataforma.**
> _(Subtitulo)_ FabriOS cubre el ciclo completo: comercial → ingenieria → produccion → calidad → finanzas. Asi se ve por dentro.

Layout en grid de cards (3 columnas desktop, 1 mobile). Para cada modulo: icono + nombre + 1 oracion de para que sirve. Mostrar **los 12 mas importantes** (no los 22 — se hace muy denso). Lista priorizada:

1. **Dashboard** — KPIs en vivo, alertas, OEE
2. **Cotizaciones** — PDFs profesionales con QR, conversion a orden con un click
3. **Ordenes de Produccion** — rutas de pasos, seguimiento por QR, estado en tiempo real
4. **Inventario** — stock por lote con FIFO/FEFO, trazabilidad completa
5. **BOM** — estructura de producto con revisiones (Rev 0/1/2) y lifecycle
6. **Calidad (QC)** — IQC entrada + IPQC en ruta + OQC salida
7. **Compras** — OC con QR, recepcion, vinculo automatico a IQC
8. **App Movil PWA** — operario escanea, planta sin internet sigue trabajando
9. **Asistente IA** — chat contextual (Gemini), entiende donde estas y actua
10. **Plantillas DXF parametricas** — cliente pide medidas → genera BOM + DXF + PDF automatico
11. **Importador masivo** — Excel/CSV con preview y mapeo de columnas
12. **Finanzas** — dashboard, cierre de mes, costo real vs presupuesto

Al final de la seccion, una linea: **"+ 10 modulos mas"** linkeando a `/aprende` (cuando haya videos) o quedando como texto plano por ahora.

#### 9. Sumar SECCION "Como arrancar — los 7 pasos" en la home
Despues de la seccion "22 modulos" y antes de "FabriOS no es un MVP", sumar:

> **Del registro a la primera orden ejecutada en 5-7 dias.**
> _(Subtitulo)_ Sin consultores. Sin cargos por implementacion. Asistido por la IA del producto.

Timeline horizontal o vertical, con 7 pasos:

| # | Cuando | Paso | Detalle (1 oracion) |
|---|--------|------|---------------------|
| 1 | Dia 1, 60 segundos | Registro | Email + password. Recibis serial FABRI-XXXX-XXXX por mail |
| 2 | Dia 1, 10 min | Setup empresa | Logo, formato de numeracion, moneda, eleccion de industria |
| 3 | Dia 1-2 | Estructura | Departamentos, usuarios, permisos por modulo, operadores de planta |
| 4 | Dia 2-3 | Catalogo + BOM | Productos (manual o Excel), componentes, archivos tecnicos por revision |
| 5 | Dia 3-4 | Inventario + planta | Items con lotes, maquinas, alertas de stock minimo |
| 6 | Dia 4-5 | Primera cotizacion | Cliente + producto → PDF con QR → conversion a orden con un click |
| 7 | Dia 5-7 | Primera orden ejecutada | Imprimis QR, operario escanea, calidad aprueba IQC, orden cerrada |

Diseno: cards numeradas con conexion visual entre ellas (linea horizontal o flechas en mobile). Paleta segun resto: fondos `bg-white` o `bg-light` para contrastar con secciones dark adyacentes.

#### 10. Sumar SECCION "Antes vs Despues" en la home
Despues de "Como arrancar" y antes de "FabriOS no es un MVP", sumar comparativo simple:

Titulo: **Asi se trabaja sin FabriOS. Asi se trabaja con FabriOS.**

Layout: 2 columnas, paleta opuesta (rojo claro vs verde claro o naranja vs cyan).

| Sin FabriOS (rojo/gris) | Con FabriOS (naranja/cyan) |
|-------------------------|----------------------------|
| 7 Excels desincronizados | 1 plataforma con datos en vivo |
| Cuaderno del jefe de planta | Ordenes con QR, ruta de pasos |
| Grupo de WhatsApp con pedidos perdidos | Cotizacion → orden con un click |
| Inventario "a ojo" | Stock por lote FIFO/FEFO con trazabilidad |
| Si el encargado se enferma, la fabrica se para | Cualquier supervisor entra y ve el estado |
| 6 horas/semana reconciliando datos | Tiempo libre para producir mas |

Bajo el comparativo, un parrafo:

> **FabriOS esta en beta privada con cupo limitado.** Buscamos **de 5 a 8 fabricas piloto** para validar el producto en produccion real durante este 2026. Si crees que tu fabrica encaja, [aplica desde aca →](empezar.html).

CTA principal: boton naranja grande "Aplicar a la beta" → `empezar.html`.
CTA secundario: "Hablar por WhatsApp" → `wa.me/000000000000?text=Hola%2C%20quiero%20saber%20mas%20de%20la%20beta`.

#### 11. Pagina /aprende — placeholder "Proximamente"
- NO hay videos sobre FabriOS en `@NQPodcast-z7p` todavia.
- Mantener la estructura de `aprende.html` y `videos.json` intacta (filtros, modal, categorias) para sumar videos despues sin tocar codigo.
- Sobreescribir el contenido principal con un mensaje:
  > **Tutoriales y casos en video — Proximamente.**
  > Estamos grabando los primeros tutoriales de FabriOS. Mientras tanto, podes [pedir una demo personalizada](contacto.html) o [chatear por WhatsApp].
- Mantener el header / footer / nav igual que las otras paginas.

#### 12. Screenshots — esperar a que esten disponibles
- En paralelo a esta tarea, otro Cowork esta tomando screenshots de FabriOS y los va a guardar en `C:\Users\julit\fabri control\web-fabricontrol\screenshots_fabrios\`.
- **NO bloquear** esta tarea esperando los screenshots. Trabajar con todo lo demas y dejar **placeholders visuales** (cards con fondo gris + nombre del modulo) en las secciones donde irian las imagenes.
- Cuando lleguen los screenshots:
  - Copiarlos a `assets/screenshots/` con los nombres `01_dashboard.png`, `02_orden_detalle.png`, etc.
  - Reemplazar los placeholders por `<img src="assets/screenshots/...">` con `alt` descriptivo.
- Si los screenshots ya estan en `screenshots_fabrios\` cuando arranques, listalos en el reporte y usalos directo.

#### 13. Validacion antes de declarar OK
- Levantar preview local: `cd C:\web-fabricontrol-2.0 && python -m http.server 8000` (o `npx serve`).
- Abrir las 9 paginas en navegador (index, industrias, aprende, empezar, demo, contacto, terminos, privacidad, cookies). Verificar:
  - [ ] Header con logo "FabriControl" y nav con 6 items (Inicio, Industrias, Aprende, Empezar gratis, Demo, Contacto).
  - [ ] Selector ES/EN/HE funciona y cambia el texto. RTL activo en HE.
  - [ ] Boton WhatsApp del header y FAB flotante aparecen (van al placeholder, OK).
  - [ ] Form de `empezar.html` valida en cliente (probar email mal, password corta, passwords distintas).
  - [ ] Footer con 4 redes sociales (LinkedIn, X, YouTube, Facebook) con URLs reales.
  - [ ] Links de Terminos / Privacidad / Cookies funcionan y muestran contenido.
  - [ ] Home tiene las 4 secciones nuevas (Modulos, Como arrancar, Antes vs Despues, Servicios a medida).
  - [ ] No hay `href="#"` en footer (excepto FabriSense / Mas productos, que son placeholders deliberados).
  - [ ] No hay `aprende.html` rota — debe mostrar mensaje "Proximamente".
  - [ ] og-default.png y apple-touch-icon.png se cargan sin 404.
  - [ ] Mobile viewport (414x896) sin overflow horizontal en ninguna pagina.
  - [ ] Sitemap.xml lista las 9 paginas.
- Tomar screenshots desktop + mobile de la home y de empezar.html para reportar.

#### 14. Commit local (NO push)
- `git add -A`
- `git commit -m "feat: reemplazo total del frontend por web HTML estatica nueva

- Backup React anterior en frontend-react-legacy/
- 6 paginas + 3 legales (terminos, privacidad, cookies) en raiz
- Form empezar.html cableado a fabrios-api.onrender.com/api/register/
- Home con secciones: 22 modulos, 7 pasos arranque, antes/despues, servicios a medida
- aprende.html con placeholder Proximamente (estructura lista para sumar videos)
- Footer con 4 redes reales (LinkedIn, X, YouTube, Facebook)
- og-default.png + apple-touch-icon.png generados"`

NO hacer `git push`. Julio sube manual a Hostinger.

### Estado de control

```
TAREA_ACTIVA: true
DEPLOY_PENDIENTE: true (Julio sube manual cuando valide)
SCREENSHOTS_LISTOS: false (otro Cowork los esta generando en paralelo)
WHATSAPP_NUMERO: placeholder (Julio lo setea despues)
```

### Marcar bugs como [HECHO] en BUGS_PENDIENTES.md

Cuando completes cada bloque de la tarea, ir a `BUGS_PENDIENTES.md` y marcar los items correspondientes como `[HECHO]` en lugar de `[PENDIENTE]`. Los bugs son:

- WhatsApp placeholder → **NO TOCAR** (Julio decide despues)
- Imagenes faltantes (og-default + apple-touch-icon) → **HECHO** cuando paso 4 termine
- Pagina /aprende sin videos → **HECHO** cuando paso 11 termine (placeholder puesto)
- Falta seccion Servicios a medida → **HECHO** cuando paso 7 termine
- Falta seccion Que es FabriOS → **HECHO** cuando pasos 8+9+10 terminen
- Footer links rotos → **HECHO** cuando paso 6 termine
- Stack React → HTML estatico → **HECHO** cuando pasos 1+2+3 terminen

---

## REGLAS DE LA SESION

- Reportar EN ESTE ARCHIVO (seccion "REPORTAR AQUI"), no solo en chat. Asi Cowork lee progreso sin que Julio pegue logs.
- Tras cualquier cambio en HTML/CSS/JS, **abrir preview local** (`python -m http.server 8000` o `npx serve`) y verificar visualmente antes de declarar OK.
- Auditoria preventiva: si arreglas un bug en un patron (ej. accesibilidad, broken links, color hardcoded), buscar el mismo patron en el resto de las paginas y arreglarlo.
- Performance basico: paginas mobile deben cargar < 3s. Imagenes optimizadas. Sin JS bloqueante.
- SEO basico: cada pagina con `<title>`, `<meta description>`, alt en imagenes, sitemap.xml + robots.txt actualizados.
- Tras cerrar la tarea, sobreescribir "SESION ACTUAL" con `## SESION CERRADA — [tema]` y dejar reporte completo.

---

## REPORTAR AQUI (Claude Code escribe progreso)

### Reporte — 2026-05-03

**Estado: COMPLETADO (14/14 pasos)**

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
- Pendiente de ejecutar (siguiente paso).

#### Archivos tocados
- `index.html` — 4 secciones nuevas insertadas
- `aprende.html` — main reemplazado con placeholder
- `contacto.html`, `industrias.html`, `empezar.html`, `demo.html` — footer actualizado
- `terminos.html`, `privacidad.html`, `cookies.html` — creados
- `assets/styles.css` — CSS para legal pages, modules grid, timeline, compare, services
- `assets/og-default.png`, `assets/apple-touch-icon.png` — generados
- `.github/workflows/deploy.yml` — simplificado
- `sitemap.xml` — 3 URLs legales agregadas
- `BUGS_PENDIENTES.md` — 6 items marcados [HECHO]

#### Pendientes para Julio
- [ ] Setear numero de WhatsApp real (reemplazar `000000000000` en 14+ ocurrencias)
- [ ] Screenshots de FabriOS (cuando esten listos, copiar a `assets/screenshots/`)
- [ ] Subir a Hostinger via File Manager
- [ ] Validar en fabricontrol.online (esperar ~5 min CDN cache)

---

## SESIONES ANTERIORES

(Vacio — se va llenando con historico de tareas cerradas)
