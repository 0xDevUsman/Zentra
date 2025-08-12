import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { usePathname } from "next/navigation";
import NewChatHero from "./NewChatHero";
import ChatWithId from "./ChatWithId";
import { userMessages } from "@/types/types";
import axios from "axios";

const ChatSection = () => {
    const pathname = usePathname();
    const isChatIdPage = /^\/chat\/[a-zA-Z0-9]+$/.test(pathname);
    const [messages, setMessages] = useState<userMessages[]>([]);
    const [chatId, setChatId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (isChatIdPage) {
            const match = pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/);
            console.log(match)
            if (match) {
                setChatId(match[1]);
            } else {
                setChatId(null);
            }
        } else {
            setChatId(null);
            setMessages([]);
        }
    }, [pathname, isChatIdPage]);


    useEffect(() => {
        if (!chatId) {
            setMessages([]);
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/chat/get/${chatId}`);
                if (response.data?.success) {
                    setMessages(response.data.data.message);
                }
            } catch (error) {
                console.error("Failed to fetch chat messages:", error);
            }
        };

        fetchMessages();
    }, [chatId, refreshTrigger]);

    console.log(chatId)
    return (
        <div className="flex flex-col w-full md:w-full h-[95vh]">
            {/* Chat content scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {pathname === "/chat" ? (
                    <NewChatHero />
                ) : isChatIdPage ? (
                    <ChatWithId messages={messages} />
                ) : (
                    <div className="mt-10">
                        <p className="text-red-500">Invalid Chat URL</p>
                    </div>
                )}
            </div>

            {/* Sticky input at bottom */}
            <div className="sticky bottom-0 px-4 py-3">
                <ChatInput
                    chatId={chatId}
                    setChatId={setChatId}
                    messages={messages}
                    setMessages={setMessages}
                    onMessageSent={() => setRefreshTrigger((prev) => prev + 1)}
                />
            </div>
        </div>
    );
};

export default ChatSection;
