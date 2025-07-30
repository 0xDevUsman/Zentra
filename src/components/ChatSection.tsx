"use client";

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatSection = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex h-screen w-full lg:w-4/5 bg-white dark:bg-[#1e1f22] p-2 sm:p-4 md:p-6">
      <div className="flex flex-col w-full rounded-xl shadow-md dark:bg-[#202125] bg-[#f5f5f5] overflow-hidden">
        
        {/* Chat Messages */}
        <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 py-6 flex-grow overflow-y-auto custom-scrollbar transition-all duration-300">
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="blue! bluh! bluh!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage
            message="I'm good, thanks for lorem23a dsjd aidjasoidjaso jdijdoijaso djasoidj oasjdosoijd oaij doiajfijoijoi oijfoiadjfo jfojdsofjo odfjodsfj j ojfo isdjfjsdofjosdj fodjfo jo jdfjosdfojdsoj sdoj soj osdoj sdofjsdofjsdjosdjf0 dfsd fjnsdusk asjd najnkjkj uasasdf jfdudshfudi uisdfh sdhfkjsdkh asking!"
            isSender={false}
          />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="blue! bluh! bluh!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="blue! bluh! bluh!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <ChatMessage message="Hello, how are you?" isSender={true} />
          <ChatMessage message="I'm good, thanks for asking!" isSender={false} />
          <div ref={bottomRef} />
        </div>

        {/* Chat Input */}
        <div className="w-full border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1f22] p-4">
          <ChatInput onSend={(msg) => console.log("Sent:", msg)} />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
