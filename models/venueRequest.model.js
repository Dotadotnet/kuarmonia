// venueRequest.model.js
import { Schema, model, models } from "mongoose";

const venueRequestSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "نام و نام خانوادگی الزامی است"]
    },
    email: {
      type: String,
      required: function () {
        return !this.userId;
      },
      match: [/\S+@\S+\.\S+/, "لطفا یک ایمیل معتبر وارد کنید"]
    },
    phone: {
      type: String,
      required: function () {
        return !this.userId;
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.email && !this.phone;
      }
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: true
    },
    date: {
      month: {
        type: String,
        required: [true, "ماه مراسم الزامی است"]
      },
      year: {
        type: String,
        required: [true, "سال مراسم الزامی است"]
      },
      day: {
        type: String,
        required: [true, "روز مراسم الزامی است"]
      }
    },
    capacity: {
      type: Number,
      required: [true, "ظرفیت مراسم الزامی است"]
    },
    favoriteSinger: {
      type: String,
      required: false,
      trim: true
    },
    ceremonyTypes: [
      {
        type: Schema.Types.ObjectId,
        ref: "CeremonyType"
      }
    ]
  },
  { timestamps: true }
);

const VenueRequest =
  models.VenueRequest || model("VenueRequest", venueRequestSchema);

export default VenueRequest;
