from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import logging

# Initialize the FastAPI app
app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["my-auth-app"]
collection = db["Users"]

# User model for signup
class User(BaseModel):
    username: str
    email: str
    password: str

# User model for login
class LoginUser(BaseModel):
    email: str
    password: str

# Signup endpoint
@app.post("/signup")
def signup(user: User):
    try:
        if collection.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        collection.insert_one(user.dict())
        return {"status": "User created"}
    except Exception as e:
        logger.error(f"Signup failed: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during signup")

# Login endpoint
@app.post("/login")
def login(user: LoginUser):
    try:
        logger.info(f"Attempting login for user: {user.email}")
        db_user = collection.find_one({"email": user.email, "password": user.password})
        if db_user:
            logger.info(f"Login successful for user: {user.email}")
            return {"status": "Login successful"}
        logger.warning(f"Invalid credentials for user: {user.email}")
        raise HTTPException(status_code=400, detail="Invalid credentials")
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during login")
