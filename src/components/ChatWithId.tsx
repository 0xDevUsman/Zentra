"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import { userMessages } from "@/types/types";

interface ChatWithIdProps {
    messages: userMessages[];
}

const ChatWithId: React.FC<ChatWithIdProps> = ({ messages }) => {
    return (
        <div className="max-w-6xl md:max-w-4xl mx-auto px-4">
            {messages.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No messages yet.</p>
            )}

            {messages.map((msg, idx) => (
                <div key={idx}>
                    <ChatMessage message={msg} />
                </div>
            ))}
        </div>
    );
};

export default ChatWithId;
