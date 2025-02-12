// Gallery.model.js
import { Schema, models, model } from "mongoose";
import baseSchema from "./baseSchema.model";  
import Counter from "./counter.model";
import connectDB from "@/libs/db";

connectDB();

const SlideSchema = new Schema(
  {
    slideId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'عنوان اسلاید باید وارد شود'],
      minlength: [3, 'عنوان اسلاید باید حداقل ۳ کاراکتر باشد'],
    },
    description: {
      type: String,
      required: [true, 'توضیحات اسلاید باید وارد شود'],
      minlength: [5, 'توضیحات اسلاید باید حداقل ۵ کاراکتر باشد'],
      maxLength: [500, 'توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد']
    },
    bgImg: {
      url: {
        type: String,
        required: [true, 'لینک مقصد باید وارد شود'],
      },
      type: {
        type: String,
        enum: ["image", "video"],
        required: true,
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

SlideSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.slideId = await getNextSequenceValue('slideId');
  }
  next();
});

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

const Slide = models.Slide || model("Slide", SlideSchema);

export default Slide;
