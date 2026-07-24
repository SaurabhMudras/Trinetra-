from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
)
from app.services.user_service import (
    create_user,
    get_user_by_email,
)

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing = get_user_by_email(
        db,
        user.email,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return create_user(
        db,
        user.username,
        user.email,
        user.password,
    )