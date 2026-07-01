from app.services.retrieval_service import retrieve_context

question = "How Q&A works with extension?"

results = retrieve_context(question)

for i, result in enumerate(results):

    print(f"\nResult {i+1}")

    print("Score:", result.score)

    print(
        result.payload["text"][:500]
    )