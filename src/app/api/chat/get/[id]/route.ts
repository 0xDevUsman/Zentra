/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";

export const GET = async (req: Request, context: any) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!session || !userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    console.log("chatId:", id);

    await connectDB();
    const chat = await Chat.findOne({ _id: id, userId });
    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found" },
        { status: 404 }
      );
    }
    console.log("you foundedit !!!!!!!");

    return NextResponse.json({ success: true, data: chat });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
};
