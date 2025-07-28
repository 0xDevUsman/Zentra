import React from "react";
import Sidebar from "./Sidebar";
import ChatHistory from "./ChatHistory";
import ChatSection from "./ChatSection";

const Chat = () => {
  return (
    <>
      <div className="flex h-screen w-full dark:bg-[#282a2e] bg-white">
        <Sidebar />
        <ChatHistory />
        <ChatSection />
      </div>
    </>
  );
};

export default Chat;
