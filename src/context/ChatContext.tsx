"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useCallback } from "react";

type ChatHistory = {
  _id : string,
  name: string,
  message: [
    role: string,
    content: string
  ]
}
type AppContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  fetchChats: () => void;
  chatHistory: ChatHistory[]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [chatHistory, setChatHistory] = useState([]);


  const fetchChats = useCallback(async () => {
    const response = await axios.get("/api/chat/get");
    if (response.data.success) {
      setChatHistory(response.data?.data)
    }
  }, [])

  const deletChat = async ()=>{

  }
  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchChats, chatHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
