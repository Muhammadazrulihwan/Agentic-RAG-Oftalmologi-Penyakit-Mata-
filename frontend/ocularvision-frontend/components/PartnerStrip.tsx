export default function PartnerStrip() {
  return (
    <section className="border-y border-outline-variant/20 bg-surface-container-lowest py-8">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center font-label-md text-label-md text-outline uppercase tracking-wider mb-6">
          Didukung Arsitektur Riset Teruji &amp; Ekosistem AI Modern
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-primary text-[28px]">article</span>
            <span>JAIC Journal 2025</span>
          </div>
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-secondary text-[28px]">database</span>
            <span>ChromaDB Vector</span>
          </div>
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-tertiary-container text-[28px]">auto_awesome</span>
            <span>Google Gemini 2.5</span>
          </div>
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-primary text-[28px]">bolt</span>
            <span>FastAPI Engine</span>
          </div>
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-secondary text-[28px]">hub</span>
            <span>LangGraph State</span>
          </div>
          <div className="flex items-center gap-2 font-headline-sm text-headline-sm font-bold text-on-surface">
            <span className="material-symbols-outlined text-primary text-[28px]">grain</span>
            <span>ResNet-50</span>
          </div>
        </div>
      </div>
    </section>
  );
}
