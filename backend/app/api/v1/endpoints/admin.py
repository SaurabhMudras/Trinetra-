from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.roles import require_roles
from app.models.user import User
from app.schemas.user import (
    UserResponse,
    UserRoleUpdate,
    UserStatusUpdate,
)
from app.services.user_service import (
    get_all_users,
    get_user_by_id,
    update_user_role,
    update_user_status,
    delete_user,
    get_user_stats,
)

router = APIRouter()


@router.get(
    "/dashboard",
)
def admin_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    return {
        "message": f"Welcome {current_user.username}",
        "stats": get_user_stats(db)
    }


@router.get(
    "/users",
    response_model=list[UserResponse],
)
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    return get_all_users(db)


@router.get(
    "/users/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


@router.patch(
    "/users/{user_id}/role",
    response_model=UserResponse,
)
def change_role(
    user_id: UUID,
    role_data: UserRoleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return update_user_role(
        db,
        user,
        role_data.role,
    )


@router.patch(
    "/users/{user_id}/status",
    response_model=UserResponse,
)
def change_status(
    user_id: UUID,
    status_data: UserStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return update_user_status(
        db,
        user,
        status_data.is_active,
    )


@router.delete(
    "/users/{user_id}",
)
def remove_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    delete_user(
        db,
        user,
    )

    return {
        "message": "User deleted successfully"
    }