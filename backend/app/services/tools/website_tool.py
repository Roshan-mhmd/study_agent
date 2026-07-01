import time

from app.services.website_retriever import retrieve_from_website


def website_tool(question, history=None):

    start = time.time()

    print("\n========== WEBSITE TOOL ==========")

    website = retrieve_from_website(question)

    elapsed = round(
        time.time() - start,
        3
    )

    if not website:

        return {

            "success": False,

            "tool": "website",

            "context": "",

            "sources": [],

            "results": [],

            "confidence": 0,

            "metadata": {

                "retrieval_time": elapsed

            }

        }

    return {

        "success": True,

        "tool": "website",

        "context": website["content"],

        "sources": [

            {

                "name": website["url"],

                "url": website["url"]

            }

        ],

        "results": [],

        "confidence": 1,

        "metadata": {

            "retrieval_time": elapsed

        }

    }