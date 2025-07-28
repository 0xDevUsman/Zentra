"use client";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ChatElement = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#1d1d20] cursor-pointer rounded-lg shadow-sm w-full mt-2">
        <div>
          <h1 className="font-bold text-base">Heading</h1>
          <p className="text-sm">This is a chat element.</p>
        </div>
        <div>
          <HiOutlineDotsHorizontal className="cursor-pointer p-1 text-xl rounded-sm dark:hover:bg-[#303030] hover:bg-gray-200" />
        </div>
      </div>
    </>
  );
};

export default ChatElement;
