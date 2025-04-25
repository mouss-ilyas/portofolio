from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth import SessionLocal, router as authroute
from backend.crud.learnandtools import router as learnTools
from backend.crud.contact import router as contactroute
from backend.crud.projects import router as projectsroute
from backend.crud.handleimage import router as imagerouter
from backend.crud.description import router as descrptionurl

from backend.models import User
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
app.include_router(router=authroute)
app.include_router(router=learnTools,prefix="/learnTools")
app.include_router(router=imagerouter,prefix="/imagerouter")
app.include_router(router=contactroute,prefix="/contact")
app.include_router(router=projectsroute,prefix="/projects")
app.include_router(router=descrptionurl,prefix="/descriptions")



# This will be executed on startup
db = SessionLocal()
User.init_from_env(db)
db.close()