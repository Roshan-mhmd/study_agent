from collections import deque
from urllib.parse import urljoin, urlparse
from app.utils.chunker import chunk_text
import requests
from bs4 import BeautifulSoup
from app.repositories.qdrant_repository import store_chunks
from app.services.embedding_service import generate_embedding

def discover_pages(start_url, max_pages=30):

    visited = set()

    queue = deque([start_url])

    pages = []

    domain = urlparse(start_url).netloc

    while queue and len(pages) < max_pages:

        url = queue.popleft()

        if url in visited:
            continue

        visited.add(url)

        try:

            response = requests.get(
                url,
                timeout=10
            )

            if response.status_code != 200:
                continue

            pages.append(url)

            soup = BeautifulSoup(
                response.text,
                "html.parser"
            )

            for link in soup.find_all("a", href=True):

                absolute = urljoin(
                    url,
                    link["href"]
                )

                parsed = urlparse(
                    absolute
                )

                if parsed.netloc != domain:
                    continue

                absolute = absolute.split("#")[0]

                if absolute not in visited:

                    queue.append(
                        absolute
                    )

        except Exception as e:

            print(e)

    return pages

def extract_text(url):

    try:

        response = requests.get(
            url,
            timeout=10
        )

        if response.status_code != 200:
            return ""

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Remove unwanted tags
        for tag in soup([
            "script",
            "style",
            "noscript",
            "svg",
            "footer"
        ]):
            tag.decompose()

        text = soup.get_text(
            separator=" ",
            strip=True
        )

        return text

    except Exception as e:

        print(e)

        return ""
    



def crawl_website(
    start_url,
    max_pages=30
):

    pages = discover_pages(
        start_url,
        max_pages
    )

    total_chunks = 0

    for page in pages:

        print(f"Crawling {page}")

        text = extract_text(page)

        if not text:
            continue

        chunks = chunk_text(text)

        total_chunks += store_chunks(

            chunks=chunks,

            embedding_function=generate_embedding,

            source_type="website",

            url=page

        )

    return {

        "pages": len(pages),

        "chunks": total_chunks

    }