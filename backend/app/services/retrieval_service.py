from app.services.retrieval_judge import (
    need_more_context
)

from app.services.embedding_service import (
    generate_embedding
)

from app.repositories.qdrant_repository import (
    search_chunks
)

from app.services.query_analyzer import (
    analyze_query
)

from app.services.reranker_service import (
    rerank_results
)

from app.services.query_rewriter import (
    rewrite_query
)


def retrieve_context(question):

    query_info = analyze_query(
        question
    )

    print(
        "\nQUERY ANALYSIS:",
        query_info
    )

    print(
        f"\nCATEGORY: {query_info['category']}"
    )

    rewritten_query = rewrite_query(
        question
    )

    print(
        "\nREWRITTEN QUERY:",
        rewritten_query
    )

    # Use ORIGINAL question for embeddings
    query_embedding = generate_embedding(
       rewritten_query
    )

    results = search_chunks(
        query_embedding,
        limit=20,
        category=query_info["category"],
        sub_category=query_info["sub_category"]
    )

    print(
        f"\nInitial Results: {len(results)}"
    )

    # Adaptive Retrieval
    if need_more_context(results):

        print(
            "\nLOW CONFIDENCE DETECTED"
        )

        print(
            "Running second retrieval..."
        )

        extra_results = search_chunks(
            query_embedding,
            limit=25,
            category=query_info["category"],
            sub_category=query_info["sub_category"]
        )

        unique_results = {}

        for r in results:
            unique_results[str(r.id)] = r

        for r in extra_results:
            unique_results[str(r.id)] = r

        results = list(
            unique_results.values()
        )

        print(
            f"After second retrieval: {len(results)} chunks"
        )
    print("\n===== BEFORE RERANK =====")

    for i, r in enumerate(results):

        print("-" * 80)
        print("URL:", r.payload.get("url"))
        print()
        print(r.payload.get("text")[:250])
    # Rerank after retrievals complete
        results = rerank_results(
            question,
            results
        )

    
    print("\n===== AFTER RERANK =====")

    for i, r in enumerate(results):

        print("-" * 80)
        print("URL:", r.payload.get("url"))
        print()
        print(r.payload.get("text")[:250])
        print(
        "\n===== RETRIEVED CHUNKS ====="
    )

    for r in results:

        score = getattr(
            r,
            "score",
            0
        )

        print(
            "SCORE:",
            round(score, 4),
            "| PAGE:",
            r.payload.get("page"),
            "| DOC:",
            r.payload.get("document_name")
        )

    print(
        "\nFINAL RESULTS:",
        len(results)
    )

    return results