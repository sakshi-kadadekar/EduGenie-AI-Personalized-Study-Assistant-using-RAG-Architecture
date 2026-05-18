from pydantic import BaseModel, EmailStr
from fastapi import APIRouter

router = APIRouter()


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(payload: SignupRequest) -> dict[str, str]:
    return {
        "message": "Signup contract ready",
        "email": payload.email,
    }


@router.post("/login")
async def login(payload: LoginRequest) -> dict[str, str]:
    return {
        "message": "Login contract ready",
        "email": payload.email,
    }