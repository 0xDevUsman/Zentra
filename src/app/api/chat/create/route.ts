import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";
export const POST = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "User Not Authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    console.log("helo user id " + userId);

    const chatData = {
      userId,
      message: [],
      name: "New Chat",
    };

    await connectDB();
    const newChat = await Chat.create(chatData);

    return NextResponse.json({
      message: "Chat Created",
      success: true,
      chatId: newChat._id,
    });
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message,
      success: false,
      message: "Something went wrong",
    });
  }
};
