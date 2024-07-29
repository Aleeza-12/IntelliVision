from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from pymongo import MongoClient
import torch
# from models.unet import load_unet_model
# from models.r_fcn import load_rfcn_model

app = FastAPI()

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["my-auth-app"]
collection = db["Users"]

class User(BaseModel):
    username: str
    email: str
    password: str

@app.post("/signup")
def signup(user: User):
    if collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    collection.insert_one(user.dict())
    return {"status": "User created"}

@app.post("/login")
def login(user: User):
    db_user = collection.find_one({"email": user.email, "password": user.password})
    if db_user:
        return {"status": "Login successful"}
    raise HTTPException(status_code=400, detail="Invalid credentials")

# unet_model = load_unet_model()
# rfcn_model = load_rfcn_model()

@app.post("/detect-unet")
async def detect_unet(file: UploadFile = File(...)):
    contents = await file.read()
    # Process the file and run the model
    return {"status": "UNet model run"}

@app.post("/detect-rfcn")
async def detect_rfcn(file: UploadFile = File(...)):
    contents = await file.read()
    # Process the file and run the model
    return {"status": "R-FCN model run"}

# Ensure models directory exists and load the model
import os
os.makedirs("models", exist_ok=True)
