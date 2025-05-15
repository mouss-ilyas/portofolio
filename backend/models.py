
from sqlalchemy import  ForeignKey, Integer, String, Column, create_engine
from sqlalchemy.orm import declarative_base,Session,sessionmaker,relationship
import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# Database
DATABASE_URL = "sqlite:///./backend/database/database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


Base=declarative_base()
# Create database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Modèle SQLAlchemy pour l'utilisateur


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    def hash_password(self, password: str):
        """Hash the password before saving"""
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(p: str, hashed_p: str) -> bool:
        """Verify the password against the hashed one"""
        return pwd_context.verify(p, hashed_p)
    
    @classmethod
    def init_from_env(cls, db: Session):
        """Initialize admin user from environment variables"""
        # Check if the user already exists
        existing_user = db.query(cls).filter(cls.email == os.getenv("ADMIN_email")).first()
        if existing_user:
            print(f"Admin user '{existing_user.email}' already exists.")
            return
        
        # Retrieve admin credentials from environment variables
        email = os.getenv("ADMIN_MAIL")
        password = os.getenv("ADMIN_PASSWORD")

        if not email or not password:
            print("Environment variables ADMIN_email or ADMIN_PASSWORD not set.")
            return

        # Create and hash the password for the new user
        hashed_password = cls().hash_password(password)

        # Create the admin user and commit to the database
        admin_user = cls(email=email, password=hashed_password)
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print(f"Admin user '{email}' created successfully.")

class LearTools(Base):
    __tablename__ = "LearTools"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    place=Column(String, nullable=False)
    classoftools=Column(String, nullable=False)

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    subject=Column(String, nullable=False)
    message=Column(String, nullable=False)


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    link1=Column(String,nullable=False)
    link2=Column(String,nullable=True)
class Description(Base):
    __tablename__ = "description"
    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String, nullable=False)
    text = Column(String, nullable=False)
# Create tables
Base.metadata.create_all(bind=engine)