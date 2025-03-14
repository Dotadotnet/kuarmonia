// Gallery.model.js
import { Schema, models, model } from "mongoose";
import baseSchema from "./baseSchema.model";  
import Counter from "./counter.model";
import connectDB from "@/libs/db";

connectDB();

const gallerySchema = new Schema(
  {  
    category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "دسته‌بندی گالری الزامی است"],
    unique: true, // اضافه کردن خاصیت unique
      validate: {
        validator: async function(value) {
          const count = await this.model("Gallery").countDocuments({ category: value });
          return count === 0;
        },
        message: "این دسته‌بندی گالری قبلاً وجود دارد، لطفاً دسته‌بندی دیگری انتخاب کنید." // پیام خطای custom
      }
  },
    galleryId: {
      type: Number,
      unique: true,
    },
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [false],
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, "عکس شاخص الزامی است"],
      },
      type: {
        type: String,
        enum: ["image", "video","unknown"],
        required: true,
      },
      public_id: {
        type: String,   
        default: "N/A",
      },
    },
    gallery: {
      type: [
        {
          url: {
            type: String,
            default: "https://placehold.co/296x200.png",
        
          },
          type: {
            type: String,
            enum: ["image", "video","unknown"],
            required: true,
          },
          public_id: {
            type: String,
            default: "N/A",
          },
        },
      ],
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

gallerySchema.pre('save', async function(next) {
  if (this.isNew) {
    this.galleryId = await getNextSequenceValue('galleryId');
  }
  next();
});

const Gallery = models.Gallery || model("Gallery", gallerySchema);

export default Gallery;


async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

