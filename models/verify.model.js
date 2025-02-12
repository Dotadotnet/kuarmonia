import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const verifySchema = new Schema(
  {
    phone: {
      type: String,
      required: [true],
      unique: true,
    },
    code: {
      type: String,
    },
    time: {
      type: Number,
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

const Verify = models.Verify || model("Verify", verifySchema);

export default Verify;
