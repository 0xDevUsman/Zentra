import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";
export const POST = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "User Not Authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    console.log(userId);

    //Prepare the chat data to be saved in the database

    const chatData = {
      userId,
      message: [],
      name: "New Chat",
    };

    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({ message: "Chat Created", success: true });
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message,
      success: false,
    });
  }
};
