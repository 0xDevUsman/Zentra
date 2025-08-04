import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Chat } from "@/models/chat";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    console.log(userId);
    if (!userId || !session) {
      return NextResponse.json({
        success: false,
        message: "User Not authenticated",
      });
    }

    await connectDB();

    const data = await Chat.find({
      userId,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
