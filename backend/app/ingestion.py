from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

from app.config import PAPERS_DIR, CHROMA_PERSIST_DIR, EMBEDDING_MODEL


def load_and_split_papers(papers_dir: str = PAPERS_DIR):
    """Load semua PDF di papers_dir, pecah jadi chunk.
    Kalau PDF tidak punya metadata judul, nama file dipakai sebagai source_title."""
    chunks = []
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=["\n\n", "\n", ". ", " "],
    )
    for pdf_path in sorted(Path(papers_dir).glob("*.pdf")):
        documents = PyPDFLoader(str(pdf_path)).load()
        doc_chunks = splitter.split_documents(documents)
        for chunk in doc_chunks:
            chunk.metadata.setdefault("source_title", pdf_path.stem)
        chunks.extend(doc_chunks)
    return chunks


def build_vectorstore(chunks=None):
    """Build (atau rebuild total) Chroma vector store dari chunk paper."""
    if chunks is None:
        chunks = load_and_split_papers()
    embeddings = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL)
    return Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_PERSIST_DIR)


def load_vectorstore():
    """Load vector store yang sudah ada, tanpa build ulang dari nol."""
    embeddings = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL)
    return Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=embeddings)


if __name__ == "__main__":
    # Jalankan: python -m app.ingestion
    # Taruh PDF paper di folder data/papers/ sebelum menjalankan ini.
    print("Membangun vector store dari folder papers...")
    chunks = load_and_split_papers()
    print(f"Total chunk: {len(chunks)}")
    if not chunks:
        print("Tidak ada PDF ditemukan di data/papers/. Tambahkan file PDF dulu.")
    else:
        build_vectorstore(chunks)
        print(f"Selesai. Vector store tersimpan di {CHROMA_PERSIST_DIR}")
