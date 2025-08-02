/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatHistory from "./ChatHistory";
import ChatSection from "./ChatSection";
import { usePathname } from "next/navigation";
import NewChat from "./NewChat";
import axios from "axios";

export default function Chat() {
  const pathname = usePathname();

  useEffect(() => {
    async function createChat() {
      const response = await axios.post("/api/chat/create");
      if (!response) {
        console.log("not able to reach")
      }
      else {
      }
    }
    createChat();
  }, [])

  const showChatSection = /^\/chat\/[^/]+$/.test(pathname);

  return (
    <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
      <Sidebar />
      <ChatHistory />
      {showChatSection ? <ChatSection /> : <NewChat />}
    </div>
  );
}
