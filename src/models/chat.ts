import mongoose, { Document, Model } from "mongoose";

export interface IChat extends Document {
  name: string;
  message: [
    {
      role: string;
      content: string;
      timeStamp: number;
    }
  ];
  userId: string;
  timestamp?: Date;
}

const chatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: Array, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);
