import * as mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: Object,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
  slug: {
    type: Object,
    required: true,
    unique: true,
  },
  active_status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FAQ = mongoose.model("FAQ", faqSchema);
