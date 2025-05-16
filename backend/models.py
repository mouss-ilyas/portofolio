from sqlalchemy import ForeignKey, Integer, String, Column, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# PostgreSQL database URL
DATABASE_URL = "postgresql://database_fxhh_user:3OtmZ4wXGorKAXpVsrZdx3EPOUHu2Ye0@dpg-d0jhp33e5dus73chfplg-a.frankfurt-postgres.render.com/database_fxhh"

# Create the engine without SQLite-specific args
engine = create_engine(DATABASE_URL)

# Create session local class
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# User model
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
        existing_user = db.query(cls).filter(cls.email == os.getenv("ADMIN_MAIL")).first()
        if existing_user:
            print(f"Admin user '{existing_user.email}' already exists.")
            return

        email = os.getenv("ADMIN_MAIL")
        password = os.getenv("ADMIN_PASSWORD")

        if not email or not password:
            print("Environment variables ADMIN_MAIL or ADMIN_PASSWORD not set.")
            return

        hashed_password = cls().hash_password(password)
        admin_user = cls(email=email, password=hashed_password)
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print(f"Admin user '{email}' created successfully.")


# Other models remain the same
class LearTools(Base):
    __tablename__ = "LearTools"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    place = Column(String, nullable=False)
    classoftools = Column(String, nullable=False)

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(String, nullable=False)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    link1 = Column(String, nullable=False)
    link2 = Column(String, nullable=True)

class Description(Base):
    __tablename__ = "description"
    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String, nullable=False)
    text = Column(String, nullable=False)

# Create tables (if they don't exist)
Base.metadata.create_all(bind=engine)