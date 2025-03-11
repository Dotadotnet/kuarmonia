import { Schema, models, model } from "mongoose";
import { genSaltSync, hashSync, compare } from "bcryptjs";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "لطفاً نام خود را وارد کنید"],
      maxLength: [100, "نام نمی‌تواند بیشتر از 100 کاراکتر باشد"]
    },
    email: {
      type: String,
      required: [true, "لطفاً ایمیل خود را وارد کنید"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "لطفاً یک ایمیل معتبر وارد کنید"
      ]
    },
    avatar: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A", required: true },
      originalName: { type: String, default: "N/A", required: true }
    },
    password: {
      type: String,
      required: [true, "لطفاً رمز عبور خود را وارد کنید"]
    },
    phone: {
      type: String,
      required: [true, "لطفاً شماره تلفن خود را وارد کنید"],
      unique: true,
      match: [/^\+?\d{10,15}$/, "لطفاً یک شماره تلفن معتبر وارد کنید"]
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "author", "operator"],
      default: "operator"
    },
    adminLevel: {
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

// رمز عبور را قبل از ذخیره رمزنگاری کنید
adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = genSaltSync(10);
    const hash = hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.encryptPassword = function (password) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

adminSchema.methods.comparePassword = async function (
  currentPassword,
  storedPassword
) {
  const isMatch = await compare(currentPassword, storedPassword);
  return isMatch;
};

// Avoid recompiling the model during hot reloads in development mode
const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
