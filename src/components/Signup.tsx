"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/chat-gpt.png";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Signup = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center">
      <div className="absolute top-10 left-10">
        <div className="flex gap-4 items-center">
          <Image src={logo} alt="" className="w-12" />
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Zentra
          </h1>
        </div>

        <div className="w-full min-h-screen flex justify-center items-center">
          <div>
            <h1>Create an account</h1>
            <form>
              <div className="pt-2 mt-4 flex flex-col">
                <label>Email address</label>
                <input type="text" placeholder="password" className="text-white placeholder:text-white"/>
              </div>
              <div className="pt-2 mt-4 flex flex-col">
                <label>Password</label>
                <input type="password" placeholder="password" className="text-white placeholder:text-white"/>
              </div>
              <div className="pt-2 mt-4 flex flex-col">
                <label>Password</label>
                <input type="password" placeholder="password" className="text-white placeholder:text-white"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
