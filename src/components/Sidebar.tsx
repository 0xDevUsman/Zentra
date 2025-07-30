"use client";
import React from "react";
import icon from "@/assets/chat-gpt.png";
import Image from "next/image";
import { RiChatNewLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { IoChatbubbleOutline } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa";

import ThemeToggle from "./ThemeToogle";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {

  const Logout = async () => {
    const toastId = toast.loading("Signing in with GitHub...");
    try {
      await signOut();

      window.location.href = "/signin";
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Sign-out error:", error);
      toast.error("Sign-out failed. Please try again.");
    }
  };
  return (
    <>
      <div className="w-fit h-full dark:bg-[#141416] bg-white shadow-md p-4 flex flex-col items-center justify-between">
        <div>
          <Image src={icon} alt="Chat GPT" className="mt-2 mb-8 w-12" />
          <Link href={"/chat"} className="relative group flex items-center justify-center mt-4">
            <RiChatNewLine className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full z-10 mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              New Chat
            </span>
          </Link>
          <Link href={"/chat/jhdbsajb"} className="relative group flex items-center justify-center mt-4">
            <IoChatbubbleOutline className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full z-10 mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Chat
            </span>
          </Link>
        </div>
        <div>
          <Link
            href={"/profile"}
            className="relative group flex items-center justify-center mt-4">
            <FaRegUser className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full z-10 mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Profile
            </span>
          </Link>
          <div
            onClick={() => Logout()} className="relative group flex items-center justify-center mt-4">
            <RiLogoutCircleRLine className="text-white text-4xl px-2 py-2 cursor-pointer hover:bg-[#23c69e] bg-[#10a37f] rounded-md mb-2" />
            <span className="absolute left-full z-10 mb-2 px-2 py-1 whitespace-nowrap text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
