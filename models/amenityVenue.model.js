// amenities.model.js
import { Schema, model, models } from "mongoose";

// مدل Schema برای امکانات
const serviceAmenitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام امکان الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام امکان باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام امکان نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    description: {
      type: String,
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
    },
    icon: {
      type: String,  // می‌توانید آیکونی برای امکانات مختلف اضافه کنید (مثلاً مسیر URL آیکون)
    },
    isAvailable: {
      type: Boolean,
      default: true, // آیا این امکان در دسترس است؟
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    }
  },
  { timestamps: true }
);

const ServiceAmenity = models.ServiceAmenity || model("ServiceAmenity", serviceAmenitySchema);

export default ServiceAmenity;
