import * as mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {},
    image: {
      type: String,
      required: true,
    },
    logo_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
