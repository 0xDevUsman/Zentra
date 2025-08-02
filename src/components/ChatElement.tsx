"use client";
import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ChatElement = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    alert("Edit clicked");
    setMenuOpen(false);
  };

  const handleDelete = () => {
    alert("Delete clicked");
    setMenuOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#1d1d20] cursor-pointer rounded-lg shadow-sm w-full mt-2">
      <div>
        <h1 className="font-bold text-base">Heading</h1>
        <p className="text-sm">This is a chat element.</p>
      </div>

      <div ref={menuRef} className="relative">
        <HiOutlineDotsHorizontal
          onClick={() => setMenuOpen((prev) => !prev)}
          className="cursor-pointer p-1 text-xl rounded-sm dark:hover:bg-[#303030] hover:bg-gray-200"
        />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-[#282a2e] rounded-md shadow-lg border border-gray-300 dark:border-gray-700 z-10">
            <button
              onClick={handleEdit}
              className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-[#3a3a3c]"
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
