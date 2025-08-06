"use client";

import React from 'react';

interface cardProps {
    name: string;
    description: string;
    icon: React.ReactNode;
}

const Cards = ({ name, description, icon }: cardProps) => {
    return (
        <div className='bg-[#191919] w-full sm:w-56 rounded-xl flex flex-col items-start justify-center px-4 py-6 flex-shrink-0'>
            <div className="text-white">{icon}</div>
            <h1 className='text-xl text-white font-medium mt-2'>{name}</h1>
            <p className='text-xs text-white text-start mt-2'>{description}</p>
        </div>
    );
};

export default Cards;
