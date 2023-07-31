import mongoose from "mongoose";

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
    translations: {
      en: {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

export const Faq = mongoose.model("Faq", FaqSchema);
