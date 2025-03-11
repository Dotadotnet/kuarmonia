import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const verifySchema = new Schema(
  {
    phone: {
      type: String,
      required: [true],
    },
    code: {
      type: String,
    },
    time: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 3 * 60 * 1000), 
    },
    used: {
      type: Boolean,
      default: false, 
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

const Verify = models.Verify || model("Verify", verifySchema);

export default Verify;
