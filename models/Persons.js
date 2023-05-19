import * as mongoose from "mongoose";

const personsSchema = mongoose.Schema(
  {
    title: {},
    status: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Persons = mongoose.model("Persons", personsSchema);
