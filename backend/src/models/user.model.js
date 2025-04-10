import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, sparse: true },
    authProvider: { type: String, required: true, enum: ['google', 'email', 'phone'] },
    password: { type: String, required: function() { return this.authProvider === 'email'; } },
    score: { type: Number, default: 0 },
    pledgeTaken: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
