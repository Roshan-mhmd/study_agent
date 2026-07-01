import os
from app.utils.metadata_utils import get_metadata
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Filter,
    FieldCondition,
    MatchValue
)
load_dotenv()
def get_category(document_name=None, url=None):

    name = ""

    if document_name:
        name += document_name.lower()

    if url:
        name += " " + url.lower()

    if any(
        word in name
        for word in [
            "fee",
            "fees",
            "tuition",
            "nri"
        ]
    ):
        return "fees"

    if any(
        word in name
        for word in [
            "hostel",
            "accommodation",
            "facility",
            "amenities"
        ]
    ):
        return "hostel"

    if any(
        word in name
        for word in [
            "placement",
            "cgpu",
            "career",
            "recruitment"
        ]
    ):
        return "placement"

    if any(
        word in name
        for word in [
            "admission",
            "apply",
            "prospectus"
        ]
    ):
        return "admission"

    if any(
        word in name
        for word in [
            "principal",
            "mandatory_disclosure",
            "administration",
            "director",
            "dean",
            "hod"
        ]
    ):
        return "administration"

    return "general"
client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)
from qdrant_client.models import PointStruct
import uuid

COLLECTION_NAME = "campus_documents"
from qdrant_client.models import PayloadSchemaType


def create_payload_indexes():

    fields = [
        "document_name",
        "source_type",
        "category",
        "sub_category",
        "url",
    ]

    for field in fields:

        try:

            client.create_payload_index(
                collection_name=COLLECTION_NAME,
                field_name=field,
                field_schema=PayloadSchemaType.KEYWORD
            )

            print(f"✓ Index created: {field}")

        except Exception as e:

            print(f"Index '{field}' already exists or couldn't be created.")
def store_chunks(
    chunks,
    embedding_function,
    source_type,
    document_name=None,
    page=None,
    url=None,
   
    ):
    metadata = get_metadata(
    document_name=document_name,
    page=page,
    url=url
    )
    points = []

    for chunk in chunks:

        vector = embedding_function(chunk)

        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={

                        "text": chunk,

                        "source_type": source_type,

                        "document_name": document_name,

                        "page": page,

                        "url": url,

                        "category": metadata["category"],

                        "sub_category": metadata["sub_category"],

                        "created_at": str(uuid.uuid1()),

                        "status": "indexed"

                        }
        )
    )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    return len(points)
def search_chunks(
    query_embedding,
    limit=10,
    category=None,
    sub_category=None
):

    conditions = []

    if category:
        conditions.append(
            FieldCondition(
                key="category",
                match=MatchValue(
                    value=category
                )
            )
        )

    if sub_category:
        conditions.append(
            FieldCondition(
                key="sub_category",
                match=MatchValue(
                    value=sub_category
                )
            )
        )

    print(
        f"\nFILTER:"
        f" category={category}"
        f" sub_category={sub_category}"
    )

    if conditions:

        query_filter = Filter(
            must=conditions
        )

        results = client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_embedding,
            query_filter=query_filter,
            limit=limit
        )

    else:

        results = client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_embedding,
            limit=limit
        )

    return results.points

def keyword_search(
    query,
    limit=10
):

    query_words = (
        query.lower()
        .split()
    )

    all_results = client.scroll(
        collection_name=COLLECTION_NAME,
        limit=5000,
        with_payload=True,
        with_vectors=False
    )[0]

    scored = []

    for point in all_results:

        text = (
            point.payload
            .get("text", "")
            .lower()
        )

        score = sum(
            1
            for word in query_words
            if word in text
        )

        if score > 0:
            scored.append(
                (
                    score,
                    point
                )
            )

    scored.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    return [
        item[1]
        for item in scored[:limit]
    ]

from qdrant_client.models import (
    Filter,
    FilterSelector,
    FieldCondition,
    MatchValue
)


def delete_document(filename):

    # Count matching chunks first
    matches = client.scroll(
        collection_name=COLLECTION_NAME,
        scroll_filter=Filter(
            must=[
                FieldCondition(
                    key="document_name",
                    match=MatchValue(value=filename)
                )
            ]
        ),
        limit=10000,
        with_payload=False,
        with_vectors=False
    )[0]

    deleted_chunks = len(matches)

    client.delete(
        collection_name=COLLECTION_NAME,
        points_selector=FilterSelector(
            filter=Filter(
                must=[
                    FieldCondition(
                        key="document_name",
                        match=MatchValue(value=filename)
                    )
                ]
            )
        )
    )

    return deleted_chunks
from qdrant_client.models import Filter


def get_total_chunks():

    count = client.count(
        collection_name=COLLECTION_NAME,
        exact=True
    )

    return count.count


def get_chunks_by_source(source_type):

    count = client.count(
        collection_name=COLLECTION_NAME,
        count_filter=Filter(
            must=[
                FieldCondition(
                    key="source_type",
                    match=MatchValue(
                        value=source_type
                    )
                )
            ]
        ),
        exact=True
    )

    return count.count

from collections import defaultdict


def get_document_statistics():

    points, _ = client.scroll(
        collection_name=COLLECTION_NAME,
        limit=10000,
        with_payload=True,
        with_vectors=False
    )

    documents = defaultdict(
        lambda: {
            "name": "",
            "type": "",
            "chunks": 0,
            "added": ""
        }
    )

    for point in points:

        payload = point.payload

        name = (
            payload.get("document_name")
            or payload.get("url")
            or "Unknown"
        )

        documents[name]["name"] = name

        documents[name]["type"] = payload.get(
            "source_type",
            "Unknown"
        )

        documents[name]["chunks"] += 1

    return list(documents.values())