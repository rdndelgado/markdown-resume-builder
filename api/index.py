import sys
import os

# Make api/ directory importable so routers/services/models resolve correctly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ai, health

app = FastAPI(title="Resume Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router, prefix="/api")
app.include_router(health.router, prefix="/api")
