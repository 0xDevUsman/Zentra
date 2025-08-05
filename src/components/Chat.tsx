"use client";
import React from 'react'
import Sidebar from './Sidebar';
import ChatSection from './ChatSection';

const Chat = () => {
    return (
        <>
            <div className="p-4 w-full flex gap-x-4">
                <Sidebar />
                <ChatSection />
            </div>
        </>
    )
}

export default Chat