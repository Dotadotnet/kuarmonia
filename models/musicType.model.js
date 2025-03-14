// musicType.model.js
import { Schema, model, models } from "mongoose";

const musicTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام نوع موسیقی الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع موسیقی باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع موسیقی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
    },
    image: {
      type: String,
      required: [true, "تصویر نوع موسیقی الزامی است"],
      validate: {
        validator: function (value) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i.test(value); // چک کردن فرمت تصویر
        },
        message: "لطفا یک لینک معتبر به تصویر وارد کنید"
      },
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    }
  },
  { timestamps: true }
);

const MusicType = models.MusicType || model("MusicType", musicTypeSchema);

export default MusicType;
