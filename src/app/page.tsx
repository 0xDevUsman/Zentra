"use client";

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // still checking
    if (!session) {
      router.replace("/signin");
    } else {
      router.replace("/chat");
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] dark:bg-black">
      <h1 className="text-center text-3xl text-black dark:text-white font-bold mt-10">
        <Loader size={48} />
      </h1>
    </div>
  );
}
