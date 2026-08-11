from uuid import UUID
from app.models.user import User
from fastapi import HTTPException


from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.models.user import User


def create_incident(
    db: Session,
    title: str,
    description: str,
    severity: str,
    source: str,
    created_by: User,
):
    incident = Incident(
        title=title,
        description=description,
        severity=severity,
        source=source,
        created_by=created_by.id,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident


def get_all_incidents(db: Session):
    return db.query(Incident).order_by(
        Incident.created_at.desc()
    ).all()


def get_incident_by_id(
    db: Session,
    incident_id: UUID,
):
    return db.query(Incident).filter(
        Incident.id == incident_id
    ).first()


def update_incident(
    db: Session,
    incident: Incident,
    update_data: dict,
):
    for key, value in update_data.items():
        if value is not None:
            setattr(incident, key, value)

    db.commit()
    db.refresh(incident)

    return incident


def delete_incident(
    db: Session,
    incident: Incident,
):
    db.delete(incident)
    db.commit()