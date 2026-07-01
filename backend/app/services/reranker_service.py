from sentence_transformers import CrossEncoder

reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

# Minimum acceptable reranker score
MIN_SCORE = 2.0

# Maximum chunks sent to LLM
MAX_RESULTS = 5


def rerank_results(question, results):

    if not results:
        return []

    # ---------------------------------------
    # Cross Encoder Scoring
    # ---------------------------------------

    pairs = [
        (question, r.payload["text"])
        for r in results
    ]

    scores = reranker.predict(pairs)

    scored_results = []

    for score, result in zip(scores, results):

        # Store score inside the result itself
        result.score = float(score)

        scored_results.append(result)

    # ---------------------------------------
    # Sort
    # ---------------------------------------

    scored_results.sort(
        key=lambda x: x.score,
        reverse=True
    )

    # ---------------------------------------
    # Remove Duplicates
    # ---------------------------------------

    unique = []
    seen = set()

    for result in scored_results:

        key = (
            result.payload.get("url"),
            result.payload.get("text", "")[:120]
        )

        if key in seen:
            continue

        seen.add(key)
        unique.append(result)

    # ---------------------------------------
    # Score Threshold
    # ---------------------------------------

    filtered = [
        r
        for r in unique
        if r.score >= MIN_SCORE
    ]

    # If everything is filtered out,
    # return the best few anyway.
    if not filtered:
        filtered = unique[:MAX_RESULTS]

    # ---------------------------------------
    # Keep Top Results
    # ---------------------------------------

    filtered = filtered[:MAX_RESULTS]

    # ---------------------------------------
    # Logging
    # ---------------------------------------

    print("\n========== RERANK RESULTS ==========")

    for i, result in enumerate(filtered, start=1):

        print(
            f"{i}. "
            f"Score={result.score:.3f} | "
            f"Doc={result.payload.get('document_name')} | "
            f"Page={result.payload.get('page')}"
        )

    print(
        f"\nReturned {len(filtered)} high-quality chunks."
    )

    return filtered