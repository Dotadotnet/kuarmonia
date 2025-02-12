

import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  

connectDB();

const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    rent: {
      type: Schema.Types.ObjectId,
      ref: "Rent",
    },

    status: {
      type: String,
      enum: ["pending", "success"],
      default: "pending",
    },

    price: Number,
    members: Number,

    duration: {
      startDate: Date,
      endDate: Date,
    },
    ...baseSchema.obj
  },
  {
    timestamps: true,
  }
);

const Purchase = models?.Purchase || model("Purchase", purchaseSchema);

export default Purchase;
