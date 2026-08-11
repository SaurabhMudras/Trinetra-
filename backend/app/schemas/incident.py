from uuid import UUID

from pydantic import BaseModel

from app.models.incident import IncidentSeverity, IncidentStatus


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: IncidentSeverity
    source: str


class IncidentUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    severity: IncidentSeverity | None = None
    status: IncidentStatus | None = None
    source: str | None = None
    assigned_to: UUID | None = None


class IncidentResponse(BaseModel):
    id: UUID
    title: str
    description: str
    severity: IncidentSeverity
    status: IncidentStatus
    source: str
    assigned_to: UUID | None
    created_by: UUID

    class Config:
        from_attributes = True