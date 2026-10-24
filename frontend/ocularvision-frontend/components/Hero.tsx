import OpenChatButton from "./OpenChatButton";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 hero-glow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Pill Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest border border-primary/20 shadow-sm text-primary font-label-md text-label-md">
            <span className="flex h-2 w-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-semibold">Riset JAIC Vol. 9 No. 4 (2025)</span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant">ResNet50 + XGBoost (92.03% Akurasi)</span>
          </div>
        </div>
        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-display-hero text-display-hero md:text-[56px] text-display-hero-mobile text-on-surface tracking-tight mb-6">
            Asisten Riset Oftalmologi Berbasis{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary-container bg-clip-text text-transparent">
              Agentic RAG
            </span>{" "}
            &amp; Klasifikasi Citra Fundus
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Platform kecerdasan buatan medis yang mengekstrak literatur ilmiah dengan sitasi terverifikasi, menganalisis 4 kondisi fundus
            mata tanpa halusinasi, dan menolak tegas diagnosis klinis pribadi demi integritas medis.
          </p>
        </div>
        {/* Hero Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <OpenChatButton className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-title-md text-title-md font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            <span>Mulai Uji Literatur</span>
          </OpenChatButton>
          <a
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-primary/30 bg-surface-container-lowest/80 backdrop-blur text-primary font-title-md text-title-md font-semibold hover:bg-surface-container-low transition-colors duration-150 flex items-center justify-center gap-2"
            href="#arsitektur"
          >
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span>Lihat Arsitektur Graph</span>
          </a>
        </div>
        {/* 4 Key Scientific Benchmarks Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          <div className="custom-glass p-5 rounded-2xl text-center">
            <div className="font-display-hero-mobile text-display-hero-mobile text-primary font-bold">92.03%</div>
            <div className="font-label-md text-label-md text-on-surface font-semibold mt-1">Akurasi XGBoost</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tertinggi dari 11 Algoritma JAIC</div>
          </div>
          <div className="custom-glass p-5 rounded-2xl text-center">
            <div className="font-display-hero-mobile text-display-hero-mobile text-secondary font-bold">4 Kondisi</div>
            <div className="font-label-md text-label-md text-on-surface font-semibold mt-1">Deteksi Fundus</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Normal, Katarak, Glaukoma, DR</div>
          </div>
          <div className="custom-glass p-5 rounded-2xl text-center">
            <div className="font-display-hero-mobile text-display-hero-mobile text-tertiary-container font-bold">0%</div>
            <div className="font-label-md text-label-md text-on-surface font-semibold mt-1">Halusinasi Bebas</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Strict Grounding Check Loop</div>
          </div>
          <div className="custom-glass p-5 rounded-2xl text-center">
            <div className="font-display-hero-mobile text-display-hero-mobile text-primary font-bold">Hybrid</div>
            <div className="font-label-md text-label-md text-on-surface font-semibold mt-1">Dual Retrieval</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">BM25 (0.5) + Vector (0.5) k=4</div>
          </div>
        </div>
        {/* Hero Visual Mockup: Glassmorphic Interactive Split Preview */}
        <div className="max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-primary/15 via-white/40 to-surface-container-high/60 shadow-2xl">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden shadow-inner">
            {/* Mockup Window Bar */}
            <div className="px-5 py-3.5 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error/60 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-container/60 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-primary/60 inline-block"></span>
                <span className="ml-3 font-code-metric text-code-metric text-on-surface-variant font-mono text-xs">
                  OcularVision Agentic Orchestrator v2.4 (LangGraph · ChromaDB)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-label-md font-semibold text-primary">
                  {" "}
                  Gemini 2.5 Flash{" "}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-label-md font-bold">
                  {" "}
                  GROUNDED VERIFIED{" "}
                </span>
              </div>
            </div>
            {/* Mockup Content Canvas */}
            <div className="p-6 md:p-8 grid md:grid-cols-12 gap-6 bg-gradient-to-b from-surface-container-lowest to-surface-bright">
              {/* Left: RAG Chat Literature Stream (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 font-bold text-xs">
                    MD
                  </div>
                  <div className="bg-surface-container-low p-3.5 rounded-2xl rounded-tl-sm text-on-surface text-body-sm font-body-sm border border-outline-variant/20 max-w-lg">
                    Metode apa yang digunakan untuk ekstraksi fitur citra retina dalam riset Anda?
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">neurology</span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-2xl rounded-tl-sm text-on-surface text-body-sm font-body-sm border border-primary/20 shadow-sm space-y-2.5">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Sintesis Literatur JAIC (Grounded 100%)</span>
                    </div>
                    <p className="text-on-surface-variant">
                      Riset memanfaatkan arsitektur <strong className="text-on-surface font-semibold">ResNet-50</strong> yang telah
                      di-pretrained pada ImageNet untuk ekstraksi fitur representasi spasial citra fundus berdimensi 2048, yang kemudian
                      diklasifikasikan menggunakan 11 model perbandingan machine learning.
                    </p>
                    {/* Citation Badges */}
                    <div className="pt-2 border-t border-outline-variant/30 flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-surface-container-low border border-primary/25 text-primary text-[11px] font-code-metric font-mono flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">library_books</span>[Azrul_1835-1845 (Hal. 3)]
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant text-[11px] font-label-md">
                        {" "}
                        Cosine Sim: 0.892{" "}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed text-[11px] font-label-md">
                        {" "}
                        BM25 Rank: #1{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Fundus Tool Output Sample (5 cols) */}
              <div className="md:col-span-5 bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">radiology</span>Jalur Analisis Fundus
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                      {" "}
                      Simulasi Riset{" "}
                    </span>
                  </div>
                  {/* Dark Container for Clinical Fundus Presentation */}
                  <div className="relative bg-[#0B0F19] rounded-xl overflow-hidden h-36 border border-outline/30 flex items-center justify-center group">
                    <img
                      className="w-full h-full object-cover opacity-85"
                      alt="A clinically precise, dark-mode ophthalmology retina fundus scan display. High-resolution medical imaging showing the optic disc, macular center, and retinal vascular tree under clear diagnostic optical illumination. Modern cyan and magenta medical bounding overlay indicators mark the foveal region, presented in a clean laboratory interface."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWOPyz3dahkTf3EysktB2i0YQigy51nmUUhsshhn5Z72zQHdjzXDQKCBgjXBqJFijC2XCo8nqItLavJam15kp_M7j95n8cdk3iYfiUEzb16l4rLpvvsuBO6iUBNv2op0D9OPeoaq9yJ5Fi-8hkvtXAMjithni_OEMUygf87ap01gj9LaIhUgTeBAG5vIY1ZqCbFJKhUjncpMfvgZyF86wjLM3T8Izdt3WshL6_WFYQYT-ikGxdT8LQ"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>
                    {/* Vector Bounding Tag Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur border border-cyan-400/30 text-white text-[11px] font-mono">
                      <span className="flex items-center gap-1 text-tertiary-fixed-dim">
                        <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim inline-block animate-ping"></span>ResNet50 Embed: 2048-D
                      </span>
                      <span className="text-yellow-300 font-bold">Inference: 142ms</span>
                    </div>
                  </div>
                  {/* Diagnostic Prediction Breakdown */}
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-on-surface">Prediksi: Katarak Senilis</span>
                      <span className="font-bold text-primary font-mono">94.8% Confidence</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: "94.8%" }}></div>
                    </div>
                  </div>
                </div>
                {/* Disclaimer Pill Footer */}
                <div className="mt-4 p-2.5 rounded-xl bg-surface-container-highest/60 border border-outline-variant/30 text-[11px] text-on-surface-variant flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0">info</span>
                  <span>Alat pembuktian konsep riset akademis JAIC. Bukan pengganti diagnosis oftalmologis berlisensi.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
