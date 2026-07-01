from app.services.tools.tool_registry import TOOLS


def execute_tool(strategy, question, history=None):

    print("\n========== TOOL EXECUTOR ==========")

    print("Strategy:", strategy)

    # Special case:
    if strategy == "knowledge_base_then_website":

        kb = TOOLS["knowledge_base"](
            question
        )

        if kb["success"]:

            return kb

        return TOOLS["website"](
            question
        )

    tool = TOOLS.get(strategy)

    if tool is None:

        return {

            "success": False,

            "tool": None,

            "context": "",

            "sources": [],

            "results": []

        }

    return tool(
        question,
        history
    )