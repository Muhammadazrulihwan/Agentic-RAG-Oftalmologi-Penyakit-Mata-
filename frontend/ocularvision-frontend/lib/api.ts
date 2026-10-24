const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001").replace(/\/$/, "");
const TIMEOUT_MS = 120_000;

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
  ) {
    super(`HTTP ${status}`);
  }
}

async function readAnswer(res: Response): Promise<string> {
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      /* body bukan JSON */
    }
    throw new ApiError(res.status, detail);
  }
  const data = await res.json();
  return String(data.answer ?? "");
}

/** POST /chat — jalur literatur / reject */
export async function askLiterature(question: string): Promise<string> {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return readAnswer(res);
}

/** POST /chat/image — jalur klasifikasi citra fundus (multipart) */
export async function askWithImage(file: File, question?: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  if (question?.trim()) form.append("question", question.trim());
  const res = await fetch(`${BASE}/chat/image`, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return readAnswer(res);
}

/** Pesan error yang ramah untuk ditampilkan di UI. */
export function describeError(e: unknown): string {
  if (e instanceof ApiError) {
    if (e.status === 422) return "Masukan tidak valid. Periksa pertanyaan atau berkas gambar Anda.";
    if (e.status === 503) return e.detail || "Layanan klasifikasi sedang tidak tersedia.";
    if (e.status >= 500)
      return "Backend mengembalikan error server. Pastikan layanan RAG (port 8001) dan eye-disease-api (port 8000) sedang berjalan.";
    return e.detail || `Permintaan gagal (HTTP ${e.status}).`;
  }
  if (e instanceof DOMException && (e.name === "TimeoutError" || e.name === "AbortError"))
    return "Permintaan melewati batas waktu. Coba lagi sebentar lagi.";
  return `Tidak dapat terhubung ke backend (${BASE}). Pastikan server FastAPI berjalan.`;
}
