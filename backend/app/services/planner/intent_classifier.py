from app.services.planner.planner_types import Intent
from app.services.planner.planner_constants import (
    COLLEGE_KEYWORDS,
    TECH_KEYWORDS,
    SMALL_TALK
)


def classify(question):

    question = question.lower()

    if any(x in question for x in SMALL_TALK):
        return Intent.SMALL_TALK

    if any(x in question for x in TECH_KEYWORDS):
        return Intent.GENERAL

    if any(x in question for x in COLLEGE_KEYWORDS):
        return Intent.COLLEGE

    return Intent.UNKNOWN