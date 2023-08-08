import * as mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: Object,
    default: {}
  },
  answer: {
    type: Object,
    default: {}
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
