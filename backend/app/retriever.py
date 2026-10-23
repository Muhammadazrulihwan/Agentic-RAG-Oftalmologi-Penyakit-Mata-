from langchain_community.retrievers import BM25Retriever
from langchain_classic.retrievers import EnsembleRetriever

from app.ingestion import load_and_split_papers, load_vectorstore


def build_hybrid_retriever(k: int = 4):
    """Gabungkan vector retriever (Chroma) dan keyword retriever (BM25).
    Vector menangkap makna; BM25 menangkap istilah persis (mis. singkatan medis
    seperti AMD atau OCT yang mudah gagal ditangkap embedding saja)."""
    vectorstore = load_vectorstore()
    vector_retriever = vectorstore.as_retriever(search_kwargs={"k": k})

    chunks = load_and_split_papers()
    bm25_retriever = BM25Retriever.from_documents(chunks)
    bm25_retriever.k = k

    return EnsembleRetriever(retrievers=[vector_retriever, bm25_retriever], weights=[0.5, 0.5])