from typing import TypedDict, List, Optional

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END

from app.config import LLM_MODEL, MAX_QUERY_REWRITES, MAX_GENERATION_RETRIES
from app.schemas import RouteDecision, GradeDocuments, GroundingCheck
from app.retriever import build_hybrid_retriever
from app.tools import classify_fundus_image

llm = ChatGoogleGenerativeAI(model=LLM_MODEL)
retriever = build_hybrid_retriever()


class GraphState(TypedDict):
    question: str
    image_path: Optional[str]
    route: Optional[str]
    documents: List[Document]
    rewrite_count: int
    generation_count: int
    classification_result: Optional[dict]
    answer: Optional[str]
    grounded: Optional[str]


# ---------- Nodes ----------

def route_question(state: GraphState) -> GraphState:
    if state.get("image_path"):
        state["route"] = "classification"
        return state

    router_llm = llm.with_structured_output(RouteDecision)
    prompt = ChatPromptTemplate.from_template(
        "Kamu adalah router untuk asisten riset oftalmologi.\n"
        "Pertanyaan pengguna: {question}\n\n"
        "Pilih rute yang paling sesuai."
    )
    decision = (prompt | router_llm).invoke({"question": state["question"]})
    state["route"] = decision.route
    return state


def retrieve(state: GraphState) -> GraphState:
    state["documents"] = retriever.invoke(state["question"])
    return state


def grade_documents(state: GraphState) -> GraphState:
    grader_llm = llm.with_structured_output(GradeDocuments)
    prompt = ChatPromptTemplate.from_template(
        "Dokumen:\n{document}\n\nPertanyaan: {question}\n\n"
        "Apakah dokumen ini relevan untuk menjawab pertanyaan?"
    )
    relevant_docs = []
    for doc in state["documents"]:
        result = (prompt | grader_llm).invoke(
            {"document": doc.page_content, "question": state["question"]}
        )
        if result.binary_score == "yes":
            relevant_docs.append(doc)
    state["documents"] = relevant_docs
    return state


def rewrite_query(state: GraphState) -> GraphState:
    prompt = ChatPromptTemplate.from_template(
        "Tulis ulang pertanyaan berikut supaya lebih mudah dicocokkan dengan istilah di literatur "
        "ilmiah (perjelas singkatan, tambahkan istilah teknis yang relevan). "
        "Kembalikan HANYA pertanyaan hasil tulis ulang, tanpa penjelasan tambahan.\n\n"
        "Pertanyaan asli: {question}"
    )
    new_question = (prompt | llm).invoke({"question": state["question"]}).content
    state["question"] = new_question.strip()
    state["rewrite_count"] = state.get("rewrite_count", 0) + 1
    return state


async def classify_image(state: GraphState) -> GraphState:
    result = await classify_fundus_image.ainvoke({"image_path": state["image_path"]})
    state["classification_result"] = result
    # Cari literatur terkait label hasil klasifikasi, supaya jawaban punya konteks riset.
    state["documents"] = retriever.invoke(result["disease"])
    return state


def reject(state: GraphState) -> GraphState:
    state["answer"] = (
        "Maaf, saya tidak bisa memberikan diagnosis atau saran pengobatan pribadi. "
        "Saya bisa membantu menjelaskan literatur riset atau menganalisis citra fundus "
        "(hasilnya bukan diagnosis klinis). Untuk keluhan kesehatan, silakan konsultasi ke dokter mata."
    )
    return state


def generate(state: GraphState) -> GraphState:
    context = "\n\n".join(
        f"[{d.metadata.get('source_title')}] {d.page_content}" for d in state["documents"]
    )
    classification_note = ""
    if state.get("classification_result"):
        c = state["classification_result"]
        classification_note = (
            f"Hasil klasifikasi model (BUKAN diagnosis klinis): {c['disease']} "
            f"(confidence {c['confidence_percent']}%).\n"
        )

    prompt = ChatPromptTemplate.from_template(
        "Jawab pertanyaan HANYA berdasarkan konteks berikut. Sertakan judul sumber di akhir jawaban.\n"
        "Kalau jawabannya tidak ada di konteks, katakan tidak ditemukan. Jawab ringkas dan to the point.\n"
        "{classification_note}\n"
        "Konteks:\n{context}\n\n"
        "Pertanyaan: {question}"
    )
    answer = (prompt | llm).invoke(
        {
            "context": context if context else "(tidak ada dokumen relevan ditemukan)",
            "question": state["question"],
            "classification_note": classification_note,
        }
    ).content
    state["answer"] = answer
    state["generation_count"] = state.get("generation_count", 0) + 1
    return state


def check_grounding(state: GraphState) -> GraphState:
    if not state["documents"]:
        state["grounded"] = "yes"  # tidak ada konteks untuk dicek; jawaban sudah "tidak ditemukan"
        return state
    checker_llm = llm.with_structured_output(GroundingCheck)
    context = "\n\n".join(d.page_content for d in state["documents"])
    prompt = ChatPromptTemplate.from_template(
        "Konteks:\n{context}\n\nJawaban:\n{answer}\n\n"
        "Apakah setiap klaim di jawaban didukung oleh konteks di atas?"
    )
    result = (prompt | checker_llm).invoke({"context": context, "answer": state["answer"]})
    state["grounded"] = result.grounded
    return state


# ---------- Conditional edges ----------

def route_decision(state: GraphState) -> str:
    return state["route"]


def grading_decision(state: GraphState) -> str:
    if state["documents"]:
        return "generate"
    if state.get("rewrite_count", 0) < MAX_QUERY_REWRITES:
        return "rewrite"
    return "generate"  # sudah mentok mencoba; generate akan jujur bilang tidak ditemukan


def grounding_decision(state: GraphState) -> str:
    if state.get("grounded") == "no" and state.get("generation_count", 0) < MAX_GENERATION_RETRIES:
        return "regenerate"
    return "end"


# ---------- Build graph ----------

def build_graph():
    graph = StateGraph(GraphState)

    graph.add_node("route_question", route_question)
    graph.add_node("retrieve", retrieve)
    graph.add_node("grade_documents", grade_documents)
    graph.add_node("rewrite_query", rewrite_query)
    graph.add_node("classify_image", classify_image)
    graph.add_node("generate", generate)
    graph.add_node("check_grounding", check_grounding)
    graph.add_node("reject", reject)

    graph.set_entry_point("route_question")

    graph.add_conditional_edges(
        "route_question",
        route_decision,
        {"literature": "retrieve", "classification": "classify_image", "reject": "reject"},
    )
    graph.add_edge("retrieve", "grade_documents")
    graph.add_conditional_edges(
        "grade_documents",
        grading_decision,
        {"generate": "generate", "rewrite": "rewrite_query"},
    )
    graph.add_edge("rewrite_query", "retrieve")
    graph.add_edge("classify_image", "generate")
    graph.add_edge("generate", "check_grounding")
    graph.add_conditional_edges(
        "check_grounding",
        grounding_decision,
        {"regenerate": "generate", "end": END},
    )
    graph.add_edge("reject", END)

    return graph.compile()


rag_graph = build_graph()
