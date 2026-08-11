from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_active_user
from app.models.user import User
from app.schemas.alert import (
    AlertCreate,
    AlertUpdate,
    AlertResponse,
)
from app.services.alert_service import (
    create_alert,
    get_all_alerts,
    get_alert_by_id,
    update_alert,
    delete_alert,
)

router = APIRouter()


@router.post(
    "/",
    response_model=AlertResponse,
    status_code=201,
)
def create_new_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return create_alert(
        db=db,
        alert_data=alert,
    )


@router.get(
    "/",
    response_model=list[AlertResponse],
)
def list_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return get_all_alerts(db)


@router.get(
    "/{alert_id}",
    response_model=AlertResponse,
)
def get_alert(
    alert_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    alert = get_alert_by_id(
        db,
        alert_id,
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return alert


@router.patch(
    "/{alert_id}",
    response_model=AlertResponse,
)
def edit_alert(
    alert_id: UUID,
    alert_data: AlertUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    alert = get_alert_by_id(
        db,
        alert_id,
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return update_alert(
        db,
        alert,
        alert_data,
    )


@router.delete(
    "/{alert_id}",
)
def remove_alert(
    alert_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    alert = get_alert_by_id(
        db,
        alert_id,
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    delete_alert(
        db,
        alert,
    )

    return {
        "message": "Alert deleted successfully"
    }