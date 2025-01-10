from fastapi import FastAPI, Request, Depends, HTTPException, status, Query
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from backend.routers import users
from backend.routers import products
from backend.routers import carts
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from .database import get_db
import requests
from . import models, schemas, auth

app = FastAPI()

app.include_router(users.router)
app.include_router(products.router)
app.include_router(carts.router)
db: Session = Depends(get_db)

# Mount static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Templates
templates = Jinja2Templates(directory="frontend/templates")

# Frontend routes - Authentication bypassed
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    # Bypass login and redirect directly to dashboard
    return RedirectResponse(url="/dashboard")

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    # Mock user data
    user = {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
    }
    return templates.TemplateResponse("dashboard.html", {
        "request": request,
        "user": user
    })

@app.get("/analytics", response_class=HTMLResponse)
async def analytics(request: Request):
    user = {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
    }
    return templates.TemplateResponse("analytics.html", {
        "request": request,
        "user": user
    })

@app.get("/users-page", response_class=HTMLResponse, name="users_page")
async def users_page(request: Request, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    user = {"id": 1, "name": "Admin User", "email": "admin@example.com", "role": "admin"}

    try:
        users = db.query(models.User).offset(skip).limit(limit).all()
        total_users_count = db.query(models.User).count() 
    except Exception as e:
        return JSONResponse(
            content={"detail": f"Failed to fetch users: {e}"},
            status_code=500
        )

    return templates.TemplateResponse("users.html", {
        "request": request,
        "user": user,
        "users": users,
        "pagination": {"skip": skip, "limit": limit},
        "total_users_count": total_users_count  # Pass total users count
    })




@app.get("/products-page", response_class=HTMLResponse)
async def products_page(request: Request, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    user = {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
    }
    products = db.query(models.Product).offset(skip).limit(limit).all()
    # Mock products data
    products.append(
        {
            "name": "Product 1",
            "description": "Description for product 1",
            "price": 99.99,
            "stock": 50,
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
        })
    products.append({
            "name": "Product 2",
            "description": "Description for product 2",
            "price": 149.99,
            "stock": 30,
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
        })
    products.append({
            "name": "Product 3",
            "description": "Description for product 3",
            "price": 199.99,
            "stock": 20,
            "image_url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"
        })
    return templates.TemplateResponse("products.html", {
        "request": request,
        "user": user,
        "products": products
    }) 
    