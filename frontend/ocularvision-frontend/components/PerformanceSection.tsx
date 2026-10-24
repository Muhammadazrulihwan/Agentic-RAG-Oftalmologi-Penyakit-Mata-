export default function PerformanceSection() {
  return (
    <section className="py-20 md:py-28 max-w-7xl mx-auto px-6" id="performa">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context & 4 Disease Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold mb-4">
              <span className="material-symbols-outlined text-[16px]">csv</span>JAIC Vol. 9 No. 4 (2025)
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[38px] text-headline-lg-mobile text-on-surface mb-4">
              Hasil Komparasi 11 Algoritma &amp; Klasifikasi 4 Kondisi Fundus
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Penelitian komparatif oleh <strong className="text-on-surface">Muhammad Azrul Ihwan</strong> menguji fitur ekstraksi ResNet-50
              pada 11 classifier untuk deteksi penyakit oftalmologi, dengan XGBoost membuktikan akurasi tertinggi di 92.03%.
            </p>
          </div>
          {/* 4 Condition Diagnosis Showcase Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Normal Retina */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-title-md text-title-md font-bold text-on-surface">Normal</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  93.4% Recall
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm mb-3">
                Kondisi retina jernih, makula sehat tanpa eksudat dan pembuluh darah retina dalam batas normal.
              </p>
              <div className="text-[11px] font-mono text-outline">Dataset: Eye Diseases Kaggle</div>
            </div>
            {/* Katarak */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-title-md text-title-md font-bold text-on-surface">Katarak</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-primary text-xs font-semibold border border-purple-200">
                  94.8% F1-Score
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm mb-3">
                Kekeruhan lensa mata yang membiaskan pantulan cahaya saat perekaman optik fundus.
              </p>
              <div className="text-[11px] font-mono text-outline">Fitur: ResNet50 Pool-5</div>
            </div>
            {/* Glaukoma */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-title-md text-title-md font-bold text-on-surface">Glaukoma</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-tertiary-container text-xs font-semibold border border-blue-200">
                  90.7% Precision
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm mb-3">
                Peningkatan rasio cekungan diskus optik (cup-to-disc ratio / CDR) akibat kerusakan saraf mata.
              </p>
              <div className="text-[11px] font-mono text-outline">Classifier: XGBoost Tree</div>
            </div>
            {/* Diabetic Retinopathy */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-title-md text-title-md font-bold text-on-surface">Retinopati Diabetik</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                  89.2% Accuracy
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm mb-3">
                Mikroaneurisma, hemoragi, dan eksudat keras akibat komplikasi vaskular kronis diabetes melitus.
              </p>
              <div className="text-[11px] font-mono text-outline">Ground Truth: Multi-class</div>
            </div>
          </div>
          {/* Academic Citation Callout Box */}
          <div className="p-4 rounded-2xl bg-surface-container-high/40 border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[22px] shrink-0">menu_book</span>
            <div className="text-xs text-on-surface-variant">
              <span className="font-semibold text-on-surface block mb-1">Sitasi Resmi Publikasi:</span>{" "}
              <em>
                Ihwan, M. A. (2025). &quot;Perbandingan 11 Algoritma Machine Learning Berbasis Ekstraksi Fitur ResNet-50 untuk Klasifikasi
                Citra Fundus Mata.&quot; Jurnal Informatika dan Rekayasa Perangkat Lunak (JAIC), 9(4), 1835–1845.
              </em>
            </div>
          </div>
        </div>
        {/* Right Column: Comparative Performance Table / Bento (6 cols) */}
        <div className="lg:col-span-6">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-surface-container-low to-surface-container-lowest border-b border-outline-variant/20 flex justify-between items-center">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Tabel Komparasi Model JAIC</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Hasil evaluasi ekstraksi ResNet-50 pada dataset fundus</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">
                {" "}
                TOP 5 OF 11{" "}
              </span>
            </div>
            {/* Table Content */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Algoritma</th>
                    <th className="pb-3 font-semibold">Akurasi</th>
                    <th className="pb-3 font-semibold">Precision</th>
                    <th className="pb-3 font-semibold">F1-Score</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {/* Rank 1: XGBoost (Highlighted) */}
                  <tr className="bg-primary/5 font-semibold">
                    <td className="py-3.5 flex items-center gap-2 text-primary font-bold">
                      <span className="material-symbols-outlined text-[18px]">verified</span>XGBoost (Terpilih)
                    </td>
                    <td className="py-3.5 text-primary font-mono font-bold">92.03%</td>
                    <td className="py-3.5 font-mono">92.10%</td>
                    <td className="py-3.5 font-mono">91.95%</td>
                    <td className="py-3.5 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-primary-container text-white text-[11px] font-bold"> Deploy </span>
                    </td>
                  </tr>
                  {/* Rank 2: LightGBM */}
                  <tr>
                    <td className="py-3 text-on-surface font-medium">LightGBM</td>
                    <td className="py-3 font-mono">90.85%</td>
                    <td className="py-3 font-mono">91.02%</td>
                    <td className="py-3 font-mono">90.70%</td>
                    <td className="py-3 text-right text-xs text-on-surface-variant">Benchmark</td>
                  </tr>
                  {/* Rank 3: Random Forest */}
                  <tr>
                    <td className="py-3 text-on-surface font-medium">Random Forest</td>
                    <td className="py-3 font-mono">89.42%</td>
                    <td className="py-3 font-mono">89.50%</td>
                    <td className="py-3 font-mono">89.31%</td>
                    <td className="py-3 text-right text-xs text-on-surface-variant">Benchmark</td>
                  </tr>
                  {/* Rank 4: Support Vector Machine (SVM) */}
                  <tr>
                    <td className="py-3 text-on-surface font-medium">SVM (RBF Kernel)</td>
                    <td className="py-3 font-mono">88.16%</td>
                    <td className="py-3 font-mono">88.25%</td>
                    <td className="py-3 font-mono">88.02%</td>
                    <td className="py-3 text-right text-xs text-on-surface-variant">Benchmark</td>
                  </tr>
                  {/* Rank 5: Multi-Layer Perceptron (MLP) */}
                  <tr>
                    <td className="py-3 text-on-surface font-medium">MLP Classifier</td>
                    <td className="py-3 font-mono">86.74%</td>
                    <td className="py-3 font-mono">86.90%</td>
                    <td className="py-3 font-mono">86.55%</td>
                    <td className="py-3 text-right text-xs text-on-surface-variant">Benchmark</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Metric Comparison Bar Visualization */}
            <div className="px-6 pb-6 pt-2 bg-surface-container-lowest border-t border-outline-variant/10">
              <div className="text-xs font-semibold text-on-surface mb-2">Visualisasi Perbandingan Gap Akurasi Top-4</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-on-surface-variant">
                    <span>XGBoost</span>
                    <span className="font-mono font-bold text-primary">92.03%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "92.03%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-on-surface-variant">
                    <span>LightGBM</span>
                    <span className="font-mono">90.85%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: "90.85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-on-surface-variant">
                    <span>Random Forest</span>
                    <span className="font-mono">89.42%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-1.5">
                    <div className="bg-outline h-1.5 rounded-full" style={{ width: "89.42%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
