from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.auth import get_db,login_required
from backend.models import Project,User

class Addproject(BaseModel):
    title :str
    description :str
    link1:str
    link2:str

router = APIRouter()


@router.post("/")
def addproj(a: Addproject,db: Session = Depends(get_db),b:User=Depends(login_required)):
    if a.title and a.description :
        newItem = Project(title=a.title, description=a.description,link1=a.link1,link2=a.link2)
        db.add(newItem)
        db.commit()  
        db.refresh(newItem)  
        return {"message": "success"}
    else:
        return {"message": "failed"}

@router.get("/")
def get_all(db: Session = Depends(get_db)):
    listofitems = db.query(Project).all()
    return listofitems
@router.get("/count")
def get_all_count(db: Session = Depends(get_db)):
    n = db.query(Project).count()
    return n

@router.delete("/{index}")
def delete_item(index: int, db: Session = Depends(get_db),b:User=Depends(login_required)):
    try:
        item = db.query(Project).filter(Project.id == index).first()
        if item:
            db.delete(item)  
            db.commit() 
            return {"message": "success"}
        else:
            return {"message": "item not found"}
    except Exception as e:
        return {"message": f"failed: {str(e)}"}
