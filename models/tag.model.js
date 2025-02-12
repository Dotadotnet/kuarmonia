import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";
import Counter from "./counter.model";

connectDB();

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان تگ الزامی است"],
      trim: true,
      maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [160, "توضیحات تگ نباید بیشتر از 160 کاراکتر باشد"],
    },
    keywords: {
      type: [String],
      required: false,
      default: [],
      trim:true
    },  
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        const slug = this.title.toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
    
        console.log('Generated slug:', slug); // نمایش مقدار تولید شده برای slug
        return slug;
      }
    },
    
    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست",
      },
    },
    robots: {
      type: [{
        id: Number,
        value: {
          type: String,
          enum: ['index', 'noindex', 'follow', 'nofollow'],
        }
      }],
      default: [],
    },
    schema: {
      type: Schema.Types.Mixed,
      required: false,
    },
    tagId: {
      type: Number,
      unique: true
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_BASE_URL;

tagSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.tagId = await getNextSequenceValue('tagId');
  }
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/tags/${this.slug}`;
  }
  next();
});

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
