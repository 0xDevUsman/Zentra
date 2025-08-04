"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";

type ChatHistory = {
  _id: string,
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
  deleteChat: (data: chatDelete) => void;
  chatHistory: ChatHistory[]
};

type chatDelete = {
  chatId: string
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [chatHistory, setChatHistory] = useState([]);


  const fetchChats = useCallback(async () => {
    const response = await axios.get("/api/chat/get");
    if (response.data.success) {
      setChatHistory(response.data?.data)
      console.log(response.data?.data)
    }
  }, [])

  const deleteChat = async ({ chatId }: chatDelete) => {
    try {
      const response = await axios.delete("/api/chat/delete", {
        data: { chatId },
      });


      console.log(response.data)
      if (response.data.success) {
        toast.success("Chat Deleted");
        fetchChats();
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };


  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchChats, chatHistory, deleteChat }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
