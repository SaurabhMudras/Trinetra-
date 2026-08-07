from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password


def create_user(db: Session, username, email, password):
    user = User(
        username=username,
        email=email,
        hashed_password=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(db: Session, email):
    return db.query(User).filter(
        User.email == email
    ).first()


def get_user_by_id(db: Session, user_id):
    return db.query(User).filter(
        User.id == user_id
    ).first()


def get_all_users(db: Session):
    return db.query(User).order_by(
        User.created_at.desc()
    ).all()


def delete_user(db: Session, user):
    db.delete(user)
    db.commit()


def update_user_role(db: Session, user, role):
    user.role = role
    db.commit()
    db.refresh(user)
    return user


def update_user_status(db: Session, user, active):
    user.is_active = active
    db.commit()
    db.refresh(user)
    return user


# -------------------------
# ADD THIS BELOW
# -------------------------

def get_user_stats(db: Session):

    total = db.query(User).count()

    active = db.query(User).filter(
        User.is_active == True
    ).count()

    inactive = db.query(User).filter(
        User.is_active == False
    ).count()

    admins = db.query(User).filter(
        User.role == "admin"
    ).count()

    analysts = db.query(User).filter(
        User.role == "soc_analyst"
    ).count()

    viewers = db.query(User).filter(
        User.role == "viewer"
    ).count()

    return {
        "total_users": total,
        "active_users": active,
        "inactive_users": inactive,
        "admins": admins,
        "soc_analysts": analysts,
        "viewers": viewers,
    }