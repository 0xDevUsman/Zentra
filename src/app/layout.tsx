// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} scroll-smooth antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
