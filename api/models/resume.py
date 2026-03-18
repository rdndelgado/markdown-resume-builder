from pydantic import BaseModel
from typing import Optional


class ImproveRequest(BaseModel):
    text: str
    context: Optional[str] = ""
    field: Optional[str] = "bullet"


class ImproveResponse(BaseModel):
    improved: str
