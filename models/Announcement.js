import * as mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    // slug: {
    //   type: String,
    //   default: "press.title",
    // },
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
    time: {
      type: Date,
      default: Date.now,
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
    cover_image: {
      type: String,
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

export const Announcement = mongoose.model("announcement", AnnouncementSchema);
