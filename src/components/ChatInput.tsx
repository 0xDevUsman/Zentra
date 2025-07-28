import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex items-end w-full px-6 py-2 dark:bg-[#363942] bg-[#e9e5e5] border border-gray-300 dark:border-gray-800 rounded-md">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask any question..."
        rows={1}
        className="flex-1 resize-none overflow-hidden bg-transparent dark:text-white text-black dark:placeholder-gray-300 placeholder-gray-800 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="ml-2 dark:text-white text-black transition-all duration-200"
      >
        <IoSend size={22} />
      </button>
    </div>
  );
}
