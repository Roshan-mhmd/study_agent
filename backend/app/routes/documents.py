from fastapi import APIRouter
import os

router = APIRouter()

DOCUMENT_FOLDER = "documents"

@router.get("/documents")
def get_documents():

    if not os.path.exists(DOCUMENT_FOLDER):
        return []

    files = os.listdir(DOCUMENT_FOLDER)

    return [
        {
            "name": file
        }
        for file in files
    ]