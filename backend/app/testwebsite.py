from app.services.website_service import discover_pages

pages = discover_pages(
    "https://lbscek.ac.in",
    10
)

print(pages)
