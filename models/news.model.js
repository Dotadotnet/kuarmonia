import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  

connectDB();

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان خبر الزامی است"],
      trim: true,
      minlength: [5, "عنوان خبر باید حداقل ۵ کاراکتر باشد"],
      maxlength: [100, "عنوان خبر نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    content: {
      type: String,
      required: [true, "محتوای خبر الزامی است"],
      minlength: [20, "محتوای خبر باید حداقل ۲۰ کاراکتر باشد"],
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User', required: true
       },
       tags: [String],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی خبر الزامی است"],
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

export default models.News || model("News", newsSchema);
