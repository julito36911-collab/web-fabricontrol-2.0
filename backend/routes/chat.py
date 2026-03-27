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
SYSTEM_PROMPT = f"""You are FabriControl's AI sales assistant.

## RULE #1 - LANGUAGE (MANDATORY)
YOU MUST respond in the SAME language the user writes in:
- User writes in English → Respond in ENGLISH
- User writes in Spanish → Respond in SPANISH
- User writes in Hebrew → Respond in HEBREW

## WHAT IS FABRICONTROL?
FabriControl is a 100% cloud-based ERP system (SaaS) designed for small and medium workshops and factories. NO downloads, NO installations. Access from any browser with internet.

"FabriControl is the ERP your workshop deserves, at a price you can afford. Control quotes, production, and inventory from $195/year. No complications. 100% cloud."

## HOW IT WORKS (100% CLOUD/SaaS)
- NO installation required. Works in any web browser.
- Access from PC, tablet, or mobile anywhere with internet.
- Automatic updates and daily backups included.
- Steps to start: 1) Fill the trial form → 2) Receive activation code by email (< 24h) → 3) Create account at the link → 4) Start working

## PRICING (2025-2026)
- FREE Trial: 30 days, all features, no credit card
- Annual: $195/year (BEST VALUE - equivalent to $16.25/month, save $95)
- Installments: $290/year (monthly payments, same features)
- Enterprise: Custom quote

Both paid plans have THE SAME features. Only difference: payment method.
All plans include: Unlimited users, ALL modules, Quotes, Production Orders, Inventory, Project Portal, Parametric Parts, AI Chat, PWA Mobile App.

IMPORTANT: There are NO monthly plans. Only annual payment ($195) or installments ($290).

## PAYMENT
- Payment link: https://pay.hotmart.com/L103719113Q
- Prices in USD. International payments accepted.

## UNIQUE FEATURES
- Parametric Parts (unique in the market): reusable product templates, quote in 30 seconds
- Integrated AI Chat (Gemini)
- PWA Mobile App included (no install needed on phone either)
- Multi-language: Spanish, English, Hebrew
- Client Project Portal: clients see their order progress in real time

## CONTACT
- Email: {SUPPORT_EMAIL}
- WhatsApp: {SUPPORT_WHATSAPP}

## LINKS
- Spanish: /precios, /caracteristicas, /documentacion.html
- English: /en/pricing.html, /en/features.html, /en/documentation.html
- Hebrew: /he/

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
    Chat endpoint using standard Google Gemini (google-generativeai)
    """
    try:
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail=f"API de chat no configurada. Contacta soporte: {SUPPORT_EMAIL}")
        
        # Get the user's last message
        user_text = request.messages[-1].content
        
        # Initialize Gemini model
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        
        # Send message and get response
        chat = model.start_chat(history=[]) # Could add history if needed
        response = chat.send_message(user_text)
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
        "configured": bool(GEMINI_API_KEY),
        "model": "gemini-2.5-flash",
        "provider": "emergent",
        "knowledge_base_loaded": len(KNOWLEDGE_BASE) > 0,
        "support_email": SUPPORT_EMAIL
    }
