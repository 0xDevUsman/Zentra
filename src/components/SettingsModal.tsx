"use client";

import { useApp } from '@/context/ContextApi';
import Image from 'next/image';
import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { userData } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log('Saving changes:', { name, email });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-full sm:h-[90%] flex flex-col md:flex-row overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-4 text-2xl text-gray-500 hover:text-gray-800"
          aria-label="Close settings"
        >
          ✕
        </button>

        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <ul className="space-y-2">
            <li className="font-medium text-indigo-600 cursor-pointer hover:underline">General</li>
            {/* You can add more options here */}
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3 p-4 sm:p-6 overflow-y-auto flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Profile</h3>

          {/* User Info Form */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
              {userData?.image ? (
                <Image
                  src={userData.image}
                  alt="User Avatar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-200 w-full h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            {/* Future: Add upload/change image button */}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-3 py-2 border outline-none rounded-md ${isEditing
                  ? "border-indigo-600"
                  : "border-gray-200 bg-gray-100 outline-none cursor-not-allowed"
                  }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border outline-none rounded-md ${isEditing
                  ? "border-indigo-600"
                  : "border-gray-200 bg-gray-100 outline-none cursor-not-allowed"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <button
              type="submit"
              className="self-start cursor-pointer px-6 py-2 rounded-md text-white font-semibold bg-[#5661f6] hover:bg-indigo-600"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
