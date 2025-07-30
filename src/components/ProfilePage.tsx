// app/profile/page.tsx
"use client";

import { useState, useRef } from 'react';
import { FiEdit2, FiSave, FiUser, FiCamera, FiX, } from 'react-icons/fi';
import { MdEmail, MdPerson } from 'react-icons/md';
import Sidebar from './Sidebar';
import Image from 'next/image';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Alex Johnson');
    const [email, setEmail] = useState('alex.johnson@example.com');
    const [bio, setBio] = useState('A dedicated individual striving to make a positive impact.');
    const [tempData, setTempData] = useState({ name, email, bio });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = () => {
        setTempData({ name, email, bio });
        setIsEditing(true);
    };

    const handleSave = () => {
        setName(tempData.name);
        setEmail(tempData.email);
        setBio(tempData.bio);
        setIsEditing(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex h-screen w-full dark:bg-[#1D1D20] bg-white transition-colors duration-300">
            <Sidebar />
            <div className="w-4/5 mx-auto px-6 md:px-24 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-[#ced0d6]">Profile Settings</h1>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-[#343541] hover:bg-gray-300 dark:hover:bg-[#3e404a] text-gray-800 dark:text-[#ced0d6] rounded-lg transition-all duration-200"
                                >
                                    <FiX className="w-4 h-4" />
                                    <span>Cancel</span>
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <FiSave className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Avatar & Social */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#282a2e] rounded-xl shadow-md p-6 transition-all duration-300">
                                <div className="relative group">
                                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-[#343541] shadow-lg">
                                        {avatarPreview ? (
                                            <Image src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                <FiUser className="w-20 h-20 text-white opacity-80" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={triggerFileInput}
                                        className="absolute bottom-2 right-2 bg-white dark:bg-[#343541] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3e404a]"
                                    >
                                        <FiCamera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>

                                <div className="text-center mt-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-[#ced0d6]">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempData.name}
                                                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                                className="text-center bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            name
                                        )}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">@alexjohnson</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#282a2e] rounded-xl shadow-md p-6 transition-all duration-300">
                                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                                    <MdEmail className="mr-2" /> Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={tempData.email}
                                                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-100 dark:bg-[#343541] rounded-md text-gray-800 dark:text-[#ced0d6] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-800 dark:text-[#ced0d6]">{email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                        <p className="text-gray-800 dark:text-[#ced0d6]">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#282a2e] rounded-xl shadow-md p-6 transition-all duration-300">
                                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                                    <MdPerson className="mr-2" /> About Me
                                </h3>
                                {isEditing ? (
                                    <textarea
                                        value={tempData.bio}
                                        onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-gray-100 dark:bg-[#343541] rounded-md text-gray-800 dark:text-[#ced0d6] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800 dark:text-[#ced0d6]">{bio}</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}