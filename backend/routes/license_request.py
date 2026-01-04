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
    cantidadUsuarios: str
    planDeseado: str = "mensual"

@router.post("/license-request")
async def submit_license_request(request: LicenseRequest):
    """
    Recibe solicitudes de código de licencia de nuevos clientes.
    
    El cliente proporciona su INSTALLATION CODE y el soporte 
    le envía un LICENSE KEY por email con 30 días gratis.
    """
    try:
        # Crear el contenido del email
        email_content = f"""
🎁 Nueva Solicitud de Licencia (30 DÍAS GRATIS) - FabriControl
========================================================

Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M')}

DATOS DEL CLIENTE
-----------------
Nombre: {request.nombre}
Empresa: {request.empresa or 'No proporcionada'}
Email: {request.email}
Teléfono: {request.telefono or 'No proporcionado'}

REQUERIMIENTOS
---------------
Cantidad de Usuarios: {request.cantidadUsuarios}
Pago Preferido: {request.planDeseado}

========================================================

📋 SIGUIENTE PASO:

1. Accede al Panel Super Admin:
   URL: https://factory-sys-2.preview.emergentagent.com/super-admin-login
   Email: julito36911@gmail.com
   Password: 12345678

2. Crear Cliente:
   - Haz clic en "Nuevo Cliente"
   - Completa los datos:
     • Empresa: {request.empresa or request.nombre}
     • Nombre: {request.nombre}
     • Email: {request.email}
     • Teléfono: {request.telefono or 'N/A'}
     • Plan: Según usuarios ({request.cantidadUsuarios})
     • Días Trial: 30
     • Usuarios Máx: (según lo solicitado)

3. El sistema generará un LICENSE KEY:
   Ejemplo: FABRI-8E4A-9B2C-7F1D

4. Envía el LICENSE KEY al cliente:
   Email: {request.email}
   
   📧 PLANTILLA DE EMAIL:
   -------------------
   ¡Hola {request.nombre}!
   
   ¡Tu licencia de FabriControl está lista! 🎉
   
   🔑 LICENSE KEY: [PEGAR_AQUI_EL_CODIGO]
   
   🎁 30 DÍAS GRATIS
   ✅ Todas las funciones incluidas
   ✅ {request.cantidadUsuarios}
   
   📥 PASOS PARA ACTIVAR:
   
   1. Descarga FabriControl:
      Link: [TU_LINK_DE_DESCARGA]
   
   2. Instala en tu PC/Servidor:
      - Ejecuta el instalador
      - Sigue el asistente (5 minutos)
   
   3. Abre FabriControl y activa tu licencia:
      - Ve a: Menú > Configuración > Licencia
      - Pega tu LICENSE KEY: [EL_CODIGO]
      - Clic en "Activar"
   
   4. ¡Listo! Empieza a usar el sistema
   
   💰 DESPUÉS DE LOS 30 DÍAS:
   Para continuar usando FabriControl, contacta a:
   • Email: support@fabricontrol.com
   • WhatsApp: [TU_NUMERO]
   
   Opciones de pago:
   • Mensual: $49 o $129 (según usuarios)
   • Anual: 20% descuento
   
   🔄 MISMO LICENSE KEY
   No necesitas nuevo código. Solo extenderemos
   la fecha de expiración de tu licencia actual.
   
   ¿Preguntas? Responde a este email
   
   ¡Éxitos!
   Equipo FabriControl
   -------------------

========================================================
"""
        
        # Log de la solicitud
        logger.info(f"Nueva solicitud de licencia: {request.email} - {request.installationCode}")
        print("\n" + "="*60)
        print(email_content)
        print("="*60 + "\n")
        
        # TODO: En producción, enviar email real al soporte
        # await send_email(
        #     to="support@fabricontrol.com",
        #     subject=f"Nueva Solicitud de Licencia - {request.nombre}",
        #     body=email_content
        # )
        
        # También se podría guardar en base de datos para seguimiento
        # await db.license_requests.insert_one({
        #     "nombre": request.nombre,
        #     "empresa": request.empresa,
        #     "email": request.email,
        #     "telefono": request.telefono,
        #     "installation_code": request.installationCode,
        #     "cantidad_usuarios": request.cantidadUsuarios,
        #     "plan_deseado": request.planDeseado,
        #     "created_at": datetime.now(),
        #     "status": "pending",
        #     "license_key": None  # Se llenará cuando se cree
        # })
        
        return {
            "success": True,
            "message": "Solicitud recibida. Recibirás tu LICENSE KEY por email en menos de 24 horas.",
            "request_id": datetime.now().strftime('%Y%m%d%H%M%S')
        }
        
    except Exception as e:
        logger.error(f"Error procesando solicitud de licencia: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Contacta a support@fabricontrol.com"
        )
