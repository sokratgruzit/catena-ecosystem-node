import * as mongoose from "mongoose";

const personsSchema = mongoose.Schema(
  {
    title: {
      type: Object,
      default: {}
    },
    slug: {
      type: String,
      default: "persons.title",
    },
    status: {
      type: Object,
      default: {}
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
