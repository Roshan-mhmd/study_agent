from collections import Counter
from app.repositories.qdrant_repository import client, COLLECTION_NAME

points, _ = client.scroll(
    collection_name=COLLECTION_NAME,
    limit=5000,
    with_payload=True,
    with_vectors=False
)

counter = Counter()

for point in points:
    url = point.payload.get("url")

    if url:
        counter[url] += 1

print(f"\nTotal pages: {len(counter)}\n")

for url, chunks in sorted(counter.items()):
    print(f"{chunks:3} chunks  ->  {url}")