"use client";

import React, { useEffect, useState } from 'react'
import logo from "@/assets/chat-gpt.png"
import Image from 'next/image'
import { IoMdAdd } from "react-icons/io";
import ChatElement from './ChatElement';
import { AiOutlineSetting } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useApp } from '@/context/ContextApi';


interface SidebarProps {
    onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenSettings }) => {

    const { userData } = useApp();
    console.log(userData?.image)
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (userData?.name || isImageLoading) {
            setShowSkeleton(false);
        }
        console.log(showSkeleton)
    }, [userData, isImageLoading, showSkeleton]);
    return (
        <>
            <div className='bg-white w-1/4 h-[95vh] flex flex-col items-start justify-center max-h-screen px-6 py-4 rounded-lg'>
                <div className='flex gap-x-2 items-center mt-4'>
                    <Image src={logo} alt='logo' className='w-10' /> <span className='text-2xl font-medium flex items-center gap-x-1'>ZENTRA A.I </span>
                </div>

                <div className='w-full flex justify-center items-center mt-4  hover:opacity-85'>
                    <button className='flex justify-center cursor-pointer items-center gap-2 w-full rounded-3xl px-4 py-3.5 bg-[#5661f6] text-white font-medium'> <IoMdAdd size={24} /> New chat</button>
                </div>

                <div className='w-full h-0.5 bg-gray-200 mt-4'></div>

                <div className=" w-full flex items-center justify-between px-4 pt-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-100">
                        Your Conversations
                    </h3>

                    <button
                        className="text-xs cursor-pointer font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    >
                        Clear All
                    </button>
                </div>
                <div className='w-full h-0.5 bg-gray-200 mt-4'></div>
                <div className="w-full mt-3 h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    <div className="space-y-2">
                        <ChatElement />
                        <ChatElement />
                        <ChatElement />
                        <ChatElement />
                        <ChatElement />

                    </div>
                </div>

                <div onClick={onOpenSettings}
                    className='flex gap-x-1 items-center cursor-pointer w-full hover:bg-gray-100 transition-colors duration-100 px-2 py-2 rounded-3xl mt-2'>
                    <AiOutlineSetting size={36} className='p-2 cursor-pointer transition-colors duration-100 rounded-full bg-gray-200' />
                    <h1 className='text-base font-medium'>Settings</h1>
                </div>
                <div className='flex gap-x-3 items-center cursor-pointer w-full hover:bg-gray-100 transition-colors duration-100 px-2 py-2 rounded-3xl'>
                    {/* Avatar Skeleton or Image */}
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
                        <RxAvatar
                            size={36}
                            className='p-2 cursor-pointer transition-colors duration-100 rounded-full bg-gray-200'
                        />
                    )}

                    {/* Name Skeleton or Text */}
                    {showSkeleton ? (
                        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                    ) : (
                        <h1 className='text-base font-medium'>{userData?.name}</h1>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar