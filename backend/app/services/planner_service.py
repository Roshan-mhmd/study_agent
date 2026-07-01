def plan(question):

    q = question.lower()

    plan = {
        "use_kb": False,
        "use_website": False,
        "use_general": False,
        "reason": ""
    }

    # College-specific information
    if any(
        word in q
        for word in [
            "fee",
            "hostel",
            "placement",
            "admission",
            "principal",
            "director",
            "dean",
            "department",
            "library",
            "cgpu",
            "faculty",
            "syllabus",
            "exam",
            "bus",
            "sports"
        ]
    ):

        plan["use_kb"] = True
        plan["reason"] = "College knowledge"

        return {
        "strategy": "knowledge_base"
        }

    # General AI questions
    if any(
        word in q
        for word in [
            "python",
            "java",
            "machine learning",
            "ai",
            "react",
            "sql"
        ]
    ):

        plan["use_general"] = True
        plan["reason"] = "General knowledge"

        return {
        "strategy": "general"
}

    # Unknown
    return None