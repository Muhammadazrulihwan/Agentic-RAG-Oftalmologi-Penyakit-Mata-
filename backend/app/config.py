import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
EYE_DISEASE_API_URL = os.getenv("EYE_DISEASE_API_URL", "http://localhost:8000/predict")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
PAPERS_DIR = os.getenv("PAPERS_DIR", "./data/papers")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "models/gemini-embedding-001")
LLM_MODEL = os.getenv("LLM_MODEL", "gemini-2.5-flash")
MAX_QUERY_REWRITES = int(os.getenv("MAX_QUERY_REWRITES", "2"))
MAX_GENERATION_RETRIES = int(os.getenv("MAX_GENERATION_RETRIES", "1"))

if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY belum diset. Salin .env.example jadi .env dan isi key-nya.")
