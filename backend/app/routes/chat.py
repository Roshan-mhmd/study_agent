from fastapi import APIRouter
from pydantic import BaseModel
from typing import List,Optional
from app.services.rag_service import ask_question

router = APIRouter()

from typing import List, Optional

class Message(BaseModel):
    role: str
    text: str
    sources: Optional[list] = []
class QuestionRequest(BaseModel):
    question: str
    history: List[Message] = []

@router.post("/ask")
def ask(request: QuestionRequest):

    return ask_question(
        request.question,
        request.history
    )