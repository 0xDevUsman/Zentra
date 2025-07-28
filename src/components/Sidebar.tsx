"use client";
import React from "react";
import icon from "@/assets/chat-gpt.png";
import Image from "next/image";
import { RiChatNewLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { IoChatbubbleOutline } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa";

import ThemeToggle from "./ThemeToogle";

const Sidebar = () => {
  return (
    <>
      <div className="w-fit h-full dark:bg-[#141416] bg-white shadow-md p-4 flex flex-col items-center justify-between">
        <div>
          <Image src={icon} alt="Chat GPT" className="mt-2 mb-8 w-12" />
          <div className="relative group flex items-center justify-center mt-4">
            <RiChatNewLine className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              New Chat
            </span>
          </div>
          <div className="relative group flex items-center justify-center mt-4">
            <IoChatbubbleOutline className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Chat
            </span>
          </div>
        </div>
        <div>
          <div className="relative group flex items-center justify-center mt-4">
            <FaRegUser className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Profile
            </span>
          </div>
          <div className="relative group flex items-center justify-center mt-4">
            <RiLogoutCircleRLine className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Logout
            </span>
          </div >
          <div className="flex items-center justify-center mt-4">
            <ThemeToggle />
          </div>
        </div >
      </div >
    </>
  );
};

export default Sidebar;
