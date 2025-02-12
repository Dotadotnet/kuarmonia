import { Schema, models, model } from "mongoose";

const counterSchema = new Schema({
  model: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

const Counter = models.Counter || model("Counter", counterSchema);
export default Counter;


