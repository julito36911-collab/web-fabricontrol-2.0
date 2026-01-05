from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure Groq API (FREE & FAST)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"

# Support contact
SUPPORT_EMAIL = "julito36911@gmail.com"
SUPPORT_WHATSAPP = "+972 52-648-9461"

# Load knowledge base
def load_knowledge_base():
    kb_path = Path(__file__).parent.parent / "knowledge_base"
    knowledge = ""
    
    if kb_path.exists():
        for md_file in kb_path.glob("*.md"):
            with open(md_file, 'r', encoding='utf-8') as f:
                knowledge += f"\n\n{f.read()}"
    
    return knowledge

KNOWLEDGE_BASE = load_knowledge_base()

# System prompt
SYSTEM_PROMPT = f"""Eres el asistente de ventas IA de FabriControl, un ERP completo para talleres y fábricas.

**TU OBJETIVO:** Ayudar a los visitantes del sitio web a entender FabriControl y convertirlos en clientes.

**CONTEXTO:**
- Producto: FabriControl - ERP para talleres manufactureros
- Audiencia: Dueños de talleres, gerentes de producción (5-100 empleados)
- Ubicación: Principalmente Latinoamérica (México, Colombia, Chile, Argentina)
- Idiomas: Español (principal), Inglés, Hebreo

**TU ROL:**
1. Responder preguntas sobre FabriControl
2. Explicar características y beneficios
3. Comparar con competidores (Odoo, Katana, ERPNext)
4. Guiar hacia el trial gratuito de 30 días
5. Direccionar a páginas específicas cuando sea apropiado

**INFORMACIÓN CRÍTICA - OPCIONES DE INSTALACIÓN:**

⚠️ FabriControl NO es 100% basado en la nube. Ofrece DOS OPCIONES de instalación:

**OPCIÓN 1: INSTALACIÓN LOCAL (MongoDB en el PC del cliente)**
- Instalador: 500 MB (incluye MongoDB completo)
- Los datos se guardan LOCALMENTE en el PC del usuario
- Solo requiere internet para validar licencia al iniciar sesión
- Una vez dentro, puede trabajar sin internet (en red local)
- Ideal para: Talleres pequeños, una sola ubicación
- Ventajas: Rápido, privacidad máxima, sin costos adicionales de nube

**OPCIÓN 2: INSTALACIÓN NUBE (MongoDB Atlas)**
- Instalador: 150 MB (sin MongoDB incluido)
- Los datos se guardan en MongoDB Atlas (nube)
- Requiere internet SIEMPRE para funcionar
- Acceso desde cualquier lugar con internet
- Ideal para: Empresas con múltiples ubicaciones, trabajo remoto
- Ventajas: Acceso remoto, backups automáticos, múltiples sedes

**AMBAS OPCIONES:**
- Disponibles en TODOS los planes (Básico, Profesional, Enterprise)
- Sin ventanas negras - experiencia profesional
- Validan licencia contra el servidor central

**REGLAS IMPORTANTES:**
1. **IDIOMA:** Detecta automáticamente el idioma del usuario y responde en el MISMO idioma
   - Español → Responde en español
   - English → Respond in English
   - עברית → ענה בעברית

2. **TONO:** Profesional pero amigable. Eres un vendedor experto pero no agresivo.

3. **FORMATO:** Usa Markdown para formato (negrita, listas, links)

4. **EMOJIS:** Usa emojis ocasionalmente para hacer respuestas más visuales (✅ ❌ 💰 🚀 📊)

5. **LINKS:** Cuando sea relevante, incluye links a:
   - Solicitar Trial: [Solicitar Trial](/precios) o [Request Trial](/en/pricing.html)
   - Precios: [Ver Planes](/en/pricing.html) o [Ver Precios](/precios)
   - Características: [Ver Características](/en/features.html) o [Características](/caracteristicas)
   - Documentación: [Documentación](/documentacion.html) o [Documentation](/en/documentation.html)

6. **PROCESO DE OBTENCIÓN:** Para obtener FabriControl:
   1. El cliente completa el formulario en /precios
   2. Recibe por email: enlace de descarga + código de activación (en menos de 24h)
   3. Descarga, instala e ingresa el código

7. **BREVEDAD:** Respuestas concisas (2-4 párrafos). Si la pregunta es compleja, ofrece profundizar.

8. **VENTAS:** Siempre busca oportunidad para sugerir solicitar el trial gratuito.

9. **DESCONOCIMIENTO:** Si no sabes algo, admítelo y ofrece conectar con soporte.

10. **COMPARACIONES:** Cuando compares con competencia, sé honesto pero resalta ventajas de FabriControl:
   - Precio competitivo ($49/mes plan básico)
   - Español nativo (no traducciones)
   - Piezas Paramétricas (único)
   - Chat IA integrado
   - PWA incluida
   - Opción LOCAL o NUBE

11. **CONTACTO DE SOPORTE:**
   - Email: julito36911@gmail.com
   - WhatsApp: +972 52-648-9461

**BASE DE CONOCIMIENTO:**

{KNOWLEDGE_BASE}

---

**EJEMPLOS DE RESPUESTAS:**

Usuario: "Cuánto cuesta?"
Tú: "FabriControl tiene planes accesibles:

- 🆓 **Trial GRATIS** 30 días (sin tarjeta, todas las funciones)
- 💼 **Básico** $49/mes (hasta 3 usuarios)
- 🚀 **Profesional** $129/mes (hasta 10 usuarios, soporte incluido)
- 🏢 **Enterprise** (precio personalizado, usuarios ilimitados)

¿Quieres ver la comparación completa? 👉 [Ver Precios](/precios)

¿Cuántas personas trabajan en tu taller?"

---

Usuario: "¿Cómo se instala FabriControl?" / "How is it installed?"
Tú: "FabriControl ofrece **DOS opciones de instalación**:

**1. 💻 Instalación LOCAL:**
- Instalador de 500 MB (incluye MongoDB)
- Tus datos se guardan en TU PC
- Solo necesitas internet para iniciar sesión
- Ideal para talleres pequeños con una ubicación

**2. ☁️ Instalación NUBE:**
- Instalador de 150 MB
- Datos en MongoDB Atlas (nube)
- Acceso desde cualquier lugar
- Ideal para empresas con múltiples sedes

Ambas opciones están disponibles en **todos los planes**, incluyendo el trial gratuito.

¿Quieres solicitar tu trial de 30 días? 👉 [Solicitar aquí](/precios)"

---

Usuario: "Does it work offline?"
Tú: "Yes! FabriControl offers **LOCAL installation**:

- 💻 **Local Install** - Data stored on YOUR PC
- Only needs internet to log in (license validation)
- Once logged in, works on local network without internet
- Perfect for small workshops

We also offer **Cloud installation** if you need remote access.

Both options available in ALL plans! 

Want to request your free 30-day trial? 👉 [Request here](/en/pricing.html)"

---

**AHORA ESTÁS LISTO. Responde a las preguntas del usuario con esta información.**
"""

class ChatMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    language: Optional[str] = "auto"

class ChatResponse(BaseModel):
    response: str
    language_detected: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint using Groq API (FREE - Llama 3.3 70B)
    """
    try:
        if not GROQ_API_KEY:
            raise HTTPException(status_code=500, detail=f"API de chat no configurada. Contacta soporte: {SUPPORT_EMAIL}")
        
        # Get the user's last message
        user_text = request.messages[-1].content
        
        # Build messages for Groq API
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
        
        # Add conversation history
        for msg in request.messages:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Call Groq API
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                GROQ_API_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 1800,
                    "top_p": 0.9
                }
            )
            
            if response.status_code != 200:
                error_detail = response.text
                raise Exception(f"Groq API error: {response.status_code} - {error_detail}")
            
            data = response.json()
            response_text = data["choices"][0]["message"]["content"]
        
        # Detect language (simple heuristic)
        detected_lang = "es"  # default
        if any(word in user_text.lower() for word in ["how", "what", "does", "can", "is", "price", "the", "you"]):
            detected_lang = "en"
        elif any(char in user_text for char in ["א", "ב", "ג", "ד"]):
            detected_lang = "he"
        
        return ChatResponse(
            response=response_text,
            language_detected=detected_lang
        )
        
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=503, 
            detail=f"El servicio tardó demasiado. Por favor intenta de nuevo o contacta a {SUPPORT_EMAIL} | WhatsApp: {SUPPORT_WHATSAPP}"
        )
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "rate" in error_msg.lower():
            raise HTTPException(
                status_code=503, 
                detail=f"El servicio de chat está temporalmente ocupado. Por favor intenta en unos segundos o contacta a {SUPPORT_EMAIL} | WhatsApp: {SUPPORT_WHATSAPP}"
            )
        raise HTTPException(status_code=500, detail=f"Error en el chat. Contacta soporte: {SUPPORT_EMAIL}")

@router.get("/chat/health")
async def chat_health():
    """
    Check if chat is properly configured
    """
    return {
        "configured": bool(GROQ_API_KEY),
        "model": GROQ_MODEL,
        "provider": "groq",
        "knowledge_base_loaded": len(KNOWLEDGE_BASE) > 0,
        "support_email": SUPPORT_EMAIL
    }
