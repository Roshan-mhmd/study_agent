from fastapi import FastAPI
from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from app.routes.documents import router as documents_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes import document_routes
from app.routes import manual_knowledge
from app.routes import crawler
from app.routes import statistics
from app.repositories.qdrant_repository import create_payload_indexes
app = FastAPI()
app.include_router(document_routes.router)
app.include_router(manual_knowledge.router)
app.include_router(crawler.router)
app.include_router(statistics.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
create_payload_indexes()
app.include_router(upload_router)

app.include_router(chat_router)
app.include_router(documents_router)

@app.get("/")
def home():
    return {
        "message": "Campus Knowledge Agent Running"
    }