from pydantic import BaseModel


class ProductCreate(BaseModel):

    name: str
    price: int
    image_url: str
    category: str


class ProductResponse(BaseModel):

    id: int
    name: str
    price: int
    image_url: str
    category: str

    class Config:
        from_attributes = True