"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

const ChatSection = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex h-screen w-4/5 dark:bg-[#282a2e] bg-white p-10">
        <div className="w-full dark:bg-[#202125] bg-white rounded-md  flex flex-col justify-between ">
          <div className="flex flex-col gap-4 px-10 py-6 overflow-y-auto custom-scrollbar transition-all duration-300">
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage message="blue! bluh! bluh! " isSender={false} />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage message="blue! bluh! bluh! " isSender={false} />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage message="blue! bluh! bluh! " isSender={false} />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
            <ChatMessage message="Hello, how are you?" isSender={true} />
            <ChatMessage
              message="I'm good, thanks for asking!"
              isSender={false}
            />
          </div>
          <div className="w-full py-4 pb-0 sticky  bottom-0">
            <ChatInput onSend={(msg) => console.log("Sent:", msg)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSection;
