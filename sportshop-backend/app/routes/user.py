from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email уже существует")

    new_user = User(
        email=user.email,
        password=hash_password(user.password),
        role="user"  # 👈 всегда user
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Пользователь создан"}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Пользователь не найден")

    if not verify_password(form_data.password, db_user.password):
        raise HTTPException(status_code=400, detail="Неверный пароль")

    token = create_token({
        "sub": str(db_user.id),
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }