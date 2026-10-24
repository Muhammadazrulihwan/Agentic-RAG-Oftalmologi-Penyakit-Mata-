/** Memisahkan sitasi `[Nama_File (1)]` dari teks jawaban backend. */
export function parseAnswer(raw: string): { text: string; citations: string[] } {
  const citations: string[] = [];
  const text = raw
    .replace(/\[([^\[\]\n]+)\](?!\()/g, (_, c: string) => {
      const label = c.trim();
      if (!citations.includes(label)) citations.push(label);
      return "";
    })
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { text, citations };
}

/** Backend belum mengirim field `route`, jadi penolakan dikenali dari teksnya. */
export function isRefusal(answer: string): boolean {
  return /tidak bisa memberikan diagnosis|saran pengobatan pribadi/i.test(answer);
}

/** Ambil persentase kepercayaan pertama (0-100) dari teks, bila ada. */
export function extractConfidence(answer: string): number | null {
  const m = answer.match(/(\d{1,3}(?:[.,]\d+)?)\s*%/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(",", "."));
  return n >= 0 && n <= 100 ? n : null;
}
