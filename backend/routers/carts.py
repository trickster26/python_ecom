from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from sqlalchemy.orm import joinedload
from ..database import get_db

router = APIRouter(
    prefix="/api/cart",
    tags=["carts"]
)

@router.get("/", response_model=List[schemas.Cart])
def get_cart(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)):

    cart_items = db.query(models.Cart).options(joinedload(models.Cart.product)).offset(skip).limit(limit).all()

    # Map the results to the Pydantic Cart schema
    result = []
    for item in cart_items:
        result.append(schemas.Cart(
            product_id=item.product_id,
            name=item.product.name,  # Assuming 'name' exists in Product model
            price=item.product.price,  # Assuming 'price' exists in Product model
            quantity=item.quantity
        ))
    return result

@router.post("/")
def add_to_cart(cart: schemas.CartCreate, db: Session = Depends(get_db)):
    print(cart)
    # Check if the product already exists in the cart
    db_cart_item = db.query(models.Cart).filter(models.Cart.product_id == cart.product_id).first()
    if db_cart_item:
        db_cart_item.quantity += cart.quantity
    else:
        # Otherwise, create a new cart entry
        db_cart_item = models.Cart(
            product_id=cart.product_id,
            quantity=cart.quantity,
            # Include user_id if applicable, or set it dynamically
            # user_id= cart.user_id
        )
        db.add(db_cart_item)
    
    # Commit the transaction
    db.commit()
    db.refresh(db_cart_item)
    
    return {"message": "Product added to cart successfully", "cart_item": db_cart_item}

@router.put("/{product_id}")
def update_cart(product_id: int, quantity: int):
    for cart_item in cart:
        if cart_item.product_id == product_id:
            cart_item.quantity = quantity
            return {"message": "Cart updated successfully"}
    raise HTTPException(status_code=404, detail="Product not found in cart")

@router.delete("/{product_id}")
def remove_from_cart(product_id: int):
    global cart
    cart = [item for item in cart if item.product_id != product_id]
    return {"message": "Item removed from cart"}