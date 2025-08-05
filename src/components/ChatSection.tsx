"use client";

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useApp } from "@/context/ChatContext";

type ChatMessageType = {
  content: {
    _id: string,
    content: string,
    timestamp?: number
  }
  role: string,
};

type chatprops = {
  _id: string;
  message: ChatMessageType[];
  name: string;
};

type Props = {
  chatHistory: chatprops[];
};


// const LoadingDots = () => {
//   return (
//     <div className="flex space-x-1">
//       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
//       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//       <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//     </div>
//   );
// };


const ChatSection = ({ chatHistory }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { handleSendMessage } = useApp()


  // Scroll to bottom whenever chatHistory changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  return (
    <div className="flex h-screen w-full lg:w-4/5 bg-white dark:bg-[#1e1f22] p-2 sm:p-4 md:p-6">
      {chatHistory.map((chat) => (
        <div
          key={chat._id}
          className="flex flex-col w-full rounded-xl shadow-md dark:bg-[#202125] bg-[#f5f5f5] overflow-hidden"
          style={{ height: '100%' }}
        >
          <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 py-6 overflow-y-auto custom-scrollbar transition-all duration-300 flex-grow">
            {chat.message.map((message, idx) => (
              <ChatMessage
                key={idx}
                message={message.content}
                isSender={message.role === "user"}
              />
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="w-full border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1f22] p-4">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      ))}
    </div>

  );
};

export default ChatSection;
