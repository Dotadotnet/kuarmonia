import mongoose from 'mongoose';
import Counter from './counter.model';
import baseSchema from './baseSchema.model';

const { Schema } = mongoose;

const propertyTypeSchema = new Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: false,
    default: function() {
      return this.title.toString()
        .trim()
        .toLowerCase()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\s\ـ]+/g, "-")
        .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  typeId: {
    type: Number,
    unique: true,
  },
  
  amenities: [{ type: String }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  icon: { type: String, required: false },
  description: { type: String, required: true },
  ...baseSchema.obj,
});

propertyTypeSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.typeId = await getNextSequenceValue('typeId');
  }

  if (this.isModified('title')) {
    this.slug = this.title.toString()
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

const PropertyType = mongoose.models.PropertyType || mongoose.model('PropertyType', propertyTypeSchema);

export default PropertyType;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
