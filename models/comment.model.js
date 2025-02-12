import { Schema, models, model } from "mongoose";
import baseSchema from "./baseSchema.model";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه کاربر الزامی است"],
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "شناسه پست الزامی است"],
    },
    content: {
      type: String,
      required: [true, "متن کامنت الزامی است"],
      maxLength: [500, "کامنت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null, // برای پاسخ به کامنت‌ها
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
