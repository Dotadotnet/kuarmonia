import mongoose from "mongoose";

const saleTypeSchema = new mongoose.Schema({
  id: { type: String, required: true,unique:true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
});

const SaleType = mongoose.models.SaleType || mongoose.model("SaleType", saleTypeSchema);

export default SaleType;
