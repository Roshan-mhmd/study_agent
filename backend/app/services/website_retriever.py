import requests
from bs4 import BeautifulSoup


PAGE_MAP = {
    "hostel": "https://lbscek.ac.in/hostel",
    "placement": "https://lbscek.ac.in/placements",
    "admission": "https://lbscek.ac.in/admission",
    "principal": "https://lbscek.ac.in/principal",
}


def retrieve_from_website(question):

    question = question.lower()

    page_url = None

    for keyword, url in PAGE_MAP.items():

        if keyword in question:
            page_url = url
            break

    if not page_url:
        return None

    try:

        response = requests.get(
            page_url,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        text = soup.get_text(
            separator="\n",
            strip=True
        )
        print(
    f"\nWEBSITE PAGE USED: {page_url}"
        )
        return {
            "url": page_url,
            "content": text[:12000]
        }

    except Exception as e:

        print(
            "WEBSITE RETRIEVAL ERROR:",
            e
        )

        return None