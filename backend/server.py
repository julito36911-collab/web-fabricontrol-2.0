from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routers
from routes.chat import router as chat_router
from routes.enterprise_quote import router as enterprise_quote_router
from routes.license_request import router as license_request_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="FabriControl API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "FabriControl API is running (Stateless Mode)"}

# Include the router in the main app
app.include_router(api_router)

# Include routers - all routes are under /api
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(enterprise_quote_router, prefix="/api", tags=["enterprise"])
app.include_router(license_request_router, prefix="/api", tags=["license"])

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    # PORT is provided by Render automatically
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)