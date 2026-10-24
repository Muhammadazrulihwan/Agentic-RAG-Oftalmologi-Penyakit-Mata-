# OcularVision AI — Frontend

Next.js 16 (App Router) + Tailwind CSS 3 + TypeScript. Tampilan disalin dari export Stitch (`code.html`), tema Tailwind identik dengan `DESIGN.md`.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # opsional, default sudah http://127.0.0.1:8001
npm run dev                  # http://localhost:3000
```

Backend RAG (FastAPI, port 8001) harus berjalan. Jalur gambar juga butuh `eye-disease-api` (port 8000).

## Integrasi backend

| UI | Endpoint |
| --- | --- |
| Tab "Tanya Literatur JAIC" | `POST /chat` `{question}` |
| Tab "Uji Citra Fundus" | `POST /chat/image` (multipart `file`) |

- Klien API: `lib/api.ts` (URL dari `NEXT_PUBLIC_API_URL`)
- Sitasi `[Nama_File (1)]` di jawaban otomatis jadi badge: `lib/answer.ts`
- Penolakan diagnosis dikenali dari teks jawaban (`isRefusal`), karena backend belum mengirim field `route`
- CORS backend saat ini `*`; bila nanti dibatasi, tambahkan origin frontend

## Struktur

```
app/            layout, page, globals.css
components/     satu file per section + ChatWidget (client)
lib/            api.ts, answer.ts
```

## Catatan

- `INITIAL_MESSAGES` di `ChatWidget.tsx` berisi percakapan contoh dari desain; kosongkan array-nya bila tidak diperlukan.
- Gambar sampel (hero dan kartu "Sample #042") memakai URL googleusercontent dari export Stitch; ganti dengan aset sendiri di `public/` untuk produksi.
- Tautan placeholder dari desain: "Repository LangGraph" (`https://github.com`) dan `mailto:research@ocularvision.ai`.
