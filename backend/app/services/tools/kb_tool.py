import time

from app.services.retrieval_service import retrieve_context


def kb_tool(question, history=None):

    start = time.time()

    print("\n========== KNOWLEDGE BASE TOOL ==========")

    results = retrieve_context(question)

    elapsed = round(time.time() - start, 3)

    if not results:

        return {

            "success": False,

            "tool": "knowledge_base",

            "context": "",

            "sources": [],

            "results": [],

            "confidence": 0,

            "metadata": {

                "chunks": 0,

                "retrieval_time": elapsed

            }

        }

    # -----------------------
    # BUILD CONTEXT
    # -----------------------

    context = "\n\n".join(

        [

            f"Source: {r.payload.get('document_name') or r.payload.get('page')}\n"
            f"Page: {r.payload.get('page')}\n"
            f"Text: {r.payload.get('text')}"

            for r in results

        ]

    )

    # -----------------------
    # BUILD SOURCES
    # -----------------------

    sources = []

    seen = set()

    for r in results:

        source_name = (

            r.payload.get("document_name")

            or

            r.payload.get("page")

        )

        if source_name in seen:
            continue

        seen.add(source_name)

        sources.append(

            {

                "name": source_name,

                "url": r.payload.get("url")

            }

        )

    # -----------------------
    # CONFIDENCE
    # -----------------------

    scores = [

        getattr(r, "score", 0)

        for r in results

    ]

    confidence = round(

        max(scores) if scores else 0,

        3

    )
    print("\n========== TOOL RESULT ==========")

    print(
    "Success:",
    True
    )

    print(
    "Chunks:",
    len(results)
    )

    print(
    "Confidence:",
    confidence
    )

    print(
    "Time:",
    elapsed,
    "sec"
    )
    # -----------------------
    # RETURN
    # -----------------------

    return {

        "success": True,

        "tool": "knowledge_base",

        "context": context,

        "sources": sources,

        "results": results,

        "confidence": confidence,

        "metadata": {

            "chunks": len(results),

            "retrieval_time": elapsed

        }

    }