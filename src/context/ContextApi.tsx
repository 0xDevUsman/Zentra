import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { UserChat } from '@/types/types';

type UserData = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};



type AppContextType = {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    userChat: UserChat[] | null;
    setUserChat: (data: UserChat[] | null) => void;
    fetchChats: () => Promise<void>;
};


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userChat, setUserChat] = useState<UserChat[] | null>(null)
    const session = useSession();

    useEffect(() => {
        if (session.status === 'authenticated') {
            setUserData(session.data.user as UserData);
        }
    }, [session]);


    {/* Fetch Chats For User */ }

    const fetchChats = useCallback(async () => {
        try {
            const response = await axios.get("/api/chat/get");
            if (response.data.success) {
                const chats = response.data?.data;
                setUserChat(chats)
            }
            else {
                console.log("Something went wrong while fetching Data")
            }
        } catch (error) {
            console.log(error || "Something went Wrong - Not able to reach Backend")
        }
    }, [])


    return (
        <AppContext.Provider value={{ userData, setUserData, fetchChats, userChat, setUserChat }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
