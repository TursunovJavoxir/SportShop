from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.utils.jwt import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Неверный токен"
        )

    return payload


def get_current_admin(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Нет доступа"
        )

    return user