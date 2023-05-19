import * as mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    vote: {
      type: Number,
      default: 0,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      defalut: 0,
    },
    choices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Choices",
      },
    ],
    proposal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposals",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Votes = mongoose.model("Votes", VoteSchema);
