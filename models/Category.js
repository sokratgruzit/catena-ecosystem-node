import * as mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {},
    slug: {
      type: String,
      slug: "title",
      slugPaddingSize: 2,
      unique: true,
    },
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
