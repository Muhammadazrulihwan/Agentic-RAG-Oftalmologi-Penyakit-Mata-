import OpenChatButton from "./OpenChatButton";

export default function ArchitectureSection() {
  return (
    <section className="py-20 bg-surface-container-low/50 relative" id="arsitektur">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold mb-4">
            <span className="material-symbols-outlined text-[16px]">account_tree</span>Orkestrasi State Machine
          </div>
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-headline-lg-mobile text-on-surface mb-4">
            Alur Kerja Agentic RAG 3 Jalur
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Setiap masukan melalui verifikasi terstruktur sebelum menghasilkan jawaban, menjamin akuntabilitas akademis sesuai metodologi
            jurnal JAIC.
          </p>
        </div>
        {/* 4-Step Horizontal Cards with Connecting Logic */}
        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center font-display-hero-mobile text-sm mb-4 shadow-md shadow-primary/20">
              01
            </div>
            <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Input &amp; Pydantic Router</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
              Menganalisis intensi prompt ke dalam 3 cabang: <span className="font-semibold text-primary">Jalur Literatur</span>,{" "}
              <span className="font-semibold text-secondary">Klasifikasi Citra Fundus</span>, atau{" "}
              <span className="font-semibold text-error">Reject Klinis</span>.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-surface-container-high text-[11px] font-mono text-on-surface font-medium">
              node: question_router
            </div>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-secondary text-white font-bold flex items-center justify-center font-display-hero-mobile text-sm mb-4 shadow-md shadow-secondary/20">
              02
            </div>
            <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Hybrid Retrieval</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
              Mengambil 4 potongan dokumen relevan (k=4) menggabungkan kepadatan kata kunci{" "}
              <span className="font-semibold text-on-surface">BM25 (50%)</span> dan semantik{" "}
              <span className="font-semibold text-on-surface">Gemini Vector (50%)</span>.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-surface-container-high text-[11px] font-mono text-on-surface font-medium">
              node: hybrid_retrieve
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container text-white font-bold flex items-center justify-center font-display-hero-mobile text-sm mb-4 shadow-md shadow-tertiary-container/20">
              03
            </div>
            <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Grading &amp; Rewrite Loop</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
              Mengevaluasi apakah dokumen memuat jawaban. Jika skor relevansi rendah, kueri di-rewrite otomatis (maksimal 2 iterasi) demi
              presisi.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-surface-container-high text-[11px] font-mono text-on-surface font-medium">
              node: grade_documents
            </div>
          </div>
          {/* Step 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-white font-bold flex items-center justify-center font-display-hero-mobile text-sm mb-4 shadow-md shadow-primary-container/20">
              04
            </div>
            <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Grounded Synthesis</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
              Sintesis jawaban strictly grounded dengan sitasi bernomor{" "}
              <span className="font-mono font-semibold text-primary">[Azrul_1835-1845]</span> serta verifikasi kesesuaian fakta bebas
              halusinasi.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-surface-container-high text-[11px] font-mono text-on-surface font-medium">
              node: generate_grounded
            </div>
          </div>
        </div>
        {/* State Diagram Card Insert */}
        <div className="mt-10 p-6 rounded-2xl custom-glass border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[28px]">schema</span>
            </div>
            <div>
              <h5 className="font-title-md text-title-md font-bold text-on-surface">Kondisi Khusus: Tolak Konsultasi Gejala Pribadi</h5>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Jika router mendeteksi kueri bersifat pertolongan medis pertama, graph melompati tahap retrieve dan langsung menghasilkan
                respon etis:{" "}
                <em className="text-on-surface font-medium">
                  &quot;Saya adalah asisten riset akademis, bukan dokter spesialis mata...&quot;
                </em>
              </p>
            </div>
          </div>
          <OpenChatButton
            prompt="Mata saya perih dan buram sejak kemarin, obat apa yang harus saya minum?"
            className="shrink-0 px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-error/30 text-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md transition-colors flex items-center gap-1.5 font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            <span>Simulasi Uji Reject</span>
          </OpenChatButton>
        </div>
      </div>
    </section>
  );
}
