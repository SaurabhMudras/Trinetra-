import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    String,
    DateTime,
    Text,
)

from sqlalchemy.dialects.postgresql import UUID

from app.database.base import Base


class AlertSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AlertStatus(str, Enum):
    OPEN = "open"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    CLOSED = "closed"


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    severity = Column(
        String(20),
        default=AlertSeverity.LOW.value,
        nullable=False,
    )

    status = Column(
        String(30),
        default=AlertStatus.OPEN.value,
        nullable=False,
    )

    source = Column(
        String(100),
        nullable=False,
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