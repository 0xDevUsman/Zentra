"use client";
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiMessageAltMinus } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { UserChat } from '@/types/types';

const ChatElement = ({ _id, name }: UserChat) => {
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
    <div

      onClick={() => console.log(_id)}
      className='w-full flex justify-between items-center my-1 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-100'
    >
      {/* Left: Chat icon and title */}
      <div className='flex-1 flex gap-x-2 items-center font-medium cursor-pointer select-none truncate'>
        <BiMessageAltMinus className='font-light flex-shrink-0' size={20} />
        <h1 className='truncate text-sm sm:text-base'>{name}</h1>
      </div>

      {/* Right: Options icon */}
      <div className='relative flex-shrink-0 ml-2'>
        <div
          className='p-2 cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-100'
          onClick={() => setShowEdit(prev => !prev)}
          aria-label="Toggle chat options"
        >
          <SlOptionsVertical size={15} />
        </div>

        {showEdit && (
          <div
            ref={dropdownRef}
            className='absolute right-0 top-full mt-2 bg-gray-50 shadow-md w-28 rounded-md z-50'
          >
            <button
              onClick={() => toast.success("Edit")}
              className='w-full px-4 py-2 text-sm text-left bg-gray-50 cursor-pointer hover:bg-gray-200 focus:outline-none'
            >
              Edit
            </button>
            <button
              onClick={() => toast.success("Delete")}
              className='w-full px-4 py-2 text-sm text-left text-red-500 bg-gray-50 cursor-pointer hover:bg-gray-200 focus:outline-none'
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatElement;
