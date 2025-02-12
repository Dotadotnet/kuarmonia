

import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  


connectDB();

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],

    
    ...baseSchema.obj
  },
  { timestamps: true }
);

const Favorite = models.Favorite || model("Favorite", favoriteSchema);

export default Favorite;
