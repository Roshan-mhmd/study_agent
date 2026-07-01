from app.repositories.qdrant_repository import store_chunks
from app.services.embedding_service import generate_embedding


def add_manual_knowledge(title: str, content: str):

    full_text = f"{title}\n\n{content}"

    chunks = [full_text]

    total = store_chunks(
        chunks=chunks,
        embedding_function=generate_embedding,
        source_type="manual",
        document_name=title
    )

    return {
        "title": title,
        "chunks": total
    }