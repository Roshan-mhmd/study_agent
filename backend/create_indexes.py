from qdrant_client.models import PayloadSchemaType

from app.repositories.qdrant_repository import (
    client,
    COLLECTION_NAME
)

client.create_payload_index(
    collection_name=COLLECTION_NAME,
    field_name="category",
    field_schema=PayloadSchemaType.KEYWORD
)

client.create_payload_index(
    collection_name=COLLECTION_NAME,
    field_name="sub_category",
    field_schema=PayloadSchemaType.KEYWORD
)

print("Indexes created.")