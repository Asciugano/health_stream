from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, null
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    health_data = relationship("HealthData", back_populates="user")

class HealthData(Base):
    __tablename__ = "health_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    heart_rate = Column(Float)
    sleep_hours = Column(Float)
    stress_level = Column(Float)
    created_at = Column(DateTime, default=datetime.now)

    user = relationship("User", back_populates="health_data")
