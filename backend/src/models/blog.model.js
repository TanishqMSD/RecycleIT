import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    banner: { type: String, required: true }, // URL to the banner image
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, trim: true }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "published" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);