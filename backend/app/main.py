import shutil
import tempfile
from pathlib import Path

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.graph import rag_graph

app = FastAPI(title="Agentic RAG - Asisten Riset Oftalmologi")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


def _initial_state(question: str, image_path=None):
    return {
        "question": question,
        "image_path": image_path,
        "rewrite_count": 0,
        "generation_count": 0,
        "documents": [],
        "classification_result": None,
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
async def chat(payload: ChatRequest):
    result = rag_graph.invoke(_initial_state(payload.question))
    return {"answer": result["answer"]}


@app.post("/chat/image")
async def chat_with_image(question: str = Form(""), file: UploadFile = File(...)):
    suffix = Path(file.filename).suffix or ".jpg"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        result = rag_graph.invoke(
            _initial_state(question or "Tolong jelaskan hasil analisis citra ini.", tmp_path)
        )
    finally:
        Path(tmp_path).unlink(missing_ok=True)

    return {"answer": result["answer"]}
