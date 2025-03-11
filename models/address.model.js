import { Schema, models, model } from "mongoose";

const addressSchema = new Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    street: { type: String, required: true },
    additionalInfo: { type: String, default: "" }, // برای توضیحات بیشتر اگر نیاز بود
  },
  { timestamps: true }
);

const Address = models.Address || model("Address", addressSchema);

export default Address;
