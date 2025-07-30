"use client";

import React, { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";

const NewChat = () => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="flex h-screen w-full lg:w-4/5 bg-white dark:bg-[#1e1f22] p-4 md:p-6">
            <div className="flex flex-col w-full rounded-xl shadow-md dark:bg-[#282a2e] bg-[#f5f5f5] overflow-hidden">

                {/* Welcome Section */}
                <div className="flex flex-col items-center justify-center flex-grow px-6 md:px-16 lg:px-24 py-10 text-center dark:bg-[#202125] dark:text-white text-black transition-all duration-300 overflow-y-auto custom-scrollbar">
                    <h1 className="text-4xl md:text-5xl font-extrabold dark:text-[#ced0d6] text-gray-800 leading-tight mb-4">
                        How can I help you today?
                    </h1>
                    <p className="text-base md:text-base dark:text-gray-300 text-gray-700 max-w-2xl">
                        Whether you&#39;re stuck, curious, or just want to talk — I’m here to make things easier for you.
                    </p>
                    <div ref={bottomRef} />
                </div>

                {/* Input Section */}
                <div className="w-full p-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1f22]">
                    <ChatInput onSend={(msg) => console.log("Sent:", msg)} />
                </div>
            </div>
        </div>
    );
};

export default NewChat;
