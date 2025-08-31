from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
import database, crud

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI(title="HealthStream Backend")

database.Base.metadata.create_all(bind=database.engine)

@app.post("/health/{user_id}")
def add_health(user_id: int, heart_rate: float, sleep_hours: float, stress_level: float, db: Session = Depends(get_db)):
    return crud.create_health_data(db, user_id, heart_rate, sleep_hours, stress_level)

@app.get("/health/{user_id}")
def read_health(user_id: int, db: Session = Depends(get_db)):
    return crud.get_health_data(db, user_id)
