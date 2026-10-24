"use client";

import { Fragment, useEffect, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import { askLiterature, askWithImage, describeError } from "@/lib/api";
import { extractConfidence, isRefusal, parseAnswer } from "@/lib/answer";
import { useChat } from "./ChatProvider";

/* ------------------------------------------------------------------ */
/* Tipe & data awal                                                    */
/* ------------------------------------------------------------------ */

type Badge = { text: string; tone: "emerald" | "violet" };

type Msg =
  | { id: number; role: "user"; text: string }
  | {
      id: number;
      role: "assistant";
      kind: "answer" | "reject" | "error";
      text: string;
      citations?: string[];
      badge?: Badge;
    };

type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type Fundus = {
  status: "idle" | "loading" | "done" | "error";
  previewUrl?: string;
  fileName?: string;
  answer?: string;
  error?: string;
};

// Percakapan contoh dari desain. Kosongkan array ini bila tidak ingin ada pesan awal.
const INITIAL_MESSAGES: Msg[] = [
  { id: 1, role: "user", text: "Dataset apa yang dipakai untuk eksperimen ini?" },
  {
    id: 2,
    role: "assistant",
    kind: "answer",
    text: "Penelitian ini menggunakan **Eye Diseases Dataset** dari Kaggle yang mencakup 4 kelas kondisi fundus mata (Normal, Cataract, Glaucoma, dan Diabetic Retinopathy).",
    citations: ["Azrul_1835-1845 (Hal. 2)"],
    badge: { text: "Terverifikasi 100% Context", tone: "emerald" },
  },
];

const MAX_BYTES = 5 * 1024 * 1024;

/* ------------------------------------------------------------------ */
/* Render teks jawaban (bold + paragraf + bullet sederhana)            */
/* ------------------------------------------------------------------ */

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-primary font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function AnswerText({ text, className = "" }: { text: string; className?: string }) {
  const bullet = /^\s*[-*•]\s+/;
  return (
    <div className={`space-y-2 ${className}`}>
      {text.split(/\n{2,}/).map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => bullet.test(l))) {
          return (
            <ul key={i} className="list-disc pl-4 space-y-1">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(bullet, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function CitationRow({ citations, badge }: { citations?: string[]; badge?: Badge }) {
  if (!citations?.length && !badge) return null;
  return (
    <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center gap-1.5">
      {citations?.map((c) => (
        <span key={c} className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[10px] font-semibold">
          [{c}]
        </span>
      ))}
      {badge && (
        <span
          className={
            badge.tone === "emerald"
              ? "px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200"
              : "px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-medium"
          }
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bubble                                                              */
/* ------------------------------------------------------------------ */

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-primary-container text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs max-w-[85%] shadow-sm whitespace-pre-wrap break-words">
        {text}
      </div>
    </div>
  );
}

function AssistantBubble({ msg }: { msg: Extract<Msg, { role: "assistant" }> }) {
  if (msg.kind === "reject") {
    return (
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 rounded-lg bg-error text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
          <span className="material-symbols-outlined text-[16px]">gavel</span>
        </div>
        <div className="bg-surface-container-lowest border border-error/30 rounded-2xl rounded-tl-sm p-3.5 text-xs text-on-surface shadow-sm space-y-2 max-w-[90%]">
          <div className="text-error font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">block</span>
            Penolakan Etis Diagnostik Otomatis
          </div>
          <AnswerText text={msg.text} className="text-on-surface-variant leading-relaxed" />
          <div className="p-2 rounded bg-error-container/40 text-[11px] text-on-error-container">
            Harap segera berkonsultasi langsung dengan dokter spesialis mata (Sp.M) di fasilitas kesehatan terdekat.
          </div>
        </div>
      </div>
    );
  }

  if (msg.kind === "error") {
    return (
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 rounded-lg bg-error text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
          <span className="material-symbols-outlined text-[16px]">cloud_off</span>
        </div>
        <div className="bg-surface-container-lowest border border-error/30 rounded-2xl rounded-tl-sm p-3.5 text-xs text-on-surface shadow-sm space-y-2 max-w-[90%]">
          <div className="text-error font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            Layanan Tidak Dapat Dijangkau
          </div>
          <p className="text-on-surface-variant leading-relaxed">{msg.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
        <span className="material-symbols-outlined text-[16px]">neurology</span>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl rounded-tl-sm p-3.5 text-xs text-on-surface shadow-sm space-y-2 max-w-[90%] break-words">
        <AnswerText text={msg.text} />
        <CitationRow citations={msg.citations} badge={msg.badge} />
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
        <span className="material-symbols-outlined text-[16px]">neurology</span>
      </div>
      <div
        className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1"
        aria-label="Asisten sedang menjawab"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widget                                                              */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const { isOpen, request, open, close } = useChat();

  const [tab, setTab] = useState<"rag" | "fundus">("rag");
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [fundus, setFundus] = useState<Fundus>({ status: "idle" });
  const [dropError, setDropError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const ragRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(100);
  const handledRequest = useRef(0);
  const runId = useRef(0);
  const previewRef = useRef<string | undefined>(undefined);

  const push = (m: DistOmit<Msg, "id">) => setMessages((prev) => [...prev, { ...m, id: nextId.current++ } as Msg]);

  /* ---- kirim pertanyaan literatur ---- */
  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setTab("rag");
    push({ role: "user", text: q });
    setInput("");
    setLoading(true);
    try {
      const answer = await askLiterature(q);
      if (isRefusal(answer)) {
        push({ role: "assistant", kind: "reject", text: answer });
      } else {
        const { text: body, citations } = parseAnswer(answer);
        push({ role: "assistant", kind: "answer", text: body || answer, citations });
      }
    } catch (e) {
      push({ role: "assistant", kind: "error", text: describeError(e) });
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  /* ---- prompt dari tombol di halaman (mis. "Simulasi Uji Reject") ---- */
  useEffect(() => {
    if (request && request.id !== handledRequest.current) {
      handledRequest.current = request.id;
      if (request.text) void send(request.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  /* ---- auto-scroll ---- */
  useEffect(() => {
    const el = ragRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /* ---- unggah citra fundus ---- */
  async function analyze(file: File) {
    setDropError(null);
    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      setDropError("Format berkas harus JPG atau PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setDropError("Ukuran berkas melebihi 5MB.");
      return;
    }
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const previewUrl = URL.createObjectURL(file);
    previewRef.current = previewUrl;
    const id = ++runId.current;
    setFundus({ status: "loading", previewUrl, fileName: file.name });
    try {
      const answer = await askWithImage(file);
      if (id === runId.current) setFundus((f) => ({ ...f, status: "done", answer }));
    } catch (e) {
      if (id === runId.current) setFundus((f) => ({ ...f, status: "error", error: describeError(e) }));
    }
  }

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void analyze(file);
  }

  const parsedFundus = fundus.status === "done" && fundus.answer ? parseAnswer(fundus.answer) : null;
  const confidence = parsedFundus ? extractConfidence(parsedFundus.text) : null;

  const tabBase = "flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all";
  const tabActive = "text-primary border-b-2 border-primary bg-surface-container-lowest";
  const tabIdle = "text-on-surface-variant hover:text-primary";

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${isOpen ? "opacity-0 pointer-events-none" : ""}`}
        id="chat-launcher"
        inert={isOpen}
      >
        <button
          type="button"
          className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => open()}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px]">neurology</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed" />
            </span>
          </div>
          <span className="font-title-md text-title-md font-semibold pr-1">Tanya Asisten Riset</span>
        </button>
      </div>

      {/* Chatbot Window Panel */}
      <div
        id="chat-window"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[901px] h-[640px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-primary/20 shadow-2xl shadow-primary/25 flex flex-col overflow-hidden transition-all duration-300 transform ${
          isOpen ? "opacity-100 scale-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0F172A] to-[#1E1B4B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-title-md text-title-md font-bold text-white">OcularVision Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] text-white/70">Agentic RAG &amp; ResNet50 Vision Tool</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Tutup asisten"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={close}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container-low shrink-0">
          <button type="button" className={`${tabBase} ${tab === "rag" ? tabActive : tabIdle}`} onClick={() => setTab("rag")}>
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Tanya Literatur JAIC
          </button>
          <button type="button" className={`${tabBase} ${tab === "fundus" ? tabActive : tabIdle}`} onClick={() => setTab("fundus")}>
            <span className="material-symbols-outlined text-[16px]">radiology</span>
            Uji Citra Fundus
          </button>
        </div>

        {/* Tab 1 - RAG Conversation */}
        <div ref={ragRef} className={`flex-1 overflow-y-auto p-4 space-y-4 ${tab === "rag" ? "" : "hidden"}`} id="tab-content-rag">
          {/* Welcome System Notice */}
          <div className="p-3 rounded-xl bg-surface-container-high/60 border border-primary/20 text-xs text-on-surface-variant flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">info</span>
            <span>
              Asisten ini terikat ke dokumen penelitian JAIC 2025. Pertanyaan keluhan pribadi akan ditolak otomatis demi etika medis.
            </span>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-label-md font-semibold text-outline uppercase tracking-wider">Coba Kueri Cepat:</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs font-medium transition-colors"
                onClick={() => void send("Metode apa yang digunakan untuk ekstraksi fitur?")}
              >
                Metode ekstraksi fitur?
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs font-medium transition-colors"
                onClick={() => void send("Berapa akurasi XGBoost vs SVM?")}
              >
                Akurasi XGBoost vs SVM?
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-full bg-error-container/60 hover:bg-error-container text-error text-xs font-medium transition-colors"
                onClick={() => void send("Mata saya perih dan buram sejak kemarin, obat apa yang harus saya minum?")}
              >
                Mata saya perih (tes reject)
              </button>
            </div>
          </div>

          {/* Dialogue Thread Container */}
          <div className="space-y-4 pt-2" id="dialogue-container">
            {messages.map((m) => (m.role === "user" ? <UserBubble key={m.id} text={m.text} /> : <AssistantBubble key={m.id} msg={m} />))}
            {loading && <TypingBubble />}
          </div>
        </div>

        {/* Tab 2 - Fundus Image Testing Tool */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${tab === "fundus" ? "" : "hidden"}`} id="tab-content-fundus">
          <div className="text-xs text-on-surface-variant">
            Unggah citra fundus untuk inferensi fitur representasi 2048-D ResNet50 dan klasifikasi XGBoost:
          </div>

          {/* Upload Dropzone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed border-primary/30 rounded-2xl p-5 text-center hover:bg-surface-container-low transition-colors cursor-pointer ${
              dragging ? "bg-surface-container-low" : "bg-surface-container-low/50"
            }`}
          >
            <span className="material-symbols-outlined text-primary text-[36px] mb-1">cloud_upload</span>
            <div className="text-xs font-semibold text-on-surface">Klik untuk unggah atau seret berkas JPG/PNG</div>
            <div className="text-[11px] text-outline mt-0.5">Maksimal 5MB • RAM Ephemeral (Segera Dihapus)</div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) void analyze(f);
              }}
            />
          </div>
          {dropError && (
            <div className="p-2 rounded-lg bg-error-container/40 text-[11px] text-on-error-container flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">error</span>
              <span>{dropError}</span>
            </div>
          )}

          {fundus.status === "idle" ? (
            /* Sample Image Preview & Detection Result (dari desain) */
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Sampel Citra Fundus Terkini:</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-primary text-[10px] font-bold">Sample #042</span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-black h-28 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover opacity-80"
                  alt="Foto fundus retina dengan cakram optik dan percabangan pembuluh darah retina yang jelas"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfB0tM42Pd3KTqpH0lx4oLgSPggFHHpDtaKA191DOTKfooQstgtsmYwmDJ-kNoPsL7vrVBlbauG2Kirvm3ISB3j8CO8sqgsf6qZ2RrFOpMcFTmZPUzvivb7UV_OoCRK4juaV6Ke1tFZ9-c7ojK3T9g94IO2l6Nuk5MXFl4oH4nb5rf8wXVE75uwksipmClGCpQWE4mA2IqtnxNYmauDG04jjNtMMKnyzuFPfQBFYmIbfMGRavaMVwF"
                />
                <div className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cyan-300">
                  ResNet50 Tensor Ready
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-on-surface">Hasil Prediksi: Katarak Senilis</span>
                  <span className="font-bold text-primary font-mono">94.8% Confidence</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: "94.8%" }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
                <div className="p-1.5 rounded bg-surface-container-low">
                  <div className="text-outline">Normal</div>
                  <div className="font-bold text-on-surface">2.1%</div>
                </div>
                <div className="p-1.5 rounded bg-surface-container-low">
                  <div className="text-outline">Glaukoma</div>
                  <div className="font-bold text-on-surface">1.8%</div>
                </div>
                <div className="p-1.5 rounded bg-surface-container-low">
                  <div className="text-outline">DR</div>
                  <div className="font-bold text-on-surface">1.3%</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-high/60 text-[10px] text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[14px]">gavel</span>
                <span>Bukan diagnosis klinis — Hanya alat bantu riset akademis.</span>
              </div>
            </div>
          ) : (
            /* Hasil nyata dari /chat/image */
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-on-surface">Citra Fundus yang Dianalisis:</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-primary text-[10px] font-bold truncate max-w-[45%]">
                  {fundus.fileName}
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-black h-28 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover opacity-80" alt="Citra fundus yang Anda unggah" src={fundus.previewUrl} />
                <div className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cyan-300">
                  {fundus.status === "loading" ? "Menganalisis…" : fundus.status === "error" ? "Gagal" : "Inferensi Selesai"}
                </div>
              </div>

              {fundus.status === "loading" && (
                <div className="space-y-1.5" aria-live="polite">
                  <div className="text-xs font-semibold text-on-surface">Menjalankan ResNet50 + XGBoost…</div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-1/2 animate-pulse" />
                  </div>
                </div>
              )}

              {fundus.status === "error" && (
                <div className="p-2 rounded-lg bg-error-container/40 text-[11px] text-on-error-container flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[14px] shrink-0">error</span>
                  <span>{fundus.error}</span>
                </div>
              )}

              {parsedFundus && (
                <>
                  {confidence !== null && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-on-surface">Hasil Analisis Model</span>
                        <span className="font-bold text-primary font-mono">{confidence}% Confidence</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: `${confidence}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-on-surface break-words">
                    <AnswerText text={parsedFundus.text} />
                  </div>
                  <CitationRow citations={parsedFundus.citations} />
                </>
              )}

              <div className="p-2 rounded-lg bg-surface-container-high/60 text-[10px] text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[14px]">gavel</span>
                <span>Bukan diagnosis klinis — Hanya alat bantu riset akademis.</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="p-3 bg-surface-container-lowest border-t border-outline-variant/30 shrink-0">
          <form className="flex items-center gap-2" id="chat-form" onSubmit={onSubmit}>
            <button
              type="button"
              title="Unggah Citra Fundus"
              aria-label="Unggah Citra Fundus"
              className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              onClick={() => setTab("fundus")}
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <input
              id="chat-input"
              type="text"
              aria-label="Pertanyaan"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan literatur atau uji..."
              className="flex-1 text-xs py-2 px-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface placeholder:text-outline"
            />
            <button
              type="submit"
              aria-label="Kirim"
              disabled={loading}
              className="p-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
          <div className="text-[10px] text-center text-outline mt-1.5">
            AI Research Assistant. Assistive findings require independent ophthalmologist validation.
          </div>
        </div>
      </div>
    </>
  );
}
