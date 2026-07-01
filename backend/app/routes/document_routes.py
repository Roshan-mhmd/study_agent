from fastapi import APIRouter
import os

from app.repositories.qdrant_repository import delete_document

router = APIRouter()

DOCUMENT_FOLDER = "documents"


@router.delete("/documents/{filename}")

def remove_document(filename):

    file_path = os.path.join(

        DOCUMENT_FOLDER,

        filename

    )

    if os.path.exists(file_path):

        os.remove(file_path)

    deleted_chunks = delete_document(filename)

    return {
    "success": True,
    "filename": filename,
    "deleted_chunks": deleted_chunks,
    "message": "Document deleted successfully."
}

from app.repositories.qdrant_repository import get_document_statistics

@router.get("/documents")
def get_documents():

    return get_document_statistics()