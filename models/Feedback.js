import * as mongoos from "mongoose";

const feedbackSchema = new mongoos.Schema(
  {
    userName: {
      type: String,
      default: {},
    },
    email: {
      type: String,
      default: {},
    },
    message: {
      type: String,
      default: {},
    },
  },
  { timestamps: true }
);

export const Feedback = mongoos.model("Feedback", feedbackSchema);
