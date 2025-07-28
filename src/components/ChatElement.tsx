"use client";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ChatElement = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-[#141416] rounded-lg shadow-md w-full mt-2">
        <div>
          <h1 className="font-bold text-lg">Heading</h1>
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
