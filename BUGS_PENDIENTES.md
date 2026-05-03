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

## [PENDIENTE] Numero de WhatsApp es placeholder en 14 ocurrencias
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
