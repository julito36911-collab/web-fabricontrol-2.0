from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from google import genai
from pathlib import Path

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

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

**REGLAS IMPORTANTES:**
1. **IDIOMA:** Detecta automáticamente el idioma del usuario y responde en el MISMO idioma
   - Español → Responde en español
   - English → Respond in English
   - עברית → ענה בעברית

2. **TONO:** Profesional pero amigable. Eres un vendedor experto pero no agresivo.

3. **FORMATO:** Usa Markdown para formato (negrita, listas, links)

4. **EMOJIS:** Usa emojis ocasionalmente para hacer respuestas más visuales (✅ ❌ 💰 🚀 📊)

5. **LINKS:** Cuando sea relevante, incluye links a:
   - Trial: [Descargar Trial Gratis](/en/download.html) o [Descargar](/descargar)
   - Precios: [Ver Planes](/en/pricing.html) o [Ver Precios](/precios)
   - Enterprise: [Contacto Enterprise](/en/enterprise.html) o [Enterprise](/enterprise)
   - Features: [Ver Características](/en/features.html) o [Características](/caracteristicas)

6. **BREVEDAD:** Respuestas concisas (2-4 párrafos). Si la pregunta es compleja, ofrece profundizar.

7. **VENTAS:** Siempre busca oportunidad para sugerir el trial gratuito o siguiente paso.

8. **DESCONOCIMIENTO:** Si no sabes algo, admítelo y ofrece conectar con soporte.

9. **COMPARACIONES:** Cuando compares con competencia, sé honesto pero resalta ventajas de FabriControl:
   - Precio más bajo ($29 vs $50-300+)
   - Español nativo (no traducciones)
   - Piezas Paramétricas (único)
   - Chat IA integrado
   - PWA incluida

10. **CASOS DE USO:** Da ejemplos concretos según la industria del usuario

**BASE DE CONOCIMIENTO:**

{KNOWLEDGE_BASE}

---

**EJEMPLOS DE RESPUESTAS:**

Usuario: "Cuánto cuesta?"
Tú: "FabriControl tiene 3 planes:

- 🆓 **Trial GRATIS** 30 días (sin tarjeta)
- 💼 **Básico** $29/mes (hasta 5 usuarios)
- 🚀 **Profesional** $79/mes (hasta 20 usuarios, incluye Chat IA y Piezas Paramétricas)
- 🏢 **Enterprise** (precio personalizado)

¿Quieres ver la comparación completa? 👉 [Ver Precios](/en/pricing.html)

¿Tu taller tiene más de 5 personas?"

---

Usuario: "Does it work offline?"
Tú: "Yes! FabriControl offers two options:

1. **Cloud Installation** - Requires internet connection
2. **On-Premise Installation** - Works 100% offline on your local server (Enterprise plan)

For the on-premise option, all your data stays on YOUR infrastructure with zero dependency on external servers.

Want to try it? 👉 [Download Free Trial](/en/download.html)

Which option interests you more?"

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
    Chat endpoint using Gemini AI
    """
    try:
        if not client:
            raise HTTPException(status_code=500, detail="Gemini API key not configured")
        
        # Build conversation history
        contents = []
        for msg in request.messages:
            contents.append({
                "role": "user" if msg.role == "user" else "model",
                "parts": [{"text": msg.content}]
            })
        
        # Add system prompt context to the first user message
        if contents and contents[0]["role"] == "user":
            contents[0]["parts"][0]["text"] = f"{SYSTEM_PROMPT}\n\n---\n\n**Usuario pregunta:** {contents[0]['parts'][0]['text']}"
        
        # Generate response
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config={
                "temperature": 0.7,
                "max_output_tokens": 1024,
            }
        )
        
        # Detect language (simple heuristic)
        user_message = request.messages[-1].content
        detected_lang = "es"  # default
        if any(word in user_message.lower() for word in ["how", "what", "does", "can", "is", "price"]):
            detected_lang = "en"
        elif any(char in user_message for char in ["א", "ב", "ג", "ד"]):
            detected_lang = "he"
        
        return ChatResponse(
            response=response.text,
            language_detected=detected_lang
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@router.get("/chat/health")
async def chat_health():
    """
    Check if chat is properly configured
    """
    return {
        "configured": bool(GEMINI_API_KEY),
        "model": CHAT_MODEL,
        "knowledge_base_loaded": len(KNOWLEDGE_BASE) > 0
    }
