from uuid import UUID

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.schemas.alert import AlertCreate, AlertUpdate


def create_alert(
    db: Session,
    alert_data: AlertCreate,
) -> Alert:
    alert = Alert(
        title=alert_data.title,
        description=alert_data.description,
        severity=alert_data.severity.value,
        source=alert_data.source,
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert


def get_all_alerts(db: Session) -> list[Alert]:
    return (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )


def get_alert_by_id(
    db: Session,
    alert_id: UUID,
) -> Alert | None:
    return (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )


def update_alert(
    db: Session,
    alert: Alert,
    alert_data: AlertUpdate,
) -> Alert:
    data = alert_data.model_dump(exclude_unset=True)

    for field, value in data.items():
        if hasattr(value, "value"):
            value = value.value

        setattr(alert, field, value)

    db.commit()
    db.refresh(alert)

    return alert


def delete_alert(
    db: Session,
    alert: Alert,
) -> None:
    db.delete(alert)
    db.commit()