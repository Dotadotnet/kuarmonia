// models/PropertyType.js
import mongoose from "mongoose";

const propertyTypeSchema = new mongoose.Schema({
  id: { type: String, required: true,unique:true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
});

const PropertyType = mongoose.models.PropertyType || mongoose.model("PropertyType", propertyTypeSchema);

export default PropertyType;
