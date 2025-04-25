from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.auth import get_db,login_required
from backend.models import Contact,User

class Contactmessage(BaseModel):
    email: str
    subject: str
    message:str

router = APIRouter()


@router.post("/")
def addlearntool(a: Contactmessage,db: Session = Depends(get_db)):
    if a.email and a.message:
        newItem = Contact(email=a.email, subject=a.subject,message=a.message)
        db.add(newItem)
        db.commit()  
        db.refresh(newItem)  # Refresh the instance after commit
        return {"message": "success"}
    else:
        return {"message": "failed"}

@router.get("/")
def get_all(db: Session = Depends(get_db),b:User=Depends(login_required)):
    listofitems = db.query(Contact).all()
    return listofitems

@router.delete("/{index}")
def delete_item(index: int, db: Session = Depends(get_db),b:User=Depends(login_required)):
    try:
        item = db.query(Contact).filter(Contact.id == index).first()
        if item:
            db.delete(item)  
            db.commit() 
            return {"message": "success"}
        else:
            return {"message": "item not found"}
    except Exception as e:
        return {"message": f"failed: {str(e)}"}
