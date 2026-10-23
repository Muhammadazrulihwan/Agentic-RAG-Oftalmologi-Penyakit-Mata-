import os
import httpx
from langchain_core.tools import tool

from app.config import EYE_DISEASE_API_URL


@tool
async def classify_fundus_image(image_path: str) -> dict:
    """Klasifikasikan penyakit mata dari citra fundus yang diunggah pengguna.
    Gunakan tool ini ketika pengguna mengunggah gambar dan meminta analisis atau klasifikasi.
    Input: path file gambar lokal yang sudah disimpan sementara oleh backend.
    Output: nama penyakit dan confidence score dalam persen (bukan diagnosis klinis)."""
    with open(image_path, "rb") as f:
        files = {"file": (os.path.basename(image_path), f, "image/jpeg")}
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(EYE_DISEASE_API_URL, files=files)
    response.raise_for_status()
    data = response.json()["result"]
    return {"disease": data["disease"], "confidence_percent": data["confidence"]}
