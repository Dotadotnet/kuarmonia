import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";
import Counter from "./counter.model";
import Category from "./category.model";
import Tag from "./tag.model";

connectDB();
const socialLinkSchema = new Schema({
  name: {
    type: String,
    required: [true, "نام شبکه اجتماعی الزامی است"],
    trim: true,
    enum: {
      values: ["Facebook", "Twitter", "LinkedIn", "Instagram", "Other"],
      message: "نام شبکه اجتماعی معتبر نیست",
    },
  },
  url: {
    type: String,
    required: [true, "لینک شبکه اجتماعی الزامی است"],
    trim: true,
    match: [
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
      "لینک شبکه اجتماعی معتبر نیست",
    ],
  },
});

const blogSchema = new Schema(
  {
    blogId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function () {
        return this.title
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"],
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, "عکس شاخص الزامی است"],
      },
      public_id: {
        type: String,
        default: "N/A",
      },
      originalName: {
        type: String,
        default: "N/A",
      },


    },
    content: {
      type: String,
      required: [true, "محتوا الزامی است"],
    },
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: "",
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: "",
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    metaRobots: {
      type: String,
      enum: ["index, follow", "noindex, nofollow", "index, nofollow", "noindex, follow"],
      default: "index, follow",
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
    readTime: {
      type: String,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    relatedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    relatedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    relatedNewsArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewsArticle",
      },
    ],
    relatedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    relatedSpecialMigrationOpportunities: [
      {
        type: Schema.Types.ObjectId,
        ref: "SpecialMigrationOpportunity",
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    publishDate: {
      type: Date,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"],
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
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    bookmarkedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like", 
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", 
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

blogSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

blogSchema.virtual('dislikeCount').get(function() {
  return this.dislikes ? this.dislikes.length : 0;
});

blogSchema.virtual('rating').get(function() {
  const totalReactions = this.likes.length + this.dislikes.length;
  if (totalReactions === 0) return 0;

  const likeRatio = this.likes.length / totalReactions;
  return Math.round((likeRatio * 5 + Number.EPSILON) * 100) / 100; 
});

const defaultDomain = process.env.NEXT_PUBLIC_BASE_URL;

blogSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.blogId = await getNextSequenceValue('blogId');
  }
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/blog/${encodeURIComponent(this.slug)}/${this._id}`;
  }
  next();
});

blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

blogSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.blogId = await getNextSequenceValue("blogId");
  }
  if (this.isNew || this.isModified('visibility')) {
    if (this.publishStatus === "private") {
      this.visibility = "noindex, nofollow"; 
    } else {
      this.visibility = "index, follow";
    }
  }
  next();

  if (
    this.isModified('title') ||
    this.isModified('category') ||
    this.metaTitle === "" ||
    this.metaDescription === "" ||
    this.metaKeywords.length === 0
  ) {
    try {
      const category = await Category.findById(this.category);
      if (category) {
        let combinedMetaTitle = `${this.title} | ${category.title}`;
        if (combinedMetaTitle.length > 60) {
          const excessLength = combinedMetaTitle.length - 60;
          combinedMetaTitle = `${this.title.substring(0, this.title.length - excessLength)} | ${category.title}`;
        }
        this.metaTitle = combinedMetaTitle;
      
        let combinedMetaDescription = `${this.description} | ${category.title}`;
        if (combinedMetaDescription.length > 160) {
          const excessLength = combinedMetaDescription.length - 160;
          combinedMetaDescription = `${this.description.substring(0, this.description.length - excessLength)} | ${category.title}`;
        }
        this.metaDescription = combinedMetaDescription;
      
        const tags = await Tag.find({ _id: { $in: this.tags } }); 
        const tagKeywords = tags.map(tag => tag.title);
        this.metaKeywords = tagKeywords.slice(0, 10);
      } else {
        this.metaTitle = this.title.length > 60 ? this.title.substring(0, 57) + "..." : this.title;
        this.metaDescription = this.description.length > 160 ? this.description.substring(0, 157) + "..." : this.description;
        this.metaKeywords = this.metaKeywords.length > 0 ? this.metaKeywords.slice(0, 10) : [];
      }
    } catch (error) {
      console.error("خطا در تنظیم metaTitle، metaDescription و metaKeywords:", error);
    }
  }
  next();
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
