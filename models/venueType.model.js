// venueType.model.js
import { Schema, model, models } from "mongoose";

const venueTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام نوع مکان مراسم الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع  مکان مراسم باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع مکان مراسم نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
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
    },
  },
  { timestamps: true }
);

const VenueType = models.VenueType || model("VenueType", venueTypeSchema);

export default VenueType;
