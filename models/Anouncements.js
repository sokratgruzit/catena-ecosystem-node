import slug from "mongoose-slug-updater";
import * as mongoose from "mongoose";

mongoose.plugin(slug);

const AnouncementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    title: {},
    text: {},
    inner_descr: {},
    time: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
      required: true,
    },
    active_status: {
      type: Boolean,
      default: true,
      required: true,
    },
    slug: {
      type: String,
      slug: "title.en",
      slugPaddingSize: 2,
      unique: true,
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

export const Anouncement = mongoose.model("anouncement", AnouncementSchema);
