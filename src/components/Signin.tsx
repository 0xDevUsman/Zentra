"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/chat-gpt.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F9F9F9]">
      {/* Header with Logo */}
      <header className="absolute top-10 left-10">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="Zentra Logo" className="w-10" />
          <h1 className="text-3xl font-bold text-black">Zentra</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm px-4">
        {/* Signup Form Container */}
        <div className="bg-transparent rounded-lg w-full">
          {/* Form Title */}
          <h1 className="text-center font-bold text-3xl mb-6 text-black">
            Welcome Back
          </h1>

          {/* Signup Form */}
          <form className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-black">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full text-black outline-1 text-sm outline-[#b9b9b9] py-3 rounded-full mt-1 px-4"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-black">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  aria-required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full text-black outline-1 text-sm outline-[#b9b9b9] py-3 rounded-full mt-1 px-4 pr-12" // note pr-12 for eye icon space
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500  cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#000000]  font-medium hover:opacity-85 text-white  cursor-pointer px-2 py-3 rounded-full transition-colors duration-100"
            >
              Continue
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-black ">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500  hover:underline">
                Sign up
              </a>
            </p>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-transparent text-sm font-bold text-black ">
                OR
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            {/* Google Button */}
            <button className="flex items-center justify-center w-full gap-2 font-medium text-black  outline-1 px-2 py-3 rounded-full hover:bg-[#ECECEC]   outline-[#b9b9b9]  transition-colors cursor-pointer duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Continue with Google
            </button>

            {/* GitHub Button */}
            <button className="flex items-center justify-center w-full gap-2 font-medium text-black outline-1 px-2 py-3 rounded-full hover:bg-[#ECECEC]  outline-[#b9b9b9] transition-colors cursor-pointer duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 64 64"
              >
                <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
              </svg>
              Continue with Github
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
