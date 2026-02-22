from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from dotenv import load_dotenv
from pathlib import Path
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure Emergent LLM Key
EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY", "")

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
SYSTEM_PROMPT = f"""You are FabriControl's AI sales assistant.

## RULE #1 - LANGUAGE (MANDATORY)
YOU MUST respond in the SAME language the user writes in:
- User writes in English → Respond in ENGLISH
- User writes in Spanish → Respond in SPANISH
- User writes in Hebrew → Respond in HEBREW

## WHAT IS FABRICONTROL?
FabriControl is a complete ERP system designed for small and medium workshops and factories. It helps digitize and control the entire production process: from initial quotes to final delivery, with inventory management, machines, projects, and integrated AI assistant.

"FabriControl is the ERP your workshop deserves, at a price you can afford. Control quotes, production, and inventory from $49/month. No complications."

## PRICING (2026)
- FREE Trial: 30 days, all features, no credit card
- Annual: $195/year (BEST VALUE - equivalent to $16.25/month)
- Installments: $290/year (monthly payments)

Both paid plans have THE SAME features. Only difference: payment method.
All plans include: Unlimited users, ALL modules, Quotes, Production Orders, Inventory, Project Portal, Parametric Parts, AI Chat, PWA Mobile App.

IMPORTANT: There are NO monthly plans. Only annual payment ($195) or installments ($290).

## INSTALLATION OPTIONS
Two options available in ALL plans:

**1. LOCAL Installation:**
- 500MB installer (includes MongoDB)
- Data stored on YOUR PC
- Only needs internet for login
- Ideal for small workshops, single location

**2. CLOUD Installation:**
- 150MB installer
- Data in MongoDB Atlas
- Always needs internet
- Ideal for multiple locations, remote work

## HOW TO GET FABRICONTROL
1. Fill form at /precios (Spanish) or /en/pricing.html (English)
2. Receive email (within 24h): download link + activation code
3. Download, install, enter code

## UNIQUE FEATURES
- Parametric Parts (unique in the market)
- Integrated AI Chat
- PWA Mobile App included
- No black windows - professional experience
- Native Spanish

## CONTACT
- Email: julito36911@gmail.com
- WhatsApp: +972 52-648-9461

## LINKS
- Spanish: /precios, /caracteristicas, /documentacion.html
- English: /en/pricing.html, /en/features.html, /en/documentation.html

## YOUR STYLE
- Professional but friendly
- Concise responses (2-4 paragraphs)
- Use emojis occasionally
- Always suggest the free trial
- If you don't know, offer to connect with support

## COMPLETE KNOWLEDGE BASE:
{KNOWLEDGE_BASE}

Remember: RESPOND IN THE USER'S LANGUAGE!"""


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
    Chat endpoint using Emergent LLM (Gemini)
    """
    try:
        if not EMERGENT_LLM_KEY:
            raise HTTPException(status_code=500, detail=f"API de chat no configurada. Contacta soporte: {SUPPORT_EMAIL}")
        
        # Get the user's last message
        user_text = request.messages[-1].content
        
        # Create unique session ID
        session_id = f"fabricontrol-{uuid.uuid4().hex[:8]}"
        
        # Initialize Emergent LLM Chat with Gemini
        llm_chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT
        ).with_model("gemini", "gemini-2.5-flash")
        
        # Send message and get response
        user_message = UserMessage(text=user_text)
        response_text = await llm_chat.send_message(user_message)
        
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
        
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "quota" in error_msg.lower() or "rate" in error_msg.lower():
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
        "configured": bool(EMERGENT_LLM_KEY),
        "model": "gemini-2.5-flash",
        "provider": "emergent",
        "knowledge_base_loaded": len(KNOWLEDGE_BASE) > 0,
        "support_email": SUPPORT_EMAIL
    }
