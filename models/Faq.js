import * as mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Faq = mongoose.model("faq", FaqSchema);
