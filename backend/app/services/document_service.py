from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.pdf_reader import extract_text_from_pdf
from app.utils.chunker import chunk_text
from app.services.embedding_service import generate_embedding
from app.repositories.qdrant_repository import store_chunks
import os
def process_document(
    file_path,
    source_url=None
):

    text = extract_text_from_pdf(file_path)

    chunks = chunk_text(text)

    stored = store_chunks(
    chunks=chunks,
    embedding_function=generate_embedding,
    source_type="pdf",
    document_name=os.path.basename(file_path),
    url=source_url
    )

    print(f"Stored {stored} chunks")

    return chunks