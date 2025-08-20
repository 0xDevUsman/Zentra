import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";
import { connectDB } from "@/lib/db";

interface Input {
  chatId: string;
  name: string;
}

export const PATCH = async (req: Request) => {
  try {
    const session = (await getServerSession(authOptions)) as {
      user?: { id?: string };
    } | null;
    const userId = session?.user?.id;
    console.log(userId);

    await connectDB();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: Input = await req.json();
    const { chatId, name } = body;

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { name },
      { new: true }
    );

    if (!updatedChat) {
      return NextResponse.json(
        { success: false, message: "Chat not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Chat renamed" });
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
