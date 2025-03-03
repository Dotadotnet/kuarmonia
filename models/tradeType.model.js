// models/TradeType.js
import mongoose from "mongoose";

const tradeTypeSchema = new mongoose.Schema({
  id: { type: String, required: true,unique:true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
  priceFields: { type: [String], default: [] },
});

const TradeType = mongoose.models.TradeType || mongoose.model("TradeType", tradeTypeSchema);

export default TradeType;
