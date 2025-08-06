"use Client";


import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { userMessages } from '@/types/types';

const ChatWithId = () => {
    const [message, setMessage] = useState<userMessages[]>();

    const { id } = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/chat/get/${id}`)
                if (response.data?.success) {
                    setMessage(response.data.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchMessages();
    }, [id])
    console.log(message)
    return (
        <div className="max-w-6xl md:max-w-4xl mx-auto px-4">
            {
                message?.map((message: userMessages, idx: number) => {
                    return (
                        <div key={idx}>
                            <ChatMessage message={message?.content} sender={message?.role} />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ChatWithId;
