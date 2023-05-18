import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import { Language } from "./Language.js";

mongoose.plugin(slug);

const categorySchema = mongoose.Schema(
  {
    title: {},
    slug: {
      type: String,
      slug: "title.en",
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
