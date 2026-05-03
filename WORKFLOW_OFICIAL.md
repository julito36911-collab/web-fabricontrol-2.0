# WORKFLOW OFICIAL — web-fabricontrol-2.0

> Sistema de trabajo bidireccional Cowork ↔ Claude Code adaptado al sitio web.
> Vigente desde: 2026-05-02.

---

## REGLA DE ORO

> Julio NO copia/pega prompts largos. Solo dice frases cortas. Cero copy/paste de logs.

## REGLA CRITICA — Cowork NO da bloques a Julio para pegar

**MAL**: "Pegale a Claude Code esto: [bloque]"
**BIEN**: Cowork edita NEXT_FOR_CLAUDE_CODE.md → le dice a Julio "decile a Claude Code: lee"

---

## LOS 3 ARCHIVOS DEL SISTEMA

| Archivo | Ubicacion | Quien escribe | Para que |
|---------|-----------|---------------|----------|
| `NEXT_FOR_CLAUDE_CODE.md` | raiz `web-fabricontrol-2.0/` | **AMBOS** (bidireccional) | Buzon: tarea + resultado |
| `BUGS_PENDIENTES.md` | raiz `web-fabricontrol-2.0/` | Cowork escribe `[PENDIENTE]`, Claude Code marca `[HECHO]`/`[BLOQUEADO]` | Cola de bugs |
| `WORKFLOW_OFICIAL.md` | este archivo, mismo carpeta | Manual permanente | Referencia |

---

## EL CICLO BIDIRECCIONAL

```
1. Cowork escribe tarea en NEXT_FOR_CLAUDE_CODE.md
2. Julio dice "lee" a Claude Code
3. Claude Code lee NEXT + WORKFLOW_OFICIAL
4. Claude Code confirma contexto en 5-6 lineas
5. Claude Code trabaja autonomo (permisos en NEXT)
6. Claude Code ESCRIBE resultado en seccion "REPORTAR AQUI" del MISMO archivo
7. Julio dice "fijate" o "ya termino" a Cowork
8. Cowork lee NEXT actualizado
9. Cowork verifica visualmente (browser preview, screenshot)
10. Cowork actualiza BUGS_PENDIENTES y escribe siguiente tarea en NEXT
   ↻ Volver al paso 2
```

---

## QUE DICE JULIO (frases cortas)

**A Claude Code**:
- `lee` → cuando Cowork ya escribio la siguiente tarea en NEXT

**A Cowork**:
- `lee CONTEXTO_FABRIOS.md` (o equivalente del proyecto web)
- `fijate como va`
- `ya termino`
- `que falta`
- `validar [pagina o feature]`

---

## DIFERENCIAS CON EL WORKFLOW DE FABRIOS PRODUCTO

| Item | FabriOS producto | web-fabricontrol-2.0 |
|------|------------------|---------------------|
| Stack | FastAPI + MongoDB + React PWA | HTML/CSS/JS estatico (o Next/Astro segun version) |
| Tests | 188 tests E2E pytest | Preview visual + screenshots manuales |
| Deploy | git push → Render auto-deploy | Manual via Hostinger File Manager / FTP |
| `git push` permitido a Claude Code | Si | NO (deploy manual) |
| Backend | Python | (no aplica, frontend puro) |
| Multi-tenant | Si | No |
| Auditoria preventiva | grep en routers Python | grep en HTML/CSS para patterns repetidos |
| Validacion | curl + tests E2E | abrir browser local + screenshot |

---

## TIPOS DE TAREAS TIPICAS

### Cambios de copy / contenido
- Texto en hero, headings, paragraphs, CTAs
- Cambios de pricing, planes, features list
- Update de testimonios o casos de uso

### Cambios de diseño
- Color, tipografia, spacing
- Componentes nuevos (cards, tablas, formularios)
- Animaciones / transiciones

### SEO
- `<title>` + `<meta description>` por pagina
- alt en imagenes
- sitemap.xml + robots.txt
- structured data (JSON-LD)
- Open Graph + Twitter Cards
- Speed (Core Web Vitals)

### Forms
- Contacto, demo, newsletter
- Conexion a email service (Brevo, Mailchimp, etc.) o Google Forms
- Validacion JS basica
- Mensaje de exito/error

### Multi-idioma (si aplica)
- ES / EN / HE
- Switcher visible
- Hreflang tags

### Tracking / Analytics
- Google Analytics / Plausible
- Eventos custom (button clicks, form submits)
- Privacy compliant (cookie banner si UE)

---

## VALIDACION VISUAL (sin tests E2E)

Como NO hay framework de tests E2E para sitios estaticos, la validacion es:

1. **Preview local** antes de declarar tarea OK:
   ```
   cd C:\web-fabricontrol-2.0
   python -m http.server 8000
   # Abrir browser http://localhost:8000
   ```
   o:
   ```
   npx serve
   ```

2. **Screenshot** de la pagina afectada (Chrome DevTools mobile + desktop viewport).

3. **Cowork via Chrome MCP** puede tomar screenshots y validar comportamiento (clicks, navegacion, forms).

4. **Validacion mobile**: usar Chrome DevTools "Toggle device toolbar" (Ctrl+Shift+M) para simular mobile.

5. **Pre-deploy checklist** que Claude Code completa antes de declarar OK:
   - [ ] Preview local sin error en consola JS
   - [ ] Mobile viewport OK (414x896 o 375x667)
   - [ ] Desktop viewport OK (1440+)
   - [ ] Sin links rotos (validar `<a href>` en la pagina cambiada)
   - [ ] Sin imagenes rotas
   - [ ] Si toca SEO: validar `<title>` y `<meta description>` siguen ahi
   - [ ] Si toca form: enviar test request (al endpoint configurado)

---

## DEPLOY MANUAL A HOSTINGER

Despues de cambios validados:

1. Claude Code commitea (sin push) — `git commit`
2. Cowork (Julio) sube los archivos modificados a Hostinger:
   - **Opcion A**: https://hpanel.hostinger.com/websites/fabricontrol.online/files/file-manager → drag-drop archivos
   - **Opcion B**: Cliente FTP (FileZilla) con credenciales Hostinger
3. Validar en `https://fabricontrol.online` que el cambio aparece (puede tardar ~5 min por cache CDN)

**Claude Code NO sube archivos a Hostinger automatico**. Es deliberado para que Julio tenga control de cada deploy.

---

## ESTRUCTURA DEL ARCHIVO `NEXT_FOR_CLAUDE_CODE.md`

```
# NEXT_FOR_CLAUDE_CODE.md

## PERMISOS PERMANENTES
[Cowork mantiene fija — NO se toca entre sesiones]
- git status/add/commit/diff (NO push)
- npm install/run/test
- Edit HTML/CSS/JS/JSON/MD
- python -m http.server (preview local)
- DENY: rm, .env, ftp/sftp/ssh, git push, curl https

## SESION ACTUAL — [tema]
[Cowork escribe la tarea]

### Contexto
### TAREA
### Estado de control (si hay deps humanas)
### REPORTAR AQUI (Claude Code escribe)

## SESION ANTERIOR — [tema vieja]
[historico]
```

---

## REGLAS PARA COWORK

1. Al iniciar sesion: leer `NEXT_FOR_CLAUDE_CODE.md` + `BUGS_PENDIENTES.md`.
2. Verificar visualmente (Chrome MCP) tras cada tarea cerrada por Claude Code.
3. Manejar dependencias humanas (assets, decisiones de diseño, deploy) con flags de control.
4. Marcar progreso al cerrar tarea: actualizar BUGS_PENDIENTES, sobreescribir SESION ACTUAL.
5. NUNCA editar `.claude/settings.json` (carpeta protegida).
6. NUNCA dar bloques a Julio para pegar a Claude Code. SIEMPRE actualizar NEXT.

---

## REGLAS PARA CLAUDE CODE

1. Al iniciar sesion: leer `NEXT_FOR_CLAUDE_CODE.md` + `WORKFLOW_OFICIAL.md` PRIMERO.
2. Confirmar contexto en 5-6 lineas antes de arrancar.
3. Reportar EN EL ARCHIVO, no solo en chat.
4. Auditoria preventiva: por cada bug en un patron, buscar el patron en otras paginas.
5. Preview local + checklist pre-deploy obligatorio antes de declarar OK.
6. NO `git push`. NO ftp. Deploy es manual de Julio via Hostinger.
7. Tras cerrar tarea, sobreescribir SESION ACTUAL en NEXT con SESION CERRADA + reporte.

---

## REGLAS PARA JULIO

**SOLO 2 frases**:
- A Claude Code: `lee`
- A Cowork: `fijate como va` / `ya termino` / `validar X` / `que falta`

**Cuando subir cambios a Hostinger**:
- Despues de validar visualmente que la tarea quedo bien
- En horario de bajo trafico si el cambio es grande
- Despues del upload, validar en fabricontrol.online (esperar ~5 min CDN cache)

---

## VENTAJAS DEL SISTEMA

| Antes (sin workflow) | Con workflow buzon |
|---------------------|--------------------|
| Pegar prompts de 50 lineas a Claude Code | "lee" |
| Pegar logs de Claude Code a Cowork | Cowork lee NEXT directo |
| Olvidar contexto entre sesiones | NEXT + WORKFLOW persistentes |
| Subir a Hostinger sin validar | Checklist pre-deploy obligatorio |
| 30 min round-trips de copy/paste | 1 min Julio + autonomia 30 min Claude |

---

## PROYECTO HERMANO — FabriOS producto

El producto principal (ERP industrial, repo `C:\Users\julit\FABRIOS`) usa el MISMO workflow.
Documentacion completa: `C:\Users\julit\fabri control\WORKFLOW_OFICIAL.md` (de FabriOS producto).

Ambos proyectos son distintos pero comparten:
- Mismo founder (Julio)
- Mismo workflow Cowork ↔ Claude Code
- Mismas reglas de oro (frases cortas, no copy/paste, archivos como buzon)
- Misma filosofia (auditoria preventiva, reportar en archivo, validacion antes de declarar OK)

Lo que NO comparten:
- Stack tecnico (FastAPI vs HTML estatico)
- Deploy (Render auto vs Hostinger manual)
- Tests (188 E2E vs visual + screenshot)
- Permisos `.claude/settings.json` (algunos comandos distintos)
