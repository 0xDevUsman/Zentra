/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatHistory from "./ChatHistory";
import ChatSection from "./ChatSection";
import { usePathname } from "next/navigation";
import NewChat from "./NewChat";
import { useApp } from "@/context/ChatContext";
import { useParams } from "next/navigation";

export default function Chat() {
  const { id } = useParams();
  const chatId = id;
  const pathname = usePathname();
  const { fetchChats, chatHistory, loading, specificChat, fetchSpecificChatData } = useApp();
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    fetchSpecificChatData(chatId);
  }, [fetchSpecificChatData, chatId]);

  const showChatSection = /^\/chat\/[^/]+$/.test(pathname);

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

  const mappedSpecificChatHistory = specificChat?._id
    ? [{
      _id: specificChat._id,
      name: specificChat.name,
      message: specificChat.message.map((msg: any) => ({
        content: {
          _id: msg._id,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timeStamps || Date.now(),
        },
      })),
    }]
    : [];


  if (loading) return null;

  return (
    <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
      <Sidebar />
      <ChatHistory chatHistory={mappedChatHistory} />
      {showChatSection ? <ChatSection chatHistory={mappedSpecificChatHistory} /> : <NewChat />}
    </div>
  );
}