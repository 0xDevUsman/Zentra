import mongoose, { Schema, Document, Model } from "mongoose";

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

const chatSchema: Schema<IChat> = new Schema({
  name: { type: String, required: true },
  message: [
    {
      role: { type: String, required: true },
      content: { type: String, required: true },
      timeStamp: { type: Number, required: true },
    },
  ],
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);
