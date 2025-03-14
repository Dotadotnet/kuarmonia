import { Schema } from "mongoose";

const baseSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    deletedAt: {
      type: Date
    },

  },
  { timestamps: true }
);

export default baseSchema;
