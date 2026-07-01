QUERY_EXPANSIONS = {

    # Administration
    "principal": "principal of LBS College of Engineering Kasaragod",
    "director": "director of LBS College of Engineering Kasaragod",
    "hod": "head of department",
    "dean": "dean of the college",

    # Admission
    "admission": "admission procedure",
    "apply": "admission procedure",
    "eligibility": "admission eligibility",

    # Fees
    "fee": "fee structure",
    "fees": "fee structure",
    "tuition": "tuition fee fee structure college fee",
    "nri": "NRI admission fee",

    # Hostel
    "hostel": "hostel facilities",

    # Placement
    "placement": "placement cell",
    "company": "placement companies",
    "recruitment": "campus recruitment",

    # Academics
    "department": "academic department",
    "faculty": "faculty members",
    "library": "central library",
    "bus": "bus service",
    "exam": "examination",
    "semester": "semester registration",
}

def rewrite_query(question):

    expanded_terms = []

    query = question.lower()

    for keyword, expansion in QUERY_EXPANSIONS.items():

        if keyword in query:
            expanded_terms.append(expansion)

    if expanded_terms:

        rewritten = (
            question
            + " "
            + " ".join(expanded_terms)
        )

        print("\nQUERY EXPANDED:")
        print(rewritten)

        return rewritten

    print("\nNO QUERY EXPANSION")

    return question