from fastapi import APIRouter
from pydantic import BaseModel

from app.services.manual_knowledge_service import (
    add_manual_knowledge
)

router = APIRouter()


class ManualKnowledgeRequest(BaseModel):
    title: str
    content: str


@router.post("/manual-note")
def create_manual_note(data: ManualKnowledgeRequest):

    result = add_manual_knowledge(
        data.title,
        data.content
    )

    return {
        "message": "Knowledge stored successfully.",
        "data": result
    }