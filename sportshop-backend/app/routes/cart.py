from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.cart import CartItem
from app.models.product import Product

from app.utils.deps import get_current_user


router = APIRouter()


# получить корзину
@router.get("/cart")
def get_cart(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    user_id = int(user["sub"])

    cart_items = db.query(CartItem).filter(
        CartItem.user_id == user_id
    ).all()

    result = []

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:

            result.append({
                "id": item.id,

                "quantity": item.quantity,

                "product": {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "image_url": product.image_url,
                    "category": product.category
                }
            })

    return result


# добавить товар
@router.post("/cart/add/{product_id}")
def add_to_cart(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    user_id = int(user["sub"])

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == product_id
    ).first()

    if cart_item:

        cart_item.quantity += 1

    else:

        cart_item = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=1
        )

        db.add(cart_item)

    db.commit()

    return {
        "message": "Товар добавлен в корзину"
    }


# удалить товар
@router.delete("/cart/remove/{product_id}")
def remove_from_cart(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    user_id = int(user["sub"])

    cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == product_id
    ).first()

    if not cart_item:

        raise HTTPException(
            status_code=404,
            detail="Товар не найден в корзине"
        )

    db.delete(cart_item)

    db.commit()

    return {
        "message": "Товар удалён"
    }