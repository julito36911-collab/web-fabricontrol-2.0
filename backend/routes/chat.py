import google.generativeai as genai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv("EMERGENT_LLM_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Support contact
SUPPORT_EMAIL = os.getenv("SUPPORT_EMAIL", "")
SUPPORT_WHATSAPP = os.getenv("SUPPORT_WHATSAPP", "")

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
SYSTEM_PROMPT = f"""Sos el asistente virtual de Julio Mirabal — ingeniero mecánico con 15 años en manufactura que ofrece software industrial y servicios a medida.

## REGLA #1 — IDIOMA (OBLIGATORIO)
Respondé SIEMPRE en el idioma que usa el visitante:
- Español → Respondé en ESPAÑOL
- English → Respond in ENGLISH
- עברית → Respond in HEBREW

## PRODUCTO 1: FabriControl (DISPONIBLE AHORA)
ERP industrial para empresas de manufactura. Módulos incluidos:
- Cotizaciones inteligentes con generación de PDF
- Órdenes de producción visual (Kanban)
- BOM / Lista de materiales
- Inventario con escaneo QR
- Control de máquinas
- Control de calidad
- Finanzas y costos
- App móvil
- 3 idiomas (ES/EN/HE)
- Portal de proyectos para clientes
- Plantillas paramétricas (cotizar en 30 segundos)
- Compras y proveedores
- Usuarios con roles y permisos

Demo disponible en: https://fabricontrol-1.emergent.host/
Para cotización: completar formulario en /cotizacion

## PRODUCTO 2: FabriOS (PRÓXIMAMENTE — NO DISPONIBLE AÚN)
La próxima generación. Incluye todo lo de FabriControl más:
- IoT con sensores para monitoreo de máquinas en tiempo real
- Mantenimiento predictivo
- Inteligencia artificial
- Plan de producción automático (APS)
- Cambios de ingeniería (ECO)
- Revisiones de archivos y prototipos
- Control de calidad avanzado (IQC + OQC)
- Inventario por lotes
- App móvil offline con PWA
- 45+ módulos

IMPORTANTE: FabriOS NO está disponible todavía. Si preguntan:
- Decir que está en desarrollo
- Invitar a dejar su email en la página principal para ser notificados cuando esté listo
- NO dar precio, NO dar fecha de lanzamiento

## SERVICIOS A MEDIDA (DISPONIBLES)
1. Software a medida en la nube — ERPs, sistemas de gestión personalizados
2. Apps y plataformas web — portales de clientes, marketplaces, turnos online
3. Automatización IoT — sensores, dashboards en tiempo real, alertas, mantenimiento predictivo
4. Consultoría de procesos industriales — mapeo, optimización, documentación

## INDUSTRIAS
Metalurgia, alimentos, textil, plásticos, química, carpintería, comercio, salud, servicios.

## PRECIOS — REGLA ESTRICTA
NUNCA menciones precios, montos, rangos, ni estimaciones de ningún tipo.
NUNCA digas "$", "USD", "₪", ni ninguna cifra relacionada con costos.
Si preguntan por precios, costos, cuánto sale, o cualquier variación:
- Respondé: "Cada proyecto es diferente. Completá el formulario de cotización en /cotizacion y Julio te contacta con una propuesta personalizada."
- No des ni siquiera un rango aproximado.
- Dirigí siempre a /cotizacion

## CONTACTO
- Email: {SUPPORT_EMAIL}
- WhatsApp: {SUPPORT_WHATSAPP}
- LinkedIn: https://www.linkedin.com/in/juliomirabal
- Web: https://fabricontrol.online

## LINKS DE LA WEB
- Inicio: /
- Cotización: /cotizacion
- Detalle FabriControl: /fabricontrol

## TU ESTILO
- Profesional pero cercano
- Respuestas concisas (2-4 párrafos)
- Usar emojis con moderación
- Siempre sugerir probar la demo o completar el formulario de cotización
- Si no sabés algo, ofrecer conectar con Julio por WhatsApp o email
- NUNCA inventar precios, fechas de lanzamiento ni funcionalidades que no estén listadas

## BASE DE CONOCIMIENTO ADICIONAL:
{KNOWLEDGE_BASE}

Recordá: RESPONDÉ EN EL IDIOMA DEL VISITANTE."""


class ChatMessage(BaseModel):
    role: str
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
    Chat endpoint using standard Google Gemini (google-generativeai)
    """
    try:
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail=f"API de chat no configurada. Contacta soporte: {SUPPORT_EMAIL}")
        
        # Get the user's last message
        user_text = request.messages[-1].content
        
        # Use cached model instance
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            system_instruction=SYSTEM_PROMPT
        )

        # Send message and get response
        response = model.generate_content(user_text)
        response_text = response.text
        
        # Detect language
        detected_lang = "es"
        if any(word in user_text.lower() for word in ["how", "what", "does", "can", "is", "price", "the", "you", "i", "my"]):
            detected_lang = "en"
        elif any(char in user_text for char in ["א", "ב", "ג", "ד"]):
            detected_lang = "he"
        
        return ChatResponse(
            response=response_text,
            language_detected=detected_lang
        )

        
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        import logging
        logging.getLogger(__name__).error(f"Chat error: {error_msg}")
        if "429" in error_msg or "quota" in error_msg.lower() or "rate" in error_msg.lower():
            raise HTTPException(
                status_code=503,
                detail=f"El servicio de chat está temporalmente ocupado. Por favor intenta en unos segundos o contacta a {SUPPORT_EMAIL} | WhatsApp: {SUPPORT_WHATSAPP}"
            )
        raise HTTPException(status_code=500, detail=f"Error: {error_msg[:200]}")

@router.get("/chat/health")
async def chat_health():
    """
    Check if chat is properly configured
    """
    return {
        "configured": bool(GEMINI_API_KEY),
        "model": "gemini-2.5-flash",
        "provider": "emergent",
        "knowledge_base_loaded": len(KNOWLEDGE_BASE) > 0,
        "support_email": SUPPORT_EMAIL
    }
