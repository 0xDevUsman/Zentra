// ChatMessage.tsx
export default function ChatMessage({
  message,
  isSender,
}: {
  message: string;
  isSender: boolean;
}) {
  return (
    <div
      className={`flex w-full ${isSender ? "justify-end" : "justify-start"
        } mt-4`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm
          ${isSender
            ? "dark:bg-[#4b4f5b] dark:text-white text-black bg-white rounded-lg"
            : "dark:bg-transparent dark:text-white text-black rounded-lg bg-[#d8efe9]"
          }`}
      >
        {message}
      </div>
    </div>
  );
}
