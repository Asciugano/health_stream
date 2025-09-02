from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND
import auth
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

@app.post("/singup/", response_model=schemas.Token)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.create_user(db=db, user=user)
    token = auth.create_acces_token({ "sub": user.id })
    return {"access_token": token, "token_type": "bearer"}

@app.get("/users/", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

@app.post("/user/", response_model=schemas.User)
def get_user_by_id(userID: schemas.GetUserById, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db=db, userID=userID.user_id)
    if not user:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.post("/health/", response_model=schemas.HealthData)
def create_health_data(metric: schemas.HealthDataCreate, db: Session = Depends(get_db)):
    return crud.create_health_data(db=db, metric=metric)

@app.get("/health/{user_id}", response_model=list[schemas.HealthData])
def read_health_data(user_id: int, db: Session = Depends(get_db)):
    return crud.get_health_data(db=db, user_id=user_id)

@app.post("/login", response_model=schemas.Token)
def login(form_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db=db, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    token = auth.create_acces_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}
