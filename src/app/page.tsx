"use client";

import { signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const Logout = async () => {
    const toastId = toast.loading("Signing in with GitHub...");
    try {
      await signOut();

      window.location.href = "/signin";
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Sign-out error:", error);
      toast.error("Sign-out failed. Please try again.");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] dark:bg-black">
        <h1 className="text-center text-3xl text-black dark:text-white font-bold mt-10">
          Hello Welcome !
        </h1>

        <button
          onClick={() => Logout()}
          className="bg-black dark:bg-white px-6 py-3 rounded-lg text-white dark:text-black mt-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-100 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default page;
