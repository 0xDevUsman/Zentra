// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToogle";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="dark transition-colors duration-300"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} scroll-smooth antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}

          <div className="absolute right-10 bottom-10 cursor-pointer">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
