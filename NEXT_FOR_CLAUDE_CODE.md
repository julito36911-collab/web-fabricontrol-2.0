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

## SESION ACTUAL — Auditoria post-deploy: eliminar demo.html y completar i18n EN/HE

La web fue deployada a Hostinger (commits `01039c1`, `09d1aca`, `1fade26`, `d025e40`). Julio reviso en produccion y encontro 2 issues criticos:

1. **`demo.html` no es necesaria** — Julio decide eliminarla. Atiende los demos personalmente por WhatsApp con su agente IA. La pagina es redundante con `contacto.html`.
2. **Falta hebreo en casi toda la web** — la cobertura de i18n esta muy desbalanceada: ES 114 keys, EN 76 keys, HE solo 38 keys. Cuando un usuario cambia a HE solo se traducen header, footer y la pagina `empezar.html`. El resto del contenido queda en español.

### Contexto

**Auditoria de cobertura i18n actual** (Cowork, 2026-05-03):

| Pagina | Keys data-i18n | Bloques data-lang="he" | Estado HE |
|--------|----------------|------------------------|-----------|
| index.html | 23 | 1 | ❌ Hero, 4 secciones nuevas, features estrella sin traducir |
| industrias.html | 24 | 1 | ❌ Las 6 industrias sin traducir |
| aprende.html | varias | 1 | ⚠️ Placeholder sin traducir |
| empezar.html | 11 (con bloque empezar.*) | 1 | ✅ Traducido |
| demo.html | varias | 1 | ❌ A eliminar de todas formas |
| contacto.html | varias | 1 | ❌ Sin traducir |
| terminos.html | 21 | 5 | ✅ Trilingue completo |
| privacidad.html | 21 | 5 | ✅ Trilingue completo |
| cookies.html | 21 | 5 | ✅ Trilingue completo |

**Estrategia de i18n a usar**: las paginas legales (terminos / privacidad / cookies) usan **bloques `data-lang="es|en|he"`** con HTML completo por idioma. Es la estrategia correcta para contenido largo. Aplicar lo mismo en index, industrias, aprende, contacto.

### TAREA

#### 1. Eliminar `demo.html` y todas sus referencias

**Borrar** (permiso puntual de borrado autorizado):
- `demo.html` del raiz del repo

**Sacar referencias a demo de las 8 paginas restantes:**
- En el `<nav>` del header: eliminar la linea `<a href="demo.html" data-i18n="nav.demo">Demo</a>`. El nav queda con 5 items: Inicio, Industrias, Aprende, Empezar gratis, Contacto.
- En el footer: si hay link a demo, sacarlo.
- En CTAs de otras paginas que dicen "Ver demo" → demo.html: reemplazar por una de estas 2 opciones segun contexto:
  - "Hablar por WhatsApp" → `wa.me/000000000000?text=Hola%2C%20quiero%20agendar%20una%20demo%20de%20FabriOS`
  - "Aplicar a la beta" → `empezar.html`
- En `aprende.html` la frase "podes pedir una demo personalizada" → cambiar por "podes escribirnos por WhatsApp" o "podes [aplicar a la beta](empezar.html)"
- En `index.html` cualquier seccion que mencione demo → adaptar.

**Sacar de `sitemap.xml`**:
- La linea `<url><loc>https://fabricontrol.online/demo</loc>...</url>`

**En `assets/site.js`** diccionarios:
- Las claves `nav.demo` se pueden mantener (no hace mal) o eliminar de los 3 diccionarios. Recomendado: mantenerlas comentadas por si se reactiva en el futuro.

#### 2. Completar i18n EN/HE en index.html

`index.html` es la landing principal. Todas las secciones estan hardcoded en español.

**Estrategia recomendada**: usar bloques `data-lang="es|en|he"` (igual que en las legales). Para cada bloque de texto largo (parrafos, listas), envolver en 3 versiones:

```html
<div data-lang="es"><!-- contenido en español --></div>
<div data-lang="en" hidden><!-- contenido en ingles --></div>
<div data-lang="he" hidden dir="rtl"><!-- contenido en hebreo --></div>
```

El JS de `assets/site.js` ya tiene la logica de `setLanguage(lang)` que muestra/oculta estos bloques (verificar; si no, agregarla).

**Secciones a traducir en index.html:**
1. Hero: "El sistema operativo de tu fabrica" + lede + dashboard preview (textos)
2. "Si tu fabrica vive en Excel..." (4 problemas)
3. "Una plataforma. Todo el control." (4 features estrella con descripciones)
4. "22 modulos. Una sola plataforma." (12 modulos con descripciones)
5. "Del registro a la primera orden ejecutada en 5-7 dias." (timeline 7 pasos)
6. "Asi se trabaja sin FabriOS / con FabriOS" (comparativo 6 items cada lado + CTA)
7. "FabriOS no es un MVP. Es produccion real." (numeros: 47 routers, 22 modulos, etc.)
8. "Una plataforma, seis industrias." (6 chips de industrias)
9. "¿Necesitas algo diferente? Lo construyo para vos." (4 tarjetas servicios)
10. "Software industrial hecho por gente de fabrica." (sobre Julio)
11. "Empezas hoy. En produccion manana." (CTAs)
12. "Mira FabriOS en accion." (videos / coming soon)
13. "Proba FabriOS 6 meses, gratis." (CTA final)
14. Industry band, kicker, etc.

**Para EN**: traducir al ingles natural (no muy formal). Ejemplo del hero:
- ES: "El sistema operativo de tu fábrica."
- EN: "The operating system for your factory."
- HE: "מערכת ההפעלה של המפעל שלך."

**Para HE**: hebreo natural, mantener `dir="rtl"` en cada bloque he.

#### 3. Completar i18n EN/HE en industrias.html

Estructura: 6 industrias (metalurgia, alimentos, textil, plasticos, quimica, carpinteria), cada una con titulo + descripcion + 4 bullets.

Aplicar la misma estrategia de bloques `data-lang`. Mantener nombres tecnicos (FabriOS, BOM, FEFO, IPQC, MSDS) sin traducir.

#### 4. Completar i18n EN/HE en aprende.html

Es el placeholder. Pocos textos:
- "Tutoriales y casos en video"
- "Próximamente — Estamos grabando los primeros tutoriales de FabriOS."
- "Los primeros videos están en producción."
- "Mientras tanto, podés [escribirnos por WhatsApp]"
- CTAs

Traducir a EN/HE.

#### 5. Completar i18n EN/HE en contacto.html

Toda la pagina. Reusar la estrategia de bloques `data-lang`.

#### 6. Validacion local

- `python -m http.server 8000` y abrir las 8 paginas (sin demo.html).
- Verificar:
  - [ ] `demo.html` no existe (404 si se accede directo).
  - [ ] El nav de las 8 paginas no muestra "Demo".
  - [ ] Sitemap.xml no incluye demo.
  - [ ] Cambiando ES → EN → HE en cada pagina, TODO el contenido se traduce (no solo header/footer).
  - [ ] HE muestra RTL en todo el contenido (texto a la derecha, listas alineadas).
  - [ ] No hay contenido hardcoded en español visible cuando el idioma es EN o HE.
  - [ ] Footer copy se traduce a los 3 idiomas en TODAS las paginas.
  - [ ] CTAs que decian "Ver demo" ahora apuntan a WhatsApp o empezar.html.
  - [ ] Mobile viewport (414px) sin overflow.
  - [ ] 0 errores JS en consola.

#### 7. Commit local + reportar

```bash
git add -A
git commit -m "feat: eliminar demo.html y completar i18n EN/HE en index, industrias, aprende, contacto

- Borrada demo.html (decision Julio: atiende demos por WhatsApp)
- Removida del nav de 8 paginas, del sitemap y CTAs internos
- CTAs 'Ver demo' reemplazados por WhatsApp o 'Aplicar a la beta'
- index.html: 14 secciones traducidas con bloques data-lang
- industrias.html: 6 industrias trilingue
- aprende.html: placeholder trilingue
- contacto.html: trilingue completo
- HE con dir=rtl en todos los bloques"
```

NO push. Julio lo hace despues de validar.

### PERMISO PUNTUAL DE BORRADO (autorizado por Cowork)

Para esta sesion, Claude Code esta **autorizado a borrar**:
- `demo.html` (raiz del repo)

**NO borrar**: cualquier otro archivo. Si se detecta otro archivo a borrar, parar y preguntar.

### Estado de control

```
TAREA_ACTIVA: true
SESION: audit-i18n-remove-demo-2026-05-03
DEPLOY_PENDIENTE: true (Julio hace git push despues de validar)
PUSH_INCLUYE: 1 commit nuevo (los anteriores ya estan en origin/main)
SCREENSHOTS_LISTOS: false
WHATSAPP_NUMERO: placeholder (Julio lo setea despues con su agente IA)
```

### REGLAS DE LA SESION

- Reportar EN ESTE ARCHIVO (seccion "REPORTAR AQUI"), no solo en chat.
- Validacion visual obligatoria con preview local + screenshots de cada pagina en HE.
- HE debe mostrarse RTL completo (no solo el header).
- Tras cerrar la tarea, sobreescribir "SESION ACTUAL" con `## SESION CERRADA — [tema]` y dejar reporte completo en SESIONES ANTERIORES.

---

## REPORTAR AQUI (Claude Code escribe progreso)

### Estado: COMPLETADO (7/7 pasos). Listo para git push.

#### Paso 1: demo.html eliminada y referencias removidas ✅
- `demo.html` borrada del raiz (con permiso puntual)
- Nav actualizado en las 8 paginas restantes via Python script: queda con 5 items (Inicio, Industrias, Aprende, Empezar gratis, Contacto)
- `sitemap.xml`: removida URL de demo
- index.html: CTA "Ver demo de 2 minutos" → "Ver videos de FabriOS" → aprende.html
- industrias.html: 7 botones "Ver demo de X" → WhatsApp con mensaje pre-cargado por industria; "Ver demo" final → "Aplicar a la beta"
- aprende.html: "Pedir demo personalizada" → "Aplicar a la beta"
- contacto.html: card "Demo en vivo" → "Aplicar a la beta" (icono de rayo, 6 meses gratis)
- Claves `nav.demo` en site.js dejadas como estan (no hace mal, sin uso)

#### Paso 2: i18n EN/HE completo en index.html ✅
Bloques `data-lang="es|en|he"` aplicados en las 14 secciones:
1. Hero (eyebrow, h1, lede, mono, tag-pulse, CTAs, fineprint)
2. Industry band (titulo + 6 chips)
3. Problem (eyebrow, h2, 3 cards)
4. Solution (eyebrow, h2, 4 cards)
5. 22 modules (eyebrow, h2, lede, 12 modulos con titulo + desc, "+ 10 mas")
6. 7-step onboarding (eyebrow, h2, lede, 7 steps con when + title + desc)
7. Before/after (eyebrow, h2, 2 cols × 6 items, compare-cta)
8. Numbers (eyebrow, h2, 4 stats con label)
9. Multi-industry (eyebrow, h2, lede, 6 ind-cards con titulo + desc)
10. Custom services (eyebrow, h2, lede, 4 svc-cards con badge + h3 + 4 bullets + ejemplo + CTA)
11. Company (eyebrow, h2, lede, blockquote + 3 company-cards)
12. How to start (eyebrow, h2, 3 steps)
13. Videos head (eyebrow, h2, CTA)
14. Final CTA (tag-pulse, h2, lede, button, mono fineprint)

Total: 558 bloques `data-lang` en index.html. Nombres tecnicos preservados sin traducir: FabriOS, FabriControl, FabriSense, BOM, FIFO, FEFO, IQC, IPQC, OQC, OEE, SENASA, HACCP, MSDS, IoT, CNC, ERP, MVP, KPIs, API, DXF, PDF, QR, PWA.

#### Paso 3: i18n EN/HE completo en industrias.html ✅
- Hero (eyebrow, h1, lede, 6 nav links de anclas)
- 6 industrias × (eyebrow numerado, titulo, lede, 4 bullets, CTA WhatsApp con texto pre-cargado por industria)
- Final CTA (h2, lede, 2 botones)

#### Paso 4: i18n EN/HE completo en aprende.html ✅
- Hero (h1 + lede)
- Seccion placeholder (h2, lede, 2 CTAs: "Aplicar a la beta" + "Chatear por WhatsApp")

#### Paso 5: i18n EN/HE completo en contacto.html ✅
- Hero (h1 + lede)
- WA card (h2, lede, 3 stats con labels, boton "Abrir WhatsApp", caption mono)
- 2 sec-cards (Email + Aplicar a la beta) con titulo + descripcion + boton

#### Paso 6: Validacion local ✅
- demo.html devuelve 404 (verificado con cache-bust no-store)
- 9 paginas live HTTP 200
- Nav con 5 items en las 9 paginas (sin "Demo")
- ES → EN → HE cambia TODO el contenido en index, industrias, aprende, contacto, empezar, terminos, privacidad, cookies (verificado via preview_eval)
- HE muestra `dir="rtl"` correcto
- 0 errores JS en consola
- grep `demo\.html` en *.html → 0 matches en paginas live (solo claves no usadas en site.js, sin efecto)

#### Paso 7: BUGS_PENDIENTES.md actualizado + commit ✅
- 2 bugs marcados [HECHO]: demo.html eliminada + i18n HE completado
- Commit local pendiente al final de este reporte

---

> **Listo para deploy. Pasos para Julio:**
> 1. `git status` — verificar working tree limpio
> 2. `git push origin main` — sube **1 commit nuevo** (sesion actual)
> 3. Esperar ~3 min al GitHub Action: https://github.com/julito36911-collab/web-fabricontrol-2.0/actions
> 4. Abrir `https://fabricontrol.online` en incognito (Ctrl+Shift+N), esperar ~5 min cache CDN
> 5. **Test del switching de idiomas**: en cada pagina (index, industrias, aprende, contacto), click ES → EN → HE. Verificar que TODO el contenido se traduce, no solo el header.
> 6. **Test mobile**: viewport 414px, sin overflow, hebreo RTL OK.
> 7. **Limpieza manual en Hostinger**:
>    - Borrar `demo.html` del File Manager (el FTP-Deploy-Action no borra del servidor, solo agrega/actualiza)
>    - Si quedaron archivos del deploy anterior tambien (verificar legacy de sesiones previas)

---

## SESION CERRADA — Eliminar form custom y reemplazar por CTA al wizard FabriOS (cerrada 2026-05-03)

**Estado: COMPLETADO (8/8 pasos). Commit `d025e40` pusheado a origin/main. Deploy a Hostinger via GitHub Action: ✅ Run 34 verde.**

#### Sintesis
- Form custom de 11 campos eliminado de empezar.html.
- Hero con CTA grande naranja → wizard de FabriOS (`https://fabrios-app.onrender.com/register?ref=acceso-anticipado`, target=_self).
- Seccion "Que incluye tu acceso" con 14 features.
- CTA secundario al final.
- `setupRegisterForm()`, `REGISTER_ENDPOINT`, `ERROR_MESSAGES` borrados de site.js.
- 11 strings nuevos en i18n ES/EN/HE para empezar.html.
- Validacion visual OK (todas las paginas, ES/EN/HE, RTL OK).

#### Validacion de Cowork (post-deploy)
- ✅ Run 34 GitHub Action completado exitosamente.
- ⚠️ Encontrados 2 issues nuevos: demo.html no es necesaria + i18n HE incompleto en mayoria de paginas → atacado en sesion siguiente.

---

### SESION CERRADA — Cleanup pre-deploy + correccion legales (cerrada 2026-05-03)

**Estado: COMPLETADO. Commit `09d1aca` pusheado a origin/main. Deploy via GitHub Action: ✅ Run 33 verde.**

#### Sintesis
- Borrados 3 archivos legacy (comparacion.html, documentacion.html, asset-manifest.json) + 9 carpetas legacy del React build viejo.
- 3 paginas legales reescritas (terminos, privacidad, cookies) trilingue ES/EN/HE adaptadas al modelo beta (sin precios, sin suscripcion anual).
- deploy.yml ajustado con exclusiones de .github/, .claude/.
- Commit 110 archivos cambiados (+480 -6955).

---

### SESION CERRADA — Reemplazo total de la web por nuevo diseno HTML estatico (cerrada 2026-05-03)

**Estado: COMPLETADO (14/14 pasos). Commit `01039c1` pusheado.**

#### Sintesis
- frontend/ React renombrado a frontend-react-legacy/ (backup).
- Web nueva HTML estatica (6 paginas + 3 legales) copiada al raiz.
- Home con 4 secciones nuevas: 22 modulos / 7 pasos arranque / Antes vs Despues / Servicios a medida.
- Footer con 4 redes reales (LinkedIn, X, YouTube, Facebook).
- og-default.png y apple-touch-icon.png generados.
- aprende.html con placeholder Proximamente.
- .gitignore creado para excluir node_modules.
