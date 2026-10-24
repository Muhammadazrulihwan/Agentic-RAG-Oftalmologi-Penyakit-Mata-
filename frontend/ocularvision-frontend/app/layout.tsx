import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ChatProvider } from "@/components/ChatProvider";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "OcularVision AI - Asisten Riset Agentic RAG & Analisis Citra Fundus",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface antialiased font-body-md text-body-md selection:bg-primary-container selection:text-white relative overflow-x-hidden">
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
