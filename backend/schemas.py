from datetime import datetime
from pydantic import BaseModel

import models
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
    password: str

class User(UserBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class ChangePasswordRequest(BaseModel):
    user_id: int
    old_password: str
    new_password: str

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

    model_config = {
        "from_attributes": True
    }
