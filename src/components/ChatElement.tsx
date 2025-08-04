"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useApp } from "@/context/ChatContext";
import axios from "axios";
import toast from "react-hot-toast";
type ChatMessage = {
  role: string;
  content: string;
  timestamp?: number;
};

type ChatProps = {
  _id: string;
  name: string;
  message: ChatMessage[];
};

type Props = {
  chat: ChatProps;
};

const ChatElement = ({ chat }: Props) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(chat.name);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { deleteChat, fetchChats } = useApp();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRename = async () => {
    if (!newName.trim()) return toast.error("Chat name cannot be empty");
    try {
      const response = await axios.patch("/api/chat/rename", {
        chatId: chat._id,
        name: newName.trim(),
      });
      if (response.data.success) {
        toast.success("Chat renamed");
        fetchChats(); // refresh chat list
        setIsEditing(false);
      } else {
        toast.error(response.data.message || "Rename failed");
      }
    } catch (err) {
      toast.error((err as Error)?.message || "Something went wrong");
    }
  };



  const onClickChat = () => {
    if (!isEditing) router.push(`/chat/${chat._id}`);
  };

  return (
    <div
      onClick={onClickChat}
      className="relative flex items-center justify-between px-4 py-4 bg-gray-50 dark:bg-[#1d1d20] cursor-pointer rounded-lg shadow-sm w-full mt-2"
    >
      <div className="flex-1">
        {isEditing ? (
          <input
            className="bg-transparent border border-gray-400 dark:border-gray-600 text-sm p-1 rounded w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        ) : (
          <h1 className="font-bold text-base">{chat.name}</h1>
        )}
      </div>

      <div ref={menuRef} className="relative">
        <HiOutlineDotsHorizontal
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer p-1 text-xl rounded-sm dark:hover:bg-[#303030] hover:bg-gray-200"
        />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-[#282a2e] rounded-md shadow-lg border border-gray-300 dark:border-gray-700 z-10">
            {isEditing ? (
              <button
                onClick={handleRename}
                className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteChat({ chatId: chat._id })}
              className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
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
