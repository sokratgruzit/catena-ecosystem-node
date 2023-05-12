import * as mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    //   required: true,
    //   unique: true,
    },
    answer: {
      type: String,
    //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FAQ = mongoose.model("FAQ", FAQSchema);
