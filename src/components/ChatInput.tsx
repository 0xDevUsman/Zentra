"use client";
import React, { useState } from "react";
import axios from "axios";
import { MdOutlineSend } from "react-icons/md";
import { usePathname } from "next/navigation";
import { userMessages } from "@/types/types";
import { useRouter } from "next/navigation";

interface ChatInputProps {
    chatId: string | null;
    setChatId: (id: string) => void;
    messages: userMessages[];
    setMessages: React.Dispatch<React.SetStateAction<userMessages[]>>;
    onMessageSent?: () => void;

}

const ChatInput: React.FC<ChatInputProps> = ({
    chatId,
    setChatId,
    setMessages,
    onMessageSent,
}) => {
    const [message, setMessage] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSend = async () => {
        if (!message.trim()) return;

        try {
            let currentChatId = chatId;
            const isNewChat = !currentChatId;

            if (isNewChat) {
                const chatIdFromUrlMatch = pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/);
                currentChatId = chatIdFromUrlMatch ? chatIdFromUrlMatch[1] : null;
                if (currentChatId) setChatId(currentChatId);
            }

            const userMsg: userMessages = {
                role: "user",
                content: message,
                isLoading: false,
                timeStamp: Date.now(),
            };
            const tempLoaderMsg: userMessages = {
                role: "assistant",
                content: "⏳ Typing...",
                isLoading: true,
                timeStamp: Date.now(),
            };

            setMessages((prev) => [...prev, userMsg, tempLoaderMsg]);
            setMessage("");

            if (isNewChat) {
                const createResponse = await axios.post("/api/chat/create");
                if (createResponse.data.success) {
                    currentChatId = createResponse.data.chatId;
                    setChatId(currentChatId || "");

                    router.push(`/chat/${currentChatId}`);

                } else {
                    throw new Error("Failed to create chat");
                }
            }

            const aiResponse = await axios.post("/api/chat/ai", {
                chatId: currentChatId,
                prompt: message,
            });

            if (aiResponse.data.success) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.isLoading
                            ? { ...aiResponse.data.data, isLoading: false }
                            : msg
                    )

                );
                setTimeout(() => {
                    window.location.reload();
                }, 500);

            } else {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.isLoading
                            ? {
                                role: "assistant",
                                content: "⚠️ Failed to get response",
                                isLoading: false,
                                timeStamp: Date.now(),
                            }
                            : msg
                    )
                );
            }

            onMessageSent?.();

        } catch (err) {
            console.error("Error sending message:", err);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.isLoading
                        ? {
                            role: "assistant",
                            content: "⚠️ Error occurred",
                            isLoading: false,
                            timeStamp: Date.now(),
                        }
                        : msg
                )
            );
        }
    };




    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
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
