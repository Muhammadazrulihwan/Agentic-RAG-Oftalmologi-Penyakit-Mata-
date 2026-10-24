export default function FaqSection() {
  return (
    <section className="py-20 md:py-28 max-w-5xl mx-auto px-6" id="faq">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-headline-lg-mobile text-on-surface mb-4">
          Pertanyaan Umum Terkait Riset
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Jawaban seputar spesifikasi teknis dataset, implementasi API backend, serta arsitektur agen.
        </p>
      </div>
      {/* Accordion Items */}
      <div className="space-y-4">
        {/* FAQ 1 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm transition-all duration-200">
          <details className="group">
            <summary className="flex justify-between items-center font-title-md text-title-md font-bold text-on-surface cursor-pointer list-none">
              <span>Dari mana dataset citra fundus mata diperoleh untuk melatih model?</span>
              <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="mt-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed border-t border-outline-variant/20 pt-3">
              Dataset yang digunakan berasal dari <strong className="text-on-surface">Eye Diseases Dataset</strong> (Kaggle), mencakup 4
              kategori citra fundus retina mata: Normal, Cataract, Glaucoma, dan Diabetic Retinopathy yang telah melalui kurasi standarisasi
              ukuran 224x224 piksel untuk input backbone ResNet-50.
            </div>
          </details>
        </div>
        {/* FAQ 2 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm transition-all duration-200">
          <details className="group">
            <summary className="flex justify-between items-center font-title-md text-title-md font-bold text-on-surface cursor-pointer list-none">
              <span>Bagaimana konfigurasi hosting backend FastAPI dan model classifier?</span>
              <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="mt-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed border-t border-outline-variant/20 pt-3">
              Sistem dirancang modular menggunakan <strong className="text-on-surface">FastAPI</strong>. Endpoint klasifikasi fundus dapat
              di-host pada port 8000 (menyediakan endpoint <code>/predict</code> untuk bobot model ResNet50 + XGBoost), sementara
              orkestrator Agentic LangGraph berjalan pada service pendukung yang terhubung dengan basis data vektor ChromaDB.
            </div>
          </details>
        </div>
        {/* FAQ 3 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm transition-all duration-200">
          <details className="group">
            <summary className="flex justify-between items-center font-title-md text-title-md font-bold text-on-surface cursor-pointer list-none">
              <span>Mengapa memilih kombinasi ResNet-50 + XGBoost dibandingkan melatih CNN dari awal?</span>
              <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="mt-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed border-t border-outline-variant/20 pt-3">
              Melatih CNN dari nol pada dataset citra medis berukuran terbatas rentan terhadap <em>overfitting</em>. Transfer learning
              dengan ResNet-50 memanfaatkan representasi visual umum, dan pemetaan vektor 2048-dimensinya diekstraksi ke pohon keputusan
              XGBoost yang terbukti menghasilkan akurasi tertinggi (92.03%) dengan waktu inferensi sangat cepat (&lt;150ms).
            </div>
          </details>
        </div>
        {/* FAQ 4 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm transition-all duration-200">
          <details className="group">
            <summary className="flex justify-between items-center font-title-md text-title-md font-bold text-on-surface cursor-pointer list-none">
              <span>Apakah sistem ini dapat langsung digunakan di klinik mata atau rumah sakit?</span>
              <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="mt-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed border-t border-outline-variant/20 pt-3">
              <strong className="text-error font-semibold">Tidak.</strong> Platform OcularVision AI merupakan bukti konsep akademis (Proof
              of Concept) yang diterbitkan pada jurnal JAIC untuk tujuan riset informatika medis. Implementasi klinis nyata memerlukan
              sertifikasi alat kesehatan, uji klinis multisenter, dan persetujuan otoritas kesehatan terkait.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
