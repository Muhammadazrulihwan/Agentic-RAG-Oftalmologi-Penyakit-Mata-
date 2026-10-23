from typing import Literal
from pydantic import BaseModel, Field


class RouteDecision(BaseModel):
    """Keputusan routing pertanyaan pengguna."""
    route: Literal["literature", "classification", "reject"] = Field(
        description=(
            "literature: pertanyaan tentang isi paper/literatur riset. "
            "classification: pengguna mengunggah gambar dan minta analisis/klasifikasi citra. "
            "reject: permintaan diagnosis atau saran pengobatan pribadi yang tidak bisa dijawab sistem ini."
        )
    )
    reason: str = Field(description="Alasan singkat pemilihan rute ini.")


class GradeDocuments(BaseModel):
    """Penilaian relevansi satu dokumen terhadap pertanyaan."""
    binary_score: Literal["yes", "no"] = Field(
        description="'yes' jika dokumen relevan untuk menjawab pertanyaan, 'no' jika tidak."
    )


class GroundingCheck(BaseModel):
    """Pengecekan apakah jawaban benar-benar didukung oleh dokumen sumber."""
    grounded: Literal["yes", "no"] = Field(
        description="'yes' jika setiap klaim di jawaban didukung konteks, 'no' jika ada klaim yang mengada-ada."
    )
    reason: str = Field(description="Alasan singkat penilaian ini.")
