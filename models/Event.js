import * as mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
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

export const Event = mongoose.model("event", EventSchema);