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
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "info@fabricontrol.online")

class LicenseRequest(BaseModel):
    nombre: str
    empresa: str = ""
    email: EmailStr
    telefono: str = ""
    cantidadUsuarios: str
    planDeseado: str = "anual"

async def send_notification_email(request: LicenseRequest):
    """Envía email de notificación al admin vía Resend."""
    if not RESEND_API_KEY or RESEND_API_KEY.startswith("PLACEHOLDER"):
        logger.warning("RESEND_API_KEY no configurada. Email no enviado.")
        return

    resend.api_key = RESEND_API_KEY
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M UTC")

    plan_label = {
        "anual": "Pago Anual - $195/año",
        "cuotas": "Pago en Cuotas - $290/año",
        "por-decidir": "Por decidir después del trial"
    }.get(request.planDeseado, request.planDeseado)

    html_content = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1a56db; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Nueva Solicitud de Trial - FabriControl</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.85;">{now}</p>
      </div>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <h3 style="color: #111827; border-bottom: 2px solid #1a56db; padding-bottom: 8px;">Datos del Cliente</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #374151; width: 35%;">Nombre:</td><td style="padding: 8px; color: #111827;">{request.nombre}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Empresa:</td><td style="padding: 8px; color: #111827;">{request.empresa or 'No proporcionada'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px; color: #111827;"><a href="mailto:{request.email}" style="color: #1a56db;">{request.email}</a></td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Teléfono:</td><td style="padding: 8px; color: #111827;">{request.telefono or 'No proporcionado'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Usuarios:</td><td style="padding: 8px; color: #111827;">{request.cantidadUsuarios}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold; color: #374151;">Plan Interés:</td><td style="padding: 8px; color: #111827;">{plan_label}</td></tr>
        </table>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 15px; margin-top: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af;">Siguiente Paso:</h4>
          <ol style="margin: 0; padding-left: 20px; color: #1e40af;">
            <li>Accede al Super Admin: <a href="https://fabricontrol-1.emergent.host/super-admin" style="color: #1a56db;">fabricontrol-1.emergent.host/super-admin</a></li>
            <li>Crea la cuenta del cliente y asigna 30 días de trial</li>
            <li>Envía el código de activación a: <a href="mailto:{request.email}" style="color: #1a56db;">{request.email}</a></li>
          </ol>
        </div>
      </div>
    </body></html>
    """

    params = {
        "from": "FabriControl <onboarding@resend.dev>",
        "to": [NOTIFICATION_EMAIL],
        "subject": f"Nueva Solicitud de Trial - {request.nombre} ({request.empresa or 'Particular'})",
        "html": html_content,
        "reply_to": request.email
    }
    await asyncio.to_thread(resend.Emails.send, params)
    logger.info(f"Email de notificación enviado para: {request.email}")


@router.post("/license-request")
async def submit_license_request(request: LicenseRequest):
    try:
        logger.info(f"Nueva solicitud de trial: {request.email} - {request.nombre}")
        await send_notification_email(request)

        return {
            "success": True,
            "message": "Solicitud recibida. Recibirás tu código de activación por email en menos de 24 horas.",
            "request_id": datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        }

    except Exception as e:
        logger.error(f"Error procesando solicitud de licencia: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Por favor, intente nuevamente."
        )
