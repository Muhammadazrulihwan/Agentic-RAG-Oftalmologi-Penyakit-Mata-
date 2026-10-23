# Agentic RAG - Asisten Riset Oftalmologi

## Setup

1. `pip install -r requirements.txt`
2. Salin `.env.example` jadi `.env`, isi `GOOGLE_API_KEY` dan `EYE_DISEASE_API_URL`
   (URL tempat `eye-disease-api` kamu berjalan, misal `http://localhost:8000/predict`).
3. Taruh file PDF paper riset di `data/papers/`.
4. Build vector store: `python -m app.ingestion`
5. Jalankan `eye-disease-api` di terminal terpisah (service yang sudah ada).
6. Jalankan backend ini: `uvicorn app.main:app --reload --port 8001`

## Endpoint

- `GET /health`
- `POST /chat` — body `{"question": "..."}`
- `POST /chat/image` — multipart form, field `file` (gambar) + opsional `question`

## Struktur

- `app/ingestion.py` — load PDF, split, build/load Chroma vector store
- `app/retriever.py` — hybrid retriever (vector + BM25)
- `app/schemas.py` — structured output untuk router, grader, grounding check
- `app/tools.py` — tool klasifikasi (panggil eye-disease-api lewat HTTP)
- `app/graph.py` — LangGraph: router -> retrieve -> grade -> rewrite loop -> generate -> cek grounding
- `app/main.py` — FastAPI endpoint
