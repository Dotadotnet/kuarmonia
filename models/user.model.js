import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";
import Counter from "./counter.model";

connectDB();

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      unique: true
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      maxLength: [100, "نام نمی‌تواند بیشتر از 100 کاراکتر باشد"]
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "لطفاً یک ایمیل معتبر وارد کنید"
      ]
    },
    phone: {
      type: String,
      match: [/^\+?\d{10,15}$/, "لطفاً یک شماره تلفن معتبر وارد کنید"],
      unique: true,
      sparse: true
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    avatar: {
      url: {
        type: String
      },
      public_id: {
        type: String,
        default: "N/A"
      },

      originalName: {
        type: String,
        default: "N/A"
      }
    },
    userLevel: {
      type: String,
      enum: ["basic", "verified", "completed"],
      default: "basic",
      require: true
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.userId = await getNextSequenceValue("userId");
  }
  if (!this.phone && !this.email) {
    return next(
      new Error("کاربر باید حداقل شماره تلفن یا حساب گوگل داشته باشد.")
    );
  }
  next();
});

const User = models.User || model("User", userSchema);

export default User;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
