from fastapi import APIRouter, File, UploadFile, Depends
from fastapi.responses import FileResponse
import os
from backend.auth import login_required
from backend.models import User

router = APIRouter()

IMAGE_DIR = "backend/data/static"
IMAGE_PATH = os.path.join(IMAGE_DIR, "image.jpg")
CV_PATH = os.path.join(IMAGE_DIR, "cv.pdf")

# Upload image
@router.post("/upload")
async def upload_image(file: UploadFile = File(...), b: User = Depends(login_required)):
    os.makedirs(IMAGE_DIR, exist_ok=True)

    with open(IMAGE_PATH, "wb") as image_file:
        content = await file.read()
        image_file.write(content)

    return {"message": "Image uploaded successfully"}

# Get image
@router.get("/image")
async def get_image():
    if os.path.exists(IMAGE_PATH):
        return FileResponse(IMAGE_PATH)
    return {"message": "Image not found"}

# Upload CV
@router.post("/cv")
async def upload_cv(file: UploadFile = File(...), b: User = Depends(login_required)):
    os.makedirs(IMAGE_DIR, exist_ok=True)

    with open(CV_PATH, "wb") as cv_file:
        content = await file.read()
        cv_file.write(content)

    return {"message": "CV uploaded successfully"}

# Get CV
@router.get("/cv")
async def get_cv():
    if os.path.exists(CV_PATH):
        return FileResponse(CV_PATH)
    return {"message": "CV not found"}
