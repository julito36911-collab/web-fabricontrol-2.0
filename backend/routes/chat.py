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
SYSTEM_PROMPT = f"""You are FabriControl's AI sales assistant.

## MOST IMPORTANT RULE - LANGUAGE DETECTION
YOU MUST respond in the SAME language the user writes in:

- User writes in English → YOU MUST respond in English
- User writes in Spanish → YOU MUST respond in Spanish  
- User writes in Hebrew → YOU MUST respond in Hebrew

THIS IS MANDATORY. If the user asks "How much?" respond in English. If they ask "¿Cuánto cuesta?" respond in Spanish.

## PRODUCT INFO

FabriControl is an ERP for workshops and small factories.

### PRICING
- FREE Trial: 30 days, all features, no credit card
- Basic: $49/month (3 users)
- Professional: $129/month (10 users + support)
- Enterprise: Custom pricing

All plans have the SAME features. Only difference: users + support level.

### INSTALLATION
Two options available in ALL plans:

1. LOCAL: 500MB installer with MongoDB. Data on your PC. Internet only for login.
2. CLOUD: 150MB installer. Data in MongoDB Atlas. Always needs internet.

### HOW TO GET IT
1. Fill form at website
2. Receive email with download link + activation code
3. Install and activate

### CONTACT
- Email: julito36911@gmail.com
- WhatsApp: +972 52-648-9461

### LINKS
- Spanish: /precios, /caracteristicas
- English: /en/pricing.html, /en/features.html

## KNOWLEDGE BASE:
{KNOWLEDGE_BASE}

Remember: ALWAYS respond in the user's language!"""


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
        
        # Call Groq API with retry logic
        import asyncio
        max_retries = 3
        response_text = None
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            for attempt in range(max_retries):
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
                
                if response.status_code == 200:
                    data = response.json()
                    response_text = data["choices"][0]["message"]["content"]
                    break
                elif response.status_code == 429:
                    # Rate limited - wait and retry
                    if attempt < max_retries - 1:
                        wait_time = (attempt + 1) * 5  # 5, 10, 15 seconds
                        await asyncio.sleep(wait_time)
                        continue
                    else:
                        raise Exception("Rate limit exceeded after retries")
                else:
                    error_detail = response.text
                    raise Exception(f"Groq API error: {response.status_code} - {error_detail}")
        
        if not response_text:
            raise Exception("No response received")
        
        # Detect language (simple heuristic)
        detected_lang = "es"
        if any(word in user_text.lower() for word in ["how", "what", "does", "can", "is", "price", "the", "you", "i", "my"]):
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
