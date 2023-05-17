import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const FaqSchema = new mongoose.Schema(
  {
    question: {},
    answer: {},
    slug: {
      type: String,
      slug: "question.en",
      slugPaddingSize: 2,
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
