import OpenChatButton from "./OpenChatButton";

export default function Header() {
  return (
    <header className="bg-surface-container-lowest/80 dark:bg-surface/80 backdrop-blur-md text-primary dark:text-inverse-primary docked full-width top-0 sticky z-40 shadow-sm border-b border-outline-variant/30 dark:border-outline/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-inverse-on-surface flex items-center gap-2 cursor-pointer active:scale-95 transition-transform duration-150"
          href="#"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-white text-[22px]">visibility</span>
          </div>
          <span className="tracking-tight text-on-surface font-extrabold">OcularVision AI</span>
        </a>
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-body-sm text-body-sm">
          <a
            className="text-primary dark:text-inverse-primary font-semibold border-b-2 border-primary dark:border-inverse-primary pb-1"
            href="#tentang"
          >
            Tentang Riset
          </a>{" "}
          <a
            className="text-on-surface-variant dark:text-surface-variant font-normal hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#arsitektur"
          >
            Arsitektur 3 Jalur
          </a>{" "}
          <a
            className="text-on-surface-variant dark:text-surface-variant font-normal hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#performa"
          >
            Performa Model
          </a>{" "}
          <a
            className="text-on-surface-variant dark:text-surface-variant font-normal hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#etika"
          >
            Etika &amp; Regulasi
          </a>{" "}
          <a
            className="text-on-surface-variant dark:text-surface-variant font-normal hover:text-primary dark:hover:text-inverse-primary transition-colors"
            href="#faq"
          >
            FAQ
          </a>
        </nav>
        {/* Trailing Actions */}
        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-primary/25 text-primary font-body-sm text-body-sm font-medium hover:bg-surface-container-low transition-colors duration-150"
            href="#performa"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span> <span>Paper JAIC 2025</span>
          </a>
          <OpenChatButton className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-container to-secondary text-white font-title-md text-title-md font-semibold shadow-md shadow-primary/20 hover:opacity-95 cursor-pointer active:scale-95 transition-transform duration-150">
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            <span>Buka Asisten Riset</span>
          </OpenChatButton>
        </div>
      </div>
    </header>
  );
}
