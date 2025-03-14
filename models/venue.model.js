// venue.model.js
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

const venueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام مکان الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام مکان باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام مکان نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        return this.name.toString()
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
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
    },
    venueId: {
      type: Number,
      unique: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    guestCapacity: {
      type: Number,
      required: true,
    },
    awards: [String],
    features: [
      {
        name: String,
        description: String,
      },
    ],
    servicesOffered: [
      {
        type: Schema.Types.ObjectId, 
        ref: "ServiceVenue",  
      },
    ],   

    settingVenue: [
      {
        type: Schema.Types.ObjectId, 
        ref: "settingVenue",  
      },
    ],
    awards: [
      {
        type: Schema.Types.ObjectId,
        ref: "VenueAward",  
      }
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "VenueEvent", 
      }
    ],
    amenities: [
      {
        type: Schema.Types.ObjectId, 
        ref: "AmenityVenue",  
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    locationCoordinates: {
      type: [Number], 
      required: true
    },
    priceRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "PriceRequest",
      },
    ],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    ...baseSchema.obj, 
  },
  { timestamps: true }
);

venueSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.venueId = await getNextSequenceValue('venueId');
  }

  if (this.isModified('name')) {
    this.slug = this.name.toString()
      .trim()
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/[\s\ـ]+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  next();
});

const Venue = models.Venue || model("Venue", venueSchema);

export default Venue;
