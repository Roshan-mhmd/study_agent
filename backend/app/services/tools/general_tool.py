from app.services.llm_service import general_answer


def general_tool(question, history=None):

    print("\n========== GENERAL TOOL ==========")

    answer = general_answer(
        question,
        history or ""
    )

    return {

        "success": True,

        "tool": "general",

        "answer": answer,

        "context": "",

        "sources": [],

        "results": [],

        "confidence": 1,

        "metadata": {}

    }