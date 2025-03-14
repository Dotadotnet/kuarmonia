// serviceVenues.model.js
import { Schema, model, models } from "mongoose";

// مدل Schema برای خدمات
const serviceVenueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام خدمت الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام خدمت باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام خدمت نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"]
    },
    icon: {
      type: String,
      required: false,
      description:
        "آیکون مربوط به نوع مراسم، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    }
  },
  { timestamps: true }
);

const ServiceVenue =
  models.ServiceVenue || model("ServiceVenue", serviceVenueSchema);

export default ServiceVenue;
