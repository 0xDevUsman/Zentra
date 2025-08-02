"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
    children: React.ReactNode;
    session?: import("next-auth").Session;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                {children}
                <Toaster />
            </ThemeProvider>
        </SessionProvider>
    );
}
