from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone
import logging
import asyncio
import os
import resend

router = APIRouter()
logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "julito36911@gmail.com")

class EnterpriseQuote(BaseModel):
    companyName: str
    contactName: str
    email: EmailStr
    phone: str = ""
    industry: str = ""
    currentUsers: str = ""
    requirements: str = ""
    timeline: str = ""
    budget: str = ""

async def send_enterprise_email(quote: EnterpriseQuote):
    """Envía email de notificación de cotización Enterprise al admin vía Resend."""
    if not RESEND_API_KEY or RESEND_API_KEY.startswith("PLACEHOLDER"):
        logger.warning("RESEND_API_KEY no configurada. Email no enviado.")
        return

    resend.api_key = RESEND_API_KEY
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M UTC")

    html_content = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #7c3aed; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Nueva Cotización Enterprise - FabriControl</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.85;">{now}</p>
      </div>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <h3 style="color: #111827; border-bottom: 2px solid #7c3aed; padding-bottom: 8px;">Información de la Empresa</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 35%;">Empresa:</td><td style="padding: 8px; color: #111827;">{quote.companyName}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Contacto:</td><td style="padding: 8px; color: #111827;">{quote.contactName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px; color: #111827;"><a href="mailto:{quote.email}" style="color: #7c3aed;">{quote.email}</a></td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Teléfono:</td><td style="padding: 8px; color: #111827;">{quote.phone or 'No proporcionado'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Industria:</td><td style="padding: 8px; color: #111827;">{quote.industry or 'No especificada'}</td></tr>
        </table>

        <h3 style="color: #111827; border-bottom: 2px solid #7c3aed; padding-bottom: 8px; margin-top: 20px;">Detalles del Proyecto</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 35%;">Usuarios:</td><td style="padding: 8px; color: #111827;">{quote.currentUsers or 'No especificado'}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Timeline:</td><td style="padding: 8px; color: #111827;">{quote.timeline or 'No especificado'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Presupuesto:</td><td style="padding: 8px; color: #111827;">{quote.budget or 'No especificado'}</td></tr>
        </table>

        <div style="background: #f5f3ff; border: 1px solid #c4b5fd; border-radius: 6px; padding: 15px; margin-top: 15px;">
          <h4 style="margin: 0 0 8px 0; color: #6d28d9;">Requerimientos Específicos:</h4>
          <p style="margin: 0; color: #374151; white-space: pre-wrap;">{quote.requirements or 'No se proporcionaron requerimientos adicionales'}</p>
        </div>

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px; margin-top: 15px;">
          <p style="margin: 0; color: #92400e;"><strong>Plazo de respuesta:</strong> Contactar al cliente en máximo 48 horas.</p>
        </div>
      </div>
    </body></html>
    """

    params = {
        "from": "FabriControl Enterprise <onboarding@resend.dev>",
        "to": [NOTIFICATION_EMAIL],
        "subject": f"Nueva Cotización Enterprise - {quote.companyName}",
        "html": html_content,
        "reply_to": quote.email
    }
    await asyncio.to_thread(resend.Emails.send, params)
    logger.info(f"Email Enterprise enviado para: {quote.companyName} ({quote.email})")


@router.post("/enterprise-quote")
async def submit_enterprise_quote(quote: EnterpriseQuote):
    try:
        logger.info(f"Nueva cotización Enterprise: {quote.companyName} ({quote.email})")
        await send_enterprise_email(quote)

        return {
            "success": True,
            "message": "Cotización recibida exitosamente. Le contactaremos en 48 horas.",
            "quote_id": datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        }

    except Exception as e:
        logger.error(f"Error procesando cotización Enterprise: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Por favor, intente nuevamente."
        )
