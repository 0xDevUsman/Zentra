import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Send message handler
  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage("");
      setShowDropdown(false); // Close dropdown on send (optional)
    }
  };

  // Send message on Enter (without Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto resize textarea height on message change
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center w-full px-6 py-2 dark:bg-[#363942] bg-[#e9e5e5] border border-gray-300 dark:border-gray-800 rounded-md">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask any question..."
        rows={1}
        className="flex-1 resize-none overflow-hidden bg-transparent dark:text-white text-black dark:placeholder-gray-300 placeholder-gray-800 focus:outline-none"
      />
      <div className="relative flex items-center ml-2 gap-x-3" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={showDropdown}
          className="dark:text-white text-black transition-all duration-200 cursor-pointer dark:hover:bg-[#4B4F5B] hover:bg-gray-300 text-sm rounded-md p-2 flex items-center justify-center gap-x-2"
          type="button"
        >
          Personality
          {showDropdown ? (
            <FaChevronDown size={16} aria-label="Close dropdown" />
          ) : (
            <FaChevronUp size={16} aria-label="Open dropdown" />
          )}
        </button>

        {showDropdown && (
          <div className="absolute bottom-full right-0 mb-2 w-44 bg-white dark:bg-[#4B4F5B] shadow-lg rounded-md p-2 text-sm z-50">
            <div className="hover:bg-gray-100 dark:hover:bg-[#363942] p-2 rounded cursor-pointer">
              Personality 1
            </div>
            <div className="hover:bg-gray-100 dark:hover:bg-[#363942] p-2 rounded cursor-pointer">
              Personality 2
            </div>
            <div className="hover:bg-gray-100 dark:hover:bg-[#363942] p-2 rounded cursor-pointer">
              Personality 3
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleSend}
        className="ml-2 dark:text-white text-black transition-all duration-200"
        type="button"
        aria-label="Send message"
      >
        <IoSend size={22} />
      </button>
    </div>
  );
}
