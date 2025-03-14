// ceremonyType.model.js
import { Schema, model, models } from "mongoose";

const ceremonyTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام نوع مراسم الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع مراسم باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع مراسم نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
    },
    icon: {
      type: String,
      required: false,  // می‌تواند اختیاری باشد
      description: 'آیکون مربوط به نوع مراسم، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    }

  },
  { timestamps: true }
);

const CeremonyType = models.CeremonyType || model("CeremonyType", ceremonyTypeSchema);

export default CeremonyType;
