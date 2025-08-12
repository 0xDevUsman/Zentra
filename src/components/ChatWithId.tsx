"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import { userMessages } from "@/types/types";
import Loader from "./Loader";

interface ChatWithIdProps {
    messages: userMessages[];
    isLoading?: boolean;
}

const ChatWithId: React.FC<ChatWithIdProps> = ({ messages, isLoading }) => {
    return (
        <div className="max-w-6xl md:max-w-4xl mx-auto px-4">
            {isLoading && messages.length === 0 ? (
                <div className="flex justify-center items-center mt-10">
                    <Loader size={48} className="text-gray-500" />
                </div>
            ) : messages.length === 0 ? (
                <p className="text-center text-gray-500 mt-10"><Loader size={48} className="text-gray-500" /></p>
            ) : (
                messages.map((msg, idx) => (
                    <div key={`${msg.role}-${idx}`}>
                        <ChatMessage message={msg} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatWithId;
