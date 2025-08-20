"use client";

import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";
import { AppProvider } from "@/context/ContextApi";
import { Session } from "next-auth";


interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center">
              <Loader size={48} />
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster />
      </AppProvider>
    </SessionProvider>
  );
}