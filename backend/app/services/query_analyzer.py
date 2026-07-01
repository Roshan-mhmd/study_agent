def analyze_query(question):

    question = question.lower()

    category = None
    sub_category = None

    # ----------------------------
    # FLAGS
    # ----------------------------

    is_fee = any(
        word in question
        for word in [
            "fee",
            "fees",
            "tuition",
            "tution",          # common misspelling
            "payment",
            "cost",
            "charges",
            "amount"
        ]
    )

    is_hostel = any(
        word in question
        for word in [
            "hostel",
            "accommodation",
            "room",
            "mess"
        ]
    )

    is_placement = any(
        word in question
        for word in [
            "placement",
            "company",
            "companies",
            "recruitment",
            "job",
            "career"
        ]
    )

    is_admission = any(
        word in question
        for word in [
            "admission",
            "apply",
            "eligibility",
            "prospectus"
        ]
    )

    is_admin = any(
        word in question
        for word in [
            "principal",
            "director",
            "hod",
            "dean",
            "administration",
            "administrative",
            "office"
        ]
    )

    # ----------------------------
    # FEES
    # ----------------------------

    if is_fee:

        category = "fees"

        if "nri" in question:
            sub_category = "nri"

        elif "mtech" in question:
            sub_category = "mtech"

        elif any(
            x in question
            for x in [
                "lateral",
                "let"
            ]
        ):
            sub_category = "lateral"

        elif is_hostel:
            sub_category = "hostel"

        else:
            sub_category = "regular"

    # ----------------------------
    # HOSTEL
    # ----------------------------

    elif is_hostel:

        category = "hostel"

    # ----------------------------
    # PLACEMENT
    # ----------------------------

    elif is_placement:

        category = "placement"

    # ----------------------------
    # ADMISSION
    # ----------------------------

    elif is_admission:

        category = "admission"

    # ----------------------------
    # ADMINISTRATION
    # ----------------------------

    elif is_admin:

        category = "administration"

    # ----------------------------
    # RESULT
    # ----------------------------

    print("\nQUERY ANALYSIS:")
    print({
        "category": category,
        "sub_category": sub_category
    })

    return {
        "category": category,
        "sub_category": sub_category
    }