from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime
import bcrypt

load_dotenv()

app = FastAPI(title="MeatCraft Premium Delivery API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Mock database - in production, use MongoDB
users_db = {}
products_db = {}
orders_db = {}
admin_credentials = {
    "username": os.getenv("ADMIN_USERNAME", "shiv"),
    "password": os.getenv("ADMIN_PASSWORD", "123")
}

# Pydantic models
class User(BaseModel):
    id: Optional[str] = None
    email: str
    phone: str
    password: str
    name: str
    address: Optional[str] = None

class Product(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    description: str
    price: float
    weight: str
    image: str
    stock: int

class CartItem(BaseModel):
    product_id: str
    quantity: int

class Order(BaseModel):
    id: Optional[str] = None
    user_id: str
    items: List[CartItem]
    total_amount: float
    delivery_address: str
    status: str
    created_at: Optional[datetime] = None

# Initialize demo products
def initialize_demo_data():
    demo_products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Chicken Breast",
            "category": "chicken",
            "description": "Fresh, boneless chicken breast - perfect for grilling and roasting",
            "price": 299.99,
            "weight": "500g",
            "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
            "stock": 50
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Tender Mutton Leg",
            "category": "mutton",
            "description": "Premium quality mutton leg - slow cooked perfection",
            "price": 599.99,
            "weight": "1kg",
            "image": "https://images.unsplash.com/photo-1588347818987-84e6a8a02aca?w=400",
            "stock": 25
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Organic Chicken Wings",
            "category": "chicken",
            "description": "Free-range organic chicken wings - great for BBQ",
            "price": 199.99,
            "weight": "750g",
            "image": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
            "stock": 40
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Mutton Chops",
            "category": "mutton",
            "description": "Tender mutton chops - restaurant quality",
            "price": 799.99,
            "weight": "800g",
            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
            "stock": 30
        }
    ]
    
    for product in demo_products:
        products_db[product["id"]] = product

initialize_demo_data()

# API Routes
@app.get("/")
async def root():
    return {"message": "Premium Meat Delivery API"}

@app.get("/api/products")
async def get_products():
    return {"products": list(products_db.values())}

@app.get("/api/products/{category}")
async def get_products_by_category(category: str):
    filtered_products = [p for p in products_db.values() if p["category"] == category]
    return {"products": filtered_products}

@app.post("/api/auth/register")
async def register_user(user: User):
    user_id = str(uuid.uuid4())
    user.id = user_id
    # Hash password in production
    users_db[user_id] = user.dict()
    return {"message": "User registered successfully", "user_id": user_id}

@app.post("/api/auth/login")
async def login_user(credentials: dict):
    email = credentials.get("email")
    password = credentials.get("password")
    
    # Check if admin credentials
    if email == admin_credentials["username"] and password == admin_credentials["password"]:
        return {"message": "Login successful", "user_type": "admin", "token": "admin_token"}
    
    # Check regular users
    for user_id, user_data in users_db.items():
        if user_data["email"] == email and user_data["password"] == password:
            return {"message": "Login successful", "user_type": "customer", "user_id": user_id, "token": "user_token"}
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/orders")
async def create_order(order: Order):
    order_id = str(uuid.uuid4())
    order.id = order_id
    order.created_at = datetime.now()
    order.status = "pending"
    orders_db[order_id] = order.dict()
    return {"message": "Order created successfully", "order_id": order_id}

@app.get("/api/admin/dashboard")
async def get_admin_dashboard():
    total_orders = len(orders_db)
    total_earnings = sum(order["total_amount"] for order in orders_db.values())
    total_customers = len(users_db)
    active_deliveries = len([o for o in orders_db.values() if o["status"] == "in_transit"])
    
    return {
        "total_orders": total_orders,
        "total_earnings": total_earnings,
        "total_customers": total_customers,
        "active_deliveries": active_deliveries,
        "recent_orders": list(orders_db.values())[-10:]
    }

@app.get("/api/admin/orders")
async def get_all_orders():
    return {"orders": list(orders_db.values())}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)