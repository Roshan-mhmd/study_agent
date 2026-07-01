import re

QUESTION_STARTERS = [
    "tell me about",
    "what is",
    "what are",
    "who is",
    "who are",
    "how",
    "can you tell me about",
    "give me",
    "explain",
]


def split_questions(question):

    if not question:
        return []

    question = question.strip()

    # No 'and' → single question
    if " and " not in question.lower():
        return [question]

    parts = re.split(r"\band\b", question, flags=re.IGNORECASE)

    if len(parts) < 2:
        return [question]

    prefix = ""

    first = parts[0].strip()

    for starter in QUESTION_STARTERS:
        if first.lower().startswith(starter):
            prefix = starter
            break

    questions = []

    questions.append(first)

    for part in parts[1:]:

        part = part.strip(" ?,.")
        if not part:
            continue

        if prefix:
            questions.append(f"{prefix} {part}")
        else:
            questions.append(part)

    return questions