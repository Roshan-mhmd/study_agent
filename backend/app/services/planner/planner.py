from app.services.planner.intent_classifier import classify
from app.services.planner.planner_types import Intent
from app.services.planner.llm_planner import llm_plan


def planner(question, history=None):

    intent = classify(question)

    print("\n========== INTENT ==========")
    print(intent)

    if intent == Intent.SMALL_TALK:
        return {
            "strategy": "general"
        }

    elif intent == Intent.GENERAL:
        return {
            "strategy": "general"
        }

    elif intent == Intent.COLLEGE:
        return {
            "strategy": "knowledge_base_then_website"
        }

    # UNKNOWN
    return llm_plan(question, history)