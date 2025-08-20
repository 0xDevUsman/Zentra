// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zentra – Chat with AI",
  description:
    "An intelligent AI assistant for note-taking, chat, and productivity. Built with Next.js, Tailwind CSS, TypeScript, MongoDB, and OpenRouter AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} scroll-smooth no-scrollbar antialiased bg-[#f0f1f2] dark:bg-black text-black dark:text-white transition-colors duration-100`}
      >
        {/* Just wrap children in Providers, no session here */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
