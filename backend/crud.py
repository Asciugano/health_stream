from sqlalchemy.orm import Session
import models

def create_health_data(db: Session, user_id: int, heart_rate: float, sleep_hours: float, stress_level: float):
    record = models.HealthData(
        user_id=user_id,
        heart_rate=heart_rate,
        sleep_hours=sleep_hours,
        stress_level=stress_level
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return record

def get_health_data(db: Session, user_id: int, limit: int = 10):
    return db.query(models.HealthData).filter(models.HealthData.user_id == user_id).order_by(models.HealthData.created_at.desc()).limit(limit).all()
