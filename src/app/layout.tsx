import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zentra – Chat with AI",
  description:
    "An intelligent AI assistant for note-taking, chat, and productivity. Built with Next.js, Tailwind CSS, TypeScript, MongoDB, and OpenRouter AI.",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: import("next-auth").Session;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${inter.className} scroll-smooth no-scrollbar antialiased bg-[#f0f1f2] dark:bg-black text-black dark:text-white transition-colors duration-100`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
