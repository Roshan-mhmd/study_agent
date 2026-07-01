from app.repositories.qdrant_repository import (
    client,
    COLLECTION_NAME
)

results, _ = client.scroll(
    collection_name=COLLECTION_NAME,
    limit=1000,
    with_payload=True
)

print("\nHOSTEL RELATED CHUNKS\n")

for r in results:

    page = str(
        r.payload.get("page", "")
    ).lower()

    document = str(
        r.payload.get(
            "document_name",
            ""
        )
    ).lower()

    text = str(
        r.payload.get(
            "text",
            ""
        )
    ).lower()

    if (
        "hostel" in page
        or
        "hostel" in document
        or
        "hostel" in text[:500]
    ):
        print(
            "\nPAGE:",
            r.payload.get("page")
        )

        print(
            "DOC:",
            r.payload.get(
                "document_name"
            )
        )

        print(
            "CATEGORY:",
            r.payload.get(
                "category"
            )
        )

        print("-" * 50)