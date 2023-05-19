import slug from "mongoose-slug-updater";
import * as mongoose from "mongoose";

mongoose.plugin(slug);

const eventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      slug: "title.en",
      slugPaddingSize: 2,
      unique: true,
    },
    title: {},
    badge: {
      type: String,
      required: true,
    },
    text: {},
    inner_descr: {},
    time: {
      type: Date,
      default: Date.now,
    },
    cover_image: {
      type: String,
      required: true,
    },
    outter_image: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    active_status: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);
