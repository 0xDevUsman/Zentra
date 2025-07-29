"use client";

import React from "react";
import Sidebar from "./Sidebar";
import ChatHistory from "./ChatHistory";
import ChatSection from "./ChatSection";
import { usePathname } from "next/navigation";
import NewChat from "./NewChat";

export default function Chat() {
  const pathname = usePathname();

  // Example: only show ChatSection if path matches /chat/something
  const showChatSection = /^\/chat\/[^/]+$/.test(pathname);

  return (
    <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
      <Sidebar />
      <ChatHistory />
      {showChatSection ? <ChatSection /> : <NewChat />}
    </div>
  );
}
