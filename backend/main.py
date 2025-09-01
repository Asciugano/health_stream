from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HealthStream API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

@app.post("/health/", response_model=schemas.HealthData)
def create_health_data(metric: schemas.HealthDataCreate, db: Session = Depends(get_db)):
    return crud.create_health_data(db=db, metric=metric)

@app.get("/health/{user_id}", response_model=list[schemas.HealthData])
def read_health_data(user_id: int, db: Session = Depends(get_db)):
    return crud.get_health_data(db=db, user_id=user_id)
