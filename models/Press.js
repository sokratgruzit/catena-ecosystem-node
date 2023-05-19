import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const pressSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      slug: "title.en",
      slugPaddingSize: 2,
      unique: true,
    },
    title: {},
    text: {},
    inner_descr: {},
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
