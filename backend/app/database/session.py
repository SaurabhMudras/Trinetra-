from sqlalchemy.orm import sessionmaker

from app.database.connection import engine

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db():
    """
    FastAPI Dependency
    Creates a database session for every request.
    """

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()