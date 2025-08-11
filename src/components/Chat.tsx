"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatSection from './ChatSection';
import SettingsModal from './SettingsModal';

const Chat = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            {isSettingsOpen && (
                <SettingsModal onClose={() => setIsSettingsOpen(false)} />
            )}
            <div className="relative w-full px-4 py-6 flex flex-col md:flex-row gap-4 max-w-[1536px] mx-auto no-scrollbar">
                {/* Sidebar Section */}
                <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[380px] shrink-0">
                    <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />
                </div>

                {/* Chat Section */}
                <div className="w-full flex-1">
                    <ChatSection />
                </div>
            </div>
        </>
    );
};

export default Chat;
