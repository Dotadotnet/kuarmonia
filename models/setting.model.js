// setting.model.js
import { Schema, model, models } from "mongoose";

// مدل Setting
const settingVenueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام نوع تنظیمات الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام تنظیمات باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام تنظیمات نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    }
  },
  { timestamps: true }
);

const SettingVenue = models.SettingVenue || model("SettingVenue", settingVenueSchema);

export default SettingVenue;
