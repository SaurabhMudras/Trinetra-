from app.database.session import SessionLocal
from app.models.user import User

db = SessionLocal()

users = db.query(User).all()

for user in users:
    print(user.id, user.email)

db.close()