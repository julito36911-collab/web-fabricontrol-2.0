from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone
import logging
import asyncio
import os
import resend

router = APIRouter()
logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "info@fabricontrol.online")


class QuoteRequest(BaseModel):
    summary: str
    company: str = ""
    contactName: str = ""
    email: str = ""


async def send_quote_email(req: QuoteRequest):
    """Send quote summary to admin via Resend."""
    if not RESEND_API_KEY or RESEND_API_KEY.startswith("PLACEHOLDER"):
        logger.warning("RESEND_API_KEY not configured. Email not sent.")
        return False

    resend.api_key = RESEND_API_KEY
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M UTC")

    html_content = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Nueva Solicitud de Cotización</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.85;">{now}</p>
      </div>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px; line-height: 1.6; color: #1f2937; background: #fff; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">{req.summary}</pre>
        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px; margin-top: 15px;">
          <p style="margin: 0; color: #92400e;"><strong>Plazo de respuesta:</strong> Contactar al cliente en máximo 48 horas.</p>
        </div>
      </div>
    </body></html>
    """

    params = {
        "from": "FabriControl Cotizaciones <onboarding@resend.dev>",
        "to": [NOTIFICATION_EMAIL],
        "subject": f"Nueva Cotización — {req.company or req.contactName or 'Nuevo cliente'}",
        "html": html_content,
    }
    if req.email:
        params["reply_to"] = req.email

    await asyncio.to_thread(resend.Emails.send, params)
    logger.info(f"Quote email sent for: {req.company} ({req.email})")
    return True


@router.post("/send-quote")
async def send_quote(req: QuoteRequest):
    try:
        logger.info(f"New quote request: {req.company} ({req.email})")
        sent = await send_quote_email(req)

        return {
            "success": True,
            "email_sent": sent,
            "message": "Cotización enviada exitosamente." if sent else "Cotización recibida (email no configurado)."
        }

    except Exception as e:
        logger.error(f"Error sending quote: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al enviar la cotización. Intentá de nuevo o usá WhatsApp."
        )
