from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.auth import get_db,login_required
from backend.models import LearTools,User

class Addlearntools(BaseModel):
    name: str
    classoftools: str
    place:str

router = APIRouter()


@router.post("/")
def addlearntool(a: Addlearntools,db: Session = Depends(get_db),b:User=Depends(login_required)):
    if a.name and a.classoftools:
        newItem = LearTools(name=a.name, classoftools=a.classoftools,place=a.place)
        db.add(newItem)
        db.commit()  
        db.refresh(newItem)  # Refresh the instance after commit
        return {"message": "success"}
    else:
        return {"message": "failed"}

@router.get("/")
def get_all(db: Session = Depends(get_db)):
    listofitems = db.query(LearTools).all()
    return listofitems

@router.delete("/{index}")
def delete_item(index: int, db: Session = Depends(get_db),b:User=Depends(login_required)):
    try:
        item = db.query(LearTools).filter(LearTools.id == index).first()
        if item:
            db.delete(item)  
            db.commit() 
            return {"message": "success"}
        else:
            return {"message": "item not found"}
    except Exception as e:
        return {"message": f"failed: {str(e)}"}
@router.get("/users")
def get_all(db:Session=Depends(get_db)):
    return db.query(User).all()