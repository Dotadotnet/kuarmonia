// category.model.js
import { Schema, models, model } from "mongoose";
import baseSchema from "./baseSchema.model";  
import Counter from "./counter.model"; 

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "نام دسته‌بندی الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام دسته‌بندی باید حداقل ۳ کاراکتر باشد"],
      maxLength: [160, "نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    answer: {  // اصلاح نام از 'asnwer' به 'answer'
      type: String,
      required: [true, "نام دسته‌بندی الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام دسته‌بندی باید حداقل ۳ کاراکتر باشد"],
      maxLength: [160, "نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: [true, "تگ پست الزامی است"],
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    faqId: {
      type: Number,
      unique: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    ...baseSchema.obj
  },
  { timestamps: true } 
);

faqSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.faqId = await getNextSequenceValue('faqId');
  }
  next();
});

const Faq = models.Faq || model("Faq", faqSchema);  // اصلاح از "Category" به "Faq"

export default Faq;
