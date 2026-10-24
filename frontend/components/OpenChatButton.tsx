"use client";

import type { ButtonHTMLAttributes } from "react";
import { useChat } from "./ChatProvider";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { prompt?: string };

export default function OpenChatButton({ prompt, children, ...rest }: Props) {
  const { open } = useChat();
  return (
    <button type="button" {...rest} onClick={() => open(prompt)}>
      {children}
    </button>
  );
}
