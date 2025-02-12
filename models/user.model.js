import { Schema, models, model } from "mongoose";
import { genSaltSync, hashSync, compare } from "bcryptjs";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "لطفاً نام خود را وارد کنید"],
      maxLength: [100, "نام نمی‌تواند بیشتر از 100 کاراکتر باشد"],
    },

    email: {
      type: String,
      required: [true, "لطفاً ایمیل خود را وارد کنید"],
      unique: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "لطفاً یک ایمیل معتبر وارد کنید"],
    },

    avatar: {
      url: {
        type: String,
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

    password: {
      type: String,
      required: [true, "لطفاً رمز عبور خود را وارد کنید"],
    },

    phone: {
      type: String,
      required: [true, "لطفاً شماره تلفن خود را وارد کنید"],
      unique: true,
      match: [/^\+?\d{10,15}$/, "لطفاً یک شماره تلفن معتبر وارد کنید"]
    },

    role: {
      type: String,
      enum: ["superAdmin", "admin", "author", "user", "operator"],
      default: "user",
    },

    verify: [
      {
        type: Schema.Types.ObjectId,
        ref: "verify",
      }
    ],

    address: {
      type: String,
      trim: true,
      maxLength: [200, "آدرس نمی‌تواند بیشتر از 200 کاراکتر باشد"],
    },

    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],

    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },

    favorite: {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "blogs",
      },
    ],
    ...baseSchema.obj
  },
  { timestamps: true }
);

// رمز عبور را قبل از ذخیره رمزنگاری کنید
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = genSaltSync(10);
    const hash = hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.encryptPassword = function (password) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
};

userSchema.methods.comparePassword = async function (
  currentPassword,
  storedPassword
) {
  const isMatch = await compare(currentPassword, storedPassword);
  return isMatch;
};

const User = models.User || model("User", userSchema);

export default User;
