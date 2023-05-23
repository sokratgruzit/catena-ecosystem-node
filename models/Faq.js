import * as mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: {},
    answer: {},
    active: {
      type: Boolean,
      default: true,
    },
    faqTranslate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faqTranslate"
    }
  },
  { timestamps: true }
);

export const Faq = mongoose.model("faq", FaqSchema);
