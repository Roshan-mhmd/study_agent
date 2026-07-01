from app.utils.chunker import chunk_text
from app.services.embedding_service import generate_embedding
from app.repositories.qdrant_repository import store_chunks
import inspect

def ingest_website(
    text,
    page_name,
    url
):

    chunks = chunk_text(text)

    stored=store_chunks(
    chunks=chunks,
    embedding_function=generate_embedding,
    source_type="website",
    page=page_name,
    url=url
)

    print(
        f"Stored {stored} website chunks"
    )

    return chunks