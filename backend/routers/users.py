from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(
    prefix="/api/users",
    tags=["users"]
)

@router.get("/", response_model=List[schemas.User])
def get_users(
    skip: int = 0,
    limit: int = 100,
    # current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Not authorized")
    print("iinnnn")
    users = db.query(models.User).offset(skip).limit(limit).all()
    print(users)
    return users

@router.post("/", response_model=schemas.User) 
def create_user(
    user: schemas.UserCreate,
    # current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Not authorized")
    
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        role=user.role,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    user_id: int,
    user_update: schemas.UserBase,
    # current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Not authorized")
    
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user_update.dict().items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    # current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Not authorized")
    
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

