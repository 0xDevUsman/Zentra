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
  const { fetchChats, chatHistory, loading } = useApp();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const showChatSection = /^\/chat\/[^/]+$/.test(pathname);

  // Safely handle chatHistory mapping
  const mappedChatHistory = Array.isArray(chatHistory) 
    ? chatHistory.map(chat => {
        try {
          return {
            ...chat,
            message: Array.isArray(chat?.message)
              ? chat.message.map(msg => {
                  if (Array.isArray(msg)) {
                    const [role, content] = msg;
                    return { role, content };
                  }
                  return { role: '', content: msg || '' };
                })
              : []
          };
        } catch (error) {
          console.error('Error mapping chat:', error);
          return {
            ...chat,
            message: []
          };
        }
      })
    : [];

  if (loading) return null; 

  return (
    <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
      <Sidebar />
      <ChatHistory chatHistory={mappedChatHistory} />
      {showChatSection ? <ChatSection chatHistory={mappedChatHistory}/> : <NewChat />}
    </div>
  );
}