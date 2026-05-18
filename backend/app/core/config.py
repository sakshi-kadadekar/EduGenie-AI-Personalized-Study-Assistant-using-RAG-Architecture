import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    app_name: str = "EduGenie AI"
    debug: bool = os.getenv("DEBUG", "False") == "True"
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    api_v1_prefix: str = "/api/v1"
    allowed_origins: list[str] = ["*"]
    
    class Config:
        env_file = ".env"

settings = Settings()
