from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.alert import AlertSeverity, AlertStatus


class AlertCreate(BaseModel):
    title: str
    description: str
    severity: AlertSeverity
    source: str


class AlertUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    severity: AlertSeverity | None = None
    status: AlertStatus | None = None
    source: str | None = None


class AlertResponse(BaseModel):
    id: UUID
    title: str
    description: str
    severity: AlertSeverity
    status: AlertStatus
    source: str

    model_config = ConfigDict(from_attributes=True)