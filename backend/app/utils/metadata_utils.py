def get_metadata(
    document_name=None,
    page=None,
    url=None
):

    name = " ".join(
        filter(
            None,
            [
                document_name,
                page,
                url
            ]
        )
    ).lower()

    metadata = {
        "category": "general",
        "sub_category": None
    }

    # FEES
    if any(
        x in name
        for x in [
            "fee",
            "fees",
            "tuition",
            "nri"
        ]
    ):
        metadata["category"] = "fees"

        if "nri" in name:
            metadata["sub_category"] = "nri"

        elif "mtech" in name:
            metadata["sub_category"] = "mtech"

        elif any(
            x in name
            for x in [
                "let",
                "lateral"
            ]
        ):
            metadata["sub_category"] = "lateral"

        else:
            metadata["sub_category"] = "regular"

    elif "hostel" in name:
        metadata["category"] = "hostel"

    elif any(
        x in name
        for x in [
            "placement",
            "cgpu",
            "career"
        ]
    ):
        metadata["category"] = "placement"

    elif any(
        x in name
        for x in [
            "admission",
            "prospectus",
            "keam"
        ]
    ):
        metadata["category"] = "admission"

    elif any(
        x in name
        for x in [
            "principal",
            "director",
            "dean",
            "administrative",
            "administration",
            "mandatory_disclosure"
        ]
    ):
        metadata["category"] = "administration"

    return metadata