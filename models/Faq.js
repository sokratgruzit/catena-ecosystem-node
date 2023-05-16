import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const FaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      // unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "en.title",
      slugPaddingSize: 2,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true, },
);

export const Faq = mongoose.model("faq", FaqSchema);
