import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type UserData = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    // Add other user fields as needed
};

type AppContextType = {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const session = useSession();

    useEffect(() => {
        if (session.status === 'authenticated') {
            setUserData(session.data.user as UserData);
        }
    }, [session]);




    return (
        <AppContext.Provider value={{ userData, setUserData }}>
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
