# FabriControl - Base de Conocimiento Completa

## ¿Qué es FabriControl?

FabriControl es un sistema ERP integral diseñado específicamente para talleres y fábricas pequeñas y medianas que necesitan digitalizar y controlar todo su proceso productivo: desde la cotización inicial hasta la entrega final, con gestión de inventario, máquinas, proyectos y asistente de IA incluido.

### Elevator Pitch
"FabriControl es el ERP que tu taller merece, al precio que puedes pagar. Controla cotizaciones, producción e inventario desde $29/mes. Sin complicaciones."

---

## Planes y Precios

### 🆓 PLAN TRIAL (Gratis 30 días)
- **Duración:** 30 días completos
- **Usuarios:** Ilimitados durante el trial
- **Módulos:** TODOS los módulos completos
- **Límites:** Ninguno durante 30 días
- **Requiere tarjeta:** NO
- **Cómo obtenerlo:** Descarga desde www.fabricontrol.com/download

### 💼 PLAN BÁSICO ($29/mes o $23/mes anual)
- **Usuarios:** Hasta 5 usuarios
- **Módulos incluidos:**
  - ✅ Cotizaciones
  - ✅ Órdenes de Producción
  - ✅ Inventario
  - ✅ Dashboard
  - ✅ Máquinas
  - ✅ BOM
  - ✅ Compras
  - ✅ App Móvil PWA
- **Límites:**
  - 100 órdenes/mes
  - 500 items en inventario
  - 50 cotizaciones/mes
- **Soporte:** Email (respuesta 48h)
- **Actualizaciones:** ✅ Incluidas

### 🚀 PLAN PROFESIONAL ($79/mes o $63/mes anual) ⭐ MÁS POPULAR
- **Usuarios:** Hasta 20 usuarios
- **TODO del Plan Básico +**
  - ✅ Portal de Proyectos
  - ✅ Piezas Paramétricas (ÚNICO)
  - ✅ Chat IA (requiere API Key propia)
  - ✅ Permisos granulares
  - ✅ Estados de producción personalizables
- **Límites superiores:**
  - 500 órdenes/mes
  - 2,000 items en inventario
  - 200 cotizaciones/mes
  - Proyectos ilimitados
- **Premium:**
  - Generación de etiquetas QR
  - Historial completo
  - Exportación a Excel
  - API disponible
- **Soporte:** WhatsApp + Email (respuesta 24h)

### 🏢 PLAN ENTERPRISE (Precio personalizado)
- **Usuarios:** Ilimitados
- **Personalización:** ✅ Campos y flujos personalizados
- **Instalación:** On-premise o cloud
- **Integración:** Con sistemas existentes (ERP, contabilidad, facturación)
- **SLA:** 99.5% uptime garantizado
- **Capacitación:** 10 horas de capacitación remota incluidas
- **Soporte:** Gerente de cuenta dedicado
- **Contacto:** Solicita cotización en www.fabricontrol.com/enterprise

---

## Módulos Principales

### 📄 Módulo de Cotizaciones

**¿Qué hace?**
Genera presupuestos profesionales para clientes con cálculo automático de costos.

**Características:**
- Calculadora de materiales integrada
- Selección de máquinas con costo/hora
- Conversión directa a Orden de Producción con un clic
- Estados: Borrador → Enviada → Aprobada → Convertida
- PDF profesional para enviar al cliente

**Cómo crear una cotización:**
1. Ve a Cotizaciones > Nueva Cotización
2. Selecciona o crea un cliente (Nombre, Email, Teléfono)
3. Agrega items con descripción, cantidad, material, dimensiones
4. El sistema calcula automáticamente:
   - Costo de material (precio/kg × dimensiones)
   - Mano de obra (tiempo × tarifa/hora)
   - Costos de máquinas
   - Margen de ganancia (default 30%)
5. Guarda y genera PDF
6. Si el cliente acepta, convierte a Orden con un clic

**Beneficio:** Cotiza en minutos sin errores y convierte a producción inmediatamente.

---

### 🏭 Módulo de Órdenes de Producción

**¿Qué hace?**
Gestiona el flujo completo de fabricación desde la creación hasta la entrega.

**Características:**
- Estados de producción 100% configurables
- Asignación de piezas a máquinas específicas
- Vista de carga de trabajo por máquina
- Seguimiento de piezas compradas externamente
- Historial completo de cambios
- Archivos adjuntos (planos PDF, DXF, G-Code)

**Estados por defecto (configurables):**
1. Cotización
2. En Diseño
3. Diseño Aprobado
4. Esperando Materiales
5. Lista para Producción
6. En Corte / Doblado / Soldadura / Pintura
7. En Ensamblaje
8. En Almacén
9. Enviada / Entregada

**Cómo rastrear una orden:**
1. En Dashboard, busca el número de orden
2. Abre la orden para ver estado actual
3. Verifica progreso (% completado)
4. Revisa fecha de compromiso y días restantes
5. Actualiza estado según avance

---

### 📦 Módulo de Inventario

**¿Qué controla?**
- Materias primas (láminas, perfiles, tubos)
- Tornillería y consumibles
- Componentes electrónicos
- Herramientas
- Productos terminados

**Características:**
- Código automático por grupo: A-001, A-002, B-001...
- Alertas de stock mínimo configurables
- Indicadores visuales naranja/rojo en Dashboard
- Historial de movimientos (entradas/salidas)
- Vinculación con órdenes de producción
- Valorización de inventario
- Generación de etiquetas QR
- Escaneo rápido con cámara del celular

**Cómo configurar alertas:**
1. Ve a Inventario > [Selecciona item]
2. Configura "Stock Mínimo" (ej: 20kg)
3. Cuando stock < mínimo, aparece alerta en Dashboard
4. Crea orden de compra antes de quedarte sin material

---

### 🧩 Piezas Paramétricas (ÚNICO EN EL MERCADO)

**¿Qué hace?**
Crea plantillas de piezas con variables configurables que generan códigos automáticos.

**Ejemplo:**
Plantilla: `PANEL-{L}x{A}-{MAT}`
Variables: L (Largo), A (Ancho), MAT (Material)
Resultado: `PANEL-100x50-2mm` se genera automáticamente

**Cómo usar:**
1. Ve a Piezas Paramétricas > Nueva Plantilla
2. Define nombre: "Tubo Rectangular"
3. Código base: `TUB-{L}x{A}-CAL{C}`
4. Variables: L (Largo), A (Ancho), C (Calibre)
5. Guarda plantilla
6. Al crear orden, selecciona "Usar Paramétrica"
7. Llena valores (L=2000, A=100, C=16)
8. Sistema genera código automáticamente

**Beneficio:** Elimina errores en productos repetitivos con variaciones.

---

### 📋 Portal de Proyectos

**¿Qué hace?**
Gestión colaborativa de proyectos con tareas, comentarios y archivos.

**Características:**
- Crear proyectos con director asignado
- Tareas con responsables
- Comentarios con historial
- Subir archivos por proyecto y tarea
- Panel de actividad global en tiempo real
- Archivar proyectos completados

**Estados de tareas:**
- Pendiente
- En Proceso
- Completada

**Disponible en:** Plan Profesional y Enterprise

---

### 🤖 Chat IA / Asistente Inteligente

**¿Qué hace?**
Asistente inteligente que responde preguntas sobre FabriControl 24/7.

**Características:**
- Responde en español, inglés o hebreo
- Conoce toda la documentación del sistema
- Guía paso a paso en procesos
- Explica funcionalidades
- Sugiere mejores prácticas

**Tecnología:** Google Gemini 2.0 Flash

**Cómo activarlo:**
1. Obtén API Key gratis en ai.google.dev
2. Ve a Configuración > Chat IA
3. Ingresa tu API Key
4. Selecciona modelo (Gemini 1.5 Flash recomendado)
5. Activa el chat
6. Todo tu equipo puede usarlo

**Disponible en:** Plan Profesional y Enterprise

---

### 📱 App Móvil (PWA)

**¿Qué es?**
Progressive Web App para operarios de piso.

**Características:**
- Funciona en iOS y Android
- No requiere descarga de App Store
- Botones grandes para uso en planta
- Escaneo QR integrado
- Actualizar estados de órdenes
- Ver órdenes asignadas

**Acceso:** www.fabricontrol.com/m/login

**Disponible en:** Todos los planes

---

## Comparación vs Competencia

| Característica | FabriControl | Odoo | Katana | ERPNext |
|----------------|--------------|------|--------|----------|
| **Precio/mes** | $29-99 | $50-300+ | $99-799 | $10-25 |
| **Idioma** | Español nativo | Traducido | EN only | Traducido |
| **Aprendizaje** | 2-3 días | 2-4 semanas | 1 semana | 2-3 semanas |
| **Instalación local** | ✅ Sí | ❌ No | ❌ No | ⚠️ Difícil |
| **Piezas Paramétricas** | ✅ Incluido | ❌ No | ❌ No | ❌ No |
| **Chat IA** | ✅ Gemini | ❌ No | ❌ No | ❌ No |
| **App móvil** | ✅ Incluida | 💰 Extra | 💰 Extra | ❌ No |
| **Soporte ES** | ✅ WhatsApp | 📧 Email EN | 📧 Email EN | 📧 Email EN |

**Por qué FabriControl es mejor:**
1. 💰 **Precio accesible** para PYMES latinas
2. 🇲🇽 **Hecho para Latinoamérica** - español nativo
3. 🧩 **Piezas Paramétricas** - único en el mercado
4. 🤖 **Chat IA** que conoce el sistema
5. 📱 **PWA incluida** sin costo extra

---

## Casos de Uso Reales

### Taller de Estructuras Metálicas

**Situación:**
Taller con 15 empleados que cotiza 30 proyectos/mes. Problemas con costos reales y tiempo perdido en Excel.

**Cómo usa FabriControl:**
- Cotizaciones con costos automáticos
- Conversión a orden con un clic
- Dashboard muestra órdenes atrasadas

**Resultado:**
- Cotiza 50% más rápido
- Conoce margen real por proyecto
- Entregas atrasadas reducidas 40%

---

### Fábrica de Muebles

**Situación:**
Carpintería con 50 productos base. Cada pedido requiere medidas diferentes y se confunden códigos.

**Cómo usa FabriControl:**
- Piezas Paramétricas con variables (largo, ancho, madera)
- Generación automática de códigos únicos

**Resultado:**
- Errores de fabricación eliminados
- Tiempo de diseño: de 2 horas a 15 minutos

---

### Taller de Inyección Plástico

**Situación:**
8 máquinas inyectoras. No sabe cuáles están saturadas. Inventario de resinas se queda corto.

**Cómo usa FabriControl:**
- Máquinas registradas con costos/hora
- Asignación de piezas a máquinas en BOM
- Alertas de stock mínimo para resinas

**Resultado:**
- Dashboard muestra carga de máquinas
- Alertas evitaron 3 paros de producción

---

## Requisitos Técnicos

### Para instalación local:
- **OS:** Windows 10/11, macOS 10.15+, Linux Ubuntu 20.04+
- **RAM:** 4 GB mínimo (8 GB recomendado)
- **Disco:** 500 MB + espacio para base de datos
- **Procesador:** Intel Core i3 o equivalente
- **Resolución:** 1366x768 mínimo (1920x1080 recomendado)
- **Navegador:** Chrome, Firefox, Edge, Safari (últimas 2 versiones)

### Conectividad:
- **Cloud:** Requiere internet permanente
- **Local:** Funciona sin internet una vez instalado
- **PWA:** Cachea datos para consulta offline

---

## Preguntas Frecuentes

**¿Necesito instalar algo?**
Puedes usar FabriControl en la nube o instalarlo localmente. La instalación local te da control total de tus datos.

**¿Mis datos están seguros?**
Sí. Contraseñas encriptadas (bcrypt), sesiones JWT, y opción de instalación on-premise donde TÚ controlas los datos.

**¿Funciona en celular?**
Sí, incluye PWA (Progressive Web App) que funciona como app nativa en iOS y Android.

**¿Puedo migrar desde Excel?**
Sí. Planes Profesional y Enterprise incluyen asistencia para migración.

**¿Qué pasa si falla internet?**
La app cachea datos recientes para consulta. Los cambios se sincronizan al reconectar.

**¿Puedo personalizar estados?**
Sí, los estados de producción son 100% configurables.

**¿El Chat IA tiene costo extra?**
No, solo necesitas tu API Key gratuita de Google Gemini.

**¿Puedo usarlo sin internet?**
Sí, con instalación local (on-premise) en plan Enterprise.

**¿Cuántos usuarios?**
- Básico: 5 usuarios
- Profesional: 20 usuarios
- Enterprise: Ilimitados

**¿Ofrecen capacitación?**
Sí. Videos YouTube gratuitos, y capacitación en vivo para planes Profesional/Enterprise.

---

## Soporte

**Plan Básico:**
- 📧 Email (48h)
- 📖 Base de conocimiento
- 🎥 Videos tutoriales

**Plan Profesional:**
- 📱 WhatsApp (24h)
- 📧 Email prioritario
- 🤖 Chat IA integrado
- 💻 2 capacitaciones/mes

**Plan Enterprise:**
- 👤 Gerente dedicado
- 📞 Soporte telefónico
- 🎓 Capacitación presencial
- 🔧 Implementación guiada

---

## Contacto y Links

- **Sitio web:** www.fabricontrol.com
- **Descarga:** www.fabricontrol.com/download
- **Precios:** www.fabricontrol.com/pricing
- **Enterprise:** www.fabricontrol.com/enterprise
- **Soporte:** support@fabricontrol.com

---

## Idiomas Soportados

- ✅ Español (principal)
- ✅ Inglés (completo)
- ✅ Hebreo (completo)

---

## Términos Técnicos Comunes

**Español → Inglés:**
- Cotización / Presupuesto → Quote / Quotation
- Orden → Order / Job
- Pieza → Part / Component
- Inventario → Inventory / Stock
- Máquina → Machine / Equipment
- Taller → Workshop / Shop
- Fabricación → Manufacturing / Production
- BOM → Bill of Materials
- Dashboard → Panel de Control

---

*Última actualización: Enero 2026*
*FabriControl - El ERP para talleres*