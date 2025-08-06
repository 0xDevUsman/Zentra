export type userMessages = {
  content: string;
  role: "user" | "assistant";
};

export type UserChat = {
  _id: string;
  name: string;
  userId?: string;
  messages?: userMessages[];
};

export type UserChatList = UserChat[];
export type UserMessageList = userMessages[];