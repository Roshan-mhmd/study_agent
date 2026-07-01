from app.services.planner.planner import planner
import time
from app.services.question_splitter import split_questions
from app.services.answer.answer_builder import build_answer
from app.services.tools.tool_executor import execute_tool
from app.services.llm_service import general_answer


def ask_question(question, history=None):

    start_time = time.perf_counter()

    if history is None:
        history = []

    history_text = "\n".join(
        [
            f"{msg.role}: {msg.text}"
            for msg in history[-10:]
        ]
    )

    # -----------------------------------------
    # PLAN
    # -----------------------------------------

    execution_plan = planner(
        question,
        history_text
    )

    print("\n========== EXECUTION PLAN ==========")
    print(execution_plan)

    strategy = execution_plan.get(
        "strategy",
        "knowledge_base"
    )

    # -----------------------------------------
    # GENERAL AI
    # -----------------------------------------

    if strategy == "general":

        answer = general_answer(
            question,
            history_text
        )

        processing_time = round(
            time.perf_counter() - start_time,
            2
        )

        return {

            "answers": [

                {

                    "question": question,

                    "answer": answer,

                    "strategy": "general",

                    "sources": []

                }

            ],

            "metadata": {

                "processing_time": processing_time,

                "strategy": "general"

            }

        }

    # -----------------------------------------
    # SPLIT QUESTIONS
    # -----------------------------------------

    questions = split_questions(question)

    if not questions:
        questions = [question]

    answer_blocks = []

    for q in questions:

        tool_result = execute_tool(
            strategy,
            q,
            history_text
        )

        answer = build_answer(
            q,
            tool_result,
            history_text
        )

        answer_blocks.append(answer)

    processing_time = round(
        time.perf_counter() - start_time,
        2
    )

    # -----------------------------------------
    # FINAL RESPONSE
    # -----------------------------------------

    return {

        "answers": answer_blocks,

        "metadata": {

            "processing_time": processing_time,

            "strategy": strategy,

            "total_questions": len(answer_blocks)

        }

    }