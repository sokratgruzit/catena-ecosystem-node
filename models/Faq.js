import * as mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: {},
    answer: {},
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Faq = mongoose.model("faq", FaqSchema);
