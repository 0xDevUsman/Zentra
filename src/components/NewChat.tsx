"use client";

import React from "react";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

const NewChat = () => {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <>
            <div className="flex h-screen w-4/5 dark:bg-[#282a2e] bg-white p-10 pb-4 px-1">
                <div className="w-full dark:bg-[#202125] bg-[#f5f5f5] rounded-md flex flex-col justify-between ">
                    <div className="flex flex-col gap-4 px-24 py-6 overflow-y-auto custom-scrollbar transition-all duration-300">
                        <h1 className="text-center my-auto text-3xl font-bold text-[#ced0d6]">
                            How can I help You Today !
                        </h1>
                    </div>
                    <div className="w-full py-4 pb-0 sticky  bottom-0">
                        <ChatInput onSend={(msg) => console.log("Sent:", msg)} />
                    </div>
                </div>

            </div>
        </>
    );
};

export default NewChat;
