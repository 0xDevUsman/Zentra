"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatHistory from "./ChatHistory";
import ChatSection from "./ChatSection";
import { usePathname } from "next/navigation";
import NewChat from "./NewChat";
import { useApp } from "@/context/ChatContext";

export default function Chat() {
  const pathname = usePathname();
  const { fetchChats, chatHistory } = useApp();

  useEffect(() => {
    fetchChats();
  }, [fetchChats])

  console.log(chatHistory)
  const showChatSection = /^\/chat\/[^/]+$/.test(pathname);

  const mappedChatHistory = chatHistory.map(chat => ({
    ...chat,
    message: Array.isArray(chat.message)
      ? chat.message.map(([role, content]) => ({ role, content }))
      : []
  }));

  return (
    <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
      <Sidebar />
      <ChatHistory chatHistory={mappedChatHistory} />
      {showChatSection ? <ChatSection /> : <NewChat />}
    </div>
  );
}
