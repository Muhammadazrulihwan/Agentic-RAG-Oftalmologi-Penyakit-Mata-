export default function EthicsSection() {
  return (
    <section className="py-20 bg-surface-bright border-t border-outline-variant/20" id="etika">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold mb-4">
            <span className="material-symbols-outlined text-[16px]">shield</span>Kepatuhan Klinis &amp; Standar Etik Medis
          </div>
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-headline-lg-mobile text-on-surface mb-4">
            Etika dan Batasan Regulasi Penelitian
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Didesain dengan pendekatan &quot;Safety by Architecture&quot;, menjamin keamanan privasi citra dan menolak secara tegas
            penggunaan untuk diagnosis mandiri tanpa dokter.
          </p>
        </div>
        {/* 4 Pillars Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">medical_services</span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Bukan Pengganti Dokter</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Hasil inferensi adalah eksplorasi akademis untuk mendukung dokter residen atau oftalmolog dalam studi komparatif, bukan
                rujukan resep obat.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-error">Klausul Disclaimer JAIC</div>
          </div>
          {/* Pillar 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">lock_reset</span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Privasi Citra Fundus</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Citra fundus yang diunggah ke memori sistem disimpan dalam buffer sementara (RAM ephemeral) dan langsung dihapus setelah
                inferensi selesai.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-secondary">
              Zero Persistent Image Storage
            </div>
          </div>
          {/* Pillar 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Zero Hallucination Policy</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pernyataan literatur wajib memiliki skor keselarasan fakta (factual hallucination check) dari node evaluator sebelum dikirim
                ke pengguna.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-primary">Strict Document Grounding</div>
          </div>
          {/* Pillar 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">do_not_disturb_on</span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">Penolakan Sopan Keluhan</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Setiap kali query mengandung keluhan klinis perseorangan, sistem memotong rantai RAG dan menampilkan informasi fasilitas
                kesehatan terdekat.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-tertiary-container">
              Ethical Intent Interception
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
