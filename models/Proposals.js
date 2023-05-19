import * as mongoose from "mongoose";

const ProposalsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    choices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Choices",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Proposals = mongoose.model("Proposals", ProposalsSchema);
