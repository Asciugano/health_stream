from datetime import datetime
from sqlalchemy.orm import Session
import models, schemas, utils

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email=user.email,
        username=user.username,
        password=utils.hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_user_by_id(db: Session, userID: int):
    return db.query(models.User).filter(models.User.id == userID).first()

def create_health_data(db: Session, metric: schemas.HealthDataCreate):
    record = models.HealthData(
        user_id=metric.user_id,
        heart_rate=metric.heart_rate,
        sleep_hours=metric.sleep_hours,
        stress_level=metric.stress_level,
        created_at=metric.created_at or datetime.now()
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return record

def get_health_data(db: Session, user_id: int, limit: int = 10):
    return db.query(models.HealthData).filter(models.HealthData.user_id == user_id).order_by(models.HealthData.created_at.desc()).limit(limit).all()
