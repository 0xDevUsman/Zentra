export const TypingDots: React.FC = () => (
    <span className="text-gray-400 animate-pulse">
        Typing
        <span className="dots">...</span>
        <style jsx>{`
      .dots::after {
        content: '';
        display: inline-block;
        animation: blink 1.4s infinite;
      }
      @keyframes blink {
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}</style>
    </span>
);
