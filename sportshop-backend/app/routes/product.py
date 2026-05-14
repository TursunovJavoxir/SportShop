from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.product import Product

from app.schemas.product import (
    ProductCreate,
    ProductResponse
)

from app.utils.deps import get_current_admin


router = APIRouter()


# получить все товары
@router.get("/products")
def get_products(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    return products


# добавить товар
@router.post("/products")
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_admin)
):

    new_product = Product(

        name=product.name,
        price=product.price,
        image_url=product.image_url,
        category=product.category
    )

    db.add(new_product)

    db.commit()

    db.refresh(new_product)

    return new_product


# удалить товар
@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_admin)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    db.delete(product)

    db.commit()

    return {
        "message": "Товар удалён"
    }


# обновить товар
@router.put("/products/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_admin)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    product.name = updated_product.name
    product.price = updated_product.price
    product.image_url = updated_product.image_url
    product.category = updated_product.category

    db.commit()

    db.refresh(product)

    return product

# получить один товар
@router.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        raise HTTPException(
            status_code=404,
            detail="Товар не найден"
        )

    return product