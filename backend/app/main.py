from app.api.v1.endpoints import incident
from app.api.v1.endpoints import alert
from app.api.v1.endpoints import admin
from app.api.v1.endpoints import auth
from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlalchemy import text

from app.core.config import settings
from app.database.connection import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs once when the application starts.
    We'll verify the database connection here.
    """

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            print("✅ PostgreSQL Connected Successfully!")
    except Exception as e:
        print(f"❌ Database Connection Failed: {e}")

    yield

    print("👋 TrinetraAI Backend Stopped")


app = FastAPI(
    title=settings.project_name,
    version=settings.version,
    debug=settings.debug,
    lifespan=lifespan,
)


@app.get("/")
def root():
    return {
        "project": settings.project_name,
        "version": settings.version,
        "message": "Welcome to TrinetraAI 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected",
        "version": settings.version
    }
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)
app.include_router(
    admin.router,
    prefix="/api/v1/admin",
    tags=["Admin"],
)
app.include_router(
    incident.router,
    prefix="/api/v1/incidents",
    tags=["Incidents"],
)
app.include_router(
    alert.router,
    prefix="/api/v1/alerts",
    tags=["Alerts"],
)