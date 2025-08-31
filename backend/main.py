from fastapi import FastAPI

app = FastAPI(title="HealthStream Backend")

@app.get("/")
def read_root():
    return { "message": "HealthStream API is running" }
