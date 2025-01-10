from sqlalchemy.orm import Session
from . import models, auth
from .database import SessionLocal, engine

def init_db():
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if admin user exists
    admin_user = db.query(models.User).filter(models.User.email == "admin@example.com").first()
    
    if not admin_user:
        # Create admin user
        hashed_password = auth.get_password_hash("admin123")
        admin_user = models.User(
            email="admin@example.com",
            name="Admin User",
            role="admin",
            hashed_password=hashed_password
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created successfully!")
    
    db.close()

if __name__ == "__main__":
    init_db() 