import * as mongoose from "mongoose";

const ChoicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    vote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Votes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Choices = mongoose.model("Choices", ChoicesSchema);
