/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AppContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  fetchChats: () => void;
  deleteChat: (data: chatDelete) => void;
  chatHistory: IChat[]
  handleSendMessage: (propmt: string) => void;
  fetchSpecificChatData: (chatId: any) => void
  specificChat: any
};

interface Message {
  role: string;
  content: string;
  timeStamps: number; // Note: Fixing the typo from "timeStampts" to "timeStamps"
}

interface IChat {
  _id: string;
  name: string;
  userId: string;
  message: Message[];
}

type chatDelete = {
  chatId: string
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  const [chatHistory, setChatHistory] = useState<IChat[]>([]);
  const [specificChat, setSpecificChat] = useState([]);


  const fetchChats = useCallback(async () => {
    const response = await axios.get("/api/chat/get");
    if (response.data.success) {
      setChatHistory(response.data?.data)
      console.log(response.data?.data)
    }
  }, [])

  const fetchSpecificChatData = async (chatId: string) => {
    try {
      const response = await axios.get(`/api/chat/get/${chatId}`);
      if (response.data.success) {
        setSpecificChat(response.data.data); // only data, not entire response
      } else {
        console.log("Something went wrong while fetching specific chat data");
      }
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };



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

  // In NewChat.tsx, modify handleSendMessage:
  const handleSendMessage = async (prompt: string) => {
    setLoading(true);
    try {
      const createRes = await axios.post("/api/chat/create");
      if (!createRes.data.success) throw new Error("Chat creation failed");

      const getRes = await axios.get("/api/chat/get");
      const latestChat = getRes.data.data?.slice(-1)[0];
      const currentChatId = latestChat._id;

      // Redirect to chat page
      router.push(`/chat/${currentChatId}`);

      // Send prompt to AI
      const aiRes = await axios.post("/api/chat/ai", {
        chatId: currentChatId,
        prompt,
      });

      if (aiRes.data.success) {
        fetchChats(); // Refresh chat history with updated messages
      } else {
        throw new Error("AI response failed");
      }
    } catch (err) {
      console.error("Error:", (err as Error).message);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };



  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, fetchChats, chatHistory, deleteChat, handleSendMessage, fetchSpecificChatData, specificChat }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
