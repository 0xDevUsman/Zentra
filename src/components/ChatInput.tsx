"use client";
import React, { useState } from "react";
import { MdOutlineSend } from "react-icons/md";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            console.log("Send message:", message);
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline on Enter
            handleSend();
        }
    };

    return (
        <div className="flex items-end gap-3 p-3 py-1  rounded-3xl shadow-md max-w-full sm:max-w-xl mx-auto">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What's on your mind?..."
                className="flex-grow py-2 px-4 rounded-xl bg-white outline-none resize-none transition text-sm max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
                rows={1}
                aria-label="Message input"
            />
            <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`p-2 rounded-full text-white transition-colors duration-200 ${message.trim()
                    ? "bg-[#303df5] hover:bg-[#1f2be2] cursor-pointer"
                    : "bg-[#5661f6] cursor-not-allowed"
                    }`}
                aria-label="Send message"
            >
                <MdOutlineSend size={20} />
            </button>
        </div>
    );
};

export default ChatInput;
