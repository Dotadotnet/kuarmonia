import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  
import like from "./like.model"; // اضافه کردن مدل LikeDislike

connectDB();

// تعریف اسکیمای ریپلای‌ها به صورت جداگانه
const replySchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: [true, "لطفاً جواب خود را وارد کنید"],
      maxLength: [500, "جواب نباید بیشتر از 500 کاراکتر باشد"],
    },
    rating: {
      type: Number,
      required: [true, "لطفاً امتیاز خود را برای جواب وارد کنید"],
    },
    ...baseSchema.obj, // اضافه کردن فیلدهای عمومی
  },
  { timestamps: true } // ✅ timestamps را اینجا تنظیم می‌کنیم
);

const reviewSchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    comment: {
      type: String,
      required: [true, "لطفاً نظر خود را وارد کنید"],
      maxLength: [500, "نظر نباید بیشتر از 500 کاراکتر باشد"],
    },

    rating: {
      type: Number,
      required: [true, "لطفاً امتیاز خود را وارد کنید"],
    },

    // ریپلای‌ها با استفاده از اسکیمای جداگانه
    replies: [replySchema],

    ...baseSchema.obj,
  },
  { timestamps: true }
);

// اضافه کردن متد برای دریافت لایک‌ها و دیس‌لایک‌ها
reviewSchema.methods.getLikesDislikes = async function () {
  const likes = await like.find({ entityId: this._id, entityType: "Review", type: "like" });
  const dislikes = await like.find({ entityId: this._id, entityType: "Review", type: "dislike" });
  return { likes, dislikes };
};

const Review = models.Review || model("Review", reviewSchema);

export default Review;
