import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";
import { connectDB } from "@/lib/db";

export const DELETE = async () => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const deleteChat = await Chat.deleteMany({ userId });

    if (deleteChat.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Chat not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
};
