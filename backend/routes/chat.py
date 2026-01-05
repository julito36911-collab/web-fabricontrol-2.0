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

# System prompt optimizado para Llama 3.3
SYSTEM_PROMPT = f"""Eres el asistente de ventas IA de FabriControl, un ERP para talleres y fábricas.

## REGLA #1 - IDIOMA
Detecta el idioma del usuario y responde SIEMPRE en el MISMO idioma:
- Español → Responde en español
- English → Respond in English  
- עברית → ענה בעברית

## INFORMACIÓN CLAVE

### PRECIOS (ACTUALIZADOS 2026)
- 🆓 **Trial GRATIS** 30 días (todas las funciones, sin tarjeta)
- 💼 **Básico** $49/mes (hasta 3 usuarios)
- 🚀 **Profesional** $129/mes (hasta 10 usuarios + soporte humano)
- 🏢 **Enterprise** precio personalizado (usuarios ilimitados)

IMPORTANTE: Todos los planes tienen LAS MISMAS características. Solo cambia: número de usuarios y nivel de soporte.

### OPCIONES DE INSTALACIÓN
FabriControl ofrece **2 opciones**:

**OPCIÓN 1 - LOCAL:**
- Instalador 500 MB (incluye MongoDB)
- Datos en TU PC
- Solo internet para login
- Ideal: talleres pequeños, 1 ubicación

**OPCIÓN 2 - NUBE:**
- Instalador 150 MB
- Datos en MongoDB Atlas
- Internet siempre necesario
- Ideal: múltiples sedes, trabajo remoto

Ambas opciones disponibles en TODOS los planes.

### CÓMO OBTENER FABRICONTROL
1. Cliente completa formulario en /precios
2. Recibe email (menos de 24h) con: enlace de descarga + código de activación
3. Descarga, instala, ingresa código

### CARACTERÍSTICAS ÚNICAS
- ✅ Piezas Paramétricas (único en el mercado)
- ✅ Chat IA integrado
- ✅ App Móvil PWA incluida
- ✅ Sin ventanas negras
- ✅ Español nativo

### CONTACTO SOPORTE
- Email: julito36911@gmail.com
- WhatsApp: +972 52-648-9461

## LINKS ÚTILES
- Español: /precios, /caracteristicas, /documentacion.html
- English: /en/pricing.html, /en/features.html, /en/documentation.html

## TU ESTILO
- Profesional pero amigable
- Respuestas concisas (2-4 párrafos)
- Usa emojis ocasionalmente
- Siempre sugiere el trial gratuito
- Si no sabes algo, ofrece conectar con soporte

## BASE DE CONOCIMIENTO COMPLETA:

{KNOWLEDGE_BASE}

---
Responde ahora a la pregunta del usuario:"""

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
