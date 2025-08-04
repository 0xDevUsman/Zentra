"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/ChatContext";

interface ProvidersProps {
    children: React.ReactNode;
    session?: import("next-auth").Session;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                <AppProvider>
                    {children}
                </AppProvider>
                <Toaster />
            </ThemeProvider>
        </SessionProvider>
    );
}
