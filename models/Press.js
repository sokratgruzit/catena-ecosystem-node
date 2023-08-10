import * as mongoose from "mongoose";

const pressSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      default: "press.title",
    },
    year: {
      type: String,
      default: "2023",
    },
    title: {
      type: Object,
      default: {}
    },
    text: {
      type: Object,
      default: {}
    },
    inner_descr: {
      type: Object,
      default: {}
    },
    active_status: {
      type: Boolean,
      default: false,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    logo_image: {
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
