import * as mongoose from "mongoose";

const pressSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: false,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    active_status: {
      type: Boolean,
      default: false,
      required: true,
    },
    outter_image: {
      type: String,
      required: false,
    },
    inner_image: {
      type: String,
      required: false,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    persons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persons",
      },
    ],
  },
  { timestamps: true }
);

export const Press = mongoose.model("press", pressSchema);
