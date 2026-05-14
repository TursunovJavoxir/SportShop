from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import product
from app.routes import user
from app.routes import cart
from app.routes import order

from app.database import engine, Base

from app.models.product import Product
from app.models.user import User
from app.models.cart import CartItem
from app.models.order import Order, OrderItem

app = FastAPI()

# ✅ CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(product.router)
app.include_router(user.router)
app.include_router(cart.router)
app.include_router(order.router)

# create tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Sport Nutrition API работает 🚀"}