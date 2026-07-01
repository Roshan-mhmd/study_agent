from fastapi import APIRouter, UploadFile, File
import os
from app.services.document_service import process_document
router = APIRouter()

UPLOAD_FOLDER = "documents"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    chunks = process_document(file_path)
   
    return {
    "message": "File uploaded successfully",
    "filename": file.filename,
    "total_chunks": len(chunks)
    }