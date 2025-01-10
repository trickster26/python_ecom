from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User schemas
class UserBase(BaseModel):
    email: str
    name: str
    role: str = "user"

class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    password: str

    class Config:
        orm_mode = True

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 

class Cart(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int

    class Config:
        orm_mode = True  # This allows Pydantic to read the SQLAlchemy model as a dictionary

class CartCreate(BaseModel):
    product_id: int
    quantity: int