from sqlalchemy import create_engine
from app.core.config import settings

print("=" * 60)
print("USER:", settings.postgres_user)
print("PASSWORD:", settings.postgres_password)
print("HOST:", settings.postgres_host)
print("PORT:", settings.postgres_port)
print("DATABASE:", settings.postgres_db)
print("DATABASE_URL:", settings.database_url)
print("=" * 60)

engine = create_engine(
    settings.database_url,
    echo=settings.debug,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)