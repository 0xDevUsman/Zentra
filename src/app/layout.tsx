// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { ThemeProvider } from "next-themes";
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
      className="dark transition-colors duration-100"
      lang="en"
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      <body
        suppressHydrationWarning
        className={`${inter.className} scroll-smooth antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ClientWrapper>
            {children}

            <Toaster />
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
