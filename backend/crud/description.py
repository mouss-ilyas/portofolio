from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.auth import get_db,login_required
from backend.models import Description,User

class Adddescription(BaseModel):
    icon: str
    text:str

router = APIRouter()


@router.post("/")
def addlearntool(a: Adddescription,db: Session = Depends(get_db),b:User=Depends(login_required)):
    if a.text and a.icon:
        newItem = Description(icon=a.icon, text=a.text)
        db.add(newItem)
        db.commit()  
        db.refresh(newItem)  # Refresh the instance after commit
        return {"message": "success"}
    else:
        return {"message": "failed"}

@router.get("/")
def get_all(db: Session = Depends(get_db)):
    listofitems = db.query(Description).all()
    return listofitems

@router.delete("/{index}")
def delete_item(index: int, db: Session = Depends(get_db),b:User=Depends(login_required)):
    try:
        item = db.query(Description).filter(Description.id == index).first()
        if item:
            db.delete(item)  
            db.commit() 
            return {"message": "success"}
        else:
            return {"message": "item not found"}
    except Exception as e:
        return {"message": f"failed: {str(e)}"}