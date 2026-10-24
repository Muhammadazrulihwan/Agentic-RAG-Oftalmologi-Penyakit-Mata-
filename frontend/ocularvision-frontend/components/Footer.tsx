export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest text-primary dark:text-inverse-primary w-full border-t border-outline-variant/30 dark:border-outline/20 flat no shadows">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Academic Copyright */}
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-inverse-on-surface flex items-center justify-center md:justify-start gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">visibility</span>
            <span>OcularVision AI</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant">
            © 2025 OcularVision AI — Riset JAIC Vol. 9 No. 4 oleh Muhammad Azrul Ihwan. Khusus keperluan riset &amp; pembuktian konsep
            akademis. Bukan pengganti diagnosis medis resmi.
          </p>
        </div>
        {/* Links from JSON */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 font-body-sm text-body-sm">
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#performa"
          >
            JAIC Publication
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#arsitektur"
          >
            Dokumentasi Arsitektur RAG
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#faq"
          >
            Dataset Fundus
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#etika"
          >
            Pedoman Etika Klinis
          </a>
          <a
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#etika"
          >
            Kebijakan Privasi Data Pasien
          </a>
          <a className="text-primary dark:text-inverse-primary font-medium hover:underline" href="mailto:research@ocularvision.ai">
            Hubungi Peneliti
          </a>
        </div>
      </div>
    </footer>
  );
}
