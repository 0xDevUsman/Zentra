"use client";

import React from 'react'
import Cards from './Cards'
import { LuEarth } from "react-icons/lu";
import { MdElectricBolt } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
const NewChatHero = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center h-full'>
                <h1 className='bg-white w-fit text-2xl font-medium px-6 py-3 rounded-full text-center flex gap-0.5 items-center'>Z E N T R A</h1>
                <h1 className='text-4xl font-medium mt-4'>Good Day! How may I assist you today?</h1>


                { /*Chat section as per pathname if new chat they show newSection Other Wise Show messages as per the url*/}
                <div className='flex gap-x-4 mt-10'>
                    <Cards
                        name="Explore"
                        description="Discover the features of the Zentra platform and navigate through a seamless AI chat experience."
                        icon={<LuEarth size={30} />}
                    />

                    <Cards
                        name="Capabilities"
                        description="Chat with Zentra and ask anything you like – get helpful answers, creative suggestions, and more."
                        icon={<MdElectricBolt size={30} />}
                    />

                    <Cards
                        name="Limitations"
                        description="Responses may be delayed or inaccurate at times as Zentra uses a demo API, not a production-grade system."
                        icon={<IoWarningOutline size={30} />}
                    />

                </div>
            </div>
        </>
    )
}

export default NewChatHero