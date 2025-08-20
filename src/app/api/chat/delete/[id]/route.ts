import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";
import { connectDB } from "@/lib/db";

interface Input {
  chatId: string;
}

export const DELETE = async (req: Request) => {
  try {
    await connectDB();
    const session = (await getServerSession(authOptions)) as {
      user?: { id?: string };
    } | null;
    const userId = session?.user?.id;
    console.log("Session:", session);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: Input = await req.json();
    const { chatId } = body;

    const deleteChat = await Chat.deleteOne({ _id: chatId, userId });

    if (deleteChat.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Chat not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
