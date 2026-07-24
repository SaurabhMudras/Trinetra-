import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
)

from sqlalchemy.dialects.postgresql import UUID

from app.database.base import Base


class UserRole(str, Enum):
    ADMIN = "admin"
    SOC_ANALYST = "soc_analyst"
    THREAT_RESEARCHER = "threat_researcher"
    INCIDENT_RESPONDER = "incident_responder"
    VIEWER = "viewer"


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    full_name = Column(
        String(150),
        nullable=True,
    )

    role = Column(
        String(50),
        default=UserRole.VIEWER.value,
        nullable=False,
    )

    department = Column(
        String(100),
        nullable=True,
    )

    is_active = Column(
        Boolean,
        default=True,
    )

    is_verified = Column(
        Boolean,
        default=False,
    )

    failed_login_attempts = Column(
        Integer,
        default=0,
    )

    last_login = Column(
        DateTime,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )