export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6" id="tentang">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md mb-4 font-semibold">
          <span className="material-symbols-outlined text-[16px]">warning</span>Limitasi RAG Konvensional
        </div>
        <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-headline-lg-mobile text-on-surface mb-4">
          Mengapa RAG Standar Berbahaya untuk Literatur Oftalmologi?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Dalam domain klinis dan riset medis, halusinasi sebesar 1% pun tidak dapat ditoleransi. OcularVision AI menggantikan pipeline
          generik dengan kontrol deterministik LangGraph.
        </p>
      </div>
      {/* Bento Grid Comparison 3 Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Halusinasi vs Grounding */}
        <div className="custom-glass rounded-3xl p-8 hover:translate-y-[-4px] transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-[28px]">fact_check</span>
          </div>
          <div className="text-xs font-mono font-semibold text-error mb-1">MASALAH: HALUSINASI GENERATIF</div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">RAG Biasa Menebak Fakta Medis</h3>
          <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">
            LLM konvensional kerap menggabungkan ingatan training acak saat dokumen referensi tidak memuat jawaban spesifik terkait dosis
            atau metodologi.
          </p>
          <div className="p-4 rounded-xl bg-surface-bright border border-primary/20 space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>Solusi OcularVision Agent:
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Evaluator dokumen otomatis (Document Grader). Jika informasi tidak ada di JAIC paper, asisten menolak menjawab daripada
              berspekulasi.
            </p>
          </div>
        </div>
        {/* Card 2: Permintaan Diagnosis vs Router Etis */}
        <div className="custom-glass rounded-3xl p-8 hover:translate-y-[-4px] transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary mb-6">
            <span className="material-symbols-outlined text-[28px]">policy</span>
          </div>
          <div className="text-xs font-mono font-semibold text-error mb-1">MASALAH: RESIKO MALPRAKTIK BOT</div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">Menerima Keluhan Gejala Pasien</h3>
          <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">
            Bot medis tanpa router acap kali memberikan anjuran obat mandiri saat user bertanya &quot;Mata saya buram dan berair, harus
            minum apa?&quot;.
          </p>
          <div className="p-4 rounded-xl bg-surface-bright border border-secondary/20 space-y-2">
            <div className="text-xs font-bold text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">gavel</span>Solusi OcularVision Agent:
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Pydantic Query Router mendeteksi konsultasi gejala dan seketika mengeksekusi respons penolakan etis dan merujuk ke dokter
              spesialis mata (Sp.M).
            </p>
          </div>
        </div>
        {/* Card 3: Multimodal Silo vs ResNet50 XGBoost Tool */}
        <div className="custom-glass rounded-3xl p-8 hover:translate-y-[-4px] transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary-container mb-6">
            <span className="material-symbols-outlined text-[28px]">biotech</span>
          </div>
          <div className="text-xs font-mono font-semibold text-error mb-1">MASALAH: TEKS &amp; CITRA TERPISAH</div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">Inkapabilitas Verifikasi Citra</h3>
          <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">
            Peneliti tidak dapat memverifikasi temuan literatur secara simultan dengan pipeline inferensi bobot citra retina fundus di satu
            tempat.
          </p>
          <div className="p-4 rounded-xl bg-surface-bright border border-primary-container/20 space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>Solusi OcularVision Agent:
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Integrasi tool LangGraph langsung ke FastAPI model ResNet-50 + XGBoost (92.03%), memvalidasi citra fundus secara deterministik
              dalam milidetik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
