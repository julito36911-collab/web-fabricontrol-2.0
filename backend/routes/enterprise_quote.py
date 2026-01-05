from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

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

@router.post("/enterprise-quote")
async def submit_enterprise_quote(quote: EnterpriseQuote):
    """
    Recibe una solicitud de cotización Enterprise y la envía por email.
    
    En producción, esto debería integrar un servicio de email como SendGrid o SES.
    Por ahora, registra la información y simula el envío.
    """
    try:
        # Crear el contenido del email
        email_content = f"""
        Nueva Solicitud de Cotización Enterprise - FabriControl
        ========================================================
        
        Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M')}
        
        INFORMACIÓN DE LA EMPRESA
        -------------------------
        Empresa: {quote.companyName}
        Contacto: {quote.contactName}
        Email: {quote.email}
        Teléfono: {quote.phone or 'No proporcionado'}
        Industria: {quote.industry or 'No especificada'}
        
        DETALLES DEL PROYECTO
        ---------------------
        Usuarios Estimados: {quote.currentUsers or 'No especificado'}
        Timeline: {quote.timeline or 'No especificado'}
        Presupuesto: {quote.budget or 'No especificado'}
        
        REQUERIMIENTOS ESPECÍFICOS
        --------------------------
        {quote.requirements or 'No se proporcionaron requerimientos adicionales'}
        
        ========================================================
        Por favor, contactar al cliente en un plazo máximo de 48 horas.
        """
        
        # Log de la cotización (en producción, aquí se enviaría el email real)
        logger.info(f"Nueva cotización Enterprise recibida de {quote.companyName} ({quote.email})")
        print("\n" + "="*60)
        print(email_content)
        print("="*60 + "\n")
        
        # TODO: En producción, integrar con servicio de email
        # Email de destino: julito36911@gmail.com
        # Ejemplo con SendGrid o SES:
        # await send_email(
        #     to="julito36911@gmail.com",
        #     subject=f"Nueva Cotización Enterprise - {quote.companyName}",
        #     body=email_content
        # )
        
        # También se podría guardar en una base de datos
        # await db.enterprise_quotes.insert_one({
        #     "company": quote.companyName,
        #     "contact": quote.contactName,
        #     "email": quote.email,
        #     "phone": quote.phone,
        #     "industry": quote.industry,
        #     "users": quote.currentUsers,
        #     "requirements": quote.requirements,
        #     "timeline": quote.timeline,
        #     "budget": quote.budget,
        #     "created_at": datetime.now(),
        #     "status": "pending"
        # })
        
        return {
            "success": True,
            "message": "Cotización recibida exitosamente. Le contactaremos en 48 horas.",
            "quote_id": datetime.now().strftime('%Y%m%d%H%M%S')
        }
        
    except Exception as e:
        logger.error(f"Error procesando cotización: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Por favor, intente nuevamente."
        )
