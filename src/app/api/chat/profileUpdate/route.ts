import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

interface Input {
  name: string;
}

export const PATCH = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    console.log(userId);

    await connectDB();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: Input = await req.json();
    const { name } = body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "User renamed" });
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
