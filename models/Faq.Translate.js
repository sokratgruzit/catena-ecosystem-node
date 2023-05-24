import * as mongoose from "mongoose";

const faqTranslateSchema = new mongoose.Schema(
  {
    lang: String,
    question: String,
    answer: String,
    faq: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faq",
    },
  },
  {
    timestamps: true,
  }
);

export const faqTranslate = mongoose.model("faqTranslate", faqTranslateSchema);
