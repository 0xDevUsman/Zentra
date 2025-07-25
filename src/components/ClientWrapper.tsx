// components/ClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToogle";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideToggle = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      {!hideToggle && (
        <div className="absolute bottom-10 right-10 z-50">
          <ThemeToggle />
        </div>
      )}
      {children}
    </>
  );
}
