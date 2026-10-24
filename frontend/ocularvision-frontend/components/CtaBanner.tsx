import OpenChatButton from "./OpenChatButton";

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <div className="rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-container p-8 md:p-14 text-white text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold uppercase tracking-wider">
            {" "}
            Eksplorasi Interaktif Sekarang{" "}
          </span>
          <h2 className="font-headline-lg text-headline-lg md:text-[42px] text-headline-lg-mobile font-bold text-white leading-tight">
            Coba Asisten Riset Oftalmologi Berbasis Agentic RAG
          </h2>
          <p className="font-body-md text-body-md text-white/90">
            Uji langsung pertanyaan seputar metodologi jurnal JAIC, verifikasi sitasi otomatis, atau simulasikan klasifikasi citra fundus
            mata.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <OpenChatButton className="px-8 py-3.5 rounded-xl bg-surface-container-lowest text-primary font-title-md text-title-md font-bold shadow-lg hover:bg-surface-bright active:scale-95 transition-all">
              Luncurkan Widget Asisten
            </OpenChatButton>
            <a
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-title-md text-title-md font-semibold transition-colors flex items-center gap-2"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[20px]">code</span>Repository LangGraph
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
