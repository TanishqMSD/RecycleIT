import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    banner: { type: String, required: true }, // URL to the banner image
    location: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ 
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["interested", "going", "reminded"], default: "interested" },
      reminderSet: { type: Boolean, default: false },
    }],
    status: { 
      type: String, 
      enum: ["upcoming", "ongoing", "completed", "cancelled"], 
      default: "upcoming" 
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", CampaignSchema);