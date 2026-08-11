from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_active_user
from app.models.user import User
from app.schemas.incident import (
    IncidentCreate,
    IncidentUpdate,
    IncidentResponse,
)
from app.services.incident_service import (
    create_incident,
    get_all_incidents,
    get_incident_by_id,
    update_incident,
    delete_incident,
)

router = APIRouter()


@router.post(
    "/",
    response_model=IncidentResponse,
    status_code=201,
)
def create_new_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return create_incident(
        db=db,
        title=incident.title,
        description=incident.description,
        severity=incident.severity,
        source=incident.source,
        created_by=current_user,
    )


@router.get(
    "/",
    response_model=list[IncidentResponse],
)
def list_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return get_all_incidents(db)


@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def get_incident(
    incident_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


@router.patch(
    "/{incident_id}",
    response_model=IncidentResponse,
)
def edit_incident(
    incident_id: UUID,
    incident_data: IncidentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return update_incident(
        db,
        incident,
        incident_data.model_dump(exclude_unset=True),
    )


@router.delete(
    "/{incident_id}",
)
def remove_incident(
    incident_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    delete_incident(
        db,
        incident,
    )

    return {
        "message": "Incident deleted successfully"
    }