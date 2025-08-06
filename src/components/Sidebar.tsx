/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import logo from "@/assets/chat-gpt.png";
import Image from 'next/image';
import { IoMdAdd } from "react-icons/io";
import ChatElement from './ChatElement';
import { AiOutlineSetting } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useApp } from '@/context/ContextApi';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { UserChat } from '@/types/types';
interface SidebarProps {
    onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenSettings }) => {
    const { userData } = useApp();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);

    useEffect(() => {
        if (userData?.name || isImageLoading) {
            setShowSkeleton(false);
        }
    }, [userData, isImageLoading]);

    useEffect(() => {
        if (isMobileOpen) {
            setIsAnimatingOpen(false);
            setTimeout(() => setIsAnimatingOpen(true), 10);
        } else {
            setIsAnimatingOpen(false);
            const timer = setTimeout(() => setIsMobileOpen(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isMobileOpen]);

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                aria-label="Open Sidebar"
            >
                <FiMenu size={24} />
            </button>

            <div className="hidden md:flex bg-white w-[350px] h-[95vh] flex-col items-start justify-center max-h-screen px-6 py-4 rounded-lg">
                <SidebarContent
                    onOpenSettings={onOpenSettings}
                    userData={userData}
                    showSkeleton={showSkeleton}
                    isImageLoading={isImageLoading}
                    setIsImageLoading={setIsImageLoading}
                />
            </div>

            {isMobileOpen && (
                <div
                    className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex transition-opacity duration-300
                        ${isAnimatingOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden={!isAnimatingOpen}
                >
                    <div
                        className={`bg-white w-[80%] max-w-xs h-full p-6 rounded-r-lg shadow-xl flex flex-col
                            transform transition-transform duration-300
                            ${isAnimatingOpen ? "translate-x-0" : "-translate-x-full"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="self-end text-2xl text-gray-500 cursor-pointer hover:text-gray-800 mb-4"
                            onClick={() => setIsMobileOpen(false)}
                            aria-label="Close Sidebar"
                        >
                            ✕
                        </button>

                        <SidebarContent
                            onOpenSettings={() => {
                                onOpenSettings();
                                setIsMobileOpen(false);
                            }}
                            userData={userData}
                            showSkeleton={showSkeleton}
                            isImageLoading={isImageLoading}
                            setIsImageLoading={setIsImageLoading}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;

interface SidebarContentProps extends SidebarProps {
    userData: any;
    showSkeleton: boolean;
    isImageLoading: boolean;
    setIsImageLoading: (value: boolean) => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
    onOpenSettings,
    userData,
    showSkeleton,
    isImageLoading,
    setIsImageLoading,
}) => {
    const { fetchChats, userChat } = useApp();
    useEffect(() => {
        fetchChats();
    }, [fetchChats])
    console.log(userChat)
    return (

        <>
            <div className='flex gap-x-2 items-center mt-4'>
                <Image src={logo} alt='logo' className='w-10' />
                <span className='text-2xl font-medium flex items-center gap-x-1'>ZENTRA A.I</span>
            </div>

            <div className='w-full flex justify-center items-center mt-4 hover:opacity-85'>
                <Link
                    href="/chat"
                    className='flex justify-center cursor-pointer items-center gap-2 w-full rounded-3xl px-4 py-3.5 bg-[#5661f6] text-white font-medium'
                >
                    <IoMdAdd size={24} /> New chat
                </Link>
            </div>

            <div className='w-full h-0.5 bg-gray-200 mt-4' />

            <div className="w-full flex items-center justify-between px-4 pt-3">
                <h3 className="text-sm font-medium text-gray-500">Your Conversations</h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Clear All
                </button>
            </div>
            <div className='w-full h-0.5 bg-gray-200 mt-4' />

            <div className="w-full mt-3 h-[calc(100vh-260px)] overflow-y-auto custom-scrollbar space-y-2">
                {userChat?.map((data: UserChat,) => {
                    return (
                        <div key={data._id}>
                            <ChatElement _id={data._id || "_id Not Found"} name={data.name || "Name Not Found"} />
                        </div>
                    )
                })}

            </div>

            <div
                onClick={onOpenSettings}
                className='flex gap-x-1 items-center cursor-pointer w-full hover:bg-gray-100 px-2 py-2 rounded-3xl mt-2 transition'
            >
                <AiOutlineSetting size={36} className='p-2 bg-gray-200 rounded-full' />
                <h1 className='text-base font-medium'>Settings</h1>
            </div>

            <div className='flex gap-x-3 items-center w-full px-2 py-2 rounded-3xl mt-3'>
                {showSkeleton ? (
                    <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
                ) : userData?.image ? (
                    <div className="relative w-9 h-9">
                        <Image
                            src={userData.image}
                            alt="User Avatar"
                            fill
                            className={`rounded-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </div>
                ) : (
                    <RxAvatar size={36} className='p-2 bg-gray-200 rounded-full' />
                )}
                {showSkeleton ? (
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                ) : (
                    <h1 className='text-base font-medium'>{userData?.name}</h1>
                )}
            </div>
        </>
    )
};
