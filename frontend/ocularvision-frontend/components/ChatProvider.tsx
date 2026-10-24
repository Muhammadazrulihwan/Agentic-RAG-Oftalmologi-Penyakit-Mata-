"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type OpenRequest = { id: number; text?: string };

type ChatContextValue = {
  isOpen: boolean;
  request: OpenRequest | null;
  open: (prompt?: string) => void;
  close: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<OpenRequest | null>(null);

  const open = useCallback((prompt?: string) => {
    setIsOpen(true);
    if (prompt) setRequest((r) => ({ id: (r?.id ?? 0) + 1, text: prompt }));
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, request, open, close }), [isOpen, request, open, close]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat harus dipakai di dalam <ChatProvider>");
  return ctx;
}
