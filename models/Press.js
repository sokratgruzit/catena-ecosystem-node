import * as mongoose from "mongoose";

const pressSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    inner_descr: {
      type: String,
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
    active_status: {
      type: Boolean,
      default: false,
      required: true,
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
  {
    timestamps: true,
  }
);

export const Press = mongoose.model("Press", pressSchema);
