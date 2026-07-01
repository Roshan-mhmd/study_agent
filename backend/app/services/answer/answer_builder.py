from app.services.llm_service import generate_answer


def build_answer(
    question,
    tool_result,
    history=""
):

    if not tool_result["success"]:

        return {

            "question": question,

            "answer": "I could not find this information.",

            "strategy": tool_result.get(
                "tool",
                "unknown"
            ),

            "sources": []

        }

    # --------------------------
    # GENERAL TOOL
    # --------------------------

    if tool_result["tool"] == "general":

        return {

            "question": question,

            "answer": tool_result["answer"],

            "strategy": "general",

            "sources": []

        }

    # --------------------------
    # KNOWLEDGE BASE / WEBSITE
    # --------------------------

    answer = generate_answer(

        question,

        tool_result["context"],

        history

    )

    return {

        "question": question,

        "answer": answer,

        "strategy": tool_result["tool"],

        "sources": tool_result["sources"]

    }