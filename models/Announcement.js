import * as mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
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
