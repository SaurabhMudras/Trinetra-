from app.database.session import SessionLocal
from app.models.user import User

db = SessionLocal()

user = db.query(User).filter(
    User.email == "saurabh@example.com"
).first()

if user:
    user.role = "admin"
    db.commit()
    print("✅ User promoted to ADMIN")
else:
    print("❌ User not found")

db.close()