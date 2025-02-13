import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const toolSchema = new Schema(
  {
    text: {
      type: String,
      required: [true],
      unique: true,
    },
    url: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
        default: "N/A",
      },
      originalName: {
        type: String,
        default: "N/A",
      },
    },
    ...baseSchema.obj
  },
  
  { timestamps: true }
);

const Tool = models.Tool || model("Verify", toolSchema);

export default Tool;
