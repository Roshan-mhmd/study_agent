import os
import requests

from bs4 import BeautifulSoup
from urllib.parse import urljoin

from app.services.website_ingest import ingest_website
from app.services.document_service import process_document

BASE_URL = "https://lbscek.ac.in"

os.makedirs("documents", exist_ok=True)

response = requests.get(BASE_URL)

soup = BeautifulSoup(
    response.text,
    "html.parser"
)

links = []
pdf_links = []

# Collect all links
for link in soup.find_all("a"):

    href = link.get("href")

    if href:

        full_url = urljoin(
            BASE_URL,
            href
        )

        links.append(full_url)

        if full_url.lower().endswith(".pdf"):
            pdf_links.append(full_url)

unique_links = list(set(links))

print("\nTOTAL LINKS FOUND:")
print(len(unique_links))

print("\n===== PDF FILES FOUND =====")

for pdf in set(pdf_links):
    print(pdf)

# Download and ingest PDFs
print("\n===== DOWNLOADING PDFS =====")

for pdf_url in set(pdf_links):

    try:

        filename = pdf_url.split("/")[-1]

        save_path = os.path.join(
            "documents",
            filename
        )

        print(f"Downloading: {filename}")

        response = requests.get(
            pdf_url,
            timeout=30
        )

        response.raise_for_status()

        with open(
            save_path,
            "wb"
        ) as f:

            f.write(response.content)

        print(f"Processing: {filename}")

        process_document(
    save_path,
    source_url=pdf_url
)

    except Exception as e:

        print(f"Failed PDF: {pdf_url}")
        print(e)

BAD_EXTENSIONS = (
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".pdf",
    ".zip",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
)

# Scrape website pages
for url in unique_links:

    if url.lower().endswith(BAD_EXTENSIONS):
        continue

    try:

        print(f"Scraping: {url}")

        response = requests.get(
            url,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        content = soup.get_text(
            separator="\n",
            strip=True
        )

        page_name = (
            url.replace(
                "https://lbscek.ac.in/",
                ""
            )
            .replace(
                "http://lbscek.ac.in/",
                ""
            )
            .strip("/")
            .replace("-", " ")
            .title()
        )

        if not page_name:
            page_name = "Homepage"

            if len(content) > 500:

             print(
                f"Processing {page_name}"
            )

            ingest_website(
                content,
                page_name,
                url
            )

    except Exception as e:

        print(f"Failed: {url}")
        print(e)