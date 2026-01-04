from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class LicenseRequest(BaseModel):
    nombre: str
    empresa: str = ""
    email: EmailStr
    telefono: str = ""
    installationCode: str
    cantidadUsuarios: str
    planDeseado: str = "mensual"

@router.post("/license-request")
async def submit_license_request(request: LicenseRequest):
    """
    Recibe solicitudes de c\u00f3digo de licencia de nuevos clientes.
    
    El cliente proporciona su INSTALLATION CODE y el soporte 
    le env\u00eda un LICENSE KEY por email.
    """
    try:
        # Crear el contenido del email
        email_content = f"""
        \ud83d\udd10 Nueva Solicitud de C\u00f3digo de Licencia - FabriControl
        ========================================================
        
        Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M')}
        
        DATOS DEL CLIENTE
        -----------------
        Nombre: {request.nombre}
        Empresa: {request.empresa or 'No proporcionada'}
        Email: {request.email}
        Tel\u00e9fono: {request.telefono or 'No proporcionado'}
        
        C\u00d3DIGO DE INSTALACI\u00d3N
        ------------------------
        Installation Code: {request.installationCode}
        
        PLAN SOLICITADO
        ---------------
        Plan: {request.planDeseado}
        
        ========================================================
        
        \ud83d\udcdd SIGUIENTE PASO:
        
        1. Accede al Panel Super Admin:
           URL: https://factory-sys-2.preview.emergentagent.com/super-admin-login
           Email: julito36911@gmail.com
           Password: 12345678
        
        2. Crear Cliente:
           - Haz clic en "Nuevo Cliente"
           - Completa los datos del cliente
           - D\u00edas Trial: 30 (para trial) o los que corresponda
           - Usuarios M\u00e1x: 3 (B\u00e1sico), 10 (Pro), o seg\u00fan plan
        
        3. El sistema generar\u00e1 un LICENSE KEY:
           Ejemplo: FABRI-8E4A-9B2C-7F1D
        
        4. Env\u00eda el LICENSE KEY al cliente:
           Email: {request.email}
           
           Plantilla sugerida:
           -------------------
           \u00a1Hola {request.nombre}!
           
           Tu licencia de FabriControl est\u00e1 lista:
           
           \ud83d\udd11 LICENSE KEY: [PEGAR_AQUI]
           
           Plan: {request.planDeseado.upper()}
           \u2705 30 d\u00edas gratis (si es trial)
           \u2705 Todas las funciones incluidas
           
           Pasos para activar:
           1. Abre FabriControl
           2. Ve a: Men\u00fa > Configuraci\u00f3n > Licencia
           3. Pega tu LICENSE KEY
           4. \u00a1Listo! Comienza a usar el sistema
           
           \u00bfPreguntas? Responde a este email
           
           \u00a1\u00c9xitos!
           Equipo FabriControl
           -------------------
        
        ========================================================
        """
        
        # Log de la solicitud
        logger.info(f"Nueva solicitud de licencia: {request.email} - {request.installationCode}")
        print("\n" + "="*60)
        print(email_content)
        print("="*60 + "\n")
        
        # TODO: En producci\u00f3n, enviar email real al soporte
        # await send_email(
        #     to="support@fabricontrol.com",
        #     subject=f"Nueva Solicitud de Licencia - {request.nombre}",
        #     body=email_content
        # )
        
        # Tambi\u00e9n se podr\u00eda guardar en base de datos para seguimiento
        # await db.license_requests.insert_one({
        #     "nombre": request.nombre,
        #     "empresa": request.empresa,
        #     "email": request.email,
        #     "telefono": request.telefono,
        #     "installation_code": request.installationCode,
        #     "plan_deseado": request.planDeseado,
        #     "created_at": datetime.now(),
        #     "status": "pending",
        #     "license_key": None  # Se llenar\u00e1 cuando se cree
        # })
        
        return {
            "success": True,
            "message": "Solicitud recibida. Recibir\u00e1s tu LICENSE KEY por email en menos de 24 horas.",
            "request_id": datetime.now().strftime('%Y%m%d%H%M%S')
        }
        
    except Exception as e:
        logger.error(f"Error procesando solicitud de licencia: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Contacta a support@fabricontrol.com"
        )
