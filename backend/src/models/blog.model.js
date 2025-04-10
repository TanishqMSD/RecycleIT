import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    banner: { type: String, required: true }, // URL to the banner image
    tags: [{ type: String, trim: true }],
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "published" 
    },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);