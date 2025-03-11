from typing import Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    username: str
    phone_number: str
    password: str
    confirm_password: str
    profile_picture: Optional[bytes] = None

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    phone_number: str
    profile_picture: Optional[bytes]
    is_admin: bool

    class Config:
        orm_mode = True

class MessageCreate(BaseModel):
    content: str
    receiver_id: int

class MessageOut(BaseModel):
    id: int
    content: str
    sender_id: int
    receiver_id: int
    timestamp: str

    class Config:
        orm_mode = True