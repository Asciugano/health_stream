from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class GetUserById(BaseModel):
    user_id: int

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: str
    username: str
    password: str

class UserCreate(UserBase): 
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True


class HealthDataBase(BaseModel):
    heart_rate: float
    sleep_hours: float
    stress_level: float
    created_at: Optional[datetime] = datetime.now()

class HealthDataCreate(HealthDataBase):
    user_id: int

class HealthData(HealthDataBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True
