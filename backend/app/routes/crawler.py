from fastapi import APIRouter
from pydantic import BaseModel

from app.services.website_service import crawl_website

router = APIRouter()


class CrawlRequest(BaseModel):
    url: str


@router.post("/crawl")
def crawl(data: CrawlRequest):

    result = crawl_website(
        data.url
    )

    return {
        "message": "Website indexed successfully.",
        "data": result
    }