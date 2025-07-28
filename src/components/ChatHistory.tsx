import React from "react";
import ChatElement from "./ChatElement";

const ChatHistory = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-1/5 dark:bg-[#282a2e] bg-white">
        <div>
          <h1 className="font-bold text-2xl mt-8 px-6">My Chats</h1>
        </div>

        <div className="mt-2 max-h-[100vh] w-full overflow-y-auto rounded-xl shadow-sm transition-all duration-300 custom-scrollbar">
          <div className="flex flex-col gap-4 px-6 py-4">
            {Array.from({ length: 15 }).map((_, idx) => (
              <ChatElement key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
