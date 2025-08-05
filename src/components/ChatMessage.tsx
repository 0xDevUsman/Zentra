"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from "@/assets/chat-gpt.png";
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'other';
  avatar?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
}) => {
  const isUser = sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Copied");
      setTimeout(() => setCopied(false), 1500);

    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Something Wrong")
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 mx-4`}
    >
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs md:max-w-[90%] relative group`}>
        {!isUser && (
          <span className="flex items-center gap-x-2 text-xs font-medium text-gray-500 mb-1">
            <Image src={logo} alt='logo' className='w-6 h-6' /> zentra
          </span>
        )}

        <div className={`px-4 py-2 rounded-2xl relative ${isUser
          ? 'bg-indigo-600 text-white rounded-br-none'
          : 'text-gray-800 bg-gray-100 rounded-md'
          }`}
        >
          <p className="text-sm md:text-base">{message}</p>

          {/* Copy Icon */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-0 -right-2 text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100"
              title="Copy message"
            >
              {copied ? <FiCheck size={16} className='cursor-pointer' /> : <FiCopy size={16} className='cursor-pointer' />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
