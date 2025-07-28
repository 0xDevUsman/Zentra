"use client";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ChatElement = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#1d1d20] rounded-lg shadow-md w-full mt-2">
        <div>
          <h1 className="font-bold text-base">Heading</h1>
          <p className="text-sm">This is a chat element.</p>
        </div>
        <div>
          <HiOutlineDotsHorizontal className="cursor-pointer  p-1 text-xl rounded-sm hover:bg-[#303030]" />
        </div>
      </div>
    </>
  );
};

export default ChatElement;
