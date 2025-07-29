"use client";

import React from "react";
const page = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] dark:bg-black">
        <h1 className="text-center text-3xl text-black dark:text-white font-bold mt-10">
          Hello Welcome !
        </h1>
        <button
          className="bg-black dark:bg-white px-6 py-3 rounded-lg text-white dark:text-black mt-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-100 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default page;
