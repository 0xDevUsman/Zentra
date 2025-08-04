import React from "react";
import ChatElement from "./ChatElement";

type ChatMessage = {
  role: string;
  content: string;
  timestamp?: number;
};

type chatprops = {
  message: ChatMessage[];
  name: string;
};
type Props = {
  chatHistory: chatprops[]
}
const ChatHistory = ({ chatHistory }: Props) => {
  return (
    <>
      <div className="flex flex-col h-screen w-1/5 dark:bg-[#282a2e] bg-white">
        <div>
          <h1 className="font-bold text-2xl mt-8 px-6">My Chats</h1>
        </div>

        <div className="mt-2 h-screen w-full overflow-y-auto rounded-xl shadow-sm transition-all duration-300 custom-scrollbar">
          <div className="flex flex-col gap-4 px-6 py-4">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat, idx) => (
                <ChatElement key={idx} chat={chat} />
              ))
            ) : (
              <p className="text-sm text-gray-400">No chats yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
