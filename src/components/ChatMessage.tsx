"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // or any other highlight.js theme CSS you like
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/chat-gpt.png";
import { FiCopy, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

interface ChatMessageProps {
  message: string;
  sender: "user" | "assistant";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  const isUser = sender === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Copied");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 mx-4`}
    >
      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-lg sm:max-w-5xl relative group`}
      >
        {!isUser && (
          <span className="flex items-center gap-x-2 text-xs font-medium text-gray-500 mb-1 select-none">
            <Image src={logo} alt="logo" className="w-6 h-6" /> zentra
          </span>
        )}

        <div
          className={`sm:px-4 py-2 rounded-2xl relative w-full ${
            isUser
              ? "bg-indigo-600 text-white rounded-br-none"
              : "text-gray-800 bg-gray-100 rounded-md"
          }`}
        >
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message}</ReactMarkdown>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute top-0 -right-2 text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Copy message"
              aria-label="Copy message"
            >
              {copied ? (
                <FiCheck size={16} className="cursor-pointer" />
              ) : (
                <FiCopy size={16} className="cursor-pointer" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
