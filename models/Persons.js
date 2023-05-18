import * as mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const personsSchema = mongoose.Schema(
  {
    title: {},
    slug: {
      type: String,
      slug: "title.en",
      slugPaddingSize: 2,
      unique: true,
    },
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
