import * as mongoose from "mongoose";
//import slug from "mongoose-slug-updater";

//mongoose.plugin(slug);

const categorySchema = mongoose.Schema(
  {
    title: {
      type: Object,
      default: {}
    },
    slug: {
      type: String,
      default: "category.title",
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
