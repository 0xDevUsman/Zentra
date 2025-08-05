"use client"
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiMessageAltMinus } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";

const ChatElement = () => {
    const [showEdit, setShowEdit] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowEdit(false);
            }
        };

        if (showEdit) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEdit]);

    return (
        <div className='w-full flex justify-between items-center my-0.5 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-100'>
            {/* Left: Chat icon and title */}
            <div className='w-full flex gap-x-1 items-center font-medium my-2 cursor-pointer'>
                <BiMessageAltMinus className='font-light' size={20} />
                <h1>This is the Chat heading</h1>
            </div>

            {/* Right: Options icon */}
            <div className='relative'>
                <div
                    className='p-2 cursor-pointer transition-colors duration-100 rounded-full hover:bg-gray-200'
                    onClick={() => setShowEdit(prev => !prev)}
                >
                    <SlOptionsVertical size={15} />
                </div>

                {showEdit && (
                    <div
                        ref={dropdownRef}
                        className='absolute right-0 top-full mt-2 bg-gray-50 shadow-md w-24 rounded-md z-50'
                    >
                        <button onClick={() => toast.success("Edit")} className='w-full px-4 py-2 text-sm text-left bg-gray-50 cursor-pointer hover:bg-gray-200'>Edit</button>
                        <button onClick={() => toast.success("Delete")} className='w-full px-4 py-2 text-sm text-left text-red-500 bg-gray-50 cursor-pointer hover:bg-gray-200'>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatElement;
