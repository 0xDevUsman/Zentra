"use client";
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiMessageAltMinus } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { UserChat } from '@/types/types';
import axios from 'axios';
import { useApp } from '@/context/ContextApi';
import Link from 'next/link';

const ChatElement = ({ _id, name }: UserChat) => {
  const [showEdit, setShowEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [chatName, setChatName] = useState(name);
  const [editedName, setEditedName] = useState(name);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { fetchChats } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setEditedName(chatName);
    setIsEditing(true);
    setShowEdit(false);
  };

  const handleSave = async () => {
    const newName = editedName.trim();
    if (!newName) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      const response = await axios.patch("/api/chat/rename", {
        chatId: _id,
        name: newName,
      });

      if (response.data.success) {
        setChatName(newName);
        setIsEditing(false);
        await fetchChats();
        toast.success("Chat name updated");
      } else {
        toast.error("Failed to update chat name");
      }
    } catch (error) {
      toast.error("Error updating chat name");
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  // Handle delete confirm click
  const handleConfirmDelete = async () => {
    try {
      const deleted = await axios.delete("/api/chat/delete", {
        data: {
          chatId: _id
        }
      })

      if (deleted.data.success) {
        setShowConfirmDelete(false);
        setShowEdit(false);
        await fetchChats();
        toast.success(`Chat Deleted :)`);

      }
      else {
        toast.error("Error Found :(")
      }
      console.log(_id)
    } catch (error) {
      toast.error("Not able to delete :(")
      console.log(error)
    }
  };

  return (
    <Link href={`/chat/${_id}`}
      className='w-full flex justify-between items-center my-1 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-100'
    >
      {/* Left: Icon + Name or Input */}
      <div className='flex-1 flex gap-x-2 items-center font-medium cursor-pointer select-none truncate'>
        <BiMessageAltMinus className='font-light flex-shrink-0' size={20} />
        {isEditing ? (
          <input
            ref={inputRef}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className='text-sm sm:text-base px-1 py-0.5 bg-white rounded border border-gray-300 focus:outline-none w-full max-w-[200px]'
          />
        ) : (
          <h1 className='truncate text-sm sm:text-base'>{chatName}</h1>
        )}
      </div>

      {/* Right: Options */}
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
              onClick={handleEditClick}
              className='w-full px-4 py-2 text-sm text-left bg-gray-50 cursor-pointer hover:bg-gray-200 focus:outline-none'
            >
              Edit
            </button>
            <button
              onClick={() => {
                setShowConfirmDelete(true);
                setShowEdit(false);
              }}
              className='w-full px-4 py-2 text-sm text-left text-red-500 bg-gray-50 cursor-pointer hover:bg-gray-200 focus:outline-none'
            >
              Delete
            </button>
          </div>
        )}

        {showConfirmDelete && (
          <div className='absolute right-0 top-full mt-2 bg-gray-200 shadow-lg rounded-md p-4 z-60 w-56 text-center'>
            <p className='mb-3 text-sm'>Are you sure you want to delete this chat?</p>
            <div className='flex justify-around gap-2'>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className='px-3 py-1 text-sm cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className='px-3 py-1 text-sm cursor-pointer rounded-md bg-red-500 text-white hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ChatElement;
