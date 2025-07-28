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
      className={`flex w-full ${
        isSender ? "justify-end" : "justify-start"
      } mt-4`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm
          ${
            isSender
              ? "bg-[#4b4f5b] text-white rounded-lg"
              : "bg-transparent text-white rounded-lg"
          }`}
      >
        {message}
      </div>
    </div>
  );
}
