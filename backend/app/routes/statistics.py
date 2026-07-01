from fastapi import APIRouter
import os

from app.repositories.qdrant_repository import (
    get_total_chunks,
    get_chunks_by_source
)

router = APIRouter()

DOCUMENT_FOLDER = "documents"


@router.get("/stats")
def statistics():

    documents = 0

    if os.path.exists(DOCUMENT_FOLDER):

        documents = len(os.listdir(DOCUMENT_FOLDER))

    return {

        "documents": documents,

        "chunks": get_total_chunks(),

        "website_pages": get_chunks_by_source("website"),

        "manual_notes": get_chunks_by_source("manual"),

        "pdf_chunks": get_chunks_by_source("pdf"),

        "embedding_model": "all-MiniLM-L6-v2"

    }