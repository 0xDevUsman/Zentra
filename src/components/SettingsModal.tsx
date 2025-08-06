"use client";

import { useApp } from '@/context/ContextApi';
import Image from 'next/image';
import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { userData } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-4xl h-[80%] flex overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-4 text-xl text-gray-500 hover:text-gray-800"
          aria-label="Close settings"
        >
          ✕
        </button>

        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <ul className="space-y-2 py-2 px-3 rounded-md hover:bg-gray-200 cursor-pointer">
            <li className="font-medium text-indigo-600">General</li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6 overflow-y-auto flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Profile</h3>

          {/* User Info */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
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
          </div>

          <div className="flex flex-col gap-6 max-w-md">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-200 bg-gray-100 outline-none cursor-not-allowed rounded-md"
                value={userData?.name || ''}
                disabled
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-200 bg-gray-100 outline-none cursor-not-allowed rounded-md"
                value={userData?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
