"use client";
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import ChatSection from './ChatSection';
import SettingsModal from './SettingsModal';


const Chat = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


    return (
        <>
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
            <div className="relative p-4 w-full flex gap-x-4">
                <Sidebar onOpenSettings={() => setIsSettingsOpen(true)}  />
                <ChatSection />
            </div>
        </>
    )
}

export default Chat