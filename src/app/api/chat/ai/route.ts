// /app/api/ask-ai/route.ts

export const maxDuration = 120;
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Chat } from "@/models/chat";
import { connectDB } from "@/lib/db";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!, // Use env variable
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000/",
    "X-Title": "Zentra",
  },
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId || !session) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    await connectDB();
    const { chatId, prompt } = await req.json();

    const data = await Chat.findOne({ userId, _id: chatId });
    const userPrompt = {
      role: "user",
      content: String(prompt),
      timeStamp: Date.now(),
    };

    data?.message.push(userPrompt);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: userPrompt.content,
        },
      ],
    });
    const message = completion.choices[0].message;
    const messageWithTimestamp = {
      role: message.role,
      content: message.content ?? "",
      timeStamp: Date.now(),
    };
    console.log(messageWithTimestamp);

    data?.message.push(messageWithTimestamp);
    data?.save();

    return NextResponse.json({
      success: true,
      data: messageWithTimestamp,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
