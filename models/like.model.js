import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const likeSchema = new Schema(
  {
  
      adminId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,

      },
      entityId: {
        type: Schema.Types.ObjectId,
        required: [true, "شناسه موجودیت الزامی است"],
      },
      entityType: {
        type: String,
        enum: ["Blog","News", "Product", "Comment","Post","Media"], 
        required: [true, "نوع موجودیت الزامی است"],
      },
      type: {
        type: String,
        enum: ["like", "dislike"], 
        required: true,
      },
      ...baseSchema.obj
    },
    { timestamps: true }
);

const Like = models.Like || model("Like", likeSchema);

export default Like;
