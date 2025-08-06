import React from 'react';
import ChatInput from './ChatInput';
import { usePathname } from 'next/navigation';
import NewChatHero from './NewChatHero';
import ChatWithId from './ChatWithId';

const ChatSection = () => {
    const pathname = usePathname();
    const isChatIdPage = /^\/chat\/[a-zA-Z0-9]+$/.test(pathname);

    return (
        <div className="flex flex-col w-full md:w-full h-[95vh]">
            {/* Chat content scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {pathname === "/chat" ? (
                    <NewChatHero />
                ) : isChatIdPage ? (
                    <ChatWithId />
                ) : (
                    <div className='mt-10'>
                        <p className='text-red-500'>Invalid Chat URL</p>
                    </div>
                )}
            </div>

            {/* Sticky input at bottom */}
            <div className="sticky bottom-0 px-4 py-3">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatSection;
