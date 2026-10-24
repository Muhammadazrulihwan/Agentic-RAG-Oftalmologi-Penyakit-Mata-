# PRD - Agentic RAG Asisten Riset Oftalmologi

Oct 24, 2026 · @Muhammad Azrul Ihwan

## Ringkasan dan latar belakang

Produk ini adalah asisten riset agentic RAG yang menjawab pertanyaan literatur oftalmologi dengan sitasi sumber, menolak permintaan diagnosis pribadi, dan menganalisis citra fundus lewat model klasifikasi dari riset penulis sendiri.

Chatbot dokumen biasa (muat PDF lalu bertanya) punya tiga kelemahan untuk domain medis. Ia bisa mengarang jawaban saat dokumen tidak memuatnya, tidak membedakan pertanyaan literatur dari permintaan medis pribadi, dan tidak bisa menggabungkan keluaran model ML dengan konteks riset. Proyek ini menjawab ketiganya dengan alur LangGraph yang memilih jalur, menilai hasil pencarian, dan memeriksa jawabannya sendiri.

Peluangnya datang dari riset penulis yang terbit di JAIC (Vol. 9, No. 4, Agustus 2025, hlm. 1835-1845) tentang klasifikasi empat kondisi mata: Normal, Diabetic Retinopathy, Glaucoma, dan Cataract. Ekstraksi fitur memakai ResNet50, dan XGBoost menjadi model terbaik dengan akurasi 92,03% pada tabel perbandingan 11 algoritma. Model itu sudah berjalan sebagai layanan terpisah (`eye-disease-api`), sehingga tinggal dibungkus sebagai tool.

Proyek ini juga berfungsi sebagai portofolio untuk melamar kerja, jadi nilai jualnya adalah kombinasi tiga lapisan: ML (model klasifikasi), LLM engineering (LangGraph, retrieval, evaluasi), dan backend (FastAPI).

## Tujuan, non-tujuan, dan pengguna

Sasaran utamanya adalah sistem yang jujur tentang batasannya: menjawab hanya dari dokumen, dan berkata "tidak ditemukan" bila dokumen diam.

**Tujuan**

- Menjawab pertanyaan literatur oftalmologi dengan sitasi sumber dan tanpa halusinasi.
- Menolak permintaan diagnosis atau saran pengobatan pribadi dengan penjelasan yang sopan.
- Menganalisis citra fundus lewat model klasifikasi, lalu memadukan hasilnya dengan konteks literatur.
- Menjadi proyek portofolio yang bisa dijalankan orang lain, lengkap dengan README, arsitektur, dan angka evaluasi.

**Non-tujuan**

- Bukan alat diagnosis klinis. Keluaran klasifikasi hanya alat bantu riset.
- Bukan pengganti dokter atau panduan terapi.
- Bukan sistem multi-pengguna produksi: tanpa autentikasi, riwayat percakapan, atau penyimpanan data pasien pada versi ini.
- Tidak melatih ulang atau memperbarui model klasifikasi.

**Pengguna dan use case**

| Pengguna | Kebutuhan | Contoh pertanyaan |
| --- | --- | --- |
| Mahasiswa atau peneliti informatika medis | Mencari metode, dataset, dan hasil dari paper | "Metode apa yang dipakai untuk ekstraksi fitur?" |
| Peneliti yang menguji model | Mengunggah citra fundus dan melihat label serta kepercayaan model | Unggah citra katarak, tanya hasil analisisnya |
| Recruiter dan reviewer teknis | Menilai kualitas rekayasa sistem | Menjalankan demo, membaca README dan metrik evaluasi |
| Pengguna awam yang salah paham tujuan sistem | Bertanya soal keluhan pribadi | "Mata saya perih, obatnya apa?" (harus ditolak) |

## Kebutuhan fungsional

Sistem harus memenuhi sembilan kebutuhan di bawah ini. Lima sudah teruji, tiga sudah terpasang di graph tetapi belum diuji terpisah, dan satu (klasifikasi gambar) masih dalam pengujian.

| ID | Kebutuhan | Kriteria penerimaan | Status |
| --- | --- | --- | --- |
| F1 | Router tiga jalur | Keluaran terstruktur (Pydantic): `literature`, `classification`, `reject`. Bila ada gambar, jalur `classification` dipilih langsung tanpa LLM. | Teruji |
| F2 | Hybrid retrieval | Gabungan vektor (Chroma, embedding Gemini) dan BM25, bobot 0,5 : 0,5, `k` = 4 per retriever. | Teruji |
| F3 | Grading dokumen | Tiap potongan dinilai `yes` atau `no` terhadap pertanyaan; hanya yang `yes` dipakai menjawab. | Terimplementasi |
| F4 | Tulis ulang query | Bila tidak ada dokumen relevan, query ditulis ulang dan dicari lagi, maksimal 2 kali (`MAX_QUERY_REWRITES`). | Terimplementasi |
| F5 | Jawaban bersitasi | Jawaban hanya dari konteks dan menyertakan sumber. Bila tidak ada di konteks, menjawab "tidak ditemukan". | Teruji |
| F6 | Cek grounding | LLM memeriksa apakah tiap klaim didukung konteks; bila tidak, jawaban dibuat ulang maksimal 1 kali (`MAX_GENERATION_RETRIES`). | Terimplementasi |
| F7 | Penolakan diagnosis pribadi | Pertanyaan seperti "mata saya perih, obatnya apa?" dijawab dengan penolakan sopan dan arahan ke dokter mata. | Teruji |
| F8 | Tool klasifikasi citra fundus | Menerima file gambar, memanggil `eye-disease-api` lewat HTTP, mengembalikan label dan persentase kepercayaan, lalu hasilnya dipadukan dengan konteks literatur. | Dalam pengujian |
| F9 | Ingestion paper | Memuat semua PDF di `data/papers/`, memecah jadi potongan 800 karakter (overlap 150), dan membangun vector store lewat satu perintah. | Teruji |

Catatan perilaku: pada jalur `classification`, label hasil klasifikasi dipakai sebagai query tambahan ke retriever agar jawaban punya konteks riset, dan setiap keluaran klasifikasi ditandai "bukan diagnosis klinis".

## Kebutuhan non-fungsional

Kebutuhan terpenting di sini adalah batasan etika medis dan penanganan data gambar; performa dan keamanan masih setingkat pengembangan lokal.

| Aspek | Kebutuhan | Kondisi saat ini |
| --- | --- | --- |
| Etika medis | Setiap keluaran klasifikasi ditandai bukan diagnosis klinis; permintaan diagnosis dan pengobatan pribadi ditolak. | Terpenuhi lewat router dan prompt generate |
| Privasi gambar | Citra fundus tidak disimpan permanen dan tidak dikirim ke LLM. | Gambar ditulis ke file sementara, dihapus di blok `finally`, dan hanya dikirim ke `eye-disease-api`. LLM hanya menerima label dan persentase. |
| Rahasia | API key tidak masuk repositori. | Dibaca dari `.env`; `.env`, `.venv`, dan `chroma_db` masuk `.gitignore` |
| Keamanan akses | Endpoint publik wajib punya autentikasi dan CORS terbatas. | Belum: tanpa autentikasi, CORS `*`. Hanya layak untuk pengembangan lokal. |
| Keandalan | Loop agent tidak boleh berputar tanpa henti. | Terpenuhi: tulis ulang query maksimal 2 kali, generate ulang maksimal 1 kali; panggilan HTTP ke layanan klasifikasi punya timeout 30 detik |
| Performa | Jawaban literatur selesai dalam waktu yang wajar untuk demo. | Belum diukur. Target usulan: median di bawah 15 detik per pertanyaan. Grading memanggil LLM satu kali per potongan dokumen, sehingga latensi naik seiring jumlah potongan. |
| Biaya | Berjalan di tier gratis. | Gemini API tier gratis; risiko batas laju (rate limit) bila evaluasi menjalankan puluhan pertanyaan berturut-turut |
| Portabilitas | Orang lain bisa menjalankan dari README. | Terpenuhi untuk lingkungan lokal; Docker Compose belum ada |
| Konfigurasi | Parameter utama diubah tanpa mengubah kode. | Model LLM, model embedding, URL layanan klasifikasi, dan batas loop semuanya lewat `.env` |

## Arsitektur dan tech stack

&#91;embedded content: arsitektur dan alur graph · 3 jalur, 2 layanan\]

Sistem terdiri dari dua layanan terpisah. Backend RAG (port 8001) menjalankan graph di atas, dan hanya jalur klasifikasi yang memanggil `eye-disease-api` (port 8000) lewat HTTP `POST /predict`. Layanan itu mengembalikan label dan persentase kepercayaan, lalu hasilnya masuk ke tahap generate bersama potongan literatur tentang label tersebut. Pemisahan ini menjaga model berbasis TensorFlow tidak bercampur dengan dependensi LangChain, dan keduanya bisa di-deploy sendiri-sendiri.

| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Orkestrasi | LangGraph dan LangChain (LCEL, structured output, tools) | Alur bercabang dan berulang dengan batas eksplisit |
| LLM | Google Gemini `gemini-2.5-flash` | Tier gratis |
| Embedding | `models/gemini-embedding-001` | Satu-satunya keluarga embedding yang tersedia untuk API key penulis; `embedding-001` dan `text-embedding-004` menghasilkan `404` |
| Vector store | Chroma | Lokal, tanpa server tambahan |
| Pencarian kata kunci | BM25 (`rank_bm25`) | Menangkap istilah dan singkatan medis yang persis |
| API | FastAPI dan Uvicorn | Sama dengan layanan klasifikasi |
| Klasifikasi | ResNet50 (ekstraksi fitur) dan XGBoost | Hasil riset JAIC penulis |

## Spesifikasi API

Backend RAG membuka tiga endpoint pada port 8001; layanan klasifikasi (`eye-disease-api`, port 8000) hanya dipanggil oleh backend, bukan oleh klien.

| Method | Path | Masukan | Keluaran |
| --- | --- | --- | --- |
| GET | `/health` | tanpa | `{"status": "ok"}` |
| POST | `/chat` | JSON `{"question": string}` | `{"answer": string}` |
| POST | `/chat/image` | multipart: `file` (gambar, wajib), `question` (opsional) | `{"answer": string}` |

Bila `question` kosong pada `/chat/image`, sistem memakai pertanyaan bawaan "Tolong jelaskan hasil analisis citra ini."

Contoh permintaan dan respons untuk jalur literatur:

```bash
curl -X POST http://127.0.0.1:8001/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Metode apa yang digunakan untuk ekstraksi fitur dalam penelitian ini?"}'
```

```json
{
  "answer": "Metode ekstraksi fitur yang digunakan dalam penelitian ini adalah pre-trained transfer learning ResNet50.\n\n[Azrul_1835-1845 (1)]"
}
```

Contoh respons untuk permintaan yang ditolak router ("Mata saya perih obatnya apa?"):

```json
{
  "answer": "Maaf, saya tidak bisa memberikan diagnosis atau saran pengobatan pribadi. Saya bisa membantu menjelaskan literatur riset atau menganalisis citra fundus (hasilnya bukan diagnosis klinis). Untuk keluhan kesehatan, silakan konsultasi ke dokter mata."
}
```

**Penanganan error.** Validasi masukan menghasilkan `422` dari FastAPI. Kegagalan lain (misalnya `eye-disease-api` belum berjalan) saat ini muncul sebagai `500 Internal Server Error` tanpa pesan yang jelas, karena endpoint belum membungkus pemanggilan graph dengan penanganan error. Perbaikannya masuk roadmap.

## Metrik keberhasilan dan hasil pengujian

Pengujian manual pada satu paper (69 potongan) menunjukkan jawaban akurat dan tidak berhalusinasi pada dua dari tiga jalur (literatur dan penolakan); jalur klasifikasi gambar belum lolos, dan angka kuantitatif belum ada, dan itulah celah terbesar untuk portofolio.

**Hasil pengujian manual**

| Pertanyaan uji | Jalur | Hasil |
| --- | --- | --- |
| Metode ekstraksi fitur | Literatur (Colab dan backend) | Benar: ResNet50 pretrained, dengan sumber |
| Akurasi model yang dilaporkan | Literatur (Colab) | Benar dan lengkap (XGBoost 92,03%), tetapi terlalu panjang karena mencantumkan semua model |
| Dataset yang dipakai | Literatur (Colab) | Benar: Eye Diseases Dataset dari Kaggle |
| Pengobatan kanker paru-paru (di luar topik) | Literatur (Colab) | Benar: "Tidak ditemukan", tanpa mengarang |
| "Mata saya perih, obatnya apa?" | Reject (backend) | Benar: ditolak dengan arahan ke dokter mata |
| Unggah citra katarak | Klasifikasi (backend) | Belum lolos: `500` pada pengujian pertama, penyebab belum dipastikan |

**Metrik yang akan diukur**

Semua target di bawah adalah usulan awal, bukan hasil pengukuran. Set uji berisi 30 sampai 50 pertanyaan yang jawabannya diketahui penulis dari paper, ditambah minimal 10 pertanyaan di luar dokumen dan 10 permintaan diagnosis pribadi.

| Metrik | Cara ukur | Target usulan |
| --- | --- | --- |
| Faithfulness | RAGAS: klaim jawaban didukung konteks | 0,90 atau lebih |
| Answer relevancy | RAGAS: jawaban menjawab pertanyaan | 0,80 atau lebih |
| Context precision dan recall | RAGAS: potongan terambil relevan dan lengkap | 0,70 atau lebih |
| Akurasi penolakan | Pertanyaan di luar dokumen dan diagnosis pribadi ditolak atau dijawab "tidak ditemukan" | 100% pada set uji |
| Latensi | Median dan persentil ke-95 per pertanyaan | Median di bawah 15 detik |
| Peningkatan dari agentic | Skor RAG lurus (tahap 1) dibandingkan alur LangGraph (tahap 3) | Selisih positif pada faithfulness dan context precision |

Perbandingan RAG lurus dengan alur agentic adalah angka yang paling berguna untuk README, karena membuktikan bahwa kompleksitas tambahan memang memberi hasil.

## Risiko dan keterbatasan

Risiko yang paling mendesak adalah jalur klasifikasi yang belum lolos pengujian dan sitasi yang memakai nama file; yang paling berbahaya jangka panjang adalah salah tafsir hasil klasifikasi oleh pengguna.

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Jalur `/chat/image` belum lolos (`500`) | Fitur pembeda proyek tidak bisa didemokan | Pastikan `eye-disease-api` berjalan di port 8000, baca traceback, lalu tulis tes integrasi |
| Hasil klasifikasi disalahartikan sebagai diagnosis | Pengguna mengambil keputusan kesehatan dari keluaran model | Penanda "bukan diagnosis klinis" di setiap keluaran, router menolak diagnosis pribadi, dan keterbatasan model dijelaskan di README |
| Model dilatih pada satu dataset Kaggle empat kelas | Citra dari kamera atau klinik lain bisa salah diklasifikasikan; kelas di luar empat tidak dikenali | Sebutkan batas ini di antarmuka dan README; evaluasi pada citra luar dataset bila ada |
| Sitasi memakai nama file (mis. `Azrul_1835-1845 (1)`), bukan judul paper | Sitasi kurang meyakinkan; judul di notebook dan README awal juga berbeda dari judul di PDF ("Enhancing Eye Diseases Classification Using Imbalance Training & Machine Learning") | Buat pemetaan nama file ke judul, penulis, tahun, dan DOI saat ingestion |
| Hanya satu paper di koleksi | Retrieval antar-dokumen, grading, dan hybrid search belum teruji sungguhan | Tambah 5 sampai 10 paper open access (mis. PubMed Central) |
| Kegagalan layanan klasifikasi muncul sebagai `500` tanpa pesan | Sulit didiagnosis pengguna dan penguji | Bungkus pemanggilan graph dengan penanganan error; kembalikan `503` dengan pesan jelas; periksa `/health` layanan klasifikasi |
| Versi LangChain berubah cepat (mis. `langchain.retrievers` pindah ke `langchain_classic`; `langchain-community` dalam masa sunset) | Instalasi baru bisa gagal tanpa perubahan kode | Kunci versi di `requirements.txt` (saat ini tanpa versi) |
| Latensi dan batas laju tier gratis | Grading per potongan memperlambat jawaban; evaluasi puluhan pertanyaan bisa terkena rate limit | Grading dalam satu panggilan, cache hasil, jeda antar pertanyaan saat evaluasi |
| Tanpa autentikasi dan CORS `*` | Aman hanya di lokal; tidak boleh dipublikasikan apa adanya | Tambah API key atau autentikasi dan batasi origin sebelum deploy |
| Hak cipta PDF jurnal | Mengunggah PDF penerbit ke repo publik berisiko | PDF dikecualikan lewat `.gitignore`; pakai paper open access atau periksa kebijakan JAIC |
| Layanan klasifikasi belum ter-host (VPS lama kedaluwarsa) | Demo publik tidak bisa menjalankan jalur gambar | Pilih hosting baru atau jalankan keduanya lewat Docker Compose lokal untuk demo |

## Roadmap dan pertanyaan terbuka

Pekerjaan berikutnya dibagi empat fase berurutan; tiap fase punya gerbang yang harus lolos sebelum fase selanjutnya dimulai.

**Fase 1. Fondasi** (gerbang: ketiga jalur graph lolos tes)

- [ ] Jalankan `eye-disease-api` dan loloskan tes `/chat/image` dengan citra uji
- [ ] Bungkus pemanggilan graph dengan penanganan error dan kembalikan `503` yang jelas
- [ ] Buat pemetaan nama file ke judul, penulis, tahun, dan DOI untuk sitasi
- [ ] Kunci versi paket di `requirements.txt`

**Fase 2. Perkuat retrieval** (gerbang: koleksi 6 paper atau lebih, retrieval antar-dokumen teruji)

- [ ] Tambah 5 sampai 10 paper open access
- [ ] Cache indeks BM25 ke disk
- [ ] Ubah grading menjadi satu panggilan per pertanyaan
- [ ] Coba reranking hasil retrieval

**Fase 3. Evaluasi** (gerbang: tabel metrik masuk README)

- [ ] Susun set uji: 30 sampai 50 pertanyaan, 10 di luar dokumen, 10 permintaan diagnosis
- [ ] Ukur dengan RAGAS atau LangSmith
- [ ] Bandingkan RAG lurus dengan alur agentic dan tampilkan selisihnya

**Fase 4. Produk dan demo** (gerbang: demo publik bisa dicoba tanpa clone repo)

- [ ] Frontend React: unggah gambar, tampilan sitasi, dan disclaimer medis
- [ ] Docker Compose untuk tiga layanan (klasifikasi, backend RAG, frontend)
- [ ] Autentikasi sederhana dan CORS terbatas
- [ ] Hosting demo dan tautan di README

**Pertanyaan terbuka**

- Di mana dua layanan akan di-host, mengingat RAM yang dibutuhkan ResNet50 dan VPS lama sudah kedaluwarsa?
- Apakah kebijakan JAIC mengizinkan PDF paper berada di repositori publik?
- Metadata resmi apa yang dipakai untuk sitasi (judul, penulis, DOI)?
- Bahasa antarmuka frontend: Indonesia, Inggris, atau keduanya?
