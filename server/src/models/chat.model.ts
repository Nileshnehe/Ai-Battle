import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: { type: String, required: true },
    solution_1: { type: String, default: "" },
    solution_2: { type: String, default: "" },
    judge: {
      solution_1_score: { type: Number, default: 0 },
      solution_2_score: { type: Number, default: 0 },
      solution_1_reasoning: { type: String, default: "" },
      solution_2_reasoning: { type: String, default: "" },
    },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false }
);

export interface ChatDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  question: string;
  solution_1: string;
  solution_2: string;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
  };
  createdAt: Date;
}

const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
export default Chat;
