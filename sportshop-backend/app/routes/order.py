from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
from app.models.product import Product

from app.utils.deps import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# 📦 Оформить заказ
@router.post("/orders/create")
def create_order(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = int(user["sub"])

    cart_items = db.query(CartItem).filter(
        CartItem.user_id == user_id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Корзина пустая"
        )

    # создаём заказ
    order = Order(user_id=user_id)

    db.add(order)
    db.commit()
    db.refresh(order)

    # переносим товары из корзины
    for item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity
        )

        db.add(order_item)

    # очищаем корзину
    for item in cart_items:
        db.delete(item)

    db.commit()

    return {
        "message": "Заказ оформлен",
        "order_id": order.id
    }


# 📋 История заказов
@router.get("/orders")
def get_orders(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = int(user["sub"])

    orders = db.query(Order).filter(
        Order.user_id == user_id
    ).all()

    result = []

    for order in orders:

        order_items = db.query(OrderItem).filter(
            OrderItem.order_id == order.id
        ).all()

        products = []
        total_price = 0

        for item in order_items:

            product = db.query(Product).filter(
                Product.id == item.product_id
            ).first()

            if product:
                item_total = product.price * item.quantity

                total_price += item_total

                products.append({
                    "product_name": product.name,
                    "price": product.price,
                    "quantity": item.quantity,
                    "total": item_total
                })

        result.append({
            "order_id": order.id,
            "products": products,
            "total_price": total_price
        })

    return result