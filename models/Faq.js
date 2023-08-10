import * as mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: Object,
      default: {},
    },
    answer: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const FAQ = mongoose.model("FAQ", faqSchema);
